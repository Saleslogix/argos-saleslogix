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
// import _RightDrawerListMixin from './_RightDrawerListMixin';
// import _MetricListMixin from '../_MetricListMixin';
// import TotalMetricWidget from './TotalMetricWidget';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import MODEL_TYPES from 'argos/Models/Types';
import all from 'dojo/promise/all';

export default declare('crm.Views.RecentlyViewed.List', [_ListBase, _CardLayoutListMixin], {
  id: 'recently_viewed_list',
  idProperty: 'id',
  detailView: 'offline_detail',
  enableSearch: false,
  enableActions: true,
  enableOfflineSupport: true,
  resourceKind: '',
  entityName: 'RecentlyViewd',
  titleText: 'Recently Viewed',

  // metricWidgetCtor: TotalMetricWidget,

  itemTemplate: new Simplate([
    '<h3>{%: $$.getTitle($) %}</h3>',
    '<h4>{%: $$.getOfflineDate($) %}</h4>',
  ]),
  refreshRequiredFor: function refreshRequiredFor() {
    return true;
  },
  getModel: function getModel() {
    const model = App.ModelManager.getModel('RecentlyViewed', MODEL_TYPES.OFFLINE);
    return model;
  },
  getTitle: function getTitle(entry) {
    return entry && entry.description;
  },
  getOfflineDate: function getOfflineDate(entry) {
    if (entry && entry.modifyDate) {
      return format.relativeDate(entry.modifyDate);
    }
    return '';
  },
   _hasValidOptions: function _hasValidOptions(options) {
    return options;
  },
  _applyStateToWidgetOptions: function _applyStateToWidgetOptions(widgetOptions) {
    const options = widgetOptions;
    options.activeEntityFilters = this._model.getActiveEntityFilters();
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
    iconClass = entry.iconClass;
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
      descriptor: entry.description, // keep for backwards compat
      title: entry.description,
      key: entry.entityId,
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
    if (App.onLine && entry && entry.viewId) {
      return entry.viewId;
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
  createToolLayout: function createToolLayout() {
    if (this.tools) {
      return this.tools;
    }
    const tools = this.inherited(arguments);
    if (tools && tools.tbar) {
      tools.tbar.push({
        id: 'clear',
        cls: 'fa fa-eraser fa-fw fa-lg',
        action: 'clearList',
        security: '',
      });
    }
    return tools;
  },
  clearList: function clearList(action, selection) { // eslint-disable-line
    const requests = [];
    if (this.entries) {
      for (const entryId in this.entries) {
        if (this.entries.hasOwnProperty(entryId)) {
          requests.push(this.removeItem(entryId));
        }
      }
    }
    all(requests).then(() => {
      this.clear();
      this.refreshRequired = true;
      this.refresh();
    }, (err) => {
      console.error(err);// eslint-disable-line
    });
  },
  removeItem: function removeItem(entryId) {
    const rvModel = App.ModelManager.getModel('RecentlyViewed', MODEL_TYPES.OFFLINE);
    return rvModel.deleteEntry(entryId);
  },
});
