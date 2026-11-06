import React, { useState } from "react";
import { Icon } from "./Icons";
import {
  DOWNLOAD_INSTALLER,
  DOWNLOAD_PORTABLE,
  SHA256_INSTALLER,
  SHA256_PORTABLE,
  WINGET_COMMAND,
  APP_VERSION,
} from "../constants";

export function DownloadHub({ onTriggerDownload }) {
  const [copiedShaInstaller, setCopiedShaInstaller] = useState(false);
  const [copiedShaPortable, setCopiedShaPortable] = useState(false);
  const [copiedWinget, setCopiedWinget] = useState(false);
  const [showChecksums, setShowChecksums] = useState(false);

  const copyText = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <section id="download" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="linear-badge">
              <Icon name="download" size={12} className="text-emerald-400" />
              DIRECT DOWNLOADS • AIR-GAPPED
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white text-slate-900 mb-2">
            Get PDFCatalyst {APP_VERSION}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 text-slate-600">
            Instant native execution. No registration, no email prompts, no credit cards.
          </p>
        </div>

        {/* 2 Primary Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Card 1: Setup Installer */}
          <div className="p-6 rounded-2xl bg-[#111522]/90 dark:bg-[#111522]/90 bg-white border border-cyan-500/30 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  RECOMMENDED
                </span>
                <span className="text-xs font-mono text-slate-400">Windows 10 / 11 (x64)</span>
              </div>

              <h3 className="text-lg font-bold text-white dark:text-white text-slate-900 mb-1">
                Standard Setup Installer
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-400 text-slate-600 mb-6">
                Full installer with desktop shortcuts, Start Menu integration, and native PDF file association.
              </p>

              <div className="space-y-2 mb-6 text-xs text-slate-300 dark:text-slate-300 text-slate-700">
                <div className="flex items-center gap-2">
                  <Icon name="check" size={13} className="text-emerald-400" />
                  <span>Size: 19.8 MB (NSIS installer)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={13} className="text-emerald-400" />
                  <span>Includes all embedded OCR models</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={13} className="text-emerald-400" />
                  <span>Clean one-click uninstaller included</span>
                </div>
              </div>
            </div>

            <a
              href={DOWNLOAD_INSTALLER}
              onClick={() => onTriggerDownload?.("installer")}
              className="btn-primary w-full py-3 text-xs sm:text-sm font-semibold justify-center"
            >
              <Icon name="download" size={16} />
              <span>Download Setup Installer (x64)</span>
            </a>
          </div>

          {/* Card 2: Portable .exe */}
          <div className="p-6 rounded-2xl bg-[#111522]/90 dark:bg-[#111522]/90 bg-white border border-white/10 dark:border-white/10 border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                  ZERO INSTALL
                </span>
                <span className="text-xs font-mono text-slate-400">Windows 10 / 11 (x64)</span>
              </div>

              <h3 className="text-lg font-bold text-white dark:text-white text-slate-900 mb-1">
                Standalone Portable Binary
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-400 text-slate-600 mb-6">
                Single self-contained `.exe`. Zero registry writes, runs directly from USB drives or sandboxes.
              </p>

              <div className="space-y-2 mb-6 text-xs text-slate-300 dark:text-slate-300 text-slate-700">
                <div className="flex items-center gap-2">
                  <Icon name="check" size={13} className="text-emerald-400" />
                  <span>Size: 18.2 MB single executable</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={13} className="text-emerald-400" />
                  <span>No administrative permissions required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={13} className="text-emerald-400" />
                  <span>Ideal for air-gapped forensic stations</span>
                </div>
              </div>
            </div>

            <a
              href={DOWNLOAD_PORTABLE}
              onClick={() => onTriggerDownload?.("portable")}
              className="btn-secondary w-full py-3 text-xs sm:text-sm font-semibold justify-center"
            >
              <Icon name="zap" size={16} />
              <span>Download Portable Executable</span>
            </a>
          </div>
        </div>

        {/* Terminal Package Manager (winget) */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#090a0f] flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300 dark:text-slate-300 text-slate-700">
            <span className="text-emerald-400">$</span>
            <span className="text-white dark:text-white text-slate-900 font-semibold">{WINGET_COMMAND}</span>
          </div>
          <button
            onClick={() => copyText(WINGET_COMMAND, setCopiedWinget)}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5"
          >
            <Icon name={copiedWinget ? "check" : "copy"} size={13} />
            <span>{copiedWinget ? "Copied to clipboard" : "Copy Winget"}</span>
          </button>
        </div>

        {/* Cryptographic SHA-256 Verification Accordion */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <button
            onClick={() => setShowChecksums(!showChecksums)}
            className="w-full px-4 py-3 flex items-center justify-between text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Icon name="shield" size={13} className="text-cyan-400" />
              <span>Verify SHA-256 Cryptographic Checksums</span>
            </div>
            <Icon
              name="chevronDown"
              size={14}
              className={`transition-transform ${showChecksums ? "rotate-180" : ""}`}
            />
          </button>

          {showChecksums && (
            <div className="p-4 border-t border-white/10 space-y-4 bg-black/40 text-xs font-mono">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>PDFCatalyst-Setup-v1.0.2-x64.exe</span>
                  <button
                    onClick={() => copyText(SHA256_INSTALLER, setCopiedShaInstaller)}
                    className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <Icon name={copiedShaInstaller ? "check" : "copy"} size={11} />
                    <span>{copiedShaInstaller ? "Copied" : "Copy Hash"}</span>
                  </button>
                </div>
                <div className="p-2 rounded bg-black/70 text-slate-300 break-all select-all text-[11px]">
                  {SHA256_INSTALLER}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>PDFCatalyst.exe (Portable)</span>
                  <button
                    onClick={() => copyText(SHA256_PORTABLE, setCopiedShaPortable)}
                    className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <Icon name={copiedShaPortable ? "check" : "copy"} size={11} />
                    <span>{copiedShaPortable ? "Copied" : "Copy Hash"}</span>
                  </button>
                </div>
                <div className="p-2 rounded bg-black/70 text-slate-300 break-all select-all text-[11px]">
                  {SHA256_PORTABLE}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
