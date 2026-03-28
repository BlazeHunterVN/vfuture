import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/server/api-guard";
import { getStreams, updateStream } from "@/lib/server/stream-service";
import { extractYouTubeId } from "@/lib/utils/stream-utils";
import type { StreamStatus } from "@/lib/types/content";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function detectYouTubeStatus(youtubeUrl: string): Promise<StreamStatus | null> {
  const videoId = extractYouTubeId(youtubeUrl);
  if (!videoId || videoId.length !== 11) return null;

  // Dùng YouTube Data API v3 nếu có key — chính xác nhất
  if (YOUTUBE_API_KEY) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`,
        { next: { revalidate: 0 } }
      );
      if (!res.ok) return null;
      const data = (await res.json()) as {
        items?: Array<{
          snippet?: { liveBroadcastContent?: string };
          liveStreamingDetails?: { actualEndTime?: string };
        }>;
      };
      const item = data.items?.[0];
      if (!item) return "ended"; // Video không tồn tại

      const liveContent = item.snippet?.liveBroadcastContent;
      if (liveContent === "live") return "live";
      if (liveContent === "upcoming") return "upcoming";
      // "none" = video thường hoặc live đã kết thúc
      if (item.liveStreamingDetails?.actualEndTime) return "ended";
      return null; // Video thường, không phải stream
    } catch {
      // Fallback về thumbnail trick
    }
  }

  // Fallback: thumbnail trick (ít chính xác hơn)
  try {
    const oembedRes = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { next: { revalidate: 0 } }
    );
    if (!oembedRes.ok) return "ended";

    const liveThumbRes = await fetch(
      `https://i.ytimg.com/vi/${videoId}/hqdefault_live.jpg`,
      { method: "HEAD", next: { revalidate: 0 } }
    );
    if (liveThumbRes.ok) return "live";
  } catch {
    // ignore
  }

  return null;
}

export async function POST(request: NextRequest) {
  const limited = enforceRateLimit(request, { name: "streams-sync", limit: 10, windowMs: 60_000 });
  if (limited) return limited;

  const streams = await getStreams();
  const updates: string[] = [];

  await Promise.all(
    streams
      .filter((s) => s.status !== "ended") // Bỏ qua đã kết thúc
      .map(async (stream) => {
        const detected = await detectYouTubeStatus(stream.youtube_url);
        if (!detected || detected === stream.status) return;
        await updateStream(stream.id, { status: detected });
        updates.push(stream.id);
      })
  );

  return NextResponse.json({ synced: updates.length, updated: updates });
}
