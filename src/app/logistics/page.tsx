import ServiceCard from "@/components/ServiceCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import GlassCard from "@/components/GlassCard";
import prisma from "@/lib/db";
import { Ship, Plane, Package, Truck, FileText, Globe } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Logistics Services | GREAT HOPE Logistic and Agro-Allied Enterprises",
  description: "Premium clearing & forwarding, import/export, ocean & air freight, warehousing, and transportation services.",
};

const highlights = [
  { icon: FileText, label: "Clearing & Forwarding" },
  { icon: Globe, label: "Import & Export" },
  { icon: Ship, label: "Ocean Freight" },
  { icon: Plane, label: "Air Freight" },
  { icon: Package, label: "Warehousing" },
  { icon: Truck, label: "Transportation" },
];

export default async function Logistics() {
  const logistics = await prisma.service.findMany({
    where: { category: "LOGISTICS" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative pb-32">
      <AnimatedBackground variant="logistics" />

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <PageHero
          tag="Logistics Services"
          title={<>Premium <span className="text-gold">Logistics</span> Solutions</>}
          subtitle="From clearing and forwarding to nationwide transportation — GREAT HOPE delivers reliable, secure, and fast logistics solutions tailored to your business needs."
        />

        {/* Quick service highlights */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {highlights.map((h, i) => (
            <GlassCard key={h.label} delay={i * 0.05} className="flex items-center gap-2 px-4 py-2">
              <h.icon size={14} className="text-secondary" />
              <span className="text-xs text-gray-400 font-medium">{h.label}</span>
            </GlassCard>
          ))}
        </div>

        {/* Talking guide */}
        <div className="flex justify-center mb-14">
          <div className="glass rounded-2xl px-6 py-4 border border-secondary/20 max-w-lg text-center">
            <p className="text-sm text-gray-400">
              💬 <span className="text-white font-semibold">Select a logistics service</span> and contact our team instantly on WhatsApp.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logistics.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500 py-20">No logistics services found. Add them from the admin panel.</p>
          ) : (
            logistics.map((service, idx) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                iconName={service.icon}
                index={idx}
              />
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="glass rounded-3xl p-12 border border-secondary/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Logistics Solution?</h3>
            <p className="text-gray-500 mb-8">Tell us your requirements and our team will respond within minutes.</p>
            <WhatsAppButton item="Custom Logistics Solution" text="Get a Free Quote on WhatsApp" size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
