define('crm/Views/TicketActivity/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n', 'crm/Format', '../../Models/Names'], function (module, exports, _declare, _List, _I18n, _Format, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Format2 = _interopRequireDefault(_Format);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('ticketActivityList'); /* Copyright 2017 Infor
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

  var dtFormatResource = (0, _I18n2.default)('ticketActivityListDateTimeFormat');

  /**
   * @class crm.Views.TicketActivity.List
   *
   * @extends argos.List
   *
   * @requires crm.Format
   */
  var __class = (0, _declare2.default)('crm.Views.TicketActivity.List', [_List2.default], {
    format: _Format2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $$.format.date($.AssignedDate, (App.is24HourClock()) ? $$.startDateFormatText24 : $$.startDateFormatText) %}</p>', '<div class="note-text-item">', '<div class="note-text-wrap">', '{%: $.ActivityDescription %}', '</div>', '<div class="note-text-more"></div>', '</div>']),

    // Localization
    titleText: resource.titleText,
    startDateFormatText: dtFormatResource.startDateFormatText,
    startDateFormatText24: dtFormatResource.startDateFormatText24,

    // View Properties
    id: 'ticketactivity_list',
    security: 'Entities/TicketActivity/View',
    expose: false,
    labelProperty: 'Ticket.TicketNumber',
    detailView: 'ticketactivity_detail',
    insertView: 'ticketactivity_edit',
    queryOrderBy: null,
    querySelect: [],
    modelName: _Names2.default.TICKETACTIVITY,
    resourceKind: 'ticketActivities',

    _onResize: function _onResize() {
      $('.note-text-item', this.contentNode).each(function (i, node) {
        var wrapNode = $('.note-text-wrap', node)[0];
        var moreNode = $('.note-text-more', node)[0];
        if ($(node).height() < $(wrapNode).height()) {
          $(moreNode).show();
        } else {
          $(moreNode).hide();
        }
      });
    },
    processData: function processData() {
      this.inherited(processData, arguments);
      this._onResize();
    },
    postCreate: function postCreate() {
      this.inherited(postCreate, arguments);
      $(window).on('resize', this._onResize.bind(this));
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'ActivityDescription like "' + q + '%"';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9UaWNrZXRBY3Rpdml0eS9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJmb3JtYXQiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsInN0YXJ0RGF0ZUZvcm1hdFRleHQiLCJzdGFydERhdGVGb3JtYXRUZXh0MjQiLCJpZCIsInNlY3VyaXR5IiwiZXhwb3NlIiwibGFiZWxQcm9wZXJ0eSIsImRldGFpbFZpZXciLCJpbnNlcnRWaWV3IiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJtb2RlbE5hbWUiLCJUSUNLRVRBQ1RJVklUWSIsInJlc291cmNlS2luZCIsIl9vblJlc2l6ZSIsIiQiLCJjb250ZW50Tm9kZSIsImVhY2giLCJpIiwibm9kZSIsIndyYXBOb2RlIiwibW9yZU5vZGUiLCJoZWlnaHQiLCJzaG93IiwiaGlkZSIsInByb2Nlc3NEYXRhIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwicG9zdENyZWF0ZSIsIndpbmRvdyIsIm9uIiwiYmluZCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksb0JBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLG1CQUFtQixvQkFBWSxrQ0FBWixDQUF6Qjs7QUFFQTs7Ozs7OztBQU9BLE1BQU1DLFVBQVUsdUJBQVEsK0JBQVIsRUFBeUMsZ0JBQXpDLEVBQWlEO0FBQy9EQyw0QkFEK0Q7QUFFL0Q7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLDRJQUR5QixFQUV6Qiw4QkFGeUIsRUFHekIsOEJBSHlCLEVBSXpCLDhCQUp5QixFQUt6QixRQUx5QixFQU16QixvQ0FOeUIsRUFPekIsUUFQeUIsQ0FBYixDQUhpRDs7QUFhL0Q7QUFDQUMsZUFBV04sU0FBU00sU0FkMkM7QUFlL0RDLHlCQUFxQk4saUJBQWlCTSxtQkFmeUI7QUFnQi9EQywyQkFBdUJQLGlCQUFpQk8scUJBaEJ1Qjs7QUFrQi9EO0FBQ0FDLFFBQUkscUJBbkIyRDtBQW9CL0RDLGNBQVUsOEJBcEJxRDtBQXFCL0RDLFlBQVEsS0FyQnVEO0FBc0IvREMsbUJBQWUscUJBdEJnRDtBQXVCL0RDLGdCQUFZLHVCQXZCbUQ7QUF3Qi9EQyxnQkFBWSxxQkF4Qm1EO0FBeUIvREMsa0JBQWMsSUF6QmlEO0FBMEIvREMsaUJBQWEsRUExQmtEO0FBMkIvREMsZUFBVyxnQkFBWUMsY0EzQndDO0FBNEIvREMsa0JBQWMsa0JBNUJpRDs7QUE4Qi9EQyxlQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUJDLFFBQUUsaUJBQUYsRUFBcUIsS0FBS0MsV0FBMUIsRUFBdUNDLElBQXZDLENBQTRDLFVBQUNDLENBQUQsRUFBSUMsSUFBSixFQUFhO0FBQ3ZELFlBQU1DLFdBQVdMLEVBQUUsaUJBQUYsRUFBcUJJLElBQXJCLEVBQTJCLENBQTNCLENBQWpCO0FBQ0EsWUFBTUUsV0FBV04sRUFBRSxpQkFBRixFQUFxQkksSUFBckIsRUFBMkIsQ0FBM0IsQ0FBakI7QUFDQSxZQUFJSixFQUFFSSxJQUFGLEVBQVFHLE1BQVIsS0FBbUJQLEVBQUVLLFFBQUYsRUFBWUUsTUFBWixFQUF2QixFQUE2QztBQUMzQ1AsWUFBRU0sUUFBRixFQUFZRSxJQUFaO0FBQ0QsU0FGRCxNQUVPO0FBQ0xSLFlBQUVNLFFBQUYsRUFBWUcsSUFBWjtBQUNEO0FBQ0YsT0FSRDtBQVNELEtBeEM4RDtBQXlDL0RDLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsV0FBS0MsU0FBTCxDQUFlRCxXQUFmLEVBQTRCRSxTQUE1QjtBQUNBLFdBQUtiLFNBQUw7QUFDRCxLQTVDOEQ7QUE2Qy9EYyxnQkFBWSxTQUFTQSxVQUFULEdBQXNCO0FBQ2hDLFdBQUtGLFNBQUwsQ0FBZUUsVUFBZixFQUEyQkQsU0FBM0I7QUFDQVosUUFBRWMsTUFBRixFQUFVQyxFQUFWLENBQWEsUUFBYixFQUF1QixLQUFLaEIsU0FBTCxDQUFlaUIsSUFBZixDQUFvQixJQUFwQixDQUF2QjtBQUNELEtBaEQ4RDtBQWlEL0RDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsNENBQW9DRixDQUFwQztBQUNEO0FBcEQ4RCxHQUFqRCxDQUFoQjs7b0JBdURldEMsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCd0aWNrZXRBY3Rpdml0eUxpc3QnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCd0aWNrZXRBY3Rpdml0eUxpc3REYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuVGlja2V0QWN0aXZpdHkuTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLlRpY2tldEFjdGl2aXR5Lkxpc3QnLCBbTGlzdF0sIHtcclxuICBmb3JtYXQsXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkJC5mb3JtYXQuZGF0ZSgkLkFzc2lnbmVkRGF0ZSwgKEFwcC5pczI0SG91ckNsb2NrKCkpID8gJCQuc3RhcnREYXRlRm9ybWF0VGV4dDI0IDogJCQuc3RhcnREYXRlRm9ybWF0VGV4dCkgJX08L3A+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibm90ZS10ZXh0LWl0ZW1cIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJub3RlLXRleHQtd3JhcFwiPicsXHJcbiAgICAneyU6ICQuQWN0aXZpdHlEZXNjcmlwdGlvbiAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibm90ZS10ZXh0LW1vcmVcIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHN0YXJ0RGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnREYXRlRm9ybWF0VGV4dCxcclxuICBzdGFydERhdGVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnREYXRlRm9ybWF0VGV4dDI0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3RpY2tldGFjdGl2aXR5X2xpc3QnLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvVGlja2V0QWN0aXZpdHkvVmlldycsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBsYWJlbFByb3BlcnR5OiAnVGlja2V0LlRpY2tldE51bWJlcicsXHJcbiAgZGV0YWlsVmlldzogJ3RpY2tldGFjdGl2aXR5X2RldGFpbCcsXHJcbiAgaW5zZXJ0VmlldzogJ3RpY2tldGFjdGl2aXR5X2VkaXQnLFxyXG4gIHF1ZXJ5T3JkZXJCeTogbnVsbCxcclxuICBxdWVyeVNlbGVjdDogW10sXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5USUNLRVRBQ1RJVklUWSxcclxuICByZXNvdXJjZUtpbmQ6ICd0aWNrZXRBY3Rpdml0aWVzJyxcclxuXHJcbiAgX29uUmVzaXplOiBmdW5jdGlvbiBfb25SZXNpemUoKSB7XHJcbiAgICAkKCcubm90ZS10ZXh0LWl0ZW0nLCB0aGlzLmNvbnRlbnROb2RlKS5lYWNoKChpLCBub2RlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHdyYXBOb2RlID0gJCgnLm5vdGUtdGV4dC13cmFwJywgbm9kZSlbMF07XHJcbiAgICAgIGNvbnN0IG1vcmVOb2RlID0gJCgnLm5vdGUtdGV4dC1tb3JlJywgbm9kZSlbMF07XHJcbiAgICAgIGlmICgkKG5vZGUpLmhlaWdodCgpIDwgJCh3cmFwTm9kZSkuaGVpZ2h0KCkpIHtcclxuICAgICAgICAkKG1vcmVOb2RlKS5zaG93KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChtb3JlTm9kZSkuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHByb2Nlc3NEYXRhOiBmdW5jdGlvbiBwcm9jZXNzRGF0YSgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHByb2Nlc3NEYXRhLCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5fb25SZXNpemUoKTtcclxuICB9LFxyXG4gIHBvc3RDcmVhdGU6IGZ1bmN0aW9uIHBvc3RDcmVhdGUoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChwb3N0Q3JlYXRlLCBhcmd1bWVudHMpO1xyXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCB0aGlzLl9vblJlc2l6ZS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYEFjdGl2aXR5RGVzY3JpcHRpb24gbGlrZSBcIiR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19