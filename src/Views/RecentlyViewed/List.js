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
import _ListBase from 'argos/_ListBase';
import _RightDrawerListMixin from './_RightDrawerListMixin';
import _MetricListMixin from '../_MetricListMixin';
import TotalMetricWidget from './TotalMetricWidget';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import MODEL_TYPES from 'argos/Models/Types';
import OfflineDetail from '../Offline/Detail';
import getResource from 'argos/I18n';

const resource = getResource('recentlyViewedList');
const accountResource = getResource('accountModel');
const contactResource = getResource('contactModel');
const activityResource = getResource('activityModel');
const historyResource = getResource('historyModel');
const oppResource = getResource('opportunityModel');
const ticketResource = getResource('ticketModel');
const leadResource = getResource('leadModel');

export default declare('crm.Views.RecentlyViewed.List', [_ListBase, _RightDrawerListMixin, _MetricListMixin], {
  id: 'recently_viewed_list',
  idProperty: 'id',
  detailView: 'offline_detail',
  enableSearch: false,
  enableActions: true,
  enableOfflineSupport: true,
  resourceKind: 'offline',
  entityName: 'RecentlyViewed',
  titleText: resource.titleText,
  metricWidgetCtor: TotalMetricWidget,
  pageSize: 1000,

  itemTemplate: new Simplate([
    '<p class="micro-text">{%: $$.getOfflineDate($) %}</p>',
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
    options.activeEntityFilters = this.getActiveEntityFilters();
    return options;
  },
  _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
    delete queryOptions.count;
    delete queryOptions.start;
    queryOptions.include_docs = true;
    queryOptions.descending = true;
    const filters = this.getActiveEntityFilters();
    queryOptions.filter = (entity) => {
      // If the user has entity filters stored in preferences, filter based on that
      if (App.preferences && App.preferences.recentlyViewedEntityFilters) {
        return filters.some(filter => entity.entityName === filter.name);
      }

      return true;
    };
    return queryOptions;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return [];
  },
  getItemIconClass: function getItemIconClass(entry) {
    let iconClass;
    iconClass = entry.iconClass;
    if (!iconClass) {
      iconClass = 'url';
    }
    return iconClass;
  },
  navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
    const entry = this.entries && this.entries[key];
    if (App.onLine) {
      this.navigateToOnlineDetailView(entry, additionalOptions);
    } else {
      this.navigateToOfflineDetailView(entry, additionalOptions);
    }
  },
  navigateToOnlineDetailView: function navigateToDetailView(entry, additionalOptions) {
    const view = this.app.getView(entry.viewId);

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
  navigateToOfflineDetailView: function navigateToOfflineDetailView(entry, additionalOptions) {
    const view = this.getDetailView(entry.entityName);
    let options = {
      descriptor: entry.description, // keep for backwards compat
      title: entry.description,
      key: entry.entityId,
      fromContext: this,
      offlineContext: {
        entityId: entry.entityId,
        entityName: entry.entityName,
        viewId: entry.viewId,
        source: entry,
      },
    };
    if (additionalOptions) {
      options = lang.mixin(options, additionalOptions);
    }

    if (view) {
      view.show(options);
    }
  },
  getDetailView: function getDetailView(entityName) {
    const viewId = `${this.detailView}_${entityName}`;
    let view = this.app.getView(viewId);

    if (view) {
      return view;
    }

    this.app.registerView(new OfflineDetail({ id: viewId }));

    view = this.app.getView(viewId);

    return view;
  },
  getActiveEntityFilters: function getActiveEntityFilters() {
    return Object.keys(this.entityMappings)
      .map((entityName) => {
        const prefs = App.preferences && App.preferences.recentlyViewedEntityFilters || [];
        const entityPref = prefs.filter((pref) => {
          return pref.name === entityName;
        });
        return entityPref[0];
      })
      .filter(f => f && f.enabled);
  },

  // Localization
  entityText: {
    Contact: contactResource.entityDisplayNamePlural,
    Account: accountResource.entityDisplayNamePlural,
    Opportunity: oppResource.entityDisplayNamePlural,
    Ticket: ticketResource.entityDisplayNamePlural,
    Lead: leadResource.entityDisplayNamePlural,
    Activity: activityResource.entityDisplayNamePlural,
    History: historyResource.entityDisplayNamePlural,
  },
  entityMappings: {
    Contact: {
      iconClass: 'user',
    },
    Account: {
      iconClass: 'spreadsheet',
    },
    Opportunity: {
      iconClass: 'finance',
    },
    Ticket: {
      iconClass: 'expense-report',
    },
    Lead: {
      iconClass: 'agent',
    },
    Activity: {
      iconClass: 'calendar',
    },
    History: {
      iconClass: 'search-results-history',
    },
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
  isDisabled: function isDisabled() {
    return !App.enableOfflineSupport;
  },
});
