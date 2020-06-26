define("crm/Integrations/BOE/Views/ERPShipments/List", ["exports", "dojo/_base/declare", "dojo/_base/lang", "crm/Action", "argos/List", "crm/Format", "crm/Views/_RightDrawerListMixin", "crm/Views/_MetricListMixin", "crm/Views/_GroupListMixin", "../../Models/Names", "../../Utility", "argos/I18n"], function (_exports, _declare, _lang, _Action, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _Utility, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Action = _interopRequireDefault(_Action);
  _List = _interopRequireDefault(_List);
  _Format = _interopRequireDefault(_Format);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _GroupListMixin2 = _interopRequireDefault(_GroupListMixin2);
  _Names = _interopRequireDefault(_Names);
  _Utility = _interopRequireDefault(_Utility);
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
  var resource = (0, _I18n["default"])('erpShipmentsList');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.ERPShipments.List', [_List["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"], _GroupListMixin2["default"]], {
    formatter: _Format["default"],
    util: _Utility["default"],
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading"><label class="group-label">{%: $$.shipmentIDLabelText %}</label> {%: $.ErpExtId %}</p>', '<p class="micro-text"> {% if ($.Account) { %}<label class="group-label"> {%: $$.accountLabelText %}</label> {%: $.Account.AccountName %} {% } %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.statusLabelText %}</label> {%: $.ErpStatus %}</p>', '<p class="micro-text"> {% if ($.DatePromised) { %}<label class="group-label">{%: $$.datePromisedLabelText %}</label> {%: $$.formatter.date($.DatePromised) %} {% } %}</p>', '<p class="micro-text"><label class="group-label"> {%: $$.totalBaseAmountText %} </label>', '{%: $$.util.formatMultiCurrency($.ShipmentTotalBaseAmount, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label"> {%: $$.totalAmountText %} </label>', '{%: $$.util.formatMultiCurrency($.ShipmentTotalAmount, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</p>']),
    // Localization
    titleText: resource.titleText,
    statusLabelText: resource.statusLabelText,
    shipmentIDLabelText: resource.shipmentIDLabelText,
    accountLabelText: resource.accountLabelText,
    datePromisedLabelText: resource.datePromisedLabelText,
    viewAccountActionText: resource.viewAccountActionText,
    totalBaseAmountText: resource.totalBaseAmountText,
    totalAmountText: resource.totalAmountText,
    documentDateText: resource.documentDateText,
    // View Properties
    id: 'erpshipments_list',
    detailView: 'erpshipments_detail',
    modelName: _Names["default"].ERPSHIPMENT,
    resourceKind: 'erpShipments',
    allowSelection: true,
    enableActions: true,
    enableHashTags: true,
    expose: true,
    security: 'Entities/ErpShipment/View',
    insertSecurity: 'Entities/ErpShipment/Add',
    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,
    entityName: 'ERPShipment',
    // Card layout
    itemIconClass: 'warehouse',
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action["default"].navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'Account.AccountName'
        })
      }]);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "upper(Account.AccountName) like \"".concat(q, "%\" or upper(ErpExtId) like \"").concat(q, "%\"");
    }
  });

  _lang["default"].setObject('icboe.Views.ERPShipments.List', __class);

  var _default = __class;
  _exports["default"] = _default;
});