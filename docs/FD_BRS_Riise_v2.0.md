# Business Requirement Specification
## FD Integration — Native Mobile Application
### Bajaj Finance Ltd & Shriram Finance Ltd

| Field | Details |
|---|---|
| Document Version | **v2.0** |
| Supersedes | v1.1 (June 2025) |
| Prepared For | Product, Design, Engineering, QA, Operations |
| Product | Riise Mobile Application |
| Issuers Covered | Bajaj Finance Ltd, Shriram Finance Ltd |
| Date | June 2026 |
| Status | For Sign-off |

---

## 1. Executive Summary

Riise will enable in-app Fixed Deposit (FD) investments from two NBFC partners — Bajaj Finance and Shriram Finance — covering the full lifecycle: discovery, KYC, application, payment, FDR delivery, portfolio tracking, premature withdrawal, and renewal. This document is the single source of truth for design, API contracts, workflows, use cases, and the demarcation between Riise-owned (common) capabilities and issuer-specific integrations.

---

## 2. Objective

Deliver a fully digital, paperless FD investment journey that:
- Reuses existing Riise KYC/Demat data wherever possible (single-sign-in experience)
- Handles issuer-specific compliance flows transparently
- Surfaces FDs as a first-class asset class inside the Riise portfolio
- Supports the full post-investment lifecycle (FDR, premature withdrawal, renewal, maturity)

---

## 3. Scope

