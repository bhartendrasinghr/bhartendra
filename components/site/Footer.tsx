import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import { BridgeLogo } from "./icons";

export default function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="site-footer">
      <div
        className="container"
        style={{ paddingTop: "clamp(52px,6vw,76px)", paddingBottom: 40 }}
      >
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" style={{ color: "var(--cream)" }}>
              <BridgeLogo />
              <span
                className="serif"
                style={{ fontWeight: 500, fontSize: 22, color: "var(--cream)" }}
              >
                {site.brand}
              </span>
            </Link>
            <p
              style={{
                marginTop: 20,
                fontSize: 15,
                lineHeight: 1.66,
                color: "rgba(245,241,233,0.66)",
                maxWidth: "30em",
              }}
            >
              {site.footerTagline}
            </p>
          </div>
          <div>
            <div className="footer-head">Explore</div>
            <div className="footer-links">
              <Link href="/about">About</Link>
              <Link href="/courses">Courses</Link>
              <Link href="/insights">Insights</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <div className="footer-head">Connect</div>
            <div className="footer-links">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.linkedin} target="_blank" rel="noopener">
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(245,241,233,0.14)",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "space-between",
            fontSize: 13,
            color: "rgba(245,241,233,0.55)",
          }}
        >
          <span>
            © {site.year} krishnanranganathan.com · All rights reserved.
          </span>
          <span className="mono" style={{ letterSpacing: "0.1em" }}>
            EIGHT&nbsp;BRIDGES
          </span>
        </div>
      </div>
    </footer>
  );
}
