define('crm/Integrations/Contour/Views/PxSearch/LocationPicker', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _lang, _string, _List, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  const resource = (0, _I18n2.default)('locPicker');

  const __class = (0, _declare2.default)('crm.Integrations.Contour.Views.PxSearch.LocationPicker', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Name %}</p>']),
    // overriding the stock rowTemplate with our custom key and descriptor
    liRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%: $.$key %}" data-descriptor="{%: $.$descriptor %}" data-lat="{%: $.Address.GeocodeLatitude %}" data-lon="{%: $.Address.GeocodeLongitude %}">', '<button data-action="selectEntry" class="list-item-selector btn-icon hide-focus">', `<svg class="icon" focusable="false" aria-hidden="true" role="presentation">
        <use xlink:href="#icon-{%= $$.icon || $$.selectIcon %}" />
      </svg>`, '</button>', '<div class="list-item-content">{%! $$.itemTemplate %}</div>', '</li>']),
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
    modelName: _Names2.default.PLACE,
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
    _getUserInfoAddresses() {
      if (App.context.user) {
        const querySelect = ['UserInfo/Address/GeocodeProvider', 'UserInfo/Address/GeocodeLatitude', 'UserInfo/Address/GeocodeLongitude', 'UserInfo/Address/GeocodeFailed', 'UserInfo/HomeAddress/GeocodeProvider', 'UserInfo/HomeAddress/GeocodeLatitude', 'UserInfo/HomeAddress/GeocodeLongitude', 'UserInfo/HomeAddress/GeocodeFailed'];
        const request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService()).setResourceKind('users').setResourceSelector(`'${App.context.user.$key}'`).setQueryArg('select', querySelect.join(','));

        request.read({
          success: data => {
            if (data.UserInfo.Address && data.UserInfo.Address.GeocodeFailed === false) {
              this._myWork = this._createPlaceEntry(this.myOfficeText, data.UserInfo.Address);
            }
            if (data.UserInfo.HomeAddress && data.UserInfo.HomeAddress.GeocodeFailed === false) {
              this._myHome = this._createPlaceEntry(this.myHouseText, data.UserInfo.HomeAddress);
            }
          }
        });
      }
    },
    _createPlaceEntry(name, address) {
      const plc = {};
      plc.Address = address;
      plc.$descriptor = plc.Name = name;
      plc.$httpStatus = 200;
      plc.$key = address.$key;
      plc.ThisUserOnly = true;
      return plc;
    },
    processData(entries) {
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

      const count = entries.length;

      if (count > 0) {
        const docfrag = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
          const entry = this._processEntry(entries[i]);
          // If key comes back with nothing, check that the store is properly
          // setup with an idProperty
          this.entries[this.getIdentity(entry)] = entry;

          const rowNode = this.createItemRowNode(entry);

          docfrag.appendChild(rowNode);
          this.onApplyRowTemplate(entry, rowNode);
        }

        if (docfrag.childNodes.length > 0) {
          $(this.contentNode).append(docfrag);
        }
      }
    },
    // custom activateEntry method since we aren't actually opening a detail view
    activateEntry(params) {
      const view = App.getView('pxSearch_Accounts');
      if (params.key === 'Me') {
        view.show();
      } else {
        view.lat = params.lat;
        view.lon = params.lon;
        view.show({
          title: _string2.default.substitute(this.accountsNearText, [params.descriptor])
        }, {});
      }
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      const q = this.escapeSearchQuery(searchQuery);
      return `(ThisUserOnly eq "F" or (ThisUserOnly eq "T" and UserId eq "${App.context.user.$key}")) and Name like "%${q}%"`;
    }
  });

  _lang2.default.setObject('Proximity.Views.Place.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});