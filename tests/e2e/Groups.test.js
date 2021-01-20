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

describe('Groups', () => {
  describe('INFORCRM-3013: Make group app preferences user specific', () => {
    it('should allow two users to keep different default groups on the same browser', async () => {
      const page = await common.auth(config.crm.users.admin.userId, config.crm.users.admin.password);

      debug('Authorized as admin, opening accounts list.');
      // Expand the goto section in the left nav
      await common.expandLeftDrawerGoToMenuHeader(page);

      // Click accounts
      const accountListSelector = '#left_drawer a[data-view="account_list"]';
      let accountListHandle = await page.$(accountListSelector);
      await accountListHandle.click();
      await page.waitForResponse(/groups/);

      // Click settings menu
      await common.openListSettings(page, 'account_list');

      // expand groups section
      const groupsHeaderSelector = '#right_drawer div[data-tag="group"]';
      let groupsHeaderHandle = await page.waitForSelector(groupsHeaderSelector);
      await groupsHeaderHandle.click();

      // click configure
      const configureMenuHandle = await page.waitForSelector('#right_drawer a[data-action="groupConfigureClicked"]');
      await configureMenuHandle.click();

      // Select customers group for admin
      const groupListItemHandle = await page.waitForSelector('#groups_configure li[data-descriptor="Customers"]');
      await groupListItemHandle.click();

      // Complete
      const completeButtonHandle = await page.waitForSelector('header button[data-tool="complete"]');
      await completeButtonHandle.click();
      await page.waitForTimeout(1000);// TODO: Fix page selection in DOM before lifecycle is actually ready

      await common.openListSettings(page, 'account_list');
      groupsHeaderHandle = await page.waitForSelector(groupsHeaderSelector);
      await groupsHeaderHandle.click();

      // Set the default group to customers
      const customersGroupHandle = await page.waitForSelector('#right_drawer a[data-action="groupClicked"][data-title="Customers"]');
      await customersGroupHandle.click();
      await page.waitForResponse(/groups/);

      // Ensure loup doesn't have this new "Customers" favorite
      await common.auth(config.crm.users.loup.userId, config.crm.users.loup.password, page);
      await common.expandLeftDrawerGoToMenuHeader(page);
      accountListHandle = await page.$(accountListSelector);
      await accountListHandle.click();

      const titleHandle = await page.waitForSelector('header h1[data-dojo-attach-point="titleNode"]');
      const titleText = await titleHandle.innerText();

      expect(titleText).not.to.equal('Customers');
      await page.close();
    });
  });
});

