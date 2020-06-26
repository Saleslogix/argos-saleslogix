define("crm/Integrations/Contour/Views/PxSearch/LocationPicker", ["exports", "dojo/_base/declare", "dojo/_base/lang", "dojo/string", "argos/List", "argos/I18n", "../../Models/Names"], function (_exports, _declare, _lang, _string, _List, _I18n, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _string = _interopRequireDefault(_string);
  _List = _interopRequireDefault(_List);
  _I18n = _interopRequireDefault(_I18n);
  _Names = _interopRequireDefault(_Names);

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
  var resource = (0, _I18n["default"])('locPicker');

  var __class = (0, _declare["default"])('crm.Integrations.Contour.Views.PxSearch.LocationPicker', [_List["default"]], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Name %}</p>']),
    // overriding the stock rowTemplate with our custom key and descriptor
    liRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%: $.$key %}" data-descriptor="{%: $.$descriptor %}" data-lat="{%: $.Address.GeocodeLatitude %}" data-lon="{%: $.Address.GeocodeLongitude %}">', '<button data-action="selectEntry" class="list-item-selector btn-icon hide-focus">', "<svg class=\"icon\" focusable=\"false\" aria-hidden=\"true\" role=\"presentation\">\n        <use xlink:href=\"#icon-{%= $$.icon || $$.selectIcon %}\" />\n      </svg>", '</button>', '<div class="list-item-content">{%! $$.itemTemplate %}</div>', '</li>']),
    isCardView: false,
    // Localization
    accountsNearText: resource.accountsNearText,
    myHouseText: resource.myHouseText,
    myOfficeText: resource.myOfficeText,
    titleText: resource.titleText,
    // View Properties
    id: 'pxSearch_locations',
    security: 'Entities/Place/View',
    entityName: 'Place',
    allowSelection: true,
    enableActions: false,
    pageSize: 100,
    offlineIds: null,
    resourceKind: 'places',
    modelName: _Names["default"].PLACE,
    enableSearch: true,
    groupsEnabled: false,
    enableDynamicGroupLayout: false,
    // User Address Properties
    _myWork: null,
    _myHome: null,
    startup: function startup() {
      this.inherited(startup, arguments);

      this._getUserInfoAddresses();
    },
    _getUserInfoAddresses: function _getUserInfoAddresses() {
      var _this = this;

      if (App.context.user) {
        var querySelect = ['UserInfo/Address/GeocodeProvider', 'UserInfo/Address/GeocodeLatitude', 'UserInfo/Address/GeocodeLongitude', 'UserInfo/Address/GeocodeFailed', 'UserInfo/HomeAddress/GeocodeProvider', 'UserInfo/HomeAddress/GeocodeLatitude', 'UserInfo/HomeAddress/GeocodeLongitude', 'UserInfo/HomeAddress/GeocodeFailed'];
        var request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService()).setResourceKind('users').setResourceSelector("'".concat(App.context.user.$key, "'")).setQueryArg('select', querySelect.join(','));
        request.read({
          success: function success(data) {
            if (data.UserInfo.Address && data.UserInfo.Address.GeocodeFailed === false) {
              _this._myWork = _this._createPlaceEntry(_this.myOfficeText, data.UserInfo.Address);
            }

            if (data.UserInfo.HomeAddress && data.UserInfo.HomeAddress.GeocodeFailed === false) {
              _this._myHome = _this._createPlaceEntry(_this.myHouseText, data.UserInfo.HomeAddress);
            }
          }
        });
      }
    },
    _createPlaceEntry: function _createPlaceEntry(name, address) {
      var plc = {};
      plc.Address = address;
      plc.$descriptor = plc.Name = name;
      plc.$httpStatus = 200;
      plc.$key = address.$key;
      plc.ThisUserOnly = true;
      return plc;
    },
    processData: function processData(entries) {
      // Inject the current user's addresses
      if (this._myHome) {
        entries.unshift(this._myHome);
      }

      if (this._myWork) {
        entries.unshift(this._myWork);
      }

      if (!entries) {
        return;
      }

      var count = entries.length;

      if (count > 0) {
        var docfrag = document.createDocumentFragment();

        for (var i = 0; i < count; i++) {
          var entry = this._processEntry(entries[i]); // If key comes back with nothing, check that the store is properly
          // setup with an idProperty


          this.entries[this.getIdentity(entry)] = entry;
          var rowNode = this.createItemRowNode(entry);
          docfrag.appendChild(rowNode);
          this.onApplyRowTemplate(entry, rowNode);
        }

        if (docfrag.childNodes.length > 0) {
          $(this.contentNode).append(docfrag);
        }
      }
    },
    // custom activateEntry method since we aren't actually opening a detail view
    activateEntry: function activateEntry(params) {
      var view = App.getView('pxSearch_Accounts');

      if (params.key === 'Me') {
        view.show();
      } else {
        view.lat = params.lat;
        view.lon = params.lon;
        view.show({
          title: _string["default"].substitute(this.accountsNearText, [params.descriptor])
        }, {});
      }
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery);
      return "(ThisUserOnly eq \"F\" or (ThisUserOnly eq \"T\" and UserId eq \"".concat(App.context.user.$key, "\")) and Name like \"%").concat(q, "%\"");
    }
  });

  _lang["default"].setObject('Proximity.Views.Place.List', __class);

  var _default = __class;
  _exports["default"] = _default;
});