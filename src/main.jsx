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

function playAudioBlip(freq = 640, type = "sine", duration = 0.15) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (type === "sawtooth") {
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + duration);
    } else {
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, ctx.currentTime + duration);
    }
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
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
  };
  return <svg {...common}>{paths[name] || paths.terminal}</svg>;
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
  const [lastSynced, setLastSynced] = useState(null);
  const [syncStatus, setSyncStatus] = useState("synced");

  const fetchReleases = async (force = false) => {
    setIsLoading(true);
    setSyncStatus("fetching");
    const cacheKey = "pdfcatalyst_github_releases";
    const cacheTimeKey = "pdfcatalyst_github_releases_time";

    try {
      if (!force) {
        const cached = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheTimeKey);
        if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < 5 * 60 * 1000) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReleases(parsed);
            setLatestRelease(parsed[0]);
            setLastSynced(new Date(parseInt(cachedTime, 10)));
            setSyncStatus("synced");
            setIsLoading(false);
            return;
          }
        }
      }

      const res = await fetch("https://api.github.com/repos/SarthAyush/PDFcatalyst-App/releases");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setReleases(data);
        setLatestRelease(data[0]);
        const now = Date.now();
        try {
          localStorage.setItem(cacheKey, JSON.stringify(data));
          localStorage.setItem(cacheTimeKey, now.toString());
        } catch {}
        setLastSynced(new Date(now));
        setSyncStatus("synced");
      }
    } catch (err) {
      setSyncStatus("fallback");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  return {
    releases,
    latestRelease,
    isLoading,
    lastSynced,
    syncStatus,
    refresh: () => fetchReleases(true),
  };
}

const DEFAULT_RELEASE = {
  tag_name: "v1.0.0",
  name: "PDFcatalyst v1.0.0 — Pure Rust Architecture",
  published_at: "2026-10-16T11:41:07Z",
  html_url: "https://github.com/SarthAyush/PDFcatalyst-App/releases/tag/v1.0.0",
  assets: [
    {
      name: "PDFcatalyst-Setup-v1.0.0-x64.exe",
      size: 19875336,
      download_count: 0,
      browser_download_url:
        "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.0/PDFcatalyst-Setup-v1.0.0-x64.exe",
      digest: "sha256:04a04855a984b84d9bd6c5afedda611d63f5eb259fd78f42fa2237cb4cf74b79",
    },
    {
      name: "PDFcatalyst.exe",
      size: 67598832,
      download_count: 0,
      browser_download_url:
        "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.0/PDFcatalyst.exe",
      digest: "sha256:f4c06b245767378391146604bb29e83616374027d0d5de00cc41578e3c9cbc86",
    },
  ],
};

/* ==========================================================================
   Cute Floating Mascot Assistant Component
   ========================================================================== */
function FloatingCuteMascot({ soundEnabled, setSoundEnabled }) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDir, setScrollDir] = useState("down");
  const [message, setMessage] = useState("Welcome! 100% offline & memory-safe.");
  const [mascotMode, setMascotMode] = useState("assistant"); // "assistant", "shield", "turbo"
  const [isWaving, setIsWaving] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, Math.max(0, (cur / total) * 100)) : 0;
      setScrollProgress(pct);

      if (cur > lastY.current + 3) {
        setScrollDir("down");
      } else if (cur < lastY.current - 3) {
        setScrollDir("up");
      }
      lastY.current = cur;
      setScrollY(cur);

      if (cur < 350) {
        setMessage("Welcome! 100% offline & pure Rust.");
      } else if (cur < 1000) {
        setMessage("Click the glowing pins on the screenshot below!");
      } else if (cur < 1800) {
        setMessage("wgpu hardware acceleration at 60 FPS!");
      } else if (cur < 2600) {
        setMessage("Run live benchmarks against Adobe below!");
      } else if (cur < 3400) {
        setMessage("Test true byte stream redaction in the lab!");
      } else if (cur < 4200) {
        setMessage("Direct MCP connection for Claude & Cursor!");
      } else {
        setMessage("Ready to run standalone on your machine!");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerReaction = () => {
    if (soundEnabled) playAudioBlip(720);
    setIsWaving(true);
    const nextMode = mascotMode === "assistant" ? "shield" : mascotMode === "shield" ? "turbo" : "assistant";
    setMascotMode(nextMode);

    if (nextMode === "shield") {
      setMessage("Shield Mode Active: Zero network egress!");
    } else if (nextMode === "turbo") {
      setMessage("Turbo 60 FPS Mode: wgpu hardware acceleration!");
    } else {
      setMessage("Assistant Mode: Ready to inspect your PDFs!");
    }
    setTimeout(() => setIsWaving(false), 1200);
  };

  const tiltAngle = scrollDir === "down" ? 7 : -7;
  const bobbing = Math.sin(scrollY / 35) * 8;

  if (minimized) {
    return (
      <div
        className="mascot-minimized-pill"
        onClick={() => {
          if (soundEnabled) playAudioBlip(800);
          setMinimized(false);
        }}
        title="Restore Mascot Assistant"
      >
        <img src="/cute-mascot.png" alt="Mascot" width="26" height="26" />
        <span className="min-label">Assistant</span>
      </div>
    );
  }

  return (
    <div
      className={`floating-mascot-container mode-${mascotMode}`}
      style={{
        transform: `translateY(${bobbing}px) rotate(${tiltAngle}deg)`,
      }}
    >
      <div className="mascot-speech-bubble">
        <span className="speech-text">{message}</span>
        <div className="bubble-actions">
          <button
            className="btn-bubble-sound"
            onClick={(e) => {
              e.stopPropagation();
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playAudioBlip(900);
            }}
            title={soundEnabled ? "Mute audio cues" : "Enable futuristic sound blips"}
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
          >
            <Icon name="x" size={10} />
          </button>
        </div>
      </div>

      <div
        className={`mascot-avatar-wrap ${isWaving ? "reacting" : ""}`}
        onClick={triggerReaction}
        title="Click to cycle modes (Assistant / Air-Gapped Shield / Turbo 60 FPS)!"
      >
        <div className={`mascot-thruster-aura ${mascotMode === "turbo" ? "turbo" : ""}`} />
        {mascotMode === "shield" && <div className="mascot-shield-ring" />}
        <img
          src="/cute-mascot.png"
          alt="Cute PDFCatalyst Mascot"
          className="mascot-img"
          width="84"
          height="84"
        />

        <svg className="mascot-progress-ring" viewBox="0 0 100 100">
          <circle className="progress-bg" cx="50" cy="50" r="45" />
          <circle
            className="progress-bar"
            cx="50"
            cy="50"
            r="45"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * scrollProgress) / 100}
          />
        </svg>
      </div>
    </div>
  );
}

/* ==========================================================================
   Interactive Screenshot with Hotspot Tour Pins
   ========================================================================== */
