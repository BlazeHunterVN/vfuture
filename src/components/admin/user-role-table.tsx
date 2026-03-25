"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserItem, UserRole } from "@/lib/types/content";

type UserRoleTableProps = {
  users: UserItem[];
  onSaved: () => Promise<void>;
};

export function UserRoleTable({ users, onSaved }: UserRoleTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false);

  useEffect(() => {
    async function initClient() {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      if (!supabase) {
        setCurrentUserLoaded(true);
        return;
      }
      const { data } = await supabase.auth.getUser();
      setCurrentUserEmail(data?.user?.email ?? null);
      setCurrentUserLoaded(true);
    }
    initClient();
  }, []);

  const currentUser = users.find((u) => u.email === currentUserEmail);
  const isSeniorAdmin = currentUserLoaded && currentUser?.role === "senior_admin";

  const updateRole = async (id: string, role: UserRole) => {
    setUpdatingId(id);
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, role }),
    });

    if (!response.ok) {
      setUpdatingId(null);
      toast.error("KHÔNG THỂ CẬP NHẬT QUYỀN.");
      return;
    }

    toast.success("ĐÃ CẬP NHẬT QUYỀN.");
    setUpdatingId(null);
    await onSaved();
  };

  const deleteUser = async (id: string, email: string) => {
    if (email === currentUserEmail) {
      toast.error("KHÔNG THỂ XÓA CHÍNH MÌNH.");
      return;
    }
    if (!confirm(`BẠN CÓ CHẮC CHẮN MUỐN XÓA TÀI KHOẢN ${email}?`)) return;

    setDeletingId(id);
    const response = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      setDeletingId(null);
      toast.error("KHÔNG THỂ XÓA TÀI KHOẢN.");
      return;
    }

    toast.success("ĐÃ XÓA TÀI KHOẢN THÀNH CÔNG.");
    setDeletingId(null);
    await onSaved();
  };

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="px-4 py-3 uppercase tracking-[0.08em]">EMAIL</th>
            <th className="px-4 py-3 uppercase tracking-[0.08em]">QUYỀN</th>
            <th className="px-4 py-3 uppercase tracking-[0.08em]">LƯỢT XEM</th>
            <th className="px-4 py-3 uppercase tracking-[0.08em]">TRẠNG THÁI</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-border text-foreground">
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">
                <Select defaultValue={user.role} onValueChange={(value) => updateRole(user.id, value as UserRole)}>
                  <SelectTrigger className="h-9 w-44 border-border bg-background uppercase tracking-[0.08em] text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card text-foreground">
                    <SelectItem value="senior_admin" className="uppercase tracking-[0.08em]">
                      QUẢN TRỊ CẤP CAO
                    </SelectItem>
                    <SelectItem value="admin" className="uppercase tracking-[0.08em]">
                      QUẢN TRỊ
                    </SelectItem>
                    <SelectItem value="editor" className="uppercase tracking-[0.08em]">
                      BIÊN TẬP
                    </SelectItem>
                  </SelectContent>
                </Select>
              </td>
              <td className="px-4 py-3">{user.views.toLocaleString("vi-VN")}</td>
              <td className="px-4 py-3 flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={updatingId === user.id || deletingId === user.id}
                  className="border-border bg-background text-foreground"
                >
                  {updatingId === user.id ? "ĐANG CẬP NHẬT..." : "ĐÃ ĐỒNG BỘ"}
                </Button>
                {isSeniorAdmin && user.email !== currentUserEmail && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-9 w-9 border-border bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                    disabled={deletingId === user.id}
                    onClick={() => deleteUser(user.id, user.email)}
                    aria-label="Delete user"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
