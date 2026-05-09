import PageHero from "@/components/PageHero";
import AnimatedBackground from "@/components/AnimatedBackground";
import GlassCard from "@/components/GlassCard";

export const metadata = {
  title: "Terms of Service | GREAT HOPE",
  description: "Terms of service for GREAT HOPE LOGISTIC AND AGRO-ALLIED ENTERPRISES.",
};

export default function TermsPage() {
  return (
    <div className="relative pb-32">
      <AnimatedBackground variant="default" />
      <div className="container mx-auto px-6 pt-20 relative z-10">
        <PageHero
          tag="Legal"
          title={<>Terms of <span className="text-gold">Service</span></>}
          subtitle="The rules of engagement for GREAT HOPE services."
        />
        
        <GlassCard className="p-8 md:p-12 max-w-4xl mx-auto text-gray-400 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using the GREAT HOPE website and services, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Service Description</h2>
            <p>GREAT HOPE provides logistics, clearing & forwarding, agro-allied products, auto sales, and commodity exchange services. All service agreements are finalized through official communication channels, primarily WhatsApp and email.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. User Obligations</h2>
            <p>Users must provide accurate information when requesting services. Any fraudulent activity or misuse of our platform may result in immediate termination of services and legal action where necessary.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Limitation of Liability</h2>
            <p>GREAT HOPE shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services, except as required by Nigerian law.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Governing Law</h2>
            <p>These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.</p>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}
