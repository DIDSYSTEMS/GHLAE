import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [totalClicks, recentClicks, topItems] = await Promise.all([
      prisma.whatsAppClick.count(),
      prisma.whatsAppClick.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
      prisma.whatsAppClick.groupBy({
        by: ["itemName"],
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 5,
      }),
    ]);

    return NextResponse.json({ totalClicks, recentClicks, topItems });
  } catch {
    return NextResponse.json({ totalClicks: 0, recentClicks: [], topItems: [] });
  }
}
