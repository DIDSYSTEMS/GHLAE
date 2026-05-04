"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, X, Loader2, Save, Trash2 } from "lucide-react";
import Image from "next/image";

interface ProductFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    unit: initialData?.unit || "",
    image: initialData?.image || "",
    type: initialData?.type || "AGRO",
    specs: initialData?.specs || {},
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.secure_url) {
        setFormData({ ...formData, image: result.secure_url });
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isEditing ? `/api/products/${initialData.id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        alert("Failed to save product");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${initialData.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/admin/products");
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
              placeholder="e.g. Premium Yellow Maize"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
                placeholder="e.g. Grains"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
              >
                <option value="AGRO">Agro</option>
                <option value="AUTO">Auto</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Price (₦)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Unit</label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
                placeholder="e.g. per bag"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Product Image URL (Optional if uploading)</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all mb-4"
              placeholder="https://images.unsplash.com/..."
            />
            
            <label className="block text-sm font-medium text-gray-400 mb-2">Or Upload Image</label>
            <div className="relative group">
              {formData.image && formData.image.startsWith('https://res.cloudinary.com') ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : formData.image ? (
                 <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a] flex items-center justify-center">
                    <p className="text-xs text-gray-500 text-center px-4 break-all">Image Link active: {formData.image.substring(0, 50)}...</p>
                 </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-white/10 hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer">
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-500 mb-2" />
                      <span className="text-sm text-gray-400">Click to upload image</span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>
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
              Delete Product
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
            disabled={isLoading || isUploading}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-xl transition-all font-bold disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isEditing ? "Update Product" : "Save Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
