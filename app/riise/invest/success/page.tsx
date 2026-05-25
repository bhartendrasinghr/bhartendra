"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRiise, BookedFD } from "@/components/riise/RiiseContext";
import { Shell, Card, Button, InfoRow, Badge } from "@/components/riise/ui";
import { formatCurrency, futureDate, formatDate } from "@/components/riise/fdRates";

export default function SuccessPage() {
  const router = useRouter();
  const { fdConfig, personalDetails, nominee, addToPortfolio } = useRiise();
  const partner = fdConfig.partner || "bajaj";
  const [added, setAdded] = useState(false);

  const appNo = partner === "bajaj"
    ? `BFL-2026-${Math.floor(10000 + Math.random() * 90000)}`
    : `SFL-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const depositId = partner === "bajaj"
    ? `${Math.floor(8000000 + Math.random() * 1000000)}`
    : `S${new Date().toISOString().slice(2, 10).replace(/-/g, "")}${Math.floor(1000 + Math.random() * 9000)}`;
  const today = new Date().toISOString().split("T")[0];
  const maturityDateStr = futureDate(fdConfig.tenure);

  useEffect(() => {
    if (!added) {
      const newFD: BookedFD = {
        id: `fd-${Date.now()}`,
        partner: fdConfig.partner,
        amount: fdConfig.amount,
        tenure: fdConfig.tenure,
        rate: fdConfig.rate,
        depositType: fdConfig.depositType,
        maturityAmount: fdConfig.maturityAmount,
        applicationNo: appNo,
        depositId,
        bookedDate: today,
        maturityDate: maturityDateStr,
        status: "processing",
        nominee: nominee.name,
      };
      addToPortfolio(newFD);
      setAdded(true);
    }
  }, [added]);

  return (
    <Shell title="" subtitle="">
      <div className="mt-4">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6 relative">
            <span className="text-5xl text-emerald-600">&#10003;</span>
            <div className="absolute inset-0 rounded-full border-2 border-emerald-300 animate-ping" style={{ animationDuration: "2s" }} />
          </div>
          <h1 className="text-2xl font-bold text-mo-navy mb-2">FD Application Submitted!</h1>
          <p className="text-sm text-mo-muted">
            Your Fixed Deposit application has been successfully submitted to {partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance"}
          </p>
        </div>

        <Card className="bg-gradient-to-br from-mo-navy to-mo-navy-light border-0 mb-4">
          <div className="flex items-center justify-between mb-4">
            <Badge color="gold">
              {partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance"}
            </Badge>
            <Badge color="emerald">Processing</Badge>
          </div>
          <div className="space-y-0">
            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
              <span className="text-sm text-white/60">Application No.</span>
              <span className="text-sm font-medium text-white">{appNo}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
              <span className="text-sm text-white/60">Deposit Amount</span>
              <span className="text-sm font-medium text-white">{formatCurrency(fdConfig.amount)}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
              <span className="text-sm text-white/60">Interest Rate</span>
              <span className="text-sm font-medium text-mo-gold">{`${fdConfig.rate}% p.a.`}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
              <span className="text-sm text-white/60">Tenure</span>
              <span className="text-sm font-medium text-white">{`${fdConfig.tenure} months`}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
              <span className="text-sm text-white/60">Type</span>
              <span className="text-sm font-medium text-white">{fdConfig.depositType === "cumulative" ? "Cumulative" : "Non-Cumulative"}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
              <span className="text-sm text-white/60">Maturity Amount</span>
              <span className="text-sm font-medium text-mo-gold">{formatCurrency(fdConfig.maturityAmount)}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
              <span className="text-sm text-white/60">Maturity Date</span>
              <span className="text-sm font-medium text-white">{formatDate(maturityDateStr)}</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-white/60">Auto-Renew</span>
              <span className="text-sm font-medium text-white">{fdConfig.autoRenew ? "Yes" : "No"}</span>
            </div>
          </div>
        </Card>

        <Card className="mb-4">
          <InfoRow label="Applicant" value={personalDetails.fullName} />
          <InfoRow label="PAN" value={personalDetails.pan} />
          <InfoRow label="Nominee" value={nominee.name || "—"} />
          <InfoRow label="Submitted On" value={formatDate(today)} />
        </Card>

        <Card className="mb-4 border-mo-navy/10 bg-mo-navy/5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-mo-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-mo-navy text-xs">&#9432;</span>
            </div>
            <div>
              <div className="text-xs font-medium text-mo-navy mb-1">What happens next?</div>
              <div className="space-y-2 text-xs text-mo-muted">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">1.</span>
                  <span>Your application will be processed within 1-2 business days</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">2.</span>
                  <span>{partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance"} will verify your documents and KYC</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">3.</span>
                  <span>Once approved, your FD will be booked and you&apos;ll receive a deposit receipt</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">4.</span>
                  <span>Track status anytime in your RIISE portfolio</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-3 mb-8">
          <Button onClick={() => router.push("/riise/portfolio")}>
            View Portfolio
          </Button>
          <Button variant="secondary" onClick={() => router.push("/riise")}>
            Back to Home
          </Button>
        </div>
      </div>
    </Shell>
  );
}
