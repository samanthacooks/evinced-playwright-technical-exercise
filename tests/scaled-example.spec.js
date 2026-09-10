const { test, expect } = require('../fixtures/evinced');

test('example of scalable Evinced integration', async ({
  page,
  evincedService
}) => {
  await page.goto('https://a11y-audits.com/');

  const issues = await evincedService.evAnalyze({
    scan: {
      screenshots: {
        enabled: true
      }
    }
  });

  expect(issues).toBeDefined();

  console.log(
    `Evinced found ${issues.length} accessibility issues in scalable fixture example.`
  );
});
