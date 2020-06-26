define("crm/Integrations/BOE/Views/ERPShipToAccounts/List", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/List", "crm/Views/_RightDrawerListMixin", "crm/Views/_MetricListMixin", "crm/Views/_GroupListMixin", "../../Models/Names", "argos/I18n"], function (_exports, _declare, _lang, _List, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _List = _interopRequireDefault(_List);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _GroupListMixin2 = _interopRequireDefault(_GroupListMixin2);
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
  var resource = (0, _I18n["default"])('erpShipToAccountsList');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.ERPShipToAccounts.List', [_List["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"], _GroupListMixin2["default"]], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.ErpShipTo.Name %}</p>', '<p class="micro-text address">{%: $.ErpShipTo.Address.FullAddress %}</p>']),
    // Localization
    titleText: resource.titleText,
    // View Properties
    id: 'erpshiptoaccount_list',
    detailView: 'erpshiptoaccount_detail',
    insertView: 'erpshiptoaccount_edit',
    modelName: _Names["default"].ERPSHIPTOACCOUNT,
    resourceKind: 'erpShipToAccounts',
    allowSelection: true,
    enableActions: true,
    expose: false,
    security: 'Entities/ErpShipTo/View',
    insertSecurity: 'Entities/ErpShipTo/Add',
    // Groups
    enableDynamicGroupLayout: false,
    groupsEnabled: false,
    // Card layout
    itemIconClass: 'warehouse',
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return "upper(ErpShipTo.Name) like \"%".concat(this.escapeSearchQuery(searchQuery.toUpperCase()), "%\"");
    }
  });

  _lang["default"].setObject('icboe.Views.ERPShipToAccounts.List', __class);

  var _default = __class;
  _exports["default"] = _default;
});