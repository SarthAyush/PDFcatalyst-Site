import React, { useState, useEffect, useRef } from "react";
import { Icon } from "./Icons";
import {
  DOWNLOAD_INSTALLER,
  DOWNLOAD_PORTABLE,
  WINGET_COMMAND,
  GITHUB_REPO_URL,
} from "../constants";

export function CommandPalette({ isOpen, onClose, toggleTheme, onTriggerDownload }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery("");
    }
  }, [isOpen]);

  const commands = [
    {
      title: "Download Windows Setup (x64)",
      desc: "Standard 19.8 MB installer with start menu integration",
      icon: "download",
      action: () => {
        window.location.href = DOWNLOAD_INSTALLER;
        onTriggerDownload?.("installer");
        onClose();
      },
    },
    {
      title: "Download Portable Executable",
      desc: "Zero-installation 18.2 MB standalone binary",
      icon: "zap",
      action: () => {
        window.location.href = DOWNLOAD_PORTABLE;
        onTriggerDownload?.("portable");
        onClose();
      },
    },
    {
      title: "Copy Winget Command",
      desc: WINGET_COMMAND,
      icon: "copy",
      action: () => {
        navigator.clipboard.writeText(WINGET_COMMAND);
        onClose();
      },
    },
    {
      title: "Explore Core Features",
      desc: "Jump to 6-card bento precision tools",
      icon: "layers",
      action: () => {
        document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      title: "Interactive Workbench Simulator",
      desc: "Test live redaction, OCR, and CAD caliper",
      icon: "crosshair",
      action: () => {
        document.querySelector("#workbench")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      title: "View Hardware Benchmarks",
      desc: "0.18s cold launch & 14MB RAM comparisons",
      icon: "activity",
      action: () => {
        document.querySelector("#benchmarks")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      title: "Compare with Adobe Acrobat",
      desc: "Pricing, telemetry, and security breakdown",
      icon: "shield",
      action: () => {
        document.querySelector("#compare")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      title: "Toggle Light / Dark Theme",
      desc: "Switch between OLED Dark and High-Contrast Light",
      icon: "sun",
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      title: "View GitHub Repository",
      desc: "Source code, issues, and release history",
      icon: "github",
      action: () => {
        window.open(GITHUB_REPO_URL, "_blank");
        onClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    `${cmd.title} ${cmd.desc}`.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length)
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-3 sm:px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#111522] border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
          <Icon name="search" size={16} className="text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-72 sm:max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-white/[0.03]">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 font-mono">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={index}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-colors ${
                    isSelected
                      ? "bg-cyan-50 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
                          : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <Icon name={cmd.icon} size={14} />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {cmd.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs sm:max-w-sm">
                        {cmd.desc}
                      </div>
                    </div>
                  </div>
                  <Icon
                    name="chevronRight"
                    size={12}
                    className={`transition-opacity shrink-0 ${
                      isSelected ? "opacity-100 text-cyan-600 dark:text-cyan-400" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Palette Footer */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>PDFCatalyst Command Menu</span>
        </div>
      </div>
    </div>
  );
}
