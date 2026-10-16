import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const DOWNLOAD_INSTALLER =
  "https://github.com/SarthAyush/PDFix-App/releases/download/v1.0.0/PDFix-Setup-v1.0.0-x64.exe";
const DOWNLOAD_PORTABLE =
  "https://github.com/SarthAyush/PDFix-App/releases/download/v1.0.0/PDFix.exe";
const REPO = "https://github.com/SarthAyush/PDFix-App";
const RELEASE = "https://github.com/SarthAyush/PDFix-App/releases/tag/v1.0.0";
const PROFILE = "https://github.com/SarthAyush";
const SHA256_INSTALLER =
  "d5a2e4e560b674e8271e2706602ab45a443dabed5f8f1e5e3eb0eb22f4ee6ec9";
const SHA256_PORTABLE =
  "0f58ca15cb116852126903a9a8c6589eefc4794fe1d65c813cc87c20a8dcec6a";

function Icon({ name, size = 18, stroke = 1.8 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
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
  };
  return <svg {...common}>{paths[name] || paths.file}</svg>;
}

const bentoFeatures = [
  {
    tag: "HARDWARE ENGINE",
    title: "wgpu Accelerated",
    desc: "Ultra-fluid vector rendering with OpenGL fallback. Complete support for complex world scripts, vertical text, blend modes, and opacity masks.",
    badge: "Native 60+ FPS",
    icon: "zap",
  },
  {
    tag: "PRIVACY",
    title: "100% Offline & Private",
    desc: "No accounts. No telemetry. Zero cloud round-trips. Your documents, signatures, and data never leave your local machine.",
    badge: "Zero Tracking",
    icon: "shield",
  },
  {
    tag: "SECURITY",
    title: "Structural Redaction",
    desc: "True object stream purging. Irreversibly strips text tokens, font subroutines, metadata, and attachments.",
    badge: "Deep Sanitization",
    icon: "lock",
  },
  {
    tag: "AUTOMATION",
    title: "AI Model Context Protocol",
    desc: "First-class MCP server. Connect Claude Desktop, Cursor, and AI agents to parse, edit, and sign documents programmatically.",
    badge: "MCP Ready",
    icon: "bot",
  },
  {
    tag: "PRODUCTIVITY",
    title: "Batch Workflow Studio",
    desc: "Process 20+ documents simultaneously. Merge, convert, compress, and apply watermarks across massive file sets.",
    badge: "High Throughput",
    icon: "layers",
  },
  {
    tag: "INTELLIGENCE",
    title: "Offline Machine OCR",
    desc: "Embedded neural inference. Turn scanned receipts, contracts, and images into fully searchable, selectable PDF text.",
    badge: "Local ML",
    icon: "search",
  },
];

const cratesList = [
  { name: "apps/pdfcraft", type: "Native GUI", info: "Multi-tab egui & wgpu shell for Windows, macOS, Linux" },
  { name: "apps/pdfcraft-cli", type: "Headless CLI & MCP", info: "Command runner and embedded AI agent MCP server" },
  { name: "crates/cos", type: "PDF Syntax", info: "ISO 32000-2 low-level parser and xref stream decoder" },
  { name: "crates/render", type: "Hardware Rasterizer", info: "DisplayList vector and font rasterization engine" },
  { name: "crates/crypt", type: "Security", info: "Standard security handlers & AES-256 decryption" },
  { name: "crates/sign", type: "PKI Digital Crypto", info: "X.509 certificate signatures & cryptographic timestamps" },
  { name: "crates/ocr", type: "Embedded ML", info: "Offline optical character recognition neural engine" },
  { name: "crates/redact", type: "Sanitization", info: "Irreversible deep structural stream destruction" },
];

const comparisonSpecs = [
  {
    item: "License & Cost",
    pdfix: "100% Free · Dual MIT / Apache 2.0",
    acrobat: "$239.88/year subscription",
    cloud: "Usage caps · Monthly fees",
  },
  {
    item: "Data Privacy",
    pdfix: "100% On-Device · Zero telemetry",
    acrobat: "Cloud sync · Telemetry tracking",
    cloud: "Files sent to 3rd-party servers",
  },
  {
    item: "Memory Safety",
    pdfix: "Pure Rust (forbid(unsafe_code))",
    acrobat: "Legacy C++ codebase",
    cloud: "Web sandbox limitations",
  },
  {
    item: "AI Agent MCP Integration",
    pdfix: "Native Model Context Protocol Server",
    acrobat: "Enterprise SDK only",
    cloud: "Not supported",
  },
  {
    item: "Structural Redaction",
    pdfix: "Irreversible token & stream purge",
    acrobat: "Manual tool · Risk of oversight",
    cloud: "Superficial visual mask only",
  },
  {
    item: "Crash Resilience",
    pdfix: "Atomic verified writes",
    acrobat: "Can corrupt open files",
    cloud: "Browser tab timeout loss",
  },
  {
    item: "Offline Operation",
    pdfix: "Full functionality without internet",
    acrobat: "Periodic Adobe login checks",
    cloud: "Requires constant connection",
  },
];

