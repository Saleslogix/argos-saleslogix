define('crm/Integrations/Contour/ApplicationModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/Application', 'argos/ApplicationModule', './Views/PxSearch/AccountPxSearch', './Views/PxSearch/LocationPicker', 'argos/I18n', './Models/Place/Offline', './Models/Place/SData'], function (module, exports, _declare, _lang, _string, _Application, _ApplicationModule, _AccountPxSearch, _LocationPicker, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _Application2 = _interopRequireDefault(_Application);

  var _ApplicationModule2 = _interopRequireDefault(_ApplicationModule);

  var _AccountPxSearch2 = _interopRequireDefault(_AccountPxSearch);

  var _LocationPicker2 = _interopRequireDefault(_LocationPicker);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  const resource = (0, _I18n2.default)('proxAppModule');

  const __class = (0, _declare2.default)('crm.Integrations.Contour.ApplicationModule', [_ApplicationModule2.default], {
    // Localization strings
    viewAccountsNearbyText: resource.viewAccountsNearbyText,
    helpTitleText: resource.helpTitleText,

    isIntegrationEnabled: function isIntegrationEnabled() {
      const results = this.application.context.integrations.filter(integration => integration.Name === 'Contour')[0];
      return results && results.Enabled;
    },
    loadViewsDynamic: function loadViews() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      // Register new proximity search views
      this.registerView(new _AccountPxSearch2.default({
        canRedirectTo: true
      }));
      this.registerView(new _LocationPicker2.default({
        canRedirectTo: true
      }));
    },
    loadCustomizationsDynamic: function loadCustomizations() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      // We want to add these views to the default set of home screen views.
      // Save the original getDefaultviews() function.
      const originalDefViews = _Application2.default.prototype.getDefaultViews;
      _lang2.default.extend(_Application2.default, {
        getDefaultViews() {
          // Get view array from original function, or default to empty array
          const views = originalDefViews.apply(this, arguments) || [];
          // Add custom view(s)
          views.push('pxSearch_Accounts');
          views.push('pxSearch_locations');
          return views;
        }
      });

      // Add the new help
      const onHelpRowCreated = crm.Views.Help.prototype.onHelpRowCreated;
      this.registerCustomization('detail', 'help', {
        at: row => {
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
    registerAccountMods() {
      // add the view nearby button
      this.registerCustomization('detail', 'account_detail', {
        at(row) {
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
      });
      // extend the view's class
      _lang2.default.extend(crm.Views.Account.Detail, {
        addressNotGeocodedErrorText: resource.addressNotGeocodedErrorText,
        accountsNearText: resource.accountsNearText,
        querySelect: crm.Views.Account.Detail.prototype.querySelect.concat(['Address/GeocodeFailed', 'Address/GeocodeLatitude', 'Address/GeocodeLongitude', 'Address/GeocodeProvider']),
        viewNearby() {
          if (this.entry.Address.GeocodeFailed !== null && this.entry.Address.GeocodeFailed === true || this.entry.Address.GeocodeProvider === null || this.entry.Address.GeocodeLatitude === null || this.entry.Address.GeocodeLongitude === null) {
            alert(this.addressNotGeocodedErrorText); // eslint-disable-line
            return;
          }
          const geocode = this.entry.Address;
          const view = App.getView('pxSearch_Accounts');
          view.refreshRequired = true;
          view.lat = geocode.GeocodeLatitude;
          view.lon = geocode.GeocodeLongitude;
          view.show({
            title: _string2.default.substitute(this.accountsNearText, [this.entry.AccountName])
          }, {});
        }
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});