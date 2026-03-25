"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  showPassword,
  onToggleShowPassword
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showPassword: boolean;
  onToggleShowPassword: () => void;
}) => (
  <div className="relative">
    <Input
      value={value}
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      required
      placeholder={placeholder}
      className="h-11 rounded-xl pr-10"
    />
    <button
      type="button"
      onClick={onToggleShowPassword}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-1"
      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
);

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invitedEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(invitedEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("MẬT KHẨU XÁC NHẬN CHƯA KHỚP.");
      return;
    }

    setSubmitting(true);

    const invitedCheck = await fetch(`/api/auth/invited-email?email=${encodeURIComponent(email)}`);
    const invitedData = (await invitedCheck.json().catch(() => ({ allowed: false }))) as { allowed?: boolean };

    if (!invitedData.allowed) {
      setSubmitting(false);
      toast.error("EMAIL NÀY CHƯA ĐƯỢC QUẢN TRỊ VIÊN CHO PHÉP TẠO TÀI KHOẢN.");
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      const response = await fetch("/api/auth/demo-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setSubmitting(false);

      if (!response.ok) {
        toast.error("KHÔNG THỂ TẠO TÀI KHOẢN DEMO.");
        return;
      }

      toast.success("ĐÃ TẠO TÀI KHOẢN DEMO. HÃY QUAY LẠI TRANG ĐĂNG NHẬP.");
      router.push("/auth/login");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    await fetch("/api/auth/invited-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).catch(() => null);

    toast.success("TẠO TÀI KHOẢN THÀNH CÔNG. HÃY KIỂM TRA EMAIL ĐỂ XÁC NHẬN NẾU CẦN.");
    router.push("/auth/login");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        required
        readOnly={!!invitedEmail} // Block editing if email was provided via URL to prevent mistakes
        placeholder="EMAIL ĐÃ ĐƯỢC MỜI"
        className={`h-11 rounded-xl ${invitedEmail ? "bg-muted text-muted-foreground opacity-70 cursor-not-allowed" : ""}`}
      />
      <PasswordInput
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="MẬT KHẨU"
        showPassword={showPassword}
        onToggleShowPassword={() => setShowPassword(!showPassword)}
      />
      <PasswordInput
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        placeholder="XÁC NHẬN MẬT KHẨU"
        showPassword={showConfirmPassword}
        onToggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />
      <Button type="submit" disabled={submitting} className="h-11 w-full rounded-xl">
        {submitting ? "ĐANG TẠO TÀI KHOẢN..." : "TẠO TÀI KHOẢN"}
      </Button>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-[0_20px_60px_rgba(2,6,23,0.15)]">
        <div className="mb-6 text-center">
          <h1 className="font-heading text-2xl font-bold uppercase tracking-[0.08em] text-foreground">
            Tạo tài khoản quản trị
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Bạn cần nhập đúng <strong className="text-foreground">địa chỉ Email đã nhận được thư mời</strong> để có thể đăng ký thành công.
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-4 shadow-sm">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            💡 Gợi ý: Địa chỉ email này phải hoàn toàn khớp với email bạn dùng bên phía hệ thống mời. Các email chưa được cấp quyền sẽ bị từ chối tự động.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-sm py-8 text-muted-foreground">Đang tải biểu mẫu...</div>}>
          <RegisterForm />
        </Suspense>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/auth/login" className="font-medium uppercase tracking-[0.08em] transition hover:text-foreground">
            QUAY LẠI ĐĂNG NHẬP
          </Link>
        </div>
      </section>
    </main>
  );
}
