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

If no content has been saved yet, the site falls back to the built-in defaults
in `lib/content.ts`, so it always renders even before the first save.

## Content storage

The content store auto-selects its backend (`lib/content.ts`):

- **Vercel Blob** when `BLOB_READ_WRITE_TOKEN` is set — content is read from and
  written to a `content.json` blob. This is the production path on Vercel.
- **Local file** (`data/content.json`) otherwise — used for local development
  and for persistent Node hosts.

## Deploy to Vercel

1. Import the repo into Vercel (framework preset: **Next.js**, no extra config).
2. In the project, go to **Storage → Create → Blob** and connect a Blob store.
   Vercel injects `BLOB_READ_WRITE_TOKEN` automatically.
3. Add the admin environment variables under **Settings → Environment Variables**:
   - `ADMIN_PASSWORD` — the password for `/admin`
   - `ADMIN_SECRET` — a long random string for signing the session cookie
4. Redeploy. Visit `/admin`, sign in, and your edits now persist in Blob across
   deployments and across all serverless instances.

No `output: export` / static-export config is used, so the App Router server
features (the admin API routes and dynamic content) run as Vercel Functions.

## Tech

- Next.js 14 App Router, React 18, TypeScript
- Tailwind plus a hand-written design system in `app/globals.css`
- Fonts: Spectral, Hanken Grotesk, IBM Plex Mono (via `next/font`)
- File-backed content store (`lib/content.ts`) with an HMAC-signed cookie session (`lib/auth.ts`)
