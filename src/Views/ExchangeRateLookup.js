import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import _LegacySDataListMixin from 'argos/_LegacySDataListMixin';

/**
 * @class crm.Views.ExchangeRateLookup
 *
 *
 * @extends argos.List
 * @mixins argos._LegacySDataListMixin
 *
 */
var __class = declare('crm.Views.ExchangeRateLookup', [List, _LegacySDataListMixin], {
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
    refreshRequiredFor: function() {
        return true;
    },
    formatSearchQuery: function() {
    }
});

lang.setObject('Mobile.SalesLogix.Views.ExchangeRateLookup', __class);
export default __class;

