# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio umbrella site for integrating AI-generated artifacts with explicit epistemic boundary markers. Built with React 19 + Vite 7, deployed to GitHub Pages at `adambalm.github.io/portfolio/`.

## Commands

```bash
npm run dev        # Start dev server (localhost:5173)
npm run build      # Build to dist/
npm run preview    # Preview build (localhost:4173)
npm run lint       # ESLint check

# Accessibility tests (requires build + preview server running)
npm run build && npm run preview &
npx wait-on http://localhost:4173/portfolio/
npx playwright test accessibility.spec.js
```

## Architecture

**Entry point:** `src/main.jsx` → `App.jsx` → `DemoWithBoundaries.jsx`

**DemoWithBoundaries.jsx** is the reference implementation of boundary markers that prevent epistemic authority laundering:
- `ProvenanceHeader` - agent, date, context, source link
- `EpistemicBadge` - VERIFIED/ILLUSTRATIVE/EXPLORATORY status
- `AuthorshipMarker` - Human/AI/Collaborative attribution
- `DemoContainer` - visual containment (dashed border + "Demo Content" label)

**Accessibility enforcement:** Tests in `tests/accessibility.spec.js` use Playwright + axe-core. CI blocks on:
- Critical/serious axe violations
- Color contrast failures (WCAG 2.1 AA: 4.5:1 normal text)
- Keyboard navigation failures
- Missing button labels or heading hierarchy issues

## CI Workflows

- **accessibility.yml** - Runs on push/PR to main. Hard blocks on WCAG violations. Uploads `test-results/boundary-markers-evidence.png` as artifact.
- **deploy.yml** - Deploys to GitHub Pages on push to main.

## Key Constraints

- All text must meet WCAG 2.1 AA contrast (4.5:1). Use colors like `#1d4ed8`, `#1e40af`, `#475569` for text/links.
- GitHub Pages base path is `/portfolio/` (configured in `vite.config.js`).
- Playwright tests expect preview server at `localhost:4173/portfolio/`.
