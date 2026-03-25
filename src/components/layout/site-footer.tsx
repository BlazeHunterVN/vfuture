import Link from "next/link";
import Image from "next/image";
import {
  FacebookBrandIcon,
  GmailBrandIcon,
  TiktokBrandIcon,
  YoutubeBrandIcon,
} from "@/components/common/brand-icons";
import { getSettings } from "@/lib/data/content-service";
import { siteConfig } from "@/lib/constants/site";
import { buildSettingsMap, resolveSocialLinks } from "@/lib/utils/site-settings";

const LOGO_LIGHT = "https://ik.imagekit.io/veltrixmediagroup/vfuture/20262203/b20262203?updatedAt=1774193355414";
const LOGO_DARK  = "https://ik.imagekit.io/veltrixmediagroup/vfuture/20262203/w20262203?updatedAt=1774193489095";

const footerNav = [
  { label: "Trang Chủ", href: "/" },
  { label: "Lịch", href: "/calendar" },
  { label: "Sự Kiện", href: "/events" },
  { label: "Tin Tức", href: "/news" },
  { label: "Liên Hệ", href: "/contact" },
];

const footerLegal = [
  { label: "Chính Sách Bảo Mật", href: "/privacy-policy" },
  { label: "Điều Khoản Sử Dụng", href: "/terms-of-use" },
];

export async function SiteFooter() {
  const settingsMap = buildSettingsMap(await getSettings());
  const resolvedSocialLinks = resolveSocialLinks(settingsMap);

  const socialLinks = [
    { label: "Facebook", href: resolvedSocialLinks.facebook, icon: FacebookBrandIcon },
    { label: "TikTok",   href: resolvedSocialLinks.tiktok,   icon: TiktokBrandIcon  },
    { label: "YouTube",  href: resolvedSocialLinks.youtube,  icon: YoutubeBrandIcon },
    {
      label: "Gmail",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(resolvedSocialLinks.email)}`,
      icon: GmailBrandIcon,
    },
  ] as const;

  return (
    <footer className="relative mt-12 border-t-2 border-border/80 bg-white dark:bg-[#07090b]">
      {/* Premium Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary dark:via-amber-400 to-transparent opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col items-start space-y-5 lg:pr-4">
            <div className="flex items-center gap-3">
              <Image
                src={LOGO_LIGHT}
                alt="VFuture"
                width={56}
                height={56}
                className="block drop-shadow-[0_4px_12px_rgba(0,82,255,0.15)] dark:hidden"
              />
              <Image
                src={LOGO_DARK}
                alt="VFuture"
                width={56}
                height={56}
                className="hidden drop-shadow-[0_4px_12px_rgba(247,147,26,0.2)] dark:block"
              />
              <span className="font-heading text-3xl font-black tracking-[0.05em] text-foreground">
                VFUTURE
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-muted-foreground text-justify">
              {settingsMap["site.description"]}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col space-y-5">
            <h3 className="font-heading text-lg font-bold uppercase tracking-[0.1em] text-primary dark:text-amber-400">
              Điều Hướng
            </h3>
            <ul className="flex flex-col space-y-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/40 transition-all group-hover:bg-primary dark:bg-amber-400/40 dark:group-hover:bg-amber-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div className="flex flex-col space-y-5">
            <h3 className="font-heading text-lg font-bold uppercase tracking-[0.1em] text-primary dark:text-amber-400">
              Pháp Lý
            </h3>
            <ul className="flex flex-col space-y-3">
              {footerLegal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/40 transition-all group-hover:bg-primary dark:bg-amber-400/40 dark:group-hover:bg-amber-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-2 pt-2">
              <p className="text-[14px] font-medium text-muted-foreground">
                <strong className="text-foreground">Email:</strong> {resolvedSocialLinks.email}
              </p>
              <p className="mt-1 text-[14px] font-medium text-muted-foreground">
                <strong className="text-foreground">Website:</strong> {siteConfig.url}
              </p>
            </div>
          </div>

          {/* Col 4: Social Connections */}
          <div className="flex flex-col space-y-5">
            <h3 className="font-heading text-lg font-bold uppercase tracking-[0.1em] text-primary dark:text-amber-400">
              Kết Nối
            </h3>
            <p className="text-[14px] text-muted-foreground">
              Theo dõi chúng tôi trên các nền tảng mạng xã hội để không bỏ lỡ thông tin mới nhất.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-slate-100 text-slate-700 transition hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-amber-400 dark:hover:text-[#0f172a]"
                  >
                    <Icon className="size-5" />
                  </Link>
                );
              })}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 h-px w-full bg-border/60" />

        {/* Bottom Copyright Area */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-[15px] font-bold text-foreground">
            © 2026 Veltrix Media Group. All Rights Reserved.
          </p>
          <p className="text-[14px] font-semibold text-muted-foreground">
            All images and related assets are the property of Garena Free Fire Vietnam.
          </p>
        </div>

      </div>
    </footer>
  );
}
