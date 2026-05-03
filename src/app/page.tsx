"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe2, TrendingUp, Package } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedBackground from "@/components/AnimatedBackground";
import Scroll3D from "@/components/Scroll3D";
import GlassCard from "@/components/GlassCard";
import siteConfig from "@/data/siteConfig.json";

const features = [
  { icon: Globe2, title: "Global Reach", desc: "Seamless import/export across borders with strategic partnerships." },
  { icon: Shield, title: "Secure & Reliable", desc: "Trusted handling of goods with full accountability." },
  { icon: Zap, title: "Fast Execution", desc: "Optimized supply chain operations for rapid delivery." },
];

const stats = [
  { value: "24/7", label: "Operations" },
  { value: "100%", label: "Commitment" },
  { value: "4+", label: "Partners" },
  { value: "5+", label: "Services" },
];

const services = [
  { title: "Logistics", desc: "Clearing, freight, warehousing & transportation.", href: "/logistics", icon: Package, color: "from-primary to-primary-light" },
  { title: "Agro-Allied", desc: "Cash crops, livestock, feed & commodity exchange.", href: "/agro", icon: TrendingUp, color: "from-green-800 to-green-600" },
  { title: "Auto Sales", desc: "Trucks, farm machines & heavy-duty vehicles.", href: "/auto", icon: Zap, color: "from-gray-700 to-gray-600" },
  { title: "Commodity Exchange", desc: "B2B, B2C & hybrid agro-trading platform.", href: "/commodity", icon: Globe2, color: "from-secondary/80 to-secondary-light/80" },
];

export default function Home() {
  return (
    <>
      <AnimatedBackground variant="default" />
      
      <div className="pb-32">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden mb-0">
          <Scroll3D />
        </section>

        <div className="flex flex-col gap-24 relative z-10 pt-0">
          {/* ── Stats ────────────────────────────────────── */}
          <section className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <GlassCard key={s.label} delay={i * 0.1} className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-gold mb-2">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </GlassCard>
            ))}
          </div>
        </section>

      {/* ── Services Grid ─────────────────────────────── */}
      <section className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-green">Core</span> Divisions</h2>
          <p className="text-gray-500 max-w-xl mx-auto">One platform. Four powerful business arms. Built for Africa.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={s.href} className="block group">
                <div className="glass rounded-2xl p-8 border border-secondary/10 hover:border-secondary/40 transition-all duration-300 card-tilt h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <s.icon size={26} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">{s.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{s.desc}</p>
                  <span className="text-secondary text-sm font-semibold flex items-center gap-1 group-hover:gap-3 transition-all duration-300">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features Banner ───────────────────────────── */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <GlassCard key={f.title} delay={i * 0.1} className="p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg,rgba(15,138,59,0.2),rgba(212,175,55,0.1))", border: "1px solid rgba(212,175,55,0.25)" }}>
                <f.icon size={22} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ── About Preview ─────────────────────────────── */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="glass rounded-3xl p-10 md:p-16 border border-secondary/10 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-secondary/10 blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-4">Our Story</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Built on <span className="text-green">Excellence</span> &amp; Trust</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                {siteConfig.mission} Established in {siteConfig.founded} in Lagos, Nigeria, we bridge the gap between
                reliable logistics and sustainable agro-allied solutions — serving businesses from farm to market.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-4 transition-all duration-300">
                Discover Our Story <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <GlassCard key={s.label} delay={i * 0.1} className="p-5 text-center">
                  <div className="text-3xl font-extrabold text-secondary mb-1">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ──────────────────────────────────── */}
      <section className="container mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-xs text-gray-500 tracking-widest uppercase mb-4">Trusted Partners</p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Henafek Logistics", "Follow Logistics", "Green Lake Farms", "Adenowo Farms"].map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-6 py-3 glass rounded-full text-sm text-gray-400 border border-white/5 hover:border-secondary/30 hover:text-secondary transition-all duration-300"
              >
                {p}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA Banner ────────────────────────────────── */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-green-600 opacity-90" />
          <div className="absolute inset-0 noise" />
          <div className="relative z-10 p-12 md:p-24 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Transform Your Supply Chain?
            </motion.h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Partner with GREAT HOPE for unparalleled logistics, agro, and auto solutions.
            </p>
            <WhatsAppButton item="Partnership Inquiry" text="Start a Conversation" size="lg"
              className="bg-white !text-green-800 hover:bg-gray-100 shadow-2xl font-extrabold" />
          </div>
        </div>
      </section>
        </div>
      </div>
    </>
  );
}
