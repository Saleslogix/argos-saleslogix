import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import _MetricListMixin from '../_MetricListMixin';
import MODEL_NAMES from '../../Models/Names';
import MyList from './MyList';
import MyDayOffline from './MyDayOffline';
import getResource from 'argos/I18n';

const resource = getResource('activityMyDay');

/**
 * @class crm.Views.Activity.MyDay
 *
 * @requires argos._ListBase
 * @requires argos.Format
 * @requires argos.Utility
 * @requires argos.Convert
 * @requires argos.ErrorManager
 *
 * @requires crm.Format
 * @requires crm.Environment
 * @requires crm.Views.Activity.List
 * @requires crm.Action
 */
const __class = declare('crm.Views.Activity.MyDay', [MyList, _RightDrawerListMixin, _MetricListMixin], {

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'myday_list',
  resourceKind: 'userActivities',
  modelName: MODEL_NAMES.USERACTIVITY,
  enableSearch: false,
  pageSize: 105,
  queryModelName: 'myday',
  enableOfflineSupport: true,

  _onRefresh: function _onRefresh(options) {
    this.inherited(arguments);
    if (options.resourceKind === 'activities') {
      this.refreshRequired = true;
    }
  },

  show: function show(options) {
    if (!App.onLine) {
      this._showOfflineView(options);
      return;
    }
    this.inherited(arguments);
  },
  _showOfflineView: function _showOfflineView(options) {
    let view = App.getView('myday_offline_list');
    if (!view) {
      view = new MyDayOffline();
      App.registerView(view);
    }

    view = App.getView('myday_offline_list');
    if (view) {
      view.show(options);
    }
  },
  createToolLayout: function createToolLayout() {
    this.inherited(arguments);
    if (this.tools && this.tools.tbar && !this._refreshAdded && !window.App.supportsTouch()) {
      this.tools.tbar.push({
        id: 'refresh',
        cls: 'fa fa-refresh fa-fw fa-lg',
        action: '_refreshClicked',
      });

      this._refreshAdded = true;
    }

    return this.tools;
  },
  _refreshAdded: false,
  _refreshClicked: function _refreshClicked() {
    this.clear();
    this.refreshRequired = true;
    this.refresh();

    // Hook for customizers
    this.onRefreshClicked();
  },
  onRefreshClicked: function onRefreshClicked() {},
  _getCurrentQuery: function _getCurrentQuery(options) {
    const myDayQuery = this._model.getMyDayQuery();
    const optionsQuery = options && options.queryArgs && options.queryArgs.activeFilter;
    return [myDayQuery, optionsQuery].filter((item) => {
      return !!item;
    })
      .join(' and ');
  },
  allowSelection: true,
  enableActions: true,
  hashTagQueriesText: {},
});

lang.setObject('Mobile.SalesLogix.Views.Activity.MyDay', __class);
export default __class;
