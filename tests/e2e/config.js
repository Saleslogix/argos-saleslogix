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

/* eslint-env node */
const path = require('path');
const debug = require('debug')('e2e');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

function getConfig() {
  return {
    crm: {
      index: process.env.MAIN_INDEX || '',
      users: {
        admin: {
          userId: process.env.ADMIN_USER,
          password: process.env.ADMIN_PW,
        },
      },
    },
    playwright: {
      launch: {
        headless: Number(process.env.PLAYWRIGHT_HEADLESS) === 0 ? false : true,
        slowMo: Number(process.env.PLAYWRIGHT_SLOMO),
      },
    },
  };
}

const config = getConfig();
debug('Getting default config. %j', config);
module.exports = getConfig();
