# GenAnime UI Style System (for new pages)

Last updated: 2026-04-19
Purpose: keep all future pages visually consistent with existing site style.

## 1) Brand direction
- Mood: dark, cinematic, premium, creator-focused.
- Core palette:
  - Background base: `#030305` / `#050505`
  - Card surface: `bg-white/5` or `bg-zinc-900/50`
  - Accent gradient: `from-indigo-400 via-purple-400 to-pink-400`
  - Accent solid CTA: `indigo-600` hover `indigo-500`
- Borders: subtle glass borders `border-white/10` and section separators `border-white/5`.

## 2) Typography
- Main font: `Outfit` (via `font-sans`).
- Hero headline pattern:
  - `text-5xl md:text-7xl`
  - `font-black`
  - `leading-[0.95]` to `leading-[1.1]`
  - gradient highlight for key phrase.
- Body copy:
  - `text-zinc-400`
  - `leading-relaxed`
  - max width `max-w-2xl` / `max-w-3xl`.

## 3) Component patterns
- Primary CTA button:
  - `bg-indigo-600 text-white`
  - rounded (`rounded-xl` or `rounded-2xl`)
  - strong hover feedback (`hover:bg-indigo-500`, optional scale 1.02~1.05)
- Secondary CTA:
  - `bg-white/5 border border-white/10 text-white`
  - hover to `bg-white/10`.
- Card pattern:
  - `bg-zinc-900/50 border border-white/5`
  - radius `rounded-2xl`~`rounded-3xl`
  - hover border tint `hover:border-indigo-500/20`.
- Badge pattern:
  - `inline-flex`, capsule, uppercase, tracking-wider, icon on left.

## 4) Layout template for landing pages
1. Hero
2. Value props / use-cases grid
3. Workflow (3–5 steps)
4. Example outputs
5. FAQ
6. CTA footer

Use the same section rhythm:
- `py-20` / `py-24` for section spacing
- container width `max-w-7xl` (or `max-w-5xl` for text-heavy sections).

## 5) Interaction and motion
- Motion style: subtle and purposeful.
- Preferred:
  - fade-up on enter
  - small scale on hover
  - keep transition durations around `200ms~500ms`
- Avoid:
  - heavy full-screen blur layers on mobile
  - too many simultaneous animated elements.

## 6) Content trust rules (mandatory)
- If feature is not fully available, label it:
  - `Beta`, `Waitlist`, or `Planned`.
- No hard performance numbers unless source is verifiable.
- No fake aggregate ratings in schema.
- Keep legal-safe wording around third-party model names.

## 7) New page build checklist (copy before coding)
- Purpose (single conversion goal):
- Target user:
- Primary CTA:
- Is every claim verifiable today? (Y/N)
- Beta/Waitlist labels needed? (Y/N)
- SEO status:
  - `index/follow` or `noindex/nofollow`
  - canonical URL
  - hreflang coverage
- Event tracking:
  - CTA click
  - copy action
  - signup/waitlist submit

## 8) Seedance page-specific UI notes
- Keep GenAnime dark visual language; do not switch to generic SaaS white template.
- Use “image → video workflow” visuals and prompt-pack cards.
- Surface capability status clearly in first screen:
  - `Beta waitlist` or `Available`.
