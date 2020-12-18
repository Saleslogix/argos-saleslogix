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

      await common.expandLeftDrawerGoToMenuHeader(page);

      // Click my schedule view
      const myScheduleHandle = await page.$('#left_drawer a[data-view="myday_list"]');
      await myScheduleHandle.click();

      // Click the new + button in the toolbar
      const newMenuButtonSelector = 'header button[data-tool="new"]';
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

  describe('INFORCRM-3220: Multiple Attendees (MAA)', () => {
    it('should allow creating, listing, detailing, and removing attendees', async () => {
      const page = await common.auth(config.crm.users.admin.userId, config.crm.users.admin.password);

      await common.expandLeftDrawerGoToMenuHeader(page);

      // Click my schedule view
      const myScheduleHandle = await page.$('#left_drawer a[data-view="myday_list"]');
      await myScheduleHandle.click();

      // Click the new + button in the toolbar
      const newMenuButtonSelector = 'header button[data-tool="new"]';
      let newMenuButtonHandle = await page.waitForSelector(newMenuButtonSelector);
      await newMenuButtonHandle.click();

      // Select the meeting activity type
      const meetingHandle = await page.waitForSelector('#activity_types_list  li[data-key="atAppointment"]');
      await meetingHandle.click();

      // Wait for the $template request and another request to for the leader lookup
      await Promise.all([
        page.waitForResponse(/template/),
        page.waitForResponse(/users/),
      ]);

      const regarding = `__e2e__${Date.now()}`;
      await page.fill('#activity_edit div[data-field="Description"] input[data-dojo-attach-point="inputNode"]', regarding);

      const saveMenuButtonSelector = 'header button[data-tool="save"]';
      let saveHandle = await page.waitForSelector(saveMenuButtonSelector);
      await saveHandle.click();

      // Wait for the save (POST) and the following list refresh request
      const saveResponse = await page.waitForResponse(/activities/);
      const responseJson = await saveResponse.json();
      const key = responseJson.$key;
      await page.waitForResponse(/userActivities/);

      const meetingCardHandle = await page.waitForSelector(`#myday_list div[data-action="activateEntry"][data-key="${key}"]`);
      await meetingCardHandle.click();
      await page.waitForResponse(/activityAttendees/);
      const relatedItemsHandle = await page.waitForSelector('#activity_detail .tab-list li:nth-child(2)');
      await relatedItemsHandle.click();

      const relatedAttendeeItem = await page.waitForSelector('#activity_detail li.relatedviewitem[data-view="activity_attendee_related"]');
      await relatedAttendeeItem.click();
      await page.waitForResponse(/activityAttendees/);

      // Click on new for adding an attendee
      newMenuButtonHandle = await page.waitForSelector(newMenuButtonSelector);
      await newMenuButtonHandle.click();

      const contactAttendeeTypeHandle = await page.waitForSelector('#activity_attendee_types_list[selected="selected"] li[data-key="Contact"]');
      await contactAttendeeTypeHandle.click();
      await page.waitForResponse(/contacts/);

      const contactCardHandle = await page.waitForSelector('#contact_related .row div[data-action="activateEntry"] > .widget > .widget-header');
      await contactCardHandle.click();

      saveHandle = await page.waitForSelector(saveMenuButtonSelector);
      await saveHandle.click();
      const response = await page.waitForResponse((res) => {
        return res.url().indexOf('activityAttendees') > -1 && res.status() === 201;
      });

      const saveResponseJson = await response.json();
      const attendeeKey = saveResponseJson.$key;
      expect(attendeeKey).to.have.lengthOf(12);

      // Ensure the added attendee is now on the related list
      const attendeeCardHandle = await page.waitForSelector(`#activity_attendee_related div[data-action="activateEntry"][data-key="${attendeeKey}"]`);
      await attendeeCardHandle.click();
      await page.waitForResponse(/activityAttendees/);

      // On detail view now, lets edit and select this attendee as primary
      const editMenuSelector = 'header button[data-tool="edit"]';
      const editHandle = await page.waitForSelector(editMenuSelector);
      await editHandle.click();

      const primaryHandle = await page.waitForSelector('#activity_attendee_edit div[data-field="IsPrimary"] label');
      await primaryHandle.click();

      saveHandle = await page.waitForSelector(saveMenuButtonSelector);
      await saveHandle.click();

      const editSaveResponse = await page.waitForResponse(/activityAttendees/);
      const editJson = await editSaveResponse.json();
      expect(editJson.IsPrimary).to.equal(true);

      // Go back to the related list, and delete
      const backMenuSelector = 'header button[data-tool="back"]';
      const backMenuHandle = await page.waitForSelector(backMenuSelector);
      await backMenuHandle.click();

      await page.waitForResponse(/activityAttendees/); // Ensure list has refreshed

      const quickActionHandle = await page.waitForSelector(`#activity_attendee_related .widget-header button[data-key="${attendeeKey}"]`);
      await quickActionHandle.click();

      const deleteActionItemHandle = await page.waitForSelector('#activity_attendee_related ul[data-dojo-attach-point="actionsNode"] a[data-id="2"]');
      await deleteActionItemHandle.click();

      // A modal will pop up to confirm delete
      const okHandle = await page.waitForSelector('#modal-template .modal__toolbar div:nth-child(2)');
      await okHandle.click();

      const deleteResponse = await page.waitForResponse((res) => {
        return res.url().indexOf(`activityAttendees(%22${attendeeKey}%22)`) > -1;
      });

      expect(deleteResponse.ok()).to.equal(true);

      await page.close();
    });
  });
});
