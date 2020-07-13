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
const common = require('./common');
const config = require('./config');
const debug = require('debug')('e2e');

describe('User', () => {
  describe('LoginView', () => {
    xit('should authenticate', async () => {
      // Disable this test, as we will use authentication for the others anyways.
      // Keeping the test to use for debugging though.
      const page = await common.auth(config.crm.users.admin.userId, config.crm.users.admin.password);
      await page.close();
    });
  });

  describe('INFORCRM-9620: Mobile UI - Logged in user info not displayed in mobile client', () => {
    it('should display user info in the about dialog', async () => {
      const page = await common.auth(config.crm.users.admin.userId, config.crm.users.admin.password);

      // Evaluate some js in the console to get the current user from App.context
      const userDescriptorResults = await page.evaluate('App.context.user.$descriptor');
      await common.expandLeftDrawerMenuHeader(page, 'footer');
      await page.waitForTimeout(1000); // let animation finish
      const aboutMenuHandle = await page.waitForSelector('#left_drawer a[data-action="showAbout"]');
      await aboutMenuHandle.click();

      const aboutDialogHandle = await page.waitForSelector('#about-modal-text .additional-content > p');
      expect(await aboutDialogHandle.innerText()).to.have.string(userDescriptorResults);
      await page.close();
    });
  });

  describe('INFORCRM-24641: Password expiry message for Mobile is not very informative', () => {
    it('should display a password expired message', async () => {
      const page = await global.browser.newPage();
      await page.goto(config.crm.index, { waitUntil: 'networkidle' });

      // Wait for our ping event to go through and determine if we are online/offline
      const response = await page.waitForResponse(res => res.url().indexOf('ping.gif') >= 0);
      expect(response.ok()).to.be.true;

      // We will stub out the getCurrentUser request and assume it returns back a 500 error with an error payload that contains a stackTrace element
      await page.route(/getCurrentUser/, (route) => {
        debug('Overriding getCurrentUser');
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: '[{ "stackTrace": "Validation execption at: Sage.SalesLogix.User.Rules.IsValidPassword();"}]',
        });
      });

      await page.type('#login input[name="username-display"]', config.crm.users.admin.userId);
      await page.click('#login button[data-action="authenticate"]');

      const expireAlert = await page.waitForEvent('dialog');
      expect(expireAlert.message()).to.equal('Password has expired. Please use the web client to change your password.');

      await page.close();
    });
  });
});

