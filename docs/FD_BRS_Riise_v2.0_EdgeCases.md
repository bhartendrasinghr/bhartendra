# Edge Case Catalog — FD Native Integration
## Addendum to BRD v2.0 — Section 16 Expansion

This catalog enumerates every failure, edge, ambiguous, or boundary case the system must handle. Each entry has:
- **ID** — referenceable in tickets and test cases
- **Scenario** — what triggers it
- **Expected Behavior** — what the system does
- **Severity** — Critical / High / Medium / Low

---

## A. Discovery & Landing

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-A01 | User opens FD landing with no internet | Show offline banner; cached portfolio shown if available; "Retry" CTA | High |
| EC-A02 | Provider API returns 500 | Show generic providers + cached rates with "Rates may be outdated" badge | High |
| EC-A03 | One provider API down, other up | Render available provider; show "Temporarily unavailable" card for the other | Medium |
| EC-A04 | Rates fetched are >24h old | Show "Rates last updated X hours ago" indicator | Low |
| EC-A05 | User has 0 FDs but landing tries to fetch portfolio | Hide portfolio summary; do not show error | Low |
| EC-A06 | User logs out mid-screen | Redirect to login; preserve return URL | Medium |
| EC-A07 | User backgrounded app for >30 min | Refresh rates on resume; if stale, block Invest CTA | Medium |
| EC-A08 | Last Viewed contains delisted plan | Hide that card silently | Low |
| EC-A09 | User has pending FD with payment failure | Show banner: "1 FD needs your attention" linking to that FD | High |
| EC-A10 | Region-restricted user (e.g., Sikkim for some issuers) | Show "Not available in your state" message | Critical |

## B. Plan Selection

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-B01 | Issuer changes rates mid-session | Refresh on Invest tap; show "Rates updated, please review" if delta >0.1% | Critical |
| EC-B02 | User taps Invest twice in 1s | Debounce; only one application draft created | High |
| EC-B03 | Sort applied + new rates load | Preserve sort order | Low |
| EC-B04 | Plan API returns empty list | Show "No plans available" empty state with support link | High |
| EC-B05 | Plan API timeout (>10s) | Show retry; do not auto-retry to avoid hammering issuer | Medium |
| EC-B06 | User selects plan but app crashes | Resume to plans screen on next launch (draft persisted) | Medium |
| EC-B07 | Plan tenure exceeds max age policy (e.g., 60 yr old + 10 yr plan) | Show eligibility warning, allow proceed with confirmation | Medium |

## C. Order / Amount Screen

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-C01 | Amount < ₹10,000 | Inline error; Continue disabled | High |
| EC-C02 | Amount > ₹1,00,00,000 | Inline error: "Max ₹1 crore per FD" | High |
| EC-C03 | Amount = 0 or empty | Continue disabled; no error until field touched | Medium |
| EC-C04 | Amount contains decimals (₹50000.50) | Round to nearest whole rupee; show toast | Low |
| EC-C05 | Amount in scientific notation (1e7) | Reject input; only allow digits | Medium |
| EC-C06 | User pastes ₹ symbol or commas | Strip non-digit characters silently | Low |
| EC-C07 | User toggles Senior Citizen but DOB < 60 | Show inline: "Available only for age 60+"; block toggle | High |
| EC-C08 | User toggles Women's Special but gender = Male in profile | Show: "Available for women only"; block toggle | High |
| EC-C09 | Both Senior + Women toggled (eligible) | Apply both bumps (+0.25% +0.10% = +0.35%) | Medium |
| EC-C10 | Tenure not available for chosen issuer | Auto-select nearest valid tenure with toast | Medium |
| EC-C11 | Compute API timeout | Show last computed value with "Recalculating..." indicator | Medium |
| EC-C12 | User navigates back from confirmation | Preserve amount and toggles | High |
| EC-C13 | User edits amount after KYC complete | Allow, but warn: "You may need to redo KYC if amount slab changes" | Medium |
| EC-C14 | Quick bubble selected, then manual edit | Deselect bubble | Low |
| EC-C15 | Reinvest toggle ON for plan that doesn't support auto-renew | Show: "Reinvestment not available for this plan"; force OFF | Medium |

