import React, { useState } from "react";
import { Icon } from "./Icon";

export function DownloadHub({
  currentVersion,
  installerUrl,
  installerSize,
  installerSha,
  portableUrl,
  portableSize,
  onTriggerDownload,
}) {
  const [copiedId, setCopiedId] = useState(null);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="download" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl p-6 sm:p-10 glass-island border border-white/10 shadow-2xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-medium text-emerald-400 mb-4">
            <Icon name="checkCircle" size={13} />
            <span>VERIFIED OFFICIAL RELEASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get PDFCatalyst {currentVersion}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            100% free and open source under MIT / Apache-2.0. No subscriptions, no telemetry, and zero accounts required.
          </p>

          {/* Twin Download Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {/* Installer Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-600/15 via-white/[0.03] to-transparent border border-blue-500/30 flex flex-col justify-between">
              <div>
                <div className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-3">
                  RECOMMENDED
                </div>
                <h3 className="text-xl font-bold text-white">Windows Installer</h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  {currentVersion} • x64 • {installerSize}
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Standard setup executable. Creates desktop shortcuts, Start Menu integration, and opens PDF files when double-clicked.
                </p>
              </div>

              <div className="mt-6">
                <a
                  href={installerUrl}
                  onClick={(e) => onTriggerDownload(e, "Installer", installerUrl)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/25 transition-all active:scale-95"
                >
                  <Icon name="download" size={15} />
                  <span>Download Installer ({installerSize})</span>
                </a>
              </div>
            </div>

            {/* Portable Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 text-slate-300 border border-white/10 mb-3">
                  PORTABLE
                </div>
                <h3 className="text-xl font-bold text-white">Standalone Portable</h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  {currentVersion} • Standalone • {portableSize}
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Single binary. Runs immediately from any directory or USB flash drive without installation or administrator privileges.
                </p>
              </div>

              <div className="mt-6">
                <a
                  href={portableUrl}
                  onClick={(e) => onTriggerDownload(e, "Portable", portableUrl)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-xs text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 transition-all active:scale-95"
                >
                  <Icon name="download" size={15} />
                  <span>Download Portable ({portableSize})</span>
                </a>
              </div>
            </div>
          </div>

          {/* Windows Package Manager (Winget) Bar */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-900/70 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-mono flex items-center gap-2">
              <Icon name="terminal" size={14} className="text-cyan-400" />
              <span>Or install via Windows Package Manager:</span>
            </span>
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-white/10 font-mono text-slate-300">
              <code>winget install SarthAyush.PDFcatalyst</code>
              <button
                type="button"
                onClick={() => copy("winget install SarthAyush.PDFcatalyst", "winget")}
                className="ml-2 text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] font-semibold"
                title="Copy winget command"
              >
                <Icon name={copiedId === "winget" ? "check" : "copy"} size={12} />
                <span>{copiedId === "winget" ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* SHA-256 Checksum Row */}
          <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
            <span>SHA-256 Checksum:</span>
            <code className="text-slate-300 break-all">{installerSha}</code>
            <button
              type="button"
              onClick={() => copy(installerSha, "sha")}
              className="text-cyan-400 hover:text-cyan-300 ml-1 inline-flex items-center gap-1"
              title="Copy SHA-256"
            >
              <Icon name={copiedId === "sha" ? "check" : "copy"} size={11} />
              <span>{copiedId === "sha" ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
