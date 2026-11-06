import React, { useState } from "react";
import { Icon } from "./Icon";

export function DownloadToast({ isOpen, onClose, details, installerSha }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copySha = () => {
    navigator.clipboard.writeText(installerSha);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl glass-island border border-white/15 shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/20 text-emerald-400">
          <Icon name="checkCircle" size={12} />
          <span>DOWNLOAD INITIATED</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white"
          aria-label="Close notification"
        >
          <Icon name="x" size={14} />
        </button>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-bold text-white">
          PDFCatalyst {details.version} is downloading
        </div>
        <div className="text-xs font-mono text-cyan-400 break-all">
          {details.filename}
        </div>

        <div className="text-xs text-slate-300 space-y-1.5 pt-1">
          <div className="flex items-start gap-2">
            <span className="font-mono text-cyan-400 font-bold">1.</span>
            <span>Open executable directly from downloads folder.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-mono text-cyan-400 font-bold">2.</span>
            <span>Sub-200ms cold launch with 100% air-gapped privacy.</span>
          </div>
        </div>

        <div className="pt-3">
          <button
            type="button"
            onClick={copySha}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <Icon name={copied ? "check" : "shield"} size={13} className="text-emerald-400" />
            <span>{copied ? "SHA-256 Copied!" : "Copy Verification SHA-256"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
