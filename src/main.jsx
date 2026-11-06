import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import { useGitHubReleases, formatBytes, DOWNLOAD_INSTALLER, DOWNLOAD_PORTABLE, SHA256_INSTALLER } from "./hooks/useGitHubReleases";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BentoFeatures } from "./components/BentoFeatures";
import { InteractivePlayground } from "./components/InteractivePlayground";
import { Comparison } from "./components/Comparison";
import { Benchmarks } from "./components/Benchmarks";
import { DownloadHub } from "./components/DownloadHub";
import { CreatorCard } from "./components/CreatorCard";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { CommandPalette } from "./components/CommandPalette";
import { DownloadToast } from "./components/DownloadToast";

function App() {
  const { latestRelease } = useGitHubReleases();
  const [commandOpen, setCommandOpen] = useState(false);
  const [detectedOs, setDetectedOs] = useState("Windows x64");
  const [activeSection, setActiveSection] = useState("overview");

  // Release assets
  const installerAsset =
    latestRelease.assets?.find(
      (a) => a.name.toLowerCase().includes("setup") && a.name.endsWith(".exe")
    ) || latestRelease.assets?.[0];

  const portableAsset =
    latestRelease.assets?.find(
      (a) => !a.name.toLowerCase().includes("setup") && a.name.endsWith(".exe")
    ) || latestRelease.assets?.[1];

  const installerUrl = installerAsset?.browser_download_url || DOWNLOAD_INSTALLER;
  const portableUrl = portableAsset?.browser_download_url || DOWNLOAD_PORTABLE;
  const installerSize = installerAsset ? formatBytes(installerAsset.size) : "19.9 MB";
  const portableSize = portableAsset ? formatBytes(portableAsset.size) : "67.6 MB";
  const installerSha = installerAsset?.digest
    ? installerAsset.digest.replace(/^sha256:/i, "")
    : SHA256_INSTALLER;
  const currentVersion = latestRelease.tag_name || "v1.0.2";

  // Persistent theme toggle
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("pdfix-site-theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("pdfix-site-theme", theme);
    } catch {}
  }, [theme]);

  // OS Detection
  useEffect(() => {
    try {
      const ua = navigator.userAgent;
      if (ua.includes("Win")) setDetectedOs("Windows x64");
      else if (ua.includes("Mac")) setDetectedOs("macOS");
      else if (ua.includes("Linux")) setDetectedOs("Linux");
    } catch {}
  }, []);

  // Lightweight Scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "features", "studio", "why-switch", "benchmarks", "download", "faq"];
      const scrollPos = window.scrollY + 160;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Download toast notification
  const [downloadToastOpen, setDownloadToastOpen] = useState(false);
  const [downloadDetails, setDownloadDetails] = useState({
    version: currentVersion,
    type: "Installer",
    filename: `PDFCatalyst-Setup-${currentVersion}-x64.exe`,
  });

  const triggerDownload = (e, type, url) => {
    if (e && e.preventDefault) e.preventDefault();
    const filename =
      type === "Portable" ? "PDFCatalyst.exe" : `PDFCatalyst-Setup-${currentVersion}-x64.exe`;
    setDownloadDetails({ version: currentVersion, type, filename });
    setDownloadToastOpen(true);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sleek Floating Island Navbar */}
      <Navbar
        currentVersion={currentVersion}
        installerUrl={installerUrl}
        theme={theme}
        setTheme={setTheme}
        onOpenCommand={() => setCommandOpen(true)}
        onTriggerDownload={triggerDownload}
        activeSection={activeSection}
      />

      <main id="top">
        {/* High-Impact Hero with 3D Preview */}
        <Hero
          currentVersion={currentVersion}
          detectedOs={detectedOs}
          installerUrl={installerUrl}
          installerSize={installerSize}
          portableUrl={portableUrl}
          portableSize={portableSize}
          onOpenCommand={() => setCommandOpen(true)}
          onTriggerDownload={triggerDownload}
        />

        {/* 6-Card Swiss Bento Features */}
        <BentoFeatures />

        {/* Unified Interactive Workbench Studio Playground */}
        <InteractivePlayground />

        {/* Why Switch vs Adobe vs Cloud Web Converters */}
        <Comparison />

        {/* Real-Time Speed & RAM Benchmarks */}
        <Benchmarks />

        {/* Clean Conversion Download Hub */}
        <DownloadHub
          currentVersion={currentVersion}
          installerUrl={installerUrl}
          installerSize={installerSize}
          installerSha={installerSha}
          portableUrl={portableUrl}
          portableSize={portableSize}
          onTriggerDownload={triggerDownload}
        />

        {/* Creator & Open Source Profile */}
        <CreatorCard />

        {/* Accessible FAQ Accordion */}
        <FAQ />
      </main>

      {/* Modern Developer Footer */}
      <Footer
        currentVersion={currentVersion}
        installerUrl={installerUrl}
        portableUrl={portableUrl}
        onOpenCommand={() => setCommandOpen(true)}
      />

      {/* Quick Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={setCommandOpen}
        installerUrl={installerUrl}
        portableUrl={portableUrl}
      />

      {/* Non-intrusive Post-Download Toast */}
      <DownloadToast
        isOpen={downloadToastOpen}
        onClose={() => setDownloadToastOpen(false)}
        details={downloadDetails}
        installerSha={installerSha}
      />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
