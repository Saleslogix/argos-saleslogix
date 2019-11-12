define('crm/Views/_MetricListMixin', ['module', 'exports', 'dojo/_base/declare', './MetricWidget', '../GroupUtility'], function (module, exports, _declare, _MetricWidget, _GroupUtility) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _MetricWidget2 = _interopRequireDefault(_MetricWidget);

  var _GroupUtility2 = _interopRequireDefault(_GroupUtility);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Views._MetricListMixin
   * @classdesc Mixin for adding KPI widgets to list views.
   * @since 3.0
   *
   * @requires crm.Views.MetricWidget
   *
   */
  var __class = (0, _declare2.default)('crm.Views._MetricListMixin', null, {
    // Metrics
    metricTemplate: new Simplate(['<div class="metric-list">', '</div>']),
    metricWrapper: new Simplate(['<div data-dojo-attach-point="metricNode" class="metric-wrapper"></div>']),
    metricNode: null,
    metricWidgets: null,
    entityName: '',

    metricWidgetsBuilt: false,
    metricWidgetCtor: _MetricWidget2.default,
    rebuildingWidgets: false,

    createMetricWidgetsLayout: function createMetricWidgetsLayout() {
      var metrics = App.getMetricsByResourceKind(this.resourceKind);
      return metrics.filter(function (item) {
        return item.enabled;
      });
    },
    postCreate: function postCreate() {
      this.inherited(arguments);
      var metricList = $(this.metricTemplate.apply(this)).get(0);
      this.metricNode = $(this.metricWrapper.apply(this)).get(0);
      $(metricList).append(this.metricNode);
      $(this.scrollerNode).prepend(metricList);
    },
    destroyWidgets: function destroyWidgets() {
      if (this.metricWidgets) {
        this.metricWidgets.forEach(function (widget) {
          widget.destroy();
        });
      }

      this.metricWidgetsBuilt = false;
    },
    requestData: function requestData() {
      this.inherited(arguments);
      this.rebuildWidgets();
    },
    clear: function clear() {
      this.inherited(arguments);
      this.destroyWidgets();
    },
    _applyStateToWidgetOptions: function _applyStateToWidgetOptions(options) {
      // eslint-disable-line
      if (!this._hasValidOptions(options)) {
        return options;
      }

      options.returnToId = this.id;

      if (this.groupsMode) {
        options.queryArgs._activeFilter = '';
        options.request = _GroupUtility2.default.createGroupMetricRequest({
          groupId: this.currentGroupId,
          queryArgs: options.queryArgs
        });
        options.currentSearchExpression = this._currentGroup && this._currentGroup.displayName;
      } else {
        options.request = null;
        options.resourceKind = this.resourceKind;
        options.currentSearchExpression = this.currentSearchExpression;
        if (options.queryArgs) {
          options.queryArgs._activeFilter = this._getCurrentQuery(options);
        }
      }

      return options;
    },
    _instantiateMetricWidget: function _instantiateMetricWidget(options) {
      var _this = this;

      return new Promise(function (resolve) {
        var Ctor = _this.metricWidgetCtor || _MetricWidget2.default;
        var instance = new Ctor(_this._applyStateToWidgetOptions(options));
        resolve(instance);
      });
    },
    rebuildWidgets: function rebuildWidgets() {
      var _this2 = this;

      if (this.metricWidgetsBuilt || this.rebuildingWidgets) {
        return;
      }
      this.rebuildingWidgets = true;
      this.destroyWidgets();

      if (this.options && this.options.simpleMode && this.options.simpleMode === true) {
        return;
      }

      // Create metrics widgets and place them in the metricNode
      var widgetOptions = this.createMetricWidgetsLayout() || [];
      var widgets = widgetOptions.filter(function (options) {
        return _this2._hasValidOptions(options);
      }).map(function (options) {
        var clonedOptions = Object.assign({}, options);
        return _this2._instantiateMetricWidget(clonedOptions).then(function (widget) {
          widget.placeAt(_this2.metricNode, 'last');
          widget.requestData();
          return widget;
        });
      });

      Promise.all(widgets).then(function (results) {
        _this2.metricWidgets = results;
        _this2.metricWidgetsBuilt = true;
        _this2.rebuildingWidgets = false;
      });
    },
    _getCurrentQuery: function _getCurrentQuery(options) {
      // Get the current query from the search box, and any context query located in options.where
      var query = this.query;
      var where = this.options && this.options.where;
      var optionsQuery = options && options.queryArgs && options.queryArgs.activeFilter;
      return [query, where, optionsQuery].filter(function (item) {
        return !!item;
      }).join(' and ');
    },
    _hasValidOptions: function _hasValidOptions(options) {
      return options && options.queryArgs && options.queryArgs._filterName;
    }
  }); /* Copyright 2017 Infor
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *    http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fTWV0cmljTGlzdE1peGluLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJtZXRyaWNUZW1wbGF0ZSIsIlNpbXBsYXRlIiwibWV0cmljV3JhcHBlciIsIm1ldHJpY05vZGUiLCJtZXRyaWNXaWRnZXRzIiwiZW50aXR5TmFtZSIsIm1ldHJpY1dpZGdldHNCdWlsdCIsIm1ldHJpY1dpZGdldEN0b3IiLCJyZWJ1aWxkaW5nV2lkZ2V0cyIsImNyZWF0ZU1ldHJpY1dpZGdldHNMYXlvdXQiLCJtZXRyaWNzIiwiQXBwIiwiZ2V0TWV0cmljc0J5UmVzb3VyY2VLaW5kIiwicmVzb3VyY2VLaW5kIiwiZmlsdGVyIiwiaXRlbSIsImVuYWJsZWQiLCJwb3N0Q3JlYXRlIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwibWV0cmljTGlzdCIsIiQiLCJhcHBseSIsImdldCIsImFwcGVuZCIsInNjcm9sbGVyTm9kZSIsInByZXBlbmQiLCJkZXN0cm95V2lkZ2V0cyIsImZvckVhY2giLCJ3aWRnZXQiLCJkZXN0cm95IiwicmVxdWVzdERhdGEiLCJyZWJ1aWxkV2lkZ2V0cyIsImNsZWFyIiwiX2FwcGx5U3RhdGVUb1dpZGdldE9wdGlvbnMiLCJvcHRpb25zIiwiX2hhc1ZhbGlkT3B0aW9ucyIsInJldHVyblRvSWQiLCJpZCIsImdyb3Vwc01vZGUiLCJxdWVyeUFyZ3MiLCJfYWN0aXZlRmlsdGVyIiwicmVxdWVzdCIsImNyZWF0ZUdyb3VwTWV0cmljUmVxdWVzdCIsImdyb3VwSWQiLCJjdXJyZW50R3JvdXBJZCIsImN1cnJlbnRTZWFyY2hFeHByZXNzaW9uIiwiX2N1cnJlbnRHcm91cCIsImRpc3BsYXlOYW1lIiwiX2dldEN1cnJlbnRRdWVyeSIsIl9pbnN0YW50aWF0ZU1ldHJpY1dpZGdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwiQ3RvciIsImluc3RhbmNlIiwic2ltcGxlTW9kZSIsIndpZGdldE9wdGlvbnMiLCJ3aWRnZXRzIiwibWFwIiwiY2xvbmVkT3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJwbGFjZUF0IiwiYWxsIiwicmVzdWx0cyIsInF1ZXJ5Iiwid2hlcmUiLCJvcHRpb25zUXVlcnkiLCJhY3RpdmVGaWx0ZXIiLCJqb2luIiwiX2ZpbHRlck5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7Ozs7OztBQVFBLE1BQU1BLFVBQVUsdUJBQVEsNEJBQVIsRUFBc0MsSUFBdEMsRUFBNEM7QUFDMUQ7QUFDQUMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxDQUMzQiwyQkFEMkIsRUFFM0IsUUFGMkIsQ0FBYixDQUYwQztBQU0xREMsbUJBQWUsSUFBSUQsUUFBSixDQUFhLENBQzFCLHdFQUQwQixDQUFiLENBTjJDO0FBUzFERSxnQkFBWSxJQVQ4QztBQVUxREMsbUJBQWUsSUFWMkM7QUFXMURDLGdCQUFZLEVBWDhDOztBQWExREMsd0JBQW9CLEtBYnNDO0FBYzFEQyw0Q0FkMEQ7QUFlMURDLHVCQUFtQixLQWZ1Qzs7QUFpQjFEQywrQkFBMkIsU0FBU0EseUJBQVQsR0FBcUM7QUFDOUQsVUFBTUMsVUFBVUMsSUFBSUMsd0JBQUosQ0FBNkIsS0FBS0MsWUFBbEMsQ0FBaEI7QUFDQSxhQUFPSCxRQUFRSSxNQUFSLENBQWU7QUFBQSxlQUFRQyxLQUFLQyxPQUFiO0FBQUEsT0FBZixDQUFQO0FBQ0QsS0FwQnlEO0FBcUIxREMsZ0JBQVksU0FBU0EsVUFBVCxHQUFzQjtBQUNoQyxXQUFLQyxTQUFMLENBQWVDLFNBQWY7QUFDQSxVQUFNQyxhQUFhQyxFQUFFLEtBQUtyQixjQUFMLENBQW9Cc0IsS0FBcEIsQ0FBMEIsSUFBMUIsQ0FBRixFQUFtQ0MsR0FBbkMsQ0FBdUMsQ0FBdkMsQ0FBbkI7QUFDQSxXQUFLcEIsVUFBTCxHQUFrQmtCLEVBQUUsS0FBS25CLGFBQUwsQ0FBbUJvQixLQUFuQixDQUF5QixJQUF6QixDQUFGLEVBQWtDQyxHQUFsQyxDQUFzQyxDQUF0QyxDQUFsQjtBQUNBRixRQUFFRCxVQUFGLEVBQWNJLE1B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NUMsQ0FBaEIsQyxDQTVCQTs7Ozs7Ozs7Ozs7Ozs7O29CQXFKZXhFLE8iLCJmaWxlIjoiX01ldHJpY0xpc3RNaXhpbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBNZXRyaWNXaWRnZXQgZnJvbSAnLi9NZXRyaWNXaWRnZXQnO1xyXG5pbXBvcnQgR3JvdXBVdGlsaXR5IGZyb20gJy4uL0dyb3VwVXRpbGl0eSc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuX01ldHJpY0xpc3RNaXhpblxyXG4gKiBAY2xhc3NkZXNjIE1peGluIGZvciBhZGRpbmcgS1BJIHdpZGdldHMgdG8gbGlzdCB2aWV3cy5cclxuICogQHNpbmNlIDMuMFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLlZpZXdzLk1ldHJpY1dpZGdldFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5fTWV0cmljTGlzdE1peGluJywgbnVsbCwge1xyXG4gIC8vIE1ldHJpY3NcclxuICBtZXRyaWNUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibWV0cmljLWxpc3RcIj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgbWV0cmljV3JhcHBlcjogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJtZXRyaWNOb2RlXCIgY2xhc3M9XCJtZXRyaWMtd3JhcHBlclwiPjwvZGl2PicsXHJcbiAgXSksXHJcbiAgbWV0cmljTm9kZTogbnVsbCxcclxuICBtZXRyaWNXaWRnZXRzOiBudWxsLFxyXG4gIGVudGl0eU5hbWU6ICcnLFxyXG5cclxuICBtZXRyaWNXaWRnZXRzQnVpbHQ6IGZhbHNlLFxyXG4gIG1ldHJpY1dpZGdldEN0b3I6IE1ldHJpY1dpZGdldCxcclxuICByZWJ1aWxkaW5nV2lkZ2V0czogZmFsc2UsXHJcblxyXG4gIGNyZWF0ZU1ldHJpY1dpZGdldHNMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZU1ldHJpY1dpZGdldHNMYXlvdXQoKSB7XHJcbiAgICBjb25zdCBtZXRyaWNzID0gQXBwLmdldE1ldHJpY3NCeVJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZCk7XHJcbiAgICByZXR1cm4gbWV0cmljcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmVuYWJsZWQpO1xyXG4gIH0sXHJcbiAgcG9zdENyZWF0ZTogZnVuY3Rpb24gcG9zdENyZWF0ZSgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBjb25zdCBtZXRyaWNMaXN0ID0gJCh0aGlzLm1ldHJpY1RlbXBsYXRlLmFwcGx5KHRoaXMpKS5nZXQoMCk7XHJcbiAgICB0aGlzLm1ldHJpY05vZGUgPSAkKHRoaXMubWV0cmljV3JhcHBlci5hcHBseSh0aGlzKSkuZ2V0KDApO1xyXG4gICAgJChtZXRyaWNMaXN0KS5hcHBlbmQodGhpcy5tZXRyaWNOb2RlKTtcclxuICAgICQodGhpcy5zY3JvbGxlck5vZGUpLnByZXBlbmQobWV0cmljTGlzdCk7XHJcbiAgfSxcclxuICBkZXN0cm95V2lkZ2V0czogZnVuY3Rpb24gZGVzdHJveVdpZGdldHMoKSB7XHJcbiAgICBpZiAodGhpcy5tZXRyaWNXaWRnZXRzKSB7XHJcbiAgICAgIHRoaXMubWV0cmljV2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICB3aWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1ldHJpY1dpZGdldHNCdWlsdCA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMucmVidWlsZFdpZGdldHMoKTtcclxuICB9LFxyXG4gIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmRlc3Ryb3lXaWRnZXRzKCk7XHJcbiAgfSxcclxuICBfYXBwbHlTdGF0ZVRvV2lkZ2V0T3B0aW9uczogZnVuY3Rpb24gX2FwcGx5U3RhdGVUb1dpZGdldE9wdGlvbnMob3B0aW9ucykgey8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgIGlmICghdGhpcy5faGFzVmFsaWRPcHRpb25zKG9wdGlvbnMpKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbnMucmV0dXJuVG9JZCA9IHRoaXMuaWQ7XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JvdXBzTW9kZSkge1xyXG4gICAgICBvcHRpb25zLnF1ZXJ5QXJncy5fYWN0aXZlRmlsdGVyID0gJyc7XHJcbiAgICAgIG9wdGlvbnMucmVxdWVzdCA9IEdyb3VwVXRpbGl0eS5jcmVhdGVHcm91cE1ldHJpY1JlcXVlc3Qoe1xyXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuY3VycmVudEdyb3VwSWQsXHJcbiAgICAgICAgcXVlcnlBcmdzOiBvcHRpb25zLnF1ZXJ5QXJncyxcclxuICAgICAgfSk7XHJcbiAgICAgIG9wdGlvbnMuY3VycmVudFNlYXJjaEV4cHJlc3Npb24gPSB0aGlzLl9jdXJyZW50R3JvdXAgJiYgdGhpcy5fY3VycmVudEdyb3VwLmRpc3BsYXlOYW1lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3B0aW9ucy5yZXF1ZXN0ID0gbnVsbDtcclxuICAgICAgb3B0aW9ucy5yZXNvdXJjZUtpbmQgPSB0aGlzLnJlc291cmNlS2luZDtcclxuICAgICAgb3B0aW9ucy5jdXJyZW50U2VhcmNoRXhwcmVzc2lvbiA9IHRoaXMuY3VycmVudFNlYXJjaEV4cHJlc3Npb247XHJcbiAgICAgIGlmIChvcHRpb25zLnF1ZXJ5QXJncykge1xyXG4gICAgICAgIG9wdGlvbnMucXVlcnlBcmdzLl9hY3RpdmVGaWx0ZXIgPSB0aGlzLl9nZXRDdXJyZW50UXVlcnkob3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9LFxyXG4gIF9pbnN0YW50aWF0ZU1ldHJpY1dpZGdldDogZnVuY3Rpb24gX2luc3RhbnRpYXRlTWV0cmljV2lkZ2V0KG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBjb25zdCBDdG9yID0gdGhpcy5tZXRyaWNXaWRnZXRDdG9yIHx8IE1ldHJpY1dpZGdldDtcclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgQ3Rvcih0aGlzLl9hcHBseVN0YXRlVG9XaWRnZXRPcHRpb25zKG9wdGlvbnMpKTtcclxuICAgICAgcmVzb2x2ZShpbnN0YW5jZSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlYnVpbGRXaWRnZXRzOiBmdW5jdGlvbiByZWJ1aWxkV2lkZ2V0cygpIHtcclxuICAgIGlmICh0aGlzLm1ldHJpY1dpZGdldHNCdWlsdCB8fCB0aGlzLnJlYnVpbGRpbmdXaWRnZXRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMucmVidWlsZGluZ1dpZGdldHMgPSB0cnVlO1xyXG4gICAgdGhpcy5kZXN0cm95V2lkZ2V0cygpO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnNpbXBsZU1vZGUgJiYgKHRoaXMub3B0aW9ucy5zaW1wbGVNb2RlID09PSB0cnVlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIG1ldHJpY3Mgd2lkZ2V0cyBhbmQgcGxhY2UgdGhlbSBpbiB0aGUgbWV0cmljTm9kZVxyXG4gICAgY29uc3Qgd2lkZ2V0T3B0aW9ucyA9IHRoaXMuY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dCgpIHx8IFtdO1xyXG4gICAgY29uc3Qgd2lkZ2V0cyA9IHdpZGdldE9wdGlvbnMuZmlsdGVyKG9wdGlvbnMgPT4gdGhpcy5faGFzVmFsaWRPcHRpb25zKG9wdGlvbnMpKVxyXG4gICAgICAubWFwKChvcHRpb25zKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvbmVkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW50aWF0ZU1ldHJpY1dpZGdldChjbG9uZWRPcHRpb25zKS50aGVuKCh3aWRnZXQpID0+IHtcclxuICAgICAgICAgIHdpZGdldC5wbGFjZUF0KHRoaXMubWV0cmljTm9kZSwgJ2xhc3QnKTtcclxuICAgICAgICAgIHdpZGdldC5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgcmV0dXJuIHdpZGdldDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgUHJvbWlzZS5hbGwod2lkZ2V0cykudGhlbigocmVzdWx0cykgPT4ge1xyXG4gICAgICB0aGlzLm1ldHJpY1dpZGdldHMgPSByZXN1bHRzO1xyXG4gICAgICB0aGlzLm1ldHJpY1dpZGdldHNCdWlsdCA9IHRydWU7XHJcbiAgICAgIHRoaXMucmVidWlsZGluZ1dpZGdldHMgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgX2dldEN1cnJlbnRRdWVyeTogZnVuY3Rpb24gX2dldEN1cnJlbnRRdWVyeShvcHRpb25zKSB7XHJcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcXVlcnkgZnJvbSB0aGUgc2VhcmNoIGJveCwgYW5kIGFueSBjb250ZXh0IHF1ZXJ5IGxvY2F0ZWQgaW4gb3B0aW9ucy53aGVyZVxyXG4gICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5O1xyXG4gICAgY29uc3Qgd2hlcmUgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLndoZXJlO1xyXG4gICAgY29uc3Qgb3B0aW9uc1F1ZXJ5ID0gb3B0aW9ucyAmJiBvcHRpb25zLnF1ZXJ5QXJncyAmJiBvcHRpb25zLnF1ZXJ5QXJncy5hY3RpdmVGaWx0ZXI7XHJcbiAgICByZXR1cm4gW3F1ZXJ5LCB3aGVyZSwgb3B0aW9uc1F1ZXJ5XS5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgcmV0dXJuICEhaXRlbTtcclxuICAgIH0pXHJcbiAgICAgIC5qb2luKCcgYW5kICcpO1xyXG4gIH0sXHJcbiAgX2hhc1ZhbGlkT3B0aW9uczogZnVuY3Rpb24gX2hhc1ZhbGlkT3B0aW9ucyhvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gKG9wdGlvbnMgJiYgb3B0aW9ucy5xdWVyeUFyZ3MgJiYgb3B0aW9ucy5xdWVyeUFyZ3MuX2ZpbHRlck5hbWUpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19