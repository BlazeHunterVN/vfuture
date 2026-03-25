"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import type { GalleryItem } from "@/lib/types/content";

type GalleryPreviewProps = {
  gallery: GalleryItem[];
};

export function GalleryPreview({ gallery }: GalleryPreviewProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (imageUrl: string) => {
    setFailedImages((prev) => new Set(prev).add(imageUrl));
  };

  return (
    <section className="space-y-6">
      <SectionHeading
        title="Khoảnh khắc cộng đồng"
        description="Masonry layout tối ưu mobile, hover zoom mượt và dễ mở rộng."
      />
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 xl:columns-3">
        {gallery.slice(0, 3).map((item, index) => {
          const isFailed = failedImages.has(item.image_url);

          return (
            <Reveal key={item.id} delay={index * 0.06} className="break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-[14px] border bg-white p-2 transition-all dark:border-border dark:bg-card">
                <div className="grid-sheen pointer-events-none absolute inset-y-0 left-0 z-30" />
                <div className="relative overflow-hidden rounded-[8px] bg-background">
                  {isFailed ? (
                    <div className="flex h-56 items-center justify-center bg-muted">
                      <div className="media-updating text-xs">Updating...</div>
                    </div>
                  ) : (
                    <Image
                      src={item.image_url}
                      alt={item.tag}
                      width={800}
                      height={900}
                      className="h-auto w-full object-cover transition duration-500 group-hover:scale-110"
                      onError={() => handleImageError(item.image_url)}
                    />
                  )}
                </div>
                <figcaption className="pointer-events-none absolute inset-x-2 bottom-2 z-10 rounded-b-[8px] bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-center text-xs font-bold uppercase tracking-[0.1em] text-white">
                  {item.tag}
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}



