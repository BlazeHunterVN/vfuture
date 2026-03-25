import type { Metadata } from "next";
import { SectionHeading } from "@/components/common/section-heading";
import { EventsGrid } from "@/components/events/events-grid";
import { getEvents } from "@/lib/data/content-service";

export const metadata: Metadata = {
  title: "Sự Kiện",
  description: "Danh sách sự kiện dạng card, lọc trạng thái và lọc khoảng ngày từ - đến.",
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-8 pt-6 md:pt-8">
      <SectionHeading
        title="Toàn bộ sự kiện cộng đồng"
        description="Grid card hỗ trợ lọc trạng thái, lọc ngày bắt đầu - kết thúc và mở nhanh chi tiết."
      />
      <EventsGrid initialEvents={events} />
    </div>
  );
}
