import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { posts, formatDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "A weekly essay on markets, leadership, and judgment — from a former Nomura Managing Director turned educator."
};

export default function WritingIndex() {
  return (
    <>
      <Nav />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden border-b border-ink-100">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-brass-400/15 blur-3xl" />
            <div className="absolute inset-0 bg-grain opacity-60" />
          </div>
          <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-36 text-center sm:px-8 sm:pt-44">
            <p className="eyebrow justify-center">
              <span className="h-px w-8 bg-brass-500" />
              The Weekly Essay
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-ink-900 text-balance">
              Writing
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
              Short, honest essays on markets, leadership, and the judgment that
              actually decides outcomes. Published every week.
            </p>
          </div>
        </section>

        {/* List */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
          <ul className="divide-y divide-ink-100">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block py-8 transition"
                >
                  <div className="flex items-center gap-3 text-xs text-ink-400">
                    <span>{formatDate(post.date)}</span>
                    <span className="h-1 w-1 rounded-full bg-ink-300" />
                    <span>{post.readingTime}</span>
                    <span className="h-1 w-1 rounded-full bg-ink-300" />
                    <span className="text-brass-600">{post.tags.join(", ")}</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink-900 transition group-hover:text-brass-600">
                    {post.title}
                  </h2>
                  <p className="mt-2 leading-relaxed text-ink-600">{post.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brass-600">
                    Read essay
                    <svg className="transition group-hover:translate-x-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
