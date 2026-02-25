# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 blog built with App Router, MDX content support, TypeScript (strict), and Tailwind CSS v4. Uses pnpm as the package manager.

## Important

- **Always use `pnpm`** — Never use `npm` or `yarn`. All install, run, and script commands must use `pnpm`.
- **Server components first** — Maximize SSR for SEO. Use `'use client'` only at the deepest leaf component that truly needs interactivity. Parent/wrapper components must stay as server components.

## Commands

- `pnpm dev` — Start dev server with hot reload
- `pnpm build` — Production build
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint

No test framework is configured yet.

## Architecture

- **App Router** — All routes live in `app/`. Dynamic blog posts at `app/blog/[slug]/page.tsx`.
- **MDX** — Configured via `@next/mdx` in `next.config.ts`. Pages can be `.md`, `.mdx`, `.ts`, or `.tsx`. Custom component overrides go in `mdx-components.tsx` (root).
- **Styling** — Tailwind CSS v4 via PostCSS. Global styles in `app/globals.css`. Dark mode via `prefers-color-scheme`. Geist Sans/Mono fonts loaded in `app/layout.tsx` as CSS variables.
- **Path alias** — `@/*` maps to the project root (configured in `tsconfig.json`).
- **SEO** — `robots.ts` at project root defines robots metadata (domain placeholder needs updating).
