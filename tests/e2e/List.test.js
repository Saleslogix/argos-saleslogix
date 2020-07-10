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
const debug = require('debug')('e2e'); // eslint-disable-line

describe('List', () => {
  describe('INFORCRM-20172: Quick actions do not automatically close when view settings popup is opened', () => {
    it('should not allow the user to set category on personal activities', async () => {
      const page = await common.auth(config.crm.users.admin.userId, config.crm.users.admin.password);

      // Expand the goto section in the left nav
      const goToHandle = await page.$('#left_drawer div.accordion.panel > div[data-tag="view"]');
      await goToHandle.click();

      // Click accounts
      const accountListHandle = await page.$('#left_drawer a[data-view="account_list"]');
      await accountListHandle.click();

      // Select first actions menu
      const actionsMenuHandle = await page.waitForSelector('#account_list[selected="selected"] .widget-header .btn-actions');
      await actionsMenuHandle.click();

      // Capture our actions node popup
      const actionsNodePopupHandle = await page.waitForSelector('#account_list ul[data-dojo-attach-point="actionsNode"]');

      // Click settings menu
      const settingsMenuButtonHandle = await page.waitForSelector('#account_list[selected="selected"] button[data-action="openSettings"]');
      await settingsMenuButtonHandle.click();

      // The bounding box will be null if it is no longer visible, which is what we wanted this JIRA to solve!
      const boundingBox = await actionsNodePopupHandle.boundingBox();
      expect(boundingBox).to.equal(null);

      await page.close();
    });
  });
});

