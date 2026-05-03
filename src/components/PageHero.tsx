"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  tag?: string;
  title: string | ReactNode;
  subtitle?: string;
  children?: ReactNode;
  centered?: boolean;
}

export default function PageHero({ tag, title, subtitle, children, centered = true }: PageHeroProps) {
  return (
    <div className={`relative z-10 ${centered ? "text-center max-w-4xl mx-auto" : "max-w-3xl"} pt-12 pb-8`}>
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-semibold tracking-widest uppercase mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          {tag}
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8"
        >
          {subtitle}
        </motion.p>
      )}

      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
