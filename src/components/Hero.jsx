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
    <section className="relative pt-8 sm:pt-14 pb-14 sm:pb-20 overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="ambient-glow w-[350px] sm:w-[500px] h-[250px] sm:h-[300px] bg-cyan-500/15 top-4 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className="ambient-glow w-[300px] sm:w-[400px] h-[200px] sm:h-[250px] bg-emerald-500/10 top-16 left-1/4"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Release / Tech Badge */}
        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
          <span className="linear-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            PURE RUST WORKBENCH • V1.0.2 AIR-GAPPED
          </span>
        </div>

        {/* Responsive Headline (Clear dark slate in light mode, pure white in dark mode) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] mb-3 sm:mb-4">
          <span className="text-slate-900 dark:text-white">
            The Native Desktop{" "}
          </span>
          <span className="block shimmer-headline mt-1">
            PDF Workbench
          </span>
        </h1>

        {/* Punchy Essential Subtitle */}
        <p className="max-w-xl mx-auto text-xs sm:text-base text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 leading-relaxed font-normal px-2">
          Permanent byte-level redaction, on-device OCR, and CAD blueprint calibration.
          Zero cloud latency, zero tracking, 100% free forever.
        </p>

        {/* Primary Download CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-4 max-w-md sm:max-w-none mx-auto">
          <a
            href={DOWNLOAD_INSTALLER}
            onClick={() => onTriggerDownload?.("installer")}
            className="btn-primary text-xs sm:text-sm py-3 sm:py-2.5 px-5 shadow-cyan-500/20 shadow-xl w-full sm:w-auto"
          >
            <Icon name="download" size={16} />
            <span>Download for Windows (x64)</span>
            <span className="text-[11px] font-mono opacity-80 ml-1 py-0.5 px-1.5 bg-black/20 rounded">
              19.8 MB
            </span>
          </a>

          <a
            href={DOWNLOAD_PORTABLE}
            onClick={() => onTriggerDownload?.("portable")}
            className="btn-secondary text-xs sm:text-sm py-3 sm:py-2.5 px-4 w-full sm:w-auto"
          >
            <Icon name="zap" size={15} />
            <span>Portable .exe</span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 ml-1">
              18.2 MB
            </span>
          </a>
        </div>

        {/* Terminal Winget Copy Pill */}
        <div className="inline-flex items-center gap-2 p-1.5 pl-3 pr-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-[11px] sm:text-xs font-mono text-slate-800 dark:text-slate-300 mb-8 sm:mb-12 max-w-full overflow-x-auto scrollbar-none shadow-sm">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold select-none">$</span>
          <span className="truncate">{WINGET_COMMAND}</span>
          <button
            onClick={copyWinget}
            className="p-1 sm:p-1.5 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1 shrink-0"
            title="Copy command to clipboard"
          >
            <Icon name={copiedWinget ? "check" : "copy"} size={12} />
            <span className="text-[10px]">{copiedWinget ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* Desktop App Window Showcase with subtle floating motion */}
        <div className="float-window relative mx-auto rounded-2xl p-1 bg-gradient-to-b from-slate-300 dark:from-white/15 via-slate-200 dark:via-white/5 to-transparent border border-slate-300 dark:border-white/15 shadow-2xl mb-8 sm:mb-12">
          {/* Window Header */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-100 dark:bg-[#10141f] rounded-t-xl border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500 inline-block" />
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-700 dark:text-slate-400 flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-none">
              <Icon name="shield" size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">PDFCatalyst Desktop — Native Rust (x64)</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                OFFLINE
              </span>
            </div>
          </div>

          {/* Screenshot Container */}
          <div className="bg-slate-900 dark:bg-[#090a0f] rounded-b-xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] relative">
            <img
              src="/app-screenshot.png"
              alt="PDFCatalyst Desktop Interface"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
            {/* Bottom overlay shimmer */}
            <div className="absolute inset-x-0 bottom-0 h-10 sm:h-14 bg-gradient-to-t from-slate-950/80 dark:from-[#090a0f] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* 4 Essential High-Signal Specs Grid as Trust Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-left">
          {keySpecs.map((spec, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] shadow-sm"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                <Icon name={spec.icon} size={14} className="shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {spec.label}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                {spec.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
