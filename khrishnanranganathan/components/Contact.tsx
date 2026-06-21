import { profile } from "@/lib/content";

const engagements = [
  "Guest lectures & keynote sessions",
  "Multi-week elective modules",
  "Executive education & workshops",
  "Curriculum & case design"
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-ink-100 bg-paper-50 shadow-card">
          <div className="grid gap-px bg-ink-100 md:grid-cols-[1.1fr_0.9fr]">
            {/* Pitch */}
            <div className="bg-paper-50 p-10 sm:p-12">
              <p className="eyebrow">
                <span className="h-px w-8 bg-brass-500" />
                Contact
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink-900 text-balance">
                Bring this to your classroom.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-600">
                I work with business schools, universities, and organisations to
                design sessions that students remember long after the exam. Tell
                me about your cohort and what you&rsquo;d like them to walk away with.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {engagements.map((e) => (
                  <li key={e} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <svg className="shrink-0 text-brass-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {e}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-paper-50 transition hover:bg-ink-800"
                >
                  Email me
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                  </svg>
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-6 py-3 text-sm font-medium text-ink-700 transition hover:border-brass-500 hover:text-brass-600"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* Card */}
            <div className="relative flex flex-col justify-between bg-gradient-to-br from-ink-800 to-ink-900 p-10 text-paper-50 sm:p-12">
              <div className="pointer-events-none absolute inset-0 bg-grain opacity-30" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-300">
                  Direct
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-3 block font-display text-2xl text-paper-50 transition hover:text-brass-300"
                >
                  {profile.email}
                </a>
              </div>
              <div className="relative mt-10 space-y-4 border-t border-paper-50/10 pt-8 text-sm">
                <div>
                  <p className="text-ink-300">Based in</p>
                  <p className="mt-0.5 text-paper-50">{profile.location}</p>
                </div>
                <div>
                  <p className="text-ink-300">Response time</p>
                  <p className="mt-0.5 text-paper-50">Within 2–3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
