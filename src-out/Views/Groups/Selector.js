define("crm/Views/Groups/Selector", ["exports", "dojo/_base/declare", "argos/List", "argos/Store/SData", "argos/I18n"], function (_exports, _declare, _List, _SData, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _List = _interopRequireDefault(_List);
  _SData = _interopRequireDefault(_SData);
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
  var resource = (0, _I18n["default"])('groupsSelector');

  var __class = (0, _declare["default"])('crm.Views.Groups.Selector', [_List["default"]], {
    id: 'groups_configure',
    expose: false,
    enableSearch: false,
    icon: '',
    listViewId: 'groups_list',
    family: '',
    // Localization
    titleText: resource.titleText,
    isCardView: false,
    itemTemplate: new Simplate(['<h4>{%: $[$$.labelProperty] %}</h4>']),
    constructor: function constructor() {
      this.tools = {
        tbar: []
      };
    },
    activateEntry: function activateEntry(params) {
      if (this._selectionModel && this.isNavigationDisabled()) {
        this._selectionModel.toggle(params.key, this.entries[params.key] || params.descriptor, params.$source);

        if (this.options.singleSelect && this.options.singleSelectAction) {
          this.invokeSingleSelectAction();
        }
      }
    },
    createStore: function createStore() {
      if (!this.family) {
        throw new Error('The groups selector must have a family set.');
      }

      return this.createGroupStore(this.family);
    },
    createGroupStore: function createGroupStore(entityName) {
      var store = null;

      if (typeof entityName === 'string' && entityName !== '') {
        store = new _SData["default"]({
          service: App.services.crm,
          resourceKind: 'groups',
          contractName: 'system',
          where: "upper(family) eq '".concat(entityName.toUpperCase(), "'"),
          orderBy: 'name asc',
          include: ['layout', 'tableAliases'],
          idProperty: '$key',
          applicationName: 'slx',
          scope: this
        });
      }

      return store;
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "name like \"".concat(q, "%\"");
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});