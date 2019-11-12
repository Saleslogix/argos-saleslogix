define('crm/Views/Configure', ['module', 'exports', 'dojo/_base/declare', 'dojo/store/Memory', 'argos/_ConfigureBase', 'argos/I18n'], function (module, exports, _declare, _Memory, _ConfigureBase2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Memory2 = _interopRequireDefault(_Memory);

  var _ConfigureBase3 = _interopRequireDefault(_ConfigureBase2);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('configure');

  /**
   * @class crm.Views.Configure
   *
   *
   * @extends argos._ConfigureBase
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Configure', [_ConfigureBase3.default], {
    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'configure',
    idProperty: '$key',
    labelProperty: '$descriptor',

    onSave: function onSave() {
      App.preferences.home = App.preferences.home || {};
      App.preferences.configure = App.preferences.configure || {};

      App.preferences.configure.order = this.getOrderedKeys();
      App.preferences.home.visible = this.getSelectedKeys();

      App.persistPreferences();

      ReUI.back();
      var view = App.getView('left_drawer');
      if (view) {
        view.refresh();
      }
    },
    createStore: function createStore() {
      var exposed = App.getExposedViews();
      var order = this.getSavedOrderedKeys();
      var list = [];

      // De-dup id's
      var all = order.concat(exposed);
      var reduced = all.reduce(function (previous, current) {
        if (previous.indexOf(current) === -1) {
          previous.push(current);
        }

        return previous;
      }, []);

      // The order array could have had stale id's, filter out valid views here
      reduced = reduced.filter(function (key) {
        var view = App.getView(key);
        return view && typeof view.getSecurity === 'function' && App.hasAccessTo(view.getSecurity()) && exposed.indexOf(key) !== -1;
      });

      list = reduced.map(function (key) {
        var view = App.getView(key);
        return {
          $key: view.id,
          $descriptor: view.titleText,
          icon: view.icon
        };
      });

      return (0, _Memory2.default)({ // eslint-disable-line
        data: list
      });
    },
    getSavedOrderedKeys: function getSavedOrderedKeys() {
      return App.preferences.configure && App.preferences.configure.order || [];
    },
    getSavedSelectedKeys: function getSavedSelectedKeys() {
      return App.preferences.home && App.preferences.home.visible || [];
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9Db25maWd1cmUuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwiaWQiLCJpZFByb3BlcnR5IiwibGFiZWxQcm9wZXJ0eSIsIm9uU2F2ZSIsIkFwcCIsInByZWZlcmVuY2VzIiwiaG9tZSIsImNvbmZpZ3VyZSIsIm9yZGVyIiwiZ2V0T3JkZXJlZEtleXMiLCJ2aXNpYmxlIiwiZ2V0U2VsZWN0ZWRLZXlzIiwicGVyc2lzdFByZWZlcmVuY2VzIiwiUmVVSSIsImJhY2siLCJ2aWV3IiwiZ2V0VmlldyIsInJlZnJlc2giLCJjcmVhdGVTdG9yZSIsImV4cG9zZWQiLCJnZXRFeHBvc2VkVmlld3MiLCJnZXRTYXZlZE9yZGVyZWRLZXlzIiwibGlzdCIsImFsbCIsImNvbmNhdCIsInJlZHVjZWQiLCJyZWR1Y2UiLCJwcmV2aW91cyIsImN1cnJlbnQiLCJpbmRleE9mIiwicHVzaCIsImZpbHRlciIsImtleSIsImdldFNlY3VyaXR5IiwiaGFzQWNjZXNzVG8iLCJtYXAiLCIka2V5IiwiJGRlc2NyaXB0b3IiLCJpY29uIiwiZGF0YSIsImdldFNhdmVkU2VsZWN0ZWRLZXlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLFdBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFPQSxNQUFNQyxVQUFVLHVCQUFRLHFCQUFSLEVBQStCLHlCQUEvQixFQUFpRDtBQUMvRDtBQUNBQyxlQUFXRixTQUFTRSxTQUYyQzs7QUFJL0Q7QUFDQUMsUUFBSSxXQUwyRDtBQU0vREMsZ0JBQVksTUFObUQ7QUFPL0RDLG1CQUFlLGFBUGdEOztBQVMvREMsWUFBUSxTQUFTQSxNQUFULEdBQWtCO0FBQ3hCQyxVQUFJQyxXQUFKLENBQWdCQyxJQUFoQixHQUF1QkYsSUFBSUMsV0FBSixDQUFnQkMsSUFBaEIsSUFBd0IsRUFBL0M7QUFDQUYsVUFBSUMsV0FBSixDQUFnQkUsU0FBaEIsR0FBNEJILElBQUlDLFdBQUosQ0FBZ0JFLFNBQWhCLElBQTZCLEVBQXpEOztBQUVBSCxVQUFJQyxXQUFKLENBQWdCRSxTQUFoQixDQUEwQkMsS0FBMUIsR0FBa0MsS0FBS0MsY0FBTCxFQUFsQztBQUNBTCxVQUFJQyxXQUFKLENBQWdCQyxJQUFoQixDQUFxQkksT0FBckIsR0FBK0IsS0FBS0MsZUFBTCxFQUEvQjs7QUFFQVAsVUFBSVEsa0JBQUo7O0FBRUFDLFdBQUtDLElBQUw7QUFDQSxVQUFNQyxPQUFPWCxJQUFJWSxPQUFKLENBQVksYUFBWixDQUFiO0FBQ0EsVUFBSUQsSUFBSixFQUFVO0FBQ1JBLGFBQUtFLE9BQUw7QUFDRDtBQUNGLEtBdkI4RDtBQXdCL0RDLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsVUFBTUMsVUFBVWYsSUFBSWdCLGVBQUosRUFBaEI7QUFDQSxVQUFNWixRQUFRLEtBQUthLG1CQUFMLEVBQWQ7QUFDQSxVQUFJQyxPQUFPLEVBQVg7O0FBRUE7QUFDQSxVQUFNQyxNQUFNZixNQUFNZ0IsTUFBTixDQUFhTCxPQUFiLENBQVo7QUFDQSxVQUFJTSxVQUFVRixJQUFJRyxNQUFKLENBQVcsVUFBQ0MsUUFBRCxFQUFXQyxPQUFYLEVBQXVCO0FBQzlDLFlBQUlELFNBQVNFLE9BQVQsQ0FBaUJELE9BQWpCLE1BQThCLENBQUMsQ0FBbkMsRUFBc0M7QUFDcENELG1CQUFTRyxJQUFULENBQWNGLE9BQWQ7QUFDRDs7QUFFRCxlQUFPRCxRQUFQO0FBQ0QsT0FOYSxFQU1YLEVBTlcsQ0FBZDs7QUFRQTtBQUNBRixnQkFBVUEsUUFBUU0sTUFBUixDQUFlLFVBQUNDLEdBQUQsRUFBUztBQUNoQyxZQUFNakIsT0FBT1gsSUFBSVksT0FBSixDQUFZZ0IsR0FBWixDQUFiO0FBQ0EsZUFBT2pCLFFBQVEsT0FBT0EsS0FBS2tCLFdBQVosS0FBNEIsVUFBcEMsSUFBa0Q3QixJQUFJOEIsV0FBSixDQUFnQm5CLEtBQUtrQixXQUFMLEVBQWhCLENBQWxELElBQXlGZCxRQUFRVSxPQUFSLENBQWdCRyxHQUFoQixNQUF5QixDQUFDLENBQTFIO0FBQ0QsT0FIUyxDQUFWOztBQUtBVixhQUFPRyxRQUFRVSxHQUFSLENBQVksVUFBQ0gsR0FBRCxFQUFTO0FBQzFCLFlBQU1qQixPQUFPWCxJQUFJWSxPQUFKLENBQVlnQixHQUFaLENBQWI7QUFDQSxlQUFPO0FBQ0xJLGdCQUFNckIsS0FBS2YsRUFETjtBQUVMcUMsdUJBQWF0QixLQUFLaEIsU0FGYjtBQUdMdUMsZ0JBQU12QixLQUFLdUI7QUFITixTQUFQO0FBS0QsT0FQTSxDQUFQOztBQVNBLGFBQU8sc0JBQU8sRUFBRTtBQUNkQyxjQUFNakI7QUFETSxPQUFQLENBQVA7QUFHRCxLQXpEOEQ7QUEwRC9ERCx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsYUFBUWpCLElBQUlDLFdBQUosQ0FBZ0JFLFNBQWhCLElBQTZCSCxJQUFJQyxXQUFKLENBQWdCRSxTQUFoQixDQUEwQkMsS0FBeEQsSUFBa0UsRUFBekU7QUFDRCxLQTVEOEQ7QUE2RC9EZ0MsMEJBQXNCLFNBQVNBLG9CQUFULEdBQWdDO0FBQ3BELGFBQVFwQyxJQUFJQyxXQUFKLENBQWdCQyxJQUFoQixJQUF3QkYsSUFBSUMsV0FBSixDQUFnQkMsSUFBaEIsQ0FBcUJJLE9BQTlDLElBQTBELEVBQWpFO0FBQ0Q7QUEvRDhELEdBQWpELENBQWhCOztvQkFrRWVaLE8iLCJmaWxlIjoiQ29uZmlndXJlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IE1lbW9yeSBmcm9tICdkb2pvL3N0b3JlL01lbW9yeSc7XHJcbmltcG9ydCBfQ29uZmlndXJlQmFzZSBmcm9tICdhcmdvcy9fQ29uZmlndXJlQmFzZSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NvbmZpZ3VyZScpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQ29uZmlndXJlXHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLl9Db25maWd1cmVCYXNlXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkNvbmZpZ3VyZScsIFtfQ29uZmlndXJlQmFzZV0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdjb25maWd1cmUnLFxyXG4gIGlkUHJvcGVydHk6ICcka2V5JyxcclxuICBsYWJlbFByb3BlcnR5OiAnJGRlc2NyaXB0b3InLFxyXG5cclxuICBvblNhdmU6IGZ1bmN0aW9uIG9uU2F2ZSgpIHtcclxuICAgIEFwcC5wcmVmZXJlbmNlcy5ob21lID0gQXBwLnByZWZlcmVuY2VzLmhvbWUgfHwge307XHJcbiAgICBBcHAucHJlZmVyZW5jZXMuY29uZmlndXJlID0gQXBwLnByZWZlcmVuY2VzLmNvbmZpZ3VyZSB8fCB7fTtcclxuXHJcbiAgICBBcHAucHJlZmVyZW5jZXMuY29uZmlndXJlLm9yZGVyID0gdGhpcy5nZXRPcmRlcmVkS2V5cygpO1xyXG4gICAgQXBwLnByZWZlcmVuY2VzLmhvbWUudmlzaWJsZSA9IHRoaXMuZ2V0U2VsZWN0ZWRLZXlzKCk7XHJcblxyXG4gICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG5cclxuICAgIFJlVUkuYmFjaygpO1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdsZWZ0X2RyYXdlcicpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVTdG9yZTogZnVuY3Rpb24gY3JlYXRlU3RvcmUoKSB7XHJcbiAgICBjb25zdCBleHBvc2VkID0gQXBwLmdldEV4cG9zZWRWaWV3cygpO1xyXG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLmdldFNhdmVkT3JkZXJlZEtleXMoKTtcclxuICAgIGxldCBsaXN0ID0gW107XHJcblxyXG4gICAgLy8gRGUtZHVwIGlkJ3NcclxuICAgIGNvbnN0IGFsbCA9IG9yZGVyLmNvbmNhdChleHBvc2VkKTtcclxuICAgIGxldCByZWR1Y2VkID0gYWxsLnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IHtcclxuICAgICAgaWYgKHByZXZpb3VzLmluZGV4T2YoY3VycmVudCkgPT09IC0xKSB7XHJcbiAgICAgICAgcHJldmlvdXMucHVzaChjdXJyZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHByZXZpb3VzO1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIC8vIFRoZSBvcmRlciBhcnJheSBjb3VsZCBoYXZlIGhhZCBzdGFsZSBpZCdzLCBmaWx0ZXIgb3V0IHZhbGlkIHZpZXdzIGhlcmVcclxuICAgIHJlZHVjZWQgPSByZWR1Y2VkLmZpbHRlcigoa2V5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldyhrZXkpO1xyXG4gICAgICByZXR1cm4gdmlldyAmJiB0eXBlb2Ygdmlldy5nZXRTZWN1cml0eSA9PT0gJ2Z1bmN0aW9uJyAmJiBBcHAuaGFzQWNjZXNzVG8odmlldy5nZXRTZWN1cml0eSgpKSAmJiBleHBvc2VkLmluZGV4T2Yoa2V5KSAhPT0gLTE7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsaXN0ID0gcmVkdWNlZC5tYXAoKGtleSkgPT4ge1xyXG4gICAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoa2V5KTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAka2V5OiB2aWV3LmlkLFxyXG4gICAgICAgICRkZXNjcmlwdG9yOiB2aWV3LnRpdGxlVGV4dCxcclxuICAgICAgICBpY29uOiB2aWV3Lmljb24sXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTWVtb3J5KHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICBkYXRhOiBsaXN0LFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRTYXZlZE9yZGVyZWRLZXlzOiBmdW5jdGlvbiBnZXRTYXZlZE9yZGVyZWRLZXlzKCkge1xyXG4gICAgcmV0dXJuIChBcHAucHJlZmVyZW5jZXMuY29uZmlndXJlICYmIEFwcC5wcmVmZXJlbmNlcy5jb25maWd1cmUub3JkZXIpIHx8IFtdO1xyXG4gIH0sXHJcbiAgZ2V0U2F2ZWRTZWxlY3RlZEtleXM6IGZ1bmN0aW9uIGdldFNhdmVkU2VsZWN0ZWRLZXlzKCkge1xyXG4gICAgcmV0dXJuIChBcHAucHJlZmVyZW5jZXMuaG9tZSAmJiBBcHAucHJlZmVyZW5jZXMuaG9tZS52aXNpYmxlKSB8fCBbXTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==