import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/products - Fetch all products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // AGRO, AUTO
    
    const products = await prisma.product.findMany({
      where: type ? { type } : {},
      orderBy: { createdAt: "desc" }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products - Create a product (Protected)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, category, price, unit, image, specs, type } = body;

    const product = await prisma.product.create({
      data: {
        name,
        category,
        price: parseFloat(price),
        unit,
        image,
        specs: specs || {},
        type
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
