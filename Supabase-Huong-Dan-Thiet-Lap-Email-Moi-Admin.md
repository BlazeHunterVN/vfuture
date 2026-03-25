# HƯỚNG DẪN THIẾT LẬP EMAIL "MỜI ADMIN" TRỰC TIẾP TRÊN SUPABASE

Nếu bạn muốn sử dụng tính năng **Mời người dùng** mặc định của Supabase thay vì thông qua Resend API, bạn cần thay đổi giao diện ở tab **Invite User** trong Supabase Dashboard. 

Dưới đây là giao diện cực kỳ hiện đại được căn chỉnh riêng cho nội dung thư mời.

---

## BƯỚC 1: TRUY CẬP SUPABASE EMAIL TEMPLATES
1. Truy cập **Supabase Dashboard** -> Vào dự án VFuture.
2. Tại menu bên trái, chọn **Authentication** -> **Email Templates**.
3. Di chuyển dải tùy chọn sang mục 👉 **Invite user**.

## BƯỚC 2: CẬP NHẬT GIAO DIỆN
- **Subject (Tiêu đề)**: Bạn cấu hình là `Lời Mời Tạo Tài Khoản Quản Trị VFuture`
- **Message Body (Nội dung)**: **BẤM SANG TAB `< >` (Dạng mã HTML)** và dán toàn bộ đoạn mã cực đẹp bên dưới:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Lời Mời Tạo Tài Khoản Quản Trị</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f1f5f9; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 520px; margin: 0 auto; background-color: #ffffff; padding: 48px 32px; border-radius: 16px; box-shadow: 0 12px 32px rgba(15, 23, 42, 0.04); text-align: center; border: 1px solid #e2e8f0;">
      
      <!-- Logo VFuture -->
      <img src="https://ik.imagekit.io/veltrixmediagroup/vfuture/20262203/b20262203.png?updatedAt=1774193355414" alt="VFuture Logo" style="width: 72px; height: 72px; margin-bottom: 24px; display: block; margin-left: auto; margin-right: auto;">
      
      <!-- Tiêu đề -->
      <h1 style="color: #0f172a; font-size: 26px; font-weight: 800; margin: 0 0 16px; letter-spacing: -0.02em;">Lời Mời Quản Trị Viên</h1>
      
      <!-- Thông điệp -->
      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 40px; text-align: left;">
          Xin chào,<br><br>
          Email của bạn vừa được chỉ định để khởi tạo tài khoản quản trị trên hệ thống Garena Free Fire - VFuture. Vui lòng nhấp vào nút bên dưới để hoàn tất việc thiết lập tài khoản và mật khẩu của bạn:
      </p>
      
      <!-- Nút Tạo Tài Khoản -->
      <div style="margin-bottom: 40px;">
          <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: linear-gradient(135deg, #0052ff 0%, #4d7cff 100%); color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; padding: 16px 36px; border-radius: 12px; box-shadow: 0 8px 16px rgba(0, 82, 255, 0.25); letter-spacing: 0.5px;">
              TẠO TÀI KHOẢN KẾT NỐI
          </a>
      </div>

      <div style="text-align: left; background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          <p style="color: #64748b; font-size: 13px; margin: 0 0 8px; font-weight: 600; text-transform: uppercase;">Lưu Ý Quan Trọng:</p>
          <ul style="color: #475569; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Đây là lời mời bảo mật, vui lòng không chuyển tiếp email này.</li>
              <li>Lời mời này sẽ hết hạn trong 24 giờ.</li>
          </ul>
      </div>
      
      <div style="border-top: 1px solid #e2e8f0; margin: 40px 0 24px;"></div>
      
      <!-- Chân thư bản quyền -->
      <div style="text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 4px;">© 2026 Veltrix Media Group.</p>
          <p style="color: #cbd5e1; font-size: 12px; margin: 0;">Nếu bạn chưa từng yêu cầu quyền quản trị, vui lòng báo cáo hoặc bỏ qua email này một cách an toàn.</p>
      </div>
  </div>
</body>
</html>
```

## BƯỚC 3: LƯU LẠI
Nhấn nút **Save** ở cuối trang. Lúc này khi sử dụng API Invite User của Supabase thì email sẽ được trình bày bằng Giao Diện Tuyệt Đẹp này!
