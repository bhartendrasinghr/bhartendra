import Link from "next/link";
import { posts, formatDate } from "@/lib/content";

export function WritingPreview() {
  const latest = posts.slice(0, 3);

  return (
    <section id="writing" className="scroll-mt-24 border-t border-ink-100 bg-ink-900 text-paper-50">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-brass-400/10 blur-3xl" />
          <div className="absolute inset-0 bg-grain opacity-30" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brass-300">
                <span className="h-px w-8 bg-brass-400" />
                The Weekly Essay
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-balance">
                Notes on markets, leadership, and judgment.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-200">
                A short essay every week — the kind of thinking I&rsquo;d share with a
                student over coffee. No jargon, no hot takes. Just what two
                decades on the inside taught me.
              </p>
            </div>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 rounded-full border border-paper-50/20 px-5 py-2.5 text-sm font-medium text-paper-50 transition hover:border-brass-400 hover:text-brass-300"
            >
              All essays
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-paper-50/10 bg-paper-50/10 md:grid-cols-3">
            {latest.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="group flex flex-col bg-ink-900 p-7 transition hover:bg-ink-800"
              >
                <div className="flex items-center gap-3 text-xs text-ink-300">
                  <span>{formatDate(post.date)}</span>
                  <span className="h-1 w-1 rounded-full bg-ink-500" />
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-paper-50 transition group-hover:text-brass-300">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-200">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brass-300">
                  Read essay
                  <svg className="transition group-hover:translate-x-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
