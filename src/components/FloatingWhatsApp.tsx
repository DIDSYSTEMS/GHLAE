"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const phone = "2348108231559";
  const message = encodeURIComponent(
    "Hello, I am interested in your services at GREAT HOPE LOGISTIC AND AGRO-ALLIED ENTERPRISES. Please assist me."
  );

  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl animate-whatsapp"
      style={{ background: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} className="text-white fill-white" />
    </motion.a>
  );
}
