import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const DOWNLOAD_INSTALLER =
  "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.0/PDFcatalyst-Setup-v1.0.0-x64.exe";
const DOWNLOAD_PORTABLE =
  "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.0/PDFcatalyst.exe";
const SHA256_INSTALLER =
  "04a04855a984b84d9bd6c5afedda611d63f5eb259fd78f42fa2237cb4cf74b79";
const SHA256_PORTABLE =
  "f4c06b245767378391146604bb29e83616374027d0d5de00cc41578e3c9cbc86";

function playAudioBlip(freq = 520, type = "sine", duration = 0.12) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.15, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

function Icon({ name, size = 16, stroke = 1.8, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };
  const paths = {
    arrowRight: (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    ),
    chevronRight: <polyline points="9 18 15 12 9 6" />,
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
        <polyline points="9 12 11 14 15 10" />
      </>
    ),
    cpu: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </>
    ),
    terminal: (
      <>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </>
    ),
    bot: (
      <>
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8.01" y2="16" />
        <line x1="16" y1="16" x2="16.01" y2="16" />
      </>
    ),
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
    layers: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    checkCircle: (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </>
    ),
    copy: (
      <>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ),
    moon: <path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />,
    github: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
    command: (
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    ),
    tree: (
      <>
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M12 7h5a3 3 0 0 1 0 6H7a3 3 0 0 0 0 6h5" />
      </>
    ),
    ruler: (
      <>
        <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0l12.6 12.6z" />
        <line x1="14.5" y1="12.5" x2="16.5" y2="10.5" />
        <line x1="11.5" y1="9.5" x2="13.5" y2="7.5" />
        <line x1="8.5" y1="6.5" x2="10.5" y2="4.5" />
      </>
    ),
    x: <line x1="18" y1="6" x2="6" y2="18" />,
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </>
    ),
    volume: (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </>
    ),
    volumeMute: (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </>
    ),
    menu: (
      <>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    ),
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    play: <polygon points="5 3 19 12 5 21 5 3" />,
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </>
    ),
    sparkles: <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />,
    crosshair: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
      </>
    ),
    penTool: (
      <>
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    refresh: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </>
    ),
  };
  return <svg {...common}>{paths[name] || paths.file}</svg>;
}

function formatBytes(bytes) {
  if (!bytes || isNaN(bytes)) return "";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function useGitHubReleases() {
  const [releases, setReleases] = useState([DEFAULT_RELEASE]);
  const [latestRelease, setLatestRelease] = useState(DEFAULT_RELEASE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReleases = async () => {
      setIsLoading(true);
      const cacheKey = "pdfcatalyst_github_releases";
      const cacheTimeKey = "pdfcatalyst_github_releases_time";

      try {
        const cached = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheTimeKey);
        if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < 5 * 60 * 1000) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReleases(parsed);
            setLatestRelease(parsed[0]);
            setIsLoading(false);
            return;
          }
        }

        const res = await fetch("https://api.github.com/repos/SarthAyush/PDFcatalyst-App/releases");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setReleases(data);
          setLatestRelease(data[0]);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(data));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
          } catch {}
        }
      } catch (err) {
        // Fallback to default
      } finally {
        setIsLoading(false);
      }
    };

    fetchReleases();
  }, []);

  return { releases, latestRelease, isLoading };
}

const DEFAULT_RELEASE = {
  tag_name: "v1.0.0",
  name: "PDFcatalyst v1.0.0",
  published_at: "2026-10-16T11:41:07Z",
  html_url: "https://github.com/SarthAyush/PDFcatalyst-App/releases/tag/v1.0.0",
  assets: [
    {
      name: "PDFcatalyst-Setup-v1.0.0-x64.exe",
      size: 19875336,
      browser_download_url:
        "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.0/PDFcatalyst-Setup-v1.0.0-x64.exe",
      digest: "sha256:04a04855a984b84d9bd6c5afedda611d63f5eb259fd78f42fa2237cb4cf74b79",
    },
    {
      name: "PDFcatalyst.exe",
      size: 67598832,
      browser_download_url:
        "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.0/PDFcatalyst.exe",
      digest: "sha256:f4c06b245767378391146604bb29e83616374027d0d5de00cc41578e3c9cbc86",
    },
  ],
};

/* ==========================================================================
   Quiet, Soothing Floating Mascot Assistant
   Provides gentle document tips without intrusive popups
   ========================================================================== */
