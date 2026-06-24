import { programmes } from "@/lib/content";

export function Teaching() {
  return (
    <section id="teaching" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">
            <span className="h-px w-8 bg-brass-500" />
            Teaching
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink-900 text-balance">
            Programmes I bring to business schools.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-500">
            Each is built from real experience and adapted to the room — whether
            that&rsquo;s a first-year MBA cohort or a group of senior executives.
            Available as standalone guest lectures, multi-session modules, or
            bespoke workshops.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {programmes.map((p, i) => (
            <article
              key={p.slug}
              className="group flex flex-col rounded-2xl border border-ink-100 bg-paper-50 p-7 shadow-card transition hover:-translate-y-1 hover:border-brass-500/40 hover:shadow-card-hover"
            >
              <span className="font-display text-sm font-semibold text-brass-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink-900">
                {p.title}
              </h3>

              <dl className="mt-4 space-y-1.5 text-sm text-ink-500">
                <div className="flex gap-2">
                  <dt className="text-ink-400">Format</dt>
                  <dd className="font-medium text-ink-700">{p.format}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-ink-400">Length</dt>
                  <dd className="font-medium text-ink-700">{p.duration}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-ink-400">For</dt>
                  <dd className="font-medium text-ink-700">{p.audience}</dd>
                </div>
              </dl>

              <p className="mt-5 leading-relaxed text-ink-600">{p.summary}</p>

              <ul className="mt-5 space-y-2 border-t border-ink-100 pt-5 text-sm text-ink-600">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex gap-2.5">
                    <svg className="mt-0.5 shrink-0 text-brass-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {o}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-500">
          Looking for something tailored to your curriculum?{" "}
          <a href="#contact" className="font-semibold text-brass-600 hover:text-brass-700">
            Let&rsquo;s design it together →
          </a>
        </p>
      </div>
    </section>
  );
}
