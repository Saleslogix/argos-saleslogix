define('crm/Integrations/BOE/Views/ERPShipments/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Action', 'argos/List', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', '../../Utility', 'argos/I18n'], function (module, exports, _declare, _lang, _Action, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _Utility, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Action2 = _interopRequireDefault(_Action);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpShipmentsList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipments.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    formatter: _Format2.default,
    util: _Utility2.default,

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
    modelName: _Names2.default.ERPSHIPMENT,
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
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'Account.AccountName'
        })
      }]);
    },

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Account.AccountName) like "' + q + '%" or upper(ErpExtId) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipments.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});