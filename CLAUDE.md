# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This project is the website for the product Cher Ami, a subscription photo magazine service. Users invite family and friends to a private "circle", contribute photos and stories through a mobile app, and at the start of each month those memories are shipped as a printed magazine to one or more recipients.

Key Product Features:
- $12.99/magazine.
- Up to 20 posts per magazine.
- Free shipping in the USA.
- No long-term commitment or cancellation fees.
- Satisfaction guarantee.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production (Next.js)
npm run lint         # Run ESLint
```

No test framework is configured.

## Architecture

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4, deployed to Cloudflare Workers via the OpenNextJS adapter (`@opennextjs/cloudflare`).

**Route groups:**
- `app/(main)/` — all public-facing pages sharing the main layout (header + footer). Homepage (`page.tsx`) is the primary marketing page.
- `app/(misc)/` — pages with non-site origins (such as `/feedback` and `/preferences`).
- `app/api/` — server-side API routes integrating OneSignal and support ticketing.

**Components** (`components/`) are small and purpose-built. Client components (marked `"use client"`) include `Header.tsx`, `EmailCTA.tsx`, `ContactClient.tsx`, and `StartClient.tsx`. Everything else is a server component by default.

**Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`. Brand colors are defined inline in `globals.css`: primary orange `#C15F3C`, dark `#242832`, off-white `#FCFBF8`. There's a custom `no-scrollbar` utility and a `slide-down` keyframe animation for the promo banner.

**Analytics & compliance:**
- Plausible analytics via `next-plausible`
- Facebook Pixel loaded conditionally via env var (`NEXT_PUBLIC_FACEBOOK_PIXEL_ID`)
- Termly CMP (`TermlyCMP.tsx`) for cookie consent
- Custom events tracked: `"Header CTA Pressed"`, `"Promo Banner Pressed"`

**Cloudflare deployment:** `wrangler.jsonc` defines the Workers config. The `open-next.config.ts` wraps Next.js for the Cloudflare runtime. Run `npm run preview` to test locally before deploying.

**Redirects** are defined in `next.config.ts`: `/ig`, `/tt`, `/fb`, `/yt` redirect to social media profiles, and `.well-known/apple-app-site-association` gets a custom content-type header for iOS universal links.

**Path alias:** `@/*` resolves to the repository root (configured in `tsconfig.json`).
