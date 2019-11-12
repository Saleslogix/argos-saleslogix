define('crm/Template', ['module', 'exports', 'dojo/_base/lang', 'argos/Format'], function (module, exports, _lang) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Template
   * @classdesc Helper class that contains re-usuable {@link Simplate} templates.
   * @requires argos.Format
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

  var __class = _lang2.default.setObject('crm.Template', /** @lends crm.Template */{
    /**
     * @property {Simplate} nameLF
     * Template for lastname, firstname
     */
    nameLF: new Simplate(['{% if ($) { %}', '{% if ($.LastName && $.FirstName) { %}', '{%= $.LastName %}, {%= $.FirstName%}', '{% } else { %}', '{%: $.LastName ? $.LastName : $.FirstName %}', '{% } %}', '{% } %}']),

    /**
     * @property {Simplate} alternateKeyPrefixSuffix
     * Template for alternate key, takes a prefix and suffix
     */
    alternateKeyPrefixSuffix: new Simplate(['{%= $.AlternateKeyPrefix %}-{%= $.AlternateKeySuffix %}']),

    /**
     * @property {Simplate} noteDetailPropertyOld
     * Template for note details
     */
    noteDetailPropertyOld: new Simplate(['{% var F = argos.Format; %}', // TODO: Avoid global
    '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">', '<label>{%: $.label %}</label>', '<div class="note-text-property">', '<div class="note-text-wrap">', '{%= F.nl2br(F.encode($.value)) %}', '</div>', '</div>', '</div>']),

    /**
     * @property {Simplate} noteDetailProperty
     * Template for note details
     */
    noteDetailProperty: new Simplate(['{% var F = argos.Format; %}', // TODO: Avoid global
    '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">', '<label>{%: $.label %}</label>', '<pre>', '{%= F.encode($.value) %}', '</pre>', '</div>'])
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UZW1wbGF0ZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwic2V0T2JqZWN0IiwibmFtZUxGIiwiU2ltcGxhdGUiLCJhbHRlcm5hdGVLZXlQcmVmaXhTdWZmaXgiLCJub3RlRGV0YWlsUHJvcGVydHlPbGQiLCJub3RlRGV0YWlsUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFrQkE7Ozs7O0FBbEJBOzs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsVUFBVSxlQUFLQyxTQUFMLENBQWUsY0FBZixFQUErQiwwQkFBMkI7QUFDeEU7Ozs7QUFJQUMsWUFBUSxJQUFJQyxRQUFKLENBQWEsQ0FDbkIsZ0JBRG1CLEVBRW5CLHdDQUZtQixFQUduQixzQ0FIbUIsRUFJbkIsZ0JBSm1CLEVBS25CLDhDQUxtQixFQU1uQixTQU5tQixFQU9uQixTQVBtQixDQUFiLENBTGdFOztBQWV4RTs7OztBQUlBQyw4QkFBMEIsSUFBSUQsUUFBSixDQUFhLENBQ3JDLHlEQURxQyxDQUFiLENBbkI4Qzs7QUF1QnhFOzs7O0FBSUFFLDJCQUF1QixJQUFJRixRQUFKLENBQWEsQ0FDbEMsNkJBRGtDLEVBQ0g7QUFDL0IsZ0ZBRmtDLEVBR2xDLCtCQUhrQyxFQUlsQyxrQ0FKa0MsRUFLbEMsOEJBTGtDLEVBTWxDLG1DQU5rQyxFQU9sQyxRQVBrQyxFQVFsQyxRQVJrQyxFQVNsQyxRQVRrQyxDQUFiLENBM0JpRDs7QUF1Q3hFOzs7O0FBSUFHLHdCQUFvQixJQUFJSCxRQUFKLENBQWEsQ0FDL0IsNkJBRCtCLEVBQ0E7QUFDL0IsZ0ZBRitCLEVBRy9CLCtCQUgrQixFQUkvQixPQUorQixFQUsvQiwwQkFMK0IsRUFNL0IsUUFOK0IsRUFPL0IsUUFQK0IsQ0FBYjtBQTNDb0QsR0FBMUQsQ0FBaEI7O29CQXNEZUgsTyIsImZpbGUiOiJUZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCAnYXJnb3MvRm9ybWF0JztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlRlbXBsYXRlXHJcbiAqIEBjbGFzc2Rlc2MgSGVscGVyIGNsYXNzIHRoYXQgY29udGFpbnMgcmUtdXN1YWJsZSB7QGxpbmsgU2ltcGxhdGV9IHRlbXBsYXRlcy5cclxuICogQHJlcXVpcmVzIGFyZ29zLkZvcm1hdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGxhbmcuc2V0T2JqZWN0KCdjcm0uVGVtcGxhdGUnLCAvKiogQGxlbmRzIGNybS5UZW1wbGF0ZSAqLyB7XHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtTaW1wbGF0ZX0gbmFtZUxGXHJcbiAgICogVGVtcGxhdGUgZm9yIGxhc3RuYW1lLCBmaXJzdG5hbWVcclxuICAgKi9cclxuICBuYW1lTEY6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQpIHsgJX0nLFxyXG4gICAgJ3slIGlmICgkLkxhc3ROYW1lICYmICQuRmlyc3ROYW1lKSB7ICV9JyxcclxuICAgICd7JT0gJC5MYXN0TmFtZSAlfSwgeyU9ICQuRmlyc3ROYW1lJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JTogJC5MYXN0TmFtZSA/ICQuTGFzdE5hbWUgOiAkLkZpcnN0TmFtZSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7U2ltcGxhdGV9IGFsdGVybmF0ZUtleVByZWZpeFN1ZmZpeFxyXG4gICAqIFRlbXBsYXRlIGZvciBhbHRlcm5hdGUga2V5LCB0YWtlcyBhIHByZWZpeCBhbmQgc3VmZml4XHJcbiAgICovXHJcbiAgYWx0ZXJuYXRlS2V5UHJlZml4U3VmZml4OiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slPSAkLkFsdGVybmF0ZUtleVByZWZpeCAlfS17JT0gJC5BbHRlcm5hdGVLZXlTdWZmaXggJX0nLFxyXG4gIF0pLFxyXG5cclxuICAvKipcclxuICAgKiBAcHJvcGVydHkge1NpbXBsYXRlfSBub3RlRGV0YWlsUHJvcGVydHlPbGRcclxuICAgKiBUZW1wbGF0ZSBmb3Igbm90ZSBkZXRhaWxzXHJcbiAgICovXHJcbiAgbm90ZURldGFpbFByb3BlcnR5T2xkOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIHZhciBGID0gYXJnb3MuRm9ybWF0OyAlfScsIC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG4gICAgJzxkaXYgY2xhc3M9XCJyb3cgbm90ZS10ZXh0LXJvdyB7JT0gJC5jbHMgJX1cIiBkYXRhLXByb3BlcnR5PVwieyU9ICQubmFtZSAlfVwiPicsXHJcbiAgICAnPGxhYmVsPnslOiAkLmxhYmVsICV9PC9sYWJlbD4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJub3RlLXRleHQtcHJvcGVydHlcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJub3RlLXRleHQtd3JhcFwiPicsXHJcbiAgICAneyU9IEYubmwyYnIoRi5lbmNvZGUoJC52YWx1ZSkpICV9JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtTaW1wbGF0ZX0gbm90ZURldGFpbFByb3BlcnR5XHJcbiAgICogVGVtcGxhdGUgZm9yIG5vdGUgZGV0YWlsc1xyXG4gICAqL1xyXG4gIG5vdGVEZXRhaWxQcm9wZXJ0eTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSB2YXIgRiA9IGFyZ29zLkZvcm1hdDsgJX0nLCAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgICc8ZGl2IGNsYXNzPVwicm93IG5vdGUtdGV4dC1yb3cgeyU9ICQuY2xzICV9XCIgZGF0YS1wcm9wZXJ0eT1cInslPSAkLm5hbWUgJX1cIj4nLFxyXG4gICAgJzxsYWJlbD57JTogJC5sYWJlbCAlfTwvbGFiZWw+JyxcclxuICAgICc8cHJlPicsXHJcbiAgICAneyU9IEYuZW5jb2RlKCQudmFsdWUpICV9JyxcclxuICAgICc8L3ByZT4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19