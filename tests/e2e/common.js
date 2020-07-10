/* Copyright 2020 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env node, mocha, chai */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const config = require('./config');

module.exports = {
  auth: async (username, password) => {
    const page = await global.browser.newPage();
    // TODO: URL needs to be configurable
    await page.goto(config.crm.index, { waitUntil: 'networkidle' });

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

    return page;
  },
};
