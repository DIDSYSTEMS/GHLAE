"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, Package, Truck, LogOut, User, BarChart2 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Services", href: "/admin/services", icon: Truck },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 z-50 px-6">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="text-xl font-bold tracking-tighter">
            GHLAE <span className="text-accent">ADMIN</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive 
                      ? "bg-accent/10 text-accent" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-gray-400 mr-4">
            <User className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-medium">{session?.user?.name || "Admin"}</span>
          </div>
          
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
