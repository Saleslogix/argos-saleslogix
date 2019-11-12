define('crm/Views/MainToolbar', ['module', 'exports', 'dojo/_base/declare', 'dojo/has', 'argos/MainToolbar', 'argos/I18n'], function (module, exports, _declare, _has, _MainToolbar, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _has2 = _interopRequireDefault(_has);

  var _MainToolbar2 = _interopRequireDefault(_MainToolbar);

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

  var resource = (0, _I18n2.default)('mainToolbar');

  /**
   * @class crm.Views.MainToolbar
   *
   *
   * @extends argos.MainToolbar
   *
   */
  var __class = (0, _declare2.default)('crm.Views.MainToolbar', [_MainToolbar2.default], {
    backTooltipText: resource.backTooltipText,

    showTools: function showTools(tools) {
      var isOnEdit = void 0;
      var isOnFirstView = App.isOnFirstView();

      if (tools) {
        for (var i = 0; i < tools.length; i++) {
          if (tools[i].id === 'cancel') {
            isOnEdit = true;
          }
        }
      }

      if (tools !== false) {
        tools = tools || []; // eslint-disable-line

        if (!isOnEdit && !isOnFirstView) {
          tools = tools.concat([{ //eslint-disable-line
            id: 'back',
            svg: 'previous-page',
            side: 'left',
            title: this.backTooltipText,
            fn: this.navigateBack,
            scope: this
          }]);
        }
      }

      this.inherited(arguments);
    },
    navigateBack: function navigateBack() {
      ReUI.back();
    },
    navigateToHomeView: function navigateToHomeView() {
      App.navigateToHomeView();
    },
    onTitleClick: function onTitleClick() {
      var view = App.getPrimaryActiveView();

      if (view) {
        var scrollerNode = view.get('scroller');
        if ((0, _has2.default)('android')) {
          // Hack to work around https://code.google.com/p/android/issues/detail?id=19625
          $(scrollerNode).css('overflow', 'hidden');
          scrollerNode.scrollTop = 0;
          $(scrollerNode).css('overflow', 'auto');
        } else {
          scrollerNode.scrollTop = 0;
        }
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9NYWluVG9vbGJhci5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJiYWNrVG9vbHRpcFRleHQiLCJzaG93VG9vbHMiLCJ0b29scyIsImlzT25FZGl0IiwiaXNPbkZpcnN0VmlldyIsIkFwcCIsImkiLCJsZW5ndGgiLCJpZCIsImNvbmNhdCIsInN2ZyIsInNpZGUiLCJ0aXRsZSIsImZuIiwibmF2aWdhdGVCYWNrIiwic2NvcGUiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJSZVVJIiwiYmFjayIsIm5hdmlnYXRlVG9Ib21lVmlldyIsIm9uVGl0bGVDbGljayIsInZpZXciLCJnZXRQcmltYXJ5QWN0aXZlVmlldyIsInNjcm9sbGVyTm9kZSIsImdldCIsIiQiLCJjc3MiLCJzY3JvbGxUb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU1BLFdBQVcsb0JBQVksYUFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQU9BLE1BQU1DLFVBQVUsdUJBQVEsdUJBQVIsRUFBaUMsdUJBQWpDLEVBQWdEO0FBQzlEQyxxQkFBaUJGLFNBQVNFLGVBRG9DOztBQUc5REMsZUFBVyxTQUFTQSxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUNuQyxVQUFJQyxpQkFBSjtBQUNBLFVBQU1DLGdCQUFnQkMsSUFBSUQsYUFBSixFQUF0Qjs7QUFFQSxVQUFJRixLQUFKLEVBQVc7QUFDVCxhQUFLLElBQUlJLElBQUksQ0FBYixFQUFnQkEsSUFBSUosTUFBTUssTUFBMUIsRUFBa0NELEdBQWxDLEVBQXVDO0FBQ3JDLGNBQUlKLE1BQU1JLENBQU4sRUFBU0UsRUFBVCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QkwsdUJBQVcsSUFBWDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxVQUFJRCxVQUFVLEtBQWQsRUFBcUI7QUFDbkJBLGdCQUFRQSxTQUFTLEVBQWpCLENBRG1CLENBQ0U7O0FBRXJCLFlBQUksQ0FBQ0MsUUFBRCxJQUFhLENBQUNDLGFBQWxCLEVBQWlDO0FBQy9CRixrQkFBUUEsTUFBTU8sTUFBTixDQUFhLENBQUMsRUFBRTtBQUN0QkQsZ0JBQUksTUFEZ0I7QUFFcEJFLGlCQUFLLGVBRmU7QUFHcEJDLGtCQUFNLE1BSGM7QUFJcEJDLG1CQUFPLEtBQUtaLGVBSlE7QUFLcEJhLGdCQUFJLEtBQUtDLFlBTFc7QUFNcEJDLG1CQUFPO0FBTmEsV0FBRCxDQUFiLENBQVI7QUFRRDtBQUNGOztBQUVELFdBQUtDLFNBQUwsQ0FBZUMsU0FBZjtBQUNELEtBL0I2RDtBQWdDOURILGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcENJLFdBQUtDLElBQUw7QUFDRCxLQWxDNkQ7QUFtQzlEQyx3QkFBb0IsU0FBU0Esa0JBQVQsR0FBOEI7QUFDaERmLFVBQUllLGtCQUFKO0FBQ0QsS0FyQzZEO0FBc0M5REMsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQyxVQUFNQyxPQUFPakIsSUFBSWtCLG9CQUFKLEVBQWI7O0FBRUEsVUFBSUQsSUFBSixFQUFVO0FBQ1IsWUFBTUUsZUFBZUYsS0FBS0csR0FBTCxDQUFTLFVBQVQsQ0FBckI7QUFDQSxZQUFJLG1CQUFJLFNBQUosQ0FBSixFQUFvQjtBQUNsQjtBQUNBQyxZQUFFRixZQUFGLEVBQWdCRyxHQUFoQixDQUFvQixVQUFwQixFQUFnQyxRQUFoQztBQUNBSCx1QkFBYUksU0FBYixHQUF5QixDQUF6QjtBQUNBRixZQUFFRixZQUFGLEVBQWdCRyxHQUFoQixDQUFvQixVQUFwQixFQUFnQyxNQUFoQztBQUNELFNBTEQsTUFLTztBQUNMSCx1QkFBYUksU0FBYixHQUF5QixDQUF6QjtBQUNEO0FBQ0Y7QUFDRjtBQXBENkQsR0FBaEQsQ0FBaEI7O29CQXVEZTdCLE8iLCJmaWxlIjoiTWFpblRvb2xiYXIuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgaGFzIGZyb20gJ2Rvam8vaGFzJztcclxuaW1wb3J0IE1haW5Ub29sYmFyIGZyb20gJ2FyZ29zL01haW5Ub29sYmFyJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnbWFpblRvb2xiYXInKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk1haW5Ub29sYmFyXHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLk1haW5Ub29sYmFyXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLk1haW5Ub29sYmFyJywgW01haW5Ub29sYmFyXSwge1xyXG4gIGJhY2tUb29sdGlwVGV4dDogcmVzb3VyY2UuYmFja1Rvb2x0aXBUZXh0LFxyXG5cclxuICBzaG93VG9vbHM6IGZ1bmN0aW9uIHNob3dUb29scyh0b29scykge1xyXG4gICAgbGV0IGlzT25FZGl0O1xyXG4gICAgY29uc3QgaXNPbkZpcnN0VmlldyA9IEFwcC5pc09uRmlyc3RWaWV3KCk7XHJcblxyXG4gICAgaWYgKHRvb2xzKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9vbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodG9vbHNbaV0uaWQgPT09ICdjYW5jZWwnKSB7XHJcbiAgICAgICAgICBpc09uRWRpdCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRvb2xzICE9PSBmYWxzZSkge1xyXG4gICAgICB0b29scyA9IHRvb2xzIHx8IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4gICAgICBpZiAoIWlzT25FZGl0ICYmICFpc09uRmlyc3RWaWV3KSB7XHJcbiAgICAgICAgdG9vbHMgPSB0b29scy5jb25jYXQoW3sgLy9lc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgICBpZDogJ2JhY2snLFxyXG4gICAgICAgICAgc3ZnOiAncHJldmlvdXMtcGFnZScsXHJcbiAgICAgICAgICBzaWRlOiAnbGVmdCcsXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5iYWNrVG9vbHRpcFRleHQsXHJcbiAgICAgICAgICBmbjogdGhpcy5uYXZpZ2F0ZUJhY2ssXHJcbiAgICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgICB9XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVCYWNrOiBmdW5jdGlvbiBuYXZpZ2F0ZUJhY2soKSB7XHJcbiAgICBSZVVJLmJhY2soKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9Ib21lVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0hvbWVWaWV3KCkge1xyXG4gICAgQXBwLm5hdmlnYXRlVG9Ib21lVmlldygpO1xyXG4gIH0sXHJcbiAgb25UaXRsZUNsaWNrOiBmdW5jdGlvbiBvblRpdGxlQ2xpY2soKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFByaW1hcnlBY3RpdmVWaWV3KCk7XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgY29uc3Qgc2Nyb2xsZXJOb2RlID0gdmlldy5nZXQoJ3Njcm9sbGVyJyk7XHJcbiAgICAgIGlmIChoYXMoJ2FuZHJvaWQnKSkge1xyXG4gICAgICAgIC8vIEhhY2sgdG8gd29yayBhcm91bmQgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9hbmRyb2lkL2lzc3Vlcy9kZXRhaWw/aWQ9MTk2MjVcclxuICAgICAgICAkKHNjcm9sbGVyTm9kZSkuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICBzY3JvbGxlck5vZGUuc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICAkKHNjcm9sbGVyTm9kZSkuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2Nyb2xsZXJOb2RlLnNjcm9sbFRvcCA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==