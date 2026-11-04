import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/websiteData';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className={`rounded-2xl transition-all duration-200 border ${
              isOpen
                ? 'bg-white shadow-md border-secondary/30 ring-1 ring-secondary/20'
                : 'bg-white/80 hover:bg-white border-slate-200'
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none focus:ring-2 focus:ring-secondary/40 rounded-2xl"
              >
                <span className="font-heading font-semibold text-base sm:text-lg text-primary">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-secondary text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <ChevronDown size={17} />
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={`faq-answer-${index}`}
                className="px-6 pb-6 pt-1 text-sm sm:text-base text-secondaryText leading-relaxed border-t border-slate-100"
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

