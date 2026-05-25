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
          <div className="w-24 h-24 mx-auto rounded-full bg-emerald-400/20 flex items-center justify-center mb-6 relative">
            <span className="text-5xl">&#10003;</span>
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping" style={{ animationDuration: "2s" }} />
          </div>
          <h1 className="text-2xl font-bold text-emerald-400 mb-2">FD Application Submitted!</h1>
          <p className="text-sm text-white/50">
            Your Fixed Deposit application has been successfully submitted to {partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance"}
          </p>
        </div>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-600/5 border-emerald-400/20 mb-4">
          <div className="flex items-center justify-between mb-4">
            <Badge color={partner === "bajaj" ? "blue" : "amber"}>
              {partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance"}
            </Badge>
            <Badge color="emerald">Processing</Badge>
          </div>
          <InfoRow label="Application No." value={appNo} />
          <InfoRow label="Deposit Amount" value={formatCurrency(fdConfig.amount)} />
          <InfoRow label="Interest Rate" value={`${fdConfig.rate}% p.a.`} highlight />
          <InfoRow label="Tenure" value={`${fdConfig.tenure} months`} />
          <InfoRow label="Type" value={fdConfig.depositType === "cumulative" ? "Cumulative" : "Non-Cumulative"} />
          <InfoRow label="Maturity Amount" value={formatCurrency(fdConfig.maturityAmount)} highlight />
          <InfoRow label="Maturity Date" value={formatDate(maturityDateStr)} />
          <InfoRow label="Auto-Renew" value={fdConfig.autoRenew ? "Yes" : "No"} />
        </Card>

        <Card className="mb-4">
          <InfoRow label="Applicant" value={personalDetails.fullName} />
          <InfoRow label="PAN" value={personalDetails.pan} />
          <InfoRow label="Nominee" value={nominee.name || "—"} />
          <InfoRow label="Submitted On" value={formatDate(today)} />
        </Card>

        <Card className="mb-4 border-blue-400/10 bg-blue-400/5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-400 text-xs">&#9432;</span>
            </div>
            <div>
              <div className="text-xs font-medium text-blue-400 mb-1">What happens next?</div>
              <div className="space-y-2 text-xs text-white/40">
                <div className="flex items-start gap-2">
                  <span className="text-white/20 mt-0.5">1.</span>
                  <span>Your application will be processed within 1-2 business days</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white/20 mt-0.5">2.</span>
                  <span>{partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance"} will verify your documents and KYC</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white/20 mt-0.5">3.</span>
                  <span>Once approved, your FD will be booked and you&apos;ll receive a deposit receipt</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white/20 mt-0.5">4.</span>
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
