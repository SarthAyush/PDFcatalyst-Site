import React from "react";
import { Icon } from "./Icons";

export function Comparison() {
  const rows = [
    {
      feature: "Price & Licensing",
      pdfcatalyst: "$0 Free Forever",
      highlight: true,
      adobe: "$239.88 / year",
      cloud: "Freemium ($12/mo)",
    },
    {
      feature: "Data Privacy & Air-Gap",
      pdfcatalyst: "100% On-Device (Zero Cloud)",
      highlight: true,
      adobe: "Auto-syncs to Adobe Cloud",
      cloud: "Uploaded to 3rd-party servers",
    },
    {
      feature: "Byte-Level Redaction",
      pdfcatalyst: "Permanent Stream Zeroing",
      highlight: true,
      adobe: "Requires Pro License ($20/mo)",
      cloud: "Superficial visual mask only",
    },
    {
      feature: "Offline Functionality",
      pdfcatalyst: "Fully Functional Offline",
      highlight: true,
      adobe: "Periodic license re-auth required",
      cloud: "Inoperable without internet",
    },
    {
      feature: "Cold Start Latency",
      pdfcatalyst: "< 200 ms (Native Rust)",
      highlight: true,
      adobe: "3.4 - 5.0 seconds",
      cloud: "Slow HTTP upload latency",
    },
    {
      feature: "Telemetry & Tracking",
      pdfcatalyst: "Zero Tracking / No Analytics",
      highlight: true,
      adobe: "Aggressive usage telemetry",
      cloud: "Cookies, analytics & retargeting",
    },
  ];

  return (
    <section id="compare" className="py-14 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="linear-badge">
              <Icon name="shield" size={12} className="text-cyan-500 dark:text-cyan-400" />
              DIRECT COMPARISON
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white dark:text-white text-slate-900 mb-2">
            Why Switch to PDFCatalyst?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 text-slate-600">
            Compare native desktop engineering with bloated enterprise subscription models.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-3">
          <span>← Swipe horizontally to inspect all tools →</span>
        </div>

        {/* Comparison Table */}
        <div className="reveal-on-scroll rounded-2xl border border-white/10 dark:border-white/10 border-slate-200 bg-[#111522]/90 dark:bg-[#111522]/90 bg-white overflow-hidden shadow-xl">
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b border-white/10 dark:border-white/10 border-slate-200 bg-slate-50 dark:bg-white/[0.02]">
                  <th className="py-3.5 sm:py-4 px-4 sm:px-5 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-5 text-[11px] sm:text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-500/[0.04] border-x border-emerald-500/20 font-bold">
                    PDFCatalyst (Rust)
                  </th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-5 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Adobe Acrobat Pro
                  </th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-5 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Cloud Converters
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 dark:divide-white/5 divide-slate-100 text-xs">
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 sm:py-3.5 px-4 sm:px-5 font-medium text-slate-900 dark:text-white">
                      {row.feature}
                    </td>
                    <td className="py-3 sm:py-3.5 px-4 sm:px-5 font-mono font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-500/[0.04] border-x border-emerald-500/20 flex items-center gap-1.5 sm:gap-2">
                      <Icon name="checkCircle" size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span>{row.pdfcatalyst}</span>
                    </td>
                    <td className="py-3 sm:py-3.5 px-4 sm:px-5 text-slate-600 dark:text-slate-400">
                      {row.adobe}
                    </td>
                    <td className="py-3 sm:py-3.5 px-4 sm:px-5 text-slate-600 dark:text-slate-400">
                      {row.cloud}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
