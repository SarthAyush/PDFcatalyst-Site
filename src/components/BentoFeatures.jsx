import React from "react";
import { Icon } from "./Icon";

export function BentoFeatures() {
  const features = [
    {
      title: "On-Device Neural OCR",
      subtitle: "Smart Character Extraction",
      desc: "Turn phone photos, paper receipts, and archived records into crisp, selectable, and searchable text without ever uploading files to cloud servers.",
      icon: "search",
      badge: "Vision",
      tag: "100% Offline",
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
      colSpan: "lg:col-span-2",
    },
    {
      title: "True Irreversible Redact",
      subtitle: "Zero Data Leakage",
      desc: "Standard viewers merely paint surface-level black boxes. PDFCatalyst permanently removes underlying bytes and hidden metadata from the file.",
      icon: "lock",
      badge: "Security",
      tag: "Zero Leaks",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      colSpan: "lg:col-span-1",
    },
    {
      title: "Silky 60 FPS Zoom Engine",
      subtitle: "Hardware-Accelerated",
      desc: "Pan and zoom effortlessly up to 800% on massive 500-page architectural drawings with zero stuttering, frozen windows, or memory bloat.",
      icon: "cpu",
      badge: "Performance",
      tag: "60 FPS Fluid",
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      colSpan: "lg:col-span-1",
    },
    {
      title: "Architectural CAD Caliper",
      subtitle: "Calibrated Blueprint Measure",
      desc: "Calibrate drawings to Imperial and Metric scale ratios. Calculate room dimensions, corridor runs, and square footage in real time.",
      icon: "ruler",
      badge: "Precision",
      tag: "Calibrated Scale",
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      colSpan: "lg:col-span-2",
    },
    {
      title: "1-Click Digital Sign",
      subtitle: "Verified Approvals",
      desc: "Add your personal signature, date stamps, and verified digital approval seals directly to agreements without printing or scanning.",
      icon: "penTool",
      badge: "Signatures",
      tag: "Print-Free",
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      colSpan: "lg:col-span-1",
    },
    {
      title: "Instant Batch Studio",
      subtitle: "Multi-File Organizing",
      desc: "Combine, split, compress, and rotate entire folders of documents with smooth drag-and-drop ease in sub-second bursts.",
      icon: "layers",
      badge: "Productivity",
      tag: "Sub-Second",
      gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
      colSpan: "lg:col-span-2",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono font-medium text-slate-300 mb-4">
            <Icon name="sparkle" size={13} className="text-cyan-400" />
            <span>INTELLIGENCE & PRECISION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for High-Performance Workflows.
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Essential document tools compiled into a pure Rust desktop binary with zero cloud dependencies.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`${f.colSpan} relative rounded-3xl p-6 sm:p-7 glass-island border border-white/10 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden group`}
            >
              {/* Top ambient glow */}
              <div
                className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${f.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all">
                    <Icon name={f.icon} size={19} />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-white/5 text-slate-300 border border-white/10">
                    {f.tag}
                  </span>
                </div>

                <div className="text-xs font-mono font-medium text-cyan-400 mb-1">
                  {f.subtitle}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">Category: {f.badge}</span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  Learn more <Icon name="chevronRight" size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
