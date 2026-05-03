import ServiceForm from "@/components/ServiceForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id }
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/admin/services"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-all mb-8 w-fit"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Services
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Edit <span className="text-accent">Service</span></h1>
        
        <ServiceForm initialData={service} isEditing={true} />
      </div>
    </div>
  );
}
