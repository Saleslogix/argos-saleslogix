import MetricWidget from '../MetricWidget';
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import when from 'dojo/when';
import Deferred from 'dojo/Deferred';
import MODEL_TYPES from 'argos/Models/Types';
import QueryResults from 'dojo/store/util/QueryResults';

export default declare('crm.Views.Activity.MyDayMetricWidget', [MetricWidget], {
  navToReportView: function navToReportView() {},
  activityType: '',
  _buildQueryOptions: function _buildQueryOptions() {
    return { returnQueryResults: true };
  },
  _buildQueryExpression: function _buildQueryExpression() {
    const self = this;
    return function map(doc, emit) {
      if (doc.entity.Type === self.activityType) {
        if (self.parent) {
          const filter = self.parent.getCurrentFilter();
          if (filter && filter.fn) {
            const result = filter.fn.apply(self.parent, [doc.entity]);
            if (result) {
              emit(doc.entity);
            }
            return;
          }
        }
        emit(doc.entity);
      }
    };
  },
  _getData: function _getData() {
    const queryOptions = this._buildQueryOptions();
    const queryExpression = this._buildQueryExpression();
    const model = App.ModelManager.getModel('Activity', MODEL_TYPES.OFFLINE);
    const queryResults = model.getEntries(queryExpression, queryOptions);
    when(queryResults, lang.hitch(this, this._onQuerySuccessCount, queryResults), lang.hitch(this, this._onQueryError));
  },
  _onQuerySuccessCount: function _onQuerySuccessCount(results) {
    const def = new Deferred();
    when(results.total, (total) => {
      const metricResults = [{
        name: this.activityType,
        value: total,
      }];
      def.resolve(metricResults);
    });
    this._onQuerySuccess(QueryResults(def.promise)); // eslint-disable-line
  },
});
