import Link from "next/link";
import { getContent } from "@/lib/content";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import Kicker from "@/components/site/Kicker";
import { ArrowRight } from "@/components/site/icons";
import SpeakingTabs from "@/components/about/SpeakingTabs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About · Krishnan Ranganathan",
};

export default async function AboutPage() {
  const { site, about } = await getContent();

  return (
    <div className="page">
      <Nav brand={site.brand} />

      {/* PAGE HERO */}
      <section className="container" style={{ paddingTop: "clamp(48px,6vw,84px)", paddingBottom: "clamp(36px,4vw,56px)" }}>
        <div className="grid-2 about-hero">
          <Reveal>
            <Kicker>About</Kicker>
            <h1 className="serif" style={{ fontWeight: 400, fontSize: "clamp(38px,5vw,62px)", lineHeight: 1.06, letterSpacing: "-0.015em", color: "var(--ink)", marginTop: 26 }}>{site.owner}</h1>
            <p className="serif" style={{ marginTop: 22, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(18px,2vw,23px)", lineHeight: 1.5, color: "var(--teal)" }}>{about.heroIntro}</p>
            <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.74, color: "var(--muted)", maxWidth: "38em" }}>{about.heroBody}</p>
          </Reveal>
          <Reveal style={{ position: "relative" }}>
            <div style={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 26px 60px -30px rgba(13,59,68,0.5)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/headshot.png" alt={site.owner} style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
            <div style={{ position: "absolute", bottom: -16, right: -16, zIndex: -1, width: 140, height: 140, border: "1px solid rgba(13,59,68,0.28)" }} />
          </Reveal>
        </div>
      </section>

      {/* NARRATIVE */}
      <section style={{ background: "var(--card)", borderTop: "1px solid rgba(21,36,44,0.10)", borderBottom: "1px solid rgba(21,36,44,0.10)" }}>
        <div className="container" style={{ paddingTop: "clamp(56px,7vw,96px)", paddingBottom: "clamp(56px,7vw,96px)" }}>
          <div className="narr-grid">
            <Reveal>
              <div className="mono" style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)" }}>Profile</div>
            </Reveal>
            <Reveal style={{ maxWidth: "46em" }}>
              <p className="serif" style={{ fontWeight: 400, fontSize: "clamp(21px,2.3vw,27px)", lineHeight: 1.5, color: "var(--ink)", letterSpacing: "-0.005em" }}>{about.profileLead}</p>
              <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 20, fontSize: 17, lineHeight: 1.78, color: "var(--muted)" }}>
                {about.profileBody.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAREER TIMELINE */}
      <section className="container" style={{ paddingTop: "clamp(60px,8vw,104px)", paddingBottom: "clamp(60px,8vw,104px)" }}>
        <Reveal style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
          <Kicker>Career</Kicker>
          <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,3.8vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", color: "var(--ink)", marginTop: 20 }}>Two decades across the world&rsquo;s markets</h2>
        </Reveal>
        <div>
          {about.timeline.map((t, i) => (
            <Reveal key={i}>
              <div className="tl-row" style={{ padding: "clamp(28px,3vw,40px) 0", borderTop: "1px solid rgba(21,36,44,0.13)" }}>
                <div className="mono" style={{ fontSize: 13, letterSpacing: "0.06em", color: "var(--cyan)", paddingTop: 6 }}>{t.period}</div>
                <div>
                  <h3 className="serif" style={{ fontWeight: 500, fontSize: "clamp(22px,2.4vw,28px)", lineHeight: 1.2, color: "var(--ink)" }}>{t.role}</h3>
                  <div style={{ marginTop: 6, fontSize: 15, fontWeight: 600, letterSpacing: "0.02em", color: "var(--teal)" }}>{t.org}</div>
                  <p style={{ marginTop: 16, fontSize: 16.5, lineHeight: 1.72, color: "var(--muted)", maxWidth: "44em" }}>{t.detail}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 18 }}>
                    {t.tags.map((g, j) => (
                      <span key={j} className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--teal)", border: "1px solid rgba(13,59,68,0.2)", padding: "6px 12px", borderRadius: 2, whiteSpace: "nowrap" }}>{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: "1px solid rgba(21,36,44,0.13)" }} />
        </div>
      </section>

      {/* EDUCATION & CREDENTIALS */}
      <section style={{ background: "var(--teal)", color: "var(--cream)" }}>
        <div className="container" style={{ paddingTop: "clamp(56px,7vw,96px)", paddingBottom: "clamp(56px,7vw,96px)" }}>
          <Reveal>
            <Kicker color="var(--cyan-light)">Education &amp; Credentials</Kicker>
          </Reveal>
          <div className="cell-grid cell-grid-4 creds-grid" style={{ marginTop: 36, background: "rgba(245,241,233,0.16)", border: "1px solid rgba(245,241,233,0.16)" }}>
            {about.credentials.map((c, i) => (
              <div key={i} style={{ background: "var(--teal)", padding: "32px 26px", display: "flex", flexDirection: "column", minHeight: 200 }}>
                <div className="serif" style={{ fontWeight: 400, fontSize: "clamp(22px,2.4vw,28px)", lineHeight: 1.16, color: "var(--cream)" }}>{c.title}</div>
                <div style={{ marginTop: "auto", paddingTop: 18, fontSize: 14, lineHeight: 1.5, color: "rgba(245,241,233,0.7)" }}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKING & FACULTY */}
      <section className="container" style={{ paddingTop: "clamp(60px,8vw,104px)", paddingBottom: "clamp(60px,8vw,104px)" }}>
        <Reveal style={{ marginBottom: "clamp(32px,4vw,48px)" }}>
          <Kicker>Speaking &amp; Faculty</Kicker>
          <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,3.8vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", color: "var(--ink)", marginTop: 20 }}>{about.speakingHeading}</h2>
        </Reveal>
        <SpeakingTabs
          groups={[
            { label: "Global Conferences", entries: about.conferences },
            { label: "Business Schools", entries: about.bschools },
            { label: "Regulators & Exchanges", entries: about.regulators },
          ]}
        />
      </section>

      {/* CTA */}
      <section className="container" style={{ paddingBottom: "clamp(64px,8vw,104px)" }}>
        <Reveal style={{ background: "var(--card)", border: "1px solid rgba(21,36,44,0.12)", borderRadius: 3, padding: "clamp(40px,6vw,72px)", display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "space-between" }}>
          <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(26px,3.2vw,38px)", lineHeight: 1.14, letterSpacing: "-0.01em", color: "var(--ink)", maxWidth: "14em" }}>{about.ctaHeading}</h2>
          <Link href="/courses" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
            View the programmes
            <ArrowRight />
          </Link>
        </Reveal>
      </section>

      <Footer site={site} />
    </div>
  );
}
