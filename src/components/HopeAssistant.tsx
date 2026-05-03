"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronRight, Truck, Wheat, Car, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const prompts = [
  { icon: <Truck size={16} />, text: "Need help with shipping or clearing?", link: "/logistics" },
  { icon: <Wheat size={16} />, text: "Looking for agro products or commodity exchange?", link: "/agro" },
  { icon: <Car size={16} />, text: "Want to buy a truck or farm machine?", link: "/auto" },
  { icon: <BarChart2 size={16} />, text: "Interested in commodity trading?", link: "/commodity" },
];

export default function HopeAssistant() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShown(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-72 glass rounded-2xl overflow-hidden border border-secondary/30"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary to-primary-light flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary font-bold text-lg">
                H
              </div>
              <div>
                <p className="font-bold text-white text-sm">Hope Assistant</p>
                <p className="text-xs text-green-200">Your GHLAE Guide • Online</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-1">
              <p className="text-xs text-gray-400 mb-3">How can I help you today?</p>
              {prompts.map((p, i) => (
                <motion.a
                  key={i}
                  href={p.link}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <div className="text-secondary shrink-0">{p.icon}</div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors flex-1">{p.text}</span>
                  <ChevronRight size={14} className="text-gray-600 group-hover:text-secondary transition-colors" />
                </motion.a>
              ))}
            </div>

            <div className="px-4 pb-4">
              <a
                href="https://wa.me/2348108231559"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1da851] transition-colors text-white text-sm font-semibold"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification bubble */}
      <AnimatePresence>
        {shown && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring" }}
            className="px-3 py-1.5 glass rounded-full border border-secondary/30 text-xs text-gray-300 max-w-[180px] text-center"
          >
            👋 Need help? Tap me!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setOpen(!open); setShown(false); }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shadow-2xl glow-green border border-primary-light/30"
        aria-label="Open Hope Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
