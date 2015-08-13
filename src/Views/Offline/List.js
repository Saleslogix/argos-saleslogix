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
import Store from 'argos/Store/PouchDB';

export default declare('crm.Views.Offline.List', [_ListBase, _CardLayoutListMixin, _OfflineRightDrawerListMixin], {
  id: 'offline_list',
  idProperty: 'id',
  detailView: 'offline_detail',
  offlineSupport: true,
  enableSearch: false,
  enableActions: true,

  titleText: 'Recently Viewed',

  OFFLINE_DB_NAME: 'crm-offline',

  itemTemplate: new Simplate([
    '<h3>{%: $$.getTitle($) %}</h3>',
  ]),

  getTitle: function getTitle(entry) {
    return entry && entry.doc && entry.doc.entity && entry.doc.entity.$descriptor;
  },

  // TODO: Move to a mixin
  createStore: function createStore() {
    return new Store({
      databaseName: this.OFFLINE_DB_NAME,
    });
  },
  _buildQueryExpression: function _buildQueryExpression() {
    return function queryFn(doc, emit) {
      emit(doc);
    };
  },
  _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
    queryOptions.include_docs = true;
    return queryOptions;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return [];
  },
  getItemIconClass: function getItemIconClass(entry) {
    const {entityName} = entry.doc;
    const mapping = this.entityMappings[entityName];
    const {iconClass} = mapping;
    let results = '';
    if (iconClass) {
      results = `fa ${iconClass} fa-2x`;
    }
    return results;
  },
  activateEntityFilter: function activateEntityFilter(entityName) {
    // TODO: Filter and refresh the view.
    return entityName;
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
