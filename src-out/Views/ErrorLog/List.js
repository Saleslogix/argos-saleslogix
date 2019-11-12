define('crm/Views/ErrorLog/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/store/Memory', 'argos/Convert', 'argos/ErrorManager', 'argos/_ListBase', 'argos/I18n'], function (module, exports, _declare, _Memory, _Convert, _ErrorManager, _ListBase, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Memory2 = _interopRequireDefault(_Memory);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _ListBase2 = _interopRequireDefault(_ListBase);

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

  var resource = (0, _I18n2.default)('errorLogList');
  var dtFormatResource = (0, _I18n2.default)('errorLogListDateTimeFormat');

  /**
   * @class crm.Views.ErrorLog.List
   *
   * @extends argos.List
   *
   * @requires crm.Format
   * @requires argos.ErrorManager
   */
  var __class = (0, _declare2.default)('crm.Views.ErrorLog.List', [_ListBase2.default], {
    // Localization
    titleText: resource.titleText,
    errorDateFormatText: dtFormatResource.errorDateFormatText,
    errorDateFormatText24: dtFormatResource.errorDateFormatText24,

    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: crm.Format.date($.Date, (App.is24HourClock()) ? $$.errorDateFormatText24 : $$.errorDateFormatText) %}</p>']),

    // View Properties
    id: 'errorlog_list',
    enableSearch: false,
    enablePullToRefresh: false,
    hideSearch: true,
    expose: false,
    detailView: 'errorlog_detail',
    idProperty: '$key',
    labelProperty: 'Description',

    _onRefresh: function _onRefresh(o) {
      this.inherited(arguments);
      if (o.resourceKind === 'errorlogs' || o.resourceKind === 'localStorage') {
        this.refreshRequired = true;
      }
    },
    createStore: function createStore() {
      var errorItems = _ErrorManager2.default.getAllErrors();

      errorItems.sort(function (a, b) {
        a.errorDateStamp = a.errorDateStamp || a.Date;
        b.errorDateStamp = b.errorDateStamp || b.Date;
        a.Date = a.errorDateStamp;
        b.Date = b.errorDateStamp;
        var A = _Convert2.default.toDateFromString(a.errorDateStamp);
        var B = _Convert2.default.toDateFromString(b.errorDateStamp);

        return A.valueOf() > B.valueOf();
      });

      return new _Memory2.default({
        data: errorItems,
        idProperty: this.idProperty
      });
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9FcnJvckxvZy9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJlcnJvckRhdGVGb3JtYXRUZXh0IiwiZXJyb3JEYXRlRm9ybWF0VGV4dDI0IiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpZCIsImVuYWJsZVNlYXJjaCIsImVuYWJsZVB1bGxUb1JlZnJlc2giLCJoaWRlU2VhcmNoIiwiZXhwb3NlIiwiZGV0YWlsVmlldyIsImlkUHJvcGVydHkiLCJsYWJlbFByb3BlcnR5IiwiX29uUmVmcmVzaCIsIm8iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJyZXNvdXJjZUtpbmQiLCJyZWZyZXNoUmVxdWlyZWQiLCJjcmVhdGVTdG9yZSIsImVycm9ySXRlbXMiLCJnZXRBbGxFcnJvcnMiLCJzb3J0IiwiYSIsImIiLCJlcnJvckRhdGVTdGFtcCIsIkRhdGUiLCJBIiwidG9EYXRlRnJvbVN0cmluZyIsIkIiLCJ2YWx1ZU9mIiwiZGF0YSIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsInRiYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxXQUFXLG9CQUFZLGNBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksNEJBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7O0FBUUEsTUFBTUMsVUFBVSx1QkFBUSx5QkFBUixFQUFtQyxvQkFBbkMsRUFBMkM7QUFDekQ7QUFDQUMsZUFBV0gsU0FBU0csU0FGcUM7QUFHekRDLHlCQUFxQkgsaUJBQWlCRyxtQkFIbUI7QUFJekRDLDJCQUF1QkosaUJBQWlCSSxxQkFKaUI7O0FBTXpEO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QiwySUFEeUIsQ0FBYixDQVAyQzs7QUFXekQ7QUFDQUMsUUFBSSxlQVpxRDtBQWF6REMsa0JBQWMsS0FiMkM7QUFjekRDLHlCQUFxQixLQWRvQztBQWV6REMsZ0JBQVksSUFmNkM7QUFnQnpEQyxZQUFRLEtBaEJpRDtBQWlCekRDLGdCQUFZLGlCQWpCNkM7QUFrQnpEQyxnQkFBWSxNQWxCNkM7QUFtQnpEQyxtQkFBZSxhQW5CMEM7O0FBcUJ6REMsZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkMsQ0FBcEIsRUFBdUI7QUFDakMsV0FBS0MsU0FBTCxDQUFlQyxTQUFmO0FBQ0EsVUFBSUYsRUFBRUcsWUFBRixLQUFtQixXQUFuQixJQUFrQ0gsRUFBRUcsWUFBRixLQUFtQixjQUF6RCxFQUF5RTtBQUN2RSxhQUFLQyxlQUFMLEdBQXVCLElBQXZCO0FBQ0Q7QUFDRixLQTFCd0Q7QUEyQnpEQyxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQ2xDLFVBQU1DLGFBQWEsdUJBQWFDLFlBQWIsRUFBbkI7O0FBRUFELGlCQUFXRSxJQUFYLENBQWdCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ3hCRCxVQUFFRSxjQUFGLEdBQW1CRixFQUFFRSxjQUFGLElBQW9CRixFQUFFRyxJQUF6QztBQUNBRixVQUFFQyxjQUFGLEdBQW1CRCxFQUFFQyxjQUFGLElBQW9CRCxFQUFFRSxJQUF6QztBQUNBSCxVQUFFRyxJQUFGLEdBQVNILEVBQUVFLGNBQVg7QUFDQUQsVUFBRUUsSUFBRixHQUFTRixFQUFFQyxjQUFYO0FBQ0EsWUFBTUUsSUFBSSxrQkFBUUMsZ0JBQVIsQ0FBeUJMLEVBQUVFLGNBQTNCLENBQVY7QUFDQSxZQUFNSSxJQUFJLGtCQUFRRCxnQkFBUixDQUF5QkosRUFBRUMsY0FBM0IsQ0FBVjs7QUFFQSxlQUFPRSxFQUFFRyxPQUFGLEtBQWNELEVBQUVDLE9BQUYsRUFBckI7QUFDRCxPQVREOztBQVdBLGFBQU8scUJBQVc7QUFDaEJDLGNBQU1YLFVBRFU7QUFFaEJULG9CQUFZLEtBQUtBO0FBRkQsT0FBWCxDQUFQO0FBSUQsS0E3Q3dEO0FBOEN6RHFCLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxhQUFPLEtBQUtDLEtBQUwsS0FBZSxLQUFLQSxLQUFMLEdBQWE7QUFDakNDLGNBQU07QUFEMkIsT0FBNUIsQ0FBUDtBQUdEO0FBbER3RCxHQUEzQyxDQUFoQjs7b0JBcURlbkMsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IE1lbW9yeSBmcm9tICdkb2pvL3N0b3JlL01lbW9yeSc7XHJcbmltcG9ydCBjb252ZXJ0IGZyb20gJ2FyZ29zL0NvbnZlcnQnO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL19MaXN0QmFzZSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2Vycm9yTG9nTGlzdCcpO1xyXG5jb25zdCBkdEZvcm1hdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2Vycm9yTG9nTGlzdERhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5FcnJvckxvZy5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGFyZ29zLkVycm9yTWFuYWdlclxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5FcnJvckxvZy5MaXN0JywgW0xpc3RdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgZXJyb3JEYXRlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5lcnJvckRhdGVGb3JtYXRUZXh0LFxyXG4gIGVycm9yRGF0ZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5lcnJvckRhdGVGb3JtYXRUZXh0MjQsXHJcblxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JTogY3JtLkZvcm1hdC5kYXRlKCQuRGF0ZSwgKEFwcC5pczI0SG91ckNsb2NrKCkpID8gJCQuZXJyb3JEYXRlRm9ybWF0VGV4dDI0IDogJCQuZXJyb3JEYXRlRm9ybWF0VGV4dCkgJX08L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnJvcmxvZ19saXN0JyxcclxuICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gIGVuYWJsZVB1bGxUb1JlZnJlc2g6IGZhbHNlLFxyXG4gIGhpZGVTZWFyY2g6IHRydWUsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBkZXRhaWxWaWV3OiAnZXJyb3Jsb2dfZGV0YWlsJyxcclxuICBpZFByb3BlcnR5OiAnJGtleScsXHJcbiAgbGFiZWxQcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuXHJcbiAgX29uUmVmcmVzaDogZnVuY3Rpb24gX29uUmVmcmVzaChvKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKG8ucmVzb3VyY2VLaW5kID09PSAnZXJyb3Jsb2dzJyB8fCBvLnJlc291cmNlS2luZCA9PT0gJ2xvY2FsU3RvcmFnZScpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlU3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xyXG4gICAgY29uc3QgZXJyb3JJdGVtcyA9IEVycm9yTWFuYWdlci5nZXRBbGxFcnJvcnMoKTtcclxuXHJcbiAgICBlcnJvckl0ZW1zLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgYS5lcnJvckRhdGVTdGFtcCA9IGEuZXJyb3JEYXRlU3RhbXAgfHwgYS5EYXRlO1xyXG4gICAgICBiLmVycm9yRGF0ZVN0YW1wID0gYi5lcnJvckRhdGVTdGFtcCB8fCBiLkRhdGU7XHJcbiAgICAgIGEuRGF0ZSA9IGEuZXJyb3JEYXRlU3RhbXA7XHJcbiAgICAgIGIuRGF0ZSA9IGIuZXJyb3JEYXRlU3RhbXA7XHJcbiAgICAgIGNvbnN0IEEgPSBjb252ZXJ0LnRvRGF0ZUZyb21TdHJpbmcoYS5lcnJvckRhdGVTdGFtcCk7XHJcbiAgICAgIGNvbnN0IEIgPSBjb252ZXJ0LnRvRGF0ZUZyb21TdHJpbmcoYi5lcnJvckRhdGVTdGFtcCk7XHJcblxyXG4gICAgICByZXR1cm4gQS52YWx1ZU9mKCkgPiBCLnZhbHVlT2YoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBuZXcgTWVtb3J5KHtcclxuICAgICAgZGF0YTogZXJyb3JJdGVtcyxcclxuICAgICAgaWRQcm9wZXJ0eTogdGhpcy5pZFByb3BlcnR5LFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICAgIHRiYXI6IFtdLFxyXG4gICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=