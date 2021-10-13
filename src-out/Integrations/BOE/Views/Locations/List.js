define('crm/Integrations/BOE/Views/Locations/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('locationsList'); /* Copyright 2017 Infor
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

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Locations.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.Name %}</p>', '<p class="listview-heading">{%: $.Description %}</p>', '<p class="micro-text">{%: $.ErpStatus %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'locations_list',
    detailView: '',
    modelName: _Names2.default.LOCATION,
    resourceKind: 'slxLocations',
    enableActions: false,
    expose: false,

    // Card layout
    itemIconClass: '',

    // Metrics
    entityName: 'SlxLocation',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {});
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      const q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return `upper(Description) like "${q}%" or upper(ErpLogicalId) like "${q}%"`;
    }
  });

  _lang2.default.setObject('icboe.Views.Locations.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});