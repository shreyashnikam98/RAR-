import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ArrowRight,
  HelpCircle,
  Layout,
  Code2,
  Search,
  ShoppingBag,
  MapPin,
  Wrench,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import FaqAccordion from '../components/FaqAccordion';
import { services } from '../data/websiteData';

const iconMap = {
  Layout,
  Code2,
  Search,
  ShoppingBag,
  MapPin,
  Wrench,
};

const serviceStyles = [
  {
    gradient: 'from-[#070D1E] via-[#0E1E42] to-[#08122B]',
    iconColor: 'text-cyan-400',
    numberColor: 'text-cyan-400/20',
  },
  {
    gradient: 'from-[#070D1E] via-[#151D42] to-[#0B1432]',
    iconColor: 'text-blue-400',
    numberColor: 'text-blue-400/20',
  },
  {
    gradient: 'from-[#070D1E] via-[#0A243D] to-[#071829]',
    iconColor: 'text-teal-400',
    numberColor: 'text-teal-400/20',
  },
  {
    gradient: 'from-[#070D1E] via-[#101E46] to-[#081330]',
    iconColor: 'text-sky-400',
    numberColor: 'text-sky-400/20',
  },
  {
    gradient: 'from-[#070D1E] via-[#0E203B] to-[#071426]',
    iconColor: 'text-cyan-300',
    numberColor: 'text-cyan-300/20',
  },
  {
    gradient: 'from-[#070D1E] via-[#131D38] to-[#081024]',
    iconColor: 'text-indigo-400',
    numberColor: 'text-indigo-400/20',
  },
];

export default function Services() {
  return (
    <main className="overflow-hidden">
      {/* 1. Page Header */}
      <PageHeader
        eyebrow="OUR SERVICES"
        title="One roof. Six ways to"
        accent="move forward."
        description="Choose focused help for a single need or bring connected parts of your digital work together."
        breadcrumb={['Services']}
      />

      {/* 2. Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-14 border-b border-slate-200">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>PRACTICAL IT SOLUTIONS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#0B132B]">
                Built around your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  business needs.
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Every project starts with a clear conversation about your goals, timing, and scope. Quotes are tailored to the work—no invented package prices.
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-xs sm:text-sm text-slate-700">
              <HelpCircle size={20} className="text-blue-600 shrink-0" />
              <span>
                Looking for an option not listed?{' '}
                <Link to="/contact" className="text-blue-600 font-bold hover:text-cyan-600 hover:underline">
                  Tell us about it.
                </Link>
              </span>
            </div>
          </div>

          {/* 3. Detailed Service Rows */}
          <div className="pt-16 space-y-16">
            {services.map((service, index) => {
              const IconComp = iconMap[service.icon] || Layout;
              const isEven = index % 2 === 1;
              const style = serviceStyles[index % serviceStyles.length];

              return (
                <div
                  key={service.slug}
                  id={`service-${service.slug}`}
                  className="scroll-mt-32 rounded-3xl p-8 sm:p-12 border border-slate-200/80 bg-white shadow-card-subtle hover:shadow-card-hover transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center group"
                >
                  {/* Visual Column */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-center items-center text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${style.gradient} text-white relative overflow-hidden shadow-xl border border-cyan-500/15 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className={`absolute top-4 left-6 text-5xl sm:text-6xl font-heading font-black select-none ${style.numberColor}`}>
                      0{index + 1}
                    </div>
                    <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                      <IconComp size={40} className={style.iconColor} strokeWidth={1.5} />
                    </div>
                    <div className="text-xs font-mono tracking-widest uppercase font-bold mb-1 text-cyan-400">
                      SERVICE 0{index + 1}
                    </div>
                    <div className="text-lg font-heading font-extrabold text-white max-w-xs">
                      {service.title}
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      <span className="text-xs font-bold tracking-wider uppercase text-blue-600">
                        SERVICE 0{index + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B132B] mt-1 mb-3">
                        {service.title}
                      </h2>
                      <p className="text-base text-slate-600 leading-relaxed font-normal">
                        {service.description}
                      </p>
                    </div>

                    {/* What's included */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B132B] mb-3">
                        What’s included
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.included.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80"
                          >
                            <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                              <Check size={12} strokeWidth={2.5} />
                            </span>
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal for */}
                    <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-blue-900 font-bold">Ideal for: </strong>
                      {service.idealFor}
                    </div>

                    {/* Button */}
                    <div className="pt-2">
                      <Link
                        to={`/contact?service=${service.slug}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-sm px-6 py-3 rounded-full shadow-md shadow-blue-500/25 border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <span>Get a Quote</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FAQs Section */}
      <section className="py-24 bg-[#F8FAFC] relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>GOOD TO KNOW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B132B] leading-tight">
                A few common <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">questions.</span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                If you need a more specific answer, send us a message and we’ll talk it through.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-cyan-600 transition-colors"
                >
                  <span>Ask us directly</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#070D1E] via-[#0E1E42] to-[#08122B] rounded-3xl p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-cyan-500/20">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-cyan-400 mb-2">
                NO FIXED PACKAGE PRICES
              </p>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Let’s scope the right work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">for you.</span>
              </h2>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-blue-600/35 border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 shrink-0"
            >
              <span>Get a Free Quote</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
