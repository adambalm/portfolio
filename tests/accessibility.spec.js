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

test.describe('Accessibility - WCAG 2.1 AA Compliance', () => {

  test('should have no critical or serious accessibility violations', async ({ page }) => {
    await page.goto('/');

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
      console.log('\n=== Accessibility Violations Found ===\n');
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
      `Found ${hardBlockViolations.length} critical/serious accessibility violation(s). ` +
      `These MUST be fixed before integration.`
    ).toHaveLength(0);
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['cat.color'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id.includes('contrast')
    );

    expect(
      contrastViolations,
      'Color contrast violations found. WCAG 2.1 AA requires 4.5:1 for normal text, 3:1 for large text.'
    ).toHaveLength(0);
  });

  test('should have keyboard-accessible interactive elements', async ({ page }) => {
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

  test('should have proper heading hierarchy', async ({ page }) => {
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

  test('should have accessible button labels', async ({ page }) => {
    await page.goto('/');

    const buttons = await page.locator('button').all();

    for (const button of buttons) {
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');

      const hasAccessibleName = (text && text.trim().length > 0) ||
                                 ariaLabel ||
                                 ariaLabelledBy;

      expect(
        hasAccessibleName,
        'Button must have accessible name (text content, aria-label, or aria-labelledby)'
      ).toBe(true);
    }
  });

});

test.describe('Visual Regression - Boundary Markers', () => {

  test('should render provenance header', async ({ page }) => {
    await page.goto('/');

    // Check for provenance section
    const provenance = page.locator('text=Provenance');
    await expect(provenance).toBeVisible();

    // Check for required provenance fields
    await expect(page.locator('text=Generated by:')).toBeVisible();
    await expect(page.locator('text=Date:')).toBeVisible();
    await expect(page.locator('text=Context:')).toBeVisible();
  });

  test('should render epistemic badge', async ({ page }) => {
    await page.goto('/');

    // Check for epistemic badge
    const badge = page.locator('text=[ILLUSTRATIVE]');
    await expect(badge).toBeVisible();
  });

  test('should render visual containment', async ({ page }) => {
    await page.goto('/');

    // Check for "Demo Content" label indicating containment
    const demoLabel = page.getByText('Demo Content', { exact: true }).first();
    await expect(demoLabel).toBeVisible();
  });

  test('should capture screenshot for evidence', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be fully rendered
    await page.waitForLoadState('networkidle');

    // Capture full page screenshot
    await page.screenshot({
      path: 'test-results/boundary-markers-evidence.png',
      fullPage: true,
    });
  });

});
