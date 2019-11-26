define('crm/Views/Activity/MyDay', ['module', 'exports', 'dojo/_base/declare', '../_RightDrawerListMixin', '../_MetricListMixin', '../../Models/Names', './MyList', './MyDayOffline', 'argos/I18n'], function (module, exports, _declare, _RightDrawerListMixin2, _MetricListMixin2, _Names, _MyList, _MyDayOffline, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _MyList2 = _interopRequireDefault(_MyList);

  var _MyDayOffline2 = _interopRequireDefault(_MyDayOffline);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('activityMyDay');

  /**
   * @class crm.Views.Activity.MyDay
   *
   * @requires argos._ListBase
   * @requires argos.Format
   * @requires argos.Utility
   * @requires argos.Convert
   * @requires argos.ErrorManager
   *
   * @requires crm.Format
   * @requires crm.Environment
   * @requires crm.Views.Activity.List
   * @requires crm.Action
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

  var __class = (0, _declare2.default)('crm.Views.Activity.MyDay', [_MyList2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], {

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'myday_list',
    resourceKind: 'userActivities',
    modelName: _Names2.default.USERACTIVITY,
    enableSearch: false,
    pageSize: 105,
    queryModelName: 'myday',
    enableOfflineSupport: true,

    _onRefresh: function _onRefresh(options) {
      this.inherited(_onRefresh, arguments);
      if (options.resourceKind === 'activities') {
        this.refreshRequired = true;
      }
    },

    show: function show(options) {
      if (!App.onLine) {
        this._showOfflineView(options);
        return;
      }
      this.inherited(show, arguments);
    },
    _showOfflineView: function _showOfflineView(options) {
      var view = App.getView('myday_offline_list');
      if (!view) {
        view = new _MyDayOffline2.default();
        App.registerView(view);
      }

      view = App.getView('myday_offline_list');
      if (view) {
        view.show(options);
      }
    },
    createToolLayout: function createToolLayout() {
      this.inherited(createToolLayout, arguments);
      if (this.tools && this.tools.tbar && !this._refreshAdded && !window.App.supportsTouch()) {
        this.tools.tbar.push({
          id: 'refresh',
          svg: 'refresh',
          action: '_refreshClicked'
        });

        this._refreshAdded = true;
      }

      return this.tools;
    },
    _refreshAdded: false,
    _refreshClicked: function _refreshClicked() {
      this.clear();
      this.refreshRequired = true;
      this.refresh();

      // Hook for customizers
      this.onRefreshClicked();
    },
    onRefreshClicked: function onRefreshClicked() {},
    _getCurrentQuery: function _getCurrentQuery(options) {
      var myDayQuery = this._model.getMyDayQuery();
      var optionsQuery = options && options.queryArgs && options.queryArgs.activeFilter;
      return [myDayQuery, optionsQuery].filter(function (item) {
        return !!item;
      }).join(' and ');
    },
    allowSelection: true,
    enableActions: true,
    hashTagQueriesText: {}
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9NeURheS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJpZCIsInJlc291cmNlS2luZCIsIm1vZGVsTmFtZSIsIlVTRVJBQ1RJVklUWSIsImVuYWJsZVNlYXJjaCIsInBhZ2VTaXplIiwicXVlcnlNb2RlbE5hbWUiLCJlbmFibGVPZmZsaW5lU3VwcG9ydCIsIl9vblJlZnJlc2giLCJvcHRpb25zIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwicmVmcmVzaFJlcXVpcmVkIiwic2hvdyIsIkFwcCIsIm9uTGluZSIsIl9zaG93T2ZmbGluZVZpZXciLCJ2aWV3IiwiZ2V0VmlldyIsInJlZ2lzdGVyVmlldyIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsInRiYXIiLCJfcmVmcmVzaEFkZGVkIiwid2luZG93Iiwic3VwcG9ydHNUb3VjaCIsInB1c2giLCJzdmciLCJhY3Rpb24iLCJfcmVmcmVzaENsaWNrZWQiLCJjbGVhciIsInJlZnJlc2giLCJvblJlZnJlc2hDbGlja2VkIiwiX2dldEN1cnJlbnRRdWVyeSIsIm15RGF5UXVlcnkiLCJfbW9kZWwiLCJnZXRNeURheVF1ZXJ5Iiwib3B0aW9uc1F1ZXJ5IiwicXVlcnlBcmdzIiwiYWN0aXZlRmlsdGVyIiwiZmlsdGVyIiwiaXRlbSIsImpvaW4iLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJoYXNoVGFnUXVlcmllc1RleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsV0FBVyxvQkFBWSxlQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQXpCQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUNBLE1BQU1DLFVBQVUsdUJBQVEsMEJBQVIsRUFBb0MsNkVBQXBDLEVBQXVGOztBQUVyRztBQUNBQyxlQUFXRixTQUFTRSxTQUhpRjs7QUFLckc7QUFDQUMsUUFBSSxZQU5pRztBQU9yR0Msa0JBQWMsZ0JBUHVGO0FBUXJHQyxlQUFXLGdCQUFZQyxZQVI4RTtBQVNyR0Msa0JBQWMsS0FUdUY7QUFVckdDLGNBQVUsR0FWMkY7QUFXckdDLG9CQUFnQixPQVhxRjtBQVlyR0MsMEJBQXNCLElBWitFOztBQWNyR0MsZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkMsT0FBcEIsRUFBNkI7QUFDdkMsV0FBS0MsU0FBTCxDQUFlRixVQUFmLEVBQTJCRyxTQUEzQjtBQUNBLFVBQUlGLFFBQVFSLFlBQVIsS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsYUFBS1csZUFBTCxHQUF1QixJQUF2QjtBQUNEO0FBQ0YsS0FuQm9HOztBQXFCckdDLFVBQU0sU0FBU0EsSUFBVCxDQUFjSixPQUFkLEVBQXVCO0FBQzNCLFVBQUksQ0FBQ0ssSUFBSUMsTUFBVCxFQUFpQjtBQUNmLGFBQUtDLGdCQUFMLENBQXNCUCxPQUF0QjtBQUNBO0FBQ0Q7QUFDRCxXQUFLQyxTQUFMLENBQWVHLElBQWYsRUFBcUJGLFNBQXJCO0FBQ0QsS0EzQm9HO0FBNEJyR0ssc0JBQWtCLFNBQVNBLGdCQUFULENBQTBCUCxPQUExQixFQUFtQztBQUNuRCxVQUFJUSxPQUFPSCxJQUFJSSxPQUFKLENBQVksb0JBQVosQ0FBWDtBQUNBLFVBQUksQ0FBQ0QsSUFBTCxFQUFXO0FBQ1RBLGVBQU8sNEJBQVA7QUFDQUgsWUFBSUssWUFBSixDQUFpQkYsSUFBakI7QUFDRDs7QUFFREEsYUFBT0gsSUFBSUksT0FBSixDQUFZLG9CQUFaLENBQVA7QUFDQSxVQUFJRCxJQUFKLEVBQVU7QUFDUkEsYUFBS0osSUFBTCxDQUFVSixPQUFWO0FBQ0Q7QUFDRixLQXZDb0c7QUF3Q3JHVyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFDNUMsV0FBS1YsU0FBTCxDQUFlVSxnQkFBZixFQUFpQ1QsU0FBakM7QUFDQSxVQUFJLEtBQUtVLEtBQUwsSUFBYyxLQUFLQSxLQUFMLENBQVdDLElBQXpCLElBQWlDLENBQUMsS0FBS0MsYUFBdkMsSUFBd0QsQ0FBQ0MsT0FBT1YsR0FBUCxDQUFXVyxhQUFYLEVBQTdELEVBQXlGO0FBQ3ZGLGFBQUtKLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQkksSUFBaEIsQ0FBcUI7QUFDbkIxQixjQUFJLFNBRGU7QUFFbkIyQixlQUFLLFNBRmM7QUFHbkJDLGtCQUFRO0FBSFcsU0FBckI7O0FBTUEsYUFBS0wsYUFBTCxHQUFxQixJQUFyQjtBQUNEOztBQUVELGFBQU8sS0FBS0YsS0FBWjtBQUNELEtBckRvRztBQXNEckdFLG1CQUFlLEtBdERzRjtBQXVEckdNLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLFdBQUtDLEtBQUw7QUFDQSxXQUFLbEIsZUFBTCxHQUF1QixJQUF2QjtBQUNBLFdBQUttQixPQUFMOztBQUVBO0FBQ0EsV0FBS0MsZ0JBQUw7QUFDRCxLQTlEb0c7QUErRHJHQSxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEIsQ0FBRSxDQS9EcUQ7QUFnRXJHQyxzQkFBa0IsU0FBU0EsZ0JBQVQsQ0FBMEJ4QixPQUExQixFQUFtQztBQUNuRCxVQUFNeUIsYUFBYSxLQUFLQyxNQUFMLENBQVlDLGFBQVosRUFBbkI7QUFDQSxVQUFNQyxlQUFlNUIsV0FBV0EsUUFBUTZCLFNBQW5CLElBQWdDN0IsUUFBUTZCLFNBQVIsQ0FBa0JDLFlBQXZFO0FBQ0EsYUFBTyxDQUFDTCxVQUFELEVBQWFHLFlBQWIsRUFBMkJHLE1BQTNCLENBQWtDLFVBQUNDLElBQUQsRUFBVTtBQUNqRCxlQUFPLENBQUMsQ0FBQ0EsSUFBVDtBQUNELE9BRk0sRUFHSkMsSUFISSxDQUdDLE9BSEQsQ0FBUDtBQUlELEtBdkVvRztBQXdFckdDLG9CQUFnQixJQXhFcUY7QUF5RXJHQyxtQkFBZSxJQXpFc0Y7QUEwRXJHQyx3QkFBb0I7QUExRWlGLEdBQXZGLENBQWhCOztvQkE2RWUvQyxPIiwiZmlsZSI6Ik15RGF5LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICcuLi9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX01ldHJpY0xpc3RNaXhpbiBmcm9tICcuLi9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBNeUxpc3QgZnJvbSAnLi9NeUxpc3QnO1xyXG5pbXBvcnQgTXlEYXlPZmZsaW5lIGZyb20gJy4vTXlEYXlPZmZsaW5lJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlNeURheScpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWN0aXZpdHkuTXlEYXlcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLl9MaXN0QmFzZVxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5Db252ZXJ0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FcnJvck1hbmFnZXJcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5FbnZpcm9ubWVudFxyXG4gKiBAcmVxdWlyZXMgY3JtLlZpZXdzLkFjdGl2aXR5Lkxpc3RcclxuICogQHJlcXVpcmVzIGNybS5BY3Rpb25cclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWN0aXZpdHkuTXlEYXknLCBbTXlMaXN0LCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4sIF9NZXRyaWNMaXN0TWl4aW5dLCB7XHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ215ZGF5X2xpc3QnLFxyXG4gIHJlc291cmNlS2luZDogJ3VzZXJBY3Rpdml0aWVzJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlVTRVJBQ1RJVklUWSxcclxuICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gIHBhZ2VTaXplOiAxMDUsXHJcbiAgcXVlcnlNb2RlbE5hbWU6ICdteWRheScsXHJcbiAgZW5hYmxlT2ZmbGluZVN1cHBvcnQ6IHRydWUsXHJcblxyXG4gIF9vblJlZnJlc2g6IGZ1bmN0aW9uIF9vblJlZnJlc2gob3B0aW9ucykge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoX29uUmVmcmVzaCwgYXJndW1lbnRzKTtcclxuICAgIGlmIChvcHRpb25zLnJlc291cmNlS2luZCA9PT0gJ2FjdGl2aXRpZXMnKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaG93OiBmdW5jdGlvbiBzaG93KG9wdGlvbnMpIHtcclxuICAgIGlmICghQXBwLm9uTGluZSkge1xyXG4gICAgICB0aGlzLl9zaG93T2ZmbGluZVZpZXcob3B0aW9ucyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKHNob3csIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfc2hvd09mZmxpbmVWaWV3OiBmdW5jdGlvbiBfc2hvd09mZmxpbmVWaWV3KG9wdGlvbnMpIHtcclxuICAgIGxldCB2aWV3ID0gQXBwLmdldFZpZXcoJ215ZGF5X29mZmxpbmVfbGlzdCcpO1xyXG4gICAgaWYgKCF2aWV3KSB7XHJcbiAgICAgIHZpZXcgPSBuZXcgTXlEYXlPZmZsaW5lKCk7XHJcbiAgICAgIEFwcC5yZWdpc3RlclZpZXcodmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmlldyA9IEFwcC5nZXRWaWV3KCdteWRheV9vZmZsaW5lX2xpc3QnKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChjcmVhdGVUb29sTGF5b3V0LCBhcmd1bWVudHMpO1xyXG4gICAgaWYgKHRoaXMudG9vbHMgJiYgdGhpcy50b29scy50YmFyICYmICF0aGlzLl9yZWZyZXNoQWRkZWQgJiYgIXdpbmRvdy5BcHAuc3VwcG9ydHNUb3VjaCgpKSB7XHJcbiAgICAgIHRoaXMudG9vbHMudGJhci5wdXNoKHtcclxuICAgICAgICBpZDogJ3JlZnJlc2gnLFxyXG4gICAgICAgIHN2ZzogJ3JlZnJlc2gnLFxyXG4gICAgICAgIGFjdGlvbjogJ19yZWZyZXNoQ2xpY2tlZCcsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5fcmVmcmVzaEFkZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy50b29scztcclxuICB9LFxyXG4gIF9yZWZyZXNoQWRkZWQ6IGZhbHNlLFxyXG4gIF9yZWZyZXNoQ2xpY2tlZDogZnVuY3Rpb24gX3JlZnJlc2hDbGlja2VkKCkge1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcblxyXG4gICAgLy8gSG9vayBmb3IgY3VzdG9taXplcnNcclxuICAgIHRoaXMub25SZWZyZXNoQ2xpY2tlZCgpO1xyXG4gIH0sXHJcbiAgb25SZWZyZXNoQ2xpY2tlZDogZnVuY3Rpb24gb25SZWZyZXNoQ2xpY2tlZCgpIHt9LFxyXG4gIF9nZXRDdXJyZW50UXVlcnk6IGZ1bmN0aW9uIF9nZXRDdXJyZW50UXVlcnkob3B0aW9ucykge1xyXG4gICAgY29uc3QgbXlEYXlRdWVyeSA9IHRoaXMuX21vZGVsLmdldE15RGF5UXVlcnkoKTtcclxuICAgIGNvbnN0IG9wdGlvbnNRdWVyeSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5xdWVyeUFyZ3MgJiYgb3B0aW9ucy5xdWVyeUFyZ3MuYWN0aXZlRmlsdGVyO1xyXG4gICAgcmV0dXJuIFtteURheVF1ZXJ5LCBvcHRpb25zUXVlcnldLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gISFpdGVtO1xyXG4gICAgfSlcclxuICAgICAgLmpvaW4oJyBhbmQgJyk7XHJcbiAgfSxcclxuICBhbGxvd1NlbGVjdGlvbjogdHJ1ZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIGhhc2hUYWdRdWVyaWVzVGV4dDoge30sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19