function App() {
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
    }, 900);
  };

  const faqs = [
    {
      q: "Is PDFix truly open source and free?",
      a: "Yes. Dual-licensed under MIT and Apache-2.0. Completely free for personal, commercial, and enterprise use with no subscriptions.",
    },
    {
      q: "How does PDFix ensure my data never leaks?",
      a: "All document parsing, rendering, OCR, signing, and saving occur strictly on your machine. Zero network analytics, zero telemetry.",
    },
    {
      q: "What is the built-in MCP server?",
      a: "PDFix includes an embedded Model Context Protocol server. AI assistants like Claude Desktop and Cursor can inspect and edit local PDFs without uploading them.",
    },
    {
      q: "Installer vs Portable?",
      a: "The Windows Installer (~19 MB) integrates file associations. The Portable .exe (~67 MB) runs standalone from any folder or USB with zero installation.",
    },
    {
      q: "How does true redaction differ from regular black boxes?",
      a: "Common viewers draw an overlay rectangle while leaving text tokens in the stream. PDFix strips the raw bytes, XREF entries, and font maps irreversibly.",
    },
  ];

  return (
    <div className="apple-shell">
      {/* Sleek Frosted Glass Header */}
      <header className={`apple-nav ${scrolled ? "nav-blur" : ""}`}>
        <div className="nav-container">
          <a className="nav-brand" href="#top" onClick={() => setMenuOpen(false)}>
            <img src="/pdfix-logo.png" alt="" width="26" height="26" />
            <span>PDFix</span>
          </a>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#overview" onClick={() => setMenuOpen(false)}>Overview</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#lab" onClick={() => setMenuOpen(false)}>Studio Lab</a>
            <a href="#compare" onClick={() => setMenuOpen(false)}>Compare</a>
            <a href="#developers" onClick={() => setMenuOpen(false)}>Developers</a>
            <a href="#download" onClick={() => setMenuOpen(false)}>Download</a>
            <button
              className="theme-button"
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={15} />
            </button>
            <a className="nav-cta" href={DOWNLOAD_INSTALLER} onClick={() => setMenuOpen(false)}>
              Download <Icon name="chevronRight" size={13} />
            </a>
          </nav>

          <button
            className="mobile-btn"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={20} />
          </button>
        </div>
      </header>

      <main id="top">
        {/* Apple-Style Hero */}
        <section className="hero-section" id="overview">
          <div className="hero-content">
            <div className="apple-pill" data-reveal>
              <span className="pill-dot" /> PDFix 1.0 · The Pure Rust Workbench
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
              <a className="btn-apple-primary" href={DOWNLOAD_INSTALLER}>
                <Icon name="download" size={16} /> Download for Windows
              </a>
              <a className="btn-apple-glass" href="#lab">
                Try Studio Lab <Icon name="chevronRight" size={14} />
              </a>
              <a className="btn-apple-quiet" href={REPO} target="_blank" rel="noreferrer">
                <Icon name="github" size={16} /> View on GitHub
              </a>
            </div>

            <div className="hero-spec-strip" data-reveal>
              <span><Icon name="shield" size={14} /> Local-first Privacy</span>
              <span className="divider">•</span>
              <span><Icon name="cpu" size={14} /> wgpu Acceleration</span>
              <span className="divider">•</span>
              <span><Icon name="bot" size={14} /> AI MCP Ready</span>
              <span className="divider">•</span>
              <span>Dual MIT / Apache 2.0</span>
            </div>
          </div>

          {/* Clean Glass App Window Showcase */}
          <div className="hero-window-wrap" data-reveal>
            <div className="glass-window">
              <div className="window-header">
                <div className="traffic-lights">
                  <span className="light red" />
                  <span className="light yellow" />
                  <span className="light green" />
                </div>
                <div className="window-label">
                  <img src="/pdfix-logo.png" alt="" width="14" height="14" />
                  <span>PDFix Workbench — Architectural_Plans_2026.pdf</span>
                </div>
                <div className="window-badge">v1.0.0 · wgpu</div>
              </div>

              <div className="window-canvas-layout">
                <aside className="canvas-sidebar">
                  <div className="sidebar-group-label">TOOLS</div>
                  <div className="tool-row active"><Icon name="file" size={13} /> Document</div>
                  <div className="tool-row"><Icon name="layers" size={13} /> Batch Studio</div>
                  <div className="tool-row"><Icon name="ruler" size={13} /> Measurement</div>
                  <div className="tool-row"><Icon name="shield" size={13} /> Structural Redact</div>
                  <div className="tool-row"><Icon name="bot" size={13} /> MCP Server</div>
                  <div className="sidebar-spacer" />
                  <div className="safe-badge">
                    <Icon name="check" size={12} /> Atomic verified write
                  </div>
                </aside>

                <div className="canvas-stage">
                  <div className="canvas-doc-page">
                    <div className="doc-kicker">ENGINEERING SPECIFICATION</div>
                    <div className="doc-title">Rebuilt in pure Rust.</div>
                    <div className="doc-rule" />
                    <div className="doc-meta-grid">
                      <div><span>PARSER</span><strong>ISO 32000-2</strong></div>
                      <div><span>SAFETY</span><strong>forbid(unsafe)</strong></div>
                      <div><span>LATENCY</span><strong>&lt; 1ms render</strong></div>
                    </div>
                    <div className="doc-chips">
                      <span className="chip green">Zero Telemetry</span>
                      <span className="chip blue">Atomic Transactions</span>
                      <span className="chip purple">MCP Protocol</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apple Bento Grid */}
        <section className="bento-section" id="features">
          <div className="section-header" data-reveal>
            <span className="section-eyebrow">CAPABILITIES</span>
            <h2 className="section-title">Engineered to outperform.</h2>
            <p className="section-desc">
              Every workflow you need in one unified, memory-safe architecture.
            </p>
          </div>

          <div className="bento-grid">
            {bentoFeatures.map((f, i) => (
              <div className="bento-card" key={i} data-reveal>
                <div className="bento-card-top">
                  <span className="bento-tag">{f.tag}</span>
                  <span className="bento-badge">{f.badge}</span>
                </div>
                <div className="bento-icon-wrap">
                  <Icon name={f.icon} size={22} />
                </div>
                <h3 className="bento-title">{f.title}</h3>
                <p className="bento-desc">{f.desc}</p>
                <div className="glass-glare" />
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Studio Lab */}
        <section className="lab-section" id="lab">
          <div className="section-header" data-reveal>
            <span className="section-eyebrow">INTERACTIVE LAB</span>
            <h2 className="section-title">Experience the mechanics.</h2>
            <p className="section-desc">
              Interact with the core capabilities live in your browser.
            </p>
          </div>

          <div className="glass-lab-box" data-reveal>
            <div className="lab-nav">
              <button
                className={`lab-btn ${labTab === "redact" ? "active" : ""}`}
                onClick={() => setLabTab("redact")}
              >
                <Icon name="shield" size={15} /> True Redaction
              </button>
              <button
                className={`lab-btn ${labTab === "cos" ? "active" : ""}`}
                onClick={() => setLabTab("cos")}
              >
                <Icon name="tree" size={15} /> COS Syntax Tree
              </button>
              <button
                className={`lab-btn ${labTab === "batch" ? "active" : ""}`}
                onClick={() => setLabTab("batch")}
              >
                <Icon name="layers" size={15} /> Batch Studio
              </button>
              <button
                className={`lab-btn ${labTab === "measure" ? "active" : ""}`}
                onClick={() => setLabTab("measure")}
              >
                <Icon name="ruler" size={15} /> Blueprint Scale
              </button>
            </div>

            <div className="lab-body">
              {labTab === "redact" && (
                <div className="lab-pane redact-pane">
                  <div className="pane-switcher">
                    <span>MODE:</span>
                    <button
                      className={`switch-btn ${redactedState ? "active" : ""}`}
                      onClick={() => setRedactedState(true)}
                    >
                      PDFix Structural Purge
                    </button>
                    <button
                      className={`switch-btn danger ${!redactedState ? "active" : ""}`}
                      onClick={() => setRedactedState(false)}
                    >
                      Common Black Box Flaw
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
                    </div>
                    <div className="analysis-view">
                      <h4>{redactedState ? "✓ Structural Stream Purged" : "⚠️ Raw Text Leaked"}</h4>
                      <p>
                        {redactedState
                          ? "Content stream bytes are purged, font subroutines unmapped, and XREF tables updated. Copying text produces nothing."
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
    (PDFix: Pro Engineering) Tj
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
              Compare PDFix against legacy enterprise software and web converters.
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
                      <span>PDFix</span>
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
                    <td className="highlight-col pdfix-val">{row.pdfix}</td>
                    <td className="other-val">{row.acrobat}</td>
                    <td className="other-val">{row.cloud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Developer & AI Model Context Protocol Showcase */}
        <section className="dev-section" id="developers">
          <div className="section-header" data-reveal>
            <span className="section-eyebrow">DEVELOPERS & AI</span>
            <h2 className="section-title">Programmatic power.</h2>
            <p className="section-desc">
              Connect AI coding assistants directly through the Model Context Protocol.
            </p>
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
                        ? `{\n  "mcpServers": {\n    "pdfix": {\n      "command": "pdfcraft-cli",\n      "args": ["mcp", "--root", "/path/to/docs"]\n    }\n  }\n}`
                        : cliTab === "cli"
                        ? `pdfcraft-cli batch --merge *.pdf --out final.pdf\npdfcraft-cli ocr scan.pdf --out searchable.pdf`
                        : `[\n  { "op": "open", "file": "doc.pdf" },\n  { "op": "redact", "pattern": "SSN:.*" },\n  { "op": "save_atomic", "out": "safe.pdf" }\n]`;
                    copy(text, cliTab);
                  }}
                >
                  <Icon name="copy" size={13} /> {copiedId === cliTab ? "Copied" : "Copy"}
                </button>
              </div>

              <pre className="code-display">
                {cliTab === "mcp" &&
                  `{\n  "mcpServers": {\n    "pdfix": {\n      "command": "pdfcraft-cli",\n      "args": ["mcp", "--root", "/path/to/documents"]\n    }\n  }\n}`}
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
              <span className="section-eyebrow">GET PDFIX</span>
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
                Windows Installer (.exe)
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
                    <a className="btn-apple-primary large" href={DOWNLOAD_INSTALLER}>
                      <Icon name="download" size={17} /> Download Installer (19.4 MB)
                    </a>
                    <a className="btn-apple-glass" href={RELEASE} target="_blank" rel="noreferrer">
                      Release Notes (v1.0.0) <Icon name="chevronRight" size={14} />
                    </a>
                  </div>
                  <div className="hash-row">
                    <span>SHA-256:</span>
                    <code>{SHA256_INSTALLER}</code>
                    <button
                      className="btn-hash"
                      onClick={() =>
                        copy(
                          `Get-FileHash .\\PDFix-Setup-v1.0.0-x64.exe -Algorithm SHA256`,
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
                    <a className="btn-apple-primary large" href={DOWNLOAD_PORTABLE}>
                      <Icon name="download" size={17} /> Download Standalone Portable (67.1 MB)
                    </a>
                    <span className="dl-note">Runs immediately without installation or admin privileges.</span>
                  </div>
                  <div className="hash-row">
                    <span>SHA-256:</span>
                    <code>{SHA256_PORTABLE}</code>
                    <button
                      className="btn-hash"
                      onClick={() =>
                        copy(
                          `Get-FileHash .\\PDFix.exe -Algorithm SHA256`,
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
{`# Clone and run with Cargo
git clone https://github.com/SarthAyush/PDFix-App.git
cd PDFix-App
cargo run --release -p pdfcraft`}
                  </pre>
                  <span className="dl-note">Requirements: Rust 1.95+ or stable compiler · C/C++ build tools</span>
                </div>
              )}
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
                Created by <strong>Sarthak Saxena</strong> (<a href={PROFILE} target="_blank" rel="noreferrer">@SarthAyush</a>).
                Dedicated to building high-performance, memory-safe software and giving people powerful document engineering tools without cloud friction.
              </p>
              <div className="creator-links">
                <a className="btn-apple-quiet" href={PROFILE} target="_blank" rel="noreferrer">
                  <Icon name="github" size={15} /> GitHub Profile
                </a>
                <a className="btn-apple-quiet" href={REPO} target="_blank" rel="noreferrer">
                  Explore Repository
                </a>
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
              <img src="/pdfix-logo.png" alt="" width="22" height="22" />
              <span>PDFix</span>
              <p>The PDF engineering workbench rebuilt in pure Rust.</p>
            </div>
            <div className="footer-links-grid">
              <div>
                <strong>PRODUCT</strong>
                <a href="#overview">Overview</a>
                <a href="#features">Features</a>
                <a href="#lab">Studio Lab</a>
                <a href="#compare">Comparison</a>
              </div>
              <div>
                <strong>RESOURCES</strong>
                <a href={DOWNLOAD_INSTALLER}>Windows Installer</a>
                <a href={DOWNLOAD_PORTABLE}>Portable Standalone</a>
                <a href={RELEASE} target="_blank" rel="noreferrer">Release Notes</a>
                <a href={REPO} target="_blank" rel="noreferrer">GitHub Repo</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Copyright © {new Date().getFullYear()} PDFix. Configured by Sarthak Saxena (@SarthAyush).</span>
            <span>Dual-licensed under MIT / Apache-2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
