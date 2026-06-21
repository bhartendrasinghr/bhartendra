// -----------------------------------------------------------------------------
// Single source of truth for site content.
// Everything here is placeholder copy crafted to fit the profile — edit freely.
// -----------------------------------------------------------------------------

export const profile = {
  name: "Krishnan Ranganathan",
  shortName: "Krishnan",
  initials: "KR",
  // Headline role shown in the hero and metadata.
  role: "Educator · Former Managing Director, Nomura",
  tagline: "Markets, leadership, and judgment — taught from the inside.",
  intro:
    "I spent over two decades building and leading businesses in global finance, the last several as a Managing Director at Nomura. Today I teach — bringing the real decisions, trade-offs, and judgment of the trading floor and the boardroom into the classroom for the next generation of business leaders.",
  location: "Mumbai, India",
  email: "hello@khrishnanranganathan.com",
  social: {
    linkedin: "https://www.linkedin.com/",
    twitter: "https://x.com/",
    substack: "#writing"
  }
};

export const stats: { value: string; label: string }[] = [
  { value: "24+", label: "Years in global finance" },
  { value: "12", label: "B-schools taught at" },
  { value: "3,000+", label: "Students mentored" },
  { value: "50+", label: "Weekly essays published" }
];

export const highlights: { period: string; title: string; org: string; detail: string }[] = [
  {
    period: "2019 — Present",
    title: "Educator & Guest Faculty",
    org: "Independent",
    detail:
      "Guest lectures and executive modules on capital markets, risk, and leadership across leading business schools in India and abroad. Author of a weekly essay read by students and practitioners."
  },
  {
    period: "2011 — 2019",
    title: "Managing Director",
    org: "Nomura",
    detail:
      "Led a regional markets business through cycles of growth and stress — building teams, managing risk at scale, and sitting on the committees where the hardest calls get made."
  },
  {
    period: "2004 — 2011",
    title: "Executive Director, Markets",
    org: "Global Investment Bank",
    detail:
      "Built and ran trading and structuring desks across rates and credit, mentoring a generation of analysts who now lead desks of their own."
  },
  {
    period: "1999 — 2004",
    title: "Analyst → Vice President",
    org: "Global Investment Bank",
    detail:
      "Learned the craft from the bottom up — pricing, hedging, and the discipline of being accountable for a number every single day."
  }
];

export type Programme = {
  slug: string;
  title: string;
  format: string;
  duration: string;
  audience: string;
  summary: string;
  outcomes: string[];
};

export const programmes: Programme[] = [
  {
    slug: "markets-from-the-inside",
    title: "Markets From the Inside",
    format: "Lecture series · In-person or virtual",
    duration: "6 sessions × 90 min",
    audience: "MBA & Master's in Finance",
    summary:
      "How capital markets actually work — beyond the textbook. Rates, credit, and risk explained through real desk decisions, war stories, and the structures behind the headlines.",
    outcomes: [
      "Read markets the way a trader reads them",
      "Understand how risk is priced, hedged, and mispriced",
      "Connect macro narratives to instrument-level reality"
    ]
  },
  {
    slug: "judgment-under-uncertainty",
    title: "Judgment Under Uncertainty",
    format: "Interactive workshop",
    duration: "2 days · case-driven",
    audience: "Executive & senior MBA",
    summary:
      "Decision-making when the data is incomplete and the clock is running. A case-method workshop drawn from real situations on the desk and in the boardroom.",
    outcomes: [
      "A framework for high-stakes decisions",
      "Recognising cognitive traps under pressure",
      "Communicating conviction without false certainty"
    ]
  },
  {
    slug: "leading-on-the-floor",
    title: "Leading on the Floor",
    format: "Leadership module",
    duration: "4 sessions × 2 hrs",
    audience: "Emerging leaders & managers",
    summary:
      "Leadership lessons from running a high-performance markets business — building trust, managing risk-takers, and holding teams together when the P&L turns against you.",
    outcomes: [
      "Lead teams whose work you can't fully see",
      "Build a culture of accountability and candour",
      "Manage performance, ego, and burnout"
    ]
  }
];

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  readingTime: string;
  excerpt: string;
  tags: string[];
  body: string[]; // paragraphs of simple HTML
};

