"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useRiise } from "@/components/riise/RiiseContext";
import { Shell, Card, BottomBar, Button, Input } from "@/components/riise/ui";

type KycStep = "checking" | "method" | "otp" | "verifying" | "done" | "redirect";

export default function KYCPage() {
  const router = useRouter();
  const { fdConfig, kyc, setKyc, personalDetails } = useRiise();
  const partner = fdConfig.partner || "bajaj";

  const [step, setStep] = useState<KycStep>("checking");
  const [otp, setOtp] = useState("");
  const [method, setMethod] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === "checking") {
      const timer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => setStep("method"), 500);
      }, 1800);
      const interval = setInterval(() => setProgress((p) => Math.min(p + 15, 90)), 200);
      return () => { clearTimeout(timer); clearInterval(interval); };
    }
  }, [step]);

  useEffect(() => {
    if (step === "verifying") {
      const timer = setTimeout(() => {
        setKyc({ completed: true, method });
        setStep("done");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, method, setKyc]);

  const handleMethodSelect = (m: string) => {
    setMethod(m);
    if (m === "vkyc") {
      setStep("redirect");
    } else {
      setStep("otp");
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) setStep("verifying");
  };

  const bajajMethods = [
    { id: "ckyc", label: "CKYC + OTP", desc: "Verify via PAN with OTP sent to your mobile", icon: "P" },
    { id: "okyc", label: "Aadhaar OTP", desc: "OTP sent to Aadhaar-linked mobile number", icon: "A" },
    { id: "digilocker", label: "Digi Locker", desc: "Fetch documents from Digi Locker", icon: "D" },
    { id: "vkyc", label: "Video KYC", desc: "Quick video call with a verification agent", icon: "V" },
  ];

  const shriramMethods = [
    { id: "ckyc", label: "CKYC Verification", desc: "Auto-verify using your PAN number", icon: "C" },
    { id: "ekyc", label: "E-KYC (Aadhaar OTP)", desc: "OTP sent to Aadhaar-linked mobile", icon: "A" },
    { id: "digilocker", label: "Digi Locker", desc: "Fetch documents from Digi Locker", icon: "D" },
  ];

  const methods = partner === "bajaj" ? bajajMethods : shriramMethods;

  return (
    <Shell
      title="KYC Verification"
      subtitle={partner === "bajaj" ? "Required by Bajaj Finserv" : "Required by Shriram Finance"}
      step={4}
      totalSteps={8}
    >
      <div className="mt-4">
        {step === "checking" && (
          <Card>
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-mo-navy/10 border border-mo-navy/20 flex items-center justify-center mb-4">
                <div className="w-8 h-8 border-2 border-mo-navy/30 border-t-mo-navy rounded-full animate-spin" />
              </div>
              <div className="text-sm font-medium text-mo-navy mb-2">Checking your KYC status...</div>
              <div className="text-xs text-mo-muted mb-4">Verifying with {partner === "bajaj" ? "CERSAI" : "CKYC"} records</div>
              <div className="w-48 mx-auto h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-mo-navy rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </Card>
        )}

        {step === "method" && (
          <>
            <Card className="mb-4 border-mo-gold/30 bg-mo-gold/5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-mo-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-mo-gold-dark text-xs">!</span>
                </div>
                <div>
                  <div className="text-xs font-medium text-mo-gold-dark">KYC Required</div>
                  <div className="text-xs text-mo-muted mt-0.5">
                    {partner === "bajaj"
                      ? "Bajaj Finserv requires fresh KYC verification as per RBI guidelines."
                      : "Shriram Finance requires CKYC verification for FD booking."}
                  </div>
                </div>
              </div>
            </Card>
            <div className="text-xs text-mo-muted mb-3">Choose verification method</div>
            <div className="space-y-2">
              {methods.map((m) => (
                <Card key={m.id} onClick={() => handleMethodSelect(m.id)} className="hover:border-mo-navy/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold bg-mo-navy/10 text-mo-navy border border-mo-navy/20">
                      {m.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-mo-navy">{m.label}</div>
                      <div className="text-[11px] text-mo-muted">{m.desc}</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {step === "otp" && (
          <Card>
            <div className="text-center py-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-mo-navy/10 border border-mo-navy/20 flex items-center justify-center mb-4">
                <span className="text-2xl">&#128274;</span>
              </div>
              <div className="text-sm font-medium text-mo-navy mb-1">Enter OTP</div>
              <div className="text-xs text-mo-muted mb-6">
                {method === "ckyc"
                  ? `OTP sent to ${personalDetails.mobile.slice(0, 4)}XXXX${personalDetails.mobile.slice(-2)}`
                  : "OTP sent to your Aadhaar-linked mobile"}
              </div>
              <div className="flex justify-center gap-2 mb-6">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-11 h-12 rounded-lg border flex items-center justify-center text-lg font-bold transition ${
                      otp[i] ? "border-mo-navy bg-mo-navy/5 text-mo-navy" : "border-gray-200 bg-mo-bg"
                    }`}
                  >
                    {otp[i] || ""}
                  </div>
                ))}
              </div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="opacity-0 absolute"
                autoFocus
              />
              <Input label="" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} />
              <div className="text-xs text-gray-400 mt-3">
                Didn&apos;t receive? <button className="text-mo-navy hover:underline">Resend OTP</button>
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleOtpSubmit} disabled={otp.length !== 6}>
                Verify OTP
              </Button>
            </div>
          </Card>
        )}

        {step === "redirect" && (
          <Card>
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-mo-navy/10 border border-mo-navy/20 flex items-center justify-center mb-4">
                <span className="text-2xl">&#127909;</span>
              </div>
              <div className="text-sm font-medium text-mo-navy mb-2">Video KYC</div>
              <div className="text-xs text-mo-muted mb-6">
                You will be redirected to Bajaj Finserv&apos;s Video KYC portal. An agent will verify your identity via video call.
              </div>
              <Button
                onClick={() => {
                  setMethod("vkyc");
                  setStep("verifying");
                }}
              >
                Start Video Call
              </Button>
              <div className="text-xs text-gray-400 mt-3">Estimated wait: 2-3 minutes</div>
            </div>
          </Card>
        )}

        {step === "verifying" && (
          <Card>
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-mo-navy/10 border border-mo-navy/20 flex items-center justify-center mb-4">
                <div className="w-8 h-8 border-2 border-mo-navy/30 border-t-mo-navy rounded-full animate-spin" />
              </div>
              <div className="text-sm font-medium text-mo-navy mb-2">Verifying your identity...</div>
              <div className="text-xs text-mo-muted">
                {partner === "bajaj" ? "Fetching KYC data from CERSAI" : "Verifying with CKYC records"}
              </div>
            </div>
          </Card>
        )}

        {step === "done" && (
          <>
            <Card className="border-emerald-200 bg-emerald-50">
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <span className="text-3xl text-emerald-600">&#10003;</span>
                </div>
                <div className="text-base font-semibold text-emerald-700 mb-1">KYC Verified</div>
                <div className="text-xs text-mo-muted">
                  Your identity has been verified via {method === "ckyc" ? "CKYC" : method === "ekyc" ? "E-KYC" : method === "okyc" ? "Aadhaar OTP" : method === "digilocker" ? "Digi Locker" : "Video KYC"}
                </div>
              </div>
            </Card>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs py-2 border-b border-gray-100">
                <span className="text-mo-muted">Name Match</span>
                <span className="text-emerald-600">Verified</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-gray-100">
                <span className="text-mo-muted">PAN Status</span>
                <span className="text-emerald-600">Active</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-gray-100">
                <span className="text-mo-muted">Transaction ID</span>
                <span className="text-mo-text font-mono text-[11px]">POD-365260655102</span>
              </div>
            </div>
            <BottomBar>
              <Button onClick={() => router.push("/riise/invest/bank")}>Continue to Bank Details</Button>
            </BottomBar>
          </>
        )}
      </div>
    </Shell>
  );
}
