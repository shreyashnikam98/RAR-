import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { companyInfo, navigationLinks } from '../data/websiteData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070D1E]/95 backdrop-blur-xl shadow-xl shadow-black/20 border-b border-cyan-500/10 py-3.5'
          : 'bg-[#070D1E] py-4 sm:py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-accent rounded-xl p-1"
            aria-label="RAR Consultant home"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
              <img
                src="/logo.png"
                alt="RAR Consultant"
                className="relative h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-white font-heading font-extrabold text-lg tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
                RAR CONSULTANT
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-[11px] font-bold tracking-widest uppercase mt-1">
                Smart IT Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-blue-600/90 to-cyan-600/90 shadow-md shadow-blue-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-2.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-full hover:bg-white/5"
              title="Call us directly"
            >
              <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Phone size={14} />
              </span>
              <span className="hidden xl:inline">{companyInfo.phoneDisplay}</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-blue-600/30 border border-white/20 transition-all duration-200 hover:shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get a Free Quote</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2.5">
            <Link
              to="/contact"
              className="text-xs bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-3.5 py-1.5 rounded-full shadow-sm"
            >
              Quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070D1E]/98 border-t border-cyan-500/15 backdrop-blur-2xl px-5 pt-4 pb-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-1.5">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-2xl text-base font-semibold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span>{link.label}</span>
                <ArrowRight size={16} className="opacity-70" />
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 space-y-3">
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-cyan-400 rounded-2xl bg-white/5 border border-white/5"
            >
              <Phone size={16} className="text-cyan-400" />
              <span className="font-semibold">{companyInfo.phoneDisplay}</span>
            </a>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-500/30"
            >
              <span>Get a Free Quote</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
