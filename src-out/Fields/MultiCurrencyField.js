define('crm/Fields/MultiCurrencyField', ['module', 'exports', 'dojo/_base/declare', 'argos/Fields/DecimalField', 'argos/FieldManager'], function (module, exports, _declare, _DecimalField, _FieldManager) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _DecimalField2 = _interopRequireDefault(_DecimalField);

  var _FieldManager2 = _interopRequireDefault(_FieldManager);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var control = (0, _declare2.default)('crm.Fields.MultiCurrencyField', [_DecimalField2.default], {
    attributeMap: {
      inputValue: {
        node: 'inputNode',
        type: 'attribute',
        attribute: 'value'
      },
      currencyCode: {
        node: 'currencyCodeNode',
        type: 'innerHTML'
      }
    },
    widgetTemplate: new Simplate(['<label for="{%= $.name %}">{%: $.label %}</label>', '{% if ($.enableClearButton && !$.readonly) { %}', '<button class="clear-button" data-dojo-attach-point="clearNode" data-dojo-attach-event="onclick:_onClearClick"></button>', '{% } %}', '<span data-dojo-attach-point="currencyCodeNode" class="currency-code-editlabel">{%: $.currencyCode %}</span>', '<input data-dojo-attach-point="inputNode" data-dojo-attach-event="onkeyup: _onKeyUp, onblur: _onBlur, onfocus: _onFocus" class="text-input" type="{%: $.inputType %}" name="{%= $.name %}" {% if ($.readonly) { %} readonly {% } %}>']),
    currencyCode: '',
    setCurrencyCode: function setCurrencyCode(code) {
      this.set('currencyCode', code);
    }
  }); /* Copyright 2017 Infor
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

  exports.default = _FieldManager2.default.register('multiCurrency', control);
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9GaWVsZHMvTXVsdGlDdXJyZW5jeUZpZWxkLmpzIl0sIm5hbWVzIjpbImNvbnRyb2wiLCJhdHRyaWJ1dGVNYXAiLCJpbnB1dFZhbHVlIiwibm9kZSIsInR5cGUiLCJhdHRyaWJ1dGUiLCJjdXJyZW5jeUNvZGUiLCJ3aWRnZXRUZW1wbGF0ZSIsIlNpbXBsYXRlIiwic2V0Q3VycmVuY3lDb2RlIiwiY29kZSIsInNldCIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNQSxVQUFVLHVCQUFRLCtCQUFSLEVBQXlDLHdCQUF6QyxFQUF5RDtBQUN2RUMsa0JBQWM7QUFDWkMsa0JBQVk7QUFDVkMsY0FBTSxXQURJO0FBRVZDLGNBQU0sV0FGSTtBQUdWQyxtQkFBVztBQUhELE9BREE7QUFNWkMsb0JBQWM7QUFDWkgsY0FBTSxrQkFETTtBQUVaQyxjQUFNO0FBRk07QUFORixLQUR5RDtBQVl2RUcsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxDQUMzQixtREFEMkIsRUFFM0IsaURBRjJCLEVBRzNCLDBIQUgyQixFQUkzQixTQUoyQixFQUszQiw4R0FMMkIsRUFNM0Isc09BTjJCLENBQWIsQ0FadUQ7QUFvQnZFRixrQkFBYyxFQXBCeUQ7QUFxQnZFRyxxQkFBaUIsU0FBU0EsZUFBVCxDQUF5QkMsSUFBekIsRUFBK0I7QUFDOUMsV0FBS0MsR0FBTCxDQUFTLGNBQVQsRUFBeUJELElBQXpCO0FBQ0Q7QUF2QnNFLEdBQXpELENBQWhCLEMsQ0FuQkE7Ozs7Ozs7Ozs7Ozs7OztvQkE2Q2UsdUJBQWFFLFFBQWIsQ0FBc0IsZUFBdEIsRUFBdUNaLE9BQXZDLEMiLCJmaWxlIjoiTXVsdGlDdXJyZW5jeUZpZWxkLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IERlY2ltYWxGaWVsZCBmcm9tICdhcmdvcy9GaWVsZHMvRGVjaW1hbEZpZWxkJztcclxuaW1wb3J0IEZpZWxkTWFuYWdlciBmcm9tICdhcmdvcy9GaWVsZE1hbmFnZXInO1xyXG5cclxuY29uc3QgY29udHJvbCA9IGRlY2xhcmUoJ2NybS5GaWVsZHMuTXVsdGlDdXJyZW5jeUZpZWxkJywgW0RlY2ltYWxGaWVsZF0sIHtcclxuICBhdHRyaWJ1dGVNYXA6IHtcclxuICAgIGlucHV0VmFsdWU6IHtcclxuICAgICAgbm9kZTogJ2lucHV0Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdhdHRyaWJ1dGUnLFxyXG4gICAgICBhdHRyaWJ1dGU6ICd2YWx1ZScsXHJcbiAgICB9LFxyXG4gICAgY3VycmVuY3lDb2RlOiB7XHJcbiAgICAgIG5vZGU6ICdjdXJyZW5jeUNvZGVOb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgd2lkZ2V0VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxhYmVsIGZvcj1cInslPSAkLm5hbWUgJX1cIj57JTogJC5sYWJlbCAlfTwvbGFiZWw+JyxcclxuICAgICd7JSBpZiAoJC5lbmFibGVDbGVhckJ1dHRvbiAmJiAhJC5yZWFkb25seSkgeyAlfScsXHJcbiAgICAnPGJ1dHRvbiBjbGFzcz1cImNsZWFyLWJ1dHRvblwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJjbGVhck5vZGVcIiBkYXRhLWRvam8tYXR0YWNoLWV2ZW50PVwib25jbGljazpfb25DbGVhckNsaWNrXCI+PC9idXR0b24+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8c3BhbiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiY3VycmVuY3lDb2RlTm9kZVwiIGNsYXNzPVwiY3VycmVuY3ktY29kZS1lZGl0bGFiZWxcIj57JTogJC5jdXJyZW5jeUNvZGUgJX08L3NwYW4+JyxcclxuICAgICc8aW5wdXQgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImlucHV0Tm9kZVwiIGRhdGEtZG9qby1hdHRhY2gtZXZlbnQ9XCJvbmtleXVwOiBfb25LZXlVcCwgb25ibHVyOiBfb25CbHVyLCBvbmZvY3VzOiBfb25Gb2N1c1wiIGNsYXNzPVwidGV4dC1pbnB1dFwiIHR5cGU9XCJ7JTogJC5pbnB1dFR5cGUgJX1cIiBuYW1lPVwieyU9ICQubmFtZSAlfVwiIHslIGlmICgkLnJlYWRvbmx5KSB7ICV9IHJlYWRvbmx5IHslIH0gJX0+JyxcclxuICBdKSxcclxuICBjdXJyZW5jeUNvZGU6ICcnLFxyXG4gIHNldEN1cnJlbmN5Q29kZTogZnVuY3Rpb24gc2V0Q3VycmVuY3lDb2RlKGNvZGUpIHtcclxuICAgIHRoaXMuc2V0KCdjdXJyZW5jeUNvZGUnLCBjb2RlKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpZWxkTWFuYWdlci5yZWdpc3RlcignbXVsdGlDdXJyZW5jeScsIGNvbnRyb2wpO1xyXG4iXX0=