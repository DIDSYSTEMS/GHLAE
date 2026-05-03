"use client";

import { useEffect, useState } from "react";
import { MousePointerClick, TrendingUp, Clock, Package } from "lucide-react";
import AdminStatsCard from "@/components/AdminStatsCard";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface AnalyticsData {
  totalClicks: number;
  recentClicks: { id: string; itemName: string; pageUrl: string | null; createdAt: string }[];
  topItems: { itemName: string; _count: { id: number } }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); });
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition-all mb-8 w-fit">
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">WhatsApp <span className="text-secondary">Analytics</span></h1>
            <p className="text-gray-500 text-sm">Track which products and services generate the most WhatsApp inquiries.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <AdminStatsCard title="Total WhatsApp Clicks" value={data?.totalClicks ?? 0} icon={<MousePointerClick size={22} />} color="gold" delay={0} />
              <AdminStatsCard title="Top Items Tracked" value={data?.topItems.length ?? 0} icon={<TrendingUp size={22} />} color="green" delay={0.1} />
              <AdminStatsCard title="Recent Activity" value={data?.recentClicks.length ?? 0} icon={<Clock size={22} />} color="blue" delay={0.2} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Products */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h2 className="font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp size={18} className="text-secondary" /> Top Requested Items
                </h2>
                {data?.topItems.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8 text-center">No data yet. WhatsApp clicks will appear here.</p>
                ) : (
                  <div className="space-y-3">
                    {data?.topItems.map((item, i) => (
                      <div key={item.itemName} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-secondary border border-secondary/30 shrink-0"
                          style={{ background: "rgba(212,175,55,0.1)" }}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{item.itemName}</p>
                        </div>
                        <span className="text-secondary font-bold text-sm">{item._count.id} clicks</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Clicks */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h2 className="font-bold text-white mb-6 flex items-center gap-2">
                  <Clock size={18} className="text-blue-400" /> Recent WhatsApp Leads
                </h2>
                {data?.recentClicks.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8 text-center">No clicks recorded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {data?.recentClicks.map((click) => (
                      <div key={click.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                          <Package size={14} className="text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{click.itemName}</p>
                          <p className="text-xs text-gray-600 mt-0.5">{new Date(click.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
