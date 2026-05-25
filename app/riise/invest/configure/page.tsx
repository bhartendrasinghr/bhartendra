"use client";
import { useRouter } from "next/navigation";
import { useRiise } from "@/components/riise/RiiseContext";
import { Shell, Card, BottomBar, Button, Select } from "@/components/riise/ui";
import { FD_RATES, getRate, calcMaturity, formatCurrency } from "@/components/riise/fdRates";
import { useEffect } from "react";

const PRESET_AMOUNTS = [50000, 100000, 200000, 500000, 1000000];

export default function ConfigureFD() {
  const router = useRouter();
  const { fdConfig, setFDConfig } = useRiise();
  const partner = fdConfig.partner || "bajaj";

  useEffect(() => {
    if (!fdConfig.partner) router.replace("/riise/invest");
  }, [fdConfig.partner, router]);

  useEffect(() => {
    const rate = getRate(partner, fdConfig.tenure);
    const { maturity, interest } = calcMaturity(fdConfig.amount, rate, fdConfig.tenure);
    setFDConfig({ rate, maturityAmount: maturity, totalInterest: interest });
  }, [fdConfig.amount, fdConfig.tenure, partner]);

  const minAmount = partner === "bajaj" ? 15000 : 5000;

  return (
    <Shell
      title="Configure Your FD"
      subtitle={partner === "bajaj" ? "Bajaj Finserv Fixed Deposit" : "Shriram Finance Fixed Deposit"}
      step={2}
      totalSteps={8}
    >
      <div className="space-y-6 mt-4">
        <div>
          <label className="text-xs text-white/50 mb-2 block">Investment Amount</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {PRESET_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => setFDConfig({ amount: a })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  fdConfig.amount === a
                    ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                    : "bg-white/[0.06] text-white/60 border border-white/10 hover:bg-white/10"
                }`}
              >
                {formatCurrency(a)}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">&#8377;</span>
            <input
              type="number"
              value={fdConfig.amount}
              onChange={(e) => setFDConfig({ amount: Math.max(minAmount, Number(e.target.value)) })}
              min={minAmount}
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400/50 transition"
            />
          </div>
          <div className="text-[10px] text-white/30 mt-1">Min: {formatCurrency(minAmount)}</div>
        </div>

        <Select label="Tenure" value={fdConfig.tenure} onChange={(e) => setFDConfig({ tenure: Number(e.target.value) })}>
          {FD_RATES.map((r) => (
            <option key={r.tenure} value={r.tenure}>
              {r.label} — {partner === "bajaj" ? r.bajaj : r.shriram}% p.a.
            </option>
          ))}
        </Select>

        <div>
          <label className="text-xs text-white/50 mb-2 block">Deposit Type</label>
          <div className="grid grid-cols-2 gap-2">
            {(["cumulative", "non-cumulative"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFDConfig({ depositType: t })}
                className={`p-3 rounded-xl border text-xs font-medium transition ${
                  fdConfig.depositType === t
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                    : "border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08]"
                }`}
              >
                <div className="font-semibold">{t === "cumulative" ? "Cumulative" : "Non-Cumulative"}</div>
                <div className="text-[10px] text-white/30 mt-0.5">
                  {t === "cumulative" ? "Lumpsum at maturity" : "Periodic interest payout"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {fdConfig.depositType === "non-cumulative" && (
          <Select
            label="Payout Frequency"
            value={fdConfig.payoutFrequency}
            onChange={(e) => setFDConfig({ payoutFrequency: e.target.value as any })}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="half-yearly">Half-Yearly</option>
            <option value="yearly">Yearly</option>
          </Select>
        )}

        <div>
          <label className="text-xs text-white/50 mb-2 block">Auto-Renewal</label>
          <button
            onClick={() => setFDConfig({ autoRenew: !fdConfig.autoRenew })}
            className="flex items-center gap-3 w-full p-3 rounded-xl border border-white/10 bg-white/[0.04]"
          >
            <div className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-0.5 ${fdConfig.autoRenew ? "bg-emerald-500" : "bg-white/20"}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${fdConfig.autoRenew ? "translate-x-4" : "translate-x-0"}`} />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium">{fdConfig.autoRenew ? "Enabled" : "Disabled"}</div>
              <div className="text-[10px] text-white/30">Auto-renew on maturity</div>
            </div>
          </button>
        </div>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-600/5 border-emerald-400/20">
          <div className="text-xs text-white/50 mb-3 uppercase tracking-wider">Returns Summary</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-white/30">Invested</div>
              <div className="text-lg font-bold">{formatCurrency(fdConfig.amount)}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30">At Maturity</div>
              <div className="text-lg font-bold text-emerald-400">{formatCurrency(fdConfig.maturityAmount)}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30">Interest Earned</div>
              <div className="text-sm font-semibold text-emerald-400">{formatCurrency(fdConfig.totalInterest)}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30">Interest Rate</div>
              <div className="text-sm font-semibold">{fdConfig.rate}% p.a.</div>
            </div>
          </div>
        </Card>
      </div>

      <BottomBar>
        <Button onClick={() => router.push("/riise/invest/details")}>
          Continue &mdash; {formatCurrency(fdConfig.amount)}
        </Button>
      </BottomBar>
    </Shell>
  );
}
