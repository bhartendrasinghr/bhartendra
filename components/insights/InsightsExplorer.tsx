"use client";

import { useState } from "react";
import type { Insight } from "@/lib/content";

export default function InsightsExplorer({
  categories,
  items,
}: {
  categories: string[];
  items: Insight[];
}) {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? items : items.filter((i) => i.cat === active);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          borderBottom: "1px solid rgba(21,36,44,0.14)",
          paddingBottom: 18,
          marginBottom: "clamp(28px,3vw,44px)",
        }}
      >
        {categories.map((label) => {
          const on = label === active;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              style={{
                fontFamily: "inherit",
                fontSize: 13.5,
                fontWeight: 600,
                letterSpacing: "0.01em",
                padding: "9px 16px",
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.25s",
                whiteSpace: "nowrap",
                background: on ? "var(--teal)" : "transparent",
                color: on ? "var(--cream)" : "var(--muted)",
                border: on ? "1px solid var(--teal)" : "1px solid rgba(21,36,44,0.18)",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="cell-grid cell-grid-3">
        {visible.map((i, idx) => (
          <a key={idx} href="/contact" className="insight-card">
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)" }}>{i.cat}</span>
            <h3 className="serif" style={{ fontWeight: 500, fontSize: "clamp(20px,2vw,23px)", lineHeight: 1.26, color: "var(--ink)", marginTop: 16, letterSpacing: "-0.005em" }}>{i.title}</h3>
            <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.62, color: "var(--muted)" }}>{i.excerpt}</p>
            <div className="mono" style={{ marginTop: "auto", paddingTop: 22, display: "flex", alignItems: "center", gap: 12, fontSize: 12.5, color: "var(--faint)" }}>
              <span>{i.venue}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#c3b9a8" }} />
              <span>{i.year}</span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
