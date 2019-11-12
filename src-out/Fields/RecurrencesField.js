define('crm/Fields/RecurrencesField', ['module', 'exports', 'dojo/_base/declare', 'argos/Fields/EditorField', 'argos/FieldManager', 'argos/I18n'], function (module, exports, _declare, _EditorField, _FieldManager, _I18n) {
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

  var resource = (0, _I18n2.default)('recurrencesField');

  var control = (0, _declare2.default)('crm.Fields.RecurrencesField', [_EditorField2.default], {
    // Localization
    titleText: resource.titleText,
    emptyText: resource.emptyText,
    attributeMap: {
      noteText: {
        node: 'inputNode',
        type: 'innerHTML'
      }
    },

    widgetTemplate: new Simplate(['<label for="{%= $.name %}">{%: $.label %}</label>', '<div class="field field-control-wrapper">', '<button class="button simpleSubHeaderButton field-control-trigger {% if ($$.iconClass) { %} {%: $$.iconClass %} {% } %}" aria-label="{%: $.lookupLabelText %}">\n      <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%: $.iconClass %}"></use>\n      </svg>\n      <span>{%: $.lookupText %}</span>\n    </button>', '<div data-dojo-attach-point="inputNode" class="note-text"></div>', '</div>']),
    iconClass: 'more',

    setText: function setText(text) {
      this.set('noteText', text);
    }
  });

  exports.default = _FieldManager2.default.register('recurrences', control);
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9GaWVsZHMvUmVjdXJyZW5jZXNGaWVsZC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImNvbnRyb2wiLCJ0aXRsZVRleHQiLCJlbXB0eVRleHQiLCJhdHRyaWJ1dGVNYXAiLCJub3RlVGV4dCIsIm5vZGUiLCJ0eXBlIiwid2lkZ2V0VGVtcGxhdGUiLCJTaW1wbGF0ZSIsImljb25DbGFzcyIsInNldFRleHQiLCJ0ZXh0Iiwic2V0IiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU1BLFdBQVcsb0JBQVksa0JBQVosQ0FBakI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSw2QkFBUixFQUF1Qyx1QkFBdkMsRUFBc0Q7QUFDcEU7QUFDQUMsZUFBV0YsU0FBU0UsU0FGZ0Q7QUFHcEVDLGVBQVdILFNBQVNHLFNBSGdEO0FBSXBFQyxrQkFBYztBQUNaQyxnQkFBVTtBQUNSQyxjQUFNLFdBREU7QUFFUkMsY0FBTTtBQUZFO0FBREUsS0FKc0Q7O0FBV3BFQyxvQkFBZ0IsSUFBSUMsUUFBSixDQUFhLENBQzNCLG1EQUQyQixFQUUzQiwyQ0FGMkIsbWFBUzNCLGtFQVQyQixFQVUzQixRQVYyQixDQUFiLENBWG9EO0FBdUJwRUMsZUFBVyxNQXZCeUQ7O0FBeUJwRUMsYUFBUyxTQUFTQSxPQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUM5QixXQUFLQyxHQUFMLENBQVMsVUFBVCxFQUFxQkQsSUFBckI7QUFDRDtBQTNCbUUsR0FBdEQsQ0FBaEI7O29CQThCZSx1QkFBYUUsUUFBYixDQUFzQixhQUF0QixFQUFxQ2IsT0FBckMsQyIsImZpbGUiOiJSZWN1cnJlbmNlc0ZpZWxkLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IEVkaXRvckZpZWxkIGZyb20gJ2FyZ29zL0ZpZWxkcy9FZGl0b3JGaWVsZCc7XHJcbmltcG9ydCBGaWVsZE1hbmFnZXIgZnJvbSAnYXJnb3MvRmllbGRNYW5hZ2VyJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncmVjdXJyZW5jZXNGaWVsZCcpO1xyXG5cclxuY29uc3QgY29udHJvbCA9IGRlY2xhcmUoJ2NybS5GaWVsZHMuUmVjdXJyZW5jZXNGaWVsZCcsIFtFZGl0b3JGaWVsZF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBlbXB0eVRleHQ6IHJlc291cmNlLmVtcHR5VGV4dCxcclxuICBhdHRyaWJ1dGVNYXA6IHtcclxuICAgIG5vdGVUZXh0OiB7XHJcbiAgICAgIG5vZGU6ICdpbnB1dE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgd2lkZ2V0VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxhYmVsIGZvcj1cInslPSAkLm5hbWUgJX1cIj57JTogJC5sYWJlbCAlfTwvbGFiZWw+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiZmllbGQgZmllbGQtY29udHJvbC13cmFwcGVyXCI+JyxcclxuICAgIGA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIHNpbXBsZVN1YkhlYWRlckJ1dHRvbiBmaWVsZC1jb250cm9sLXRyaWdnZXIgeyUgaWYgKCQkLmljb25DbGFzcykgeyAlfSB7JTogJCQuaWNvbkNsYXNzICV9IHslIH0gJX1cIiBhcmlhLWxhYmVsPVwieyU6ICQubG9va3VwTGFiZWxUZXh0ICV9XCI+XHJcbiAgICAgIDxzdmcgY2xhc3M9XCJpY29uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+XHJcbiAgICAgICAgPHVzZSB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bGluazpocmVmPVwiI2ljb24teyU6ICQuaWNvbkNsYXNzICV9XCI+PC91c2U+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICA8c3Bhbj57JTogJC5sb29rdXBUZXh0ICV9PC9zcGFuPlxyXG4gICAgPC9idXR0b24+YCxcclxuICAgICc8ZGl2IGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJpbnB1dE5vZGVcIiBjbGFzcz1cIm5vdGUtdGV4dFwiPjwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBpY29uQ2xhc3M6ICdtb3JlJyxcclxuXHJcbiAgc2V0VGV4dDogZnVuY3Rpb24gc2V0VGV4dCh0ZXh0KSB7XHJcbiAgICB0aGlzLnNldCgnbm90ZVRleHQnLCB0ZXh0KTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpZWxkTWFuYWdlci5yZWdpc3RlcigncmVjdXJyZW5jZXMnLCBjb250cm9sKTtcclxuIl19