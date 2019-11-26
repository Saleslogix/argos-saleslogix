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

  var resource = (0, _I18n2.default)('locPicker');

  var __class = (0, _declare2.default)('crm.Integrations.Contour.Views.PxSearch.LocationPicker', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Name %}</p>']),
    // overriding the stock rowTemplate with our custom key and descriptor
    liRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%: $.$key %}" data-descriptor="{%: $.$descriptor %}" data-lat="{%: $.Address.GeocodeLatitude %}" data-lon="{%: $.Address.GeocodeLongitude %}">', '<button data-action="selectEntry" class="list-item-selector btn-icon hide-focus">', '<svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n        <use xlink:href="#icon-{%= $$.icon || $$.selectIcon %}" />\n      </svg>', '</button>', '<div class="list-item-content">{%! $$.itemTemplate %}</div>', '</li>']),
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
    _getUserInfoAddresses: function _getUserInfoAddresses() {
      var _this = this;

      if (App.context.user) {
        var querySelect = ['UserInfo/Address/GeocodeProvider', 'UserInfo/Address/GeocodeLatitude', 'UserInfo/Address/GeocodeLongitude', 'UserInfo/Address/GeocodeFailed', 'UserInfo/HomeAddress/GeocodeProvider', 'UserInfo/HomeAddress/GeocodeLatitude', 'UserInfo/HomeAddress/GeocodeLongitude', 'UserInfo/HomeAddress/GeocodeFailed'];
        var request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService()).setResourceKind('users').setResourceSelector('\'' + App.context.user.$key + '\'').setQueryArg('select', querySelect.join(','));

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
          var entry = this._processEntry(entries[i]);
          // If key comes back with nothing, check that the store is properly
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
    activateEntry: function activateEntry(params) {
      var view = App.getView('pxSearch_Accounts');
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
      var q = this.escapeSearchQuery(searchQuery);
      return '(ThisUserOnly eq "F" or (ThisUserOnly eq "T" and UserId eq "' + App.context.user.$key + '")) and Name like "%' + q + '%"';
    }
  });

  _lang2.default.setObject('Proximity.Views.Place.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQ29udG91ci9WaWV3cy9QeFNlYXJjaC9Mb2NhdGlvblBpY2tlci5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImxpUm93VGVtcGxhdGUiLCJpc0NhcmRWaWV3IiwiYWNjb3VudHNOZWFyVGV4dCIsIm15SG91c2VUZXh0IiwibXlPZmZpY2VUZXh0IiwidGl0bGVUZXh0IiwiaWQiLCJzZWN1cml0eSIsImVudGl0eU5hbWUiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJwYWdlU2l6ZSIsIm9mZmxpbmVJZHMiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJQTEFDRSIsImVuYWJsZVNlYXJjaCIsImdyb3Vwc0VuYWJsZWQiLCJlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQiLCJfbXlXb3JrIiwiX215SG9tZSIsInN0YXJ0dXAiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJfZ2V0VXNlckluZm9BZGRyZXNzZXMiLCJBcHAiLCJjb250ZXh0IiwidXNlciIsInF1ZXJ5U2VsZWN0IiwicmVxdWVzdCIsIlNhZ2UiLCJTRGF0YSIsIkNsaWVudCIsIlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldFJlc291cmNlS2luZCIsInNldFJlc291cmNlU2VsZWN0b3IiLCIka2V5Iiwic2V0UXVlcnlBcmciLCJqb2luIiwicmVhZCIsInN1Y2Nlc3MiLCJkYXRhIiwiVXNlckluZm8iLCJBZGRyZXNzIiwiR2VvY29kZUZhaWxlZCIsIl9jcmVhdGVQbGFjZUVudHJ5IiwiSG9tZUFkZHJlc3MiLCJuYW1lIiwiYWRkcmVzcyIsInBsYyIsIiRkZXNjcmlwdG9yIiwiTmFtZSIsIiRodHRwU3RhdHVzIiwiVGhpc1VzZXJPbmx5IiwicHJvY2Vzc0RhdGEiLCJlbnRyaWVzIiwidW5zaGlmdCIsImNvdW50IiwibGVuZ3RoIiwiZG9jZnJhZyIsImRvY3VtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImkiLCJlbnRyeSIsIl9wcm9jZXNzRW50cnkiLCJnZXRJZGVudGl0eSIsInJvd05vZGUiLCJjcmVhdGVJdGVtUm93Tm9kZSIsImFwcGVuZENoaWxkIiwib25BcHBseVJvd1RlbXBsYXRlIiwiY2hpbGROb2RlcyIsIiQiLCJjb250ZW50Tm9kZSIsImFwcGVuZCIsImFjdGl2YXRlRW50cnkiLCJwYXJhbXMiLCJ2aWV3IiwiZ2V0VmlldyIsImtleSIsInNob3ciLCJsYXQiLCJsb24iLCJ0aXRsZSIsInN1YnN0aXR1dGUiLCJkZXNjcmlwdG9yIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1BLFdBQVcsb0JBQVksV0FBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLHdEQUFSLEVBQWtFLGdCQUFsRSxFQUEwRTtBQUN4RjtBQUNBQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsK0NBRHlCLENBQWIsQ0FGMEU7QUFLeEY7QUFDQUMsbUJBQWUsSUFBSUQsUUFBSixDQUFhLENBQzFCLDJMQUQwQixFQUUxQixtRkFGMEIsbUtBTTFCLFdBTjBCLEVBTzFCLDZEQVAwQixFQVExQixPQVIwQixDQUFiLENBTnlFO0FBZ0J4RkUsZ0JBQVksS0FoQjRFOztBQWtCeEY7QUFDQUMsc0JBQWtCTixTQUFTTSxnQkFuQjZEO0FBb0J4RkMsaUJBQWFQLFNBQVNPLFdBcEJrRTtBQXFCeEZDLGtCQUFjUixTQUFTUSxZQXJCaUU7QUFzQnhGQyxlQUFXVCxTQUFTUyxTQXRCb0U7O0FBd0J4RjtBQUNBQyxRQUFJLG9CQXpCb0Y7QUEwQnhGQyxjQUFVLHFCQTFCOEU7QUEyQnhGQyxnQkFBWSxPQTNCNEU7QUE0QnhGQyxvQkFBZ0IsSUE1QndF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LDhFQUFzRTlELElBQUlDLE9BQUosQ0FBWUMsSUFBWixDQUFpQlUsSUFBdkYsNEJBQWtIbUQsQ0FBbEg7QUFDRDtBQXJJdUYsR0FBMUUsQ0FBaEI7O0FBd0lBLGlCQUFLRSxTQUFMLENBQWUsNEJBQWYsRUFBNkM3RixPQUE3QztvQkFDZUEsTyIsImZpbGUiOiJMb2NhdGlvblBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdsb2NQaWNrZXInKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkNvbnRvdXIuVmlld3MuUHhTZWFyY2guTG9jYXRpb25QaWNrZXInLCBbTGlzdF0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuTmFtZSAlfTwvcD4nLFxyXG4gIF0pLFxyXG4gIC8vIG92ZXJyaWRpbmcgdGhlIHN0b2NrIHJvd1RlbXBsYXRlIHdpdGggb3VyIGN1c3RvbSBrZXkgYW5kIGRlc2NyaXB0b3JcclxuICBsaVJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBkYXRhLWFjdGlvbj1cImFjdGl2YXRlRW50cnlcIiBkYXRhLWtleT1cInslOiAkLiRrZXkgJX1cIiBkYXRhLWRlc2NyaXB0b3I9XCJ7JTogJC4kZGVzY3JpcHRvciAlfVwiIGRhdGEtbGF0PVwieyU6ICQuQWRkcmVzcy5HZW9jb2RlTGF0aXR1ZGUgJX1cIiBkYXRhLWxvbj1cInslOiAkLkFkZHJlc3MuR2VvY29kZUxvbmdpdHVkZSAlfVwiPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLWFjdGlvbj1cInNlbGVjdEVudHJ5XCIgY2xhc3M9XCJsaXN0LWl0ZW0tc2VsZWN0b3IgYnRuLWljb24gaGlkZS1mb2N1c1wiPicsXHJcbiAgICBgPHN2ZyBjbGFzcz1cImljb25cIiBmb2N1c2FibGU9XCJmYWxzZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cclxuICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi17JT0gJCQuaWNvbiB8fCAkJC5zZWxlY3RJY29uICV9XCIgLz5cclxuICAgICAgPC9zdmc+YCxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJsaXN0LWl0ZW0tY29udGVudFwiPnslISAkJC5pdGVtVGVtcGxhdGUgJX08L2Rpdj4nLFxyXG4gICAgJzwvbGk+JyxcclxuICBdKSxcclxuICBpc0NhcmRWaWV3OiBmYWxzZSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgYWNjb3VudHNOZWFyVGV4dDogcmVzb3VyY2UuYWNjb3VudHNOZWFyVGV4dCxcclxuICBteUhvdXNlVGV4dDogcmVzb3VyY2UubXlIb3VzZVRleHQsXHJcbiAgbXlPZmZpY2VUZXh0OiByZXNvdXJjZS5teU9mZmljZVRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAncHhTZWFyY2hfbG9jYXRpb25zJyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL1BsYWNlL1ZpZXcnLFxyXG4gIGVudGl0eU5hbWU6ICdQbGFjZScsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogZmFsc2UsXHJcbiAgcGFnZVNpemU6IDEwMCxcclxuICBvZmZsaW5lSWRzOiBudWxsLFxyXG4gIHJlc291cmNlS2luZDogJ3BsYWNlcycsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5QTEFDRSxcclxuICBlbmFibGVTZWFyY2g6IHRydWUsXHJcbiAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0OiBmYWxzZSxcclxuXHJcbiAgLy8gVXNlciBBZGRyZXNzIFByb3BlcnRpZXNcclxuICBfbXlXb3JrOiBudWxsLFxyXG4gIF9teUhvbWU6IG51bGwsXHJcblxyXG4gIHN0YXJ0dXA6IGZ1bmN0aW9uIHN0YXJ0dXAoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChzdGFydHVwLCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5fZ2V0VXNlckluZm9BZGRyZXNzZXMoKTtcclxuICB9LFxyXG4gIF9nZXRVc2VySW5mb0FkZHJlc3NlcygpIHtcclxuICAgIGlmIChBcHAuY29udGV4dC51c2VyKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5U2VsZWN0ID0gW1xyXG4gICAgICAgICdVc2VySW5mby9BZGRyZXNzL0dlb2NvZGVQcm92aWRlcicsXHJcbiAgICAgICAgJ1VzZXJJbmZvL0FkZHJlc3MvR2VvY29kZUxhdGl0dWRlJyxcclxuICAgICAgICAnVXNlckluZm8vQWRkcmVzcy9HZW9jb2RlTG9uZ2l0dWRlJyxcclxuICAgICAgICAnVXNlckluZm8vQWRkcmVzcy9HZW9jb2RlRmFpbGVkJyxcclxuICAgICAgICAnVXNlckluZm8vSG9tZUFkZHJlc3MvR2VvY29kZVByb3ZpZGVyJyxcclxuICAgICAgICAnVXNlckluZm8vSG9tZUFkZHJlc3MvR2VvY29kZUxhdGl0dWRlJyxcclxuICAgICAgICAnVXNlckluZm8vSG9tZUFkZHJlc3MvR2VvY29kZUxvbmdpdHVkZScsXHJcbiAgICAgICAgJ1VzZXJJbmZvL0hvbWVBZGRyZXNzL0dlb2NvZGVGYWlsZWQnXTtcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNpbmdsZVJlc291cmNlUmVxdWVzdChBcHAuZ2V0U2VydmljZSgpKVxyXG4gICAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ3VzZXJzJylcclxuICAgICAgICAuc2V0UmVzb3VyY2VTZWxlY3RvcihgJyR7QXBwLmNvbnRleHQudXNlci4ka2V5fSdgKVxyXG4gICAgICAgIC5zZXRRdWVyeUFyZygnc2VsZWN0JywgcXVlcnlTZWxlY3Quam9pbignLCcpKTtcclxuXHJcbiAgICAgIHJlcXVlc3QucmVhZCh7XHJcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuICAgICAgICAgIGlmIChkYXRhLlVzZXJJbmZvLkFkZHJlc3MgJiYgZGF0YS5Vc2VySW5mby5BZGRyZXNzLkdlb2NvZGVGYWlsZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX215V29yayA9IHRoaXMuX2NyZWF0ZVBsYWNlRW50cnkodGhpcy5teU9mZmljZVRleHQsIGRhdGEuVXNlckluZm8uQWRkcmVzcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZGF0YS5Vc2VySW5mby5Ib21lQWRkcmVzcyAmJiBkYXRhLlVzZXJJbmZvLkhvbWVBZGRyZXNzLkdlb2NvZGVGYWlsZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX215SG9tZSA9IHRoaXMuX2NyZWF0ZVBsYWNlRW50cnkodGhpcy5teUhvdXNlVGV4dCwgZGF0YS5Vc2VySW5mby5Ib21lQWRkcmVzcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfY3JlYXRlUGxhY2VFbnRyeShuYW1lLCBhZGRyZXNzKSB7XHJcbiAgICBjb25zdCBwbGMgPSB7fTtcclxuICAgIHBsYy5BZGRyZXNzID0gYWRkcmVzcztcclxuICAgIHBsYy4kZGVzY3JpcHRvciA9IHBsYy5OYW1lID0gbmFtZTtcclxuICAgIHBsYy4kaHR0cFN0YXR1cyA9IDIwMDtcclxuICAgIHBsYy4ka2V5ID0gYWRkcmVzcy4ka2V5O1xyXG4gICAgcGxjLlRoaXNVc2VyT25seSA9IHRydWU7XHJcbiAgICByZXR1cm4gcGxjO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0RhdGEoZW50cmllcykge1xyXG4gICAgLy8gSW5qZWN0IHRoZSBjdXJyZW50IHVzZXIncyBhZGRyZXNzZXNcclxuICAgIGlmICh0aGlzLl9teUhvbWUpIHtcclxuICAgICAgZW50cmllcy51bnNoaWZ0KHRoaXMuX215SG9tZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fbXlXb3JrKSB7XHJcbiAgICAgIGVudHJpZXMudW5zaGlmdCh0aGlzLl9teVdvcmspO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghZW50cmllcykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY291bnQgPSBlbnRyaWVzLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoY291bnQgPiAwKSB7XHJcbiAgICAgIGNvbnN0IGRvY2ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fcHJvY2Vzc0VudHJ5KGVudHJpZXNbaV0pO1xyXG4gICAgICAgIC8vIElmIGtleSBjb21lcyBiYWNrIHdpdGggbm90aGluZywgY2hlY2sgdGhhdCB0aGUgc3RvcmUgaXMgcHJvcGVybHlcclxuICAgICAgICAvLyBzZXR1cCB3aXRoIGFuIGlkUHJvcGVydHlcclxuICAgICAgICB0aGlzLmVudHJpZXNbdGhpcy5nZXRJZGVudGl0eShlbnRyeSldID0gZW50cnk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvd05vZGUgPSB0aGlzLmNyZWF0ZUl0ZW1Sb3dOb2RlKGVudHJ5KTtcclxuXHJcbiAgICAgICAgZG9jZnJhZy5hcHBlbmRDaGlsZChyb3dOb2RlKTtcclxuICAgICAgICB0aGlzLm9uQXBwbHlSb3dUZW1wbGF0ZShlbnRyeSwgcm93Tm9kZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkb2NmcmFnLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQodGhpcy5jb250ZW50Tm9kZSkuYXBwZW5kKGRvY2ZyYWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyBjdXN0b20gYWN0aXZhdGVFbnRyeSBtZXRob2Qgc2luY2Ugd2UgYXJlbid0IGFjdHVhbGx5IG9wZW5pbmcgYSBkZXRhaWwgdmlld1xyXG4gIGFjdGl2YXRlRW50cnkocGFyYW1zKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ3B4U2VhcmNoX0FjY291bnRzJyk7XHJcbiAgICBpZiAocGFyYW1zLmtleSA9PT0gJ01lJykge1xyXG4gICAgICB2aWV3LnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZpZXcubGF0ID0gcGFyYW1zLmxhdDtcclxuICAgICAgdmlldy5sb24gPSBwYXJhbXMubG9uO1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmFjY291bnRzTmVhclRleHQsIFtwYXJhbXMuZGVzY3JpcHRvcl0pLFxyXG4gICAgICB9LCB7fSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KTtcclxuICAgIHJldHVybiBgKFRoaXNVc2VyT25seSBlcSBcIkZcIiBvciAoVGhpc1VzZXJPbmx5IGVxIFwiVFwiIGFuZCBVc2VySWQgZXEgXCIke0FwcC5jb250ZXh0LnVzZXIuJGtleX1cIikpIGFuZCBOYW1lIGxpa2UgXCIlJHtxfSVcImA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnUHJveGltaXR5LlZpZXdzLlBsYWNlLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19