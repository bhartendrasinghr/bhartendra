import Link from "next/link";
import { getContent } from "@/lib/content";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import Kicker from "@/components/site/Kicker";
import { ArrowRight } from "@/components/site/icons";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Courses · The Eight Bridges",
};

export default async function CoursesPage() {
  const { site, courses } = await getContent();

  return (
    <div className="page">
      <Nav brand={site.brand} />

      {/* PAGE HERO */}
      <section className="container" style={{ paddingTop: "clamp(48px,6vw,88px)", paddingBottom: "clamp(36px,4vw,52px)" }}>
        <Reveal style={{ maxWidth: 830 }}>
          <Kicker>The Programmes</Kicker>
          <h1 className="serif" style={{ fontWeight: 400, fontSize: "clamp(42px,5.6vw,72px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 26 }}>The Eight Bridges</h1>
          <p style={{ marginTop: 24, fontSize: "clamp(17px,1.7vw,20px)", lineHeight: 1.7, color: "var(--muted)", maxWidth: "44em" }}>{courses.heroBody}</p>
        </Reveal>
      </section>

      {/* BRIDGES LIST */}
      <section className="container" style={{ paddingTop: "clamp(20px,3vw,40px)", paddingBottom: "clamp(40px,5vw,64px)" }}>
        {courses.bridges.map((b) => (
          <Reveal key={b.n}>
            <div className="course-row" style={{ padding: "clamp(30px,3.4vw,44px) 0", borderTop: "1px solid rgba(21,36,44,0.14)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span className="serif" style={{ fontWeight: 300, fontSize: "clamp(44px,5vw,64px)", lineHeight: 0.9, color: "var(--cyan)" }}>{b.no}</span>
                <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--faint)" }}>Bridge {b.n}</span>
              </div>
              <div>
                <h2 className="serif" style={{ fontWeight: 500, fontSize: "clamp(23px,2.7vw,32px)", lineHeight: 1.18, letterSpacing: "-0.01em", color: "var(--ink)" }}>{b.title}</h2>
                <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.7, color: "var(--muted)", maxWidth: "42em" }}>{b.blurb}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {b.tags.map((g, j) => (
                    <span key={j} className="mono" style={{ fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--teal)", border: "1px solid rgba(13,59,68,0.2)", padding: "6px 11px", borderRadius: 2, whiteSpace: "nowrap" }}>{g}</span>
                  ))}
                </div>
                {b.featured && (
                  <a href="#bridge3" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--teal)", borderBottom: "2px solid var(--cyan)", paddingBottom: 3 }}>
                    View overview <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
        <div style={{ borderTop: "1px solid rgba(21,36,44,0.14)" }} />
      </section>

      {/* FEATURED DEEP-DIVE */}
      <section id="bridge3" style={{ background: "var(--card)", borderTop: "1px solid rgba(21,36,44,0.10)", borderBottom: "1px solid rgba(21,36,44,0.10)", scrollMarginTop: 90 }}>
        <div className="container" style={{ paddingTop: "clamp(56px,7vw,100px)", paddingBottom: "clamp(56px,7vw,100px)" }}>
          <Reveal>
            <div className="grid-2 feat-head" style={{ alignItems: "start", gap: "clamp(32px,5vw,72px)" }}>
              <div>
                <Kicker>Featured · Bridge 3</Kicker>
                <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.12, letterSpacing: "-0.015em", color: "var(--ink)", marginTop: 22 }}>Financial Risk Management and Its Changing Characteristics</h2>
                <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                  <span className="mono" style={{ fontSize: 12, letterSpacing: "0.06em", color: "var(--teal)", background: "rgba(13,59,68,0.07)", padding: "9px 15px", borderRadius: 2 }}>20 HOURS</span>
                  <span className="mono" style={{ fontSize: 12, letterSpacing: "0.06em", color: "var(--teal)", background: "rgba(13,59,68,0.07)", padding: "9px 15px", borderRadius: 2 }}>PRACTITIONER-LED</span>
                </div>
              </div>
              <div>
                <p className="serif" style={{ fontStyle: "italic", fontWeight: 400, fontSize: "clamp(19px,2vw,23px)", lineHeight: 1.5, color: "var(--teal)" }}>{courses.featuredQuote}</p>
                <p style={{ marginTop: 22, fontSize: 16.5, lineHeight: 1.74, color: "var(--muted)" }}>{courses.featuredBody}</p>
              </div>
            </div>
          </Reveal>

          <div className="grid-2 feat-cols" style={{ gap: "clamp(24px,3vw,40px)", marginTop: "clamp(44px,5vw,64px)" }}>
            <Reveal style={{ background: "var(--cream)", border: "1px solid rgba(21,36,44,0.1)", borderRadius: 3, padding: "clamp(26px,3vw,38px)" }}>
              <div className="mono" style={{ fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 20 }}>Who Should Attend</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {courses.whoShouldAttend.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 13, fontSize: 16, lineHeight: 1.6, color: "var(--ink)" }}>
                    <span style={{ color: "var(--cyan)", fontWeight: 700 }}>&middot;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal style={{ background: "var(--cream)", border: "1px solid rgba(21,36,44,0.1)", borderRadius: 3, padding: "clamp(26px,3vw,38px)" }}>
              <div className="mono" style={{ fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 20 }}>Potential Roles &amp; Employers</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {courses.employers.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 13, fontSize: 16, lineHeight: 1.6, color: "var(--ink)" }}>
                    <span style={{ color: "var(--cyan)", fontWeight: 700 }}>&middot;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal style={{ marginTop: "clamp(44px,5vw,64px)" }}>
            <div className="mono" style={{ fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 28 }}>Curriculum Coverage</div>
            <div className="cell-grid cell-grid-2">
              {courses.curriculum.map((c, i) => (
                <div key={i} style={{ background: "var(--card)", padding: "26px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <span className="serif" style={{ fontSize: 20, color: "var(--faint)", lineHeight: 1.3 }}>{c.no}</span>
                  <div>
                    <div className="serif" style={{ fontWeight: 500, fontSize: 18.5, lineHeight: 1.32, color: "var(--ink)" }}>{c.title}</div>
                    <div style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)" }}>{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container" style={{ paddingTop: "clamp(56px,7vw,96px)", paddingBottom: "clamp(56px,7vw,96px)" }}>
        <Reveal style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
          <h2 className="serif" style={{ fontWeight: 400, fontSize: "clamp(30px,4vw,48px)", lineHeight: 1.1, letterSpacing: "-0.015em", color: "var(--ink)" }}>{courses.ctaHeading}</h2>
          <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.7, color: "var(--muted)" }}>{courses.ctaBody}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 34 }}>
            <Link href="/contact" className="btn-primary">Enquire about a programme</Link>
            <Link href="/insights" className="btn-outline">Read related insights</Link>
          </div>
        </Reveal>
      </section>

      <Footer site={site} />
    </div>
  );
}
