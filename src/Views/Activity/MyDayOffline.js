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
// import lang from 'dojo/_base/lang';
// import format from '../../Format';
// import MODEL_TYPES from 'argos/Models/Types';
// import all from 'dojo/promise/all';
// import OfflineDetail from '../Offline/Detail';
import MODEL_NAMES from '../../Models/Names';
import MODEL_TYPES from 'argos/Models/Types';
import convert from 'argos/Convert';

export default declare('crm.Views.Activity.MyDayOffline', [OfflineList, MyDayMetricListMixin, MyDayRightDrawerListMixin], {
  id: 'myday_offline_list',

  entityName: 'Activity',
  titleText: 'My Schedule Offline',
  modelName: MODEL_NAMES.ACTIVITY,
  _initOfflineView: function _initOfflineView() {
    this.offlineContext = {
      entityName: 'Activity',
      viewId: 'activity_related',
    };
    this.refreshRequired = true;
    this._model = App.ModelManager.getModel(this.offlineContext.entityName, MODEL_TYPES.OFFLINE);
    this._entityView = this.getEntityView();
  },
  _buildQueryExpression: function _buildQueryExpression() {
    return function queryFn(doc, emit) {
      if (doc.entity.StartDate) {
        const currentDate = moment();
        const startDate = moment(convert.toDateFromString(doc.entity.StartDate));
        startDate.add({
          minutes: startDate.zone(),
        });
        if (startDate.isAfter(currentDate.startOf('day')) && currentDate.isBefore(moment().endOf('day'))) {
          emit(doc.entity.StartDate);
        }
      }
    };
  },
});
