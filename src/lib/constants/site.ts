export const siteConfig = {
  name: "VFuture",
  shortName: "VFuture",
  description:
    "Cộng đồng game fan-made với lịch sự kiện, tin tức, gallery và hệ thống quản trị hiện đại theo phong cách Free Fire.",
  url: "https://vfuture.vercel.app",
  productionUrl: "https://vfuture.vercel.app",
  ogImage: "/og-image.png",
  favicon: "https://ik.imagekit.io/veltrixmediagroup/vfuture/20262203/f20262203?updatedAt=1774193443308",
  sidebarIcon: "https://ik.imagekit.io/veltrixmediagroup/vfuture/20262203/f20262203?updatedAt=1774193443308",
  links: {
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
  },
  contactEmail: "blazehunter01062008@gmail.com",
} as const;

export const navItems = [
  { title: "TRANG CHỦ", href: "/" },
  { title: "LỊCH", href: "/calendar" },
  { title: "SỰ KIỆN", href: "/events" },
  { title: "TIN TỨC", href: "/news" },
  { title: "LIÊN HỆ", href: "/contact" },
] as const;

export const adminNavItems = [
  { title: "DASHBOARD", href: "/admin" },
  { title: "SỰ KIỆN", href: "/admin/events" },
  { title: "TIN TỨC", href: "/admin/news" },
  { title: "THƯ VIỆN", href: "/admin/gallery" },
  { title: "NGƯỜI DÙNG", href: "/admin/users" },
  { title: "NHẬT KÝ", href: "/admin/logs" },
  { title: "CÀI ĐẶT", href: "/admin/settings" },
] as const;
