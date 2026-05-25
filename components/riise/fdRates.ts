export interface RateEntry {
  tenure: number;
  label: string;
  bajaj: number;
  shriram: number;
  bajajSenior: number;
  shriramSenior: number;
  shriramFemale: number;
}

export const FD_RATES: RateEntry[] = [
  { tenure: 12, label: "12 months", bajaj: 7.45, shriram: 7.41, bajajSenior: 7.70, shriramSenior: 7.91, shriramFemale: 7.66 },
  { tenure: 18, label: "18 months", bajaj: 7.60, shriram: 7.61, bajajSenior: 7.85, shriramSenior: 8.11, shriramFemale: 7.86 },
  { tenure: 24, label: "24 months", bajaj: 7.85, shriram: 7.85, bajajSenior: 8.10, shriramSenior: 8.35, shriramFemale: 8.10 },
  { tenure: 30, label: "30 months", bajaj: 8.05, shriram: 8.11, bajajSenior: 8.30, shriramSenior: 8.61, shriramFemale: 8.36 },
  { tenure: 36, label: "36 months", bajaj: 8.15, shriram: 8.26, bajajSenior: 8.40, shriramSenior: 8.76, shriramFemale: 8.51 },
  { tenure: 42, label: "42 months", bajaj: 8.20, shriram: 8.31, bajajSenior: 8.45, shriramSenior: 8.81, shriramFemale: 8.56 },
  { tenure: 48, label: "48 months", bajaj: 8.20, shriram: 8.36, bajajSenior: 8.45, shriramSenior: 8.86, shriramFemale: 8.61 },
  { tenure: 60, label: "60 months", bajaj: 8.25, shriram: 8.55, bajajSenior: 8.50, shriramSenior: 9.05, shriramFemale: 8.80 },
];

export function getRate(partner: "bajaj" | "shriram", tenure: number): number {
  const entry = FD_RATES.find((r) => r.tenure === tenure);
  if (!entry) return 7.5;
  return partner === "bajaj" ? entry.bajaj : entry.shriram;
}

export function calcMaturity(principal: number, ratePercent: number, tenureMonths: number): { maturity: number; interest: number } {
  const r = ratePercent / 100;
  const years = tenureMonths / 12;
  const n = 4; // quarterly compounding
  const maturity = principal * Math.pow(1 + r / n, n * years);
  return {
    maturity: Math.round(maturity),
    interest: Math.round(maturity - principal),
  };
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function futureDate(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split("T")[0];
}
