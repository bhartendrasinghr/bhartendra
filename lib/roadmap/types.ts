import raw from "./backlog.json";

/**
 * A single roadmap / backlog item, consolidated across all Third-Party
 * and Investment product spreadsheets. Field names mirror the source
 * Excel columns so the data stays auditable against the originals.
 */
export interface BacklogItem {
  key: string; // stable unique key for client-side overrides
  id: string;
  name: string;
  product: string;
  stakeholder: string;
  what: string;
  why: string;
  impactArea: string;
  impact: string; // H | M | L (raw)
  effort: string; // H | M | L (raw)
  score: string; // raw score from sheet (may be blank)
  priority: string; // P0 | P1 | P2 | Hold
  sequence: string; // Now | Next | Later (may be blank)
  source: string; // PM | Business
  dependencies: string;
  status: string;
  measured: string;
  postDecision: string;
  group: "A" | "B";
  domain: "Third-Party Products" | "Investment Products";
  fileTag: "TPP" | "IMP";
  scoreNum: number | null;
  quickWin: boolean;
  highImpact: boolean;
}

export const BACKLOG: BacklogItem[] = (raw as Omit<BacklogItem, "key">[]).map(
  (i, idx) => ({ ...i, key: `${i.fileTag}:${i.group}:${i.id}:${idx}` })
);

export const GROUP_LABEL: Record<string, string> = {
  A: "Product Initiatives",
  B: "Business Requirements",
};

/** Canonical display order for the user's product portfolio. */
export const PRODUCT_ORDER = [
  "Mutual Fund",
  "Bonds",
  "Fixed Deposit",
  "Insurance",
  "IMP/IAP (Stock Portfolio)",
  "IAP",
  "Restock",
  "Portfolio Review",
  "Cross-product",
];

export const STATUS_ORDER = [
  "Backlog",
  "Pending",
  "In Dev",
  "In Progress",
  "In UAT",
  "Ongoing",
  "Live",
  "Parked",
];

export const PRIORITY_ORDER = ["P0", "P1", "P2", "Hold", "—"];
export const SEQUENCE_ORDER = ["Now", "Next", "Later"];

/** Tailwind classes for status pills. */
export const STATUS_STYLE: Record<string, string> = {
  Backlog: "bg-slate-100 text-slate-600 ring-slate-200",
  Pending: "bg-orange-50 text-orange-700 ring-orange-200",
  "In Dev": "bg-sky-50 text-sky-700 ring-sky-200",
  "In Progress": "bg-amber-50 text-amber-700 ring-amber-200",
  "In UAT": "bg-violet-50 text-violet-700 ring-violet-200",
  Ongoing: "bg-teal-50 text-teal-700 ring-teal-200",
  Live: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Parked: "bg-gray-100 text-gray-500 ring-gray-200",
};

export const PRIORITY_STYLE: Record<string, string> = {
  P0: "bg-rose-50 text-rose-700 ring-rose-200",
  P1: "bg-amber-50 text-amber-700 ring-amber-200",
  P2: "bg-slate-100 text-slate-600 ring-slate-200",
  Hold: "bg-gray-100 text-gray-500 ring-gray-200",
  "—": "bg-gray-50 text-gray-400 ring-gray-200",
};

export const IMPACT_STYLE: Record<string, string> = {
  H: "bg-rose-50 text-rose-700 ring-rose-200",
  M: "bg-amber-50 text-amber-700 ring-amber-200",
  L: "bg-slate-100 text-slate-600 ring-slate-200",
};

/**
 * Effective roadmap lane. Many items have no explicit sequence yet, so we
 * derive a sensible default from leadership priority (P0 → Now, P1 → Next,
 * everything else → Later). Explicit sequence always wins.
 */
export function effectiveSequence(item: BacklogItem): "Now" | "Next" | "Later" {
  if (item.sequence === "Now" || item.sequence === "Next" || item.sequence === "Later") {
    return item.sequence;
  }
  if (item.priority === "P0") return "Now";
  if (item.priority === "P1") return "Next";
  return "Later";
}

export function priorityKey(item: BacklogItem): string {
  return item.priority || "—";
}
