import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const DOWNLOAD =
  "https://github.com/SarthAyush/PDFix-App/releases/download/v1.0.0/PDFix-Setup-v1.0.0-x64.exe";
const DOWNLOAD_INSTALLER = DOWNLOAD;
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
    merge: (
      <>
        <path d="M8 6h8a4 4 0 0 1 4 4v8" />
        <path d="m16 14 4 4 4-4" />
        <path d="M16 18H8a4 4 0 0 1-4-4V6" />
        <path d="m8 10-4-4-4 4" />
      </>
    ),
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
    keyboard: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="6" y1="8" x2="6.01" y2="8" />
        <line x1="10" y1="8" x2="10.01" y2="8" />
        <line x1="14" y1="8" x2="14.01" y2="8" />
        <line x1="18" y1="8" x2="18.01" y2="8" />
        <line x1="6" y1="12" x2="6.01" y2="12" />
        <line x1="18" y1="12" x2="18.01" y2="12" />
        <line x1="7" y1="16" x2="17" y2="16" />
      </>
    ),
    checkCircle: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    xCircle: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </>
    ),
  };
  return <svg {...common}>{paths[name] || paths.file}</svg>;
}

const features = [
  {
    n: "01",
    icon: "file",
    title: "Read without limits",
    desc: "A focused reader with continuous scroll, book layouts, presentation mode, bookmarks, and full-text regex search.",
    tags: ["Smart search", "Bookmarks", "wgpu Accel"],
  },
  {
    n: "02",
    icon: "layers",
    title: "Make pages behave",
    desc: "Reorder pages visually. Rotate, extract, split, and merge documents without the busywork.",
    tags: ["Drag & drop", "Batch ready", "Atomic writes"],
  },
  {
    n: "03",
    icon: "pen",
    title: "Mark it up",
    desc: "Highlights, notes, underlines, freehand drawing, stamps, and threaded comments keep feedback in context.",
    tags: ["Annotations", "Comments", "Pressure ink"],
  },
  {
    n: "04",
    icon: "shield",
    title: "Keep it yours",
    desc: "Fill forms, sign documents, redact sensitive content, and sanitize hidden data with zero cloud detours.",
    tags: ["Digital PKI signatures", "Deep redaction"],
  },
  {
    n: "05",
    icon: "search",
    title: "Make scans searchable",
    desc: "Run OCR locally to turn scanned pages and images into searchable, selectable text without third-party services.",
    tags: ["Offline OCR", "Local ML inference"],
  },
  {
    n: "06",
    icon: "spark",
    title: "Batch Workflow Studio",
    desc: "Batch merge, convert, compress, and watermark 20+ files in a single unified pipeline in seconds.",
    tags: ["Batch workflows", "Watermarks", "Lossless compress"],
  },
  {
    n: "07",
    icon: "file",
    title: "Parametric Templates",
    desc: "Generate professional invoices, proposals, certificates, and notebooks with live parameters and a reusable personal library.",
    tags: ["Document templates", "Live parameters"],
  },
  {
    n: "08",
    icon: "ruler",
    title: "Measure with precision",
    desc: "Distance, perimeter, and area measurement tools with scale calibration calibrated for architectural & engineering blueprints.",
    tags: ["Distance & area", "Scale calibration"],
  },
  {
    n: "09",
    icon: "bot",
    title: "Headless CLI & AI MCP Server",
    desc: "Automate PDF pipelines from terminal scripts or connect Claude Desktop & AI agents via built-in Model Context Protocol (MCP).",
    tags: ["CLI automation", "MCP Protocol", "AI Agents"],
  },
];

const crates = [
  {
    name: "apps/pdfcraft",
    badge: "GUI APP",
    desc: "Native desktop shell built on eframe & wgpu with OpenGL fallback. Multi-tab dockable workspace.",
  },
  {
    name: "apps/pdfcraft-cli",
    badge: "HEADLESS & MCP",
    desc: "CLI runner for automated JSON scripts, batch conversions, compliance auditing, and embedded AI MCP server.",
  },
  {
    name: "crates/cos",
    badge: "PDF SYNTAX",
    desc: "Low-level ISO 32000-2 syntax parser, cross-reference table/stream decoders, and object graph serializer.",
  },
  {
    name: "crates/render",
    badge: "HARDWARE ENGINE",
    desc: "High-fidelity vector and raster rasterizer handling world scripts, blend modes, soft masks, and gradients.",
  },
  {
    name: "crates/crypt",
    badge: "SECURITY",
    desc: "Standard PDF security handlers, revision tracking, and AES-256 decryption with memory zeroing.",
  },
  {
    name: "crates/sign",
    badge: "PKI CRYPTO",
    desc: "Digital PKI certificate signatures, validation, self-signed keys, and cryptographic timestamps.",
  },
  {
    name: "crates/ocr",
    badge: "OFFLINE ML",
    desc: "Embedded offline optical character recognition inference engine for scanned docs and image layers.",
  },
  {
    name: "crates/redact",
    badge: "SANITIZATION",
    desc: "True structural redaction removing targeted text, hidden metadata, attachments, and raw stream tokens irreversibly.",
  },
];

const comparisonData = [
  {
    feature: "Pricing & License",
    pdfix: "100% Free & Open Source (Dual MIT / Apache 2.0)",
    acrobat: "$239.88 / year subscription",
    cloud: "Free tier capped; requires monthly sub",
  },
  {
    feature: "Data Privacy & Telemetry",
    pdfix: "100% On-Device, zero telemetry, zero analytics",
    acrobat: "Account required, cloud telemetry & tracking",
    cloud: "Files uploaded to third-party cloud servers",
  },
  {
    feature: "Engine Architecture & Safety",
    pdfix: "Pure Rust (forbid(unsafe_code)) + Atomic Saves",
    acrobat: "Legacy C++ codebase, historical CVE targets",
    cloud: "Browser JS sandbox or unknown server stack",
  },
  {
    feature: "AI Agent & CLI Automation",
    pdfix: "Native Model Context Protocol (MCP) + Headless CLI",
    acrobat: "Expensive Enterprise Acrobat SDK only",
    cloud: "Restricted rate-limited web REST APIs",
  },
  {
    feature: "True Structural Redaction",
    pdfix: "Purges underlying object streams, XMP & font subsets",
    acrobat: "Included in Pro, but prone to user errors",
    cloud: "Often just flattens to raster or draws a black box",
  },
  {
    feature: "Offline Availability",
    pdfix: "Fully functional without internet or login",
    acrobat: "Requires periodic Adobe cloud sign-in",
    cloud: "Zero functionality without active internet",
  },
  {
    feature: "Resource Footprint",
    pdfix: "Starts in <1s, lean memory usage via wgpu",
    acrobat: "Background daemons, high idle RAM usage",
    cloud: "Browser tab memory bloat",
  },
];

