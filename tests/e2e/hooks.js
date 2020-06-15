/* eslint-env node, mocha */
const { chromium } = require('playwright');

exports.mochaHooks = {
  async beforeAll() {
    // run before all tests begin
    global.browser = await chromium.launch({
      headless: true,
      slowMo: 0,
    });
  },

  async beforeEach() {
    // Run before each test
  },

  async afterAll() {
    await global.browser.close();
  },
};
