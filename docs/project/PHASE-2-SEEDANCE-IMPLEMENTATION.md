# Phase 2 Progress — Seedance Page System

Last updated: 2026-04-19  
Owner: GenAnime  
Status: ✅ Implemented

## Goal
Build a 3-page Seedance growth system that is both SEO-friendly and conversion-oriented:
- `/seedance`
- `/seedance-anime-prompts`
- `/anime-image-to-video`

## What was implemented

### 1) New route pages
- Added Seedance hub page:
  - `src/app/[locale]/(home)/seedance/page.tsx`
  - `src/app/[locale]/(home)/seedance/metadata.ts`
- Added Seedance prompts library page:
  - `src/app/[locale]/(home)/seedance-anime-prompts/page.tsx`
  - `src/app/[locale]/(home)/seedance-anime-prompts/metadata.ts`
- Added anime image-to-video workflow page:
  - `src/app/[locale]/(home)/anime-image-to-video/page.tsx`
  - `src/app/[locale]/(home)/anime-image-to-video/metadata.ts`

### 2) Functional components (not only bridge pages)
- Prompt library interactive component:
  - category filter
  - search
  - copy prompt-pack action
  - one-click handoff to workflow page
  - file: `src/components/seedance/PromptLibraryClient.tsx`
- Prompt-pack generation workflow:
  - input form (subject, scene, style, camera, motion, ratio, duration)
  - optional advanced inputs
  - structured output (master prompt, negative prompt, shot list, settings)
  - copy actions per output block
  - file: `src/components/seedance/ImageToVideoWorkflowClient.tsx`

### 3) Shared prompt data
- Added reusable template dataset:
  - `src/lib/seedancePrompts.ts`

### 4) Crawlability and internal links
- Added three new routes to sitemap:
  - `src/app/sitemap.ts`
- Added footer links for crawl/discovery:
  - `src/components/layout/Footer.tsx`

### 5) Navigation architecture redesign (desktop + mobile)
- Refactored top navigation to reduce clutter and improve findability:
  - Primary nav: Home / Generator / Seedance / Gallery / Pricing
  - Resources dropdown: prompt library, Seedance prompts, anime image-to-video, and long-tail tools
- Mobile nav now uses grouped sections:
  - Main
  - Resources
- File:
  - `src/components/layout/Header.tsx`

## Product decisions locked
- These are not pure traffic pages; at least one page (`/anime-image-to-video`) provides real utility.
- Capability scope is stated clearly (workflow generation vs direct rendering).
- Content is structured around intent:
  - awareness (`/seedance`)
  - solution discovery (`/seedance-anime-prompts`)
  - execution (`/anime-image-to-video`)

## Known constraints
- Full lint is unavailable in current environment because `eslint` executable is missing.
- Project-wide `tsc` reports pre-existing test typing issues under:
  - `src/lib/__tests__/planKeyMapper.test.ts`

## Next phase (recommended)
1. Add event tracking on new pages:
   - `seedance_hub_cta_click`
   - `seedance_prompt_copy`
   - `seedance_workflow_generate`
2. Add waitlist capture endpoint with analytics attribution.
3. Expand prompt dataset to 40–80 templates based on usage logs.
4. Add localized content variants (at least ES/PT) for high-traffic routes.
