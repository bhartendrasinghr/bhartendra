import "server-only";
import { promises as fs } from "fs";
import path from "path";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface SiteContent {
  brand: string;
  owner: string;
  email: string;
  linkedin: string;
  year: number;
  footerTagline: string;
}

export interface Stat {
  num: string;
  label: string;
}

export interface Bridge {
  no: string;
  n: number;
  title: string;
  blurb: string;
  tags: string[];
  featured: boolean;
}

export interface Insight {
  cat: string;
  title: string;
  excerpt: string;
  venue: string;
  year: string;
}

export interface HomeContent {
  heroKicker: string;
  heroHeadlinePre: string;
  heroHeadlineEm: string;
  heroHeadlinePost: string;
  heroBody: string;
  stats: Stat[];
  aboutKicker: string;
  aboutHeading: string;
  aboutBody: string;
  aboutBadges: string[];
  bridgesKicker: string;
  bridgesHeading: string;
  bridgesBody: string;
  bridges: { no: string; n: number; title: string }[];
  authorityKicker: string;
  authorityHeading: string;
  authorityBody: string;
  affiliations: string[];
  insightsHeading: string;
  insights: { kicker: string; title: string; excerpt: string }[];
  ctaHeading: string;
}

export interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  detail: string;
  tags: string[];
}

export interface Credential {
  title: string;
  note: string;
}

export interface SpeakingEntry {
  title: string;
  meta: string;
  year: string;
}

export interface AboutContent {
  heroIntro: string;
  heroBody: string;
  profileLead: string;
  profileBody: string[];
  timeline: TimelineEntry[];
  credentials: Credential[];
  speakingHeading: string;
  conferences: SpeakingEntry[];
  bschools: SpeakingEntry[];
  regulators: SpeakingEntry[];
  ctaHeading: string;
}

export interface CurriculumItem {
  no: string;
  title: string;
  detail: string;
}

export interface CoursesContent {
  heroBody: string;
  bridges: Bridge[];
  featuredQuote: string;
  featuredBody: string;
  whoShouldAttend: string[];
  employers: string[];
  curriculum: CurriculumItem[];
  ctaHeading: string;
  ctaBody: string;
}

export interface InsightsContent {
  heroBody: string;
  featuredKicker: string;
  featuredTitle: string;
  featuredExcerpt: string;
  featuredVenue: string;
  featuredYear: string;
  categories: string[];
  items: Insight[];
  ctaHeading: string;
}

export interface ContactContent {
  heroHeading: string;
  heroBody: string;
}

export interface Content {
  site: SiteContent;
  home: HomeContent;
  about: AboutContent;
  courses: CoursesContent;
  insights: InsightsContent;
  contact: ContactContent;
}

/* ------------------------------------------------------------------ */
/* Default (seed) content                                              */
/* ------------------------------------------------------------------ */

