import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Lightbulb,
  ShieldCheck,
  UsersRound,
  Target,
  Compass,
  ArrowRight,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { aboutData, statistics } from '../data/websiteData';

const valueCardsConfig = [
  {
    icon: Heart,
    color: 'text-rose-600 bg-rose-50 border-rose-200/80',
  },
  {
    icon: Lightbulb,
    color: 'text-amber-600 bg-amber-50 border-amber-200/80',
  },
  {
    icon: ShieldCheck,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200/80',
  },
  {
    icon: UsersRound,
    color: 'text-blue-600 bg-blue-50 border-blue-200/80',
  },
];

export default function About() {
  return (
    <main className="overflow-hidden">
      {/* 1. Page Header */}
      <PageHeader
        eyebrow={aboutData.eyebrow}
        title="A practical partner for your"
        accent="digital journey."
        description={aboutData.description}
        breadcrumb={['About Us']}
      />

      {/* 2. Our Story Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Story Aside Card */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-[#070D1E] via-[#0E1E42] to-[#08122B] text-white p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-cyan-500/20">
                <div className="text-3xl font-heading font-extrabold text-cyan-300 mb-4 tracking-wider">
                  RAR <span className="text-white/30">/</span> 01
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-6" />
                <p className="text-slate-300 text-base leading-relaxed font-normal">
                  {aboutData.story.asideText}
                </p>
                <div className="mt-8 pt-6 border-t border-white/10 text-xs text-cyan-400 font-mono font-bold tracking-widest uppercase">
                  TRUSTED IT CONSULTANCY
                </div>
              </div>
            </div>

            {/* Right Story Copy */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>{aboutData.story.eyebrow}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#0B132B] leading-tight">
                Built around one simple idea:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                  good technology should feel within reach.
                </span>
              </h2>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed font-normal">
                {aboutData.story.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 border border-blue-200/60 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                <span className="text-sm font-bold text-[#0B132B]">
                  {aboutData.story.callout}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Cards */}
      <section className="py-20 bg-[#F8FAFC] relative border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card-subtle border border-slate-200/80 hover:border-blue-400/50 hover:shadow-card-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                <Target size={26} />
              </div>
              <p className="text-xs font-bold tracking-wider uppercase text-blue-600 mb-2">
                {aboutData.mission.eyebrow}
              </p>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B132B] mb-3">
                Make digital progress <span className="text-blue-600">practical.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {aboutData.mission.text}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card-subtle border border-slate-200/80 hover:border-cyan-400/50 hover:shadow-card-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200/80 text-cyan-600 flex items-center justify-center mb-6 shadow-sm">
                <Compass size={26} />
              </div>
              <p className="text-xs font-bold tracking-wider uppercase text-cyan-600 mb-2">
                {aboutData.vision.eyebrow}
              </p>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B132B] mb-3">
                More businesses, <span className="text-cyan-600">better equipped.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {aboutData.vision.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Company Values */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span>WHAT GUIDES US</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B132B]">
              Values that show up in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                the way we work.
              </span>
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
              The best partnership is built from the everyday details: listening, honest expectations, and support after launch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((val, idx) => {
              const cfg = valueCardsConfig[idx % valueCardsConfig.length];
              const IconComp = cfg.icon;
              return (
                <div
                  key={val.title}
                  className="bg-[#F8FAFC] rounded-3xl p-7 border border-slate-200/80 hover:bg-white hover:border-blue-400/50 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border shadow-sm ${cfg.color}`}>
                    <IconComp size={22} />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-[#0B132B] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {val.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. What We Do & Metrics */}
      <section className="py-20 bg-[#070D1E] text-white relative border-y border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-bold tracking-wider uppercase text-cyan-400">
                WHAT WE DO
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                Digital foundations for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  everyday business.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                We connect web development, custom software, search, e-commerce, local digital setup, and maintenance into one useful service offer.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {statistics.map((s) => (
                <div
                  key={s.label}
                  className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-center hover:border-cyan-500/40 transition-colors"
                >
                  <strong className="block text-2xl sm:text-3xl font-heading font-black text-cyan-300 mb-1">
                    {s.value}
                    {s.suffix}
                  </strong>
                  <span className="text-xs text-slate-300 font-semibold">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400 italic text-center">
            Illustrative placeholder figures — confirm and update these values before launch.
          </p>
        </div>
      </section>

      {/* 6. How We Work (4 steps) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span>HOW WE WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B132B]">
              From a first question to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                steady support.
              </span>
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
              A collaborative method keeps the work useful, transparent, and grounded in your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.howWeWork.map((step) => (
              <div
                key={step.number}
                className="bg-[#F8FAFC] rounded-3xl p-7 border border-slate-200/80 hover:bg-white hover:border-blue-400/50 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-mono font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1 rounded-xl shadow-sm mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-heading font-extrabold text-lg text-[#0B132B] mb-2">
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

      {/* 7. Small Business, Big Possibilities */}
      <section className="py-20 bg-[#F8FAFC] relative border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>{aboutData.smallBusiness.eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-[#0B132B] leading-tight">
                Local businesses deserve{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  good digital support, too.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {aboutData.smallBusiness.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Contact CTA */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#070D1E] via-[#0E1E42] to-[#08122B] rounded-3xl p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-cyan-500/20">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-cyan-400 mb-2">
                LET’S TALK ABOUT WHAT’S NEXT
              </p>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Need a dependable <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">IT partner?</span>
              </h2>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-blue-600/35 border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 shrink-0"
            >
              <span>Contact RAR Consultant</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
