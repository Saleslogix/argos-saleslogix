/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/ExchangeRateLookup', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    List
) {

    return declare('Mobile.SalesLogix.Views.ExchangeRateLookup', [List], {
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

