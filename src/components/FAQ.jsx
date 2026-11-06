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
    <section id="faq" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="linear-badge">
              <Icon name="fileText" size={12} className="text-cyan-400" />
              CLARIFICATIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white text-slate-900 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 text-slate-600">
            Essential facts about PDFCatalyst's architecture, licensing, and security model.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-white/10 dark:border-white/10 border-slate-200 bg-[#111522]/80 dark:bg-[#111522]/80 bg-white overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white dark:text-white text-slate-900 hover:text-cyan-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                    <Icon
                      name="chevronDown"
                      size={14}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-cyan-400" : ""}`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-400 dark:text-slate-400 text-slate-600 leading-relaxed border-t border-white/5 dark:border-white/5 border-slate-100 pt-3">
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

