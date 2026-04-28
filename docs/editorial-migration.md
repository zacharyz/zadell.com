# Editorial-Archival Migration

Sequenced design pass to shift zadell.com from its current "rough / sketchy / chess-red" aesthetic to a quieter, essay-led personal site. Borrows the Editorial structural family (hairline rules, single-accent restraint, generous whitespace) but the register is casual — closer to Craig Mod's writing platform than a publication or a portfolio.

## Goal

Replace the current visual register with a personal-essay site that reads as quiet and considered, not theatrical or monographic:

- Foregrounds long-form writing as the site's primary purpose
- Borrows structural discipline from Editorial-family designs (hairlines, single-accent restraint, near-zero radii, generous negative space) — but pitched casual, not "1960s university press"
- Image-forward where the content invites it: post covers, inline photography in essays, Craig-Mod-style breathing room around images
- Keeps the existing Escher logo as a recurring graphic motif
- Drops the "portfolio / services / I do X for clients" framing — this is a personal site, not a business surface
- Drops dark mode entirely; light register only

## Sitemap shift

The migration also reshapes the site's surfaces:

- **Stay**: `/` (essay-led home), `/about` (who I am), `/blog`, `/blog/[slug]`, `/contact`
- **Delete**: `/portfolio`, `/services`, `/experiments` — outright removal of the route directories and any nav links

## Sequencing

Phases are independently shippable. Earlier phases change less; later phases are the visible aesthetic shift.

### Phase 1 — Tokens *(landed)*

Add the Editorial-Archival palette to `globals.css` and Tailwind config without changing any rendered surfaces yet. Lets later phases reference tokens cleanly.

- CSS custom properties on `:root`:
  - `--ground-page: #F0EFE9`
  - `--ground-raised: #F8F7F2`
  - `--ink-primary: #1F1F1B`
  - `--ink-secondary: #4A4A45`
  - `--ink-dim: #8A8A82`
  - `--accent-olive: #6B7A4F`
  - `--accent-olive-muted: rgba(107, 122, 79, 0.15)`
  - `--accent-leather: #8B6B47` (optional, only if used)
  - `--accent-slate: #5C6B7A` (optional, only if used)
  - `--rule-strong: rgba(31, 31, 27, 0.28)`
  - `--rule-subtle: rgba(31, 31, 27, 0.10)`
- `tailwind.config.ts` extended with `ground.*`, `ink.*`, `rule.*`, `accent.olive`, `accent.olive.muted`, `accent.leather`, `accent.slate`.
- Tokens added to `:root` only — no `.dark` variants, since dark mode is being removed in Phase 3.

### Phase 2 — Typography *(landed)*

Replace the current font setup with a typography stack appropriate to a quiet personal essay site.

- Body: Inter (sans) — utility surfaces, eyebrows, captions
- Display / section titles: Fraunces (serif) by default, with the option to swap for Source Serif Pro or Tiempos Text if Fraunces feels too "stylish" for the casual Craig-Mod register. Decide during Phase 4 once real content is rendering.
- Numerals / utility / date stamps: Roboto Slab or a mono (SF Mono / JetBrains Mono) — pick one once Phase 4 reveals which feels right.
- Update font loaders in `src/app/layout.tsx`
- Define Tailwind `fontFamily` entries: `font-display`, `font-body`, `font-mono`
- No content changes; existing pages continue rendering in old fonts until Phase 3 strips the legacy CSS.

### Phase 3 — Strip current visual surface + remove dark mode *(landed)*

Remove the existing aesthetic surface *and* the dark-mode plumbing so Phase 4 doesn't have to fight either.

**Visual filters / chess-red register:**

- Drop `rough`, `ink-sketch`, `strange-loop` CSS classes from `globals.css`
- Remove the SVG `rough-edge` filter (find and delete the `<filter>` definition)
- Remove rotation utilities applied to headings (`rotate-1` etc.)
- Remove the chess-red `--primary` token (and its dark variant — see below)
- Remove "Manuscripts from The Looking Glass" copy from blog index (`src/app/blog/page.tsx`)
- Replace remaining `--primary`-accented surfaces with `--accent-olive` (or strip outright pending Phase 4)

