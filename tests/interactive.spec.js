const { test, expect } = require('@playwright/test');
const { EvincedSDK } = require('@evinced/js-playwright-sdk');

test('interactive homepage accessibility flow', async ({ page }) => {
  const evinced = new EvincedSDK(page);

  await page.goto('https://a11y-audits.com/');

  await evinced.evStart({
    scan: {
      screenshots: {
        enabled: true
      }
    }
  });

  // State 1: Expand an FAQ item
  const shippingQuestion = page.getByText('Do you ship overseas?', { exact: true });

  const shippingToggle = shippingQuestion.locator('..').getByRole('button');

  await shippingToggle.click();

  await expect(
    page.getByText(/Yes, we ship all over the world/i)
  ).toBeVisible();

  // State 2: Change the feature tab
  // State 2: Switch to Secured checkout tab
  await page.getByRole('tab', { name: 'Secured checkout' }).click();

  await expect(
    page.getByRole('tabpanel').getByText(/Our payment processes are guarded/i)
  ).toBeVisible();

  // State 3: Switch to Premium products tab
  await page.getByRole('tab', { name: 'Premium products' }).click();

  await expect(
    page.getByRole('tabpanel').getByText(/premium/i)
  ).toBeVisible();

  const issues = await evinced.evStop();

expect(issues).toBeDefined();

evinced.evSaveFile(
  issues,
  'html',
  './test-results/interactive-accessibility-report.html'
);

  expect(issues).toBeDefined();

  console.log(
    `Evinced found ${issues.length} accessibility issues during the interactive flow.`
  );
});
