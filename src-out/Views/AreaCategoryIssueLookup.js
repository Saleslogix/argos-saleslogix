define('crm/Views/AreaCategoryIssueLookup', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/_LegacySDataListMixin', 'argos/I18n'], function (module, exports, _declare, _List, _LegacySDataListMixin2, _I18n) {
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

  const resource = (0, _I18n2.default)('areaCategoryIssueLookup');

  const __class = (0, _declare2.default)('crm.Views.AreaCategoryIssueLookup', [_List2.default, _LegacySDataListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.$descriptor %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    pageSize: 200,
    expose: false,
    enableSearch: false,
    enablePullToRefresh: false,
    id: 'areacategoryissue_lookup',
    queryOrderBy: 'Area,Category,Issue',
    querySelect: ['Area', 'Category', 'Issue'],
    resourceKind: 'areaCategoryIssues',
    isCardView: false,

    show: function show(options) {
      this.active = options.where;

      options.where = false;

      this.inherited(arguments, [options]);
    },
    requestData: function requestData() {
      if (this.cache) {
        this.processFeed();
        this.isRefreshing = false;
      } else {
        this.inherited(requestData, arguments);
      }
    },
    processFeed: function processFeed(feed) {
      let theFeed = feed;
      // assume order is preserved
      if (theFeed) {
        this.createCacheFrom(feed);
      }

      let use = this.cache;

      if (use && this.active && this.active.Area) {
        use = use[this.active.Area];
      }
      if (use && this.active && this.active.Category) {
        use = use[this.active.Category];
      }

      theFeed = this.buildFeedFrom(use);

      this.inherited(arguments, [theFeed]);
    },
    createCacheFrom: function createCacheFrom(feed) {
      const feedLength = feed.$resources.length;
      this.cache = {};

      for (let i = 0; i < feedLength; i += 1) {
        const entry = feed.$resources[i];
        const area = this.cache[entry.Area] || (this.cache[entry.Area] = {});
        const category = area[entry.Category] || (area[entry.Category] = {});

        category[entry.Issue] = true;
      }
    },
    buildFeedFrom: function buildFeedFrom(segment) {
      const list = [];

      for (const n in segment) {
        if (segment.hasOwnProperty(n)) {
          list.push({
            $key: n,
            $descriptor: n
          });
        }
      }

      return {
        $resources: list
      };
    },
    hasMoreData: function hasMoreData() {
      return false; // todo: implement paging?
    },
    refreshRequiredFor: function refreshRequiredFor() {
      return true; // todo: implement refresh detection?
    },
    formatSearchQuery: function formatSearchQuery() {}
  });

  exports.default = __class;
  module.exports = exports['default'];
});