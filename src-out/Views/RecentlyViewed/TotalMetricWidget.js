define('crm/Views/RecentlyViewed/TotalMetricWidget', ['module', 'exports', '../MetricWidget', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/when', 'argos/Models/Types', 'dojo/Deferred', 'dojo/store/util/QueryResults'], function (module, exports, _MetricWidget, _declare, _lang, _when, _Types, _Deferred, _QueryResults) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _MetricWidget2 = _interopRequireDefault(_MetricWidget);

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _when2 = _interopRequireDefault(_when);

  var _Types2 = _interopRequireDefault(_Types);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _QueryResults2 = _interopRequireDefault(_QueryResults);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _declare2.default)('crm.Views.RecentlyViewed.TotalMetricWidget', [_MetricWidget2.default], {
    navToReportView: function navToReportView() {},
    _buildQueryOptions: function _buildQueryOptions() {
      var filters = App.preferences && App.preferences.recentlyViewedEntityFilters ? App.preferences.recentlyViewedEntityFilters : [];
      return {
        returnQueryResults: true,
        filter: function filter(entity) {
          // If the user has entity filters stored in preferences, filter based on that
          if (filters) {
            return filters.some(function (filter) {
              return entity.entityName === filter.name && filter.enabled;
            });
          }

          // User has no entity filter preferences (from right drawer)
          return true;
        }
      };
    },
    _getData: function _getData() {
      var queryOptions = this._buildQueryOptions();
      var model = App.ModelManager.getModel('RecentlyViewed', _Types2.default.OFFLINE);
      var queryResults = model.getEntries(null, queryOptions);
      (0, _when2.default)(queryResults, _lang2.default.hitch(this, this._onQuerySuccessCount, queryResults), _lang2.default.hitch(this, this._onQueryError));
    },
    _onQuerySuccessCount: function _onQuerySuccessCount(results) {
      var def = new _Deferred2.default();
      (0, _when2.default)(results.total, function (total) {
        var metricResults = [{
          name: 'count',
          value: total
        }];
        def.resolve(metricResults);
      });
      this._onQuerySuccess((0, _QueryResults2.default)(def.promise)); // eslint-disable-line
    }
  });
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9SZWNlbnRseVZpZXdlZC9Ub3RhbE1ldHJpY1dpZGdldC5qcyJdLCJuYW1lcyI6WyJuYXZUb1JlcG9ydFZpZXciLCJfYnVpbGRRdWVyeU9wdGlvbnMiLCJmaWx0ZXJzIiwiQXBwIiwicHJlZmVyZW5jZXMiLCJyZWNlbnRseVZpZXdlZEVudGl0eUZpbHRlcnMiLCJyZXR1cm5RdWVyeVJlc3VsdHMiLCJmaWx0ZXIiLCJlbnRpdHkiLCJzb21lIiwiZW50aXR5TmFtZSIsIm5hbWUiLCJlbmFibGVkIiwiX2dldERhdGEiLCJxdWVyeU9wdGlvbnMiLCJtb2RlbCIsIk1vZGVsTWFuYWdlciIsImdldE1vZGVsIiwiT0ZGTElORSIsInF1ZXJ5UmVzdWx0cyIsImdldEVudHJpZXMiLCJoaXRjaCIsIl9vblF1ZXJ5U3VjY2Vzc0NvdW50IiwiX29uUXVlcnlFcnJvciIsInJlc3VsdHMiLCJkZWYiLCJ0b3RhbCIsIm1ldHJpY1Jlc3VsdHMiLCJ2YWx1ZSIsInJlc29sdmUiLCJfb25RdWVyeVN1Y2Nlc3MiLCJwcm9taXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQXVCZSx1QkFBUSw0Q0FBUixFQUFzRCx3QkFBdEQsRUFBc0U7QUFDbkZBLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCLENBQUUsQ0FEcUM7QUFFbkZDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFNQyxVQUFXQyxJQUFJQyxXQUFKLElBQW1CRCxJQUFJQyxXQUFKLENBQWdCQywyQkFBcEMsR0FBbUVGLElBQUlDLFdBQUosQ0FBZ0JDLDJCQUFuRixHQUFpSCxFQUFqSTtBQUNBLGFBQU87QUFDTEMsNEJBQW9CLElBRGY7QUFFTEMsZ0JBQVEsZ0JBQUNDLE1BQUQsRUFBWTtBQUNsQjtBQUNBLGNBQUlOLE9BQUosRUFBYTtBQUNYLG1CQUFPQSxRQUFRTyxJQUFSLENBQWE7QUFBQSxxQkFBVUQsT0FBT0UsVUFBUCxLQUFzQkgsT0FBT0ksSUFBN0IsSUFBcUNKLE9BQU9LLE9BQXREO0FBQUEsYUFBYixDQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxpQkFBTyxJQUFQO0FBQ0Q7QUFWSSxPQUFQO0FBWUQsS0FoQmtGO0FBaUJuRkMsY0FBVSxTQUFTQSxRQUFULEdBQW9CO0FBQzVCLFVBQU1DLGVBQWUsS0FBS2Isa0JBQUwsRUFBckI7QUFDQSxVQUFNYyxRQUFRWixJQUFJYSxZQUFKLENBQWlCQyxRQUFqQixDQUEwQixnQkFBMUIsRUFBNEMsZ0JBQVlDLE9BQXhELENBQWQ7QUFDQSxVQUFNQyxlQUFlSixNQUFNSyxVQUFOLENBQWlCLElBQWpCLEVBQXVCTixZQUF2QixDQUFyQjtBQUNBLDBCQUFLSyxZQUFMLEVBQW1CLGVBQUtFLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLEtBQUtDLG9CQUF0QixFQUE0Q0gsWUFBNUMsQ0FBbkIsRUFBOEUsZUFBS0UsS0FBTCxDQUFXLElBQVgsRUFBaUIsS0FBS0UsYUFBdEIsQ0FBOUU7QUFDRCxLQXRCa0Y7QUF1Qm5GRCwwQkFBc0IsU0FBU0Esb0JBQVQsQ0FBOEJFLE9BQTlCLEVBQXVDO0FBQzNELFVBQU1DLE1BQU0sd0JBQVo7QUFDQSwwQkFBS0QsUUFBUUUsS0FBYixFQUFvQixVQUFDQSxLQUFELEVBQVc7QUFDN0IsWUFBTUMsZ0JBQWdCLENBQUM7QUFDckJoQixnQkFBTSxPQURlO0FBRXJCaUIsaUJBQU9GO0FBRmMsU0FBRCxDQUF0QjtBQUlBRCxZQUFJSSxPQUFKLENBQVlGLGFBQVo7QUFDRCxPQU5EO0FBT0EsV0FBS0csZUFBTCxDQUFxQiw0QkFBYUwsSUFBSU0sT0FBakIsQ0FBckIsRUFUMkQsQ0FTVjtBQUNsRDtBQWpDa0YsR0FBdEUsQyIsImZpbGUiOiJUb3RhbE1ldHJpY1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBNZXRyaWNXaWRnZXQgZnJvbSAnLi4vTWV0cmljV2lkZ2V0JztcclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IHdoZW4gZnJvbSAnZG9qby93aGVuJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBEZWZlcnJlZCBmcm9tICdkb2pvL0RlZmVycmVkJztcclxuaW1wb3J0IFF1ZXJ5UmVzdWx0cyBmcm9tICdkb2pvL3N0b3JlL3V0aWwvUXVlcnlSZXN1bHRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlY2xhcmUoJ2NybS5WaWV3cy5SZWNlbnRseVZpZXdlZC5Ub3RhbE1ldHJpY1dpZGdldCcsIFtNZXRyaWNXaWRnZXRdLCB7XHJcbiAgbmF2VG9SZXBvcnRWaWV3OiBmdW5jdGlvbiBuYXZUb1JlcG9ydFZpZXcoKSB7fSxcclxuICBfYnVpbGRRdWVyeU9wdGlvbnM6IGZ1bmN0aW9uIF9idWlsZFF1ZXJ5T3B0aW9ucygpIHtcclxuICAgIGNvbnN0IGZpbHRlcnMgPSAoQXBwLnByZWZlcmVuY2VzICYmIEFwcC5wcmVmZXJlbmNlcy5yZWNlbnRseVZpZXdlZEVudGl0eUZpbHRlcnMpID8gQXBwLnByZWZlcmVuY2VzLnJlY2VudGx5Vmlld2VkRW50aXR5RmlsdGVycyA6IFtdO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmV0dXJuUXVlcnlSZXN1bHRzOiB0cnVlLFxyXG4gICAgICBmaWx0ZXI6IChlbnRpdHkpID0+IHtcclxuICAgICAgICAvLyBJZiB0aGUgdXNlciBoYXMgZW50aXR5IGZpbHRlcnMgc3RvcmVkIGluIHByZWZlcmVuY2VzLCBmaWx0ZXIgYmFzZWQgb24gdGhhdFxyXG4gICAgICAgIGlmIChmaWx0ZXJzKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmlsdGVycy5zb21lKGZpbHRlciA9PiBlbnRpdHkuZW50aXR5TmFtZSA9PT0gZmlsdGVyLm5hbWUgJiYgZmlsdGVyLmVuYWJsZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXNlciBoYXMgbm8gZW50aXR5IGZpbHRlciBwcmVmZXJlbmNlcyAoZnJvbSByaWdodCBkcmF3ZXIpXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgX2dldERhdGE6IGZ1bmN0aW9uIF9nZXREYXRhKCkge1xyXG4gICAgY29uc3QgcXVlcnlPcHRpb25zID0gdGhpcy5fYnVpbGRRdWVyeU9wdGlvbnMoKTtcclxuICAgIGNvbnN0IG1vZGVsID0gQXBwLk1vZGVsTWFuYWdlci5nZXRNb2RlbCgnUmVjZW50bHlWaWV3ZWQnLCBNT0RFTF9UWVBFUy5PRkZMSU5FKTtcclxuICAgIGNvbnN0IHF1ZXJ5UmVzdWx0cyA9IG1vZGVsLmdldEVudHJpZXMobnVsbCwgcXVlcnlPcHRpb25zKTtcclxuICAgIHdoZW4ocXVlcnlSZXN1bHRzLCBsYW5nLmhpdGNoKHRoaXMsIHRoaXMuX29uUXVlcnlTdWNjZXNzQ291bnQsIHF1ZXJ5UmVzdWx0cyksIGxhbmcuaGl0Y2godGhpcywgdGhpcy5fb25RdWVyeUVycm9yKSk7XHJcbiAgfSxcclxuICBfb25RdWVyeVN1Y2Nlc3NDb3VudDogZnVuY3Rpb24gX29uUXVlcnlTdWNjZXNzQ291bnQocmVzdWx0cykge1xyXG4gICAgY29uc3QgZGVmID0gbmV3IERlZmVycmVkKCk7XHJcbiAgICB3aGVuKHJlc3VsdHMudG90YWwsICh0b3RhbCkgPT4ge1xyXG4gICAgICBjb25zdCBtZXRyaWNSZXN1bHRzID0gW3tcclxuICAgICAgICBuYW1lOiAnY291bnQnLFxyXG4gICAgICAgIHZhbHVlOiB0b3RhbCxcclxuICAgICAgfV07XHJcbiAgICAgIGRlZi5yZXNvbHZlKG1ldHJpY1Jlc3VsdHMpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9vblF1ZXJ5U3VjY2VzcyhRdWVyeVJlc3VsdHMoZGVmLnByb21pc2UpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIH0sXHJcbn0pO1xyXG4iXX0=