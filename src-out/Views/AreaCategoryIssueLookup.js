define("crm/Views/AreaCategoryIssueLookup", ["exports", "dojo/_base/declare", "argos/List", "argos/_LegacySDataListMixin", "argos/I18n"], function (_exports, _declare, _List, _LegacySDataListMixin2, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _List = _interopRequireDefault(_List);
  _LegacySDataListMixin2 = _interopRequireDefault(_LegacySDataListMixin2);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('areaCategoryIssueLookup');

  var __class = (0, _declare["default"])('crm.Views.AreaCategoryIssueLookup', [_List["default"], _LegacySDataListMixin2["default"]], {
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
      var theFeed = feed; // assume order is preserved

      if (theFeed) {
        this.createCacheFrom(feed);
      }

      var use = this.cache;

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
      var feedLength = feed.$resources.length;
      this.cache = {};

      for (var i = 0; i < feedLength; i += 1) {
        var entry = feed.$resources[i];
        var area = this.cache[entry.Area] || (this.cache[entry.Area] = {});
        var category = area[entry.Category] || (area[entry.Category] = {});
        category[entry.Issue] = true;
      }
    },
    buildFeedFrom: function buildFeedFrom(segment) {
      var list = [];

      for (var n in segment) {
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

  var _default = __class;
  _exports["default"] = _default;
});