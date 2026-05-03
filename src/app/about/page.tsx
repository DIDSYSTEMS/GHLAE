import { Metadata } from "next";
import { Target, Eye, Heart, Users, Handshake, GraduationCap, Lightbulb } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import GlassCard from "@/components/GlassCard";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "About Us | GREAT HOPE Logistic and Agro-Allied Enterprises",
  description: "Learn about GREAT HOPE — founded November 2025 in Lagos, Nigeria. Our mission, vision, values, partnerships, and CSR initiatives.",
};

const values = [
  { icon: Target, title: "Integrity", desc: "We do business with honesty and transparency at every level." },
  { icon: Eye, title: "Excellence", desc: "Premium quality in every service, product, and interaction." },
  { icon: Heart, title: "Community", desc: "Empowering local businesses and communities across Nigeria." },
  { icon: Lightbulb, title: "Innovation", desc: "Leveraging technology to drive modern agro-commerce." },
];

const partners = [
  { name: "Henafek Logistics", desc: "Strategic logistics and freight partner." },
  { name: "Follow Logistics", desc: "Transportation and last-mile delivery partner." },
  { name: "Green Lake Farms", desc: "Agro-allied and produce supply partner." },
  { name: "Adenowo Farms", desc: "Livestock and farm produce partner." },
];

const csrItems = [
  { icon: GraduationCap, title: "Youth Empowerment", desc: "Training the next generation of agro-business leaders." },
  { icon: Users, title: "Workshops & Training", desc: "Hands-on sessions for farmers, traders, and logistics professionals." },
  { icon: Handshake, title: "Startup Support", desc: "Mentorship and resources for agri-tech and logistics startups." },
  { icon: Lightbulb, title: "Virtual Conferences", desc: "Online knowledge-sharing events connecting industry experts." },
];

const timeline = [
  { year: "Nov 2025", event: "Company Founded in Lagos, Nigeria" },
  { year: "Dec 2025", event: "First logistics partnership established" },
  { year: "2026 Q1", event: "Agro-allied division launched" },
  { year: "2026 Q2", event: "Digital platform & Admin CMS launched" },
];

export default function About() {
  return (
    <div className="relative pb-32">
      <AnimatedBackground variant="default" />

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <PageHero
          tag="Our Story"
          title={<>Built on <span className="text-gold">Excellence</span> & Purpose</>}
          subtitle="Founded November 2025 in Lagos, Nigeria — GREAT HOPE bridges the gap between reliable logistics and sustainable agro-commerce for Africa."
        />

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <GlassCard className="p-8" glow="green">
            <div className="w-12 h-12 rounded-2xl bg-primary/30 flex items-center justify-center mb-5 border border-primary-light/30">
              <Target size={24} className="text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To provide integrated, premium logistics and agro-allied solutions that connect markets, 
              empower businesses, and strengthen food and supply chain systems across Nigeria and beyond.
            </p>
          </GlassCard>
          <GlassCard className="p-8" glow="gold">
            <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mb-5 border border-secondary/30">
              <Eye size={24} className="text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              To become Africa's most trusted multifunctional commerce and logistics platform — 
              where agriculture, trade, and transportation converge through technology and integrity.
            </p>
          </GlassCard>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Core <span className="text-green">Values</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <GlassCard key={v.title} delay={i * 0.1} className="p-6 text-center card-tilt">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,rgba(15,138,59,0.2),rgba(212,175,55,0.1))", border: "1px solid rgba(212,175,55,0.25)" }}>
                  <v.icon size={22} className="text-secondary" />
                </div>
                <h3 className="font-bold text-white mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our <span className="text-gold">Journey</span></h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/60 via-primary-light/30 to-transparent" />
            {timeline.map((t, i) => (
              <GlassCard key={t.year} delay={i * 0.15} className="ml-14 p-5 mb-4 relative">
                <div className="absolute -left-[3.25rem] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-secondary border border-secondary/40"
                  style={{ background: "rgba(212,175,55,0.1)", backdropFilter: "blur(8px)" }}>
                  {i + 1}
                </div>
                <p className="text-secondary text-xs font-semibold mb-1">{t.year}</p>
                <p className="text-white font-medium">{t.event}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Strategic <span className="text-green">Partners</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((p, i) => (
              <GlassCard key={p.name} delay={i * 0.1} className="p-6 text-center card-tilt" glow="gold">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-extrabold text-secondary border border-secondary/30"
                  style={{ background: "rgba(212,175,55,0.08)" }}>
                  {p.name[0]}
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{p.name}</h3>
                <p className="text-gray-500 text-xs">{p.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* CSR */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Corporate <span className="text-gold">Social Responsibility</span></h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">We invest in our communities through youth empowerment, knowledge-sharing, and startup support.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {csrItems.map((c, i) => (
              <GlassCard key={c.title} delay={i * 0.1} className="p-7 flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center border border-accent/20 bg-accent/10">
                  <c.icon size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-gray-500 text-sm">{c.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to work with us?</h3>
          <WhatsAppButton item="Partnership with GREAT HOPE" text="Get in Touch on WhatsApp" size="lg" />
        </div>
      </div>
    </div>
  );
}
