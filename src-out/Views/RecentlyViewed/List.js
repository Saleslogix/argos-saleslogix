define('crm/Views/RecentlyViewed/List', ['module', 'exports', 'dojo/_base/declare', 'argos/_ListBase', './_RightDrawerListMixin', '../_MetricListMixin', './TotalMetricWidget', 'dojo/_base/lang', '../../Format', 'argos/Models/Types', '../Offline/Detail', 'argos/I18n'], function (module, exports, _declare, _ListBase2, _RightDrawerListMixin2, _MetricListMixin2, _TotalMetricWidget, _lang, _Format, _Types, _Detail, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ListBase3 = _interopRequireDefault(_ListBase2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _TotalMetricWidget2 = _interopRequireDefault(_TotalMetricWidget);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Types2 = _interopRequireDefault(_Types);

  var _Detail2 = _interopRequireDefault(_Detail);

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

  var resource = (0, _I18n2.default)('recentlyViewedList');
  var accountResource = (0, _I18n2.default)('accountModel');
  var contactResource = (0, _I18n2.default)('contactModel');
  var activityResource = (0, _I18n2.default)('activityModel');
  var historyResource = (0, _I18n2.default)('historyModel');
  var oppResource = (0, _I18n2.default)('opportunityModel');
  var ticketResource = (0, _I18n2.default)('ticketModel');
  var leadResource = (0, _I18n2.default)('leadModel');

  exports.default = (0, _declare2.default)('crm.Views.RecentlyViewed.List', [_ListBase3.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], {
    id: 'recently_viewed_list',
    idProperty: 'id',
    detailView: 'offline_detail',
    enableSearch: false,
    enableActions: true,
    enableOfflineSupport: true,
    resourceKind: 'offline',
    entityName: 'RecentlyViewed',
    titleText: resource.titleText,
    metricWidgetCtor: _TotalMetricWidget2.default,
    pageSize: 1000,

    itemTemplate: new Simplate(['<p class="micro-text">{%: $$.getOfflineDate($) %}</p>']),
    refreshRequiredFor: function refreshRequiredFor() {
      return true;
    },
    getModel: function getModel() {
      var model = App.ModelManager.getModel('RecentlyViewed', _Types2.default.OFFLINE);
      return model;
    },
    getTitle: function getTitle(entry) {
      return entry && entry.description;
    },
    getOfflineDate: function getOfflineDate(entry) {
      if (entry && entry.modifyDate) {
        return _Format2.default.relativeDate(entry.modifyDate);
      }
      return '';
    },
    _hasValidOptions: function _hasValidOptions(options) {
      return options;
    },
    _applyStateToWidgetOptions: function _applyStateToWidgetOptions(widgetOptions) {
      var options = widgetOptions;
      options.activeEntityFilters = this.getActiveEntityFilters();
      return options;
    },
    _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
      delete queryOptions.count;
      delete queryOptions.start;
      queryOptions.include_docs = true;
      queryOptions.descending = true;
      var filters = this.getActiveEntityFilters();
      queryOptions.filter = function (entity) {
        // If the user has entity filters stored in preferences, filter based on that
        if (App.preferences && App.preferences.recentlyViewedEntityFilters) {
          return filters.some(function (filter) {
            return entity.entityName === filter.name;
          });
        }

        return true;
      };
      return queryOptions;
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return [];
    },
    getItemIconClass: function getItemIconClass(entry) {
      var iconClass = void 0;
      iconClass = entry.iconClass;
      if (!iconClass) {
        iconClass = 'url';
      }
      return iconClass;
    },
    navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
      var entry = this.entries && this.entries[key];
      if (App.onLine) {
        this.navigateToOnlineDetailView(entry, additionalOptions);
      } else {
        this.navigateToOfflineDetailView(entry, additionalOptions);
      }
    },
    navigateToOnlineDetailView: function navigateToDetailView(entry, additionalOptions) {
      var view = this.app.getView(entry.viewId);

      var options = {
        descriptor: entry.description, // keep for backwards compat
        title: entry.description,
        key: entry.entityId,
        fromContext: this
      };

      if (additionalOptions) {
        options = _lang2.default.mixin(options, additionalOptions);
      }

      if (view) {
        view.show(options);
      }
    },
    navigateToOfflineDetailView: function navigateToOfflineDetailView(entry, additionalOptions) {
      var view = this.getDetailView(entry.entityName);
      var options = {
        descriptor: entry.description, // keep for backwards compat
        title: entry.description,
        key: entry.entityId,
        fromContext: this,
        offlineContext: {
          entityId: entry.entityId,
          entityName: entry.entityName,
          viewId: entry.viewId,
          source: entry
        }
      };
      if (additionalOptions) {
        options = _lang2.default.mixin(options, additionalOptions);
      }

      if (view) {
        view.show(options);
      }
    },
    getDetailView: function getDetailView(entityName) {
      var viewId = this.detailView + '_' + entityName;
      var view = this.app.getView(viewId);

      if (view) {
        return view;
      }

      this.app.registerView(new _Detail2.default({ id: viewId }));

      view = this.app.getView(viewId);

      return view;
    },
    getActiveEntityFilters: function getActiveEntityFilters() {
      return Object.keys(this.entityMappings).map(function (entityName) {
        var prefs = App.preferences && App.preferences.recentlyViewedEntityFilters || [];
        var entityPref = prefs.filter(function (pref) {
          return pref.name === entityName;
        });
        return entityPref[0];
      }).filter(function (f) {
        return f && f.enabled;
      });
    },

    // Localization
    entityText: {
      Contact: contactResource.entityDisplayNamePlural,
      Account: accountResource.entityDisplayNamePlural,
      Opportunity: oppResource.entityDisplayNamePlural,
      Ticket: ticketResource.entityDisplayNamePlural,
      Lead: leadResource.entityDisplayNamePlural,
      Activity: activityResource.entityDisplayNamePlural,
      History: historyResource.entityDisplayNamePlural
    },
    entityMappings: {
      Contact: {
        iconClass: 'user'
      },
      Account: {
        iconClass: 'spreadsheet'
      },
      Opportunity: {
        iconClass: 'finance'
      },
      Ticket: {
        iconClass: 'expense-report'
      },
      Lead: {
        iconClass: 'agent'
      },
      Activity: {
        iconClass: 'calendar'
      },
      History: {
        iconClass: 'search-results-history'
      }
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    },
    isDisabled: function isDisabled() {
      return !App.enableOfflineSupport;
    }
  });
  module.exports = exports['default'];
});