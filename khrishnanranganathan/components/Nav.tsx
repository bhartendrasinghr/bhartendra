import Link from "next/link";
import { profile } from "@/lib/content";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#teaching", label: "Teaching" },
  { href: "/writing", label: "Writing" },
  { href: "/#contact", label: "Contact" }
];

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-tight text-ink-900"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-brass-500/40 bg-brass-500/10 font-display text-sm font-semibold text-brass-600 transition group-hover:bg-brass-500/20">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ink-500 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ink-900">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-paper-50 transition hover:bg-ink-800"
        >
          Invite to speak
        </a>
      </div>
    </header>
  );
}
