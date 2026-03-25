import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getUsers, updateUserRole, deleteUser } from "@/lib/data/content-service";
import { enforceAdminApiAuth, enforceRateLimit } from "@/lib/server/api-guard";
import { logAdminActivity } from "@/lib/server/admin-activity";

const updateUserSchema = z.object({
  id: z.string().min(1),
  role: z.enum(["senior_admin", "admin", "editor"]),
});

const deleteUserSchema = z.object({
  id: z.string().min(1),
});

export async function GET(request: NextRequest) {
  const limited = enforceRateLimit(request, { name: "admin-users", limit: 60, windowMs: 60_000 });
  if (limited) {
    return limited;
  }
  const denied = await enforceAdminApiAuth({ minimumRole: "admin" });
  if (denied) {
    return denied;
  }
  const users = await getUsers();
  return NextResponse.json({ users });
}

export async function PATCH(request: NextRequest) {
  const limited = enforceRateLimit(request, { name: "admin-users", limit: 30, windowMs: 60_000 });
  if (limited) {
    return limited;
  }
  const denied = await enforceAdminApiAuth({ minimumRole: "admin" });
  if (denied) {
    return denied;
  }

  const payload = await request.json();
  const parsed = updateUserSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid user payload." }, { status: 400 });
  }

  const user = await updateUserRole(parsed.data.id, parsed.data.role);
  await logAdminActivity({
    action: "USER_ROLE_UPDATED",
    targetType: "USER",
    targetId: user.id,
    summary: `CAP NHAT VAI TRO ${user.email} THANH ${user.role}`,
  });
  return NextResponse.json({ user });
}

export async function DELETE(request: NextRequest) {
  const limited = enforceRateLimit(request, { name: "admin-users-delete", limit: 30, windowMs: 60_000 });
  if (limited) {
    return limited;
  }
  const denied = await enforceAdminApiAuth({ minimumRole: "senior_admin" });
  if (denied) {
    return denied;
  }

  const payload = await request.json();
  const parsed = deleteUserSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  await deleteUser(parsed.data.id);
  await logAdminActivity({
    action: "USER_DELETED",
    targetType: "USER",
    targetId: parsed.data.id,
    summary: `Xóa người dùng ID ${parsed.data.id}`,
  });
  return NextResponse.json({ ok: true });
}
