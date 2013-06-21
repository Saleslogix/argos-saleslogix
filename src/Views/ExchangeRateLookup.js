/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.ExchangeRateLookup
 *
 *
 * @extends Sage.Platform.Mobile.List
 * @mixins Sage.Platform.Mobile._LegacySDataListMixin
 *
 */
define('Mobile/SalesLogix/Views/ExchangeRateLookup', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/_LegacySDataListMixin'
], function(
    declare,
    List,
    _LegacySDataListMixin
) {

    return declare('Mobile.SalesLogix.Views.ExchangeRateLookup', [List, _LegacySDataListMixin], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.$key %} ({%: $.Rate %})</h3>'
        ]),

        //Localization
        titleText: 'Exchange Rates',

        //View Properties
        expose: false,
        enableSearch: false,
        id: 'exchangerate_lookup',

        requestData: function() {
            this.processFeed();
        },
        processFeed: function() {
            var rates, list, prop, feed;

            rates = App.context && App.context.exchangeRates;
            list = [];
            feed = {};

            for (prop in rates) {
                if (rates.hasOwnProperty(prop)) {
                    list.push({
                        '$key': prop,
                        '$descriptor': prop,
                        'Rate': rates[prop]
                    });
                }
            }

            feed['$resources'] = list;

            this.inherited(arguments, [feed]);
        },
        hasMoreData: function() {
            return false;
        },
        refreshRequiredFor: function(options) {
            return true;
        },
        formatSearchQuery: function(searchQuery) {
        }
    });
});

