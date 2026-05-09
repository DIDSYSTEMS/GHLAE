import ServiceCard from "@/components/ServiceCard";
import ProductCard from "@/components/ProductCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import prisma from "@/lib/db";

export const dynamic = "force-static";

export const metadata = {
  title: "Agro-Allied | GREAT HOPE Logistic and Agro-Allied Enterprises",
  description: "Premium agro-allied products and services — cash crops, livestock, fisheries, feed, and commodity exchange.",
};

export default async function AgroAllied() {
  const [agroServices, agroProducts] = await Promise.all([
    prisma.service.findMany({ where: { category: "AGRO" }, orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({ where: { type: "AGRO" }, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="relative pb-32">
      <AnimatedBackground variant="agro" />

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <PageHero
          tag="Agro-Allied Division"
          title={<>Premium <span className="text-green">Agro</span> Solutions</>}
          subtitle="Empowering agriculture through high-yield farming, quality livestock, feed distribution, and a robust commodity exchange platform."
        />

        {/* Talking guide */}
        <div className="flex justify-center mb-16">
          <div className="glass rounded-2xl px-6 py-4 border border-accent/20 max-w-lg text-center">
            <p className="text-sm text-gray-400">
              🌿 <span className="text-white font-semibold">Choose agro products</span>, request supply, or start commodity exchange — all through WhatsApp.
            </p>
          </div>
        </div>

        {/* Services */}
        {agroServices.length > 0 && (
          <section className="mb-28">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Agro <span className="text-green">Services</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agroServices.map((service, idx) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  iconName={service.icon}
                  index={idx}
                />
              ))}
            </div>
          </section>
        )}

        {/* Products */}
        {agroProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-10 text-center">Featured <span className="text-gold">Agro Products</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agroProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  unit={product.unit || ""}
                  image={product.image}
                  index={idx}
                />
              ))}
            </div>
          </section>
        )}

        {agroServices.length === 0 && agroProducts.length === 0 && (
          <p className="text-center text-gray-500 py-20">No agro content yet. Add items from the admin panel.</p>
        )}

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <GlassCard className="p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Looking to Source Agro Products?</h3>
            <p className="text-gray-500 mb-8">Connect with our agro team for bulk orders, commodity exchange, and supply contracts.</p>
            <WhatsAppButton item="Agro Products Inquiry" text="Inquire on WhatsApp" size="lg" />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
