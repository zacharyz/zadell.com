# CLAUDE.md

This file provides guidance to Claude Code when working in zadell.com.

## Project Overview

zadell.com is Zach's personal website + blog. Long-form essay content (engineering, startups, training), a basic "about" landing for visitors who want to know who I am, and a contact form. Not a portfolio or services surface — explicitly a personal writing platform. Solo-author project, no other contributors.

The migration to a quieter, essay-led aesthetic (see `docs/editorial-migration.md`) deletes the existing `/portfolio`, `/services`, and `/experiments` route directories. They still exist on disk during the transition; treat them as scheduled for removal in Phase 5.

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript, React 19
- **Styling**: Tailwind CSS 3.4 + `@tailwindcss/typography`
- **Content**: Static markdown in `src/content/blog/`, parsed via `gray-matter`
- **Markdown rendering**: `markdown-to-jsx`
- **UI components**: Radix UI + shadcn primitives
- **Animation**: framer-motion
- **Email**: Resend (contact form)
- **Image generation**: OpenAI `gpt-image-2` via `scripts/generate-cover.mjs`

## Common Commands

```bash
npm install                                # Install dependencies
npm run dev                                # Start dev server
npm run build                              # Production build
npm run lint                               # Lint
npm run blog:cover -- <slug> --dry-run     # Preview cover prompt only
npm run blog:cover -- <slug>               # Generate cover (~$0.04, ~2 min)
```

## Directory Structure

```
src/
  app/
    blog/                  # Blog index + [slug] post page
    api/
      blog/                # Blog API routes
      hasBlogPosts/        # Helper endpoint
      send/                # Contact form (Resend)
    about/
    portfolio/
    contact/
    experiments/
    services/
  components/
    ui/                    # Radix / shadcn primitives
  content/
    blog/<slug>.md         # Posts (frontmatter + body)
  context/
  lib/utils.ts
  types/blog.ts            # BlogPost type
  utils/blog.ts            # getAllPosts, getPostBySlug
public/
  images/                  # Profile, logos
  images/blog/<slug>/      # Per-post images (added by cover script)
scripts/
  generate-cover.mjs       # Cover image generation script
```

## Post Frontmatter

Existing posts use the minimal shape:

```yaml
---
title: "..."
date: "YYYY-MM-DD"
description: "..."
---
```

`src/utils/blog.ts` currently throws on missing `title` / `date` / `description`. The Editorial migration may add optional `tags` and `coverImage` fields — keep them optional so existing posts don't need updating before the new utility ships.

## Aesthetic Direction — Editorial-Archival (casual register)

Adopting an Editorial-derived aesthetic with an **olive + greys + off-whites** palette. Distinct from both NYT-Editorial (white + burgundy) and Threshold's Field Manual (warm cream + terracotta). Pitched casual rather than monographic — closer to Craig Mod's personal writing platform than a publication. The structural moves (hairlines, single-accent restraint, near-zero radii, generous whitespace) serve a quiet personal essay register, not a university press one.

Light register only — dark mode is being removed in Phase 3.

### Palette tokens

| Token | Value |
|---|---|
| Page ground | `#F0EFE9` (cool off-white, archival paper) |
| Raised surface | `#F8F7F2` (slightly lighter for cards) |
| Ink primary | `#1F1F1B` (near-black with olive undertone) |
| Secondary text | `#4A4A45` (charcoal) |
| Dim text | `#8A8A82` (mid-grey) |
| Accent (olive) | `#6B7A4F` (sage-olive) |
| Accent muted | `rgba(107, 122, 79, 0.15)` |
| Optional (leather) | `#8B6B47` |
| Optional (slate) | `#5C6B7A` |

### Typography

- Display / section titles: Fraunces (serif) — same as Threshold for cross-project family resemblance. Open question whether to swap for something more idiosyncratic (Tiempos Headline, Domaine Display, GT Sectra).
- Body: Inter (sans)
- Numerals / utility: Roboto Slab
- Mono: SF Mono / JetBrains Mono for date stamps + eyebrow text

### Structure

- Hairline rules instead of solid borders
- Near-zero radii (0 / 2 / 2px)
- No shadows
- One accent per surface
- Generous negative space

### Logo

The existing Escher logo (`public/images/logo_zz_escher.jpg` and dark variant) is the canonical brand mark — pure black ink, isometric impossible-figure, circular medallion. Stays through the migration. Optional integration as section dividers, drop caps, or margin ornaments — see `docs/editorial-migration.md` Phase 6.

## Cross-Repo Reference

Threshold (`~/dev/fitness-os`) is the canonical reference for Field-Manual-family design patterns:
- Token structure in `app/globals.css`
- Long-form blog implementation in `app/blog/` and `lib/blog.ts`
- Editorial theme tokens in `app/sandbox/themes.ts` (the `editorial` entry — basis for zadell's palette)
- Cover script pattern in `scripts/generate-cover.mjs`

When implementing the migration, copy and adapt rather than re-derive. Threshold uses warm-cream FM aesthetic; zadell adopts cooler off-white Editorial-Archival. Same structural discipline, different palette.

## Workflow

- **Commit style**: imperative subject line, max ~72 chars. Body explains why where useful.
- **Pre-commit**: `npm run lint` should pass.
- **Don't push without a build**: `npm run build` succeeds before push.
- **Existing blog content** (`src/content/blog/`) stays as-is during migration. Visual changes don't require content rewrites.
- **Save plans to `docs/`** before non-trivial work — see `docs/editorial-migration.md` for the canonical migration plan.

## Known Issues / Open Threads

- Existing CSS uses `rough` / `ink-sketch` / `strange-loop` filter classes plus rotated headlines and a chess-red `--primary` token. All slated for removal in Phase 3 of the migration, alongside dark mode (`.dark` block, `ThemeContext`, `darkMode` Tailwind config, any toggle UI).
- Frontmatter is minimal — `coverImage` and `tags` aren't supported by the existing utility yet. Adding them is part of the blog-page restyle in Phase 4.
- API routes `/api/blog` and `/api/hasBlogPosts` exist but may be vestigial post-migration. Audit during Phase 5.
- Existing 7 posts have no cover images. Generating with the cover script costs ~$0.30 total — decide during Phase 4 whether to backfill or grandfather.
- `src/context/ThemeContext.tsx` triggers a `react-hooks/set-state-in-effect` lint error under ESLint 9. Resolves naturally when Phase 3 deletes the file.
