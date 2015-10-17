/**
 * @class crm.Views.MyDayOffline.List
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

export default declare('crm.Views.Activity.MyDayOffline', [OfflineList, MyDayMetricListMixin, MyDayRightDrawerListMixin], {
  id: 'myday_offline_list',

  entityName: 'Activity',
  titleText: 'My Schedule Offline',
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
        'today': {
          label: 'today',
          fn: this.isToday,
        },
        'this-week': {
          label: 'this week',
          fn: this.isThisWeek,
        },
        'yesterday': {
          label: 'yesterday',
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
      const startDate = moment(convert.toDateFromString(entry.StartDate));
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
      const startDate = moment(convert.toDateFromString(entry.StartDate));
      if (startDate.isAfter(weekStartDate.startOf('day')) && startDate.isBefore(weekEndDate.startOf('day'))) {
        return true;
      }
    }
    return false;
  },
  isYesterday: function isYesterDay(entry) {
    if (entry.StartDate) {
      const now = moment();
      const yesterdayStart = now.clone().subtract(1, 'days').startOf('day');
      const yesterdayEnd = yesterdayStart.clone().endOf('day');
      const startDate = moment(convert.toDateFromString(entry.StartDate));
      if (startDate.isAfter(yesterdayStart.startOf('day')) && startDate.isBefore(yesterdayEnd.startOf('day'))) {
        return true;
      }
    }
    return false;
  },
});
