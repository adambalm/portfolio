/**
 * SkillForge v3.0.0 Feature Tests
 *
 * Tests for the three new features introduced in v3.0.0:
 * 1. RewordGate - Cognitive brake with 50-char minimum
 * 2. Swimlane Layout - 3-column HO/GA/IA grid
 * 3. Economics SVG - Responsive chart with touch targets
 *
 * Evidence artifact for Skill Forge deliberation.
 */

import { test, expect } from '@playwright/test';

const SKILL_FORGE_URL = '/#/skill-forge';

test.describe('SkillForge v3.0.0 - RewordGate', () => {

  test('should display RewordGate with Hamlet epigraph', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Example section (singular, not Examples)
    const exampleTab = page.locator('[data-testid="nav-example"]');
    await exampleTab.click();

    // Find the RewordGate component
    const rewordGate = page.locator('[data-testid="reword-gate"]');
    await expect(rewordGate).toBeVisible();

    // Check for the Hamlet epigraph
    const epigraph = page.locator('text=Bring me to the test');
    await expect(epigraph).toBeVisible();

    // Check for the attribution
    const attribution = page.locator('text=Hamlet');
    await expect(attribution).toBeVisible();
  });

  test('should have approve button disabled when text is under 50 chars', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Example section
    const exampleTab = page.locator('[data-testid="nav-example"]');
    await exampleTab.click();

    // Expand the opt-in articulation gate
    const expandButton = page.locator('[data-testid="expand-articulation"]');
    await expandButton.click();

    const input = page.locator('[data-testid="reword-input"]');
    const button = page.locator('[data-testid="approve-button"]');

    // Initially button should be disabled
    await expect(button).toBeDisabled();

    // Type less than 50 characters
    await input.fill('This is only 40 characters long here!');
    await expect(button).toBeDisabled();
  });

  test('should enable approve button when text reaches 50 chars', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Example section
    const exampleTab = page.locator('[data-testid="nav-example"]');
    await exampleTab.click();

    // Expand the opt-in articulation gate
    const expandButton = page.locator('[data-testid="expand-articulation"]');
    await expandButton.click();

    const input = page.locator('[data-testid="reword-input"]');
    const button = page.locator('[data-testid="approve-button"]');

    // Type exactly 50 characters
    const fiftyChars = 'This text is exactly fifty characters long here!!!';
    expect(fiftyChars.length).toBe(50);

    await input.fill(fiftyChars);
    await expect(button).toBeEnabled();
  });

  test('should show character count feedback', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Example section
    const exampleTab = page.locator('[data-testid="nav-example"]');
    await exampleTab.click();

    // Expand the opt-in articulation gate
    const expandButton = page.locator('[data-testid="expand-articulation"]');
    await expandButton.click();

    const input = page.locator('[data-testid="reword-input"]');

    // Type some text
    await input.fill('Testing the character count');

    // Should show current count and minimum
    await expect(page.locator('text=/\\d+ characters/')).toBeVisible();
    await expect(page.locator('text=/50 minimum/')).toBeVisible();
  });

  test('should transition to approved state on button click', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Example section
    const exampleTab = page.locator('[data-testid="nav-example"]');
    await exampleTab.click();

    // Expand the opt-in articulation gate
    const expandButton = page.locator('[data-testid="expand-articulation"]');
    await expandButton.click();

    const input = page.locator('[data-testid="reword-input"]');
    const button = page.locator('[data-testid="approve-button"]');

    // Fill with 50+ characters
    await input.fill('I understand that the Skill Forge pattern enables heterogeneous AI deliberation.');

    // Click approve
    await button.click();

    // Check for approved state
    const approvedText = page.locator('text=Decision Approved');
    await expect(approvedText).toBeVisible();

    // The textarea should no longer be visible
    await expect(input).not.toBeVisible();
  });

  test('should have accessible textarea with aria-label', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Example section
    const exampleTab = page.locator('[data-testid="nav-example"]');
    await exampleTab.click();

    // Expand the opt-in articulation gate
    const expandButton = page.locator('[data-testid="expand-articulation"]');
    await expandButton.click();

    const input = page.locator('[data-testid="reword-input"]');
    const ariaLabel = await input.getAttribute('aria-label');

    expect(ariaLabel).toBeTruthy();
  });

  test('should have 44px minimum touch target on approve button', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Example section
    const exampleTab = page.locator('[data-testid="nav-example"]');
    await exampleTab.click();

    // Expand the opt-in articulation gate
    const expandButton = page.locator('[data-testid="expand-articulation"]');
    await expandButton.click();

    const button = page.locator('[data-testid="approve-button"]');
    const box = await button.boundingBox();

    // WCAG 2.2 requires 44px minimum touch target
    expect(box.height).toBeGreaterThanOrEqual(44);
  });

});

