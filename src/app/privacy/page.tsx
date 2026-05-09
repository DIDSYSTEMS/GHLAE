import PageHero from "@/components/PageHero";
import AnimatedBackground from "@/components/AnimatedBackground";
import GlassCard from "@/components/GlassCard";

export const metadata = {
  title: "Privacy Policy | GREAT HOPE",
  description: "Privacy policy for GREAT HOPE LOGISTIC AND AGRO-ALLIED ENTERPRISES.",
};

export default function PrivacyPage() {
  return (
    <div className="relative pb-32">
      <AnimatedBackground variant="default" />
      <div className="container mx-auto px-6 pt-20 relative z-10">
        <PageHero
          tag="Legal"
          title={<>Privacy <span className="text-gold">Policy</span></>}
          subtitle="How we handle your data at GREAT HOPE."
        />
        
        <GlassCard className="p-8 md:p-12 max-w-4xl mx-auto text-gray-400 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Data Collection</h2>
            <p>We collect information that you provide directly to us, such as when you fill out a contact form, request a quote, or interact with our WhatsApp services. This may include your name, email address, phone number, and business details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>Your data is used to provide our logistics, agro-allied, and auto services, to communicate with you, and to improve our platform's user experience. We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Data Security</h2>
            <p>We implement professional security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. WhatsApp Interaction</h2>
            <p>Our services heavily utilize WhatsApp. Please be aware that your interactions via WhatsApp are also subject to WhatsApp's own privacy policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at info@ghlae.henafekhome.com.</p>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}
