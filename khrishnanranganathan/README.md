# khrishnanranganathan.com

Personal site for **Krishnan Ranganathan** — former Managing Director at Nomura,
now a freelance educator and guest lecturer for business-school students.

The site presents his credentials, the programmes he teaches, and his weekly
essays. Built with **Next.js 14** (App Router), **TypeScript**, and **Tailwind
CSS**. It is a self-contained project, independent of the rest of the repository.

## Develop

```bash
cd khrishnanranganathan
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Editing content

All copy lives in a single file — [`lib/content.ts`](lib/content.ts):

- `profile` — name, role, tagline, bio, email, social links
- `stats` — the four headline numbers in the hero
- `highlights` — the career / credentials timeline
- `programmes` — the teaching offerings shown under **Teaching**
- `posts` — the weekly essays (each becomes a page at `/writing/<slug>`)

Add a new essay by appending an entry to `posts`; the index and the route are
generated automatically.

> The portrait in the hero is a placeholder monogram. Drop in a real photo by
> replacing the `PortraitCard` block in [`components/Hero.tsx`](components/Hero.tsx).

## Sections

- **Hero** — name, role, tagline, headline stats.
- **About** — bio plus a career & credentials timeline (Nomura MD and earlier).
- **Teaching** — the programmes he brings to business schools.
- **Writing** — preview of the latest essays, with a full archive at `/writing`.
- **Contact** — engagement options and direct contact details.

## Deploy

This site is deployed on **Vercel**. Because it lives in a subfolder of the
repository, the only non-default step is pointing Vercel at the right directory.

### One-time setup

1. In Vercel, **Add New → Project** and import the
   `bhartendrasinghr/bhartendra` repository.
2. Under **Root Directory**, click *Edit* and select **`khrishnanranganathan`**.
   This is the important bit — it tells Vercel to build this app rather than the
   podcast site at the repo root.
3. Leave the rest as detected — Vercel recognises Next.js automatically:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build` (default)
   - **Install Command:** `npm install` (default)
   - **Output:** managed by Vercel
4. Add the production domain **`khrishnanranganathan.com`** (and `www`) under
   **Settings → Domains**, then point the domain's DNS at Vercel
   (an `A` record to Vercel's IP, or a `CNAME` to `cname.vercel-dns.com`).

### Deploys

Once connected, every push to `main` ships to production and every other branch
(including this PR's branch) gets a preview URL automatically. No extra
configuration files are needed; the essay pages are statically generated at
build time.

> The repo's existing `.github/workflows/nextjs.yml` deploys the **root**
> podcast app to GitHub Pages and is unaffected by this project.
