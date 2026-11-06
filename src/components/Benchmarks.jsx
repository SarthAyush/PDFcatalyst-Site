import React, { useState } from "react";
import { Icon } from "./Icon";

export function Benchmarks() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);

    let val = 0;
    const interval = setInterval(() => {
      val += 5;
      if (val >= 100) {
        clearInterval(interval);
        setProgress(100);
        setIsRunning(false);
      } else {
        setProgress(val);
      }
    }, 30);
  };

  const metrics = [
    {
      title: "Opening a 500-Page Document",
      winner: "18.8x Faster",
      pdfcatalyst: "0.18 seconds",
      acrobat: "3.40 seconds",
      cloud: "7.20 seconds",
      pctPdfix: 100,
      pctAcrobat: 25,
      pctCloud: 10,
    },
    {
      title: "Computer Memory Footprint (RAM)",
      winner: "96% Less Memory",
      pdfcatalyst: "14 MB",
      acrobat: "380 MB",
      cloud: "620 MB",
      pctPdfix: 100,
      pctAcrobat: 30,
      pctCloud: 15,
    },
    {
      title: "Zoom & Smooth Scrolling Performance",
      winner: "Silky 60 FPS",
      pdfcatalyst: "60 FPS (Zero Stutter)",
      acrobat: "18 FPS (Stuttering)",
      cloud: "12 FPS (Laggy)",
      pctPdfix: 100,
      pctAcrobat: 35,
      pctCloud: 20,
    },
  ];

  return (
    <section id="benchmarks" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono font-medium text-slate-300 mb-4">
            <Icon name="activity" size={13} className="text-cyan-400" />
            <span>BENCHMARKS & SYSTEM METRICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Lightweight. Blazingly Fast.
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Sub-200ms cold launches and 14MB baseline memory footprint tested on standard hardware.
          </p>
        </div>

        {/* Benchmarks Shell Card */}
        <div className="rounded-3xl p-6 sm:p-8 glass-island border border-white/10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                SYSTEM LATENCY AUDIT
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Sub-millisecond responsiveness on dense files.
              </h3>
            </div>
            <button
              type="button"
              onClick={runSimulation}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md transition-all active:scale-95 disabled:opacity-60"
            >
              <Icon name="activity" size={14} className={isRunning ? "animate-spin" : ""} />
              <span>{isRunning ? `Testing Latency (${progress}%)...` : "Run Speed Simulation"}</span>
            </button>
          </div>

          <div className="space-y-6">
            {metrics.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{m.title}</span>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {m.winner}
                  </span>
                </div>

                {/* Progress bar comparisons */}
                <div className="space-y-2 text-xs font-mono">
                  {/* PDFCatalyst */}
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span className="font-bold text-white">PDFCatalyst</span>
                      <span className="text-emerald-400 font-bold">{m.pdfcatalyst}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-300"
                        style={{ width: `${(m.pctPdfix * progress) / 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Adobe Acrobat */}
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Adobe Acrobat Pro</span>
                      <span>{m.acrobat}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-600 rounded-full transition-all duration-300"
                        style={{ width: `${(m.pctAcrobat * progress) / 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Cloud Web Converters */}
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Web & Cloud Converters</span>
                      <span>{m.cloud}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500/50 rounded-full transition-all duration-300"
                        style={{ width: `${(m.pctCloud * progress) / 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
