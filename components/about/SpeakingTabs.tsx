"use client";

import { useState } from "react";
import type { SpeakingEntry } from "@/lib/content";

export default function SpeakingTabs({
  groups,
}: {
  groups: { label: string; entries: SpeakingEntry[] }[];
}) {
  const [active, setActive] = useState(0);
  const entries = groups[active]?.entries ?? [];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          borderBottom: "1px solid rgba(21,36,44,0.14)",
          marginBottom: 8,
        }}
      >
        {groups.map((g, i) => (
          <button
            key={g.label}
            onClick={() => setActive(i)}
            style={{
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.02em",
              padding: "13px 18px",
              border: "none",
              cursor: "pointer",
              borderRadius: "2px 2px 0 0",
              background: "transparent",
              transition: "color 0.25s",
              whiteSpace: "nowrap",
              marginBottom: -1,
              color: i === active ? "var(--teal)" : "var(--faint)",
              borderBottom:
                i === active ? "2px solid var(--teal)" : "2px solid transparent",
            }}
          >
            {g.label}
            <span className="mono" style={{ fontSize: 11, marginLeft: 8, opacity: 0.7 }}>
              {g.entries.length}
            </span>
          </button>
        ))}
      </div>

      <div>
        {entries.map((e, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "clamp(14px,2.5vw,32px)",
              alignItems: "baseline",
              padding: "22px 0",
              borderBottom: "1px solid rgba(21,36,44,0.10)",
            }}
          >
            <span className="serif" style={{ fontSize: 15, color: "var(--faint)", minWidth: 30 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="serif" style={{ fontWeight: 500, fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.34, color: "var(--ink)" }}>
                {e.title}
              </div>
              <div style={{ marginTop: 6, fontSize: 14.5, lineHeight: 1.5, color: "var(--muted)" }}>
                {e.meta}
              </div>
            </div>
            <span className="mono" style={{ fontSize: 13, color: "var(--teal)", whiteSpace: "nowrap" }}>
              {e.year}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
