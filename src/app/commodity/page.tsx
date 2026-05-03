import { Metadata } from "next";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BarChart2, Users, Truck, Sprout, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Commodity Exchange | GREAT HOPE Logistic and Agro-Allied Enterprises",
  description: "Join Africa's premium agro commodity exchange — connecting buyers, farmers, transporters, and businesses through B2B, B2C, B2T and hybrid models.",
};

const models = [
  { label: "B2B", title: "Business to Business", desc: "Wholesale commodity trading between agro businesses, processors, and distributors.", icon: BarChart2, color: "from-primary to-primary-light" },
  { label: "B2C", title: "Business to Consumer", desc: "Direct supply of quality agro products from GREAT HOPE to end consumers.", icon: Users, color: "from-secondary/70 to-secondary-light/70" },
  { label: "B2T", title: "Business to Transporter", desc: "Connecting commodity owners with trusted logistics partners for seamless delivery.", icon: Truck, color: "from-green-700 to-green-500" },
  { label: "Hybrid", title: "Hybrid Exchange", desc: "Multi-party trading combining B2B, B2C, and B2T models in a single transaction.", icon: Sprout, color: "from-accent/70 to-green-500" },
];

const benefits = [
  "Access to verified buyers and sellers",
  "Transparent pricing and market data",
  "Integrated logistics and delivery",
  "Flexible payment and credit options",
  "WhatsApp-first communication",
  "Expert commodity advisory",
];

const commodities = [
  "Maize / Corn", "Soybeans", "Cassava", "Rice", "Palm Oil",
  "Groundnut", "Cocoa", "Poultry", "Catfish", "Livestock",
];

export default function CommodityExchange() {
  return (
    <div className="relative pb-32">
      <AnimatedBackground variant="exchange" />

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <PageHero
          tag="Commodity Exchange"
          title={<>Africa's <span className="text-gold">Agro-Trading</span> Platform</>}
          subtitle="Connect buyers, farmers, transporters, and businesses through a smooth, transparent commodity exchange flow — powered by GREAT HOPE."
        />

        {/* Talking guide */}
        <div className="flex justify-center mb-16">
          <div className="glass rounded-2xl px-6 py-4 border border-secondary/20 max-w-xl text-center">
            <p className="text-sm text-gray-400">
              📊 <span className="text-white font-semibold">Connect buyers, farmers, transporters, and businesses</span> through our smooth commodity exchange flow.
            </p>
          </div>
        </div>

        {/* Trading Models */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Trading <span className="text-green">Models</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((m, i) => (
              <GlassCard key={m.label} delay={i * 0.1} className="p-7 card-tilt" glow="gold">
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                    <m.icon size={26} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold border border-secondary/40 text-secondary"
                        style={{ background: "rgba(212,175,55,0.1)" }}>{m.label}</span>
                      <h3 className="font-bold text-white">{m.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm">{m.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Commodities grid */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Available <span className="text-gold">Commodities</span></h2>
          <div className="flex flex-wrap justify-center gap-3">
            {commodities.map((c, i) => (
              <GlassCard key={c} delay={i * 0.05} className="px-5 py-2.5 text-sm text-gray-300 hover:text-secondary transition-colors">
                {c}
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-24">
          <div className="glass rounded-3xl p-10 md:p-14 border border-secondary/10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Why Join Our <span className="text-gold">Exchange?</span></h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Our commodity exchange platform connects verified buyers and sellers across Nigeria, 
                  with integrated logistics and transparent pricing — all facilitated through WhatsApp for speed and simplicity.
                </p>
                <WhatsAppButton item="Commodity Exchange Participation" text="Join the Exchange" size="lg" />
              </div>
              <div className="grid grid-cols-1 gap-3">
                {benefits.map((b, i) => (
                  <GlassCard key={b} delay={i * 0.05} className="flex items-center gap-3 px-4 py-3">
                    <CheckCircle size={16} className="text-accent shrink-0" />
                    <span className="text-sm text-gray-300">{b}</span>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <GlassCard className="p-12 max-w-2xl mx-auto" glow="gold">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Trading?</h3>
            <p className="text-gray-500 mb-8">Contact our commodity team to register as a buyer, seller, or transporter.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppButton item="Commodity Exchange as a Buyer" text="I'm a Buyer" size="md" />
              <WhatsAppButton item="Commodity Exchange as a Seller" text="I'm a Seller" size="md" />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
