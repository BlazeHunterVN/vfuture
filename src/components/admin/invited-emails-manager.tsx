"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MailPlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useInvitedEmailsQuery } from "@/hooks/use-invited-emails-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/common/loading-spinner";

export function InvitedEmailsManager() {
  const queryClient = useQueryClient();
  const { data: invitedEmails = [], isLoading } = useInvitedEmailsQuery();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["invited-emails"] });
  };

  const onAdd = async () => {
    if (!email.trim()) {
      return;
    }

    setSubmitting(true);
    const response = await fetch("/api/admin/invited-emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    setSubmitting(false);

    if (!response.ok) {
      toast.error("KHÔNG THỂ THÊM EMAIL ĐƯỢC MỜI.");
      return;
    }

    const data = (await response.json()) as {
      emailDelivery?: { sent?: boolean; configured?: boolean };
    };

    if (data.emailDelivery?.sent) {
      toast.success("ĐÃ THÊM EMAIL VÀ GỬI THƯ MỜI THÀNH CÔNG.");
    } else if (data.emailDelivery?.configured === false) {
      toast.success("ĐÃ THÊM EMAIL. CHƯA CẤU HÌNH DỊCH VỤ GỬI THƯ THẬT.");
    } else {
      toast.success("ĐÃ THÊM EMAIL, NHƯNG GỬI THƯ CHƯA THÀNH CÔNG.");
    }

    setEmail("");
    await refresh();
  };

  const onDelete = async (id: string) => {
    setRemovingId(id);
    const response = await fetch("/api/admin/invited-emails", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setRemovingId(null);

    if (!response.ok) {
      toast.error("KHÔNG THỂ XÓA EMAIL ĐƯỢC MỜI.");
      return;
    }

    toast.success("ĐÃ XÓA EMAIL KHỎI DANH SÁCH ĐƯỢC MỜI.");
    await refresh();
  };

  return (
    <section className="glass-card rounded-2xl p-4">
      <div className="mb-4 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">EMAIL ĐƯỢC MỜI</p>
        <h3 className="font-heading text-lg font-semibold uppercase tracking-[0.06em] text-foreground">
          CHỈ EMAIL ĐÃ THÊM MỚI CÓ THỂ TẠO TÀI KHOẢN
        </h3>
        <p className="text-sm text-muted-foreground">
          LỜI MỜI CHỈ CÓ HIỆU LỰC TRONG 48 GIỜ. HẾT HẠN SẼ TỰ ĐỘNG HỦY VÀ CẦN MỜI LẠI.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="them-email@vfuture.app"
          className="border-border bg-background text-foreground"
        />
        <Button type="button" onClick={onAdd} disabled={submitting} className="rounded-xl">
          <MailPlus className="mr-2 size-4" />
          {submitting ? "ĐANG THÊM..." : "THÊM EMAIL"}
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner className="py-8" label="ĐANG TẢI DANH SÁCH EMAIL ĐƯỢC MỜI..." />
      ) : invitedEmails.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-background/60 px-4 py-5 text-sm text-muted-foreground">
          CHƯA CÓ EMAIL NÀO TRONG DANH SÁCH ĐƯỢC MỜI.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {invitedEmails.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-background/80 px-4 py-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-1">
                <p className="font-medium text-foreground">{item.email}</p>
                <p className="text-sm text-muted-foreground">
                  THÊM NGÀY {new Date(item.created_at).toLocaleString("vi-VN")}
                </p>
                <p className="text-sm text-muted-foreground">
                  HẾT HẠN {new Date(item.expires_at).toLocaleString("vi-VN")}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-border bg-background"
                disabled={removingId === item.id}
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="mr-2 size-4" />
                {removingId === item.id ? "ĐANG XÓA..." : "XÓA"}
              </Button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
