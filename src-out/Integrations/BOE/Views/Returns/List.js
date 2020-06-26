define("crm/Integrations/BOE/Views/Returns/List", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/List", "crm/Views/_RightDrawerListMixin", "crm/Views/_MetricListMixin", "crm/Views/_GroupListMixin", "argos/I18n"], function (_exports, _declare, _lang, _List, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _List = _interopRequireDefault(_List);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _GroupListMixin2 = _interopRequireDefault(_GroupListMixin2);
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
  var resource = (0, _I18n["default"])('returnsList');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.Returns.List', [_List["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"], _GroupListMixin2["default"]], {
    // Templates
    // TODO: Need template from PM
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.$descriptor %}</p>']),
    // Localization
    titleText: resource.titleText,
    documentDateText: resource.documentDateText,
    // View Properties
    id: 'returns_list',
    security: 'Entities/Return/View',
    insertSecurity: 'Entities/Return/Add',
    resourceKind: 'returns',
    allowSelection: true,
    enableActions: true,
    // Card layout
    itemIconClass: 'load',
    // TODO: ensure soho has this icon
    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,
    // Metrics
    entityName: 'Return',
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "upper(ReturnNumber) like \"%".concat(q, "%\"");
    }
  });

  _lang["default"].setObject('icboe.Views.Returns.List', __class);

  var _default = __class;
  _exports["default"] = _default;
});