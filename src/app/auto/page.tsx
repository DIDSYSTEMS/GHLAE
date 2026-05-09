import ProductCard from "@/components/ProductCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import prisma from "@/lib/db";
import { Wrench, Package, Star } from "lucide-react";

export const dynamic = "force-static";

export const metadata = {
  title: "Auto Sales | GREAT HOPE Logistic and Agro-Allied Enterprises",
  description: "High-quality trucks, agricultural machinery, and reliable vehicles for your business operations.",
};

const autoServices = [
  { icon: Wrench, title: "Vehicle Servicing & Repair", desc: "Full maintenance and repair for trucks, farm machines, and commercial vehicles." },
  { icon: Package, title: "Spare Parts Supply", desc: "Genuine and quality spare parts for all vehicle types." },
  { icon: Star, title: "Heavy-Duty Maintenance", desc: "Specialized maintenance for heavy-duty logistics trucks and farm equipment." },
];

export default async function AutoSales() {
  const autos = await prisma.product.findMany({
    where: { type: "AUTO" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative pb-32">
      <AnimatedBackground variant="auto" />

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <PageHero
          tag="Auto Sales & Services"
          title={<>Premium <span className="text-gold">Auto</span> Showcase</>}
          subtitle="High-quality trucks, agricultural machinery, and reliable vehicles for your business operations — with maintenance and spare parts support."
        />

        {/* Talking guide */}
        <div className="flex justify-center mb-16">
          <div className="glass rounded-2xl px-6 py-4 border border-secondary/20 max-w-lg text-center">
            <p className="text-sm text-gray-400">
              🚛 <span className="text-white font-semibold">Need a vehicle or maintenance?</span> Tap ORDER to reach our auto team instantly.
            </p>
          </div>
        </div>

        {/* Vehicle listings */}
        {autos.length > 0 ? (
          <section className="mb-28">
            <h2 className="text-3xl font-bold mb-10 text-center">Available <span className="text-gold">Vehicles</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {autos.map((vehicle, idx) => {
                let parsedSpecs: Record<string, string> | undefined;
                if (vehicle.specs && typeof vehicle.specs === "string") {
                  try { parsedSpecs = JSON.parse(vehicle.specs); } catch { /* ignore */ }
                }
                return (
                  <ProductCard
                    key={vehicle.id}
                    id={vehicle.id}
                    name={vehicle.name}
                    category={vehicle.category}
                    price={vehicle.price}
                    image={vehicle.image}
                    specs={parsedSpecs}
                    index={idx}
                  />
                );
              })}
            </div>
          </section>
        ) : (
          <p className="text-center text-gray-500 py-20">No vehicles listed yet. Check back soon or contact us.</p>
        )}

        {/* Auto services */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center">Auto <span className="text-green">Services</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {autoServices.map((s, i) => (
              <GlassCard key={s.title} delay={i * 0.1} className="p-7 card-tilt" glow="gold">
                <div className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center border border-secondary/30"
                  style={{ background: "rgba(212,175,55,0.1)" }}>
                  <s.icon size={22} className="text-secondary" />
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{s.desc}</p>
                <WhatsAppButton item={s.title} size="sm" className="w-full" />
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <GlassCard className="p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Looking for a Specific Vehicle?</h3>
            <p className="text-gray-500 mb-8">Tell us your requirements and we'll source the right vehicle for your operations.</p>
            <WhatsAppButton item="Custom Vehicle Request" text="Request a Vehicle on WhatsApp" size="lg" />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
