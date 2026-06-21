"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/site/icons";

export default function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    const subject = encodeURIComponent(
      "Eight Bridges enquiry" + (org ? " from " + org : "")
    );
    const body = encodeURIComponent(
      (message || "") +
        "\n\n--\n" +
        (name || "") +
        (org ? ", " + org : "") +
        (from ? "\n" + from : "")
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18, padding: "24px 0" }}>
        <span style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(13,59,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d3b44" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="serif" style={{ fontWeight: 500, fontSize: 26, color: "var(--ink)" }}>Your email is ready to send</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--muted)" }}>
          Your message has opened in your email client, pre-addressed to Krishnan. If it didn&rsquo;t, write directly to{" "}
          <a href={`mailto:${email}`} style={{ color: "var(--teal)", borderBottom: "1px solid var(--cyan)" }}>{email}</a>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="serif" style={{ fontWeight: 500, fontSize: "clamp(22px,2.4vw,28px)", color: "var(--ink)", marginBottom: 6 }}>Send a message</h2>
      <p style={{ fontSize: 14.5, color: "var(--muted)", marginBottom: 28 }}>Fields marked with an asterisk are required.</p>
      <div className="contact-fields">
        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="field-label">Name *</span>
          <input className="field-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="field-label">Email *</span>
          <input className="field-input" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="you@organisation.com" />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 8, gridColumn: "1 / -1" }}>
          <span className="field-label">Organisation</span>
          <input className="field-input" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="School, firm or institution" />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 8, gridColumn: "1 / -1" }}>
          <span className="field-label">Message *</span>
          <textarea className="field-input" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Tell Krishnan what you have in mind: a programme, a guest session, a talk." style={{ resize: "vertical", lineHeight: 1.5 }} />
        </label>
      </div>
      <button onClick={submit} className="btn-primary" style={{ marginTop: 22, width: "100%", justifyContent: "center" }}>
        Send message
        <ArrowRight />
      </button>
      <p style={{ marginTop: 14, fontSize: 12.5, lineHeight: 1.5, color: "var(--faint)" }}>
        This opens a pre-filled email in your own mail app. Nothing is stored or sent automatically.
      </p>
    </div>
  );
}
