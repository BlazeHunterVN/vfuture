import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng",
  description: "Điều khoản sử dụng của VFuture — hiểu rõ quyền sở hữu trí tuệ, trách nhiệm người dùng và các tuyên bố miễn trừ trách nhiệm.",
};

const modules = [
  {
    icon: "©️",
    title: "1. Quyền Sở Hữu Trí Tuệ (Garena)",
    intro: "Đây là quy định quan trọng nhất liên quan đến toàn bộ nội dung trên VFuture.",
    items: [
      {
        strong: "Tôn Trọng Bản Quyền",
        text: "Tất cả hình ảnh, logo, nhân vật và tài sản liên quan đều là tài sản duy nhất của Garena Free Fire.",
      },
      {
        strong: "Không Xác Nhận Quyền Sở Hữu",
        text: "VFuture tuyên bố rõ ràng rằng chúng tôi KHÔNG sở hữu bản quyền đối với bất kỳ tài sản nào được đăng tải.",
      },
      {
        strong: "Sử Dụng Phi Thương Mại",
        text: "Tài liệu chỉ dùng để chia sẻ cộng đồng. Nghiêm cấm mọi hành vi sao chép, tái phân phối thương mại trái phép.",
      },
    ],
  },
  {
    icon: "👤",
    title: "2. Trách Nhiệm Người Dùng",
    intro: "Người dùng phải sử dụng trang web và tài nguyên một cách có trách nhiệm.",
    items: [
      {
        strong: "Sử Dụng Được Phép",
        text: "Chỉ dành cho mục đích cá nhân, giáo dục và tham khảo thông tin. Không được dùng cho mục đích thương mại.",
      },
      {
        strong: "Tính Toàn Vẹn Nền Tảng",
        text: "Người dùng không được gây gián đoạn dịch vụ, tấn công hệ thống hoặc sử dụng trang web cho các hoạt động bất hợp pháp.",
      },
    ],
  },
  {
    icon: "⚠️",
    title: "3. Tuyên Bố Từ Chối Trách Nhiệm",
    intro: null,
    items: [
      {
        strong: "Độ Chính Xác Thông Tin",
        text: "Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, chúng tôi không bảo đảm tuyệt đối do các cập nhật theo khu vực có thể thay đổi.",
      },
      {
        strong: "Rủi Ro Kỹ Thuật",
        text: "Chúng tôi không chịu trách nhiệm cho các tổn thất phát sinh từ việc sử dụng trang web hoặc lỗi kết nối kỹ thuật.",
      },
    ],
  },
  {
    icon: "🔗",
    title: "4. Kết Nối Bên Thứ Ba",
    intro: "Trang web có thể chứa liên kết đến các trang chính thức của Garena hoặc tài liệu giải đấu.",
    items: [
      {
        strong: "Không Kiểm Soát Bên Thứ Ba",
        text: "Chúng tôi không quản lý nội dung hoặc chính sách bảo mật của bất kỳ trang web bên thứ ba nào được liên kết.",
      },
    ],
  },
  {
    icon: "📝",
    title: "5. Sửa Đổi Chính Sách",
    intro: "VFuture bảo lưu quyền sửa đổi nội dung hoặc chấm dứt hoạt động mà không cần báo trước.",
    items: [
      {
        strong: "Yêu Cầu Bản Quyền",
        text: "Đại diện của Garena hoặc các bên liên quan có thể liên hệ qua kênh hỗ trợ chính thức để yêu cầu gỡ bỏ tài sản vi phạm.",
      },
      {
        strong: "Cập Nhật Điều Khoản",
        text: "Sử dụng tiếp tục sau khi các thay đổi được đăng tải đồng nghĩa với việc bạn chấp nhận các điều khoản mới.",
      },
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pt-6 md:pt-10">

      {/* Hero */}
      <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#000] to-[#1a1a2e] px-8 py-10 text-center text-white shadow-[0_24px_56px_rgba(0,0,0,0.18)]">
        <h1 className="font-heading text-3xl font-extrabold uppercase tracking-[0.04em] text-white md:text-4xl">
          Điều Khoản Sử Dụng
        </h1>
        <div className="mt-3 flex items-center justify-center gap-5 text-sm text-white/60">
          <span>📅 Cập nhật 28/01/2026</span>
          <span>🔒 Tài liệu chính thức</span>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
          Bằng cách sử dụng <strong className="text-white">VFuture</strong>, bạn đồng ý với các
          điều kiện sau. Vui lòng đọc kỹ để đảm bảo sử dụng nền tảng đúng cách.
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
