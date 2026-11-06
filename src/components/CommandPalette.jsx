import React, { useState, useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { DOWNLOAD_INSTALLER, DOWNLOAD_PORTABLE } from "../hooks/useGitHubReleases";

export function CommandPalette({ isOpen, onClose, installerUrl, portableUrl }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "dl-inst",
      category: "Download",
      title: "Download Windows Installer (.exe)",
      shortcut: "↵",
      link: installerUrl || DOWNLOAD_INSTALLER,
    },
    {
      id: "dl-port",
      category: "Download",
      title: "Download Standalone Portable (.exe)",
      shortcut: "P",
      link: portableUrl || DOWNLOAD_PORTABLE,
    },
    {
      id: "feat-studio",
      category: "Studio",
      title: "Interactive Workbench Studio",
      shortcut: "S",
      hash: "#studio",
    },
    {
      id: "feat-features",
      category: "Features",
      title: "Explore 6-Card Bento Features",
      shortcut: "F",
      hash: "#features",
    },
    {
      id: "feat-switch",
      category: "Why Switch",
      title: "Compare vs. Adobe Acrobat & Web Tools",
      shortcut: "W",
      hash: "#why-switch",
    },
    {
      id: "feat-perf",
      category: "Performance",
      title: "View Speed & RAM Benchmarks",
      shortcut: "B",
      hash: "#benchmarks",
    },
    {
      id: "feat-faq",
      category: "Help",
      title: "Frequently Asked Questions",
      shortcut: "?",
      hash: "#faq",
    },
    {
      id: "src-repo",
      category: "Source",
      title: "View Open Source Repository on GitHub",
      shortcut: "G",
      link: "https://github.com/SarthAyush/PDFcatalyst-App",
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => onClose(false)}
    >
      <div
        className="w-full max-w-xl rounded-2xl glass-island border border-white/15 shadow-2xl overflow-hidden p-2 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
          <Icon name="search" size={16} className="text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            placeholder="Type a feature, tool, or shortcut..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto py-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500 font-mono">
              No matching actions found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                  idx === 0
                    ? "bg-white/10 text-white font-medium"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => {
                  if (item.link) {
                    window.open(item.link, item.link.startsWith("http") ? "_blank" : "_self");
                  } else if (item.hash) {
                    const target = document.querySelector(item.hash);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                  onClose(false);
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-cyan-400 border border-white/5">
                    {item.category}
                  </span>
                  <span>{item.title}</span>
                </div>
                <kbd className="font-mono text-[11px] text-slate-500">
                  {item.shortcut}
                </kbd>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Keyboard Navigation Enabled</span>
          <div className="flex items-center gap-3">
            <span><kbd className="text-slate-400">↵</kbd> Select</span>
            <span><kbd className="text-slate-400">ESC</kbd> Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
