/**
 * Accessibility Test Suite
 *
 * Evidence artifact for Skill Forge deliberation.
 * Enforces accessibility as a structural constraint with hard blocks.
 *
 * HARD BLOCK conditions (fail the build):
 * - Any axe-core violation with impact "critical" or "serious"
 * - Contrast failures (WCAG 2.1 AA)
 * - Missing alt text on images
 * - Keyboard navigation failures
 *
 * WARNINGS (logged but don't block):
 * - axe-core "minor" violations
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Routes to test
const routes = [
  { path: '/', name: 'Landing' },
  { path: '/#/reference', name: 'Reference' },
  { path: '/#/skill-forge', name: 'Skill Forge' },
  { path: '/#/context-sage', name: 'Context Sage' },
];

// Artifact routes (have boundary markers)
const artifactRoutes = [
  { path: '/#/reference', name: 'Reference' },
  { path: '/#/skill-forge', name: 'Skill Forge' },
  { path: '/#/context-sage', name: 'Context Sage' },
];

test.describe('Accessibility - WCAG 2.1 AA Compliance', () => {

  for (const route of routes) {
    test(`${route.name}: should have no critical or serious accessibility violations`, async ({ page }) => {
      await page.goto(route.path);

      // Run axe-core analysis
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Filter for hard-block violations (critical and serious)
      const hardBlockViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      );

      // Log all violations for debugging
      if (accessibilityScanResults.violations.length > 0) {
        console.log(`\n=== ${route.name} Accessibility Violations ===\n`);
        accessibilityScanResults.violations.forEach(v => {
          const blockStatus = (v.impact === 'critical' || v.impact === 'serious')
            ? '🛑 HARD BLOCK'
            : '⚠️ WARNING';
          console.log(`${blockStatus} [${v.impact}] ${v.id}: ${v.description}`);
          console.log(`  Help: ${v.helpUrl}`);
          v.nodes.forEach(node => {
            console.log(`  - ${node.html.substring(0, 100)}...`);
          });
          console.log('');
        });
      }

      // HARD BLOCK: Fail if any critical or serious violations
      expect(
        hardBlockViolations,
        `Found ${hardBlockViolations.length} critical/serious accessibility violation(s) on ${route.name}. ` +
        `These MUST be fixed before integration.`
      ).toHaveLength(0);
    });

    test(`${route.name}: should have sufficient color contrast`, async ({ page }) => {
      await page.goto(route.path);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa', 'wcag21aa'])
        .analyze();

      // Filter for AA level contrast only (not AAA "color-contrast-enhanced")
      const contrastViolations = accessibilityScanResults.violations.filter(
        v => v.id === 'color-contrast'
      );

      expect(
        contrastViolations,
        `${route.name}: Color contrast violations found. WCAG 2.1 AA requires 4.5:1 for normal text, 3:1 for large text.`
      ).toHaveLength(0);
    });
  }

  test('Landing: should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Get all headings in order
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = await Promise.all(
      headings.map(async h => {
        const tagName = await h.evaluate(el => el.tagName);
        return parseInt(tagName.replace('H', ''));
      })
    );

    // Check for h1 presence
    expect(
      headingLevels.includes(1),
      'Page should have at least one h1 element'
    ).toBe(true);

    // Check for skipped heading levels
    for (let i = 1; i < headingLevels.length; i++) {
      const jump = headingLevels[i] - headingLevels[i - 1];
      expect(
        jump,
        `Heading level skipped: h${headingLevels[i - 1]} to h${headingLevels[i]}. ` +
        `Headings should not skip levels.`
      ).toBeLessThanOrEqual(1);
    }
  });

  test('Landing: should have keyboard-accessible interactive elements', async ({ page }) => {
    await page.goto('/');

    // Find all interactive elements
    const interactiveElements = await page.locator('button, a, input, select, textarea, [tabindex]');
    const count = await interactiveElements.count();

    // Each interactive element should be focusable
    for (let i = 0; i < count; i++) {
      const element = interactiveElements.nth(i);
      const tagName = await element.evaluate(el => el.tagName.toLowerCase());
      const tabindex = await element.getAttribute('tabindex');

      // Skip elements with tabindex="-1" (intentionally removed from tab order)
      if (tabindex === '-1') continue;

      // Element should be visible and enabled
      const isVisible = await element.isVisible();
      if (!isVisible) continue;

      // Try to focus the element
      await element.focus();
      const isFocused = await element.evaluate(el => document.activeElement === el);

      expect(
        isFocused,
        `Interactive element <${tagName}> should be keyboard focusable`
      ).toBe(true);
    }
  });

});

test.describe('Visual Regression - Boundary Markers', () => {

  for (const route of artifactRoutes) {
    test(`${route.name}: should render provenance header`, async ({ page }) => {
      await page.goto(route.path);

      // Check for provenance section (use first match - the header div)
      const provenance = page.getByText('Provenance', { exact: true }).first();
      await expect(provenance).toBeVisible();

      // Check for required provenance fields
      await expect(page.locator('text=Generated by:')).toBeVisible();
      await expect(page.locator('text=Date:')).toBeVisible();
      await expect(page.locator('text=Context:')).toBeVisible();
    });

    test(`${route.name}: should render epistemic badge`, async ({ page }) => {
      await page.goto(route.path);

      // Check for epistemic badge
      const badge = page.locator('text=[ILLUSTRATIVE]');
      await expect(badge).toBeVisible();
    });

    test(`${route.name}: should render visual containment`, async ({ page }) => {
      await page.goto(route.path);

      // Check for "Demo Content" label indicating containment
      const demoLabel = page.getByText('Demo Content', { exact: true }).first();
      await expect(demoLabel).toBeVisible();
    });
  }

});

test.describe('Screenshot Evidence', () => {

  for (const route of routes) {
    test(`${route.name}: capture screenshot for evidence`, async ({ page }) => {
      await page.goto(route.path);

      // Wait for page to be fully rendered
      await page.waitForLoadState('networkidle');

      // Capture full page screenshot
      const fileName = route.name.toLowerCase().replace(/ /g, '-');
      await page.screenshot({
        path: `test-results/${fileName}-evidence.png`,
        fullPage: true,
      });
    });
  }

});
