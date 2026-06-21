import Link from "next/link";
import { getContent } from "@/lib/content";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import Kicker from "@/components/site/Kicker";
import { ArrowRight } from "@/components/site/icons";
import InsightsExplorer from "@/components/insights/InsightsExplorer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Insights · Krishnan Ranganathan",
};

export default async function InsightsPage() {
  const { site, insights } = await getContent();

  return (
    <div className="page">
      <Nav brand={site.brand} />

      {/* PAGE HERO */}
      <section className="container" style={{ paddingTop: "clamp(48px,6vw,84px)", paddingBottom: "clamp(28px,3vw,40px)" }}>
        <Reveal style={{ maxWidth: 830 }}>
          <Kicker>Insights</Kicker>
          <h1 className="serif" style={{ fontWeight: 400, fontSize: "clamp(42px,5.4vw,68px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 26 }}>Reading the markets aloud</h1>
          <p style={{ marginTop: 24, fontSize: "clamp(17px,1.7vw,20px)", lineHeight: 1.7, color: "var(--muted)", maxWidth: "44em" }}>{insights.heroBody}</p>
        </Reveal>
      </section>

      {/* FEATURED */}
      <section className="container" style={{ paddingBottom: "clamp(36px,4vw,56px)" }}>
        <Reveal>
          <Link href="/contact" className="feat-insight">
            <div style={{ padding: "clamp(34px,4vw,56px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="mono" style={{ fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan-light)" }}>{insights.featuredKicker}</span>
              <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(28px,3.2vw,42px)", lineHeight: 1.12, letterSpacing: "-0.015em", marginTop: 18 }}>{insights.featuredTitle}</h2>
              <p style={{ marginTop: 20, fontSize: 16.5, lineHeight: 1.72, color: "rgba(245,241,233,0.8)", maxWidth: "36em" }}>{insights.featuredExcerpt}</p>
              <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 16, fontSize: 13.5, color: "rgba(245,241,233,0.7)" }}>
                <span className="mono" style={{ letterSpacing: "0.04em" }}>{insights.featuredVenue}</span>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--cyan)" }} />
                <span className="mono">{insights.featuredYear}</span>
              </div>
            </div>
            <div style={{ position: "relative", minHeight: 300, background: "#0a323b", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.4 }} aria-hidden="true">
                <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#9fd9e0" strokeWidth="0.7" style={{ width: "100%", height: "100%" }}>
                  <line x1="200" y1="-20" x2="-20" y2="420" /><line x1="200" y1="-20" x2="80" y2="420" /><line x1="200" y1="-20" x2="200" y2="420" /><line x1="200" y1="-20" x2="320" y2="420" /><line x1="200" y1="-20" x2="420" y2="420" />
                  <circle cx="200" cy="200" r="70" /><circle cx="200" cy="200" r="120" />
                </svg>
              </div>
              <div className="serif" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontStyle: "italic", fontSize: "clamp(48px,7vw,96px)", color: "rgba(245,241,233,0.14)" }}>$</div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* FILTER + GRID */}
      <section className="container" style={{ paddingTop: "clamp(20px,3vw,32px)", paddingBottom: "clamp(56px,7vw,96px)" }}>
        <Reveal>
          <InsightsExplorer categories={insights.categories} items={insights.items} />
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--card)", borderTop: "1px solid rgba(21,36,44,0.1)" }}>
        <div className="container" style={{ paddingTop: "clamp(52px,6vw,84px)", paddingBottom: "clamp(52px,6vw,84px)", textAlign: "center" }}>
          <Reveal style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(26px,3.4vw,40px)", lineHeight: 1.12, letterSpacing: "-0.01em", color: "var(--ink)" }}>{insights.ctaHeading}</h2>
            <Link href="/contact" className="btn-primary" style={{ marginTop: 30 }}>
              Get in touch
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer site={site} />
    </div>
  );
}
