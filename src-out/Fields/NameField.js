define('crm/Fields/NameField', ['module', 'exports', 'dojo/_base/declare', 'argos/Fields/EditorField', 'argos/FieldManager', 'argos/I18n'], function (module, exports, _declare, _EditorField, _FieldManager, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _EditorField2 = _interopRequireDefault(_EditorField);

  var _FieldManager2 = _interopRequireDefault(_FieldManager);

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

  var resource = (0, _I18n2.default)('nameField');

  var control = (0, _declare2.default)('crm.Fields.NameField', [_EditorField2.default], {
    // Localization
    emptyText: resource.emptyText,
    widgetTemplate: new Simplate(['<label for="{%= $.name %}"\n      {% if ($.required) { %}\n          class="required"\n      {% } %}>{%: $.label %}</label>\n    <div class="field field-control-wrapper">\n      <button class="button simpleSubHeaderButton field-control-trigger\n        aria-label="{%: $.lookupLabelText %}">\n        <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%: $.iconClass %}"></use>\n        </svg>\n      </button>\n      <input data-dojo-attach-point="inputNode" readonly="readonly" type="text" />\n    </div>']),

    iconClass: 'quick-edit',

    createNavigationOptions: function createNavigationOptions() {
      var options = this.inherited(arguments);
      // Name does not have an entity.
      delete options.entityName;

      return options;
    }
  });

  exports.default = _FieldManager2.default.register('name', control);
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9GaWVsZHMvTmFtZUZpZWxkLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiY29udHJvbCIsImVtcHR5VGV4dCIsIndpZGdldFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpY29uQ2xhc3MiLCJjcmVhdGVOYXZpZ2F0aW9uT3B0aW9ucyIsIm9wdGlvbnMiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJlbnRpdHlOYW1lIiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU1BLFdBQVcsb0JBQVksV0FBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLHNCQUFSLEVBQWdDLHVCQUFoQyxFQUErQztBQUM3RDtBQUNBQyxlQUFXRixTQUFTRSxTQUZ5QztBQUc3REMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxxbUJBQWIsQ0FINkM7O0FBbUI3REMsZUFBVyxZQW5Ca0Q7O0FBcUI3REMsNkJBQXlCLFNBQVNBLHVCQUFULEdBQW1DO0FBQzFELFVBQU1DLFVBQVUsS0FBS0MsU0FBTCxDQUFlQyxTQUFmLENBQWhCO0FBQ0E7QUFDQSxhQUFPRixRQUFRRyxVQUFmOztBQUVBLGFBQU9ILE9BQVA7QUFDRDtBQTNCNEQsR0FBL0MsQ0FBaEI7O29CQThCZSx1QkFBYUksUUFBYixDQUFzQixNQUF0QixFQUE4QlYsT0FBOUIsQyIsImZpbGUiOiJOYW1lRmllbGQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgRWRpdG9yRmllbGQgZnJvbSAnYXJnb3MvRmllbGRzL0VkaXRvckZpZWxkJztcclxuaW1wb3J0IEZpZWxkTWFuYWdlciBmcm9tICdhcmdvcy9GaWVsZE1hbmFnZXInO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCduYW1lRmllbGQnKTtcclxuXHJcbmNvbnN0IGNvbnRyb2wgPSBkZWNsYXJlKCdjcm0uRmllbGRzLk5hbWVGaWVsZCcsIFtFZGl0b3JGaWVsZF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBlbXB0eVRleHQ6IHJlc291cmNlLmVtcHR5VGV4dCxcclxuICB3aWRnZXRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgIGA8bGFiZWwgZm9yPVwieyU9ICQubmFtZSAlfVwiXHJcbiAgICAgIHslIGlmICgkLnJlcXVpcmVkKSB7ICV9XHJcbiAgICAgICAgICBjbGFzcz1cInJlcXVpcmVkXCJcclxuICAgICAgeyUgfSAlfT57JTogJC5sYWJlbCAlfTwvbGFiZWw+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZmllbGQgZmllbGQtY29udHJvbC13cmFwcGVyXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gc2ltcGxlU3ViSGVhZGVyQnV0dG9uIGZpZWxkLWNvbnRyb2wtdHJpZ2dlclxyXG4gICAgICAgIGFyaWEtbGFiZWw9XCJ7JTogJC5sb29rdXBMYWJlbFRleHQgJX1cIj5cclxuICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiIGZvY3VzYWJsZT1cImZhbHNlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxyXG4gICAgICAgICAgPHVzZSB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bGluazpocmVmPVwiI2ljb24teyU6ICQuaWNvbkNsYXNzICV9XCI+PC91c2U+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8aW5wdXQgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImlucHV0Tm9kZVwiIHJlYWRvbmx5PVwicmVhZG9ubHlcIiB0eXBlPVwidGV4dFwiIC8+XHJcbiAgICA8L2Rpdj5gLFxyXG4gIF0pLFxyXG5cclxuICBpY29uQ2xhc3M6ICdxdWljay1lZGl0JyxcclxuXHJcbiAgY3JlYXRlTmF2aWdhdGlvbk9wdGlvbnM6IGZ1bmN0aW9uIGNyZWF0ZU5hdmlnYXRpb25PcHRpb25zKCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICAvLyBOYW1lIGRvZXMgbm90IGhhdmUgYW4gZW50aXR5LlxyXG4gICAgZGVsZXRlIG9wdGlvbnMuZW50aXR5TmFtZTtcclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpZWxkTWFuYWdlci5yZWdpc3RlcignbmFtZScsIGNvbnRyb2wpO1xyXG4iXX0=