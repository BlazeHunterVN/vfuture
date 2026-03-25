import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { rateLimit } from "@/lib/server/rate-limit";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export function getClientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  return ip;
}

export function enforceRateLimit(
  request: NextRequest,
  options: {
    name: string;
    limit?: number;
    windowMs?: number;
  },
) {
  const key = `${options.name}:${getClientKey(request)}`;
  const result = rateLimit(key, {
    limit: options.limit ?? 50,
    windowMs: options.windowMs ?? 60_000,
  });

  if (!result.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((result.retryAfter ?? 0) / 1000)),
        },
      },
    );
  }

  return null;
}

type MinimumRole = "senior_admin" | "admin" | "editor";

function matchesMinimumRole(role: string | null | undefined, minimumRole: MinimumRole) {
  // senior_admin có quyền lực cao nhất, luôn được phép
  if (role === "senior_admin") return true;

  if (minimumRole === "editor") {
    return role === "admin" || role === "editor";
  }

  if (minimumRole === "admin") {
    return role === "admin";
  }

  // Nếu minimumRole = 'senior_admin', chỉ duy nhất role 'senior_admin' (đã check ở đầu) mới lọt.
  return false;
}

export async function enforceAdminApiAuth(options?: { minimumRole?: MinimumRole }) {
  const minimumRole = options?.minimumRole ?? "editor";

  // Production: Supabase authentication is REQUIRED
  if (!hasSupabaseEnv) {
    return NextResponse.json(
      { error: "Supabase not configured (production requires authentication)" },
      { status: 500 }
    );
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured." }, { status: 500 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appRole = user.app_metadata?.role;
  if (matchesMinimumRole(appRole, minimumRole)) {
    return null;
  }

  const { data: profile } = (await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()) as { data: { role: "senior_admin" | "admin" | "editor" } | null };

  if (!matchesMinimumRole(profile?.role, minimumRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
