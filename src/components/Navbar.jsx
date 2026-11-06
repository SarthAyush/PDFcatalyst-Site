import React, { useState } from "react";
import { Icon } from "./Icon";

export function Navbar({
  currentVersion,
  installerUrl,
  theme,
  setTheme,
  onOpenCommand,
  onTriggerDownload,
  activeSection,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "studio", label: "Workbench Studio" },
    { id: "why-switch", label: "Why Switch" },
    { id: "benchmarks", label: "Speed" },
    { id: "faq", label: "FAQ" },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const topOffset = 84;
      const targetTop =
        target.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl glass-island pointer-events-auto border border-white/10 dark:border-white/10 shadow-2xl transition-all duration-300">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => scrollToSection(e, "overview")}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-1 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <img
              src="/pdfix-logo.png"
              alt="PDFCatalyst Logo"
              width="22"
              height="22"
              className="drop-shadow"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[15px] tracking-tight text-white dark:text-white group-hover:text-cyan-400 transition-colors">
              PDFCatalyst
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {currentVersion}
            </span>
          </div>
        </a>

        {/* Center Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-150 ${
                  isActive
                    ? "text-white bg-white/10 shadow-sm font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Command Menu Button */}
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-colors"
            title="Search tools and commands (⌘K)"
          >
            <Icon name="search" size={13} />
            <span>Search</span>
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
              ⌘K
            </kbd>
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/SarthAyush/PDFcatalyst-App"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <Icon name="github" size={15} />
          </a>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={14} />
          </button>

          {/* Download CTA */}
          <a
            href={installerUrl}
            onClick={(e) => onTriggerDownload(e, "Installer", installerUrl)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-500/25 transition-all duration-200 active:scale-95"
          >
            <Icon name="download" size={13} />
            <span>Download</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white bg-white/5"
            aria-label="Toggle menu"
          >
            <Icon name={mobileMenuOpen ? "x" : "menu"} size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-2 p-4 rounded-2xl glass-island border border-white/10 shadow-2xl pointer-events-auto flex flex-col gap-2 text-sm text-slate-300 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommand();
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300"
            >
              <span className="flex items-center gap-2">
                <Icon name="search" size={13} /> Quick Command Menu
              </span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10">⌘K</kbd>
            </button>
            <a
              href={installerUrl}
              onClick={(e) => {
                setMobileMenuOpen(false);
                onTriggerDownload(e, "Installer", installerUrl);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md text-xs"
            >
              <Icon name="download" size={14} />
              <span>Download Free for Windows</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
