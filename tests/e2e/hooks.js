/* eslint-env node, mocha */
const puppeteer = require('puppeteer');

exports.mochaHooks = {
  async beforeAll() {
    // run before all tests begin
    global.browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
    });
  },

  async beforeEach() {
    // Run before each test
  },

  async afterAll() {
    await global.browser.close();
  },
};
