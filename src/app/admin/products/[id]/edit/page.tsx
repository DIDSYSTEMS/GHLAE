import ProductForm from "@/components/ProductForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  // Convert Prisma product to a plain object for the client component
  const plainProduct = {
    ...product,
    price: product.price.toString(), // Convert Float to string for input
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/admin/products"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-all mb-8 w-fit"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Edit <span className="text-accent">Product</span></h1>
        
        <ProductForm initialData={plainProduct} isEditing={true} />
      </div>
    </div>
  );
}