## D. Confirmation Screen

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-D01 | User taps Proceed twice | Debounce; single navigation | High |
| EC-D02 | Plan/rate changed by issuer between Order and Confirmation | Show modal: "Rate has changed from X% to Y%. Continue?" | Critical |
| EC-D03 | App killed at confirmation, reopened | Resume at confirmation with same data | Medium |
| EC-D04 | User has incomplete KYC, reaches confirmation | Block Proceed; route to KYC | Critical |
| EC-D05 | User has KYC done for one issuer, switches issuer | Restart KYC flow for new issuer | High |
| EC-D06 | T&C link broken | Show inline error: "Please try again"; do not block flow indefinitely | Medium |
| EC-D07 | Maturity date falls on holiday/weekend | Show actual maturity per issuer policy (next working day) | Medium |
| EC-D08 | Total gain calculation differs by ±₹1 from issuer | Use issuer truth on submit | Low |

## E. KYC — Bajaj (CKYC)

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-E01 | PAN not found in CKYC registry | Show: "No CKYC record found. Please contact support to update CKYC"; link to support | Critical |
| EC-E02 | CKYC API timeout (>15s) | Show retry; max 3 retries then suggest support | High |
| EC-E03 | CKYC returns name mismatch with Riise profile | Show diff modal; require user to confirm correct name → update profile | Critical |
| EC-E04 | CKYC returns address that differs from Riise | Allow user to choose which to use | Medium |
| EC-E05 | CKYC returns DOB mismatch | Block flow; route to support (sensitive data) | Critical |
| EC-E06 | User's CKYC marked "Update Required" by registry | Show: "Your CKYC needs to be refreshed"; link to CKYC refresh portal | High |
| EC-E07 | Same PAN used by another Riise account | Block flow; show fraud alert; route to support | Critical |
| EC-E08 | CKYC marked deceased | Block flow permanently; route to support | Critical |
| EC-E09 | CKYC API rate limit hit | Queue request; show "High traffic, retrying..." | Medium |

## F. KYC — Bajaj (Aadhaar OTP)

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-F01 | User enters invalid Aadhaar (wrong checksum) | Inline validation error using Verhoeff algorithm | High |
| EC-F02 | Aadhaar not linked to mobile | UIDAI returns specific error; show: "Mobile not linked to Aadhaar. Update at uidai.gov.in" | Critical |
| EC-F03 | OTP not received in 60s | Enable Resend button | High |
| EC-F04 | User requests OTP 5 times in 10 min | Lock for 1 hour; show wait timer | High |
| EC-F05 | OTP entered after expiry (>10 min) | Show: "OTP expired. Please request new one" | Medium |
| EC-F06 | OTP wrong, 3 attempts | Lock Aadhaar OTP for 24 hours; offer support | High |
| EC-F07 | Aadhaar of user differs from CKYC Aadhaar | Block flow; route to support | Critical |
| EC-F08 | Aadhaar belongs to deceased user | UIDAI returns deceased flag; block permanently | Critical |
| EC-F09 | UIDAI service down | Show: "Aadhaar service temporarily unavailable"; allow retry in 30 min | High |
| EC-F10 | User on dual-SIM phone, OTP to different SIM | Inform user OTP went to Aadhaar-linked mobile | Low |
| EC-F11 | SMS gateway delay >2 min | Show: "OTP delayed, please wait..." with manual resend | Medium |
| EC-F12 | App backgrounded during OTP entry | Preserve entered digits; resume on foreground | Medium |

