# Evinced Playwright Technical Exercise

This project demonstrates integrating the Evinced Playwright SDK into automated browser tests to identify accessibility issues across both static and interactive page states.

## Overview

The exercise includes:

- A basic accessibility scan of the home page using `evAnalyze()`
- A multi-state interactive test using `evStart()` and `evStop()`
- HTML accessibility reports with screenshots enabled
- A reusable Playwright fixture demonstrating how the Evinced integration can scale across a larger test suite

## Project Structure

```text
fixtures/
  evinced.js                 # Reusable Evinced Playwright fixture

tests/
  home.spec.js               # Basic page accessibility scan
  interactive.spec.js        # Accessibility analysis across interactive states
  scaled-example.spec.js     # Example using the shared Evinced fixture

test-results/
  home-accessibility-report.html
  interactive-accessibility-report.html

global.setup.js              # Evinced authentication
playwright.config.js         # Playwright configuration
package.json
```

## Setup

Install project dependencies:

```bash
npm install
```

The Evinced SDK requires valid authentication credentials. Credentials are loaded through environment variables and are intentionally excluded from this repository.

Required environment variables:

```text
EVINCED_SERVICE_ID
EVINCED_API_KEY
```

Private npm/JFrog authentication configuration is also excluded from source control.

## Running the Tests

Run the complete test suite:

```bash
npx playwright test
```

Run an individual test:

```bash
npx playwright test tests/home.spec.js
```

To observe an interactive test in the browser:

```bash
npx playwright test tests/interactive.spec.js --headed
```

## Test Approach

### Basic Accessibility Scan

`home.spec.js` performs a standard page-level accessibility analysis using `evAnalyze()` and generates an HTML accessibility report.

### Interactive Accessibility Flow

`interactive.spec.js` uses `evStart()` and `evStop()` to analyze accessibility throughout a multi-state user journey.

The test interacts with dynamic FAQ content and tabbed content while continuous analysis is active. This allows Evinced to evaluate accessibility issues introduced or exposed as the page state changes.

### Scaling Across a Test Suite

For a larger Playwright test suite, repeatedly initializing the Evinced SDK inside every test would create unnecessary duplication.

The project therefore includes a custom Playwright fixture in `fixtures/evinced.js`. The fixture initializes `EvincedSDK` for the current Playwright page and exposes it as `evincedService`.

Tests can then request the fixture directly:

```javascript
test('example', async ({ page, evincedService }) => {
  await page.goto('https://a11y-audits.com/');

  const issues = await evincedService.evAnalyze();

  expect(issues).toBeDefined();
});
```

This provides a reusable integration point and makes it easier to maintain or expand Evinced configuration across a larger automated test suite.

## Reports

Generated HTML accessibility reports are included in `test-results/`.

Screenshots are enabled during accessibility analysis to provide additional context when reviewing identified issues.

## Challenges and Troubleshooting

During setup, I encountered an E401 authentication error while retrieving the Evinced SDK from JFrog. I validated the npm registry configuration and authentication setup and ultimately resolved the issue by using the confirmed working `.npmrc` configuration provided by the Evinced team.

While developing the interactive test, I also encountered intentionally problematic accessibility behavior on the test site, including mismatched accessible labels and custom form state behavior. I used Playwright's locators, page snapshots, and DOM inspection to isolate those behaviors and selected a reliable multi-state interaction flow for the final test.

## Security

Credential files and local dependencies are intentionally excluded from source control, including:

- `.env`
- `.npmrc`
- `node_modules/`

No Evinced authentication credentials are included in this repository.
