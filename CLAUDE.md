# Hobby Wiki — Claude Development Guide

## Project Overview
Personal hobby blog/wiki for Ronja's two hobbies: **lysstøping** (candle making) and **smykkelaging** (jewelry making). Public-facing website where visitors can browse posts, images, and stories. Only admins can create/edit content. Hosted online (not local).

## Tech Stack
- **Framework:** Next.js 15 (App Router, TypeScript, Server Components)
- **UI:** shadcn/ui + Tailwind CSS v4
- **Database:** PostgreSQL via Drizzle ORM (Neon serverless, Frankfurt)
- **Auth:** NextAuth.js v5 + Google OAuth (admin role system)
- **Images:** Vercel Blob Storage (with auto-compression to stay within 1 GB)
- **Animations:** Framer Motion (with `prefers-reduced-motion` support)
- **Rich Text Editor:** Tiptap
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Hosting:** Vercel Hobby ($0)
- **Repo:** GitHub (CI/CD via Vercel integration)

## Architecture
- **Route groups:** `(admin)/` for authenticated admin pages, `(public)/` for everyone
- **Server Components** by default. `'use client'` only for interactivity and animations.
- **Server Actions** for mutations. No REST API layer.
- **Role-based access:** `role` column on `users` table (values: `'admin'` | `'user'`). Only admins can mutate content.
- **`lib/`** = pure business logic, no framework imports

## Route Structure
```
/                  — Om siden: intro til Ronja og hobbyene, 3-4 nyeste innlegg, CTA til /start
/start             — Matrix-inspirert pill-valg (lilla = lys, turkis = smykker)
/lys               — Lysstøping-verden (bento-grid + masonry)
/lys/[slug]        — Enkelt lysstøping-innlegg (magazine-stil)
/smykker           — Smykke-verden (bento-grid + masonry)
/smykker/[slug]    — Enkelt smykke-innlegg (magazine-stil)
/admin             — Admin dashboard (kun admins)
/admin/ny          — Nytt innlegg editor
/admin/innlegg/[id] — Rediger innlegg
/admin/brukere     — Administrer andre admins
/login             — Google OAuth innlogging
```

## Key Conventions
- All UI text in **Norwegian** (no i18n needed — single language).
- URL slugs in Norwegian: `/lys`, `/smykker`, `/start`, `/admin`, `/om`
- Post slugs are auto-generated from title: "Mitt første lys" → `/lys/mitt-forste-lys`
- Dates stored as ISO strings `yyyy-mm-dd`. Display as `d. MMMM yyyy` (nb-NO format).
- Image URLs always via Vercel Blob (never external hotlinking).
- Color tokens per hobby: `--color-lys-*` (lilla) and `--color-smykker-*` (turkis).

## Design System
- **Primary palette:** lilla (lysstøping) + turkis (smykkelaging) + lyseblå (neutral)
- **Feel:** Subtil med personlighet — glassmorphism, animerte blomster, voks-drypp loading
- **Motion:** All animasjon respekterer `prefers-reduced-motion`
- **Typography:** To fonter — én elegant serif + én moderne sans-serif (fra Google Fonts)
- **Layout patterns:** Bento (hobby-forside), Masonry (bla-visning), Magazine (post-detaljer)

## Constraints
- NEVER expose admin routes without `auth()` + admin role check
- NEVER upload images > 2 MB to Vercel Blob — compress first
- NEVER skip `prefers-reduced-motion` check in animations
- NEVER hardcode hobby strings — use `'lys' | 'smykker'` union type
- NEVER commit `.env.local` or `.env` — secrets only in Vercel env vars
- Vercel Blob free tier: 1 GB storage — aim for ≤300 KB per image average

## Database
Schema: `src/db/schema.ts` (planned tables: users, accounts, sessions, posts, images, tags, posts_tags)
Push changes: `npx drizzle-kit push`
Connection: `@neondatabase/serverless` HTTP driver

## Test Strategy
- `npm test` — Vitest (unit + integration)
- `npm run test:e2e` — Playwright
- Coverage targets: 90% for auth/admin logic, 70% for UI

## Skills
36 skills in `.claude/skills/`. Key ones:
- `project-init` — Next.js + Neon + Vercel setup
- `google-oauth` — NextAuth with Google + admin role
- `design-system` — Colors, typography, spacing
- `fargevalg` — Fargeteori, semantikk, harmonier, konsistens
- `ux-prinsipper` — NN/g, Apple HIG, content writing, UI conventions
- `forside-pill-valg` — Matrix-stil pill-valg på /start
- `animasjoner-bevegelse` — Framer Motion patterns with reduced-motion
- `qa-hobby-wiki` — Quality gate checklist

## Domain Knowledge
- `lysstoping-domene` — Vokstyper, veker, duftoljer, problemer — fyll inn med *dine* teknikker senere
- `smykkelaging-domene` — Materialer, perler, teknikker, findings — fyll inn med *dine* metoder senere

## Current State
Fase 0: Skills og domenekunnskap under oppsett.
Next: Fase 1 — project-init, database-schema, google-oauth, design-system, deploy.
