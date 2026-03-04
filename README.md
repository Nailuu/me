# nailu.dev

Personal portfolio and developer blog built with Next.js 16, App Router, MDX, and Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 16 (App Router, SSR-first)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Content:** MDX with custom components and syntax highlighting
- **Smooth Scroll:** Lenis


## Project Structure

```
app/
├── blog/          # Blog posts (MDX)
├── projects/      # Project showcases (MDX)
├── components/    # App components (nav, footer, theme, 3D, etc.)
├── og/            # Open Graph image generation
├── rss/           # RSS feed
├── sitemap.ts     # XML sitemap
└── config.ts      # Site metadata
components/ui/     # shadcn UI components
lib/               # Utilities
public/            # Static assets
```

## Features

- Dark/light mode with `next-themes`
- MDX blog and project pages with tag system
- Interactive 3D ASCII 404 easter egg (Three.js + WebGL shaders)
- RSS feed and XML sitemap
- Open Graph image generation
- Smooth scrolling (Lenis)