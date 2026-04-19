# SEO Audit — Seedance 3-Page System

Audit date: 2026-04-19  
Scope:
- `src/app/[locale]/(home)/seedance/page.tsx`
- `src/app/[locale]/(home)/seedance-anime-prompts/page.tsx`
- `src/app/[locale]/(home)/anime-image-to-video/page.tsx`

## Audit method
This audit was executed via repository-level static checks (code and metadata).  
No dedicated SEO skill package is available in the current session, so this is a manual technical SEO audit.

## Results summary
- Overall status: **Pass with actionable follow-ups**
- Technical indexability: **Pass**
- On-page structure: **Pass**
- SERP markup: **Pass**
- Validation tooling: **Partial** (lint unavailable in environment)

---

## 1) Indexability and crawlability

### 1.1 Sitemap inclusion
- ✅ Included in `src/app/sitemap.ts`:
  - `/seedance`
  - `/seedance-anime-prompts`
  - `/anime-image-to-video`

### 1.2 Robots and canonical
- ✅ Each page has route-level metadata with canonical URL:
  - `src/app/[locale]/(home)/seedance/metadata.ts`
  - `src/app/[locale]/(home)/seedance-anime-prompts/metadata.ts`
  - `src/app/[locale]/(home)/anime-image-to-video/metadata.ts`
- ✅ Global `robots.txt` points to `https://genanime.art/sitemap.xml`.

### 1.3 Internal links
- ✅ Cross-linked funnel exists:
  - hub -> prompts -> workflow
  - prompts -> workflow + hub
  - workflow -> prompts + hub
- ✅ Sitewide discovery link added in footer:
  - `src/components/layout/Footer.tsx`

---

## 2) On-page SEO structure

### 2.1 H1 and hierarchy
- ✅ One `<h1>` per page verified for all three routes.

### 2.2 Keyword-target alignment
- ✅ `/seedance`: brand/topic intent
- ✅ `/seedance-anime-prompts`: template/discovery intent
- ✅ `/anime-image-to-video`: task/commercial intent

### 2.3 Content clarity
- ✅ Clear capability boundaries and non-affiliation disclaimer included.
- ✅ Avoids over-claiming direct rendering when function is prompt-pack generation.

---

## 3) SERP features and structured data

### 3.1 Structured data coverage
- ✅ Hub page includes:
  - `WebPage`
  - `FAQPage`
- ✅ Prompt page includes:
  - `CollectionPage` + `ItemList`
- ✅ Workflow page includes:
  - `HowTo`
  - `FAQPage`

### 3.2 Rich-result readiness
- ✅ FAQ and HowTo content is present in visible page content.
- ✅ JSON-LD script blocks are embedded on corresponding pages.

---

## 4) Trust and policy checks

- ✅ No `animeai.art` domain mismatch in new pages.
- ✅ No fabricated aggregate-rating schema in new pages.
- ✅ Messaging is consistent with Phase 1 trust policy.

---

## 5) Technical validation status

### 5.1 Lint
- ⚠️ `npm run lint` cannot run due missing `eslint` executable in environment.

### 5.2 TypeScript
- ⚠️ `npx tsc --noEmit` reports pre-existing unrelated test typing errors in:
  - `src/lib/__tests__/planKeyMapper.test.ts`
- ✅ No new Seedance-file-specific compile errors were surfaced in static review.

---

## 6) Priority follow-ups

1. Add analytics events for CTR and activation:
   - prompt copy
   - workflow generate
   - CTA handoff between pages
2. Add localized copy variants for high-value locales.
3. Add server endpoint for waitlist with source attribution.
4. Run full CI lint/type/build in an environment with full dependencies.
