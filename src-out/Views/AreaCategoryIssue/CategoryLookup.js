define('crm/Views/AreaCategoryIssue/CategoryLookup', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n', '../../Models/Names', 'crm/Format'], function (module, exports, _declare, _List, _I18n, _Names, _Format) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  var _Format2 = _interopRequireDefault(_Format);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('areaCategoryIssue_CategoryLookup'); /* Copyright 2021 Infor
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

  const __class = (0, _declare2.default)('crm.Views.AreaCategoryIssue.CategoryLookup', [_List2.default], {
    format: _Format2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.$descriptor %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'areacategoryissue_categorylookup',
    modelName: _Names2.default.AREACATEGORYISSUE,
    expose: false,
    enableSearch: false,
    enablePullToRefresh: false,
    isCardView: false,
    _buildQueryExpression: function _buildQueryExpression() {
      return 'category';
    },
    _applyStateToQueryOptions: function _applyStateToQueryOptions() {
      return {
        area: this.options.where.Area
      };
    },
    getRemainingCount: function getRemainingCount() {
      return 0;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});