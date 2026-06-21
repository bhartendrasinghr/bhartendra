"use client";

import type { ReactNode } from "react";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <input className="field-input" value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <Field label={label}>
      <textarea
        className="field-input"
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        style={{ resize: "vertical", lineHeight: 1.5 }}
      />
    </Field>
  );
}

/** Edits an array of plain strings (one input per row). */
export function StringListEditor({
  label,
  items,
  onChange,
  multiline = false,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  multiline?: boolean;
}) {
  const update = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div className="admin-block">
      <div className="admin-block-head">
        <span className="field-label">{label}</span>
        <button type="button" className="admin-btn-sm" onClick={add}>+ Add</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            {multiline ? (
              <textarea className="field-input" value={item} rows={2} onChange={(e) => update(i, e.target.value)} style={{ resize: "vertical" }} />
            ) : (
              <input className="field-input" value={item} onChange={(e) => update(i, e.target.value)} />
            )}
            <button type="button" className="admin-btn-remove" onClick={() => remove(i)} aria-label="Remove">×</button>
          </div>
        ))}
        {items.length === 0 && <p className="admin-empty">No items yet.</p>}
      </div>
    </div>
  );
}

export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "tags" | "bool";
};

/** Edits an array of objects, each rendered as a card of fields. */
export function ListEditor<T extends object>({
  label,
  items,
  fields,
  template,
  onChange,
}: {
  label: string;
  items: T[];
  fields: FieldDef[];
  template: T;
  onChange: (items: T[]) => void;
}) {
  const updateItem = (i: number, key: string, value: unknown) => {
    const next = items.map((it, idx) =>
      idx === i ? ({ ...it, [key]: value } as T) : it
    );
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { ...template }]);
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="admin-block">
      <div className="admin-block-head">
        <span className="field-label">{label}</span>
        <button type="button" className="admin-btn-sm" onClick={add}>+ Add</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((item, i) => (
          <div key={i} className="admin-item">
            <div className="admin-item-head">
              <span className="mono" style={{ fontSize: 11, color: "var(--faint)" }}>#{i + 1}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button type="button" className="admin-btn-icon" onClick={() => move(i, -1)} aria-label="Move up">↑</button>
                <button type="button" className="admin-btn-icon" onClick={() => move(i, 1)} aria-label="Move down">↓</button>
                <button type="button" className="admin-btn-remove" onClick={() => remove(i)} aria-label="Remove">×</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {fields.map((f) => {
                const raw = (item as Record<string, unknown>)[f.key];
                if (f.type === "bool") {
                  return (
                    <label key={f.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input type="checkbox" checked={Boolean(raw)} onChange={(e) => updateItem(i, f.key, e.target.checked)} />
                      <span className="field-label">{f.label}</span>
                    </label>
                  );
                }
                if (f.type === "tags") {
                  const arr = Array.isArray(raw) ? (raw as string[]) : [];
                  return (
                    <Field key={f.key} label={`${f.label} (comma separated)`}>
                      <input
                        className="field-input"
                        value={arr.join(", ")}
                        onChange={(e) =>
                          updateItem(
                            i,
                            f.key,
                            e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                          )
                        }
                      />
                    </Field>
                  );
                }
                if (f.type === "textarea") {
                  return (
                    <Field key={f.key} label={f.label}>
                      <textarea className="field-input" value={String(raw ?? "")} rows={3} onChange={(e) => updateItem(i, f.key, e.target.value)} style={{ resize: "vertical", lineHeight: 1.5 }} />
                    </Field>
                  );
                }
                return (
                  <Field key={f.key} label={f.label}>
                    <input className="field-input" value={String(raw ?? "")} onChange={(e) => updateItem(i, f.key, e.target.value)} />
                  </Field>
                );
              })}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="admin-empty">No items yet.</p>}
      </div>
    </div>
  );
}
