define("crm/Integrations/Contour/ApplicationModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "dojo/string", "argos/Application", "argos/ApplicationModule", "./Views/PxSearch/AccountPxSearch", "./Views/PxSearch/LocationPicker", "argos/I18n", "./Models/Place/Offline", "./Models/Place/SData"], function (_exports, _declare, _lang, _string, _Application, _ApplicationModule, _AccountPxSearch, _LocationPicker, _I18n, _Offline, _SData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _string = _interopRequireDefault(_string);
  _Application = _interopRequireDefault(_Application);
  _ApplicationModule = _interopRequireDefault(_ApplicationModule);
  _AccountPxSearch = _interopRequireDefault(_AccountPxSearch);
  _LocationPicker = _interopRequireDefault(_LocationPicker);
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
  var resource = (0, _I18n["default"])('proxAppModule');

  var __class = (0, _declare["default"])('crm.Integrations.Contour.ApplicationModule', [_ApplicationModule["default"]], {
    // Localization strings
    viewAccountsNearbyText: resource.viewAccountsNearbyText,
    helpTitleText: resource.helpTitleText,
    isIntegrationEnabled: function isIntegrationEnabled() {
      var results = this.application.context.integrations.filter(function (integration) {
        return integration.Name === 'Contour';
      })[0];
      return results && results.Enabled;
    },
    loadViewsDynamic: function loadViews() {
      if (!this.isIntegrationEnabled()) {
        return;
      } // Register new proximity search views


      this.registerView(new _AccountPxSearch["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _LocationPicker["default"]({
        canRedirectTo: true
      }));
    },
    loadCustomizationsDynamic: function loadCustomizations() {
      if (!this.isIntegrationEnabled()) {
        return;
      } // We want to add these views to the default set of home screen views.
      // Save the original getDefaultviews() function.


      var originalDefViews = _Application["default"].prototype.getDefaultViews;

      _lang["default"].extend(_Application["default"], {
        getDefaultViews: function getDefaultViews() {
          // Get view array from original function, or default to empty array
          var views = originalDefViews.apply(this, arguments) || []; // Add custom view(s)

          views.push('pxSearch_Accounts');
          views.push('pxSearch_locations');
          return views;
        }
      }); // Add the new help


      var onHelpRowCreated = crm.Views.Help.prototype.onHelpRowCreated;
      this.registerCustomization('detail', 'help', {
        at: function at(row) {
          return row.name === 'HelpSection';
        },
        type: 'insert',
        where: 'after',
        value: {
          title: this.helpTitleText,
          name: 'ContourHelpSection',
          children: [{
            name: 'ContourHelp',
            devRoot: 'argos-contour',
            baseUrl: 'help/locales/contour',
            fileName: 'help.html',
            defaultUrl: 'help/locales/contour/en/help.html',
            onCreate: onHelpRowCreated
          }]
        }
      });
      this.registerAccountMods();
    },
    registerAccountMods: function registerAccountMods() {
      // add the view nearby button
      this.registerCustomization('detail', 'account_detail', {
        at: function at(row) {
          return row.name === 'AddNoteAction';
        },
        type: 'insert',
        value: {
          name: 'ViewNearbyAction',
          property: 'AccountName',
          label: this.viewAccountsNearbyText,
          iconClass: 'spreadsheet',
          action: 'viewNearby'
        }
      }); // extend the view's class

      _lang["default"].extend(crm.Views.Account.Detail, {
        addressNotGeocodedErrorText: resource.addressNotGeocodedErrorText,
        accountsNearText: resource.accountsNearText,
        querySelect: crm.Views.Account.Detail.prototype.querySelect.concat(['Address/GeocodeFailed', 'Address/GeocodeLatitude', 'Address/GeocodeLongitude', 'Address/GeocodeProvider']),
        viewNearby: function viewNearby() {
          if (this.entry.Address.GeocodeFailed !== null && this.entry.Address.GeocodeFailed === true || this.entry.Address.GeocodeProvider === null || this.entry.Address.GeocodeLatitude === null || this.entry.Address.GeocodeLongitude === null) {
            alert(this.addressNotGeocodedErrorText); // eslint-disable-line

            return;
          }

          var geocode = this.entry.Address;
          var view = App.getView('pxSearch_Accounts');
          view.refreshRequired = true;
          view.lat = geocode.GeocodeLatitude;
          view.lon = geocode.GeocodeLongitude;
          view.show({
            title: _string["default"].substitute(this.accountsNearText, [this.entry.AccountName])
          }, {});
        }
      });
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});