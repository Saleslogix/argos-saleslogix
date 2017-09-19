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
        svg: 'refresh',
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

export default __class;
