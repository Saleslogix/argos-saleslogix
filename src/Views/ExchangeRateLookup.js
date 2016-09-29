import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import _LegacySDataListMixin from 'argos/_LegacySDataListMixin';
import getResource from 'argos/I18n';

const resource = getResource('exchangeRateLookup');

/**
 * @class crm.Views.ExchangeRateLookup
 *
 *
 * @extends argos.List
 * @mixins argos._LegacySDataListMixin
 *
 */
const __class = declare('crm.Views.ExchangeRateLookup', [List, _LegacySDataListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.$key %} ({%: $.Rate %})</h3>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  expose: false,
  enableSearch: false,
  id: 'exchangerate_lookup',

  requestData: function requestData() {
    this.processFeed();
  },
  processFeed: function processFeed() {
    const rates = App.context && App.context.exchangeRates;
    const list = [];
    const feed = {};

    for (const prop in rates) {
      if (rates.hasOwnProperty(prop)) {
        list.push({
          $key: prop,
          $descriptor: prop,
          Rate: rates[prop],
        });
      }
    }

    feed.$resources = list;

    this.inherited(arguments, [feed]);
  },
  hasMoreData: function hasMoreData() {
    return false;
  },
  refreshRequiredFor: function refreshRequiredFor() {
    return true;
  },
  formatSearchQuery: function formatSearchQuery() {
  },
});

lang.setObject('Mobile.SalesLogix.Views.ExchangeRateLookup', __class);
export default __class;
