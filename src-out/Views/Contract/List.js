define('crm/Views/Contract/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('contractList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Views.Contract.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%= $.Account ? $.Account.AccountName : "" %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    contextView: 'context_dialog',
    detailView: 'contract_detail',
    id: 'contract_list',
    security: 'Entities/Contract/View',
    insertView: 'contract_edit',
    queryOrderBy: 'ReferenceNumber asc',
    querySelect: ['Account/AccountName', 'Contact/FullName', 'ReferenceNumber'],
    resourceKind: 'contracts',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery);
      return '(ReferenceNumber like "%' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});