import React, { useState } from "react";
import { Icon } from "./Icons";

export function InteractiveStudio() {
  const [activeTab, setActiveTab] = useState("redact");

  // Redaction tab state
  const [redacted, setRedacted] = useState(false);

  // OCR tab state
  const [ocrRunning, setOcrRunning] = useState(false);
  const [ocrDone, setOcrDone] = useState(false);

  const runOcrSimulation = () => {
    setOcrRunning(true);
    setOcrDone(false);
    setTimeout(() => {
      setOcrRunning(false);
      setOcrDone(true);
    }, 450);
  };

  // Blueprint caliper state
  const [measurement, setMeasurement] = useState(14.6);
  const [scale, setScale] = useState('1/4" = 1\'-0"');

  // Page matrix state
  const [pages, setPages] = useState([
    { id: 1, title: "Cover Page", rot: 0 },
    { id: 2, title: "Executive Summary", rot: 0 },
    { id: 3, title: "Financials Q3", rot: 0 },
    { id: 4, title: "Appendix & Signatures", rot: 0 },
  ]);

  const rotatePage = (id) => {
    setPages(
      pages.map((p) => (p.id === id ? { ...p, rot: (p.rot + 90) % 360 } : p))
    );
  };

  const movePage = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= pages.length) return;
    const updated = [...pages];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setPages(updated);
  };

  return (
    <section id="workbench" className="py-14 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="linear-badge">
              <Icon name="zap" size={12} className="text-emerald-500 dark:text-emerald-400" />
              HANDS-ON SIMULATOR
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white dark:text-white text-slate-900 mb-2">
            Interactive Workbench.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 text-slate-600">
            Experience the core tools running in real-time. Native desktop speed right inside your browser.
          </p>
        </div>

        {/* Tab Switcher (Horizontal scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none justify-start sm:justify-center w-full px-1">
          {[
            { id: "redact", label: "Byte Redaction", icon: "eyeOff" },
            { id: "ocr", label: "Local OCR", icon: "cpu" },
            { id: "caliper", label: "CAD Caliper", icon: "crosshair" },
            { id: "matrix", label: "Page Studio", icon: "layers" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 font-semibold"
                  : "bg-white/5 dark:bg-white/5 bg-slate-100 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-white/5 dark:border-white/5 border-slate-200"
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Workbench Display Area */}
        <div className="reveal-on-scroll rounded-2xl border border-white/10 dark:border-white/10 border-slate-200 bg-[#111522]/90 dark:bg-[#111522]/90 bg-white p-4 sm:p-6 shadow-xl relative overflow-hidden">
          {/* TAB 1: BYTE REDACTION */}
          {activeTab === "redact" && (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 dark:border-white/10 border-slate-200">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white dark:text-white text-slate-900 flex items-center gap-2">
                    <Icon name="eyeOff" size={16} className="text-rose-500 dark:text-rose-400" />
                    Permanent Stream Sanitization
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 text-slate-500 mt-0.5">
                    Compare insecure surface-level masking with true byte-level deletion.
                  </p>
                </div>
                <button
                  onClick={() => setRedacted(!redacted)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center gap-2 self-start sm:self-auto ${
                    redacted
                      ? "bg-rose-500/20 text-rose-500 dark:text-rose-300 border border-rose-500/40"
                      : "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-300 dark:border-white/20"
                  }`}
                >
                  <Icon name={redacted ? "checkCircle" : "shield"} size={13} />
                  <span>{redacted ? "State: Sanitized" : "Click to Sanitize Stream"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Insecure Black Box */}
                <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/[0.04]">
                  <div className="text-[11px] font-mono text-rose-500 dark:text-rose-400 font-semibold mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Standard Reader Overlay (Insecure)
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 dark:bg-black/40 border border-white/5 font-mono text-xs text-slate-200 dark:text-slate-300 relative select-all">
                    CONFIDENTIAL ACCOUNT: <br />
                    <span className="bg-black text-white px-1 relative inline-block group cursor-text">
                      [████████████]
                      <span className="absolute -top-6 left-0 bg-rose-900 text-rose-200 text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Text still selectable in stream!
                      </span>
                    </span>
                    <br />
                    ROUTING NUMBER: <span className="text-slate-400">021000021</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                    Drawing a black shape leaves the font glyph coordinates in the PDF body. Anyone can copy-paste it.
                  </p>
                </div>

                {/* PDFCatalyst True Redaction */}
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04]">
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    PDFCatalyst Byte Deletion (Sanitized)
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 dark:bg-black/40 border border-white/5 font-mono text-xs text-slate-200 dark:text-slate-300">
                    CONFIDENTIAL ACCOUNT: <br />
                    {redacted ? (
                      <span className="text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/30 font-semibold">
                        [BYTES PURGED / ZEROED FROM STREAM]
                      </span>
                    ) : (
                      <span className="text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded">
                        4829-1092-3849-0192 (Pending Sanitization)
                      </span>
                    )}
                    <br />
                    ROUTING NUMBER: <span className="text-slate-400">021000021</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                    Underlying content stream bytes are structurally rewritten and zeroes inserted. Impossible to recover.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOCAL OCR */}
          {activeTab === "ocr" && (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 dark:border-white/10 border-slate-200">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white dark:text-white text-slate-900 flex items-center gap-2">
                    <Icon name="cpu" size={16} className="text-cyan-500 dark:text-cyan-400" />
                    Air-Gapped Optical Character Recognition
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 text-slate-500 mt-0.5">
                    Runs locally on your CPU using embedded neural models. Zero network latency.
                  </p>
                </div>
                <button
                  onClick={runOcrSimulation}
                  disabled={ocrRunning}
                  className="btn-primary text-xs py-2 px-3.5 self-start sm:self-auto"
                >
                  <Icon name={ocrRunning ? "refresh" : "play"} size={13} className={ocrRunning ? "animate-spin" : ""} />
                  <span>{ocrRunning ? "Analyzing Image..." : "Run Local OCR"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Scanned Image Representation */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 flex flex-col justify-between">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2">
                    INPUT: SCANNED RECEIPT / FLATTENED PDF
                  </div>
                  <div className="border border-dashed border-slate-300 dark:border-white/20 p-4 rounded-lg bg-white dark:bg-white/[0.02] text-center my-auto">
                    <Icon name="fileText" size={28} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-xs text-slate-800 dark:text-slate-300 font-mono">Invoice_Contract_2026_Scan.pdf</p>
                    <p className="text-[11px] text-slate-500">Non-searchable bitmap image (300 DPI)</p>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Tesseract 5.x C++ Rust FFI Engine
                  </div>
                </div>

                {/* Extracted Text */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2">
                    <span>OUTPUT: SEARCHABLE TEXT STREAM</span>
                    {ocrDone && <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Extracted in 142ms</span>}
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-black/60 border border-slate-200 dark:border-white/5 font-mono text-xs text-slate-800 dark:text-slate-300 h-36 overflow-y-auto">
                    {ocrRunning ? (
                      <div className="h-full flex items-center justify-center text-cyan-600 dark:text-cyan-400 gap-2">
                        <span className="animate-spin">⟳</span>
                        <span>Vectorizing glyph bounds on CPU...</span>
                      </div>
                    ) : ocrDone ? (
                      <div className="space-y-1 text-emerald-600 dark:text-emerald-300/90 font-semibold">
                        <p># VENDOR: ARCHITECTURAL SPEC LLC</p>
                        <p>TOTAL DUE: $24,850.00 USD</p>
                        <p>TERMS: NET 30 / CLEARED AIR-GAPPED</p>
                        <p>HASH: 8f9b2a7e4c1d0e5f6a</p>
                      </div>
                    ) : (
                      <p className="text-slate-400 italic flex items-center justify-center h-full">
                        Click "Run Local OCR" to extract text stream
                      </p>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1.5 font-semibold">
                    <Icon name="checkCircle" size={12} />
                    <span>0 bytes sent to external cloud servers</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAD BLUEPRINT CALIPER */}
          {activeTab === "caliper" && (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 dark:border-white/10 border-slate-200">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white dark:text-white text-slate-900 flex items-center gap-2">
                    <Icon name="crosshair" size={16} className="text-amber-500 dark:text-amber-400" />
                    CAD Blueprint Calibrator
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 text-slate-500 mt-0.5">
                    Calibrate real drawing scales to measure lengths, wall spans, and square footage.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Scale:</span>
                  <select
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white text-xs font-mono rounded px-2.5 py-1 border border-slate-300 dark:border-white/20"
                  >
                    <option value={'1/4" = 1\'-0"'}>{'1/4" = 1\'-0"'}</option>
                    <option value={'1/8" = 1\'-0"'}>{'1/8" = 1\'-0"'}</option>
                    <option value="1:100 Metric">1:100 Metric</option>
                  </select>
                </div>
              </div>

              {/* Interactive blueprint simulation */}
              <div className="relative h-44 sm:h-48 rounded-xl border border-cyan-500/20 bg-slate-900 dark:bg-[#090e1a] overflow-hidden flex items-center justify-center p-3">
                {/* Grid background */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Caliper measurement line */}
                <div className="relative z-10 w-5/6 sm:w-3/4 flex items-center justify-between">
                  {/* Point A */}
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
                    <span className="text-[10px] font-mono text-amber-300 mt-1">Point A</span>
                  </div>

                  {/* Dimension Bar */}
                  <div className="flex-1 mx-2 relative flex items-center justify-center">
                    <div className="w-full h-0.5 bg-amber-400" />
                    <span className="absolute bg-slate-900 dark:bg-[#090e1a] px-2 sm:px-3 py-0.5 rounded border border-amber-400/40 text-[11px] sm:text-xs font-mono font-semibold text-amber-300 whitespace-nowrap">
                      {measurement} ft ({scale})
                    </span>
                  </div>

                  {/* Point B */}
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
                    <span className="text-[10px] font-mono text-amber-300 mt-1">Point B</span>
                  </div>
                </div>

                <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-slate-400 hidden sm:block">
                  Sub-pixel crosshair accuracy with vector snapping
                </div>
                <div className="absolute bottom-2.5 right-3 flex gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setMeasurement((prev) => Math.max(5, +(prev - 1.2).toFixed(1)))}
                    className="px-2 py-0.5 rounded bg-white/10 text-white text-xs hover:bg-white/20 font-mono"
                  >
                    - Span
                  </button>
                  <button
                    onClick={() => setMeasurement((prev) => +(prev + 1.2).toFixed(1))}
                    className="px-2 py-0.5 rounded bg-white/10 text-white text-xs hover:bg-white/20 font-mono"
                  >
                    + Span
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PAGE STUDIO */}
          {activeTab === "matrix" && (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 dark:border-white/10 border-slate-200">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white dark:text-white text-slate-900 flex items-center gap-2">
                    <Icon name="layers" size={16} className="text-blue-500 dark:text-blue-400" />
                    Multi-Threaded Page Studio
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 text-slate-500 mt-0.5">
                    Reorder, rotate, split, and extract pages in parallel without recompressing raster assets.
                  </p>
                </div>
                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Lossless stream pipeline</span>
                </div>
              </div>

              {/* 4 Pages Grid (Responsive 2x2 on phone) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {pages.map((p, i) => (
                  <div
                    key={p.id}
                    className="p-2.5 sm:p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 text-center flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                      <span>Pg {i + 1}</span>
                      <span>{p.rot}°</span>
                    </div>

                    <div
                      className="aspect-[3/4] bg-white dark:bg-white/[0.04] rounded border border-slate-200 dark:border-white/10 flex items-center justify-center transition-transform duration-200 shadow-sm"
                      style={{ transform: `rotate(${p.rot}deg)` }}
                    >
                      <Icon name="fileText" size={24} className="text-slate-400" />
                    </div>

                    <div className="text-[10px] sm:text-[11px] font-medium text-slate-800 dark:text-slate-300 mt-2 truncate">
                      {p.title}
                    </div>

                    <div className="flex items-center justify-center gap-1 mt-2 sm:mt-3">
                      <button
                        onClick={() => movePage(i, i - 1)}
                        disabled={i === 0}
                        className="p-1 rounded bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 disabled:opacity-30 text-slate-700 dark:text-slate-300 text-xs"
                        title="Move left"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => rotatePage(p.id)}
                        className="px-2 py-1 rounded bg-cyan-50 dark:bg-white/5 hover:bg-cyan-100 dark:hover:bg-white/10 text-cyan-700 dark:text-cyan-300 text-[10px] font-mono"
                        title="Rotate 90 degrees"
                      >
                        ⟳ 90°
                      </button>
                      <button
                        onClick={() => movePage(i, i + 1)}
                        disabled={i === pages.length - 1}
                        className="p-1 rounded bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 disabled:opacity-30 text-slate-700 dark:text-slate-300 text-xs"
                        title="Move right"
                      >
                        →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
