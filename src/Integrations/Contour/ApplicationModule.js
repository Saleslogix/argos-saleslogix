/*
 * Copyright (c) 2016, Infor (US), Inc. All rights reserved.
 */
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import query from 'dojo/query';
import domClass from 'dojo/dom-class';
import format from 'crm/Format';
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

  isIntegrationEnabled: function isIntegrationEnabled() {
    const results = this.application.context.integrations.filter((integration) => integration.Name === 'Contour')[0];
    return results && results.Enabled;
  },
  loadViewsDynamic: function loadViews() {
    if (!this.isIntegrationEnabled()) {
      return;
    }

    console.log('Loading dynamic views for Contour');
    // Register new proximity search views
    this.registerView(new AccountPxSearch());
    this.registerView(new LocationPicker());
  },
  loadCustomizationsDynamic: function loadCustomizations() {
    if (!this.isIntegrationEnabled()) {
      return;
    }

    console.log('Loading dynamic customizations for Contour');
    // We want to add these views to the default set of home screen views.
    // Save the original getDefaultviews() function.
    var originalDefViews = crm.Application.prototype.getDefaultViews;
    lang.extend(Mobile.SalesLogix.Application, {
      getDefaultViews: function() {
        // Get view array from original function, or default to empty array
        var views = originalDefViews.apply(this, arguments) || [];
        //Add custom view(s)
        views.push('pxSearch_Accounts');
        views.push('pxSearch_locations');
        return views;
      }
    });

    this.registerAccountMods();
  },
  registerAccountMods: function() {
    // add the view nearby button
    this.registerCustomization('detail', 'account_detail', {
      at: function(row) {
        return row.name === 'AddNoteAction';
      },
      type: 'insert',
      value: {
        name: 'ViewNearbyAction',
        property: 'AccountName',
        label: this.viewAccountsNearbyText,
        iconClass: 'fa fa-building fa-lg',
        action: 'viewNearby',
      }
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
      viewNearby: function() {
        if ((this.entry.Address.GeocodeFailed !== null && this.entry.Address.GeocodeFailed === true) ||
          this.entry.Address.GeocodeProvider === null ||
          this.entry.Address.GeocodeLatitude === null ||
          this.entry.Address.GeocodeLongitude === null) {
          alert(this.addressNotGeocodedErrorText);
          return;
        }
        var geocode = this.entry.Address;
        var view = App.getView('pxSearch_Accounts');
        view.refreshRequired = true,
          view.lat = geocode.GeocodeLatitude,
          view.lon = geocode.GeocodeLongitude,
          view.show({
            title: string.substitute(this.accountsNearText, [this.entry.AccountName])
          }, {});
      },
    });
  },
});

export default __class;
