import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BentoFeatures } from "./components/BentoFeatures";
import { InteractiveStudio } from "./components/InteractiveStudio";
import { Benchmarks } from "./components/Benchmarks";
import { Comparison } from "./components/Comparison";
import { DownloadHub } from "./components/DownloadHub";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { CommandPalette } from "./components/CommandPalette";
import { DownloadToast } from "./components/DownloadToast";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("pdfcatalyst_theme") || "dark";
  });
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [downloadToastInfo, setDownloadToastInfo] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pdfcatalyst_theme", theme);
  }, [theme]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleTriggerDownload = (type) => {
    setDownloadToastInfo({ type });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased selection:bg-cyan-500/30 selection:text-white">
      {/* Fixed Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        <Hero onTriggerDownload={handleTriggerDownload} />
        <BentoFeatures />
        <InteractiveStudio />
        <Benchmarks />
        <Comparison />
        <DownloadHub onTriggerDownload={handleTriggerDownload} />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        toggleTheme={toggleTheme}
        onTriggerDownload={handleTriggerDownload}
      />

      <DownloadToast
        downloadInfo={downloadToastInfo}
        onClose={() => setDownloadToastInfo(null)}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
