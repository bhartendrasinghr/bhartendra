"use client";
import { useState } from "react";
import Link from "next/link";
import { useRiise, BookedFD } from "@/components/riise/RiiseContext";
import { Card, Badge, Button } from "@/components/riise/ui";
import { formatCurrency, formatDate } from "@/components/riise/fdRates";

function FDCard({ fd }: { fd: BookedFD }) {
  const [expanded, setExpanded] = useState(false);

  const statusColor = fd.status === "active" ? "emerald" : fd.status === "processing" ? "amber" : "blue";
  const statusLabel = fd.status === "active" ? "Active" : fd.status === "processing" ? "Processing" : "Matured";
  const partnerColor = fd.partner === "bajaj" ? "blue" : "amber";
  const partnerLabel = fd.partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance";

  const today = new Date();
  const maturity = new Date(fd.maturityDate);
  const booked = new Date(fd.bookedDate);
  const totalDays = Math.max(1, (maturity.getTime() - booked.getTime()) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.max(0, (today.getTime() - booked.getTime()) / (1000 * 60 * 60 * 24));
  const progressPct = Math.min(100, (elapsedDays / totalDays) * 100);
  const daysRemaining = Math.max(0, Math.ceil((maturity.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  const currentValue = fd.status === "active"
    ? Math.round(fd.amount * Math.pow(1 + fd.rate / 100 / 4, 4 * (elapsedDays / 365)))
    : fd.amount;
  const unrealizedGain = currentValue - fd.amount;

  return (
    <Card className="mb-3">
      <div onClick={() => setExpanded(!expanded)} className="cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
              fd.partner === "bajaj" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
            }`}>
              {fd.partner === "bajaj" ? "B" : "S"}
            </div>
            <div>
              <div className="text-sm font-semibold">{partnerLabel}</div>
              <div className="text-[10px] text-white/30">{fd.applicationNo}</div>
            </div>
          </div>
          <Badge color={statusColor}>{statusLabel}</Badge>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <div className="text-[10px] text-white/30">Invested</div>
            <div className="text-sm font-bold">{formatCurrency(fd.amount)}</div>
          </div>
          <div>
            <div className="text-[10px] text-white/30">Current Value</div>
            <div className="text-sm font-bold text-emerald-400">{formatCurrency(currentValue)}</div>
          </div>
          <div>
            <div className="text-[10px] text-white/30">Rate</div>
            <div className="text-sm font-bold">{fd.rate}%</div>
          </div>
        </div>

        {fd.status === "active" && (
          <div>
            <div className="flex items-center justify-between text-[10px] text-white/30 mb-1">
              <span>Progress</span>
              <span>{daysRemaining} days remaining</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-center mt-3">
          <span className="text-[10px] text-white/20">{expanded ? "Hide details" : "Show details"}</span>
          <svg className={`w-3 h-3 text-white/20 ml-1 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
          <div className="grid grid-cols-2 gap-y-2 text-xs">
            <div>
              <div className="text-white/30">Deposit ID</div>
              <div className="font-mono text-white/70">{fd.depositId}</div>
            </div>
            <div>
              <div className="text-white/30">Tenure</div>
              <div className="text-white/70">{fd.tenure} months</div>
            </div>
            <div>
              <div className="text-white/30">Type</div>
              <div className="text-white/70 capitalize">{fd.depositType}</div>
            </div>
            <div>
              <div className="text-white/30">Maturity Amount</div>
              <div className="text-emerald-400 font-medium">{formatCurrency(fd.maturityAmount)}</div>
            </div>
            <div>
              <div className="text-white/30">Booked Date</div>
              <div className="text-white/70">{formatDate(fd.bookedDate)}</div>
            </div>
            <div>
              <div className="text-white/30">Maturity Date</div>
              <div className="text-white/70">{formatDate(fd.maturityDate)}</div>
            </div>
            <div>
              <div className="text-white/30">Nominee</div>
              <div className="text-white/70">{fd.nominee || "—"}</div>
            </div>
            <div>
              <div className="text-white/30">Unrealized Gain</div>
              <div className="text-emerald-400 font-medium">+{formatCurrency(unrealizedGain)}</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function PortfolioPage() {
  const { portfolio } = useRiise();
  const [filter, setFilter] = useState<"all" | "bajaj" | "shriram">("all");

  const filtered = filter === "all" ? portfolio : portfolio.filter((fd) => fd.partner === filter);
  const totalInvested = portfolio.reduce((s, fd) => s + fd.amount, 0);
  const totalCurrent = portfolio.reduce((s, fd) => {
    if (fd.status !== "active") return s + fd.amount;
    const booked = new Date(fd.bookedDate);
    const elapsed = (Date.now() - booked.getTime()) / (1000 * 60 * 60 * 24);
    return s + Math.round(fd.amount * Math.pow(1 + fd.rate / 100 / 4, 4 * (elapsed / 365)));
  }, 0);
  const totalGain = totalCurrent - totalInvested;
  const activeFDs = portfolio.filter((fd) => fd.status === "active").length;
  const processingFDs = portfolio.filter((fd) => fd.status === "processing").length;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <header className="sticky top-0 z-50 bg-[#0a0f1a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/riise" className="text-white/50 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-base font-bold">FD Portfolio</h1>
          <div className="ml-auto">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xs font-bold">
              RK
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-600/5 border-emerald-400/20 mb-6">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Total Portfolio Value</div>
          <div className="text-3xl font-bold mb-1">{formatCurrency(totalCurrent)}</div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-emerald-400">+{formatCurrency(totalGain)}</span>
            <span className="text-xs text-white/30">unrealized gain</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/[0.06] rounded-xl p-2.5 text-center">
              <div className="text-lg font-bold">{portfolio.length}</div>
              <div className="text-[10px] text-white/30">Total FDs</div>
            </div>
            <div className="bg-white/[0.06] rounded-xl p-2.5 text-center">
              <div className="text-lg font-bold text-emerald-400">{activeFDs}</div>
              <div className="text-[10px] text-white/30">Active</div>
            </div>
            <div className="bg-white/[0.06] rounded-xl p-2.5 text-center">
              <div className="text-lg font-bold text-amber-400">{processingFDs}</div>
              <div className="text-[10px] text-white/30">Processing</div>
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-2 mb-4">
          {(["all", "bajaj", "shriram"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === f
                  ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                  : "bg-white/[0.06] text-white/40 border border-white/10 hover:text-white/60"
              }`}
            >
              {f === "all" ? "All" : f === "bajaj" ? "Bajaj" : "Shriram"}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-white/20 text-4xl mb-3">&#128203;</div>
            <div className="text-sm text-white/40 mb-1">No FDs found</div>
            <div className="text-xs text-white/20">Start investing to build your portfolio</div>
          </Card>
        ) : (
          filtered.map((fd) => <FDCard key={fd.id} fd={fd} />)
        )}

        <div className="mt-6">
          <Link href="/riise/invest">
            <Button>
              + Invest in New FD
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
