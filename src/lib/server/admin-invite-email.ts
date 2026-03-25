import { createClient } from "@supabase/supabase-js";
import {
  supabaseUrl,
  supabaseServiceRoleKey,
  hasSupabaseServiceRoleEnv,
} from "@/lib/supabase/env";

type SendAdminInviteEmailInput = {
  email: string;
  expiresAt: string;
  redirectTo?: string;
};

export async function sendAdminInviteEmail(input: SendAdminInviteEmailInput) {
  if (!hasSupabaseServiceRoleEnv || !supabaseUrl || !supabaseServiceRoleKey) {
    return {
      sent: false,
      configured: false,
      error: "Thiếu cấu hình SUPABASE_SERVICE_ROLE_KEY trong môi trường.",
    };
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // Gọi trực tiếp API Invite của Supabase
  // API này sẽ tự động kích hoạt gửi Email Template "Invite User" đã cấu hình trên Supabase Dashboard.
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(input.email, {
    redirectTo: input.redirectTo,
  });

  if (error) {
    return {
      sent: false,
      configured: true,
      error: error.message,
    };
  }

  return {
    sent: true,
    configured: true,
  };
}
