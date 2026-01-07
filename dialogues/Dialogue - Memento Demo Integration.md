# Dialogue: Memento Demo Integration

## Protocol
**Pattern:** Skill Forge (Heterogeneous AI Deliberation)
**Skill Version:** artifact-integration v1.3.0
**Roles:**
- **HO (Human Orchestrator):** Ed O'Connell
- **GA (Generalizing AI):** Claude Code (Opus 4.5)
- **IA (Inspecting AI):** ChatGPT

**Gates:**
- **Understanding Gate (UG):** IA confirms understanding of proposal
- **Agreement Gate (AG):** Both agents agree on implementation approach

**Evidence Protocol:**
- GA provides GitHub Actions run URLs (not just YAML paths)
- GA commits screenshots to `/evidence/` for IA verification
- IA cannot render SPAs; screenshots are primary evidence

**Binding Invariants:**
- Single artifact per deliberation cycle
- AMORTIZATION.md section required for AG closure
- Step 0: Queue and Canary Verification (v1.3.0)
- Execution Authorization required before implementation
- Step 9: Skill Review at Handshake

---

## Context

This deliberation continues the artifact integration sequence. Previous cycles:
- v1.0.0: DemoWithBoundaries reference implementation
- v1.1.0: SkillForgeVisualizer integration
- v1.2.0: ContextSageDemo integration (with Execution Authorization protocol amendment)

**Current state:**
- Repo: `github.com/adambalm/portfolio`
- Version: v1.2.0
- Live: https://adambalm.github.io/portfolio/
- CI: All passing (23 accessibility tests)
- Artifacts integrated: SkillForgeVisualizer, ContextSageDemo

**Objective:** Integrate MementoDemo as the third artifact in the portfolio.

---

## Step 0: Queue and Canary Verification

**Performed by:** GA (Claude Code)
**Date:** 2026-01-07

### Queue Entry
```
### memento-demo-v1.0.0
- **Status**: pending-test
- **Source**: workspace/skills/memento-demo/artifacts/memento-demo-v1.0.0
- **Added**: 2026-01-05T14:30:00Z
- **Canary**: MEMENTO-DEMO-2026-01-05-VITE-READY
```

### Artifact Source Verification
- **Read from:** `workspace/skills/memento-demo/artifacts/memento-demo-v1.0.0` (Basic Memory)
- **Artifact canary (manifest):** `MEMENTO-DEMO-2026-01-05-VITE-READY`
- **Artifact canary (footer):** `MEMENTO-DEMO-2026-01-05-VITE-READY`

### Verification Result
| Check | Queue | Artifact | Match |
|-------|-------|----------|-------|
| Canary | `MEMENTO-DEMO-2026-01-05-VITE-READY` | `MEMENTO-DEMO-2026-01-05-VITE-READY` | ✅ |
| Status | `pending-test` | N/A | ✅ |
| Source readable | Yes | Yes | ✅ |

**Step 0 PASSED.** Proceeding to Turn 1 proposal.

---

## Turn 1: GA Proposal

**From:** Claude Code (GA)
**To:** ChatGPT (IA)
**Date:** 2026-01-07

### Proposal: MementoDemo Integration

I propose integrating MementoDemo from Basic Memory as the third artifact in the portfolio. This follows the single-artifact-per-cycle discipline and the new v1.3.0 queue verification requirement.

### Queue Verification Complete

As documented in Step 0 above, I have:
1. Read the pending-artifacts queue from Basic Memory
2. Located the memento-demo-v1.0.0 entry
3. Verified status is `pending-test`
4. Read the artifact from the specified source path
5. Verified canary matches: `MEMENTO-DEMO-2026-01-05-VITE-READY`

### Artifact Summary

| Property | Value |
|----------|-------|
| Name | MementoDemo |
| Export | `export default function MementoDemo()` |
| Source | `workspace/skills/memento-demo/artifacts/memento-demo-v1.0.0` |
| Canary | `MEMENTO-DEMO-2026-01-05-VITE-READY` |
| Languages | Trilingual (EN/ZH/ES) |
| Dependencies | React (useState only) |

### Artifact Characteristics

**Visual Direction:** Tufte-inspired (consistent with ContextSageDemo)
- Light background (#fffff8), dark text (#111)
- Serif typography (Palatino, Georgia)
- Wide margins, generous whitespace

**Sections:** Overview, Live Session, Architecture, Schema, Open Questions, Roadmap

**Content:** Real session data from December 31, 2025 (27 tabs, 11 categories, 4 deep dives). This is actual Memento output, not mock data.

**Interactive Elements:**
- Language toggle (EN/ZH/ES)
- Collapsible question panels (5 questions with expand/collapse)
- Navigation tabs

### Technical Approach

#### 1. Copy artifact from Basic Memory
Extract JSX from `workspace/skills/memento-demo/artifacts/memento-demo-v1.0.0` and create:
```
portfolio/src/artifacts/MementoDemo.jsx
```

#### 2. Accessibility fix (preemptive)
Footer canary uses `color: '#999'` which failed contrast in ContextSageDemo. Will fix to `#6b6b6b` before integration.

#### 3. Create page wrapper with boundary markers
```jsx
// src/pages/MementoPage.jsx
import { ProvenanceHeader, EpistemicBadge, AuthorshipMarker, DemoContainer } from '../components';
import MementoDemo from '../artifacts/MementoDemo';

export default function MementoPage() {
  return (
    <section aria-labelledby="memento-section">
      <h2 id="memento-section">Memento Demo</h2>
      <ProvenanceHeader
        agent="Claude (Opus 4.5)"
        date="2026-01-05"
        context="Browser session capture and classification demo"
        sourceUrl="https://github.com/adambalm/portfolio/blob/main/src/artifacts/MementoDemo.jsx"
      />
      <EpistemicBadge status="ILLUSTRATIVE" />
      <AuthorshipMarker type="AI" details="Generated by Claude from real Memento session data" />
      <DemoContainer title="Memento Browser Session Capture">
        <MementoDemo />
      </DemoContainer>
    </section>
  );
}
```

#### 4. Add route
```jsx
// In App.jsx
import MementoPage from './pages/MementoPage';
// Add route: <Route path="memento" element={<MementoPage />} />
```

#### 5. Update test arrays
```javascript
// In accessibility.spec.js
const routes = [
  // ... existing routes
  { path: '/#/memento', name: 'Memento' },
];

const artifactRoutes = [
  // ... existing routes
  { path: '/#/memento', name: 'Memento' },
];
```

#### 6. Update LandingPage
Add MementoDemo to artifacts array on landing page.

### Predicted Outcome (for AMORTIZATION.md)

Based on v1.1.0 and v1.2.0 patterns:
- 1 file copy from Basic Memory (not vite-playground)
- 1 new page wrapper (~35 lines)
- 1 route addition
- 2 entries in test arrays
- 0 CI workflow changes
- 1 accessibility fix (canary contrast)
- Total new tests: 6 (auto-generated from route arrays)

### Request

IA: Please review this proposal and either:
1. Close the Understanding Gate with acceptance criteria, or
2. Flag any concerns requiring clarification

---

*Awaiting IA response.*
