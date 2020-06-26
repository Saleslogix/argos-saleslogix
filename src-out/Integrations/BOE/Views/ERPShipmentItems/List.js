define("crm/Integrations/BOE/Views/ERPShipmentItems/List", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/List", "crm/Format", "crm/Views/_RightDrawerListMixin", "crm/Views/_MetricListMixin", "../../Models/Names", "argos/I18n"], function (_exports, _declare, _lang, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _List = _interopRequireDefault(_List);
  _Format = _interopRequireDefault(_Format);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _Names = _interopRequireDefault(_Names);
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
  var resource = (0, _I18n["default"])('erpShipmentItemsList');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.ERPShipmentItems.List', [_List["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"]], {
    formatter: _Format["default"],
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>', '{% if ($.SalesOrder) { %}', '<p class="micro-text"><label class="group-label">{%: $$.salesOrderText %}</label> {%: $.SalesOrder.SalesOrderNumber %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.lineNumberText %}</label> {%: $.ErpLineNumber %}</p>', '{% if ($.ErpShipment) { %}', '<p class="micro-text"><label class="group-label">{%: $$.shipmentIDText %}</label> {%: $.ErpShipment.ErpExtId %}</p>', ' {% } %}', '<p class="micro-text"><label class="group-label">{%: $$.shippedQuantityText %}</label> {%: $.ErpShippedQuantity %} {%: $.ErpShippedUOM %}</p>']),
    // Localization
    titleText: resource.titleText,
    productNameText: resource.productNameText,
    lineNumberText: resource.lineNumberText,
    shipmentIDText: resource.shipmentIDText,
    shippedQuantityText: resource.shippedQuantityText,
    salesOrderText: resource.salesOrderText,
    // View Properties
    id: 'erpshipment_items_list',
    detailView: 'erpshipment_items_detail',
    modelName: _Names["default"].ERPSHIPMENTITEM,
    resourceKind: 'erpShipmentItems',
    allowSelection: true,
    enableActions: true,
    // Card layout
    itemIconClass: 'warehouse',
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "upper(ErpLineNumber) like \"".concat(q, "%\" or upper(SalesOrder.SalesOrderNumber) like \"").concat(q, "%\" or upper(ProductName) like \"").concat(q, "%\"");
    }
  });

  _lang["default"].setObject('icboe.Views.ERPShipmentItems.List', __class);

  var _default = __class;
  _exports["default"] = _default;
});