import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/server/api-guard";
import { getStreams, updateStream } from "@/lib/server/stream-service";
import { extractYouTubeId } from "@/lib/utils/stream-utils";
import type { StreamStatus } from "@/lib/types/content";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function detectYouTubeStatus(youtubeUrl: string): Promise<StreamStatus | null> {
  const videoId = extractYouTubeId(youtubeUrl);
  if (!videoId || videoId.length !== 11) return null;

  // Ưu tiên YouTube Data API v3 nếu có key
  if (YOUTUBE_API_KEY) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = (await res.json()) as {
          items?: Array<{
            snippet?: { liveBroadcastContent?: string };
            liveStreamingDetails?: { actualEndTime?: string };
          }>;
        };
        const item = data.items?.[0];
        if (!item) return "ended";
        const liveContent = item.snippet?.liveBroadcastContent;
        if (liveContent === "live") return "live";
        if (liveContent === "upcoming") return "upcoming";
        if (item.liveStreamingDetails?.actualEndTime) return "ended";
        return null;
      }
    } catch { /* fallthrough */ }
  }

  // Fallback không cần API key: scrape oEmbed metadata
  try {
    const oembedRes = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { cache: "no-store" }
    );
    // Video không tồn tại hoặc bị xóa
    if (!oembedRes.ok) return "ended";

    // Fetch YouTube watch page để đọc liveBroadcastContent từ metadata
    const pageRes = await fetch(
      `https://www.youtube.com/watch?v=${videoId}`,
      {
        cache: "no-store",
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; VFutureBot/1.0)",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );

    if (pageRes.ok) {
      const html = await pageRes.text();
      // Check liveBroadcastContent trong JSON-LD hoặc ytInitialData
      if (html.includes('"liveBroadcastContent":"live"')) return "live";
      if (html.includes('"liveBroadcastContent":"upcoming"')) return "upcoming";
      if (html.includes('"liveBroadcastContent":"none"')) {
        // Đã kết thúc live hoặc video thường
        if (html.includes('"isLiveContent":true') || html.includes('"wasLive":true')) {
          return "ended";
        }
        return null; // Video thường, không phải stream
      }
    }
  } catch { /* ignore */ }

  return null;
}

export async function POST(request: NextRequest) {
  const limited = enforceRateLimit(request, { name: "streams-sync", limit: 20, windowMs: 60_000 });
  if (limited) return limited;

  const streams = await getStreams();
  const updates: string[] = [];

  await Promise.all(
    streams
      .filter((s) => s.youtube_url?.trim())
      .map(async (stream) => {
        const detected = await detectYouTubeStatus(stream.youtube_url);
        if (!detected || detected === stream.status) return;
        await updateStream(stream.id, { status: detected });
        updates.push(stream.id);
      })
  );

  return NextResponse.json({ synced: updates.length, updated: updates });
}
