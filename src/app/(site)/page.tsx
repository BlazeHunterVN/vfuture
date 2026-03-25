import type { Metadata } from "next";
import { EventJsonLd, OrganizationJsonLd } from "next-seo";
import { HeroBanner } from "@/components/home/hero-banner";
import { FeaturedEvents } from "@/components/home/featured-events";
import { LatestNews } from "@/components/home/latest-news";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { JoinCommunityCta } from "@/components/home/join-community-cta";
import {
  getEvents,
  getGalleryItems,
  getNews,
  getSettings,
} from "@/lib/data/content-service";
import { siteConfig } from "@/lib/constants/site";
import {
  buildSettingsMap,
  resolveHeroSliderSettings,
  resolveSocialLinks,
} from "@/lib/utils/site-settings";

export const metadata: Metadata = {
  title: "Trang Chủ",
  description: "Cộng đồng game fan-made hiện đại với event timeline, tin tức và gallery.",
};

export const revalidate = 60;

export default async function HomePage() {
  const [events, news, gallery, settings] = await Promise.all([
    getEvents(),
    getNews("published"),
    getGalleryItems(),
    getSettings(),
  ]);

  const settingsMap = buildSettingsMap(settings);
  const socialLinks = resolveSocialLinks(settingsMap);
  const heroSlider = resolveHeroSliderSettings(settingsMap);
  const latestEvents = [...events].sort((left, right) => new Date(right.start_date).getTime() - new Date(left.start_date).getTime());
  const latestNews = [...news].sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime());
  const latestGallery = [...gallery].sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime());

  const heroTitle = settingsMap["home.hero.title"];
  const activeEvent = latestEvents.find((item) => item.status === "active");

  return (
    <div className="space-y-14">
      <OrganizationJsonLd
        type="Organization"
        name={siteConfig.name}
        url={siteConfig.url}
        sameAs={[socialLinks.facebook, socialLinks.youtube, socialLinks.tiktok]}
      />

      {activeEvent ? (
        <EventJsonLd
          name={activeEvent.title}
          startDate={activeEvent.start_date}
          endDate={activeEvent.end_date}
          location="VFuture Hub"
          description={activeEvent.description || siteConfig.description}
          url={activeEvent.link ?? `${siteConfig.url}/calendar`}
          image={[activeEvent.image_url]}
        />
      ) : null}

      <HeroBanner
        heroTitle={heroTitle}
        desktopBackgroundUrls={heroSlider.desktopImages}
        mobileBackgroundUrls={heroSlider.mobileImages}
        sliderIntervalMs={heroSlider.intervalMs}
        transitionMs={heroSlider.transitionMs}
        transitionEffect={heroSlider.transitionEffect}
        activeEventCount={events.filter((item) => item.status === "active").length}
        publishedNewsCount={news.length}
      />
      <FeaturedEvents events={latestEvents} />
      <LatestNews news={latestNews} />
      <GalleryPreview gallery={latestGallery} />
      <JoinCommunityCta />
    </div>
  );
}
