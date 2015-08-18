import MetricWidget from '../MetricWidget';
import declare from 'dojo/_base/declare';
import Store from 'argos/Store/PouchDB';

export default declare('crm.Views.Offline.TotalMetricWidget', [MetricWidget], {
  _buildQueryOptions: function _buildQueryOptions() {
    return {};
  },
  _buildQueryExpression: function _buildQueryExpression() {
    return {
      map: function map(doc, emit) {
        emit(1);
      },
      reduce: '_count',
    };
  },
  createStore: function createStore() {
    return new Store({
      databaseName: this.OFFLINE_DB_NAME,
    });
  },
});
