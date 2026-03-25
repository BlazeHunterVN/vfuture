"use client";

import { useState } from "react";
import { Image as IKImage } from "@imagekit/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  src?: string | null;
  alt: string;
  sizes?: string;
  frameClassName?: string;
  imageClassName?: string;
  aspectClassName?: string;
};

export function MediaFrame({
  src,
  alt,
  sizes = "100vw",
  frameClassName,
  imageClassName,
  aspectClassName = "aspect-[16/9]",
}: MediaFrameProps) {
  const [imageError, setImageError] = useState(false);
  const normalizedSrc = src?.trim();
  const isImageKitSource =
    normalizedSrc?.startsWith("https://ik.imagekit.io/veltrixmediagroup") ||
    normalizedSrc?.startsWith("/");

  // Show fallback if no src or image failed to load
  const showFallback = !normalizedSrc || imageError;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-none bg-transparent",
        aspectClassName,
        frameClassName,
      )}
    >
      {showFallback ? (
        <div className="absolute inset-0 border-2 border-dashed border-border flex items-center justify-center">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <span className="relative z-10 animate-pulse text-2xl font-bold uppercase tracking-[0.05em] text-foreground/40 select-none">
            ĐANG CẬP NHẬT
          </span>
        </div>
      ) : isImageKitSource ? (
        <IKImage
          src={normalizedSrc}
          alt={alt}
          loading="lazy"
          sizes={sizes}
          className={cn("absolute inset-0 h-full w-full object-cover", imageClassName)}
          onError={() => setImageError(true)}
        />
      ) : (
        <Image
          src={normalizedSrc}
          alt={alt}
          fill
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
