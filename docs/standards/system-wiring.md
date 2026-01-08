# System Wiring Diagram + Legend

> **Canary:** `SYSTEM-SPEC-BUNDLE-2026-01-07-V1`
> **Status:** VERIFIED
> **Applies to:** All Skill Forge deliberation cycles

---

## Purpose

This document provides an end-to-end articulation of how artifacts move through the system — from source inputs through deliberation, generation, inspection, and deployment. It establishes a **completeness checklist** that becomes binding for all future system diagrams.

---

## System Wiring Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SKILL FORGE SYSTEM WIRING                         │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │    INPUTS    │     │    SKILLS    │     │   STORAGE    │
  │              │     │              │     │              │
  │ • User needs │     │ • Skill Forge│     │ • Basic      │
  │ • Prior work │     │   Pattern    │     │   Memory     │
  │ • Constraints│     │ • Integration│     │ • GitHub     │
  │              │     │   Skills     │     │   Repo       │
  └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                              ▼
         ┌────────────────────────────────────────┐
         │         DELIBERATION PHASE             │
         │                                        │
         │  ┌─────────┐  ┌─────────┐  ┌────────┐ │
         │  │   HO    │  │   GA    │  │   IA   │ │
         │  │ Human   │  │ Claude  │  │ ChatGPT│ │
         │  │Orchestr.│  │  Code   │  │        │ │
         │  └────┬────┘  └────┬────┘  └───┬────┘ │
         │       │            │           │      │
         │       └─────┬──────┴─────┬─────┘      │
         │             │            │            │
         │             ▼            ▼            │
         │       ┌──────────┐ ┌──────────┐       │
         │       │    UG    │ │    AG    │       │
         │       │Understanding│Agreement│       │
         │       │   Gate   │ │   Gate   │       │
         │       └────┬─────┘ └────┬─────┘       │
         │            │            │             │
         └────────────┼────────────┼─────────────┘
                      │            │
                      ▼            ▼
         ┌────────────────────────────────────────┐
         │       EXECUTION AUTHORIZATION          │
         │                                        │
         │   IA grants explicit authorization     │
         │   GA may NOT proceed without it        │
         │                                        │
         └───────────────────┬────────────────────┘
                             │
                             ▼
         ┌────────────────────────────────────────┐
         │         ARTIFACT GENERATION            │
         │                                        │
         │  • GA produces artifact per spec       │
         │  • Canary embedded in artifact         │
         │  • Boundary markers applied            │
         │  • Evidence collected                  │
         │                                        │
         └───────────────────┬────────────────────┘
                             │
                             ▼
         ┌────────────────────────────────────────┐
         │            INSPECTION                  │
         │                                        │
         │  • IA reviews via GitHub URLs          │
         │  • Evidence verified                   │
         │  • Boundary markers confirmed          │
         │  • Protocol compliance checked         │
         │                                        │
         └───────────────────┬────────────────────┘
                             │
                             ▼
         ┌────────────────────────────────────────┐
         │         STEP 9: HANDSHAKE              │
         │                                        │
         │  • IA confirms implementation matches  │
         │  • HO determines closure eligibility   │
         │  • AMORTIZATION.md updated             │
         │  • Cycle formally closed               │
         │                                        │
         └───────────────────┬────────────────────┘
                             │
                             ▼
         ┌────────────────────────────────────────┐
         │           DEPLOYMENT                   │
         │                                        │
         │  ┌─────────────┐   ┌─────────────┐    │
         │  │  GOVERNED   │   │  MARKETING  │    │
         │  │   Surface   │   │   Surface   │    │
         │  │             │   │             │    │
         │  │ • Boundary  │   │ • No bound- │    │
         │  │   markers   │   │   ary req.  │    │
         │  │ • A11y CI   │   │ • Persuasive│    │
         │  │ • Evidence  │   │   language  │    │
         │  │   chain     │   │   permitted │    │
         │  └─────────────┘   └─────────────┘    │
         │                                        │
         └────────────────────────────────────────┘