export const posts: Post[] = [
  {
    slug: "the-cost-of-being-right-too-early",
    title: "The Cost of Being Right Too Early",
    date: "2026-06-15",
    readingTime: "6 min read",
    excerpt:
      "Markets don't reward correct opinions. They reward correct opinions held with the right size, at the right time. A note on timing, conviction, and survival.",
    tags: ["Markets", "Judgment"],
    body: [
      "<p>There is a quiet cruelty to financial markets: you can be entirely right about the world and still lose everything. Being early, in market terms, is indistinguishable from being wrong. The position is underwater either way, and the margin call does not pause to admire your thesis.</p>",
      "<p>I learned this the hard way in my first decade on the desk, and I have spent the years since trying to teach it without students having to learn it the same way.</p>",
      "<h2>Conviction is not a strategy</h2>",
      "<p>Young analysts arrive convinced that the job is to have the best view. It isn't. The job is to <strong>survive long enough for your view to matter</strong>. Those are very different skills, and the second one is rarely taught.</p>",
      "<blockquote>The market can stay irrational longer than you can stay solvent — and longer than your career can stay intact.</blockquote>",
      "<p>What separates the durable from the brilliant-but-broke is sizing. The willingness to be right and small. The discipline to add only when the market begins to agree with you, not before.</p>",
      "<h2>What I tell my students</h2>",
      "<ul><li>Separate the <strong>thesis</strong> from the <strong>trade</strong>. They have different time horizons.</li><li>Ask not only \"am I right?\" but \"what does it cost me to be early?\"</li><li>Respect the path, not just the destination.</li></ul>",
      "<p>The most valuable thing I carried off the trading floor and into the classroom was not a model. It was a healthy fear of my own certainty.</p>"
    ]
  },
  {
    slug: "what-the-boardroom-doesnt-teach",
    title: "What the Boardroom Doesn't Teach",
    date: "2026-06-08",
    readingTime: "5 min read",
    excerpt:
      "Every business school covers strategy. Almost none cover the thing that actually decides outcomes — the quality of the conversation in the room when it matters.",
    tags: ["Leadership"],
    body: [
      "<p>By the time I sat on my first real committee, I had spent fifteen years mastering the technical craft of markets. None of it prepared me for the actual work of leadership, which turned out to be far simpler and far harder: getting a room of capable, opinionated people to tell each other the truth.</p>",
      "<h2>The expensive silence</h2>",
      "<p>The costliest decisions I witnessed were rarely the result of bad analysis. They were the result of good analysis that no one in the room felt safe enough to voice. The most senior person spoke first, and the conversation quietly collapsed around their view.</p>",
      "<blockquote>A team's intelligence is capped not by its smartest member, but by what its members are willing to say out loud.</blockquote>",
      "<p>This is why, when I teach leadership, I spend less time on frameworks and more on the texture of the conversation — who speaks, who is heard, and what it costs to disagree.</p>",
      "<h2>Three habits worth building</h2>",
      "<ul><li><strong>Speak last.</strong> If you are senior, your early opinion is an anchor, not a contribution.</li><li><strong>Reward the dissenter</strong> publicly, even when they're wrong. Especially when they're wrong.</li><li><strong>Name the discomfort.</strong> The thing no one wants to say is usually the thing that matters.</li></ul>",
      "<p>Strategy is abundant. Honest rooms are rare. Build the room.</p>"
    ]
  },
  {
    slug: "risk-is-a-feeling-before-it-is-a-number",
    title: "Risk Is a Feeling Before It Is a Number",
    date: "2026-06-01",
    readingTime: "7 min read",
    excerpt:
      "We dress risk up in Greek letters and confidence intervals. But the best risk-takers I knew felt it in their stomach long before the model flashed red.",
    tags: ["Markets", "Risk"],
    body: [
      "<p>We have built an entire profession around the idea that risk can be measured. Value-at-risk, stress scenarios, tail hedges — an elaborate machinery of quantification. It is useful machinery. It is also, on its own, dangerous.</p>",
      "<h2>The number is a lagging indicator</h2>",
      "<p>By the time the risk model is screaming, the cheap moment to act has usually passed. The traders who survived the worst weeks of my career were the ones who felt the regime change before the data confirmed it — a thinning of liquidity, a widening of spreads, a phone that stopped ringing.</p>",
      "<blockquote>Models tell you how much you can lose if the world behaves. The job is to notice when the world has stopped behaving.</blockquote>",
      "<p>This is not an argument against quantitative risk management. It is an argument for pairing it with judgment — the pattern recognition that comes only from having lived through a few storms.</p>",
      "<h2>Teaching the unteachable</h2>",
      "<p>Can intuition be taught? Not directly. But it can be <strong>accelerated</strong> — through cases, through stories, through forcing students to sit inside a decision before they know how it ends. That is the closest thing to experience I can offer in a classroom, and it is most of what I try to do.</p>",
      "<p>Respect the number. Trust the stomach. Reconcile the two before the market reconciles them for you.</p>"
    ]
  }
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}
