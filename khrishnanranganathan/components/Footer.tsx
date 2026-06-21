import Link from "next/link";
import { profile } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-paper-100">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-3 text-base font-semibold text-ink-900"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-brass-500/40 bg-brass-500/10 font-display text-sm font-semibold text-brass-600">
                {profile.initials}
              </span>
              {profile.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-500">
              {profile.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                Explore
              </p>
              <ul className="mt-3 space-y-2 text-ink-600">
                <li><a href="/#about" className="hover:text-brass-600">About</a></li>
                <li><a href="/#teaching" className="hover:text-brass-600">Teaching</a></li>
                <li><Link href="/writing" className="hover:text-brass-600">Writing</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                Connect
              </p>
              <ul className="mt-3 space-y-2 text-ink-600">
                <li><a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-brass-600">LinkedIn</a></li>
                <li><a href={profile.social.twitter} target="_blank" rel="noreferrer" className="hover:text-brass-600">X / Twitter</a></li>
                <li><a href={`mailto:${profile.email}`} className="hover:text-brass-600">Email</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                Based in
              </p>
              <p className="mt-3 text-ink-600">{profile.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-100 pt-6 text-xs text-ink-400">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
