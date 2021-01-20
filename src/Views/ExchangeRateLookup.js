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
import List from 'argos/List';
import _LegacySDataListMixin from 'argos/_LegacySDataListMixin';
import getResource from 'argos/I18n';

const resource = getResource('exchangeRateLookup');

const __class = declare('crm.Views.ExchangeRateLookup', [List, _LegacySDataListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.$key %} ({%: $.Rate %})</p>',
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

export default __class;
