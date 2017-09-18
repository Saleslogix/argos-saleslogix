/* Copyright 2017 Infor
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

import declare from 'dojo/_base/declare';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('userList');

/**
 * @class crm.Views.User.List
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.User.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.UserInfo.LastName %}, {%: $.UserInfo.FirstName %}</p>',
    '<p class="micro-text">{%: $.UserInfo.Title %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'user_list',
  isCardView: false,
  queryOrderBy: 'UserInfo.LastName asc, UserInfo.FirstName asc',

  // Excluded types for the queryWhere
  // Type:
  // 3 - WebViewer
  // 5 - Retired
  // 6 - Template
  // 7 - AddOn
  queryWhere: 'Enabled eq true and (Type ne 3 AND Type ne 5 AND Type ne 6 AND Type ne 7)',
  querySelect: [
    'UserInfo/FirstName',
    'UserInfo/LastName',
    'UserInfo/Title',
    'UserInfo/UserName',
  ],
  resourceKind: 'users',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(UserInfo.UserName) like "%${q}%"`;
  },
});

export default __class;
