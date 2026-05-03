"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  unit?: string;
  image: string;
  specs?: Record<string, string>;
  index: number;
}

export default function ProductCard({ id, name, category, price, unit, image, specs, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass rounded-2xl overflow-hidden group flex flex-col h-full border border-secondary/10 hover:border-secondary/40 transition-all duration-300 card-tilt"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/20 border border-secondary/40 text-secondary backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors">{name}</h3>

        <div className="flex items-end gap-1.5 mb-4">
          <span className="text-2xl font-extrabold text-gold">
            ₦{price.toLocaleString()}
          </span>
          {unit && <span className="text-xs text-gray-500 mb-0.5">{unit}</span>}
        </div>

        {specs && (
          <div className="mb-4 space-y-1.5 text-xs text-gray-400 border border-white/5 rounded-xl p-3 bg-white/[0.02]">
            {Object.entries(specs).slice(0, 4).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="capitalize text-gray-500">{key}</span>
                <span className="font-medium text-gray-300">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
          <WhatsAppButton item={name} productId={id} price={price} className="w-full" size="sm" />
        </div>
      </div>
    </motion.div>
  );
}
