define('crm/Views/ExchangeRateLookup', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/_LegacySDataListMixin', 'argos/I18n'], function (module, exports, _declare, _List, _LegacySDataListMixin2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _LegacySDataListMixin3 = _interopRequireDefault(_LegacySDataListMixin2);

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

  const resource = (0, _I18n2.default)('exchangeRateLookup');

  const __class = (0, _declare2.default)('crm.Views.ExchangeRateLookup', [_List2.default, _LegacySDataListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.$key %} ({%: $.Rate %})</p>']),

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
            Rate: rates[prop]
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
    formatSearchQuery: function formatSearchQuery() {}
  });

  exports.default = __class;
  module.exports = exports['default'];
});