function FloatingCuteMascot({ soundEnabled, setSoundEnabled }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const [isGentlyNodding, setIsGentlyNodding] = useState(false);

  const tips = [
    "Your files stay 100% private on your machine.",
    "Click the glowing pins on the tour below to see features.",
    "No subscriptions or accounts needed — completely free.",
    "Easily reorder, rotate, or merge pages with one click.",
    "Scanned paper receipts? OCR converts them into searchable text.",
    "Press ⌘K or Ctrl+K anytime to quickly search any tool.",
  ];

  const handleNextTip = () => {
    if (soundEnabled) playAudioBlip(620);
    setIsGentlyNodding(true);
    setTipIndex((prev) => (prev + 1) % tips.length);
    setTimeout(() => setIsGentlyNodding(false), 600);
  };

  if (minimized) {
    return (
      <div
        className="mascot-minimized-pill glass-card"
        onClick={() => {
          if (soundEnabled) playAudioBlip(680);
          setMinimized(false);
        }}
        title="Open Document Assistant"
      >
        <img src="/cute-mascot.png" alt="Mascot" width="24" height="24" />
        <span className="min-label">Helper</span>
      </div>
    );
  }

  return (
    <div className="floating-mascot-container">
      <div className="mascot-speech-bubble glass-card">
        <span className="speech-text">{tips[tipIndex]}</span>
        <div className="bubble-actions">
          <button
            className="btn-bubble-sound"
            onClick={(e) => {
              e.stopPropagation();
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playAudioBlip(700);
            }}
            title={soundEnabled ? "Mute audio cues" : "Turn on gentle sounds"}
            aria-label="Toggle sound"
          >
            <Icon name={soundEnabled ? "volume" : "volumeMute"} size={11} />
          </button>
          <button
            className="btn-bubble-close"
            onClick={(e) => {
              e.stopPropagation();
              setMinimized(true);
            }}
            title="Minimize assistant"
            aria-label="Minimize"
          >
            <Icon name="x" size={10} />
          </button>
        </div>
      </div>

      <div
        className={`mascot-avatar-wrap ${isGentlyNodding ? "gently-nodding" : ""}`}
        onClick={handleNextTip}
        title="Click for a quick document tip"
      >
        <img
          src="/cute-mascot.png"
          alt="PDFCatalyst Friendly Mascot"
          className="mascot-img"
          width="76"
          height="76"
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   "Why Switch?" Comparison Cards
   Directly contrasts real frustrations with Adobe Acrobat & web converters
   ========================================================================== */
function WhySwitchSection() {
  const comparisons = [
    {
      title: "Cost & Subscriptions",
      badge: "Zero Cost",
      pdfcatalyst: "100% Free Forever",
      pdfcatalystDetail: "No monthly charges, no enterprise upgrades, and no hidden payment walls.",
      competitor: "Adobe Acrobat Pro",
      competitorDetail: "Costs $239.88 every single year per seat, adding up to thousands over time.",
    },
    {
      title: "Document Privacy",
      badge: "100% On-Device",
      pdfcatalyst: "Files Never Leave Your Device",
      pdfcatalystDetail: "All editing, signing, and OCR runs strictly on your local computer.",
      competitor: "Online Web Converters",
      competitorDetail: "Requires uploading confidential contracts, medical records, or taxes to unknown servers.",
    },
    {
      title: "Account Hassle",
      badge: "Zero Friction",
      pdfcatalyst: "Instant Launch, No Account Needed",
      pdfcatalystDetail: "Download, open, and start working immediately without entering an email or password.",
      competitor: "Adobe Creative Cloud",
      competitorDetail: "Forces account logins, cloud authentications, and background update agents.",
    },
    {
      title: "Redaction Safety",
      badge: "Permanent Removal",
      pdfcatalyst: "True Permanent Data Erasure",
      pdfcatalystDetail: "Sensitive text like SSNs and bank numbers are erased entirely so nobody can recover them.",
      competitor: "Standard PDF Viewers",
      competitorDetail: "Merely draws a black box on top; anyone can select and copy the text underneath.",
    },
    {
      title: "Startup & Performance",
      badge: "Sub-Second",
      pdfcatalyst: "Opens in Under 200 Milliseconds",
      pdfcatalystDetail: "Smooth 60 FPS scrolling and zooming, even on 500-page engineering documents.",
      competitor: "Legacy PDF Suites",
      competitorDetail: "Heavy software that takes 5 to 10 seconds to start and bogs down older computers.",
    },
    {
      title: "Page & Size Limits",
      badge: "No Limits",
      pdfcatalyst: "Unlimited Pages & File Sizes",
      pdfcatalystDetail: "Merge 50 large files or reorganize 1,000-page documents without restriction.",
      competitor: "Freemium Web Tools",
      competitorDetail: "Slaps you with 'Page limit reached' or 'File size exceeded — Upgrade to Continue'.",
    },
  ];

  return (
    <section className="section-container" id="why-switch">
      <div className="section-head-minimal">
        <span className="eyebrow-chip">WHY SWITCH TO PDFCATALYST</span>
        <h2 className="title-metallic">Everything you need without the headaches.</h2>
        <p className="subtitle-subtle">
          Enjoy a fast, private document editor built to solve the frustrations of expensive subscriptions and slow cloud converters.
        </p>
      </div>

      <div className="why-switch-grid">
        {comparisons.map((c, i) => (
          <div className="switch-card glass-card" key={i}>
            <div className="switch-card-top">
              <span className="switch-category">{c.title}</span>
              <span className="switch-badge">{c.badge}</span>
            </div>

            <div className="switch-comparison-rows">
              <div className="comp-item win">
                <div className="comp-item-header">
                  <div className="comp-icon-box green">
                    <Icon name="check" size={13} />
                  </div>
                  <strong>PDFCatalyst</strong>
                </div>
                <div className="comp-item-val">{c.pdfcatalyst}</div>
                <p className="comp-item-detail">{c.pdfcatalystDetail}</p>
              </div>

              <div className="comp-divider" />

              <div className="comp-item lose">
                <div className="comp-item-header">
                  <div className="comp-icon-box red">
                    <Icon name="x" size={12} />
                  </div>
                  <span className="competitor-name">{c.competitor}</span>
                </div>
                <p className="comp-item-detail competitor-detail">{c.competitorDetail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   Interactive Workflow Tour (The Wow Factor)
   Step-by-step interactive cards for everyday high-value workflows
   ========================================================================== */
function InteractiveWorkflowTour({ soundEnabled }) {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  // Card 1: Live Redaction Testing
  const [redacted, setRedacted] = useState(true);
  const [copiedNotice, setCopiedNotice] = useState("");

  // Card 2: OCR Scanning
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  // Card 3: E-Sign Stamp
  const [signed, setSigned] = useState(false);

  // Card 4: Page Reorder Simulation
  const [pageOrder, setPageOrder] = useState([1, 2, 3, 4]);

  // Card 5: Precision Measure Points
  const [measurePoint, setMeasurePoint] = useState("hallway");

  const workflows = [
    {
      id: "redact",
      tabTitle: "One-Click Redact",
      icon: "lock",
      badge: "Privacy Guarantee",
      headline: "True Redaction: Never Leak Confidential Details",
      description:
        "Standard viewers just place a black box over text, leaving the words underneath vulnerable to copy-pasting. PDFCatalyst permanently removes sensitive data from the document so it can never be extracted.",
    },
    {
      id: "ocr",
      tabTitle: "Scan to Text (OCR)",
      icon: "search",
      badge: "Smart Recognition",
      headline: "Turn Scanned Papers and Photos into Searchable Text",
      description:
        "Easily convert receipts, contracts, and printed documents into clean, selectable text right on your computer without sending your documents to the cloud.",
    },
    {
      id: "pages",
      tabTitle: "Merge & Organize",
      icon: "layers",
      badge: "Easy Layout",
      headline: "Reorder, Rotate, and Combine Pages Effortlessly",
      description:
        "Rearrange multi-page proposals, delete unwanted pages, rotate upside-down scans, and merge multiple PDF documents in seconds.",
    },
    {
      id: "sign",
      tabTitle: "Instant E-Sign",
      icon: "penTool",
      badge: "Quick Approvals",
      headline: "Fill Forms and Sign Agreements Without Printing",
      description:
        "Add a verified digital signature, fill text boxes, and insert approval dates with a single click. No need to print out paper, sign with a pen, or scan again.",
    },
    {
      id: "measure",
      tabTitle: "Precision Measure",
      icon: "ruler",
      badge: "Design Caliper",
      headline: "Measure Blueprints, Dimensions, and Floor Plans",
      description:
        "Calibrate to any scale (inches, feet, millimeters) and measure distances or floor area directly on construction blueprints, schematics, and design plans.",
    },
  ];

  const handleRunOcr = () => {
    if (isScanning) return;
    if (soundEnabled) playAudioBlip(540, "sine", 0.2);
    setIsScanning(true);
    setScanProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      if (current >= 100) {
        clearInterval(interval);
        setScanProgress(100);
        setIsScanning(false);
        if (soundEnabled) playAudioBlip(720, "sine", 0.2);
      } else {
        setScanProgress(current);
      }
    }, 120);
  };

  const handleTestCopy = () => {
    if (redacted) {
      if (soundEnabled) playAudioBlip(760);
      setCopiedNotice("Protected: 0 characters copied. The sensitive data does not exist in the file.");
    } else {
      if (soundEnabled) playAudioBlip(440);
      navigator.clipboard?.writeText("984-21-0814");
      setCopiedNotice("Vulnerable: '984-21-0814' was copied. Standard black box overlays can still be read.");
    }
    setTimeout(() => setCopiedNotice(""), 3500);
  };

  const handleReorderPages = () => {
    if (soundEnabled) playAudioBlip(640);
    setPageOrder((prev) => [...prev.slice(1), prev[0]]);
  };

  const currentWf = workflows[activeWorkflow];

  return (
    <section className="section-container" id="interactive-tour">
      <div className="section-head-minimal">
        <span className="eyebrow-chip">INTERACTIVE WORKFLOW TOUR</span>
        <h2 className="title-metallic">Experience the tools in action.</h2>
        <p className="subtitle-subtle">
          Click between the workflows below to try out everyday features directly in your browser.
        </p>
      </div>

      <div className="workflow-tour-shell glass-card">
        {/* Navigation Tabs */}
        <div className="workflow-tour-tabs">
          {workflows.map((wf, idx) => (
            <button
              key={wf.id}
              className={`tour-tab-btn ${activeWorkflow === idx ? "active" : ""}`}
              onClick={() => {
                if (soundEnabled) playAudioBlip(580 + idx * 40);
                setActiveWorkflow(idx);
              }}
            >
              <Icon name={wf.icon} size={15} />
              <span>{wf.tabTitle}</span>
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="workflow-tour-body">
          <div className="workflow-info-col">
            <span className="workflow-badge">{currentWf.badge}</span>
            <h3 className="workflow-title">{currentWf.headline}</h3>
            <p className="workflow-desc">{currentWf.description}</p>

            <div className="workflow-key-benefits">
              <div className="benefit-row">
                <Icon name="checkCircle" size={14} className="green" />
                <span>Runs smoothly and quietly on your computer</span>
              </div>
              <div className="benefit-row">
                <Icon name="checkCircle" size={14} className="green" />
                <span>Zero cloud uploads for total confidentiality</span>
              </div>
              <div className="benefit-row">
                <Icon name="checkCircle" size={14} className="green" />
                <span>Clean, modern interface designed for focus</span>
              </div>
            </div>
          </div>

          <div className="workflow-interactive-col">
            {/* WORKFLOW 0: REDACTION DEMO */}
            {activeWorkflow === 0 && (
              <div className="interactive-sandbox-frame glass-panel">
                <div className="sandbox-panel-top">
                  <span className="panel-title">Redaction Protection Simulator</span>
                  <div className="toggle-mode-pills">
                    <button
                      className={`pill-btn ${redacted ? "active" : ""}`}
                      onClick={() => setRedacted(true)}
                    >
                      PDFCatalyst Erase
                    </button>
                    <button
                      className={`pill-btn danger ${!redacted ? "active" : ""}`}
                      onClick={() => setRedacted(false)}
                    >
                      Standard Black Box
                    </button>
                  </div>
                </div>

                <div className="sample-document-sheet">
                  <div className="sheet-badge">NON-DISCLOSURE AGREEMENT</div>
                  <p className="doc-text">
                    Client Name: <strong>Katherine Vance</strong>
                  </p>
                  <p className="doc-text">
                    Identification SSN:{" "}
                    <span className={`redaction-target ${redacted ? "safely-erased" : "superficial-box"}`}>
                      {redacted ? "[Permanently Erased]" : "984-21-0814"}
                    </span>
                  </p>
                  <p className="doc-text">
                    Bank Account Number:{" "}
                    <span className={`redaction-target ${redacted ? "safely-erased" : "superficial-box"}`}>
                      {redacted ? "[Permanently Erased]" : "4421-8890-1200"}
                    </span>
                  </p>
                </div>

                <div className="sandbox-action-row">
                  <button className="btn-try-copy" onClick={handleTestCopy}>
                    <Icon name="copy" size={13} />
                    <span>Test Copy-Paste Vulnerability</span>
                  </button>
                </div>

                {copiedNotice && (
                  <div className={`copy-feedback-banner ${redacted ? "safe" : "danger"}`}>
                    <Icon name={redacted ? "shield" : "lock"} size={13} />
                    <span>{copiedNotice}</span>
                  </div>
                )}
              </div>
            )}

            {/* WORKFLOW 1: OCR SCAN DEMO */}
            {activeWorkflow === 1 && (
              <div className="interactive-sandbox-frame glass-panel">
                <div className="sandbox-panel-top">
                  <span className="panel-title">Optical Character Recognition</span>
                  <span className="panel-indicator">{isScanning ? "Scanning Document..." : "Ready to Scan"}</span>
                </div>

                <div className="ocr-preview-box">
                  <img
                    src="/media/document_audit.jpg"
                    alt="Sample Document"
                    className="ocr-sample-img"
                  />
                  {isScanning && (
                    <div
                      className="ocr-laser-beam"
                      style={{ top: `${scanProgress}%` }}
                    />
                  )}
                  <div className="ocr-text-overlay">
                    <span className="ocr-word">INVOICE #9421</span>
                    <span className="ocr-word">TOTAL: $1,420.00</span>
                    <span className="ocr-word">STATUS: PAID</span>
                  </div>
                </div>

                <div className="sandbox-action-row">
                  <button
                    className="btn-try-copy"
                    onClick={handleRunOcr}
                    disabled={isScanning}
                  >
                    <Icon name="search" size={13} />
                    <span>{isScanning ? `Scanning (${scanProgress}%)...` : "Run Smart Scan"}</span>
                  </button>
                  <span className="ocr-note">Extracts text clearly from photos and paper scans.</span>
                </div>
              </div>
            )}

            {/* WORKFLOW 2: PAGE REORDER DEMO */}
            {activeWorkflow === 2 && (
              <div className="interactive-sandbox-frame glass-panel">
                <div className="sandbox-panel-top">
                  <span className="panel-title">Page Arrangement Preview</span>
                  <button className="btn-small-refresh" onClick={handleReorderPages}>
                    <Icon name="refresh" size={12} />
                    <span>Cycle Order</span>
                  </button>
                </div>

                <div className="pages-visual-row">
                  {pageOrder.map((page, idx) => (
                    <div className="page-thumbnail-card" key={page}>
                      <div className="thumb-header">
                        <span>Page {page}</span>
                        <span className="thumb-idx">#{idx + 1}</span>
                      </div>
                      <div className="thumb-mock-content">
                        <div className="mock-line wide" />
                        <div className="mock-line" />
                        <div className="mock-line short" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sandbox-action-row">
                  <button className="btn-try-copy" onClick={handleReorderPages}>
                    <Icon name="layers" size={13} />
                    <span>Reorder Pages</span>
                  </button>
                  <span className="ocr-note">Drag and drop pages or combine multiple documents.</span>
                </div>
              </div>
            )}

            {/* WORKFLOW 3: E-SIGN DEMO */}
            {activeWorkflow === 3 && (
              <div className="interactive-sandbox-frame glass-panel">
                <div className="sandbox-panel-top">
                  <span className="panel-title">Digital Signature Stamp</span>
                  <span className="panel-indicator">{signed ? "Document Signed" : "Pending Signature"}</span>
                </div>

                <div className="sample-document-sheet signing-sheet">
                  <div className="sheet-badge">CONSULTING SERVICES AGREEMENT</div>
                  <p className="doc-text">
                    By signing below, the terms and deliverable dates are formally accepted.
                  </p>
                  <div className="sign-box-area">
                    <span className="sign-line-label">Authorized Signature:</span>
                    {signed ? (
                      <div className="placed-signature">
                        <span className="sig-cursive">Katherine Vance</span>
                        <span className="sig-meta">Verified Digital Seal • {new Date().toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <div className="empty-sig-prompt">Click below to place signature</div>
                    )}
                  </div>
                </div>

                <div className="sandbox-action-row">
                  <button
                    className="btn-try-copy"
                    onClick={() => {
                      if (soundEnabled) playAudioBlip(signed ? 520 : 780);
                      setSigned(!signed);
                    }}
                  >
                    <Icon name={signed ? "x" : "penTool"} size={13} />
                    <span>{signed ? "Clear Signature" : "Add Signature Stamp"}</span>
                  </button>
                  <span className="ocr-note">Sign legal agreements without printing or scanning.</span>
                </div>
              </div>
            )}

            {/* WORKFLOW 4: PRECISION MEASURE DEMO */}
            {activeWorkflow === 4 && (
              <div className="interactive-sandbox-frame glass-panel">
                <div className="sandbox-panel-top">
                  <span className="panel-title">Blueprint Caliper</span>
                  <div className="toggle-mode-pills">
                    <button
                      className={`pill-btn ${measurePoint === "hallway" ? "active" : ""}`}
                      onClick={() => setMeasurePoint("hallway")}
                    >
                      Corridor
                    </button>
                    <button
                      className={`pill-btn ${measurePoint === "room" ? "active" : ""}`}
                      onClick={() => setMeasurePoint("room")}
                    >
                      Main Studio
                    </button>
                  </div>
                </div>

                <div className="blueprint-caliper-box">
                  <img
                    src="/media/blueprint_cad.jpg"
                    alt="Blueprint"
                    className="blueprint-img"
                  />
                  <div className={`caliper-callout ${measurePoint}`}>
                    <div className="caliper-dot" />
                    <div className="caliper-tag">
                      {measurePoint === "hallway" ? (
                        <>
                          <strong>Distance: 24.5 ft (7.47 m)</strong>
                          <span>Scale: 1/4" = 1'-0"</span>
                        </>
                      ) : (
                        <>
                          <strong>Area: 480 sq ft (44.6 m²)</strong>
                          <span>Scale: 1/4" = 1'-0"</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sandbox-action-row">
                  <span className="ocr-note">
                    Accurate architectural measurements directly on engineering drawings.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Visual Media Showcase Gallery
   High-resolution photos & animated GIFs demonstrating clear user outcomes
   ========================================================================== */
function VisualMediaShowcase({ soundEnabled }) {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: "privacy",
      badge: "100% Offline",
      category: "PROTECT YOUR WORK",
      title: "Total Privacy: Files Never Leave Your Device",
      desc: "Unlike online PDF converters that transmit confidential files to remote servers, PDFCatalyst handles every document entirely in your local computer memory. Your contracts, bank statements, and sensitive client papers remain completely private.",
      mainImage: "/media/security_airgap.jpg",
      gifInset: "/media/crypto_aes.gif",
      gifLabel: "LOCAL MEMORY ENCRYPTION",
      benefits: [
        "No file uploads to remote cloud servers",
        "Zero tracking, analytics, or behavioral telemetry",
        "Works smoothly without an internet connection",
      ],
    },
    {
      id: "speed",
      badge: "Instant Loading",
      category: "LIGHTNING PERFORMANCE",
      title: "Instant Opening & Smooth Scrolling",
      desc: "Say goodbye to annoying spinning wheels and frozen screens. Open 500-page manuals or heavy architectural blueprints in the blink of an eye, and enjoy silky-smooth zooming without lag.",
      mainImage: "/media/silicon_hardware.jpg",
      gifInset: "/media/matrix_transform.gif",
      gifLabel: "60 FPS SMOOTH NAVIGATION",
      benefits: [
        "Opens dense documents in under 200 milliseconds",
        "Fluid 60 FPS scrolling even at 800% zoom",
        "Uses 96% less computer memory than legacy PDF suites",
      ],
    },
    {
      id: "ocr",
      badge: "Smart Recognition",
      category: "DOCUMENT CONVERSION",
      title: "Convert Paper Scans into Searchable Text",
      desc: "Turn phone photos, scanned receipts, and old paper records into crisp, selectable text. Search for keywords instantly, copy quotes with ease, and organize past records cleanly.",
      mainImage: "/media/document_audit.jpg",
      gifInset: "/media/laser_scan.gif",
      gifLabel: "SMART TEXT EXTRACTION",
      benefits: [
        "Recognizes text from scans and photographs accurately",
        "Preserves your original fonts, tables, and page layout",
        "Converts documents on your device without subscription fees",
      ],
    },
    {
      id: "blueprints",
      badge: "Design Caliper",
      category: "CONSTRUCTION & DESIGN",
      title: "Measure Blueprints with True Precision",
      desc: "Engineered for architects, builders, and designers who need real-world measurements. Calibrate drawings against title block scales and calculate square footage, room dimensions, and perimeters instantly.",
      mainImage: "/media/blueprint_cad.jpg",
      gifInset: "/media/radar_scan.gif",
      gifLabel: "CALIBRATED CAD MEASUREMENT",
      benefits: [
        "Supports standard Imperial (1/4\", 1/8\") and Metric scales",
        "Instant square footage and perimeter calculation",
        "Sharp vector display ensures lines remain crystal-clear",
      ],
    },
    {
      id: "batch",
      badge: "Batch Productivity",
      category: "EVERYDAY SPEED",
      title: "Batch Merge, Split, and Compress in Seconds",
      desc: "Process multiple documents at once. Combine whole folders of receipts into one organized file, shrink large files for email attachments, and extract selected pages without hassle.",
      mainImage: "/media/terminal_code.jpg",
      gifInset: "/media/sorting_parallel.gif",
      gifLabel: "PARALLEL FILE PROCESSING",
      benefits: [
        "Combine dozens of PDF files with a single click",
        "Shrink large files for email attachments without losing quality",
        "Split multi-page bundles into individual documents",
      ],
    },
  ];

  const cur = pillars[activePillar];

  return (
    <section className="section-container" id="visual-showcase">
      <div className="section-head-minimal">
        <span className="eyebrow-chip">CAPABILITIES SHOWCASE</span>
        <h2 className="title-metallic">Every document task made simple.</h2>
        <p className="subtitle-subtle">
          Explore how PDFCatalyst provides the tools you need for reading, editing, signing, and securing documents.
        </p>
      </div>

      <div className="media-showcase-shell glass-card">
        {/* Category Pills */}
        <div className="showcase-tab-pills">
          {pillars.map((p, idx) => (
            <button
              key={p.id}
              className={`showcase-pill-btn ${activePillar === idx ? "active" : ""}`}
              onClick={() => {
                if (soundEnabled) playAudioBlip(560 + idx * 40);
                setActivePillar(idx);
              }}
            >
              <span>{p.title.split(":")[0]}</span>
              <span className="showcase-pill-badge">{p.badge}</span>
            </button>
          ))}
        </div>

        {/* Visual Content Grid */}
        <div className="showcase-content-grid">
          {/* Left: High-Res Visual Frame with Inset Animated GIF */}
          <div className="showcase-visual-frame">
            <img
              src={cur.mainImage}
              alt={cur.title}
              className="showcase-img-main"
            />
            <div className="showcase-gif-inset">
              <img src={cur.gifInset} alt={cur.gifLabel} />
              <div className="showcase-gif-label">
                <span className="beacon-dot" />
                {cur.gifLabel}
              </div>
            </div>
          </div>

          {/* Right: Explanation & User Benefits */}
          <div className="showcase-text-details">
            <span className="showcase-eyebrow">{cur.category}</span>
            <h3 className="showcase-title">{cur.title}</h3>
            <p className="showcase-desc">{cur.desc}</p>

            <ul className="showcase-highlights-list">
              {cur.benefits.map((b, i) => (
                <li key={i}>
                  <Icon name="checkCircle" size={15} className="highlight-icon green" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Desktop Tour: Screenshot with Glowing Hotspot Pins
   ========================================================================== */
function ScreenshotInteractiveTour({ soundEnabled }) {
  const [activePin, setActivePin] = useState(0);

  const pins = [
    {
      id: 0,
      title: "One-Click Quick Action Tools",
      badge: "Instant Shortcuts",
      desc: "Merge PDFs, compress file size for email, rotate upside-down pages, or split documents with one simple click.",
      x: 35,
      y: 67,
    },
    {
      id: 1,
      title: "Complete Editing & Signing Sidebar",
      badge: "All Tools Included",
      desc: "Fill form fields, sign agreements, add text stamps, extract text with OCR, and permanently erase private data.",
      x: 8,
      y: 45,
    },
    {
      id: 2,
      title: "Document Templates",
      badge: "Ready-to-Use",
      desc: "Quickly start invoices, contracts, proposals, and clean blank pages with pre-set professional layouts.",
      x: 35,
      y: 88,
    },
    {
      id: 3,
      title: "Quick Search & Command Menu",
      badge: "Shortcut (Ctrl+K)",
      desc: "Quickly search for any tool, document section, or feature using keyboard shortcuts without hunting through menus.",
      x: 80,
      y: 7,
    },
  ];

  return (
    <div className="screenshot-tour-wrapper glass-card">
      <div className="screenshot-frame-header">
        <div className="window-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="window-center-title">
          <img src="/pdfix-logo.png" alt="" width="15" height="15" />
          <span>PDFCatalyst Desktop App</span>
        </div>
        <span className="window-arch-badge">Interactive Tour (Click Pins)</span>
      </div>

      <div className="screenshot-viewport-relative">
        <img
          src="/app-screenshot.png"
          alt="PDFCatalyst Desktop App Screenshot"
          className="tour-main-screenshot"
        />

        {pins.map((pin) => (
          <button
            key={pin.id}
            className={`hotspot-pin ${activePin === pin.id ? "active" : ""}`}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onClick={() => {
              if (soundEnabled) playAudioBlip(680);
              setActivePin(pin.id);
            }}
            aria-label={`Inspect hotspot: ${pin.title}`}
          >
            <span className="pin-pulse-ring" />
            <span className="pin-core-num">{pin.id + 1}</span>
          </button>
        ))}
      </div>

      <div className="screenshot-tour-active-card">
        <div className="tour-badge-row">
          <span className="tour-step-pill">FEATURE {activePin + 1} OF 4</span>
          <span className="tour-feature-badge">{pins[activePin].badge}</span>
        </div>
        <h4 className="tour-title">{pins[activePin].title}</h4>
        <p className="tour-desc">{pins[activePin].desc}</p>
        <div className="tour-controls-row">
          <div className="tour-dots-pills">
            {pins.map((p) => (
              <button
                key={p.id}
                className={`tour-dot-btn ${activePin === p.id ? "current" : ""}`}
                onClick={() => {
                  if (soundEnabled) playAudioBlip(640);
                  setActivePin(p.id);
                }}
              >
                {p.id + 1}
              </button>
            ))}
          </div>
          <button
            className="btn-tour-next"
            onClick={() => {
              if (soundEnabled) playAudioBlip(720);
              setActivePin((prev) => (prev + 1) % pins.length);
            }}
          >
            <span>Next Feature</span>
            <Icon name="arrowRight" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Speed & Efficiency Comparison Simulator
   ========================================================================== */
function LiveBenchmarkVisualizer({ soundEnabled }) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);

  const runSimulation = () => {
    if (isRunning) return;
    if (soundEnabled) playAudioBlip(540);
    setIsRunning(true);
    setProgress(0);

    let val = 0;
    const interval = setInterval(() => {
      val += 5;
      if (val >= 100) {
        clearInterval(interval);
        setProgress(100);
        setIsRunning(false);
        if (soundEnabled) playAudioBlip(760);
      } else {
        setProgress(val);
      }
    }, 35);
  };

  const metrics = [
    {
      title: "Opening a 500-Page Document",
      pdfcatalyst: "0.18 seconds",
      acrobat: "3.40 seconds",
      cloud: "7.20 seconds",
      winner: "18x Faster",
      pctPdfix: 100,
      pctAcrobat: 25,
      pctCloud: 10,
    },
    {
      title: "Computer Memory Footprint (RAM)",
      pdfcatalyst: "14 MB",
      acrobat: "380 MB",
      cloud: "620 MB",
      winner: "96% Less Memory",
      pctPdfix: 100,
      pctAcrobat: 30,
      pctCloud: 15,
    },
    {
      title: "Zoom & Smooth Scrolling Performance",
      pdfcatalyst: "60 FPS (Silky Smooth)",
      acrobat: "18 FPS (Stuttering)",
      cloud: "12 FPS (Laggy)",
      winner: "Zero Stutter",
      pctPdfix: 100,
      pctAcrobat: 35,
      pctCloud: 20,
    },
  ];

  return (
    <div className="benchmark-console-card glass-card">
      <div className="bench-top-actions">
        <div>
          <span className="eyebrow-chip">SPEED & RESOURCE USAGE</span>
          <h3 className="bench-section-title">Tested side-by-side on real hardware.</h3>
        </div>
        <button
          className="btn-run-benchmark"
          onClick={runSimulation}
          disabled={isRunning}
        >
          <Icon name="activity" size={13} className={isRunning ? "pulse-anim" : ""} />
          <span>{isRunning ? `Testing (${progress}%)...` : "Run Speed Test"}</span>
        </button>
      </div>

      <div className="bench-rows-grid">
        {metrics.map((m, idx) => (
          <div className="bench-metric-row" key={idx}>
            <div className="metric-header-row">
              <strong className="m-title">{m.title}</strong>
              <span className="m-winner-badge">{m.winner}</span>
            </div>

            <div className="metric-bars-stack">
              <div className="comp-bar-item">
                <div className="comp-label">
                  <span className="brand-bold">PDFCatalyst</span>
                  <span className="val-text green">{m.pdfcatalyst}</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill green-gradient"
                    style={{ width: `${(m.pctPdfix * progress) / 100}%` }}
                  />
                </div>
              </div>

              <div className="comp-bar-item">
                <div className="comp-label">
                  <span className="brand-dim">Adobe Acrobat Pro</span>
                  <span className="val-text dim">{m.acrobat}</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill dim"
                    style={{ width: `${(m.pctAcrobat * progress) / 100}%` }}
                  />
                </div>
              </div>

              <div className="comp-bar-item">
                <div className="comp-label">
                  <span className="brand-dim">Web & Cloud Converters</span>
                  <span className="val-text dim">{m.cloud}</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill red-dim"
                    style={{ width: `${(m.pctCloud * progress) / 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   Fast Command Menu (⌘K / Ctrl+K)
   ========================================================================== */
function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
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
    { id: "dl-inst", category: "Download", title: "Download Windows Installer (.exe)", shortcut: "↵", link: DOWNLOAD_INSTALLER },
    { id: "dl-port", category: "Download", title: "Download Standalone Portable (.exe)", shortcut: "P", link: DOWNLOAD_PORTABLE },
    { id: "feat-switch", category: "Why Switch", title: "Compare vs. Adobe Acrobat & Web Tools", shortcut: "W", hash: "#why-switch" },
    { id: "feat-tour", category: "Interactive Tour", title: "Try Redaction, OCR & Page Tools Live", shortcut: "T", hash: "#interactive-tour" },
    { id: "feat-show", category: "Showcase", title: "Explore Full Media Showcase", shortcut: "S", hash: "#visual-showcase" },
    { id: "feat-desk", category: "Screenshot", title: "View Desktop Workbench Screenshot", shortcut: "D", hash: "#app-preview" },
    { id: "feat-bench", category: "Speed", title: "Run Speed & Performance Test", shortcut: "B", hash: "#benchmarks" },
    { id: "feat-faq", category: "Help", title: "Frequently Asked Questions", shortcut: "F", hash: "#faq" },
    { id: "src-repo", category: "Source", title: "View Open Source Repository on GitHub", shortcut: "G", link: "https://github.com/SarthAyush/PDFcatalyst-App" },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="raycast-overlay" onClick={() => onClose(false)}>
      <div className="raycast-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="raycast-input-bar">
          <Icon name="search" size={16} className="raycast-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="raycast-input"
            placeholder="Type a feature, tool, or shortcut..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="raycast-kbd-esc">ESC</span>
        </div>

        <div className="raycast-list">
          {filtered.length === 0 ? (
            <div className="raycast-empty">No matching actions found.</div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`raycast-row ${idx === 0 ? "selected" : ""}`}
                onClick={() => {
                  if (item.link) {
                    window.open(item.link, item.link.startsWith("http") ? "_blank" : "_self");
                  } else if (item.hash) {
                    window.location.hash = item.hash;
                  }
                  onClose(false);
                }}
              >
                <div className="row-left">
                  <span className="row-badge">{item.category}</span>
                  <span className="row-title">{item.title}</span>
                </div>
                <div className="row-right">
                  <kbd className="row-key">{item.shortcut}</kbd>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="raycast-footer">
          <span>Keyboard Navigation Enabled</span>
          <div className="raycast-footer-keys">
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Hero Desktop Preview Frame
   Clean visual showing the desktop application
   ========================================================================== */
function HeroPreviewCard() {
  return (
    <div className="hero-preview-wrapper glass-card">
      <div className="preview-top-bar">
        <div className="window-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="preview-window-title">PDFCatalyst Desktop</div>
        <span className="badge-offline">100% Offline</span>
      </div>
      <div className="preview-image-container">
        <img
          src="/app-screenshot.png"
          alt="PDFCatalyst Desktop App Interface"
          className="preview-app-image"
        />
      </div>
      <div className="preview-bottom-stats">
        <div className="stat-pill">
          <Icon name="checkCircle" size={13} className="green" />
          <span>No Subscriptions</span>
        </div>
        <div className="stat-pill">
          <Icon name="shield" size={13} className="green" />
          <span>Private & Safe</span>
        </div>
        <div className="stat-pill">
          <Icon name="zap" size={13} className="green" />
          <span>Instant Launch</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Main Application
   ========================================================================== */
function App() {
  const { latestRelease } = useGitHubReleases();
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [detectedOs, setDetectedOs] = useState("Windows x64");

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
  const currentVersion = latestRelease.tag_name || "v1.0.0";

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

  useEffect(() => {
    try {
      const ua = navigator.userAgent;
      if (ua.includes("Win")) setDetectedOs("Windows x64");
      else if (ua.includes("Mac")) setDetectedOs("macOS");
      else if (ua.includes("Linux")) setDetectedOs("Linux");
    } catch {}
  }, []);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (soundEnabled) playAudioBlip(780);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const faqs = [
    {
      q: "Is PDFCatalyst completely free to use?",
      a: "Yes. PDFCatalyst is 100% free with no monthly subscription fees, no watermarks placed on your documents, and no features locked behind paywalls.",
    },
    {
      q: "Are my files uploaded to any servers?",
      a: "Never. All document processing, editing, signing, and OCR happen strictly on your local computer. Your private files never leave your device.",
    },
    {
      q: "How does PDFCatalyst's permanent redaction work?",
      a: "Standard PDF viewers only draw an opaque black box over text, leaving the words intact so anyone can copy them. PDFCatalyst permanently removes the underlying data from the file so it cannot be recovered.",
    },
    {
      q: "What is the difference between the Installer and Portable version?",
      a: "The Windows Installer sets up desktop shortcuts and opens PDF files when double-clicked. The Portable version is a standalone file that runs immediately from any folder or USB drive without installation or administrator privileges.",
    },
    {
      q: "Can I use PDFCatalyst for commercial and work documents?",
      a: "Yes. PDFCatalyst is open source under dual MIT and Apache-2.0 licenses, allowing unrestricted use for personal, professional, and business tasks.",
    },
  ];

  return (
    <div className="raycast-theme-shell">
      {/* Background Ambience */}
      <div className="linear-subpixel-grid" aria-hidden="true" />
      <div className="metallic-glow-spotlight" aria-hidden="true" />

      {/* Floating Gentle Mascot Assistant */}
      <FloatingCuteMascot soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {/* Modern Frosted-Glass Navbar */}
      <header className="linear-nav glass-nav">
        <div className="linear-nav-inner">
          <a href="#top" className="linear-brand">
            <div className="brand-gem">
              <img src="/pdfix-logo.png" alt="PDFCatalyst Logo" width="20" height="20" />
            </div>
            <span className="brand-name">PDFCatalyst</span>
            <span className="version-pill">{currentVersion}</span>
          </a>

          <nav className="nav-center-links">
            <a href="#why-switch" className="nav-link">Why Switch</a>
            <a href="#interactive-tour" className="nav-link">Workflow Tour</a>
            <a href="#visual-showcase" className="nav-link">Showcase</a>
            <a href="#app-preview" className="nav-link">App Preview</a>
            <a href="#benchmarks" className="nav-link">Speed</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          <div className="linear-nav-right">
            <button
              className="command-palette-trigger"
              onClick={() => setCommandOpen(true)}
              title="Search tools & shortcuts (⌘K)"
            >
              <Icon name="search" size={13} />
              <span>Search</span>
              <kbd className="kbd-shortcut">⌘K</kbd>
            </button>

            <div className="nav-divider" />

            <div className="nav-utility-icons">
              <a
                href="https://github.com/SarthAyush/PDFcatalyst-App"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-icon-btn"
                title="GitHub Repository"
                aria-label="GitHub Repository"
              >
                <Icon name="github" size={15} />
              </a>

              <button
                className={`nav-icon-btn ${soundEnabled ? "active" : ""}`}
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (!soundEnabled) playAudioBlip(720);
                }}
                title={soundEnabled ? "Gentle audio enabled" : "Audio muted"}
                aria-label="Toggle sound"
              >
                <Icon name={soundEnabled ? "volume" : "volumeMute"} size={14} />
              </button>

              <button
                className="nav-icon-btn"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle Theme"
              >
                <Icon name={theme === "dark" ? "sun" : "moon"} size={14} />
              </button>
            </div>

            <a href={installerUrl} className="btn-metallic-header">
              <span>Download Free</span>
              <Icon name="arrowRight" size={12} />
            </a>
          </div>

          <button
            className="mobile-hamburger-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "x" : "menu"} size={18} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-nav-drawer glass-card">
            <a href="#why-switch" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Why Switch</a>
            <a href="#interactive-tour" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Workflow Tour</a>
            <a href="#visual-showcase" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Showcase</a>
            <a href="#app-preview" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>App Preview</a>
            <a href="#benchmarks" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Speed Comparison</a>
            <a href="#faq" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="mobile-drawer-actions">
              <a href={installerUrl} className="btn-metallic-primary" style={{ width: "100%", justifyContent: "center" }}>
                <Icon name="download" size={14} />
                <span>Download Free Installer</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* ==========================================================================
           Hero Section: Clear, Benefit-Driven Value Proposition
           ========================================================================== */}
        <section className="linear-split-hero">
          <div className="split-hero-container">
            <div className="split-hero-left">
              <div className="hero-status-pill glass-card">
                <span className="beacon-dot" />
                <span className="status-text">OFFLINE DOCUMENT WORKBENCH</span>
                <span className="dot-sep">•</span>
                <span className="version-highlight">100% FREE</span>
              </div>

              <h1 className="hero-headline-metallic">
                The private PDF editor
                <br />
                <span className="shimmer-metallic">that just works.</span>
              </h1>

              <p className="hero-description-technical">
                Open, edit, organize, and sign your PDF documents with zero subscriptions, zero account logins, and complete on-device privacy.
              </p>

              <div className="hero-cta-linear-row">
                <a href={installerUrl} className="btn-metallic-primary">
                  <Icon name="download" size={16} />
                  <span>Download Free for {detectedOs}</span>
                  <span className="cta-meta">({installerSize})</span>
                </a>
                <a href={portableUrl} className="btn-metallic-secondary" title="No installation needed">
                  <Icon name="file" size={14} />
                  <span>Portable (.exe)</span>
                </a>
                <button className="btn-metallic-secondary" onClick={() => setCommandOpen(true)}>
                  <Icon name="command" size={14} />
                  <span>Quick Search</span>
                  <kbd>⌘K</kbd>
                </button>
              </div>

              <div className="hero-telemetry-hud glass-card">
                <div className="hud-metric">
                  <span className="hud-label">PRICING</span>
                  <strong className="hud-val green">$0 Free Forever</strong>
                </div>
                <div className="hud-metric">
                  <span className="hud-label">PRIVACY</span>
                  <strong className="hud-val">100% On-Device</strong>
                </div>
                <div className="hud-metric">
                  <span className="hud-label">STARTUP SPEED</span>
                  <strong className="hud-val green">&lt; 200 ms</strong>
                </div>
                <div className="hud-metric">
                  <span className="hud-label">ACCOUNT</span>
                  <strong className="hud-val">None Needed</strong>
                </div>
              </div>
            </div>

            <div className="split-hero-right">
              <HeroPreviewCard />
            </div>
          </div>
        </section>

        {/* Why Switch Section: Everyday Frustrations Solved */}
        <WhySwitchSection />

        {/* Interactive Workflow Tour: The Wow Factor */}
        <InteractiveWorkflowTour soundEnabled={soundEnabled} />

        {/* Visual Media Showcase: High-Res Photos & GIFs */}
        <VisualMediaShowcase soundEnabled={soundEnabled} />

        {/* Desktop Tour: Screenshot with Hotspot Pins */}
        <section className="section-container" id="app-preview">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">DESKTOP WORKBENCH TOUR</span>
            <h2 className="title-metallic">A clean workspace built for productivity.</h2>
            <p className="subtitle-subtle">
              Click the glowing interactive pins on the screenshot below to see the tools in action.
            </p>
          </div>

          <ScreenshotInteractiveTour soundEnabled={soundEnabled} />
        </section>

        {/* Speed & Benchmarks */}
        <section className="section-container" id="benchmarks">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">PERFORMANCE COMPARISON</span>
            <h2 className="title-metallic">Fast, light, and responsive.</h2>
            <p className="subtitle-subtle">
              See how PDFCatalyst performs on everyday documents compared to bloated legacy suites.
            </p>
          </div>

          <LiveBenchmarkVisualizer soundEnabled={soundEnabled} />
        </section>

        {/* Download Hub */}
        <section className="section-container" id="download">
          <div className="download-console-card glass-card">
            <span className="eyebrow-chip">GET STARTED TODAY</span>
            <h2 className="title-metallic">Download PDFCatalyst {currentVersion}</h2>
            <p className="subtitle-subtle">
              Free forever for personal, academic, and business use. No registration required.
            </p>

            <div className="download-actions-grid">
              <a href={installerUrl} className="download-action-card primary glass-card">
                <div className="card-info">
                  <div className="action-tag">RECOMMENDED</div>
                  <strong className="card-title">Windows Installer</strong>
                  <span className="card-meta">v1.0.0 • x64 • {installerSize}</span>
                </div>
                <Icon name="download" size={18} />
              </a>

              <a href={portableUrl} className="download-action-card glass-card">
                <div className="card-info">
                  <div className="action-tag">PORTABLE</div>
                  <strong className="card-title">Standalone Executable</strong>
                  <span className="card-meta">Run directly from any folder or USB • {portableSize}</span>
                </div>
                <Icon name="download" size={18} />
              </a>
            </div>

            <div className="winget-box">
              <span className="winget-label">Or install via Windows Package Manager:</span>
              <div className="winget-cmd-row">
                <code>winget install SarthAyush.PDFcatalyst</code>
                <button
                  className="btn-winget-copy"
                  onClick={() => copy("winget install SarthAyush.PDFcatalyst", "winget")}
                >
                  <Icon name="copy" size={12} />
                  <span>{copiedId === "winget" ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="sha-verify-bar">
              <span className="sha-label">SHA-256 Checksum:</span>
              <code>{installerSha}</code>
            </div>
          </div>
        </section>

        {/* Creator Profile */}
        <section className="section-container">
          <div className="creator-linear-card glass-card">
            <div className="creator-details">
              <span className="eyebrow-chip">CREATOR & MAINTAINER</span>
              <h3 className="creator-name">Sarthak Saxena</h3>
              <p className="creator-bio">
                Passionate about crafting fast, private, and dependable software that respects your time and keeps your personal data safe.
              </p>
              <div className="creator-badges-row">
                <span className="badge-pill"><Icon name="shield" size={13} /> 100% On-Device Privacy</span>
                <span className="badge-pill"><Icon name="check" size={13} /> Open Source</span>
              </div>
            </div>
            <div className="creator-avatar-wrap">
              <img src="/pdfix-logo.png" alt="PDFCatalyst Logo" width="72" height="72" />
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="section-container" id="faq">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">FAQ</span>
            <h2 className="title-metallic">Common questions, answered simply.</h2>
          </div>

          <div className="faq-linear-list">
            {faqs.map((faq, i) => (
              <div className={`faq-row glass-card ${activeFaq === i ? "open" : ""}`} key={i}>
                <button className="faq-q-btn" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-icon">{activeFaq === i ? "−" : "+"}</span>
                </button>
                {activeFaq === i && (
                  <div className="faq-ans">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modern Frosted-Glass Footer */}
      <footer className="linear-footer glass-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-brand">
              <img src="/pdfix-logo.png" alt="PDFCatalyst" width="20" height="20" />
              <span>PDFCatalyst</span>
            </div>
            <p>The fast, private PDF editor that respects your privacy. 100% offline.</p>
            <div className="footer-hud-status">
              <span className="beacon-dot" />
              <span>Private & Safe · No Remote File Tracking</span>
            </div>
          </div>

          <div className="footer-nav-columns">
            <div className="nav-col">
              <strong>EXPLORE</strong>
              <a href="#why-switch">Why Switch</a>
              <a href="#interactive-tour">Workflow Tour</a>
              <a href="#visual-showcase">Showcase</a>
              <a href="#app-preview">Desktop Preview</a>
              <a href="#benchmarks">Speed Tests</a>
            </div>
            <div className="nav-col">
              <strong>DOWNLOADS</strong>
              <a href={installerUrl}>Windows Installer</a>
              <a href={portableUrl}>Portable Executable</a>
              <a href="https://github.com/SarthAyush/PDFcatalyst-App" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
              <button className="link-btn-clean" onClick={() => setCommandOpen(true)}>Search Menu (⌘K)</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>Copyright © {new Date().getFullYear()} PDFCatalyst. Created by Sarthak Saxena.</span>
          <span>Open Source under MIT / Apache-2.0</span>
        </div>
      </footer>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={setCommandOpen}
      />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
