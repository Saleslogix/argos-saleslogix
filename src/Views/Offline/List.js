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
import Store from 'argos/Store/PouchDB';

export default declare('crm.Views.Offline.List', [_ListBase, _OfflineRightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
  id: 'offline_list',
  idProperty: 'id',
  detailView: 'offline_detail',
  offlineSupport: true,
  enableSearch: false,
  enableActions: true,
  resourceKind: 'offline',

  titleText: 'Recently Viewed',

  OFFLINE_DB_NAME: 'crm-offline',
  metricWidgetCtor: TotalMetricWidget,

  itemTemplate: new Simplate([
    '<h3>{%: $$.getTitle($) %}</h3>',
  ]),
  getTitle: function getTitle(entry) {
    return entry && entry.doc && entry.doc.entity && entry.doc.entity.$descriptor;
  },
  createStore: function createStore() {
    return new Store({
      databaseName: this.OFFLINE_DB_NAME,
    });
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
            emit(doc);
          }
        });
      } else {
        // User has no entity filter preferences (from right drawer)
        emit(doc);
      }
    };
  },
  _hasValidOptions: function _hasValidOptions(options) {
    return options;
  },
  _applyStateToWidgetOptions: function _applyStateToWidgetOptions(widgetOptions) {
    const options = widgetOptions;
    options.OFFLINE_DB_NAME = this.OFFLINE_DB_NAME;
    return options;
  },
  _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
    delete queryOptions.count;
    delete queryOptions.start;
    queryOptions.include_docs = true;
    return queryOptions;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return [];
  },
  getItemIconClass: function getItemIconClass(entry) {
    const {
      entityName,
    } = entry.doc;
    const mapping = this.entityMappings[entityName];
    const {
      iconClass,
    } = mapping;
    let results = '';
    if (iconClass) {
      results = `fa ${iconClass} fa-2x`;
    }
    return results;
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
