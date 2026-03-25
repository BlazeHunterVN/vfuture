import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSettings, updateSetting } from "@/lib/data/content-service";
import { enforceAdminApiAuth, enforceRateLimit } from "@/lib/server/api-guard";
import { logAdminActivity } from "@/lib/server/admin-activity";
import { sanitizePlainText } from "@/lib/server/sanitize";

const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
});

export async function GET(request: NextRequest) {
  const limited = enforceRateLimit(request, {
    name: "admin-settings",
    limit: 60,
    windowMs: 60_000,
  });
  if (limited) {
    return limited;
  }
  const denied = await enforceAdminApiAuth({ minimumRole: "admin" });
  if (denied) {
    return denied;
  }
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: NextRequest) {
  const limited = enforceRateLimit(request, {
    name: "admin-settings",
    limit: 30,
    windowMs: 60_000,
  });
  if (limited) {
    return limited;
  }
  const denied = await enforceAdminApiAuth({ minimumRole: "admin" });
  if (denied) {
    return denied;
  }

  const payload = await request.json();
  const parsed = settingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
  }

  const setting = await updateSetting(
    sanitizePlainText(parsed.data.key),
    sanitizePlainText(parsed.data.value),
  );

  await logAdminActivity({
    action: "SETTING_UPDATED",
    targetType: "SETTING",
    targetId: setting.id,
        summary: `Cập nhật cài đặt ${setting.key}`,
  });

  return NextResponse.json({ setting });
}
