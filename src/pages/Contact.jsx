import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Clock, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { companyInfo } from '../data/websiteData';

const directOptions = [
  {
    icon: Phone,
    eyebrow: 'CALL',
    title: companyInfo.phoneDisplay,
    href: `tel:${companyInfo.phone}`,
    external: false,
    colorStyle: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  },
  {
    icon: Mail,
    eyebrow: 'EMAIL',
    title: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
    external: false,
    colorStyle: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white',
  },
  {
    icon: MessageCircle,
    eyebrow: 'WHATSAPP',
    title: 'Chat with our team',
    href: companyInfo.whatsappUrl,
    external: true,
    colorStyle: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
  },
];

export default function Contact() {
  return (
    <main className="overflow-hidden">
      {/* 1. Page Header */}
      <PageHeader
        eyebrow="LET’S START A CONVERSATION"
        title="What can we help you"
        accent="build next?"
        description="Share a little about your goals. We’ll use your details only to respond and prepare a relevant quote."
        breadcrumb={['Contact Us']}
      />

      {/* 2. Main Two-Column Layout */}
      <section className="py-20 bg-[#F8FAFC] relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info */}
            <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>REACH OUT DIRECTLY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B132B] leading-tight">
                  A clear answer is{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    just a message away.
                  </span>
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Choose the channel that works for you, or send an enquiry and we’ll follow up using the contact details you provide.
                </p>
              </div>

              {/* Contact Option Cards */}
              <div className="space-y-4">
                {directOptions.map((opt) => {
                  const IconComp = opt.icon;
                  return (
                    <a
                      key={opt.eyebrow}
                      href={opt.href}
                      target={opt.external ? '_blank' : undefined}
                      rel={opt.external ? 'noopener noreferrer' : undefined}
                      className="group p-5 rounded-3xl bg-white border border-slate-200/80 shadow-card-subtle hover:shadow-card-hover hover:border-blue-400/50 transition-all duration-300 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 border border-slate-100 ${opt.colorStyle}`}>
                          <IconComp size={22} />
                        </div>
                        <div>
                          <small className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            {opt.eyebrow}
                          </small>
                          <strong className="block text-sm sm:text-base text-[#0B132B] font-bold group-hover:text-blue-600 transition-colors">
                            {opt.title}
                          </strong>
                        </div>
                      </div>
                      <ArrowUpRight size={18} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  );
                })}
              </div>

              {/* Working Hours & Location */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-card-subtle space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Clock size={19} />
                  </div>
                  <div>
                    <small className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      WORKING HOURS
                    </small>
                    <strong className="text-xs sm:text-sm text-[#0B132B] font-bold">
                      {companyInfo.workingHours}
                    </strong>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                    <MapPin size={19} />
                  </div>
                  <div>
                    <small className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      LOCATION
                    </small>
                    <strong className="text-xs sm:text-sm text-[#0B132B] font-bold">
                      {companyInfo.locationDisplay}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Privacy note */}
              <p className="text-xs text-slate-500 leading-relaxed flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>
                  Your enquiry is handled according to our{' '}
                  <Link to="/privacy-policy" className="text-blue-600 font-bold hover:text-cyan-600 hover:underline">
                    Privacy Policy
                  </Link>
                  . We do not store form submissions in a database.
                </span>
              </p>
            </aside>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