## G. KYC — Bajaj (VKYC)

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-G01 | No VKYC agent available | Show slot picker for next 24h; auto-confirm slot | High |
| EC-G02 | User's camera/mic permission denied | Show OS-level prompt instructions | High |
| EC-G03 | User on slow network (<256 kbps) | Show: "Network too slow for video call. Try Wi-Fi" | High |
| EC-G04 | VKYC starts but call drops mid-way | Auto-redial up to 2 times; if fails, reschedule | Medium |
| EC-G05 | Agent rejects (poor lighting / blurry ID) | Show specific reason + retry CTA | High |
| EC-G06 | VKYC agent ends call but webhook not received | Poll status for 5 min; if no response, allow user to retry | High |
| EC-G07 | User tries to do VKYC outside business hours | Show: "VKYC available 9 AM – 9 PM IST"; schedule for next slot | Medium |
| EC-G08 | User completes VKYC but Bajaj returns failure later | Notify user via push; route to KYC retry | Critical |
| EC-G09 | VKYC vendor SDK fails to initialize | Fall back to scheduled VKYC | High |
| EC-G10 | User completes VKYC but doesn't return to app within 10 min | Auto-resume on next app open | Medium |

## H. KYC — Shriram (Aadhaar OTP or DigiLocker)

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-H01 | All EC-F* edge cases apply for Aadhaar option | Same handling | — |
| EC-H02 | DigiLocker auth canceled by user | Return to method choice screen | Medium |
| EC-H03 | DigiLocker user has no Aadhaar uploaded | Show: "Please upload Aadhaar in DigiLocker first" | High |
| EC-H04 | DigiLocker returns expired Aadhaar | Block; suggest Aadhaar OTP path | Medium |
| EC-H05 | DigiLocker redirect doesn't deep-link back | Show "Open app manually to continue" with universal link | Medium |
| EC-H06 | User starts Aadhaar OTP, fails, switches to DigiLocker | Reset attempts counter; allow fresh flow | Medium |
| EC-H07 | Both Aadhaar OTP and DigiLocker fail | Show support contact; mark KYC as "Stuck" | Critical |
| EC-H08 | User switches between methods rapidly | Cancel pending Aadhaar OTP requests | Low |

## I. KYC — General

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-I01 | KYC validity period expires | Issuer-specific; re-prompt KYC after expiry | High |
| EC-I02 | User completes KYC for Bajaj, later applies for Shriram | Require new Shriram KYC (KYC is per issuer) | High |
| EC-I03 | KYC state lost due to backend issue | Auto-recover from last completed step; show "Resuming..." | Critical |
| EC-I04 | User's mobile changes between KYC and payment | Trigger re-verification of mobile | High |
| EC-I05 | KYC fails after payment is initiated (race condition) | Block payment; refund if charged | Critical |
| EC-I06 | User locked out 24h, contacts support, gets reset | Allow KYC restart from beginning | Medium |
| EC-I07 | KYC complete but webhook acknowledgment lost | Show "Verifying..." for 60s; if still pending, allow user to proceed | Medium |
| EC-I08 | User minor (<18) attempts FD | Block at PAN entry; show: "FDs available for 18+ only" | Critical |
| EC-I09 | Foreign national / NRI Aadhaar | Block flow; not in Phase 1 scope | Critical |
| EC-I10 | Aadhaar mobile and Riise mobile differ | Allow but warn: "OTP will be sent to Aadhaar-linked mobile" | Low |

## J. Nominee

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-J01 | Demat API returns no nominee | Show blank form with no pre-fill indicator | Low |
| EC-J02 | Demat nominee API timeout | Skip pre-fill; show blank form with "Pre-fill unavailable" toast | Low |
| EC-J03 | Demat nominee is minor (<18) | Pre-fill but require guardian details (additional fields) | High |
| EC-J04 | User selects "Same as Applicant" but applicant address has only PIN | Pre-fill what's available; require user to complete | Medium |
| EC-J05 | Nominee DOB makes them >100 years old | Inline warning; allow proceed | Low |
| EC-J06 | Nominee name has special characters (e.g., names with apostrophes) | Allow Unicode; max 100 chars | Low |
| EC-J07 | User adds nominee then taps "Add Later" | Discard entered data; confirm with modal | Medium |
| EC-J08 | User skips nominee on Confirmation screen | Confirmation shows "Not Added" in amber; allow proceed | Low |
| EC-J09 | Issuer requires nominee, user skipped | Issuer rejects application; show specific error; route back | High |
| EC-J10 | User edits Demat-prefilled nominee | Save as override; preserve Demat record separately | Medium |
| EC-J11 | Nominee relationship = "Other" | Require free-text description (max 50 chars) | Medium |
| EC-J12 | Nominee address same as applicant — applicant changes address later | FD nominee address retained as snapshot | Low |