**Dark mode removal:**

- Drop the `.dark { ... }` block from `globals.css`
- Remove `darkMode: ["class"]` from `tailwind.config.ts`
- Delete `src/context/ThemeContext.tsx`
- Find and remove all `useTheme` / `ThemeProvider` imports and usages (likely in `src/app/layout.tsx` and any toggle UI)
- Remove any visible dark-mode toggle component
- Resolves the outstanding `react-hooks/set-state-in-effect` lint error in `ThemeContext.tsx` as a side effect

The site is deliberately plain at the end of Phase 3 — a single light register, no filters, no rotations. Phase 4 dresses it.

### Phase 4 — Blog index + post page restyle *(landed)*

Highest-leverage surface for the migration. The blog *is* the site now — the patterns established here propagate to home and about in Phase 5.

**Blog index (`src/app/blog/page.tsx`):**

- Background: `bg-ground-page`
- Replace serif rotated header with a quieter hairline-rule treatment:
  - Mono eyebrow (`zadell.com · essays`)
  - Serif title in the chosen display font
  - Optional short description below
- Posts list: each post as a hairline-bordered card on `--ground-raised`
  - Cover image at top (16:9) when present; placeholder otherwise
  - Mono date stamp + reading time
  - Serif title
  - Sans description in `--ink-secondary`
  - Optional tag list in mono `--ink-dim`
- No "READ MORE →" CTA — the entire card is a link; hover lifts subtly (border darkens, no transform)

**Post page (`src/app/blog/[slug]/page.tsx`):**

- Background: `bg-ground-raised` for long-form reading (slightly lighter than index)
- Hairline `← back to essays` link at top
- Cover image rendering (when `coverImage` frontmatter is set), 16:9, hairline border, generous breathing room above and below — Craig-Mod-style
- Header: mono date + reading time, hairline rule, serif title, sans lede
- Body: long-form `prose` styling
  - Generous line-height (1.7+)
  - Serif h2 / sans h3
  - Olive accent on links and inline emphasis
  - Hairline blockquote treatment
  - Inline images breathe — don't crop tight, don't overlay text
- Footer: tags + author byline ("by Zach")

**Frontmatter migration:**

- Add optional `tags: string[]` and `coverImage: string` to the parser in `src/utils/blog.ts`
- Existing posts continue to work without these fields
- Update `BlogPost` type in `src/types/blog.ts`

### Phase 5 — Home, about, contact (and deletions) *(landed)*

Apply Phase 4 patterns to the remaining surfaces. Smaller scope than the original plan: portfolio and services are out.

- **Home** (`src/app/page.tsx`): essay-led — most recent posts surface immediately, minimal chrome above. Single olive accent. No "what I do for clients" framing. A small `about` blurb is fine; the rest is essays.
- **About** (`src/app/about/page.tsx`): long-form reading layout, optional drop caps. Same body styling as posts. "Who I am," not a CV.
- **Contact** (`src/app/contact/page.tsx`): spare form treatment — labels in mono eyebrow, inputs with hairline borders, single olive submit button. Probably keep the Resend wiring as-is; only the surface changes.
- **Delete**: `src/app/portfolio/`, `src/app/services/`, `src/app/experiments/` directories. Remove any nav references. If anything links inbound (including the `/experiments/health-calculator` static route currently in the build), decide between 301 redirects or just 404.

### Phase 6 — Logo integration as motif

The Escher logo has personality the rest of the site can borrow from. Use it beyond the header.

- Section dividers in long-form posts (small medallion, scaled down to ~24px, centered)
- Drop caps on the first paragraph of posts (logo as decorative initial — optional, possibly too far)
- Margin ornament at section breaks
- Decision: monochrome (always black) is more disciplined and matches the logo's existing treatment.

Defer this phase if Phase 5 leaves the site looking complete enough — logo motif is polish, not necessary structure.

### Phase 7 — New posts (separate scoping)

