"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import {
  BACKLOG,
  BacklogItem,
  GROUP_LABEL,
  PRODUCT_ORDER,
  STATUS_ORDER,
  PRIORITY_ORDER,
  SEQUENCE_ORDER,
  STATUS_STYLE,
  PRIORITY_STYLE,
  IMPACT_STYLE,
  effectiveSequence,
  priorityKey,
} from "@/lib/roadmap/types";
import { Pill, Kpi, Panel, BarList, BarDatum } from "./ui";
import { useOverrides, Overrides } from "./useOverrides";

const PRIORITY_OPTIONS = ["P0", "P1", "P2", "Hold", ""];

type View = "dashboard" | "priority" | "roadmap" | "backlog";

const ALL = "All";

function countBy(items: BacklogItem[], key: (i: BacklogItem) => string) {
  const m = new Map<string, number>();
  for (const it of items) m.set(key(it), (m.get(key(it)) ?? 0) + 1);
  return m;
}

function orderedBars(
  items: BacklogItem[],
  key: (i: BacklogItem) => string,
  order: string[],
  withHighlight = false,
  color?: string
): BarDatum[] {
  const total = countBy(items, key);
  const high = withHighlight ? countBy(items.filter((i) => i.highImpact), key) : null;
  const keys = [
    ...order.filter((k) => total.has(k)),
    ...Array.from(total.keys())
      .filter((k) => !order.includes(k))
      .sort(),
  ];
  return keys.map((k) => ({
    label: k || "—",
    value: total.get(k) ?? 0,
    highlight: high ? high.get(k) ?? 0 : undefined,
    color,
  }));
}

