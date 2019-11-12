define('crm/Integrations/BOE/DashboardWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/RelatedViewManager', '../../Views/MetricWidget', './DateRangeWidget', './_DashboardWidgetBase'], function (module, exports, _declare, _lang, _RelatedViewManager, _MetricWidget, _DateRangeWidget, _DashboardWidgetBase2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _MetricWidget2 = _interopRequireDefault(_MetricWidget);

  var _DateRangeWidget2 = _interopRequireDefault(_DateRangeWidget);

  var _DashboardWidgetBase3 = _interopRequireDefault(_DashboardWidgetBase2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Views._DashboardWidgetBase
   *
   *
   * @extends argos._RelatedViewWidgetBase
   *
   */
  /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.DashboardWidget', [_DashboardWidgetBase3.default], {
    buildView: function buildView(entry) {
      this.destroyWidgets();
      this.metricWidgets = [];
      this.rangeWidgets = [];
      this.createMetricWidgets(entry);
      this.createRangeWidgets();
      this.getQueryData();
    },
    createMetricWidgets: function createMetricWidgets(entry) {
      var _this = this;

      // Create metrics widgets and place them in the metricsNode
      var frag = document.createDocumentFragment();
      var widgetOptions = this.createMetricLayout(entry) || [];
      widgetOptions.forEach(function (options) {
        if (_this.hasValidOptions(options)) {
          // Check if widget has a navigate to view option
          if (options.navTo) {
            var obj = _this.values.filter(_this.checkForValue, options)[0];
            options.navToReportView = _this.navToReportView;
            options.chartType = 'noChart';
            if (!(obj.queryIndex instanceof Array)) {
              // Get the active filter from the query args array and pass it as an option to the widget to be consumed by the navToReportView function
              options.activeFilter = _this.queryArgs[obj.queryIndex][1]._activeFilter;
            }
          }
          var widget = new _MetricWidget2.default(options);
          var itemNode = $(_this.metricItemTemplate.apply(options, _this));
          frag.appendChild(itemNode.get(0));
          $(itemNode).append($(widget)[0].domNode);
          _this.registerWidget(widget);
        }
      });
      if (frag.childNodes.length) {
        $(this.metricsNode).append(frag);
      }
    },
    createRangeWidgets: function createRangeWidgets() {
      var _this2 = this;

      var rangeFrag = document.createDocumentFragment();
      // Check if range widgets are desired, if so create and place in rangeNode
      if (this.createRangeLayout) {
        var rangeOptions = this.createRangeLayout() || [];
        rangeOptions.forEach(function (options) {
          options.changeRange = _this2.changeRange;
          options.parent = _this2;
          var widget = new _DateRangeWidget2.default(options);
          var itemNode = $(_this2.rangeItemTemplate.apply(options, _this2)).get(0);
          if (options.value === _this2.dayValue) {
            _this2.selectedRange = itemNode;
          }
          rangeFrag.appendChild(itemNode);
          $(itemNode).append($(widget)[0].domNode);
        });
      }
      if (rangeFrag.childNodes.length) {
        if (!this.selectedRange) {
          this.selectedRange = rangeFrag.childNodes[0];
        }
        this.selectedRange.style['background-color'] = this.getSelectedColor();
        $(this.rangeNode).append(rangeFrag);
      }
    },
    rebuildWidgets: function rebuildWidgets(entry) {
      // this.destroyWidgets();
      $(this.metricsNode).empty();
      this.metricWidgets = [];
      this.rebuildValues();
      this.createMetricWidgets(entry);
      this.getQueryData();
    }
  });

  var rvm = new _RelatedViewManager2.default();
  rvm.registerType('dashboard_widget', __class);
  _lang2.default.setObject('crm.Views.DashboardWidget', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL0Rhc2hib2FyZFdpZGdldC5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiYnVpbGRWaWV3IiwiZW50cnkiLCJkZXN0cm95V2lkZ2V0cyIsIm1ldHJpY1dpZGdldHMiLCJyYW5nZVdpZGdldHMiLCJjcmVhdGVNZXRyaWNXaWRnZXRzIiwiY3JlYXRlUmFuZ2VXaWRnZXRzIiwiZ2V0UXVlcnlEYXRhIiwiZnJhZyIsImRvY3VtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsIndpZGdldE9wdGlvbnMiLCJjcmVhdGVNZXRyaWNMYXlvdXQiLCJmb3JFYWNoIiwib3B0aW9ucyIsImhhc1ZhbGlkT3B0aW9ucyIsIm5hdlRvIiwib2JqIiwidmFsdWVzIiwiZmlsdGVyIiwiY2hlY2tGb3JWYWx1ZSIsIm5hdlRvUmVwb3J0VmlldyIsImNoYXJ0VHlwZSIsInF1ZXJ5SW5kZXgiLCJBcnJheSIsImFjdGl2ZUZpbHRlciIsInF1ZXJ5QXJncyIsIl9hY3RpdmVGaWx0ZXIiLCJ3aWRnZXQiLCJpdGVtTm9kZSIsIiQiLCJtZXRyaWNJdGVtVGVtcGxhdGUiLCJhcHBseSIsImFwcGVuZENoaWxkIiwiZ2V0IiwiYXBwZW5kIiwiZG9tTm9kZSIsInJlZ2lzdGVyV2lkZ2V0IiwiY2hpbGROb2RlcyIsImxlbmd0aCIsIm1ldHJpY3NOb2RlIiwicmFuZ2VGcmFnIiwiY3JlYXRlUmFuZ2VMYXlvdXQiLCJyYW5nZU9wdGlvbnMiLCJjaGFuZ2VSYW5nZSIsInBhcmVudCIsInJhbmdlSXRlbVRlbXBsYXRlIiwidmFsdWUiLCJkYXlWYWx1ZSIsInNlbGVjdGVkUmFuZ2UiLCJzdHlsZSIsImdldFNlbGVjdGVkQ29sb3IiLCJyYW5nZU5vZGUiLCJyZWJ1aWxkV2lkZ2V0cyIsImVtcHR5IiwicmVidWlsZFZhbHVlcyIsInJ2bSIsInJlZ2lzdGVyVHlwZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QVdEO0FBQ0QsVUFBSUssVUFBVUgsVUFBVixDQUFxQkMsTUFBekIsRUFBaUM7QUFDL0IsWUFBSSxDQUFDLEtBQUtVLGFBQVYsRUFBeUI7QUFDdkIsZUFBS0EsYUFBTCxHQUFxQlIsVUFBVUgsVUFBVixDQUFxQixDQUFyQixDQUFyQjtBQUNEO0FBQ0QsYUFBS1csYUFBTCxDQUFtQkMsS0FBbkIsQ0FBeUIsa0JBQXpCLElBQStDLEtBQUtDLGdCQUFMLEVBQS9DO0FBQ0FyQixVQUFFLEtBQUtzQixTQUFQLEVBQWtCakIsTUFBbEIsQ0FBeUJNLFNBQXpCO0FBQ0Q7QUFDRixLQTVEcUY7QUE2RHRGWSxvQkFBZ0IsU0FBU0EsY0FBVCxDQUF3QnBELEtBQXhCLEVBQStCO0FBQzdDO0FBQ0E2QixRQUFFLEtBQUtVLFdBQVAsRUFBb0JjLEtBQXBCO0FBQ0EsV0FBS25ELGFBQUwsR0FBcUIsRUFBckI7QUFDQSxXQUFLb0QsYUFBTDtBQUNBLFdBQUtsRCxtQkFBTCxDQUF5QkosS0FBekI7QUFDQSxXQUFLTSxZQUFMO0FBQ0Q7QUFwRXFGLEdBQXhFLENBQWhCOztBQXVFQSxNQUFNaUQsTUFBTSxrQ0FBWjtBQUNBQSxNQUFJQyxZQUFKLENBQWlCLGtCQUFqQixFQUFxQzFELE9BQXJDO0FBQ0EsaUJBQUsyRCxTQUFMLENBQWUsMkJBQWYsRUFBNEMzRCxPQUE1QztvQkFDZUEsTyIsImZpbGUiOiJEYXNoYm9hcmRXaWRnZXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgUmVsYXRlZFZpZXdNYW5hZ2VyIGZyb20gJ2FyZ29zL1JlbGF0ZWRWaWV3TWFuYWdlcic7XHJcbmltcG9ydCBNZXRyaWNXaWRnZXQgZnJvbSAnLi4vLi4vVmlld3MvTWV0cmljV2lkZ2V0JztcclxuaW1wb3J0IERhdGVSYW5nZVdpZGdldCBmcm9tICcuL0RhdGVSYW5nZVdpZGdldCc7XHJcbmltcG9ydCBfRGFzaGJvYXJkV2lkZ2V0QmFzZSBmcm9tICcuL19EYXNoYm9hcmRXaWRnZXRCYXNlJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLl9EYXNoYm9hcmRXaWRnZXRCYXNlXHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLl9SZWxhdGVkVmlld1dpZGdldEJhc2VcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5EYXNoYm9hcmRXaWRnZXQnLCBbX0Rhc2hib2FyZFdpZGdldEJhc2VdLCB7XHJcbiAgYnVpbGRWaWV3OiBmdW5jdGlvbiBidWlsZFZpZXcoZW50cnkpIHtcclxuICAgIHRoaXMuZGVzdHJveVdpZGdldHMoKTtcclxuICAgIHRoaXMubWV0cmljV2lkZ2V0cyA9IFtdO1xyXG4gICAgdGhpcy5yYW5nZVdpZGdldHMgPSBbXTtcclxuICAgIHRoaXMuY3JlYXRlTWV0cmljV2lkZ2V0cyhlbnRyeSk7XHJcbiAgICB0aGlzLmNyZWF0ZVJhbmdlV2lkZ2V0cygpO1xyXG4gICAgdGhpcy5nZXRRdWVyeURhdGEoKTtcclxuICB9LFxyXG4gIGNyZWF0ZU1ldHJpY1dpZGdldHM6IGZ1bmN0aW9uIGNyZWF0ZU1ldHJpY1dpZGdldHMoZW50cnkpIHtcclxuICAgIC8vIENyZWF0ZSBtZXRyaWNzIHdpZGdldHMgYW5kIHBsYWNlIHRoZW0gaW4gdGhlIG1ldHJpY3NOb2RlXHJcbiAgICBjb25zdCBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgY29uc3Qgd2lkZ2V0T3B0aW9ucyA9IHRoaXMuY3JlYXRlTWV0cmljTGF5b3V0KGVudHJ5KSB8fCBbXTtcclxuICAgIHdpZGdldE9wdGlvbnMuZm9yRWFjaCgob3B0aW9ucykgPT4ge1xyXG4gICAgICBpZiAodGhpcy5oYXNWYWxpZE9wdGlvbnMob3B0aW9ucykpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiB3aWRnZXQgaGFzIGEgbmF2aWdhdGUgdG8gdmlldyBvcHRpb25cclxuICAgICAgICBpZiAob3B0aW9ucy5uYXZUbykge1xyXG4gICAgICAgICAgY29uc3Qgb2JqID0gdGhpcy52YWx1ZXMuZmlsdGVyKHRoaXMuY2hlY2tGb3JWYWx1ZSwgb3B0aW9ucylbMF07XHJcbiAgICAgICAgICBvcHRpb25zLm5hdlRvUmVwb3J0VmlldyA9IHRoaXMubmF2VG9SZXBvcnRWaWV3O1xyXG4gICAgICAgICAgb3B0aW9ucy5jaGFydFR5cGUgPSAnbm9DaGFydCc7XHJcbiAgICAgICAgICBpZiAoIShvYmoucXVlcnlJbmRleCBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGFjdGl2ZSBmaWx0ZXIgZnJvbSB0aGUgcXVlcnkgYXJncyBhcnJheSBhbmQgcGFzcyBpdCBhcyBhbiBvcHRpb24gdG8gdGhlIHdpZGdldCB0byBiZSBjb25zdW1lZCBieSB0aGUgbmF2VG9SZXBvcnRWaWV3IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIG9wdGlvbnMuYWN0aXZlRmlsdGVyID0gdGhpcy5xdWVyeUFyZ3Nbb2JqLnF1ZXJ5SW5kZXhdWzFdLl9hY3RpdmVGaWx0ZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBNZXRyaWNXaWRnZXQob3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgaXRlbU5vZGUgPSAkKHRoaXMubWV0cmljSXRlbVRlbXBsYXRlLmFwcGx5KG9wdGlvbnMsIHRoaXMpKTtcclxuICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGl0ZW1Ob2RlLmdldCgwKSk7XHJcbiAgICAgICAgJChpdGVtTm9kZSkuYXBwZW5kKCQod2lkZ2V0KVswXS5kb21Ob2RlKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyV2lkZ2V0KHdpZGdldCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKGZyYWcuY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuICAgICAgJCh0aGlzLm1ldHJpY3NOb2RlKS5hcHBlbmQoZnJhZyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVSYW5nZVdpZGdldHM6IGZ1bmN0aW9uIGNyZWF0ZVJhbmdlV2lkZ2V0cygpIHtcclxuICAgIGNvbnN0IHJhbmdlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIC8vIENoZWNrIGlmIHJhbmdlIHdpZGdldHMgYXJlIGRlc2lyZWQsIGlmIHNvIGNyZWF0ZSBhbmQgcGxhY2UgaW4gcmFuZ2VOb2RlXHJcbiAgICBpZiAodGhpcy5jcmVhdGVSYW5nZUxheW91dCkge1xyXG4gICAgICBjb25zdCByYW5nZU9wdGlvbnMgPSB0aGlzLmNyZWF0ZVJhbmdlTGF5b3V0KCkgfHwgW107XHJcbiAgICAgIHJhbmdlT3B0aW9ucy5mb3JFYWNoKChvcHRpb25zKSA9PiB7XHJcbiAgICAgICAgb3B0aW9ucy5jaGFuZ2VSYW5nZSA9IHRoaXMuY2hhbmdlUmFuZ2U7XHJcbiAgICAgICAgb3B0aW9ucy5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBEYXRlUmFuZ2VXaWRnZXQob3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgaXRlbU5vZGUgPSAkKHRoaXMucmFuZ2VJdGVtVGVtcGxhdGUuYXBwbHkob3B0aW9ucywgdGhpcykpLmdldCgwKTtcclxuICAgICAgICBpZiAob3B0aW9ucy52YWx1ZSA9PT0gdGhpcy5kYXlWYWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlID0gaXRlbU5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJhbmdlRnJhZy5hcHBlbmRDaGlsZChpdGVtTm9kZSk7XHJcbiAgICAgICAgJChpdGVtTm9kZSkuYXBwZW5kKCQod2lkZ2V0KVswXS5kb21Ob2RlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAocmFuZ2VGcmFnLmNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcbiAgICAgIGlmICghdGhpcy5zZWxlY3RlZFJhbmdlKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlID0gcmFuZ2VGcmFnLmNoaWxkTm9kZXNbMF07XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlLnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB0aGlzLmdldFNlbGVjdGVkQ29sb3IoKTtcclxuICAgICAgJCh0aGlzLnJhbmdlTm9kZSkuYXBwZW5kKHJhbmdlRnJhZyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZWJ1aWxkV2lkZ2V0czogZnVuY3Rpb24gcmVidWlsZFdpZGdldHMoZW50cnkpIHtcclxuICAgIC8vIHRoaXMuZGVzdHJveVdpZGdldHMoKTtcclxuICAgICQodGhpcy5tZXRyaWNzTm9kZSkuZW1wdHkoKTtcclxuICAgIHRoaXMubWV0cmljV2lkZ2V0cyA9IFtdO1xyXG4gICAgdGhpcy5yZWJ1aWxkVmFsdWVzKCk7XHJcbiAgICB0aGlzLmNyZWF0ZU1ldHJpY1dpZGdldHMoZW50cnkpO1xyXG4gICAgdGhpcy5nZXRRdWVyeURhdGEoKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmNvbnN0IHJ2bSA9IG5ldyBSZWxhdGVkVmlld01hbmFnZXIoKTtcclxucnZtLnJlZ2lzdGVyVHlwZSgnZGFzaGJvYXJkX3dpZGdldCcsIF9fY2xhc3MpO1xyXG5sYW5nLnNldE9iamVjdCgnY3JtLlZpZXdzLkRhc2hib2FyZFdpZGdldCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=