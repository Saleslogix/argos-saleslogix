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

const resource = getResource('areaCategoryIssueLookup');

/**
 * @class crm.Views.AreaCategoryIssueLookup
 *
 *
 * @extends argos.List
 * @mixins argos._LegacySDataListMixin
 *
 */
const __class = declare('crm.Views.AreaCategoryIssueLookup', [List, _LegacySDataListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.$descriptor %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  pageSize: 200,
  expose: false,
  enableSearch: false,
  enablePullToRefresh: false,
  id: 'areacategoryissue_lookup',
  queryOrderBy: 'Area,Category,Issue',
  querySelect: [
    'Area',
    'Category',
    'Issue',
  ],
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
      this.inherited(arguments);
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
          $descriptor: n,
        });
      }
    }

    return {
      $resources: list,
    };
  },
  hasMoreData: function hasMoreData() {
    return false; // todo: implement paging?
  },
  refreshRequiredFor: function refreshRequiredFor() {
    return true; // todo: implement refresh detection?
  },
  formatSearchQuery: function formatSearchQuery() {
  },
});

export default __class;
