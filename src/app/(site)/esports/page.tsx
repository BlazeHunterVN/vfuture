import type { Metadata } from "next";
import { SectionHeading } from "@/components/common/section-heading";
import { StreamsGrid } from "@/components/esports/streams-grid";
import { getStreams } from "@/lib/server/stream-service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Esports",
  description: "Xem trực tiếp và theo dõi các buổi phát sóng ESPORTS của cộng đồng VFuture.",
};

export default async function EsportsPage() {
  const streams = await getStreams().catch(() => []);

  return (
    <div className="space-y-8 pt-6 md:pt-8">
      <SectionHeading
        title="ESPORTS"
        description="THEO DÕI CÁC BUỔI PHÁT TRỰC TIẾP VÀ SỰ KIỆN ESPORTS CỦA CỘNG ĐỒNG."
      />
      <StreamsGrid initialStreams={streams} />
    </div>
  );
}
