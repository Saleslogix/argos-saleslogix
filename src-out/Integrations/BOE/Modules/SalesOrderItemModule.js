define('crm/Integrations/BOE/Modules/SalesOrderItemModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/Locations/PricingAvailabilityList', '../Views/SalesOrders/List', '../Views/SalesOrderItems/Detail', '../Views/SalesOrderItems/Edit', '../Views/UnitsOfMeasure/List', '../Views/Locations/List', '../Models/SalesOrderItem/Offline', '../Models/SalesOrderItem/SData'], function (module, exports, _declare, _lang, _Module2, _PricingAvailabilityList, _List, _Detail, _Edit, _List3, _List5) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _PricingAvailabilityList2 = _interopRequireDefault(_PricingAvailabilityList);

  var _List2 = _interopRequireDefault(_List);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.SalesOrderItemModule', [_Module3.default], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _Detail2.default());
      am.registerView(new _List2.default({
        expose: false,
        id: 'orderitem_salesorder_list'
      }));
      am.registerView(new _Edit2.default());
      am.registerView(new _List4.default({
        id: 'orderitem_unitofmeasure_list',
        hasSettings: false
      }));

      am.registerView(new _PricingAvailabilityList2.default({
        id: 'orderline_pricingAvailabilityLocations',
        entityType: 'SalesOrderItem',
        requestType: 'SalesOrderItemAvailable',
        parentEntity: 'SalesOrder',
        singleSelectAction: 'complete'
      }));

      am.registerView(new _List6.default());
    },
    loadCustomizations: function loadCustomizations() {},
    loadToolbars: function loadToolbars() {}
  }); /* Copyright 2017 Infor
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

  _lang2.default.setObject('icboe.Modules.SalesOrderItemModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});