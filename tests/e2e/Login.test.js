/* eslint-env node, mocha */
const assert = require('assert');

describe('login', () => {
  it('should load', async () => {
    const page = await global.browser.newPage();
    await page.goto('http://localhost:8000/products/argos-saleslogix/index-dev.html', { waitUntil: 'networkidle2' });

    // Ensure page title matches
    const title = await page.title();
    assert.strictEqual(title, 'Infor CRM', 'titles should match');

    // Wait for our ping event to go through and determine if we are online/offline
    const response = await page.waitForResponse(res => res.url().indexOf('ping.gif') >= 0);
    assert.ok(response.ok());

    await page.type('#login input[name="username-display"]', 'admin', { delay: 100 });

    await page.click('#login button[data-action="authenticate"]');

    await page.waitForNavigation({ waitUntil: 'networkidle2' });
  });
});
