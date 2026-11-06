import { useState, useEffect } from "react";

const FALLBACK_VERSION = "v1.0.2";
const DOWNLOAD_INSTALLER =
  "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.2/PDFCatalyst-Setup-v1.0.2-x64.exe";
const DOWNLOAD_PORTABLE =
  "https://github.com/SarthAyush/PDFcatalyst-App/releases/download/v1.0.2/PDFCatalyst.exe";
const SHA256_INSTALLER =
  "eaea6576725659ea9cfb82c69af508f171ac356357d35286dab947ccd841d3a0";
const SHA256_PORTABLE =
  "28d8721512b04cd711d5db4a957335dec5a8741a13f240bc9c0028bbc907614c";

export function formatBytes(bytes) {
  if (!bytes || isNaN(bytes)) return "";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export { DOWNLOAD_INSTALLER, DOWNLOAD_PORTABLE, SHA256_INSTALLER, SHA256_PORTABLE, FALLBACK_VERSION };

export function useGitHubReleases() {
  const [release, setRelease] = useState(() => {
    try {
      const cached = localStorage.getItem("pdfix_latest_release");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < 1000 * 60 * 5) {
          return parsed.data;
        }
      }
    } catch {}
    return {
      tag_name: FALLBACK_VERSION,
      published_at: new Date().toISOString(),
      assets: [
        {
          name: "PDFCatalyst-Setup-v1.0.2-x64.exe",
          browser_download_url: DOWNLOAD_INSTALLER,
          size: 20866662,
          download_count: 1420,
        },
        {
          name: "PDFCatalyst.exe",
          browser_download_url: DOWNLOAD_PORTABLE,
          size: 70883738,
          download_count: 980,
        },
      ],
    };
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchRelease = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.github.com/repos/SarthAyush/PDFcatalyst-App/releases/latest"
        );
        if (!res.ok) throw new Error("Network response not ok");
        const data = await res.json();
        if (mounted && data && data.tag_name) {
          setRelease(data);
          try {
            localStorage.setItem(
              "pdfix_latest_release",
              JSON.stringify({ timestamp: Date.now(), data })
            );
          } catch {}
        }
      } catch {
        // graceful offline fallback
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRelease();
    return () => {
      mounted = false;
    };
  }, []);

  return { latestRelease: release, loading };
}
