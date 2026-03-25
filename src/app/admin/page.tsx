import type { Metadata } from "next";
import { BarChart3, CalendarRange, Newspaper, Users } from "lucide-react";
import { ActiveAdminsPanel } from "@/components/admin/active-admins-panel";
import { StatsCard } from "@/components/admin/stats-card";
import { getDashboardStats } from "@/lib/data/content-service";

export const metadata: Metadata = {
  title: "Dashboard Quản Trị",
  description: "Tổng quan quản trị VFuture.",
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <section className="space-y-4">
      <div>
        <h1 className="font-heading text-3xl font-bold uppercase tracking-[0.08em] text-foreground">
          DASHBOARD
        </h1>
        <p className="text-sm text-muted-foreground">
          TỔNG QUAN NHANH VỀ NGƯỜI DÙNG, SỰ KIỆN, TIN TỨC VÀ LƯỢT XEM.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="NGƯỜI DÙNG" value={stats.users} icon={Users} />
        <StatsCard title="SỰ KIỆN" value={stats.events} icon={CalendarRange} />
        <StatsCard title="TIN TỨC" value={stats.news} icon={Newspaper} />
        <StatsCard title="LƯỢT XEM" value={stats.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} icon={BarChart3} />
      </div>

      <ActiveAdminsPanel />
    </section>
  );
}
