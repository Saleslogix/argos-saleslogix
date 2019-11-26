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

      this.inherited(showTools, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9NYWluVG9vbGJhci5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJiYWNrVG9vbHRpcFRleHQiLCJzaG93VG9vbHMiLCJ0b29scyIsImlzT25FZGl0IiwiaXNPbkZpcnN0VmlldyIsIkFwcCIsImkiLCJsZW5ndGgiLCJpZCIsImNvbmNhdCIsInN2ZyIsInNpZGUiLCJ0aXRsZSIsImZuIiwibmF2aWdhdGVCYWNrIiwic2NvcGUiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJSZVVJIiwiYmFjayIsIm5hdmlnYXRlVG9Ib21lVmlldyIsIm9uVGl0bGVDbGljayIsInZpZXciLCJnZXRQcmltYXJ5QWN0aXZlVmlldyIsInNjcm9sbGVyTm9kZSIsImdldCIsIiQiLCJjc3MiLCJzY3JvbGxUb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU1BLFdBQVcsb0JBQVksYUFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQU9BLE1BQU1DLFVBQVUsdUJBQVEsdUJBQVIsRUFBaUMsdUJBQWpDLEVBQWdEO0FBQzlEQyxxQkFBaUJGLFNBQVNFLGVBRG9DOztBQUc5REMsZUFBVyxTQUFTQSxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUNuQyxVQUFJQyxpQkFBSjtBQUNBLFVBQU1DLGdCQUFnQkMsSUFBSUQsYUFBSixFQUF0Qjs7QUFFQSxVQUFJRixLQUFKLEVBQVc7QUFDVCxhQUFLLElBQUlJLElBQUksQ0FBYixFQUFnQkEsSUFBSUosTUFBTUssTUFBMUIsRUFBa0NELEdBQWxDLEVBQXVDO0FBQ3JDLGNBQUlKLE1BQU1JLENBQU4sRUFBU0UsRUFBVCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QkwsdUJBQVcsSUFBWDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxVQUFJRCxVQUFVLEtBQWQsRUFBcUI7QUFDbkJBLGdCQUFRQSxTQUFTLEVBQWpCLENBRG1CLENBQ0U7O0FBRXJCLFlBQUksQ0FBQ0MsUUFBRCxJQUFhLENBQUNDLGFBQWxCLEVBQWlDO0FBQy9CRixrQkFBUUEsTUFBTU8sTUFBTixDQUFhLENBQUMsRUFBRTtBQUN0QkQsZ0JBQUksTUFEZ0I7QUFFcEJFLGlCQUFLLGVBRmU7QUFHcEJDLGtCQUFNLE1BSGM7QUFJcEJDLG1CQUFPLEtBQUtaLGVBSlE7QUFLcEJhLGdCQUFJLEtBQUtDLFlBTFc7QUFNcEJDLG1CQUFPO0FBTmEsV0FBRCxDQUFiLENBQVI7QUFRRDtBQUNGOztBQUVELFdBQUtDLFNBQUwsQ0FBZWYsU0FBZixFQUEwQmdCLFNBQTFCO0FBQ0QsS0EvQjZEO0FBZ0M5REgsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQ0ksV0FBS0MsSUFBTDtBQUNELEtBbEM2RDtBQW1DOURDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRGYsVUFBSWUsa0JBQUo7QUFDRCxLQXJDNkQ7QUFzQzlEQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLFVBQU1DLE9BQU9qQixJQUFJa0Isb0JBQUosRUFBYjs7QUFFQSxVQUFJRCxJQUFKLEVBQVU7QUFDUixZQUFNRSxlQUFlRixLQUFLRyxHQUFMLENBQVMsVUFBVCxDQUFyQjtBQUNBLFlBQUksbUJBQUksU0FBSixDQUFKLEVBQW9CO0FBQ2xCO0FBQ0FDLFlBQUVGLFlBQUYsRUFBZ0JHLEdBQWhCLENBQW9CLFVBQXBCLEVBQWdDLFFBQWhDO0FBQ0FILHVCQUFhSSxTQUFiLEdBQXlCLENBQXpCO0FBQ0FGLFlBQUVGLFlBQUYsRUFBZ0JHLEdBQWhCLENBQW9CLFVBQXBCLEVBQWdDLE1BQWhDO0FBQ0QsU0FMRCxNQUtPO0FBQ0xILHVCQUFhSSxTQUFiLEdBQXlCLENBQXpCO0FBQ0Q7QUFDRjtBQUNGO0FBcEQ2RCxHQUFoRCxDQUFoQjs7b0JBdURlN0IsTyIsImZpbGUiOiJNYWluVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBoYXMgZnJvbSAnZG9qby9oYXMnO1xyXG5pbXBvcnQgTWFpblRvb2xiYXIgZnJvbSAnYXJnb3MvTWFpblRvb2xiYXInO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdtYWluVG9vbGJhcicpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuTWFpblRvb2xiYXJcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTWFpblRvb2xiYXJcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuTWFpblRvb2xiYXInLCBbTWFpblRvb2xiYXJdLCB7XHJcbiAgYmFja1Rvb2x0aXBUZXh0OiByZXNvdXJjZS5iYWNrVG9vbHRpcFRleHQsXHJcblxyXG4gIHNob3dUb29sczogZnVuY3Rpb24gc2hvd1Rvb2xzKHRvb2xzKSB7XHJcbiAgICBsZXQgaXNPbkVkaXQ7XHJcbiAgICBjb25zdCBpc09uRmlyc3RWaWV3ID0gQXBwLmlzT25GaXJzdFZpZXcoKTtcclxuXHJcbiAgICBpZiAodG9vbHMpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b29scy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0b29sc1tpXS5pZCA9PT0gJ2NhbmNlbCcpIHtcclxuICAgICAgICAgIGlzT25FZGl0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodG9vbHMgIT09IGZhbHNlKSB7XHJcbiAgICAgIHRvb2xzID0gdG9vbHMgfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHJcbiAgICAgIGlmICghaXNPbkVkaXQgJiYgIWlzT25GaXJzdFZpZXcpIHtcclxuICAgICAgICB0b29scyA9IHRvb2xzLmNvbmNhdChbeyAvL2VzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAgIGlkOiAnYmFjaycsXHJcbiAgICAgICAgICBzdmc6ICdwcmV2aW91cy1wYWdlJyxcclxuICAgICAgICAgIHNpZGU6ICdsZWZ0JyxcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLmJhY2tUb29sdGlwVGV4dCxcclxuICAgICAgICAgIGZuOiB0aGlzLm5hdmlnYXRlQmFjayxcclxuICAgICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICAgIH1dKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKHNob3dUb29scywgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlQmFjazogZnVuY3Rpb24gbmF2aWdhdGVCYWNrKCkge1xyXG4gICAgUmVVSS5iYWNrKCk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvSG9tZVZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9Ib21lVmlldygpIHtcclxuICAgIEFwcC5uYXZpZ2F0ZVRvSG9tZVZpZXcoKTtcclxuICB9LFxyXG4gIG9uVGl0bGVDbGljazogZnVuY3Rpb24gb25UaXRsZUNsaWNrKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRQcmltYXJ5QWN0aXZlVmlldygpO1xyXG5cclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIGNvbnN0IHNjcm9sbGVyTm9kZSA9IHZpZXcuZ2V0KCdzY3JvbGxlcicpO1xyXG4gICAgICBpZiAoaGFzKCdhbmRyb2lkJykpIHtcclxuICAgICAgICAvLyBIYWNrIHRvIHdvcmsgYXJvdW5kIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvYW5kcm9pZC9pc3N1ZXMvZGV0YWlsP2lkPTE5NjI1XHJcbiAgICAgICAgJChzY3JvbGxlck5vZGUpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgc2Nyb2xsZXJOb2RlLnNjcm9sbFRvcCA9IDA7XHJcbiAgICAgICAgJChzY3JvbGxlck5vZGUpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNjcm9sbGVyTm9kZS5zY3JvbGxUb3AgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=