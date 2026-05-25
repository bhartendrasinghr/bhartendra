"use client";
import { useRouter } from "next/navigation";
import { useRiise } from "@/components/riise/RiiseContext";
import { Shell, Card, BottomBar, Button, Input } from "@/components/riise/ui";
import { useState, useEffect } from "react";

const BANKS: Record<string, string> = {
  HDFC: "HDFC Bank",
  SBIN: "State Bank of India",
  ICIC: "ICICI Bank",
  UTIB: "Axis Bank",
  KKBK: "Kotak Mahindra Bank",
  BARB: "Bank of Baroda",
  PUNB: "Punjab National Bank",
  CNRB: "Canara Bank",
  IDFB: "IDFC First Bank",
  YESB: "Yes Bank",
};

export default function BankDetailsPage() {
  const router = useRouter();
  const { bank, setBank, personalDetails } = useRiise();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (bank.ifsc.length >= 4) {
      const prefix = bank.ifsc.slice(0, 4).toUpperCase();
      const found = BANKS[prefix];
      if (found) {
        setBank({ bankName: found });
        setValidated(true);
      } else {
        setBank({ bankName: "" });
        setValidated(false);
      }
    } else {
      setValidated(false);
    }
  }, [bank.ifsc]);

  useEffect(() => {
    if (!bank.holderName) setBank({ holderName: personalDetails.fullName });
  }, []);

  const canProceed = bank.accountNo.length >= 8 && bank.ifsc.length >= 11 && validated && bank.holderName;

  return (
    <Shell title="Bank Account" subtitle="For investment and maturity payout" step={5} totalSteps={8}>
      <div className="space-y-6 mt-4">
        <Card>
          <div className="text-xs text-mo-muted uppercase tracking-wider mb-4">Investment Account</div>
          <div className="space-y-3">
            <Input
              label="Account Number"
              placeholder="Enter bank account number"
              value={bank.accountNo}
              onChange={(e) => setBank({ accountNo: e.target.value.replace(/\D/g, "") })}
            />
            <Input
              label="Confirm Account Number"
              placeholder="Re-enter account number"
            />
            <div>
              <Input
                label="IFSC Code"
                placeholder="e.g. HDFC0001234"
                value={bank.ifsc}
                onChange={(e) => setBank({ ifsc: e.target.value.toUpperCase() })}
                maxLength={11}
              />
              {validated && bank.bankName && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-emerald-600 text-xs">&#10003;</span>
                  <span className="text-xs text-emerald-600">{bank.bankName}</span>
                </div>
              )}
            </div>
            <Input
              label="Account Holder Name"
              value={bank.holderName}
              onChange={(e) => setBank({ holderName: e.target.value })}
            />
          </div>
        </Card>

        <Card>
          <div className="text-xs text-mo-muted uppercase tracking-wider mb-4">Maturity Payout Account</div>
          <button
            onClick={() => setBank({ sameForMaturity: !bank.sameForMaturity })}
            className="flex items-center gap-3 w-full"
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
              bank.sameForMaturity ? "bg-mo-navy border-mo-navy" : "border-gray-300"
            }`}>
              {bank.sameForMaturity && <span className="text-white text-xs">&#10003;</span>}
            </div>
            <span className="text-sm text-mo-text">Same as investment account</span>
          </button>
        </Card>

        <div className="rounded-xl bg-mo-navy/5 border border-mo-navy/10 p-3">
          <div className="flex items-start gap-2">
            <span className="text-mo-navy text-xs mt-0.5">&#9432;</span>
            <div className="text-xs text-mo-muted leading-relaxed">
              Your bank account will be verified through Third Party Verification (TPV).
              The account must be in your name to proceed with the investment.
            </div>
          </div>
        </div>
      </div>

      <BottomBar>
        <Button onClick={() => router.push("/riise/invest/review")} disabled={!canProceed}>
          Review FD Application
        </Button>
      </BottomBar>
    </Shell>
  );
}
