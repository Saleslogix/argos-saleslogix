/* eslint-env node, mocha, chai */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const common = require('./common');

describe('login', () => {
  it('should authenticate', async () => {
    // TODO: Establish test users and put them in a configuration
    const authResults = await common.auth('admin');
    expect(authResults).to.be.any;
  });
});
