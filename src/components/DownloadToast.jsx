import React, { useEffect, useState } from "react";
import { Icon } from "./Icons";
import { SHA256_INSTALLER, SHA256_PORTABLE } from "../constants";

export function DownloadToast({ downloadInfo, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!downloadInfo) return;
    const timer = setTimeout(() => {
      onClose();
    }, 8000);
    return () => clearTimeout(timer);
  }, [downloadInfo, onClose]);

  if (!downloadInfo) return null;

  const hash =
    downloadInfo.type === "installer" ? SHA256_INSTALLER : SHA256_PORTABLE;
  const fileName =
    downloadInfo.type === "installer"
      ? "PDFCatalyst-Setup-v1.0.2-x64.exe"
      : "PDFCatalyst.exe (Portable)";

  const copyHash = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl bg-[#111522] border border-cyan-500/40 shadow-2xl shadow-cyan-500/10 text-xs animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Icon name="download" size={13} />
          </div>
          <span className="font-semibold text-white">Download Started</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1"
        >
          <Icon name="x" size={12} />
        </button>
      </div>

      <p className="text-[11px] text-slate-300 font-mono mb-2 truncate">
        {fileName}
      </p>

      <div className="p-2 rounded bg-black/60 border border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between gap-2">
        <span className="truncate">SHA: {hash.slice(0, 16)}...</span>
        <button
          onClick={copyHash}
          className="text-cyan-400 hover:underline shrink-0 flex items-center gap-1"
        >
          <Icon name={copied ? "check" : "copy"} size={10} />
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
