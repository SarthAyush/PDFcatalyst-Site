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

function Icon({ name, size = 18, stroke = 1.8, className = "" }) {
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
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    chevronRight: <path d="m9 18 6-6-6-6" />,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ),
    moon: <path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />,
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m7 10 5 5 5-5" />
        <path d="M12 15V3" />
      </>
    ),
    github: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h8" />
      </>
    ),
    layers: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5z" />
        <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
      </>
    ),
    pen: (
      <>
        <path d="m18 2 4 4L8 20l-5 1 1-5L18 2z" />
        <path d="m14.5 5.5 4 4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
        <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    x: <path d="m18 6-12 12M6 6l12 12" />,
    terminal: (
      <>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </>
    ),
    cpu: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
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
    copy: (
      <>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    sliders: (
      <>
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </>
    ),
    ruler: (
      <>
        <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0l12.6 12.6z" />
        <path d="m14.5 12.5 2-2" />
        <path d="m11.5 9.5 2-2" />
        <path d="m8.5 6.5 2-2" />
      </>
    ),
    tree: (
      <>
        <path d="M12 2v20" />
        <path d="M12 7h5a3 3 0 0 1 0 6H7a3 3 0 0 0 0 6h5" />
      </>
    ),
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    refresh: (
      <>
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 21h5v-5" />
      </>
    ),
    tag: (
      <>
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <circle cx="7" cy="7" r="1.5" />
      </>
    ),
    external: (
      <>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </>
    ),
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    windows: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
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

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return "";
  const diffSec = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diffSec < 60) return "Just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 86400 * 30) return `${Math.floor(diffSec / 86400)}d ago`;
  return formatDate(dateStr);
}

