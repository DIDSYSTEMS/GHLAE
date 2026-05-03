import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import HopeAssistant from "@/components/HopeAssistant";
import { Providers } from "@/components/Providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GREAT HOPE Logistic and Agro-Allied Enterprises",
  description: "Premium logistics, agro-allied, auto sales and commodity exchange services in Nigeria. Order via WhatsApp.",
  keywords: ["logistics Nigeria", "agro-allied", "commodity exchange", "auto sales Lagos", "clearing forwarding"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <Providers>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <HopeAssistant />
        </Providers>
      </body>
    </html>
  );
}
