import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
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

lang.setObject('Mobile.SalesLogix.Views.AreaCategoryIssueLookup', __class);
export default __class;
