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

describe('Activities', () => {
  describe('INFORCRM-23677: Users can set a Category on a Personal Activity', () => {
    it('should not allow the user to set category on personal activities', async () => {
      const page = await common.auth(config.crm.users.admin.userId, config.crm.users.admin.password);

      // Expand the goto section in the left nav
      const goToHandle = await page.$('#left_drawer div.accordion.panel > div[data-tag="view"]');
      await goToHandle.click();

      // Click my schedule view
      const myScheduleHandle = await page.$('#left_drawer a[data-view="myday_list"]');
      await myScheduleHandle.click();

      // Click the new + button in the toolbar
      const newMenuButtonSelector = '#crm_Views_MainToolbar_0 button[data-tool="new"]';
      let newMenuButtonHandle = await page.waitForSelector(newMenuButtonSelector);
      await newMenuButtonHandle.click();

      // Select the personal activity type
      const personalHandle = await page.waitForSelector('#activity_types_list  li[data-key="atPersonal"]');
      await personalHandle.click();

      // Check if the category field on the insert form is disabled
      // The attribute will exist with an empty string for a value
      const categoryFieldSelector = '#activity_edit div[data-field="Category"] input[data-dojo-attach-point="inputNode"]';
      const categoryFieldSelectorDisabled = `${categoryFieldSelector}[disabled]`;
      let categoryFieldHandle = await page.waitForSelector(categoryFieldSelectorDisabled);
      let disabledAttr = await categoryFieldHandle.getAttribute('disabled');

      expect(disabledAttr).to.equal('');

      // Go back to my schedule, and click new on the toolbar again
      await myScheduleHandle.click();
      newMenuButtonHandle = await page.waitForSelector(newMenuButtonSelector);
      await newMenuButtonHandle.click();

      // This time select a new meeting
      const meetingHandle = await page.waitForSelector('#activity_types_list  li[data-key="atAppointment"]');
      await meetingHandle.click();

      // Check if the category picklist is enabled
      // The disabled attribute should not exist on the field's input node
      categoryFieldHandle = await page.waitForSelector(`${categoryFieldSelector}:not([disabled])`);
      disabledAttr = await categoryFieldHandle.getAttribute('disabled');
      expect(disabledAttr).to.equal(null);

      await page.close();
    });
  });
});

