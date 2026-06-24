import { profile, stats } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-brass-400/15 blur-3xl" />
        <div className="absolute -left-32 top-40 h-[420px] w-[420px] rounded-full bg-ink-300/15 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-36 sm:px-8 sm:pt-44 md:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <p className="eyebrow">
              <span className="h-px w-8 bg-brass-500" />
              {profile.role}
            </p>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink-900 text-balance sm:text-6xl md:text-7xl">
              {profile.name}
            </h1>

            <p className="mt-6 max-w-xl font-display text-2xl italic leading-snug text-ink-600 text-pretty">
              {profile.tagline}
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 text-pretty">
              {profile.intro}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#teaching"
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-paper-50 shadow-card transition hover:bg-ink-800"
              >
                See what I teach
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                </svg>
              </a>
              <a
                href="/writing"
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-6 py-3 text-sm font-medium text-ink-700 transition hover:border-brass-500 hover:text-brass-600"
              >
                Read the weekly essay
              </a>
            </div>
          </div>

          {/* Portrait card */}
          <div className="animate-fade-up [animation-delay:120ms]">
            <PortraitCard />
          </div>
        </div>

        {/* Stat band */}
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100 shadow-card sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper-50 px-6 py-7">
              <dt className="font-display text-3xl font-semibold text-ink-900">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-ink-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function PortraitCard() {
  return (
    <div className="relative mx-auto max-w-sm">
      <div className="absolute -inset-3 -rotate-2 rounded-[2rem] bg-brass-400/20" aria-hidden />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-ink-100 bg-gradient-to-br from-ink-800 to-ink-900 shadow-card-hover">
        {/* Placeholder portrait — swap for a real photo */}
        <div className="relative aspect-[4/5] w-full">
          <div className="absolute inset-0 bg-grain opacity-40" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-[7rem] font-semibold text-paper-50/90">
              {profile.initials}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-300">
              Former Managing Director
            </p>
            <p className="mt-1 font-display text-xl text-paper-50">Nomura</p>
          </div>
        </div>
      </div>
    </div>
  );
}
