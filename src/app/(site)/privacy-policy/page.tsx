import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật",
  description: "Chính sách bảo mật và bảo vệ dữ liệu người dùng của VFuture — dự án cộng đồng fan-made Free Fire.",
};

const modules = [
  {
    icon: "🎯",
    title: "1. Sứ Mệnh & Mục Tiêu",
    intro: "VFuture là dự án cộng đồng phi lợi nhuận, chuyên theo dõi sự kiện, tin tức và nội dung nổi bật của Free Fire Việt Nam.",
    items: [
      {
        strong: "Lưu Trữ Media",
        text: "Cơ sở dữ liệu tập trung cho các banner, poster và tài sản hình ảnh sự kiện.",
      },
      {
        strong: "Nguồn Lực Cộng Đồng",
        text: "Cung cấp tài liệu tham khảo chất lượng cao cho người chơi và người yêu thích nội dung Free Fire.",
      },
    ],
  },
  {
    icon: "🛡️",
    title: "2. Cam Kết Bảo Mật Dữ Liệu",
    intro: "Chúng tôi vận hành theo chính sách bảo vệ tối đa cho người dùng của mình.",
    items: [
      {
        strong: "Không Yêu Cầu Tài Khoản Bắt Buộc",
        text: "Bạn có thể trải nghiệm toàn bộ nội dung mà không cần đăng ký. Đăng nhập chỉ dành cho quản trị viên.",
      },
      {
        strong: "Không Thu Thập Thông Tin Cá Nhân Tùy Tiện",
        text: "Chúng tôi không bao giờ yêu cầu số điện thoại, mật khẩu Garena hoặc thông tin nhạy cảm của bạn.",
      },
      {
        strong: "Hệ Thống Bảo Mật Cao",
        text: "Quyền truy cập quản trị được bảo vệ bởi xác thực và mã hóa cấp cao thông qua Supabase.",
      },
    ],
  },
  {
    icon: "📋",
    title: "3. Quản Lý Nội Dung",
    intro: "Nội dung trên VFuture được kiểm duyệt bởi đội ngũ quản trị chuyên trách.",
    items: [
      {
        strong: "Nguồn Xác Minh",
        text: "Thông tin được lấy từ các nhà phát hành chính thức và nguồn cộng đồng uy tín.",
      },
      {
        strong: "Chỉ Mang Tính Thông Tin",
        text: "Lịch sự kiện có thể thay đổi mà không báo trước; luôn tham khảo kênh chính thức để cập nhật mới nhất.",
      },
    ],
  },
  {
    icon: "⚖️",
    title: "4. Trạng Thái Pháp Lý",
    intro: "VFuture hoạt động như một trang lưu trữ truyền thông độc lập do cộng đồng điều hành.",
    items: [
      {
        strong: "Không Liên Kết Chính Thức",
        text: "Chúng tôi không phải đối tác, nhân viên hay đại diện của Garena hoặc bất kỳ tổ chức nào.",
      },
      {
        strong: "Hoàn Toàn Vì Cộng Đồng",
        text: "Không phí, không quảng cáo thương mại, không theo dõi dữ liệu vì mục đích thương mại.",
      },
    ],
  },
  {
    icon: "✉️",
    title: "5. Quyền Của Người Dùng",
    intro: "Chúng tôi tôn trọng quyền riêng tư và minh bạch với người dùng.",
    items: [
      {
        strong: "Yêu Cầu Chỉnh Sửa / Xóa Dữ Liệu",
        text: "Bạn có thể yêu cầu chỉnh sửa hoặc xóa thông tin liên hệ đã gửi qua các kênh chính thức.",
      },
      {
        strong: "Nhà Cung Cấp Hạ Tầng",
        text: "Dữ liệu có thể được xử lý bởi Vercel hoặc Supabase theo điều khoản riêng của họ.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pt-6 md:pt-10">

      {/* Hero */}
      <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#000] to-[#1a1a2e] px-8 py-10 text-center text-white shadow-[0_24px_56px_rgba(0,0,0,0.18)]">
        <h1 className="font-heading text-3xl font-extrabold uppercase tracking-[0.04em] text-white md:text-4xl">
          Chính Sách Bảo Mật
        </h1>
        <div className="mt-3 flex items-center justify-center gap-5 text-sm text-white/60">
          <span>📅 Cập nhật 28/01/2026</span>
          <span>🔒 Tài liệu chính thức</span>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
          Chào mừng bạn đến với <strong className="text-white">VFuture</strong>. Trang này trình bày
          các cam kết bảo mật và quyền riêng tư của chúng tôi dành cho cộng đồng.
        </p>
      </div>

      {/* Modules */}
      <div className="space-y-6">
        {modules.map((mod) => (
          <div key={mod.title} className="glass-card space-y-4 rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="policy-module-icon">
                <span role="img" aria-label={mod.title}>{mod.icon}</span>
              </div>
              <h2 className="font-heading text-lg font-bold uppercase tracking-[0.04em] text-foreground">
                {mod.title}
              </h2>
            </div>

            {mod.intro && (
              <p className="pl-[3.75rem] text-sm leading-relaxed text-muted-foreground">
                {mod.intro}
              </p>
            )}

            <div className="space-y-2 pl-[3.75rem]">
              {mod.items.map((item) => (
                <div key={item.strong} className="policy-item">
                  <span className="mt-0.5 text-primary dark:text-amber-400">✦</span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.06em] text-foreground">
                      {item.strong}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
