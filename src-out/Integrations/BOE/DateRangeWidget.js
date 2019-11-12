define('crm/Integrations/BOE/DateRangeWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dijit/_Widget', 'argos/_Templated'], function (module, exports, _declare, _lang, _Widget2, _Templated2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Widget3 = _interopRequireDefault(_Widget2);

  var _Templated3 = _interopRequireDefault(_Templated2);

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

  /**
   * @class crm.Integrations.BOE.DateRangeWidget
   */
  var __class = (0, _declare2.default)('crm.Integrations.BOE.DateRangeWidget', [_Widget3.default, _Templated3.default], /** @lends crm.Integrations.BOE.DateRangeWidget# */{
    /**
       * @property {Simplate}
       * Simple that defines the HTML Markup
      */
    widgetTemplate: new Simplate(['<div class="range-widget">', '<button data-dojo-attach-event="onclick:changeRange">', '<div data-dojo-attach-point="rangeDetailNode" class="range-detail">', '{%! $.itemTemplate %}', '</div>', '</button>', '</div>']),

    /**
       * @property {Simplate}
       * HTML markup for the range detail (name/value)
      */
    itemTemplate: new Simplate(['<span class="range-value">{%: $.value %} {%: $.valueUnit %}</span>']),

    // Localization
    value: '',

    // This is the onclick function that is to be overriden by the class that is using this widget
    changeRange: function changeRange() {}
  });

  _lang2.default.setObject('crm.Views.DateRangeWidget', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL0RhdGVSYW5nZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwid2lkZ2V0VGVtcGxhdGUiLCJTaW1wbGF0ZSIsIml0ZW1UZW1wbGF0ZSIsInZhbHVlIiwiY2hhbmdlUmFuZ2UiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7OztBQVFBLE1BQU1BLFVBQVUsdUJBQVEsc0NBQVIsRUFBZ0QsdUNBQWhELEVBQXVFLG1EQUFtRDtBQUN4STs7OztBQUlBQyxvQkFBZ0IsSUFBSUMsUUFBSixDQUFhLENBQzNCLDRCQUQyQixFQUUzQix1REFGMkIsRUFHM0IscUVBSDJCLEVBSTNCLHVCQUoyQixFQUszQixRQUwyQixFQU0zQixXQU4yQixFQU8zQixRQVAyQixDQUFiLENBTHdIOztBQWV4STs7OztBQUlBQyxrQkFBYyxJQUFJRCxRQUFKLENBQWEsQ0FDekIsb0VBRHlCLENBQWIsQ0FuQjBIOztBQXVCeEk7QUFDQUUsV0FBTyxFQXhCaUk7O0FBMEJ4STtBQUNBQyxpQkFBYSxTQUFTQSxXQUFULEdBQXVCLENBQ25DO0FBNUJ1SSxHQUExSCxDQUFoQjs7QUErQkEsaUJBQUtDLFNBQUwsQ0FBZSwyQkFBZixFQUE0Q04sT0FBNUM7b0JBQ2VBLE8iLCJmaWxlIjoiRGF0ZVJhbmdlV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5EYXRlUmFuZ2VXaWRnZXRcclxuICovXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfV2lkZ2V0IGZyb20gJ2Rpaml0L19XaWRnZXQnO1xyXG5pbXBvcnQgX1RlbXBsYXRlZCBmcm9tICdhcmdvcy9fVGVtcGxhdGVkJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5EYXRlUmFuZ2VXaWRnZXQnLCBbX1dpZGdldCwgX1RlbXBsYXRlZF0sIC8qKiBAbGVuZHMgY3JtLkludGVncmF0aW9ucy5CT0UuRGF0ZVJhbmdlV2lkZ2V0IyAqL3tcclxuICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7U2ltcGxhdGV9XHJcbiAgICAgKiBTaW1wbGUgdGhhdCBkZWZpbmVzIHRoZSBIVE1MIE1hcmt1cFxyXG4gICAgKi9cclxuICB3aWRnZXRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwicmFuZ2Utd2lkZ2V0XCI+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtZG9qby1hdHRhY2gtZXZlbnQ9XCJvbmNsaWNrOmNoYW5nZVJhbmdlXCI+JyxcclxuICAgICc8ZGl2IGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJyYW5nZURldGFpbE5vZGVcIiBjbGFzcz1cInJhbmdlLWRldGFpbFwiPicsXHJcbiAgICAneyUhICQuaXRlbVRlbXBsYXRlICV9JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge1NpbXBsYXRlfVxyXG4gICAgICogSFRNTCBtYXJrdXAgZm9yIHRoZSByYW5nZSBkZXRhaWwgKG5hbWUvdmFsdWUpXHJcbiAgICAqL1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8c3BhbiBjbGFzcz1cInJhbmdlLXZhbHVlXCI+eyU6ICQudmFsdWUgJX0geyU6ICQudmFsdWVVbml0ICV9PC9zcGFuPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHZhbHVlOiAnJyxcclxuXHJcbiAgLy8gVGhpcyBpcyB0aGUgb25jbGljayBmdW5jdGlvbiB0aGF0IGlzIHRvIGJlIG92ZXJyaWRlbiBieSB0aGUgY2xhc3MgdGhhdCBpcyB1c2luZyB0aGlzIHdpZGdldFxyXG4gIGNoYW5nZVJhbmdlOiBmdW5jdGlvbiBjaGFuZ2VSYW5nZSgpIHtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdjcm0uVmlld3MuRGF0ZVJhbmdlV2lkZ2V0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==