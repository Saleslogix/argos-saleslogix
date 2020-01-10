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
import OfflineList from '../Offline/List';
import MyDayMetricListMixin from './MyDayMetricListMixin';
import MyDayRightDrawerListMixin from './MyDayRightDrawerListMixin';
import MODEL_NAMES from '../../Models/Names';
import MODEL_TYPES from 'argos/Models/Types';
import convert from 'argos/Convert';
import getResource from 'argos/I18n';


const resource = getResource('activityMyDayOffline');

export default declare('crm.Views.Activity.MyDayOffline', [OfflineList, MyDayMetricListMixin, MyDayRightDrawerListMixin], {
  id: 'myday_offline_list',

  entityName: 'Activity',
  titleText: resource.titleText,
  modelName: MODEL_NAMES.ACTIVITY,
  _currentFilterName: 'today',
  filters: null,
  _initOfflineView: function _initOfflineView() {
    this.offlineContext = {
      entityName: 'Activity',
      viewId: 'activity_related',
    };
    this.refreshRequired = true;
    this._model = App.ModelManager.getModel(this.offlineContext.entityName, MODEL_TYPES.OFFLINE);
    this._entityView = this.getEntityView();
  },
  getFilters: function getFilters() {
    if (!this.filters) {
      this.filters = {
        today: {
          label: resource.todayFilterLabel,
          fn: this.isToday,
        },
        'this-week': {
          label: resource.thisWeekFilterLabel,
          fn: this.isThisWeek,
        },
        yesterday: {
          label: resource.yesterdayFilterLabel,
          fn: this.isYesterday,
        },
      };
    }
    return this.filters;
  },

  getCurrentFilter: function getCurrentFilter() {
    const filters = this.getFilters();
    return filters[this._currentFilterName];
  },
  setCurrentFilter: function setCurrentFilter(name) {
    this._currentFilterName = name;
  },
  _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
    const self = this;
    queryOptions.filter = (entity) => {
      const filter = self.getCurrentFilter();
      if (filter && filter.fn) {
        const result = filter.fn.apply(self, [entity]);
        if (result) {
          return true;
        }
      } else {
        return true;
      }
    };

    return queryOptions;
  },
  isToday: function isToday(entry) {
    if (entry.StartDate) {
      const currentDate = moment();
      let startDate = moment(convert.toDateFromString(entry.StartDate));
      if (entry.Timeless) {
        startDate = startDate.subtract({
          minutes: startDate.utcOffset(),
        });
      }
      if (startDate.isAfter(currentDate.startOf('day')) && startDate.isBefore(moment().endOf('day'))) {
        return true;
      }
    }
    return false;
  },
  isThisWeek: function isThisWeek(entry) {
    if (entry.StartDate) {
      const now = moment();
      const weekStartDate = now.clone().startOf('week');
      const weekEndDate = weekStartDate.clone().endOf('week');
      let startDate = moment(convert.toDateFromString(entry.StartDate));
      if (entry.Timeless) {
        startDate = startDate.subtract({
          minutes: startDate.utcOffset(),
        });
      }
      if (startDate.isAfter(weekStartDate.startOf('day')) && startDate.isBefore(weekEndDate.endOf('day'))) {
        return true;
      }
    }
    return false;
  },
  isYesterday: function isYesterDay(entry) {
    if (entry.StartDate) {
      const now = moment();
      const yesterday = now.clone().subtract(1, 'days');
      let startDate = moment(convert.toDateFromString(entry.StartDate));
      if (entry.Timeless) {
        startDate = startDate.subtract({
          minutes: startDate.utcOffset(),
        });
      }
      if (startDate.isAfter(yesterday.startOf('day')) && startDate.isBefore(yesterday.endOf('day'))) {
        return true;
      }
    }
    return false;
  },
});
