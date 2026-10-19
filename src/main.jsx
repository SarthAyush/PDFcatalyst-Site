import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const DOWNLOAD_INSTALLER =
  "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.2/PDFCatalyst-Setup-v1.0.2-x64.exe";
const DOWNLOAD_PORTABLE =
  "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.2/PDFCatalyst.exe";
const SHA256_INSTALLER =
  "eaea6576725659ea9cfb82c69af508f171ac356357d35286dab947ccd841d3a0";
const SHA256_PORTABLE =
  "28d8721512b04cd711d5db4a957335dec5a8741a13f240bc9c0028bbc907614c";


function playAudioBlip(freq = 520, type = "sine", duration = 0.12) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.15, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
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
    sparkleGalaxy: (
      <>
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
      </>
    ),
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    play: <polygon points="5 3 19 12 5 21 5 3" />,
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
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
      const cacheKey = "pdfcatalyst_github_releases_v102";
      const cacheTimeKey = "pdfcatalyst_github_releases_v102_time";

      try {
        const cached = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheTimeKey);
        if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < 5 * 60 * 1000) {
          const parsed = JSON.parse(cached);
          if (parsed && (Array.isArray(parsed) ? parsed.length > 0 : parsed.tag_name)) {
            const rel = Array.isArray(parsed) ? parsed[0] : parsed;
            setReleases(Array.isArray(parsed) ? parsed : [parsed]);
            setLatestRelease(rel);
            setIsLoading(false);
            return;
          }
        }

        const res = await fetch("https://api.github.com/repos/SarthAyush/PDFcatalyst-App/releases/latest");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data && data.tag_name) {
          setReleases([data]);
          setLatestRelease(data);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(data));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
          } catch {}
        }
      } catch (err) {
        // Fallback to verified DEFAULT_RELEASE
      } finally {
        setIsLoading(false);
      }
    };

    fetchReleases();
  }, []);

  return { releases, latestRelease, isLoading };
}

const DEFAULT_RELEASE = {
  tag_name: "v1.0.2",
  name: "PDFCatalyst v1.0.2",
  published_at: "2026-10-19T11:41:07Z",
  html_url: "https://github.com/SarthAyush/PDFcatalyst-App/releases/tag/v1.0.2",
  assets: [
    {
      name: "PDFCatalyst-Setup-v1.0.2-x64.exe",
      size: 19875848,
      browser_download_url:
        "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.2/PDFCatalyst-Setup-v1.0.2-x64.exe",
      digest: "sha256:eaea6576725659ea9cfb82c69af508f171ac356357d35286dab947ccd841d3a0",
    },
    {
      name: "PDFCatalyst-Setup.exe",
      size: 19875848,
      browser_download_url:
        "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.2/PDFCatalyst-Setup.exe",
      digest: "sha256:eaea6576725659ea9cfb82c69af508f171ac356357d35286dab947ccd841d3a0",
    },
    {
      name: "PDFCatalyst.exe",
      size: 67534320,
      browser_download_url:
        "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.2/PDFCatalyst.exe",
      digest: "sha256:28d8721512b04cd711d5db4a957335dec5a8741a13f240bc9c0028bbc907614c",
    },
  ],
};

/* ==========================================================================
   3D Tilt Card (Interactive Mouse Perspective Glass)
   ========================================================================== */
