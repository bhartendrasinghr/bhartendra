import { highlights, profile } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-ink-100 bg-paper-100">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Bio */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">
              <span className="h-px w-8 bg-brass-500" />
              About
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink-900 text-balance">
              From the desk to the classroom.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                For more than two decades I built a career in global markets —
                trading, structuring, and ultimately leading businesses through
                some of the most volatile periods in modern finance.
              </p>
              <p>
                As a Managing Director at Nomura, I learned that the hardest part
                of the job was rarely the mathematics. It was judgment: making
                consequential decisions with incomplete information, and leading
                people through uncertainty without pretending it away.
              </p>
              <p>
                Now I teach. I bring those lessons — the wins, the losses, and the
                reasoning behind both — to business-school students and emerging
                leaders who will sit in those rooms next.
              </p>
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brass-600 transition hover:text-brass-700"
            >
              Work with me
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Timeline */}
          <div>
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
              Career & credentials
            </p>
            <ol className="relative space-y-10 border-l border-ink-200 pl-8">
              {highlights.map((h) => (
                <li key={h.title} className="relative">
                  <span className="absolute -left-[2.15rem] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-brass-500 bg-paper">
                    <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass-600">
                    {h.period}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink-900">
                    {h.title}
                    <span className="font-sans text-base font-normal text-ink-400">
                      {" "}· {h.org}
                    </span>
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{h.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
