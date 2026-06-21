import Link from "next/link";
import { getContent } from "@/lib/content";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import Kicker from "@/components/site/Kicker";
import { ArrowRight } from "@/components/site/icons";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { site, home } = await getContent();

  return (
    <div className="page">
      <Nav brand={site.brand} />

      {/* HERO */}
      <section
        className="container"
        style={{ paddingTop: "clamp(48px,7vw,92px)", paddingBottom: "clamp(40px,5vw,64px)" }}
      >
        <div className="grid-2 home-hero">
          <Reveal>
            <Kicker>{home.heroKicker}</Kicker>
            <h1
              className="serif"
              style={{
                fontWeight: 400,
                fontSize: "clamp(40px,5.6vw,68px)",
                lineHeight: 1.04,
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                marginTop: 30,
              }}
            >
              {home.heroHeadlinePre}
              <span style={{ fontStyle: "italic", color: "var(--teal)" }}>
                {home.heroHeadlineEm}
              </span>
              {home.heroHeadlinePost}
            </h1>
            <p
              style={{
                marginTop: 28,
                fontSize: "clamp(16.5px,1.6vw,19px)",
                lineHeight: 1.66,
                color: "var(--muted)",
                maxWidth: "30em",
              }}
            >
              {home.heroBody}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 38 }}>
              <Link href="/courses" className="btn-primary">
                Explore the Eight Bridges
                <ArrowRight />
              </Link>
              <Link href="/about" className="btn-outline">
                About Krishnan
              </Link>
            </div>
          </Reveal>

          <Reveal style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "-6% -8% -10% 8%", zIndex: 0, opacity: 0.5 }} aria-hidden="true">
              <svg viewBox="0 0 320 380" fill="none" stroke="#0d3b44" strokeWidth="0.7" style={{ width: "100%", height: "100%" }}>
                <line x1="160" y1="20" x2="20" y2="360" /><line x1="160" y1="20" x2="70" y2="360" /><line x1="160" y1="20" x2="120" y2="360" /><line x1="160" y1="20" x2="170" y2="360" /><line x1="160" y1="20" x2="220" y2="360" /><line x1="160" y1="20" x2="270" y2="360" /><line x1="160" y1="20" x2="300" y2="360" />
                <line x1="20" y1="360" x2="300" y2="360" />
              </svg>
            </div>
            <div style={{ position: "relative", zIndex: 1, marginLeft: "auto", width: "min(100%,400px)" }}>
              <div style={{ position: "relative", borderRadius: 3, overflow: "hidden", boxShadow: "0 30px 70px -28px rgba(13,59,68,0.55)", background: "var(--teal)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/headshot-duotone.png" alt={site.owner} style={{ display: "block", width: "100%", height: "auto", mixBlendMode: "luminosity", opacity: 0.96 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(13,59,68,0.0) 55%,rgba(9,48,58,0.55) 100%)" }} />
              </div>
              <div style={{ position: "absolute", left: -22, bottom: 26, background: "var(--card)", border: "1px solid rgba(21,36,44,0.10)", borderRadius: 2, padding: "16px 20px", boxShadow: "0 18px 40px -22px rgba(13,59,68,0.4)" }}>
                <div className="serif" style={{ fontSize: 18, fontWeight: 500, color: "var(--ink)" }}>{site.owner}</div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan)", marginTop: 5 }}>Capital Markets &amp; Risk</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="container">
        <Reveal>
          <div className="stats-strip">
            {home.stats.map((s, i) => (
              <div key={i} className="stat-cell">
                <div className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,3.4vw,42px)", lineHeight: 1, color: "var(--teal)" }}>{s.num}</div>
                <div style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.45, color: "var(--muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="container" style={{ paddingTop: "clamp(64px,9vw,120px)", paddingBottom: "clamp(64px,9vw,120px)" }}>
        <div className="grid-2 about-grid">
          <Reveal style={{ position: "relative" }}>
            <div style={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 26px 60px -30px rgba(13,59,68,0.5)", maxWidth: 380 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/headshot.png" alt={site.owner} style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
            <div style={{ position: "absolute", top: -18, left: -18, zIndex: -1, width: 120, height: 120, border: "1px solid rgba(13,59,68,0.3)" }} />
          </Reveal>
          <Reveal>
            <Kicker>{home.aboutKicker}</Kicker>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.16, letterSpacing: "-0.01em", color: "var(--ink)", marginTop: 24 }}>{home.aboutHeading}</h2>
            <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.72, color: "var(--muted)" }}>{home.aboutBody}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30 }}>
              {home.aboutBadges.map((b, i) => (
                <span key={i} style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", border: "1px solid rgba(13,59,68,0.2)", padding: "8px 15px", borderRadius: 2 }}>{b}</span>
              ))}
            </div>
            <Link href="/about" className="link-arrow" style={{ marginTop: 34 }}>
              Read the full profile
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* EIGHT BRIDGES GRID */}
      <section style={{ background: "var(--card)", borderTop: "1px solid rgba(21,36,44,0.10)", borderBottom: "1px solid rgba(21,36,44,0.10)" }}>
        <div className="container" style={{ paddingTop: "clamp(64px,9vw,116px)", paddingBottom: "clamp(64px,9vw,116px)" }}>
          <Reveal style={{ maxWidth: 760, marginBottom: "clamp(40px,5vw,64px)" }}>
            <Kicker>{home.bridgesKicker}</Kicker>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(32px,4.2vw,52px)", lineHeight: 1.1, letterSpacing: "-0.015em", color: "var(--ink)", marginTop: 22 }}>{home.bridgesHeading}</h2>
            <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.7, color: "var(--muted)", maxWidth: "46em" }}>{home.bridgesBody}</p>
          </Reveal>
          <div className="bridges-grid">
            {home.bridges.map((b) => (
              <Link key={b.n} href="/courses" className="bridge-cell">
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22 }}>
                  <span className="serif" style={{ fontSize: 32, fontWeight: 300, color: "var(--cyan)", lineHeight: 1 }}>{b.no}</span>
                  <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--faint)" }}>Bridge {b.n}</span>
                </div>
                <h3 className="serif" style={{ fontWeight: 500, fontSize: 19, lineHeight: 1.28, color: "var(--ink)", letterSpacing: "-0.005em" }}>{b.title}</h3>
                <span style={{ marginTop: "auto", paddingTop: 20, display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--teal)" }}>
                  Explore <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITY BAND */}
      <section style={{ background: "var(--teal)", color: "var(--cream)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.16, pointerEvents: "none" }} aria-hidden="true">
          <svg viewBox="0 0 1240 420" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#9fd9e0" strokeWidth="0.6" style={{ width: "100%", height: "100%" }}>
            <line x1="620" y1="-40" x2="60" y2="460" /><line x1="620" y1="-40" x2="240" y2="460" /><line x1="620" y1="-40" x2="430" y2="460" /><line x1="620" y1="-40" x2="620" y2="460" /><line x1="620" y1="-40" x2="810" y2="460" /><line x1="620" y1="-40" x2="1000" y2="460" /><line x1="620" y1="-40" x2="1180" y2="460" />
          </svg>
        </div>
        <div className="container" style={{ paddingTop: "clamp(60px,8vw,104px)", paddingBottom: "clamp(60px,8vw,104px)", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div className="grid-2 auth-grid" style={{ alignItems: "end" }}>
              <div>
                <Kicker color="var(--cyan-light)">{home.authorityKicker}</Kicker>
                <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(28px,3.6vw,42px)", lineHeight: 1.16, letterSpacing: "-0.01em", marginTop: 24 }}>{home.authorityHeading}</h2>
              </div>
              <p style={{ fontSize: 16.5, lineHeight: 1.72, color: "rgba(245,241,233,0.78)" }}>{home.authorityBody}</p>
            </div>
          </Reveal>
          <Reveal style={{ marginTop: "clamp(44px,5vw,64px)", display: "flex", flexWrap: "wrap", gap: "14px 30px", alignItems: "center", borderTop: "1px solid rgba(245,241,233,0.16)", paddingTop: 36 }}>
            {home.affiliations.map((a, i) => (
              <span key={i} className="serif" style={{ fontWeight: 400, fontSize: "clamp(17px,1.9vw,22px)", color: "rgba(245,241,233,0.92)", letterSpacing: "0.01em" }}>{a}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INSIGHTS TEASER */}
      <section className="container" style={{ paddingTop: "clamp(64px,9vw,116px)", paddingBottom: "clamp(64px,9vw,116px)" }}>
        <Reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: "clamp(36px,4vw,52px)" }}>
          <div>
            <Kicker>Insights</Kicker>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,3.8vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", color: "var(--ink)", marginTop: 22 }}>{home.insightsHeading}</h2>
          </div>
          <Link href="/insights" className="link-arrow" style={{ fontSize: 14.5 }}>
            All insights <ArrowRight size={15} />
          </Link>
        </Reveal>
        <div className="insights-teaser">
          {home.insights.map((i, idx) => (
            <Link key={idx} href="/insights" className="insight-teaser-card">
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan)" }}>{i.kicker}</span>
              <h3 className="serif" style={{ fontWeight: 500, fontSize: 22, lineHeight: 1.26, color: "var(--ink)", marginTop: 16, letterSpacing: "-0.005em" }}>{i.title}</h3>
              <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.62, color: "var(--muted)" }}>{i.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="container" style={{ paddingBottom: "clamp(64px,8vw,104px)" }}>
        <Reveal style={{ background: "var(--card)", border: "1px solid rgba(21,36,44,0.12)", borderRadius: 3, padding: "clamp(40px,6vw,80px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 22 }}>Get in touch</div>
          <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,4.4vw,52px)", lineHeight: 1.08, letterSpacing: "-0.015em", color: "var(--ink)", maxWidth: "16em", margin: "0 auto" }}>{home.ctaHeading}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 38 }}>
            <Link href="/contact" className="btn-primary">Start a conversation</Link>
            <a href={`mailto:${site.email}`} className="btn-outline">{site.email}</a>
          </div>
        </Reveal>
      </section>

      <Footer site={site} />
    </div>
  );
}
