import React from "react";
import { Icon } from "./Icons";

export function BentoFeatures() {
  const features = [
    {
      title: "Permanent Byte-Level Redaction",
      tag: "SECURITY",
      desc: "Completely purges raw content stream bytes, font glyphs, and metadata. No recoverable data remains beneath black boxes.",
      icon: "eyeOff",
      accent: "from-rose-500/20 to-orange-500/10",
      borderAccent: "group-hover:border-rose-500/50",
      badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
      stat: "100% Sanitized",
      statLabel: "Zero data leakage",
    },
    {
      title: "On-Device Neural OCR",
      tag: "VISION ENGINE",
      desc: "Extract text from scanned PDFs, invoices, and blueprints directly on your CPU. Zero cloud uploads, zero per-page fees.",
      icon: "cpu",
      accent: "from-cyan-500/20 to-blue-500/10",
      borderAccent: "group-hover:border-cyan-500/50",
      badgeColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      stat: "0 ms Upload",
      statLabel: "Local inference",
    },
    {
      title: "60 FPS GPU Rendering",
      tag: "PERFORMANCE",
      desc: "Instant panning and infinite zoom on multi-gigabyte construction plans and vector schematics with zero tile stutter.",
      icon: "zap",
      accent: "from-emerald-500/20 to-teal-500/10",
      borderAccent: "group-hover:border-emerald-500/50",
      badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      stat: "60 FPS",
      statLabel: "Hardware accelerated",
    },
    {
      title: "CAD Blueprint Caliper",
      tag: "ENGINEERING",
      desc: "Calibrate architectural scales (e.g. 1/4\" = 1'-0\") to measure live linear distances, wall perimeters, and room square footage.",
      icon: "crosshair",
      accent: "from-amber-500/20 to-yellow-500/10",
      borderAccent: "group-hover:border-amber-500/50",
      badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      stat: "Sub-pixel",
      statLabel: "Scale precision",
    },
    {
      title: "Cryptographic Signatures",
      tag: "COMPLIANCE",
      desc: "Self-sign documents with local X.509 PKI certificates and SHA-256 digests. Validate signer integrity without third-party fees.",
      icon: "lock",
      accent: "from-violet-500/20 to-indigo-500/10",
      borderAccent: "group-hover:border-violet-500/50",
      badgeColor: "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20",
      stat: "SHA-256",
      statLabel: "PKCS#7 standard",
    },
    {
      title: "Parallel Batch Studio",
      tag: "WORKFLOW",
      desc: "Split, merge, reorder, compress, and watermark hundreds of documents in seconds across all available CPU threads.",
      icon: "layers",
      accent: "from-blue-500/20 to-cyan-500/10",
      borderAccent: "group-hover:border-blue-500/50",
      badgeColor: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
      stat: "Multi-threaded",
      statLabel: "Rayon parallel engine",
    },
  ];

  return (
    <section id="features" className="py-14 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="linear-badge">
              <Icon name="layers" size={12} className="text-cyan-600 dark:text-cyan-400" />
              CORE ARCHITECTURE
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 sm:mb-3">
            Engineered for Precision.
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400">
            Everything essential for high-performance PDF workflows. No subscription bloat, no cloud tracking.
          </p>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feat, i) => (
            <div
              key={i}
              className={`glint-card reveal-on-scroll group relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111522]/85 border border-slate-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/5 ${feat.borderAccent}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Subtle top corner gradient */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feat.accent} rounded-tr-2xl blur-2xl opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`}
              />

              {/* Tag & Icon */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                <span
                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${feat.badgeColor}`}
                >
                  {feat.tag}
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  <Icon name={feat.icon} size={16} />
                </div>
              </div>

              {/* Title & Desc */}
              <div className="relative z-10 mb-5 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              {/* Metric Stat Footer */}
              <div className="pt-3 sm:pt-4 border-t border-slate-100 dark:border-white/5 flex items-baseline justify-between relative z-10">
                <span className="text-xs font-mono font-semibold text-slate-900 dark:text-white">
                  {feat.stat}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {feat.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
