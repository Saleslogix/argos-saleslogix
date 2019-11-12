define('crm/Views/Activity/MyDayMetricWidget', ['module', 'exports', '../MetricWidget', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/when', 'dojo/Deferred', 'argos/Models/Types', 'dojo/store/util/QueryResults'], function (module, exports, _MetricWidget, _declare, _lang, _when, _Deferred, _Types, _QueryResults) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _MetricWidget2 = _interopRequireDefault(_MetricWidget);

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _when2 = _interopRequireDefault(_when);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _Types2 = _interopRequireDefault(_Types);

  var _QueryResults2 = _interopRequireDefault(_QueryResults);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _declare2.default)('crm.Views.Activity.MyDayMetricWidget', [_MetricWidget2.default], {
    navToReportView: function navToReportView() {},
    activityType: '',
    _buildQueryOptions: function _buildQueryOptions() {
      var self = this;
      return {
        returnQueryResults: true,
        filter: function filter(entity) {
          if (entity.Type === self.activityType) {
            if (self.parent) {
              var filter = self.parent.getCurrentFilter();
              if (filter && filter.fn) {
                var result = filter.fn.apply(self.parent, [entity]);
                if (result) {
                  return true;
                }
                return false;
              }
            }
            return true;
          }

          return false;
        }
      };
    },
    _getData: function _getData() {
      var queryOptions = this._buildQueryOptions();
      var model = App.ModelManager.getModel('Activity', _Types2.default.OFFLINE);
      var queryResults = model.getEntries(null, queryOptions);
      (0, _when2.default)(queryResults, _lang2.default.hitch(this, this._onQuerySuccessCount, queryResults), _lang2.default.hitch(this, this._onQueryError));
    },
    _onQuerySuccessCount: function _onQuerySuccessCount(results) {
      var _this = this;

      var def = new _Deferred2.default();
      (0, _when2.default)(results.total, function (total) {
        var metricResults = [{
          name: _this.activityType,
          value: total
        }];
        def.resolve(metricResults);
      });
      this._onQuerySuccess((0, _QueryResults2.default)(def.promise)); // eslint-disable-line
    }
  });
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9NeURheU1ldHJpY1dpZGdldC5qcyJdLCJuYW1lcyI6WyJuYXZUb1JlcG9ydFZpZXciLCJhY3Rpdml0eVR5cGUiLCJfYnVpbGRRdWVyeU9wdGlvbnMiLCJzZWxmIiwicmV0dXJuUXVlcnlSZXN1bHRzIiwiZmlsdGVyIiwiZW50aXR5IiwiVHlwZSIsInBhcmVudCIsImdldEN1cnJlbnRGaWx0ZXIiLCJmbiIsInJlc3VsdCIsImFwcGx5IiwiX2dldERhdGEiLCJxdWVyeU9wdGlvbnMiLCJtb2RlbCIsIkFwcCIsIk1vZGVsTWFuYWdlciIsImdldE1vZGVsIiwiT0ZGTElORSIsInF1ZXJ5UmVzdWx0cyIsImdldEVudHJpZXMiLCJoaXRjaCIsIl9vblF1ZXJ5U3VjY2Vzc0NvdW50IiwiX29uUXVlcnlFcnJvciIsInJlc3VsdHMiLCJkZWYiLCJ0b3RhbCIsIm1ldHJpY1Jlc3VsdHMiLCJuYW1lIiwidmFsdWUiLCJyZXNvbHZlIiwiX29uUXVlcnlTdWNjZXNzIiwicHJvbWlzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkF1QmUsdUJBQVEsc0NBQVIsRUFBZ0Qsd0JBQWhELEVBQWdFO0FBQzdFQSxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQixDQUFFLENBRCtCO0FBRTdFQyxrQkFBYyxFQUYrRDtBQUc3RUMsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCO0FBQ2hELFVBQU1DLE9BQU8sSUFBYjtBQUNBLGFBQU87QUFDTEMsNEJBQW9CLElBRGY7QUFFTEMsZ0JBQVEsZ0JBQUNDLE1BQUQsRUFBWTtBQUNsQixjQUFJQSxPQUFPQyxJQUFQLEtBQWdCSixLQUFLRixZQUF6QixFQUF1QztBQUNyQyxnQkFBSUUsS0FBS0ssTUFBVCxFQUFpQjtBQUNmLGtCQUFNSCxTQUFTRixLQUFLSyxNQUFMLENBQVlDLGdCQUFaLEVBQWY7QUFDQSxrQkFBSUosVUFBVUEsT0FBT0ssRUFBckIsRUFBeUI7QUFDdkIsb0JBQU1DLFNBQVNOLE9BQU9LLEVBQVAsQ0FBVUUsS0FBVixDQUFnQlQsS0FBS0ssTUFBckIsRUFBNkIsQ0FBQ0YsTUFBRCxDQUE3QixDQUFmO0FBQ0Esb0JBQUlLLE1BQUosRUFBWTtBQUNWLHlCQUFPLElBQVA7QUFDRDtBQUNELHVCQUFPLEtBQVA7QUFDRDtBQUNGO0FBQ0QsbUJBQU8sSUFBUDtBQUNEOztBQUVELGlCQUFPLEtBQVA7QUFDRDtBQWxCSSxPQUFQO0FBb0JELEtBekI0RTtBQTBCN0VFLGNBQVUsU0FBU0EsUUFBVCxHQUFvQjtBQUM1QixVQUFNQyxlQUFlLEtBQUtaLGtCQUFMLEVBQXJCO0FBQ0EsVUFBTWEsUUFBUUMsSUFBSUMsWUFBSixDQUFpQkMsUUFBakIsQ0FBMEIsVUFBMUIsRUFBc0MsZ0JBQVlDLE9BQWxELENBQWQ7QUFDQSxVQUFNQyxlQUFlTCxNQUFNTSxVQUFOLENBQWlCLElBQWpCLEVBQXVCUCxZQUF2QixDQUFyQjtBQUNBLDBCQUFLTSxZQUFMLEVBQW1CLGVBQUtFLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLEtBQUtDLG9CQUF0QixFQUE0Q0gsWUFBNUMsQ0FBbkIsRUFBOEUsZUFBS0UsS0FBTCxDQUFXLElBQVgsRUFBaUIsS0FBS0UsYUFBdEIsQ0FBOUU7QUFDRCxLQS9CNEU7QUFnQzdFRCwwQkFBc0IsU0FBU0Esb0JBQVQsQ0FBOEJFLE9BQTlCLEVBQXVDO0FBQUE7O0FBQzNELFVBQU1DLE1BQU0sd0JBQVo7QUFDQSwwQkFBS0QsUUFBUUUsS0FBYixFQUFvQixVQUFDQSxLQUFELEVBQVc7QUFDN0IsWUFBTUMsZ0JBQWdCLENBQUM7QUFDckJDLGdCQUFNLE1BQUs1QixZQURVO0FBRXJCNkIsaUJBQU9IO0FBRmMsU0FBRCxDQUF0QjtBQUlBRCxZQUFJSyxPQUFKLENBQVlILGFBQVo7QUFDRCxPQU5EO0FBT0EsV0FBS0ksZUFBTCxDQUFxQiw0QkFBYU4sSUFBSU8sT0FBakIsQ0FBckIsRUFUMkQsQ0FTVjtBQUNsRDtBQTFDNEUsR0FBaEUsQyIsImZpbGUiOiJNeURheU1ldHJpY1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBNZXRyaWNXaWRnZXQgZnJvbSAnLi4vTWV0cmljV2lkZ2V0JztcclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IHdoZW4gZnJvbSAnZG9qby93aGVuJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJ2Rvam8vRGVmZXJyZWQnO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IFF1ZXJ5UmVzdWx0cyBmcm9tICdkb2pvL3N0b3JlL3V0aWwvUXVlcnlSZXN1bHRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlY2xhcmUoJ2NybS5WaWV3cy5BY3Rpdml0eS5NeURheU1ldHJpY1dpZGdldCcsIFtNZXRyaWNXaWRnZXRdLCB7XHJcbiAgbmF2VG9SZXBvcnRWaWV3OiBmdW5jdGlvbiBuYXZUb1JlcG9ydFZpZXcoKSB7fSxcclxuICBhY3Rpdml0eVR5cGU6ICcnLFxyXG4gIF9idWlsZFF1ZXJ5T3B0aW9uczogZnVuY3Rpb24gX2J1aWxkUXVlcnlPcHRpb25zKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXR1cm5RdWVyeVJlc3VsdHM6IHRydWUsXHJcbiAgICAgIGZpbHRlcjogKGVudGl0eSkgPT4ge1xyXG4gICAgICAgIGlmIChlbnRpdHkuVHlwZSA9PT0gc2VsZi5hY3Rpdml0eVR5cGUpIHtcclxuICAgICAgICAgIGlmIChzZWxmLnBhcmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBzZWxmLnBhcmVudC5nZXRDdXJyZW50RmlsdGVyKCk7XHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmZuKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZmlsdGVyLmZuLmFwcGx5KHNlbGYucGFyZW50LCBbZW50aXR5XSk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgX2dldERhdGE6IGZ1bmN0aW9uIF9nZXREYXRhKCkge1xyXG4gICAgY29uc3QgcXVlcnlPcHRpb25zID0gdGhpcy5fYnVpbGRRdWVyeU9wdGlvbnMoKTtcclxuICAgIGNvbnN0IG1vZGVsID0gQXBwLk1vZGVsTWFuYWdlci5nZXRNb2RlbCgnQWN0aXZpdHknLCBNT0RFTF9UWVBFUy5PRkZMSU5FKTtcclxuICAgIGNvbnN0IHF1ZXJ5UmVzdWx0cyA9IG1vZGVsLmdldEVudHJpZXMobnVsbCwgcXVlcnlPcHRpb25zKTtcclxuICAgIHdoZW4ocXVlcnlSZXN1bHRzLCBsYW5nLmhpdGNoKHRoaXMsIHRoaXMuX29uUXVlcnlTdWNjZXNzQ291bnQsIHF1ZXJ5UmVzdWx0cyksIGxhbmcuaGl0Y2godGhpcywgdGhpcy5fb25RdWVyeUVycm9yKSk7XHJcbiAgfSxcclxuICBfb25RdWVyeVN1Y2Nlc3NDb3VudDogZnVuY3Rpb24gX29uUXVlcnlTdWNjZXNzQ291bnQocmVzdWx0cykge1xyXG4gICAgY29uc3QgZGVmID0gbmV3IERlZmVycmVkKCk7XHJcbiAgICB3aGVuKHJlc3VsdHMudG90YWwsICh0b3RhbCkgPT4ge1xyXG4gICAgICBjb25zdCBtZXRyaWNSZXN1bHRzID0gW3tcclxuICAgICAgICBuYW1lOiB0aGlzLmFjdGl2aXR5VHlwZSxcclxuICAgICAgICB2YWx1ZTogdG90YWwsXHJcbiAgICAgIH1dO1xyXG4gICAgICBkZWYucmVzb2x2ZShtZXRyaWNSZXN1bHRzKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fb25RdWVyeVN1Y2Nlc3MoUXVlcnlSZXN1bHRzKGRlZi5wcm9taXNlKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9LFxyXG59KTtcclxuIl19