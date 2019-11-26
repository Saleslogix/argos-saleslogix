define('crm/Views/UpdateToolbar', ['module', 'exports', 'dojo/_base/declare', 'argos/MainToolbar', 'argos/I18n'], function (module, exports, _declare, _MainToolbar, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _MainToolbar2 = _interopRequireDefault(_MainToolbar);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('updateToolbar');

  /**
   * @class crm.Views.UpdateToolbar
   *
   *
   * @extends argos.MainToolbar
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

  var __class = (0, _declare2.default)('crm.Views.UpdateToolbar', [_MainToolbar2.default], {
    widgetTemplate: new Simplate(['<div class="update-toolbar">', '<h1 data-action="reload">{%= $.updateText %}</h1>', '</div>']),

    updateText: resource.updateText,

    managed: false,

    show: function show() {
      $('body').addClass('update-available');

      this.showTools([{
        id: 'cancel',
        side: 'right',
        fn: this.cancel,
        scope: this
      }]);

      this.inherited(show, arguments);
    },

    showTools: function showTools() {
      this.inherited(showTools, arguments);
    },

    hide: function hide() {
      $('body').removeClass('update-available');
    },
    reload: function reload() {
      App.reload();
    },
    cancel: function cancel() {
      this.hide();
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9VcGRhdGVUb29sYmFyLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIndpZGdldFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ1cGRhdGVUZXh0IiwibWFuYWdlZCIsInNob3ciLCIkIiwiYWRkQ2xhc3MiLCJzaG93VG9vbHMiLCJpZCIsInNpZGUiLCJmbiIsImNhbmNlbCIsInNjb3BlIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiaGlkZSIsInJlbW92ZUNsYXNzIiwicmVsb2FkIiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNQSxXQUFXLG9CQUFZLGVBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFyQkE7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNQyxVQUFVLHVCQUFRLHlCQUFSLEVBQW1DLHVCQUFuQyxFQUFrRDtBQUNoRUMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxDQUMzQiw4QkFEMkIsRUFFM0IsbURBRjJCLEVBRzNCLFFBSDJCLENBQWIsQ0FEZ0Q7O0FBT2hFQyxnQkFBWUosU0FBU0ksVUFQMkM7O0FBU2hFQyxhQUFTLEtBVHVEOztBQVdoRUMsVUFBTSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCQyxRQUFFLE1BQUYsRUFBVUMsUUFBVixDQUFtQixrQkFBbkI7O0FBRUEsV0FBS0MsU0FBTCxDQUFlLENBQUM7QUFDZEMsWUFBSSxRQURVO0FBRWRDLGNBQU0sT0FGUTtBQUdkQyxZQUFJLEtBQUtDLE1BSEs7QUFJZEMsZUFBTztBQUpPLE9BQUQsQ0FBZjs7QUFPQSxXQUFLQyxTQUFMLENBQWVULElBQWYsRUFBcUJVLFNBQXJCO0FBQ0QsS0F0QitEOztBQXdCaEVQLGVBQVcsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixXQUFLTSxTQUFMLENBQWVOLFNBQWYsRUFBMEJPLFNBQTFCO0FBQ0QsS0ExQitEOztBQTRCaEVDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNwQlYsUUFBRSxNQUFGLEVBQVVXLFdBQVYsQ0FBc0Isa0JBQXRCO0FBQ0QsS0E5QitEO0FBK0JoRUMsWUFBUSxTQUFTQSxNQUFULEdBQWtCO0FBQ3hCQyxVQUFJRCxNQUFKO0FBQ0QsS0FqQytEO0FBa0NoRU4sWUFBUSxTQUFTQSxNQUFULEdBQWtCO0FBQ3hCLFdBQUtJLElBQUw7QUFDRDtBQXBDK0QsR0FBbEQsQ0FBaEI7O29CQXVDZWhCLE8iLCJmaWxlIjoiVXBkYXRlVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBNYWluVG9vbGJhciBmcm9tICdhcmdvcy9NYWluVG9vbGJhcic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3VwZGF0ZVRvb2xiYXInKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlVwZGF0ZVRvb2xiYXJcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTWFpblRvb2xiYXJcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuVXBkYXRlVG9vbGJhcicsIFtNYWluVG9vbGJhcl0sIHtcclxuICB3aWRnZXRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwidXBkYXRlLXRvb2xiYXJcIj4nLFxyXG4gICAgJzxoMSBkYXRhLWFjdGlvbj1cInJlbG9hZFwiPnslPSAkLnVwZGF0ZVRleHQgJX08L2gxPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgdXBkYXRlVGV4dDogcmVzb3VyY2UudXBkYXRlVGV4dCxcclxuXHJcbiAgbWFuYWdlZDogZmFsc2UsXHJcblxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3VwZGF0ZS1hdmFpbGFibGUnKTtcclxuXHJcbiAgICB0aGlzLnNob3dUb29scyhbe1xyXG4gICAgICBpZDogJ2NhbmNlbCcsXHJcbiAgICAgIHNpZGU6ICdyaWdodCcsXHJcbiAgICAgIGZuOiB0aGlzLmNhbmNlbCxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9XSk7XHJcblxyXG4gICAgdGhpcy5pbmhlcml0ZWQoc2hvdywgYXJndW1lbnRzKTtcclxuICB9LFxyXG5cclxuICBzaG93VG9vbHM6IGZ1bmN0aW9uIHNob3dUb29scygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHNob3dUb29scywgYXJndW1lbnRzKTtcclxuICB9LFxyXG5cclxuICBoaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xyXG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCd1cGRhdGUtYXZhaWxhYmxlJyk7XHJcbiAgfSxcclxuICByZWxvYWQ6IGZ1bmN0aW9uIHJlbG9hZCgpIHtcclxuICAgIEFwcC5yZWxvYWQoKTtcclxuICB9LFxyXG4gIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKCkge1xyXG4gICAgdGhpcy5oaWRlKCk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=