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

describe('Detail', () => {
  describe('INFORCRM-3049: Related items count not updating when adding related records', () => {
    it('should not allow the user to set category on personal activities', async () => {
      const page = await common.auth(config.crm.users.admin.userId, config.crm.users.admin.password);

      // Expand the goto section in the left nav
      await common.expandLeftDrawerGoToMenuHeader(page);

      // Click accounts
      const accountListHandle = await page.$('#left_drawer a[data-view="account_list"]');
      await accountListHandle.click();

      const cardHandle = await page.waitForSelector('#account_list div[data-action="activateEntry"]');
      await cardHandle.click();

      const relatedItemsSelector = '#account_detail .tab-list li:nth-child(2)';
      let relatedItemsHandle = await page.waitForSelector(relatedItemsSelector);
      await relatedItemsHandle.click();

      // Values are fetched when we click the related tab, so wait for the history response to come back from sdata
      await page.waitForResponse(/history/);

      const notesCountSelector = '#account_detail li[data-view="history_related"] .badge';
      let notesCountHandle = await page.waitForSelector(notesCountSelector);
      const firstCountText = await notesCountHandle.innerText();
      const firstCount = Number(firstCountText);

      debug(`First History/Notes Count ${firstCountText}`);
      expect(firstCount).to.be.at.least(0);

      const addNoteButtonHandle = await page.waitForSelector('#account_detail a[data-action="addNote"] > button');
      await addNoteButtonHandle.click();

      const noteFieldHandle = await page.waitForSelector('#history_edit textarea[name="Text"]');
      await noteFieldHandle.fill('e2e note');

      const saveButtonHandle = await page.waitForSelector('header button[data-tool="save"]');
      saveButtonHandle.click();

      // Wait for POST
      await page.waitForResponse(/history/);

      // After the note saves, it dumps us back to account detail, so click related items again
      relatedItemsHandle = await page.waitForSelector(relatedItemsSelector);
      await relatedItemsHandle.click();

      // Wait for the related items to fetch history/notes (second pass)
      await page.waitForResponse(/history/);

      notesCountHandle = await page.waitForSelector(notesCountSelector);
      const secondCountText = await notesCountHandle.innerText();
      const secondCount = Number(secondCountText);

      debug(`Second History/Notes Count ${secondCountText}`);
      expect(secondCount).to.be.above(firstCount);
      await page.close();
    });
  });

  describe('INFORCRM-24295,INFORCRM-15532: Fix links in embedded maps', () => {
    it('should allow links in embedded iframe maps', async () => {
      const page = await common.auth(config.crm.users.admin.userId, config.crm.users.admin.password);

      // Expand the goto section in the left nav
      await common.expandLeftDrawerGoToMenuHeader(page);

      // Click accounts
      const accountListHandle = await page.$('#left_drawer a[data-view="account_list"]');
      await accountListHandle.click();

      const cardHandle = await page.waitForSelector('#account_list div[data-action="activateEntry"]');
      await cardHandle.click();

      const addressHandle = await page.waitForSelector('#account_detail div[data-property="Address"] .hyperlink');
      await addressHandle.click();

      const iframeHandle = await page.waitForSelector('#link_view > iframe');
      const frame = await iframeHandle.contentFrame();
      await frame.waitForLoadState('networkidle');

      /* Current broken https://github.com/microsoft/playwright/issues/1821
      const directionsHandle = await frame.$('div[jsaction="placeCard.directions"] > a');
      await directionsHandle.click();
      */
      // Hack around the bug above, will probably break on different browsers, font sizes, style changes, etc
      await page.click('#link_view', { position: { x: 570, y: 110 } }); // click anywhere to collapse directions
      await page.click('#link_view', { position: { x: 50, y: 20 } }); // click on view larger map in upper left

      const directionsPage = await page.waitForEvent('popup');
      expect(directionsPage.url()).to.match(/google\.com/);

      await page.close();
    });
  });
});

