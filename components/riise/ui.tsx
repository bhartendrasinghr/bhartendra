"use client";
import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";
import Link from "next/link";

export function Shell({ children, title, subtitle, step, totalSteps }: {
  children: ReactNode; title: string; subtitle?: string; step?: number; totalSteps?: number;
}) {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <header className="sticky top-0 z-50 bg-[#0a0f1a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/riise" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">R</span>IISE
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/riise/portfolio" className="text-xs text-white/50 hover:text-white/80 transition">
              Portfolio
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xs font-bold">
              RK
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-lg mx-auto px-4 pb-32">
        {step && totalSteps && (
          <div className="pt-4 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-white/40">Step {step} of {totalSteps}</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}
        <div className="pt-6 pb-2">
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-white/50 mt-1">{subtitle}</p>}
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
      className={`rounded-2xl border p-4 transition-all duration-200 ${
        selected
          ? "border-emerald-400/60 bg-emerald-400/5 shadow-lg shadow-emerald-400/10"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
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
    primary: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20",
    secondary: "bg-white/10 text-white hover:bg-white/15 border border-white/10",
    ghost: "bg-transparent text-white/60 hover:text-white hover:bg-white/5",
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
      <span className="text-xs text-white/50 mb-1.5 block">{label}</span>
      <input
        className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 transition"
        {...props}
      />
    </label>
  );
}

export function Select({ label, children, ...props }: { label: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className="text-xs text-white/50 mb-1.5 block">{label}</span>
      <select
        className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 transition appearance-none"
        {...props}
      >
        {children}
      </select>
    </label>
  );
}

export function Badge({ children, color = "emerald" }: { children: ReactNode; color?: "emerald" | "amber" | "blue" | "red" }) {
  const colors = {
    emerald: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    amber: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    blue: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    red: "bg-red-400/10 text-red-400 border-red-400/20",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}

export function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/50">{label}</span>
      <span className={`text-sm font-medium ${highlight ? "text-emerald-400" : "text-white"}`}>{value}</span>
    </div>
  );
}

export function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0f1a]/95 backdrop-blur-md border-t border-white/5 p-4">
      <div className="max-w-lg mx-auto">{children}</div>
    </div>
  );
}
