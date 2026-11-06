import React, { useState } from "react";
import { Icon } from "./Icons";
import { APP_VERSION, GITHUB_REPO_URL } from "../constants";

export function Navbar({ theme, toggleTheme, onOpenCommandPalette }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Workbench", href: "#workbench" },
    { label: "Benchmarks", href: "#benchmarks" },
    { label: "Compare", href: "#compare" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 h-16 w-full bg-[#090a0f] dark:bg-[#090a0f] bg-white border-b border-white/10 dark:border-white/10 border-slate-200 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-400 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-tight text-white dark:text-white text-slate-900 text-base">
              PDFCatalyst
            </span>
            <span className="linear-badge text-[10px] py-0.5 px-2">
              {APP_VERSION}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white dark:hover:text-white hover:text-slate-900 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-slate-100 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search / Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/10 dark:border-white/10 border-slate-200 bg-white/5 dark:bg-white/5 bg-slate-100 text-slate-400 hover:text-white hover:border-white/20 transition-all text-xs"
            title="Search commands (⌘K or Ctrl+K)"
          >
            <Icon name="search" size={13} />
            <span className="hidden sm:inline text-[11px] font-mono text-slate-400">
              Search
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/10 dark:bg-white/10 bg-slate-200 text-slate-300 dark:text-slate-300 text-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* GitHub link */}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white dark:hover:text-white hover:text-slate-900 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors"
            title="View on GitHub"
          >
            <Icon name="github" size={16} />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-lg text-slate-400 hover:text-white dark:hover:text-white hover:text-slate-900 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
          </button>

          {/* Download Button */}
          <a
            href="#download"
            className="btn-primary text-xs py-2 px-3.5 hidden sm:inline-flex"
          >
            <Icon name="download" size={13} />
            <span>Download</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle Navigation Menu"
          >
            <Icon name={mobileMenuOpen ? "x" : "layers"} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090a0f] dark:bg-[#090a0f] bg-white border-b border-white/10 dark:border-white/10 border-slate-200 px-4 py-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-300 dark:text-slate-300 text-slate-800 hover:bg-white/5 rounded-lg"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary text-xs py-2.5 mt-2 justify-center"
          >
            <Icon name="download" size={14} />
            <span>Download for Windows</span>
          </a>
        </div>
      )}
    </header>
  );
}
