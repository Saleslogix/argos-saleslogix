define("crm/Integrations/BOE/Modules/QuoteLineModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./_Module", "../Views/Products/List", "../Views/Locations/PricingAvailabilityList", "../Views/QuoteLines/Edit", "../Views/Quotes/List", "../Views/UnitsOfMeasure/List", "../Models/QuoteItem/Offline", "../Models/QuoteItem/SData"], function (_exports, _declare, _lang, _Module2, _List, _PricingAvailabilityList, _Edit, _List2, _List3, _Offline, _SData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Module2 = _interopRequireDefault(_Module2);
  _List = _interopRequireDefault(_List);
  _PricingAvailabilityList = _interopRequireDefault(_PricingAvailabilityList);
  _Edit = _interopRequireDefault(_Edit);
  _List2 = _interopRequireDefault(_List2);
  _List3 = _interopRequireDefault(_List3);

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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.Modules.QuoteLineModule', [_Module2["default"]], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List2["default"]({
        expose: false,
        id: 'quoteline_quote_list'
      }));
      am.registerView(new _Edit["default"]());
      am.registerView(new _List["default"]({
        id: 'quoteline_product_related',
        expose: false
      }));
      am.registerView(new _PricingAvailabilityList["default"]({
        id: 'quoteline_pricingAvailabilityLocations',
        entityType: 'QuoteItem',
        requestType: 'QuoteItemAvailable',
        parentEntity: 'Quote',
        singleSelectAction: 'complete'
      }));
      am.registerView(new _List3["default"]({
        id: 'quoteline_unitofmeasure_list',
        hasSettings: false
      }));
    },
    loadCustomizations: function loadCustomizations() {},
    loadToolbars: function loadToolbars() {}
  });

  _lang["default"].setObject('icboe.Modules.QuoteLineModule', __class);

  var _default = __class;
  _exports["default"] = _default;
});