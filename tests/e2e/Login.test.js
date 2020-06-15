/* eslint-env node, mocha, chai */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

describe('login', () => {
  it('should load', async () => {
    const page = await global.browser.newPage();
    await page.goto('http://localhost:8000/products/argos-saleslogix/index-dev.html', { waitUntil: 'networkidle' });

    // Ensure page title matches
    const title = await page.title();
    expect(title).to.equal('Infor CRM');

    // Wait for our ping event to go through and determine if we are online/offline
    const response = await page.waitForResponse(res => res.url().indexOf('ping.gif') >= 0);
    expect(response.ok()).to.be.true;

    await page.type('#login input[name="username-display"]', 'admin');
    await page.click('#login button[data-action="authenticate"]');
    const authResponse = await page.waitForNavigation({ timeout: 60000, waitUntil: 'networkidle' });
    expect(authResponse).to.be.null;
  });
});
