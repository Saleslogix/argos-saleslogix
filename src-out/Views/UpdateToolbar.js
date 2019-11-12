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

      this.inherited(arguments);
    },

    showTools: function showTools() {
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9VcGRhdGVUb29sYmFyLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIndpZGdldFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ1cGRhdGVUZXh0IiwibWFuYWdlZCIsInNob3ciLCIkIiwiYWRkQ2xhc3MiLCJzaG93VG9vbHMiLCJpZCIsInNpZGUiLCJmbiIsImNhbmNlbCIsInNjb3BlIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiaGlkZSIsInJlbW92ZUNsYXNzIiwicmVsb2FkIiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNQSxXQUFXLG9CQUFZLGVBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFyQkE7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNQyxVQUFVLHVCQUFRLHlCQUFSLEVBQW1DLHVCQUFuQyxFQUFrRDtBQUNoRUMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxDQUMzQiw4QkFEMkIsRUFFM0IsbURBRjJCLEVBRzNCLFFBSDJCLENBQWIsQ0FEZ0Q7O0FBT2hFQyxnQkFBWUosU0FBU0ksVUFQMkM7O0FBU2hFQyxhQUFTLEtBVHVEOztBQVdoRUMsVUFBTSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCQyxRQUFFLE1BQUYsRUFBVUMsUUFBVixDQUFtQixrQkFBbkI7O0FBRUEsV0FBS0MsU0FBTCxDQUFlLENBQUM7QUFDZEMsWUFBSSxRQURVO0FBRWRDLGNBQU0sT0FGUTtBQUdkQyxZQUFJLEtBQUtDLE1BSEs7QUFJZEMsZUFBTztBQUpPLE9BQUQsQ0FBZjs7QUFPQSxXQUFLQyxTQUFMLENBQWVDLFNBQWY7QUFDRCxLQXRCK0Q7O0FBd0JoRVAsZUFBVyxTQUFTQSxTQUFULEdBQXFCO0FBQzlCLFdBQUtNLFNBQUwsQ0FBZUMsU0FBZjtBQUNELEtBMUIrRDs7QUE0QmhFQyxVQUFNLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEJWLFFBQUUsTUFBRixFQUFVVyxXQUFWLENBQXNCLGtCQUF0QjtBQUNELEtBOUIrRDtBQStCaEVDLFlBQVEsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QkMsVUFBSUQsTUFBSjtBQUNELEtBakMrRDtBQWtDaEVOLFlBQVEsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixXQUFLSSxJQUFMO0FBQ0Q7QUFwQytELEdBQWxELENBQWhCOztvQkF1Q2VoQixPIiwiZmlsZSI6IlVwZGF0ZVRvb2xiYXIuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTWFpblRvb2xiYXIgZnJvbSAnYXJnb3MvTWFpblRvb2xiYXInO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCd1cGRhdGVUb29sYmFyJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5VcGRhdGVUb29sYmFyXHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLk1haW5Ub29sYmFyXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLlVwZGF0ZVRvb2xiYXInLCBbTWFpblRvb2xiYXJdLCB7XHJcbiAgd2lkZ2V0VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cInVwZGF0ZS10b29sYmFyXCI+JyxcclxuICAgICc8aDEgZGF0YS1hY3Rpb249XCJyZWxvYWRcIj57JT0gJC51cGRhdGVUZXh0ICV9PC9oMT4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcblxyXG4gIHVwZGF0ZVRleHQ6IHJlc291cmNlLnVwZGF0ZVRleHQsXHJcblxyXG4gIG1hbmFnZWQ6IGZhbHNlLFxyXG5cclxuICBzaG93OiBmdW5jdGlvbiBzaG93KCkge1xyXG4gICAgJCgnYm9keScpLmFkZENsYXNzKCd1cGRhdGUtYXZhaWxhYmxlJyk7XHJcblxyXG4gICAgdGhpcy5zaG93VG9vbHMoW3tcclxuICAgICAgaWQ6ICdjYW5jZWwnLFxyXG4gICAgICBzaWRlOiAncmlnaHQnLFxyXG4gICAgICBmbjogdGhpcy5jYW5jZWwsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfV0pO1xyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuXHJcbiAgc2hvd1Rvb2xzOiBmdW5jdGlvbiBzaG93VG9vbHMoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcblxyXG4gIGhpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XHJcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3VwZGF0ZS1hdmFpbGFibGUnKTtcclxuICB9LFxyXG4gIHJlbG9hZDogZnVuY3Rpb24gcmVsb2FkKCkge1xyXG4gICAgQXBwLnJlbG9hZCgpO1xyXG4gIH0sXHJcbiAgY2FuY2VsOiBmdW5jdGlvbiBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLmhpZGUoKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==