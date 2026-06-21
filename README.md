# Eight Bridges — Krishnan Ranganathan

Marketing site for **Eight Bridges**, the capital-markets and risk programmes
designed and taught by Krishnan Ranganathan. Built with Next.js 14 (App Router)
and a small file-backed CMS so all page content can be edited from a password
protected admin, with no external database.

## Pages

- **Home** (`/`) — hero, stats, about preview, the Eight Bridges grid, authority band, insights teaser, contact CTA.
- **About** (`/about`) — profile narrative, career timeline, credentials, and a tabbed Speaking & Faculty record.
- **Courses** (`/courses`) — the eight programmes plus a featured deep-dive (Bridge 3).
- **Insights** (`/insights`) — featured piece plus a category-filterable grid.
- **Contact** (`/contact`) — contact methods and a mailto-based enquiry form.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build & run

```bash
npm run build
npm start
```

## Admin

Content is managed at **`/admin`**. Sign in with the admin password, edit any
section across the six tabs (Site, Home, About, Courses, Insights, Contact),
then **Save changes**. Saved content is written to `data/content.json` and the
public pages render from it on the next request.

Configure two environment variables (see `.env.example`):

```
ADMIN_PASSWORD=your-strong-password   # required to sign in
ADMIN_SECRET=a-long-random-string     # signs the session cookie
```

If no content file exists yet, the site falls back to the built-in defaults in
`lib/content.ts`, so the site always renders even before the first save.

### Deployment note

The admin writes to the local filesystem (`data/content.json`), which works on
any persistent Node host (a VPS, a container with a mounted volume, etc.). On
read-only or ephemeral serverless filesystems (such as Vercel's), saves will not
persist between requests — host on a platform with a writable, persistent disk,
or swap `lib/content.ts` for a database-backed store.

## Tech

- Next.js 14 App Router, React 18, TypeScript
- Tailwind plus a hand-written design system in `app/globals.css`
- Fonts: Spectral, Hanken Grotesk, IBM Plex Mono (via `next/font`)
- File-backed content store (`lib/content.ts`) with an HMAC-signed cookie session (`lib/auth.ts`)
