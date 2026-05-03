"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Edit2, Loader2, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesListPage() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredServices = services.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === "ALL" || s.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage <span className="text-accent">Services</span></h1>
          <p className="text-gray-400 text-sm">Update your service offerings and logistics details.</p>
        </div>
        <Link 
          href="/admin/services/new"
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl transition-all font-bold w-fit"
        >
          <Plus className="w-5 h-5" />
          Add New Service
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111] border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent/50 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#111] border border-white/5 rounded-xl py-3 pl-10 pr-8 focus:outline-none focus:border-accent/50 transition-all appearance-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="LOGISTICS">Logistics</option>
            <option value="AGRO">Agro</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-12 h-12 text-accent animate-spin" />
          <p className="text-gray-400">Loading services...</p>
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-accent/30 transition-all flex items-start gap-6 group"
            >
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2 py-1 rounded border border-accent/20">
                    {service.category}
                  </span>
                  <h3 className="font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{service.description}</p>
                <Link 
                  href={`/admin/services/${service.id}/edit`}
                  className="flex items-center gap-2 text-accent text-xs font-bold hover:underline"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit Service
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-[#111] rounded-3xl border border-white/5 border-dashed">
          <Truck className="w-16 h-16 text-gray-700 mb-4" />
          <h3 className="text-xl font-bold mb-1">No services found</h3>
        </div>
      )}
    </div>
  );
}
