import ServiceForm from "@/components/ServiceForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewServicePage() {
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
        
        <h1 className="text-3xl font-bold mb-8">Add New <span className="text-accent">Service</span></h1>
        
        <ServiceForm />
      </div>
    </div>
  );
}
