import React, { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials, testimonialsDisclaimer } from '../data/websiteData';

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex + testimonials.length - 1) % testimonials.length);
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden border-b border-slate-200/80">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Intro Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span>{testimonialsDisclaimer.eyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-[#0B132B] leading-tight">
              Good work starts with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                a good conversation.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {testimonialsDisclaimer.text}
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
              <Clock size={15} className="text-amber-600" />
              <span>{testimonialsDisclaimer.badge}</span>
            </div>
          </div>

          {/* Right Slider Card */}
          <div className="lg:col-span-7">
            <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-card-subtle border border-slate-200/80 hover:shadow-card-hover transition-all duration-300">
              {/* Quote icon mark */}
              <div className="absolute top-8 right-8 text-blue-100 pointer-events-none">
                <Quote size={56} className="fill-current" />
              </div>

              <div className="min-h-[160px] flex flex-col justify-center">
                <blockquote className="text-lg sm:text-xl font-medium text-[#0B132B] leading-relaxed italic relative z-10">
                  {current.quote}
                </blockquote>
                <p className="mt-6 text-xs sm:text-sm text-slate-500 font-semibold">
                  {current.source}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="font-heading text-xs font-bold tracking-wider text-slate-400">
                  <span className="text-blue-600 text-sm font-extrabold">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </span>{' '}
                  / {String(testimonials.length).padStart(2, '0')}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous sample quote"
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next sample quote"
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