## K. Bank Verification

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-K01 | Account number < 9 digits | Inline error | High |
| EC-K02 | Account number > 18 digits | Inline error | High |
| EC-K03 | Account number contains letters | Strip non-digits silently | Low |
| EC-K04 | IFSC code lowercase | Auto-uppercase | Low |
| EC-K05 | IFSC code format wrong (not `AAAA0XXXXXX`) | Inline error with format example | High |
| EC-K06 | IFSC code valid format but bank doesn't exist | Show: "Invalid IFSC. Please check"; allow override after support | Medium |
| EC-K07 | Confirm account number doesn't match | Inline error; block submit | High |
| EC-K08 | Penny drop returns name mismatch | Show comparison: "Name on account: X, Name on PAN: Y. Use Y or update PAN" | Critical |
| EC-K09 | Penny drop fails: account inactive | Show: "Account inactive. Please use a different account" | High |
| EC-K10 | Penny drop fails: insufficient funds (rare) | Same as inactive | Medium |
| EC-K11 | Penny drop timeout >30s | Retry once; if still timeout, manual review path | High |
| EC-K12 | Bank does not support penny drop | Fall back to bank statement upload (Phase 2) | High |
| EC-K13 | NRE/NRO account | Block in Phase 1; show: "Non-resident accounts not supported" | Critical |
| EC-K14 | Joint account | Allow; flag for manual review | High |
| EC-K15 | Cooperative bank not in supported list | Show: "Bank not supported"; suggest alternate | Medium |
| EC-K16 | User retries 5 times with different accounts | Lock for 24h; fraud check | High |
| EC-K17 | Penny drop deducts ₹1 but doesn't reverse | Auto-reverse within 24h; create ops ticket | Critical |
| EC-K18 | Bank account changed in profile after FD booking | Allow change but new bank used only for maturity payout | Medium |

## L. Payment

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-L01 | Gateway timeout (>60s) | Show: "Payment may still be processing. Please check Investments in 5 min" | Critical |
| EC-L02 | UPI Collect expires (5 min) | Show retry | Medium |
| EC-L03 | UPI Intent app doesn't open | Show fallback: "Use UPI ID instead" | Medium |
| EC-L04 | UPI ID format invalid | Inline validation | Medium |
| EC-L05 | UPI returns "Insufficient funds" | Specific error; allow retry or switch method | Medium |
| EC-L06 | UPI succeeds but webhook lost | Reconcile via gateway status API every 5 min for 30 min | Critical |
| EC-L07 | Card declined by issuer | Show issuer message; offer retry with different card | High |
| EC-L08 | Card expired (entered or auto-detected) | Block at expiry field | High |
| EC-L09 | CVV wrong | Issuer error; allow retry | Medium |
| EC-L10 | 3DS authentication fails | Specific error; allow retry | Medium |
| EC-L11 | 3DS page doesn't load | Timeout 60s; offer different method | High |
| EC-L12 | Net Banking session expires | Return to payment screen | Medium |
| EC-L13 | Net Banking bank list missing user's bank | Show: "Bank not supported on Net Banking. Try UPI/Card" | Medium |
| EC-L14 | Payment succeeds but app crashes before success screen | Show on next launch: "Your FD is being processed" | Critical |
| EC-L15 | Double-tap on Pay button | Debounce; idempotency key prevents double charge | Critical |
| EC-L16 | User goes back during payment processing | Show modal: "Payment in progress, please wait" | High |
| EC-L17 | Bank-side timeout but money debited | Reconciliation finds match within 24h; FD booked or refunded | Critical |
| EC-L18 | Partial refund scenario | Not applicable for FD (all-or-nothing); refund full amount | Medium |
| EC-L19 | Payment amount differs from order amount (gateway tampering) | Reject; security alert | Critical |
| EC-L20 | Payment from blacklisted IP / VPN | Block; show fraud message | High |

