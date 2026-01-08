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

---

## Turn 1: GA Decision Memo

**From:** Claude Code (GA)
**Date:** 2026-01-07

The following decision memo was produced after codebase exploration. It decomposes the stated concerns and identifies decision points requiring HO input before any action pathway can be chosen.

---

# Decision Memo: Portfolio System Review

**Date:** 2026-01-07
**Mode:** Plan-only exploration (no authorization for action)
**HO:** Adam Balm

---

## 1. Problem Decomposition

I decompose the 7 stated concerns into **four distinct problem clusters**:

### Cluster A: Semantic Clarity (Concerns 1, 2)

| Concern | Current State | Gap |
|---------|--------------|-----|
| UI boundary semantics ambiguity | [grounded] Three distinct marker types exist: `ProvenanceHeader` (origin), `EpistemicBadge` (inspection status), `AuthorshipMarker` (attribution) | [inference] Ambiguity may be perceived because markers are **inline** without unified legend |
| No human-readable legend | [grounded] No dedicated legend component. Explanation distributed across: (a) `DemoWithBoundaries.jsx` reference implementation, (b) inline badge descriptions, (c) shell footer one-liner | [missing] Requirements doc specifying what legend should contain |

### Cluster B: Consistency & Standards (Concerns 3, 4)

| Concern | Current State | Gap |
|---------|--------------|-----|
| Inconsistent footers | [grounded] Three footer patterns: Shell (`Layout.jsx`), SkillForge (versioned/trilingual), ContextSage/Memento (Tufte-style copyright) | [missing] Footer standard specification |
| Diagrams missing detail | [inference] SkillForgeVisualizer has Swiss Cheese SVG + Cost Curve SVG. "Missing detail" claim not grounded—needs specific examples | [missing] Which diagrams, what detail |

### Cluster C: Architecture Tension (Concern 5)

| Concern | Current State | Gap |
|---------|--------------|-----|
| Dual-surface tension | [grounded] Single site serves both roles. `DemoContainer` creates visual separation but no architectural separation | [inference] This may be acceptable if boundary markers are sufficient epistemic guardrails |

### Cluster D: Technical Debt (Concerns 6, 7)

| Concern | Current State | Gap |
|---------|--------------|-----|
| SkillForge breaks at some resolutions | [inference] Not observed in exploration. 1,176-line component with complex SVG | [missing] Reproduction steps, affected viewport sizes |
| Pending artifact import | [grounded] LandingPage shows "Artifact Demo" as deferred to v1.3.0+ | [missing] Whether this is the referenced pending import, or something else |

---

## 2. Decision Points for HO

These require HO input before any action pathway can be chosen:

### DP-1: Legend Scope

**Question:** Should the legend be:
- (a) A dedicated `/legend` route with comprehensive explanations
- (b) An expandable panel on the landing page
- (c) Tooltips on each marker type
- (d) Current inline pattern is sufficient

**Dependency:** Answers DP-1 determines whether Cluster A requires implementation work.

### DP-2: Footer Standardization Priority

**Question:** Is footer inconsistency blocking, or acceptable tech debt?
- If blocking: need footer spec before next artifact import
- If acceptable: defer to future consolidation pass

### DP-3: Diagram Detail Specification

**Question:** Which diagrams are incomplete? What detail is missing?
- [missing] Cannot evaluate without specific examples
- Blocks any Cluster B remediation work

### DP-4: SkillForge Responsive Issue

**Question:** Can you provide reproduction steps for the reported breakage?
- [missing] Viewport size(s) where issue manifests
- [missing] Browser/device context
- Blocks any Cluster D remediation work

### DP-5: Surface Separation

**Question:** Should governed/auditable content and marketing content be:
- (a) Same site, differentiated only by boundary markers (current)
- (b) Same repo, separate routes (e.g., `/governed/*` vs `/showcase/*`)
- (c) Separate repos/deployments entirely

**Dependency:** Impacts architecture if (b) or (c) chosen.

### DP-6: Pending Import Identity

**Question:** Is the "pending artifact import" the "Artifact Demo" listed as deferred on landing page, or something else?
- [grounded] LandingPage.jsx lists "Artifact Demo" as deferred
- [missing] Confirmation this is the item referenced

