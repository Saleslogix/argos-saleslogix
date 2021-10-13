define('crm/Integrations/ActivityAssociations/Views/HistoryAssociation/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _List, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2020 Infor
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

  const resource = (0, _I18n2.default)('historyAssociationList');

  const __class = (0, _declare2.default)('crm.Integrations.ActivityAssociations.Views.HistoryAssociation.List', [_List2.default], {
    // Localization
    titleText: resource.titleText,
    primaryText: resource.primaryText,

    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.EntityType %} | {%: $.EntityName %}</p>', '<p class="micro-text">{%: $$.primaryText %} {%: $.IsPrimary %}</p>']),

    // View Properties
    id: 'history_association_list',
    security: null,
    enableActions: true,
    pageSize: 105,
    resourceKind: 'historyAssociations',
    modelName: _Names2.default.HISTORYASSOCIATION,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return `upper(EntityName) like "%${this.escapeSearchQuery(searchQuery.toUpperCase())}%"`;
    },
    getTitle: function getTitle(entry) {
      if (!entry) {
        return '';
      }

      return this._model && this._model.getEntityDescription(entry) || entry.EntityName;
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});