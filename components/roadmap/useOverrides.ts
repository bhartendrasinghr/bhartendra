"use client";

import { useCallback, useEffect, useState } from "react";

const OVERRIDES_KEY = "tpp-roadmap-priority-overrides-v1";
const LOG_KEY = "tpp-roadmap-priority-log-v1";
const EDITOR_KEY = "tpp-roadmap-editor-v1";
const MAX_LOG = 1000;

/** Map of item key → leadership priority ("P0" | "P1" | "P2" | "Hold" | ""). */
export type Overrides = Record<string, string>;

/** A single recorded priority change, for the team change log. */
export interface LogEntry {
  ts: number;
  editor: string;
  item: string;
  group: string;
  from: string; // raw priority ("" = Unprioritised); "*" markers for bulk actions
  to: string;
}

/** Context needed to record a change against an item. */
export interface ChangeMeta {
  name: string;
  group: string;
  from: string; // current effective priority
  source: string; // original priority from the data file
}

/** Shape of an exported / imported "priority plan" file. */
export interface Workspace {
  version: number;
  exportedAt: string;
  editor: string;
  overrides: Overrides;
  log: LogEntry[];
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Browser-local priority workspace: overrides + a change log + the current
 * editor's name, all persisted to localStorage. Nothing is sent anywhere;
 * sharing across the team is done by exporting / importing a plan file.
 */
export function useOverrides() {
  const [overrides, setOverrides] = useState<Overrides>({});
  const [log, setLog] = useState<LogEntry[]>([]);
  const [editor, setEditorState] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOverrides(read<Overrides>(OVERRIDES_KEY, {}));
    setLog(read<LogEntry[]>(LOG_KEY, []));
    setEditorState(read<string>(EDITOR_KEY, ""));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
      localStorage.setItem(LOG_KEY, JSON.stringify(log));
      localStorage.setItem(EDITOR_KEY, editor);
    } catch {
      /* ignore unavailable storage */
    }
  }, [overrides, log, editor, loaded]);

  const appendLog = useCallback((entry: LogEntry) => {
    setLog((l) => [entry, ...l].slice(0, MAX_LOG));
  }, []);

  const setEditor = useCallback((name: string) => setEditorState(name), []);

  const setPriority = useCallback(
    (key: string, value: string, meta: ChangeMeta) => {
      setOverrides((o) => {
        const next = { ...o };
        // Setting back to the original data value clears the override entirely.
        if (value === meta.source) delete next[key];
        else next[key] = value;
        return next;
      });
      if (value !== meta.from) {
        appendLog({
          ts: Date.now(),
          editor: editor.trim() || "Anonymous",
          item: meta.name,
          group: meta.group,
          from: meta.from,
          to: value,
        });
      }
    },
    [appendLog, editor]
  );

  const resetPriority = useCallback(
    (key: string, meta: ChangeMeta) => {
      setOverrides((o) => {
        if (!(key in o)) return o;
        const next = { ...o };
        delete next[key];
        return next;
      });
      if (meta.from !== meta.source) {
        appendLog({
          ts: Date.now(),
          editor: editor.trim() || "Anonymous",
          item: meta.name,
          group: meta.group,
          from: meta.from,
          to: meta.source,
        });
      }
    },
    [appendLog, editor]
  );

  const resetAll = useCallback(() => {
    setOverrides((o) => {
      if (Object.keys(o).length === 0) return o;
      appendLog({
        ts: Date.now(),
        editor: editor.trim() || "Anonymous",
        item: "All items",
        group: "",
        from: "*",
        to: "reset",
      });
      return {};
    });
  }, [appendLog, editor]);

  const clearLog = useCallback(() => setLog([]), []);

  const exportWorkspace = useCallback(
    (): Workspace => ({
      version: 1,
      exportedAt: new Date().toISOString(),
      editor: editor.trim(),
      overrides,
      log,
    }),
    [editor, overrides, log]
  );

  const importWorkspace = useCallback((ws: Partial<Workspace>) => {
    if (ws.overrides && typeof ws.overrides === "object") setOverrides(ws.overrides);
    if (Array.isArray(ws.log)) setLog(ws.log.slice(0, MAX_LOG));
  }, []);

  return {
    overrides,
    log,
    editor,
    setEditor,
    setPriority,
    resetPriority,
    resetAll,
    clearLog,
    exportWorkspace,
    importWorkspace,
  };
}