### In Scope
- FD investment in **Bajaj Finance Ltd** and **Shriram Finance Ltd**
- KYC flows per issuer (Bajaj: CKYC + Aadhaar OTP + VKYC; Shriram: Aadhaar OTP OR DigiLocker)
- Nominee management with pre-fill from linked Demat account
- Penny-drop bank verification + UPI / Card / Net Banking payment
- Portfolio integration (FD as asset class within Riise's existing portfolio tab)
- Post-investment notifications (immediate + post-reverse-feed)
- Premature withdrawal via maturity-date-change workflow
- Auto-renewal (issuer-driven) and manual renewal (user-initiated)
- Transaction history with monthly grouping
- Last-viewed FDs and benefits content

### Out of Scope
- Tax filing / 15G/15H form submission (handled separately)
- Corporate / NRI FDs
- Issuers other than Bajaj and Shriram (Phase 2)
- Joint-holder FDs (Phase 2)

---

## 4. Glossary

| Term | Definition |
|---|---|
| FDR | Fixed Deposit Receipt — official document/identifier issued by NBFC |
| CKYC | Central KYC Records Registry |
| VKYC | Video KYC — live agent verification call |
| Penny Drop | ₹1 credit-and-reverse test to verify bank account ownership |
| Reverse Feed | Post-booking confirmation data sent by issuer to Riise |
| Monthly Data Feed | Issuer-uploaded CSV/JSON containing renewal / premature-withdrawal updates |
| TPV | Third Party Verification (bank ownership check) |
| Asset Class | Top-level portfolio bucket (Equity, MF, Bonds, **FD**, etc.) |

---

## 5. Stakeholders

| Role | Responsibility |
|---|---|
| Product Owner | Roadmap, prioritization, sign-off |
| Design (UX/UI) | Screen designs against this BRD |
| Frontend Engineering | Native iOS/Android implementation |
| Backend Engineering | Common APIs, issuer integration adapters, data pipelines |
| QA | Test plan against Section 18 acceptance criteria |
| Operations | Monthly issuer file uploads, support escalations |
| Compliance | RBI / SEBI disclosure review, T&C approval |
| Issuer Liaison | Bajaj / Shriram API certification |

---

## 6. User Personas & Use Cases

### Personas

**P1 — First-time FD investor (Ravi, 32, salaried)**
Has Riise Demat, no prior FD. Needs guidance on rates and tenure.

**P2 — Returning investor (Priya, 45, business owner)**
Has 2 active FDs across both issuers. Wants quick re-investment.

**P3 — Senior citizen (Sushma, 62, retired)**
Eligible for +0.25% bump. Needs large-font readability and assisted KYC.

**P4 — Premature withdrawal seeker (Arjun, 38)**
Medical emergency; needs to break a 5-year FD at year 2.

### Primary Use Cases

| UC ID | Use Case | Actor | Trigger |
|---|---|---|---|
| UC-01 | Browse FD options & compare rates | All | Tap FD in More menu |
| UC-02 | Invest in new FD (happy path) | P1, P2 | Tap "Invest" on plan |
| UC-03 | Complete first-time KYC (Bajaj) | P1 | First FD with Bajaj |
| UC-04 | Complete first-time KYC (Shriram) | P1 | First FD with Shriram |
| UC-05 | Resume KYC after partial completion | All | Returns to flow after drop-off |
| UC-06 | Pre-fill nominee from Demat | All | Reaches nominee screen |
| UC-07 | Verify bank account via penny drop | All | Reaches bank screen |
| UC-08 | Retry failed payment | All | Payment failure or app close |
| UC-09 | View FD portfolio | P2 | Open portfolio tab |
| UC-10 | View FD transaction history | All | Tap "View Transactions" |
| UC-11 | Initiate premature withdrawal | P4 | Tap "Change Maturity Date" |
| UC-12 | Manually renew matured FD | P2 | Tap "Renew" on matured FD |
| UC-13 | View auto-renewed FD | All | After issuer auto-renewal feed |
| UC-14 | Receive FDR after issuer confirmation | All | Reverse feed processed |
| UC-15 | Senior citizen / women's special rate | P3 | Toggle on order screen |

### Secondary Use Cases

| UC ID | Use Case |
|---|---|
| UC-16 | KYC failure with retry / support escalation |
| UC-17 | Penny drop failure (name mismatch / wrong IFSC) |
| UC-18 | Payment gateway timeout / failure |
| UC-19 | Maturity in <30 days notification |
| UC-20 | Edit nominee after FD is booked (Phase 2) |

---

## 7. End-to-End Workflow

### 7.1 High-Level Journey (Both Issuers)

```
Discovery → Plan Selection → Amount & Reinvest → KYC → Nominee → Bank → Payment → FDR
   ↓             ↓              ↓                 ↓       ↓         ↓        ↓        ↓
Browse        Choose         Configure        Issuer-     Pre-     Penny    UPI/    Success
providers     tenure         amount &         specific    fill     drop     Card/   + FDR
              & rate         benefits         flow        from              NB      delivery
                                                          Demat
```

### 7.2 KYC Workflow — Bajaj Finance (3-step sequential)

```
                   ┌──────────────────┐
                   │ KYC entry point  │
                   │ (pre-payment)    │
                   └────────┬─────────┘
                            ▼
              ┌─────────────────────────┐
              │ STEP 1: CKYC Lookup     │
              │ Input: PAN              │
              │ → fetch CKYC record     │
              └────────┬──────────┬─────┘
                    success    failure
                       │           │
                       ▼           ▼
              ┌────────────┐  ┌──────────────┐
              │ STEP 2:    │  │ Show error + │
              │ Aadhaar    │  │ retry / call │
              │ OTP        │  │ support      │
              └─────┬──────┘  └──────────────┘
              success
                    ▼
              ┌────────────┐
              │ STEP 3:    │
              │ Video KYC  │
              │ (live)     │
              └─────┬──────┘
              success
                    ▼
              ┌──────────────────┐
              │ KYC complete →   │
              │ unlock payment   │
              └──────────────────┘
```

**Failure handling:**
- Each step shows a retry button (max 3 attempts) and a "Contact Support" link
- After 3 failed attempts on the same step, user is locked out for 24 hours
- VKYC scheduling: if no agent available, user can pick a slot within next 24 hours

### 7.3 KYC Workflow — Shriram Finance (2 parallel options)

```
                   ┌──────────────────┐
                   │ KYC entry point  │
                   │ (pre-payment)    │
                   └────────┬─────────┘
                            ▼
                   ┌────────────────┐
                   │ User chooses   │
                   │ method         │
                   └───┬────────┬───┘
                       │        │
            ┌──────────┘        └──────────┐
            ▼                              ▼
   ┌─────────────────┐            ┌─────────────────┐
   │ OPTION A:       │            │ OPTION B:       │
   │ Aadhaar OTP     │            │ DigiLocker      │
   │ → Enter Aadhaar │            │ → Redirect to   │
   │ → Submit OTP    │            │   DigiLocker    │
   └────────┬────────┘            └────────┬────────┘
            │                              │
        success                        success
            └────────────┬─────────────────┘
                         ▼
              ┌──────────────────┐
              │ KYC complete →   │
              │ unlock payment   │
              └──────────────────┘

If both options fail → show support contact
```

### 7.4 Post-Investment Workflow

```
Payment Success
   │
   ▼
Immediate notification (Email + SMS)
   │ — App-generated TXN ID, plan, amount
   ▼
Wait for issuer reverse feed
   │ — Async webhook (real-time) or scheduled pull
   ▼
Reverse feed received
   │ — Client Code, PAN, FDR Number, Maturity Date, etc.
   ▼
Update Order Book + Portfolio
   │
   ▼
Second notification (Email + SMS + Push)
   │ — FDR Number, plan, payout, maturity date, maturity amount
   ▼
Status: Booked
```

### 7.5 Premature Withdrawal Workflow

```
User taps "Change Maturity Date" on FD details
   │
   ▼
Show penalty preview + new maturity date
   │ — Eligibility check (lock-in, min holding period)
   ▼
User confirms
   │
   ▼
Riise submits request to issuer (API call)
   │
   ▼
Issuer processes & includes in next monthly data feed
   │ — Up to 30 days
   ▼
Ops team uploads monthly feed
   │
   ▼
System updates Order Book + Portfolio + status = "Withdrawn"
   │
   ▼
Notify user (Email + SMS)
```

### 7.6 Renewal Workflows

**Auto Renewal (Issuer-Driven)**
```
FD matures → Issuer auto-renews → Sends data in reverse feed →
Riise updates portfolio (status: Renewed) → Notify user
```

**Manual Renewal (User-Initiated)**
```
User taps "Renew" on matured FD → Renewal screen:
  - Change amount (optional)
  - Change plan (optional)
  - Auto-renew toggle for future maturity
→ User confirms → API call to issuer → Reverse feed →
Update Order Book → Notify user
```

---

## 8. Functional Requirements

### 8.1 Screens (mapped to prototype)

| # | Screen | Prototype ID | BRD Section |
|---|---|---|---|
| 1 | Home with More menu | `s-home`, `s-more` | 8.2 |
| 2 | FD Landing | `s-fd-landing` | 8.3 |
| 3 | My Investments (tabs) | `s-fd-investments` | 8.4 |
| 4 | Transactions | `s-fd-txns` | 8.5 |
| 5 | Plans — Bajaj | `s-plans-bajaj` | 8.6 |
| 6 | Plans — Shriram | `s-plans-shriram` | 8.6 |
| 7 | Order / Amount | `s-order` | 8.7 |
| 8 | Confirmation | `s-confirm` | 8.8 |
| 9 | **NEW**: KYC Status / Entry | `s-kyc-entry` | 8.9 |
| 10 | **NEW**: Bajaj — CKYC Verification | `s-kyc-bajaj-ckyc` | 8.9.1 |
| 11 | **NEW**: Bajaj — Aadhaar OTP | `s-kyc-bajaj-aadhaar` | 8.9.2 |
| 12 | **NEW**: Bajaj — VKYC | `s-kyc-bajaj-vkyc` | 8.9.3 |
| 13 | **NEW**: Shriram — Method Choice | `s-kyc-shriram-choice` | 8.9.4 |
| 14 | **NEW**: Shriram — Aadhaar OTP | `s-kyc-shriram-aadhaar` | 8.9.5 |
| 15 | **NEW**: Shriram — DigiLocker | `s-kyc-shriram-digilocker` | 8.9.6 |
| 16 | Nominee (with pre-fill) | `s-nominee` | 8.10 |
| 17 | Bank Details | `s-bank` | 8.11 |
| 18 | Payment | `s-payment` | 8.12 |
| 19 | Success (FDR Display) | `s-success` | 8.13 |
| 20 | **NEW**: Riise Portfolio — FD Tab | `s-portfolio-fd` | 8.14 |
| 21 | **NEW**: FD Detail | `s-fd-detail` | 8.15 |
| 22 | **NEW**: Premature Withdrawal | `s-premature` | 8.16 |
| 23 | **NEW**: Manual Renewal | `s-renewal` | 8.17 |

### 8.2 Home & More Menu
- Existing screens; FD entry point sits in the "All Products" grid under More.
- Tapping FD navigates to `s-fd-landing`.

### 8.3 FD Landing Screen
**Components:**
- Hero banner: rate range (e.g., "Up to 8.25% p.a."), min investment, ratings
- Portfolio summary card (shown only if user has ≥1 FD): Current Value, Total Invested, Interest Earned
- Provider cards: Bajaj Finserv (AA+), Shriram Finance (AA), each with max rate + Invest CTA
- Last Viewed strip (horizontal scroll, hidden if empty)
- Benefits section (6 items)

**Empty state:** If user has no investments, hide portfolio card, show only providers + benefits.

### 8.4 My Investments
**Tabs:** Pending | Booked | Matured (counts shown)
**Per FD row:** Logo + name, rate, tenure, payout, status pill, amount, gain (booked/matured only)
**Pending FD action:** "Pay Now" CTA → resume to payment step

### 8.5 Transactions
- Grouped by month (DESC)
- Shows: logo, FD name, action (Booked/Failed/Matured), date, amount, rate · tenure
- Failed transactions shown in red with reason tooltip

### 8.6 Plans Screen
**Components:**
- Provider header with logo + name + AAA/AA+ badge
- Sort chips: By Tenure | By Returns | Quarterly | Annually
- Plan rows: rate (large), tenure label, compounding, Invest CTA
- Min ₹10,000 — Max ₹1,00,00,000

### 8.7 Order Screen
**Components:**
- Selected plan card with "Change" link (returns to plans)
- Senior Citizen toggle (+0.25%)
- Women's Special Rate toggle (+0.10%)
- Amount input + quick bubbles (₹50K / ₹75K / ₹1L)
- Returns Preview: Maturity Amount, Total Gain, Avg Annual Yield, Compounding
- Reinvest on Maturity toggle (default ON)
- Continue CTA

**Validation:** Amount must be between ₹10,000 and ₹1,00,00,000; inline error if violated.

### 8.8 Confirmation Screen
**Read-only summary:** FD name, logo, amount, maturity, gain, tenure, rate, yield, nominee status
**Nominee state:**
- If pre-filled from Demat → show name + "Edit" link
- If not added → amber warning + "+ Add Nominee" CTA
**Primary CTA:** Proceed → KYC

### 8.9 KYC Flow

#### 8.9.1 KYC Entry (`s-kyc-entry`)
- Stepper showing: CKYC → Aadhaar OTP → VKYC (Bajaj) or Method Choice (Shriram)
- "Resume" if user previously dropped off
- Info card explaining why KYC is mandatory

#### 8.9.2 Bajaj — CKYC Verification (`s-kyc-bajaj-ckyc`)
- PAN input (pre-filled from Riise profile, editable)
- "Verify with CKYC" CTA
- Loading state with progress
- Success: show fetched name, DOB, address → "Continue to Aadhaar"
- Failure: error reason + retry / contact support

#### 8.9.3 Bajaj — Aadhaar OTP (`s-kyc-bajaj-aadhaar`)
- Aadhaar number input (12 digits, masked after entry)
- "Send OTP" CTA → OTP screen
- 6-digit OTP input with 60-second resend timer
- Verify CTA → success / failure
- 3 attempts max per session

#### 8.9.4 Bajaj — VKYC (`s-kyc-bajaj-vkyc`)
- Pre-call checklist (camera, mic, lighting, ID ready)
- "Start Video Call" CTA → opens VKYC vendor SDK
- "Schedule for Later" option (slot picker, next 24h)
- Post-call: success message → "Continue to Bank Verification"

#### 8.9.5 Shriram — Method Choice (`s-kyc-shriram-choice`)
- Two large cards: "Aadhaar OTP" and "DigiLocker"
- Each shows: estimated time, requirements
- User picks one → routes to relevant screen

#### 8.9.6 Shriram — Aadhaar OTP (`s-kyc-shriram-aadhaar`)
Same as 8.9.3 but routes to bank verification on success.

#### 8.9.7 Shriram — DigiLocker (`s-kyc-shriram-digilocker`)
- "Connect DigiLocker" CTA → external browser handoff
- Deep-link return to app
- Success / failure handling

### 8.10 Nominee Screen (Pre-fill)
**Pre-fill behavior:**
- On screen load, call Demat Nominee API
- Auto-populate: Name, Relationship, DOB, Address (if available)
- Show "Pre-filled from your Demat account" info pill with Edit icon
- Each field individually editable
- "Save & Continue" CTA

**No nominee in Demat:** show blank form (current prototype behavior)

**Skip:** "Add Later" CTA → nominee shown as "Not Added" on Confirmation
**Validation:** All fields mandatory only if user is adding/editing (not skipping)

### 8.11 Bank Details Screen
- Account number + confirm field (must match)
- IFSC (uppercase auto-conversion, max 11 chars, regex `^[A-Z]{4}0[A-Z0-9]{6}$`)
- "Verify Account" CTA → penny drop loader
- Success: shows account holder name + bank name from penny drop response
- Failure: shows reason (name mismatch / invalid IFSC / account inactive) + retry

### 8.12 Payment Screen
- Amount banner
- 3 payment methods: UPI, Card, Net Banking (existing prototype)
- 256-bit SSL footer disclosure
- "Pay ₹X" CTA → loader → success/failure

### 8.13 Success Screen (FDR Display)
**Shows:**
- Big checkmark animation
- "Investment Booked!" headline
- **FDR Number** (received from reverse feed) — if pending, show "Generating FDR…"
- Plan details
- Maturity date + amount
- Transaction ID
- Status pill: Booked
- CTAs: View My Investments | Back to Home

**Async FDR:** If reverse feed hasn't arrived yet, show TXN ID and "FDR will be sent to your email shortly." Refresh-on-pull updates the screen.

### 8.14 Riise Portfolio — FD Tab (NEW)
- Top summary: Current Value | Invested | Total Gain
- Filter chips: All | Active | Matured | Renewed
- FD list (cards): logo, name, FDR number, invested, current value, rate, tenure, maturity date, status
- Tap → FD Detail

### 8.15 FD Detail (NEW)
**Sections:**
- FD Summary card (issuer, FDR, rate, tenure, payout)
- Amount tile (invested, current value, gain)
- Maturity countdown (days remaining)
- Nominee
- Bank details
- Actions: Change Maturity Date (premature withdrawal), Download FDR, Renew (if matured)

### 8.16 Premature Withdrawal (NEW)
- Current FD summary
- New maturity date picker (must be ≥ today + 1 day, ≤ original maturity)
- Penalty preview (% of accrued interest forfeited)
- Revised maturity amount preview
- Eligibility warnings (e.g., lock-in not yet complete)
- "Submit Request" CTA → confirmation

### 8.17 Manual Renewal (NEW)
- Matured FD summary (showing payout amount)
- "Investment Amount" — defaults to maturity amount, editable
- "Plan" — defaults to original, "Change Plan" link returns to plans screen
- "Auto-renew on next maturity" toggle
- Continue → confirmation → payment (if extra amount) → success

---

## 9. KYC Workflow Details

### 9.1 Bajaj Sequential Flow

| Step | API | Success | Failure |
|---|---|---|---|
| 1 | CKYC Lookup | Fetch demographic data, show on screen, proceed to Step 2 | Show specific error (PAN not in CKYC / mismatch), 3 retries then 24h lockout |
| 2 | Aadhaar OTP Send | OTP delivered to Aadhaar-linked mobile | UIDAI error, retry |
| 2b | Aadhaar OTP Verify | Verification success, proceed to VKYC | Invalid/expired OTP, 3 retries then back to step 1 |
| 3 | VKYC Initiate | Vendor SDK opens, agent verifies live | Schedule for later / retry |
| 3b | VKYC Complete | Status = approved, unlock payment | Status = rejected → contact support |

### 9.2 Shriram Parallel Flow

| Option | API | Success | Failure |
|---|---|---|---|
| A | Aadhaar OTP Send + Verify | Unlock payment | Fall back to DigiLocker |
| B | DigiLocker Auth | Unlock payment | Fall back to Aadhaar OTP |

If both A and B fail → contact support, KYC remains incomplete.

### 9.3 KYC Resume Logic
- KYC status stored per `(user_id, issuer)`
- States: `not_started`, `step1_complete`, `step2_complete`, `complete`, `failed_locked`
- On entering KYC flow, system routes to last-incomplete step
- Status persists across app sessions for 30 days; after that, restart from beginning

---

## 10. Post-Investment Workflow Details

### 10.1 Notification Triggers
| Event | Channels | Content |
|---|---|---|
| Payment success | Email + SMS | TXN ID, amount, "FDR will be generated within X hours" |
| Reverse feed received | Email + SMS + Push | FDR Number, plan, payout, maturity date, maturity amount |
| Maturity − 30 days | Email + SMS | Reminder + Renew CTA |
| Maturity − 7 days | Push | Reminder |
| Maturity reached | Email + SMS | Payout details + Renew CTA |
| Renewal confirmed (auto or manual) | Email + SMS | New FDR, new maturity date |
| Premature withdrawal confirmed | Email + SMS | Revised payout, settlement timeline |

### 10.2 Reverse Feed SLA
- **Bajaj:** webhook expected within 30 minutes of payment success
- **Shriram:** webhook expected within 2 hours of payment success
- **Fallback:** scheduled pull every 4 hours for missing FDRs
- **Stale state:** if no FDR after 24 hours, mark FD as "Under Review" and create ops ticket

### 10.3 Monthly Data Feed
- **Cadence:** received by 5th of each month
- **Format:** CSV with predefined schema (see Section 14.3)
- **Cutoff:** uploads before 10th reflect in current month's portfolio statement
- **Audit:** ops user, timestamp, file hash logged
- **Validation:** schema check + row count + duplicate detection before commit

---

## 11. Data Model

### 11.1 Core Entities

```
User
  ├─ user_id (PK)
  ├─ name, mobile, email, pan, dob, address
  └─ demat_id

KYCStatus
  ├─ id (PK)
  ├─ user_id (FK)
  ├─ issuer (bajaj | shriram)
  ├─ status (not_started | step1 | step2 | complete | locked)
  ├─ step_data (JSON)
  ├─ last_attempt_at
  └─ locked_until

Nominee
  ├─ id (PK)
  ├─ user_id (FK)
  ├─ source (demat | manual)
  ├─ name, relationship, dob, address
  └─ created_at

BankAccount
  ├─ id (PK)
  ├─ user_id (FK)
  ├─ account_number (encrypted)
  ├─ ifsc, bank_name, holder_name
  ├─ verified (bool)
  └─ verified_at

FDApplication
  ├─ id (PK)
  ├─ user_id (FK)
  ├─ issuer (bajaj | shriram)
  ├─ plan_id (FK → FDPlan)
  ├─ amount, tenure_months, rate
  ├─ senior_citizen, women_special (bool)
  ├─ reinvest_on_maturity (bool)
  ├─ nominee_id (FK), bank_id (FK)
  ├─ status (draft | kyc_pending | payment_pending | paid | booked | failed)
  ├─ txn_id (internal), fdr_number (from issuer)
  ├─ booked_date, maturity_date, maturity_amount
  └─ created_at, updated_at

FDPortfolio
  ├─ application_id (FK)
  ├─ current_value, accrued_interest
  ├─ last_synced_at
  └─ status (booked | matured | renewed | withdrawn)

Transaction
  ├─ id (PK)
  ├─ application_id (FK)
  ├─ type (investment | payout | refund | failure)
  ├─ amount, channel (upi | card | nb)
  ├─ status (success | failed | pending)
  ├─ gateway_ref
  └─ created_at

Notification
  ├─ id (PK)
  ├─ user_id, event_type
  ├─ channel (email | sms | push)
  ├─ payload (JSON)
  ├─ status (queued | sent | failed)
  └─ sent_at
```

### 11.2 Status State Machine — FDApplication

```
draft ──→ kyc_pending ──→ payment_pending ──→ paid ──→ booked
   ↓                            ↓                ↓        ↓
 (abandoned)               (cancelled)       (refunded) renewed
                                                        withdrawn
                                                        matured
```

---

## 12. Use Case Specifications

### UC-02: Invest in New FD (Happy Path)

**Actor:** Returning Riise user with completed KYC and linked bank
**Pre-conditions:** User logged in, KYC complete for chosen issuer
**Trigger:** User taps "Invest" on a plan card

**Main Flow:**
1. System loads Order screen with selected plan
2. User enters amount (or taps a bubble)
3. System computes maturity / gain / yield in real-time
4. User toggles senior citizen / women's special if applicable
5. User taps Continue → Confirmation screen
6. User reviews and taps Proceed
7. System routes to Nominee → Bank → Payment (skip nominee if Demat has one)
8. User completes payment
9. System shows Success screen with TXN ID
10. Async: reverse feed updates FDR number, sends notification

**Alternate Flows:**
- **A1:** User has no nominee in Demat → shows blank form on Nominee screen
- **A2:** User has no verified bank → shows full bank verification screen
- **A3:** User abandons after KYC → resumes from last step on next visit

**Post-conditions:** FD appears in Pending → Booked (after reverse feed)

### UC-03: Complete First-Time KYC (Bajaj)

**Actor:** First-time investor on Bajaj
**Pre-conditions:** User has PAN in Riise profile, no Bajaj KYC record

**Main Flow:**
1. System navigates to KYC entry screen post-confirmation
2. CKYC screen loads with PAN pre-filled
3. User taps "Verify with CKYC"
4. Loading state ~5 seconds
5. CKYC success → display demographic data → Continue
6. Aadhaar screen: user enters Aadhaar number
7. OTP sent to Aadhaar mobile
8. User enters OTP, taps Verify
9. VKYC screen: pre-call checklist
10. User taps "Start Video Call"
11. Vendor SDK opens, agent conducts call
12. Call ends with status = approved
13. KYC marked complete → routes to Bank screen

**Alternate Flows:**
- **A1:** CKYC not found → error: "No CKYC record found for this PAN" → support contact
- **A2:** Aadhaar OTP wrong 3 times → lockout 24h
- **A3:** VKYC agent unavailable → "Schedule for later" with time slots
- **A4:** VKYC rejected (e.g., document blur) → "Schedule retry" or contact support

### UC-11: Initiate Premature Withdrawal

**Actor:** P4 with active FD past lock-in
**Pre-conditions:** FD status = booked, current date > booked_date + lock_in_months

**Main Flow:**
1. User opens FD Detail screen
2. Taps "Change Maturity Date"
3. System shows date picker (range: today+1 to original_maturity−1)
4. User selects new date
5. System computes:
   - Days elapsed
   - Original interest accrued
   - Penalty (% of accrued)
   - Net payout
6. System shows preview screen
7. User confirms
8. Riise calls issuer API → request queued
9. User notified "Request submitted, will reflect within 30 days"
10. Next monthly feed includes update → status changes to "Withdrawn"
11. User receives final notification

---

## 13. Common APIs (Riise-Owned)

These APIs are built once and shared across both issuers and Riise's other product surfaces.

### 13.1 User & Profile

| API | Method | Path | Purpose |
|---|---|---|---|
| Get User Profile | GET | `/api/v1/user/profile` | Name, mobile, email, PAN, DOB |
| Get User Address | GET | `/api/v1/user/address` | Permanent + correspondence addresses |
| Update User Profile | PATCH | `/api/v1/user/profile` | Edit mobile/email (with OTP confirm) |

### 13.2 Demat Linkage (For Nominee Pre-fill)

| API | Method | Path | Purpose |
|---|---|---|---|
| Get Demat Nominee | GET | `/api/v1/demat/nominee` | Return registered nominee from Demat |
| Get Demat Bank | GET | `/api/v1/demat/bank` | Linked bank for prefill (optional) |

### 13.3 Bank Verification

| API | Method | Path | Purpose |
|---|---|---|---|
| IFSC Lookup | GET | `/api/v1/bank/ifsc/{code}` | Bank name + branch |
| Penny Drop Verify | POST | `/api/v1/bank/penny-drop` | Verify account ownership |
| Get Bank Verification Status | GET | `/api/v1/bank/verify/{ref}` | Poll status |

### 13.4 Payment Gateway (Abstracted)

| API | Method | Path | Purpose |
|---|---|---|---|
| Initiate Payment | POST | `/api/v1/payments` | Create payment session (UPI/Card/NB) |
| Payment Status | GET | `/api/v1/payments/{id}` | Poll status |
| Payment Webhook | POST | `/api/v1/payments/webhook` | Gateway → Riise callback |

### 13.5 FD Catalog (Aggregated)

| API | Method | Path | Purpose |
|---|---|---|---|
| List All Providers | GET | `/api/v1/fd/providers` | Bajaj + Shriram cards with rate range |
| List Plans (filtered) | GET | `/api/v1/fd/plans?issuer=bajaj&sort=tenure` | Plans for issuer |
| Get Plan Detail | GET | `/api/v1/fd/plans/{id}` | Single plan |
| Compute Maturity | POST | `/api/v1/fd/compute` | Server-side maturity/gain (truth source) |

### 13.6 FD Application Lifecycle

| API | Method | Path | Purpose |
|---|---|---|---|
| Create Draft Application | POST | `/api/v1/fd/applications` | Start a new application |
| Update Draft | PATCH | `/api/v1/fd/applications/{id}` | Save partial progress |
| Submit Application | POST | `/api/v1/fd/applications/{id}/submit` | Finalize → triggers issuer call |
| Get Application | GET | `/api/v1/fd/applications/{id}` | Detail |
| List User Applications | GET | `/api/v1/fd/applications?status=pending` | For My Investments screen |

### 13.7 Nominee Management

| API | Method | Path | Purpose |
|---|---|---|---|
| Save Nominee | POST | `/api/v1/nominees` | Persist nominee |
| Get Nominee | GET | `/api/v1/nominees/{id}` | Read |
| Update Nominee | PATCH | `/api/v1/nominees/{id}` | Edit |

### 13.8 Portfolio & Transactions

| API | Method | Path | Purpose |
|---|---|---|---|
| Get FD Portfolio Summary | GET | `/api/v1/portfolio/fd/summary` | Current value, invested, gain |
| List FD Holdings | GET | `/api/v1/portfolio/fd/holdings` | Individual FD list |
| Get FD Detail | GET | `/api/v1/portfolio/fd/{id}` | FDR, payout, status |
| List Transactions | GET | `/api/v1/transactions?type=fd&month=2026-06` | Grouped txns |

### 13.9 Notifications

| API | Method | Path | Purpose |
|---|---|---|---|
| Send Notification | POST | `/api/v1/notify` | Internal, triggered by events |
| Get Notification Preferences | GET | `/api/v1/notify/prefs` | Email/SMS/Push opt-ins |

### 13.10 Admin / Ops

| API | Method | Path | Purpose |
|---|---|---|---|
| Upload Monthly Feed | POST | `/api/v1/admin/feeds/monthly` | CSV/JSON ingest |
| List Feed Uploads | GET | `/api/v1/admin/feeds/history` | Audit trail |
| Reprocess Feed | POST | `/api/v1/admin/feeds/{id}/reprocess` | Manual retry |

**Total Common APIs: ~30 endpoints across 10 modules.**

---

## 14. Issuer-Specific APIs

Each issuer requires a similar shape of integration, but the contracts, auth, and certifications are independent. Build a thin **adapter layer** on top so Riise's product code is issuer-agnostic.

### 14.1 Bajaj Finance Adapter

| API | Method | Adapter Path | Bajaj Endpoint (illustrative) |
|---|---|---|---|
| Get Bajaj FD Plans | GET | `/internal/bajaj/plans` | `/v2/fd/schemes` |
| Check Customer Existence | POST | `/internal/bajaj/customer-check` | `/v2/customer/lookup` |
| **CKYC Lookup** | POST | `/internal/bajaj/kyc/ckyc` | `/v2/kyc/ckyc-lookup` |
| **Aadhaar OTP Send** | POST | `/internal/bajaj/kyc/aadhaar/send-otp` | `/v2/kyc/aadhaar/otp` |
| **Aadhaar OTP Verify** | POST | `/internal/bajaj/kyc/aadhaar/verify` | `/v2/kyc/aadhaar/verify` |
| **VKYC Initiate** | POST | `/internal/bajaj/kyc/vkyc/initiate` | `/v2/kyc/vkyc/start` |
| **VKYC Status** | GET | `/internal/bajaj/kyc/vkyc/{ref}` | `/v2/kyc/vkyc/status` |
| Submit FD Application | POST | `/internal/bajaj/applications` | `/v2/fd/apply` |
| Get Application Status | GET | `/internal/bajaj/applications/{id}` | `/v2/fd/status` |
| Update Nominee | PUT | `/internal/bajaj/nominee/{fdr}` | `/v2/fd/nominee` |
| Reinvest Toggle | PUT | `/internal/bajaj/reinvest/{fdr}` | `/v2/fd/auto-renew` |
| Premature Withdrawal | POST | `/internal/bajaj/withdraw/{fdr}` | `/v2/fd/premature` |
| Manual Renewal | POST | `/internal/bajaj/renew/{fdr}` | `/v2/fd/renew` |
| Cancel / Refund | POST | `/internal/bajaj/cancel/{fdr}` | `/v2/fd/cancel` |
| Reverse Feed Webhook | POST | `/internal/bajaj/webhook` | Bajaj → Riise |

### 14.2 Shriram Finance Adapter

| API | Method | Adapter Path | Shriram Endpoint (illustrative) |
|---|---|---|---|
| Get Shriram FD Plans | GET | `/internal/shriram/plans` | `/api/fd/plans` |
| Check Customer Existence | POST | `/internal/shriram/customer-check` | `/api/customer` |
| **Aadhaar OTP Send** | POST | `/internal/shriram/kyc/aadhaar/send-otp` | `/api/kyc/aadhaar/otp` |
| **Aadhaar OTP Verify** | POST | `/internal/shriram/kyc/aadhaar/verify` | `/api/kyc/aadhaar/verify` |
| **DigiLocker Init** | POST | `/internal/shriram/kyc/digilocker/init` | `/api/kyc/digilocker/start` |
| **DigiLocker Callback** | GET | `/internal/shriram/kyc/digilocker/callback` | Riise public callback |
| Submit FD Application | POST | `/internal/shriram/applications` | `/api/fd/apply` |
| Get Application Status | GET | `/internal/shriram/applications/{id}` | `/api/fd/status` |
| Update Nominee | PUT | `/internal/shriram/nominee/{fdr}` | `/api/fd/nominee` |
| Reinvest Toggle | PUT | `/internal/shriram/reinvest/{fdr}` | `/api/fd/auto-renew` |
| Premature Withdrawal | POST | `/internal/shriram/withdraw/{fdr}` | `/api/fd/premature` |
| Manual Renewal | POST | `/internal/shriram/renew/{fdr}` | `/api/fd/renew` |
| Cancel / Refund | POST | `/internal/shriram/cancel/{fdr}` | `/api/fd/cancel` |
| Reverse Feed Webhook | POST | `/internal/shriram/webhook` | Shriram → Riise |

### 14.3 Monthly Data Feed Schema (Both Issuers)

CSV with columns:
```
fdr_number, client_code, pan, plan_code, event_type, event_date,
revised_maturity_date, revised_maturity_amount, payout_details,
status, remarks
```

`event_type` ∈ {`auto_renewal`, `manual_renewal`, `premature_withdrawal`, `maturity_payout`}

### 14.4 API Count Summary

| Category | Count |
|---|---|
| Common (Riise-owned) | **~30 endpoints** |
| Bajaj-specific | **15 endpoints** |
| Shriram-specific | **14 endpoints** (no VKYC) |
| **Total** | **~59 endpoints** |

---

## 15. Workflow → API Mapping

Each user-facing screen maps to a precise sequence of API calls. This eliminates ambiguity for engineering.

### 15.1 FD Landing (Open)
1. `GET /api/v1/fd/providers` → render provider cards
2. `GET /api/v1/portfolio/fd/summary` → render portfolio summary card (if non-empty)
3. `GET /api/v1/fd/last-viewed` → render Last Viewed strip (optional)

### 15.2 Plans Screen (Open)
1. `GET /api/v1/fd/plans?issuer={bajaj|shriram}&sort={tenure|returns}`
2. Render rows; tapping Invest → `POST /api/v1/fd/applications` (create draft)

### 15.3 Order Screen (On Amount Change)
1. Debounced `POST /api/v1/fd/compute` with amount, tenure, plan_id, senior, women → returns maturity/gain/yield
2. On Continue → `PATCH /api/v1/fd/applications/{id}` to save amount + toggles

### 15.4 Nominee Screen (Open)
1. `GET /api/v1/demat/nominee` → pre-fill fields
2. If found → display with Edit; else blank form
3. On Save → `POST /api/v1/nominees` then `PATCH /api/v1/fd/applications/{id}` with nominee_id

### 15.5 KYC Flow — Bajaj
1. **CKYC:** `POST /internal/bajaj/kyc/ckyc` with PAN → returns demographic data
2. **Aadhaar Send OTP:** `POST /internal/bajaj/kyc/aadhaar/send-otp`
3. **Aadhaar Verify:** `POST /internal/bajaj/kyc/aadhaar/verify`
4. **VKYC Initiate:** `POST /internal/bajaj/kyc/vkyc/initiate` → returns SDK token
5. Poll `GET /internal/bajaj/kyc/vkyc/{ref}` until `complete` or timeout

### 15.6 KYC Flow — Shriram (Option A: Aadhaar)
1. `POST /internal/shriram/kyc/aadhaar/send-otp`
2. `POST /internal/shriram/kyc/aadhaar/verify`

### 15.7 KYC Flow — Shriram (Option B: DigiLocker)
1. `POST /internal/shriram/kyc/digilocker/init` → returns redirect URL
2. User redirected → DigiLocker → callback to `/internal/shriram/kyc/digilocker/callback`
3. Backend validates, marks status complete

### 15.8 Bank Screen (Verify)
1. On IFSC blur → `GET /api/v1/bank/ifsc/{code}` to populate bank name
2. On Verify → `POST /api/v1/bank/penny-drop` with account + IFSC
3. Poll `GET /api/v1/bank/verify/{ref}` until success/failure

### 15.9 Payment Screen
1. On Pay → `POST /api/v1/payments` (returns gateway session)
2. Show gateway UI (UPI Intent / Card form / NB redirect)
3. Gateway webhook → `/api/v1/payments/webhook`
4. Frontend polls `GET /api/v1/payments/{id}` → success/failure
5. On success → `POST /api/v1/fd/applications/{id}/submit` → calls issuer API

### 15.10 Post-Submit
1. Backend calls `POST /internal/{issuer}/applications` synchronously
2. Issuer returns application reference
3. Show Success screen with TXN ID
4. Async: issuer reverse feed → `POST /internal/{issuer}/webhook` → updates application with FDR number
5. Trigger second notification

### 15.11 Premature Withdrawal
1. `GET /api/v1/portfolio/fd/{id}` → eligibility check
2. `POST /api/v1/fd/compute-premature` → returns penalty + revised payout
3. On confirm → `POST /internal/{issuer}/withdraw/{fdr}`
4. Monthly feed eventually updates status

### 15.12 Manual Renewal
1. `GET /api/v1/portfolio/fd/{id}` → matured FD
2. `POST /api/v1/fd/compute` for new plan/amount
3. `POST /internal/{issuer}/renew/{fdr}`
4. Standard payment flow if amount change

---

## 16. Error Handling & Edge Cases

### 16.1 KYC Errors

| Scenario | Behavior |
|---|---|
| CKYC PAN not found | Error message + "Contact Support" link |
| CKYC name mismatch with Riise profile | Block KYC, show comparison, route to profile update |
| Aadhaar OTP wrong 3 times | 24-hour lockout, error toast |
| Aadhaar OTP expires (>10 min) | "Send New OTP" |
| VKYC agent unavailable | "Schedule for Later" with slot picker |
| VKYC rejected | Specific reason + retry CTA |
| DigiLocker auth canceled by user | Return to Method Choice screen |
| KYC step succeeded but webhook failed | Retry mechanism, status check every 30s |

### 16.2 Payment Errors

| Scenario | Behavior |
|---|---|
| Gateway timeout | Show "Payment may still succeed" message, poll status |
| Insufficient funds | Specific error, user can retry with different method |
| UPI collect expired | "Retry UPI" or switch method |
| Card declined | Show issuer reason if available, retry CTA |
| Net Banking session lost | Return to payment screen, restart |
| Payment succeeded but issuer call failed | Auto-refund within 5 working days, notify user |

### 16.3 Penny Drop Errors

| Scenario | Behavior |
|---|---|
| Invalid IFSC | Inline validation, block submit |
| Account inactive | Error + "Use different account" |
| Name mismatch with PAN | Soft warning, allow user override (with manual review flag) |
| Penny drop timeout | Retry up to 3x, then manual review |

### 16.4 Issuer API Errors

| Scenario | Behavior |
|---|---|
| 500 / 503 from issuer | Save draft, show "Try again later", do NOT charge user |
| Issuer rejects application | Specific reason from issuer, refund if paid |
| Reverse feed not received in 24h | Mark FD "Under Review", create ops ticket, notify user |
| Monthly feed schema invalid | Reject upload, alert ops, retry mechanism |

### 16.5 Ineligibility

| Scenario | Behavior |
|---|---|
| User under 18 | Block FD investment, show message |
| User from restricted state | Show notice (e.g., regulatory) |
| User has 5+ active FDs with same issuer | Warning (some issuers cap this) |

---

## 17. Non-Functional Requirements

### 17.1 Performance
- **Plans screen load:** < 1.5s p95
- **Compute API:** < 300ms p95
- **Payment status poll:** every 2s, max 60s
- **Reverse feed processing:** < 30s from receipt
- **App cold start:** < 3s

### 17.2 Security
- All PII at rest: AES-256 encrypted
- Account numbers: masked in logs (last 4 only)
- PAN, Aadhaar: tokenized after first use, never logged
- TLS 1.3 for all API calls
- OWASP Mobile Top 10 compliance
- Penetration testing before launch

### 17.3 Compliance
- RBI guidelines for FD disclosures (T&C, cooling-off, deposit insurance disclaimer)
- SEBI advertising guidelines for rate display
- DPDP Act 2023: consent capture, right to erasure
- Issuer-specific T&C link on Confirmation screen
- Display "Insured up to ₹5 lakhs by DICGC" disclosure

### 17.4 Availability
- **Riise APIs:** 99.9% uptime SLA
- **Issuer APIs:** subject to issuer SLA (typically 99.5%)
- **Graceful degradation:** if issuer down, allow plan browsing, block submit

### 17.5 Observability
- Funnel events: viewed → plan_selected → amount_set → kyc_started → kyc_complete → paid → booked
- Drop-off alerts if step conversion drops > 10%
- Issuer API error rate dashboards
- Notification delivery rate tracking

### 17.6 Accessibility
- WCAG 2.1 AA
- Min font 14px (16px for amounts)
- Color-blind safe palette
- Screen reader labels for all interactive elements
- High-contrast mode support

---

## 18. Acceptance Criteria

### 18.1 By Screen (sample)

**Order Screen:**
- [ ] Amount field rejects values < 10,000 or > 1,00,00,000 with inline error
- [ ] Tapping a bubble updates amount + clears error
- [ ] Senior + Women toggles each add expected % to displayed rate
- [ ] Returns Preview recalculates within 300ms of input change
- [ ] Continue disabled if amount invalid

**Bajaj KYC Aadhaar OTP:**
- [ ] OTP input accepts only 6 digits
- [ ] Resend timer counts down 60s, then enables Resend button
- [ ] 3 failed attempts triggers 24h lockout (verified in DB)
- [ ] Successful verification routes to VKYC screen

**Success Screen:**
- [ ] If FDR received → displayed with copy-to-clipboard
- [ ] If FDR pending → show "Generating FDR…" with pull-to-refresh
- [ ] "View Investments" routes to `s-fd-investments` (Pending tab)

### 18.2 By Workflow

**Investment Flow (Bajaj, first-time user):**
- [ ] Full happy path completes in < 5 minutes
- [ ] All 3 KYC steps logged in `KYCStatus`
- [ ] FD application created with `status=booked` after reverse feed
- [ ] User receives 2 notifications (immediate + post-feed)

**Premature Withdrawal:**
- [ ] Eligibility check blocks if lock-in active
- [ ] Penalty calculation matches issuer's formula
- [ ] Request reflected in next monthly feed
- [ ] Status updates to "Withdrawn" within 30 days

---

## 19. Success Criteria & KPIs

| KPI | Target |
|---|---|
| Discovery → Plan selection conversion | > 30% |
| Plan selection → KYC start | > 60% |
| KYC start → KYC complete (Bajaj) | > 70% |
| KYC start → KYC complete (Shriram) | > 80% (simpler flow) |
| KYC complete → Payment success | > 85% |
| Reverse feed received within SLA | > 98% |
| Notification delivery rate | > 99% |
| FD portfolio data accuracy | 100% (zero discrepancy with issuer feed) |
| User-reported issues per 1000 FDs | < 5 |

---

## 20. Dependencies & Risks

### 20.1 Dependencies

| Dependency | Type | Owner | Status |
|---|---|---|---|
| Riise User Profile API | Internal | Backend team | Existing |
| Riise Demat Nominee API | Internal | Backend team | **New, required for Section 10** |
| Payment Gateway (existing) | Internal | Payments team | Existing |
| Penny Drop (existing) | Third-party | Payments team | Existing |
| Bajaj Finance API access | External | Bajaj liaison | **In progress** |
| Shriram Finance API access | External | Shriram liaison | **In progress** |
| VKYC Vendor SDK | Third-party | Bajaj-provided | TBD |
| DigiLocker integration | Third-party | Shriram-provided | TBD |
| Notification service | Internal | Platform team | Existing |
| Admin upload portal | Internal | Ops team | **New** |

### 20.2 Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Issuer API certification delays | High | Start cert in parallel with dev; sandbox-first |
| VKYC vendor availability gap | Medium | Slot-scheduling as fallback |
| Reverse feed delays beyond SLA | Medium | Scheduled pull fallback + ops alert |
| Monthly feed schema changes | Medium | Schema versioning + ops portal upload validation |
| Penny drop name mismatch UX confusion | Low | Clear messaging + manual override path |
| User abandonment in 3-step Bajaj KYC | High | Save-and-resume; drop-off analytics |

---

## 21. Common vs Issuer-Specific — Quick Reference

This table is the single source of truth for build allocation.

| Capability | Common (Riise) | Bajaj | Shriram |
|---|---|---|---|
| User profile / Demat data | ✓ | | |
| Nominee storage | ✓ | | |
| Nominee API to issuer | | ✓ | ✓ |
| Bank verification (Penny Drop) | ✓ | | |
| IFSC lookup | ✓ | | |
| Payment Gateway (UPI/Card/NB) | ✓ | | |
| FD Plan catalog (aggregated view) | ✓ | | |
| FD Plans (issuer source) | | ✓ | ✓ |
| Maturity computation (display) | ✓ | | |
| Maturity computation (truth at booking) | | ✓ | ✓ |
| CKYC | | ✓ | |
| Aadhaar OTP KYC | | ✓ | ✓ |
| Video KYC | | ✓ | |
| DigiLocker KYC | | | ✓ |
| Application submission | | ✓ | ✓ |
| Application status tracking | ✓ (UI) | ✓ (data) | ✓ (data) |
| FDR Number generation | | ✓ | ✓ |
| Reverse feed processing | ✓ | (sends) | (sends) |
| Monthly data feed upload | ✓ (admin tool) | (sends file) | (sends file) |
| Notifications (Email/SMS/Push) | ✓ | | |
| Portfolio (Riise asset class view) | ✓ | | |
| Transaction history | ✓ | | |
| Premature withdrawal UI | ✓ | | |
| Premature withdrawal execution | | ✓ | ✓ |
| Auto-renewal (display) | ✓ | (sends data) | (sends data) |
| Manual renewal UI | ✓ | | |
| Manual renewal execution | | ✓ | ✓ |

---

## 22. Phased Rollout Plan

### Phase 1 — MVP (Target: Q4 2026)
- Discovery + Plans + Order + Confirmation
- Shriram Aadhaar OTP KYC only
- Standard payment + booking
- Basic portfolio view
- Immediate notifications

### Phase 2 — Full KYC + Bajaj (Q1 2027)
- Bajaj 3-step KYC
- Shriram DigiLocker option
- FDR delivery (reverse feed)
- Renewal (auto-display)

### Phase 3 — Lifecycle Management (Q2 2027)
- Premature withdrawal
- Manual renewal
- Monthly feed processing
- Push notifications
- Last-viewed personalization

### Phase 4 — Optimization (Q3 2027)
- Joint holders
- Tax form integration (15G/15H)
- More issuers
- NRI FDs

---

## 23. Sign-off

| Role | Name | Signature | Date |
|---|---|---|---|
| Product Owner | | | |
| Engineering Lead | | | |
| Design Lead | | | |
| Compliance | | | |
| Operations | | | |

---

## Appendix A — Change Log

| Version | Date | Changes |
|---|---|---|
| v1.0 | May 2025 | Initial draft (basic flow) |
| v1.1 | June 2025 | KYC sequences, reverse feed, renewal sections |
| **v2.0** | **June 2026** | Full design alignment, common-vs-issuer API split, workflow→API mapping, use cases, error handling, NFRs, acceptance criteria, phased rollout |

## Appendix B — Reference Prototype

Live prototype: `https://bhartendrasinghr.github.io/bhartendra/riise`
Source: `https://github.com/bhartendrasinghr/bhartendra`
