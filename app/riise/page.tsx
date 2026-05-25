"use client";
import Link from "next/link";
import { useRiise, BookedFD } from "@/components/riise/RiiseContext";
import { formatCurrency } from "@/components/riise/fdRates";

function PortfolioSummary({ portfolio }: { portfolio: BookedFD[] }) {
  const total = portfolio.reduce((s, fd) => s + fd.amount, 0);
  const active = portfolio.filter((fd) => fd.status === "active").length;
  return (
    <Link href="/riise/portfolio">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-teal-600/5 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-white/50 uppercase tracking-wider">Your FD Portfolio</span>
          <span className="text-xs text-emerald-400">View All &rarr;</span>
        </div>
        <div className="text-2xl font-bold">{formatCurrency(total)}</div>
        <div className="text-xs text-white/40 mt-1">{active} active FD{active !== 1 ? "s" : ""}</div>
      </div>
    </Link>
  );
}

export default function RiiseHome() {
  const { portfolio } = useRiise();

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <header className="bg-[#0a0f1a] border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-xl font-bold tracking-tight">
              <span className="text-emerald-400">R</span>IISE
            </div>
            <div className="text-[10px] text-white/30 tracking-widest uppercase">Motilal Oswal</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <div className="text-xs font-medium">Rajesh Kumar</div>
              <div className="text-[10px] text-white/40">MOSL-48291</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xs font-bold">
              RK
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-lg font-semibold">Good evening, Rajesh</h1>
          <p className="text-sm text-white/40 mt-0.5">Grow your wealth with fixed deposits</p>
        </div>

        {portfolio.length > 0 && <PortfolioSummary portfolio={portfolio} />}

        <div className="mb-4">
          <h2 className="text-sm font-semibold text-white/70 mb-3">Invest in Fixed Deposits</h2>
        </div>

        <Link href="/riise/invest">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mb-3 hover:bg-white/[0.06] transition group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-blue-400">B</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Bajaj Finserv</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20">AAA</span>
                </div>
                <div className="text-xs text-white/40 mt-0.5">Bajaj Finance Limited</div>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <div className="text-lg font-bold text-emerald-400">8.25%</div>
                    <div className="text-[10px] text-white/30">Max rate p.a.</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <div className="text-sm font-medium">12-60 mo</div>
                    <div className="text-[10px] text-white/30">Tenure range</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <div className="text-sm font-medium">{formatCurrency(15000)}</div>
                    <div className="text-[10px] text-white/30">Min. invest</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/riise/invest">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mb-3 hover:bg-white/[0.06] transition group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-orange-400">S</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Shriram Finance</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20">AA+</span>
                </div>
                <div className="text-xs text-white/40 mt-0.5">Shriram Finance Limited</div>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <div className="text-lg font-bold text-emerald-400">8.55%</div>
                    <div className="text-[10px] text-white/30">Max rate p.a.</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <div className="text-sm font-medium">12-60 mo</div>
                    <div className="text-[10px] text-white/30">Tenure range</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <div className="text-sm font-medium">{formatCurrency(5000)}</div>
                    <div className="text-[10px] text-white/30">Min. invest</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-8 mb-4">
          <h2 className="text-sm font-semibold text-white/70 mb-3">Compare Rates</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-white/40 font-medium">Tenure</th>
                <th className="text-right p-3 text-blue-400 font-medium">Bajaj</th>
                <th className="text-right p-3 text-orange-400 font-medium">Shriram</th>
              </tr>
            </thead>
            <tbody>
              {[
                { t: "12 mo", b: "7.45%", s: "7.41%" },
                { t: "24 mo", b: "7.85%", s: "7.85%" },
                { t: "36 mo", b: "8.15%", s: "8.26%" },
                { t: "48 mo", b: "8.20%", s: "8.36%" },
                { t: "60 mo", b: "8.25%", s: "8.55%" },
              ].map((r) => (
                <tr key={r.t} className="border-b border-white/5 last:border-0">
                  <td className="p-3 text-white/60">{r.t}</td>
                  <td className="p-3 text-right font-medium">{r.b}</td>
                  <td className="p-3 text-right font-medium">{r.s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 leading-relaxed">
            Fixed Deposits are subject to market risk. Bajaj Finance Ltd. and Shriram Finance Ltd. are regulated by RBI. MOSL acts as a distributor. Rates are indicative and subject to change. Please read the terms carefully before investing.
          </div>
        </div>
      </main>
    </div>
  );
}
