# Responsive QA Acceptance Criteria

> **Canary:** `SYSTEM-SPEC-BUNDLE-2026-01-07-V1`
> **Status:** VERIFIED
> **Applies to:** All artifacts on the governed surface

---

## Purpose

This document defines the responsive design requirements for governed-surface artifacts. It establishes:
- Viewport classes that must be supported
- Minimum reproduction protocol for bug reports
- Definition of "acceptable degradation"
- Evidence requirements for resolution claims

Per DP-4(B), responsive issues are **blocking for implementation cycles**. This document defines the criteria; actual bug reproduction and fixes are deferred to implementation.

---

## Viewport Classes

All governed-surface artifacts MUST support the following viewport classes:

### Class Definitions

| Class | Width Range | Representative Devices |
|-------|-------------|------------------------|
| **Mobile** | 320px - 767px | iPhone SE, Android phones |
| **Tablet** | 768px - 1023px | iPad Mini, iPad, Android tablets |
| **Desktop** | 1024px+ | Laptops, desktop monitors |

### Breakpoint Boundaries

| Breakpoint | Width | Transition |
|------------|-------|------------|
| Mobile → Tablet | 768px | Layout may reflow |
| Tablet → Desktop | 1024px | Full layout expected |

### Minimum Supported Width

**320px** is the absolute minimum supported width. Content below this width is not required to render correctly.

---

## Required Behavior by Viewport

### Mobile (320px - 767px)

| Element | Required Behavior |
|---------|-------------------|
| **Navigation** | Collapsible or stacked; no horizontal overflow |
| **Text** | Readable without horizontal scrolling |
| **Interactive elements** | Minimum touch target 44x44px |
| **Images** | Scale proportionally; no overflow |
| **Tables** | Horizontally scrollable OR responsive reflow |
| **Code blocks** | Horizontally scrollable with visible scrollbar |

### Tablet (768px - 1023px)

| Element | Required Behavior |
|---------|-------------------|
| **Navigation** | May be horizontal or collapsible |
| **Text** | Optimal line length (45-75 characters) |
| **Interactive elements** | Minimum touch target 44x44px |
| **Multi-column layouts** | Permitted but not required |
| **Tables** | Full display preferred; scroll acceptable |

### Desktop (1024px+)

| Element | Required Behavior |
|---------|-------------------|
| **Navigation** | Full horizontal display |
| **Text** | Max-width container recommended |
| **Interactive elements** | Standard sizing acceptable |
| **Multi-column layouts** | Permitted |
| **Tables** | Full display expected |

---

## Minimum Reproduction Protocol

Bug reports for responsive issues MUST include:

### Required Information

| Field | Description | Example |
|-------|-------------|---------|
| **Viewport width** | Exact pixel width | 375px |
| **Viewport height** | Exact pixel height | 667px |
| **Browser** | Name and version | Chrome 120.0.6099.109 |
| **OS** | Operating system | iOS 17.2 |
| **Device** | Physical device or emulator | iPhone 13 / Chrome DevTools |
| **URL** | Exact page URL | `https://adambalm.github.io/portfolio/#/skill-forge` |
| **Description** | What is broken | "Navigation overflows viewport" |

### Required Evidence

| Evidence | Format | Requirement |
|----------|--------|-------------|
| **Screenshot** | PNG or JPG | Shows the issue clearly |
| **Steps to reproduce** | Numbered list | Precise sequence to trigger |
| **Expected behavior** | Text | What should happen |
| **Actual behavior** | Text | What actually happens |

### Optional Evidence (Recommended)

| Evidence | Format | When Useful |
|----------|--------|-------------|
| **Video recording** | MP4 or GIF | For interaction-dependent bugs |
| **Console errors** | Text | For JavaScript-related issues |
| **Network tab** | Screenshot | For loading-related issues |

---

## Browser/Device Matrix

### Required Testing

All governed-surface artifacts MUST be tested on:

| Browser | Versions | Platforms |
|---------|----------|-----------|
| **Chrome** | Latest, Latest-1 | Windows, macOS, Android |
| **Safari** | Latest, Latest-1 | macOS, iOS |
| **Firefox** | Latest, Latest-1 | Windows, macOS |
| **Edge** | Latest | Windows |

### Recommended Testing

