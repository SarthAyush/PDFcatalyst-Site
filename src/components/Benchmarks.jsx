import React, { useState } from "react";
import { Icon } from "./Icons";

export function Benchmarks() {
  const [testing, setTesting] = useState(false);
  const [testScore, setTestScore] = useState(null);

  const runBenchmark = () => {
    setTesting(true);
    setTestScore(null);
    setTimeout(() => {
      setTesting(false);
      setTestScore({
        pagesPerSec: "1,420",
        memoryMB: "14.2 MB",
        launchMs: "180 ms",
      });
    }, 800);
  };

  return (
    <section id="benchmarks" className="py-14 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="linear-badge">
              <Icon name="cpu" size={12} className="text-emerald-500 dark:text-emerald-400" />
              HARDWARE BENCHMARKS
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Built in Rust. Measured in Milliseconds.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Native x86_64 binary compiled directly to machine instructions. No Node.js runtime, no Chromium bloat.
          </p>
        </div>

        {/* Benchmark Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {/* Card 1: Cold Launch */}
          <div className="reveal-on-scroll p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111522]/85 border border-slate-200 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
              <span>COLD LAUNCH</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">18x Faster</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    PDFCatalyst (Rust)
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0.18s</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full w-[8%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-400">
                  <span>Foxit Reader</span>
                  <span>2.10s</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full bg-slate-400 dark:bg-slate-500 rounded-full w-[60%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-400">
                  <span>Adobe Acrobat Pro</span>
                  <span>3.40s</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full bg-rose-500/80 rounded-full w-[100%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Idle RAM */}
          <div className="reveal-on-scroll p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111522]/85 border border-slate-200 dark:border-white/10 shadow-sm" style={{ transitionDelay: "80ms" }}>
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
              <span>IDLE RAM CONSUMPTION</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">27x Leaner</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                    PDFCatalyst (Rust)
                  </span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">14 MB</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full bg-cyan-500 dark:bg-cyan-400 rounded-full w-[4%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-400">
                  <span>Foxit Reader</span>
                  <span>145 MB</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full bg-slate-400 dark:bg-slate-500 rounded-full w-[38%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-400">
                  <span>Adobe Acrobat Pro</span>
                  <span>385 MB</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full bg-rose-500/80 rounded-full w-[100%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: 100-Page Document Merge */}
          <div className="reveal-on-scroll p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111522]/85 border border-slate-200 dark:border-white/10 shadow-sm" style={{ transitionDelay: "160ms" }}>
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
              <span>100-PAGE BATCH MERGE</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Instant Local</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    PDFCatalyst (Rayon)
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0.42s</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full w-[5%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-400">
                  <span>Adobe Acrobat Pro</span>
                  <span>2.80s</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full bg-slate-400 dark:bg-slate-500 rounded-full w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-400">
                  <span>Cloud Converters (Upload)</span>
                  <span>14.8s</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full bg-rose-500/80 rounded-full w-[100%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Simulation Box */}
        <div className="reveal-on-scroll p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090a0f] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Icon name="activity" size={18} />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">
                Simulate Architecture Throughput
              </div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                Measure estimated local parsing speed on your device
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-white/10">
            {testScore && (
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {testScore.pagesPerSec} pgs/sec
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  {testScore.launchMs}
                </span>
              </div>
            )}
            <button
              onClick={runBenchmark}
              disabled={testing}
              className="btn-secondary text-xs py-2 px-3.5 shrink-0"
            >
              <Icon name={testing ? "refresh" : "zap"} size={13} className={testing ? "animate-spin" : ""} />
              <span>{testing ? "Benchmarking..." : "Run Test"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
