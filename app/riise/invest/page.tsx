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
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-base font-bold text-blue-400">B</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Bajaj Finserv</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20">AAA Rated</span>
              </div>
              <div className="text-xs text-white/40 mt-1">CRISIL AAA/Stable | Bajaj Finance Ltd.</div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="bg-white/[0.04] rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-emerald-400">8.25%</div>
                  <div className="text-[10px] text-white/30">Max rate</div>
                </div>
                <div className="bg-white/[0.04] rounded-lg p-2 text-center">
                  <div className="text-sm font-bold">12-60</div>
                  <div className="text-[10px] text-white/30">Months</div>
                </div>
                <div className="bg-white/[0.04] rounded-lg p-2 text-center">
                  <div className="text-sm font-bold">15K</div>
                  <div className="text-[10px] text-white/30">Min. amt</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["CKYC", "VKYC", "Digi Locker", "Aadhaar OTP", "Doc Upload"].map((m) => (
                  <span key={m} className="px-2 py-0.5 rounded-full text-[10px] bg-blue-400/10 text-blue-300 border border-blue-400/10">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card selected={fdConfig.partner === "shriram"} onClick={() => select("shriram")}>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-base font-bold text-orange-400">S</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Shriram Finance</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20">AA+ Rated</span>
              </div>
              <div className="text-xs text-white/40 mt-1">ICRA AA+/Stable | Shriram Finance Ltd.</div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="bg-white/[0.04] rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-emerald-400">8.55%</div>
                  <div className="text-[10px] text-white/30">Max rate</div>
                </div>
                <div className="bg-white/[0.04] rounded-lg p-2 text-center">
                  <div className="text-sm font-bold">12-60</div>
                  <div className="text-[10px] text-white/30">Months</div>
                </div>
                <div className="bg-white/[0.04] rounded-lg p-2 text-center">
                  <div className="text-sm font-bold">5K</div>
                  <div className="text-[10px] text-white/30">Min. amt</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["CKYC", "E-KYC OTP", "Digi Locker"].map((m) => (
                  <span key={m} className="px-2 py-0.5 rounded-full text-[10px] bg-orange-400/10 text-orange-300 border border-orange-400/10">
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
