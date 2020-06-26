define("crm/Integrations/BOE/Views/Locations/PricingAvailabilityList", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/List", "crm/Format", "argos/Convert", "argos/I18n"], function (_exports, _declare, _lang, _List, _Format, _Convert, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _List = _interopRequireDefault(_List);
  _Format = _interopRequireDefault(_Format);
  _Convert = _interopRequireDefault(_Convert);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('locationsPricingAvailabilityList');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.Locations.PricingAvailabilityList', [_List["default"]], {
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
        }]
      });
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
      var selection = this.getSelectedWarehouse();
      this.processWarehouse(selection).then(function () {
        ReUI.back();
      });
    },
    getSelectedWarehouse: function getSelectedWarehouse() {
      var selections = this.get('selectionModel').getSelections();
      var selection = null;

      if (this.options.singleSelect) {
        for (var selectionKey in selections) {
          if (selections.hasOwnProperty(selectionKey)) {
            selection = selections[selectionKey].data;
            break;
          }
        }
      }

      return selection;
    },
    processWarehouse: function processWarehouse(warehouse) {
      var promise = new Promise(function (resolve) {
        resolve(warehouse);
      });
      return promise;
    },
    getAvailability: function getAvailability() {
      var promise = new Promise(function (resolve) {
        resolve([]);
      });
      return promise;
    },
    onTransitionAway: function onTransitionAway() {
      this.refreshRequired = true;
      this.inherited(onTransitionAway, arguments);
    },
    requestData: function requestData() {
      var _this = this;

      this.getAvailability().then(function (entries) {
        _this._onQueryComplete({
          total: entries.length ? entries.length : 0
        }, entries);
      }, function () {
        _this._onQueryComplete({
          total: 0
        }, []);
      });
    },
    formatATPDate: function formatATPDate(atpDate) {
      var value = '';

      if (_Convert["default"].isDateString(atpDate)) {
        value = _Convert["default"].toDateFromString(atpDate);
        return _Format["default"].date(value);
      }

      return value;
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return "upper(Description) like \"".concat(this.escapeSearchQuery(searchQuery.toUpperCase()), "%\"");
    }
  });

  _lang["default"].setObject('icboe.Views.Locations.PricingAvailabilityList', __class);

  var _default = __class;
  _exports["default"] = _default;
});