```

---

## Diagram Legend

### Actors

| Symbol | Name | Role |
|--------|------|------|
| **HO** | Human Orchestrator | Final authority; owns interventions; decides closure |
| **GA** | Generalizing AI | Proposes, implements, supplies evidence (Claude Code) |
| **IA** | Inspecting AI | Inspects, flags concerns, guards gates (ChatGPT) |

### Gates

| Symbol | Name | Function |
|--------|------|----------|
| **UG** | Understanding Gate | IA confirms understanding of problem decomposition |
| **AG** | Agreement Gate | Both agents agree on approach before implementation |

### Phases

| Phase | Description |
|-------|-------------|
| **Inputs** | User needs, prior work, constraints that initiate a cycle |
| **Skills** | Patterns and instructions governing deliberation |
| **Storage** | Persistent stores (Basic Memory, GitHub) |
| **Deliberation** | Multi-turn dialogue between HO, GA, IA |
| **Execution Authorization** | Explicit permission to proceed with implementation |
| **Artifact Generation** | GA produces the artifact per agreed spec |
| **Inspection** | IA verifies artifact against spec and protocol |
| **Step 9** | Formal handshake and cycle closure |
| **Deployment** | Artifact moves to governed or marketing surface |

### Surfaces

| Surface | Characteristics |
|---------|-----------------|
| **Governed** | Boundary markers required, accessibility CI enforced, evidence chain required |
| **Marketing** | No boundary requirements, persuasive language permitted, explicitly non-authoritative |

---

## Data Flow Annotations

### Input → Deliberation

| Data | Source | Destination |
|------|--------|-------------|
| User requirements | HO | Deliberation phase |
| Prior artifacts | Storage (GitHub) | Deliberation phase |
| Skill definitions | Storage (Basic Memory) | Deliberation phase |
| Constraints | HO decisions | Deliberation phase |

### Deliberation → Generation

| Data | Source | Destination |
|------|--------|-------------|
| Agreed specification | AG closure | Artifact generation |
| Execution Authorization | IA | GA (unlocks implementation) |
| Canary assignment | GA proposal, IA confirmation | Artifact |

### Generation → Inspection

| Data | Source | Destination |
|------|--------|-------------|
| Artifact files | GA commit | GitHub repo |
| Evidence artifacts | GA commit | `/evidence/` directory |
| GitHub URLs | GA | IA (for inspection) |
| Media type annotations | GA | IA (for parseability assessment) |

### Inspection → Deployment

| Data | Source | Destination |
|------|--------|-------------|
| Step 9 closure | IA + HO | Deployment authorization |
| AMORTIZATION.md update | GA | Repo |
| Surface qualification | Surface rules | Deployment target selection |

---

## Completeness Checklist (Binding)

Future system diagrams MUST include all of the following:

### Required Elements

- [ ] All three actors (HO, GA, IA)
- [ ] Both gates (UG, AG)
- [ ] Execution Authorization checkpoint
- [ ] Artifact generation phase
- [ ] Inspection phase
- [ ] Step 9 handshake
- [ ] Both deployment surfaces (Governed, Marketing)

### Required Annotations

- [ ] Data flow directions (arrows)
- [ ] Gate closure conditions
- [ ] Authorization dependencies
- [ ] Surface qualification criteria

### Required Legend

- [ ] Actor definitions
- [ ] Gate definitions
- [ ] Phase descriptions
- [ ] Surface characteristics

---

## Verification Protocol

When producing or updating system diagrams:

1. **Completeness check:** Verify all checklist items are present
2. **Accuracy check:** Verify diagram matches current protocol
3. **Consistency check:** Verify legend matches diagram symbols
4. **Traceability check:** Verify data flows are annotated

---

## Known Limitations

This diagram does NOT show:

1. **Error paths** — What happens when gates fail to close
2. **Rollback procedures** — How to undo a problematic deployment
3. **Parallel cycles** — Multiple simultaneous Skill Forge cycles
4. **Cross-cycle dependencies** — How one cycle's output feeds another

These may be added in future diagram versions if needed.

---

## SVG Diagram

The canonical SVG diagram is available at:
`docs/standards/system-wiring.svg`

**Media type:** `image/svg+xml` (IA can read XML structure but may not render visually)

For visual inspection, a PNG render is available at:
`docs/standards/system-wiring.png`

**Media type:** `image/png` (IA cannot parse semantically; requires description)

---

*End of System Wiring Diagram + Legend*