function TiltCard({ children, className = "", maxTilt = 12, glare = true, ...props }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`glass-3d-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      {...props}
    >
      {glare && (
        <div
          className="card-specular-glare"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, transparent 65%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

/* ==========================================================================
   Samsung-Style Hero 3D Stage (Interactive Workbench with Floating 3D Z-Layers)
   ========================================================================== */
function Samsung3DHeroStage({ soundEnabled }) {
  const stageRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 7, y: -9 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({
      x: -(y / (rect.height / 2)) * 14,
      y: (x / (rect.width / 2)) * 16,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 7, y: -9 });
    setIsHovered(false);
  };

  return (
    <div
      ref={stageRef}
      className="samsung-3d-stage-container"
      onMouseMove={(e) => {
        setIsHovered(true);
        handleMouseMove(e);
      }}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="samsung-3d-stage-viewport"
        style={{
          transform: `perspective(1400px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Base Bezel & Screenshot */}
        <div className="samsung-device-frame glass-card-3d">
          <div className="frame-titanium-rim" />
          <div className="frame-top-notch">
            <span className="notch-dot red" />
            <span className="notch-dot yellow" />
            <span className="notch-dot green" />
            <span className="notch-title">PDFCatalyst Flagship Desktop</span>
          </div>

          <div className="frame-screen">
            <img
              src="/app-screenshot.png"
              alt="PDFCatalyst Desktop App on 3D Titanium Frame"
              className="screen-img"
            />
            <div className="screen-glass-sheen" />
          </div>
        </div>

        {/* Floating 3D Layer 1: Floating Quick Tools Glass Capsule (+45px Z) */}
        <div className="layer-floating-capsule z-layer-1">
          <div className="capsule-inner glass-pill">
            <span className="pulse-beacon-blue" />
            <span className="capsule-text">Intelligent Tools Active</span>
            <div className="capsule-icons">
              <span title="OCR"><Icon name="search" size={13} /></span>
              <span title="Redact"><Icon name="lock" size={13} /></span>
              <span title="Sign"><Icon name="penTool" size={13} /></span>
              <span title="Measure"><Icon name="ruler" size={13} /></span>
            </div>
          </div>
        </div>

        {/* Floating 3D Layer 2: On-Device Privacy Shield (+65px Z) */}
        <div className="layer-floating-shield z-layer-2">
          <div className="shield-card-glass glass-card-3d">
            <div className="shield-icon-circle">
              <Icon name="shield" size={18} />
            </div>
            <div className="shield-info">
              <strong>100% On-Device</strong>
              <span>Zero Cloud Egress</span>
            </div>
          </div>
        </div>

        {/* Floating 3D Layer 3: Ultra Latency Chip (+55px Z) */}
        <div className="layer-floating-perf z-layer-3">
          <div className="perf-chip-glass glass-card-3d">
            <div className="perf-metric">
              <Icon name="zap" size={14} className="green" />
              <span>0.18s</span>
            </div>
            <span className="perf-label">Instant Start</span>
          </div>
        </div>
      </div>

      <div className="stage-hint-text">
        <span>Hover or tilt to inspect 3D glass display</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   Samsung-Style Sticky Sub-Navigation Bar
   ========================================================================== */
function SamsungSubNav({ activeSection, onSelectSection, downloadUrl }) {
  const items = [
    { id: "overview", label: "Overview" },
    { id: "intelligence", label: "Intelligence" },
    { id: "studio", label: "3D Studio" },
    { id: "showcase", label: "Showcase" },
    { id: "why-switch", label: "Why Switch" },
    { id: "performance", label: "Speed" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="samsung-subnav-sticky glass-nav-sub">
      <div className="samsung-subnav-inner">
        <div className="subnav-brand-title">
          <span>PDFCatalyst</span>
          <span className="subnav-model-pill">Flagship</span>
        </div>

        <nav className="subnav-links-cluster">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`subnav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => onSelectSection(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href={downloadUrl || DOWNLOAD_INSTALLER} className="subnav-cta-btn" target="_blank" rel="noopener noreferrer">
          <span>Download Free</span>
          <Icon name="arrowRight" size={12} />
        </a>
      </div>
    </div>
  );
}

/* ==========================================================================
   Quiet, Soothing Floating Mascot Assistant
   ========================================================================== */
function FloatingCuteMascot({ soundEnabled, setSoundEnabled }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const [isGentlyNodding, setIsGentlyNodding] = useState(false);

  const tips = [
    "Your files stay 100% private on your machine.",
    "Click and hover on the 3D displays to tilt the glass perspective.",
    "No subscriptions or accounts needed — completely free.",
    "Easily reorder, rotate, or merge pages with one click.",
    "Scanned a receipt? OCR converts it into clean searchable text.",
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
        className="mascot-minimized-pill glass-card-3d"
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
      <div className="mascot-speech-bubble glass-card-3d">
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
          width="74"
          height="74"
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   Samsung Galaxy-Style Intelligence Bento Grid (3D Glass Tiles)
   ========================================================================== */
function SamsungIntelligenceSection() {
  const features = [
    {
      title: "Smart Optical Scan",
      subtitle: "On-Device Neural OCR",
      desc: "Turn photographs and faded paper documents into crisp, selectable, and searchable text without ever uploading files to cloud servers.",
      icon: "search",
      badge: "Vision",
      gradient: "blue-cyan",
      tag: "100% Offline",
    },
    {
      title: "True Zero-Trace Redact",
      subtitle: "Irreversible Privacy",
      desc: "Standard viewers only draw a surface-level black box that anyone can copy. PDFCatalyst permanently removes confidential words from the document.",
      icon: "lock",
      badge: "Security",
      gradient: "violet-pink",
      tag: "Zero Leaks",
    },
    {
      title: "Silky 60 FPS Zoom",
      subtitle: "Hardware GPU Engine",
      desc: "Pan and zoom effortlessly up to 800% on massive 500-page architectural drawings with zero stuttering or frozen screens.",
      icon: "cpu",
      badge: "Performance",
      gradient: "emerald-teal",
      tag: "60 FPS Fluid",
    },
    {
      title: "Precision Blueprint Caliper",
      subtitle: "Architectural CAD Measure",
      desc: "Calibrate drawings to Imperial and Metric scale ratios. Calculate room dimensions, corridor runs, and square footage in real time.",
      icon: "ruler",
      badge: "Precision",
      gradient: "amber-orange",
      tag: "Calibrated Scale",
    },
    {
      title: "1-Click Digital Sign",
      subtitle: "Verified Approvals",
      desc: "Add your personal signature, date stamps, and verified digital approval seals directly to agreements without printing or scanning.",
      icon: "penTool",
      badge: "Signatures",
      gradient: "cyan-blue",
      tag: "Print-Free",
    },
    {
      title: "Instant Batch Studio",
      subtitle: "Multi-File Organizing",
      desc: "Combine, split, compress, and rotate entire folders of documents with smooth drag-and-drop ease in sub-second bursts.",
      icon: "layers",
      badge: "Productivity",
      gradient: "purple-indigo",
      tag: "Sub-Second",
    },
  ];

  return (
    <section className="section-container" id="intelligence">
      <div className="section-head-minimal">
        <div className="samsung-sparkle-pill">
          <Icon name="sparkleGalaxy" size={13} className="sparkle-icon" />
          <span>INTELLIGENCE & PRECISION</span>
        </div>
        <h2 className="title-samsung-flagship">Crafted for your everyday workflow.</h2>
        <p className="subtitle-samsung">
          Powerful document capabilities delivered inside a pristine 3D glass environment.
        </p>
      </div>

      <div className="samsung-bento-grid">
        {features.map((f, i) => (
          <TiltCard key={i} className="samsung-bento-tile" maxTilt={10}>
            <div className={`tile-glow-orb ${f.gradient}`} />
            <div className="tile-top-row">
              <div className="tile-icon-capsule">
                <Icon name={f.icon} size={18} />
              </div>
              <span className="tile-tag">{f.tag}</span>
            </div>
            <div className="tile-content">
              <span className="tile-sub">{f.subtitle}</span>
              <h3 className="tile-title">{f.title}</h3>
              <p className="tile-desc">{f.desc}</p>
            </div>
            <div className="tile-bottom-sheen" />
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   Samsung-Style 3D Interactive Workflow Studio
   ========================================================================== */
function Samsung3DWorkflowStudio({ soundEnabled }) {
  const [activeTab, setActiveTab] = useState(0);

  // Tab 0: Redact Demo
  const [redacted, setRedacted] = useState(true);
  const [copyFeedback, setCopyFeedback] = useState("");

  // Tab 1: OCR Scan Demo
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  // Tab 2: Page Reorder Demo
  const [pageList, setPageList] = useState([1, 2, 3, 4]);

  // Tab 3: Sign Demo
  const [signed, setSigned] = useState(false);

  // Tab 4: Caliper Demo
  const [measurePoint, setMeasurePoint] = useState("room");

  const tabs = [
    { id: "redact", title: "One-Click Redact", icon: "lock", badge: "Zero Leaks" },
    { id: "ocr", title: "Smart Scan (OCR)", icon: "search", badge: "Neural Text" },
    { id: "pages", title: "Merge & Organize", icon: "layers", badge: "Drag & Reorder" },
    { id: "sign", title: "Instant E-Sign", icon: "penTool", badge: "Digital Seal" },
    { id: "measure", title: "Blueprint Caliper", icon: "ruler", badge: "CAD Scale" },
  ];

  const handleTestCopy = () => {
    if (redacted) {
      if (soundEnabled) playAudioBlip(760);
      setCopyFeedback("Protected: 0 characters copied. The confidential data is completely erased.");
    } else {
      if (soundEnabled) playAudioBlip(440);
      navigator.clipboard?.writeText("984-21-0814");
      setCopyFeedback("Warning: '984-21-0814' was copied. Standard black box overlays can still be read.");
    }
    setTimeout(() => setCopyFeedback(""), 3500);
  };

  const handleRunOcr = () => {
    if (scanning) return;
    if (soundEnabled) playAudioBlip(540, "sine", 0.2);
    setScanning(true);
    setScanProgress(0);

    let cur = 0;
    const interval = setInterval(() => {
      cur += 10;
      if (cur >= 100) {
        clearInterval(interval);
        setScanProgress(100);
        setScanning(false);
        if (soundEnabled) playAudioBlip(720, "sine", 0.2);
      } else {
        setScanProgress(cur);
      }
    }, 110);
  };

  const handleReorder = () => {
    if (soundEnabled) playAudioBlip(640);
    setPageList((prev) => [...prev.slice(1), prev[0]]);
  };

  return (
    <section className="section-container" id="studio">
      <div className="section-head-minimal">
        <div className="samsung-sparkle-pill">
          <Icon name="sparkleGalaxy" size={13} className="sparkle-icon" />
          <span>3D INTERACTIVE STUDIO</span>
        </div>
        <h2 className="title-samsung-flagship">Test drive the flagship features.</h2>
        <p className="subtitle-samsung">
          Interact with live document tools rendered in multi-depth glass panels.
        </p>
      </div>

      <div className="samsung-studio-shell glass-card-3d">
        {/* Navigation Tabs */}
        <div className="studio-tabs-bar">
          {tabs.map((t, idx) => (
            <button
              key={t.id}
              className={`studio-tab-btn ${activeTab === idx ? "active" : ""}`}
              onClick={() => {
                if (soundEnabled) playAudioBlip(560 + idx * 40);
                setActiveTab(idx);
              }}
            >
              <Icon name={t.icon} size={15} />
              <span>{t.title}</span>
              <span className="tab-glass-badge">{t.badge}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="studio-content-layout">
          {/* TAB 0: REDACTION */}
          {activeTab === 0 && (
            <div className="studio-tab-pane">
              <div className="pane-info">
                <span className="pane-eyebrow">CONFIDENTIALITY AUDIT</span>
                <h3 className="pane-heading">True Redaction: Erased Forever</h3>
                <p className="pane-desc">
                  Standard viewers merely paint a black rectangle over sensitive text, leaving the underlying words intact so anyone can copy-paste them. PDFCatalyst permanently destroys confidential data from the document.
                </p>
                <div className="pane-toggles">
                  <span className="toggle-label">Engine Mode:</span>
                  <button
                    className={`glass-toggle-btn ${redacted ? "active-safe" : ""}`}
                    onClick={() => setRedacted(true)}
                  >
                    PDFCatalyst True Erase
                  </button>
                  <button
                    className={`glass-toggle-btn ${!redacted ? "active-danger" : ""}`}
                    onClick={() => setRedacted(false)}
                  >
                    Standard Black Box
                  </button>
                </div>
              </div>

              <TiltCard className="pane-interactive-card glass-panel-3d" maxTilt={8}>
                <div className="doc-mockup-sheet">
                  <div className="doc-mockup-header">
                    <span>NON-DISCLOSURE AGREEMENT</span>
                    <span className="status-badge">{redacted ? "PROTECTED" : "VULNERABLE"}</span>
                  </div>
                  <p className="doc-row">Signer: <strong>Elena Rostova</strong></p>
                  <p className="doc-row">
                    Social Security Number:{" "}
                    <span className={`redact-chip ${redacted ? "safe" : "leaky"}`}>
                      {redacted ? "[Permanently Erased]" : "984-21-0814"}
                    </span>
                  </p>
                  <p className="doc-row">
                    Bank Account Number:{" "}
                    <span className={`redact-chip ${redacted ? "safe" : "leaky"}`}>
                      {redacted ? "[Permanently Erased]" : "4421-8890-1200"}
                    </span>
                  </p>
                </div>

                <div className="interactive-btn-cluster">
                  <button className="btn-samsung-glass-action" onClick={handleTestCopy}>
                    <Icon name="copy" size={13} />
                    <span>Test Copy-Paste Vulnerability</span>
                  </button>
                </div>

                {copyFeedback && (
                  <div className={`feedback-alert-pill ${redacted ? "safe" : "danger"}`}>
                    <Icon name={redacted ? "shield" : "lock"} size={13} />
                    <span>{copyFeedback}</span>
                  </div>
                )}
              </TiltCard>
            </div>
          )}

          {/* TAB 1: OCR */}
          {activeTab === 1 && (
            <div className="studio-tab-pane">
              <div className="pane-info">
                <span className="pane-eyebrow">NEURAL RECOGNITION</span>
                <h3 className="pane-heading">Turn Photos & Scans into Selectable Text</h3>
                <p className="pane-desc">
                  Convert scanned paper receipts, legal filings, and phone photographs into clean, searchable documents. Run smart character extraction directly on your local hardware.
                </p>
                <div className="interactive-btn-cluster">
                  <button
                    className="btn-samsung-glass-action primary"
                    onClick={handleRunOcr}
                    disabled={scanning}
                  >
                    <Icon name="search" size={13} />
                    <span>{scanning ? `Scanning Document (${scanProgress}%)...` : "Run Smart OCR Scan"}</span>
                  </button>
                </div>
              </div>

              <TiltCard className="pane-interactive-card glass-panel-3d" maxTilt={8}>
                <div className="ocr-stage-box">
                  <img src="/media/document_audit.jpg" alt="Scanned Document" className="ocr-image" />
                  {scanning && (
                    <div className="samsung-laser-beam" style={{ top: `${scanProgress}%` }} />
                  )}
                  <div className="ocr-tags-row">
                    <span className="ocr-tag-pill">INVOICE #9421</span>
                    <span className="ocr-tag-pill">TOTAL: $1,420.00</span>
                    <span className="ocr-tag-pill">STATUS: PAID</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          )}

          {/* TAB 2: PAGE REORDER */}
          {activeTab === 2 && (
            <div className="studio-tab-pane">
              <div className="pane-info">
                <span className="pane-eyebrow">DOCUMENT ARCHITECTURE</span>
                <h3 className="pane-heading">Reorder, Split, and Merge Pages</h3>
                <p className="pane-desc">
                  Rearrange proposals, delete blank pages, rotate upside-down camera scans, and merge multiple PDFs together in seconds.
                </p>
                <div className="interactive-btn-cluster">
                  <button className="btn-samsung-glass-action" onClick={handleReorder}>
                    <Icon name="layers" size={13} />
                    <span>Reorder Pages in 3D</span>
                  </button>
                </div>
              </div>

              <TiltCard className="pane-interactive-card glass-panel-3d" maxTilt={8}>
                <div className="pages-3d-shelf">
                  {pageList.map((num, i) => (
                    <div className="page-3d-item glass-card-3d" key={num}>
                      <span className="page-label">Page {num}</span>
                      <div className="page-lines">
                        <div className="p-line wide" />
                        <div className="p-line" />
                        <div className="p-line short" />
                      </div>
                      <span className="page-order-num">#{i + 1}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
          )}

          {/* TAB 3: SIGN */}
          {activeTab === 3 && (
            <div className="studio-tab-pane">
              <div className="pane-info">
                <span className="pane-eyebrow">VERIFIED SIGNATURES</span>
                <h3 className="pane-heading">Sign Agreements Without Printing</h3>
                <p className="pane-desc">
                  Place verified digital signatures, approval dates, and custom stamps with one click. Eliminates the need to print on paper or scan documents again.
                </p>
                <div className="interactive-btn-cluster">
                  <button
                    className="btn-samsung-glass-action primary"
                    onClick={() => {
                      if (soundEnabled) playAudioBlip(signed ? 520 : 760);
                      setSigned(!signed);
                    }}
                  >
                    <Icon name={signed ? "x" : "penTool"} size={13} />
                    <span>{signed ? "Clear Signature" : "Apply Verified Signature"}</span>
                  </button>
                </div>
              </div>

              <TiltCard className="pane-interactive-card glass-panel-3d" maxTilt={8}>
                <div className="doc-mockup-sheet signing">
                  <div className="doc-mockup-header">
                    <span>CONSULTING SERVICES AGREEMENT</span>
                  </div>
                  <p className="doc-row">
                    By signing below, all milestones and deliverable terms are formally approved.
                  </p>
                  <div className="signature-box-glass">
                    <span className="sig-label">Authorized Signature:</span>
                    {signed ? (
                      <div className="signature-placed-wrap">
                        <span className="sig-calligraphy">Katherine Vance</span>
                        <span className="sig-stamp-pill">Verified Seal • {new Date().toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <span className="sig-placeholder">Click button to stamp digital signature</span>
                    )}
                  </div>
                </div>
              </TiltCard>
            </div>
          )}

          {/* TAB 4: CALIPER */}
          {activeTab === 4 && (
            <div className="studio-tab-pane">
              <div className="pane-info">
                <span className="pane-eyebrow">ARCHITECTURAL CALIPER</span>
                <h3 className="pane-heading">Measure Drawings with True Scale</h3>
                <p className="pane-desc">
                  Calibrate CAD drawings and blueprints against known title blocks. Measure distances, perimeters, and area square footage with sub-millimeter precision.
                </p>
                <div className="pane-toggles">
                  <button
                    className={`glass-toggle-btn ${measurePoint === "room" ? "active-safe" : ""}`}
                    onClick={() => setMeasurePoint("room")}
                  >
                    Main Suite
                  </button>
                  <button
                    className={`glass-toggle-btn ${measurePoint === "hallway" ? "active-safe" : ""}`}
                    onClick={() => setMeasurePoint("hallway")}
                  >
                    Corridor
                  </button>
                </div>
              </div>

              <TiltCard className="pane-interactive-card glass-panel-3d" maxTilt={8}>
                <div className="caliper-visual-box">
                  <img src="/media/blueprint_cad.jpg" alt="Blueprint" className="blueprint-img" />
                  <div className={`caliper-pin-cluster ${measurePoint}`}>
                    <div className="caliper-glowing-beacon" />
                    <div className="caliper-data-card glass-card-3d">
                      {measurePoint === "room" ? (
                        <>
                          <strong>Area: 480 sq ft (44.6 m²)</strong>
                          <span>Scale: 1/4" = 1'-0"</span>
                        </>
                      ) : (
                        <>
                          <strong>Distance: 24.5 ft (7.47 m)</strong>
                          <span>Scale: 1/4" = 1'-0"</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Samsung-Style Media Showcase Gallery (High-Res Visuals + Animated GIFs)
   ========================================================================== */
function SamsungMediaShowcase({ soundEnabled }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const pillars = [
    {
      id: "privacy",
      title: "100% On-Device Privacy",
      subtitle: "AIR-GAPPED CONFIDENTIALITY",
      desc: "Unlike online PDF converters that send your personal records to remote servers, PDFCatalyst processes every document right in your computer memory. Your contracts, bank statements, and tax files remain entirely your own.",
      mainImage: "/media/security_airgap.jpg",
      gifInset: "/media/crypto_aes.gif",
      gifBadge: "LOCAL MEMORY ENCRYPTION",
      benefits: [
        "Zero document uploads to remote servers",
        "Zero behavioral analytics or user tracking",
        "Works smoothly without an internet connection",
      ],
    },
    {
      id: "speed",
      title: "Silky 60 FPS Performance",
      subtitle: "INSTANT DOCUMENT OPENING",
      desc: "Experience butter-smooth scrolling across 500-page dense manuals and multi-layer blueprints. Launches in under 200 milliseconds and consumes a fraction of the memory used by legacy viewers.",
      mainImage: "/media/silicon_hardware.jpg",
      gifInset: "/media/matrix_transform.gif",
      gifBadge: "60 FPS SMOOTH NAVIGATION",
      benefits: [
        "Opens heavy documents in under 200 ms",
        "Silky 60 FPS panning even at 800% zoom",
        "Uses 96% less active RAM than legacy suites",
      ],
    },
    {
      id: "ocr",
      title: "Smart Text from Scans",
      subtitle: "NEURAL EXTRACTION",
      desc: "Turn phone photos, paper receipts, and archived records into crisp, selectable text. Search for keywords instantly, copy quotes, and preserve original document layouts.",
      mainImage: "/media/document_audit.jpg",
      gifInset: "/media/laser_scan.gif",
      gifBadge: "SMART CHARACTER EXTRACTION",
      benefits: [
        "Accurate character and table recognition",
        "Preserves your original fonts and geometry",
        "100% on-device conversion without fees",
      ],
    },
    {
      id: "cad",
      title: "Architectural Precision",
      subtitle: "CALIBRATED BLUEPRINT CALIPER",
      desc: "Engineered for architects, builders, and designers who need real-world dimensions. Calibrate drawings against title block scales and compute area and distances instantly.",
      mainImage: "/media/blueprint_cad.jpg",
      gifInset: "/media/radar_scan.gif",
      gifBadge: "CAD MEASUREMENT ENGINE",
      benefits: [
        "Supports Imperial (1/4\", 1/8\") and Metric scales",
        "Instant square footage and perimeter calculation",
        "Vector-sharp display ensures lines remain crystal clear",
      ],
    },
    {
      id: "batch",
      title: "Batch Productivity",
      subtitle: "MULTI-FILE PROCESSING",
      desc: "Organize dozens of PDF files simultaneously. Combine folders of receipts, shrink files for email attachments, and split multi-page bundles with one click.",
      mainImage: "/media/terminal_code.jpg",
      gifInset: "/media/sorting_parallel.gif",
      gifBadge: "PARALLEL BATCH PROCESSING",
      benefits: [
        "Combine dozens of PDF files with one click",
        "Shrink large files for email attachments",
        "Split multi-page bundles cleanly",
      ],
    },
  ];

  const cur = pillars[activeIdx];

  return (
    <section className="section-container" id="showcase">
      <div className="section-head-minimal">
        <div className="samsung-sparkle-pill">
          <Icon name="sparkleGalaxy" size={13} className="sparkle-icon" />
          <span>FLAGSHIP VISUAL SHOWCASE</span>
        </div>
        <h2 className="title-samsung-flagship">Precision tools in high definition.</h2>
        <p className="subtitle-samsung">
          Explore high-resolution imagery and animated workflows in an expansive glass frame.
        </p>
      </div>

      <div className="samsung-showcase-shell glass-card-3d">
        <div className="showcase-nav-pills">
          {pillars.map((p, idx) => (
            <button
              key={p.id}
              className={`showcase-nav-btn ${activeIdx === idx ? "active" : ""}`}
              onClick={() => {
                if (soundEnabled) playAudioBlip(580 + idx * 40);
                setActiveIdx(idx);
              }}
            >
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        <div className="showcase-stage-grid">
          <div className="showcase-visual-frame glass-panel-3d">
            <img src={cur.mainImage} alt={cur.title} className="showcase-main-img" />
            <div className="showcase-gif-capsule glass-pill">
              <img src={cur.gifInset} alt={cur.gifBadge} />
              <div className="gif-badge-text">
                <span className="pulse-beacon-blue" />
                <span>{cur.gifBadge}</span>
              </div>
            </div>
          </div>

          <div className="showcase-info-panel">
            <span className="showcase-eyebrow">{cur.subtitle}</span>
            <h3 className="showcase-title">{cur.title}</h3>
            <p className="showcase-desc">{cur.desc}</p>

            <ul className="showcase-benefits-list">
              {cur.benefits.map((b, i) => (
                <li key={i}>
                  <Icon name="checkCircle" size={15} className="green-check" />
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
   "Why Switch?" Comparison Cards (Samsung-Style Glass Grid)
   ========================================================================== */
function SamsungComparisonSection() {
  const cards = [
    {
      title: "Cost & Subscriptions",
      badge: "Zero Cost",
      pdfcatalyst: "$0 Free Forever",
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
        <div className="samsung-sparkle-pill">
          <Icon name="sparkleGalaxy" size={13} className="sparkle-icon" />
          <span>THE FLAGSHIP ADVANTAGE</span>
        </div>
        <h2 className="title-samsung-flagship">Why people switch to PDFCatalyst.</h2>
        <p className="subtitle-samsung">
          Escape monthly subscription lock-ins and slow cloud uploads with a clean local workbench.
        </p>
      </div>

      <div className="samsung-comparison-grid">
        {cards.map((c, i) => (
          <TiltCard key={i} className="samsung-comp-card glass-card-3d" maxTilt={8}>
            <div className="comp-card-top">
              <span className="comp-category">{c.title}</span>
              <span className="comp-badge-pill">{c.badge}</span>
            </div>

            <div className="comp-split-box">
              <div className="comp-side winner">
                <div className="side-head">
                  <div className="side-icon-box green">
                    <Icon name="check" size={13} />
                  </div>
                  <strong>PDFCatalyst</strong>
                </div>
                <div className="side-val green">{c.pdfcatalyst}</div>
                <p className="side-detail">{c.pdfcatalystDetail}</p>
              </div>

              <div className="side-divider" />

              <div className="comp-side competitor">
                <div className="side-head">
                  <div className="side-icon-box red">
                    <Icon name="x" size={12} />
                  </div>
                  <span className="comp-name">{c.competitor}</span>
                </div>
                <p className="side-detail dim">{c.competitorDetail}</p>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   Speed & Performance Benchmark Simulator
   ========================================================================== */
function SamsungBenchmarksSection({ soundEnabled }) {
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
      winner: "18.8x Faster",
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
    <section className="section-container" id="performance">
      <div className="section-head-minimal">
        <div className="samsung-sparkle-pill">
          <Icon name="sparkleGalaxy" size={13} className="sparkle-icon" />
          <span>PERFORMANCE METRICS</span>
        </div>
        <h2 className="title-samsung-flagship">Lightweight. Blazingly fast.</h2>
        <p className="subtitle-samsung">
          Tested side-by-side against bloated legacy software suites on everyday hardware.
        </p>
      </div>

      <div className="samsung-bench-card glass-card-3d">
        <div className="bench-header-bar">
          <div>
            <span className="bench-eyebrow">SYSTEM LATENCY AUDIT</span>
            <h3 className="bench-title">Sub-millisecond responsiveness on dense files.</h3>
          </div>
          <button
            className="btn-samsung-glass-action primary"
            onClick={runSimulation}
            disabled={isRunning}
          >
            <Icon name="activity" size={14} className={isRunning ? "pulse-anim" : ""} />
            <span>{isRunning ? `Running Test (${progress}%)...` : "Run Speed Simulation"}</span>
          </button>
        </div>

        <div className="bench-grid-stack">
          {metrics.map((m, idx) => (
            <div className="bench-row-card glass-panel-3d" key={idx}>
              <div className="bench-row-top">
                <strong className="bench-row-title">{m.title}</strong>
                <span className="bench-winner-tag">{m.winner}</span>
              </div>

              <div className="bench-bars-container">
                <div className="bar-entry">
                  <div className="bar-legend">
                    <span className="brand-bold">PDFCatalyst</span>
                    <span className="val-text green">{m.pdfcatalyst}</span>
                  </div>
                  <div className="bar-track-glass">
                    <div
                      className="bar-fill-gradient cyan"
                      style={{ width: `${(m.pctPdfix * progress) / 100}%` }}
                    />
                  </div>
                </div>

                <div className="bar-entry">
                  <div className="bar-legend">
                    <span className="brand-dim">Adobe Acrobat Pro</span>
                    <span className="val-text dim">{m.acrobat}</span>
                  </div>
                  <div className="bar-track-glass">
                    <div
                      className="bar-fill-gradient dim"
                      style={{ width: `${(m.pctAcrobat * progress) / 100}%` }}
                    />
                  </div>
                </div>

                <div className="bar-entry">
                  <div className="bar-legend">
                    <span className="brand-dim">Web & Cloud Converters</span>
                    <span className="val-text dim">{m.cloud}</span>
                  </div>
                  <div className="bar-track-glass">
                    <div
                      className="bar-fill-gradient red-dim"
                      style={{ width: `${(m.pctCloud * progress) / 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Command Menu (⌘K / Ctrl+K)
   ========================================================================== */
function CommandPalette({ isOpen, onClose, installerUrl, portableUrl }) {
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
    { id: "dl-inst", category: "Download", title: "Download Windows Installer (.exe)", shortcut: "↵", link: installerUrl || DOWNLOAD_INSTALLER },
    { id: "dl-port", category: "Download", title: "Download Standalone Portable (.exe)", shortcut: "P", link: portableUrl || DOWNLOAD_PORTABLE },
    { id: "feat-intel", category: "Intelligence", title: "Explore Smart Tools & OCR", shortcut: "I", hash: "#intelligence" },
    { id: "feat-studio", category: "3D Studio", title: "Open 3D Interactive Studio", shortcut: "S", hash: "#studio" },
    { id: "feat-show", category: "Showcase", title: "Explore Flagship Media Showcase", shortcut: "M", hash: "#showcase" },
    { id: "feat-switch", category: "Why Switch", title: "Compare vs. Adobe Acrobat & Web Tools", shortcut: "W", hash: "#why-switch" },
    { id: "feat-perf", category: "Performance", title: "View Speed & RAM Benchmarks", shortcut: "B", hash: "#performance" },
    { id: "feat-faq", category: "Help", title: "Frequently Asked Questions", shortcut: "F", hash: "#faq" },
    { id: "src-repo", category: "Source", title: "View Open Source Repository on GitHub", shortcut: "G", link: "https://github.com/SarthAyush/PDFcatalyst-App" },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="raycast-overlay" onClick={() => onClose(false)}>
      <div className="raycast-modal glass-card-3d" onClick={(e) => e.stopPropagation()}>
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
  const [activeSection, setActiveSection] = useState("overview");

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
    <div className="samsung-flagship-canvas">
      {/* Animated Ethereal Aurora Light Orbs */}
      <div className="aurora-orb orb-1" aria-hidden="true" />
      <div className="aurora-orb orb-2" aria-hidden="true" />
      <div className="aurora-orb orb-3" aria-hidden="true" />

      {/* Floating Gentle Mascot Assistant */}
      <FloatingCuteMascot soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {/* Flagship Top Navigation Bar */}
      <header className="samsung-top-nav glass-nav-3d">
        <div className="top-nav-inner">
          <a href="#top" className="samsung-brand">
            <div className="brand-logo-gem">
              <img src="/pdfix-logo.png" alt="PDFCatalyst" width="22" height="22" />
            </div>
            <span className="brand-text">PDFCatalyst</span>
            <span className="brand-version-badge">{currentVersion}</span>
          </a>

          <div className="top-nav-center">
            <a href="#overview" className="nav-link">Overview</a>
            <a href="#intelligence" className="nav-link">Intelligence</a>
            <a href="#studio" className="nav-link">3D Studio</a>
            <a href="#showcase" className="nav-link">Showcase</a>
            <a href="#why-switch" className="nav-link">Why Switch</a>
            <a href="#performance" className="nav-link">Speed</a>
          </div>

          <div className="top-nav-actions">
            <button
              className="btn-glass-search"
              onClick={() => setCommandOpen(true)}
              title="Search tools & shortcuts (⌘K)"
            >
              <Icon name="search" size={13} />
              <span>Search</span>
              <kbd className="kbd-pill">⌘K</kbd>
            </button>

            <div className="nav-v-divider" />

            <div className="nav-icon-cluster">
              <a
                href="https://github.com/SarthAyush/PDFcatalyst-App"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-action-icon"
                title="GitHub Repository"
                aria-label="GitHub Repository"
              >
                <Icon name="github" size={15} />
              </a>

              <button
                className={`nav-action-icon ${soundEnabled ? "active" : ""}`}
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
                className="nav-action-icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle Theme"
              >
                <Icon name={theme === "dark" ? "sun" : "moon"} size={14} />
              </button>
            </div>

            <a href={installerUrl} className="btn-samsung-primary">
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
          <div className="mobile-samsung-drawer glass-card-3d">
            <a href="#overview" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Overview</a>
            <a href="#intelligence" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Intelligence</a>
            <a href="#studio" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>3D Studio</a>
            <a href="#showcase" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Showcase</a>
            <a href="#why-switch" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Why Switch</a>
            <a href="#performance" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Speed</a>
            <a href="#faq" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="mobile-cta-row">
              <a href={installerUrl} className="btn-samsung-primary" style={{ width: "100%", justifyContent: "center" }}>
                <Icon name="download" size={14} />
                <span>Download Free Installer</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Samsung Sticky Product Sub-Bar */}
      <SamsungSubNav activeSection={activeSection} onSelectSection={setActiveSection} downloadUrl={installerUrl} />

      <main id="top">
        {/* ==========================================================================
           Samsung Flagship Cinematic Hero
           ========================================================================== */}
        <section className="samsung-hero-section" id="overview">
          <div className="hero-atmosphere-glow" />

          <div className="hero-text-center">
            <div className="samsung-sparkle-pill hero-badge">
              <Icon name="sparkleGalaxy" size={14} className="sparkle-icon" />
              <span>THE NEXT ERA OF PDF EDITING</span>
            </div>

            <h1 className="hero-headline-samsung">
              Meet PDFCatalyst.
              <br />
              <span className="shimmer-titanium">Intelligence meets pure privacy.</span>
            </h1>

            <p className="hero-subtext-samsung">
              Designed from the ground up to eliminate expensive subscriptions, slow cloud conversions, and privacy risks. Everything happens natively on your desktop.
            </p>

            <div className="hero-cta-cluster">
              <a href={installerUrl} className="btn-samsung-hero-primary">
                <Icon name="download" size={16} />
                <span>Download for {detectedOs}</span>
                <span className="cta-filesize">({installerSize})</span>
              </a>
              <a href={portableUrl} className="btn-samsung-hero-secondary" title="No installation needed">
                <Icon name="file" size={14} />
                <span>Portable (.exe)</span>
              </a>
              <button className="btn-samsung-hero-secondary" onClick={() => setCommandOpen(true)}>
                <Icon name="command" size={14} />
                <span>Quick Menu</span>
                <kbd className="kbd-pill">⌘K</kbd>
              </button>
            </div>

            <div className="hero-highlights-strip">
              <div className="highlight-item">
                <strong>$0 Free Forever</strong>
                <span>Zero Subscriptions</span>
              </div>
              <div className="highlight-sep" />
              <div className="highlight-item">
                <strong>100% On-Device</strong>
                <span>Air-Gapped Privacy</span>
              </div>
              <div className="highlight-sep" />
              <div className="highlight-item">
                <strong>Sub-200ms</strong>
                <span>Instant Launch</span>
              </div>
              <div className="highlight-sep" />
              <div className="highlight-item">
                <strong>No Account</strong>
                <span>Zero Sign-Up Friction</span>
              </div>
            </div>
          </div>

          {/* Interactive 3D Flagship Device Stage */}
          <Samsung3DHeroStage soundEnabled={soundEnabled} />
        </section>

        {/* Samsung Galaxy-Style Intelligence Bento Grid */}
        <SamsungIntelligenceSection />

        {/* 3D Interactive Workflow Studio */}
        <Samsung3DWorkflowStudio soundEnabled={soundEnabled} />

        {/* Flagship Media Showcase */}
        <SamsungMediaShowcase soundEnabled={soundEnabled} />

        {/* Why Switch: The Flagship Advantage */}
        <SamsungComparisonSection />

        {/* Speed & Benchmarks */}
        <SamsungBenchmarksSection soundEnabled={soundEnabled} />

        {/* Download Hub */}
        <section className="section-container" id="download">
          <div className="samsung-download-card glass-card-3d">
            <div className="samsung-sparkle-pill">
              <Icon name="sparkleGalaxy" size={13} className="sparkle-icon" />
              <span>OFFICIAL FLAGSHIP RELEASE</span>
            </div>
            <h2 className="title-samsung-flagship">Get PDFCatalyst {currentVersion}</h2>
            <p className="subtitle-samsung">
              Free forever for personal, academic, and business use. No registration required.
            </p>

            <div className="download-grid-twin">
              <TiltCard className="dl-card primary glass-panel-3d" maxTilt={8}>
                <div className="dl-card-content">
                  <div className="dl-card-tag">RECOMMENDED</div>
                  <strong className="dl-card-title">Windows Installer</strong>
                  <span className="dl-card-meta">{currentVersion} • x64 • {installerSize}</span>
                  <p className="dl-card-desc">Automatic shortcuts, start menu integration, and file associations.</p>
                </div>
                <a href={installerUrl} className="btn-dl-action" target="_blank" rel="noopener noreferrer">
                  <span>Download Installer</span>
                  <Icon name="download" size={15} />
                </a>
              </TiltCard>

              <TiltCard className="dl-card glass-panel-3d" maxTilt={8}>
                <div className="dl-card-content">
                  <div className="dl-card-tag">PORTABLE</div>
                  <strong className="dl-card-title">Standalone Portable</strong>
                  <span className="dl-card-meta">{currentVersion} • Portable • {portableSize}</span>
                  <p className="dl-card-desc">Run directly from any folder or USB drive with zero admin permissions required.</p>
                </div>
                <a href={portableUrl} className="btn-dl-action secondary" target="_blank" rel="noopener noreferrer">
                  <span>Download Portable</span>
                  <Icon name="download" size={15} />
                </a>
              </TiltCard>
            </div>

            <div className="samsung-winget-bar glass-panel-3d">
              <span className="winget-label">Or install via Windows Package Manager:</span>
              <div className="winget-command-row">
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

            <div className="sha-checksum-row">
              <span className="sha-title">SHA-256 Checksum:</span>
              <code>{installerSha}</code>
            </div>
          </div>
        </section>

        {/* Creator Profile */}
        <section className="section-container">
          <TiltCard className="samsung-creator-card glass-card-3d" maxTilt={6}>
            <div className="creator-text-col">
              <div className="samsung-sparkle-pill">
                <Icon name="sparkleGalaxy" size={12} className="sparkle-icon" />
                <span>CREATOR & MAINTAINER</span>
              </div>
              <h3 className="creator-title">Sarthak Saxena</h3>
              <p className="creator-bio">
                Building fast, private, and dependable desktop software that respects your personal data and gives you back full control over your documents.
              </p>
              <div className="creator-pill-row">
                <span className="glass-pill"><Icon name="shield" size={13} /> 100% On-Device Privacy</span>
                <span className="glass-pill"><Icon name="check" size={13} /> Open Source (MIT / Apache-2.0)</span>
              </div>
            </div>
            <div className="creator-avatar-wrap">
              <img src="/pdfix-logo.png" alt="PDFCatalyst Logo" width="80" height="80" />
            </div>
          </TiltCard>
        </section>

        {/* Frequently Asked Questions */}
        <section className="section-container" id="faq">
          <div className="section-head-minimal">
            <div className="samsung-sparkle-pill">
              <Icon name="sparkleGalaxy" size={13} className="sparkle-icon" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="title-samsung-flagship">Common questions, answered simply.</h2>
          </div>

          <div className="faq-glass-stack">
            {faqs.map((faq, i) => (
              <div className={`faq-glass-card glass-card-3d ${activeFaq === i ? "open" : ""}`} key={i}>
                <button className="faq-glass-btn" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-glass-icon">{activeFaq === i ? "−" : "+"}</span>
                </button>
                {activeFaq === i && (
                  <div className="faq-glass-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Samsung-Style Ultra-Premium Footer */}
      <footer className="samsung-footer glass-footer-3d">
        <div className="footer-content-wrap">
          <div className="footer-main-brand">
            <div className="brand-logo-gem">
              <img src="/pdfix-logo.png" alt="PDFCatalyst" width="22" height="22" />
            </div>
            <span className="brand-text">PDFCatalyst</span>
            <p className="brand-motto">
              The fast, private PDF editor that respects your privacy. 100% on-device.
            </p>
            <div className="footer-status-pill glass-pill">
              <span className="pulse-beacon-blue" />
              <span>Air-Gapped & Offline Architecture</span>
            </div>
          </div>

          <div className="footer-column-links">
            <div className="f-col">
              <strong>EXPLORE</strong>
              <a href="#overview">Overview</a>
              <a href="#intelligence">Intelligence</a>
              <a href="#studio">3D Studio</a>
              <a href="#showcase">Showcase</a>
              <a href="#why-switch">Why Switch</a>
              <a href="#performance">Speed Metrics</a>
            </div>
            <div className="f-col">
              <strong>DOWNLOAD</strong>
              <a href={installerUrl} target="_blank" rel="noopener noreferrer">Windows Installer ({currentVersion})</a>
              <a href={portableUrl} target="_blank" rel="noopener noreferrer">Portable Executable ({currentVersion})</a>
              <a href="https://github.com/SarthAyush/PDFcatalyst-App" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
              <button className="link-clean-btn" onClick={() => setCommandOpen(true)}>Search Menu (⌘K)</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-copyright">
          <span>Copyright © {new Date().getFullYear()} PDFCatalyst. Created by Sarthak Saxena.</span>
          <span>Open Source under MIT / Apache-2.0</span>
        </div>
      </footer>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={setCommandOpen}
        installerUrl={installerUrl}
        portableUrl={portableUrl}
      />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
