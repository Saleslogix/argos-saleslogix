/**
 * @class crm.Views.Offline.List
 *
 * @extends argos._ListBase
 * @requires argos._ListBase
 *
 *
 */
import declare from 'dojo/_base/declare';
import _ListBase from 'argos/_ListBase';
import _CardLayoutListMixin from '../_CardLayoutListMixin';
import _OfflineRightDrawerListMixin from './_OfflineRightDrawerListMixin';
import _MetricListMixin from '../_MetricListMixin';
import TotalMetricWidget from './TotalMetricWidget';
import OfflineManager from 'argos/Offline/Manager';
import lang from 'dojo/_base/lang';
import format from '../../Format';

export default declare('crm.Views.RecentlyViewed.List', [_ListBase, _OfflineRightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
  id: 'recently_viewed_list',
  idProperty: 'id',
  detailView: 'RecentlyViewed_detail',
  enableSearch: false,
  enableActions: true,
  enableOfflineSupport: true,
  resourceKind: '',
  entityName: 'RecentlyViewd',
  titleText: 'xRecently Viewed',

  metricWidgetCtor: TotalMetricWidget,

  itemTemplate: new Simplate([
    '<h3>{%: $$.getTitle($) %}</h3>',
    '<h4>{%: $$.getOfflineDate($) %}</h4>',
  ]),
  getTitle: function getTitle(entry) {
    return entry && entry.doc && entry.doc.entity && entry.doc.description;
  },
  getOfflineDate: function getOfflineDate(entry) {
    if (entry && entry.doc && entry.doc.entity && entry.doc.modifyDate) {
      return format.relativeDate(entry.doc.modifyDate);
    }
    return '';
  },
  xcreateStore: function createStore() {
    return OfflineManager.getStore();
  },
  getActiveEntityFilters: function getActiveEntityFilters() {
    return Object.keys(this.entityMappings)
      .map((entityName) => {
        const prefs = App.preferences && App.preferences.offlineEntityFilters || [];
        const entityPref = prefs.filter((pref) => {
          return pref.name === entityName;
        });
        return entityPref[0];
      })
      .filter((f) => f && f.enabled);
  },
  _buildQueryExpression: function _buildQueryExpression() {
    const filters = this.getActiveEntityFilters();
    return function queryFn(doc, emit) {
      // If the user has entity filters stored in preferences, filter based on that
      if (App.preferences && App.preferences.offlineEntityFilters) {
        filters.forEach((f) => {
          if (doc.entityName === f.name) {
            emit(doc.modifyDate);
          }
        });
      } else {
        // User has no entity filter preferences (from right drawer)
        emit(doc.modifyDate);
      }
    };
  },
  _hasValidOptions: function _hasValidOptions(options) {
    return options;
  },
  _applyStateToWidgetOptions: function _applyStateToWidgetOptions(widgetOptions) {
    const options = widgetOptions;
    options.activeEntityFilters = this.getActiveEntityFilters();
    return options;
  },
  _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
    delete queryOptions.count;
    delete queryOptions.start;
    queryOptions.include_docs = true;
    queryOptions.descending = true;
    return queryOptions;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return [];
  },
  getItemIconClass: function getItemIconClass(entry) {
    let iconClass;
    iconClass = entry.doc.iconClass;
    if (!iconClass) {
      iconClass = 'fa fa-cloud fa-2x';
    }
    return iconClass;
  },
  navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
    const entry = this.entries && this.entries[key];
    const detailViewId = this.getDetailViewId(entry);
    const view = this.app.getView(detailViewId);

    let options = {
      descriptor: entry.doc.description, // keep for backwards compat
      title: entry.doc.description,
      key: key,
      fromContext: this,
    };

    if (additionalOptions) {
      options = lang.mixin(options, additionalOptions);
    }

    if (view) {
      view.show(options);
    }
  },
  getDetailViewId: function getDetailViewId(entry) {
    if (App.onLine && entry && entry.doc && entry.doc.viewId) {
      return entry.doc.viewId;
    }
    return this.detailView;
  },
  // Localization
  entityText: {
    'Contact': 'Contacts',
    'Account': 'Accounts',
    'Opportunity': 'Opportunities',
    'Ticket': 'Tickets',
    'Lead': 'Leads',
    'Activity': 'Activities',
    'History': 'History',
  },
  entityMappings: {
    'Contact': {
      iconClass: 'fa-user',
    },
    'Account': {
      iconClass: 'fa-building-o',
    },
    'Opportunity': {
      iconClass: 'fa-money',
    },
    'Ticket': {
      iconClass: 'fa-clipboard',
    },
    'Lead': {
      iconClass: 'fa-filter',
    },
    'Activity': {
      iconClass: 'fa-calendar-o',
    },
    'History': {
      iconClass: 'fa-history',
    },
  },
});
