define('crm/Integrations/BOE/Views/Locations/PricingAvailabilityList', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', 'argos/Convert', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _Convert, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  const resource = (0, _I18n2.default)('locationsPricingAvailabilityList');

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Locations.PricingAvailabilityList', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text"><label class="group-label">{%: $$.warehouseText %}: </label>{%: $.SlxLocation %}</p>', '<p class="listview-heading"><label class="group-label">{%: $$.availableToPromiseDateText %}: </label>{%: $$.formatATPDate($.ATPDate) %}</p>', '<p class="listview-heading"><label class="group-label">{%: $$.availableText %}: </label>{%: $.AvailableQuantity %}</p>', '<p class="micro-text">{%: $.UnitOfMeasure %}</p>']),

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
          scope: this
        }, {
          id: 'cancel',
          side: 'left',
          svg: 'cancel',
          fn: ReUI.back,
          scope: ReUI
        }] });
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
      const promise = new Promise(resolve => {
        resolve(warehouse);
      });
      return promise;
    },
    getAvailability: function getAvailability() {
      const promise = new Promise(resolve => {
        resolve([]);
      });
      return promise;
    },
    onTransitionAway: function onTransitionAway() {
      this.refreshRequired = true;
      this.inherited(onTransitionAway, arguments);
    },
    requestData: function requestData() {
      this.getAvailability().then(entries => {
        this._onQueryComplete({ total: entries.length ? entries.length : 0 }, entries);
      }, () => {
        this._onQueryComplete({ total: 0 }, []);
      });
    },
    formatATPDate: function formatATPDate(atpDate) {
      let value = '';
      if (_Convert2.default.isDateString(atpDate)) {
        value = _Convert2.default.toDateFromString(atpDate);
        return _Format2.default.date(value);
      }
      return value;
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return `upper(Description) like "${this.escapeSearchQuery(searchQuery.toUpperCase())}%"`;
    }
  });

  _lang2.default.setObject('icboe.Views.Locations.PricingAvailabilityList', __class);
  exports.default = __class;
  module.exports = exports['default'];
});