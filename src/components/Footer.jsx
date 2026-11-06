import React from "react";
import { Icon } from "./Icon";

export function Footer({ currentVersion, installerUrl, portableUrl, onOpenCommand }) {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Brand Col */}
        <div className="max-w-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-1 flex items-center justify-center">
              <img src="/pdfix-logo.png" alt="PDFCatalyst" width="22" height="22" />
            </div>
            <span className="font-bold text-base text-white tracking-tight">PDFCatalyst</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-cyan-300">
              {currentVersion}
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            The pure Rust desktop PDF workbench engineered for sub-millisecond speed and air-gapped privacy.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Air-Gapped & Offline Architecture</span>
          </div>
        </div>

        {/* Links Col */}
        <div className="grid grid-cols-2 gap-8 text-xs">
          <div className="space-y-3">
            <div className="font-mono font-semibold text-white tracking-wider uppercase text-[11px]">
              EXPLORE
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#studio" className="hover:text-white transition-colors">Workbench Studio</a></li>
              <li><a href="#why-switch" className="hover:text-white transition-colors">Why Switch</a></li>
              <li><a href="#benchmarks" className="hover:text-white transition-colors">Speed Benchmarks</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono font-semibold text-white tracking-wider uppercase text-[11px]">
              DOWNLOAD
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href={installerUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Windows Installer ({currentVersion})
                </a>
              </li>
              <li>
                <a href={portableUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Portable Executable ({currentVersion})
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/SarthAyush/PDFcatalyst-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Icon name="github" size={13} />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCommand}
                  className="hover:text-white transition-colors text-left"
                >
                  Quick Search (⌘K)
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          Copyright © {new Date().getFullYear()} PDFCatalyst. Created by Sarthak Saxena.
        </div>
        <div className="text-slate-400">
          Open Source under MIT / Apache-2.0
        </div>
      </div>
    </footer>
  );
}
