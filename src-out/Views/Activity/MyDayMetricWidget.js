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