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
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import format from 'crm/Format';
import convert from 'argos/Convert';
import getResource from 'argos/I18n';

const resource = getResource('locationsPricingAvailabilityList');

const __class = declare('crm.Integrations.BOE.Views.Locations.PricingAvailabilityList', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text"><label class="group-label">{%: $$.warehouseText %}: </label>{%: $.SlxLocation %}</p>',
    '<p class="listview-heading"><label class="group-label">{%: $$.availableToPromiseDateText %}: </label>{%: $$.formatATPDate($.ATPDate) %}</p>',
    '<p class="listview-heading"><label class="group-label">{%: $$.availableText %}: </label>{%: $.AvailableQuantity %}</p>',
    '<p class="micro-text">{%: $.UnitOfMeasure %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  warehouseText: resource.warehouseText,
  availableText: resource.availableText,
  availableToPromiseDateText: resource.availableToPromiseDateText,

  // View Properties
  id: 'locations_pricingAvailabilityList',
  detailView: '',
  enableActions: false,
  expose: false,
  pricingAvailabilityResult: null,
  requestType: null,
  entityType: null,
  parentEntity: null,
  selectionOnly: true,
  allowEmptySelection: false,
  continuousScrolling: false,
  simpleMode: true,
  negateHistory: true,
  pageSize: 500,
  singleSelect: true,
  singleSelectAction: 'complete',

  // Card layout
  itemIconClass: '',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [{
        id: 'complete',
        cls: 'invisible',
        fn: this.onSelectWarehouse,
        scope: this,
      }, {
        id: 'cancel',
        side: 'left',
        svg: 'cancel',
        fn: ReUI.back,
        scope: ReUI,
      },
      ] });
  },
  show: function show() {
    this.inherited(show, arguments);
    if (!this.options) {
      this.options = {};
    }
    this.options.singleSelect = true;
    this.options.singleSelectAction = 'complete';
  },
  onSelectWarehouse: function onSelectWarehouse() {
    const selection = this.getSelectedWarehouse();
    this.processWarehouse(selection).then(() => {
      ReUI.back();
    });
  },
  getSelectedWarehouse: function getSelectedWarehouse() {
    const selections = this.get('selectionModel').getSelections();
    let selection = null;
    if (this.options.singleSelect) {
      for (const selectionKey in selections) {
        if (selections.hasOwnProperty(selectionKey)) {
          selection = selections[selectionKey].data;
          break;
        }
      }
    }
    return selection;
  },
  processWarehouse: function processWarehouse(warehouse) {
    const promise = new Promise((resolve) => {
      resolve(warehouse);
    });
    return promise;
  },
  getAvailability: function getAvailability() {
    const promise = new Promise((resolve) => {
      resolve([]);
    });
    return promise;
  },
  onTransitionAway: function onTransitionAway() {
    this.refreshRequired = true;
    this.inherited(onTransitionAway, arguments);
  },
  requestData: function requestData() {
    this.getAvailability().then((entries) => {
      this._onQueryComplete({ total: entries.length ? entries.length : 0 }, entries);
    }, () => {
      this._onQueryComplete({ total: 0 }, []);
    });
  },
  formatATPDate: function formatATPDate(atpDate) {
    let value = '';
    if (convert.isDateString(atpDate)) {
      value = convert.toDateFromString(atpDate);
      return format.date(value);
    }
    return value;
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return `upper(Description) like "${this.escapeSearchQuery(searchQuery.toUpperCase())}%"`;
  },
});

lang.setObject('icboe.Views.Locations.PricingAvailabilityList', __class);
export default __class;
