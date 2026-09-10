const { test: base, expect } = require('@playwright/test');
const { EvincedSDK } = require('@evinced/js-playwright-sdk');

const test = base.extend({
  evincedService: async ({ page }, use) => {
    const evincedService = new EvincedSDK(page);

    await use(evincedService);
  },
});

module.exports = {
  test,
  expect,
};
