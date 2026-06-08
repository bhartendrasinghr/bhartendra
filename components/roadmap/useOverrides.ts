"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tpp-roadmap-priority-overrides-v1";

/** Map of item key → leadership priority ("P0" | "P1" | "P2" | "Hold" | ""). */
export type Overrides = Record<string, string>;

/**
 * Browser-local priority overrides. Leadership can re-prioritise items in the
 * UI; changes persist in localStorage (this browser only) until reset or until
 * the source data is re-synced. Nothing is sent anywhere.
 */
export function useOverrides() {
  const [overrides, setOverrides] = useState<Overrides>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOverrides(JSON.parse(raw));
    } catch {
      /* ignore malformed / unavailable storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      /* ignore */
    }
  }, [overrides, loaded]);

  const setPriority = useCallback((key: string, value: string) => {
    setOverrides((o) => ({ ...o, [key]: value }));
  }, []);

  const resetPriority = useCallback((key: string) => {
    setOverrides((o) => {
      if (!(key in o)) return o;
      const next = { ...o };
      delete next[key];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => setOverrides({}), []);

  return { overrides, setPriority, resetPriority, resetAll };
}
