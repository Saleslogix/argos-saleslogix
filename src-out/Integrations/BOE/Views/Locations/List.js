define("crm/Integrations/BOE/Views/Locations/List", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/List", "../../Models/Names", "argos/I18n"], function (_exports, _declare, _lang, _List, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _List = _interopRequireDefault(_List);
  _Names = _interopRequireDefault(_Names);
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
  var resource = (0, _I18n["default"])('locationsList');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.Locations.List', [_List["default"]], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.Name %}</p>', '<p class="listview-heading">{%: $.Description %}</p>', '<p class="micro-text">{%: $.ErpStatus %}</p>']),
    // Localization
    titleText: resource.titleText,
    // View Properties
    id: 'locations_list',
    detailView: '',
    modelName: _Names["default"].LOCATION,
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
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "upper(Description) like \"".concat(q, "%\" or upper(ErpLogicalId) like \"").concat(q, "%\"");
    }
  });

  _lang["default"].setObject('icboe.Views.Locations.List', __class);

  var _default = __class;
  _exports["default"] = _default;
});