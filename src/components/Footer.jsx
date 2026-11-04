import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowUpRight, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { companyInfo, navigationLinks, services } from '../data/websiteData';
import { useCookieConsent } from '../context/CookieContext';

export default function Footer() {
  const { reopen } = useCookieConsent();

  return (
    <footer className="bg-[#070D1E] text-slate-300 pt-16 pb-12 border-t border-cyan-500/15 relative overflow-hidden">
      {/* Decorative gradient glow in background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-accent rounded-xl">
              <img
                src="/logo.png"
                alt="RAR Consultant"
                className="h-11 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed pr-4 font-normal">
              {companyInfo.description} {companyInfo.tagline}.
            </p>
            <div className="space-y-3 pt-2">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-3 text-sm text-slate-200 hover:text-cyan-400 transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all">
                  <Phone size={14} className="text-cyan-400" />
                </span>
                <span className="font-semibold">{companyInfo.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-3 text-sm text-slate-200 hover:text-cyan-400 transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-blue-500/20 transition-all">
                  <Mail size={14} className="text-cyan-400" />
                </span>
                <span className="font-semibold">{companyInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-heading font-extrabold text-xs tracking-widest uppercase">
              Explore
            </h2>
            <ul className="space-y-2.5 text-sm">
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 group font-medium"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-heading font-extrabold text-xs tracking-widest uppercase">
              Services
            </h2>
            <ul className="space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/contact?service=${service.slug}`}
                    className="text-slate-300 hover:text-white transition-colors flex items-center justify-between group font-medium"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Privacy Column */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-heading font-extrabold text-xs tracking-widest uppercase">
              Legal & Privacy
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 font-medium"
                >
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 font-medium"
                >
                  <span>Terms and Conditions</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={reopen}
                  className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-2 text-left font-medium"
                >
                  <SlidersHorizontal size={14} className="text-cyan-400" />
                  <span>Cookie Settings</span>
                </button>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-2xl bg-white/[0.04] border border-cyan-500/20 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <ShieldCheck size={16} />
                <span>DPDP Act Compliant</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                Respecting your digital personal data protection rights under Indian law.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} RAR Consultant. All rights reserved.</p>
          <p className="flex items-center gap-2 text-center sm:text-right">
            <span>Compliant with India's Digital Personal Data Protection Act, 2023.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
