import ProductForm from "@/components/ProductForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
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
        
        <h1 className="text-3xl font-bold mb-8">Add New <span className="text-accent">Product</span></h1>
        
        <ProductForm />
      </div>
    </div>
  );
}
