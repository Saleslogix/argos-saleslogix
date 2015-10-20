import MetricWidget from '../MetricWidget';
import declare from 'dojo/_base/declare';

export default declare('crm.Views.Offline.TotalMetricWidget', [MetricWidget], {
  navToReportView: function navToReportView() {},
  _buildQueryOptions: function _buildQueryOptions() {
    return {};
  },
  _buildQueryExpression: function _buildQueryExpression() {
    const filters = this.activeEntityFilters || [];
    return {
      map: function map(doc, emit) {
        // If the user has entity filters stored in preferences, filter based on that
        if (App.preferences && App.preferences.offlineEntityFilters) {
          filters.forEach((f) => {
            if (doc.entityName === f.name) {
              emit(1);
            }
          });
        } else {
          // User has no entity filter preferences (from right drawer)
          emit(1);
        }
      },
      reduce: '_count',
    };
  },
  createStore: function createStore() {
    this._model = App.modelManager.getModel('');
  },
});
