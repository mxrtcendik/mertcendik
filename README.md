# mertcendik

My personal website. Built with Next.js, TypeScript, and MDX. Live at [cendik.dev](https://cendik.dev).

## Features

- Next.js 16 (App Router) and React 19
- Tailwind CSS v4
- Light and dark themes, following the system or a manual choice
- MDX posts in `content/blog`, including small interactive examples
- Syntax highlighting with `rehype-highlight`
- Reading time, RSS, and copy-link on each post
- GitHub star counts on project rows
- Open Graph images, Twitter cards, JSON-LD, and a sitemap
- Skip-to-content, semantic headings, and reduced-motion support

## Tech stack

- Next.js 16
- TypeScript
- Tailwind CSS v4 and shadcn/ui
- MDX
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

## Deployment

```bash
npm run deploy
```

That builds the app with OpenNext and deploys it to Cloudflare Workers.

## License

[MIT](LICENSE)
