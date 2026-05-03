"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Edit2, Trash2, Loader2, Package } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductsListPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "ALL" || p.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage <span className="text-accent">Products</span></h1>
          <p className="text-gray-400 text-sm">Add, edit, or remove products from your catalog.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl transition-all font-bold w-fit"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111] border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent/50 transition-all"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-[#111] border border-white/5 rounded-xl py-3 pl-10 pr-8 focus:outline-none focus:border-accent/50 transition-all appearance-none cursor-pointer"
            >
              <option value="ALL">All Types</option>
              <option value="AGRO">Agro</option>
              <option value="AUTO">Auto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table/Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-12 h-12 text-accent animate-spin" />
          <p className="text-gray-400 animate-pulse">Loading products...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden hover:border-accent/30 transition-all group"
            >
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-md text-accent text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest border border-accent/20">
                    {product.type}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wider">{product.category}</p>
                <h3 className="font-bold mb-3 line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-accent">₦{product.price.toLocaleString()}</p>
                  <Link 
                    href={`/admin/products/${product.id}/edit`}
                    className="p-2 bg-white/5 hover:bg-accent hover:text-white rounded-lg transition-all text-gray-400"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-[#111] rounded-3xl border border-white/5 border-dashed">
          <Package className="w-16 h-16 text-gray-700 mb-4" />
          <h3 className="text-xl font-bold mb-1">No products found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
