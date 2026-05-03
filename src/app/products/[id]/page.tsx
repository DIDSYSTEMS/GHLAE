import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedBackground from "@/components/AnimatedBackground";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import { ChevronLeft, Tag, Layers } from "lucide-react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  return {
    title: product ? `${product.name} | GREAT HOPE` : "Product Not Found",
    description: product ? `Buy ${product.name} from GREAT HOPE via WhatsApp` : "",
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  let parsedSpecs: Record<string, string> | null = null;
  if (product.specs && typeof product.specs === "string") {
    try { parsedSpecs = JSON.parse(product.specs); } catch { /* ignore */ }
  }

  const relatedProducts = await prisma.product.findMany({
    where: { type: product.type, NOT: { id: product.id } },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative pb-32">
      <AnimatedBackground variant={product.type === "AGRO" ? "agro" : product.type === "AUTO" ? "auto" : "default"} />

      <div className="container mx-auto px-6 pt-24 relative z-10">
        {/* Breadcrumb */}
        <Link
          href={product.type === "AUTO" ? "/auto" : "/agro"}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-10 text-sm"
        >
          <ChevronLeft size={16} /> Back to {product.type === "AUTO" ? "Auto Sales" : "Agro Products"}
        </Link>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Image */}
          <GlassCard className="overflow-hidden p-0 rounded-2xl">
            <div className="relative h-96 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-secondary/40 text-secondary"
                  style={{ background: "rgba(212,175,55,0.15)" }}>
                  {product.category}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold border border-primary-light/30 text-accent bg-primary/10">
                {product.type}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">{product.name}</h1>

            <div className="flex items-end gap-2 mb-8">
              <span className="text-4xl font-extrabold text-gold">₦{product.price.toLocaleString()}</span>
              {product.unit && <span className="text-gray-500 mb-1 text-sm">{product.unit}</span>}
            </div>

            <p className="text-gray-400 leading-relaxed mb-8">
              High-quality {product.name} available for immediate order. Contact us directly via WhatsApp for fast processing, 
              bulk pricing, and delivery arrangements.
            </p>

            {/* Specs */}
            {parsedSpecs && Object.keys(parsedSpecs).length > 0 && (
              <GlassCard className="p-5 mb-8">
                <div className="flex items-center gap-2 mb-4 text-secondary">
                  <Layers size={16} />
                  <span className="text-sm font-semibold">Specifications</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(parsedSpecs).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-xs text-gray-600 capitalize">{key}</span>
                      <span className="text-sm text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <WhatsAppButton
                item={product.name}
                productId={product.id}
                price={product.price}
                text="Order via WhatsApp"
                size="lg"
                className="flex-1"
              />
              <Link
                href={product.type === "AUTO" ? "/auto" : "/agro"}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm font-medium"
              >
                <Tag size={16} /> Browse More
              </Link>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Related <span className="text-gold">Products</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <GlassCard delay={i * 0.1} className="overflow-hidden card-tilt group cursor-pointer" tilt>
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white group-hover:text-secondary transition-colors truncate">{p.name}</h3>
                      <p className="text-gold text-sm font-semibold mt-1">₦{p.price.toLocaleString()}</p>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
