define("crm/Views/Owner/List", ["exports", "dojo/_base/declare", "argos/List", "argos/I18n"], function (_exports, _declare, _List, _I18n) {
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
  var resource = (0, _I18n["default"])('ownerList');

  var __class = (0, _declare["default"])('crm.Views.Owner.List', [_List["default"]], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.OwnerDescription %}</p>']),
    // Localization
    titleText: resource.titleText,
    // View Properties
    id: 'owner_list',
    isCardView: false,
    security: 'Entities/Owner/View',
    queryOrderBy: 'OwnerDescription',
    querySelect: ['OwnerDescription', 'User/Enabled', 'User/Type', 'Type'],
    queryWhere: 'Type ne "Department"',
    resourceKind: 'owners',
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "upper(OwnerDescription) like \"%".concat(q, "%\"");
    },
    processData: function processData(items) {
      var _this = this;

      if (items) {
        items = items.filter(function (item) {
          // eslint-disable-line
          return _this._userEnabled(item) && _this._isCorrectType(item);
        }, this);
      }

      this.inherited(processData, arguments);
    },
    _userEnabled: function _userEnabled(item) {
      // If User is null, it is probably a team
      if (item.User === null || item.User.Enabled) {
        return true;
      }

      return false;
    },
    _isCorrectType: function _isCorrectType(item) {
      // If user is null, it is probably a team
      if (item.User === null) {
        return true;
      } // Filter out WebViewer, Retired, Template and AddOn users like the user list does


      return item.User.Type !== 3 && item.User.Type !== 5 && item.User.Type !== 6 && item.User.Type !== 7;
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});