const DEFAULT_RELEASE = {
  tag_name: "v1.0.0",
  name: "PDFcatalyst v1.0.0 — Pure Rust Architecture",
  published_at: "2026-10-16T11:41:07Z",
  html_url: "https://github.com/SarthAyush/PDFcatalyst-App/releases/tag/v1.0.0",
  body: `### What's New in PDFCatalyst v1.0.0
- **Pure Rust Core Engine**: Clean-room ISO 32000-2 parser with \`forbid(unsafe_code)\` memory safety guarantees.
- **Hardware Acceleration**: 60+ FPS vector rendering via \`wgpu\` and OpenGL fallback for smooth pan and zoom.
- **Deep Structural Redaction**: Irreversible byte-level object stream and font subroutine purging.
- **Model Context Protocol (MCP)**: Native integration for AI agents (Claude Desktop, Cursor) without uploading files.
- **Embedded Offline OCR**: Local neural character recognition running 100% on-device.
- **Atomic File Transactions**: Zero file corruption on system crash or sudden power loss.`,
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
      if (!res.ok) {
        throw new Error(`GitHub API returned status ${res.status}`);
      }
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
      console.warn("Using fallback/cached release data:", err);
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

/* ==========================================================================
   Live Simulated Desktop Workbench Window (Figma/Zed Quality)
   ========================================================================== */
function LivePdfEditor() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, [paused]);

  const stepLabels = [
    "Highlighting Text Stream",
    "Digital PKI Signature",
    "Structural Byte Redaction",
    "Atomic Verified Save",
  ];

  return (
    <div className="live-editor-shell">
      <div className="live-editor-glow-aura" />
      <div className="live-editor-window">
        {/* Native Desktop Title Bar */}
        <div className="live-title-bar">
          <div className="traffic-lights">
            <span className="light red" title="Close" />
            <span className="light yellow" title="Minimize" />
            <span className="light green" title="Maximize" />
          </div>
          <div className="live-title-center">
            <img src="/pdfix-logo.png" alt="" width="16" height="16" className="title-logo" />
            <span className="title-filename">PDFCatalyst — License_Agreement_2026.pdf</span>
            <span className="title-badge-clean">ISO 32000-2</span>
          </div>
          <div className="live-header-metrics">
            <span className="metric-tag"><Icon name="activity" size={11} /> 60.0 FPS</span>
            <span className="metric-tag"><Icon name="cpu" size={11} /> 14.2 MB RAM</span>
            <span className="live-rec-pill">
              <span className="live-rec-dot" /> LIVE
            </span>
          </div>
        </div>

        {/* Workbench Application Ribbon */}
        <div className="live-workbench-ribbon">
          <div className="ribbon-group">
            <button className={`ribbon-tool ${step === 0 ? "active" : ""}`} onClick={() => setStep(0)}>
              <Icon name="pen" size={13} /> <span>Highlight</span>
            </button>
            <button className={`ribbon-tool ${step === 1 ? "active" : ""}`} onClick={() => setStep(1)}>
              <Icon name="shield" size={13} /> <span>Sign PKI</span>
            </button>
            <button className={`ribbon-tool ${step === 2 ? "active" : ""}`} onClick={() => setStep(2)}>
              <Icon name="lock" size={13} /> <span>Redact</span>
            </button>
            <button className={`ribbon-tool ${step === 3 ? "active" : ""}`} onClick={() => setStep(3)}>
              <Icon name="check" size={13} /> <span>Atomic Save</span>
            </button>
          </div>
          <div className="ribbon-divider" />
          <div className="ribbon-group secondary">
            <button className="ribbon-tool icon-only" title="Full-text Search"><Icon name="search" size={13} /></button>
            <button className="ribbon-tool icon-only" title="Measurement Tool"><Icon name="ruler" size={13} /></button>
            <button className="ribbon-tool icon-only" title="Batch Studio"><Icon name="layers" size={13} /></button>
            <span className="ribbon-zoom">100%</span>
          </div>
        </div>

        {/* Editor Main Layout */}
        <div className="live-editor-body">
          {/* Left Thumbnails Rail */}
          <aside className="live-thumbnails-rail">
            <div className="thumb-header">PAGES (3)</div>
            <div
              className={`thumb-card ${activeThumb === 0 ? "active" : ""}`}
              onClick={() => setActiveThumb(0)}
            >
              <div className="thumb-mini-page">
                <div className="thumb-skeleton line-title" />
                <div className="thumb-skeleton line-text" />
                <div className="thumb-skeleton line-text" />
                <div className="thumb-skeleton line-short" />
              </div>
              <span className="thumb-num">1</span>
            </div>
            <div
              className={`thumb-card ${activeThumb === 1 ? "active" : ""}`}
              onClick={() => setActiveThumb(1)}
            >
              <div className="thumb-mini-page">
                <div className="thumb-skeleton line-text" />
                <div className="thumb-skeleton line-text" />
                <div className="thumb-skeleton line-text" />
              </div>
              <span className="thumb-num">2</span>
            </div>
            <div
              className={`thumb-card ${activeThumb === 2 ? "active" : ""}`}
              onClick={() => setActiveThumb(2)}
            >
              <div className="thumb-mini-page">
                <div className="thumb-skeleton line-text" />
                <div className="thumb-skeleton line-short" />
              </div>
              <span className="thumb-num">3</span>
            </div>
          </aside>

          {/* Document Stage */}
          <div className="live-canvas-stage">
            <div className="live-doc-paper">
              {/* Animated Floating Cursor */}
              <div className={`live-cursor pos-step-${step}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3l7 18 3.5-7.5L21 10 3 3z"
                    fill="#2997ff"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="cursor-label">{stepLabels[step]}</span>
              </div>

              <div className="doc-page-header">
                <span className="doc-num">ISO 32000-2 COMPLIANT · SPEC v1.0.0</span>
                <span className="doc-tag">STRICT AIR-GAPPED</span>
              </div>

              <h4 className="doc-main-heading">MUTUAL SOFTWARE LICENSE & RIGHTS</h4>

              <p className="doc-paragraph">
                1. <strong>Document Architecture.</strong> This specification governs the implementation of
                memory-safe document workflows and atomic multi-file batch operations under pure Rust memory guarantees.
              </p>

              {/* Step 0: Highlighting Line */}
              <div className="doc-interactive-line highlight-target">
                <span className={`highlight-sweep ${step >= 0 ? "active" : ""}`} />
                <p className="doc-paragraph target-text">
                  2. <strong>License Grant.</strong> Author grants an irrevocable, perpetual, royalty-free
                  open-source license under Dual MIT and Apache-2.0 protocols.
                </p>
                {step === 0 && <span className="action-tag gold">✓ Appearance Stream Generated (0ms)</span>}
              </div>

              {/* Step 2: Redaction Line */}
              <div className="doc-interactive-line redact-target-line">
                <p className="doc-paragraph">
                  3. <strong>Identity & SSN ID:</strong>{" "}
                  <span className={`redact-box-wipe ${step >= 2 ? "purged" : "exposed"}`}>
                    {step >= 2 ? "█████████████" : "SSN: 948-21-0814"}
                  </span>
                  {step >= 2 && <span className="action-tag red">🛡️ Stream Purged: 0x00 token (0 bytes remain)</span>}
                </p>
              </div>

              {/* Step 1: Digital Signature Line */}
              <div className="doc-interactive-line signature-target-line">
                <div className="sig-label">4. Authorized Cryptographic Signature:</div>
                <div className={`sig-seal-drop ${step >= 1 ? "stamped" : ""}`}>
                  <div className="sig-handwriting">Sarthak Saxena</div>
                  <div className="sig-verified-badge">
                    <Icon name="check" size={11} /> PKI X.509 Cryptographic Timestamp Verified · RSA-4096
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Status & Controller Bar */}
        <div className="live-status-bar">
          <div className="status-message">
            <span className="status-pulse" />
            {step === 0 && <span>Highlighter: Constructing appearance stream & matrix transform with zero latency</span>}
            {step === 1 && <span>PKI Crypto Engine: Applying digital signature seal with verified X.509 timestamp</span>}
            {step === 2 && <span>Redact Engine: Deep byte destruction, font subroutine stripping & XREF table repair</span>}
            {step === 3 && <span>Atomic Save: Written to local SSD in 4ms with CRC32 integrity verification</span>}
          </div>
          <div className="live-step-pills">
            {["Highlight", "Sign", "Redact", "Save"].map((label, s) => (
              <button
                key={s}
                className={`step-pill-btn ${step === s ? "current" : ""}`}
                onClick={() => setStep(s)}
                aria-label={`Jump to step: ${label}`}
              >
                <span className="dot-mini" /> {label}
              </button>
            ))}
            <button
              className="pause-btn"
              onClick={() => setPaused(!paused)}
              title={paused ? "Resume Animation" : "Pause Animation"}
            >
              {paused ? "▶" : "❚❚"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Bento Grid Feature Visual Components
   ========================================================================== */
function BentoVisual({ type }) {
  if (type === "wgpu") {
    return (
      <div className="bento-vis bento-vis-wgpu">
        <div className="wgpu-meter">
          <div className="wgpu-metric">
            <span className="wgpu-num">60.2</span>
            <span className="wgpu-unit">FPS</span>
          </div>
          <div className="wgpu-stats">
            <span>Latency: <strong>0.38ms</strong></span>
            <span>Frames: <strong>Zero Drop</strong></span>
          </div>
        </div>
        <div className="wgpu-graph">
          <div className="wgpu-bar h-80" />
          <div className="wgpu-bar h-95" />
          <div className="wgpu-bar h-90" />
          <div className="wgpu-bar h-100 active" />
          <div className="wgpu-bar h-95" />
          <div className="wgpu-bar h-90" />
          <div className="wgpu-bar h-100" />
        </div>
        <span className="bento-vis-caption">Direct GPU Compute & Vector Rasterizer</span>
      </div>
    );
  }

  if (type === "offline") {
    return (
      <div className="bento-vis bento-vis-offline">
        <div className="offline-radar">
          <div className="radar-circle c1" />
          <div className="radar-circle c2" />
          <div className="radar-circle c3" />
          <div className="radar-core">
            <Icon name="shield" size={18} />
          </div>
        </div>
        <div className="offline-tags">
          <span className="tag-safe">✓ LOCAL MEMORY ISOLATION</span>
          <span className="tag-block">✕ NETWORK EGRESS: 0 KB/s</span>
        </div>
      </div>
    );
  }

  if (type === "redact") {
    return (
      <div className="bento-vis bento-vis-redact">
        <div className="hex-diff-stream">
          <div className="hex-row before">
            <span className="hex-addr">0x04F0:</span>
            <span className="hex-bytes bad">53 53 4E 3A 39 34 38</span>
            <span className="hex-ascii">"SSN:948"</span>
          </div>
          <div className="hex-arrow">↓ PURGED TO STRUCTURAL NULL ↓</div>
          <div className="hex-row after">
            <span className="hex-addr">0x04F0:</span>
            <span className="hex-bytes good">00 00 00 00 00 00 00</span>
            <span className="hex-ascii">[PURGED]</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "mcp") {
    return (
      <div className="bento-vis bento-vis-mcp">
        <div className="mcp-nodes">
          <div className="mcp-node ai">
            <Icon name="bot" size={15} />
            <span>Claude / Cursor</span>
          </div>
          <div className="mcp-pipe">
            <div className="packet" />
            <span className="pipe-label">stdio JSON-RPC</span>
          </div>
          <div className="mcp-node rust">
            <Icon name="terminal" size={15} />
            <span>PDFCatalyst MCP</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "batch") {
    return (
      <div className="bento-vis bento-vis-batch">
        <div className="batch-micro-queue">
          <div className="queue-item done"><span>doc_01.pdf</span> <span className="kb">1.4 MB ✓</span></div>
          <div className="queue-item done"><span>doc_02.pdf</span> <span className="kb">2.8 MB ✓</span></div>
          <div className="queue-item processing"><span>doc_03.pdf</span> <span className="spin">⚡ 340ms</span></div>
        </div>
        <div className="batch-progress-bar">
          <div className="batch-progress-fill" style={{ width: "88%" }} />
        </div>
      </div>
    );
  }

  if (type === "ocr") {
    return (
      <div className="bento-vis bento-vis-ocr">
        <div className="ocr-stage">
          <div className="ocr-laser" />
          <div className="ocr-text-lines">
            <span className="line recognized">ACCOUNTS PAYABLE INVOICE</span>
            <span className="line recognized">SUBTOTAL: $14,250.00 USD</span>
            <span className="line scanning">TAX (8.25%): $1,175.62</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const bentoFeatures = [
  {
    tag: "HARDWARE ENGINE",
    title: "wgpu Vector Acceleration",
    desc: "Ultra-fluid vector rendering pipeline with hardware GPU compute and OpenGL fallback. Smooth pan and 800% zoom with zero lag.",
    badge: "Native 60+ FPS",
    visType: "wgpu",
  },
  {
    tag: "PRIVACY & SECURITY",
    title: "100% Offline & Air-Gapped",
    desc: "No accounts. No telemetry. Zero network egress. Your contracts, medical records, and financial PDFs never leave local RAM.",
    badge: "Zero Tracking",
    visType: "offline",
  },
  {
    tag: "SECURITY STANDARDS",
    title: "Deep Structural Redaction",
    desc: "True object stream destruction. Unlike basic black box covers, PDFCatalyst purges raw text tokens, font subroutines, and metadata irreversibly.",
    badge: "0x00 Purge",
    visType: "redact",
  },
  {
    tag: "AI & AUTOMATION",
    title: "Native AI MCP Server",
    desc: "Embedded Model Context Protocol server. Connect Claude Desktop, Cursor, and agent pipelines to inspect, edit, and sign local PDFs programmatically.",
    badge: "MCP Ready",
    visType: "mcp",
  },
  {
    tag: "PARALLEL PIPELINES",
    title: "Batch Workflow Studio",
    desc: "Process dozens of documents concurrently using Rayon multi-threading. Merge, split, compress, watermark, and convert files in sub-seconds.",
    badge: "Multi-Threaded",
    visType: "batch",
  },
  {
    tag: "INTELLIGENCE",
    title: "Embedded Neural OCR",
    desc: "Local machine optical character recognition running entirely on your CPU/GPU. Transform image scans into searchable, selectable PDF text.",
    badge: "100% On-Device",
    visType: "ocr",
  },
];

const cratesList = [
  { name: "apps/pdfcraft", type: "Native Desktop GUI", info: "Multi-tab egui & wgpu shell for Windows, macOS, Linux" },
  { name: "apps/pdfcraft-cli", type: "Headless CLI & MCP", info: "Command runner and embedded AI agent Model Context Protocol server" },
  { name: "crates/cos", type: "PDF Low-Level Syntax", info: "ISO 32000-2 clean-room parser and object xref stream decoder" },
  { name: "crates/render", type: "Hardware Rasterizer", info: "DisplayList vector and typography font rasterization engine" },
  { name: "crates/crypt", type: "Security Handler", info: "Standard security handlers, permissions & AES-256 decryption" },
  { name: "crates/sign", type: "PKI Digital Crypto", info: "X.509 certificate signatures & cryptographic timestamps" },
  { name: "crates/ocr", type: "Local Neural Engine", info: "Offline optical character recognition without external runtime dependencies" },
  { name: "crates/redact", type: "Sanitization Engine", info: "Irreversible deep structural stream and font map destruction" },
];

const comparisonSpecs = [
  {
    item: "License & Pricing",
    pdfix: "100% Free · Dual MIT / Apache 2.0",
    acrobat: "$239.88 / year subscription",
    cloud: "Per-file fees & usage limits",
  },
  {
    item: "Data Privacy & Telemetry",
    pdfix: "100% On-Device · Zero telemetry",
    acrobat: "Cloud upload sync · User tracking",
    cloud: "Files uploaded to third-party servers",
  },
  {
    item: "Memory Safety Architecture",
    pdfix: "Pure Rust (forbid(unsafe_code))",
    acrobat: "Legacy C++ codebase (buffer risks)",
    cloud: "WebAssembly sandbox constraints",
  },
  {
    item: "AI Model Context Protocol",
    pdfix: "Native Built-in MCP Server (Claude & Cursor)",
    acrobat: "Restricted Enterprise SDK only",
    cloud: "Not supported",
  },
  {
    item: "Structural Redaction Quality",
    pdfix: "Irreversible byte-level stream purge",
    acrobat: "Manual tool · Risk of token leaks",
    cloud: "Visual black overlay only (extractable)",
  },
  {
    item: "Crash & Power Loss Safety",
    pdfix: "Atomic verified writes (zero corruption)",
    acrobat: "Can corrupt open files on crash",
    cloud: "Browser tab timeout / loss",
  },
  {
    item: "Offline Operation",
    pdfix: "Full functionality without internet",
    acrobat: "Periodic Adobe ID login checks",
    cloud: "Requires continuous internet connection",
  },
];

/* ==========================================================================
   Changelog Modal Component
   ========================================================================== */
function ChangelogModal({ release, releases, onClose, onSelectRelease }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const defaultHighlights = [
    { title: "Pure Rust Core Parser", desc: "Engineered to ISO 32000-2 specifications. Free of C/C++ memory vulnerabilities." },
    { title: "Hardware wgpu Acceleration", desc: "Native 60+ FPS vector rendering pipeline with automatic OpenGL fallback." },
    { title: "Deep Structural Redaction", desc: "Irreversible purging of raw content bytes, font subroutines, and XREF entries." },
    { title: "Model Context Protocol (MCP)", desc: "Direct headless AI integration for Claude Desktop and Cursor without cloud uploads." },
    { title: "On-Device Neural OCR", desc: "Offline character recognition running strictly on local CPU/GPU." },
    { title: "Atomic File Transactions", desc: "Never corrupts open documents on crash, writing verified state atomically to disk." },
  ];

  const hasDetailedBody =
    release.body && release.body.length > 80 && !release.body.startsWith("**Full Changelog**");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-brand-tag">
            <img src="/pdfix-logo.png" alt="" width="26" height="26" />
            <div className="modal-tag-meta">
              <div className="modal-tag-row">
                <span className="modal-version-pill">{release.tag_name}</span>
                <span className="modal-sync-indicator">
                  <span className="status-pulse" /> Live Synced
                </span>
              </div>
              <span className="modal-date">Published {formatDate(release.published_at)}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-title-row">
            <h3 className="modal-title">
              {release.name ? release.name.replace(/PDFix/gi, "PDFCatalyst") : `PDFCatalyst ${release.tag_name}`}
            </h3>
          </div>

          <div className="modal-section-title">Highlights in this update:</div>

          {hasDetailedBody ? (
            <div className="modal-body-markdown">
              <pre className="markdown-pre">{release.body}</pre>
            </div>
          ) : (
            <div className="modal-highlights-grid">
              {defaultHighlights.map((h, i) => (
                <div key={i} className="highlight-item">
                  <div className="highlight-icon-box">
                    <Icon name="check" size={13} />
                  </div>
                  <div className="highlight-text">
                    <strong>{h.title}</strong>
                    <p>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="modal-section-title">Verified Release Binaries:</div>
          <div className="modal-assets-grid">
            {release.assets?.map((asset, i) => (
              <a
                key={i}
                href={asset.browser_download_url}
                className="modal-asset-card"
                download
              >
                <div className="asset-icon-ring">
                  <Icon name="download" size={16} />
                </div>
                <div className="asset-info">
                  <span className="asset-name">{asset.name}</span>
                  <div className="asset-meta">
                    <span>{formatBytes(asset.size)}</span>
                    <span>•</span>
                    <span>{asset.download_count} downloads</span>
                  </div>
                </div>
                <Icon name="chevronRight" size={15} />
              </a>
            ))}
          </div>

          {releases.length > 1 && (
            <div className="modal-version-history">
              <div className="modal-section-title">Release History:</div>
              <div className="version-history-pills">
                {releases.map((r, i) => (
                  <button
                    key={i}
                    className={`version-history-pill ${r.tag_name === release.tag_name ? "active" : ""}`}
                    onClick={() => onSelectRelease(r)}
                  >
                    <Icon name="tag" size={11} /> {r.tag_name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <span className="modal-footer-note">
            Official PDFCatalyst Release Stream · SHA-256 Verified
          </span>
          <button className="btn-apple-primary small" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Main Application Root
   ========================================================================== */
function App() {
  const { releases, latestRelease, isLoading, lastSynced, syncStatus, refresh } =
    useGitHubReleases();
  const [showChangelogModal, setShowChangelogModal] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [labTab, setLabTab] = useState("redact");
  const [cliTab, setCliTab] = useState("mcp");
  const [downloadTab, setDownloadTab] = useState("installer");
  const [redactedState, setRedactedState] = useState(true);
  const [batchActive, setBatchActive] = useState(false);
  const [batchFinished, setBatchFinished] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [blueprintScale, setBlueprintScale] = useState("1/4");
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
  const portableSha = portableAsset?.digest
    ? portableAsset.digest.replace(/^sha256:/i, "")
    : SHA256_PORTABLE;
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

  // OS Detection
  useEffect(() => {
    try {
      const ua = navigator.userAgent;
      if (ua.includes("Win")) setDetectedOs("Windows x64");
      else if (ua.includes("Mac")) setDetectedOs("macOS");
      else if (ua.includes("Linux")) setDetectedOs("Linux");
    } catch {}
  }, []);

  // Spotlight mouse effect on cards
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll(
        ".bento-card, .crate-glass-card, .glass-updates-hub, .glass-lab-box, .glass-terminal-card, .glass-creator-card"
      );
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const triggerBatch = () => {
    if (batchActive) return;
    setBatchActive(true);
    setBatchFinished(false);
    setTimeout(() => {
      setBatchActive(false);
      setBatchFinished(true);
    }, 700);
  };

  const faqs = [
    {
      q: "Is PDFCatalyst truly open source and free?",
      a: "Yes. Dual-licensed under MIT and Apache-2.0. Completely free for personal, commercial, and enterprise production with zero subscriptions or hidden tiers.",
    },
    {
      q: "How does PDFCatalyst ensure my data never leaks?",
      a: "All document parsing, rendering, OCR, signing, and file saving occur strictly in local RAM and disk. Zero telemetry, zero analytics, zero external network sockets.",
    },
    {
      q: "What is the built-in AI Model Context Protocol (MCP) server?",
      a: "PDFCatalyst includes an embedded MCP server. AI assistants like Claude Desktop and Cursor can inspect and edit local PDFs via JSON-RPC stdio without cloud uploads.",
    },
    {
      q: "Installer vs Standalone Portable?",
      a: "The Windows Installer (~19 MB) sets up file associations and desktop shortcuts. The Portable .exe (~67 MB) runs standalone from any folder or USB without administrator privileges.",
    },
    {
      q: "How does true redaction differ from regular black boxes?",
      a: "Common PDF viewers merely draw an opaque rectangle while keeping the underlying text tokens in the stream. PDFCatalyst purges raw stream bytes, XREF entries, and font maps irreversibly.",
    },
    {
      q: "Can I run PDFCatalyst on macOS and Linux?",
      a: "Yes! While prebuilt Windows binaries are provided via the CI pipeline, the entire codebase is standard Rust and can be built on macOS and Linux using `cargo build --release`.",
    },
  ];

  return (
    <div className="apple-shell">
      {/* Background Atmosphere Lighting & Engineering Grid */}
      <div className="bg-grid-overlay" aria-hidden="true" />
      <div className="ambient-aura aura-hero" aria-hidden="true" />
      <div className="ambient-aura aura-features" aria-hidden="true" />
      <div className="ambient-aura aura-lab" aria-hidden="true" />
      <div className="ambient-aura aura-bottom" aria-hidden="true" />

      {/* Sleek Frosted Glass Header */}
      <header className={`apple-nav ${scrolled ? "nav-blur" : ""}`}>
        <div className="nav-container">
          <a className="nav-brand" href="#top" onClick={() => setMenuOpen(false)}>
            <div className="brand-logo-wrap">
              <img src="/pdfix-logo.png" alt="PDFCatalyst Logo" width="28" height="28" />
              <div className="brand-dot-glow" />
            </div>
            <span className="brand-title">PDFCatalyst</span>
          </a>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#overview" onClick={() => setMenuOpen(false)}>Overview</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Capabilities</a>
            <a href="#updates" onClick={() => setMenuOpen(false)} className="nav-link-badge-wrap">
              What's New <span className="nav-badge-new">{currentVersion}</span>
            </a>
            <a href="#lab" onClick={() => setMenuOpen(false)}>Studio Lab</a>
            <a href="#compare" onClick={() => setMenuOpen(false)}>Compare</a>
            <a href="#developers" onClick={() => setMenuOpen(false)}>Developers & AI</a>
            <a href="#download" onClick={() => setMenuOpen(false)}>Download</a>
            <a
              href="https://github.com/SarthAyush/PDFcatalyst-App"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="nav-github-link"
            >
              <Icon name="github" size={14} /> GitHub
            </a>
            <button
              className="theme-button"
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle color theme"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={14} />
            </button>
            <a className="nav-cta" href={installerUrl} onClick={() => setMenuOpen(false)}>
              Download <Icon name="chevronRight" size={12} />
            </a>
          </nav>

          <button
            className="mobile-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={20} />
          </button>
        </div>
      </header>

      <main id="top">
        {/* Apple-Style Hero with Prominent App Icon & Name */}
        <section className="hero-section" id="overview">
          <div className="hero-content">
            {/* Top Announcement Pill */}
            <div className="hero-pill-announcement" data-reveal>
              <button
                className="announcement-pill-btn"
                onClick={() => setShowChangelogModal(true)}
              >
                <span className="live-pulse-dot" />
                <span className="announcement-tag">CONTINUOUS DELIVERY</span>
                <span className="announcement-sep">•</span>
                <span className="announcement-text">{currentVersion} is Live</span>
                <Icon name="chevronRight" size={12} />
              </button>
            </div>

            {/* Prominent App Name & Icon at the Top of Home Visual */}
            <div className="hero-app-brand-banner" data-reveal>
              <div className="hero-app-icon-ring">
                <img src="/pdfix-logo.png" alt="PDFCatalyst Icon" width="88" height="88" className="hero-app-logo" />
                <div className="icon-pulse-glow" />
              </div>
              <div className="hero-app-text-group">
                <div className="hero-app-name-row">
                  <h2 className="hero-app-name">PDFCatalyst</h2>
                  <span className="hero-app-version">{currentVersion}</span>
                  <span className="live-synced-badge" title="Continuous Delivery Stream">
                    <span className="pulse-dot green" /> Synced
                  </span>
                </div>
                <span className="hero-app-sub">The Pure Rust PDF Workbench</span>
              </div>
              <button
                className="btn-hero-whatsnew"
                onClick={() => setShowChangelogModal(true)}
                title="See what's new in this release"
              >
                ✨ What's New <Icon name="chevronRight" size={12} />
              </button>
            </div>

            <h1 className="hero-headline" data-reveal>
              Pro capability.
              <br />
              <span className="shimmer-text">Zero cloud.</span>
            </h1>
            <p className="hero-subhead" data-reveal>
              The high-performance PDF workbench engineered from the ground up in pure, memory-safe Rust.
              Read, edit, sign, batch process, and structurally redact documents. Blazing fast. 100% offline.
            </p>

            <div className="hero-cta-group" data-reveal>
              <a className="btn-apple-primary hero-main-btn" href={installerUrl}>
                <Icon name="download" size={17} /> Download for {detectedOs}
              </a>
              <button className="btn-apple-glass" onClick={() => setShowChangelogModal(true)}>
                What's New in {currentVersion} <Icon name="spark" size={14} />
              </button>
              <a className="btn-apple-quiet" href="#features">
                Explore Capabilities <Icon name="chevronRight" size={13} />
              </a>
            </div>

            {/* System Auto-Detection & Trust Banner */}
            <div className="hero-system-detect-note" data-reveal>
              <span>⚡ Detected {detectedOs}</span>
              <span className="divider">•</span>
              <span>19.9 MB Installer</span>
              <span className="divider">•</span>
              <span>No Admin Required for Portable</span>
            </div>

            <div className="hero-spec-strip" data-reveal>
              <span><Icon name="shield" size={14} /> Local-first Privacy</span>
              <span className="divider">•</span>
              <span><Icon name="cpu" size={14} /> wgpu Vector Acceleration</span>
              <span className="divider">•</span>
              <span><Icon name="bot" size={14} /> Native AI MCP Server</span>
              <span className="divider">•</span>
              <span>Dual MIT / Apache 2.0</span>
            </div>
          </div>

          {/* Live Animation of Native PDF Editor Desktop Window */}
          <div className="hero-window-wrap" data-reveal>
            <LivePdfEditor />
          </div>
        </section>

        {/* Bento Grid with Live Visual Micro-Demos */}
        <section className="bento-section" id="features">
          <div className="section-header" data-reveal>
            <span className="section-eyebrow">CAPABILITIES</span>
            <h2 className="section-title">Engineered to outperform.</h2>
            <p className="section-desc">
              Every professional document workflow unified in a single, memory-safe architecture.
            </p>
          </div>

          <div className="bento-grid">
            {bentoFeatures.map((f, i) => (
              <div className="bento-card" key={i} data-reveal>
                <div className="bento-card-top">
                  <span className="bento-tag">{f.tag}</span>
                  <span className="bento-badge">{f.badge}</span>
                </div>
                <h3 className="bento-title">{f.title}</h3>
                <p className="bento-desc">{f.desc}</p>
                <div className="bento-card-visual-slot">
                  <BentoVisual type={f.visType} />
                </div>
                <div className="glass-glare" />
              </div>
            ))}
          </div>
        </section>

        {/* What's New & Continuous GitHub Sync Hub */}
        <section className="updates-section" id="updates">
          <div className="section-header" data-reveal>
            <div className="live-repo-badge">
              <span className="pulse-dot green" />
              <span>CONTINUOUS DELIVERY · OFFICIAL PRODUCTION STREAM</span>
            </div>
            <h2 className="section-title">What's new in {currentVersion}.</h2>
            <p className="section-desc">
              Every verified build and release update is automatically reflected here in real time.
            </p>
          </div>

          <div className="glass-updates-hub" data-reveal>
            <div className="updates-sync-bar">
              <div className="sync-status-group">
                <span className="sync-icon-circle">
                  <Icon name="refresh" size={12} />
                </span>
                <span className="sync-text">
                  {syncStatus === "fetching"
                    ? "Checking for latest updates..."
                    : lastSynced
                    ? `Live Synced ${formatRelativeTime(lastSynced)}`
                    : "Automated Release Pipeline Active"}
                </span>
                <span className="sync-divider">•</span>
                <span className="sync-release-pill">{currentVersion} Latest</span>
              </div>

              <div className="sync-actions">
                <button
                  className="sync-refresh-btn"
                  onClick={refresh}
                  disabled={isLoading}
                  title="Check for new releases now"
                >
                  <Icon name="refresh" size={13} className={isLoading ? "spin-icon" : ""} />
                  <span>Check for Updates</span>
                </button>
                <button
                  className="sync-notes-btn"
                  onClick={() => setShowChangelogModal(true)}
                >
                  <span>Full Release Notes</span>
                  <Icon name="chevronRight" size={13} />
                </button>
              </div>
            </div>

            <div className="updates-spotlight-grid">
              <div className="updates-spotlight-left">
                <div className="spotlight-badge">LATEST RELEASE</div>
                <h3 className="spotlight-title">
                  {latestRelease.name
                    ? latestRelease.name.replace(/PDFix/gi, "PDFCatalyst")
                    : `PDFCatalyst ${currentVersion}`}
                </h3>
                <p className="spotlight-desc">
                  Published on {formatDate(latestRelease.published_at)}. Rebuilt from source with ISO 32000-2 conformance,
                  deep structural stream redaction, hardware vector acceleration, and native AI Model Context Protocol.
                </p>

                <div className="spotlight-stats">
                  <div className="stat-pill">
                    <span className="stat-label">Version</span>
                    <strong>{currentVersion}</strong>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-label">Architecture</span>
                    <strong>Pure Rust</strong>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-label">Sync</span>
                    <strong className="green">Active</strong>
                  </div>
                </div>

                <div className="spotlight-cta-row">
                  <a className="btn-apple-primary" href={installerUrl}>
                    <Icon name="download" size={16} /> Download {currentVersion} ({installerSize})
                  </a>
                  <button
                    className="btn-apple-glass"
                    onClick={() => setShowChangelogModal(true)}
                  >
                    Read Changelog
                  </button>
                </div>
              </div>

              <div className="updates-spotlight-right">
                <div className="spotlight-cards-header">
                  <span>HIGHLIGHTS IN THIS UPDATE</span>
                  <span className="mono-sub">{currentVersion}</span>
                </div>

                <div className="spotlight-changelog-list">
                  <div className="change-item">
                    <div className="change-bullet green">✓</div>
                    <div className="change-content">
                      <strong>Clean-Room Rust Parser</strong>
                      <p>Full ISO 32000-2 parsing core strictly compiled with <code>forbid(unsafe_code)</code>.</p>
                    </div>
                  </div>
                  <div className="change-item">
                    <div className="change-bullet blue">✓</div>
                    <div className="change-content">
                      <strong>wgpu Vector Pipeline</strong>
                      <p>Hardware accelerated 60+ FPS multi-threaded rendering engine with zero lag.</p>
                    </div>
                  </div>
                  <div className="change-item">
                    <div className="change-bullet red">✓</div>
                    <div className="change-content">
                      <strong>Deep Structural Redaction</strong>
                      <p>Irreversible byte-level stream, XREF, and font subroutine destruction.</p>
                    </div>
                  </div>
                  <div className="change-item">
                    <div className="change-bullet purple">✓</div>
                    <div className="change-content">
                      <strong>AI Model Context Protocol (MCP)</strong>
                      <p>Native headless server for Claude Desktop, Cursor, and automated pipelines.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Studio Lab */}
        <section className="lab-section" id="lab">
          <div className="section-header" data-reveal>
            <span className="section-eyebrow">INTERACTIVE LAB</span>
            <h2 className="section-title">Experience the mechanics.</h2>
            <p className="section-desc">
              Interact with the core capabilities live directly in your browser.
            </p>
          </div>

          <div className="glass-lab-box" data-reveal>
            <div className="lab-nav-segmented">
              <button
                className={`lab-segmented-btn ${labTab === "redact" ? "active" : ""}`}
                onClick={() => setLabTab("redact")}
              >
                <Icon name="shield" size={15} /> <span>True Redaction</span>
              </button>
              <button
                className={`lab-segmented-btn ${labTab === "cos" ? "active" : ""}`}
                onClick={() => setLabTab("cos")}
              >
                <Icon name="tree" size={15} /> <span>COS Syntax Tree</span>
              </button>
              <button
                className={`lab-segmented-btn ${labTab === "batch" ? "active" : ""}`}
                onClick={() => setLabTab("batch")}
              >
                <Icon name="layers" size={15} /> <span>Batch Studio</span>
              </button>
              <button
                className={`lab-segmented-btn ${labTab === "measure" ? "active" : ""}`}
                onClick={() => setLabTab("measure")}
              >
                <Icon name="ruler" size={15} /> <span>Blueprint Scale</span>
              </button>
            </div>

            <div className="lab-body">
              {labTab === "redact" && (
                <div className="lab-pane redact-pane">
                  <div className="pane-switcher">
                    <span className="mode-lbl">MODE:</span>
                    <button
                      className={`switch-btn ${redactedState ? "active" : ""}`}
                      onClick={() => setRedactedState(true)}
                    >
                      <span className="dot green" /> PDFCatalyst Structural Purge
                    </button>
                    <button
                      className={`switch-btn danger ${!redactedState ? "active" : ""}`}
                      onClick={() => setRedactedState(false)}
                    >
                      <span className="dot red" /> Flawed Black Box Overlay
                    </button>
                  </div>
                  <div className="redact-card-grid">
                    <div className="doc-view">
                      <div className="doc-watermark">CONFIDENTIAL RECORD</div>
                      <p>Patient Name: <strong>Jane Doe</strong></p>
                      <p>
                        Social Security:{" "}
                        <span className={`redact-token ${redactedState ? "purged" : "leaked"}`}>
                          {redactedState ? "███████████" : "382-91-4402"}
                        </span>
                      </p>
                      <p>
                        Diagnosis:{" "}
                        <span className={`redact-token ${redactedState ? "purged" : "leaked"}`}>
                          {redactedState ? "██████████████████" : "Aortic Insufficiency"}
                        </span>
                      </p>
                      <div className="doc-test-action">
                        <button
                          className="btn-clipboard-test"
                          onClick={() => {
                            if (redactedState) {
                              copy("", "test-redact");
                              alert("🛡️ PROTECTED: 0 bytes recovered. Text tokens are physically purged from the PDF stream!");
                            } else {
                              copy("382-91-4402 - Aortic Insufficiency", "test-redact");
                              alert("⚠️ LEAK DETECTED: '382-91-4402' copied from underlying stream! Standard viewers only cover text visually.");
                            }
                          }}
                        >
                          <Icon name="copy" size={13} /> {copiedId === "test-redact" ? "Tested!" : "Test Clipboard Copy"}
                        </button>
                      </div>
                    </div>
                    <div className="analysis-view">
                      <h4>{redactedState ? "✓ Structural Stream Purged" : "⚠️ Raw Text Extractable in Stream"}</h4>
                      <p>
                        {redactedState
                          ? "Content stream bytes are replaced with null tokens, font subroutines unmapped, and XREF tables cleanly rebuilt. Copying text produces nothing."
                          : "Traditional editors draw an opaque rectangle overlay while the underlying stream operators remain in the PDF file."}
                      </p>
                      <div className="byte-indicator">
                        Status: <code>{redactedState ? "PURGED (0x00)" : "EXTRACTABLE (0x333832...)"}</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {labTab === "cos" && (
                <div className="lab-pane cos-pane">
                  <div className="cos-tree-side">
                    <div className="tree-lbl">ISO 32000-2 OBJECT HIERARCHY</div>
                    <div className="node selected">📁 1 0 obj &lt;&lt; /Type /Catalog /Pages 2 0 R &gt;&gt;</div>
                    <div className="node indent-1">📁 2 0 obj &lt;&lt; /Type /Pages /Count 1 &gt;&gt;</div>
                    <div className="node indent-2">📄 3 0 obj &lt;&lt; /Type /Page /Contents 4 0 R &gt;&gt;</div>
                    <div className="node indent-3">⚡ 4 0 obj &lt;&lt; /Filter /FlateDecode &gt;&gt; stream</div>
                  </div>
                  <div className="cos-code-side">
                    <div className="code-header">
                      <span>DECODED STREAM TOKENS</span>
                      <span className="badge-rust">crates/cos</span>
                    </div>
                    <pre className="syntax-code">
{`% Clean-room ISO 32000-2 parser
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
  /ViewerPreferences << /DisplayDocTitle true >>
>>
endobj

% Hardware stream rasterizer
q
  1 0 0 1 72 720 cm
  BT
    /F1 18 Tf
    (PDFCatalyst: Pro Engineering) Tj
  ET
Q`}
                    </pre>
                  </div>
                </div>
              )}

              {labTab === "batch" && (
                <div className="lab-pane batch-pane">
                  <div className="batch-col">
                    <div className="batch-lbl">DOCUMENT QUEUE (3 FILES)</div>
                    <div className="file-chip"><Icon name="file" size={14} /> Annual_Report.pdf <span>4.2 MB</span></div>
                    <div className="file-chip"><Icon name="file" size={14} /> Invoice_Receipts.png <span>8.8 MB</span></div>
                    <div className="file-chip"><Icon name="file" size={14} /> Legal_Contract.pdf <span>1.6 MB</span></div>
                  </div>
                  <div className="batch-col controls">
                    <div className="batch-lbl">PIPELINE EXECUTION</div>
                    <div className="preset-toggle">✓ Lossless Compression (~40%)</div>
                    <div className="preset-toggle">✓ Offline OCR Scans</div>
                    <div className="preset-toggle">✓ Merge into Single Document</div>
                    <button className="btn-apple-primary full" onClick={triggerBatch}>
                      {batchActive ? "Processing Rust Stream..." : batchFinished ? "✓ Pipeline Complete in 380ms" : "Run Batch Pipeline"}
                    </button>
                    {batchFinished && (
                      <div className="batch-success-box">
                        ✓ 3 files merged into <code>bundle_optimized.pdf</code> (4.9 MB total).
                      </div>
                    )}
                  </div>
                </div>
              )}

              {labTab === "measure" && (
                <div className="lab-pane measure-pane">
                  <div className="blueprint-stage">
                    <div className="blueprint-box">
                      <div className="scale-line" />
                      <span className="scale-tag">{blueprintScale === "1/4" ? "18.4 ft" : "36.8 ft"}</span>
                    </div>
                  </div>
                  <div className="measure-side">
                    <h4>ARCHITECTURAL SCALE</h4>
                    <p>Calibrate measurements against technical blueprint title blocks:</p>
                    <div className="scale-buttons">
                      <button
                        className={`scale-btn ${blueprintScale === "1/4" ? "active" : ""}`}
                        onClick={() => setBlueprintScale("1/4")}
                      >
                        1/4" = 1'-0"
                      </button>
                      <button
                        className={`scale-btn ${blueprintScale === "1/8" ? "active" : ""}`}
                        onClick={() => setBlueprintScale("1/8")}
                      >
                        1/8" = 1'-0"
                      </button>
                    </div>
                    <div className="spec-output">
                      <div><span>Dimension:</span> <strong>{blueprintScale === "1/4" ? "18.4 ft" : "36.8 ft"}</strong></div>
                      <div><span>Perimeter:</span> <strong>{blueprintScale === "1/4" ? "73.6 ft" : "147.2 ft"}</strong></div>
                      <div><span>Floor Area:</span> <strong>{blueprintScale === "1/4" ? "338.5 sq ft" : "1,354.2 sq ft"}</strong></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Apple-Style Comparison Matrix */}
        <section className="compare-section" id="compare">
          <div className="section-header" data-reveal>
            <span className="section-eyebrow">BENCHMARK</span>
            <h2 className="section-title">Clear contrast.</h2>
            <p className="section-desc">
              Compare PDFCatalyst against legacy enterprise software and web converters.
            </p>
          </div>

          <div className="glass-table-container" data-reveal>
            <table className="apple-table">
              <thead>
                <tr>
                  <th>FEATURE</th>
                  <th className="highlight-col">
                    <div className="th-brand">
                      <img src="/pdfix-logo.png" alt="" width="20" height="20" />
                      <span>PDFCatalyst</span>
                      <span className="badge-recommended">RECOMMENDED</span>
                    </div>
                  </th>
                  <th>Adobe Acrobat Pro</th>
                  <th>Cloud Converters</th>
                </tr>
              </thead>
              <tbody>
                {comparisonSpecs.map((row, i) => (
                  <tr key={i}>
                    <td className="row-title">{row.item}</td>
                    <td className="highlight-col pdfix-val">
                      <span className="val-icon">✓</span> {row.pdfix}
                    </td>
                    <td className="other-val">
                      <span className="val-icon dim">✗</span> {row.acrobat}
                    </td>
                    <td className="other-val">
                      <span className="val-icon dim">✗</span> {row.cloud}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Developer & AI Model Context Protocol Showcase */}
        <section className="dev-section" id="developers">
          <div className="section-header" data-reveal>
            <span className="section-eyebrow">DEVELOPERS & AI AGENTS</span>
            <h2 className="section-title">Programmatic power.</h2>
            <p className="section-desc">
              Connect Claude Desktop, Cursor, and automated workflows natively through the Model Context Protocol.
            </p>
          </div>

          {/* MCP Architecture Flow Diagram */}
          <div className="mcp-flow-diagram" data-reveal>
            <div className="flow-step">
              <div className="step-box ai-client">
                <Icon name="bot" size={18} />
                <span className="box-title">Claude Desktop / Cursor</span>
                <span className="box-sub">AI Client</span>
              </div>
            </div>
            <div className="flow-connector">
              <span className="conn-label">stdio JSON-RPC</span>
              <div className="conn-arrow">➜</div>
            </div>
            <div className="flow-step">
              <div className="step-box mcp-server">
                <Icon name="terminal" size={18} />
                <span className="box-title">pdfcraft-cli mcp</span>
                <span className="box-sub">Native Rust Engine</span>
              </div>
            </div>
            <div className="flow-connector">
              <span className="conn-label">Zero Egress</span>
              <div className="conn-arrow">➜</div>
            </div>
            <div className="flow-step">
              <div className="step-box doc-target">
                <Icon name="lock" size={18} />
                <span className="box-title">Encrypted Local Document</span>
                <span className="box-sub">100% On-Device</span>
              </div>
            </div>
          </div>

          <div className="glass-terminal-card" data-reveal>
            <div className="terminal-tabs">
              <button
                className={`tab-btn ${cliTab === "mcp" ? "active" : ""}`}
                onClick={() => setCliTab("mcp")}
              >
                <Icon name="bot" size={14} /> Claude Desktop MCP
              </button>
              <button
                className={`tab-btn ${cliTab === "cli" ? "active" : ""}`}
                onClick={() => setCliTab("cli")}
              >
                <Icon name="terminal" size={14} /> Headless CLI
              </button>
              <button
                className={`tab-btn ${cliTab === "json" ? "active" : ""}`}
                onClick={() => setCliTab("json")}
              >
                <Icon name="file" size={14} /> Pipeline JSON
              </button>
            </div>

            <div className="terminal-viewport">
              <div className="terminal-actions">
                <span className="terminal-label">
                  {cliTab === "mcp" ? "claude_desktop_config.json" : cliTab === "cli" ? "Terminal Command" : "pipeline.json"}
                </span>
                <button
                  className="copy-chip"
                  onClick={() => {
                    const text =
                      cliTab === "mcp"
                        ? `{\n  "mcpServers": {\n    "pdfcatalyst": {\n      "command": "pdfcraft-cli",\n      "args": ["mcp", "--root", "/path/to/docs"]\n    }\n  }\n}`
                        : cliTab === "cli"
                        ? `pdfcraft-cli batch --merge *.pdf --out final.pdf\npdfcraft-cli ocr scan.pdf --out searchable.pdf`
                        : `[\n  { "op": "open", "file": "doc.pdf" },\n  { "op": "redact", "pattern": "SSN:.*" },\n  { "op": "save_atomic", "out": "safe.pdf" }\n]`;
                    copy(text, cliTab);
                  }}
                >
                  <Icon name="copy" size={13} /> {copiedId === cliTab ? "Copied!" : "Copy"}
                </button>
              </div>

              <pre className="code-display">
                {cliTab === "mcp" &&
                  `{\n  "mcpServers": {\n    "pdfcatalyst": {\n      "command": "pdfcraft-cli",\n      "args": ["mcp", "--root", "/path/to/documents"]\n    }\n  }\n}`}
                {cliTab === "cli" &&
                  `# Batch merge multiple files\npdfcraft-cli batch --merge doc1.pdf doc2.pdf --out bundle.pdf\n\n# Embedded offline OCR\npdfcraft-cli ocr scan.pdf --lang eng --out searchable.pdf`}
                {cliTab === "json" &&
                  `[\n  { "op": "open", "file": "agreement.pdf" },\n  { "op": "redact", "pattern": "SSN:\\\\s*\\\\d{3}-\\\\d{2}-\\\\d{4}" },\n  { "op": "watermark", "text": "CONFIDENTIAL" },\n  { "op": "save_atomic", "out": "sanitized.pdf" }\n]`}
              </pre>
            </div>
          </div>
        </section>

        {/* Pure Rust Modular Architecture */}
        <section className="crates-section">
          <div className="section-header" data-reveal>
            <span className="section-eyebrow">ARCHITECTURE</span>
            <h2 className="section-title">Built crate by crate.</h2>
            <p className="section-desc">
              Clean-room implementation. Zero Adobe code. Strict panic-free memory guarantees.
            </p>
          </div>

          <div className="crates-grid" data-reveal>
            {cratesList.map((c, i) => (
              <div className="crate-glass-card" key={i}>
                <div className="crate-header">
                  <span className="crate-name">{c.name}</span>
                  <span className="crate-type">{c.type}</span>
                </div>
                <p className="crate-info">{c.info}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Download Hub */}
        <section className="download-section" id="download">
          <div className="glass-download-card" data-reveal>
            <div className="download-header">
              <span className="section-eyebrow">GET PDFCATALYST</span>
              <h2 className="section-title">Download for your system.</h2>
              <p className="section-desc">
                Native performance on Windows. Ready to build on macOS and Linux.
              </p>
            </div>

            <div className="download-pill-nav">
              <button
                className={`dl-pill ${downloadTab === "installer" ? "active" : ""}`}
                onClick={() => setDownloadTab("installer")}
              >
                <Icon name="windows" size={14} /> Windows Installer (.exe)
              </button>
              <button
                className={`dl-pill ${downloadTab === "portable" ? "active" : ""}`}
                onClick={() => setDownloadTab("portable")}
              >
                Standalone Portable (.exe)
              </button>
              <button
                className={`dl-pill ${downloadTab === "source" ? "active" : ""}`}
                onClick={() => setDownloadTab("source")}
              >
                macOS & Linux
              </button>
            </div>

            <div className="download-view">
              {downloadTab === "installer" && (
                <div className="dl-pane">
                  <div className="dl-action-row">
                    <a className="btn-apple-primary large" href={installerUrl}>
                      <Icon name="download" size={17} /> Download Installer ({installerSize})
                    </a>
                    <button className="btn-apple-glass" onClick={() => setShowChangelogModal(true)}>
                      Release Notes ({currentVersion}) <Icon name="chevronRight" size={14} />
                    </button>
                  </div>
                  <div className="hash-row">
                    <span className="hash-label">SHA-256:</span>
                    <code>{installerSha}</code>
                    <button
                      className="btn-hash"
                      onClick={() =>
                        copy(
                          `Get-FileHash .\\${installerAsset?.name || "PDFcatalyst-Setup-v1.0.0-x64.exe"} -Algorithm SHA256`,
                          "hash-inst",
                        )
                      }
                    >
                      <Icon name="copy" size={11} /> {copiedId === "hash-inst" ? "Copied" : "Verify Cmd"}
                    </button>
                  </div>
                </div>
              )}

              {downloadTab === "portable" && (
                <div className="dl-pane">
                  <div className="dl-action-row">
                    <a className="btn-apple-primary large" href={portableUrl}>
                      <Icon name="download" size={17} /> Download Standalone Portable ({portableSize})
                    </a>
                    <span className="dl-note">Runs immediately without installation or admin privileges.</span>
                  </div>
                  <div className="hash-row">
                    <span className="hash-label">SHA-256:</span>
                    <code>{portableSha}</code>
                    <button
                      className="btn-hash"
                      onClick={() =>
                        copy(
                          `Get-FileHash .\\${portableAsset?.name || "PDFcatalyst.exe"} -Algorithm SHA256`,
                          "hash-port",
                        )
                      }
                    >
                      <Icon name="copy" size={11} /> {copiedId === "hash-port" ? "Copied" : "Verify Cmd"}
                    </button>
                  </div>
                </div>
              )}

              {downloadTab === "source" && (
                <div className="dl-pane">
                  <pre className="source-code">
{`# Build standalone binary from source
cd pdfcatalyst
cargo build --release -p pdfcraft`}
                  </pre>
                  <span className="dl-note">Requirements: Rust 1.95+ stable compiler · C/C++ build tools</span>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="download-trust-strip">
              <span className="trust-item"><Icon name="shield" size={13} /> 100% Air-Gapped Local Privacy</span>
              <span className="trust-item"><Icon name="cpu" size={13} /> Pure Rust · No Electron Bloat</span>
              <span className="trust-item"><Icon name="check" size={13} /> Dual MIT / Apache 2.0</span>
              <span className="trust-item"><Icon name="lock" size={13} /> Cryptographically Verified</span>
            </div>
          </div>
        </section>

        {/* Creator Profile */}
        <section className="creator-section">
          <div className="glass-creator-card" data-reveal>
            <div className="creator-info">
              <span className="section-eyebrow">CREATOR & MAINTAINER</span>
              <h2 className="creator-title">Built with curiosity.</h2>
              <p className="creator-bio">
                Created by <strong>Sarthak Saxena</strong>.
                Dedicated to building high-performance, memory-safe software and providing powerful document engineering tools without cloud friction.
              </p>
              <div className="creator-links">
                <span className="creator-badge-pill">
                  <Icon name="shield" size={14} /> Pure Rust Core
                </span>
                <span className="creator-badge-pill">
                  <Icon name="check" size={14} /> Verified Architecture
                </span>
              </div>
            </div>
            <div className="creator-badge-box">
              <img src="/pdfix-logo.png" alt="" width="80" height="80" />
              <strong>Sarthak Saxena</strong>
              <span>Software Engineer</span>
              <small>Rust · PDF Engineering</small>
            </div>
          </div>
        </section>

        {/* Clean FAQ */}
        <section className="faq-section">
          <div className="section-header" data-reveal>
            <span className="section-eyebrow">QUESTIONS</span>
            <h2 className="section-title">Frequently asked.</h2>
          </div>

          <div className="faq-glass-list" data-reveal>
            {faqs.map((faq, i) => (
              <div className={`faq-card ${activeFaq === i ? "expanded" : ""}`} key={i}>
                <button
                  className="faq-trigger"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-plus">{activeFaq === i ? "−" : "+"}</span>
                </button>
                {activeFaq === i && (
                  <div className="faq-content">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Apple-Style Minimalist Footer */}
      <footer className="apple-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand-side">
              <div className="footer-brand-logo">
                <img src="/pdfix-logo.png" alt="" width="24" height="24" />
                <span>PDFCatalyst</span>
              </div>
              <p>The pure Rust PDF engineering workbench. Blazing fast, 100% offline, memory-safe.</p>
              <div className="system-status-indicator">
                <span className="status-dot-pulse green" />
                <span>All Systems Operational · 100% Offline</span>
              </div>
            </div>
            <div className="footer-links-grid">
              <div>
                <strong>PRODUCT</strong>
                <a href="#overview">Overview</a>
                <a href="#features">Capabilities</a>
                <a href="#lab">Studio Lab</a>
                <a href="#compare">Comparison</a>
              </div>
              <div>
                <strong>RESOURCES</strong>
                <a href={installerUrl}>Windows Installer</a>
                <a href={portableUrl}>Portable Standalone</a>
                <button className="footer-link-btn" onClick={() => setShowChangelogModal(true)}>Release Notes</button>
                <a href="https://github.com/SarthAyush/PDFcatalyst-App" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
                <a href="#download">All Downloads</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Copyright © {new Date().getFullYear()} PDFCatalyst. Crafted by Sarthak Saxena.</span>
            <span>Dual-licensed under MIT / Apache-2.0</span>
          </div>
        </div>
      </footer>

      {showChangelogModal && (
        <ChangelogModal
          release={selectedRelease || latestRelease}
          releases={releases}
          onClose={() => {
            setShowChangelogModal(false);
            setSelectedRelease(null);
          }}
          onSelectRelease={(r) => setSelectedRelease(r)}
        />
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
