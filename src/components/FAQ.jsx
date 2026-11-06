import React, { useState } from "react";
import { Icon } from "./Icons";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Is PDFCatalyst completely free forever?",
      a: "Yes. PDFCatalyst is 100% free for personal and commercial use. There are zero subscriptions, zero feature gates, zero document limits, and no credit card is ever required.",
    },
    {
      q: "Does PDFCatalyst upload any files or collect telemetry?",
      a: "Never. PDFCatalyst is an air-gapped, native desktop executable. All PDF rendering, byte-level redaction, and neural OCR run 100% locally on your CPU with zero telemetry or network calls.",
    },
    {
      q: "How does byte-level redaction differ from black highlighter boxes?",
      a: "Drawing a black rectangle only masks the screen pixels—the underlying font glyphs and stream coordinates remain selectable and searchable. PDFCatalyst rewrites the PDF content streams, physically purging and zeroing the raw text bytes.",
    },
    {
      q: "Which operating systems are supported?",
      a: "PDFCatalyst is currently compiled and optimized for 64-bit Windows 10 and Windows 11. Cross-platform Linux and macOS binaries are in active development.",
    },
    {
      q: "Can I use PDFCatalyst without an internet connection?",
      a: "Yes. The installer and portable binary are completely self-contained with all OCR neural weights included. It functions seamlessly in high-security, air-gapped environments.",
    },
  ];

  return (
    <section id="faq" className="py-14 sm:py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="linear-badge">
              <Icon name="fileText" size={12} className="text-cyan-600 dark:text-cyan-400" />
              CLARIFICATIONS
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Essential facts about PDFCatalyst's architecture, licensing, and security model.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-2.5 sm:space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="reveal-on-scroll rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111522]/80 overflow-hidden shadow-sm transition-all"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <span className="pr-2">{faq.q}</span>
                  <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
                    <Icon
                      name="chevronDown"
                      size={14}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-cyan-600 dark:text-cyan-400" : ""}`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-700 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
