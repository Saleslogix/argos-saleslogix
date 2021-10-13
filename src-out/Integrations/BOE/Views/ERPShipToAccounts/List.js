define('crm/Integrations/BOE/Views/ERPShipToAccounts/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('erpShipToAccountsList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipToAccounts.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.ErpShipTo.Name %}</p>', '<p class="micro-text address">{%: $.ErpShipTo.Address.FullAddress %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'erpshiptoaccount_list',
    detailView: 'erpshiptoaccount_detail',
    insertView: 'erpshiptoaccount_edit',
    modelName: _Names2.default.ERPSHIPTOACCOUNT,
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
      return 'upper(ErpShipTo.Name) like "%' + this.escapeSearchQuery(searchQuery.toUpperCase()) + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipToAccounts.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});