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

describe('User', () => {
  describe('LoginView', () => {
    xit('should authenticate', async () => {
      // Disable this test, as we will use authentication for the others anyways.
      // Keeping the test to use for debugging though.
      // TODO: Establish test users and put them in a configuration
      const page = await common.auth('admin');
      await page.close();
    });
  });

  describe('INFORCRM-9620: Mobile UI - Logged in user info not displayed in mobile client', () => {
    it('should display user info in the about dialog', async () => {
      const page = await common.auth('admin'); // TODO: Pull user from config

      // Evaluate some js in the console to get the current user from App.context
      const userDescriptorResults = await page.evaluate('App.context.user.$descriptor');

      const otherHandle = await page.$('#left_drawer div.accordion.panel > div[data-tag="footer"]');
      await otherHandle.click();
      const aboutMenuHandle = await page.$('#left_drawer a[data-action="showAbout"]');
      await aboutMenuHandle.click();

      const aboutDialogHandle = await page.waitForSelector('#about-modal-text .additional-content > p');
      expect(await aboutDialogHandle.innerText()).to.have.string(userDescriptorResults);
      await page.close();
    });
  });
});

