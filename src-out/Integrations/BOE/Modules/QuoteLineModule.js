define('crm/Integrations/BOE/Modules/QuoteLineModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/Products/List', '../Views/Locations/PricingAvailabilityList', '../Views/QuoteLines/Edit', '../Views/Quotes/List', '../Views/UnitsOfMeasure/List', '../Models/QuoteItem/Offline', '../Models/QuoteItem/SData'], function (module, exports, _declare, _lang, _Module2, _List, _PricingAvailabilityList, _Edit, _List3, _List5) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _PricingAvailabilityList2 = _interopRequireDefault(_PricingAvailabilityList);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.QuoteLineModule', [_Module3.default], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _List4.default({
        expose: false,
        id: 'quoteline_quote_list'
      }));

      am.registerView(new _Edit2.default());

      am.registerView(new _List2.default({
        id: 'quoteline_product_related',
        expose: false
      }));

      am.registerView(new _PricingAvailabilityList2.default({
        id: 'quoteline_pricingAvailabilityLocations',
        entityType: 'QuoteItem',
        requestType: 'QuoteItemAvailable',
        parentEntity: 'Quote',
        singleSelectAction: 'complete'
      }));

      am.registerView(new _List6.default({
        id: 'quoteline_unitofmeasure_list',
        hasSettings: false
      }));
    },
    loadCustomizations: function loadCustomizations() {},
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.QuoteLineModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});