export const DEFAULT_CONTENT: Content = {
  site: {
    brand: "Eight Bridges",
    owner: "Krishnan Ranganathan",
    email: "crish_r2003@yahoo.co.in",
    linkedin: "https://www.linkedin.com",
    year: 2026,
    footerTagline:
      "Industry-led programmes in capital markets, risk, finance and regulation, by Krishnan Ranganathan.",
  },
  home: {
    heroKicker: "Risk · Finance · Regulation",
    heroHeadlinePre: "Master what modern markets ",
    heroHeadlineEm: "actually",
    heroHeadlinePost: " demand.",
    heroBody:
      "Eight flagship programmes in capital markets and risk, designed and taught by a practitioner who spent two decades inside the world’s trading floors, regulatory reforms and boardrooms.",
    stats: [
      { num: "20+", label: "Years in capital markets & risk management" },
      { num: "15", label: "Years leading change programmes at Nomura" },
      { num: "8", label: "Flagship programmes, the Eight Bridges" },
      { num: "4", label: "Continents of conference & faculty engagements" },
    ],
    aboutKicker: "The Practitioner",
    aboutHeading:
      "Two decades at the centre of global capital markets and risk.",
    aboutBody:
      "Until April 2025, Krishnan was Executive Director and Co-Head of International Change at Nomura, delivering mission-critical and regulatory programmes across Global Markets, Risk, Finance and Operations. He led the bank’s transition away from LIBOR and ran its EMIR derivatives-reform programme, with earlier roles at RBS/NatWest and Tata Consultancy Services serving Merrill Lynch and Goldman Sachs in Tokyo and London.",
    aboutBadges: [
      "Harvard Business School",
      "Chartered Accountant",
      "Cost Accountant",
      "Company Secretary",
    ],
    bridgesKicker: "The Programmes",
    bridgesHeading: "The Eight Bridges",
    bridgesBody:
      "Each bridge is a self-contained programme, built from real cases, regulatory history and lessons learned on the floor. Together they connect classroom theory to the way modern markets actually behave.",
    bridges: [
      { n: 1, no: "01", title: "Why Most M&As Fail, and How to Improve Their Success Rate" },
      { n: 2, no: "02", title: "The Global Regulatory Landscape: Effectiveness & Unintended Consequences" },
      { n: 3, no: "03", title: "Financial Risk Management and Its Changing Characteristics" },
      { n: 4, no: "04", title: "Financial Statements Analysis: Reading Between the Lines" },
      { n: 5, no: "05", title: "White-Collar Crime and the Significance of Supervision & Audit" },
      { n: 6, no: "06", title: "Wealth Management: Timeless Lessons amid Bubbles & Speculative Mania" },
      { n: 7, no: "07", title: "How Global Finance Works: for the Few and Against the Many" },
      { n: 8, no: "08", title: "Is the US Dollar’s “Exorbitant Privilege” Under Threat?" },
    ],
    authorityKicker: "On the World Stage",
    authorityHeading:
      "A guest voice for regulators, exchanges and the industry’s leading forums.",
    authorityBody:
      "From RiskMinds in Barcelona to the RBI College of Supervisors, Krishnan has lectured at Harvard Business School and the IIMs, advised regulators and stock exchanges, and spoken at the leading risk conferences across Europe, the Americas and Asia.",
    affiliations: [
      "Harvard Business School",
      "Nomura",
      "RBS / NatWest",
      "RiskMinds",
      "risk.net",
      "RBI College of Supervisors",
      "IIM",
      "NSE",
      "SEBI",
    ],
    insightsHeading: "Reading the markets aloud",
    insights: [
      {
        kicker: "Reserve Currencies",
        title: "Is the Dollar’s “Exorbitant Privilege” Under Threat?",
        excerpt:
          "On the slow rise of smaller reserve currencies and what it means for the architecture of global finance.",
      },
      {
        kicker: "Risk Management",
        title: "What Credit Suisse, SVB and Archegos Really Taught Us",
        excerpt:
          "Three collapses, one lesson: blind faith in models, and the governance gaps the models could never see.",
      },
      {
        kicker: "Markets & History",
        title: "1792, 1907, 1929, 2008: Can We Avoid the Next One?",
        excerpt:
          "Reading two centuries of crises as a single, repeating story about leverage, trust and human nature.",
      },
    ],
    ctaHeading: "Bring these programmes to your team, school or institution.",
  },
  about: {
    heroIntro:
      "Capital markets practitioner, risk and regulation specialist, and guest faculty to schools, regulators and exchanges across the world.",
    heroBody:
      "Over two decades in capital markets and risk management, most recently as Executive Director and Co-Head of International Change at Nomura, where he led mission-critical and regulatory programmes across Global Markets, Risk, Finance and Operations until April 2025.",
    profileLead:
      "During his fifteen-year tenure at Nomura, Krishnan was at the centre of the industry’s defining reforms, leading the IBOR Transition that moved markets away from LIBOR toward alternate “risk-free” rates.",
    profileBody: [
      "Before that, he ran the EMIR programme, the post-2008 OTC derivatives reform and the European counterpart to the US Dodd-Frank Act, and was associated with a range of global regulatory initiatives originating from the Basel Committee.",
      "Prior to Nomura, he worked for RBS / NatWest, and earlier still as a Functional Consultant in Tata Consultancy Services’ niche Global Consulting Practice, serving clients such as Merrill Lynch and Goldman Sachs in Tokyo and London.",
      "An alumnus of Harvard Business School, Krishnan is a Chartered Accountant, Cost Accountant and Company Secretary from India, and graduated summa cum laude from St Xavier’s College, Kolkata. He has conducted guest faculty sessions on risk, finance and regulatory themes at business schools in India and abroad, as well as for regulators and stock exchanges, and has been an invited speaker at prestigious conferences around the world.",
    ],
    timeline: [
      {
        period: "2010 - Apr 2025",
        role: "Executive Director & Co-Head, International Change",
        org: "Nomura, India",
        detail:
          "Responsible for the delivery of mission-critical and regulatory programmes across Global Markets, Risk, Finance and Operations. Led the bank’s IBOR Transition away from LIBOR, ran the EMIR derivatives-reform programme, and worked on global initiatives from the Basel Committee.",
        tags: ["IBOR / LIBOR Transition", "EMIR", "Basel Committee"],
      },
      {
        period: "Earlier",
        role: "Capital Markets & Risk roles",
        org: "RBS / NatWest",
        detail:
          "Delivered capital-markets and risk change initiatives across the investment-banking division ahead of his move to Nomura.",
        tags: ["Investment Banking", "Risk Change"],
      },
      {
        period: "Earlier",
        role: "Functional Consultant, Global Consulting Practice",
        org: "Tata Consultancy Services",
        detail:
          "Part of TCS’ niche Global Consulting Practice, serving clients such as Merrill Lynch and Goldman Sachs from Tokyo and London.",
        tags: ["Merrill Lynch", "Goldman Sachs", "Tokyo & London"],
      },
    ],
    credentials: [
      { title: "Harvard Business School", note: "Alumnus" },
      {
        title: "Chartered Accountant",
        note: "Institute of Chartered Accountants of India",
      },
      {
        title: "Cost Accountant & Company Secretary",
        note: "Professional qualifications, India",
      },
      { title: "St Xavier’s College, Kolkata", note: "Graduated summa cum laude" },
    ],
    speakingHeading: "A voice on the world’s platforms",
    conferences: [
      { title: "“Zero Tolerance, Infinite Complexity: Staying Ahead in a Hyper-Regulated World”", meta: "HSBC Risk & Compliance Symposium, Bangalore", year: "2025" },
      { title: "“Will the rise of smaller reserve currencies impact the Dollar’s exorbitant privilege?”", meta: "RiskMinds International, Barcelona", year: "2022" },
      { title: "“Likely hurdles towards global institutional adoption of cryptos”", meta: "Asia Crypto Trading Forum, Risk magazine (risk.net)", year: "2021" },
      { title: "“Basel IV: Looking ahead to 2023”", meta: "risk.net", year: "2021" },
      { title: "Fundamental Review of the Trading Book, Virtual Training", meta: "risk.net", year: "2021" },
      { title: "Risk ASEAN Conference", meta: "risk.net, Kuala Lumpur", year: "2019" },
      { title: "12th Annual Liquidity & Balance Sheet Management Forum", meta: "Fleming Europe, Vienna", year: "2017" },
      { title: "13th Annual Credit Risk Management Conference", meta: "Fleming Europe, Vienna", year: "2017" },
      { title: "1st FRTB Asia Summit", meta: "Informa, Hong Kong", year: "2017" },
      { title: "13th Annual Banking Operations Forum", meta: "Fleming Europe, Madrid", year: "2016" },
      { title: "10th Annual Collateral Management Conference", meta: "Fleming Europe, Amsterdam", year: "2016" },
      { title: "Asian Risk Regulation Summit", meta: "Risk Minds Asia, Hong Kong", year: "2016" },
      { title: "7th Annual Risk Minds Americas Conference", meta: "Risk Minds Americas, Chicago", year: "2016" },
      { title: "6th OTC Derivatives & Collateral Management Forum", meta: "Fleming, Hong Kong", year: "2016" },
      { title: "Asia Risk Congress", meta: "Risk magazine (risk.net), Singapore", year: "2015" },
      { title: "OTC Derivatives Congress", meta: "Marcus Evans, Singapore", year: "2015" },
      { title: "9th Annual Collateral Management Conference", meta: "Fleming Europe, Amsterdam", year: "2015" },
      { title: "FX Week Asia", meta: "FX Week, Singapore", year: "2015" },
      { title: "3rd India Risk Forum", meta: "Dun & Bradstreet, Mumbai", year: "2015" },
    ],
    bschools: [
      { title: "“Why Most M&As Fail” & “Financial Risk Management and Its Changing Characteristics”", meta: "ICFAI B-School, Mumbai", year: "2025" },
      { title: "Programme on Capital Markets and Risk Management (for experienced executives)", meta: "IIM Bangalore", year: "2025-26" },
      { title: "Financial Statements Analysis", meta: "IIM Mumbai", year: "2025" },
      { title: "“Lessons from the GFC and Post-2008 Banking Regulations: How Healthy are the Banks Now?”", meta: "NLDIMSR, Mumbai", year: "2024" },
      { title: "“Financial Shenanigans in Acquisition Accounting”", meta: "ICFAI B-School, Mumbai", year: "2021" },
      { title: "“Is Valuation an Art or Science?” & “The LVMH-Tiffany $15.8bn soap opera”", meta: "ICFAI B-School, Mumbai", year: "2020" },
      { title: "“The Great Depression & Economic Consequences of Covid-19: A Global Outlook”", meta: "Harvard Business School, Webinar", year: "2020" },
      { title: "“Global Financial Crisis and its Aftermath”", meta: "Harvard Business School, Boston & ICFAI B-School, Mumbai", year: "2019" },
      { title: "“1792, 1825, 1857, 1907, 1929-33, 2007-08: what have we learnt, can we avoid the next?”", meta: "IIM Kozhikode", year: "2017" },
    ],
    regulators: [
      { title: "RBI Financial Stability Report, RBI Chair", meta: "Gokhale Institute of Politics and Economics", year: "2026" },
      { title: "“Towards Resilience in Individual Entities and the Financial System”", meta: "Refresher Programme for Chief General Managers, RBI College of Supervisors", year: "2024" },
      { title: "“Recent developments in crypto assets and emerging financial stability concerns”", meta: "IIM Bangalore, NSE & SEBI, Webinar", year: "2021" },
      { title: "“Does value investing still make sense for global investors?”", meta: "IIM Bangalore, NSE & SEBI, Webinar", year: "2020" },
    ],
    ctaHeading:
      "Explore the Eight Bridges: eight programmes drawn from this experience.",
  },
  courses: {
    heroBody:
      "Eight self-contained programmes that connect classroom theory to the way markets actually behave, each built from real cases, regulatory history and lessons learned on the floor. Delivered for B-schools, executives, regulators and exchanges.",
    bridges: [
      { n: 1, no: "01", title: "Why Most M&As Fail, and How to Improve Their Success Rate", blurb: "The boldest move in corporate strategy, yet most deals destroy value. A forensic look at why mergers fail, and the disciplines that meaningfully improve the odds.", tags: ["M&A", "Strategy", "Valuation"], featured: false },
      { n: 2, no: "02", title: "The Global Regulatory Landscape: Effectiveness & Unintended Consequences", blurb: "Two decades of post-crisis reform, mapped: what each wave of regulation set out to fix, what it actually achieved, and the unintended consequences it left behind.", tags: ["Regulation", "Basel"], featured: false },
      { n: 3, no: "03", title: "Financial Risk Management and Its Changing Characteristics", blurb: "From the Renaissance mastery of risk to Credit Suisse, SVB and Archegos: how risk is measured, mismeasured and managed in contemporary markets.", tags: ["Risk", "20 hours"], featured: true },
      { n: 4, no: "04", title: "Financial Statements Analysis: Reading Between the Lines", blurb: "The numbers tell a story; the footnotes tell the truth. A practitioner’s method for reading corporate accounts and spotting what management would rather you missed.", tags: ["Accounting", "Forensics"], featured: false },
      { n: 5, no: "05", title: "White-Collar Crime and the Significance of Supervision & Audit", blurb: "How fraud hides in plain sight inside complex organisations, and why supervision and audit remain the last, indispensable line of defence.", tags: ["Fraud", "Audit"], featured: false },
      { n: 6, no: "06", title: "Wealth Management: Timeless Lessons amid Bubbles & Speculative Mania", blurb: "Four centuries of bubbles, manias and crashes, distilled into the enduring principles of wealth management that survive every cycle.", tags: ["Wealth", "Markets"], featured: false },
      { n: 7, no: "07", title: "How Global Finance Works: for the Few and Against the Many", blurb: "A clear-eyed account of the financial system’s architecture: who it serves, who it does not, and the structural forces that keep it that way.", tags: ["Global Finance"], featured: false },
      { n: 8, no: "08", title: "Is the US Dollar’s “Exorbitant Privilege” Under Threat?", blurb: "Reserve-currency power, de-dollarisation and the slow, consequential contest for the centre of global finance.", tags: ["Reserve Currencies", "Macro"], featured: false },
    ],
    featuredQuote:
      "The remarkable idea that distinguishes modern times from the past is the mastery of risk: the notion that the future is more than a whim of the gods.",
    featuredBody:
      "This programme traces risk management from its origins through to the recent collapses of Credit Suisse, Silicon Valley Bank and Archegos: what each kind of risk can, and often cannot, be measured, and a radical rethink of the approach to managing it.",
    whoShouldAttend: [
      "Fresh and experienced commerce or economics graduates from B-Schools, CFA, CA, CPA, CMA and FRM backgrounds.",
      "Anyone working in a Risk Management or Compliance function at an investment bank or a Global Capability Centre (GCC) in India.",
    ],
    employers: [
      "Business Analyst, Risk Manager, Compliance Manager and Supervisory Officer roles in the second and third lines of defence.",
      "GCCs, buy- and sell-side firms, Big-4 and consulting firms, regulators and stock exchanges.",
    ],
    curriculum: [
      { no: "01", title: "The Changing Nature of Risk", detail: "Risk and its evolving characteristics over the last 1,000 years." },
      { no: "02", title: "Key Financial & Non-Financial Risks", detail: "A deep dive into Credit, Market, Liquidity and Operational risk." },
      { no: "03", title: "Lessons from the 2008 GFC", detail: "What went wrong, and what the crisis permanently changed." },
      { no: "04", title: "Evolution of the Basel Norms", detail: "Basel I, II and III, and their bearing on risk management." },
      { no: "05", title: "Recent Collapses", detail: "Risk lessons from Credit Suisse, Silicon Valley Bank and Archegos." },
      { no: "06", title: "ERM & the Three Lines of Defence", detail: "The enterprise risk framework and how it is governed." },
      { no: "07", title: "Blind Faith in Models", detail: "Where quantitative models help, and where they quietly mislead." },
      { no: "08", title: "The Way Forward", detail: "The stability, efficiency and uniformity trilemma and the role of the Board." },
    ],
    ctaHeading: "Tailored for your school, team or institution.",
    ctaBody:
      "Each bridge can be delivered as a standalone session or combined into a longer programme. Reach out to discuss format, depth and scheduling.",
  },
  insights: {
    heroBody:
      "Talks, essays and provocations on risk, regulation, valuation and the long arc of financial history, the same ideas that shape the Eight Bridges.",
    featuredKicker: "Featured · Markets & Macro",
    featuredTitle: "Is the US Dollar’s “Exorbitant Privilege” Under Threat?",
    featuredExcerpt:
      "The rise of smaller reserve currencies, the quiet logic of de-dollarisation, and what a multipolar monetary order would mean for the cost of capital everywhere.",
    featuredVenue: "RiskMinds International, Barcelona",
    featuredYear: "2022",
    categories: [
      "All",
      "Markets & Macro",
      "Risk Management",
      "Regulation",
      "M&A & Accounting",
    ],
    items: [
      { cat: "Risk Management", title: "What Credit Suisse, SVB and Archegos Really Taught Us", excerpt: "Three collapses, one lesson: blind faith in models, and the governance gaps the models could never see.", venue: "risk.net", year: "2021" },
      { cat: "Markets & Macro", title: "1792, 1907, 1929, 2008: Can We Avoid the Next One?", excerpt: "Reading two centuries of crises as a single, repeating story about leverage, trust and human nature.", venue: "IIM Kozhikode", year: "2017" },
      { cat: "Regulation", title: "Basel IV: Looking Ahead", excerpt: "How the final post-crisis capital rules reshape the economics of banking, and what they leave unresolved.", venue: "risk.net", year: "2021" },
      { cat: "Regulation", title: "Hurdles to Institutional Adoption of Cryptos", excerpt: "The custody, settlement and stability questions standing between digital assets and the institutional balance sheet.", venue: "Asia Crypto Trading Forum", year: "2021" },
      { cat: "M&A & Accounting", title: "Why Most M&As Fail", excerpt: "The recurring patterns behind value-destroying deals, and the diligence that separates the winners.", venue: "ICFAI B-School", year: "2025" },
      { cat: "M&A & Accounting", title: "Financial Shenanigans in Acquisition Accounting", excerpt: "How acquisition accounting can flatter the numbers, and where the careful reader should look first.", venue: "ICFAI B-School", year: "2021" },
      { cat: "M&A & Accounting", title: "Is Valuation an Art or a Science?", excerpt: "Drawing on the LVMH-Tiffany $15.8bn saga to ask how much of valuation is judgement dressed as arithmetic.", venue: "ICFAI B-School", year: "2020" },
      { cat: "Regulation", title: "The Global Regulatory Landscape", excerpt: "Effectiveness and unintended consequences across two decades of post-crisis financial reform.", venue: "Guest Faculty", year: "2024" },
      { cat: "Markets & Macro", title: "How Global Finance Works: for the Few", excerpt: "A structural account of who the financial system serves, and the forces that keep it that way.", venue: "Eight Bridges", year: "2025" },
    ],
    ctaHeading: "Want one of these as a session for your school or team?",
  },
  contact: {
    heroHeading: "I’d love to hear from you",
    heroBody:
      "Whether you’re a business school, a corporate team, a regulator or a conference organiser, reach out to discuss a programme, a guest session or a speaking engagement.",
  },
};

/* ------------------------------------------------------------------ */
/* Read / write                                                        */
/* ------------------------------------------------------------------ */

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_PATH = path.join(DATA_DIR, "content.json");

export async function getContent(): Promise<Content> {
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<Content>;
    // Shallow-merge each top-level section over the defaults so newly
    // added fields keep working even if the saved file predates them.
    return {
      site: { ...DEFAULT_CONTENT.site, ...parsed.site },
      home: { ...DEFAULT_CONTENT.home, ...parsed.home },
      about: { ...DEFAULT_CONTENT.about, ...parsed.about },
      courses: { ...DEFAULT_CONTENT.courses, ...parsed.courses },
      insights: { ...DEFAULT_CONTENT.insights, ...parsed.insights },
      contact: { ...DEFAULT_CONTENT.contact, ...parsed.contact },
    };
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function saveContent(content: Content): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
}
