"use client";
import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";
import Link from "next/link";

export function Shell({ children, title, subtitle, step, totalSteps }: {
  children: ReactNode; title: string; subtitle?: string; step?: number; totalSteps?: number;
}) {
  return (
    <div className="min-h-screen bg-mo-bg text-mo-text">
      <header className="sticky top-0 z-50 bg-mo-navy shadow-md">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/riise" className="text-xl font-bold tracking-tight text-white">
            <span className="text-mo-gold">R</span>IISE
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/riise/portfolio" className="text-xs text-white/60 hover:text-white transition">
              Portfolio
            </Link>
            <div className="w-8 h-8 rounded-full bg-mo-gold flex items-center justify-center text-xs font-bold text-mo-navy">
              RK
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-lg mx-auto px-4 pb-32">
        {step && totalSteps && (
          <div className="pt-4 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-mo-muted">Step {step} of {totalSteps}</span>
            </div>
            <div className="h-1.5 bg-mo-navy/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-mo-navy to-mo-navy-light rounded-full transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}
        <div className="pt-6 pb-2">
          <h1 className="text-xl font-bold text-mo-navy">{title}</h1>
          {subtitle && <p className="text-sm text-mo-muted mt-1">{subtitle}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}

export function Card({ children, className = "", onClick, selected }: {
  children: ReactNode; className?: string; onClick?: () => void; selected?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-4 transition-all duration-200 bg-white shadow-card ${
        selected
          ? "border-mo-navy ring-2 ring-mo-navy/20 shadow-card-hover"
          : "border-gray-100 hover:shadow-card-hover"
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({ children, variant = "primary", className = "", ...props }: {
  children: ReactNode; variant?: "primary" | "secondary" | "ghost"; className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = "w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-mo-navy text-white hover:bg-mo-navy-light shadow-md",
    secondary: "bg-white text-mo-navy border-2 border-mo-navy/20 hover:border-mo-navy/40",
    ghost: "bg-transparent text-mo-muted hover:text-mo-navy hover:bg-mo-navy/5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Input({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-mo-muted mb-1.5 block">{label}</span>
      <input
        className="w-full bg-mo-bg border border-gray-200 rounded-xl px-4 py-3 text-sm text-mo-text placeholder:text-gray-400 focus:outline-none focus:border-mo-navy focus:ring-2 focus:ring-mo-navy/10 transition"
        {...props}
      />
    </label>
  );
}

export function Select({ label, children, ...props }: { label: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className="text-xs text-mo-muted mb-1.5 block">{label}</span>
      <select
        className="w-full bg-mo-bg border border-gray-200 rounded-xl px-4 py-3 text-sm text-mo-text focus:outline-none focus:border-mo-navy focus:ring-2 focus:ring-mo-navy/10 transition appearance-none"
        {...props}
      >
        {children}
      </select>
    </label>
  );
}

export function Badge({ children, color = "navy" }: { children: ReactNode; color?: "navy" | "gold" | "emerald" | "amber" | "blue" | "red" }) {
  const colors = {
    navy: "bg-mo-navy/10 text-mo-navy border-mo-navy/20",
    gold: "bg-mo-gold/10 text-mo-gold-dark border-mo-gold/20",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}

export function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-mo-muted">{label}</span>
      <span className={`text-sm font-medium ${highlight ? "text-mo-gold-dark" : "text-mo-text"}`}>{value}</span>
    </div>
  );
}

export function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-lg mx-auto">{children}</div>
    </div>
  );
}