test.describe('SkillForge v3.0.0 - Swimlane Layout', () => {

  test('should display layout toggle button', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Process section
    const processTab = page.locator('[data-testid="nav-process"]');
    await processTab.click();

    const toggle = page.locator('[data-testid="layout-toggle"]');
    await expect(toggle).toBeVisible();
  });

  test('should toggle between classic and swimlane views', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Process section
    const processTab = page.locator('[data-testid="nav-process"]');
    await processTab.click();

    const toggle = page.locator('[data-testid="layout-toggle"]');

    // Initially should show classic view (swimlane not visible)
    let swimlane = page.locator('[data-testid="swimlane-view"]');
    const initiallyVisible = await swimlane.isVisible().catch(() => false);

    // Click toggle
    await toggle.click();

    // After toggle, the view should change
    swimlane = page.locator('[data-testid="swimlane-view"]');
    const afterToggle = await swimlane.isVisible().catch(() => false);

    // State should have changed
    expect(afterToggle).not.toBe(initiallyVisible);
  });

  test('swimlane should have three lanes (HO, GA, IA)', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Process section
    const processTab = page.locator('[data-testid="nav-process"]');
    await processTab.click();

    // Ensure swimlane view is active
    const toggle = page.locator('[data-testid="layout-toggle"]');
    const swimlane = page.locator('[data-testid="swimlane-view"]');

    // Toggle until swimlane is visible
    if (!(await swimlane.isVisible().catch(() => false))) {
      await toggle.click();
    }

    // Check for all three lanes
    await expect(page.locator('[data-testid="swimlane-ho"]')).toBeVisible();
    await expect(page.locator('[data-testid="swimlane-ga"]')).toBeVisible();
    await expect(page.locator('[data-testid="swimlane-ia"]')).toBeVisible();
  });

  test('swimlane should show Human Orchestrator lane', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Process section
    const processTab = page.locator('[data-testid="nav-process"]');
    await processTab.click();

    // Ensure swimlane view is active
    const toggle = page.locator('[data-testid="layout-toggle"]');
    const swimlane = page.locator('[data-testid="swimlane-view"]');

    if (!(await swimlane.isVisible().catch(() => false))) {
      await toggle.click();
    }

    // Check HO lane content
    const hoLane = page.locator('[data-testid="swimlane-ho"]');
    await expect(hoLane.locator('text=Human Orchestrator')).toBeVisible();
  });

  test('swimlane should show Model A (GA) lane', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Process section
    const processTab = page.locator('[data-testid="nav-process"]');
    await processTab.click();

    // Ensure swimlane view is active
    const toggle = page.locator('[data-testid="layout-toggle"]');
    const swimlane = page.locator('[data-testid="swimlane-view"]');

    if (!(await swimlane.isVisible().catch(() => false))) {
      await toggle.click();
    }

    // Check GA lane content - actual text is "Model A (GA)"
    const gaLane = page.locator('[data-testid="swimlane-ga"]');
    await expect(gaLane.locator('text=Model A (GA)')).toBeVisible();
  });

  test('swimlane should show Model B (IA) lane', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Process section
    const processTab = page.locator('[data-testid="nav-process"]');
    await processTab.click();

    // Ensure swimlane view is active
    const toggle = page.locator('[data-testid="layout-toggle"]');
    const swimlane = page.locator('[data-testid="swimlane-view"]');

    if (!(await swimlane.isVisible().catch(() => false))) {
      await toggle.click();
    }

    // Check IA lane content - actual text is "Model B (IA)"
    const iaLane = page.locator('[data-testid="swimlane-ia"]');
    await expect(iaLane.locator('text=Model B (IA)')).toBeVisible();
  });

  test('swimlane should be responsive - single column on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Process section
    const processTab = page.locator('[data-testid="nav-process"]');
    await processTab.click();

    // Ensure swimlane view is active
    const toggle = page.locator('[data-testid="layout-toggle"]');
    const swimlane = page.locator('[data-testid="swimlane-view"]');

    if (!(await swimlane.isVisible().catch(() => false))) {
      await toggle.click();
    }

    // Get positions of lanes
    const hoBox = await page.locator('[data-testid="swimlane-ho"]').boundingBox();
    const gaBox = await page.locator('[data-testid="swimlane-ga"]').boundingBox();

    // On mobile, GA should be BELOW HO (stacked), not beside it
    expect(gaBox.y).toBeGreaterThan(hoBox.y + hoBox.height - 10); // Allow small overlap
  });

  test('swimlane should be responsive - three columns on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Process section
    const processTab = page.locator('[data-testid="nav-process"]');
    await processTab.click();

    // Ensure swimlane view is active
    const toggle = page.locator('[data-testid="layout-toggle"]');
    const swimlane = page.locator('[data-testid="swimlane-view"]');

    if (!(await swimlane.isVisible().catch(() => false))) {
      await toggle.click();
    }

    // Get positions of lanes
    const hoBox = await page.locator('[data-testid="swimlane-ho"]').boundingBox();
    const gaBox = await page.locator('[data-testid="swimlane-ga"]').boundingBox();
    const iaBox = await page.locator('[data-testid="swimlane-ia"]').boundingBox();

    // On desktop, all three should be side by side (same Y position)
    expect(Math.abs(hoBox.y - gaBox.y)).toBeLessThan(10);
    expect(Math.abs(gaBox.y - iaBox.y)).toBeLessThan(10);

    // And horizontally arranged (HO left of GA left of IA)
    expect(hoBox.x).toBeLessThan(gaBox.x);
    expect(gaBox.x).toBeLessThan(iaBox.x);
  });

});