## M. Post-Payment / FDR Generation

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-M01 | Payment success but issuer submit API fails | Auto-retry 3 times; if all fail, auto-refund + notify user | Critical |
| EC-M02 | Issuer accepts but doesn't return application ref | Treat as failure; refund | Critical |
| EC-M03 | Issuer rejects application | Refund + notify user with specific reason | Critical |
| EC-M04 | Reverse feed arrives within 5 min | Update success screen in real-time | Medium |
| EC-M05 | Reverse feed delayed >2h | Show: "FDR will be sent to email shortly"; track via background job | High |
| EC-M06 | Reverse feed never arrives (>24h) | Mark as "Under Review"; ops ticket; notify user | Critical |
| EC-M07 | Reverse feed has different amount than paid | Block reconciliation; ops alert | Critical |
| EC-M08 | Reverse feed has different maturity date than expected | Use issuer truth; show diff to user | Medium |
| EC-M09 | Reverse feed for unknown TXN | Log and alert ops | High |
| EC-M10 | Duplicate reverse feed | Idempotent processing; ignore duplicates | High |
| EC-M11 | Notification email bounces | Retry 3 times then mark for SMS-only | Medium |
| EC-M12 | SMS gateway down | Queue; retry within 30 min | Medium |
| EC-M13 | User changed email between payment and FDR | Send to email at time of FDR generation | Medium |
| EC-M14 | User uninstalled app before reverse feed | Email/SMS still sent | Low |
| EC-M15 | FDR contains characters that break email template | Escape and log | Low |

## N. Portfolio & My Investments

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-N01 | Portfolio API returns stale data | Show "Last updated X min ago"; pull-to-refresh | Low |
| EC-N02 | Portfolio sum doesn't match individual FDs | Recompute on client; alert if persistent | High |
| EC-N03 | FD shows as Booked but FDR is null | Show "FDR generating" inline | Medium |
| EC-N04 | FD maturity reached but not marked Matured | Show "Maturing today" pill | Medium |
| EC-N05 | FD auto-renewed but feed delayed | Show "Renewal in progress" | Medium |
| EC-N06 | User has 100+ FDs (performance) | Paginate; lazy load | Medium |
| EC-N07 | Currency conversion (NRI) | Out of Phase 1 scope | Low |
| EC-N08 | FD canceled mid-flight | Remove from active list; show in transactions only | Medium |
| EC-N09 | User taps FD card but detail API fails | Show cached + offline indicator | Medium |
| EC-N10 | Portfolio filter applied + new FD added | Re-apply filter on refresh | Low |

## O. Premature Withdrawal

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-O01 | FD in lock-in period | Block withdrawal; show eligibility date | Critical |
| EC-O02 | Withdrawal request made for already-withdrawn FD | Block; show current status | High |
| EC-O03 | New maturity date < today | Reject; show valid range | High |
| EC-O04 | New maturity date = original maturity | Treat as no-op; reject | Medium |
| EC-O05 | Withdrawal request not in next monthly feed | Show "Pending" beyond 30 days; ops follow-up | Critical |
| EC-O06 | Penalty calculation differs between Riise and issuer | Use issuer truth; show variance | Medium |
| EC-O07 | User cancels withdrawal after submitting | Allow within 24h; not possible after issuer processes | High |
| EC-O08 | Issuer rejects withdrawal request | Show reason; FD remains active | High |
| EC-O09 | Withdrawal during ongoing renewal | Block; show: "Renewal in progress" | Medium |
| EC-O10 | Payout account closed since FD booking | Block; require new bank verification | Critical |

## P. Renewal (Auto & Manual)

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-P01 | Auto-renewal feed arrives but FD was manually renewed | Use manual renewal as truth; alert ops | Critical |
| EC-P02 | Issuer auto-renews at different rate than current rate | Show new rate; notify user | High |
| EC-P03 | User initiates manual renewal after auto-renewal | Block; show: "Already auto-renewed" | High |
| EC-P04 | Renewal amount > original (top-up) | Charge additional via payment flow | High |
| EC-P05 | Renewal amount < original (partial) | Issuer-specific support; may not be allowed | Medium |
| EC-P06 | Renewal plan no longer available | Auto-suggest nearest valid plan | Medium |
| EC-P07 | Renewal during user logout | Hold request; show on next login | Low |
| EC-P08 | Maturity date arrives but no renewal flag | Default per FD's reinvest setting at booking | High |
| EC-P09 | KYC expired since original FD | Require fresh KYC for renewal | High |
| EC-P10 | Bank account closed | Require new bank verification before renewal | Critical |
| EC-P11 | User reduces tenure on renewal making it less than min tenure | Reject; show min tenure | Medium |

