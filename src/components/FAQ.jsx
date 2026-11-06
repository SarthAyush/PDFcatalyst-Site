import React, { useState } from "react";
import { Icon } from "./Icon";

export function FAQ() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "Is PDFCatalyst completely free to use?",
      a: "Yes. PDFCatalyst is 100% free with no monthly subscription fees, no watermarks placed on your documents, and no features locked behind paywalls.",
    },
    {
      q: "Are my files uploaded to any servers?",
      a: "Never. All document processing, editing, signing, and OCR happen strictly on your local computer. Your private files never leave your device.",
    },
    {
      q: "How does PDFCatalyst's permanent redaction work?",
      a: "Standard PDF viewers only draw an opaque black box over text, leaving the words intact so anyone can copy them. PDFCatalyst permanently removes the underlying data from the file so it cannot be recovered.",
    },
    {
      q: "What is the difference between the Installer and Portable version?",
      a: "The Windows Installer sets up desktop shortcuts and opens PDF files when double-clicked. The Portable version is a standalone file that runs immediately from any folder or USB drive without installation or administrator privileges.",
    },
    {
      q: "Can I use PDFCatalyst for commercial and work documents?",
      a: "Yes. PDFCatalyst is open source under dual MIT and Apache-2.0 licenses, allowing unrestricted use for personal, professional, and business tasks.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono font-medium text-slate-300 mb-4">
            <Icon name="sparkle" size={13} className="text-cyan-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Common Questions, Answered Simply.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl glass-island border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-cyan-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center font-mono text-sm text-slate-400 shrink-0 ml-4">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5">
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