| Browser | Versions | Platforms |
|---------|----------|-----------|
| Samsung Internet | Latest | Android |
| Chrome | Latest | iOS |

### Not Required

| Browser | Reason |
|---------|--------|
| Internet Explorer | End of life |
| Opera | Low market share |
| Brave | Chrome-based; covered by Chrome testing |

---

## Definition of Acceptable Degradation

Not all visual differences constitute bugs. This section defines what is acceptable.

### Acceptable Degradation

| Degradation | Acceptable? | Condition |
|-------------|-------------|-----------|
| **Font rendering differences** | Yes | Cross-browser variation |
| **Subpixel alignment differences** | Yes | 1-2px variation |
| **Scroll behavior differences** | Yes | Smooth vs instant |
| **Animation timing differences** | Yes | If functionality preserved |
| **Form control styling** | Yes | Native OS styling acceptable |
| **Horizontal scrolling on code blocks** | Yes | Expected behavior |
| **Horizontal scrolling on wide tables** | Yes | If content remains accessible |

### Unacceptable Degradation (Blocking)

| Degradation | Blocking? | Reason |
|-------------|-----------|--------|
| **Content overflow hiding text** | Yes | Information loss |
| **Interactive elements unreachable** | Yes | Functionality loss |
| **Text unreadable (overlap, cutoff)** | Yes | Information loss |
| **Navigation inaccessible** | Yes | Site unusable |
| **Images breaking layout** | Yes | Visual integrity |
| **JavaScript errors preventing interaction** | Yes | Functionality loss |
| **Contrast below WCAG AA** | Yes | Accessibility violation |

### Edge Cases

| Situation | Resolution |
|-----------|------------|
| Works in emulator, fails on device | Device behavior is authoritative |
| Works in latest, fails in Latest-1 | Must support both |
| Works in portrait, fails in landscape | Both orientations must work |
| Works on WiFi, fails on slow connection | Loading states must be graceful |

---

## Evidence Requirements for Resolution Claims

When claiming a responsive issue is resolved:

### Required Evidence

| Evidence | Format | Purpose |
|----------|--------|---------|
| **Before screenshot** | PNG | Shows original issue |
| **After screenshot** | PNG | Shows resolved state |
| **Commit hash** | Text | Identifies the fix |
| **Viewport dimensions** | Text | Matches original report |
| **Browser/version** | Text | Matches original report |

### Required Verification

| Verification | Method |
|--------------|--------|
| Original issue no longer reproduces | Manual testing |
| No new issues introduced | Visual regression check |
| All viewport classes still work | Cross-viewport testing |
| Accessibility still passes | CI run (GitHub Actions URL) |

### Evidence Location

Resolution evidence MUST be:
- Committed to `evidence/` directory
- Referenced in the dialogue file
- Linked in AMORTIZATION.md if part of a release

---

## Known Issues Tracker

For tracking responsive issues before resolution:

### Issue Documentation Format

```markdown
## [Issue ID]: [Brief Description]

**Status:** Open | In Progress | Resolved
**Reported:** [Date]
**Viewport:** [Width]x[Height]
**Browser:** [Name Version]
**Artifact:** [Artifact name]

### Description
[What is broken]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
...

### Evidence
- Screenshot: [path or URL]

### Resolution
[If resolved: commit hash, evidence links]
```

### Current Known Issues

As of this document's creation, the following responsive issues are known:

| Issue | Artifact | Status | Viewport |
|-------|----------|--------|----------|
| SkillForge responsive breakage | SkillForgeVisualizer | **UNCONFIRMED** | Unknown |

**Note:** The SkillForge responsive issue was reported but lacks reproduction steps. Per DP-4(B), this blocks implementation cycles until reproduced and resolved.

---

## Testing Protocol

### Pre-Deployment Testing

Before any artifact is deployed to the governed surface:

1. **Automated testing** (if available)
   - Run visual regression tests
   - Verify no console errors

2. **Manual testing**
   - Test all three viewport classes
   - Test on at least 2 browsers
   - Test interactive elements

3. **Accessibility testing**
   - Run axe-core via Playwright
   - Verify CI passes

### Post-Deployment Verification

After deployment:

1. **Spot check** on actual devices (not just emulators)
2. **Verify** no caching issues with previous version
3. **Document** any new issues discovered

---

*End of Responsive QA Acceptance Criteria*
