import React from "react";
import { Icon } from "./Icons";
import { APP_VERSION, GITHUB_REPO_URL } from "../constants";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 sm:py-12 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090a0f] text-xs transition-colors duration-250">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-slate-200 dark:border-white/5">
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <span>PDFCatalyst</span>
                <span className="text-[10px] font-mono text-slate-500">{APP_VERSION}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-500">
                Pure Rust Desktop PDF Workbench. 100% On-Device & Private.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-600 dark:text-slate-400 text-xs font-medium">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Icon name="github" size={14} />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <a
              href={`${GITHUB_REPO_URL}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Releases
            </a>
            <span>•</span>
            <a
              href="#download"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Download
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono"
            >
              <span>Back to top ↑</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <div>
            Open Source • MIT / Apache 2.0 dual license • Engineered by Sarthak
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>Air-Gapped Desktop Binary</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
