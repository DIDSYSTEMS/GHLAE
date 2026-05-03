import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/services - Fetch all services
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category"); // LOGISTICS, AGRO
    
    const services = await prisma.service.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" }
    });
    
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST /api/services - Create a service (Protected)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, icon, category } = body;

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        category
      }
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
