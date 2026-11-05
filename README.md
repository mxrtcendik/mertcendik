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

Node.js 20 or newer, and npm.

```bash
git clone https://github.com/mxrtcendik/mertcendik.git
cd mertcendik
npm install
npm run dev
```

Open `http://localhost:3000`.

Personal details live in `lib/constants.ts`: name, title, about, email, and `baseUrl`.

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

## Deployment

```bash
npm run deploy
```

That builds the app with OpenNext and deploys it to Cloudflare Workers.

## License

[MIT](LICENSE)
