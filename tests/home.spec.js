const { test, expect } = require('@playwright/test');
const { EvincedSDK } = require('@evinced/js-playwright-sdk');
const { existsSync } = require('fs');

test('home page accessibility scan', async ({ page }) => {
  const evinced = new EvincedSDK(page);
  const reportPath = './test-results/home-accessibility-report.html';

  await page.goto('https://a11y-audits.com/');
  await expect(page).toHaveURL('https://a11y-audits.com/');

  const issues = await evinced.evAnalyze({
    scan: {
  screenshots: {
    enabled: true
  }
}
  });

  evinced.evSaveFile(issues, 'html', reportPath);

  expect(issues).toBeDefined();
  expect(existsSync(reportPath)).toBeTruthy();

  console.log(`Evinced found ${issues.length} accessibility issues.`);
});
