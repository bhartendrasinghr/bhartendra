import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { posts, getPost, formatDate, profile } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Essay not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date
    }
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[idx + 1] ?? posts[0];

  return (
    <>
      <Nav />
      <main>
        <article>
          {/* Header */}
          <header className="relative overflow-hidden border-b border-ink-100">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-brass-400/15 blur-3xl" />
              <div className="absolute inset-0 bg-grain opacity-60" />
            </div>
            <div className="relative mx-auto max-w-2xl px-6 pb-14 pt-36 sm:px-8 sm:pt-44">
              <Link
                href="/writing"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition hover:text-brass-600"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M19 12H5" /><path d="m11 18-6-6 6-6" />
                </svg>
                All essays
              </Link>
              <div className="mt-6 flex items-center gap-3 text-xs text-ink-400">
                <span>{formatDate(post.date)}</span>
                <span className="h-1 w-1 rounded-full bg-ink-300" />
                <span>{post.readingTime}</span>
                <span className="h-1 w-1 rounded-full bg-ink-300" />
                <span className="text-brass-600">{post.tags.join(", ")}</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 text-balance sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-xl leading-relaxed text-ink-500 text-pretty">
                {post.excerpt}
              </p>
            </div>
          </header>

          {/* Body */}
          <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
            <div
              className="prose-essay"
              dangerouslySetInnerHTML={{ __html: post.body.join("\n") }}
            />

            {/* Byline */}
            <div className="mt-14 flex items-center gap-4 border-t border-ink-100 pt-8">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-brass-500/40 bg-brass-500/10 font-display text-base font-semibold text-brass-600">
                {profile.initials}
              </span>
              <div>
                <p className="font-semibold text-ink-900">{profile.name}</p>
                <p className="text-sm text-ink-500">{profile.role}</p>
              </div>
            </div>
          </div>
        </article>

        {/* Next essay */}
        <section className="border-t border-ink-100 bg-paper-100">
          <div className="mx-auto max-w-2xl px-6 py-14 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
              Next essay
            </p>
            <Link href={`/writing/${next.slug}`} className="group mt-3 block">
              <h3 className="font-display text-2xl font-semibold leading-snug text-ink-900 transition group-hover:text-brass-600">
                {next.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-600">{next.excerpt}</p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
