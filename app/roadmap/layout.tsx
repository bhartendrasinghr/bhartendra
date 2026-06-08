import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Roadmap & Backlog — FY 2026-27 | Motilal Oswal",
  description:
    "Consolidated product roadmap, backlog and prioritisation dashboard for Third-Party & Investment Products.",
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-mo-bg text-mo-text">{children}</div>;
}
