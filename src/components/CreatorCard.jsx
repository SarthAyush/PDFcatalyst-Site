import React from "react";
import { Icon } from "./Icon";

export function CreatorCard() {
  return (
    <section className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-6 sm:p-8 glass-island border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-slate-300">
              <Icon name="sparkle" size={12} className="text-cyan-400" />
              <span>CREATOR & MAINTAINER</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Sarthak Saxena
            </h3>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Building fast, private, and dependable desktop software that respects your personal data and gives you back full control over your documents.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                <Icon name="shield" size={12} />
                <span>100% On-Device Privacy</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
                <Icon name="check" size={12} />
                <span>Dual Licensed (MIT / Apache-2.0)</span>
              </span>
            </div>
          </div>

          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-2 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
            <img
              src="/pdfix-logo.png"
              alt="PDFCatalyst Logo"
              width="56"
              height="56"
              className="drop-shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
