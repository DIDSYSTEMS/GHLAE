import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/services/[id] - Fetch single service
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}

// PUT /api/services/[id] - Update service (Protected)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, icon, category } = body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        icon,
        category
      }
    });

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE /api/services/[id] - Delete service (Protected)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.service.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