## Q. Notifications

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-Q01 | User opted out of SMS | Send only Email + Push | Medium |
| EC-Q02 | All channels failed | Log + ops ticket; show in-app notification | High |
| EC-Q03 | Push notification permission denied | Skip push, use email/SMS | Low |
| EC-Q04 | Email content has user's regional language | Render UTF-8 correctly | Low |
| EC-Q05 | Notification template missing variable | Skip that variable; do not break | Medium |
| EC-Q06 | User reads notification 30 days later | Content still relevant (no time-sensitive references) | Low |
| EC-Q07 | Notification triggers in middle of night | Honor user's notification quiet hours | Medium |
| EC-Q08 | Duplicate trigger (e.g., webhook fires twice) | Idempotent; only one notification sent | High |
| EC-Q09 | User logged in on multiple devices | Push to all registered devices | Medium |
| EC-Q10 | FDR email lands in spam | Include domain authentication (SPF, DKIM, DMARC) | High |

## R. Backend / Ops / Monthly Feed

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-R01 | Monthly feed file corrupted | Reject upload; show validation errors | Critical |
| EC-R02 | Monthly feed missing required columns | Reject; specific column-level error | Critical |
| EC-R03 | Monthly feed has duplicate rows | Dedupe by FDR; log duplicates | High |
| EC-R04 | Monthly feed has FDR not in Riise DB | Quarantine row; ops review | High |
| EC-R05 | Monthly feed processed twice | Idempotent (use file hash) | Critical |
| EC-R06 | Ops user uploads wrong issuer file | Schema mismatch caught; reject | Medium |
| EC-R07 | Feed received later than expected (after 10th) | Process but flag in audit; notify ops lead | Medium |
| EC-R08 | Concurrent uploads | Queue; sequential processing | High |
| EC-R09 | Audit log write fails | Block processing; alert | Critical |
| EC-R10 | Reverse feed and monthly feed conflict for same FD | Reverse feed wins for booking; monthly wins for lifecycle | High |

## S. Security / Fraud

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-S01 | Same PAN used by 2 Riise accounts | Block; route to support | Critical |
| EC-S02 | Account uses VPN from blocked country | Block; show generic error | High |
| EC-S03 | Device root/jailbreak detected | Show warning; allow with elevated logging | High |
| EC-S04 | User changes phone but old device still logged in | Send security alert; require re-auth on old device | Critical |
| EC-S05 | Suspicious pattern: 10 KYC attempts in 1 hour | Lock account; ops review | Critical |
| EC-S06 | Replay attack on payment webhook | Reject if signature/timestamp invalid | Critical |
| EC-S07 | API key leaked / used externally | Rotate keys; audit logs | Critical |
| EC-S08 | User screenshots Aadhaar OTP screen | Block screenshot (Android FLAG_SECURE) | High |
| EC-S09 | Aadhaar / PAN in app logs | Tokenize before log; redact | Critical |
| EC-S10 | Database breach attempt | Rate limit + WAF; alert | Critical |
| EC-S11 | Account takeover attempt | Step-up auth (re-OTP); session invalidation | Critical |

## T. Concurrency / Race Conditions

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-T01 | User opens same FD application on 2 devices | Last-write-wins with version check; show conflict modal | High |
| EC-T02 | Payment in progress + user logs out | Allow logout; FD continues processing | Medium |
| EC-T03 | Reverse feed arrives during user's success screen | Real-time update via WebSocket/push | Medium |
| EC-T04 | Auto-renewal triggered during user's manual renewal | Lock + retry; auto-renewal wins | High |
| EC-T05 | Premature withdrawal + maturity on same day | Block withdrawal; FD matures naturally | Medium |
| EC-T06 | Two FD applications submitted simultaneously | Both processed independently with separate idempotency keys | High |
| EC-T07 | User edits nominee while FD submission in progress | Use snapshot at submission; don't apply mid-flight change | Medium |

