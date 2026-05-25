"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRiise } from "@/components/riise/RiiseContext";
import { Shell, Card, BottomBar, Button, InfoRow, Badge } from "@/components/riise/ui";
import { formatCurrency, futureDate, formatDate } from "@/components/riise/fdRates";

export default function ReviewPage() {
  const router = useRouter();
  const { fdConfig, personalDetails, nominee, bank, kyc } = useRiise();
  const [agreed, setAgreed] = useState(false);
  const partner = fdConfig.partner || "bajaj";
  const maturityDateStr = futureDate(fdConfig.tenure);

  return (
    <Shell title="Review & Confirm" subtitle="Please review all details before proceeding" step={6} totalSteps={8}>
      <div className="space-y-4 mt-4">
        <Card className="bg-gradient-to-br from-mo-navy to-mo-navy-light border-0">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-white/70 uppercase tracking-wider">FD Summary</div>
            <Badge color="gold">
              {partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-[10px] text-white/50">Investment</div>
              <div className="text-xl font-bold text-white">{formatCurrency(fdConfig.amount)}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/50">At Maturity</div>
              <div className="text-xl font-bold text-mo-gold">{formatCurrency(fdConfig.maturityAmount)}</div>
            </div>
          </div>
          <div className="space-y-0">
            <div className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
              <span className="text-sm text-white/60">Interest Rate</span>
              <span className="text-sm font-medium text-mo-gold">{`${fdConfig.rate}% p.a.`}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
              <span className="text-sm text-white/60">Tenure</span>
              <span className="text-sm font-medium text-white">{`${fdConfig.tenure} months`}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
              <span className="text-sm text-white/60">Type</span>
              <span className="text-sm font-medium text-white">{fdConfig.depositType === "cumulative" ? "Cumulative" : "Non-Cumulative"}</span>
            </div>
            {fdConfig.depositType === "non-cumulative" && (
              <div className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
                <span className="text-sm text-white/60">Payout</span>
                <span className="text-sm font-medium text-white">{fdConfig.payoutFrequency.charAt(0).toUpperCase() + fdConfig.payoutFrequency.slice(1)}</span>
              </div>
            )}
            <div className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
              <span className="text-sm text-white/60">Interest Earned</span>
              <span className="text-sm font-medium text-mo-gold">{formatCurrency(fdConfig.totalInterest)}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
              <span className="text-sm text-white/60">Maturity Date</span>
              <span className="text-sm font-medium text-white">{formatDate(maturityDateStr)}</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-white/60">Auto-Renew</span>
              <span className="text-sm font-medium text-white">{fdConfig.autoRenew ? "Yes" : "No"}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-xs text-mo-muted uppercase tracking-wider mb-3">Applicant</div>
          <InfoRow label="Name" value={personalDetails.fullName} />
          <InfoRow label="PAN" value={personalDetails.pan} />
          <InfoRow label="Mobile" value={personalDetails.mobile} />
          <InfoRow label="Email" value={personalDetails.email} />
          <InfoRow label="Occupation" value={personalDetails.occupation} />
        </Card>

        <Card>
          <div className="text-xs text-mo-muted uppercase tracking-wider mb-3">Nominee</div>
          <InfoRow label="Name" value={nominee.name || "—"} />
          <InfoRow label="Relationship" value={nominee.relationship || "—"} />
        </Card>

        <Card>
          <div className="text-xs text-mo-muted uppercase tracking-wider mb-3">Bank Account</div>
          <InfoRow label="Bank" value={bank.bankName || "—"} />
          <InfoRow label="Account" value={bank.accountNo ? `XXXX${bank.accountNo.slice(-4)}` : "—"} />
          <InfoRow label="IFSC" value={bank.ifsc || "—"} />
          <InfoRow label="Holder" value={bank.holderName || "—"} />
        </Card>

        <Card>
          <div className="text-xs text-mo-muted uppercase tracking-wider mb-3">KYC Status</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xs">&#10003;</span>
            </div>
            <div>
              <div className="text-sm font-medium text-emerald-700">Verified</div>
              <div className="text-[10px] text-mo-muted">via {kyc.method || "CKYC"}</div>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <button
            onClick={() => setAgreed(!agreed)}
            className="flex items-start gap-3 w-full text-left"
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
              agreed ? "bg-mo-navy border-mo-navy" : "border-gray-300"
            }`}>
              {agreed && <span className="text-white text-xs">&#10003;</span>}
            </div>
            <span className="text-xs text-mo-muted leading-relaxed">
              I agree to the Terms & Conditions of {partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance"} and
              consent to share my data for FD processing. I confirm that all details provided are accurate.
            </span>
          </button>
        </div>
      </div>

      <BottomBar>
        <Button onClick={() => router.push("/riise/invest/payment")} disabled={!agreed}>
          Pay {formatCurrency(fdConfig.amount)}
        </Button>
      </BottomBar>
    </Shell>
  );
}
