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
      const userDescriptorResults = await page.evaluate('App.context.user.$descriptor');

      const otherHandle = await page.$('#left_drawer > div > div.accordion.panel > div[data-tag="footer"]');
      await otherHandle.click();
      const aboutMenuHandle = await page.$('#left_drawer a[data-action="showAbout"]');
      await aboutMenuHandle.click();

      const aboutDialogHandle = await page.$('#about-modal-text .additional-content > p');
      expect(await aboutDialogHandle.innerText()).to.have.string(userDescriptorResults);
      await page.close();
    });
  });
});

