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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQ29udG91ci9WaWV3cy9QeFNlYXJjaC9Mb2NhdGlvblBpY2tlci5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImxpUm93VGVtcGxhdGUiLCJpc0NhcmRWaWV3IiwiYWNjb3VudHNOZWFyVGV4dCIsIm15SG91c2VUZXh0IiwibXlPZmZpY2VUZXh0IiwidGl0bGVUZXh0IiwiaWQiLCJzZWN1cml0eSIsImVudGl0eU5hbWUiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJwYWdlU2l6ZSIsIm9mZmxpbmVJZHMiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJQTEFDRSIsImVuYWJsZVNlYXJjaCIsImdyb3Vwc0VuYWJsZWQiLCJlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQiLCJfbXlXb3JrIiwiX215SG9tZSIsInN0YXJ0dXAiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJfZ2V0VXNlckluZm9BZGRyZXNzZXMiLCJBcHAiLCJjb250ZXh0IiwidXNlciIsInF1ZXJ5U2VsZWN0IiwicmVxdWVzdCIsIlNhZ2UiLCJTRGF0YSIsIkNsaWVudCIsIlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldFJlc291cmNlS2luZCIsInNldFJlc291cmNlU2VsZWN0b3IiLCIka2V5Iiwic2V0UXVlcnlBcmciLCJqb2luIiwicmVhZCIsInN1Y2Nlc3MiLCJkYXRhIiwiVXNlckluZm8iLCJBZGRyZXNzIiwiR2VvY29kZUZhaWxlZCIsIl9jcmVhdGVQbGFjZUVudHJ5IiwiSG9tZUFkZHJlc3MiLCJuYW1lIiwiYWRkcmVzcyIsInBsYyIsIiRkZXNjcmlwdG9yIiwiTmFtZSIsIiRodHRwU3RhdHVzIiwiVGhpc1VzZXJPbmx5IiwicHJvY2Vzc0RhdGEiLCJlbnRyaWVzIiwidW5zaGlmdCIsImNvdW50IiwibGVuZ3RoIiwiZG9jZnJhZyIsImRvY3VtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImkiLCJlbnRyeSIsIl9wcm9jZXNzRW50cnkiLCJnZXRJZGVudGl0eSIsInJvd05vZGUiLCJjcmVhdGVJdGVtUm93Tm9kZSIsImFwcGVuZENoaWxkIiwib25BcHBseVJvd1RlbXBsYXRlIiwiY2hpbGROb2RlcyIsIiQiLCJjb250ZW50Tm9kZSIsImFwcGVuZCIsImFjdGl2YXRlRW50cnkiLCJwYXJhbXMiLCJ2aWV3IiwiZ2V0VmlldyIsImtleSIsInNob3ciLCJsYXQiLCJsb24iLCJ0aXRsZSIsInN1YnN0aXR1dGUiLCJkZXNjcmlwdG9yIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1BLFdBQVcsb0JBQVksV0FBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLHdEQUFSLEVBQWtFLGdCQUFsRSxFQUEwRTtBQUN4RjtBQUNBQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsK0NBRHlCLENBQWIsQ0FGMEU7QUFLeEY7QUFDQUMsbUJBQWUsSUFBSUQsUUFBSixDQUFhLENBQzFCLDJMQUQwQixFQUUxQixtRkFGMEIsbUtBTTFCLFdBTjBCLEVBTzFCLDZEQVAwQixFQVExQixPQVIwQixDQUFiLENBTnlFO0FBZ0J4RkUsZ0JBQVksS0FoQjRFOztBQWtCeEY7QUFDQUMsc0JBQWtCTixTQUFTTSxnQkFuQjZEO0FBb0J4RkMsaUJBQWFQLFNBQVNPLFdBcEJrRTtBQXFCeEZDLGtCQUFjUixTQUFTUSxZQXJCaUU7QUFzQnhGQyxlQUFXVCxTQUFTUyxTQXRCb0U7O0FBd0J4RjtBQUNBQyxRQUFJLG9CQXpCb0Y7QUEwQnhGQyxjQUFVLHFCQTFCOEU7QUEyQnhGQyxnQkFBWSxPQTNCNEU7QUE0QnhGQyxvQkFBZ0IsSUE1QndF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SUMsT0FBSixDQUFZQyxJQUFaLENBQWlCVSxJQUF2Riw0QkFBa0htRCxDQUFsSDtBQUNEO0FBckl1RixHQUExRSxDQUFoQjs7QUF3SUEsaUJBQUtFLFNBQUwsQ0FBZSw0QkFBZixFQUE2QzdGLE9BQTdDO29CQUNlQSxPIiwiZmlsZSI6IkxvY2F0aW9uUGlja2VyLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2xvY1BpY2tlcicpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQ29udG91ci5WaWV3cy5QeFNlYXJjaC5Mb2NhdGlvblBpY2tlcicsIFtMaXN0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JTogJC5OYW1lICV9PC9wPicsXHJcbiAgXSksXHJcbiAgLy8gb3ZlcnJpZGluZyB0aGUgc3RvY2sgcm93VGVtcGxhdGUgd2l0aCBvdXIgY3VzdG9tIGtleSBhbmQgZGVzY3JpcHRvclxyXG4gIGxpUm93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFbnRyeVwiIGRhdGEta2V5PVwieyU6ICQuJGtleSAlfVwiIGRhdGEtZGVzY3JpcHRvcj1cInslOiAkLiRkZXNjcmlwdG9yICV9XCIgZGF0YS1sYXQ9XCJ7JTogJC5BZGRyZXNzLkdlb2NvZGVMYXRpdHVkZSAlfVwiIGRhdGEtbG9uPVwieyU6ICQuQWRkcmVzcy5HZW9jb2RlTG9uZ2l0dWRlICV9XCI+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtYWN0aW9uPVwic2VsZWN0RW50cnlcIiBjbGFzcz1cImxpc3QtaXRlbS1zZWxlY3RvciBidG4taWNvbiBoaWRlLWZvY3VzXCI+JyxcclxuICAgIGA8c3ZnIGNsYXNzPVwiaWNvblwiIGZvY3VzYWJsZT1cImZhbHNlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxyXG4gICAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXslPSAkJC5pY29uIHx8ICQkLnNlbGVjdEljb24gJX1cIiAvPlxyXG4gICAgICA8L3N2Zz5gLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImxpc3QtaXRlbS1jb250ZW50XCI+eyUhICQkLml0ZW1UZW1wbGF0ZSAlfTwvZGl2PicsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG4gIGlzQ2FyZFZpZXc6IGZhbHNlLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY2NvdW50c05lYXJUZXh0OiByZXNvdXJjZS5hY2NvdW50c05lYXJUZXh0LFxyXG4gIG15SG91c2VUZXh0OiByZXNvdXJjZS5teUhvdXNlVGV4dCxcclxuICBteU9mZmljZVRleHQ6IHJlc291cmNlLm15T2ZmaWNlVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdweFNlYXJjaF9sb2NhdGlvbnMnLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvUGxhY2UvVmlldycsXHJcbiAgZW50aXR5TmFtZTogJ1BsYWNlJyxcclxuICBhbGxvd1NlbGVjdGlvbjogdHJ1ZSxcclxuICBlbmFibGVBY3Rpb25zOiBmYWxzZSxcclxuICBwYWdlU2l6ZTogMTAwLFxyXG4gIG9mZmxpbmVJZHM6IG51bGwsXHJcbiAgcmVzb3VyY2VLaW5kOiAncGxhY2VzJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlBMQUNFLFxyXG4gIGVuYWJsZVNlYXJjaDogdHJ1ZSxcclxuICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICBlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQ6IGZhbHNlLFxyXG5cclxuICAvLyBVc2VyIEFkZHJlc3MgUHJvcGVydGllc1xyXG4gIF9teVdvcms6IG51bGwsXHJcbiAgX215SG9tZTogbnVsbCxcclxuXHJcbiAgc3RhcnR1cDogZnVuY3Rpb24gc3RhcnR1cCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLl9nZXRVc2VySW5mb0FkZHJlc3NlcygpO1xyXG4gIH0sXHJcbiAgX2dldFVzZXJJbmZvQWRkcmVzc2VzKCkge1xyXG4gICAgaWYgKEFwcC5jb250ZXh0LnVzZXIpIHtcclxuICAgICAgY29uc3QgcXVlcnlTZWxlY3QgPSBbXHJcbiAgICAgICAgJ1VzZXJJbmZvL0FkZHJlc3MvR2VvY29kZVByb3ZpZGVyJyxcclxuICAgICAgICAnVXNlckluZm8vQWRkcmVzcy9HZW9jb2RlTGF0aXR1ZGUnLFxyXG4gICAgICAgICdVc2VySW5mby9BZGRyZXNzL0dlb2NvZGVMb25naXR1ZGUnLFxyXG4gICAgICAgICdVc2VySW5mby9BZGRyZXNzL0dlb2NvZGVGYWlsZWQnLFxyXG4gICAgICAgICdVc2VySW5mby9Ib21lQWRkcmVzcy9HZW9jb2RlUHJvdmlkZXInLFxyXG4gICAgICAgICdVc2VySW5mby9Ib21lQWRkcmVzcy9HZW9jb2RlTGF0aXR1ZGUnLFxyXG4gICAgICAgICdVc2VySW5mby9Ib21lQWRkcmVzcy9HZW9jb2RlTG9uZ2l0dWRlJyxcclxuICAgICAgICAnVXNlckluZm8vSG9tZUFkZHJlc3MvR2VvY29kZUZhaWxlZCddO1xyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0KEFwcC5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgICAgLnNldFJlc291cmNlS2luZCgndXNlcnMnKVxyXG4gICAgICAgIC5zZXRSZXNvdXJjZVNlbGVjdG9yKGAnJHtBcHAuY29udGV4dC51c2VyLiRrZXl9J2ApXHJcbiAgICAgICAgLnNldFF1ZXJ5QXJnKCdzZWxlY3QnLCBxdWVyeVNlbGVjdC5qb2luKCcsJykpO1xyXG5cclxuICAgICAgcmVxdWVzdC5yZWFkKHtcclxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGRhdGEuVXNlckluZm8uQWRkcmVzcyAmJiBkYXRhLlVzZXJJbmZvLkFkZHJlc3MuR2VvY29kZUZhaWxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXlXb3JrID0gdGhpcy5fY3JlYXRlUGxhY2VFbnRyeSh0aGlzLm15T2ZmaWNlVGV4dCwgZGF0YS5Vc2VySW5mby5BZGRyZXNzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChkYXRhLlVzZXJJbmZvLkhvbWVBZGRyZXNzICYmIGRhdGEuVXNlckluZm8uSG9tZUFkZHJlc3MuR2VvY29kZUZhaWxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbXlIb21lID0gdGhpcy5fY3JlYXRlUGxhY2VFbnRyeSh0aGlzLm15SG91c2VUZXh0LCBkYXRhLlVzZXJJbmZvLkhvbWVBZGRyZXNzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9jcmVhdGVQbGFjZUVudHJ5KG5hbWUsIGFkZHJlc3MpIHtcclxuICAgIGNvbnN0IHBsYyA9IHt9O1xyXG4gICAgcGxjLkFkZHJlc3MgPSBhZGRyZXNzO1xyXG4gICAgcGxjLiRkZXNjcmlwdG9yID0gcGxjLk5hbWUgPSBuYW1lO1xyXG4gICAgcGxjLiRodHRwU3RhdHVzID0gMjAwO1xyXG4gICAgcGxjLiRrZXkgPSBhZGRyZXNzLiRrZXk7XHJcbiAgICBwbGMuVGhpc1VzZXJPbmx5ID0gdHJ1ZTtcclxuICAgIHJldHVybiBwbGM7XHJcbiAgfSxcclxuICBwcm9jZXNzRGF0YShlbnRyaWVzKSB7XHJcbiAgICAvLyBJbmplY3QgdGhlIGN1cnJlbnQgdXNlcidzIGFkZHJlc3Nlc1xyXG4gICAgaWYgKHRoaXMuX215SG9tZSkge1xyXG4gICAgICBlbnRyaWVzLnVuc2hpZnQodGhpcy5fbXlIb21lKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9teVdvcmspIHtcclxuICAgICAgZW50cmllcy51bnNoaWZ0KHRoaXMuX215V29yayk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFlbnRyaWVzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb3VudCA9IGVudHJpZXMubGVuZ3RoO1xyXG5cclxuICAgIGlmIChjb3VudCA+IDApIHtcclxuICAgICAgY29uc3QgZG9jZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSB0aGlzLl9wcm9jZXNzRW50cnkoZW50cmllc1tpXSk7XHJcbiAgICAgICAgLy8gSWYga2V5IGNvbWVzIGJhY2sgd2l0aCBub3RoaW5nLCBjaGVjayB0aGF0IHRoZSBzdG9yZSBpcyBwcm9wZXJseVxyXG4gICAgICAgIC8vIHNldHVwIHdpdGggYW4gaWRQcm9wZXJ0eVxyXG4gICAgICAgIHRoaXMuZW50cmllc1t0aGlzLmdldElkZW50aXR5KGVudHJ5KV0gPSBlbnRyeTtcclxuXHJcbiAgICAgICAgY29uc3Qgcm93Tm9kZSA9IHRoaXMuY3JlYXRlSXRlbVJvd05vZGUoZW50cnkpO1xyXG5cclxuICAgICAgICBkb2NmcmFnLmFwcGVuZENoaWxkKHJvd05vZGUpO1xyXG4gICAgICAgIHRoaXMub25BcHBseVJvd1RlbXBsYXRlKGVudHJ5LCByb3dOb2RlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRvY2ZyYWcuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCh0aGlzLmNvbnRlbnROb2RlKS5hcHBlbmQoZG9jZnJhZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vIGN1c3RvbSBhY3RpdmF0ZUVudHJ5IG1ldGhvZCBzaW5jZSB3ZSBhcmVuJ3QgYWN0dWFsbHkgb3BlbmluZyBhIGRldGFpbCB2aWV3XHJcbiAgYWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldygncHhTZWFyY2hfQWNjb3VudHMnKTtcclxuICAgIGlmIChwYXJhbXMua2V5ID09PSAnTWUnKSB7XHJcbiAgICAgIHZpZXcuc2hvdygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmlldy5sYXQgPSBwYXJhbXMubGF0O1xyXG4gICAgICB2aWV3LmxvbiA9IHBhcmFtcy5sb247XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuYWNjb3VudHNOZWFyVGV4dCwgW3BhcmFtcy5kZXNjcmlwdG9yXSksXHJcbiAgICAgIH0sIHt9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpO1xyXG4gICAgcmV0dXJuIGAoVGhpc1VzZXJPbmx5IGVxIFwiRlwiIG9yIChUaGlzVXNlck9ubHkgZXEgXCJUXCIgYW5kIFVzZXJJZCBlcSBcIiR7QXBwLmNvbnRleHQudXNlci4ka2V5fVwiKSkgYW5kIE5hbWUgbGlrZSBcIiUke3F9JVwiYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdQcm94aW1pdHkuVmlld3MuUGxhY2UuTGlzdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=