const shortcutsList = [
  { key: "Ctrl + O", desc: "Open document" },
  { key: "Ctrl + S", desc: "Atomic save verified" },
  { key: "Ctrl + F", desc: "Full-text regex search" },
  { key: "Ctrl + Z / Y", desc: "Deep undo / redo stack" },
  { key: "Space + Drag", desc: "Smooth canvas pan" },
  { key: "Ctrl + Wheel", desc: "Sub-pixel zoom" },
  { key: "F11", desc: "Distraction-free presentation" },
  { key: "Ctrl + Shift + R", desc: "Permanent redaction mode" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeLabTab, setActiveLabTab] = useState("redact");
  const [activeCliTab, setActiveCliTab] = useState("mcp");
  const [activeDownloadTab, setActiveDownloadTab] = useState("windows");
  const [redactRevealed, setRedactRevealed] = useState(false);
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchCompleted, setBatchCompleted] = useState(false);
  const [selectedCosNode, setSelectedCosNode] = useState("catalog");
  const [measuredFeet, setMeasuredFeet] = useState("18.4 ft");

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
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const nodes = document.querySelectorAll("[data-reveal]");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return () => window.removeEventListener("scroll", onScroll);
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const runBatchSimulation = () => {
    if (batchRunning) return;
    setBatchRunning(true);
    setBatchCompleted(false);
    setTimeout(() => {
      setBatchRunning(false);
      setBatchCompleted(true);
    }, 1200);
  };

  const faqs = [
    [
      "Is PDFix free and open-source?",
      "Yes! PDFix is dual-licensed under MIT and Apache-2.0. The code is 100% open on GitHub, with zero subscriptions, paywalls, or hidden limitations.",
    ],
    [
      "Do my documents get uploaded to any servers?",
      "Never. PDFix is built entirely around local processing. The application has zero analytics, zero telemetry, and performs all OCR, parsing, conversions, digital signing, and redactions directly on your local hardware.",
    ],
    [
      "What is the Model Context Protocol (MCP) feature?",
      "PDFix includes an embedded MCP server (`pdfcraft-cli mcp`). You can connect it to AI coding and assistant tools like Claude Desktop, Cursor, or custom autonomous agents to let AI inspect, summarize, and edit PDFs locally without uploading files to cloud APIs.",
    ],
    [
      "What is the difference between the Installer and Portable versions?",
      "The Windows Installer (`PDFix-Setup.exe` ~19 MB) installs PDFix into your system with start menu shortcuts and file associations. The Portable `.exe` (~67 MB) runs self-contained from any USB drive or folder without touching the registry.",
    ],
    [
      "Can I run PDFix on macOS, Linux, or Web?",
      "Yes. PDFix is written in pure cross-platform Rust (`eframe`/`wgpu`). You can compile and run natively on macOS and Linux with `cargo run --release -p pdfcraft`. A WebAssembly browser build (`apps/pdfcraft-web`) is also included in the repository.",
    ],
    [
      "How does PDFix handle deep structural redaction?",
      "Most free PDF viewers simply draw a black rectangle over sensitive text, leaving the underlying text, vectors, and metadata extractable. PDFix's `crates/redact` purges the underlying content stream tokens, font character mappings, and metadata permanently.",
    ],
  ];

  return (
    <>
      <div className="noise" aria-hidden="true" />

      {/* Navigation */}
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <a
          className="brand"
          href="#top"
          aria-label="PDFix home"
          onClick={closeMenu}
        >
          <img src="/pdfix-logo.png" alt="" />
          <span>PDFix</span>
        </a>
        <button
          className="mobile-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "x" : "menu"} size={22} />
        </button>
        <nav
          className={menuOpen ? "nav-open" : ""}
          aria-label="Main navigation"
        >
          <a href="#features" onClick={closeMenu}>
            Features
          </a>
          <a href="#lab" onClick={closeMenu}>
            Studio Lab
          </a>
          <a href="#compare" onClick={closeMenu}>
            Compare
          </a>
          <a href="#cli-mcp" onClick={closeMenu}>
            CLI & MCP
          </a>
          <a href="#architecture" onClick={closeMenu}>
            Architecture
          </a>
          <a href="#privacy" onClick={closeMenu}>
            Privacy
          </a>
          <a href="#download" onClick={closeMenu}>
            Download
          </a>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <a className="nav-download" href={DOWNLOAD} onClick={closeMenu}>
            Get PDFix <Icon name="arrow" size={15} />
          </a>
        </nav>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow reveal-in">
              <span className="live-dot" /> THE RUST PDF WORKBENCH · V1.0.0
            </div>
            <h1 className="hero-title">
              <span>Every PDF.</span>
              <br />
              <span className="gradient-text">Under control.</span>
            </h1>
            <p className="hero-lede">
              Read, edit, organize, sign, batch process, and irreversibly redact
              documents in one blazing fast desktop workbench. Pure Rust. Zero
              telemetry. Native AI MCP integration.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={DOWNLOAD_INSTALLER}>
                <Icon name="download" size={17} /> Download for Windows{" "}
                <span className="button-arrow">
                  <Icon name="arrow" size={15} />
                </span>
              </a>
              <a className="button button-quiet" href="#lab">
                <Icon name="sliders" size={17} /> Try Interactive Lab
              </a>
              <a
                className="button button-quiet"
                href={REPO}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="github" size={17} /> GitHub
              </a>
            </div>
            <div className="hero-proof">
              <span>
                <Icon name="shield" size={15} /> 100% Offline & Private
              </span>
              <i />
              <span>
                <Icon name="spark" size={15} /> Pure Rust (wgpu)
              </span>
              <i />
              <span>
                <Icon name="bot" size={15} /> AI Agent MCP Ready
              </span>
              <i />
              <span>Windows · macOS · Linux · Web</span>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Illustration of the PDFix document workspace"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="glow-ball" />
            <div className="floating-label label-top">
              <span className="mini-check">
                <Icon name="check" size={12} />
              </span>{" "}
              forbid(unsafe_code)
            </div>
            <div className="floating-label label-bottom">
              <span className="label-icon">
                <Icon name="bot" size={15} />
              </span>{" "}
              AI MCP Server Ready
            </div>
            <div className="app-window">
              <div className="window-top">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="window-title">
                  <img src="/pdfix-logo.png" alt="" /> <span>PDFix v1.0.0</span>
                </div>
                <div className="window-actions">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="window-body">
                <aside className="mock-sidebar">
                  <div className="sidebar-section">WORKSPACE</div>
                  <div className="sidebar-item selected">
                    <Icon name="file" size={14} /> Documents
                  </div>
                  <div className="sidebar-item">
                    <Icon name="layers" size={14} /> Batch Studio
                  </div>
                  <div className="sidebar-item">
                    <Icon name="pen" size={14} /> Annotate
                  </div>
                  <div className="sidebar-item">
                    <Icon name="shield" size={14} /> Redact & Sign
                  </div>
                  <div className="sidebar-item">
                    <Icon name="terminal" size={14} /> CLI & MCP
                  </div>
                  <div className="sidebar-bottom">
                    <div className="sidebar-section">RECENT PIPELINES</div>
                    <div className="recent-file">
                      <span className="pdf-mini">PDF</span>
                      <span>
                        Batch-24-files.pdf<small>Merged & compressed</small>
                      </span>
                    </div>
                    <div className="recent-file">
                      <span className="pdf-mini gray">PDF</span>
                      <span>
                        Contract_redacted.pdf<small>Stream purged</small>
                      </span>
                    </div>
                  </div>
                </aside>
                <div className="mock-canvas">
                  <div className="canvas-toolbar">
                    <span className="crumb">
                      Engineering Blueprint <b>/</b> Page 01
                    </span>
                    <div className="tool-pills">
                      <span>
                        <Icon name="search" size={12} />
                      </span>
                      <span>
                        <Icon name="ruler" size={12} />
                      </span>
                      <span>
                        <Icon name="pen" size={12} />
                      </span>
                      <span>
                        <Icon name="download" size={12} />
                      </span>
                    </div>
                  </div>
                  <div className="paper">
                    <div className="paper-kicker">
                      ISO 32000-2 <span>RUST V1.0</span>
                    </div>
                    <div className="paper-title">
                      The PDF
                      <br />
                      Engineering
                      <br />
                      <em>Workbench.</em>
                    </div>
                    <div className="paper-rule" />
                    <div className="paper-lines">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="paper-subhead">01 / ARCHITECTURE</div>
                    <div className="paper-lines short">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="paper-highlight">
                      100% Local · No Telemetry · Memory Safe
                    </div>
                    <div className="paper-footer">
                      <span>PDFIX WORKBENCH</span>
                      <span>01 — 12</span>
                    </div>
                  </div>
                  <div className="page-chip">
                    <span className="page-chip-icon">
                      <Icon name="check" size={13} />
                    </span>
                    <span>
                      <b>Atomic verified save</b>
                      <small>Original file never corrupted</small>
                    </span>
                  </div>
                </div>
              </div>
              <div className="window-status">
                <span>
                  <i /> Hardware accelerated (wgpu)
                </span>
                <span>
                  100% <b>·</b> Page 1 of 12
                </span>
              </div>
            </div>
            <div className="float-card card-ocr">
              <div className="float-icon">
                <Icon name="search" size={16} />
              </div>
              <span>
                <b>Offline OCR</b>
                <small>Embedded ML inference</small>
              </span>
              <span className="tiny-check">
                <Icon name="check" size={12} />
              </span>
            </div>
            <div className="float-card card-secure">
              <div className="float-icon shield-icon">
                <Icon name="shield" size={16} />
              </div>
              <span>
                <b>True Redaction</b>
                <small>Streams purged forever</small>
              </span>
            </div>
          </div>
          <div className="hero-bottom-note">
            <span className="note-line" /> Pure Rust · Dual MIT / Apache 2.0 ·
            Clean-room implementation <span className="note-line" />
          </div>
        </section>

        {/* Capabilities Ticker */}
        <section className="ticker" aria-label="PDFix capabilities">
          <div className="ticker-track">
            {[
              "PURE RUST ENGINE",
              "HARDWARE WGPU RENDERING",
              "AI MCP SERVER",
              "HEADLESS CLI RUNNER",
              "TRUE REDACTION",
              "OFFLINE OCR",
              "BATCH STUDIO",
              "PKI SIGNATURES",
              "MEASUREMENT CALIBRATION",
              "PURE RUST ENGINE",
              "HARDWARE WGPU RENDERING",
              "AI MCP SERVER",
              "HEADLESS CLI RUNNER",
              "TRUE REDACTION",
              "OFFLINE OCR",
              "BATCH STUDIO",
              "PKI SIGNATURES",
              "MEASUREMENT CALIBRATION",
            ].map((t, i) => (
              <span key={i}>
                {t}
                <b>✳</b>
              </span>
            ))}
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="intro section-wrap" id="features">
          <div className="section-heading" data-reveal>
            <div className="eyebrow">
              <span className="eyebrow-num">01 / CAPABILITIES</span>
            </div>
            <h2>
              Engineered for depth.
              <br />
              <span className="muted-title">Streamlined for speed.</span>
            </h2>
            <p>
              PDFix brings everyday document tasks and advanced engineering
              workflows into one native, memory-safe desktop workspace.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <article
                className={`feature-card feature-${i + 1}`}
                data-reveal
                style={{ "--delay": `${i * 65}ms` }}
                key={f.n}
              >
                <div className="feature-top">
                  <span className="feature-number">{f.n}</span>
                  <span className="feature-icon">
                    <Icon name={f.icon} size={20} />
                  </span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="feature-tags">
                  {f.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="feature-card-glow" />
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Studio Lab (The WOW Factor) */}
        <section className="interactive-lab section-wrap" id="lab">
          <div className="section-heading" data-reveal>
            <div className="eyebrow">
              <span className="eyebrow-num">02 / INTERACTIVE STUDIO LAB</span>
            </div>
            <h2>
              Test the mechanics.
              <br />
              <span className="muted-title">Right here in your browser.</span>
            </h2>
            <p>
              Explore the difference between surface-level viewers and true PDF
              engineering.
            </p>
          </div>

          <div className="lab-container" data-reveal>
            <div className="lab-tabs">
              <button
                className={`lab-tab ${activeLabTab === "redact" ? "active" : ""}`}
                onClick={() => setActiveLabTab("redact")}
              >
                <Icon name="shield" size={16} /> True Redaction vs Marker
              </button>
              <button
                className={`lab-tab ${activeLabTab === "cos" ? "active" : ""}`}
                onClick={() => setActiveLabTab("cos")}
              >
                <Icon name="tree" size={16} /> Low-Level COS Inspector
              </button>
              <button
                className={`lab-tab ${activeLabTab === "batch" ? "active" : ""}`}
                onClick={() => setActiveLabTab("batch")}
              >
                <Icon name="layers" size={16} /> Batch Pipeline Studio
              </button>
              <button
                className={`lab-tab ${activeLabTab === "measure" ? "active" : ""}`}
                onClick={() => setActiveLabTab("measure")}
              >
                <Icon name="ruler" size={16} /> Blueprint Calibrator
              </button>
            </div>

            <div className="lab-display">
              {activeLabTab === "redact" && (
                <div className="lab-panel redact-panel">
                  <div className="panel-controls">
                    <span>INSPECTION MODE:</span>
                    <button
                      className={`toggle-pill ${!redactRevealed ? "selected" : ""}`}
                      onClick={() => setRedactRevealed(false)}
                    >
                      PDFix Structural Purge
                    </button>
                    <button
                      className={`toggle-pill danger ${redactRevealed ? "selected" : ""}`}
                      onClick={() => setRedactRevealed(true)}
                    >
                      Common "Black Box" Flaw
                    </button>
                  </div>
                  <div className="redact-preview">
                    <div className="doc-sample">
                      <div className="doc-header">
                        CONFIDENTIAL PATIENT RECORD — DEPARTMENT OF HEALTH
                      </div>
                      <p>
                        Patient: <strong>Johnathan Doe</strong> | SSN:{" "}
                        <span
                          className={`redact-target ${redactRevealed ? "leaked" : "purged"}`}
                        >
                          {redactRevealed ? "982-41-0091" : "███████████"}
                        </span>
                      </p>
                      <p>
                        Primary Diagnosis:{" "}
                        <span
                          className={`redact-target ${redactRevealed ? "leaked" : "purged"}`}
                        >
                          {redactRevealed
                            ? "Stage 2 Cardiomegaly"
                            : "████████████████████"}
                        </span>
                      </p>
                      <p>
                        Prescribed Medication:{" "}
                        <span
                          className={`redact-target ${redactRevealed ? "leaked" : "purged"}`}
                        >
                          {redactRevealed
                            ? "Lisinopril 20mg daily"
                            : "█████████████████████"}
                        </span>
                      </p>
                    </div>
                    <div className="redact-explanation">
                      <h4>
                        {redactRevealed
                          ? "⚠️ The Dangerous Common Flaw:"
                          : "🛡️ How PDFix Protects You:"}
                      </h4>
                      <p>
                        {redactRevealed
                          ? "Most basic PDF tools simply draw a black rectangle annotation over the canvas. The text stream, font glyph IDs, and clipboard copy remain 100% accessible to anyone inspecting the file."
                          : "PDFix completely strips the underlying content stream bytes, recalculates the XREF table, sanitizes document metadata, and zeroes out the raw dictionary stream tokens."}
                      </p>
                      <div className="byte-status">
                        Stream status:{" "}
                        <code>
                          {redactRevealed
                            ? "TOKEN_EXISTS [Leaked: 0x4A6F68...]"
                            : "ZEROED_AND_PURGED [0x00]"}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeLabTab === "cos" && (
                <div className="lab-panel cos-panel">
                  <div className="cos-tree">
                    <div className="tree-heading">ISO 32000-2 OBJECT GRAPH</div>
                    <button
                      className={`tree-node ${selectedCosNode === "catalog" ? "active" : ""}`}
                      onClick={() => setSelectedCosNode("catalog")}
                    >
                      📁 1 0 obj &lt;&lt; /Type /Catalog /Pages 2 0 R &gt;&gt;
                    </button>
                    <button
                      className={`tree-node child-1 ${selectedCosNode === "pages" ? "active" : ""}`}
                      onClick={() => setSelectedCosNode("pages")}
                    >
                      📁 2 0 obj &lt;&lt; /Type /Pages /Kids [3 0 R] /Count 1
                      &gt;&gt;
                    </button>
                    <button
                      className={`tree-node child-2 ${selectedCosNode === "page" ? "active" : ""}`}
                      onClick={() => setSelectedCosNode("page")}
                    >
                      📄 3 0 obj &lt;&lt; /Type /Page /Contents 4 0 R &gt;&gt;
                    </button>
                    <button
                      className={`tree-node child-3 ${selectedCosNode === "stream" ? "active" : ""}`}
                      onClick={() => setSelectedCosNode("stream")}
                    >
                      ⚡ 4 0 obj &lt;&lt; /Filter /FlateDecode /Length 184
                      &gt;&gt; stream
                    </button>
                  </div>
                  <div className="cos-inspector">
                    <div className="inspector-head">
                      <span>DECODED STREAM INSPECTOR</span>
                      <span className="tag">Pure Rust Parser</span>
                    </div>
                    <pre className="code-box">
                      {selectedCosNode === "catalog" &&
                        `% PDF Catalog Root\n1 0 obj\n<<\n  /Type /Catalog\n  /Pages 2 0 R\n  /ViewerPreferences << /DisplayDocTitle true >>\n  /PageLayout /SinglePage\n>>\nendobj`}
                      {selectedCosNode === "pages" &&
                        `% Page Tree Hierarchy\n2 0 obj\n<<\n  /Type /Pages\n  /Kids [ 3 0 R ]\n  /Count 1\n  /MediaBox [ 0 0 612 792 ] % US Letter\n>>\nendobj`}
                      {selectedCosNode === "page" &&
                        `% Page Object with Resource Dictionary\n3 0 obj\n<<\n  /Type /Page\n  /Parent 2 0 R\n  /Resources <<\n    /Font << /F1 5 0 R >>\n    /ProcSet [ /PDF /Text /ImageB ]\n  >>\n  /Contents 4 0 R\n>>\nendobj`}
                      {selectedCosNode === "stream" &&
                        `% Decoded Content Stream Operators (crates/cos)\nq\n1 0 0 1 72 710 cm\nBT\n  /F1 16 Tf\n  (PDFix: The PDF Engineering Workbench) Tj\n  0 -24 Td\n  /F1 10 Tf\n  (Compiled with pure Rust and memory safety.) Tj\nET\nQ`}
                    </pre>
                  </div>
                </div>
              )}

              {activeLabTab === "batch" && (
                <div className="lab-panel batch-panel">
                  <div className="batch-queue">
                    <div className="queue-title">
                      BATCH QUEUE (3 FILES QUEUED)
                    </div>
                    <div className="queue-item">
                      <Icon name="file" size={16} />
                      <span>financial_report_q3.pdf (4.8 MB)</span>
                      <span className="badge">Ready</span>
                    </div>
                    <div className="queue-item">
                      <Icon name="file" size={16} />
                      <span>scanned_receipts.png (12.1 MB)</span>
                      <span className="badge">Ready</span>
                    </div>
                    <div className="queue-item">
                      <Icon name="file" size={16} />
                      <span>executive_brief.pdf (1.2 MB)</span>
                      <span className="badge">Ready</span>
                    </div>
                  </div>
                  <div className="batch-actions-box">
                    <div className="options-title">ACTIVE PIPELINES</div>
                    <label className="checkbox-row">
                      <input type="checkbox" defaultChecked />
                      <span>Lossless Stream Compression (reduce ~42%)</span>
                    </label>
                    <label className="checkbox-row">
                      <input type="checkbox" defaultChecked />
                      <span>Run Offline OCR on Image Scans</span>
                    </label>
                    <label className="checkbox-row">
                      <input type="checkbox" defaultChecked />
                      <span>Stamp Header: "CONFIDENTIAL / INTERNAL ONLY"</span>
                    </label>
                    <button
                      className="button button-primary"
                      onClick={runBatchSimulation}
                      disabled={batchRunning}
                    >
                      {batchRunning ? (
                        <>Processing Rust Pipeline...</>
                      ) : batchCompleted ? (
                        <>
                          <Icon name="checkCircle" size={16} /> Done in 410ms!
                        </>
                      ) : (
                        <>
                          <Icon name="spark" size={16} /> Run Batch Pipeline
                        </>
                      )}
                    </button>
                    {batchCompleted && (
                      <div className="batch-result">
                        ✓ 3 files merged & processed into{" "}
                        <code>batch_bundle.pdf</code> (5.1 MB total, down from
                        18.1 MB).
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeLabTab === "measure" && (
                <div className="lab-panel measure-panel">
                  <div className="blueprint-canvas">
                    <div className="grid-overlay" />
                    <div className="blueprint-wall" />
                    <div className="blueprint-dimension">
                      <div className="dimension-line" />
                      <span className="dimension-label">{measuredFeet}</span>
                    </div>
                  </div>
                  <div className="measure-sidebar">
                    <h4>CALIBRATION & SCALE</h4>
                    <p>
                      Calibrate directly against known blueprint title blocks:
                    </p>
                    <div className="scale-select">
                      <button
                        className={`pill-sm ${measuredFeet === "18.4 ft" ? "active" : ""}`}
                        onClick={() => setMeasuredFeet("18.4 ft")}
                      >
                        1/4" = 1'-0" (Architectural)
                      </button>
                      <button
                        className={`pill-sm ${measuredFeet === "36.8 ft" ? "active" : ""}`}
                        onClick={() => setMeasuredFeet("36.8 ft")}
                      >
                        1/8" = 1'-0" (Site Plan)
                      </button>
                    </div>
                    <div className="measurement-results">
                      <div className="result-row">
                        <span>Distance:</span>
                        <strong>{measuredFeet}</strong>
                      </div>
                      <div className="result-row">
                        <span>Wall Perimeter:</span>
                        <strong>
                          {measuredFeet === "18.4 ft" ? "73.6 ft" : "147.2 ft"}
                        </strong>
                      </div>
                      <div className="result-row">
                        <span>Enclosed Area:</span>
                        <strong>
                          {measuredFeet === "18.4 ft"
                            ? "338.5 sq ft"
                            : "1,354.2 sq ft"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Comparison Matrix: PDFix vs Adobe Acrobat vs Cloud */}
        <section className="comparison-section section-wrap" id="compare">
          <div className="section-heading" data-reveal>
            <div className="eyebrow">
              <span className="eyebrow-num">03 / HONEST COMPARISON</span>
            </div>
            <h2>
              Why choose PDFix?
              <br />
              <span className="muted-title">See the difference side-by-side.</span>
            </h2>
            <p>
              Compare PDFix against legacy bloated software and privacy-invasive
              cloud upload converters.
            </p>
          </div>

          <div className="table-wrapper" data-reveal>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>FEATURE & ARCHITECTURE</th>
                  <th className="highlight-col">
                    <div className="brand-header">
                      <img src="/pdfix-logo.png" alt="" />
                      <span>PDFix</span>
                      <small>Pure Rust</small>
                    </div>
                  </th>
                  <th>Adobe Acrobat Pro</th>
                  <th>Cloud Tools (iLovePDF, etc.)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td className="row-feature">{row.feature}</td>
                    <td className="highlight-col cell-pdfix">{row.pdfix}</td>
                    <td className="cell-other">{row.acrobat}</td>
                    <td className="cell-other">{row.cloud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CLI & AI MCP Server Integration Showcase */}
        <section className="cli-mcp-section section-wrap" id="cli-mcp">
          <div className="section-heading" data-reveal>
            <div className="eyebrow">
              <span className="eyebrow-num">04 / DEVELOPER & AI AGENTS</span>
            </div>
            <h2>
              Automate with CLI.
              <br />
              <span className="muted-title">Connect to AI via MCP.</span>
            </h2>
            <p>
              PDFix ships with <code>apps/pdfcraft-cli</code> and a built-in{" "}
              <strong>Model Context Protocol (MCP) server</strong>. Let Claude
              Desktop, Cursor, and AI agents inspect, edit, sign, and render PDFs
              locally.
            </p>
          </div>

          <div className="cli-mcp-box" data-reveal>
            <div className="code-nav">
              <button
                className={`code-tab ${activeCliTab === "mcp" ? "active" : ""}`}
                onClick={() => setActiveCliTab("mcp")}
              >
                <Icon name="bot" size={15} /> Claude Desktop MCP Config
              </button>
              <button
                className={`code-tab ${activeCliTab === "cli" ? "active" : ""}`}
                onClick={() => setActiveCliTab("cli")}
              >
                <Icon name="terminal" size={15} /> Terminal Automation
              </button>
              <button
                className={`code-tab ${activeCliTab === "json" ? "active" : ""}`}
                onClick={() => setActiveCliTab("json")}
              >
                <Icon name="file" size={15} /> Headless Script Pipeline
              </button>
            </div>

            <div className="code-content-wrap">
              {activeCliTab === "mcp" && (
                <>
                  <div className="code-action-bar">
                    <span>
                      Add to <code>claude_desktop_config.json</code>:
                    </span>
                    <button
                      className="copy-btn"
                      onClick={() =>
                        copyToClipboard(
                          `{\n  "mcpServers": {\n    "pdfix": {\n      "command": "pdfcraft-cli",\n      "args": ["mcp", "--root", "/path/to/documents"]\n    }\n  }\n}`,
                          "mcp",
                        )
                      }
                    >
                      <Icon name="copy" size={14} />{" "}
                      {copiedId === "mcp" ? "Copied!" : "Copy Snippet"}
                    </button>
                  </div>
                  <pre className="terminal-code">
                    {`{\n  "mcpServers": {\n    "pdfix": {\n      "command": "pdfcraft-cli",\n      "args": [\n        "mcp",\n        "--root", "/path/to/workspace"\n      ]\n    }\n  }\n}`}
                  </pre>
                  <p className="code-caption">
                    ✓ Autonomous inspection, OCR, page splitting, and document
                    assembly directly inside your AI coding assistant.
                  </p>
                </>
              )}

              {activeCliTab === "cli" && (
                <>
                  <div className="code-action-bar">
                    <span>Shell Automation Commands:</span>
                    <button
                      className="copy-btn"
                      onClick={() =>
                        copyToClipboard(
                          `# Merge multiple files\npdfcraft-cli batch --merge file1.pdf file2.pdf --out merged.pdf\n\n# Run offline OCR on scanned document\npdfcraft-cli ocr input_scan.pdf --lang eng --out searchable.pdf\n\n# Headless pipeline with JSON instructions\npdfcraft-cli run --script pipeline.json --root ./docs`,
                          "cli",
                        )
                      }
                    >
                      <Icon name="copy" size={14} />{" "}
                      {copiedId === "cli" ? "Copied!" : "Copy Commands"}
                    </button>
                  </div>
                  <pre className="terminal-code">
                    {`# Batch merge multiple PDFs\n$ pdfcraft-cli batch --merge doc1.pdf doc2.pdf --out merged.pdf\n\n# Run offline OCR on scanned documents\n$ pdfcraft-cli ocr scanned_invoice.pdf --lang eng --out searchable.pdf\n\n# Headless scripted pipeline\n$ pdfcraft-cli run --script pipeline.json --root ./workspace`}
                  </pre>
                  <p className="code-caption">
                    ✓ Full headless execution for continuous integration,
                    nightly cron jobs, and high-throughput servers.
                  </p>
                </>
              )}

              {activeCliTab === "json" && (
                <>
                  <div className="code-action-bar">
                    <span>
                      Pipeline Definition: <code>pipeline.json</code>
                    </span>
                    <button
                      className="copy-btn"
                      onClick={() =>
                        copyToClipboard(
                          `[\n  { "op": "open", "file": "contract.pdf" },\n  { "op": "redact", "pattern": "SSN:\\\\s*\\\\d{3}-\\\\d{2}-\\\\d{4}" },\n  { "op": "watermark", "text": "CONFIDENTIAL", "opacity": 0.15 },\n  { "op": "save_atomic", "out": "contract_sanitized.pdf" }\n]`,
                          "json",
                        )
                      }
                    >
                      <Icon name="copy" size={14} />{" "}
                      {copiedId === "json" ? "Copied!" : "Copy JSON"}
                    </button>
                  </div>
                  <pre className="terminal-code">
                    {`[\n  { "op": "open", "file": "contract.pdf" },\n  { "op": "redact", "pattern": "SSN:\\\\s*\\\\d{3}-\\\\d{2}-\\\\d{4}" },\n  { "op": "watermark", "text": "CONFIDENTIAL", "opacity": 0.15 },\n  { "op": "save_atomic", "out": "contract_sanitized.pdf" }\n]`}
                  </pre>
                  <p className="code-caption">
                    ✓ Declarative, audit-ready workflows that can be checked
                    directly into your git repositories.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Pure Rust Modular Architecture */}
        <section className="architecture-section section-wrap" id="architecture">
          <div className="section-heading" data-reveal>
            <div className="eyebrow">
              <span className="eyebrow-num">05 / MODULAR RUST ARCHITECTURE</span>
            </div>
            <h2>
              Clean-room design.
              <br />
              <span className="muted-title">Built crate by crate.</span>
            </h2>
            <p>
              PDFix was rebuilt from first principles without a single line of
              Adobe code or GPL contamination. Every crate is total and panic-free.
            </p>
          </div>

          <div className="crate-grid" data-reveal>
            {crates.map((c, i) => (
              <div className="crate-card" key={i}>
                <div className="crate-top">
                  <span className="crate-name">{c.name}</span>
                  <span className="crate-badge">{c.badge}</span>
                </div>
                <p className="crate-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Keyboard Shortcuts Cheatsheet */}
        <section className="shortcuts-section section-wrap" id="shortcuts">
          <div className="shortcuts-box" data-reveal>
            <div className="shortcuts-copy">
              <div className="eyebrow">
                <span className="eyebrow-num">06 / PRODUCTIVITY</span>
              </div>
              <h2>
                Keyboard first.
                <br />
                <span className="muted-title">Zero friction navigation.</span>
              </h2>
              <p>
                Everything in the PDFix workspace is mapped to high-speed
                shortcuts for power users and document engineers.
              </p>
            </div>
            <div className="shortcuts-grid">
              {shortcutsList.map((s, i) => (
                <div className="shortcut-row" key={i}>
                  <kbd>{s.key}</kbd>
                  <span>{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="privacy-section" id="privacy">
          <div className="privacy-inner section-wrap">
            <div className="privacy-visual" data-reveal>
              <div className="privacy-ring ring-a" />
              <div className="privacy-ring ring-b" />
              <div className="privacy-orb">
                <img src="/pdfix-logo.png" alt="PDFix logo" />
              </div>
              <div className="privacy-chip chip-one">
                <Icon name="lock" size={15} /> 100% On-device processing
              </div>
              <div className="privacy-chip chip-two">
                <span className="green-pulse" /> Zero telemetry
              </div>
              <div className="privacy-chip chip-three">
                <Icon name="shield" size={15} /> forbid(unsafe_code)
              </div>
            </div>
            <div className="privacy-copy" data-reveal>
              <div className="eyebrow">
                <span className="eyebrow-num">
                  07 / YOUR DOCUMENTS, YOUR PRIVACY
                </span>
              </div>
              <h2>
                Privacy isn't
                <br />a premium add-on.
              </h2>
              <p>
                Confidential contracts, tax records, medical files, and personal
                notes belong on your computer — not on third-party cloud
                servers. PDFix is engineered with a strict local-first policy.
              </p>
              <ul className="privacy-list">
                <li>
                  <span>
                    <Icon name="check" size={14} />
                  </span>{" "}
                  No user accounts, subscriptions, or credit cards required
                </li>
                <li>
                  <span>
                    <Icon name="check" size={14} />
                  </span>{" "}
                  Zero network phone-home, crash-telemetry, or tracking pixels
                </li>
                <li>
                  <span>
                    <Icon name="check" size={14} />
                  </span>{" "}
                  OCR, conversion, and signing run entirely on local CPU/GPU
                </li>
                <li>
                  <span>
                    <Icon name="check" size={14} />
                  </span>{" "}
                  Irreversible structural redaction permanently purges content
                </li>
              </ul>
              <a
                href={REPO}
                className="text-link"
                target="_blank"
                rel="noreferrer"
              >
                Inspect the open-source code on GitHub{" "}
                <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Download Hub */}
        <section className="download-section section-wrap" id="download">
          <div className="download-panel" data-reveal>
            <div className="download-glow" />
            <div className="download-copy">
              <div className="eyebrow">
                <span className="live-dot" /> OFFICIAL RELEASE · V1.0.0
              </div>
              <h2>
                Get PDFix today.
                <br />
                Freedom from PDF pain.
              </h2>
              <p>
                Download the official native application for Windows, or build
                from source for macOS and Linux.
              </p>

              <div className="download-tabs-nav">
                <button
                  className={`dl-tab ${activeDownloadTab === "windows" ? "active" : ""}`}
                  onClick={() => setActiveDownloadTab("windows")}
                >
                  Windows (.exe)
                </button>
                <button
                  className={`dl-tab ${activeDownloadTab === "portable" ? "active" : ""}`}
                  onClick={() => setActiveDownloadTab("portable")}
                >
                  Standalone Portable
                </button>
                <button
                  className={`dl-tab ${activeDownloadTab === "linux-mac" ? "active" : ""}`}
                  onClick={() => setActiveDownloadTab("linux-mac")}
                >
                  macOS & Linux
                </button>
              </div>

              {activeDownloadTab === "windows" && (
                <div className="dl-tab-content">
                  <div className="download-actions">
                    <a
                      className="button button-primary button-large"
                      href={DOWNLOAD_INSTALLER}
                    >
                      <Icon name="download" size={18} /> Download Installer (.exe)
                      <Icon name="arrow" size={16} />
                    </a>
                    <a
                      href={RELEASE}
                      className="release-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Release Notes <Icon name="arrow" size={14} />
                    </a>
                  </div>
                  <div className="checksum-box">
                    <span>SHA-256 Checksum:</span>
                    <code>{SHA256_INSTALLER}</code>
                    <button
                      className="btn-tiny"
                      onClick={() =>
                        copyToClipboard(
                          `Get-FileHash .\\PDFix-Setup-v1.0.0-x64.exe -Algorithm SHA256`,
                          "hash-inst",
                        )
                      }
                    >
                      <Icon name="copy" size={12} />{" "}
                      {copiedId === "hash-inst"
                        ? "Copied PowerShell command!"
                        : "Copy Verify Cmd"}
                    </button>
                  </div>
                </div>
              )}

              {activeDownloadTab === "portable" && (
                <div className="dl-tab-content">
                  <div className="download-actions">
                    <a
                      className="button button-primary button-large"
                      href={DOWNLOAD_PORTABLE}
                    >
                      <Icon name="download" size={18} /> Download Portable (.exe)
                      <Icon name="arrow" size={16} />
                    </a>
                    <span className="portable-note">
                      Runs directly without installation or admin privileges.
                    </span>
                  </div>
                  <div className="checksum-box">
                    <span>SHA-256 Checksum:</span>
                    <code>{SHA256_PORTABLE}</code>
                    <button
                      className="btn-tiny"
                      onClick={() =>
                        copyToClipboard(
                          `Get-FileHash .\\PDFix.exe -Algorithm SHA256`,
                          "hash-port",
                        )
                      }
                    >
                      <Icon name="copy" size={12} />{" "}
                      {copiedId === "hash-port"
                        ? "Copied PowerShell command!"
                        : "Copy Verify Cmd"}
                    </button>
                  </div>
                </div>
              )}

              {activeDownloadTab === "linux-mac" && (
                <div className="dl-tab-content">
                  <p className="compile-note">
                    Build natively with Rust 1.95+ or stable compiler:
                  </p>
                  <pre className="terminal-code mini">
                    {`# Clone repository\ngit clone https://github.com/SarthAyush/PDFix-App.git\ncd PDFix-App\n\n# Run native desktop app\ncargo run --release -p pdfcraft\n\n# Or install CLI automation\ncargo install --path apps/pdfcraft-cli`}
                  </pre>
                  <span className="req-note">
                    Dependencies: Visual Studio C++ (Win) · build-essential
                    libx11-dev libfontconfig1-dev (Linux) · Xcode Tools (macOS)
                  </span>
                </div>
              )}
            </div>

            <div className="download-art">
              <div className="art-grid" />
              <div className="art-halo halo-1" />
              <div className="art-halo halo-2" />
              <img src="/pdfix-logo.png" alt="PDFix app icon" />
              <div className="art-caption">
                <span>PDFIX WORKBENCH</span>
                <small>VERSION 1.0.0 · RUST</small>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section className="creator-section section-wrap" id="creator">
          <div className="creator-card" data-reveal>
            <div className="creator-monogram" aria-hidden="true">
              SS
            </div>
            <div className="creator-copy">
              <div className="eyebrow">
                <span className="eyebrow-num">
                  08 / THE PERSON BEHIND PDFIX
                </span>
              </div>
              <h2>
                Built with curiosity.
                <br />
                <span className="muted-title">Designed for real work.</span>
              </h2>
              <p>
                I'm <strong>Sarthak Saxena</strong>, the creator and maintainer.
                I build software with a focus on high-performance tools,
                thoughtful engineering, and making complex workflows feel
                seamless and private. PDFix is my effort to give everyone an
                exceptional, open-source PDF engineering workbench.
              </p>
              <p>
                PDFix is completely free, open-source under dual MIT / Apache
                2.0 licenses, and built with love in pure Rust. Explore the
                codebase, contribute features, and star the repository!
              </p>
              <div className="creator-actions">
                <a
                  className="button button-quiet"
                  href={PROFILE}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="github" size={16} /> GitHub profile{" "}
                  <Icon name="arrow" size={14} />
                </a>
                <a
                  className="text-link"
                  href={REPO}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore PDFix Source <Icon name="arrow" size={15} />
                </a>
              </div>
            </div>
            <div className="creator-side">
              <span className="creator-side-label">MAINTAINER</span>
              <img src="/pdfix-logo.png" alt="PDFix logo" />
              <strong>Sarthak Saxena</strong>
              <span>Software Engineer & Creator</span>
              <span className="creator-divider" />
              <span className="creator-tech">
                RUST · PDF ENGINE · OPEN SOURCE
              </span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section section-wrap" id="faq">
          <div className="faq-intro" data-reveal>
            <div className="eyebrow">
              <span className="eyebrow-num">09 / GOOD TO KNOW</span>
            </div>
            <h2>
              Fair questions.
              <br />
              <span className="muted-title">Straight answers.</span>
            </h2>
            <p>
              Everything you need to know about PDFix's licensing, privacy, and
              capabilities.
            </p>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map(([q, a], i) => (
              <div
                className={`faq-item ${activeFaq === i ? "faq-active" : ""}`}
                key={q}
              >
                <button
                  className="faq-question"
                  aria-expanded={activeFaq === i}
                  onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
                >
                  <span>
                    <i>0{i + 1}</i>
                    {q}
                  </span>
                  <b>{activeFaq === i ? "−" : "+"}</b>
                </button>
                <div
                  className="faq-answer"
                  style={{ gridTemplateRows: activeFaq === i ? "1fr" : "0fr" }}
                >
                  <div>
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main section-wrap">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <img src="/pdfix-logo.png" alt="" />
              <span>PDFix</span>
            </a>
            <p>
              The pure Rust PDF engineering workbench.
              <br />
              Fast, private, and built for real work.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span className="footer-label">EXPLORE</span>
              <a href="#features">Features</a>
              <a href="#lab">Studio Lab</a>
              <a href="#compare">Comparison</a>
              <a href="#cli-mcp">CLI & MCP</a>
              <a href="#architecture">Architecture</a>
            </div>
            <div>
              <span className="footer-label">GET PDFIX</span>
              <a href={DOWNLOAD_INSTALLER}>Windows Installer</a>
              <a href={DOWNLOAD_PORTABLE}>Portable Standalone</a>
              <a href={RELEASE} target="_blank" rel="noreferrer">
                Release Notes (v1.0.0)
              </a>
              <a href={REPO} target="_blank" rel="noreferrer">
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom section-wrap">
          <span>
            © {new Date().getFullYear()} PDFix. Configured by Sarthak Saxena (@SarthAyush).
          </span>
          <span className="footer-license">
            Dual MIT / Apache-2.0 License <span>✳</span>
          </span>
        </div>
      </footer>

      {/* Floating Download Action */}
      <a
        className="floating-download"
        href={DOWNLOAD_INSTALLER}
        aria-label="Download PDFix for Windows"
      >
        <Icon name="download" size={17} />
        <span>Download v1.0.0</span>
      </a>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
