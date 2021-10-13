define('crm/Views/Competitor/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  const resource = (0, _I18n2.default)('competitorList'); /* Copyright 2017 Infor
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

  const __class = (0, _declare2.default)('crm.Views.Competitor.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%= $.CompetitorName %}</p>', '{% if ($.WebAddress) { %}<p class="micro-text">{%= $.WebAddress %}</p>{% } %}']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    detailView: 'competitor_detail',
    id: 'competitor_list',
    security: 'Entities/Competitor/View',
    insertView: 'competitor_edit',
    queryOrderBy: 'CompetitorName asc',
    querySelect: ['CompetitorName', 'WebAddress'],
    resourceKind: 'competitors',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      const q = this.escapeSearchQuery(searchQuery);
      return `(CompetitorName like "%${q}%")`;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});