---

## 3. Recommended Deliberation Structure

### Should a new Skill Forge cycle be initiated?

**Recommendation: Not yet.**

**Reasoning:**

1. [grounded] A Skill Forge cycle is a heavyweight pattern for producing auditable artifacts with gate-enforced deliberation
2. [inference] The concerns raised are **meta-level** (standards, legends, architecture)—not artifact production
3. [inference] Starting a Skill Forge cycle without resolved decision points would contaminate the cycle with unresolved requirements

**Alternative recommended structure:**

| Phase | Purpose | Output |
|-------|---------|--------|
| **Phase 1: Requirements Gathering** | Resolve DP-1 through DP-6 | Decision document |
| **Phase 2: Standards Definition** | If needed, define legend spec, footer standard | Standards doc (could be CLAUDE.md amendment) |
| **Phase 3: Remediation** | Fix responsive issue, footer inconsistency | PRs with standard CI validation |
| **Phase 4: Artifact Import** | If deferred artifact is unblocked | Skill Forge cycle (if artifact warrants it) |

**Protocol contamination risk:** [inference] If a Skill Forge cycle is started now without Phase 1-2, the cycle may oscillate between artifact production and standards negotiation. Skill Forge is designed for artifact deliberation, not meta-standard negotiation.

---

## 4. Proposed Recommendations

### R-1: Defer Artifact Import

**Recommendation:** Do not proceed with remaining artifact import until DP-2 (footer standard) is resolved.
**Rationale:** [grounded] Current footers show three different patterns. Importing another artifact without footer spec perpetuates inconsistency.
**Exception:** If HO decides footer inconsistency is acceptable (DP-2 = "acceptable debt"), import can proceed.

### R-2: No Architectural Separation (Yet)

**Recommendation:** Keep single-surface architecture with boundary markers.
**Rationale:** [grounded] The boundary marker system (`ProvenanceHeader`, `EpistemicBadge`, `AuthorshipMarker`, `DemoContainer`) provides epistemic containment. [inference] Separate surfaces add deployment complexity without clear benefit if markers are working.
**Revisit trigger:** If user research shows boundary markers are not understood.

### R-3: Legend as Landing Page Amendment (Tentative)

**Recommendation:** If DP-1 = "needs legend", implement as collapsible section on landing page rather than separate route.
**Rationale:** [inference] Users encountering artifacts will enter via landing page. Legend at entry point reduces friction.
**Contingent on:** HO confirming current inline pattern is insufficient.

### R-4: Gather Missing Evidence Before Remediation

**Recommendation:** Before any Cluster B/D work, request:
- Specific diagrams needing detail (DP-3)
- SkillForge responsive issue reproduction steps (DP-4)

**Rationale:** [grounded] Cannot scope remediation work without specific failure cases.

---

## 5. Information Requests

If HO wants me to proceed with any pathway, I need:

| Item | Purpose |
|------|---------|
| Confirmation of pending artifact identity | Resolve DP-6 |
| SkillForge responsive issue reproduction | Scope DP-4 remediation |
| Diagram detail requirements | Scope DP-3 remediation |
| Footer standard preference | Resolve DP-2 |
| Legend scope preference | Resolve DP-1 |

**Optional (if HO wants protocol-grounded work):**
- Canonical "artifact integration skill instructions" (current version)
- Canonical "Skill Forge pattern" definition

---

## 6. Summary Matrix

| Cluster | Blocking? | Action Required | Depends On |
|---------|-----------|-----------------|------------|
| A: Semantic Clarity | [inference] Not blocking if inline pattern is acceptable | Legend (if DP-1 ≠ "sufficient") | DP-1 |
| B: Consistency | [inference] Blocking for new imports | Footer standard | DP-2 |
| C: Architecture | [inference] Not blocking | None unless HO chooses separation | DP-5 |
| D: Technical Debt | [missing] Cannot assess | Responsive fix | DP-3, DP-4 |

---

**End of Decision Memo**

No files were modified during memo production. This memo is advisory only and does not constitute authorization for any implementation work.

---

*Awaiting HO response to decision points.*

