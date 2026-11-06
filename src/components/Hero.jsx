import React, { useRef, useState } from "react";
import { Icon } from "./Icon";

export function Hero({
  currentVersion,
  detectedOs,
  installerUrl,
  installerSize,
  portableUrl,
  portableSize,
  onOpenCommand,
  onTriggerDownload,
}) {
  const stageRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 5, y: -7 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({
      x: -(y / (rect.height / 2)) * 10,
      y: (x / (rect.width / 2)) * 12,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 5, y: -7 });
    setIsHovered(false);
  };

  return (
    <section id="overview" className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono font-medium text-slate-300 shadow-inner mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-slate-400">PURE RUST WORKBENCH</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 font-semibold">{currentVersion} AIR-GAPPED</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl">
          The Pure Rust PDF Workbench.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-emerald-400">
            Instant. Private. Free Forever.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Escape expensive subscriptions, slow cloud conversions, and privacy leaks.
          PDFCatalyst gives you native desktop power with permanent redaction, OCR, and CAD blueprint calibration.
        </p>

        {/* Primary CTA Cluster */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 w-full max-w-lg">
          <a
            href={installerUrl}
            onClick={(e) => onTriggerDownload(e, "Installer", installerUrl)}
            className="flex-1 sm:flex-initial min-w-[220px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-500/25 transition-all duration-200 active:scale-95 text-sm"
          >
            <Icon name="download" size={17} />
            <span>Download for {detectedOs}</span>
            <span className="text-xs text-white/70 font-mono">({installerSize})</span>
          </a>

          <a
            href={portableUrl}
            onClick={(e) => onTriggerDownload(e, "Portable", portableUrl)}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 transition-all text-sm active:scale-95"
            title="Runs directly from any folder or USB without installation"
          >
            <Icon name="file" size={15} />
            <span>Portable (.exe)</span>
          </a>

          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 px-4 py-3.5 rounded-2xl text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all text-sm"
            title="Quick Command Menu (⌘K)"
          >
            <Icon name="command" size={15} />
            <kbd className="font-mono text-xs px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-4 px-6 rounded-2xl glass-island border border-white/5 max-w-3xl w-full text-center">
          <div>
            <div className="text-sm font-bold text-white">$0 Free Forever</div>
            <div className="text-xs text-slate-400 mt-0.5">Zero subscriptions</div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">100% On-Device</div>
            <div className="text-xs text-slate-400 mt-0.5">Air-gapped privacy</div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Sub-200ms</div>
            <div className="text-xs text-slate-400 mt-0.5">Instant cold launch</div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Zero Tracking</div>
            <div className="text-xs text-slate-400 mt-0.5">No accounts or telemetry</div>
          </div>
        </div>

        {/* 3D Interactive Device Frame Showcase */}
        <div
          ref={stageRef}
          onMouseMove={(e) => {
            setIsHovered(true);
            handleMouseMove(e);
          }}
          onMouseLeave={handleMouseLeave}
          className="mt-14 w-full max-w-4xl relative perspective-1200 cursor-default"
        >
          <div
            style={{
              transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isHovered
                ? "transform 0.08s ease-out"
                : "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="relative rounded-2xl p-2 bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/15 shadow-2xl shadow-black/80"
          >
            {/* Window Header Notch */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 rounded-t-xl border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="text-xs font-mono font-medium text-slate-400 flex items-center gap-2">
                <Icon name="shield" size={12} className="text-emerald-400" />
                <span>PDFCatalyst Desktop — Native Rust (x64)</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Window Content */}
            <div className="relative rounded-b-xl overflow-hidden bg-slate-950 aspect-[16/10] sm:aspect-[16/9]">
              <img
                src="/app-screenshot.png"
                alt="PDFCatalyst Desktop App Preview"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-white/5 pointer-events-none" />
            </div>

            {/* Floating Quick Feature Pills */}
            <div className="absolute -bottom-4 left-6 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl glass-island border border-white/15 shadow-xl text-xs font-medium text-white">
              <Icon name="shield" size={14} className="text-emerald-400" />
              <span>100% Air-Gapped Local Memory</span>
            </div>

            <div className="absolute -top-4 right-6 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl glass-island border border-white/15 shadow-xl text-xs font-medium text-white">
              <Icon name="cpu" size={14} className="text-cyan-400" />
              <span>60 FPS GPU-Accelerated Zoom</span>
            </div>
          </div>

          <p className="mt-5 text-xs font-mono text-slate-400 tracking-wide">
            Tilt cursor to inspect hardware-accelerated 3D depth
          </p>
        </div>
      </div>
    </section>
  );
}
