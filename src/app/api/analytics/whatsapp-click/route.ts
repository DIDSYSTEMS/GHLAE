import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userAgent = req.headers.get("user-agent") || "unknown";

    await prisma.whatsAppClick.create({
      data: {
        productId: body.productId || null,
        itemName: body.itemName || "Unknown",
        phone: body.phone || "",
        pageUrl: body.pageUrl || null,
        userAgent,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    // Non-blocking — log failure silently
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
