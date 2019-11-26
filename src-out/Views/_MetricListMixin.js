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
      this.inherited(postCreate, arguments);
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
      this.inherited(requestData, arguments);
      this.rebuildWidgets();
    },
    clear: function clear() {
      this.inherited(clear, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fTWV0cmljTGlzdE1peGluLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJtZXRyaWNUZW1wbGF0ZSIsIlNpbXBsYXRlIiwibWV0cmljV3JhcHBlciIsIm1ldHJpY05vZGUiLCJtZXRyaWNXaWRnZXRzIiwiZW50aXR5TmFtZSIsIm1ldHJpY1dpZGdldHNCdWlsdCIsIm1ldHJpY1dpZGdldEN0b3IiLCJyZWJ1aWxkaW5nV2lkZ2V0cyIsImNyZWF0ZU1ldHJpY1dpZGdldHNMYXlvdXQiLCJtZXRyaWNzIiwiQXBwIiwiZ2V0TWV0cmljc0J5UmVzb3VyY2VLaW5kIiwicmVzb3VyY2VLaW5kIiwiZmlsdGVyIiwiaXRlbSIsImVuYWJsZWQiLCJwb3N0Q3JlYXRlIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwibWV0cmljTGlzdCIsIiQiLCJhcHBseSIsImdldCIsImFwcGVuZCIsInNjcm9sbGVyTm9kZSIsInByZXBlbmQiLCJkZXN0cm95V2lkZ2V0cyIsImZvckVhY2giLCJ3aWRnZXQiLCJkZXN0cm95IiwicmVxdWVzdERhdGEiLCJyZWJ1aWxkV2lkZ2V0cyIsImNsZWFyIiwiX2FwcGx5U3RhdGVUb1dpZGdldE9wdGlvbnMiLCJvcHRpb25zIiwiX2hhc1ZhbGlkT3B0aW9ucyIsInJldHVyblRvSWQiLCJpZCIsImdyb3Vwc01vZGUiLCJxdWVyeUFyZ3MiLCJfYWN0aXZlRmlsdGVyIiwicmVxdWVzdCIsImNyZWF0ZUdyb3VwTWV0cmljUmVxdWVzdCIsImdyb3VwSWQiLCJjdXJyZW50R3JvdXBJZCIsImN1cnJlbnRTZWFyY2hFeHByZXNzaW9uIiwiX2N1cnJlbnRHcm91cCIsImRpc3BsYXlOYW1lIiwiX2dldEN1cnJlbnRRdWVyeSIsIl9pbnN0YW50aWF0ZU1ldHJpY1dpZGdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwiQ3RvciIsImluc3RhbmNlIiwic2ltcGxlTW9kZSIsIndpZGdldE9wdGlvbnMiLCJ3aWRnZXRzIiwibWFwIiwiY2xvbmVkT3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJwbGFjZUF0IiwiYWxsIiwicmVzdWx0cyIsInF1ZXJ5Iiwid2hlcmUiLCJvcHRpb25zUXVlcnkiLCJhY3RpdmVGaWx0ZXIiLCJqb2luIiwiX2ZpbHRlck5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7Ozs7OztBQVFBLE1BQU1BLFVBQVUsdUJBQVEsNEJBQVIsRUFBc0MsSUFBdEMsRUFBNEM7QUFDMUQ7QUFDQUMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxDQUMzQiwyQkFEMkIsRUFFM0IsUUFGMkIsQ0FBYixDQUYwQztBQU0xREMsbUJBQWUsSUFBSUQsUUFBSixDQUFhLENBQzFCLHdFQUQwQixDQUFiLENBTjJDO0FBUzFERSxnQkFBWSxJQVQ4QztBQVUxREMsbUJBQWUsSUFWMkM7QUFXMURDLGdCQUFZLEVBWDhDOztBQWExREMsd0JBQW9CLEtBYnNDO0FBYzFEQyw0Q0FkMEQ7QUFlMURDLHVCQUFtQixLQWZ1Qzs7QUFpQjFEQywrQkFBMkIsU0FBU0EseUJBQVQsR0FBcUM7QUFDOUQsVUFBTUMsVUFBVUMsSUFBSUMsd0JBQUosQ0FBNkIsS0FBS0MsWUFBbEMsQ0FBaEI7QUFDQSxhQUFPSCxRQUFRSSxNQUFSLENBQWU7QUFBQSxlQUFRQyxLQUFLQyxPQUFiO0FBQUEsT0FBZixDQUFQO0FBQ0QsS0FwQnlEO0FBcUIxREMsZ0JBQVksU0FBU0EsVUFBVCxHQUFzQjtBQUNoQyxXQUFLQyxTQUFMLENBQWVELFVBQWYsRUFBMkJFLFNBQTNCO0FBQ0EsVUFBTUMsYUFBYUMsRUFBRSxLQUFLckIsY0FBTCxDQUFvQnNCLEtBQXBCLENBQTBCLElBQTFCLENBQUYsRUFBbUNDLEdBQW5DLENBQXVDLENBQXZDLENBQW5CO0FBQ0EsV0FBS3BCLFVBQUwsR0FBa0JrQixFQUFFLEtBQUtuQixhQUFMLENBQW1Cb0IsS0FBbkIsQ0FBeUIsSUFBekIsQ0FBRixFQUFrQ0MsR0FBbEMsQ0FBc0MsQ0FBdEMsQ0FBbEI7QUFDQUYsUUFBRUQs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QUFRSyxTQUFSLENBQWtCK0IsV0FBMUQ7QUFDRDtBQXRIeUQsR0FBNUMsQ0FBaEIsQyxDQTVCQTs7Ozs7Ozs7Ozs7Ozs7O29CQXFKZXhFLE8iLCJmaWxlIjoiX01ldHJpY0xpc3RNaXhpbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBNZXRyaWNXaWRnZXQgZnJvbSAnLi9NZXRyaWNXaWRnZXQnO1xyXG5pbXBvcnQgR3JvdXBVdGlsaXR5IGZyb20gJy4uL0dyb3VwVXRpbGl0eSc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuX01ldHJpY0xpc3RNaXhpblxyXG4gKiBAY2xhc3NkZXNjIE1peGluIGZvciBhZGRpbmcgS1BJIHdpZGdldHMgdG8gbGlzdCB2aWV3cy5cclxuICogQHNpbmNlIDMuMFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLlZpZXdzLk1ldHJpY1dpZGdldFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5fTWV0cmljTGlzdE1peGluJywgbnVsbCwge1xyXG4gIC8vIE1ldHJpY3NcclxuICBtZXRyaWNUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibWV0cmljLWxpc3RcIj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgbWV0cmljV3JhcHBlcjogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJtZXRyaWNOb2RlXCIgY2xhc3M9XCJtZXRyaWMtd3JhcHBlclwiPjwvZGl2PicsXHJcbiAgXSksXHJcbiAgbWV0cmljTm9kZTogbnVsbCxcclxuICBtZXRyaWNXaWRnZXRzOiBudWxsLFxyXG4gIGVudGl0eU5hbWU6ICcnLFxyXG5cclxuICBtZXRyaWNXaWRnZXRzQnVpbHQ6IGZhbHNlLFxyXG4gIG1ldHJpY1dpZGdldEN0b3I6IE1ldHJpY1dpZGdldCxcclxuICByZWJ1aWxkaW5nV2lkZ2V0czogZmFsc2UsXHJcblxyXG4gIGNyZWF0ZU1ldHJpY1dpZGdldHNMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZU1ldHJpY1dpZGdldHNMYXlvdXQoKSB7XHJcbiAgICBjb25zdCBtZXRyaWNzID0gQXBwLmdldE1ldHJpY3NCeVJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZCk7XHJcbiAgICByZXR1cm4gbWV0cmljcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmVuYWJsZWQpO1xyXG4gIH0sXHJcbiAgcG9zdENyZWF0ZTogZnVuY3Rpb24gcG9zdENyZWF0ZSgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHBvc3RDcmVhdGUsIGFyZ3VtZW50cyk7XHJcbiAgICBjb25zdCBtZXRyaWNMaXN0ID0gJCh0aGlzLm1ldHJpY1RlbXBsYXRlLmFwcGx5KHRoaXMpKS5nZXQoMCk7XHJcbiAgICB0aGlzLm1ldHJpY05vZGUgPSAkKHRoaXMubWV0cmljV3JhcHBlci5hcHBseSh0aGlzKSkuZ2V0KDApO1xyXG4gICAgJChtZXRyaWNMaXN0KS5hcHBlbmQodGhpcy5tZXRyaWNOb2RlKTtcclxuICAgICQodGhpcy5zY3JvbGxlck5vZGUpLnByZXBlbmQobWV0cmljTGlzdCk7XHJcbiAgfSxcclxuICBkZXN0cm95V2lkZ2V0czogZnVuY3Rpb24gZGVzdHJveVdpZGdldHMoKSB7XHJcbiAgICBpZiAodGhpcy5tZXRyaWNXaWRnZXRzKSB7XHJcbiAgICAgIHRoaXMubWV0cmljV2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICB3aWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1ldHJpY1dpZGdldHNCdWlsdCA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQocmVxdWVzdERhdGEsIGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLnJlYnVpbGRXaWRnZXRzKCk7XHJcbiAgfSxcclxuICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChjbGVhciwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuZGVzdHJveVdpZGdldHMoKTtcclxuICB9LFxyXG4gIF9hcHBseVN0YXRlVG9XaWRnZXRPcHRpb25zOiBmdW5jdGlvbiBfYXBwbHlTdGF0ZVRvV2lkZ2V0T3B0aW9ucyhvcHRpb25zKSB7Ly8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgaWYgKCF0aGlzLl9oYXNWYWxpZE9wdGlvbnMob3B0aW9ucykpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9ucy5yZXR1cm5Ub0lkID0gdGhpcy5pZDtcclxuXHJcbiAgICBpZiAodGhpcy5ncm91cHNNb2RlKSB7XHJcbiAgICAgIG9wdGlvbnMucXVlcnlBcmdzLl9hY3RpdmVGaWx0ZXIgPSAnJztcclxuICAgICAgb3B0aW9ucy5yZXF1ZXN0ID0gR3JvdXBVdGlsaXR5LmNyZWF0ZUdyb3VwTWV0cmljUmVxdWVzdCh7XHJcbiAgICAgICAgZ3JvdXBJZDogdGhpcy5jdXJyZW50R3JvdXBJZCxcclxuICAgICAgICBxdWVyeUFyZ3M6IG9wdGlvbnMucXVlcnlBcmdzLFxyXG4gICAgICB9KTtcclxuICAgICAgb3B0aW9ucy5jdXJyZW50U2VhcmNoRXhwcmVzc2lvbiA9IHRoaXMuX2N1cnJlbnRHcm91cCAmJiB0aGlzLl9jdXJyZW50R3JvdXAuZGlzcGxheU5hbWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRpb25zLnJlcXVlc3QgPSBudWxsO1xyXG4gICAgICBvcHRpb25zLnJlc291cmNlS2luZCA9IHRoaXMucmVzb3VyY2VLaW5kO1xyXG4gICAgICBvcHRpb25zLmN1cnJlbnRTZWFyY2hFeHByZXNzaW9uID0gdGhpcy5jdXJyZW50U2VhcmNoRXhwcmVzc2lvbjtcclxuICAgICAgaWYgKG9wdGlvbnMucXVlcnlBcmdzKSB7XHJcbiAgICAgICAgb3B0aW9ucy5xdWVyeUFyZ3MuX2FjdGl2ZUZpbHRlciA9IHRoaXMuX2dldEN1cnJlbnRRdWVyeShvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH0sXHJcbiAgX2luc3RhbnRpYXRlTWV0cmljV2lkZ2V0OiBmdW5jdGlvbiBfaW5zdGFudGlhdGVNZXRyaWNXaWRnZXQob3B0aW9ucykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGNvbnN0IEN0b3IgPSB0aGlzLm1ldHJpY1dpZGdldEN0b3IgfHwgTWV0cmljV2lkZ2V0O1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBDdG9yKHRoaXMuX2FwcGx5U3RhdGVUb1dpZGdldE9wdGlvbnMob3B0aW9ucykpO1xyXG4gICAgICByZXNvbHZlKGluc3RhbmNlKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVidWlsZFdpZGdldHM6IGZ1bmN0aW9uIHJlYnVpbGRXaWRnZXRzKCkge1xyXG4gICAgaWYgKHRoaXMubWV0cmljV2lkZ2V0c0J1aWx0IHx8IHRoaXMucmVidWlsZGluZ1dpZGdldHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZWJ1aWxkaW5nV2lkZ2V0cyA9IHRydWU7XHJcbiAgICB0aGlzLmRlc3Ryb3lXaWRnZXRzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuc2ltcGxlTW9kZSAmJiAodGhpcy5vcHRpb25zLnNpbXBsZU1vZGUgPT09IHRydWUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgbWV0cmljcyB3aWRnZXRzIGFuZCBwbGFjZSB0aGVtIGluIHRoZSBtZXRyaWNOb2RlXHJcbiAgICBjb25zdCB3aWRnZXRPcHRpb25zID0gdGhpcy5jcmVhdGVNZXRyaWNXaWRnZXRzTGF5b3V0KCkgfHwgW107XHJcbiAgICBjb25zdCB3aWRnZXRzID0gd2lkZ2V0T3B0aW9ucy5maWx0ZXIob3B0aW9ucyA9PiB0aGlzLl9oYXNWYWxpZE9wdGlvbnMob3B0aW9ucykpXHJcbiAgICAgIC5tYXAoKG9wdGlvbnMpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9uZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbnRpYXRlTWV0cmljV2lkZ2V0KGNsb25lZE9wdGlvbnMpLnRoZW4oKHdpZGdldCkgPT4ge1xyXG4gICAgICAgICAgd2lkZ2V0LnBsYWNlQXQodGhpcy5tZXRyaWNOb2RlLCAnbGFzdCcpO1xyXG4gICAgICAgICAgd2lkZ2V0LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICByZXR1cm4gd2lkZ2V0O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBQcm9taXNlLmFsbCh3aWRnZXRzKS50aGVuKChyZXN1bHRzKSA9PiB7XHJcbiAgICAgIHRoaXMubWV0cmljV2lkZ2V0cyA9IHJlc3VsdHM7XHJcbiAgICAgIHRoaXMubWV0cmljV2lkZ2V0c0J1aWx0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5yZWJ1aWxkaW5nV2lkZ2V0cyA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBfZ2V0Q3VycmVudFF1ZXJ5OiBmdW5jdGlvbiBfZ2V0Q3VycmVudFF1ZXJ5KG9wdGlvbnMpIHtcclxuICAgIC8vIEdldCB0aGUgY3VycmVudCBxdWVyeSBmcm9tIHRoZSBzZWFyY2ggYm94LCBhbmQgYW55IGNvbnRleHQgcXVlcnkgbG9jYXRlZCBpbiBvcHRpb25zLndoZXJlXHJcbiAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnk7XHJcbiAgICBjb25zdCB3aGVyZSA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMud2hlcmU7XHJcbiAgICBjb25zdCBvcHRpb25zUXVlcnkgPSBvcHRpb25zICYmIG9wdGlvbnMucXVlcnlBcmdzICYmIG9wdGlvbnMucXVlcnlBcmdzLmFjdGl2ZUZpbHRlcjtcclxuICAgIHJldHVybiBbcXVlcnksIHdoZXJlLCBvcHRpb25zUXVlcnldLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gISFpdGVtO1xyXG4gICAgfSlcclxuICAgICAgLmpvaW4oJyBhbmQgJyk7XHJcbiAgfSxcclxuICBfaGFzVmFsaWRPcHRpb25zOiBmdW5jdGlvbiBfaGFzVmFsaWRPcHRpb25zKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiAob3B0aW9ucyAmJiBvcHRpb25zLnF1ZXJ5QXJncyAmJiBvcHRpb25zLnF1ZXJ5QXJncy5fZmlsdGVyTmFtZSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=