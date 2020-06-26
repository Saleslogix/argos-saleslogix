define("crm/Views/ProductProgram/List", ["exports", "dojo/_base/declare", "argos/List", "argos/I18n"], function (_exports, _declare, _List, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _List = _interopRequireDefault(_List);
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
  var resource = (0, _I18n["default"])('productProgramList');

  var __class = (0, _declare["default"])('crm.Views.ProductProgram.List', [_List["default"]], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Program %}</p>', '<p class="micro-text">', '{%: $.Price %}', '</p>']),
    // Localization
    titleText: resource.titleText,
    // View Properties
    id: 'productprogram_list',
    security: 'Entities/ProductProgram/View',
    queryOrderBy: 'Program',
    querySelect: ['DefaultProgram', 'Program', 'Price'],
    resourceKind: 'productPrograms',
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "(upper(Program) like \"".concat(q, "%\")");
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});