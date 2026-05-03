"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

// ─── Text phases shown at different scroll points ───────────────
const TEXT_PHASES = [
  {
    progress: 0,
    headline: "Bridging Africa's\nSupply Chain",
    sub: "Logistics · Agro · Auto · Commodities",
    tag: "WHO WE ARE",
  },
  {
    progress: 0.15,
    headline: "Experience it\nas it is in the website",
    sub: "Real capabilities. Real results. No gimmicks.",
    tag: "WHAT WE DO",
    highlightLine: 1,
  },
  {
    progress: 0.4,
    headline: "Every service\nand other",
    sub: "From clearing & freight to agro-commodity trading.",
    tag: "OUR SERVICES",
    highlightLine: 1,
  },
  {
    progress: 0.7,
    headline: "Your trusted partner\nin commerce",
    sub: "Serving Nigeria & beyond — 24/7 commitment.",
    tag: "OUR PROMISE",
  },
];

// ─── Map scroll progress → phase index ─────────────────────────
function getPhaseIndex(progress: number): number {
  let idx = 0;
  for (let i = 0; i < TEXT_PHASES.length; i++) {
    if (progress >= TEXT_PHASES[i].progress) idx = i;
  }
  return idx;
}

export default function Scroll3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [prevPhaseIndex, setPrevPhaseIndex] = useState(0);

  // Total actual frames (001–143 + 151, but we'll just iterate 1–151 safely)
  const frameCount = 143;

  // ── Load frames ────────────────────────────────────────────────
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const padded = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${padded}.png`;
      const localI = i - 1;
      img.onload = () => {
        loadedCount++;
        loadedImages[localI] = img;
        if (loadedCount >= Math.floor(frameCount * 0.3) && !isLoaded) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= Math.floor(frameCount * 0.3) && !isLoaded) {
          setIsLoaded(true);
        }
      };
      loadedImages[localI] = img;
    }
    setImages(loadedImages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Scroll & Auto-play tracking ────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const autoProgress = useMotionValue(0);
  const combinedProgress = useSpring(autoProgress, { stiffness: 40, damping: 15 });

  // Handle manual scroll vs auto-play
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const unsub = scrollYProgress.on("change", (v) => {
      if (v > 0.01) {
        setIsScrolling(true);
        autoProgress.set(v);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => setIsScrolling(false), 3000);
      }
    });
    return () => {
      unsub();
      clearTimeout(scrollTimeout);
    };
  }, [scrollYProgress, autoProgress]);

  // Auto-play interval
  useEffect(() => {
    if (isScrolling) return;

    const interval = setInterval(() => {
      const current = autoProgress.get();
      const nextPhase = TEXT_PHASES.find(p => p.progress > current + 0.05) || TEXT_PHASES[0];
      autoProgress.set(nextPhase.progress);
    }, 5000);

    return () => clearInterval(interval);
  }, [isScrolling, autoProgress]);

  const currentIndex = useTransform(combinedProgress, [0, 1], [0, frameCount - 1]);

  // Smooth 3-D perspective shift
  const rawPerspX = useTransform(combinedProgress, [0, 0.5, 1], [0, 12, -8]);
  const rawPerspY = useTransform(combinedProgress, [0, 0.3, 0.7, 1], [0, -6, 6, 0]);
  const rawScale  = useTransform(combinedProgress, [0, 0.4, 0.7, 1], [1, 1.04, 1.02, 1]);
  const perspX    = useSpring(rawPerspX, { stiffness: 60, damping: 20 });
  const perspY    = useSpring(rawPerspY, { stiffness: 60, damping: 20 });
  const scaleVal  = useSpring(rawScale,  { stiffness: 60, damping: 20 });

  // Parallax layers for text
  const textY1 = useTransform(combinedProgress, [0, 1], ["0%", "-15%"]);
  const textY2 = useTransform(combinedProgress, [0, 1], ["0%", "-30%"]);

  // Phase tracking for text updates
  useEffect(() => {
    const unsub = combinedProgress.on("change", (v) => {
      const newIdx = getPhaseIndex(v);
      setPhaseIndex((prev) => {
        if (prev !== newIdx) setPrevPhaseIndex(prev);
        return newIdx;
      });
    });
    return unsub;
  }, [combinedProgress]);

  // ── Canvas render ──────────────────────────────────────────────
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const index = Math.min(Math.floor(currentIndex.get()), frameCount - 1);
    const img = images[index];

    if (img && img.complete && img.naturalWidth !== 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cW = canvas.width;
      const cH = canvas.height;
      const iW = img.naturalWidth || img.width;
      const iH = img.naturalHeight || img.height;
      const imgAspect = iW / iH;
      const canvasAspect = cW / cH;

      let dW: number, dH: number, dX: number, dY: number;
      if (canvasAspect > imgAspect) {
        dW = cW; dH = cW / imgAspect; dX = 0; dY = (cH - dH) / 2;
      } else {
        dH = cH; dW = cH * imgAspect; dY = 0; dX = (cW - dW) / 2;
      }
      ctx.drawImage(img, dX, dY, dW, dH);
    }
  }, [images, currentIndex, frameCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    render();
    const unsub = currentIndex.on("change", render);

    const handleResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsub();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, currentIndex, render]);

  // ── Ambient Particles (Fixes Hydration Error) ───────────────
  const [particles, setParticles] = useState<{
    width: number;
    height: number;
    left: string;
    top: string;
    background: string;
    duration: number;
    delay: number;
  }[]>([]);

  useEffect(() => {
    const newParticles = [...Array(12)].map((_, i) => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background: i % 2 === 0 ? "rgba(212,175,55,0.7)" : "rgba(15,138,59,0.7)",
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  // ── Current phase data ─────────────────────────────────────────
  const phase = TEXT_PHASES[phaseIndex];
  const lines = phase.headline.split("\n");

  return (
    <div ref={containerRef} className="h-[120vh] relative">
      {/* ── Sticky 3D canvas + overlay ──────────────────────────── */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* Canvas with perspective tilt */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            rotateX: perspY,
            rotateY: perspX,
            scale: scaleVal,
            transformPerspective: 1200,
            transformOrigin: "50% 50%",
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.6s ease" }}
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
        </motion.div>

        {/* Loading spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50 gap-4">
            <div className="w-14 h-14 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            <p className="text-white/50 text-sm tracking-widest uppercase">Loading Experience…</p>
          </div>
        )}

        {/* ── Progress bar ──────────────────────────────────────── */}
        <div className="absolute top-0 left-0 w-full h-[3px] z-30">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary via-primary-light to-secondary"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>

        {/* ── Phase tag (top label) ─────────────────────────────── */}
        <motion.div
          style={{ y: textY2 }}
          className="absolute top-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.span
            key={`tag-${phaseIndex}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-black tracking-[0.35em] uppercase px-5 py-2 rounded-full border border-secondary/40 text-secondary backdrop-blur-sm bg-black/30"
          >
            {phase.tag}
          </motion.span>
        </motion.div>

        {/* ── Main text content ─────────────────────────────────── */}
        <motion.div
          style={{ y: textY1 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 pointer-events-none"
        >
          <div className="text-center max-w-5xl mx-auto">

            {/* Headline lines */}
            <div className="mb-8">
              {lines.map((line, li) => {
                const isHighlight = phase.highlightLine === li;
                return (
                  <motion.div
                    key={`${phaseIndex}-${li}`}
                    initial={{ opacity: 0, y: 40, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: li * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ transformPerspective: 800 }}
                  >
                    {isHighlight ? (
                      <span className="block text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight hero-highlight-text">
                        {line}
                      </span>
                    ) : (
                      <span className="block text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                        {line}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Sub-text */}
            <motion.p
              key={`sub-${phaseIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xl md:text-2xl font-semibold text-white/80 mb-10 drop-shadow-lg max-w-2xl mx-auto"
            >
              {phase.sub}
            </motion.p>

            {/* CTA buttons — only on first phase */}
            {phaseIndex === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center items-center gap-5 pointer-events-auto"
              >
                <Link
                  href="/logistics"
                  className="px-10 py-4 rounded-full bg-secondary text-black font-black text-base hover:bg-secondary-light hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                >
                  Explore Services
                </Link>
                <WhatsAppButton
                  item="General Inquiry"
                  text="Chat with Us"
                  size="lg"
                  className="!px-10 !py-4 font-black text-base"
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ── Scroll step indicators ────────────────────────────── */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
          {TEXT_PHASES.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                i === phaseIndex
                  ? "w-2 h-8 bg-secondary shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                  : "w-2 h-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* ── Scroll indicator (only at start) ─────────────────── */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        >
          <span className="text-xs text-white/60 tracking-[0.3em] uppercase font-bold">Scroll to Explore</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-secondary to-transparent" />
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-5 rounded-full border-2 border-secondary/60 flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
          </motion.div>
        </motion.div>

        {/* ── Ambient particle dots ─────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.width,
                height: p.height,
                left: p.left,
                top: p.top,
                background: p.background,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
