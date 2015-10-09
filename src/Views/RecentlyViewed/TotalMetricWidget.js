import MetricWidget from '../MetricWidget';
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import when from 'dojo/when';
export default declare('crm.Views.RecentlyViewed.TotalMetricWidget', [MetricWidget], {
  navToReportView: function navToReportView() {},
  _buildQueryOptions: function _buildQueryOptions() {
    return {};
  },
  _buildQueryExpression: function _buildQueryExpression() {
    const filters = this.activeEntityFilters || [];
    return {
      map: function map(doc, emit) {
        // If the user has entity filters stored in preferences, filter based on that
        if (App.preferences && App.preferences.recentlyViewedEntityFilters) {
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
  _getData: function _getData() {
    const queryOptions = this._buildQueryOptions();
    const queryExpression = this._buildQueryExpression();
    const model = App.modelManager.getModel('RecentlyViewed');
    queryOptions.returnQueryResult = true; // I dont like this we need to change this.
    const queryResults = model.getEnttries(queryExpression, queryOptions);
    when(queryResults, lang.hitch(this, this._onQuerySuccess, queryResults), lang.hitch(this, this._onQueryError));
  },
});
