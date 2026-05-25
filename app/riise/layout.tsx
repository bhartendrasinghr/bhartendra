import type { Metadata } from "next";
import { RiiseProvider } from "@/components/riise/RiiseContext";

export const metadata: Metadata = {
  title: "RIISE — Fixed Deposits | Motilal Oswal",
  description: "Invest in Fixed Deposits from Bajaj Finserv and Shriram Finance through Motilal Oswal RIISE.",
};

export default function RiiseLayout({ children }: { children: React.ReactNode }) {
  return <RiiseProvider>{children}</RiiseProvider>;
}
