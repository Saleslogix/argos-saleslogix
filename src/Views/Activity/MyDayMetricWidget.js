import MetricWidget from '../MetricWidget';
import declare from 'dojo/_base/declare';
import convert from 'argos/Convert';
import lang from 'dojo/_base/lang';
import when from 'dojo/when';
import Deferred from 'dojo/Deferred';
import MODEL_TYPES from 'argos/Models/Types';
import QueryResults from 'dojo/store/util/QueryResults';

export default declare('crm.Views.Activity.MyDayMetricWidget', [MetricWidget], {
  navToReportView: function navToReportView() {},
  activityType: '',
  _buildQueryOptions: function _buildQueryOptions() {
    return {returnQueryResults: true};
  },
  _buildQueryExpression: function _buildQueryExpression() {
    const metric = this;
    return function map(doc, emit) {
      if (doc.entity.StartDate) {
        const currentDate = moment();
        const startDate = moment(convert.toDateFromString(doc.entity.StartDate));
        startDate.add({
          minutes: startDate.zone(),
        });
        if (startDate.isAfter(currentDate.startOf('day')) && currentDate.isBefore(moment().endOf('day'))) {
          if (doc.entity.Type === metric.activityType) {
            emit(doc);
          }
        }
      }
    };
  },
  _getData: function _getData() {
    const queryOptions = this._buildQueryOptions();
    const queryExpression = this._buildQueryExpression();
    const model = App.ModelManager.getModel('Activity', MODEL_TYPES.OFFLINE);
    const queryResults = model.getEntries(queryExpression, queryOptions);
    when(queryResults, lang.hitch(this, this._onQuerySuccessA, queryResults), lang.hitch(this, this._onQueryError));
  },
  _onQuerySuccessA: function _onQuerySuccessA(results) {
    const def = new Deferred();
    when(results.total, (total) => {
      const metricResults = [{
        name: 'x',
        value: total,
      }];
      def.resolve(metricResults);
    });
    this._onQuerySuccess(QueryResults(def.promise)); // eslint-disable-line
  },
});
