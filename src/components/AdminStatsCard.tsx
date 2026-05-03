"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: "green" | "gold" | "blue" | "purple";
  delay?: number;
}

const colorMap = {
  green: { bg: "bg-primary/20 border-primary-light/30", text: "text-accent", glow: "0 0 20px rgba(16,185,129,0.3)" },
  gold:  { bg: "bg-secondary/20 border-secondary/30", text: "text-secondary", glow: "0 0 20px rgba(212,175,55,0.3)" },
  blue:  { bg: "bg-blue-500/20 border-blue-500/30", text: "text-blue-400", glow: "0 0 20px rgba(59,130,246,0.3)" },
  purple:{ bg: "bg-purple-500/20 border-purple-500/30", text: "text-purple-400", glow: "0 0 20px rgba(168,85,247,0.3)" },
};

export default function AdminStatsCard({ title, value, icon, color = "green", delay = 0 }: AdminStatsCardProps) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all"
      style={{ boxShadow: c.glow }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${c.bg}`}>
          <span className={c.text}>{icon}</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className={`text-3xl font-extrabold ${c.text}`}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}