export default function RoadmapApp() {
  const [view, setView] = useState<View>("dashboard");
  const [domain, setDomain] = useState(ALL);
  const [product, setProduct] = useState(ALL);
  const [group, setGroup] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [priority, setPriority] = useState(ALL);
  const [sequence, setSequence] = useState(ALL);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof BacklogItem | "scoreNum">("scoreNum");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const {
    overrides,
    setPriority: setItemPriority,
    resetPriority,
    resetAll,
  } = useOverrides();

  // Merge browser-local priority overrides into the data so every view —
  // buckets, counts, roadmap lanes, CSV export — reflects the change.
  const data = useMemo(
    () =>
      BACKLOG.map((i) =>
        i.key in overrides ? { ...i, priority: overrides[i.key] } : i
      ),
    [overrides]
  );

  const domains = useMemo(
    () => [ALL, ...Array.from(new Set(BACKLOG.map((i) => i.domain)))],
    []
  );
  const products = useMemo(() => {
    const present = new Set(BACKLOG.map((i) => i.product));
    return [ALL, ...PRODUCT_ORDER.filter((p) => present.has(p))];
  }, []);
  const statuses = useMemo(
    () => [ALL, ...STATUS_ORDER.filter((s) => BACKLOG.some((i) => i.status === s))],
    []
  );
  const stakeholders = useMemo(
    () => Array.from(new Set(BACKLOG.map((i) => i.stakeholder).filter(Boolean))),
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((i) => {
      if (domain !== ALL && i.domain !== domain) return false;
      if (product !== ALL && i.product !== product) return false;
      if (group !== ALL && i.group !== group) return false;
      if (status !== ALL && i.status !== status) return false;
      if (priority !== ALL && priorityKey(i) !== priority) return false;
      if (sequence !== ALL && effectiveSequence(i) !== sequence) return false;
      if (q) {
        const hay = `${i.id} ${i.name} ${i.what} ${i.why} ${i.product} ${i.stakeholder}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [data, domain, product, group, status, priority, sequence, search]);

  const resetFilters = () => {
    setDomain(ALL);
    setProduct(ALL);
    setGroup(ALL);
    setStatus(ALL);
    setPriority(ALL);
    setSequence(ALL);
    setSearch("");
  };
  const filtersActive =
    domain !== ALL ||
    product !== ALL ||
    group !== ALL ||
    status !== ALL ||
    priority !== ALL ||
    sequence !== ALL ||
    search !== "";

  return (
    <>
      {/* Header */}
      <header className="bg-mo-navy">
        <div className="mx-auto max-w-7xl px-5 py-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-mo-gold">
                Motilal Oswal · Third-Party & Investment Products
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
                Product Roadmap &amp; Backlog
                <span className="ml-2 text-mo-gold">FY 2026-27</span>
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-white/60">
                One prioritisation backlog across all products — for tracking, monitoring,
                prioritising and leadership oversight.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/20"
            >
              ← Home
            </Link>
          </div>

          {/* View tabs */}
          <nav className="mt-5 flex gap-1">
            {(
              [
                ["dashboard", "Dashboard"],
                ["priority", "Priorities"],
                ["roadmap", "Roadmap"],
                ["backlog", "Backlog"],
              ] as [View, string][]
            ).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  view === v
                    ? "bg-mo-gold text-mo-navy"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Filter bar */}
      <div className="sticky top-0 z-20 border-b border-black/5 bg-mo-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-5 py-3">
          <Select label="Domain" value={domain} onChange={setDomain} options={domains} />
          <Select label="Product" value={product} onChange={setProduct} options={products} />
          <Select
            label="Group"
            value={group}
            onChange={setGroup}
            options={[ALL, "A", "B"]}
            render={(v) => (v === "A" || v === "B" ? `${v} · ${GROUP_LABEL[v]}` : v)}
          />
          <Select label="Status" value={status} onChange={setStatus} options={statuses} />
          <Select
            label="Priority"
            value={priority}
            onChange={setPriority}
            options={[ALL, ...PRIORITY_ORDER]}
          />
          <Select
            label="Sequence"
            value={sequence}
            onChange={setSequence}
            options={[ALL, ...SEQUENCE_ORDER]}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items…"
            className="h-9 min-w-[160px] flex-1 rounded-lg border border-black/10 bg-white px-3 text-sm text-mo-text placeholder:text-mo-muted/60 focus:border-mo-navy focus:outline-none"
          />
          <span className="text-xs font-medium text-mo-muted">
            {filtered.length} / {BACKLOG.length}
          </span>
          {filtersActive && (
            <button
              onClick={resetFilters}
              className="rounded-lg px-2 py-1 text-xs text-mo-navy underline-offset-2 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-5 py-6">
        {view === "dashboard" && <Dashboard items={filtered} stakeholders={stakeholders} />}
        {view === "priority" && (
          <PriorityBoard
            items={filtered}
            overrides={overrides}
            setPriority={setItemPriority}
            resetPriority={resetPriority}
            resetAll={resetAll}
          />
        )}
        {view === "roadmap" && <Roadmap items={filtered} />}
        {view === "backlog" && (
          <Backlog
            items={filtered}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={(k) => {
              if (k === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
              else {
                setSortKey(k);
                setSortDir(k === "scoreNum" ? "desc" : "asc");
              }
            }}
          />
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-5 pb-10 pt-2 text-[11px] text-mo-muted">
        Consolidated from product backlog workbooks · Suggested score = Impact ÷ Effort (H=3,
        M=2, L=1) · Sequence is derived from leadership priority where not explicitly set ·
        Living document, FY 2026-27.
      </footer>
    </>
  );
}

/* ----------------------------- Filter select ----------------------------- */

function Select({
  label,
  value,
  onChange,
  options,
  render,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  render?: (v: string) => string;
}) {
  return (
    <label className="flex items-center gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-wide text-mo-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-lg border border-black/10 bg-white px-2 text-sm text-mo-text focus:border-mo-navy focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {render ? render(o) : o}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ------------------------------- Dashboard ------------------------------- */

function Dashboard({ items, stakeholders }: { items: BacklogItem[]; stakeholders: string[] }) {
  const p0 = items.filter((i) => i.priority === "P0").length;
  const high = items.filter((i) => i.highImpact).length;
  const quick = items.filter((i) => i.quickWin).length;
  const inProgress = items.filter((i) => i.status === "In Progress").length;
  const inUat = items.filter((i) => i.status === "In UAT").length;
  const backlog = items.filter((i) => i.status === "Backlog" || i.status === "Pending").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label="Total items" value={items.length} />
        <Kpi label="P0 critical" value={p0} accent="text-rose-600" />
        <Kpi label="High impact" value={high} accent="text-mo-gold-dark" />
        <Kpi label="Quick wins" value={quick} accent="text-emerald-600" sub="score ≥ 2" />
        <Kpi label="In progress" value={inProgress} accent="text-amber-600" />
        <Kpi label="In UAT" value={inUat} accent="text-violet-600" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <GroupSummaryCard group="A" items={items} />
        <GroupSummaryCard group="B" items={items} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="By product (gold = high impact)">
          <BarList data={orderedBars(items, (i) => i.product, PRODUCT_ORDER, true)} />
        </Panel>
        <Panel title="By status">
          <BarList
            data={orderedBars(items, (i) => i.status, STATUS_ORDER, false, "bg-mo-navy-light")}
          />
        </Panel>
        <Panel title="By leadership priority">
          <BarList
            data={orderedBars(items, (i) => priorityKey(i), PRIORITY_ORDER, true)}
          />
        </Panel>
        <Panel title="By business stakeholder">
          <BarList
            data={orderedBars(items, (i) => i.stakeholder || "—", stakeholders, false, "bg-mo-navy-light")}
          />
        </Panel>
        <Panel title="Roadmap sequence">
          <BarList
            data={orderedBars(items, (i) => effectiveSequence(i), SEQUENCE_ORDER, true, "bg-emerald-500")}
          />
        </Panel>
        <Panel title="By domain">
          <BarList
            data={orderedBars(
              items,
              (i) => i.domain,
              ["Third-Party Products", "Investment Products"],
              true
            )}
          />
        </Panel>
      </div>

      <ImpactEffortMatrix items={items} />
    </div>
  );
}

function ImpactEffortMatrix({ items }: { items: BacklogItem[] }) {
  const impacts = ["H", "M", "L"];
  const efforts = ["L", "M", "H"];
  const cell = (imp: string, eff: string) =>
    items.filter((i) => i.impact === imp && i.effort === eff);

  return (
    <Panel title="Impact × Effort — prioritisation matrix">
      <div className="flex gap-3">
        <div className="flex flex-col items-center justify-center">
          <span className="rotate-180 text-[11px] font-semibold uppercase tracking-wide text-mo-muted [writing-mode:vertical-rl]">
            Impact →
          </span>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-2">
            {impacts.map((imp) =>
              efforts.map((eff) => {
                const list = cell(imp, eff);
                const isQuickWin = imp === "H" && eff === "L";
                return (
                  <div
                    key={`${imp}-${eff}`}
                    className={`rounded-xl p-3 text-center ring-1 ${
                      isQuickWin
                        ? "bg-emerald-50 ring-emerald-200"
                        : "bg-mo-bg ring-black/5"
                    }`}
                  >
                    <div
                      className={`text-2xl font-bold ${
                        isQuickWin ? "text-emerald-600" : "text-mo-navy"
                      }`}
                    >
                      {list.length}
                    </div>
                    <div className="text-[10px] text-mo-muted">
                      Impact {imp} · Effort {eff}
                      {isQuickWin && (
                        <span className="block font-semibold text-emerald-600">
                          Quick win
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] font-semibold uppercase tracking-wide text-mo-muted">
            <span>← Low effort</span>
            <span>Effort →</span>
            <span>High effort</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* --------------- Group A/B segregation + priority alignment --------------- */

function GroupSummaryCard({ group, items }: { group: "A" | "B"; items: BacklogItem[] }) {
  const list = items.filter((i) => i.group === group);
  const desc =
    group === "A"
      ? "PM-originated ideas that improve product experience, growth & trust."
      : "Raised by business, ops, compliance & partners.";
  const prio = PRIORITY_ORDER.map((p) => ({
    p,
    n: list.filter((i) => priorityKey(i) === p).length,
  })).filter((x) => x.n > 0);
  const high = list.filter((i) => i.highImpact).length;
  const quick = list.filter((i) => i.quickWin).length;

  return (
    <div className="rounded-2xl bg-mo-card p-5 shadow-card ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-mo-gold-dark">
            Group {group}
          </div>
          <h3 className="text-base font-bold text-mo-navy">{GROUP_LABEL[group]}</h3>
          <p className="mt-0.5 max-w-xs text-[11px] text-mo-muted">{desc}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-mo-navy">{list.length}</div>
          <div className="text-[10px] uppercase tracking-wide text-mo-muted">items</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {prio.map(({ p, n }) => (
          <span
            key={p}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ring-1 ring-inset ${PRIORITY_STYLE[p]}`}
          >
            {p === "—" ? "Unset" : p}
            <span className="tabular-nums">{n}</span>
          </span>
        ))}
      </div>

      <div className="mt-3 flex gap-4 text-xs text-mo-muted">
        <span>
          High impact <b className="text-mo-gold-dark">{high}</b>
        </span>
        <span>
          Quick wins <b className="text-emerald-600">{quick}</b>
        </span>
      </div>
    </div>
  );
}

