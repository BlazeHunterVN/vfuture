"use client";

import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/common/media-frame";
import type { EventItem } from "@/lib/types/content";
import { formatVietnamDate } from "@/lib/utils/vietnam-time";

type EventModalProps = {
  event: EventItem | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

export function EventModal({ event, open, onOpenChange }: EventModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden border border-border bg-card p-0 text-foreground sm:max-w-2xl">
        {event ? (
          <div className="max-h-[92vh] overflow-y-auto">

            {/* Tiêu đề — Lớp 1 */}
            <div className="px-6 pb-4 pt-6">
              <DialogHeader>
                <DialogTitle className="text-center font-heading text-xl font-bold uppercase leading-snug tracking-[0.04em] text-foreground">
                  {event.title}
                </DialogTitle>
              </DialogHeader>
            </div>

            {/* Khung ảnh — Lớp 2 */}
            <div className="px-5">
              <div className="overflow-hidden rounded-[10px]">
                <MediaFrame
                  src={event.image_url}
                  alt={event.title}
                  sizes="100vw"
                  aspectClassName="aspect-[16/9]"
                  imageClassName="object-cover bg-black/5 dark:bg-black/15"
                />
              </div>
            </div>

            {/* Ngày + Button — Lớp 1 */}
            <div className="flex flex-col items-center gap-3 px-6 pb-6 pt-5 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
                NGÀY BẮT ĐẦU:{" "}
                <span className="font-normal text-muted-foreground">
                  {formatVietnamDate(event.start_date)}
                </span>
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
                NGÀY KẾT THÚC:{" "}
                <span className="font-normal text-muted-foreground">
                  {formatVietnamDate(event.end_date)}
                </span>
              </p>

              {event.link?.trim() ? (
                <Button asChild className="mt-1 h-10 w-full max-w-xs rounded-[10px]">
                  <a href={event.link} target="_blank" rel="noreferrer">
                    TRUY CẬP LIÊN KẾT
                    <ExternalLink className="ml-2 size-4" />
                  </a>
                </Button>
              ) : null}
            </div>

          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
