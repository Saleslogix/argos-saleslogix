/* eslint-env node, mocha, chai */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const common = require('./common');

describe('login', () => {
  it('should authenticate', async () => {
    const authResults = await common.auth('admin');
    expect(authResults).to.be.any;
  });
});
