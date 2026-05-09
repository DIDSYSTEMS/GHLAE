import { Metadata } from "next";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | GREAT HOPE Logistic and Agro-Allied Enterprises",
  description: "Contact GREAT HOPE at 26 Sam Ogegbo St, Ojodu-Berger, Lagos. Call 08108231559 or email info@ghlae.henafekhome.com.",
};

const contactItems = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    lines: ["26, Sam Ogegbo St.", "Off Bemil Church Victory Estate,", "Ojodu-Berger, Lagos State, Nigeria"],
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["08108231559", "08153992720", "08023424190"],
    color: "text-secondary",
    bg: "bg-secondary/10 border-secondary/20",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@ghlae.henafekhome.com"],
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Monday – Friday: 8am – 6pm", "Saturday: 9am – 4pm", "Sunday: Closed (WhatsApp available)"],
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
];

export default function Contact() {
  return (
    <div className="relative pb-32">
      <AnimatedBackground variant="default" />

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <PageHero
          tag="Get in Touch"
          title={<>Reach <span className="text-gold">GREAT HOPE</span> Instantly</>}
          subtitle="Call, email, visit our office, or reach us instantly on WhatsApp. Our team is ready to assist with logistics, agro, auto, and commodity inquiries."
        />

        {/* Talking guide */}
        <div className="flex justify-center mb-16">
          <div className="glass rounded-2xl px-6 py-4 border border-accent/20 max-w-lg text-center">
            <p className="text-sm text-gray-400">
              📍 <span className="text-white font-semibold">Reach Great Hope instantly</span> — call, email, visit, or chat on WhatsApp.
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactItems.map((item, i) => (
            <GlassCard key={item.title} delay={i * 0.1} className="p-6 card-tilt">
              <div className={`w-12 h-12 rounded-2xl mb-5 flex items-center justify-center border ${item.bg}`}>
                <item.icon size={22} className={item.color} />
              </div>
              <h3 className="font-bold text-white mb-3">{item.title}</h3>
              {item.lines.map((line) => (
                <p key={line} className="text-gray-500 text-sm">{line}</p>
              ))}
            </GlassCard>
          ))}
        </div>

        {/* Map + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Map embed */}
          <GlassCard className="overflow-hidden p-0 rounded-2xl min-h-[360px]">
            <iframe
              src="https://maps.google.com/maps?q=26%20Sam%20Ogegbo%20St,%20Ojodu-Berger,%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px", filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GHLAE Office Location"
            />
          </GlassCard>

          {/* Contact form */}
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
            <ContactForm />
          </GlassCard>
        </div>

        {/* WhatsApp CTA */}
        <div className="text-center">
          <GlassCard className="p-10 max-w-xl mx-auto border border-[#25D366]/20">
            <MessageCircle size={40} className="text-[#25D366] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Prefer WhatsApp?</h3>
            <p className="text-gray-500 text-sm mb-6">Chat with our team directly for the fastest response. We typically reply within minutes.</p>
            <WhatsAppButton item="General Contact" text="Open WhatsApp Chat" size="lg" className="w-full" />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
