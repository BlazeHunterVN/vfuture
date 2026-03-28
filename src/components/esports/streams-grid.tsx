"use client";

import { useState, useEffect, useRef } from "react";
import { Radio } from "lucide-react";
import { StreamModal } from "@/components/esports/stream-modal";
import { EmptyState } from "@/components/common/empty-state";
import { cn } from "@/lib/utils";
import type { StreamItem, StreamStatus } from "@/lib/types/content";
import { useQuery } from "@tanstack/react-query";
import { buildEmbedUrl } from "@/lib/utils/stream-utils";

async function fetchStreams(): Promise<StreamItem[]> {
  const res = await fetch("/api/streams", { cache: "no-store" });
  if (!res.ok) throw new Error("Unable to load streams.");
  const data = (await res.json()) as { streams: StreamItem[] };
  return data.streams;
}

type StreamsGridProps = {
  initialStreams: StreamItem[];
};

const statusCardClass: Record<StreamStatus, string> = {
  live: "border-[#FF0000]/70 hover:border-[#FF0000]",
  upcoming: "border-[#4CAF50]/70 hover:border-[#4CAF50]",
  ended: "border-border hover:border-muted-foreground",
};

const statusBadgeClass: Record<StreamStatus, string> = {
  live: "bg-[#FF0000] text-white",
  upcoming: "bg-[#4CAF50] text-white",
  ended: "bg-muted text-muted-foreground",
};

const statusLabel: Record<StreamStatus, string> = {
  live: "TRỰC TIẾP",
  upcoming: "SẮP DIỄN RA",
  ended: "ĐÃ KẾT THÚC",
};

export function StreamsGrid({ initialStreams }: StreamsGridProps) {
  const { data: streams = initialStreams } = useQuery({
    queryKey: ["streams"],
    queryFn: fetchStreams,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });

  const [selectedStream, setSelectedStream] = useState<StreamItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Auto-sync YouTube status mỗi 60s
  useEffect(() => {
    const sync = () => fetch("/api/streams/sync", { method: "POST" }).catch(() => null);
    sync();
    const interval = setInterval(sync, 60_000);
    return () => clearInterval(interval);
  }, []);

  const visibleStreams = streams.filter((s: StreamItem) => s.status !== "ended");

  if (visibleStreams.length === 0) {
    return (
      <EmptyState
        title="CHƯA CÓ STREAM NÀO"
        description="Các buổi phát trực tiếp sắp tới sẽ xuất hiện ở đây."
      />
    );
  }

  return (
    <>
      {selectedStream && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedStream(null)}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleStreams.map((stream: StreamItem) => (
          <article
            key={stream.id}
            onClick={() => setSelectedStream(stream)}
            onMouseEnter={() => setHoveredId(stream.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              "group relative flex cursor-pointer flex-col overflow-hidden rounded-[14px] border bg-white px-4 pt-4 pb-2 transition-all duration-300 dark:bg-card",
              statusCardClass[stream.status],
              selectedStream && "opacity-40 scale-[0.98]",
            )}
          >
            <div className="grid-sheen pointer-events-none absolute inset-y-0 left-0 z-20" />
            <div className="relative overflow-hidden rounded-[8px]">
              <div className="aspect-video w-full overflow-hidden rounded-[8px] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stream.thumbnail_url}
                  alt={stream.title}
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <span className={cn(
                "absolute right-0 top-0 z-10 inline-flex items-center gap-1.5 rounded-[6px] px-[7px] py-3 text-[0.8rem] font-bold uppercase shadow-sm",
                statusBadgeClass[stream.status],
              )}>
                {stream.status === "live" && <Radio className="size-3 animate-pulse" />}
                {statusLabel[stream.status]}
              </span>
            </div>

            <div className="flex flex-1 items-center justify-center p-3 text-center">
              <h3 className="font-heading text-[0.95rem] font-bold uppercase tracking-[0.04em] text-[#0052ff] dark:text-amber-400 line-clamp-1">
                {stream.title}
              </h3>
            </div>
          </article>
        ))}
      </div>

      <StreamModal
        stream={selectedStream}
        open={Boolean(selectedStream)}
        onOpenChange={(open) => { if (!open) setSelectedStream(null); }}
      />

      {/* Preload iframe ẩn khi hover để giảm độ trễ khi click */}
      {hoveredId && (() => {
        const s = visibleStreams.find((x: StreamItem) => x.id === hoveredId);
        if (!s || s.status === "upcoming") return null;
        return (
          <iframe
            key={hoveredId}
            src={buildEmbedUrl(s.youtube_url).replace("autoplay=1", "autoplay=0")}
            className="pointer-events-none absolute opacity-0 h-0 w-0"
            aria-hidden
            tabIndex={-1}
            title="preload"
          />
        );
      })()}
    </>
  );
}
