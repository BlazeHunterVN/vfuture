import type { SiteSetting } from "@/lib/types/content";
import { siteConfig } from "@/lib/constants/site";

export type HeroSliderEffect = "fade" | "zoom" | "slide" | "drift" | "cinematic";

export const defaultSiteSettingValues: Record<string, string> = {
  "home.hero.title": "VFuture",
  "home.background.desktop_urls":
    "https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/20263/697b5d2e34ac088f5b5a4427d57f6281.jpg",
  "home.background.mobile_urls":
    "https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/20263/0680c1792156b8a80095c669520f019a.jpg",
  "home.background.interval_seconds": "5",
  "home.background.transition_seconds": "1",
  "home.background.transition_effect": "fade",
  "home.background.desktop_url":
    "https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/20263/697b5d2e34ac088f5b5a4427d57f6281.jpg",
  "home.background.mobile_url":
    "https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/20263/0680c1792156b8a80095c669520f019a.jpg",
  "seo.default_title": siteConfig.name,
  "site.experimental_mode": "false",
  "social.facebook_url": siteConfig.links.facebook,
  "social.tiktok_url": siteConfig.links.tiktok,
  "social.youtube_url": siteConfig.links.youtube,
  "social.email": siteConfig.contactEmail,
  "site.description": "Mạng lưới cộng đồng số 1 về cung cấp thông tin, theo dõi sự kiện và các nội dung từ Garena Free Fire Việt Nam.",
};

export function buildSettingsMap(settings: SiteSetting[]) {
  return settings.reduce<Record<string, string>>((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, { ...defaultSiteSettingValues });
}

export function resolveSocialLinks(settingsMap: Record<string, string>) {
  return {
    facebook: settingsMap["social.facebook_url"] || siteConfig.links.facebook,
    tiktok: settingsMap["social.tiktok_url"] || siteConfig.links.tiktok,
    youtube: settingsMap["social.youtube_url"] || siteConfig.links.youtube,
    email: settingsMap["social.email"] || siteConfig.contactEmail,
  };
}

function parseSliderImages(rawValue?: string) {
  return (rawValue ?? "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function parseSeconds(rawValue: string | undefined, fallback: number, min: number, max: number) {
  const parsed = Number.parseFloat(rawValue ?? "");
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, parsed));
}

export function resolveHeroSliderSettings(settingsMap: Record<string, string>) {
  const desktopImages =
    parseSliderImages(settingsMap["home.background.desktop_urls"]).length > 0
      ? parseSliderImages(settingsMap["home.background.desktop_urls"])
      : parseSliderImages(settingsMap["home.background.desktop_url"]);

  const mobileImages =
    parseSliderImages(settingsMap["home.background.mobile_urls"]).length > 0
      ? parseSliderImages(settingsMap["home.background.mobile_urls"])
      : parseSliderImages(settingsMap["home.background.mobile_url"]);

  const effect = settingsMap["home.background.transition_effect"];
  const transitionEffect: HeroSliderEffect =
    effect === "zoom" ||
    effect === "slide" ||
    effect === "drift" ||
    effect === "cinematic" ||
    effect === "fade"
      ? effect
      : "fade";

  return {
    desktopImages,
    mobileImages: mobileImages.length > 0 ? mobileImages : desktopImages,
    intervalMs: parseSeconds(settingsMap["home.background.interval_seconds"], 5, 2, 30) * 1000,
    transitionMs: parseSeconds(settingsMap["home.background.transition_seconds"], 1, 0.4, 5) * 1000,
    transitionEffect,
  };
}
