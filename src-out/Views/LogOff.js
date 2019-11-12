define('crm/Views/LogOff', ['module', 'exports', 'dojo/_base/declare', 'argos/View', 'argos/I18n'], function (module, exports, _declare, _View, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _View2 = _interopRequireDefault(_View);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('logOff'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Views.LogOff', [_View2.default], {
    // Templates
    widgetTemplate: new Simplate(['<div class="panel">', '<div class="wrapper">', '<div data-title="{%: $.titleText %}" class="signin {%= $.cls %}" hideBackButton="true">', '<p>{%= $.messageText %}</p>', '<p><a href="#" class="hyperlink" data-action="login">{%: $.loginText %}</a></p>', '</div>', '</div>', '</div>']),

    // Localization
    messageText: resource.messageText,
    loginText: resource.loginText,
    titleText: resource.titleText,

    id: 'logoff',

    login: function login() {
      window.location.reload();
    },

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        bbar: false,
        tbar: false
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9Mb2dPZmYuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwid2lkZ2V0VGVtcGxhdGUiLCJTaW1wbGF0ZSIsIm1lc3NhZ2VUZXh0IiwibG9naW5UZXh0IiwidGl0bGVUZXh0IiwiaWQiLCJsb2dpbiIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwiYmJhciIsInRiYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU1BLFdBQVcsb0JBQVksUUFBWixDQUFqQixDLENBbkJBOzs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUMsVUFBVSx1QkFBUSxrQkFBUixFQUE0QixnQkFBNUIsRUFBb0M7QUFDbEQ7QUFDQUMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxDQUMzQixxQkFEMkIsRUFFM0IsdUJBRjJCLEVBRzNCLHlGQUgyQixFQUkzQiw2QkFKMkIsRUFLM0IsaUZBTDJCLEVBTTNCLFFBTjJCLEVBTzNCLFFBUDJCLEVBUTNCLFFBUjJCLENBQWIsQ0FGa0M7O0FBYWxEO0FBQ0FDLGlCQUFhSixTQUFTSSxXQWQ0QjtBQWVsREMsZUFBV0wsU0FBU0ssU0FmOEI7QUFnQmxEQyxlQUFXTixTQUFTTSxTQWhCOEI7O0FBa0JsREMsUUFBSSxRQWxCOEM7O0FBb0JsREMsV0FBTyxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCQyxhQUFPQyxRQUFQLENBQWdCQyxNQUFoQjtBQUNELEtBdEJpRDs7QUF3QmxEQyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFDNUMsYUFBTyxLQUFLQyxLQUFMLEtBQWUsS0FBS0EsS0FBTCxHQUFhO0FBQ2pDQyxjQUFNLEtBRDJCO0FBRWpDQyxjQUFNO0FBRjJCLE9BQTVCLENBQVA7QUFJRDtBQTdCaUQsR0FBcEMsQ0FBaEI7O29CQWdDZWQsTyIsImZpbGUiOiJMb2dPZmYuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgVmlldyBmcm9tICdhcmdvcy9WaWV3JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnbG9nT2ZmJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkxvZ09mZicsIFtWaWV3XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIHdpZGdldFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJwYW5lbFwiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nLFxyXG4gICAgJzxkaXYgZGF0YS10aXRsZT1cInslOiAkLnRpdGxlVGV4dCAlfVwiIGNsYXNzPVwic2lnbmluIHslPSAkLmNscyAlfVwiIGhpZGVCYWNrQnV0dG9uPVwidHJ1ZVwiPicsXHJcbiAgICAnPHA+eyU9ICQubWVzc2FnZVRleHQgJX08L3A+JyxcclxuICAgICc8cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiaHlwZXJsaW5rXCIgZGF0YS1hY3Rpb249XCJsb2dpblwiPnslOiAkLmxvZ2luVGV4dCAlfTwvYT48L3A+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgbWVzc2FnZVRleHQ6IHJlc291cmNlLm1lc3NhZ2VUZXh0LFxyXG4gIGxvZ2luVGV4dDogcmVzb3VyY2UubG9naW5UZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICBpZDogJ2xvZ29mZicsXHJcblxyXG4gIGxvZ2luOiBmdW5jdGlvbiBsb2dpbigpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICB9LFxyXG5cclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICAgIGJiYXI6IGZhbHNlLFxyXG4gICAgICB0YmFyOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19