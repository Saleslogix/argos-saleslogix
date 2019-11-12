define('crm/Views/Offline/TotalMetricWidget', ['module', 'exports', '../MetricWidget', 'dojo/_base/declare'], function (module, exports, _MetricWidget, _declare) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _MetricWidget2 = _interopRequireDefault(_MetricWidget);

  var _declare2 = _interopRequireDefault(_declare);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _declare2.default)('crm.Views.Offline.TotalMetricWidget', [_MetricWidget2.default], {
    navToReportView: function navToReportView() {},
    _buildQueryOptions: function _buildQueryOptions() {
      return {};
    },
    _buildQueryExpression: function _buildQueryExpression() {
      var filters = this.activeEntityFilters || [];
      return {
        map: function map(doc, emit) {
          // If the user has entity filters stored in preferences, filter based on that
          if (App.preferences && App.preferences.offlineEntityFilters) {
            filters.forEach(function (f) {
              if (doc.entityName === f.name) {
                emit(1);
              }
            });
          } else {
            // User has no entity filter preferences (from right drawer)
            emit(1);
          }
        },
        reduce: '_count'
      };
    },
    createStore: function createStore() {
      this._model = App.modelManager.getModel('');
    }
  });
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PZmZsaW5lL1RvdGFsTWV0cmljV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIm5hdlRvUmVwb3J0VmlldyIsIl9idWlsZFF1ZXJ5T3B0aW9ucyIsIl9idWlsZFF1ZXJ5RXhwcmVzc2lvbiIsImZpbHRlcnMiLCJhY3RpdmVFbnRpdHlGaWx0ZXJzIiwibWFwIiwiZG9jIiwiZW1pdCIsIkFwcCIsInByZWZlcmVuY2VzIiwib2ZmbGluZUVudGl0eUZpbHRlcnMiLCJmb3JFYWNoIiwiZiIsImVudGl0eU5hbWUiLCJuYW1lIiwicmVkdWNlIiwiY3JlYXRlU3RvcmUiLCJfbW9kZWwiLCJtb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O29CQWtCZSx1QkFBUSxxQ0FBUixFQUErQyx3QkFBL0MsRUFBK0Q7QUFDNUVBLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCLENBQUUsQ0FEOEI7QUFFNUVDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxhQUFPLEVBQVA7QUFDRCxLQUoyRTtBQUs1RUMsMkJBQXVCLFNBQVNBLHFCQUFULEdBQWlDO0FBQ3RELFVBQU1DLFVBQVUsS0FBS0MsbUJBQUwsSUFBNEIsRUFBNUM7QUFDQSxhQUFPO0FBQ0xDLGFBQUssU0FBU0EsR0FBVCxDQUFhQyxHQUFiLEVBQWtCQyxJQUFsQixFQUF3QjtBQUMzQjtBQUNBLGNBQUlDLElBQUlDLFdBQUosSUFBbUJELElBQUlDLFdBQUosQ0FBZ0JDLG9CQUF2QyxFQUE2RDtBQUMzRFAsb0JBQVFRLE9BQVIsQ0FBZ0IsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3JCLGtCQUFJTixJQUFJTyxVQUFKLEtBQW1CRCxFQUFFRSxJQUF6QixFQUErQjtBQUM3QlAscUJBQUssQ0FBTDtBQUNEO0FBQ0YsYUFKRDtBQUtELFdBTkQsTUFNTztBQUNMO0FBQ0FBLGlCQUFLLENBQUw7QUFDRDtBQUNGLFNBYkk7QUFjTFEsZ0JBQVE7QUFkSCxPQUFQO0FBZ0JELEtBdkIyRTtBQXdCNUVDLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsV0FBS0MsTUFBTCxHQUFjVCxJQUFJVSxZQUFKLENBQWlCQyxRQUFqQixDQUEwQixFQUExQixDQUFkO0FBQ0Q7QUExQjJFLEdBQS9ELEMiLCJmaWxlIjoiVG90YWxNZXRyaWNXaWRnZXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgTWV0cmljV2lkZ2V0IGZyb20gJy4uL01ldHJpY1dpZGdldCc7XHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWNsYXJlKCdjcm0uVmlld3MuT2ZmbGluZS5Ub3RhbE1ldHJpY1dpZGdldCcsIFtNZXRyaWNXaWRnZXRdLCB7XHJcbiAgbmF2VG9SZXBvcnRWaWV3OiBmdW5jdGlvbiBuYXZUb1JlcG9ydFZpZXcoKSB7fSxcclxuICBfYnVpbGRRdWVyeU9wdGlvbnM6IGZ1bmN0aW9uIF9idWlsZFF1ZXJ5T3B0aW9ucygpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9LFxyXG4gIF9idWlsZFF1ZXJ5RXhwcmVzc2lvbjogZnVuY3Rpb24gX2J1aWxkUXVlcnlFeHByZXNzaW9uKCkge1xyXG4gICAgY29uc3QgZmlsdGVycyA9IHRoaXMuYWN0aXZlRW50aXR5RmlsdGVycyB8fCBbXTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1hcDogZnVuY3Rpb24gbWFwKGRvYywgZW1pdCkge1xyXG4gICAgICAgIC8vIElmIHRoZSB1c2VyIGhhcyBlbnRpdHkgZmlsdGVycyBzdG9yZWQgaW4gcHJlZmVyZW5jZXMsIGZpbHRlciBiYXNlZCBvbiB0aGF0XHJcbiAgICAgICAgaWYgKEFwcC5wcmVmZXJlbmNlcyAmJiBBcHAucHJlZmVyZW5jZXMub2ZmbGluZUVudGl0eUZpbHRlcnMpIHtcclxuICAgICAgICAgIGZpbHRlcnMuZm9yRWFjaCgoZikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZG9jLmVudGl0eU5hbWUgPT09IGYubmFtZSkge1xyXG4gICAgICAgICAgICAgIGVtaXQoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBVc2VyIGhhcyBubyBlbnRpdHkgZmlsdGVyIHByZWZlcmVuY2VzIChmcm9tIHJpZ2h0IGRyYXdlcilcclxuICAgICAgICAgIGVtaXQoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICByZWR1Y2U6ICdfY291bnQnLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZVN0b3JlOiBmdW5jdGlvbiBjcmVhdGVTdG9yZSgpIHtcclxuICAgIHRoaXMuX21vZGVsID0gQXBwLm1vZGVsTWFuYWdlci5nZXRNb2RlbCgnJyk7XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==