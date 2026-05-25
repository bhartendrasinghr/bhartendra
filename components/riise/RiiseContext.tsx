"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Partner = "bajaj" | "shriram" | null;
export type DepositType = "cumulative" | "non-cumulative";
export type PayoutFrequency = "monthly" | "quarterly" | "half-yearly" | "yearly";

export interface FDConfig {
  partner: Partner;
  amount: number;
  tenure: number;
  rate: number;
  depositType: DepositType;
  payoutFrequency: PayoutFrequency;
  autoRenew: boolean;
  maturityAmount: number;
  totalInterest: number;
}

export interface PersonalDetails {
  fullName: string;
  pan: string;
  dob: string;
  mobile: string;
  email: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  occupation: string;
  annualIncome: string;
}

export interface NomineeDetails {
  name: string;
  relationship: string;
  dob: string;
}

export interface BankDetails {
  accountNo: string;
  ifsc: string;
  bankName: string;
  holderName: string;
  sameForMaturity: boolean;
}

export interface KycStatus {
  completed: boolean;
  method: string;
}

export interface BookedFD {
  id: string;
  partner: Partner;
  amount: number;
  tenure: number;
  rate: number;
  depositType: DepositType;
  maturityAmount: number;
  applicationNo: string;
  depositId: string;
  bookedDate: string;
  maturityDate: string;
  status: "processing" | "active" | "matured";
  nominee: string;
}

interface RiiseState {
  fdConfig: FDConfig;
  personalDetails: PersonalDetails;
  nominee: NomineeDetails;
  bank: BankDetails;
  kyc: KycStatus;
  portfolio: BookedFD[];
  setFDConfig: (c: Partial<FDConfig>) => void;
  setPersonalDetails: (d: Partial<PersonalDetails>) => void;
  setNominee: (n: Partial<NomineeDetails>) => void;
  setBank: (b: Partial<BankDetails>) => void;
  setKyc: (k: Partial<KycStatus>) => void;
  addToPortfolio: (fd: BookedFD) => void;
  reset: () => void;
}

const defaultFDConfig: FDConfig = {
  partner: null,
  amount: 100000,
  tenure: 12,
  rate: 7.85,
  depositType: "cumulative",
  payoutFrequency: "quarterly",
  autoRenew: false,
  maturityAmount: 0,
  totalInterest: 0,
};

const defaultPersonal: PersonalDetails = {
  fullName: "Rajesh Kumar",
  pan: "ABCPK1234R",
  dob: "1988-03-15",
  mobile: "9876543210",
  email: "rajesh.kumar@email.com",
  gender: "Male",
  address: "42, Prestige Towers, Goregaon East",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400063",
  occupation: "Salaried",
  annualIncome: "10-25 Lakhs",
};

const defaultNominee: NomineeDetails = {
  name: "",
  relationship: "",
  dob: "",
};

const defaultBank: BankDetails = {
  accountNo: "",
  ifsc: "",
  bankName: "",
  holderName: "",
  sameForMaturity: true,
};

const defaultKyc: KycStatus = {
  completed: false,
  method: "",
};

const samplePortfolio: BookedFD[] = [
  {
    id: "fd-001",
    partner: "bajaj",
    amount: 500000,
    tenure: 24,
    rate: 8.25,
    depositType: "cumulative",
    maturityAmount: 587412,
    applicationNo: "BFL-2026-48291",
    depositId: "8847291",
    bookedDate: "2026-01-15",
    maturityDate: "2028-01-15",
    status: "active",
    nominee: "Priya Kumar",
  },
  {
    id: "fd-002",
    partner: "shriram",
    amount: 200000,
    tenure: 36,
    rate: 8.55,
    depositType: "non-cumulative",
    maturityAmount: 200000,
    applicationNo: "SFL-2026-10234",
    depositId: "S2603150001",
    bookedDate: "2026-03-20",
    maturityDate: "2029-03-20",
    status: "active",
    nominee: "Anita Kumar",
  },
];

const RiiseContext = createContext<RiiseState | null>(null);

export function RiiseProvider({ children }: { children: ReactNode }) {
  const [fdConfig, _setFDConfig] = useState<FDConfig>(defaultFDConfig);
  const [personalDetails, _setPersonal] = useState<PersonalDetails>(defaultPersonal);
  const [nominee, _setNominee] = useState<NomineeDetails>(defaultNominee);
  const [bank, _setBank] = useState<BankDetails>(defaultBank);
  const [kyc, _setKyc] = useState<KycStatus>(defaultKyc);
  const [portfolio, setPortfolio] = useState<BookedFD[]>(samplePortfolio);

  const setFDConfig = (c: Partial<FDConfig>) => _setFDConfig((p) => ({ ...p, ...c }));
  const setPersonalDetails = (d: Partial<PersonalDetails>) => _setPersonal((p) => ({ ...p, ...d }));
  const setNominee = (n: Partial<NomineeDetails>) => _setNominee((p) => ({ ...p, ...n }));
  const setBank = (b: Partial<BankDetails>) => _setBank((p) => ({ ...p, ...b }));
  const setKyc = (k: Partial<KycStatus>) => _setKyc((p) => ({ ...p, ...k }));
  const addToPortfolio = (fd: BookedFD) => setPortfolio((p) => [fd, ...p]);
  const reset = () => {
    _setFDConfig(defaultFDConfig);
    _setNominee(defaultNominee);
    _setBank(defaultBank);
    _setKyc(defaultKyc);
  };

  return (
    <RiiseContext.Provider
      value={{
        fdConfig, personalDetails, nominee, bank, kyc, portfolio,
        setFDConfig, setPersonalDetails, setNominee, setBank, setKyc,
        addToPortfolio, reset,
      }}
    >
      {children}
    </RiiseContext.Provider>
  );
}

export function useRiise() {
  const ctx = useContext(RiiseContext);
  if (!ctx) throw new Error("useRiise must be used within RiiseProvider");
  return ctx;
}