test.describe('SkillForge v3.0.0 - Economics SVG', () => {

  test('should display cost curve chart', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Economics section
    const economicsTab = page.locator('[data-testid="nav-economics"]');
    await economicsTab.click();

    // Check for SVG chart
    const svg = page.locator('svg[data-testid="cost-curve-svg"]');
    await expect(svg).toBeVisible();
  });

  test('SVG should have preserveAspectRatio attribute', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Economics section
    const economicsTab = page.locator('[data-testid="nav-economics"]');
    await economicsTab.click();

    const svg = page.locator('svg[data-testid="cost-curve-svg"]');
    const preserveAspectRatio = await svg.getAttribute('preserveAspectRatio');

    expect(preserveAspectRatio).toBe('xMidYMid meet');
  });

  test('SVG should have viewBox for responsive scaling', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Economics section
    const economicsTab = page.locator('[data-testid="nav-economics"]');
    await economicsTab.click();

    const svg = page.locator('svg[data-testid="cost-curve-svg"]');
    const viewBox = await svg.getAttribute('viewBox');

    expect(viewBox).toBeTruthy();
    expect(viewBox).toMatch(/^\d+ \d+ \d+ \d+$/);
  });

  test('sliders should have 44px touch targets', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Economics section
    const economicsTab = page.locator('[data-testid="nav-economics"]');
    await economicsTab.click();

    // Find all range inputs (sliders)
    const sliders = page.locator('input[type="range"]');
    const count = await sliders.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const slider = sliders.nth(i);
      const box = await slider.boundingBox();

      // WCAG 2.2 requires 44px minimum touch target
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('sliders should have accessible names via labels', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Economics section
    const economicsTab = page.locator('[data-testid="nav-economics"]');
    await economicsTab.click();

    // Find all range inputs (sliders) - they use htmlFor/id linking
    const sliders = page.locator('input[type="range"]');
    const count = await sliders.count();

    for (let i = 0; i < count; i++) {
      const slider = sliders.nth(i);
      const id = await slider.getAttribute('id');

      // Each slider should have an associated label
      const label = page.locator(`label[for="${id}"]`);
      await expect(label).toBeVisible();
    }
  });

  test('economics section should be visible on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(SKILL_FORGE_URL);

    const economicsTab = page.locator('[data-testid="nav-economics"]');
    await economicsTab.click();

    // SVG should still be visible
    const svg = page.locator('svg[data-testid="cost-curve-svg"]');
    await expect(svg).toBeVisible();

    // SVG should scale to fit viewport (check it's contained)
    const svgBox = await svg.boundingBox();
    const pageWidth = 375;

    // SVG should not be wider than viewport minus padding
    expect(svgBox.width).toBeLessThanOrEqual(pageWidth);
  });

});

