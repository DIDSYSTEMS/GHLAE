"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  item: string;
  text?: string;
  className?: string;
  productId?: string;
  price?: number | null;
  size?: "sm" | "md" | "lg";
}

export default function WhatsAppButton({
  item,
  text = "Order via WhatsApp",
  className = "",
  productId,
  price,
  size = "md",
}: WhatsAppButtonProps) {
  const phone = "2348108231559";
  const message = encodeURIComponent(
    `Hello, I am interested in ${item}${price ? ` priced at ₦${price.toLocaleString()}` : ""} from GREAT HOPE LOGISTIC AND AGRO-ALLIED ENTERPRISES. Please provide more details.`
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  const handleClick = async () => {
    // Track analytics
    try {
      await fetch("/api/analytics/whatsapp-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: productId || null,
          itemName: item,
          phone,
          pageUrl: window.location.href,
        }),
      });
    } catch {
      // Non-blocking: analytics failure should not interrupt the user
    }
    window.open(whatsappUrl, "_blank");
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      aria-label={`Order ${item} via WhatsApp`}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-bold text-white transition-all duration-300 ${sizeClasses[size]} ${className}`}
      style={{
        background: "linear-gradient(135deg, #128C7E 0%, #25D366 100%)",
        boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
      }}
    >
      <MessageCircle size={size === "sm" ? 14 : 17} className="fill-white/20" />
      {text}
    </motion.button>
  );
}