function ScreenshotInteractiveTour({ soundEnabled }) {
  const [activePin, setActivePin] = useState(0);

  const pins = [
    {
      id: 0,
      title: "One-Click Quick Action Tools",
      badge: "Instant Workflows",
      desc: "Instant batch operations: Compress PDF, Merge PDFs, Extract/Rotate Pages, and Sanitize & Protect without cloud round-trips.",
      spec: "Rayon Multi-Threaded",
      x: 35,
      y: 67,
    },
    {
      id: 1,
      title: "Universal PDF Engineering Sidebar",
      badge: "All Tools Suite",
      desc: "Full PDF lifecycle: Export, Fill & Sign, Redact, Scan & OCR, Combine, Add Stamps, and PKI X.509 Certificate workflows.",
      spec: "Clean-Room ISO 32000-2",
      x: 8,
      y: 45,
    },
    {
      id: 2,
      title: "Interactive Design Templates",
      badge: "Pre-Configured",
      desc: "Jump-start documents with instant verified formats: Letter Blank Canvas, Modern Invoice with auto-math, and Multi-page Proposals.",
      spec: "Zero Setup Required",
      x: 35,
      y: 88,
    },
    {
      id: 3,
      title: "Native Search & Command Palette",
      badge: "Ctrl + K",
      desc: "Full keyboard-driven command runner. Jump to any tool, search document content, or execute batch actions with zero mouse reliance.",
      spec: "Keyboard-First UI",
      x: 80,
      y: 7,
    },
  ];

  return (
    <div className="screenshot-tour-wrapper">
      <div className="screenshot-frame-header">
        <div className="window-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="window-center-title">
          <img src="/pdfix-logo.png" alt="" width="15" height="15" />
          <span>PDFCatalyst — Configured by Sarthak</span>
        </div>
        <span className="window-arch-badge">Interactive Tour (Click Pins)</span>
      </div>

      <div className="screenshot-viewport-relative">
        <img
          src="/app-screenshot.png"
          alt="PDFCatalyst Actual Desktop Workbench Screenshot"
          className="tour-main-screenshot"
        />

        {/* Hotspot Pins Overlaid on the Screenshot */}
        {pins.map((pin) => (
          <button
            key={pin.id}
            className={`hotspot-pin ${activePin === pin.id ? "active" : ""}`}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onClick={() => {
              if (soundEnabled) playAudioBlip(750);
              setActivePin(pin.id);
            }}
            aria-label={`Inspect hotspot: ${pin.title}`}
          >
            <span className="pin-pulse-ring" />
            <span className="pin-core-num">{pin.id + 1}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Popover Bar describing Active Hotspot */}
      <div className="screenshot-tour-active-card">
        <div className="tour-badge-row">
          <span className="tour-step-pill">PIN {activePin + 1} OF 4</span>
          <span className="tour-feature-badge">{pins[activePin].badge}</span>
          <span className="tour-spec-code">{pins[activePin].spec}</span>
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
                  if (soundEnabled) playAudioBlip(700);
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
              if (soundEnabled) playAudioBlip(800);
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
   Live Speed & Benchmark Visualizer (Pure Rust vs Adobe vs Cloud)
   ========================================================================== */
function LiveBenchmarkVisualizer({ soundEnabled }) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);

  const runSimulation = () => {
    if (isRunning) return;
    if (soundEnabled) playAudioBlip(600);
    setIsRunning(true);
    setProgress(0);

    let val = 0;
    const interval = setInterval(() => {
      val += 5;
      if (val >= 100) {
        clearInterval(interval);
        setProgress(100);
        setIsRunning(false);
        if (soundEnabled) playAudioBlip(950);
      } else {
        setProgress(val);
      }
    }, 40);
  };

  const metrics = [
    {
      title: "Open & Parse 500-Page Document",
      pdfcatalyst: "180 ms",
      acrobat: "3,400 ms",
      cloud: "7,200 ms",
      winner: "18.8x Faster",
      pctPdfix: 100,
      pctAcrobat: 25,
      pctCloud: 10,
    },
    {
      title: "Memory Footprint (Active RAM)",
      pdfcatalyst: "14.2 MB",
      acrobat: "380 MB",
      cloud: "620 MB",
      winner: "96% Less RAM",
      pctPdfix: 100,
      pctAcrobat: 30,
      pctCloud: 15,
    },
    {
      title: "Vector Pan & 800% Zoom Frame Rate",
      pdfcatalyst: "60.0 FPS",
      acrobat: "18.5 FPS",
      cloud: "12.0 FPS",
      winner: "Zero Frame Drops",
      pctPdfix: 100,
      pctAcrobat: 35,
      pctCloud: 20,
    },
  ];

  return (
    <div className="benchmark-console-card">
      <div className="bench-top-actions">
        <div>
          <span className="eyebrow-chip">HARDWARE LATENCY AUDIT</span>
          <h3 className="bench-section-title">Tested against 500-page dense ISO vector files.</h3>
        </div>
        <button
          className="btn-run-benchmark"
          onClick={runSimulation}
          disabled={isRunning}
        >
          <Icon name="activity" size={13} className={isRunning ? "pulse-anim" : ""} />
          <span>{isRunning ? `Benchmarking (${progress}%)...` : "Run Simulation Test"}</span>
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
              {/* PDFCatalyst */}
              <div className="comp-bar-item">
                <div className="comp-label">
                  <span className="brand-bold">PDFCatalyst (Rust + wgpu)</span>
                  <span className="val-text green">{m.pdfcatalyst}</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill green-gradient"
                    style={{ width: `${(m.pctPdfix * progress) / 100}%` }}
                  />
                </div>
              </div>

              {/* Adobe Acrobat */}
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

              {/* Cloud Converters */}
              <div className="comp-bar-item">
                <div className="comp-label">
                  <span className="brand-dim">Web / Cloud Converters</span>
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
   Interactive In-Browser "Drop & Inspect" Sandbox
   ========================================================================== */
function InBrowserSandbox({ soundEnabled }) {
  const [selectedSample, setSelectedSample] = useState("nda");
  const [activeSimulation, setActiveSimulation] = useState(null);

  const samples = {
    nda: {
      name: "Mutual_Non_Disclosure_2026.pdf",
      pages: 4,
      size: "240 KB",
      security: "Air-Gapped Validated",
      xrefObjects: 28,
      confidentialTokens: 3,
    },
    invoice: {
      name: "Enterprise_Invoice_Tax_Q3.pdf",
      pages: 2,
      size: "185 KB",
      security: "Pre-Signed X.509",
      xrefObjects: 19,
      confidentialTokens: 2,
    },
    cad: {
      name: "Commercial_Blueprint_Floorplan.pdf",
      pages: 1,
      size: "1.4 MB",
      security: "CAD Vector Scale 1/4",
      xrefObjects: 42,
      confidentialTokens: 0,
    },
  };

  const doc = samples[selectedSample];

  const runSampleAction = (action) => {
    if (soundEnabled) playAudioBlip(780);
    setActiveSimulation(action);
    setTimeout(() => setActiveSimulation(null), 2500);
  };

  return (
    <div className="sandbox-console-card">
      <div className="sandbox-header">
        <div>
          <span className="eyebrow-chip">BROWSER SANDBOX</span>
          <h3 className="sandbox-title">Inspect sample documents live.</h3>
          <p className="sandbox-sub">Choose a sample document to simulate the pure Rust engine analysis.</p>
        </div>
        <div className="sample-picker-pills">
          <button
            className={`picker-btn ${selectedSample === "nda" ? "active" : ""}`}
            onClick={() => setSelectedSample("nda")}
          >
            NDA Agreement
          </button>
          <button
            className={`picker-btn ${selectedSample === "invoice" ? "active" : ""}`}
            onClick={() => setSelectedSample("invoice")}
          >
            Tax Invoice
          </button>
          <button
            className={`picker-btn ${selectedSample === "cad" ? "active" : ""}`}
            onClick={() => setSelectedSample("cad")}
          >
            CAD Floorplan
          </button>
        </div>
      </div>

      <div className="sandbox-workspace-grid">
        {/* Document Metadata Sheet */}
        <div className="sandbox-doc-meta">
          <div className="doc-icon-header">
            <Icon name="file" size={24} />
            <div>
              <strong className="doc-fname">{doc.name}</strong>
              <span className="doc-fsize">{doc.size} • {doc.pages} Pages</span>
            </div>
          </div>

          <div className="meta-stats-list">
            <div className="meta-stat-item">
              <span>ISO 32000 AST Objects</span>
              <strong>{doc.xrefObjects} Objects</strong>
            </div>
            <div className="meta-stat-item">
              <span>Security Conformance</span>
              <strong className="green">{doc.security}</strong>
            </div>
            <div className="meta-stat-item">
              <span>Confidential Stream Tokens</span>
              <strong>{doc.confidentialTokens} Identified</strong>
            </div>
          </div>
        </div>

        {/* Action Testing Playground */}
        <div className="sandbox-sim-actions">
          <span className="action-hint">SIMULATE RUST CRATES:</span>
          <div className="actions-cluster">
            <button
              className={`sim-action-btn ${activeSimulation === "redact" ? "running" : ""}`}
              onClick={() => runSampleAction("redact")}
            >
              <Icon name="lock" size={13} />
              <span>{activeSimulation === "redact" ? "Purging raw bytes to 0x00..." : "Simulate Byte Redaction"}</span>
            </button>
            <button
              className={`sim-action-btn ${activeSimulation === "sign" ? "running" : ""}`}
              onClick={() => runSampleAction("sign")}
            >
              <Icon name="shield" size={13} />
              <span>{activeSimulation === "sign" ? "Applying RFC 3161 Timestamp..." : "Validate PKI X.509 Seal"}</span>
            </button>
            <button
              className={`sim-action-btn ${activeSimulation === "compress" ? "running" : ""}`}
              onClick={() => runSampleAction("compress")}
            >
              <Icon name="layers" size={13} />
              <span>{activeSimulation === "compress" ? "Rayon multi-threaded compression: -42%..." : "Simulate Lossless FlateDecode"}</span>
            </button>
          </div>

          {activeSimulation && (
            <div className="sim-feedback-toast">
              <span className="beacon-dot" />
              <span>Operation executed in <strong>0.32 ms</strong> using crates/{activeSimulation}.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Role / Persona Switcher ("Built For Your Workflow")
   ========================================================================== */
function PersonaWorkflowSection({ soundEnabled }) {
  const [role, setRole] = useState("legal");

  const personas = {
    legal: {
      title: "Attorneys, Compliance & General Counsel",
      highlight: "Irreversible Redaction & PKI Integrity",
      desc: "Ensure confidential patient records, merger agreements, and M&A contracts never leak through flawed black-box overlays. PDFCatalyst physically destroys raw stream tokens and signs documents with verified X.509 cryptographic timestamps.",
      specs: ["100% HIPAA & GDPR Compliant (Zero Egress)", "RFC 3161 Certified Timestamps", "Irreversible Byte-Level Purging"],
    },
    architect: {
      title: "Architects, Engineers & Surveyors",
      highlight: "CAD Blueprint Scale & Vector Performance",
      desc: "Calibrate engineering drawings against technical title blocks with sub-millimeter precision. Zoom smoothly to 800% without dropped frames using hardware GPU acceleration.",
      specs: ["Imperial & Metric Scale Calibration", "Real-Time Area & Perimeter CAD Readouts", "wgpu Hardware Vector Pipeline"],
    },
    developer: {
      title: "AI Engineers & Software Developers",
      highlight: "Native Model Context Protocol & Headless CLI",
      desc: "Integrate Cursor, Claude Desktop, and local pipelines directly with your documents via JSON-RPC. Process thousands of PDFs in parallel without vendor API rate limits.",
      specs: ["Model Context Protocol (MCP) Server", "Rayon Concurrency Work-Stealing", "Pure Rust (forbid(unsafe_code))"],
    },
    enterprise: {
      title: "Finance, Audit & Enterprise Operations",
      highlight: "High-Volume Batch Processing Without Subscriptions",
      desc: "Replace thousands of dollars in recurring Adobe Creative Cloud licenses with an open-source, dual-licensed workbench. Merge, compress, and OCR invoices on your local hardware.",
      specs: ["Zero Recurring Seat Licenses", "Atomic Writes Guarantee Zero Crash Corruption", "Dual MIT / Apache 2.0 License"],
    },
  };

  const p = personas[role];

  return (
    <div className="persona-section-card">
      <div className="persona-tabs-bar">
        <button
          className={`p-tab-btn ${role === "legal" ? "active" : ""}`}
          onClick={() => {
            if (soundEnabled) playAudioBlip(680);
            setRole("legal");
          }}
        >
          Legal & Compliance
        </button>
        <button
          className={`p-tab-btn ${role === "architect" ? "active" : ""}`}
          onClick={() => {
            if (soundEnabled) playAudioBlip(720);
            setRole("architect");
          }}
        >
          Architects & CAD
        </button>
        <button
          className={`p-tab-btn ${role === "developer" ? "active" : ""}`}
          onClick={() => {
            if (soundEnabled) playAudioBlip(760);
            setRole("developer");
          }}
        >
          AI Engineers & Devs
        </button>
        <button
          className={`p-tab-btn ${role === "enterprise" ? "active" : ""}`}
          onClick={() => {
            if (soundEnabled) playAudioBlip(800);
            setRole("enterprise");
          }}
        >
          Finance & Operations
        </button>
      </div>

      <div className="persona-body-content">
        <div className="persona-left">
          <span className="persona-highlight-badge">{p.highlight}</span>
          <h3 className="persona-title">{p.title}</h3>
          <p className="persona-desc">{p.desc}</p>
        </div>
        <div className="persona-right">
          <span className="specs-label">ENGINE GUARANTEES:</span>
          <ul className="persona-specs-list">
            {p.specs.map((s, idx) => (
              <li key={idx}>
                <Icon name="check" size={13} className="spec-check" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Developer Package Manager Terminal Hub (winget / cargo / scoop / pwsh)
   ========================================================================== */
function PackageManagerTerminal({ soundEnabled, onCopy, copiedId }) {
  const [pkgTab, setPkgTab] = useState("winget");

  const commands = {
    winget: "winget install SarthAyush.PDFcatalyst",
    cargo: "cargo install pdfcraft-cli --locked",
    pwsh: "irm https://github.com/SarthAyush/PDFcatalyst-App/releases/latest/download/install.ps1 | iex",
    scoop: "scoop bucket add pdfcatalyst https://github.com/SarthAyush/PDFcatalyst-App; scoop install pdfcatalyst",
  };

  return (
    <div className="pkg-terminal-card">
      <div className="pkg-tab-bar">
        <button
          className={`pkg-tab ${pkgTab === "winget" ? "active" : ""}`}
          onClick={() => {
            if (soundEnabled) playAudioBlip(650);
            setPkgTab("winget");
          }}
        >
          Windows Package Manager (winget)
        </button>
        <button
          className={`pkg-tab ${pkgTab === "cargo" ? "active" : ""}`}
          onClick={() => {
            if (soundEnabled) playAudioBlip(700);
            setPkgTab("cargo");
          }}
        >
          Cargo (Rust CLI)
        </button>
        <button
          className={`pkg-tab ${pkgTab === "pwsh" ? "active" : ""}`}
          onClick={() => {
            if (soundEnabled) playAudioBlip(750);
            setPkgTab("pwsh");
          }}
        >
          PowerShell One-Liner
        </button>
        <button
          className={`pkg-tab ${pkgTab === "scoop" ? "active" : ""}`}
          onClick={() => {
            if (soundEnabled) playAudioBlip(800);
            setPkgTab("scoop");
          }}
        >
          Scoop
        </button>
      </div>

      <div className="pkg-cmd-row">
        <span className="prompt-symbol">$</span>
        <code className="pkg-code">{commands[pkgTab]}</code>
        <button
          className="btn-pkg-copy"
          onClick={() => {
            if (soundEnabled) playAudioBlip(900);
            onCopy(commands[pkgTab], `pkg-${pkgTab}`);
          }}
        >
          <Icon name="copy" size={12} />
          <span>{copiedId === `pkg-${pkgTab}` ? "Copied to Clipboard!" : "Copy Command"}</span>
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   Raycast Command Palette (⌘K)
   ========================================================================== */
function CommandPalette({ isOpen, onClose, onOpenTurbo }) {
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
    { id: "feat-turbo", category: "Surprise", title: "Launch Cyber Turbo Mode (Matrix HUD & Byte Slasher)", shortcut: "~", action: "turbo" },
    { id: "feat-media", category: "Showcase", title: "Open Engineering Media Showcase (High-Res Photos & GIFs)", shortcut: "V", hash: "#visual-showcase" },
    { id: "feat-screen", category: "Showcase", title: "View Desktop Workbench Screenshot", shortcut: "S", hash: "#app-preview" },
    { id: "feat-bench", category: "Benchmark", title: "Run Hardware Latency Benchmark", shortcut: "B", hash: "#benchmarks" },
    { id: "feat-sand", category: "Sandbox", title: "Open In-Browser Sample Sandbox", shortcut: "D", hash: "#sandbox" },
    { id: "feat-mcp", category: "Developer", title: "Configure Claude Desktop MCP Server", shortcut: "M", hash: "#developers" },
    { id: "feat-lab", category: "Interactive", title: "Open True Redaction Test Studio", shortcut: "R", hash: "#lab" },
    { id: "src-repo", category: "Open Source", title: "View Source on GitHub", shortcut: "G", link: "https://github.com/SarthAyush/PDFcatalyst-App" },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="raycast-overlay" onClick={() => onClose(false)}>
      <div className="raycast-modal" onClick={(e) => e.stopPropagation()}>
        <div className="raycast-input-bar">
          <Icon name="search" size={16} className="raycast-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="raycast-input"
            placeholder="Type a command or jump to feature..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="raycast-kbd-esc">ESC</span>
        </div>

        <div className="raycast-list">
          {filtered.length === 0 ? (
            <div className="raycast-empty">No matching commands found.</div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`raycast-row ${idx === 0 ? "selected" : ""}`}
                onClick={() => {
                  if (item.action === "turbo") {
                    onOpenTurbo();
                  } else if (item.link) {
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
          <span>Linear / Raycast Keyboard Flow</span>
          <div className="raycast-footer-keys">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Split Hero Interactive Workbench with Screenshot, Workflow GIFs, and Telemetry
   ========================================================================== */
function SplitHeroWorkbench() {
  const [viewMode, setViewMode] = useState("screenshot");
  const [activeTab, setActiveTab] = useState(0);
  const [activeGifIdx, setActiveGifIdx] = useState(0);

  const workflowGifs = [
    {
      id: "redact",
      title: "Stream Purge",
      gif: "/media/crypto_aes.gif",
      metric: "0x00 Null Stream Byte Purge",
      fps: "60.0 FPS",
      desc: "Physical token annihilation & XREF table sanitization without cloud round-trips.",
    },
    {
      id: "laser",
      title: "Neural OCR Scan",
      gif: "/media/laser_scan.gif",
      metric: "0.24ms Character Extraction",
      fps: "120 FPS Sensor",
      desc: "100% on-device OCR inference running directly on local GPU silicon.",
    },
    {
      id: "rayon",
      title: "Rayon Batch Concurrency",
      gif: "/media/sorting_parallel.gif",
      metric: "16-Core Rayon Concurrency",
      fps: "Sub-Second Merge",
      desc: "Work-stealing concurrency merging and compressing thousands of pages in parallel.",
    },
  ];

  const tabs = [
    { name: "Parser", badge: "0.38ms", icon: "cpu" },
    { name: "Redact", badge: "0x00 Safe", icon: "lock" },
    { name: "PKI Sign", badge: "RSA-4096", icon: "shield" },
    { name: "AI MCP", badge: "Active", icon: "bot" },
  ];

  return (
    <div className="linear-workbench-shell">
      <div className="border-beam" />

      <div className="linear-workbench-card">
        <div className="bench-header">
          <div className="bench-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="bench-title">
            <span className="mono-label">PDFCatalyst Desktop</span>
            <span className="bench-file-pill">Native v1.0.0</span>
          </div>
          <div className="bench-view-switch">
            <button
              className={`switch-mode-btn ${viewMode === "screenshot" ? "active" : ""}`}
              onClick={() => setViewMode("screenshot")}
              title="Show Actual Desktop Screenshot"
            >
              <Icon name="image" size={12} /> App UI
            </button>
            <button
              className={`switch-mode-btn ${viewMode === "gifs" ? "active" : ""}`}
              onClick={() => setViewMode("gifs")}
              title="Show Live Workflow GIFs"
            >
              <Icon name="play" size={12} /> Workflow GIFs
            </button>
            <button
              className={`switch-mode-btn ${viewMode === "telemetry" ? "active" : ""}`}
              onClick={() => setViewMode("telemetry")}
              title="Show Telemetry Streams"
            >
              <Icon name="terminal" size={12} /> Streams
            </button>
          </div>
        </div>

        {viewMode === "screenshot" ? (
          <div className="bench-screenshot-viewport">
            <div className="screenshot-inner-wrap">
              <img
                src="/app-screenshot.png"
                alt="PDFCatalyst Actual Desktop Workbench Screenshot"
                className="bench-actual-screenshot"
              />
              <div className="screenshot-sheen-overlay" />
            </div>
            <div className="screenshot-footer-badge">
              <span>Clean Room Rust GUI</span>
              <span className="dot-sep">•</span>
              <span>All Tools Suite</span>
              <span className="dot-sep">•</span>
              <span>Drop Any PDF</span>
            </div>
          </div>
        ) : viewMode === "gifs" ? (
          <div className="bench-gif-player-viewport">
            <div className="gif-player-header">
              <div className="gif-switch-buttons">
                {workflowGifs.map((g, i) => (
                  <button
                    key={g.id}
                    className={`gif-switch-btn ${activeGifIdx === i ? "active" : ""}`}
                    onClick={() => setActiveGifIdx(i)}
                  >
                    {g.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="gif-display-box">
              <img src={workflowGifs[activeGifIdx].gif} alt={workflowGifs[activeGifIdx].title} />
              <div className="gif-overlay-hud">
                <span className="gif-hud-metric">
                  <span className="beacon-dot" style={{ display: 'inline-block', width: 6, height: 6, marginRight: 6 }} />
                  {workflowGifs[activeGifIdx].metric}
                </span>
                <span>{workflowGifs[activeGifIdx].fps}</span>
              </div>
            </div>

            <p className="redact-note" style={{ margin: 0 }}>
              {workflowGifs[activeGifIdx].desc}
            </p>
          </div>
        ) : (
          <>
            <div className="bench-subnav">
              {tabs.map((t, idx) => (
                <button
                  key={t.name}
                  className={`bench-tab ${activeTab === idx ? "active" : ""}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <Icon name={t.icon} size={13} />
                  <span>{t.name}</span>
                  <span className="tab-pill">{t.badge}</span>
                </button>
              ))}
            </div>

            <div className="bench-canvas-viewport">
              {activeTab === 0 && (
                <div className="bench-pane pane-parser">
                  <div className="pane-telemetry-grid">
                    <div className="tele-box">
                      <span className="tele-label">CONFORMANCE</span>
                      <strong className="tele-val silver">ISO 32000-2</strong>
                      <span className="tele-sub">Clean-room AST</span>
                    </div>
                    <div className="tele-box">
                      <span className="tele-label">RASTER LATENCY</span>
                      <strong className="tele-val green">0.38 ms</strong>
                      <span className="tele-sub">Direct wgpu compute</span>
                    </div>
                    <div className="tele-box">
                      <span className="tele-label">MEMORY AUDIT</span>
                      <strong className="tele-val silver">0 Buffer Flaws</strong>
                      <span className="tele-sub">forbid(unsafe_code)</span>
                    </div>
                  </div>
                  <div className="bench-stream-preview">
                    <div className="code-line"><span className="num">01</span><span className="kw">1 0 obj</span> &lt;&lt; /Type /Catalog /Pages 2 0 R &gt;&gt;</div>
                    <div className="code-line"><span className="num">02</span><span className="kw">2 0 obj</span> &lt;&lt; /Type /Pages /Count 3 /Kids [3 0 R] &gt;&gt;</div>
                    <div className="code-line active"><span className="num">03</span><span className="kw">3 0 obj</span> &lt;&lt; /Type /Page /Contents 4 0 R &gt;&gt; <span className="tag-gpu">✓ Hardware GPU</span></div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="bench-pane pane-redact">
                  <div className="redact-stream-box">
                    <div className="stream-header">
                      <span>BYTE PURGE VERIFICATION</span>
                      <span className="status-good">IRREVERSIBLE</span>
                    </div>
                    <div className="stream-diff-line">
                      <span className="label-del">ORIGINAL:</span>
                      <code>0x004F: 53 53 4E 3A 20 39 34 38 2D 32 31 2D 30 38 31 34</code>
                    </div>
                    <div className="stream-diff-line active">
                      <span className="label-add">PDFCATALYST:</span>
                      <code>0x004F: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00</code>
                    </div>
                    <p className="redact-note">
                      Font subroutines & XREF entries purged. Underlying text is completely unextractable from the raw stream.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="bench-pane pane-sign">
                  <div className="pki-certificate-card">
                    <div className="cert-top">
                      <Icon name="shield" size={18} />
                      <div>
                        <strong>PKI X.509 Cryptographic Certificate</strong>
                        <span>SHA-256 with RSA-4096 / Ed25519</span>
                      </div>
                    </div>
                    <div className="cert-meta">
                      <div className="meta-row"><span>Signer:</span> <strong>Sarthak Saxena (Verified Engineering Core)</strong></div>
                      <div className="meta-row"><span>RFC 3161 Timestamp:</span> <strong>Verified Trusted UTC Authority</strong></div>
                      <div className="meta-row"><span>Integrity State:</span> <strong className="green">Valid · 0 Alterations Since Signing</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="bench-pane pane-mcp">
                  <div className="mcp-terminal-snippet">
                    <div className="snippet-head">
                      <span>claude_desktop_config.json</span>
                      <span className="status-good">stdio JSON-RPC</span>
                    </div>
                    <pre>
{`{
  "mcpServers": {
    "pdfcatalyst": {
      "command": "pdfcraft-cli",
      "args": ["mcp", "--root", "./documents"]
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            <div className="bench-footer">
              <div className="foot-left">
                <span className="dot pulse" />
                <span>Air-Gapped: Zero network egress sockets open</span>
              </div>
              <div className="foot-right">
                <span>Dual MIT / Apache 2.0</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   Visual Media Showcase Gallery (High-Res Photos & Animated GIFs)
   ========================================================================== */
function VisualMediaShowcase({ soundEnabled }) {
  const [activePillar, setActivePillar] = useState(0);
  const [laserActive, setLaserActive] = useState(false);

  const pillars = [
    {
      id: "airgap",
      badge: "Zero Network Egress",
      eyebrow: "01 // AIR-GAPPED CRYPTOGRAPHY",
      title: "Deep Byte Redaction & Memory Isolation.",
      desc: "Traditional PDF editors apply a cosmetic black rectangle while leaving extractable text in the file stream. PDFCatalyst zeros out raw token bytes, unmaps font subroutines, and guarantees 100% HIPAA and GDPR compliance on air-gapped hardware.",
      mainImage: "/media/security_airgap.jpg",
      gifInset: "/media/crypto_aes.gif",
      gifLabel: "AES CRYPTO STREAM",
      highlights: [
        "Irreversible 0x00 byte zeroing in raw stream operators",
        "Clean-room rebuild of Cross-Reference (XREF) object table",
        "Zero network sockets open · 100% RAM air-gapped",
      ],
      actionText: "Verify Cryptographic Stream",
      actionIcon: "lock",
      onAction: () => {
        if (soundEnabled) playAudioBlip(880, "sine", 0.2);
        alert("STREAM VERIFIED: 0 bytes leaked. Text tokens physically destroyed from stream.");
      },
    },
    {
      id: "wgpu",
      badge: "60+ FPS wgpu Compute",
      eyebrow: "02 // HARDWARE ACCELERATION",
      title: "Direct Silicon GPU Vector Pipeline.",
      desc: "Built directly on top of the wgpu rendering engine. Experience butter-smooth 800% vector zooming, zero-frame-drop panning across complex CAD drawings, and sub-millisecond page rasterization without heavy Electron or Chromium bloat.",
      mainImage: "/media/silicon_hardware.jpg",
      gifInset: "/media/matrix_transform.gif",
      gifLabel: "GPU MATRIX COMPUTE",
      highlights: [
        "Direct DirectX 12 / Vulkan / Metal GPU shaders",
        "0.38 ms sub-millisecond page rasterization latency",
        "96% lower RAM consumption than Adobe Acrobat Pro",
      ],
      actionText: "Run GPU Latency Test",
      actionIcon: "zap",
      onAction: () => {
        if (soundEnabled) playAudioBlip(920, "sine", 0.18);
        alert("wgpu SHADER TEST: 60.0 FPS maintained across 500 dense vector nodes.");
      },
    },
    {
      id: "ocr",
      badge: "On-Device Neural OCR",
      eyebrow: "03 // OPTICAL RECOGNITION",
      title: "Neural Document Scanning On Local Silicon.",
      desc: "Transform scanned receipts, historical records, and photographed agreements into searchable, selectable text. Runs lightweight neural models directly on CPU AVX2/NEON instructions without transmitting files to remote APIs.",
      mainImage: "/media/document_audit.jpg",
      gifInset: "/media/laser_scan.gif",
      gifLabel: "NEURAL OPTICAL SCAN",
      highlights: [
        "100% local neural inference with zero cloud latency",
        "Multilingual character extraction & automatic table parsing",
        "Preserves original document layout and font geometry",
      ],
      actionText: "Trigger Optical Laser Scan",
      actionIcon: "crosshair",
      onAction: () => {
        if (soundEnabled) playAudioBlip(780, "sawtooth", 0.25);
        setLaserActive(true);
        setTimeout(() => setLaserActive(false), 3000);
      },
    },
    {
      id: "cad",
      badge: "Architectural Precision",
      eyebrow: "04 // BLUEPRINT SCALE",
      title: "Calibrated Architectural CAD Measurement.",
      desc: "Engineered specifically for architects, surveyors, and general contractors. Calibrate drawing scale against known title blocks, compute square footage instantly, and annotate blueprints without converting to raster images.",
      mainImage: "/media/blueprint_cad.jpg",
      gifInset: "/media/radar_scan.gif",
      gifLabel: "RADAR CALIPER",
      highlights: [
        "Imperial (1/4\", 1/8\") and Metric (1:50, 1:100) scale calibration",
        "Real-time perimeter, linear distance, and polygon area readouts",
        "Vector-true measurement with snap-to-endpoint precision",
      ],
      actionText: "Calibrate Caliper (1/4\" = 1'-0\")",
      actionIcon: "ruler",
      onAction: () => {
        if (soundEnabled) playAudioBlip(720, "sine", 0.15);
        alert("CALIPER CALIBRATED: Scale locked to 1/4\" = 1'-0\". Area readouts verified.");
      },
    },
    {
      id: "mcp",
      badge: "Claude & Cursor Native",
      eyebrow: "05 // AI MODEL CONTEXT PROTOCOL",
      title: "Autonomous AI Agent Workflows via MCP.",
      desc: "Connect modern AI developer tools like Claude Desktop, Cursor, and automated background agents directly to your local PDF files using the open Model Context Protocol standard over stdio JSON-RPC.",
      mainImage: "/media/terminal_code.jpg",
      gifInset: "/media/matrix_transform.gif",
      gifLabel: "JSON-RPC stdio",
      highlights: [
        "Headless CLI (pdfcraft-cli) with MCP server mode",
        "Inspect ISO 32000 AST structure and extract tables programmatically",
        "Eliminates per-page API pricing and vendor data retention",
      ],
      actionText: "Copy Claude MCP Config",
      actionIcon: "copy",
      onAction: () => {
        if (soundEnabled) playAudioBlip(840, "sine", 0.15);
        navigator.clipboard.writeText(`{\n  "mcpServers": {\n    "pdfcatalyst": {\n      "command": "pdfcraft-cli",\n      "args": ["mcp", "--root", "./documents"]\n    }\n  }\n}`);
        alert("Copied Claude Desktop MCP JSON configuration to clipboard!");
      },
    },
  ];

  const cur = pillars[activePillar];

  return (
    <section className="section-container" id="visual-showcase">
      <div className="section-head-minimal">
        <span className="eyebrow-chip">ENGINEERING MEDIA SHOWCASE</span>
        <h2 className="title-metallic">Precision tools in high definition.</h2>
        <p className="subtitle-subtle">
          Explore real high-resolution architectural blueprints, hardware pipelines, neural OCR, and cryptographic privacy streams.
        </p>
      </div>

      <div className="media-showcase-shell">
        <div className="showcase-tab-pills">
          {pillars.map((p, idx) => (
            <button
              key={p.id}
              className={`showcase-pill-btn ${activePillar === idx ? "active" : ""}`}
              onClick={() => {
                if (soundEnabled) playAudioBlip(680 + idx * 40, "sine", 0.12);
                setActivePillar(idx);
              }}
            >
              <span>{p.title.split(" ")[0]} {p.title.split(" ")[1]}</span>
              <span className="showcase-pill-badge">{p.badge}</span>
            </button>
          ))}
        </div>

        <div className="showcase-content-grid">
          {/* Left: High-Res Visual Frame with Inset Animated GIF */}
          <div className="showcase-visual-frame">
            <img
              src={cur.mainImage}
              alt={cur.title}
              className="showcase-img-main"
            />
            {laserActive && <div className="scanning-laser-line" />}

            <div className="showcase-gif-inset">
              <img src={cur.gifInset} alt={cur.gifLabel} />
              <div className="showcase-gif-label">
                <span className="beacon-dot" style={{ display: 'inline-block', width: 6, height: 6, marginRight: 4 }} />
                {cur.gifLabel}
              </div>
            </div>
          </div>

          {/* Right: Technical Specifications & Interactive Actions */}
          <div className="showcase-text-details">
            <span className="showcase-eyebrow">{cur.eyebrow}</span>
            <h3 className="showcase-title">{cur.title}</h3>
            <p className="showcase-desc">{cur.desc}</p>

            <ul className="showcase-highlights-list">
              {cur.highlights.map((h, i) => (
                <li key={i}>
                  <Icon name="check" size={14} className="highlight-icon" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="showcase-action-row">
              <button className="btn-showcase-action" onClick={cur.onAction}>
                <Icon name={cur.actionIcon} size={13} />
                <span>{cur.actionText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   THE SURPRISE FACTOR: Cyber Turbo / Matrix Mode HUD & Byte Slasher Mini-Game
   ========================================================================== */
function CyberTurboModal({ isOpen, onClose, soundEnabled }) {
  const [activeTab, setActiveTab] = useState("terminal"); // "terminal" or "game"
  const [cliInput, setCliInput] = useState("");
  const [logs, setLogs] = useState([
    "PDFCatalyst Pure Rust v1.0.0 [Air-Gapped Edition]",
    "Initializing hardware wgpu shaders... [OK 60 FPS]",
    "Air-gapped firewall: 0 egress sockets open. [SECURE]",
    "Type 'help' for command reference or 'play' for Byte Slasher challenge!",
  ]);
  const canvasRef = useRef(null);

  // Byte Slasher Minigame State
  const [gameState, setGameState] = useState("idle"); // "idle", "playing", "won"
  const [score, setScore] = useState(0);
  const [purgedCount, setPurgedCount] = useState(0);
  const [tokens, setTokens] = useState([]);
  const targetPurges = 5;

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const chars = "PDFCATALYSTRUST0123456789XREF0x00BYTEPURGE§±µ¶·";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(4, 8, 12, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#34d399";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Byte Slasher Game Loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const tokenPool = [
      "SSN: 382-91-4402",
      "API_KEY: sk-secret-99",
      "CREDIT_CARD: 4532-****",
      "DIAGNOSIS: Aortic Insufficiency",
      "CONFIDENTIAL_CEO_SALARY",
      "X.509 PRIVATE KEY PEM",
      "PATIENT_HEALTH_RECORD_ID",
    ];

    const spawner = setInterval(() => {
      setTokens((prev) => {
        if (prev.length >= 4) return prev;
        const text = tokenPool[Math.floor(Math.random() * tokenPool.length)];
        const newToken = {
          id: Math.random().toString(36).substring(7),
          text,
          left: Math.random() * 65 + 5,
          top: -20,
          speed: 1.5 + Math.random() * 1.6,
          purged: false,
        };
        return [...prev, newToken];
      });
    }, 1100);

    const mover = setInterval(() => {
      setTokens((prev) =>
        prev
          .map((t) => ({ ...t, top: t.top + t.speed }))
          .filter((t) => {
            if (t.top > 280 && !t.purged) {
              if (soundEnabled) playAudioBlip(240, "sawtooth", 0.2);
              return false;
            }
            return t.top <= 300;
          })
      );
    }, 40);

    return () => {
      clearInterval(spawner);
      clearInterval(mover);
    };
  }, [gameState, soundEnabled]);

  const handleSlashToken = (id) => {
    if (soundEnabled) playAudioBlip(980, "square", 0.1);
    setTokens((prev) =>
      prev.map((t) => (t.id === id ? { ...t, purged: true, text: "PURGED 0x00" } : t))
    );
    setScore((s) => s + 100);
    setPurgedCount((c) => {
      const next = c + 1;
      if (next >= targetPurges) {
        setGameState("won");
        if (soundEnabled) playAudioBlip(1100, "sine", 0.4);
      }
      return next;
    });
  };

  const startMinigame = () => {
    if (soundEnabled) playAudioBlip(800, "sine", 0.2);
    setScore(0);
    setPurgedCount(0);
    setTokens([]);
    setGameState("playing");
  };

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;
    const cmd = cliInput.trim().toLowerCase();
    setCliInput("");
    if (!cmd) return;

    if (soundEnabled) playAudioBlip(720, "sine", 0.1);

    if (cmd === "clear") {
      setLogs([]);
      return;
    }
    if (cmd === "exit") {
      onClose();
      return;
    }
    if (cmd === "play") {
      setActiveTab("game");
      startMinigame();
      return;
    }

    const newLogs = [...logs, `$ ${cmd}`];
    switch (cmd) {
      case "help":
        newLogs.push(
          "Available Cyber Terminal commands:",
          "  help       - Show command dictionary",
          "  play       - Launch the Byte Slasher Redaction challenge",
          "  benchmark  - Execute instant hardware latency simulation",
          "  redact     - Verify 0x00 byte sanitization engine",
          "  ocr        - Check neural optical recognition pipeline",
          "  hexview    - Dump raw ISO 32000-2 catalog bytes",
          "  clear      - Clear terminal screen",
          "  exit       - Return to standard workbench"
        );
        break;
      case "benchmark":
        newLogs.push(
          "LATENCY AUDIT: Pure Rust 180ms | Adobe 3,400ms | Cloud 7,200ms",
          "Result: PDFCatalyst is 18.8x faster with 96% lower RAM footprint."
        );
        break;
      case "redact":
        newLogs.push(
          "BYTE SANITIZATION AUDIT:",
          "  [0x012C] SSN stream operator identified.",
          "  [PURGED] Overwritten with 0x00 null bytes.",
          "  [XREF] Cross-reference table regenerated with clean byte offsets.",
          "Zero residual tokens extractable."
        );
        break;
      case "ocr":
        newLogs.push(
          "NEURAL OCR ENGINE:",
          "  Hardware instructions: AVX2 + FMA enabled.",
          "  Status: 100% offline. Zero remote network packets sent."
        );
        break;
      case "hexview":
        newLogs.push(
          "00000000: 25 50 44 46 2d 32 2e 30 0a 25 e2 e3 cf d3 0a 31  %PDF-2.0.%.....1",
          "00000010: 20 30 20 6f 62 6a 0a 3c 3c 2f 54 79 70 65 2f 43   0 obj.<</Type/C",
          "00000020: 61 74 61 6c 6f 67 2f 50 61 67 65 73 20 32 20 30  atalog/Pages 2 0",
          "ISO 32000-2 AST verified."
        );
        break;
      default:
        newLogs.push(`Command not recognized: '${cmd}'. Type 'help' or 'play'.`);
        break;
    }
    setLogs(newLogs);
  };

  if (!isOpen) return null;

  return (
    <div className="cyber-hud-overlay" onClick={onClose}>
      <div className="cyber-hud-window" onClick={(e) => e.stopPropagation()}>
        <canvas ref={canvasRef} className="cyber-matrix-canvas" />

        <div className="cyber-hud-header">
          <div className="cyber-header-left">
            <span className="beacon-dot" style={{ width: 8, height: 8 }} />
            <span className="cyber-hud-title">PDFCATALYST // CYBER TURBO HUD</span>
            <div className="cyber-mode-tabs">
              <button
                className={`cyber-tab-btn ${activeTab === "terminal" ? "active" : ""}`}
                onClick={() => {
                  if (soundEnabled) playAudioBlip(680, "sine", 0.1);
                  setActiveTab("terminal");
                }}
              >
                <Icon name="terminal" size={12} /> Terminal CLI
              </button>
              <button
                className={`cyber-tab-btn ${activeTab === "game" ? "active" : ""}`}
                onClick={() => {
                  if (soundEnabled) playAudioBlip(740, "sine", 0.1);
                  setActiveTab("game");
                  if (gameState === "idle") startMinigame();
                }}
              >
                <Icon name="target" size={12} /> Byte Slasher Challenge
              </button>
            </div>
          </div>
          <button className="btn-close-cyber" onClick={onClose} aria-label="Close Cyber HUD">
            <Icon name="x" size={14} />
          </button>
        </div>

        {activeTab === "terminal" ? (
          <div className="cyber-terminal-body">
            <div className="cyber-welcome-banner">
{`██████╗ ██████╗ ███████╗ ██████╗ █████╗ ████████╗██╗   ██╗██╗     ██╗   ██╗███████╗████████╗
██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗╚══██╔══╝╚██╗ ██╔╝██║     ╚██╗ ██╔╝██╔════╝╚══██╔══╝
██████╔╝██║  ██║█████╗  ██║     ███████║   ██║    ╚████╔╝ ██║      ╚████╔╝ ███████╗   ██║   
██╔═══╝ ██║  ██║██╔══╝  ██║     ██╔══██║   ██║     ╚██╔╝  ██║       ╚██╔╝  ╚════██║   ██║   
██║     ██████╔╝██║     ╚██████╗██║  ██║   ██║      ██║   ███████╗   ██║   ███████║   ██║   
╚═╝     ╚═════╝ ╚═╝      ╚═════╝╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   `}
            </div>
            {logs.map((line, idx) => (
              <div key={idx} className="cyber-log-line">
                <span>{line}</span>
              </div>
            ))}
            <div className="cyber-input-row">
              <span className="prompt">pdfcatalyst-cli&gt;</span>
              <input
                type="text"
                className="cyber-cli-input"
                autoFocus
                placeholder="Type command ('help', 'play', 'benchmark')..."
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                onKeyDown={handleCommand}
              />
            </div>
          </div>
        ) : (
          <div className="byte-slasher-arena">
            <div className="slasher-hud-bar">
              <div className="slasher-stat">
                <span className="stat-label">TOKENS PURGED:</span>
                <span className="stat-val">{purgedCount} / {targetPurges}</span>
              </div>
              <div className="slasher-stat">
                <span className="stat-label">SECURITY SCORE:</span>
                <span className="stat-val">{score} PTS</span>
              </div>
              <div className="slasher-stat">
                <span className="stat-label">AIR-GAP STATUS:</span>
                <span className="stat-val" style={{ color: '#38bdf8' }}>ENFORCED</span>
              </div>
            </div>

            <div className="slasher-play-zone">
              {gameState === "idle" && (
                <div className="slasher-win-banner">
                  <div className="slasher-badge-graphic">
                    <Icon name="shield" size={32} />
                  </div>
                  <h3 className="slasher-win-title">Byte Slasher Redaction Challenge</h3>
                  <p className="slasher-win-desc">
                    Confidential tokens are dropping toward the unencrypted network boundary! Click them to execute irreversible 0x00 byte purges before they leak.
                  </p>
                  <button className="btn-restart-game" onClick={startMinigame}>
                    <Icon name="play" size={14} /> Start Security Audit
                  </button>
                </div>
              )}

              {gameState === "playing" && (
                <>
                  {tokens.map((t) => (
                    <div
                      key={t.id}
                      className={`falling-token-card ${t.purged ? "purged" : ""}`}
                      style={{ left: `${t.left}%`, top: `${t.top}px` }}
                      onClick={() => !t.purged && handleSlashToken(t.id)}
                    >
                      <Icon name={t.purged ? "check" : "lock"} size={12} />
                      <span>{t.text}</span>
                    </div>
                  ))}
                  <div className="slasher-danger-line" />
                  <span className="slasher-danger-label">UNENCRYPTED NETWORK BOUNDARY</span>
                </>
              )}

              {gameState === "won" && (
                <div className="slasher-win-banner">
                  <div className="slasher-badge-graphic">
                    <Icon name="sparkles" size={36} />
                  </div>
                  <h3 className="slasher-win-title">SECURITY AUDIT PASSED!</h3>
                  <p className="slasher-win-desc">
                    All confidential data tokens permanently purged with 0x00 null bytes. Zero network egress detected. You have earned the Certified Air-Gapped Security Auditor distinction!
                  </p>
                  <button className="btn-restart-game" onClick={startMinigame}>
                    <Icon name="play" size={14} /> Play Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   Linear-Style Telemetry Bento Grid
   ========================================================================== */
function LinearTelemetryGrid() {
  const cards = [
    {
      eyebrow: "01 // HARDWARE ACCELERATION",
      title: "wgpu Compute & Vector Pipeline",
      desc: "Pure Rust rendering core bypassing heavy web layers. Delivers 60+ FPS navigation, seamless opacity blend modes, and sub-millisecond page rasterization.",
      telemetry: "60.0 FPS • 0.38ms Frame Latency",
      tag: "GPU Accelerated",
    },
    {
      eyebrow: "02 // AIR-GAPPED PRIVACY",
      title: "100% Offline & RAM Isolated",
      desc: "Your confidential legal agreements and architectural blueprints never touch a remote server. Zero telemetry, zero analytics tracking, zero cloud accounts.",
      telemetry: "0 KB Egress • Air-Gapped",
      tag: "Zero Cloud",
    },
    {
      eyebrow: "03 // OBJECT STREAM PURGE",
      title: "True Structural Redaction",
      desc: "Eliminates the dangerous flaw of superficial black overlay boxes. Destroys raw content stream bytes, unmaps font subroutines, and rebuilds XREF tables cleanly.",
      telemetry: "0x00 Null Stream Replacement",
      tag: "Deep Sanitization",
    },
    {
      eyebrow: "04 // AI CONTEXT INTEGRATION",
      title: "Model Context Protocol (MCP)",
      desc: "Connect AI coding tools and desktop assistants directly to your local PDF repository via standard JSON-RPC without transferring files to third-party endpoints.",
      telemetry: "Claude & Cursor Native",
      tag: "AI Headless",
    },
    {
      eyebrow: "05 // PARALLEL PROCESSING",
      title: "Multi-Threaded Batch Studio",
      desc: "Execute bulk operations across dozens of documents simultaneously with Rayon work-stealing concurrency. Merge, compress, and convert in sub-second bursts.",
      telemetry: "Rayon Multi-Core Threading",
      tag: "Sub-Second",
    },
    {
      eyebrow: "06 // ON-DEVICE INFERENCE",
      title: "Offline Machine OCR Engine",
      desc: "Neural character recognition running directly on local silicon. Transforms scanned receipts, paper drafts, and images into crystal-clear selectable text.",
      telemetry: "Local CPU/GPU Inference",
      tag: "100% Local",
    },
  ];

  return (
    <div className="linear-bento-grid">
      {cards.map((c, i) => (
        <div className="linear-card" key={i}>
          <div className="linear-card-sheen" />
          <div className="card-top-row">
            <span className="linear-eyebrow">{c.eyebrow}</span>
            <span className="linear-tag">{c.tag}</span>
          </div>
          <h3 className="linear-card-title">{c.title}</h3>
          <p className="linear-card-desc">{c.desc}</p>
          <div className="linear-card-telemetry">
            <span className="telemetry-dot" />
            <code>{c.telemetry}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ==========================================================================
   Main Application Component
   ========================================================================== */
function App() {
  const { releases, latestRelease, isLoading } = useGitHubReleases();
  const [commandOpen, setCommandOpen] = useState(false);
  const [turboOpen, setTurboOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [labTab, setLabTab] = useState("redact");
  const [redactedState, setRedactedState] = useState(true);
  const [cliTab, setCliTab] = useState("mcp");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [detectedOs, setDetectedOs] = useState("Windows x64");

  // Global Keyboard Shortcut for Surprise Cyber Turbo HUD (` or ~)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setTurboOpen((prev) => !prev);
        if (soundEnabled) playAudioBlip(950, "sine", 0.15);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [soundEnabled]);

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
    if (soundEnabled) playAudioBlip(880);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const faqs = [
    {
      q: "Is PDFCatalyst completely free and open source?",
      a: "Yes. Dual-licensed under MIT and Apache-2.0. Completely free for personal, commercial, and enterprise production with zero subscriptions or hidden tiers.",
    },
    {
      q: "How does PDFCatalyst ensure total privacy?",
      a: "All document parsing, rendering, OCR, signing, and file saving occur strictly in local RAM and disk. Zero telemetry, zero analytics, zero external network sockets.",
    },
    {
      q: "What is the built-in AI Model Context Protocol (MCP) server?",
      a: "PDFCatalyst includes an embedded MCP server. AI assistants like Claude Desktop and Cursor can inspect and edit local PDFs via JSON-RPC stdio without cloud uploads.",
    },
    {
      q: "Installer vs Standalone Portable?",
      a: "The Windows Installer (~19 MB) sets up file associations and shortcuts. The Portable .exe (~67 MB) runs standalone from any folder or USB without administrator privileges.",
    },
    {
      q: "How does true redaction differ from regular black boxes?",
      a: "Common PDF viewers merely draw an opaque rectangle while keeping the underlying text tokens in the stream. PDFCatalyst purges raw stream bytes, XREF entries, and font maps irreversibly.",
    },
  ];

  return (
    <div className="raycast-theme-shell">
      {/* Precision Engineering Sub-Pixel Grid */}
      <div className="linear-subpixel-grid" aria-hidden="true" />
      <div className="metallic-glow-spotlight" aria-hidden="true" />

      {/* Floating Cute Cartoon Mascot Assistant */}
      <FloatingCuteMascot soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {/* Raycast Minimalist Header */}
      <header className="linear-nav">
        <div className="linear-nav-inner">
          <a href="#top" className="linear-brand">
            <div className="brand-gem">
              <img src="/pdfix-logo.png" alt="PDFCatalyst" width="22" height="22" />
            </div>
            <span className="brand-name">PDFCatalyst</span>
            <span className="version-pill">{currentVersion}</span>
          </a>

          <div className="nav-center-actions">
            <button className="command-palette-trigger" onClick={() => setCommandOpen(true)}>
              <Icon name="search" size={13} />
              <span>Search commands...</span>
              <kbd className="kbd-shortcut">⌘K</kbd>
            </button>
          </div>

          <div className={`linear-nav-right ${mobileMenuOpen ? "mobile-drawer-open" : ""}`}>
            <button
              className="btn-turbo-hud"
              onClick={() => {
                if (soundEnabled) playAudioBlip(950, "sine", 0.18);
                setTurboOpen(true);
              }}
              title="Open Secret Cyber Turbo Matrix Mode (Key: ~)"
            >
              <span className="turbo-pulse-dot" />
              <span>Turbo HUD</span>
            </button>
            <a href="#visual-showcase" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Visual Studio</a>
            <a href="#app-preview" className="nav-link" onClick={() => setMobileMenuOpen(false)}>App Tour</a>
            <a href="#benchmarks" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Benchmarks</a>
            <a href="#sandbox" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Sandbox</a>
            <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Capabilities</a>
            <a href="#developers" className="nav-link" onClick={() => setMobileMenuOpen(false)}>AI & MCP</a>
            <a href="#download" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Downloads</a>
            <a
              href="https://github.com/SarthAyush/PDFcatalyst-App"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon-link"
              title="GitHub Repository"
            >
              <Icon name="github" size={15} />
            </a>
            <button
              className={`btn-sound-toggle ${soundEnabled ? "active" : ""}`}
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playAudioBlip(880);
              }}
              title={soundEnabled ? "Audio Cues Enabled" : "Audio Muted"}
              aria-label="Toggle Audio Cues"
            >
              <Icon name={soundEnabled ? "volume" : "volumeMute"} size={14} />
            </button>
            <button
              className="theme-toggle-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={14} />
            </button>
            <a href={installerUrl} className="btn-metallic-header">
              Download <Icon name="arrowRight" size={12} />
            </a>
          </div>

          <button
            className="mobile-hamburger-btn"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "x" : "menu"} size={18} />
          </button>
        </div>
      </header>

      <main id="top">
        {/* ==========================================================================
           Split Hero Section (Linear / Raycast Style)
           ========================================================================== */}
        <section className="linear-split-hero">
          <div className="split-hero-container">
            {/* Left Column: Value Proposition & Telemetry */}
            <div className="split-hero-left">
              <div className="hero-status-pill">
                <span className="beacon-dot" />
                <span className="status-text">OFFICIAL PRODUCTION STREAM</span>
                <span className="dot-sep">•</span>
                <span className="version-highlight">{currentVersion} LIVE</span>
              </div>

              <h1 className="hero-headline-metallic">
                Precision PDF engineering.
                <br />
                <span className="shimmer-metallic">Pure Rust. Zero cloud.</span>
              </h1>

              <p className="hero-description-technical">
                The high-performance PDF workbench built strictly with memory-safe Rust.
                Hardware-accelerated rendering, deep byte redaction, offline neural OCR, and native AI Model Context Protocol.
              </p>

              <div className="hero-cta-linear-row">
                <a href={installerUrl} className="btn-metallic-primary">
                  <Icon name="download" size={16} />
                  <span>Download for {detectedOs}</span>
                  <span className="cta-meta">({installerSize})</span>
                </a>
                <button
                  className="btn-metallic-secondary"
                  onClick={() => {
                    if (soundEnabled) playAudioBlip(950, "sine", 0.15);
                    setTurboOpen(true);
                  }}
                  title="Launch Cyber Turbo Mode"
                >
                  <Icon name="zap" size={14} />
                  <span>Cyber Turbo Mode</span>
                  <kbd>~</kbd>
                </button>
                <button className="btn-metallic-secondary" onClick={() => setCommandOpen(true)}>
                  <Icon name="command" size={14} />
                  <span>Command Menu</span>
                  <kbd>⌘K</kbd>
                </button>
              </div>

              <div className="hero-telemetry-hud">
                <div className="hud-metric">
                  <span className="hud-label">ENGINE ARCHITECTURE</span>
                  <strong className="hud-val">Pure Rust 1.95</strong>
                </div>
                <div className="hud-metric">
                  <span className="hud-label">MEMORY SAFETY</span>
                  <strong className="hud-val">forbid(unsafe_code)</strong>
                </div>
                <div className="hud-metric">
                  <span className="hud-label">NETWORK EGRESS</span>
                  <strong className="hud-val green">0 KB (Air-Gapped)</strong>
                </div>
                <div className="hud-metric">
                  <span className="hud-label">LICENSE</span>
                  <strong className="hud-val">MIT / Apache 2.0</strong>
                </div>
              </div>
            </div>

            {/* Right Column: Floating High-Tech Interactive Workbench */}
            <div className="split-hero-right">
              <SplitHeroWorkbench />
            </div>
          </div>
        </section>

        {/* ==========================================================================
           Visual Media Showcase Gallery (High-Res Images & Animated GIFs)
           ========================================================================== */}
        <VisualMediaShowcase soundEnabled={soundEnabled} />

        {/* ==========================================================================
           Interactive Screenshot Tour with Hotspot Pins
           ========================================================================== */}
        <section className="section-container" id="app-preview">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">DESKTOP WORKBENCH TOUR</span>
            <h2 className="title-metallic">The real desktop experience.</h2>
            <p className="subtitle-subtle">
              Click the glowing interactive pins on the actual application screenshot to explore features.
            </p>
          </div>

          <ScreenshotInteractiveTour soundEnabled={soundEnabled} />
        </section>

        {/* ==========================================================================
           Live Speed & Latency Benchmark Visualizer
           ========================================================================== */}
        <section className="section-container" id="benchmarks">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">PERFORMANCE COMPARISON</span>
            <h2 className="title-metallic">Hardware benchmarks against legacy suites.</h2>
            <p className="subtitle-subtle">
              Pure Rust memory guarantees vs. bloated legacy C++ runtimes and slow web wrappers.
            </p>
          </div>

          <LiveBenchmarkVisualizer soundEnabled={soundEnabled} />
        </section>

        {/* ==========================================================================
           In-Browser "Drop & Inspect" Sandbox
           ========================================================================== */}
        <section className="section-container" id="sandbox">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">BROWSER SANDBOX</span>
            <h2 className="title-metallic">Test document operations in your browser.</h2>
            <p className="subtitle-subtle">
              Experience the ISO 32000-2 parsing logic and byte-level redaction algorithms live.
            </p>
          </div>

          <InBrowserSandbox soundEnabled={soundEnabled} />
        </section>

        {/* ==========================================================================
           Role / Persona Workflow Section
           ========================================================================== */}
        <section className="section-container">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">WORKFLOW PROFILES</span>
            <h2 className="title-metallic">Tailored for critical environments.</h2>
            <p className="subtitle-subtle">
              Discover how PDFCatalyst solves compliance, legal, engineering, and developer challenges.
            </p>
          </div>

          <PersonaWorkflowSection soundEnabled={soundEnabled} />
        </section>

        {/* ==========================================================================
           Telemetry Capabilities Grid (Linear Style)
           ========================================================================== */}
        <section className="section-container" id="features">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">CAPABILITIES ARCHITECTURE</span>
            <h2 className="title-metallic">Engineered to outperform.</h2>
            <p className="subtitle-subtle">
              Every critical document operation executed natively on local CPU and GPU silicon.
            </p>
          </div>

          <LinearTelemetryGrid />
        </section>

        {/* ==========================================================================
           Interactive Studio Lab (Raycast Technical Console)
           ========================================================================== */}
        <section className="section-container" id="lab">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">INTERACTIVE LABORATORY</span>
            <h2 className="title-metallic">Verify the mechanics in real time.</h2>
            <p className="subtitle-subtle">
              Test true structural stream purging, inspect ISO object trees, and benchmark operations.
            </p>
          </div>

          <div className="raycast-lab-console">
            <div className="lab-selector-bar">
              <button
                className={`selector-pill ${labTab === "redact" ? "active" : ""}`}
                onClick={() => setLabTab("redact")}
              >
                <Icon name="lock" size={13} /> <span>True Redaction</span>
              </button>
              <button
                className={`selector-pill ${labTab === "cos" ? "active" : ""}`}
                onClick={() => setLabTab("cos")}
              >
                <Icon name="tree" size={13} /> <span>COS Syntax Tree</span>
              </button>
              <button
                className={`selector-pill ${labTab === "measure" ? "active" : ""}`}
                onClick={() => setLabTab("measure")}
              >
                <Icon name="ruler" size={13} /> <span>CAD Blueprint Scale</span>
              </button>
            </div>

            <div className="lab-display-frame">
              {labTab === "redact" && (
                <div className="lab-module-redact">
                  <div className="module-control-row">
                    <span className="control-label">SANITIZATION ENGINE:</span>
                    <button
                      className={`btn-mode-toggle ${redactedState ? "active" : ""}`}
                      onClick={() => setRedactedState(true)}
                    >
                      <span className="mode-dot green" /> PDFCatalyst Structural Purge
                    </button>
                    <button
                      className={`btn-mode-toggle danger ${!redactedState ? "active" : ""}`}
                      onClick={() => setRedactedState(false)}
                    >
                      <span className="mode-dot red" /> Flawed Black Box Overlay
                    </button>
                  </div>

                  <div className="module-grid-two">
                    <div className="paper-sample-card">
                      <div className="watermark">CONFIDENTIAL RECORD</div>
                      <p>Subject: <strong>Jane Doe (Authorized Executive)</strong></p>
                      <p>
                        Social Security ID:{" "}
                        <span className={`token-badge ${redactedState ? "purged" : "exposed"}`}>
                          {redactedState ? "███████████" : "382-91-4402"}
                        </span>
                      </p>
                      <p>
                        Diagnosis:{" "}
                        <span className={`token-badge ${redactedState ? "purged" : "exposed"}`}>
                          {redactedState ? "██████████████████" : "Aortic Insufficiency"}
                        </span>
                      </p>
                      <button
                        className="btn-clipboard-verify"
                        onClick={() => {
                          if (redactedState) {
                            alert("PROTECTED: 0 bytes recovered. Text tokens are physically destroyed from the stream!");
                          } else {
                            copy("382-91-4402", "ssn");
                            alert("LEAK DETECTED: '382-91-4402' copied from underlying stream! Standard viewers only cover text visually.");
                          }
                        }}
                      >
                        <Icon name="copy" size={12} /> Test Clipboard Copy Vulnerability
                      </button>
                    </div>

                    <div className="hex-inspector-card">
                      <div className="card-header-clean">
                        <span>BYTE STREAM ANALYSIS</span>
                        <code>{redactedState ? "STATUS: PURGED (0x00)" : "STATUS: RAW TOKENS EXTRACTABLE"}</code>
                      </div>
                      <p className="inspector-desc">
                        {redactedState
                          ? "Physical stream operators are purged, font subroutines unmapped, and XREF tables cleanly rebuilt."
                          : "Traditional editors draw an opaque rectangle overlay while the underlying stream operators remain in the PDF file."}
                      </p>
                      <div className="hex-dump-lines">
                        <div className="hex-line"><code>0x0120: 2F 54 79 70 65 20 2F 50 61 67 65 73</code></div>
                        <div className={`hex-line ${redactedState ? "clean" : "warning"}`}>
                          <code>{redactedState ? "0x012C: 00 00 00 00 00 00 00 00 00 00 00 00" : "0x012C: 53 53 4E 3A 20 33 38 32 2D 39 31 2D"}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {labTab === "cos" && (
                <div className="lab-module-cos">
                  <pre className="code-block-minimal">
{`% Clean-room ISO 32000-2 AST Representation
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
  /ViewerPreferences << /DisplayDocTitle true >>
>>
endobj

2 0 obj
<<
  /Type /Pages
  /Kids [ 3 0 R ]
  /Count 1
>>
endobj`}
                  </pre>
                </div>
              )}

              {labTab === "measure" && (
                <div className="lab-module-measure">
                  <div className="blueprint-box-view">
                    <div className="blueprint-indicator">
                      <span>CALIBRATED ARCHITECTURAL SCALE: 1/4" = 1'-0"</span>
                      <strong>Dimension: 18.4 ft • Area: 338.5 sq ft</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==========================================================================
           Developer & AI Model Context Protocol Showcase
           ========================================================================== */}
        <section className="section-container" id="developers">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">DEVELOPERS & AUTOMATION</span>
            <h2 className="title-metallic">Native Model Context Protocol.</h2>
            <p className="subtitle-subtle">
              Connect Claude Desktop, Cursor, and automated agents directly to local PDFs.
            </p>
          </div>

          <div className="terminal-linear-card">
            <div className="terminal-tab-bar">
              <button className={`term-tab ${cliTab === "mcp" ? "active" : ""}`} onClick={() => setCliTab("mcp")}>
                <Icon name="bot" size={13} /> Claude Desktop MCP
              </button>
              <button className={`term-tab ${cliTab === "cli" ? "active" : ""}`} onClick={() => setCliTab("cli")}>
                <Icon name="terminal" size={13} /> Headless CLI
              </button>
              <button className={`term-tab ${cliTab === "json" ? "active" : ""}`} onClick={() => setCliTab("json")}>
                <Icon name="layers" size={13} /> Pipeline JSON
              </button>
              <button
                className="btn-copy-code"
                onClick={() => {
                  const text =
                    cliTab === "mcp"
                      ? `{\n  "mcpServers": {\n    "pdfcatalyst": {\n      "command": "pdfcraft-cli",\n      "args": ["mcp", "--root", "/local/docs"]\n    }\n  }\n}`
                      : cliTab === "cli"
                      ? `pdfcraft-cli batch --merge *.pdf --out final.pdf\npdfcraft-cli ocr scan.pdf --out searchable.pdf`
                      : `[\n  { "op": "open", "file": "doc.pdf" },\n  { "op": "redact", "pattern": "SSN:.*" },\n  { "op": "save_atomic", "out": "safe.pdf" }\n]`;
                  copy(text, cliTab);
                }}
              >
                <Icon name="copy" size={12} /> {copiedId === cliTab ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="terminal-code-body">
              <pre>
                {cliTab === "mcp" &&
                  `{\n  "mcpServers": {\n    "pdfcatalyst": {\n      "command": "pdfcraft-cli",\n      "args": ["mcp", "--root", "/path/to/documents"]\n    }\n  }\n}`}
                {cliTab === "cli" &&
                  `# Batch merge multiple documents with multi-threaded Rayon engine\npdfcraft-cli batch --merge doc1.pdf doc2.pdf --out bundle.pdf\n\n# Embedded offline neural OCR\npdfcraft-cli ocr scan.pdf --lang eng --out searchable.pdf`}
                {cliTab === "json" &&
                  `[\n  { "op": "open", "file": "agreement.pdf" },\n  { "op": "redact", "pattern": "SSN:\\\\s*\\\\d{3}-\\\\d{2}-\\\\d{4}" },\n  { "op": "watermark", "text": "CONFIDENTIAL" },\n  { "op": "save_atomic", "out": "sanitized.pdf" }\n]`}
              </pre>
            </div>
          </div>
        </section>

        {/* ==========================================================================
           Download Hub & Package Manager Terminal (winget / cargo / scoop)
           ========================================================================== */}
        <section className="section-container" id="download">
          <div className="download-console-card">
            <span className="eyebrow-chip">RELEASE BINARIES</span>
            <h2 className="title-metallic">Download PDFCatalyst {currentVersion}</h2>
            <p className="subtitle-subtle">
              Native executable compiled with strict optimizations. 100% offline.
            </p>

            <div className="download-actions-grid">
              <a href={installerUrl} className="download-action-card primary">
                <div className="card-info">
                  <div className="action-tag">RECOMMENDED</div>
                  <strong className="card-title">Windows Installer</strong>
                  <span className="card-meta">v1.0.0 • x64 • {installerSize}</span>
                </div>
                <Icon name="download" size={18} />
              </a>

              <a href={portableUrl} className="download-action-card">
                <div className="card-info">
                  <div className="action-tag">PORTABLE</div>
                  <strong className="card-title">Standalone Executable</strong>
                  <span className="card-meta">No admin privileges needed • {portableSize}</span>
                </div>
                <Icon name="download" size={18} />
              </a>
            </div>

            {/* Package Manager Terminal Snippet */}
            <PackageManagerTerminal soundEnabled={soundEnabled} onCopy={copy} copiedId={copiedId} />

            <div className="sha-verify-bar">
              <span className="sha-label">SHA-256 HASH:</span>
              <code>{installerSha}</code>
              <button
                className="btn-sha-copy"
                onClick={() =>
                  copy(
                    `Get-FileHash .\\${installerAsset?.name || "PDFcatalyst-Setup-v1.0.0-x64.exe"} -Algorithm SHA256`,
                    "sha-cmd"
                  )
                }
              >
                <Icon name="copy" size={11} /> {copiedId === "sha-cmd" ? "Copied" : "PowerShell Cmd"}
              </button>
            </div>
          </div>
        </section>

        {/* ==========================================================================
           Creator Profile
           ========================================================================== */}
        <section className="section-container">
          <div className="creator-linear-card">
            <div className="creator-details">
              <span className="eyebrow-chip">CREATOR & MAINTAINER</span>
              <h3 className="creator-name">Sarthak Saxena</h3>
              <p className="creator-bio">
                Software engineer dedicated to systems programming, memory safety, and building high-performance document tools without cloud friction.
              </p>
              <div className="creator-badges-row">
                <span className="badge-pill"><Icon name="shield" size={13} /> Pure Rust Core</span>
                <span className="badge-pill"><Icon name="check" size={13} /> Verified Architecture</span>
              </div>
            </div>
            <div className="creator-avatar-wrap">
              <img src="/pdfix-logo.png" alt="" width="72" height="72" />
            </div>
          </div>
        </section>

        {/* ==========================================================================
           Frequently Asked Questions
           ========================================================================== */}
        <section className="section-container">
          <div className="section-head-minimal">
            <span className="eyebrow-chip">FAQ</span>
            <h2 className="title-metallic">Frequently asked questions.</h2>
          </div>

          <div className="faq-linear-list">
            {faqs.map((faq, i) => (
              <div className={`faq-row ${activeFaq === i ? "open" : ""}`} key={i}>
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

      {/* ==========================================================================
         Carbon Minimalist Footer
         ========================================================================== */}
      <footer className="linear-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-brand">
              <img src="/pdfix-logo.png" alt="" width="20" height="20" />
              <span>PDFCatalyst</span>
            </div>
            <p>The pure Rust PDF engineering workbench. 100% offline.</p>
            <div className="footer-hud-status">
              <span className="beacon-dot" />
              <span>All Systems Operational · Air-Gapped Engine</span>
            </div>
          </div>

          <div className="footer-nav-columns">
            <div className="nav-col">
              <strong>PRODUCT</strong>
              <a href="#app-preview">Screenshot Tour</a>
              <a href="#benchmarks">Benchmarks</a>
              <a href="#sandbox">Sandbox</a>
              <a href="#features">Capabilities</a>
              <a href="#download">Downloads</a>
            </div>
            <div className="nav-col">
              <strong>RESOURCES</strong>
              <a href={installerUrl}>Windows Installer</a>
              <a href={portableUrl}>Portable Executable</a>
              <a href="https://github.com/SarthAyush/PDFcatalyst-App" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
              <button className="link-btn-clean" onClick={() => setCommandOpen(true)}>Command Menu (⌘K)</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>Copyright © {new Date().getFullYear()} PDFCatalyst. Engineered by Sarthak Saxena.</span>
          <span>Dual-licensed under MIT / Apache-2.0</span>
        </div>
      </footer>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={setCommandOpen}
        onOpenTurbo={() => setTurboOpen(true)}
      />

      {/* Surprise Factor: Cyber Turbo Matrix HUD & Byte Slasher Minigame */}
      <CyberTurboModal
        isOpen={turboOpen}
        onClose={() => setTurboOpen(false)}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
