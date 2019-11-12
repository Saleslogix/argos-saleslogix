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

  /**
   * @class crm.Views.RecentlyViewed.List
   *
   * @extends argos._ListBase
   * @requires argos._ListBase
   *
   *
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9SZWNlbnRseVZpZXdlZC9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiYWNjb3VudFJlc291cmNlIiwiY29udGFjdFJlc291cmNlIiwiYWN0aXZpdHlSZXNvdXJjZSIsImhpc3RvcnlSZXNvdXJjZSIsIm9wcFJlc291cmNlIiwidGlja2V0UmVzb3VyY2UiLCJsZWFkUmVzb3VyY2UiLCJpZCIsImlkUHJvcGVydHkiLCJkZXRhaWxWaWV3IiwiZW5hYmxlU2VhcmNoIiwiZW5hYmxlQWN0aW9ucyIsImVuYWJsZU9mZmxpbmVTdXBwb3J0IiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsInRpdGxlVGV4dCIsIm1ldHJpY1dpZGdldEN0b3IiLCJwYWdlU2l6ZSIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwicmVmcmVzaFJlcXVpcmVkRm9yIiwiZ2V0TW9kZWwiLCJtb2RlbCIsIkFwcCIsIk1vZGVsTWFuYWdlciIsIk9GRkxJTkUiLCJnZXRUaXRsZSIsImVudHJ5IiwiZGVzY3JpcHRpb24iLCJnZXRPZmZsaW5lRGF0ZSIsIm1vZGlmeURhdGUiLCJyZWxhdGl2ZURhdGUiLCJfaGFzVmFsaWRPcHRpb25zIiwib3B0aW9ucyIsIl9hcHBseVN0YXRlVG9XaWRnZXRPcHRpb25zIiwid2lkZ2V0T3B0aW9ucyIsImFjdGl2ZUVudGl0eUZpbHRlcnMiLCJnZXRBY3RpdmVFbnRpdHlGaWx0ZXJzIiwiX2FwcGx5U3RhdGVUb1F1ZXJ5T3B0aW9ucyIsInF1ZXJ5T3B0aW9ucyIsImNvdW50Iiwic3RhcnQiLCJpbmNsdWRlX2RvY3MiLCJkZXNjZW5kaW5nIiwiZmlsdGVycyIsImZpbHRlciIsImVudGl0eSIsInByZWZlcmVuY2VzIiwicmVjZW50bHlWaWV3ZWRFbnRpdHlGaWx0ZXJzIiwic29tZSIsIm5hbWUiLCJjcmVhdGVJbmRpY2F0b3JMYXlvdXQiLCJnZXRJdGVtSWNvbkNsYXNzIiwiaWNvbkNsYXNzIiwibmF2aWdhdGVUb0RldGFpbFZpZXciLCJrZXkiLCJkZXNjcmlwdG9yIiwiYWRkaXRpb25hbE9wdGlvbnMiLCJlbnRyaWVzIiwib25MaW5lIiwibmF2aWdhdGVUb09ubGluZURldGFpbFZpZXciLCJuYXZpZ2F0ZVRvT2ZmbGluZURldGFpbFZpZXciLCJ2aWV3IiwiYXBwIiwiZ2V0VmlldyIsInZpZXdJZCIsInRpdGxlIiwiZW50aXR5SWQiLCJmcm9tQ29udGV4dCIsIm1peGluIiwic2hvdyIsImdldERldGFpbFZpZXciLCJvZmZsaW5lQ29udGV4dCIsInNvdXJjZSIsInJlZ2lzdGVyVmlldyIsIk9iamVjdCIsImtleXMiLCJlbnRpdHlNYXBwaW5ncyIsIm1hcCIsInByZWZzIiwiZW50aXR5UHJlZiIsInByZWYiLCJmIiwiZW5hYmxlZCIsImVudGl0eVRleHQiLCJDb250YWN0IiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJBY2NvdW50IiwiT3Bwb3J0dW5pdHkiLCJUaWNrZXQiLCJMZWFkIiwiQWN0aXZpdHkiLCJIaXN0b3J5IiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsImlzRGlzYWJsZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7Ozs7Ozs7O0FBbUJBLE1BQU1BLFdBQVcsb0JBQVksb0JBQVosQ0FBakI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLGtCQUFrQixvQkFBWSxjQUFaLENBQXhCO0FBQ0EsTUFBTUMsbUJBQW1CLG9CQUFZLGVBQVosQ0FBekI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLGNBQWMsb0JBQVksa0JBQVosQ0FBcEI7QUFDQSxNQUFNQyxpQkFBaUIsb0JBQVksYUFBWixDQUF2QjtBQUNBLE1BQU1DLGVBQWUsb0JBQVksV0FBWixDQUFyQjs7b0JBRWUsdUJBQVEsK0JBQVIsRUFBeUMsK0VBQXpDLEVBQStGO0FBQzVHQyxR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ZUFBU3ZGLGdCQUFnQnNGLHVCQUZmO0FBR1ZFLG1CQUFhcEYsWUFBWWtGLHVCQUhmO0FBSVZHLGNBQVFwRixlQUFlaUYsdUJBSmI7QUFLVkksWUFBTXBGLGFBQWFnRix1QkFMVDtBQU1WSyxnQkFBVXpGLGlCQUFpQm9GLHVCQU5qQjtBQU9WTSxlQUFTekYsZ0JBQWdCbUY7QUFQZixLQTlJZ0c7QUF1SjVHVCxvQkFBZ0I7QUFDZFEsZUFBUztBQUNQaEMsbUJBQVc7QUFESixPQURLO0FBSWRrQyxlQUFTO0FBQ1BsQyxtQkFBVztBQURKLE9BSks7QUFPZG1DLG1CQUFhO0FBQ1huQyxtQkFBVztBQURBLE9BUEM7QUFVZG9DLGNBQVE7QUFDTnBDLG1CQUFXO0FBREwsT0FWTTtBQWFkcUMsWUFBTTtBQUNKckMsbUJBQVc7QUFEUCxPQWJRO0FBZ0Jkc0MsZ0JBQVU7QUFDUnRDLG1CQUFXO0FBREgsT0FoQkk7QUFtQmR1QyxlQUFTO0FBQ1B2QyxtQkFBVztBQURKO0FBbkJLLEtBdko0RjtBQThLNUd3QyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFDNUMsYUFBTyxLQUFLQyxLQUFMLEtBQWUsS0FBS0EsS0FBTCxHQUFhO0FBQ2pDQyxjQUFNO0FBRDJCLE9BQTVCLENBQVA7QUFHRCxLQWxMMkc7QUFtTDVHQyxnQkFBWSxTQUFTQSxVQUFULEdBQXNCO0FBQ2hDLGFBQU8sQ0FBQ3pFLElBQUlYLG9CQUFaO0FBQ0Q7QUFyTDJHLEdBQS9GLEMiLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlJlY2VudGx5Vmlld2VkLkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuX0xpc3RCYXNlXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5fTGlzdEJhc2VcclxuICpcclxuICpcclxuICovXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBfTGlzdEJhc2UgZnJvbSAnYXJnb3MvX0xpc3RCYXNlJztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICcuL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJy4uL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgVG90YWxNZXRyaWNXaWRnZXQgZnJvbSAnLi9Ub3RhbE1ldHJpY1dpZGdldCc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBPZmZsaW5lRGV0YWlsIGZyb20gJy4uL09mZmxpbmUvRGV0YWlsJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncmVjZW50bHlWaWV3ZWRMaXN0Jyk7XHJcbmNvbnN0IGFjY291bnRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY2NvdW50TW9kZWwnKTtcclxuY29uc3QgY29udGFjdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NvbnRhY3RNb2RlbCcpO1xyXG5jb25zdCBhY3Rpdml0eVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjdGl2aXR5TW9kZWwnKTtcclxuY29uc3QgaGlzdG9yeVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2hpc3RvcnlNb2RlbCcpO1xyXG5jb25zdCBvcHBSZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eU1vZGVsJyk7XHJcbmNvbnN0IHRpY2tldFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3RpY2tldE1vZGVsJyk7XHJcbmNvbnN0IGxlYWRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdsZWFkTW9kZWwnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlY2xhcmUoJ2NybS5WaWV3cy5SZWNlbnRseVZpZXdlZC5MaXN0JywgW19MaXN0QmFzZSwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluXSwge1xyXG4gIGlkOiAncmVjZW50bHlfdmlld2VkX2xpc3QnLFxyXG4gIGlkUHJvcGVydHk6ICdpZCcsXHJcbiAgZGV0YWlsVmlldzogJ29mZmxpbmVfZGV0YWlsJyxcclxuICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgZW5hYmxlT2ZmbGluZVN1cHBvcnQ6IHRydWUsXHJcbiAgcmVzb3VyY2VLaW5kOiAnb2ZmbGluZScsXHJcbiAgZW50aXR5TmFtZTogJ1JlY2VudGx5Vmlld2VkJyxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBtZXRyaWNXaWRnZXRDdG9yOiBUb3RhbE1ldHJpY1dpZGdldCxcclxuICBwYWdlU2l6ZTogMTAwMCxcclxuXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkJC5nZXRPZmZsaW5lRGF0ZSgkKSAlfTwvcD4nLFxyXG4gIF0pLFxyXG4gIHJlZnJlc2hSZXF1aXJlZEZvcjogZnVuY3Rpb24gcmVmcmVzaFJlcXVpcmVkRm9yKCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBnZXRNb2RlbDogZnVuY3Rpb24gZ2V0TW9kZWwoKSB7XHJcbiAgICBjb25zdCBtb2RlbCA9IEFwcC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoJ1JlY2VudGx5Vmlld2VkJywgTU9ERUxfVFlQRVMuT0ZGTElORSk7XHJcbiAgICByZXR1cm4gbW9kZWw7XHJcbiAgfSxcclxuICBnZXRUaXRsZTogZnVuY3Rpb24gZ2V0VGl0bGUoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS5kZXNjcmlwdGlvbjtcclxuICB9LFxyXG4gIGdldE9mZmxpbmVEYXRlOiBmdW5jdGlvbiBnZXRPZmZsaW5lRGF0ZShlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5Lm1vZGlmeURhdGUpIHtcclxuICAgICAgcmV0dXJuIGZvcm1hdC5yZWxhdGl2ZURhdGUoZW50cnkubW9kaWZ5RGF0ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxuICBfaGFzVmFsaWRPcHRpb25zOiBmdW5jdGlvbiBfaGFzVmFsaWRPcHRpb25zKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH0sXHJcbiAgX2FwcGx5U3RhdGVUb1dpZGdldE9wdGlvbnM6IGZ1bmN0aW9uIF9hcHBseVN0YXRlVG9XaWRnZXRPcHRpb25zKHdpZGdldE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB3aWRnZXRPcHRpb25zO1xyXG4gICAgb3B0aW9ucy5hY3RpdmVFbnRpdHlGaWx0ZXJzID0gdGhpcy5nZXRBY3RpdmVFbnRpdHlGaWx0ZXJzKCk7XHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9LFxyXG4gIF9hcHBseVN0YXRlVG9RdWVyeU9wdGlvbnM6IGZ1bmN0aW9uIF9hcHBseVN0YXRlVG9RdWVyeU9wdGlvbnMocXVlcnlPcHRpb25zKSB7XHJcbiAgICBkZWxldGUgcXVlcnlPcHRpb25zLmNvdW50O1xyXG4gICAgZGVsZXRlIHF1ZXJ5T3B0aW9ucy5zdGFydDtcclxuICAgIHF1ZXJ5T3B0aW9ucy5pbmNsdWRlX2RvY3MgPSB0cnVlO1xyXG4gICAgcXVlcnlPcHRpb25zLmRlc2NlbmRpbmcgPSB0cnVlO1xyXG4gICAgY29uc3QgZmlsdGVycyA9IHRoaXMuZ2V0QWN0aXZlRW50aXR5RmlsdGVycygpO1xyXG4gICAgcXVlcnlPcHRpb25zLmZpbHRlciA9IChlbnRpdHkpID0+IHtcclxuICAgICAgLy8gSWYgdGhlIHVzZXIgaGFzIGVudGl0eSBmaWx0ZXJzIHN0b3JlZCBpbiBwcmVmZXJlbmNlcywgZmlsdGVyIGJhc2VkIG9uIHRoYXRcclxuICAgICAgaWYgKEFwcC5wcmVmZXJlbmNlcyAmJiBBcHAucHJlZmVyZW5jZXMucmVjZW50bHlWaWV3ZWRFbnRpdHlGaWx0ZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlcnMuc29tZShmaWx0ZXIgPT4gZW50aXR5LmVudGl0eU5hbWUgPT09IGZpbHRlci5uYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHF1ZXJ5T3B0aW9ucztcclxuICB9LFxyXG4gIGNyZWF0ZUluZGljYXRvckxheW91dDogZnVuY3Rpb24gY3JlYXRlSW5kaWNhdG9yTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUljb25DbGFzczogZnVuY3Rpb24gZ2V0SXRlbUljb25DbGFzcyhlbnRyeSkge1xyXG4gICAgbGV0IGljb25DbGFzcztcclxuICAgIGljb25DbGFzcyA9IGVudHJ5Lmljb25DbGFzcztcclxuICAgIGlmICghaWNvbkNsYXNzKSB7XHJcbiAgICAgIGljb25DbGFzcyA9ICd1cmwnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGljb25DbGFzcztcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9EZXRhaWxWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvRGV0YWlsVmlldyhrZXksIGRlc2NyaXB0b3IsIGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllcyAmJiB0aGlzLmVudHJpZXNba2V5XTtcclxuICAgIGlmIChBcHAub25MaW5lKSB7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUb09ubGluZURldGFpbFZpZXcoZW50cnksIGFkZGl0aW9uYWxPcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUb09mZmxpbmVEZXRhaWxWaWV3KGVudHJ5LCBhZGRpdGlvbmFsT3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvT25saW5lRGV0YWlsVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0RldGFpbFZpZXcoZW50cnksIGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5hcHAuZ2V0VmlldyhlbnRyeS52aWV3SWQpO1xyXG5cclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICBkZXNjcmlwdG9yOiBlbnRyeS5kZXNjcmlwdGlvbiwgLy8ga2VlcCBmb3IgYmFja3dhcmRzIGNvbXBhdFxyXG4gICAgICB0aXRsZTogZW50cnkuZGVzY3JpcHRpb24sXHJcbiAgICAgIGtleTogZW50cnkuZW50aXR5SWQsXHJcbiAgICAgIGZyb21Db250ZXh0OiB0aGlzLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoYWRkaXRpb25hbE9wdGlvbnMpIHtcclxuICAgICAgb3B0aW9ucyA9IGxhbmcubWl4aW4ob3B0aW9ucywgYWRkaXRpb25hbE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG5hdmlnYXRlVG9PZmZsaW5lRGV0YWlsVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb09mZmxpbmVEZXRhaWxWaWV3KGVudHJ5LCBhZGRpdGlvbmFsT3B0aW9ucykge1xyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0RGV0YWlsVmlldyhlbnRyeS5lbnRpdHlOYW1lKTtcclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICBkZXNjcmlwdG9yOiBlbnRyeS5kZXNjcmlwdGlvbiwgLy8ga2VlcCBmb3IgYmFja3dhcmRzIGNvbXBhdFxyXG4gICAgICB0aXRsZTogZW50cnkuZGVzY3JpcHRpb24sXHJcbiAgICAgIGtleTogZW50cnkuZW50aXR5SWQsXHJcbiAgICAgIGZyb21Db250ZXh0OiB0aGlzLFxyXG4gICAgICBvZmZsaW5lQ29udGV4dDoge1xyXG4gICAgICAgIGVudGl0eUlkOiBlbnRyeS5lbnRpdHlJZCxcclxuICAgICAgICBlbnRpdHlOYW1lOiBlbnRyeS5lbnRpdHlOYW1lLFxyXG4gICAgICAgIHZpZXdJZDogZW50cnkudmlld0lkLFxyXG4gICAgICAgIHNvdXJjZTogZW50cnksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgaWYgKGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICAgIG9wdGlvbnMgPSBsYW5nLm1peGluKG9wdGlvbnMsIGFkZGl0aW9uYWxPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXREZXRhaWxWaWV3OiBmdW5jdGlvbiBnZXREZXRhaWxWaWV3KGVudGl0eU5hbWUpIHtcclxuICAgIGNvbnN0IHZpZXdJZCA9IGAke3RoaXMuZGV0YWlsVmlld31fJHtlbnRpdHlOYW1lfWA7XHJcbiAgICBsZXQgdmlldyA9IHRoaXMuYXBwLmdldFZpZXcodmlld0lkKTtcclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcC5yZWdpc3RlclZpZXcobmV3IE9mZmxpbmVEZXRhaWwoeyBpZDogdmlld0lkIH0pKTtcclxuXHJcbiAgICB2aWV3ID0gdGhpcy5hcHAuZ2V0Vmlldyh2aWV3SWQpO1xyXG5cclxuICAgIHJldHVybiB2aWV3O1xyXG4gIH0sXHJcbiAgZ2V0QWN0aXZlRW50aXR5RmlsdGVyczogZnVuY3Rpb24gZ2V0QWN0aXZlRW50aXR5RmlsdGVycygpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmVudGl0eU1hcHBpbmdzKVxyXG4gICAgICAubWFwKChlbnRpdHlOYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJlZnMgPSBBcHAucHJlZmVyZW5jZXMgJiYgQXBwLnByZWZlcmVuY2VzLnJlY2VudGx5Vmlld2VkRW50aXR5RmlsdGVycyB8fCBbXTtcclxuICAgICAgICBjb25zdCBlbnRpdHlQcmVmID0gcHJlZnMuZmlsdGVyKChwcmVmKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcHJlZi5uYW1lID09PSBlbnRpdHlOYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlbnRpdHlQcmVmWzBdO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmlsdGVyKGYgPT4gZiAmJiBmLmVuYWJsZWQpO1xyXG4gIH0sXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGVudGl0eVRleHQ6IHtcclxuICAgIENvbnRhY3Q6IGNvbnRhY3RSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgIEFjY291bnQ6IGFjY291bnRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgIE9wcG9ydHVuaXR5OiBvcHBSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgIFRpY2tldDogdGlja2V0UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICBMZWFkOiBsZWFkUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICBBY3Rpdml0eTogYWN0aXZpdHlSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgIEhpc3Rvcnk6IGhpc3RvcnlSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICB9LFxyXG4gIGVudGl0eU1hcHBpbmdzOiB7XHJcbiAgICBDb250YWN0OiB7XHJcbiAgICAgIGljb25DbGFzczogJ3VzZXInLFxyXG4gICAgfSxcclxuICAgIEFjY291bnQ6IHtcclxuICAgICAgaWNvbkNsYXNzOiAnc3ByZWFkc2hlZXQnLFxyXG4gICAgfSxcclxuICAgIE9wcG9ydHVuaXR5OiB7XHJcbiAgICAgIGljb25DbGFzczogJ2ZpbmFuY2UnLFxyXG4gICAgfSxcclxuICAgIFRpY2tldDoge1xyXG4gICAgICBpY29uQ2xhc3M6ICdleHBlbnNlLXJlcG9ydCcsXHJcbiAgICB9LFxyXG4gICAgTGVhZDoge1xyXG4gICAgICBpY29uQ2xhc3M6ICdhZ2VudCcsXHJcbiAgICB9LFxyXG4gICAgQWN0aXZpdHk6IHtcclxuICAgICAgaWNvbkNsYXNzOiAnY2FsZW5kYXInLFxyXG4gICAgfSxcclxuICAgIEhpc3Rvcnk6IHtcclxuICAgICAgaWNvbkNsYXNzOiAnc2VhcmNoLXJlc3VsdHMtaGlzdG9yeScsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbXSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaXNEaXNhYmxlZDogZnVuY3Rpb24gaXNEaXNhYmxlZCgpIHtcclxuICAgIHJldHVybiAhQXBwLmVuYWJsZU9mZmxpbmVTdXBwb3J0O1xyXG4gIH0sXHJcbn0pO1xyXG4iXX0=