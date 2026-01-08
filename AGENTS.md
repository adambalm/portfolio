# AGENTS.md

This file provides guidance to AI coding assistants (Codex, Gemini, etc.) when working with code in this repository.

## Project Overview

Portfolio umbrella site for integrating AI-generated artifacts with explicit epistemic boundary markers. Built with React 19 + Vite 7, deployed to GitHub Pages at `adambalm.github.io/portfolio/`.

**Version:** 1.4.0
**Standards:** `docs/standards/` (binding for all governed-surface work)

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

**Boundary marker components** (`src/components/`):
- `ProvenanceHeader` - agent, date, context, source link
- `EpistemicBadge` - VERIFIED/ILLUSTRATIVE/EXPLORATORY status
- `AuthorshipMarker` - Human/AI/Collaborative attribution
- `DemoContainer` - visual containment (dashed border + "Demo Content" label)

**Artifacts** (`src/artifacts/`): SkillForgeVisualizer, ContextSageDemo, MementoDemo

**Standards** (`docs/standards/`): Binding specifications for footers, boundaries, surfaces, responsive QA, system wiring.

## Binding Standards (v1.4.0)

All work on the governed surface must comply with:

| Standard | File | Key Requirements |
|----------|------|------------------|
| Footer | `footer-standard.md` | Canary, Version, WCAG 2.1 AA required |
| Boundary Legend | `boundary-legend.md` | Four orthogonal marker types |
| Surface Qualification | `surface-qualification.md` | Governed vs Marketing separation |
| Responsive QA | `responsive-qa.md` | Mobile/Tablet/Desktop viewport support |
| System Wiring | `system-wiring.md` | Diagram completeness checklist |

## Deliberation Protocol

This repo uses **Skill Forge** (heterogeneous AI deliberation) for artifact production:

- **HO** (Human Orchestrator): Final authority, owns decisions
- **GA** (Generalizing AI): Proposes, implements, supplies evidence
- **IA** (Inspecting AI): Reviews, guards gates, grants Execution Authorization

**Gates:** Understanding Gate (UG) → Agreement Gate (AG) → Execution Authorization → Step 9 closure

**Evidence:** Use absolute GitHub URLs with media type annotations for IA inspection.

## CI Workflows

- **accessibility.yml** - Runs on push/PR to main. Hard blocks on WCAG violations.
- **deploy.yml** - Deploys to GitHub Pages on push to main.

## Key Constraints

- All text must meet WCAG 2.1 AA contrast (4.5:1). Use colors: `#1d4ed8`, `#1e40af`, `#475569`.
- GitHub Pages base path is `/portfolio/` (configured in `vite.config.js`).
- New artifacts must have footers compliant with `docs/standards/footer-standard.md`.
- Governed surface content requires boundary markers; marketing surface must NOT have them.

## Key Files

| File | Purpose |
|------|---------|
| `AMORTIZATION.md` | Economic accounting for each release |
| `dialogues/` | Skill Forge deliberation records |
| `docs/standards/` | Binding standards (v1.4.0) |
| `evidence/` | Screenshots and inspection artifacts |