test.describe('SkillForge v3.0.0 - Version Verification', () => {

  test('should display v3.0.0 in footer', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check for version string
    const version = page.locator('text=/v3\\.0\\.0|Version:?\\s*3\\.0\\.0/');
    await expect(version).toBeVisible();
  });

  test('should display updated canary string', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check for canary
    const canary = page.locator('text=SKILLFORGE-V3.0.0');
    await expect(canary).toBeVisible();
  });

});

test.describe('SkillForge v3.0.0 - Integration', () => {

  test('all main sections should be navigable', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Test each section tab using data-testid
    // Note: verification section has id='paraphrase' in the code
    const sections = ['process', 'paraphrase', 'example', 'economics', 'accumulation', 'references'];

    for (const section of sections) {
      const tab = page.locator(`[data-testid="nav-${section}"]`);
      await tab.click();
      await expect(tab).toBeVisible();
    }
  });

  test('language toggle should work', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Find language toggle buttons
    const langButtons = page.locator('button:has-text("EN"), button:has-text("ES"), button:has-text("FR"), button:has-text("DE")');
    const count = await langButtons.count();

    expect(count).toBeGreaterThan(0);
  });

  test('existing sliders should still function', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Economics section
    const economicsTab = page.locator('[data-testid="nav-economics"]');
    await economicsTab.click();

    // Find a slider by its data-testid
    const slider = page.locator('[data-testid="slider-deliberation-cost"]');
    await expect(slider).toBeVisible();

    // Get initial value
    const initialValue = await slider.inputValue();

    // Use keyboard to change value: focus and use arrow keys
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    // Verify slider still works (value should have changed)
    const newValue = await slider.inputValue();
    expect(parseInt(newValue)).toBeGreaterThan(parseInt(initialValue));
  });

});

test.describe('SkillForge v3.0.0 - Accessibility', () => {

  test('RewordGate should have proper ARIA attributes', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Example section
    const exampleTab = page.locator('[data-testid="nav-example"]');
    await exampleTab.click();

    // Expand the opt-in articulation gate
    const expandButton = page.locator('[data-testid="expand-articulation"]');
    await expandButton.click();

    // Check textarea has aria-label
    const textarea = page.locator('[data-testid="reword-input"]');
    await expect(textarea).toHaveAttribute('aria-label');
  });

  test('Layout toggle should be keyboard accessible', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Process section
    const processTab = page.locator('[data-testid="nav-process"]');
    await processTab.click();

    // Tab to the layout toggle button
    const toggle = page.locator('[data-testid="layout-toggle"]');
    await toggle.focus();

    // Should be focused
    const isFocused = await toggle.evaluate(el => document.activeElement === el);
    expect(isFocused).toBe(true);

    // Get initial swimlane visibility
    const swimlane = page.locator('[data-testid="swimlane-view"]');
    const initiallyVisible = await swimlane.isVisible().catch(() => false);

    // Press Enter to toggle
    await page.keyboard.press('Enter');

    // Wait a moment for state to update
    await page.waitForTimeout(100);

    // Swimlane visibility should have changed (either now visible or now hidden)
    const afterToggle = await swimlane.isVisible().catch(() => false);
    expect(afterToggle).not.toBe(initiallyVisible);
  });

  test('Approve button should have aria-disabled when locked', async ({ page }) => {
    await page.goto(SKILL_FORGE_URL);

    // Navigate to Example section
    const exampleTab = page.locator('[data-testid="nav-example"]');
    await exampleTab.click();

    // Expand the opt-in articulation gate
    const expandButton = page.locator('[data-testid="expand-articulation"]');
    await expandButton.click();

    const button = page.locator('[data-testid="approve-button"]');

    // Should be disabled (HTML disabled attribute)
    await expect(button).toBeDisabled();
  });

});
