#!/usr/bin/env node
/**
 * Generate a cover image for a blog post using OpenAI's gpt-image-2.
 *
 * Usage:
 *   npm run blog:cover -- <slug>
 *   npm run blog:cover -- <slug> --subject "an open journal in window light"
 *   npm run blog:cover -- <slug> --dry-run
 *
 * Defaults:
 * - Subject is read from the post's frontmatter `description`. Override with --subject.
 * - Style is the zadell.com Editorial-Archival aesthetic (casual register) —
 *   Editorial structure (hairlines, restrained composition, single-accent
 *   discipline) with an olive + greys + off-whites palette. Quiet,
 *   considered, image-led — closer to Craig Mod than to a university press.
 * - Output: 1536×1024 PNG saved to public/images/blog/<slug>/cover.png
 *
 * Cost: ~$0.04 per high-quality 1536×1024 image. Use --dry-run to preview the
 * prompt first (no API call, no cost).
 *
 * Env:
 *   OPENAI_API_KEY (required) — direct OpenAI key.
 *   The npm script loads .env via Node's `--env-file` flag.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import OpenAI from 'openai';
import matter from 'gray-matter';

const args = parseArgs(process.argv.slice(2));

if (!args.slug) {
  console.error('Usage: npm run blog:cover -- <slug> [--subject "..."] [--dry-run]');
  process.exit(1);
}

const postPath = path.join(process.cwd(), 'src/content/blog', `${args.slug}.md`);
if (!fs.existsSync(postPath)) {
  console.error(`Post not found at ${postPath}`);
  process.exit(1);
}

const { data: frontmatter } = matter(fs.readFileSync(postPath, 'utf-8'));
const subject = args.subject || frontmatter.description || frontmatter.title || '';
const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];

if (!subject) {
  console.error('No subject available — pass --subject "..." or add a description to the post frontmatter.');
  process.exit(1);
}

const prompt = buildCoverPrompt({ subject, tags });

console.log('━━━ Prompt ━━━');
console.log(prompt);
console.log('━━━━━━━━━━━━━\n');

if (args.dryRun) {
  console.log('Dry run — no API call.');
  process.exit(0);
}

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY not set in env or .env file.');
  process.exit(1);
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log('Generating cover (~30s)…');
const t0 = Date.now();

const result = await client.images.generate({
  model: 'gpt-image-2',
  prompt,
  size: '1536x1024',
  n: 1,
  quality: 'high',
});

const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
const b64 = result.data?.[0]?.b64_json;
if (!b64) {
  console.error('No image data returned from OpenAI.');
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}

const outDir = path.join(process.cwd(), 'public/images/blog', args.slug);
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'cover.png');
fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));

const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
console.log(`\n✓ Saved ${outPath} (${sizeKb} KB, ${elapsed}s)`);
console.log(`\nReference in ${args.slug}.md frontmatter:`);
console.log(`coverImage: "/images/blog/${args.slug}/cover.png"`);

// ──────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const out = { slug: null, subject: null, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') {
      out.dryRun = true;
    } else if (a === '--subject') {
      out.subject = argv[i + 1];
      i += 1;
    } else if (a.startsWith('--')) {
      // Unknown flag — ignore.
    } else if (!out.slug) {
      out.slug = a;
    }
  }
  return out;
}

function buildCoverPrompt({ subject, tags }) {
  const tagLine = tags.length > 0 ? tags.join(', ') : 'essay, archival, considered';

  return `SUBJECT
${subject}

STYLE
Quiet personal-essay photograph — Editorial structure (hairlines, restrained composition, single-accent discipline) resolved against an olive + greys + off-whites palette. The register is casual and considered, not theatrical: the kind of image that lives at the head of a personal essay on a writer's website (Craig Mod, Robin Sloan, Maggie Appleton). Image-led, slightly bookish, never glossy.

PALETTE
- Cool off-white grounds (#F0EFE9, #F8F7F2) — archival paper feel, NOT warm cream
- Near-black ink with olive undertone (#1F1F1B) for primary tones; charcoal grey (#4A4A45) for secondary
- A single sage-olive accent (#6B7A4F) appears sparingly — a single garment, jacket, book cover, plant, or marginal detail. Never the dominant color
- Greys throughout the mid-range — slate, charcoal, dove, faded ink
- Optional secondary accent (use sparingly): worn-leather brown (#8B6B47) or slate-blue (#5C6B7A)
- NO warm cream, NO terracotta, NO burgundy, NO neon, NO saturated reds or oranges

PHOTOGRAPHY
- Editorial photograph quality: crisp, intentional, documentary-essay
- Strong tonal range with controlled mid-tones — most of the image lives in greys
- Could read as muted color photography or near-monochrome with the olive as the single chromatic note
- Sharp focus on the subject; clean rather than tactile

COMPOSITION
- 3:2 horizontal composition with breathing room for a serif headline to live alongside
- Strong subject, off-center focal point, generous negative space
- Single primary subject treated with restraint (an open journal, a fountain pen, an olive jacket on a chair, a single hardcover book, a window with rain, a hand resting on a desk, a worn leather satchel, a figure in shallow focus, light across a wall)
- NOT busy collages, NOT multiple disconnected subjects

REFERENCES
Craig Mod's walking-essay photography (Japan, light through windows, objects on desks). 1960s Penguin paperback covers. Dieter Rams office photography. Michelangelo Antonioni film stills (the muted, considered ones — L'Avventura, La Notte). Saul Leiter's quiet color work. Robert Frank's "The Americans" restraint. Hopper paintings (the empty interiors). Modernist library photography. Vintage National Geographic when subdued. Images that feel hand-picked for a personal essay, not stocked from a library.

AVOID
AI-generic stock photography, neon colors, oversaturated palettes, glossy hyperreal renders, lens flares, busy backgrounds, visible text or watermarks or logos, multiple disconnected subjects. No tech-startup-blog-illustration aesthetic, no "professional in coffee shop" lifestyle photography, no fake emotion. Warm-cream paper textures (Field Manual register) — explicitly NOT this. Burgundy / oxblood as a dominant color — explicitly NOT this either.

TAGS
${tagLine}`;
}
