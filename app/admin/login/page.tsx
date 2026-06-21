"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "var(--cream)" }}>
      <form
        onSubmit={submit}
        style={{ width: "100%", maxWidth: 380, background: "var(--card)", border: "1px solid rgba(21,36,44,0.12)", borderRadius: 4, padding: "clamp(28px,4vw,40px)" }}
      >
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)" }}>Eight Bridges</div>
        <h1 className="serif" style={{ fontWeight: 500, fontSize: 28, color: "var(--ink)", marginTop: 10 }}>Admin sign in</h1>
        <p style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 8 }}>Enter the admin password to edit the site content.</p>

        <label style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 26 }}>
          <span className="field-label">Password</span>
          <input
            className="field-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="Password"
          />
        </label>

        {error && (
          <p style={{ marginTop: 14, fontSize: 14, color: "#b3261e" }}>{error}</p>
        )}

        <button type="submit" className="btn-primary" disabled={busy} style={{ marginTop: 22, width: "100%", justifyContent: "center", opacity: busy ? 0.7 : 1 }}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
