# Dialogue: System-Level Review

## Protocol

**Pattern:** Skill Forge (Heterogeneous AI Deliberation) — adapted for meta-review
**Purpose:** System-level remediation planning, not artifact production
**Roles:**
- **HO (Human Orchestrator):** Ed O'Connell
- **GA (Generalizing AI):** Claude Code (Opus 4.5)
- **IA (Inspecting AI):** ChatGPT

**Gates:**
- **Understanding Gate (UG):** IA confirms understanding of problem decomposition and decision points
- **Agreement Gate (AG):** Both agents agree on remediation approach before implementation

**Evidence Protocol:**
- GA provides GitHub Actions run URLs (not just YAML paths)
- GA commits evidence artifacts to `/evidence/` for IA verification
- IA cannot render SPAs; screenshots are primary evidence

**Binding Invariants:**
- Step 9: Skill Review at Handshake
- AMORTIZATION.md update required before Step 9 closure
- Navigation.jsx must be updated for any route changes
- package.json version must match release version tag

---

## Protocol Definitions (For IA Reference)

This section provides canonical definitions for ChatGPT to reference when evaluating proposals or making determinations.

### Skill Forge Pattern

The Skill Forge is a heterogeneous AI deliberation pattern designed for auditable artifact production. Key characteristics:

1. **Roles are distinct and non-interchangeable**
   - HO: Human authority, final arbiter, owns interventions
   - GA: Proposes, implements, supplies evidence
   - IA: Inspects, flags concerns, guards gates

2. **Gates enforce deliberation discipline**
   - UG (Understanding Gate): IA confirms understanding before proceeding
   - AG (Agreement Gate): Both agents agree before implementation
   - No gate may advance without explicit closure

3. **Evidence is primary, not inference**
   - Screenshots over live inspection (IA cannot render SPAs)
   - GitHub Actions URLs over general references
   - Committed artifacts over predicted artifacts

4. **Single artifact per cycle**
   - Prevents scope creep
   - Enables clean amortization accounting
   - Exceptions require HO approval

### Boundary Marker System

The portfolio uses four boundary marker components to prevent epistemic authority laundering:

| Component | Purpose | Values |
|-----------|---------|--------|
| `ProvenanceHeader` | Origin information | agent, date, context, sourceUrl |
| `EpistemicBadge` | Inspection status | VERIFIED, ILLUSTRATIVE, EXPLORATORY |
| `AuthorshipMarker` | Attribution | Human, AI, Collaborative |
| `DemoContainer` | Visual containment | dashed border + "Demo Content" label |

**Semantic Distinctions:**
- **Provenance** = Where did this come from? (agent, date, context)
- **Epistemic Status** = How verified are the claims? (VERIFIED = checked against sources, ILLUSTRATIVE = capability demo without truth claims, EXPLORATORY = work in progress)
- **Authorship** = Who made this? (Human/AI/Collaborative)

These are **orthogonal dimensions**, not synonyms.

### AMORTIZATION.md Pattern

Each release must document:
1. Verification of prior predictions
2. What became cheaper (amortization)
3. What was invested (new capital)
4. Evidence table with locations
5. Evidence provenance chain (source → artifact → evidence → CI → deploy)
6. Falsifiable claims for next release

### Evidence Provenance Chain Format

```
Source: [location] ([storage system])
  ↓ [verification performed]
Artifact: [file path]
  ↓ committed in [hash]
Evidence: [screenshot/artifact path]
  ↓ committed in [hash]
Push: [hash] → origin/[branch]
  ↓ triggered CI
Actions Run: #[number] ([workflow])
  ↓ status: [pass/fail], [N] tests passing
Deploy: [target]
  ↓ live at [URL]
```

### Execution Authorization

- GA may NOT begin implementation until IA has granted Execution Authorization
- Authorization is explicit ("Execution Authorization: GRANTED")
- Authorization is revocable by IA or HO
- Protocol breaches trigger Step 9 holds

### Step 9: Skill Review at Handshake

Before cycle closure:
1. IA reviews evidence
2. IA confirms boundary markers present
3. IA confirms implementation matches proposal
4. IA surfaces any protocol gaps
5. HO determines closure eligibility

---

## Context

This dialogue addresses **meta-level concerns** raised after the MementoDemo integration (v1.3.0). These are system-level issues, not artifact production tasks.

**Current Repository State:**
- Repo: `github.com/adambalm/portfolio`
- Version: 1.3.0
- Live: https://adambalm.github.io/portfolio/
- Artifacts integrated: SkillForgeVisualizer, ContextSageDemo, MementoDemo
- Tests: 29 passing (accessibility.yml)

**Prior Cycles:**
- v1.0.0: DemoWithBoundaries reference implementation
- v1.1.0: SkillForgeVisualizer integration
- v1.2.0: ContextSageDemo integration (with Execution Authorization protocol amendment)
- v1.3.0: MementoDemo integration (with protocol reconciliation incident, skill updated to v1.4.0)

---

## Objective

Develop a remediation plan addressing the following concerns:

1. **UI boundary semantics ambiguity** — authorship vs deliberative provenance vs inspection status may be conflated without explicit legend
2. **No human-readable legend** — boundary markers are inline, no central explanation for users
3. **Inconsistent footers** — three different footer patterns across demos
4. **Diagrams missing detail** — incomplete articulation of "system wiring" (specific gaps TBD)
5. **Dual-surface tension** — governed/auditable portfolio vs marketing site not architecturally separated
6. **SkillForge responsive issues** — component reportedly breaks at some resolutions (reproduction TBD)
7. **Pending artifact import** — "Artifact Demo" listed as deferred on landing page

---

## Scope Boundary

This dialogue is for **planning and decision-making**, not artifact production. Implementation work requires:
- Resolved decision points (DP-1 through DP-6 in the attached memo)
- HO approval
- Potentially separate Skill Forge cycles for artifact-level work

---

*Initialized 2026-01-07. Awaiting HO direction or IA review.*

