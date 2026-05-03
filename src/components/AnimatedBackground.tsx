"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export default function AnimatedBackground({ variant = "default" }: { variant?: "default" | "logistics" | "agro" | "auto" | "exchange" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const colors = {
    default: ["#0F8A3B", "#D4AF37", "#064E2A", "#10b981"],
    logistics: ["#0F8A3B", "#1a6b5a", "#D4AF37", "#0a4f3c"],
    agro: ["#22c55e", "#4ade80", "#D4AF37", "#064E2A"],
    auto: ["#6b7280", "#D4AF37", "#1f2937", "#9ca3af"],
    exchange: ["#D4AF37", "#F59E0B", "#0F8A3B", "#eab308"],
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const palette = colors[variant];
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.05,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // Draw connecting lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = theme === "light" 
              ? `rgba(0,0,0,${0.05 * (1 - dist / 120)})`
              : `rgba(255,255,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [variant, mounted, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: mounted ? (theme === "light" ? 0.25 : 0.6) : 0 }}
    />
  );
}
