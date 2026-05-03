"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Logistics", path: "/logistics" },
  { name: "Agro-Allied", path: "/agro" },
  { name: "Auto Sales", path: "/auto" },
  { name: "Commodity", path: "/commodity" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative h-12 w-48 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/video/Great-logo (2).png"
              alt="GREAT HOPE Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-7 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="https://wa.me/2348108231559"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg,#064E2A,#0F8A3B)",
                boxShadow: "0 0 15px rgba(15,138,59,0.3)",
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Mobile Toggle & ThemeToggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            className="text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden glass border-t border-border px-6 py-5 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block py-3 text-base font-medium text-foreground hover:text-secondary transition-colors border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://wa.me/2348108231559"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-center py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#064E2A,#0F8A3B)" }}
          >
            Get in Touch on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
