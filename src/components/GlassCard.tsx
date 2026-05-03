"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: "green" | "gold" | "none";
  delay?: number;
}

export default function GlassCard({ children, className = "", tilt = false, glow = "none", delay = 0 }: GlassCardProps) {
  const glowClass = glow === "green" ? "hover:glow-green" : glow === "gold" ? "hover:glow-gold" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`glass glass-hover rounded-2xl ${tilt ? "card-tilt" : ""} ${glowClass} transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
