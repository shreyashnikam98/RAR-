import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowRight } from 'lucide-react';
import PageHeader from './PageHeader';
import { companyInfo } from '../data/websiteData';

function slugify(heading = '') {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function LegalLayout({ title, description, sections }) {
  return (
    <main id="top" className="overflow-hidden">
      {/* 1. Header */}
      <PageHeader
        eyebrow="RAR CONSULTANT / LEGAL"
        title={title}
        description={description}
        breadcrumb={[title]}
      />

      {/* 2. Main Content & Sidebar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sidebar navigation */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 shadow-sm max-h-[80vh] overflow-y-auto">
                <p className="text-xs font-bold tracking-wider uppercase text-blue-600 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>ON THIS PAGE</span>
                </p>

                <nav aria-label={`${title} sections`} className="space-y-1 text-xs">
                  {sections.map((section, idx) => {
                    const slug = slugify(section.heading);
                    return (
                      <a
                        key={section.heading}
                        href={`#${slug}`}
                        className="flex items-start gap-2.5 py-2 px-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-white transition-colors leading-tight font-medium"
                      >
                        <span className="font-mono text-blue-600 text-[11px] font-bold shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span>{section.heading}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Article Content */}
            <article className="lg:col-span-8 space-y-10">
              {/* Last Updated badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-bold text-[#0B132B]">Last updated:</span>
                  <time dateTime="2026-11-01" className="font-semibold">{companyInfo.lastUpdated}</time>
                </div>
                <Link
                  to="/contact"
                  className="text-xs font-bold text-blue-600 hover:text-cyan-600 flex items-center gap-1 transition-colors"
                >
                  <span>Questions or rights requests? Contact us</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Sections list */}
              <div className="space-y-10">
                {sections.map((section, idx) => {
                  const slug = slugify(section.heading);
                  return (
                    <section
                      key={section.heading}
                      id={slug}
                      className="scroll-mt-32 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-card-subtle space-y-4 hover:border-blue-400/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-lg">
                          SECTION {String(idx + 1).padStart(2, '0')}
                        </span>
                        <a
                          href={`#${slug}`}
                          className="text-slate-300 hover:text-blue-600 text-xs transition-colors font-mono"
                          title="Direct link"
                        >
                          #
                        </a>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0B132B] pt-1">
                        {section.heading}
                      </h2>

                      <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                        {section.paragraphs.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {section.items && (
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 pt-2 font-normal">
                          {section.items.map((item, iIdx) => (
                            <li key={iIdx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </section>
                  );
                })}
              </div>

              {/* Back to top */}
              <div className="pt-6 border-t border-slate-200 flex justify-end">
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 px-4 py-2 rounded-xl bg-[#F8FAFC] border border-slate-200/80 transition-colors"
                >
                  <ArrowUp size={14} />
                  <span>Back to top</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
