# mertcendik

My personal website. Built with Next.js, TypeScript, and MDX. Live at [cendik.dev](https://cendik.dev).

## Features

- Search with ⌘K or Ctrl+K, across posts, projects, and links
- Page transitions with the View Transitions API: post titles move from the list into place, and everything else fades
- Light and dark themes, following the system or a manual choice
- MDX posts in `content/blog`, with small interactive demos
- Blog grouped by month, with reading time, RSS, and a copy-link button on each post
- Project cards that open the live site, with GitHub star counts
- Open Graph images generated per post, plus JSON-LD and a sitemap
- Reduced-motion support, skip-to-content, and tap targets sized for touch

## Tech stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS v4, with Base UI for the search dialog
- MDX, with syntax highlighting by `rehype-highlight`
- Phosphor icons
- Deployed on Cloudflare Workers with OpenNext

## Getting started

Node.js 20.9 or newer, and npm.

```bash
git clone https://github.com/mxrtcendik/mertcendik.git
cd mertcendik
npm install
npm run dev
```

Open `http://localhost:3000`.

Personal details live in `lib/constants.ts`: name, title, about, email, and `baseUrl`.

Before opening a pull request, run `npm run lint`, `npm run typecheck`, and `npm run build`. CI runs the same checks.

## Project structure

```
app/            Routes, metadata, social cards, RSS, sitemap, and the view count API
components/
  blog/         Post lists, links, navigation, share button, and view count
  home/         Sections on the home page
  layout/       Header, footer links, transitions, and other page-wide pieces
  mdx/          Components available inside posts, including the demos
  search/       The ⌘K search menu
  theme/        Theme provider, toggle, and browser theme color
  ui/           shadcn components
content/
  blog/         Posts, one .mdx file each
  projects/     Project pages
lib/            Data loading, constants, types, and helpers
migrations/     D1 schema for view counts
scripts/        Build-time scripts
e2e/            Playwright tests
public/         Static files
```

`lib/og-posts.ts` is generated from the posts on every `dev` and `build`. Don't edit it by hand.

## Using this as a starting point

The code is MIT licensed, so you're welcome to fork it. Before deploying your own copy:

1. Change the details in `lib/constants.ts`, and replace the posts and projects in `content/`.
2. Rename the Worker, R2 bucket, and D1 database in `wrangler.jsonc`, and create your own (see View counts below).
3. Copy `.env.example` to `.env.local` if you want analytics.

## Writing posts

Add an `.mdx` file to `content/blog/`:

```mdx
---
title: "Your post title"
date: "2026-10-27"
description: "One sentence for the list and the social card."
---

Write the post here.
```

The file name becomes the URL, so `my-post.mdx` is served at `/blog/my-post`. Keep the description under about 80 characters so it fits on one line in the lists. New posts show up in search after the dev server restarts, since the search index is generated when it starts.

## Project pages

A project in `lib/constants.ts` with `page: true` gets a page at `/projects/<name>`, written in `content/projects/<name>.mdx`. Its frontmatter can name a related post with `post: <slug>`. Screenshots go in `public/projects/<name>-light.png` and `<name>-dark.png`, and are listed in `app/projects/[name]/page.tsx`.

## View counts

Post views are stored in a D1 database called `mertcendik-views`, bound as `VIEWS_DB` in `wrangler.jsonc`. The table comes from `migrations/`. To set it up somewhere new:

```bash
npx wrangler d1 create mertcendik-views   # then put its id in wrangler.jsonc
npx wrangler d1 migrations apply mertcendik-views --local
npx wrangler d1 migrations apply mertcendik-views --remote
```

## Analytics

Cloudflare Web Analytics is off until a token is set. It uses no cookies. To turn it on, add the site in the Cloudflare dashboard under Web Analytics, copy the token from the snippet it shows, and set it at build time, for example in `.env.local`:

```bash
NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=your-token
```

The Content Security Policy in `next.config.ts` only allows Cloudflare's analytics domains when the token is set.

## Tests

```bash
npx playwright install chromium   # once
npm run test:e2e
```

The tests start the dev server if it isn't running. They check that every page loads without errors and passes axe accessibility checks in both themes, that nothing overflows a phone screen, and the parts that are easy to break: search, page scroll on arrival, old post URLs, demo layout, view counting, and the security headers.

## Deployment

```bash
npm run deploy
```

That builds the app with OpenNext and deploys it to Cloudflare Workers. To check the real Worker locally first, including the database and security headers, run `npm run preview`.

## License

The code is [MIT](LICENSE) licensed. The Inter font embedded in `lib/og-font.ts` for social cards is under the [SIL Open Font License](https://github.com/rsms/inter/blob/master/LICENSE.txt).
