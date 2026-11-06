import React, { useState } from "react";
import { Icon } from "./Icon";

export function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState(0);

  const sampleDocs = [
    {
      id: "nda",
      name: "NDA Agreement.pdf",
      type: "Legal",
      label: "MUTUAL NON-DISCLOSURE AGREEMENT",
      sensitive: "SSN: 942-01-0814",
      bank: "Acct: 4421-8890-1200",
      signer: "Elena Rostova",
      amount: "Confidential",
    },
    {
      id: "medical",
      name: "Patient_HIPAA_Record.pdf",
      type: "Medical",
      label: "PATIENT MEDICAL HISTORY RECORD",
      sensitive: "MRN: #9941-8024-B",
      bank: "Insurance ID: BCBS-8841-A",
      signer: "Dr. Marcus Chen",
      amount: "ICD-10-CM",
    },
    {
      id: "blueprint",
      name: "FloorPlan_A102.pdf",
      type: "CAD",
      label: "METROPOLITAN CIVIC TOWER BLUEPRINT",
      sensitive: "Structural Load: 120 kN/m²",
      bank: "Zoning Code: R-4C Commercial",
      signer: "Vance Architects",
      amount: "1/4\" = 1'-0\"",
    },
    {
      id: "financial",
      name: "Q4_Payroll_Audit.pdf",
      type: "Financial",
      label: "EXECUTIVE COMPENSATION AUDIT",
      sensitive: "Routing: 021000021",
      bank: "Base: $185,000.00 / YR",
      signer: "Apex Global Financial",
      amount: "$185,000.00",
    },
  ];

  const [selectedDocIdx, setSelectedDocIdx] = useState(0);
  const activeDoc = sampleDocs[selectedDocIdx];

  // Tab 0: Redact Demo
  const [redacted, setRedacted] = useState(true);
  const [copyFeedback, setCopyFeedback] = useState("");

  // Tab 1: OCR Scan Demo
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  // Tab 2: Reorder
  const [pageList, setPageList] = useState([1, 2, 3, 4]);

  // Tab 3: Sign
  const [signed, setSigned] = useState(false);

  // Tab 4: Caliper
  const [measurePoint, setMeasurePoint] = useState("room");

  const tabs = [
    { id: 0, label: "Redact", badge: "Zero-Trace", icon: "lock" },
    { id: 1, label: "OCR Scan", badge: "Neural", icon: "search" },
    { id: 2, label: "Page Reorder", badge: "Organize", icon: "layers" },
    { id: 3, label: "Digital Sign", badge: "Verified", icon: "penTool" },
    { id: 4, label: "CAD Caliper", badge: "Precision", icon: "ruler" },
  ];

  const handleTestCopy = () => {
    if (redacted) {
      setCopyFeedback(
        "PASSED: Clipboard text contains [REDACTED]. Zero underlying data leaked."
      );
    } else {
      setCopyFeedback(
        `CRITICAL LEAK: Copied "${activeDoc.sensitive}" & "${activeDoc.bank}" directly from behind the black box!`
      );
    }
  };

  const handleRunOcr = () => {
    if (scanning) return;
    setScanning(true);
    setScanProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      if (p >= 100) {
        clearInterval(interval);
        setScanning(false);
        setScanProgress(100);
      } else {
        setScanProgress(p);
      }
    }, 90);
  };

  const handleReorder = () => {
    setPageList((prev) => [...prev].reverse());
  };

  return (
    <section id="studio" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-medium text-cyan-400 mb-4">
            <Icon name="sparkle" size={13} />
            <span>INTERACTIVE WORKBENCH STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Try PDFCatalyst Live.
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Test permanent redaction, neural OCR text extraction, blueprint CAD measurement, and digital signing right in your browser.
          </p>
        </div>

        {/* Workbench Card Frame */}
        <div className="rounded-3xl glass-island border border-white/10 shadow-2xl p-4 sm:p-8">
          {/* Top Interactive Tabs Bar */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-950/70 border border-white/5 mb-6 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setActiveTab(t.id);
                  setCopyFeedback("");
                }}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeTab === t.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={t.icon} size={14} />
                <span>{t.label}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/30 font-mono text-cyan-300">
                  {t.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Sample Document Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 mb-6 text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-mono">
              <Icon name="file" size={13} className="text-cyan-400" />
              <span>TEST DOCUMENT:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {sampleDocs.map((doc, idx) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => {
                    setSelectedDocIdx(idx);
                    setCopyFeedback("");
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                    selectedDocIdx === idx
                      ? "bg-white/15 text-white border border-white/20 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-cyan-400 font-bold">PDF</span>
                  <span>{doc.name}</span>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-1 rounded">
                    {doc.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab 0: True Redaction */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  CONFIDENTIALITY AUDIT
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">
                  True Redaction: Data Permanently Erased
                </h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Traditional PDF viewers only draw an opaque black box on top of the text. Anyone who highlights and copies the text can extract the hidden numbers.
                  PDFCatalyst sanitizes the underlying PDF streams completely.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRedacted(true)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      redacted
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    ✓ PDFCatalyst True Scrub
                  </button>
                  <button
                    type="button"
                    onClick={() => setRedacted(false)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      !redacted
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-500/20"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    ⚠ Standard Fake Black Box
                  </button>
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={handleTestCopy}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                  >
                    <Icon name="copy" size={13} />
                    <span>Test Copy-Paste Vulnerability</span>
                  </button>
                </div>

                {copyFeedback && (
                  <div
                    className={`mt-4 p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                      redacted
                        ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                    }`}
                  >
                    <Icon name={redacted ? "shield" : "lock"} size={14} />
                    <span>{copyFeedback}</span>
                  </div>
                )}
              </div>

              {/* Document Simulator Card */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 shadow-inner text-xs font-mono text-slate-300 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-bold text-white">{activeDoc.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      redacted
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {redacted ? "SCRUBBED & SAFE" : "LEAK VULNERABLE"}
                  </span>
                </div>
                <div>
                  <div className="text-slate-400">Authorized Signer:</div>
                  <div className="text-white font-medium">{activeDoc.signer}</div>
                </div>
                <div>
                  <div className="text-slate-400">SSN / Identification:</div>
                  <div
                    className={`mt-1 p-2 rounded ${
                      redacted
                        ? "bg-slate-800 text-slate-400 italic"
                        : "bg-black text-rose-400 font-bold"
                    }`}
                  >
                    {redacted ? "[Permanently Scrubbed from Byte Stream]" : activeDoc.sensitive}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Financial / Tax Reference:</div>
                  <div
                    className={`mt-1 p-2 rounded ${
                      redacted
                        ? "bg-slate-800 text-slate-400 italic"
                        : "bg-black text-rose-400 font-bold"
                    }`}
                  >
                    {redacted ? "[Permanently Scrubbed from Byte Stream]" : activeDoc.bank}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 1: OCR Scan */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  ON-DEVICE NEURAL RECOGNITION
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">
                  Turn Scans & Photos into Selectable Text
                </h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Extract crisp vector text and tabular data from camera photos, receipts, and archived records.
                  100% on-device neural processing without sending documents to remote OCR cloud APIs.
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleRunOcr}
                    disabled={scanning}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-500/20 transition-all active:scale-95"
                  >
                    <Icon name="search" size={14} />
                    <span>{scanning ? `Extracting Characters (${scanProgress}%)...` : "Run Local OCR Scan"}</span>
                  </button>
                </div>
              </div>

              {/* Scanned Image with laser scan effect */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-slate-950 flex items-center justify-center">
                <img
                  src="/media/document_audit.jpg"
                  alt="Scanned Invoice"
                  className="w-full h-full object-cover"
                />
                {scanning && (
                  <div
                    className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] transition-all duration-100"
                    style={{ top: `${scanProgress}%` }}
                  />
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-white/10">
                  <span>Target: {activeDoc.name}</span>
                  <span className="text-emerald-400 font-bold">Accuracy: 99.8%</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Page Reorder */}
          {activeTab === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  LIGHTNING BATCH STUDIO
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">
                  Rearrange, Merge & Split Pages Instantly
                </h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Combine folders of loose agreements, delete accidental blank pages, and rotate flipped camera scans.
                  Sub-second processing runs natively in compiled Rust without freezing.
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleReorder}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                  >
                    <Icon name="layers" size={14} />
                    <span>Reorder Document Sequence</span>
                  </button>
                </div>
              </div>

              {/* Grid of Pages */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
                {pageList.map((pageNum, idx) => (
                  <div
                    key={pageNum}
                    className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex flex-col justify-between aspect-[3/4] text-center shadow-lg transition-transform hover:scale-105 duration-200"
                  >
                    <div className="text-[10px] font-mono text-slate-400">Page {pageNum}</div>
                    <div className="space-y-1.5 px-1">
                      <div className="h-1 bg-white/20 rounded-full" />
                      <div className="h-1 bg-white/10 rounded-full" />
                      <div className="h-1 bg-white/10 rounded-full w-2/3 mx-auto" />
                    </div>
                    <div className="text-xs font-bold text-cyan-400 font-mono">#{idx + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Digital Sign */}
          {activeTab === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  DIGITAL SIGNATURES
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">
                  Verified Digital Seals Without Printing
                </h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Place verified digital signatures, approval dates, and cryptographic seals directly on contracts.
                  Eliminates paper printing, physical pen signing, and scanning cycles.
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setSigned(!signed)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md transition-all active:scale-95"
                  >
                    <Icon name={signed ? "x" : "penTool"} size={14} />
                    <span>{signed ? "Clear Signature" : "Apply Verified Seal"}</span>
                  </button>
                </div>
              </div>

              {/* Agreement Document Simulator */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 shadow-inner text-xs font-mono text-slate-300 space-y-4">
                <div className="text-white font-bold pb-2 border-b border-white/10">
                  {activeDoc.label}
                </div>
                <p className="text-slate-400 leading-relaxed">
                  "I hereby confirm full review and execution of all clauses outlined in {activeDoc.name}."
                </p>
                <div className="mt-4 p-4 rounded-xl border border-dashed border-white/20 bg-slate-950/80 min-h-[90px] flex items-center justify-center">
                  {signed ? (
                    <div className="text-center space-y-1">
                      <div className="text-base font-serif italic text-cyan-300">
                        {activeDoc.signer}
                      </div>
                      <div className="text-[10px] font-mono text-emerald-400">
                        ✓ Cryptographically Stamped • {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs">
                      Click the button to stamp digital seal
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: CAD Caliper */}
          {activeTab === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  PRECISION BLUEPRINT CALIPER
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">
                  Measure Architectural Drawings in Real Time
                </h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Calibrate engineering schematics and architectural blueprints against known title blocks.
                  Compute square footage, run distances, and perimeters in Imperial or Metric scales.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMeasurePoint("room")}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      measurePoint === "room"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Main Conference Room
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeasurePoint("hallway")}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      measurePoint === "hallway"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Corridor Run
                  </button>
                </div>
              </div>

              {/* Blueprint Image with Callout Readout */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-slate-950 flex items-center justify-center">
                <img
                  src="/media/blueprint_cad.jpg"
                  alt="Architectural Blueprint"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-white shadow-xl">
                  {measurePoint === "room" ? (
                    <div>
                      <div className="text-cyan-400 font-bold">Area: 480 sq ft (44.6 m²)</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Scale: 1/4" = 1'-0"</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-cyan-400 font-bold">Distance: 24.5 ft (7.47 m)</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Scale: 1/4" = 1'-0"</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