The visual migration doesn't depend on new content; existing posts continue to work. New writing is its own sequencing question — what topics, what cadence, what's the editorial voice. Defer to its own doc when the visual layer settles.

## Open questions

- **Display font**: Stay on Fraunces, or shift to Source Serif Pro / Tiempos Text for a softer Craig-Mod register? Fraunces leans slightly stylish. Decide during Phase 4 based on how it feels against real content.
- **Existing post frontmatter migration**: Add `coverImage` to the existing 7 posts (with generated covers via `npm run blog:cover`)? Or grandfather them coverless and only commit cover convention going forward? Generating all 7 ≈ $0.30 — trivial cost, real time investment.
- **Hero treatment on blog index**: Newest post gets feature treatment (large cover + serif headline) or all posts equal-weight in a uniform list? Equal-weight is more disciplined; feature treatment is more inviting.
- **Inbound links to deleted pages**: Are there any external links to `/portfolio`, `/services`, or `/experiments/health-calculator`? If so, decide between 301 redirects (to `/about`?) or just 404.

## Decisions locked in

- **Dark mode**: dropped. Single light register only. Removes the `.dark` block, `ThemeContext`, the `darkMode` Tailwind config, and any toggle UI.
- **Sitemap**: home + about + blog + contact. Portfolio, services, and experiments are deleted.
- **Voice**: casual personal site, not "1960s university press monograph." The structural bones (hairlines, single accent, restrained type) still serve that voice — only the framing copy changes.
- **Accent color**: olive `#6B7A4F` reads neutral enough — locked in as the single accent. No second accent unless the system asks for one.
- **API audit**: `/api/blog` and `/api/hasBlogPosts` deleted. `src/utils/cache.ts` and the `hasBlogPosts()` helper deleted along with them. Only `/api/send` remains (contact form).
- **Rendering strategy**: blog pages now pure SSG — `force-dynamic` and `revalidate` removed from `/blog` and `/blog/[slug]`. Posts are markdown in the repo, so updates require a redeploy anyway; ISR adds nothing. Drafts still excluded from production via the build-time `NODE_ENV` filter.

## Risks

- **Intermediate visual states between phases.** Phases 1–3 leave the site in transitional registers. Ship them close together (one PR per phase, merged in sequence over a week) rather than letting a phase sit in production half-done.
- **Display font cost / sourcing.** A custom display font (vs. Fraunces from Google Fonts) is its own licensing and loading decision. Defaults are fine; only pursue alternatives if Phase 4 reveals Fraunces doesn't carry the voice.
- **Cover image cost across migration.** Generating covers for the existing 7 posts ≈ $0.30. Trivial. Worth budgeting time, not money.
- **Tailwind v3 vs. v4.** zadell is on Tailwind 3.4; Threshold is on 4.x. Token wiring patterns differ slightly between versions — copy from Threshold but verify v3 syntax.

## Verification checklist

- **Phase 1** *(done)*: `globals.css` and `tailwind.config.ts` have all new tokens; existing surfaces render identically; no new visual changes.
- **Phase 2** *(done)*: New typography stack (Fraunces / Inter / Roboto Slab) loads on all routes.
- **Phase 3** *(done)*: No `rough` / `ink-sketch` / `strange-loop` classes anywhere; no rotated headlines; no chess red. No `.dark` block, no `ThemeContext`, no `darkMode` Tailwind config, no toggle UI. `npm run lint` passes clean.
- **Phase 4** *(done)*: `/blog` and `/blog/[slug]` render in the new aesthetic; `tags` / `coverImage` / reading time / `draft: true` frontmatter wired up; existing 7 posts deleted, four draft outlines staged for new writing.
- **Phase 5** *(done)*: Home + about + contact match Phase 4 patterns. Navbar and Footer aligned to editorial tokens. Body bg switched to `bg-ground-page`. `/portfolio`, `/services`, and `/experiments` directories deleted; no broken nav references.
- **Phase 6** (if pursued): Escher logo appears as section motif in at least one place beyond the header.
