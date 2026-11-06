import React, { useState } from "react";
import { Icon } from "./Icon";

export function Comparison() {
  const cards = [
    {
      title: "Cost & Subscriptions",
      badge: "Zero Cost",
      pdfcatalyst: "$0 Free Forever",
      pdfcatalystDetail: "No monthly charges, no enterprise upgrades, and no hidden payment walls.",
      competitor: "Adobe Acrobat Pro",
      competitorDetail: "Costs $239.88 every single year per seat, adding up to thousands over time.",
    },
    {
      title: "Document Privacy",
      badge: "100% On-Device",
      pdfcatalyst: "Files Never Leave Your Device",
      pdfcatalystDetail: "All editing, signing, and OCR runs strictly on your local computer memory.",
      competitor: "Online Web Converters",
      competitorDetail: "Requires uploading confidential contracts, medical records, or taxes to unknown servers.",
    },
    {
      title: "Account Friction",
      badge: "Zero Friction",
      pdfcatalyst: "Instant Launch, No Account Needed",
      pdfcatalystDetail: "Download, open, and start working immediately without entering an email or password.",
      competitor: "Adobe Creative Cloud",
      competitorDetail: "Forces account logins, cloud authentications, and background update daemon agents.",
    },
    {
      title: "Redaction Safety",
      badge: "Permanent Removal",
      pdfcatalyst: "True Permanent Data Erasure",
      pdfcatalystDetail: "Sensitive text like SSNs and bank numbers are erased entirely from the PDF stream.",
      competitor: "Standard PDF Viewers",
      competitorDetail: "Merely draws a black box on top; anyone can select and copy the text underneath.",
    },
    {
      title: "Startup & Performance",
      badge: "Sub-Second",
      pdfcatalyst: "Opens in Under 200 Milliseconds",
      pdfcatalystDetail: "Smooth 60 FPS scrolling and zooming, even on 500-page engineering documents.",
      competitor: "Legacy PDF Suites",
      competitorDetail: "Heavy software that takes 5 to 10 seconds to start and bogs down older computers.",
    },
    {
      title: "Page & Size Limits",
      badge: "No Limits",
      pdfcatalyst: "Unlimited Pages & File Sizes",
      pdfcatalystDetail: "Merge 50 large files or reorganize 1,000-page documents without restriction.",
      competitor: "Freemium Web Tools",
      competitorDetail: "Slaps you with 'Page limit reached' or 'File size exceeded — Upgrade to Continue'.",
    },
  ];

  // Interactive slider state: 0 (leaky cloud) to 100 (air-gapped PDFCatalyst)
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section id="why-switch" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono font-medium text-slate-300 mb-4">
            <Icon name="shield" size={13} className="text-emerald-400" />
            <span>THE AIR-GAPPED ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why People Switch to PDFCatalyst.
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Escape monthly subscription lock-ins and slow cloud uploads with an air-gapped native desktop workbench.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <div
              key={i}
              className="rounded-3xl p-6 glass-island border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="font-semibold text-sm text-white">{c.title}</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {c.badge}
                  </span>
                </div>

                {/* PDFCatalyst Winner Side */}
                <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                    <Icon name="checkCircle" size={14} />
                    <span>PDFCatalyst</span>
                  </div>
                  <div className="text-sm font-semibold text-white">{c.pdfcatalyst}</div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {c.pdfcatalystDetail}
                  </p>
                </div>

                {/* Competitor Loser Side */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                    <Icon name="x" size={13} className="text-rose-400" />
                    <span>{c.competitor}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {c.competitorDetail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Split View Slider */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-island border border-white/10">
          <div className="max-w-xl mx-auto text-center mb-6">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
              INTERACTIVE PRIVACY AUDIT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Cloud Uploads vs. 100% Air-Gapped Execution
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Drag the slider to compare remote server risk with zero-trace local processing.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              aria-label="Privacy comparison slider"
            />

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  sliderPos < 50
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    : "bg-white/[0.02] border-white/5 text-slate-400"
                }`}
              >
                <div className="font-bold mb-1">Standard Online Web Converters</div>
                <div>• Uploads raw file to remote cloud server</div>
                <div>• Stored in third-party database logs</div>
                <div>• Exposed to network interception</div>
              </div>

              <div
                className={`p-4 rounded-2xl border transition-all ${
                  sliderPos >= 50
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-white/[0.02] border-white/5 text-slate-400"
                }`}
              >
                <div className="font-bold mb-1">PDFCatalyst Native Rust</div>
                <div>• 100% processed in local device RAM</div>
                <div>• Zero bytes transmitted over network</div>
                <div>• Works completely offline / air-gapped</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
