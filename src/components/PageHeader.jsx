import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({ eyebrow, title, accent, description, breadcrumb = [] }) {
  return (
    <div className="relative pt-32 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-[#070D1E] via-[#0C1A3A] to-[#070D1E] text-white overflow-hidden border-b border-cyan-500/10">
      {/* Background visual accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-400/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6">
            <Link to="/" className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
              <Home size={13} className="text-cyan-400" />
              <span>Home</span>
            </Link>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <ChevronRight size={13} className="text-slate-500" />
                <span className="text-cyan-300 font-bold">{item}</span>
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-xs font-extrabold tracking-wider uppercase text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{eyebrow}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
          {title}{' '}
          {accent && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              {accent}
            </span>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
