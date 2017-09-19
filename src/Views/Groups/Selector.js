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
import SDataStore from 'argos/Store/SData';
import getResource from 'argos/I18n';

const resource = getResource('groupsSelector');

/**
 * @class crm.Views.Groups.Selector
 *
 * @extends argos.List
 * @requires argos.List
 *
 */
const __class = declare('crm.Views.Groups.Selector', [List], {
  id: 'groups_configure',
  expose: false,
  enableSearch: false,
  icon: '',

  listViewId: 'groups_list',
  family: '',

  // Localization
  titleText: resource.titleText,
  isCardView: false,
  itemTemplate: new Simplate([
    '<h4>{%: $[$$.labelProperty] %}</h4>',
  ]),

  constructor: function constructor() {
    this.tools = {
      tbar: [],
    };
  },

  activateEntry: function activateEntry(params) {
    if (this._selectionModel && this.isNavigationDisabled()) {
      this._selectionModel.toggle(params.key, this.entries[params.key] || params.descriptor, params.$source);
      if (this.options.singleSelect && this.options.singleSelectAction) {
        this.invokeSingleSelectAction();
      }
    }
  },

  createStore: function createStore() {
    if (!this.family) {
      throw new Error('The groups selector must have a family set.');
    }

    return this.createGroupStore(this.family);
  },

  createGroupStore: function createGroupStore(entityName) {
    let store = null;

    if (typeof entityName === 'string' && entityName !== '') {
      store = new SDataStore({
        service: App.services.crm,
        resourceKind: 'groups',
        contractName: 'system',
        where: `upper(family) eq '${entityName.toUpperCase()}'`,
        orderBy: 'name asc',
        include: ['layout', 'tableAliases'],
        idProperty: '$key',
        applicationName: 'slx',
        scope: this,
      });
    }

    return store;
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `name like "${q}%"`;
  },
});

export default __class;
