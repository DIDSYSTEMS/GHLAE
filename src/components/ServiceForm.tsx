"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Trash2 } from "lucide-react";

interface ServiceFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    icon: initialData?.icon || "Ship",
    category: initialData?.category || "LOGISTICS",
  });

  const icons = ["Ship", "Globe", "Plane", "Warehouse", "Truck", "Package", "Leaf", "Fish", "FlaskConical", "BarChart3"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isEditing ? `/api/services/${initialData.id}` : "/api/services";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/services");
        router.refresh();
      }
    } catch (err) {
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this service?")) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/services/${initialData.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/services");
        router.refresh();
      }
    } catch (err) {
      alert("Failed to delete");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[#111] p-8 rounded-2xl border border-white/5">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Service Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
            placeholder="e.g. Clearing and Forwarding"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all resize-none"
            placeholder="Describe the service..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Icon</label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
            >
              {icons.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
            >
              <option value="LOGISTICS">Logistics</option>
              <option value="AGRO">Agro</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-white/5">
        <div>
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-all text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Delete Service
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-xl text-gray-400 hover:text-white transition-all text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-xl transition-all font-bold disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isEditing ? "Update Service" : "Save Service"}
          </button>
        </div>
      </div>
    </form>
  );
}
