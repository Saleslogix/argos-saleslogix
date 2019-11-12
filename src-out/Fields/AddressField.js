define('crm/Fields/AddressField', ['module', 'exports', 'dojo/_base/declare', 'argos/Fields/EditorField', 'argos/FieldManager', 'argos/I18n'], function (module, exports, _declare, _EditorField, _FieldManager, _I18n) {
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

  var resource = (0, _I18n2.default)('addressField');

  var control = (0, _declare2.default)('crm.Fields.AddressField', [_EditorField2.default], {
    widgetTemplate: new Simplate(['<label for="{%= $.name %}">{%: $.label %}</label>\n    <div class="field field-control-wrapper">\n      <button\n        class="button simpleSubHeaderButton field-control-trigger"\n        aria-label="{%: $.lookupLabelText %}">\n        <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%: $.iconClass %}"></use>\n        </svg>\n      </button>\n      <label data-dojo-attach-point="inputNode"></label>\n    </div>']),
    iconClass: 'quick-edit',

    attributeMap: {
      addressContent: {
        node: 'inputNode',
        type: 'innerHTML'
      }
    },
    rows: 4,
    lookupLabelText: resource.lookupLabelText,
    emptyText: resource.emptyText,

    _enableTextElement: function _enableTextElement() {},
    _disableTextElement: function _disableTextElement() {},
    setText: function setText(text) {
      this.set('addressContent', text);
    }
  });

  exports.default = _FieldManager2.default.register('address', control);
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9GaWVsZHMvQWRkcmVzc0ZpZWxkLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiY29udHJvbCIsIndpZGdldFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpY29uQ2xhc3MiLCJhdHRyaWJ1dGVNYXAiLCJhZGRyZXNzQ29udGVudCIsIm5vZGUiLCJ0eXBlIiwicm93cyIsImxvb2t1cExhYmVsVGV4dCIsImVtcHR5VGV4dCIsIl9lbmFibGVUZXh0RWxlbWVudCIsIl9kaXNhYmxlVGV4dEVsZW1lbnQiLCJzZXRUZXh0IiwidGV4dCIsInNldCIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLGNBQVosQ0FBakI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSx5QkFBUixFQUFtQyx1QkFBbkMsRUFBa0Q7QUFDaEVDLG9CQUFnQixJQUFJQyxRQUFKLENBQWEsMmdCQUFiLENBRGdEO0FBY2hFQyxlQUFXLFlBZHFEOztBQWdCaEVDLGtCQUFjO0FBQ1pDLHNCQUFnQjtBQUNkQyxjQUFNLFdBRFE7QUFFZEMsY0FBTTtBQUZRO0FBREosS0FoQmtEO0FBc0JoRUMsVUFBTSxDQXRCMEQ7QUF1QmhFQyxxQkFBaUJWLFNBQVNVLGVBdkJzQztBQXdCaEVDLGVBQVdYLFNBQVNXLFNBeEI0Qzs7QUEwQmhFQyx3QkFBb0IsU0FBU0Esa0JBQVQsR0FBOEIsQ0FBRSxDQTFCWTtBQTJCaEVDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQixDQUFFLENBM0JVO0FBNEJoRUMsYUFBUyxTQUFTQSxPQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUM5QixXQUFLQyxHQUFMLENBQVMsZ0JBQVQsRUFBMkJELElBQTNCO0FBQ0Q7QUE5QitELEdBQWxELENBQWhCOztvQkFpQ2UsdUJBQWFFLFFBQWIsQ0FBc0IsU0FBdEIsRUFBaUNoQixPQUFqQyxDIiwiZmlsZSI6IkFkZHJlc3NGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBFZGl0b3JGaWVsZCBmcm9tICdhcmdvcy9GaWVsZHMvRWRpdG9yRmllbGQnO1xyXG5pbXBvcnQgRmllbGRNYW5hZ2VyIGZyb20gJ2FyZ29zL0ZpZWxkTWFuYWdlcic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FkZHJlc3NGaWVsZCcpO1xyXG5cclxuY29uc3QgY29udHJvbCA9IGRlY2xhcmUoJ2NybS5GaWVsZHMuQWRkcmVzc0ZpZWxkJywgW0VkaXRvckZpZWxkXSwge1xyXG4gIHdpZGdldFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgYDxsYWJlbCBmb3I9XCJ7JT0gJC5uYW1lICV9XCI+eyU6ICQubGFiZWwgJX08L2xhYmVsPlxyXG4gICAgPGRpdiBjbGFzcz1cImZpZWxkIGZpZWxkLWNvbnRyb2wtd3JhcHBlclwiPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgY2xhc3M9XCJidXR0b24gc2ltcGxlU3ViSGVhZGVyQnV0dG9uIGZpZWxkLWNvbnRyb2wtdHJpZ2dlclwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD1cInslOiAkLmxvb2t1cExhYmVsVGV4dCAlfVwiPlxyXG4gICAgICAgIDxzdmcgY2xhc3M9XCJpY29uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+XHJcbiAgICAgICAgICA8dXNlIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhsaW5rOmhyZWY9XCIjaWNvbi17JTogJC5pY29uQ2xhc3MgJX1cIj48L3VzZT5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxsYWJlbCBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiaW5wdXROb2RlXCI+PC9sYWJlbD5cclxuICAgIDwvZGl2PmAsXHJcbiAgXSksXHJcbiAgaWNvbkNsYXNzOiAncXVpY2stZWRpdCcsXHJcblxyXG4gIGF0dHJpYnV0ZU1hcDoge1xyXG4gICAgYWRkcmVzc0NvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2lucHV0Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJvd3M6IDQsXHJcbiAgbG9va3VwTGFiZWxUZXh0OiByZXNvdXJjZS5sb29rdXBMYWJlbFRleHQsXHJcbiAgZW1wdHlUZXh0OiByZXNvdXJjZS5lbXB0eVRleHQsXHJcblxyXG4gIF9lbmFibGVUZXh0RWxlbWVudDogZnVuY3Rpb24gX2VuYWJsZVRleHRFbGVtZW50KCkge30sXHJcbiAgX2Rpc2FibGVUZXh0RWxlbWVudDogZnVuY3Rpb24gX2Rpc2FibGVUZXh0RWxlbWVudCgpIHt9LFxyXG4gIHNldFRleHQ6IGZ1bmN0aW9uIHNldFRleHQodGV4dCkge1xyXG4gICAgdGhpcy5zZXQoJ2FkZHJlc3NDb250ZW50JywgdGV4dCk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWVsZE1hbmFnZXIucmVnaXN0ZXIoJ2FkZHJlc3MnLCBjb250cm9sKTtcclxuIl19