/** Compact, editable item row used in the priority alignment board. */
function ItemRow({
  item,
  edited,
  onChange,
  onReset,
}: {
  item: BacklogItem;
  edited: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
}) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg bg-mo-bg px-2.5 py-2 ring-1 ${
        edited ? "ring-mo-gold/50" : "ring-black/5"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium leading-snug text-mo-text" title={item.what || item.name}>
          {item.name}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          <Pill className="bg-mo-navy/5 text-mo-navy ring-mo-navy/10">{item.product}</Pill>
          {item.impact && <Pill className={IMPACT_STYLE[item.impact]}>Imp {item.impact}</Pill>}
          {item.effort && (
            <Pill className="bg-slate-100 text-slate-600 ring-slate-200">Eff {item.effort}</Pill>
          )}
          <Pill className={STATUS_STYLE[item.status] ?? STATUS_STYLE.Backlog}>{item.status}</Pill>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        {item.scoreNum != null && (
          <span
            className="rounded-md bg-white px-1.5 py-0.5 text-[11px] font-bold text-mo-navy ring-1 ring-black/5"
            title="Suggested score = Impact ÷ Effort"
          >
            {item.scoreNum}
          </span>
        )}
        <div className="flex items-center gap-1">
          {edited && (
            <button
              onClick={onReset}
              title="Reset to source priority"
              className="text-xs text-mo-muted hover:text-mo-navy"
            >
              ↺
            </button>
          )}
          <select
            value={item.priority || ""}
            onChange={(e) => onChange(e.target.value)}
            title="Set leadership priority"
            className={`h-7 rounded-md border bg-white px-1 text-[11px] font-semibold focus:border-mo-navy focus:outline-none ${
              edited ? "border-mo-gold text-mo-gold-dark" : "border-black/10 text-mo-navy"
            }`}
          >
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p || "unset"} value={p}>
                {p || "Unset"}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function GroupPriorityColumn({
  group,
  items,
  overrides,
  setPriority,
  resetPriority,
}: {
  group: "A" | "B";
  items: BacklogItem[];
  overrides: Overrides;
  setPriority: (key: string, value: string) => void;
  resetPriority: (key: string) => void;
}) {
  const list = items.filter((i) => i.group === group);
  const buckets = PRIORITY_ORDER.map((p) => ({
    p,
    rows: list
      .filter((i) => priorityKey(i) === p)
      .sort((a, b) => (b.scoreNum ?? 0) - (a.scoreNum ?? 0)),
  })).filter((b) => b.rows.length > 0);

  return (
    <div className="rounded-2xl bg-mo-card p-4 shadow-card ring-1 ring-black/5">
      <div className="mb-3 flex items-baseline justify-between border-b border-black/5 pb-2">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-mo-gold-dark">
            Group {group}
          </span>
          <h3 className="text-base font-bold text-mo-navy">{GROUP_LABEL[group]}</h3>
        </div>
        <span className="text-sm font-semibold text-mo-muted">{list.length}</span>
      </div>
      {buckets.length === 0 && (
        <p className="py-8 text-center text-xs text-mo-muted">No items</p>
      )}
      <div className="space-y-4">
        {buckets.map(({ p, rows }) => (
          <div key={p}>
            <div className="mb-1.5 flex items-center gap-2">
              <Pill className={PRIORITY_STYLE[p]}>{p === "—" ? "Unprioritised" : p}</Pill>
              <span className="text-[11px] text-mo-muted">
                {rows.length} item{rows.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-1.5">
              {rows.map((it) => (
                <ItemRow
                  key={it.key}
                  item={it}
                  edited={it.key in overrides}
                  onChange={(v) => setPriority(it.key, v)}
                  onReset={() => resetPriority(it.key)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityBoard({
  items,
  overrides,
  setPriority,
  resetPriority,
  resetAll,
}: {
  items: BacklogItem[];
  overrides: Overrides;
  setPriority: (key: string, value: string) => void;
  resetPriority: (key: string) => void;
  resetAll: () => void;
}) {
  const editedCount = Object.keys(overrides).length;
  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-3xl text-xs text-mo-text">
            Every item segregated into <b>Product Initiatives</b> and{" "}
            <b>Business Requirements</b>, grouped under leadership priority (P0 → P2) and ordered
            by suggested score (Impact ÷ Effort). <b>Adjust priority inline</b> using the dropdown
            on any item — items re-bucket instantly. Changes are saved in this browser for review
            sessions; use Export CSV on the Backlog tab to share an agreed set.
          </p>
          <div className="flex items-center gap-2">
            {editedCount > 0 && (
              <span className="rounded-md bg-mo-gold/15 px-2 py-1 text-[11px] font-semibold text-mo-gold-dark ring-1 ring-mo-gold/30">
                {editedCount} adjusted
              </span>
            )}
            <button
              onClick={resetAll}
              disabled={editedCount === 0}
              className="rounded-lg border border-black/10 px-2.5 py-1 text-xs font-medium text-mo-navy enabled:hover:bg-mo-bg disabled:opacity-40"
            >
              Reset all
            </button>
          </div>
        </div>
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <GroupPriorityColumn
          group="A"
          items={items}
          overrides={overrides}
          setPriority={setPriority}
          resetPriority={resetPriority}
        />
        <GroupPriorityColumn
          group="B"
          items={items}
          overrides={overrides}
          setPriority={setPriority}
          resetPriority={resetPriority}
        />
      </div>
    </div>
  );
}

/* -------------------------------- Roadmap -------------------------------- */

function Roadmap({ items }: { items: BacklogItem[] }) {
  const lanes: Record<string, BacklogItem[]> = { Now: [], Next: [], Later: [] };
  for (const it of items) lanes[effectiveSequence(it)].push(it);
  const prioRank: Record<string, number> = { P0: 0, P1: 1, P2: 2, Hold: 3, "—": 4 };
  for (const k of Object.keys(lanes)) {
    lanes[k].sort(
      (a, b) =>
        (prioRank[priorityKey(a)] ?? 9) - (prioRank[priorityKey(b)] ?? 9) ||
        (b.scoreNum ?? 0) - (a.scoreNum ?? 0)
    );
  }
  const meta: Record<string, { sub: string; accent: string }> = {
    Now: { sub: "In flight / committed — P0 & active", accent: "border-t-rose-400" },
    Next: { sub: "Up next — P1 & planned", accent: "border-t-amber-400" },
    Later: { sub: "Backlog — P2 & exploratory", accent: "border-t-slate-300" },
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {SEQUENCE_ORDER.map((lane) => (
        <div
          key={lane}
          className={`rounded-2xl border-t-4 bg-mo-card p-4 shadow-card ring-1 ring-black/5 ${meta[lane].accent}`}
        >
          <div className="mb-1 flex items-baseline justify-between">
            <h3 className="text-base font-bold text-mo-navy">{lane}</h3>
            <span className="text-sm font-semibold text-mo-muted">{lanes[lane].length}</span>
          </div>
          <p className="mb-3 text-[11px] text-mo-muted">{meta[lane].sub}</p>
          <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
            {lanes[lane].length === 0 && (
              <p className="py-8 text-center text-xs text-mo-muted">No items</p>
            )}
            {lanes[lane].map((it, idx) => (
              <RoadmapCard key={`${it.id}-${idx}`} item={it} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RoadmapCard({ item }: { item: BacklogItem }) {
  return (
    <div className="rounded-xl bg-mo-bg p-3 ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-semibold leading-snug text-mo-text">{item.name}</div>
        {item.scoreNum != null && (
          <span className="shrink-0 rounded-md bg-white px-1.5 py-0.5 text-[11px] font-bold text-mo-navy ring-1 ring-black/5">
            {item.scoreNum}
          </span>
        )}
      </div>
      {item.what && (
        <p className="mt-1 line-clamp-2 text-[11px] text-mo-muted" title={item.what}>
          {item.what}
        </p>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-1">
        <Pill
          className="bg-mo-gold/15 text-mo-gold-dark ring-mo-gold/20"
          title={`${item.group} · ${GROUP_LABEL[item.group]}`}
        >
          {item.group}
        </Pill>
        <Pill className="bg-mo-navy/5 text-mo-navy ring-mo-navy/10">{item.product}</Pill>
        {item.priority && (
          <Pill className={PRIORITY_STYLE[priorityKey(item)]}>{item.priority}</Pill>
        )}
        <Pill className={STATUS_STYLE[item.status] ?? STATUS_STYLE.Backlog}>{item.status}</Pill>
        {item.impact && <Pill className={IMPACT_STYLE[item.impact]}>Impact {item.impact}</Pill>}
      </div>
    </div>
  );
}

/* -------------------------------- Backlog -------------------------------- */

const COLUMNS: { key: keyof BacklogItem | "scoreNum"; label: string; align?: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Item" },
  { key: "product", label: "Product" },
  { key: "stakeholder", label: "Stakeholder" },
  { key: "impact", label: "Imp" },
  { key: "effort", label: "Eff" },
  { key: "scoreNum", label: "Score" },
  { key: "priority", label: "Prio" },
  { key: "sequence", label: "Seq" },
  { key: "status", label: "Status" },
];

function csvEscape(v: string) {
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

function exportCsv(items: BacklogItem[]) {
  const headers = [
    "ID",
    "Group",
    "Domain",
    "Item",
    "Product",
    "Stakeholder",
    "What",
    "Why",
    "Impact",
    "Effort",
    "Score",
    "Priority",
    "Sequence",
    "Source",
    "Dependencies",
    "Status",
  ];
  const rows = items.map((i) =>
    [
      i.id,
      i.group,
      i.domain,
      i.name,
      i.product,
      i.stakeholder,
      i.what,
      i.why,
      i.impact,
      i.effort,
      i.scoreNum ?? "",
      i.priority,
      effectiveSequence(i),
      i.source,
      i.dependencies,
      i.status,
    ]
      .map((v) => csvEscape(String(v ?? "")))
      .join(",")
  );
  const blob = new Blob([[headers.join(","), ...rows].join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "product-backlog-fy2026-27.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function Backlog({
  items,
  sortKey,
  sortDir,
  onSort,
}: {
  items: BacklogItem[];
  sortKey: keyof BacklogItem | "scoreNum";
  sortDir: "asc" | "desc";
  onSort: (k: keyof BacklogItem | "scoreNum") => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = useMemo(() => {
    const arr = [...items];
    arr.sort((a, b) => {
      let av: string | number = (a as any)[sortKey] ?? "";
      let bv: string | number = (b as any)[sortKey] ?? "";
      if (sortKey === "scoreNum") {
        av = a.scoreNum ?? -1;
        bv = b.scoreNum ?? -1;
      }
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [items, sortKey, sortDir]);

  const groupA = sorted.filter((i) => i.group === "A");
  const groupB = sorted.filter((i) => i.group === "B");

  return (
    <Panel
      title={`All items — ${items.length}`}
      right={
        <button
          onClick={() => exportCsv(sorted)}
          className="rounded-lg bg-mo-navy px-3 py-1.5 text-xs font-medium text-white hover:bg-mo-navy-light"
        >
          Export CSV
        </button>
      }
    >
      <div className="space-y-6">
        {(["A", "B"] as const).map((g) => (
          <div key={g}>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="rounded-md bg-mo-gold/15 px-2 py-0.5 text-sm font-bold text-mo-gold-dark">
                {g}
              </span>
              <h4 className="text-sm font-bold text-mo-navy">{GROUP_LABEL[g]}</h4>
              <span className="text-xs text-mo-muted">
                {(g === "A" ? groupA : groupB).length} items
              </span>
            </div>
            <BacklogTable
              rows={g === "A" ? groupA : groupB}
              keyPrefix={g}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function BacklogTable({
  rows,
  keyPrefix,
  sortKey,
  sortDir,
  onSort,
  expanded,
  setExpanded,
}: {
  rows: BacklogItem[];
  keyPrefix: string;
  sortKey: keyof BacklogItem | "scoreNum";
  sortDir: "asc" | "desc";
  onSort: (k: keyof BacklogItem | "scoreNum") => void;
  expanded: string | null;
  setExpanded: (v: string | null) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl ring-1 ring-black/5">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead className="bg-mo-bg text-[11px] uppercase tracking-wide text-mo-muted">
          <tr>
            {COLUMNS.map((c) => (
              <th
                key={String(c.key)}
                onClick={() => onSort(c.key)}
                className="cursor-pointer select-none px-3 py-2.5 font-semibold hover:text-mo-navy"
              >
                {c.label}
                {sortKey === c.key && (
                  <span className="ml-0.5">{sortDir === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((it, idx) => {
            const rowId = `${keyPrefix}-${it.id}-${idx}`;
            const open = expanded === rowId;
            return (
              <Fragment key={rowId}>
                <tr
                  onClick={() => setExpanded(open ? null : rowId)}
                  className="cursor-pointer border-t border-black/5 hover:bg-mo-bg/60"
                >
                  <td className="whitespace-nowrap px-3 py-2.5 font-mono text-[11px] text-mo-muted">
                    {it.id}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="font-medium text-mo-text">{it.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-mo-text">{it.product}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-mo-muted">
                    {it.stakeholder || "—"}
                  </td>
                  <td className="px-3 py-2.5">
                    {it.impact && <Pill className={IMPACT_STYLE[it.impact]}>{it.impact}</Pill>}
                  </td>
                  <td className="px-3 py-2.5 text-mo-text">{it.effort || "—"}</td>
                  <td className="px-3 py-2.5 font-semibold tabular-nums text-mo-navy">
                    {it.scoreNum ?? "—"}
                  </td>
                  <td className="px-3 py-2.5">
                    {it.priority && (
                      <Pill className={PRIORITY_STYLE[priorityKey(it)]}>{it.priority}</Pill>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-mo-muted">
                    {effectiveSequence(it)}
                  </td>
                  <td className="px-3 py-2.5">
                    <Pill className={STATUS_STYLE[it.status] ?? STATUS_STYLE.Backlog}>
                      {it.status}
                    </Pill>
                  </td>
                </tr>
                {open && (
                  <tr className="border-t border-black/5 bg-mo-bg/40">
                    <td colSpan={COLUMNS.length} className="px-3 py-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Detail label="What" value={it.what} />
                        <Detail label="Why" value={it.why} />
                        <Detail label="Primary impact area" value={it.impactArea} />
                        <Detail label="Dependencies" value={it.dependencies} />
                        <Detail label="Source" value={it.source} />
                        <Detail label="Domain" value={it.domain} />
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length} className="px-3 py-8 text-center text-mo-muted">
                No items in this group match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-mo-muted">
        {label}
      </div>
      <div className="mt-0.5 text-sm text-mo-text">{value}</div>
    </div>
  );
}
