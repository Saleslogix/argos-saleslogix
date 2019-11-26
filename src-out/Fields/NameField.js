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
      var options = this.inherited(createNavigationOptions, arguments);
      // Name does not have an entity.
      delete options.entityName;

      return options;
    }
  });

  exports.default = _FieldManager2.default.register('name', control);
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9GaWVsZHMvTmFtZUZpZWxkLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiY29udHJvbCIsImVtcHR5VGV4dCIsIndpZGdldFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpY29uQ2xhc3MiLCJjcmVhdGVOYXZpZ2F0aW9uT3B0aW9ucyIsIm9wdGlvbnMiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJlbnRpdHlOYW1lIiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU1BLFdBQVcsb0JBQVksV0FBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLHNCQUFSLEVBQWdDLHVCQUFoQyxFQUErQztBQUM3RDtBQUNBQyxlQUFXRixTQUFTRSxTQUZ5QztBQUc3REMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxxbUJBQWIsQ0FINkM7O0FBbUI3REMsZUFBVyxZQW5Ca0Q7O0FBcUI3REMsNkJBQXlCLFNBQVNBLHVCQUFULEdBQW1DO0FBQzFELFVBQU1DLFVBQVUsS0FBS0MsU0FBTCxDQUFlRix1QkFBZixFQUF3Q0csU0FBeEMsQ0FBaEI7QUFDQTtBQUNBLGFBQU9GLFFBQVFHLFVBQWY7O0FBRUEsYUFBT0gsT0FBUDtBQUNEO0FBM0I0RCxHQUEvQyxDQUFoQjs7b0JBOEJlLHVCQUFhSSxRQUFiLENBQXNCLE1BQXRCLEVBQThCVixPQUE5QixDIiwiZmlsZSI6Ik5hbWVGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBFZGl0b3JGaWVsZCBmcm9tICdhcmdvcy9GaWVsZHMvRWRpdG9yRmllbGQnO1xyXG5pbXBvcnQgRmllbGRNYW5hZ2VyIGZyb20gJ2FyZ29zL0ZpZWxkTWFuYWdlcic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ25hbWVGaWVsZCcpO1xyXG5cclxuY29uc3QgY29udHJvbCA9IGRlY2xhcmUoJ2NybS5GaWVsZHMuTmFtZUZpZWxkJywgW0VkaXRvckZpZWxkXSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGVtcHR5VGV4dDogcmVzb3VyY2UuZW1wdHlUZXh0LFxyXG4gIHdpZGdldFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgYDxsYWJlbCBmb3I9XCJ7JT0gJC5uYW1lICV9XCJcclxuICAgICAgeyUgaWYgKCQucmVxdWlyZWQpIHsgJX1cclxuICAgICAgICAgIGNsYXNzPVwicmVxdWlyZWRcIlxyXG4gICAgICB7JSB9ICV9PnslOiAkLmxhYmVsICV9PC9sYWJlbD5cclxuICAgIDxkaXYgY2xhc3M9XCJmaWVsZCBmaWVsZC1jb250cm9sLXdyYXBwZXJcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBzaW1wbGVTdWJIZWFkZXJCdXR0b24gZmllbGQtY29udHJvbC10cmlnZ2VyXHJcbiAgICAgICAgYXJpYS1sYWJlbD1cInslOiAkLmxvb2t1cExhYmVsVGV4dCAlfVwiPlxyXG4gICAgICAgIDxzdmcgY2xhc3M9XCJpY29uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+XHJcbiAgICAgICAgICA8dXNlIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhsaW5rOmhyZWY9XCIjaWNvbi17JTogJC5pY29uQ2xhc3MgJX1cIj48L3VzZT5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxpbnB1dCBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiaW5wdXROb2RlXCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIHR5cGU9XCJ0ZXh0XCIgLz5cclxuICAgIDwvZGl2PmAsXHJcbiAgXSksXHJcblxyXG4gIGljb25DbGFzczogJ3F1aWNrLWVkaXQnLFxyXG5cclxuICBjcmVhdGVOYXZpZ2F0aW9uT3B0aW9uczogZnVuY3Rpb24gY3JlYXRlTmF2aWdhdGlvbk9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5pbmhlcml0ZWQoY3JlYXRlTmF2aWdhdGlvbk9wdGlvbnMsIGFyZ3VtZW50cyk7XHJcbiAgICAvLyBOYW1lIGRvZXMgbm90IGhhdmUgYW4gZW50aXR5LlxyXG4gICAgZGVsZXRlIG9wdGlvbnMuZW50aXR5TmFtZTtcclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpZWxkTWFuYWdlci5yZWdpc3RlcignbmFtZScsIGNvbnRyb2wpO1xyXG4iXX0=