define('crm/Views/LeadSource/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  const resource = (0, _I18n2.default)('leadSourceList'); /* Copyright 2017 Infor
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

  const __class = (0, _declare2.default)('crm.Views.LeadSource.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.Status %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'leadsource_list',
    security: 'Entities/LeadSource/View',
    queryOrderBy: 'Description',
    querySelect: ['Description', 'Status'],
    resourceKind: 'leadsources',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      const q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return `upper(Description) like "${q}%"`;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});