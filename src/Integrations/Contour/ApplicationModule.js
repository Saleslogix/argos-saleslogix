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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import Application from 'argos/Application';
import ApplicationModule from 'argos/ApplicationModule';
import AccountPxSearch from './Views/PxSearch/AccountPxSearch';
import LocationPicker from './Views/PxSearch/LocationPicker';
import getResource from 'argos/I18n';
import './Models/Place/Offline';
import './Models/Place/SData';

const resource = getResource('proxAppModule');

const __class = declare('crm.Integrations.Contour.ApplicationModule', [ApplicationModule], {
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
    this.registerView(new AccountPxSearch({
      canRedirectTo: true,
    }));
    this.registerView(new LocationPicker({
      canRedirectTo: true,
    }));
  },
  loadCustomizationsDynamic: function loadCustomizations() {
    if (!this.isIntegrationEnabled()) {
      return;
    }

    // We want to add these views to the default set of home screen views.
    // Save the original getDefaultviews() function.
    const originalDefViews = Application.prototype.getDefaultViews;
    lang.extend(Application, {
      getDefaultViews() {
        // Get view array from original function, or default to empty array
        const views = originalDefViews.apply(this, arguments) || [];
        // Add custom view(s)
        views.push('pxSearch_Accounts');
        views.push('pxSearch_locations');
        return views;
      },
    });

    // Add the new help
    const onHelpRowCreated = Mobile.SalesLogix.Views.Help.prototype.onHelpRowCreated;
    this.registerCustomization('detail', 'help', {
      at: (row) => {
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
          onCreate: onHelpRowCreated,
        }],
      },
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
        action: 'viewNearby',
      },
    });
    // extend the view's class
    lang.extend(crm.Views.Account.Detail, {
      addressNotGeocodedErrorText: resource.addressNotGeocodedErrorText,
      accountsNearText: resource.accountsNearText,
      querySelect: crm.Views.Account.Detail.prototype.querySelect.concat([
        'Address/GeocodeFailed',
        'Address/GeocodeLatitude',
        'Address/GeocodeLongitude',
        'Address/GeocodeProvider',
      ]),
      viewNearby() {
        if ((this.entry.Address.GeocodeFailed !== null && this.entry.Address.GeocodeFailed === true) ||
          this.entry.Address.GeocodeProvider === null ||
          this.entry.Address.GeocodeLatitude === null ||
          this.entry.Address.GeocodeLongitude === null) {
          alert(this.addressNotGeocodedErrorText); // eslint-disable-line
          return;
        }
        const geocode = this.entry.Address;
        const view = App.getView('pxSearch_Accounts');
        view.refreshRequired = true;
        view.lat = geocode.GeocodeLatitude;
        view.lon = geocode.GeocodeLongitude;
        view.show({
          title: string.substitute(this.accountsNearText, [this.entry.AccountName]),
        }, {});
      },
    });
  },
});

export default __class;
