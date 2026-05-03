"use client";

import { motion } from "framer-motion";
import { Package, Truck, ShoppingCart, Users, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Products", value: "24", icon: Package, change: "+3", color: "text-blue-500" },
    { name: "Total Services", value: "12", icon: Truck, change: "+1", color: "text-green-500" },
    { name: "Recent Inquiries", value: "8", icon: ShoppingCart, change: "+2", color: "text-accent" },
    { name: "Active Categories", value: "4", icon: Users, change: "0", color: "text-purple-500" },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard <span className="text-accent">Overview</span></h1>
          <p className="text-gray-400 text-sm">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/admin/products/new"
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-xl transition-all text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
          <Link 
            href="/admin/services/new"
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl border border-white/10 transition-all text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-accent/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                  {stat.change} <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products Card */}
        <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Products</h2>
            <Link href="/admin/products" className="text-accent text-sm hover:underline">View all</Link>
          </div>
          <div className="space-y-4 text-sm text-gray-400">
            {/* Placeholder for list */}
            <p className="text-center py-8 italic">No products added yet.</p>
          </div>
        </div>

        {/* Recent Services Card */}
        <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Services</h2>
            <Link href="/admin/services" className="text-accent text-sm hover:underline">View all</Link>
          </div>
          <div className="space-y-4 text-sm text-gray-400">
            {/* Placeholder for list */}
            <p className="text-center py-8 italic">No services added yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
