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
      const filters = this.activeEntityFilters || [];
      return {
        map: function map(doc, emit) {
          // If the user has entity filters stored in preferences, filter based on that
          if (App.preferences && App.preferences.offlineEntityFilters) {
            filters.forEach(f => {
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