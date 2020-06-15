/* eslint-env node, mocha, chai */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

module.exports = {
  auth: async (username, password) => {
    const page = await global.browser.newPage();
    await page.goto('http://localhost:8000/products/argos-saleslogix/index-dev.html', { waitUntil: 'networkidle' });

    // Ensure page title matches
    const title = await page.title();
    expect(title).to.equal('Infor CRM');

    // Wait for our ping event to go through and determine if we are online/offline
    const response = await page.waitForResponse(res => res.url().indexOf('ping.gif') >= 0);
    expect(response.ok()).to.be.true;

    await page.type('#login input[name="username-display"]', username);
    if (typeof password === 'string' && password.length > 0) {
      await page.type('#login input[name="password-display"]', password);
    }

    await page.click('#login button[data-action="authenticate"]');
    const getCurrentUser = await page.waitForResponse(res => res.url().indexOf('getCurrentUser') >= 0, { timeout: 60000 });
    expect(getCurrentUser.ok(), 'getCurrentUser response failed. Probably the wrong username/password').to.be.true;
    const appStatePromises = await page.waitForNavigation({ waitUntil: 'networkidle' });
    expect(appStatePromises).to.be.null;
  },
};
