import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/websiteData';

export default function FloatingActions() {
  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3.5"
      aria-label="Quick contact options"
    >
      {/* WhatsApp Button */}
      <a
        href={companyInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="group relative w-13 h-13 p-3.5 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-emerald-500/35 hover:scale-110 active:scale-95 transition-all duration-200 border border-white/20"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none" />
        <MessageCircle size={24} className="relative z-10 fill-current" />
        <span className="absolute right-16 bg-[#070D1E] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
          WhatsApp Us
        </span>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${companyInfo.phone}`}
        aria-label={`Call ${companyInfo.phoneDisplay}`}
        title={`Call ${companyInfo.phoneDisplay}`}
        className="group relative w-13 h-13 p-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-xl shadow-blue-500/35 hover:scale-110 active:scale-95 transition-all duration-200 border border-white/20"
      >
        <Phone size={20} className="relative z-10" />
        <span className="absolute right-16 bg-[#070D1E] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
          {companyInfo.phoneDisplay}
        </span>
      </a>
    </div>
  );
}
