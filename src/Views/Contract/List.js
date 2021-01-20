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

const resource = getResource('contractList');

const __class = declare('crm.Views.Contract.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%= $.Account ? $.Account.AccountName : "" %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  contextView: 'context_dialog',
  detailView: 'contract_detail',
  id: 'contract_list',
  security: 'Entities/Contract/View',
  insertView: 'contract_edit',
  queryOrderBy: 'ReferenceNumber asc',
  querySelect: [
    'Account/AccountName',
    'Contact/FullName',
    'ReferenceNumber',
  ],
  resourceKind: 'contracts',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery);
    return `(ReferenceNumber like "%${q}%")`;
  },
});

export default __class;
