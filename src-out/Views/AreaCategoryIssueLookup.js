define('crm/Views/AreaCategoryIssueLookup', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'argos/_LegacySDataListMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argosList, _argos_LegacySDataListMixin) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _List = _interopRequireDefault(_argosList);

  var _LegacySDataListMixin2 = _interopRequireDefault(_argos_LegacySDataListMixin);

  /**
   * @class crm.Views.AreaCategoryIssueLookup
   *
   *
   * @extends argos.List
   * @mixins argos._LegacySDataListMixin
   *
   */
  var __class = (0, _declare['default'])('crm.Views.AreaCategoryIssueLookup', [_List['default'], _LegacySDataListMixin2['default']], {
    // Templates
    itemTemplate: new Simplate(['<h3>{%: $.$descriptor %}</h3>']),

    // Localization
    titleText: 'Accounts',

    // View Properties
    pageSize: 200,
    expose: false,
    enableSearch: false,
    enablePullToRefresh: false,
    id: 'areacategoryissue_lookup',
    queryOrderBy: 'Area,Category,Issue',
    querySelect: ['Area', 'Category', 'Issue'],
    resourceKind: 'areaCategoryIssues',

    show: function show(options) {
      this.active = options.where;

      options.where = false;

      this.inherited(arguments, [options]);
    },
    requestData: function requestData() {
      if (this.cache) {
        this.processFeed();
      } else {
        this.inherited(arguments);
      }
    },
    processFeed: function processFeed(feed) {
      var theFeed = feed;
      // assume order is preserved
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
            '$key': n,
            '$descriptor': n
          });
        }
      }

      return {
        '$resources': list
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

  _lang['default'].setObject('Mobile.SalesLogix.Views.AreaCategoryIssueLookup', __class);
  module.exports = __class;
});
