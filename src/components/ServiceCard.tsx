"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  iconName: string;
  index: number;
}

export default function ServiceCard({ id, title, description, iconName, index }: ServiceCardProps) {
  // @ts-ignore
  const Icon = Icons[iconName] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-2xl p-6 flex flex-col h-full border border-secondary/10 hover:border-secondary/40 transition-all duration-300 group card-tilt"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: "linear-gradient(135deg, rgba(15,138,59,0.2), rgba(212,175,55,0.1))", border: "1px solid rgba(212,175,55,0.2)" }}>
        <Icon size={26} className="text-secondary" />
      </div>

      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-secondary transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

      <div className="mt-auto">
        <WhatsAppButton item={title} className="w-full" size="sm" />
      </div>
    </motion.div>
  );
}
