/**
 * @class crm.Views.Activity.MyDayOffline
 *
 * @extends argos._ListBase
 * @requires argos._ListBase
 *
 *
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
  _buildQueryExpression: function _buildQueryExpression() {
    const self = this;
    return function queryFn(doc, emit) {
      const filter = self.getCurrentFilter();
      if (filter && filter.fn) {
        const result = filter.fn.apply(self, [doc.entity]);
        if (result) {
          emit(doc.entity.StartDate);
        }
      } else {
        emit(doc.entity.StartDate);
      }
    };
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
