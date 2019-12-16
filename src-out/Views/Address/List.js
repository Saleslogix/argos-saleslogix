define('crm/Views/Address/List', ['module', 'exports', 'dojo/_base/declare', '../../Format', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _Format, _List, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _List2 = _interopRequireDefault(_List);

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

  var resource = (0, _I18n2.default)('addressList');

  /**
   * @class crm.Views.Address.List
   *
   * @extends argos.List
   *
   * @requires argos.List
   *
   * @requires crm.Format
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Address.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.$descriptor %}</p>', '<p class="micro-text">{%= $$.format.address($, true) %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    detailView: null,
    id: 'address_list',
    security: null, // 'Entities/Address/View',
    insertSecurity: 'Entities/Address/Add',
    insertView: 'address_edit',
    resourceKind: 'addresses',
    allowSelection: true,
    enableActions: true,
    format: _Format2.default,
    isCardView: false,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Description) like "' + q + '%" or upper(City) like "' + q + '%")';
    },
    // Disable Add/Insert on toolbar
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    },
    selectEntry: function selectEntry(params) {
      var row = $(params.$source).closest('[data-key]')[0];
      var key = row ? $(row).attr('data-key') : false;

      if (this._selectionModel && key) {
        App.showMapForAddress(_Format2.default.address(this.entries[key], true, ' '));
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});