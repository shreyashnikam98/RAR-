import React from 'react';

export default function SectionTitle({
  eyebrow,
  title,
  accent,
  text,
  align = 'left',
  light = false,
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 ${
            light
              ? 'bg-white/10 text-accent border border-white/10'
              : 'bg-secondary/10 text-secondary border border-secondary/20'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold tracking-tight leading-tight ${
          light ? 'text-white' : 'text-primary'
        }`}
      >
        {title}{' '}
        {accent && (
          <span className={light ? 'text-cyan-400' : 'text-secondary'}>
            {accent}
          </span>
        )}
      </h2>

      {text && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed ${
            light ? 'text-slate-300' : 'text-secondaryText'
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

