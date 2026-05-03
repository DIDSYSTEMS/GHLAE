import { ReactNode } from "react";
import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <AdminNavbar />
      <div className="pt-20">
        {children}
      </div>
    </div>
  );
}
