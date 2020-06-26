define("crm/Views/TicketActivityItem/Detail", ["exports", "dojo/_base/declare", "../../Format", "argos/Detail", "argos/I18n"], function (_exports, _declare, _Format, _Detail, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Format = _interopRequireDefault(_Format);
  _Detail = _interopRequireDefault(_Detail);
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
  var resource = (0, _I18n["default"])('ticketActivityItemDetail');

  var __class = (0, _declare["default"])('crm.Views.TicketActivityItem.Detail', [_Detail["default"]], {
    // Localization
    titleText: resource.titleText,
    productNameText: resource.productNameText,
    skuText: resource.skuText,
    serialNumberText: resource.serialNumberText,
    itemAmountText: resource.itemAmountText,
    itemDescriptionText: resource.itemDescriptionText,
    entityText: resource.entityText,
    // View Properties
    id: 'ticketactivityitem_detail',
    querySelect: ['Product/Name', 'Product/ActualId', 'AccountProduct/SerialNumber', 'ItemDescription', 'ItemAmount', 'TicketActivity/$key'],
    resourceKind: 'ticketActivityItems',
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'ProductName',
          property: 'Product.Name',
          label: this.productNameText
        }, {
          name: 'ProductActualId',
          property: 'Product.ActualId',
          label: this.skuText
        }, {
          name: 'SerialNumber',
          property: 'AccountProduct.SerialNumber',
          label: this.serialNumberText
        }, {
          name: 'ItemAmount',
          property: 'ItemAmount',
          label: this.itemAmountText,
          renderer: _Format["default"].currency
        }, {
          name: 'ItemDescription',
          property: 'ItemDescription',
          label: this.itemDescriptionText
        }]
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});