define("crm/Integrations/BOE/Modules/SalesOrderItemModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./_Module", "../Views/Locations/PricingAvailabilityList", "../Views/SalesOrders/List", "../Views/SalesOrderItems/Detail", "../Views/SalesOrderItems/Edit", "../Views/UnitsOfMeasure/List", "../Views/Locations/List", "../Models/SalesOrderItem/Offline", "../Models/SalesOrderItem/SData"], function (_exports, _declare, _lang, _Module2, _PricingAvailabilityList, _List, _Detail, _Edit, _List2, _List3, _Offline, _SData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Module2 = _interopRequireDefault(_Module2);
  _PricingAvailabilityList = _interopRequireDefault(_PricingAvailabilityList);
  _List = _interopRequireDefault(_List);
  _Detail = _interopRequireDefault(_Detail);
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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.Modules.SalesOrderItemModule', [_Module2["default"]], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _Detail["default"]());
      am.registerView(new _List["default"]({
        expose: false,
        id: 'orderitem_salesorder_list'
      }));
      am.registerView(new _Edit["default"]());
      am.registerView(new _List2["default"]({
        id: 'orderitem_unitofmeasure_list',
        hasSettings: false
      }));
      am.registerView(new _PricingAvailabilityList["default"]({
        id: 'orderline_pricingAvailabilityLocations',
        entityType: 'SalesOrderItem',
        requestType: 'SalesOrderItemAvailable',
        parentEntity: 'SalesOrder',
        singleSelectAction: 'complete'
      }));
      am.registerView(new _List3["default"]());
    },
    loadCustomizations: function loadCustomizations() {},
    loadToolbars: function loadToolbars() {}
  });

  _lang["default"].setObject('icboe.Modules.SalesOrderItemModule', __class);

  var _default = __class;
  _exports["default"] = _default;
});