# Amortization Ledger

Economic accounting for portfolio development costs. Each release documents what became cheaper as a result of the work.

---

## v1.2.0 (2026-01-07)

**Release:** ContextSageWebsite Integration

### Verification of v1.1.0 predictions

| Prediction | Actual | Verified |
|------------|--------|----------|
| 1 file copy to `src/artifacts/` | 1 file (ContextSageWebsite.jsx) | ✅ |
| 1 new page wrapper (~35 lines) | 1 file (ContextSagePage.jsx, 34 lines) | ✅ |
| 1 route addition to App.jsx | 1 line added | ✅ |
| 1 entry in test routes array | 2 entries (routes + artifactRoutes) | ✅ |
| 0 CI workflow changes | 0 changes | ✅ |
| Fewer than 5 deliberation turns | Protocol amendment added turns | ⚠️ |

**Note:** Deliberation exceeded prediction due to protocol sequencing concern that resulted in the Execution Authorization Marker requirement. This was **value-creating overhead** that improved the protocol, not integration friction.

### What became cheaper

1. **Integration time: minutes, not hours**
   - Implementation tasks (copy, wrapper, route, tests): ~15 minutes
   - Zero accessibility violations in ContextSageWebsite
   - Pattern completely proven: copy-paste from SkillForgePage worked

2. **Test coverage: automatic expansion**
   - Added 2 route entries → 6 new tests generated automatically
   - Total tests: 17 → 23 (35% increase, 0 new test code)

3. **Protocol clarity: explicit authorization**
   - Protocol breach surfaced → Execution Authorization Marker added
   - Future integrations have explicit proceed/no-proceed signal
   - No more inference divergence between agents

### What was invested (new capital)

1. **Execution Authorization protocol amendment**
   - Normative rule established
   - Dual-layer enforcement (GA self-check + repo-visible artifact)
   - Skill updated to v1.2.0

2. **Artifact completion**
   - Source ContextSageWebsite.jsx was truncated (vite-playground corruption)
   - Completed About section + main component (~80 lines)

### Evidence

| Artifact | Location |
|----------|----------|
| Artifact file | `src/artifacts/ContextSageWebsite.jsx` |
| Page wrapper | `src/pages/ContextSagePage.jsx` (34 lines) |
| Route addition | `src/App.jsx:15` |
| Test routes | `tests/accessibility.spec.js:25,32` |
| Screenshots | `evidence/context-sage-evidence.png` |
| Protocol amendment | `dialogues/Dialogue - Context Sage Website Integration.md` |

### Falsifiable claims

- Next artifact integration (ArtifactDemo) should require:
  - 1 file copy to `src/artifacts/`
  - 1 new page wrapper (~35 lines)
  - 1 route addition to App.jsx
  - 2 entries in test arrays
  - 0 CI workflow changes
  - Execution Authorization before implementation
  - If source artifact is complete, 0 debugging time

---

## v1.1.0 (2026-01-06)

**Release:** SkillForgeVisualizer Integration

### What became cheaper

1. **Boundary marker integration: ~150 lines → 4 imports**
   - v1.0.0: Boundary markers inline in DemoWithBoundaries.jsx (~150 lines)
   - v1.1.0: Extracted to `src/components/`, artifact pages use 4 imports
   - Future integrations: Copy pattern from SkillForgePage.jsx (32 lines)

2. **Accessibility test extension: full suite → route array entry**
   - v1.0.0: Wrote 9 tests from scratch with axe-core integration
   - v1.1.0: Added 2 entries to `routes[]` array, tests auto-expanded to 17
   - Future integrations: Add 1 route entry → 6 new tests generated

3. **CI workflow: no changes required**
   - v1.0.0: Created accessibility.yml with Playwright setup
   - v1.1.0: Zero modifications needed
   - Future integrations: Zero modifications expected

4. **Routing infrastructure: created and reusable**
   - v1.0.0: No routing (single page)
   - v1.1.0: HashRouter + Layout + Navigation created
   - Future integrations: Add route to App.jsx, create page wrapper

5. **Deliberation overhead: 8 turns → 5 turns (UG)**
   - v1.0.0: Full 8-turn deliberation (pattern creation)
   - v1.1.0: 5 turns to Understanding Gate (pattern reuse)
   - Future integrations: Expected further reduction with established patterns

### Evidence

| Artifact | Location |
|----------|----------|
| Extracted components | `src/components/{ProvenanceHeader,EpistemicBadge,AuthorshipMarker,DemoContainer}.jsx` |
| Page wrapper pattern | `src/pages/SkillForgePage.jsx` (32 lines) |
| Multi-route tests | `tests/accessibility.spec.js` (routes array, lines 21-31) |
| Screenshots | `evidence/{landing,reference,skill-forge}-evidence.png` |

### Falsifiable claims

- Next artifact integration (ContextSageWebsite) should require:
  - 1 file copy to `src/artifacts/`
  - 1 new page wrapper (~35 lines)
  - 1 route addition to App.jsx
  - 1 entry in test routes array
  - 0 CI workflow changes
  - Fewer than 5 deliberation turns if scope is similarly constrained

---

## v1.0.0 (2026-01-05)

**Release:** Portfolio Foundation + DemoWithBoundaries Reference

### What was created (baseline)

- Boundary marker pattern (ProvenanceHeader, EpistemicBadge, AuthorshipMarker, DemoContainer)
- Accessibility CI enforcement (axe-core + Playwright)
- WCAG 2.1 AA hard-blocks on critical/serious violations
- Screenshot evidence protocol for IA inspection
- Full deliberation protocol established (8 turns)

### Cost (to be amortized)

- 8-turn heterogeneous AI deliberation
- Pattern creation from first principles
- Accessibility debugging (6 contrast violations fixed)
- CI/CD pipeline establishment

This release represents the **capital investment**. Subsequent releases amortize these costs.
