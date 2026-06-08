"use client";

import { ReactNode } from "react";

/** Small rounded status / priority / impact pill. */
export function Pill({
  children,
  className = "",
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}

/** KPI card used across the dashboard header. */
export function Kpi({
  label,
  value,
  sub,
  accent = "text-mo-navy",
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl bg-mo-card p-4 shadow-card ring-1 ring-black/5">
      <div className="text-[11px] uppercase tracking-wide text-mo-muted">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${accent}`}>{value}</div>
      {sub && <div className="mt-0.5 text-[11px] text-mo-muted">{sub}</div>}
    </div>
  );
}

/** Section card wrapper with a title. */
export function Panel({
  title,
  right,
  children,
  className = "",
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl bg-mo-card p-5 shadow-card ring-1 ring-black/5 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-mo-navy">{title}</h3>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

export interface BarDatum {
  label: string;
  value: number;
  highlight?: number; // optional sub-segment (e.g. high-impact within total)
  color?: string;
}

/** Horizontal bar list — dependency-free chart. */
export function BarList({
  data,
  max,
  unit = "",
  emptyLabel = "No items",
}: {
  data: BarDatum[];
  max?: number;
  unit?: string;
  emptyLabel?: string;
}) {
  const peak = max ?? Math.max(1, ...data.map((d) => d.value));
  if (data.length === 0 || peak === 0) {
    return <p className="py-6 text-center text-xs text-mo-muted">{emptyLabel}</p>;
  }
  return (
    <div className="space-y-2.5">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <div className="w-36 shrink-0 truncate text-xs text-mo-text" title={d.label}>
            {d.label}
          </div>
          <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-mo-bg-deep">
            <div
              className={`absolute inset-y-0 left-0 rounded-md ${d.color ?? "bg-mo-navy"}`}
              style={{ width: `${(d.value / peak) * 100}%` }}
            />
            {d.highlight != null && d.highlight > 0 && (
              <div
                className="absolute inset-y-0 left-0 rounded-md bg-mo-gold"
                style={{ width: `${(d.highlight / peak) * 100}%` }}
                title={`${d.highlight} high impact`}
              />
            )}
          </div>
          <div className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums text-mo-navy">
            {d.value}
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}
