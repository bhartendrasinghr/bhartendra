"use client";
import { useRouter } from "next/navigation";
import { useRiise } from "@/components/riise/RiiseContext";
import { Shell, Card, BottomBar, Button } from "@/components/riise/ui";

export default function SelectPartner() {
  const router = useRouter();
  const { fdConfig, setFDConfig, reset } = useRiise();

  const select = (partner: "bajaj" | "shriram") => {
    reset();
    setFDConfig({ partner });
  };

  return (
    <Shell title="Choose FD Partner" subtitle="Select where you want to invest" step={1} totalSteps={8}>
      <div className="space-y-3 mt-4">
        <Card selected={fdConfig.partner === "bajaj"} onClick={() => select("bajaj")}>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-mo-navy/10 border border-mo-navy/20 flex items-center justify-center flex-shrink-0">
              <span className="text-base font-bold text-mo-navy">B</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-mo-navy">Bajaj Finserv</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-mo-gold/10 text-mo-gold-dark border border-mo-gold/20">AAA Rated</span>
              </div>
              <div className="text-xs text-mo-muted mt-1">CRISIL AAA/Stable | Bajaj Finance Ltd.</div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="bg-mo-bg rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-mo-gold-dark">8.25%</div>
                  <div className="text-[10px] text-gray-400">Max rate</div>
                </div>
                <div className="bg-mo-bg rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-mo-text">12-60</div>
                  <div className="text-[10px] text-gray-400">Months</div>
                </div>
                <div className="bg-mo-bg rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-mo-text">15K</div>
                  <div className="text-[10px] text-gray-400">Min. amt</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["CKYC", "VKYC", "Digi Locker", "Aadhaar OTP", "Doc Upload"].map((m) => (
                  <span key={m} className="px-2 py-0.5 rounded-full text-[10px] bg-mo-navy/5 text-mo-navy border border-mo-navy/10">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card selected={fdConfig.partner === "shriram"} onClick={() => select("shriram")}>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-mo-gold/10 border border-mo-gold/20 flex items-center justify-center flex-shrink-0">
              <span className="text-base font-bold text-mo-gold-dark">S</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-mo-navy">Shriram Finance</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-mo-gold/10 text-mo-gold-dark border border-mo-gold/20">AA+ Rated</span>
              </div>
              <div className="text-xs text-mo-muted mt-1">ICRA AA+/Stable | Shriram Finance Ltd.</div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="bg-mo-bg rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-mo-gold-dark">8.55%</div>
                  <div className="text-[10px] text-gray-400">Max rate</div>
                </div>
                <div className="bg-mo-bg rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-mo-text">12-60</div>
                  <div className="text-[10px] text-gray-400">Months</div>
                </div>
                <div className="bg-mo-bg rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-mo-text">5K</div>
                  <div className="text-[10px] text-gray-400">Min. amt</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["CKYC", "E-KYC OTP", "Digi Locker"].map((m) => (
                  <span key={m} className="px-2 py-0.5 rounded-full text-[10px] bg-mo-gold/5 text-mo-gold-dark border border-mo-gold/10">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <BottomBar>
        <Button disabled={!fdConfig.partner} onClick={() => router.push("/riise/invest/configure")}>
          Continue
        </Button>
      </BottomBar>
    </Shell>
  );
}
