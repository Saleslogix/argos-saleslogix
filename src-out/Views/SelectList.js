define('crm/Views/SelectList', ['module', 'exports', 'dojo/_base/declare', 'dojo/store/Memory', 'argos/List'], function (module, exports, _declare, _Memory, _List) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Memory2 = _interopRequireDefault(_Memory);

  var _List2 = _interopRequireDefault(_List);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Views.SelectList
   *
   *
   * @extends argos.List
   *
   */
  var __class = (0, _declare2.default)('crm.Views.SelectList', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.$descriptor %}</p>']),

    // View Properties
    id: 'select_list',
    expose: false,
    enablePullToRefresh: false,
    isCardView: false,
    refreshRequiredFor: function refreshRequiredFor(options) {
      if (this.options) {
        return options ? this.options.data !== options.data : false;
      }
      return true;
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    requestData: function requestData() {
      this.store = null;
      this.inherited(requestData, arguments);
    },
    createStore: function createStore() {
      // caller is responsible for passing in a well-structured feed object.
      var data = this.expandExpression(this.options && this.options.data && this.options.data.$resources);
      var store = new _Memory2.default({
        data: data
      });
      store.idProperty = '$key';
      return store;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9TZWxlY3RMaXN0LmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImlkIiwiZXhwb3NlIiwiZW5hYmxlUHVsbFRvUmVmcmVzaCIsImlzQ2FyZFZpZXciLCJyZWZyZXNoUmVxdWlyZWRGb3IiLCJvcHRpb25zIiwiZGF0YSIsImhhc01vcmVEYXRhIiwicmVxdWVzdERhdGEiLCJzdG9yZSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNyZWF0ZVN0b3JlIiwiZXhwYW5kRXhwcmVzc2lvbiIsIiRyZXNvdXJjZXMiLCJpZFByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTs7Ozs7OztBQU9BLE1BQU1BLFVBQVUsdUJBQVEsc0JBQVIsRUFBZ0MsZ0JBQWhDLEVBQXdDO0FBQ3REO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QixzREFEeUIsQ0FBYixDQUZ3Qzs7QUFNdEQ7QUFDQUMsUUFBSSxhQVBrRDtBQVF0REMsWUFBUSxLQVI4QztBQVN0REMseUJBQXFCLEtBVGlDO0FBVXREQyxnQkFBWSxLQVYwQztBQVd0REMsd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCQyxPQUE1QixFQUFxQztBQUN2RCxVQUFJLEtBQUtBLE9BQVQsRUFBa0I7QUFDaEIsZUFBT0EsVUFBVyxLQUFLQSxPQUFMLENBQWFDLElBQWIsS0FBc0JELFFBQVFDLElBQXpDLEdBQWlELEtBQXhEO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRCxLQWhCcUQ7QUFpQnREQyxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQ2xDLGFBQU8sS0FBUDtBQUNELEtBbkJxRDtBQW9CdERDLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsV0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxXQUFLQyxTQUFMLENBQWVGLFdBQWYsRUFBNEJHLFNBQTVCO0FBQ0QsS0F2QnFEO0FBd0J0REMsaUJBQWEsU0FBU0EsV0FBVCxHQUF1QjtBQUNsQztBQUNBLFVBQU1OLE9BQU8sS0FBS08sZ0JBQUwsQ0FBc0IsS0FBS1IsT0FBTCxJQUFnQixLQUFLQSxPQUFMLENBQWFDLElBQTdCLElBQXFDLEtBQUtELE9BQUwsQ0FBYUMsSUFBYixDQUFrQlEsVUFBN0UsQ0FBYjtBQUNBLFVBQU1MLFFBQVEscUJBQVc7QUFDdkJIO0FBRHVCLE9BQVgsQ0FBZDtBQUdBRyxZQUFNTSxVQUFOLEdBQW1CLE1BQW5CO0FBQ0EsYUFBT04sS0FBUDtBQUNEO0FBaENxRCxHQUF4QyxDQUFoQixDLENBMUJBOzs7Ozs7Ozs7Ozs7Ozs7b0JBNkRlWixPIiwiZmlsZSI6IlNlbGVjdExpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTWVtb3J5IGZyb20gJ2Rvam8vc3RvcmUvTWVtb3J5JztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5TZWxlY3RMaXN0XHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuU2VsZWN0TGlzdCcsIFtMaXN0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JTogJC4kZGVzY3JpcHRvciAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3NlbGVjdF9saXN0JyxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGVuYWJsZVB1bGxUb1JlZnJlc2g6IGZhbHNlLFxyXG4gIGlzQ2FyZFZpZXc6IGZhbHNlLFxyXG4gIHJlZnJlc2hSZXF1aXJlZEZvcjogZnVuY3Rpb24gcmVmcmVzaFJlcXVpcmVkRm9yKG9wdGlvbnMpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMgPyAodGhpcy5vcHRpb25zLmRhdGEgIT09IG9wdGlvbnMuZGF0YSkgOiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgaGFzTW9yZURhdGE6IGZ1bmN0aW9uIGhhc01vcmVEYXRhKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgdGhpcy5zdG9yZSA9IG51bGw7XHJcbiAgICB0aGlzLmluaGVyaXRlZChyZXF1ZXN0RGF0YSwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIGNyZWF0ZVN0b3JlOiBmdW5jdGlvbiBjcmVhdGVTdG9yZSgpIHtcclxuICAgIC8vIGNhbGxlciBpcyByZXNwb25zaWJsZSBmb3IgcGFzc2luZyBpbiBhIHdlbGwtc3RydWN0dXJlZCBmZWVkIG9iamVjdC5cclxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmV4cGFuZEV4cHJlc3Npb24odGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5kYXRhICYmIHRoaXMub3B0aW9ucy5kYXRhLiRyZXNvdXJjZXMpO1xyXG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgTWVtb3J5KHtcclxuICAgICAgZGF0YSxcclxuICAgIH0pO1xyXG4gICAgc3RvcmUuaWRQcm9wZXJ0eSA9ICcka2V5JztcclxuICAgIHJldHVybiBzdG9yZTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==