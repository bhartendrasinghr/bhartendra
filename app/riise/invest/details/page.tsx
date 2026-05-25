"use client";
import { useRouter } from "next/navigation";
import { useRiise } from "@/components/riise/RiiseContext";
import { Shell, Card, BottomBar, Button, Input, Select } from "@/components/riise/ui";

export default function PersonalDetailsPage() {
  const router = useRouter();
  const { personalDetails, setPersonalDetails, nominee, setNominee, fdConfig } = useRiise();

  return (
    <Shell title="Personal Details" subtitle="Pre-filled from your Motilal Oswal account" step={3} totalSteps={8}>
      <div className="space-y-6 mt-4">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-[10px] text-emerald-600">&#10003;</span>
            </div>
            <span className="text-xs text-emerald-600">Auto-filled from MOSL account</span>
          </div>
          <div className="space-y-3">
            <Input label="Full Name" value={personalDetails.fullName} onChange={(e) => setPersonalDetails({ fullName: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="PAN" value={personalDetails.pan} onChange={(e) => setPersonalDetails({ pan: e.target.value })} />
              <Input label="Date of Birth" type="date" value={personalDetails.dob} onChange={(e) => setPersonalDetails({ dob: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Mobile" value={personalDetails.mobile} onChange={(e) => setPersonalDetails({ mobile: e.target.value })} />
              <Input label="Email" value={personalDetails.email} onChange={(e) => setPersonalDetails({ email: e.target.value })} />
            </div>
            <Select label="Gender" value={personalDetails.gender} onChange={(e) => setPersonalDetails({ gender: e.target.value })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
        </Card>

        <Card>
          <div className="text-xs text-mo-muted uppercase tracking-wider mb-4">Address</div>
          <div className="space-y-3">
            <Input label="Address" value={personalDetails.address} onChange={(e) => setPersonalDetails({ address: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="City" value={personalDetails.city} onChange={(e) => setPersonalDetails({ city: e.target.value })} />
              <Input label="State" value={personalDetails.state} onChange={(e) => setPersonalDetails({ state: e.target.value })} />
            </div>
            <Input label="Pincode" value={personalDetails.pincode} onChange={(e) => setPersonalDetails({ pincode: e.target.value })} />
          </div>
        </Card>

        <Card>
          <div className="text-xs text-mo-muted uppercase tracking-wider mb-4">Occupation & Income</div>
          <div className="space-y-3">
            <Select label="Occupation" value={personalDetails.occupation} onChange={(e) => setPersonalDetails({ occupation: e.target.value })}>
              <option value="Salaried">Salaried</option>
              <option value="Self Employed">Self Employed</option>
              <option value="Business">Business</option>
              <option value="Retired">Retired</option>
              <option value="Student">Student</option>
              <option value="Homemaker">Homemaker</option>
            </Select>
            <Select label="Annual Income" value={personalDetails.annualIncome} onChange={(e) => setPersonalDetails({ annualIncome: e.target.value })}>
              <option value="Below 5 Lakhs">Below 5 Lakhs</option>
              <option value="5-10 Lakhs">5-10 Lakhs</option>
              <option value="10-25 Lakhs">10-25 Lakhs</option>
              <option value="25-50 Lakhs">25-50 Lakhs</option>
              <option value="Above 50 Lakhs">Above 50 Lakhs</option>
            </Select>
          </div>
        </Card>

        <Card>
          <div className="text-xs text-mo-muted uppercase tracking-wider mb-4">Nominee Details</div>
          <div className="space-y-3">
            <Input label="Nominee Name" value={nominee.name} placeholder="Enter nominee name" onChange={(e) => setNominee({ name: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Relationship" value={nominee.relationship} onChange={(e) => setNominee({ relationship: e.target.value })}>
                <option value="">Select</option>
                <option value="Spouse">Spouse</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Friend">Friend</option>
              </Select>
              <Input label="Nominee DOB" type="date" value={nominee.dob} onChange={(e) => setNominee({ dob: e.target.value })} />
            </div>
          </div>
        </Card>
      </div>

      <BottomBar>
        <Button
          onClick={() => router.push("/riise/invest/kyc")}
          disabled={!nominee.name || !nominee.relationship}
        >
          Continue to KYC
        </Button>
      </BottomBar>
    </Shell>
  );
}
