"use client";

import { useCallback, useEffect, useState } from "react";

const PRIORITY_KEY = "tpp-roadmap-priority-overrides-v1";
const TRACK_KEY = "tpp-roadmap-track-overrides-v1";
const LOG_KEY = "tpp-roadmap-priority-log-v1";
const EDITOR_KEY = "tpp-roadmap-editor-v1";
const MAX_LOG = 1000;

/** Map of item key → value (priority or track). */
export type Overrides = Record<string, string>;

/** Which attribute a change applies to. */
export type Field = "priority" | "track";

/** A single recorded change, for the team change log. */
export interface LogEntry {
  ts: number;
  editor: string;
  field: Field;
  item: string;
  group: string;
  from: string;
  to: string;
}

/** Context needed to record a change against an item. */
export interface ChangeMeta {
  name: string;
  group: string;
  from: string; // current effective value
  source: string; // original/default value
}

/** Shape of an exported / imported "priority plan" file. */
export interface Workspace {
  version: number;
  exportedAt: string;
  editor: string;
  priorityOverrides: Overrides;
  trackOverrides: Overrides;
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
 * Browser-local workspace for leadership priority + RIISE/Back-Office tagging:
 * overrides for both attributes, a change log, and the current editor's name —
 * all persisted to localStorage. Nothing is sent anywhere; sharing across the
 * team is done by exporting / importing a plan file.
 */
export function useOverrides() {
  const [priorityOverrides, setPriorityOverrides] = useState<Overrides>({});
  const [trackOverrides, setTrackOverrides] = useState<Overrides>({});
  const [log, setLog] = useState<LogEntry[]>([]);
  const [editor, setEditorState] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPriorityOverrides(read<Overrides>(PRIORITY_KEY, {}));
    setTrackOverrides(read<Overrides>(TRACK_KEY, {}));
    setLog(read<LogEntry[]>(LOG_KEY, []));
    setEditorState(read<string>(EDITOR_KEY, ""));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(PRIORITY_KEY, JSON.stringify(priorityOverrides));
      localStorage.setItem(TRACK_KEY, JSON.stringify(trackOverrides));
      localStorage.setItem(LOG_KEY, JSON.stringify(log));
      localStorage.setItem(EDITOR_KEY, editor);
    } catch {
      /* ignore unavailable storage */
    }
  }, [priorityOverrides, trackOverrides, log, editor, loaded]);

  const appendLog = useCallback((entry: LogEntry) => {
    setLog((l) => [entry, ...l].slice(0, MAX_LOG));
  }, []);

  const setEditor = useCallback((name: string) => setEditorState(name), []);

  // Generic setter shared by both attributes.
  const makeSetter =
    (setter: typeof setPriorityOverrides, field: Field) =>
    (key: string, value: string, meta: ChangeMeta) => {
      setter((o) => {
        const next = { ...o };
        if (value === meta.source) delete next[key];
        else next[key] = value;
        return next;
      });
      if (value !== meta.from) {
        appendLog({
          ts: Date.now(),
          editor: editor.trim() || "Anonymous",
          field,
          item: meta.name,
          group: meta.group,
          from: meta.from,
          to: value,
        });
      }
    };

  const makeReset =
    (setter: typeof setPriorityOverrides, field: Field) =>
    (key: string, meta: ChangeMeta) => {
      setter((o) => {
        if (!(key in o)) return o;
        const next = { ...o };
        delete next[key];
        return next;
      });
      if (meta.from !== meta.source) {
        appendLog({
          ts: Date.now(),
          editor: editor.trim() || "Anonymous",
          field,
          item: meta.name,
          group: meta.group,
          from: meta.from,
          to: meta.source,
        });
      }
    };

  const setPriority = useCallback(makeSetter(setPriorityOverrides, "priority"), [
    appendLog,
    editor,
  ]);
  const resetPriority = useCallback(makeReset(setPriorityOverrides, "priority"), [
    appendLog,
    editor,
  ]);
  const setTrack = useCallback(makeSetter(setTrackOverrides, "track"), [appendLog, editor]);
  const resetTrack = useCallback(makeReset(setTrackOverrides, "track"), [appendLog, editor]);

  const resetAll = useCallback(() => {
    const hadAny =
      Object.keys(priorityOverrides).length > 0 || Object.keys(trackOverrides).length > 0;
    setPriorityOverrides({});
    setTrackOverrides({});
    if (hadAny) {
      appendLog({
        ts: Date.now(),
        editor: editor.trim() || "Anonymous",
        field: "priority",
        item: "All items",
        group: "",
        from: "*",
        to: "reset",
      });
    }
  }, [appendLog, editor, priorityOverrides, trackOverrides]);

  const clearLog = useCallback(() => setLog([]), []);

  const exportWorkspace = useCallback(
    (): Workspace => ({
      version: 2,
      exportedAt: new Date().toISOString(),
      editor: editor.trim(),
      priorityOverrides,
      trackOverrides,
      log,
    }),
    [editor, priorityOverrides, trackOverrides, log]
  );

  const importWorkspace = useCallback((ws: Partial<Workspace> & { overrides?: Overrides }) => {
    // v2 has priorityOverrides/trackOverrides; v1 had a single `overrides` map.
    const prio = ws.priorityOverrides ?? ws.overrides;
    if (prio && typeof prio === "object") setPriorityOverrides(prio);
    if (ws.trackOverrides && typeof ws.trackOverrides === "object")
      setTrackOverrides(ws.trackOverrides);
    if (Array.isArray(ws.log)) setLog(ws.log.slice(0, MAX_LOG));
  }, []);

  return {
    priorityOverrides,
    trackOverrides,
    log,
    editor,
    setEditor,
    setPriority,
    resetPriority,
    setTrack,
    resetTrack,
    resetAll,
    clearLog,
    exportWorkspace,
    importWorkspace,
  };
}
