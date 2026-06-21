"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  Content,
  SiteContent,
  HomeContent,
  AboutContent,
  CoursesContent,
  InsightsContent,
  ContactContent,
} from "@/lib/content";
import {
  TextField,
  TextArea,
  StringListEditor,
  ListEditor,
} from "./fields";

type Tab = "site" | "home" | "about" | "courses" | "insights" | "contact";
const TABS: { id: Tab; label: string }[] = [
  { id: "site", label: "Site" },
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "courses", label: "Courses" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
];

export default function AdminEditor({ initial }: { initial: Content }) {
  const router = useRouter();
  const [content, setContent] = useState<Content>(initial);
  const [tab, setTab] = useState<Tab>("site");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const setSite = (p: Partial<SiteContent>) => setContent((c) => ({ ...c, site: { ...c.site, ...p } }));
  const setHome = (p: Partial<HomeContent>) => setContent((c) => ({ ...c, home: { ...c.home, ...p } }));
  const setAbout = (p: Partial<AboutContent>) => setContent((c) => ({ ...c, about: { ...c.about, ...p } }));
  const setCourses = (p: Partial<CoursesContent>) => setContent((c) => ({ ...c, courses: { ...c.courses, ...p } }));
  const setInsights = (p: Partial<InsightsContent>) => setContent((c) => ({ ...c, insights: { ...c.insights, ...p } }));
  const setContact = (p: Partial<ContactContent>) => setContent((c) => ({ ...c, contact: { ...c.contact, ...p } }));

  const save = async () => {
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(data.error || "Save failed.");
        return;
      }
      setStatus("saved");
      setMessage("Changes saved.");
      router.refresh();
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setMessage("Network error.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const { site, home, about, courses, insights, contact } = content;

  return (
    <div className="admin-shell">
      <header className="admin-bar">
        <div className="admin-bar-inner">
          <div>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)" }}>Eight Bridges</div>
            <div className="serif" style={{ fontSize: 20, fontWeight: 500, color: "var(--ink)" }}>Content admin</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {message && (
              <span style={{ fontSize: 13, color: status === "error" ? "#b3261e" : "var(--teal)" }}>{message}</span>
            )}
            <a href="/" target="_blank" rel="noopener" className="admin-btn-ghost">View site</a>
            <button onClick={logout} className="admin-btn-ghost">Log out</button>
            <button onClick={save} className="btn-primary" disabled={status === "saving"} style={{ padding: "12px 22px", opacity: status === "saving" ? 0.7 : 1 }}>
              {status === "saving" ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
        <nav className="admin-tabs">
          {TABS.map((t) => (
            <button key={t.id} className={`admin-tab${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="admin-main">
        {tab === "site" && (
          <Section title="Site & footer">
            <TextField label="Brand" value={site.brand} onChange={(v) => setSite({ brand: v })} />
            <TextField label="Owner name" value={site.owner} onChange={(v) => setSite({ owner: v })} />
            <TextField label="Contact email" value={site.email} onChange={(v) => setSite({ email: v })} />
            <TextField label="LinkedIn URL" value={site.linkedin} onChange={(v) => setSite({ linkedin: v })} />
            <TextField label="Footer year" value={String(site.year)} onChange={(v) => setSite({ year: Number(v) || site.year })} />
            <TextArea label="Footer tagline" value={site.footerTagline} onChange={(v) => setSite({ footerTagline: v })} />
          </Section>
        )}

        {tab === "home" && (
          <>
            <Section title="Hero">
              <TextField label="Kicker" value={home.heroKicker} onChange={(v) => setHome({ heroKicker: v })} />
              <TextField label="Headline (before italic)" value={home.heroHeadlinePre} onChange={(v) => setHome({ heroHeadlinePre: v })} />
              <TextField label="Headline (italic word)" value={home.heroHeadlineEm} onChange={(v) => setHome({ heroHeadlineEm: v })} />
              <TextField label="Headline (after italic)" value={home.heroHeadlinePost} onChange={(v) => setHome({ heroHeadlinePost: v })} />
              <TextArea label="Hero body" value={home.heroBody} onChange={(v) => setHome({ heroBody: v })} />
            </Section>
            <Section title="Stats strip">
              <ListEditor label="Stats" items={home.stats} fields={[{ key: "num", label: "Number" }, { key: "label", label: "Label" }]} template={{ num: "", label: "" }} onChange={(v) => setHome({ stats: v })} />
            </Section>
            <Section title="About preview">
              <TextField label="Kicker" value={home.aboutKicker} onChange={(v) => setHome({ aboutKicker: v })} />
              <TextArea label="Heading" value={home.aboutHeading} onChange={(v) => setHome({ aboutHeading: v })} />
              <TextArea label="Body" value={home.aboutBody} rows={5} onChange={(v) => setHome({ aboutBody: v })} />
              <StringListEditor label="Badges" items={home.aboutBadges} onChange={(v) => setHome({ aboutBadges: v })} />
            </Section>
            <Section title="Eight Bridges grid">
              <TextField label="Kicker" value={home.bridgesKicker} onChange={(v) => setHome({ bridgesKicker: v })} />
              <TextField label="Heading" value={home.bridgesHeading} onChange={(v) => setHome({ bridgesHeading: v })} />
              <TextArea label="Body" value={home.bridgesBody} onChange={(v) => setHome({ bridgesBody: v })} />
              <ListEditor label="Bridges" items={home.bridges} fields={[{ key: "no", label: "Display no. (e.g. 01)" }, { key: "n", label: "Number (n)" }, { key: "title", label: "Title", type: "textarea" }]} template={{ no: "", n: 0, title: "" }} onChange={(v) => setHome({ bridges: v as HomeContent["bridges"] })} />
            </Section>
            <Section title="Authority band">
              <TextField label="Kicker" value={home.authorityKicker} onChange={(v) => setHome({ authorityKicker: v })} />
              <TextArea label="Heading" value={home.authorityHeading} onChange={(v) => setHome({ authorityHeading: v })} />
              <TextArea label="Body" value={home.authorityBody} rows={4} onChange={(v) => setHome({ authorityBody: v })} />
              <StringListEditor label="Affiliations" items={home.affiliations} onChange={(v) => setHome({ affiliations: v })} />
            </Section>
            <Section title="Insights teaser">
              <TextField label="Heading" value={home.insightsHeading} onChange={(v) => setHome({ insightsHeading: v })} />
              <ListEditor label="Teaser cards" items={home.insights} fields={[{ key: "kicker", label: "Kicker" }, { key: "title", label: "Title", type: "textarea" }, { key: "excerpt", label: "Excerpt", type: "textarea" }]} template={{ kicker: "", title: "", excerpt: "" }} onChange={(v) => setHome({ insights: v })} />
            </Section>
            <Section title="Contact CTA">
              <TextArea label="Heading" value={home.ctaHeading} onChange={(v) => setHome({ ctaHeading: v })} />
            </Section>
          </>
        )}

        {tab === "about" && (
          <>
            <Section title="Hero">
              <TextArea label="Intro (italic)" value={about.heroIntro} onChange={(v) => setAbout({ heroIntro: v })} />
              <TextArea label="Body" value={about.heroBody} rows={4} onChange={(v) => setAbout({ heroBody: v })} />
            </Section>
            <Section title="Profile narrative">
              <TextArea label="Lead paragraph" value={about.profileLead} rows={3} onChange={(v) => setAbout({ profileLead: v })} />
              <StringListEditor label="Body paragraphs" items={about.profileBody} multiline onChange={(v) => setAbout({ profileBody: v })} />
            </Section>
            <Section title="Career timeline">
              <ListEditor label="Timeline" items={about.timeline} fields={[{ key: "period", label: "Period" }, { key: "role", label: "Role" }, { key: "org", label: "Organisation" }, { key: "detail", label: "Detail", type: "textarea" }, { key: "tags", label: "Tags", type: "tags" }]} template={{ period: "", role: "", org: "", detail: "", tags: [] }} onChange={(v) => setAbout({ timeline: v })} />
            </Section>
            <Section title="Education & credentials">
              <ListEditor label="Credentials" items={about.credentials} fields={[{ key: "title", label: "Title" }, { key: "note", label: "Note" }]} template={{ title: "", note: "" }} onChange={(v) => setAbout({ credentials: v })} />
            </Section>
            <Section title="Speaking & faculty">
              <TextField label="Heading" value={about.speakingHeading} onChange={(v) => setAbout({ speakingHeading: v })} />
              <ListEditor label="Global Conferences" items={about.conferences} fields={SPEAKING_FIELDS} template={{ title: "", meta: "", year: "" }} onChange={(v) => setAbout({ conferences: v })} />
              <ListEditor label="Business Schools" items={about.bschools} fields={SPEAKING_FIELDS} template={{ title: "", meta: "", year: "" }} onChange={(v) => setAbout({ bschools: v })} />
              <ListEditor label="Regulators & Exchanges" items={about.regulators} fields={SPEAKING_FIELDS} template={{ title: "", meta: "", year: "" }} onChange={(v) => setAbout({ regulators: v })} />
            </Section>
            <Section title="CTA">
              <TextArea label="Heading" value={about.ctaHeading} onChange={(v) => setAbout({ ctaHeading: v })} />
            </Section>
          </>
        )}

        {tab === "courses" && (
          <>
            <Section title="Hero">
              <TextArea label="Hero body" value={courses.heroBody} rows={4} onChange={(v) => setCourses({ heroBody: v })} />
            </Section>
            <Section title="Bridges list">
              <ListEditor label="Bridges" items={courses.bridges} fields={[{ key: "no", label: "Display no." }, { key: "n", label: "Number (n)" }, { key: "title", label: "Title", type: "textarea" }, { key: "blurb", label: "Blurb", type: "textarea" }, { key: "tags", label: "Tags", type: "tags" }, { key: "featured", label: "Featured (links to deep-dive)", type: "bool" }]} template={{ no: "", n: 0, title: "", blurb: "", tags: [], featured: false }} onChange={(v) => setCourses({ bridges: v as CoursesContent["bridges"] })} />
            </Section>
            <Section title="Featured deep-dive (Bridge 3)">
              <TextArea label="Quote" value={courses.featuredQuote} rows={3} onChange={(v) => setCourses({ featuredQuote: v })} />
              <TextArea label="Body" value={courses.featuredBody} rows={4} onChange={(v) => setCourses({ featuredBody: v })} />
              <StringListEditor label="Who should attend" items={courses.whoShouldAttend} multiline onChange={(v) => setCourses({ whoShouldAttend: v })} />
              <StringListEditor label="Potential roles & employers" items={courses.employers} multiline onChange={(v) => setCourses({ employers: v })} />
              <ListEditor label="Curriculum coverage" items={courses.curriculum} fields={[{ key: "no", label: "No." }, { key: "title", label: "Title" }, { key: "detail", label: "Detail", type: "textarea" }]} template={{ no: "", title: "", detail: "" }} onChange={(v) => setCourses({ curriculum: v })} />
            </Section>
            <Section title="CTA">
              <TextArea label="Heading" value={courses.ctaHeading} onChange={(v) => setCourses({ ctaHeading: v })} />
              <TextArea label="Body" value={courses.ctaBody} onChange={(v) => setCourses({ ctaBody: v })} />
            </Section>
          </>
        )}

        {tab === "insights" && (
          <>
            <Section title="Hero">
              <TextArea label="Hero body" value={insights.heroBody} rows={4} onChange={(v) => setInsights({ heroBody: v })} />
            </Section>
            <Section title="Featured insight">
              <TextField label="Kicker" value={insights.featuredKicker} onChange={(v) => setInsights({ featuredKicker: v })} />
              <TextArea label="Title" value={insights.featuredTitle} onChange={(v) => setInsights({ featuredTitle: v })} />
              <TextArea label="Excerpt" value={insights.featuredExcerpt} rows={3} onChange={(v) => setInsights({ featuredExcerpt: v })} />
              <TextField label="Venue" value={insights.featuredVenue} onChange={(v) => setInsights({ featuredVenue: v })} />
              <TextField label="Year" value={insights.featuredYear} onChange={(v) => setInsights({ featuredYear: v })} />
            </Section>
            <Section title="Categories & grid">
              <StringListEditor label="Filter categories (keep 'All' first)" items={insights.categories} onChange={(v) => setInsights({ categories: v })} />
              <ListEditor label="Insight cards" items={insights.items} fields={[{ key: "cat", label: "Category" }, { key: "title", label: "Title", type: "textarea" }, { key: "excerpt", label: "Excerpt", type: "textarea" }, { key: "venue", label: "Venue" }, { key: "year", label: "Year" }]} template={{ cat: "", title: "", excerpt: "", venue: "", year: "" }} onChange={(v) => setInsights({ items: v })} />
            </Section>
            <Section title="CTA">
              <TextArea label="Heading" value={insights.ctaHeading} onChange={(v) => setInsights({ ctaHeading: v })} />
            </Section>
          </>
        )}

        {tab === "contact" && (
          <Section title="Contact page">
            <TextArea label="Heading" value={contact.heroHeading} onChange={(v) => setContact({ heroHeading: v })} />
            <TextArea label="Body" value={contact.heroBody} rows={4} onChange={(v) => setContact({ heroBody: v })} />
            <p className="admin-empty">Email and LinkedIn shown on this page are managed under the <strong>Site</strong> tab.</p>
          </Section>
        )}
      </main>
    </div>
  );
}

const SPEAKING_FIELDS = [
  { key: "title", label: "Title", type: "textarea" as const },
  { key: "meta", label: "Venue / meta" },
  { key: "year", label: "Year" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="admin-section">
      <h2 className="admin-section-title">{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </section>
  );
}
