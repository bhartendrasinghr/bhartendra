"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useRiise } from "@/components/riise/RiiseContext";
import { Shell, Card, BottomBar, Button } from "@/components/riise/ui";
import { formatCurrency } from "@/components/riise/fdRates";

type PayMode = "upi" | "netbanking" | null;
type PayStep = "select" | "processing" | "done";

const BANKS = [
  { id: "FD020", name: "HDFC Bank", icon: "H" },
  { id: "FD039", name: "State Bank of India", icon: "S" },
  { id: "FD022", name: "ICICI Bank", icon: "I" },
  { id: "FD003", name: "Axis Bank", icon: "A" },
  { id: "FD049", name: "Yes Bank", icon: "Y" },
  { id: "FD019", name: "Federal Bank", icon: "F" },
  { id: "FD026", name: "IndusInd Bank", icon: "I" },
  { id: "FD050", name: "UPI", icon: "U" },
];

export default function PaymentPage() {
  const router = useRouter();
  const { fdConfig } = useRiise();
  const [mode, setMode] = useState<PayMode>(null);
  const [step, setStep] = useState<PayStep>("select");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const partner = fdConfig.partner || "bajaj";

  useEffect(() => {
    if (step === "processing") {
      const timer = setTimeout(() => setStep("done"), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === "done") {
      const timer = setTimeout(() => router.push("/riise/invest/success"), 1500);
      return () => clearTimeout(timer);
    }
  }, [step, router]);

  const handlePay = () => setStep("processing");

  if (step === "processing") {
    return (
      <Shell title="Processing Payment" step={7} totalSteps={8}>
        <div className="mt-16">
          <Card>
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto rounded-full bg-mo-navy/10 border border-mo-navy/20 flex items-center justify-center mb-6">
                <div className="w-10 h-10 border-mo-navy/30 border-t-mo-navy rounded-full animate-spin" style={{ borderWidth: 3, borderStyle: "solid" }} />
              </div>
              <div className="text-base font-semibold text-mo-navy mb-2">Processing Payment</div>
              <div className="text-xs text-mo-muted mb-1">{formatCurrency(fdConfig.amount)}</div>
              <div className="text-xs text-gray-400">
                {partner === "bajaj" ? "via Bajaj Finserv Payment Gateway" : "via Shriram Finance Payment Gateway"}
              </div>
              <div className="text-xs text-gray-300 mt-4">Do not close this screen or press back</div>
            </div>
          </Card>
        </div>
      </Shell>
    );
  }

  if (step === "done") {
    return (
      <Shell title="Payment Successful" step={7} totalSteps={8}>
        <div className="mt-16">
          <Card className="border-emerald-200 bg-emerald-50">
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                <span className="text-4xl text-emerald-600">&#10003;</span>
              </div>
              <div className="text-lg font-bold text-emerald-700 mb-1">Payment Successful!</div>
              <div className="text-sm text-mo-muted">{formatCurrency(fdConfig.amount)}</div>
              <div className="text-xs text-gray-400 mt-2">Redirecting to confirmation...</div>
            </div>
          </Card>
        </div>
      </Shell>
    );
  }

  return (
    <Shell title="Payment" subtitle={`Pay ${formatCurrency(fdConfig.amount)} to ${partner === "bajaj" ? "Bajaj Finserv" : "Shriram Finance"}`} step={7} totalSteps={8}>
      <div className="space-y-4 mt-4">
        <Card className="bg-gradient-to-r from-mo-navy to-mo-navy-light border-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-white/50">Amount to Pay</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(fdConfig.amount)}</div>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold bg-mo-gold text-mo-navy">
              {partner === "bajaj" ? "B" : "S"}
            </div>
          </div>
        </Card>

        <div className="text-xs text-mo-muted mb-2">Select Payment Method</div>

        <Card selected={mode === "upi"} onClick={() => setMode("upi")}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mo-navy/10 border border-mo-navy/20 flex items-center justify-center">
              <span className="text-sm font-bold text-mo-navy">U</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-mo-navy">UPI</div>
              <div className="text-[11px] text-mo-muted">Pay using any UPI app</div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              mode === "upi" ? "border-mo-navy bg-mo-navy" : "border-gray-300"
            }`}>
              {mode === "upi" && <span className="text-white text-[10px]">&#10003;</span>}
            </div>
          </div>
          {mode === "upi" && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <label className="text-xs text-mo-muted mb-1.5 block">UPI ID</label>
              <input
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-mo-bg border border-gray-200 rounded-xl px-4 py-3 text-sm text-mo-text placeholder:text-gray-400 focus:outline-none focus:border-mo-navy focus:ring-2 focus:ring-mo-navy/10 transition"
              />
            </div>
          )}
        </Card>

        <Card selected={mode === "netbanking"} onClick={() => setMode("netbanking")}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mo-navy/10 border border-mo-navy/20 flex items-center justify-center">
              <span className="text-sm font-bold text-mo-navy">NB</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-mo-navy">Net Banking</div>
              <div className="text-[11px] text-mo-muted">50+ banks supported</div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              mode === "netbanking" ? "border-mo-navy bg-mo-navy" : "border-gray-300"
            }`}>
              {mode === "netbanking" && <span className="text-white text-[10px]">&#10003;</span>}
            </div>
          </div>
          {mode === "netbanking" && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2">
                {BANKS.filter((b) => b.id !== "FD050").map((b) => (
                  <button
                    key={b.id}
                    onClick={(e) => { e.stopPropagation(); setSelectedBank(b.id); }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition text-xs ${
                      selectedBank === b.id
                        ? "border-mo-navy bg-mo-navy/5"
                        : "border-gray-100 bg-mo-bg hover:border-mo-navy/20"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-mo-navy/10 flex items-center justify-center text-[10px] font-bold text-mo-navy flex-shrink-0">
                      {b.icon}
                    </div>
                    <span className="truncate text-mo-text">{b.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      <BottomBar>
        <Button
          onClick={handlePay}
          disabled={!mode || (mode === "upi" && !upiId) || (mode === "netbanking" && !selectedBank)}
        >
          Pay {formatCurrency(fdConfig.amount)}
        </Button>
      </BottomBar>
    </Shell>
  );
}
