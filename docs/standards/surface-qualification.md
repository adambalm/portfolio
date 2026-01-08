# Surface Qualification Rules

> **Canary:** `SYSTEM-SPEC-BUNDLE-2026-01-07-V1`
> **Status:** VERIFIED
> **Applies to:** All content considered for deployment

---

## Purpose

This document defines the criteria for qualifying content as **Governed** or **Marketing** surface material. It establishes rules for preventing cross-surface contamination and handling dual-use content.

Per DP-5(C), governed and marketing surfaces will be **separate deployments**. This document defines the **qualification criteria only**; architectural specification is deferred to a subsequent implementation cycle.

---

## Surface Definitions

### Governed Surface

The governed surface is the **auditable, epistemically bounded** deployment. Content here is subject to:
- Full boundary marker requirements
- Accessibility CI enforcement
- Evidence chain documentation
- IA inspection record requirements
- Protocol compliance verification

**Purpose:** To host content that makes claims and must be traceable, verifiable, and epistemically honest.

### Marketing Surface

The marketing surface is the **illustrative, persuasive** deployment. Content here is:
- Explicitly non-authoritative
- Not subject to epistemic boundary requirements
- Permitted to use persuasive language
- Not required to have evidence chains

**Purpose:** To host content that demonstrates capability, attracts attention, and communicates value without making auditable claims.

---

## Governed Surface Qualification Criteria

Content qualifies for the governed surface **only if ALL** of the following are true:

### Required: Boundary Markers

| Marker | Requirement |
|--------|-------------|
| Provenance Header | Present with: agent, date, context, sourceUrl |
| Epistemic Badge | Present with status: VERIFIED, ILLUSTRATIVE, or EXPLORATORY |
| Authorship Marker | Present with type: Human, AI, or Collaborative |
| Demo Container | Present with dashed border and "Demo Content" label |

**Verification:** Visual inspection of deployed artifact

### Required: Accessibility CI

| Requirement | Standard |
|-------------|----------|
| Contrast ratio | WCAG 2.1 AA (4.5:1 for normal text) |
| Keyboard navigation | All interactive elements reachable |
| Alt text | Present on all images |
| Heading hierarchy | Logical and sequential |

**Verification:** GitHub Actions run URL for `accessibility.yml` passing

### Required: IA Inspection Record

| Requirement | Evidence |
|-------------|----------|
| Skill Forge cycle completed | Dialogue file in `dialogues/` |
| UG closed | Documented in dialogue |
| AG closed | Documented in dialogue |
| Step 9 completed | Documented in dialogue |

**Verification:** Dialogue file exists with all gate closures documented

### Required: Evidence Provenance Chain

| Requirement | Format |
|-------------|--------|
| Source documented | File path or URL |
| Canary present | Embedded in artifact |
| Commit hash recorded | In dialogue or AMORTIZATION.md |
| Actions run documented | GitHub Actions URL |

**Verification:** AMORTIZATION.md entry with evidence table and provenance chain

---

## Marketing Surface Qualification Criteria

Content qualifies for the marketing surface if **ANY** of the following are true:

### Qualifying Conditions

1. **Persuasive intent:** Content is designed to attract, convince, or demonstrate capability
2. **No epistemic claims:** Content does not assert facts that require verification
3. **Illustrative purpose:** Content shows "what is possible" rather than "what is true"
4. **Non-authoritative framing:** Content is explicitly positioned as promotional

### Not Required for Marketing

- Boundary markers
- Accessibility CI (though recommended for usability)
- IA inspection record
- Evidence provenance chain
- Skill Forge deliberation

### Required for Marketing

| Requirement | Reason |
|-------------|--------|
| Non-authoritative disclosure | Must not imply governed-surface authority |
| No cross-reference to governed claims | Cannot cite governed content as endorsement |

---

## Cross-Surface Prohibition Rules

### What May NOT Appear on Governed Surface

| Prohibited | Reason |
|------------|--------|
| **Marketing language** | e.g., "Best in class", "Industry leading" — violates epistemic containment |
| **Unverifiable superlatives** | e.g., "Most comprehensive", "Cutting edge" — cannot be substantiated |
| **Sales calls-to-action** | e.g., "Buy now", "Contact us" — commercial intent contaminates epistemic space |
| **Testimonials** | Unless subject to same verification standards |
| **Promotional imagery** | Stock photos, lifestyle images without functional purpose |

### What May NOT Appear on Marketing Surface

| Prohibited | Reason |
|------------|--------|
| **Boundary markers** | Creates false impression of governed-surface authority |
| **Evidence chains** | Implies auditability that doesn't exist |
| **Canary references** | Implies Skill Forge provenance |
| **Epistemic badges** | Implies inspection that hasn't occurred |
| **Citations to governed artifacts** | Creates false authority transfer |

### Why These Prohibitions Matter

- **Governed → Marketing leakage:** Promotional language undermines epistemic credibility
- **Marketing → Governed leakage:** Boundary markers on marketing content constitute "epistemic authority laundering"

---

## Dual-Use Content Handling

Some content may legitimately serve both purposes. This section defines how to handle it.

### Definition

**Dual-use content:** Material that could appear on either surface without modification, such as:
- Technical explanations
- Process descriptions
- Architecture diagrams
- Code examples

### Resolution Protocol

1. **Default to governed surface** if content makes any claims requiring verification
2. **Use marketing surface** only if content is purely illustrative
3. **Create two versions** if both uses are needed:
   - Governed version: with boundary markers, evidence chain
   - Marketing version: with non-authoritative framing, no markers
4. **Never share the same artifact** across both surfaces

### Version Linking

If dual-use content exists on both surfaces:

| Surface | Requirement |
|---------|-------------|
| Governed | May reference that a marketing version exists |
| Marketing | MUST NOT reference the governed version |

This asymmetry prevents marketing content from borrowing governed-surface credibility.

---

## Surface Transition Rules

### Governed → Marketing

Content may move from governed to marketing surface if:
1. All boundary markers are removed
2. All evidence chain references are removed
3. Non-authoritative framing is added
4. The governed version remains canonical

**Use case:** Creating promotional excerpts from verified content

### Marketing → Governed

Content may move from marketing to governed surface if:
1. Full Skill Forge cycle is completed
2. All boundary markers are added
3. Evidence chain is documented
4. IA inspection is completed

**Use case:** Formalizing a proof-of-concept into auditable form

---

## Verification Checklist

Before deploying to either surface, verify:

### For Governed Surface

- [ ] All four boundary markers present
- [ ] Accessibility CI passing
- [ ] Dialogue file exists with closed gates
- [ ] AMORTIZATION.md entry with evidence chain
- [ ] No prohibited marketing content

### For Marketing Surface

- [ ] Non-authoritative disclosure present
- [ ] No boundary markers present
- [ ] No evidence chain references
- [ ] No citations to governed content
- [ ] No canary references

---

## Enforcement

### During Skill Forge Cycles

IA is responsible for verifying surface qualification during Step 9 review.

### Post-Deployment

Surface qualification violations discovered post-deployment should be:
1. Logged as protocol incidents
2. Remediated in a subsequent cycle
3. Documented in AMORTIZATION.md

### Dispute Resolution

If GA and IA disagree on surface qualification:
1. HO makes final determination
2. Rationale is documented in dialogue
3. Decision becomes precedent for similar cases

---

*End of Surface Qualification Rules*
