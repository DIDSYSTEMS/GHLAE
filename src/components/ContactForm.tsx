"use client";

import WhatsAppButton from "./WhatsAppButton";

export default function ContactForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">First Name</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition-colors"
            placeholder="John"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Last Name</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Email</label>
        <input
          type="email"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Subject</label>
        <input
          type="text"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition-colors"
          placeholder="Logistics inquiry"
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Message</label>
        <textarea
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition-colors resize-none"
          placeholder="Tell us how we can help..."
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#064E2A,#0F8A3B)" }}
        >
          Send Message
        </button>
        <WhatsAppButton item="Contact Inquiry" text="Chat on WhatsApp" size="md" className="flex-1" />
      </div>
    </form>
  );
}
