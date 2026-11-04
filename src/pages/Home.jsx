import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowDown,
  BadgeCheck,
  Zap,
  HeartHandshake,
  Cpu,
  MessageSquareText,
  LockKeyhole,
  CheckCircle2,
  Sparkles,
  Layout,
  Code2,
  Search,
  ShoppingBag,
  MapPin,
  Wrench,
  ShieldCheck,
} from 'lucide-react';
import {
  statistics,
  statisticsDisclaimer,
  services,
  whyChooseUs,
  workingProcess,
  techStack,
} from '../data/websiteData';
import TestimonialSlider from '../components/TestimonialSlider';

const iconMap = {
  BadgeCheck,
  Zap,
  HeartHandshake,
  Cpu,
  MessageSquareText,
  LockKeyhole,
  Layout,
  Code2,
  Search,
  ShoppingBag,
  MapPin,
  Wrench,
};

// Elegant distinct color themes for the 6 services
const serviceGradients = [
  {
    iconBg: 'from-blue-600 to-cyan-500',
    hoverBorder: 'hover:border-cyan-400/50',
    glow: 'group-hover:shadow-cyan-500/10',
    accentText: 'text-cyan-600',
  },
  {
    iconBg: 'from-indigo-600 to-blue-500',
    hoverBorder: 'hover:border-indigo-400/50',
    glow: 'group-hover:shadow-indigo-500/10',
    accentText: 'text-indigo-600',
  },
  {
    iconBg: 'from-cyan-600 to-teal-500',
    hoverBorder: 'hover:border-teal-400/50',
    glow: 'group-hover:shadow-teal-500/10',
    accentText: 'text-teal-600',
  },
  {
    iconBg: 'from-blue-700 to-indigo-600',
    hoverBorder: 'hover:border-blue-400/50',
    glow: 'group-hover:shadow-blue-500/10',
    accentText: 'text-blue-600',
  },
  {
    iconBg: 'from-sky-600 to-cyan-500',
    hoverBorder: 'hover:border-sky-400/50',
    glow: 'group-hover:shadow-sky-500/10',
    accentText: 'text-sky-600',
  },
  {
    iconBg: 'from-slate-800 to-blue-900',
    hoverBorder: 'hover:border-blue-400/50',
    glow: 'group-hover:shadow-blue-500/10',
    accentText: 'text-blue-700',
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-20 bg-gradient-to-b from-[#070D1E] via-[#0C1A3A] to-[#081026] text-white">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[520px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[480px] h-[480px] bg-cyan-400/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-xs font-extrabold tracking-wider uppercase text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.18)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>ALL IT SOLUTIONS UNDER ONE ROOF</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.12]">
                Powering Your Business With{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                  Smart IT Solutions
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                From websites and custom software to search visibility and ongoing support, get one practical partner for your digital growth.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full border border-white/20 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Services</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-blue-600/35 border border-white/20 transition-all duration-200 hover:shadow-cyan-500/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Hero Note */}
              <div className="pt-3 flex items-center gap-3 text-xs text-slate-300 font-medium">
                <span className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
                <span>Built for small and local businesses across India</span>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md relative">
                {/* Glowing aura frame */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-400 opacity-20 blur-xl pointer-events-none" />

                <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0F1E3D]/90 to-[#070E22]/95 border border-cyan-500/20 backdrop-blur-2xl shadow-2xl">
                  {/* Card top bar */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-2 text-cyan-300 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      DIGITAL SYSTEMS / RAR.01
                    </span>
                    <span className="text-slate-400">18° 31’ 12.0” N</span>
                  </div>

                  {/* Interactive Visual Graphic */}
                  <div className="py-7 space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-4 hover:border-cyan-500/40 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/30">
                        <Layout size={22} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-white">Full-Stack Development</h2>
                        <p className="text-xs text-slate-400">Websites & Custom Applications</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-4 hover:border-cyan-500/40 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/30">
                        <Search size={22} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-white">Search Engine Growth</h2>
                        <p className="text-xs text-slate-400">SEO & Google Local Business</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-4 hover:border-cyan-500/40 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/30">
                        <Wrench size={22} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-white">24/7 Digital Support</h2>
                        <p className="text-xs text-slate-400">Ongoing Care & Maintenance</p>
                      </div>
                    </div>
                  </div>

                  {/* Card bottom metrics preview */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-cyan-400" />
                      <span>Performance: 99.8%</span>
                    </span>
                    <span className="text-cyan-400 font-bold">Reliable Architecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="mt-14 pt-8 text-center">
            <a
              href="#home-proof"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowDown size={14} className="animate-bounce text-cyan-400" />
              <span>Scroll to explore</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. TRUST & METRICS SECTION */}
      <section id="home-proof" className="py-20 bg-[#F8FAFC] relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span>A STRONGER DIGITAL FOUNDATION</span>
            </div>
            <p className="text-xl sm:text-2xl font-heading font-extrabold text-[#0B132B]">
              Clear solutions. Thoughtful delivery. Support that stays close.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, idx) => (
              <div
                key={stat.label}
                className="bg-white p-7 sm:p-8 rounded-3xl shadow-card-subtle border border-slate-200/80 text-center hover:border-blue-400/60 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {stat.value}
                  </span>
                  <span className="text-cyan-500 font-extrabold">{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500 mt-8 italic">
            {statisticsDisclaimer}
          </p>
        </div>
      </section>

      {/* 3. WHAT WE DO — SERVICES PREVIEW */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>WHAT WE DO</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#0B132B]">
                The right digital help, in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                  one place.
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Choose focused support for the next stage of your business—or bring several needs together with one partner.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-cyan-600 group transition-colors"
            >
              <span>View all services</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* 6 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Layout;
              const style = serviceGradients[index % serviceGradients.length];

              return (
                <div
                  key={service.slug}
                  className={`group bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden ${style.hoverBorder}`}
                >
                  {/* Subtle top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${style.iconBg} text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={26} />
                      </div>
                      <span className="font-heading font-bold text-xs text-slate-400">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-heading font-extrabold text-[#0B132B] mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {service.short}
                    </p>

                    {/* Included preview bullets */}
                    <ul className="space-y-2.5 mb-6">
                      {service.included.slice(0, 3).map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 size={15} className="text-cyan-500 shrink-0" />
                          <span className="line-clamp-1 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/contact?service=${service.slug}`}
                      className="text-xs font-bold text-blue-600 hover:text-cyan-600 flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight size={14} />
                    </Link>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                      Custom Scope
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY RAR CONSULTANT */}
      <section className="py-24 bg-[#F8FAFC] relative overflow-hidden border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left intro */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>WHY RAR CONSULTANT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B132B] leading-tight">
                Technology should move{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  your business forward.
                </span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                We keep the process understandable and the work connected to real business needs—without making digital transformation feel out of reach.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-[#0B132B] hover:bg-slate-900 text-white text-sm font-bold px-6 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg"
                >
                  <span>Get to know us</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Benefits List */}
            <div className="lg:col-span-7 space-y-4">
              {whyChooseUs.map((item, idx) => {
                const IconComp = iconMap[item.icon] || BadgeCheck;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-400/50 transition-all flex items-start gap-5 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0 border border-blue-100">
                      <IconComp size={22} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#0B132B] group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-cyan-500 transition-colors">
                          {item.number}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORKING PROCESS (5 STEPS) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span>A CLEAR WAY FORWARD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B132B]">
              A simple process. Strong{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                work, together.
              </span>
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
              From the first conversation to ongoing care, each stage stays collaborative and clear.
            </p>
          </div>

          {/* Steps Horizontal Track */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {workingProcess.map((step, index) => (
              <div
                key={step.number}
                className="relative bg-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-slate-200/80 flex flex-col justify-between group hover:bg-white hover:border-blue-400/50 hover:shadow-card-hover transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md shadow-blue-500/20">
                      {step.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 opacity-60 group-hover:scale-125 transition-transform" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-[#0B132B] mb-2 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGY STACK MARQUEE / GRID */}
      <section className="py-16 bg-[#070D1E] text-white relative overflow-hidden border-y border-cyan-500/10" aria-label="Technology and platforms">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider uppercase text-cyan-300 mb-2">
            <span>TOOLS THAT MAKE THE WORK WORK</span>
          </div>
          <p className="text-sm text-slate-300">
            Selected to fit the project, not the other way around.
          </p>
        </div>

        {/* Tech Pills */}
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 transition-all duration-200 shadow-sm"
            >
              <Sparkles size={13} className="text-cyan-400" />
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS SLIDER */}
      <TestimonialSlider />

      {/* 8. FINAL CTA SECTION */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#070D1E] via-[#0E1E42] to-[#08122B] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl border border-cyan-500/20">
            {/* Background decorative glows */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-600/25 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <p className="text-cyan-400 text-xs font-extrabold tracking-wider uppercase">
                YOUR NEXT STEP STARTS HERE
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
                Ready to take your business{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                  online?
                </span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Share what you’re working toward. We’ll help you find a practical way forward.
              </p>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-blue-600/35 border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Start a conversation</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
