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
import format from '../../Format';
import List from 'argos/List';
import getResource from 'argos/I18n';


const resource = getResource('addressList');

/**
 * @class crm.Views.Address.List
 *
 * @extends argos.List
 *
 * @requires argos.List
 *
 * @requires crm.Format
 *
 */
const __class = declare('crm.Views.Address.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.$descriptor %}</p>',
    '<p class="micro-text">{%= $$.format.address($, true) %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  detailView: null,
  id: 'address_list',
  security: null, // 'Entities/Address/View',
  insertSecurity: 'Entities/Address/Add',
  insertView: 'address_edit',
  resourceKind: 'addresses',
  allowSelection: true,
  enableActions: true,
  format,
  isCardView: false,

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `(upper(Description) like "${q}%" or upper(City) like "${q}%")`;
  },
  // Disable Add/Insert on toolbar
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
  selectEntry: function selectEntry(params) {
    const row = $(params.$source).closest('[data-key]')[0];
    const key = row ? $(row).attr('data-key') : false;

    if (this._selectionModel && key) {
      App.showMapForAddress(format.address(this.entries[key], true, ' '));
    }
  },
});

export default __class;
