import { getContent } from "@/lib/content";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import Kicker from "@/components/site/Kicker";
import ContactForm from "@/components/contact/ContactForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact · Krishnan Ranganathan",
};

export default async function ContactPage() {
  const { site, contact } = await getContent();

  return (
    <div className="page">
      <Nav brand={site.brand} />

      <section className="container" style={{ paddingTop: "clamp(48px,6vw,84px)", paddingBottom: "clamp(56px,7vw,96px)" }}>
        <div className="grid-2 contact-grid">
          <Reveal>
            <Kicker>Get in touch</Kicker>
            <h1 className="serif" style={{ fontWeight: 400, fontSize: "clamp(38px,5vw,62px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 26 }}>{contact.heroHeading}</h1>
            <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.74, color: "var(--muted)", maxWidth: "34em" }}>{contact.heroBody}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 40 }}>
              <a href={`mailto:${site.email}`} className="contact-method">
                <span className="contact-method-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f5f1e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                </span>
                <span>
                  <span className="serif" style={{ display: "block", fontSize: 19, fontWeight: 500, color: "var(--ink)" }}>Email</span>
                  <span style={{ display: "block", marginTop: 3, fontSize: 15, color: "var(--teal)" }}>{site.email}</span>
                </span>
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener" className="contact-method">
                <span className="contact-method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#f5f1e9"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.86V21h-4z" /></svg>
                </span>
                <span>
                  <span className="serif" style={{ display: "block", fontSize: 19, fontWeight: 500, color: "var(--ink)" }}>LinkedIn</span>
                  <span style={{ display: "block", marginTop: 3, fontSize: 15, color: "var(--teal)" }}>Connect with Krishnan</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal style={{ background: "var(--card)", border: "1px solid rgba(21,36,44,0.12)", borderRadius: 3, padding: "clamp(28px,3.4vw,48px)" }}>
            <ContactForm email={site.email} />
          </Reveal>
        </div>
      </section>

      <Footer site={site} />
    </div>
  );
}
