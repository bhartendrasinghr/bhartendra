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
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-600/5 border-emerald-400/20">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-white/50 uppercase tracking-wider">FD Summary</div>
            <Badge color={partner === "bajaj" ? "blue" : "amber"}>
              {partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-[10px] text-white/30">Investment</div>
              <div className="text-xl font-bold">{formatCurrency(fdConfig.amount)}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30">At Maturity</div>
              <div className="text-xl font-bold text-emerald-400">{formatCurrency(fdConfig.maturityAmount)}</div>
            </div>
          </div>
          <InfoRow label="Interest Rate" value={`${fdConfig.rate}% p.a.`} highlight />
          <InfoRow label="Tenure" value={`${fdConfig.tenure} months`} />
          <InfoRow label="Type" value={fdConfig.depositType === "cumulative" ? "Cumulative" : "Non-Cumulative"} />
          {fdConfig.depositType === "non-cumulative" && (
            <InfoRow label="Payout" value={fdConfig.payoutFrequency.charAt(0).toUpperCase() + fdConfig.payoutFrequency.slice(1)} />
          )}
          <InfoRow label="Interest Earned" value={formatCurrency(fdConfig.totalInterest)} highlight />
          <InfoRow label="Maturity Date" value={formatDate(maturityDateStr)} />
          <InfoRow label="Auto-Renew" value={fdConfig.autoRenew ? "Yes" : "No"} />
        </Card>

        <Card>
          <div className="text-xs text-white/50 uppercase tracking-wider mb-3">Applicant</div>
          <InfoRow label="Name" value={personalDetails.fullName} />
          <InfoRow label="PAN" value={personalDetails.pan} />
          <InfoRow label="Mobile" value={personalDetails.mobile} />
          <InfoRow label="Email" value={personalDetails.email} />
          <InfoRow label="Occupation" value={personalDetails.occupation} />
        </Card>

        <Card>
          <div className="text-xs text-white/50 uppercase tracking-wider mb-3">Nominee</div>
          <InfoRow label="Name" value={nominee.name || "—"} />
          <InfoRow label="Relationship" value={nominee.relationship || "—"} />
        </Card>

        <Card>
          <div className="text-xs text-white/50 uppercase tracking-wider mb-3">Bank Account</div>
          <InfoRow label="Bank" value={bank.bankName || "—"} />
          <InfoRow label="Account" value={bank.accountNo ? `XXXX${bank.accountNo.slice(-4)}` : "—"} />
          <InfoRow label="IFSC" value={bank.ifsc || "—"} />
          <InfoRow label="Holder" value={bank.holderName || "—"} />
        </Card>

        <Card>
          <div className="text-xs text-white/50 uppercase tracking-wider mb-3">KYC Status</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center">
              <span className="text-emerald-400 text-xs">&#10003;</span>
            </div>
            <div>
              <div className="text-sm font-medium text-emerald-400">Verified</div>
              <div className="text-[10px] text-white/30">via {kyc.method || "CKYC"}</div>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <button
            onClick={() => setAgreed(!agreed)}
            className="flex items-start gap-3 w-full text-left"
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
              agreed ? "bg-emerald-500 border-emerald-500" : "border-white/30"
            }`}>
              {agreed && <span className="text-white text-xs">&#10003;</span>}
            </div>
            <span className="text-xs text-white/50 leading-relaxed">
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
