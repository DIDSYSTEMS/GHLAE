import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

// Inline SVG social icons (lucide-react v1+ removed branded icons)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#020202] border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-block mb-6 group">
              <div className="relative h-12 w-48 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/video/Great-logo (2).png"
                  alt="GREAT HOPE Logo"
                  fill
                  className="object-contain brightness-0 invert opacity-80"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {siteConfig.mission}
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/ghlae" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://twitter.com/ghlae" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-colors">
                <XIcon />
              </a>
              <a href="https://instagram.com/ghlae" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://linkedin.com/company/ghlae" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-colors">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/logistics" className="hover:text-accent transition-colors">Logistics Services</Link></li>
              <li><Link href="/agro" className="hover:text-accent transition-colors">Agro-Allied Products</Link></li>
              <li><Link href="/auto" className="hover:text-accent transition-colors">Auto Sales</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="text-accent mt-1 shrink-0" size={18} />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-accent shrink-0" size={18} />
                  <span>{siteConfig.phones[0]}<br/>{siteConfig.phones[1]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-accent shrink-0" size={18} />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
