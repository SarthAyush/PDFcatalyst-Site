import React, { useState } from "react";
import { Icon } from "./Icons";
import {
  DOWNLOAD_INSTALLER,
  DOWNLOAD_PORTABLE,
  WINGET_COMMAND,
} from "../constants";

export function Hero({ onTriggerDownload }) {
  const [copiedWinget, setCopiedWinget] = useState(false);

  const copyWinget = () => {
    navigator.clipboard.writeText(WINGET_COMMAND);
    setCopiedWinget(true);
    setTimeout(() => setCopiedWinget(false), 2000);
  };

  const keySpecs = [
    { label: "0 ms Cloud Latency", desc: "100% Local Execution", icon: "zap" },
    { label: "$0 Free Forever", desc: "No Subscriptions Ever", icon: "shield" },
    { label: "60 FPS GPU Zoom", desc: "Native Rust Engine", icon: "cpu" },
    { label: "Air-Gapped Privacy", desc: "Zero Telemetry & Tracking", icon: "lock" },
  ];

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="ambient-glow w-[500px] h-[300px] bg-cyan-500/15 top-16 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className="ambient-glow w-[400px] h-[250px] bg-emerald-500/10 top-32 left-1/4"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Release / Tech Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="linear-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            PURE RUST WORKBENCH • V1.0.2 AIR-GAPPED
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
          <span className="block text-white dark:text-white text-slate-900">
            The Pure Rust
          </span>
          <span className="block text-white dark:text-white text-slate-900">
            PDF Workbench.
          </span>
          <span className="block shimmer-headline mt-1">
            Instant. Private. Free Forever.
          </span>
        </h1>

        {/* Punchy Essential Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 dark:text-slate-400 text-slate-600 mb-8 leading-relaxed font-normal">
          Escape expensive subscriptions, slow cloud conversions, and privacy leaks.
          PDFCatalyst gives you native desktop power with permanent redaction, OCR,
          and CAD blueprint calibration.
        </p>

        {/* Primary Download CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
          <a
            href={DOWNLOAD_INSTALLER}
            onClick={() => onTriggerDownload?.("installer")}
            className="btn-primary text-sm sm:text-base py-3 px-6 shadow-cyan-500/20 shadow-xl"
          >
            <Icon name="download" size={18} />
            <span>Download for Windows x64</span>
            <span className="text-[11px] font-mono opacity-80 ml-1 py-0.5 px-1.5 bg-black/20 rounded">
              19.8 MB
            </span>
          </a>

          <a
            href={DOWNLOAD_PORTABLE}
            onClick={() => onTriggerDownload?.("portable")}
            className="btn-secondary text-sm sm:text-base py-3 px-5"
          >
            <Icon name="zap" size={16} />
            <span>Portable .exe</span>
            <span className="text-[11px] font-mono text-slate-400 ml-1">
              18.2 MB
            </span>
          </a>
        </div>

        {/* Terminal Winget Copy Pill */}
        <div className="inline-flex items-center gap-2 p-1 pl-3 pr-2 rounded-xl bg-white/5 dark:bg-white/5 bg-slate-100 border border-white/10 dark:border-white/10 border-slate-200 text-xs font-mono text-slate-300 dark:text-slate-300 text-slate-700 mb-12 max-w-full overflow-hidden">
          <span className="text-emerald-400 select-none">$</span>
          <span className="truncate">{WINGET_COMMAND}</span>
          <button
            onClick={copyWinget}
            className="p-1.5 rounded-lg hover:bg-white/10 dark:hover:bg-white/10 hover:bg-slate-200 text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            title="Copy command to clipboard"
          >
            <Icon name={copiedWinget ? "check" : "copy"} size={13} />
            <span className="text-[11px]">{copiedWinget ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* 4 Essential High-Signal Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-14 text-left">
          {keySpecs.map((spec, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-white/10 dark:border-white/10 border-slate-200 bg-white/[0.02] dark:bg-white/[0.02] bg-white backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Icon name={spec.icon} size={15} />
                <span className="text-xs font-semibold text-white dark:text-white text-slate-900">
                  {spec.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-400 text-slate-500 font-mono">
                {spec.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop App Window Showcase */}
        <div className="relative mx-auto rounded-2xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/15 dark:border-white/15 border-slate-200 shadow-2xl">
          {/* Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#10141f] dark:bg-[#10141f] bg-slate-100 rounded-t-xl border-b border-white/10 dark:border-white/10 border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-400 text-slate-600 flex items-center gap-2">
              <Icon name="shield" size={12} className="text-emerald-400" />
              <span>PDFCatalyst Desktop — Native Rust (x64)</span>
            </div>
            <div className="w-12 text-right">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                OFFLINE
              </span>
            </div>
          </div>

          {/* Screenshot Container */}
          <div className="bg-[#090a0f] rounded-b-xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] relative">
            <img
              src="/app-screenshot.png"
              alt="PDFCatalyst Desktop Interface"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
            {/* Bottom overlay shimmer */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#090a0f] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
