# Phase 1 Progress — Trust & SEO Foundation

Last updated: 2026-04-19
Owner: GenAnime
Status: ✅ D1-D2 and D2-D3 completed

## Scope completed

### D1-D2 — Trust and claim cleanup
- Replaced high-risk “coming soon” video claims with explicit beta/waitlist messaging.
- Added beta-preview disclosure to `style-detective` flow.
- Removed unverifiable structured-data ratings in global and tool JSON-LD.
- Reduced over-claiming copy in ad-background page (metrics, feature promises).

### D2-D3 — SEO foundation unification
- Removed duplicate runtime sitemap route and kept single Next.js sitemap source:
  - `src/app/sitemap.ts`
- Disabled `next-sitemap` postbuild generation to avoid sitemap duplication.
- Normalized hreflang language map in global metadata (`en/id/de/es/ru/pt`).
- Fixed domain inconsistencies (`animeai.art` → `genanime.art`) in metadata.

## Files changed (phase 1)
- `package.json`
- `next-sitemap.config.js`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/(home)/ai-ad-background-anime/page.tsx`
- `src/app/[locale]/(home)/ai-ad-background-anime/metadata.ts`
- `src/app/[locale]/(home)/style-detective/page.tsx`
- `src/app/[locale]/(home)/style-detective/metadata.ts`
- `src/app/[locale]/(home)/tools/anime-voice-changer/AnimeVoiceChangerClient.tsx`
- `src/messages/en.json`
- `src/messages/es.json`
- `src/messages/de.json`
- `src/messages/pt.json`
- Deleted: `src/app/sitemap.xml/route.ts`

## Decisions locked (avoid rework)
- Single sitemap source of truth: `src/app/sitemap.ts`.
- Marketing pages with unverified claims can be `noindex` until real capability is live.
- No fabricated ratings, counts, or benchmark claims in schema/copy.
- Video capability messaging must use one of:
  - `Beta waitlist`
  - `Limited rollout by region/account`
  - `Not generally available yet`

## Next actions (Phase 2)
1. Build Seedance hub pages with real conversion funnel:
   - `/seedance`
   - `/seedance-anime-prompts`
   - `/anime-image-to-video`
2. Implement real “image → video prompt pack” output (not placeholder).
3. Add consistent conversion events:
   - waitlist submit
   - copy prompt pack
   - click-to-generator
   - pricing visit from Seedance pages
4. Decide indexability per page after capability is production-ready.

## QA checklist before deploy
- `sitemap.xml` returns only one canonical source.
- `robots.txt` points to `https://genanime.art/sitemap.xml`.
- No `animeai.art` references remain in source.
- No fake `aggregateRating` in JSON-LD.
- Beta pages clearly labeled as beta/demo.