## U. Network / Infrastructure

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-U01 | User's network drops mid-payment | Save state; allow resume on reconnect | Critical |
| EC-U02 | API hits rate limit | Exponential backoff; show "Please wait" | Medium |
| EC-U03 | Riise backend deploy mid-session | Graceful degradation; retry with new backend | High |
| EC-U04 | CDN serving stale JS bundle | Force refresh on version mismatch | High |
| EC-U05 | Issuer maintenance window | Show: "{Issuer} unavailable for maintenance until X"; block new applications | High |
| EC-U06 | Time zone differences (user travels) | Use IST for all FD calculations | Medium |
| EC-U07 | Date/time tampered on device | Use server time | High |

## V. Accessibility & Localization

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-V01 | User on screen reader | All buttons/inputs have ARIA labels | High |
| EC-V02 | User has font scaling at 200% | Layout doesn't break | Medium |
| EC-V03 | User in Hindi locale | All amounts in Indian numbering (lakh/crore) | Medium |
| EC-V04 | User in landscape mode (tablet) | Responsive layout | Low |
| EC-V05 | RTL language (future) | Out of Phase 1 | Low |
| EC-V06 | Color-blind user (red/green) | Use icons + text, not color alone | Medium |

## W. Compliance / Regulatory

| ID | Scenario | Expected Behavior | Severity |
|---|---|---|---|
| EC-W01 | RBI mandates new disclosure | Update T&C in-app within 7 days; require re-acceptance | Critical |
| EC-W02 | TDS threshold crossed (>₹40K interest) | Show Form 15G/H option (Phase 2); inform user | High |
| EC-W03 | Deposit Insurance disclaimer missing | Block release until added | Critical |
| EC-W04 | User requests data export (DPDP Act) | Provide within 7 days | High |
| EC-W05 | User requests account deletion | Anonymize FD records; retain for regulatory period | High |
| EC-W06 | KYC data retention exceeded | Auto-purge per RBI norms (typically 8 years post relationship close) | High |
| EC-W07 | Cross-border data transfer | Not applicable for Phase 1 (India-only) | Medium |
| EC-W08 | Audit request from regulator | Provide logs within SLA | Critical |

---

## Summary

| Category | Count |
|---|---|
| A. Discovery | 10 |
| B. Plan Selection | 7 |
| C. Order/Amount | 15 |
| D. Confirmation | 8 |
| E. Bajaj CKYC | 9 |
| F. Bajaj Aadhaar OTP | 12 |
| G. Bajaj VKYC | 10 |
| H. Shriram KYC | 8 |
| I. KYC General | 10 |
| J. Nominee | 12 |
| K. Bank Verification | 18 |
| L. Payment | 20 |
| M. Post-Payment / FDR | 15 |
| N. Portfolio | 10 |
| O. Premature Withdrawal | 10 |
| P. Renewal | 11 |
| Q. Notifications | 10 |
| R. Backend / Feed | 10 |
| S. Security / Fraud | 11 |
| T. Concurrency | 7 |
| U. Network / Infra | 7 |
| V. Accessibility / L10n | 6 |
| W. Compliance | 8 |
| **Total** | **252 edge cases** |

---

## How to Use This Catalog

1. **Engineering** — Each EC ID becomes an acceptance criterion in the ticket
2. **QA** — Test plan derives directly; each EC = 1 test case minimum
3. **Design** — Mock screens for Critical + High severity
4. **PM** — Sign-off gate: every Critical must have a designed/documented behavior before release
5. **Ops** — Critical operational ECs become runbook entries

## Severity Distribution

- **Critical (must handle pre-launch):** ~55 cases
- **High (must handle in MVP):** ~95 cases
- **Medium (should handle in MVP):** ~75 cases
- **Low (post-launch acceptable):** ~25 cases

Phase 1 launch should target 100% Critical + 90% High coverage minimum.
