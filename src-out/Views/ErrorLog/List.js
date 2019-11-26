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
      this.inherited(_onRefresh, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9FcnJvckxvZy9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJlcnJvckRhdGVGb3JtYXRUZXh0IiwiZXJyb3JEYXRlRm9ybWF0VGV4dDI0IiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpZCIsImVuYWJsZVNlYXJjaCIsImVuYWJsZVB1bGxUb1JlZnJlc2giLCJoaWRlU2VhcmNoIiwiZXhwb3NlIiwiZGV0YWlsVmlldyIsImlkUHJvcGVydHkiLCJsYWJlbFByb3BlcnR5IiwiX29uUmVmcmVzaCIsIm8iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJyZXNvdXJjZUtpbmQiLCJyZWZyZXNoUmVxdWlyZWQiLCJjcmVhdGVTdG9yZSIsImVycm9ySXRlbXMiLCJnZXRBbGxFcnJvcnMiLCJzb3J0IiwiYSIsImIiLCJlcnJvckRhdGVTdGFtcCIsIkRhdGUiLCJBIiwidG9EYXRlRnJvbVN0cmluZyIsIkIiLCJ2YWx1ZU9mIiwiZGF0YSIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsInRiYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxXQUFXLG9CQUFZLGNBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksNEJBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7O0FBUUEsTUFBTUMsVUFBVSx1QkFBUSx5QkFBUixFQUFtQyxvQkFBbkMsRUFBMkM7QUFDekQ7QUFDQUMsZUFBV0gsU0FBU0csU0FGcUM7QUFHekRDLHlCQUFxQkgsaUJBQWlCRyxtQkFIbUI7QUFJekRDLDJCQUF1QkosaUJBQWlCSSxxQkFKaUI7O0FBTXpEO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QiwySUFEeUIsQ0FBYixDQVAyQzs7QUFXekQ7QUFDQUMsUUFBSSxlQVpxRDtBQWF6REMsa0JBQWMsS0FiMkM7QUFjekRDLHlCQUFxQixLQWRvQztBQWV6REMsZ0JBQVksSUFmNkM7QUFnQnpEQyxZQUFRLEtBaEJpRDtBQWlCekRDLGdCQUFZLGlCQWpCNkM7QUFrQnpEQyxnQkFBWSxNQWxCNkM7QUFtQnpEQyxtQkFBZSxhQW5CMEM7O0FBcUJ6REMsZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkMsQ0FBcEIsRUFBdUI7QUFDakMsV0FBS0MsU0FBTCxDQUFlRixVQUFmLEVBQTJCRyxTQUEzQjtBQUNBLFVBQUlGLEVBQUVHLFlBQUYsS0FBbUIsV0FBbkIsSUFBa0NILEVBQUVHLFlBQUYsS0FBbUIsY0FBekQsRUFBeUU7QUFDdkUsYUFBS0MsZUFBTCxHQUF1QixJQUF2QjtBQUNEO0FBQ0YsS0ExQndEO0FBMkJ6REMsaUJBQWEsU0FBU0EsV0FBVCxHQUF1QjtBQUNsQyxVQUFNQyxhQUFhLHVCQUFhQyxZQUFiLEVBQW5COztBQUVBRCxpQkFBV0UsSUFBWCxDQUFnQixVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUN4QkQsVUFBRUUsY0FBRixHQUFtQkYsRUFBRUUsY0FBRixJQUFvQkYsRUFBRUcsSUFBekM7QUFDQUYsVUFBRUMsY0FBRixHQUFtQkQsRUFBRUMsY0FBRixJQUFvQkQsRUFBRUUsSUFBekM7QUFDQUgsVUFBRUcsSUFBRixHQUFTSCxFQUFFRSxjQUFYO0FBQ0FELFVBQUVFLElBQUYsR0FBU0YsRUFBRUMsY0FBWDtBQUNBLFlBQU1FLElBQUksa0JBQVFDLGdCQUFSLENBQXlCTCxFQUFFRSxjQUEzQixDQUFWO0FBQ0EsWUFBTUksSUFBSSxrQkFBUUQsZ0JBQVIsQ0FBeUJKLEVBQUVDLGNBQTNCLENBQVY7O0FBRUEsZUFBT0UsRUFBRUcsT0FBRixLQUFjRCxFQUFFQyxPQUFGLEVBQXJCO0FBQ0QsT0FURDs7QUFXQSxhQUFPLHFCQUFXO0FBQ2hCQyxjQUFNWCxVQURVO0FBRWhCVCxvQkFBWSxLQUFLQTtBQUZELE9BQVgsQ0FBUDtBQUlELEtBN0N3RDtBQThDekRxQixzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFDNUMsYUFBTyxLQUFLQyxLQUFMLEtBQWUsS0FBS0EsS0FBTCxHQUFhO0FBQ2pDQyxjQUFNO0FBRDJCLE9BQTVCLENBQVA7QUFHRDtBQWxEd0QsR0FBM0MsQ0FBaEI7O29CQXFEZW5DLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBNZW1vcnkgZnJvbSAnZG9qby9zdG9yZS9NZW1vcnknO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9fTGlzdEJhc2UnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnJvckxvZ0xpc3QnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnJvckxvZ0xpc3REYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuRXJyb3JMb2cuTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FcnJvck1hbmFnZXJcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuRXJyb3JMb2cuTGlzdCcsIFtMaXN0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGVycm9yRGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZXJyb3JEYXRlRm9ybWF0VGV4dCxcclxuICBlcnJvckRhdGVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2UuZXJyb3JEYXRlRm9ybWF0VGV4dDI0LFxyXG5cclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6IGNybS5Gb3JtYXQuZGF0ZSgkLkRhdGUsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/ICQkLmVycm9yRGF0ZUZvcm1hdFRleHQyNCA6ICQkLmVycm9yRGF0ZUZvcm1hdFRleHQpICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnZXJyb3Jsb2dfbGlzdCcsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBlbmFibGVQdWxsVG9SZWZyZXNoOiBmYWxzZSxcclxuICBoaWRlU2VhcmNoOiB0cnVlLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgZGV0YWlsVmlldzogJ2Vycm9ybG9nX2RldGFpbCcsXHJcbiAgaWRQcm9wZXJ0eTogJyRrZXknLFxyXG4gIGxhYmVsUHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcblxyXG4gIF9vblJlZnJlc2g6IGZ1bmN0aW9uIF9vblJlZnJlc2gobykge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoX29uUmVmcmVzaCwgYXJndW1lbnRzKTtcclxuICAgIGlmIChvLnJlc291cmNlS2luZCA9PT0gJ2Vycm9ybG9ncycgfHwgby5yZXNvdXJjZUtpbmQgPT09ICdsb2NhbFN0b3JhZ2UnKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZVN0b3JlOiBmdW5jdGlvbiBjcmVhdGVTdG9yZSgpIHtcclxuICAgIGNvbnN0IGVycm9ySXRlbXMgPSBFcnJvck1hbmFnZXIuZ2V0QWxsRXJyb3JzKCk7XHJcblxyXG4gICAgZXJyb3JJdGVtcy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGEuZXJyb3JEYXRlU3RhbXAgPSBhLmVycm9yRGF0ZVN0YW1wIHx8IGEuRGF0ZTtcclxuICAgICAgYi5lcnJvckRhdGVTdGFtcCA9IGIuZXJyb3JEYXRlU3RhbXAgfHwgYi5EYXRlO1xyXG4gICAgICBhLkRhdGUgPSBhLmVycm9yRGF0ZVN0YW1wO1xyXG4gICAgICBiLkRhdGUgPSBiLmVycm9yRGF0ZVN0YW1wO1xyXG4gICAgICBjb25zdCBBID0gY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGEuZXJyb3JEYXRlU3RhbXApO1xyXG4gICAgICBjb25zdCBCID0gY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGIuZXJyb3JEYXRlU3RhbXApO1xyXG5cclxuICAgICAgcmV0dXJuIEEudmFsdWVPZigpID4gQi52YWx1ZU9mKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IE1lbW9yeSh7XHJcbiAgICAgIGRhdGE6IGVycm9ySXRlbXMsXHJcbiAgICAgIGlkUHJvcGVydHk6IHRoaXMuaWRQcm9wZXJ0eSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbXSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19