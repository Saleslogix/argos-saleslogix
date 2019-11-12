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
      this.inherited(arguments);
      this._onResize();
    },
    postCreate: function postCreate() {
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9UaWNrZXRBY3Rpdml0eS9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJmb3JtYXQiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsInN0YXJ0RGF0ZUZvcm1hdFRleHQiLCJzdGFydERhdGVGb3JtYXRUZXh0MjQiLCJpZCIsInNlY3VyaXR5IiwiZXhwb3NlIiwibGFiZWxQcm9wZXJ0eSIsImRldGFpbFZpZXciLCJpbnNlcnRWaWV3IiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJtb2RlbE5hbWUiLCJUSUNLRVRBQ1RJVklUWSIsInJlc291cmNlS2luZCIsIl9vblJlc2l6ZSIsIiQiLCJjb250ZW50Tm9kZSIsImVhY2giLCJpIiwibm9kZSIsIndyYXBOb2RlIiwibW9yZU5vZGUiLCJoZWlnaHQiLCJzaG93IiwiaGlkZSIsInByb2Nlc3NEYXRhIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwicG9zdENyZWF0ZSIsIndpbmRvdyIsIm9uIiwiYmluZCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksb0JBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLG1CQUFtQixvQkFBWSxrQ0FBWixDQUF6Qjs7QUFFQTs7Ozs7OztBQU9BLE1BQU1DLFVBQVUsdUJBQVEsK0JBQVIsRUFBeUMsZ0JBQXpDLEVBQWlEO0FBQy9EQyw0QkFEK0Q7QUFFL0Q7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLDRJQUR5QixFQUV6Qiw4QkFGeUIsRUFHekIsOEJBSHlCLEVBSXpCLDhCQUp5QixFQUt6QixRQUx5QixFQU16QixvQ0FOeUIsRUFPekIsUUFQeUIsQ0FBYixDQUhpRDs7QUFhL0Q7QUFDQUMsZUFBV04sU0FBU00sU0FkMkM7QUFlL0RDLHlCQUFxQk4saUJBQWlCTSxtQkFmeUI7QUFnQi9EQywyQkFBdUJQLGlCQUFpQk8scUJBaEJ1Qjs7QUFrQi9EO0FBQ0FDLFFBQUkscUJBbkIyRDtBQW9CL0RDLGNBQVUsOEJBcEJxRDtBQXFCL0RDLFlBQVEsS0FyQnVEO0FBc0IvREMsbUJBQWUscUJBdEJnRDtBQXVCL0RDLGdCQUFZLHVCQXZCbUQ7QUF3Qi9EQyxnQkFBWSxxQkF4Qm1EO0FBeUIvREMsa0JBQWMsSUF6QmlEO0FBMEIvREMsaUJBQWEsRUExQmtEO0FBMkIvREMsZUFBVyxnQkFBWUMsY0EzQndDO0FBNEIvREMsa0JBQWMsa0JBNUJpRDs7QUE4Qi9EQyxlQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUJDLFFBQUUsaUJBQUYsRUFBcUIsS0FBS0MsV0FBMUIsRUFBdUNDLElBQXZDLENBQTRDLFVBQUNDLENBQUQsRUFBSUMsSUFBSixFQUFhO0FBQ3ZELFlBQU1DLFdBQVdMLEVBQUUsaUJBQUYsRUFBcUJJLElBQXJCLEVBQTJCLENBQTNCLENBQWpCO0FBQ0EsWUFBTUUsV0FBV04sRUFBRSxpQkFBRixFQUFxQkksSUFBckIsRUFBMkIsQ0FBM0IsQ0FBakI7QUFDQSxZQUFJSixFQUFFSSxJQUFGLEVBQVFHLE1BQVIsS0FBbUJQLEVBQUVLLFFBQUYsRUFBWUUsTUFBWixFQUF2QixFQUE2QztBQUMzQ1AsWUFBRU0sUUFBRixFQUFZRSxJQUFaO0FBQ0QsU0FGRCxNQUVPO0FBQ0xSLFlBQUVNLFFBQUYsRUFBWUcsSUFBWjtBQUNEO0FBQ0YsT0FSRDtBQVNELEtBeEM4RDtBQXlDL0RDLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsV0FBS0MsU0FBTCxDQUFlQyxTQUFmO0FBQ0EsV0FBS2IsU0FBTDtBQUNELEtBNUM4RDtBQTZDL0RjLGdCQUFZLFNBQVNBLFVBQVQsR0FBc0I7QUFDaEMsV0FBS0YsU0FBTCxDQUFlQyxTQUFmO0FBQ0FaLFFBQUVjLE1BQUYsRUFBVUMsRUFBVixDQUFhLFFBQWIsRUFBdUIsS0FBS2hCLFNBQUwsQ0FBZWlCLElBQWYsQ0FBb0IsSUFBcEIsQ0FBdkI7QUFDRCxLQWhEOEQ7QUFpRC9EQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLDRDQUFvQ0YsQ0FBcEM7QUFDRDtBQXBEOEQsR0FBakQsQ0FBaEI7O29CQXVEZXRDLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgndGlja2V0QWN0aXZpdHlMaXN0Jyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgndGlja2V0QWN0aXZpdHlMaXN0RGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlRpY2tldEFjdGl2aXR5Lkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5UaWNrZXRBY3Rpdml0eS5MaXN0JywgW0xpc3RdLCB7XHJcbiAgZm9ybWF0LFxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJCQuZm9ybWF0LmRhdGUoJC5Bc3NpZ25lZERhdGUsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/ICQkLnN0YXJ0RGF0ZUZvcm1hdFRleHQyNCA6ICQkLnN0YXJ0RGF0ZUZvcm1hdFRleHQpICV9PC9wPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cIm5vdGUtdGV4dC1pdGVtXCI+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibm90ZS10ZXh0LXdyYXBcIj4nLFxyXG4gICAgJ3slOiAkLkFjdGl2aXR5RGVzY3JpcHRpb24gJX0nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cIm5vdGUtdGV4dC1tb3JlXCI+PC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBzdGFydERhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0RGF0ZUZvcm1hdFRleHQsXHJcbiAgc3RhcnREYXRlRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0RGF0ZUZvcm1hdFRleHQyNCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICd0aWNrZXRhY3Rpdml0eV9saXN0JyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL1RpY2tldEFjdGl2aXR5L1ZpZXcnLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgbGFiZWxQcm9wZXJ0eTogJ1RpY2tldC5UaWNrZXROdW1iZXInLFxyXG4gIGRldGFpbFZpZXc6ICd0aWNrZXRhY3Rpdml0eV9kZXRhaWwnLFxyXG4gIGluc2VydFZpZXc6ICd0aWNrZXRhY3Rpdml0eV9lZGl0JyxcclxuICBxdWVyeU9yZGVyQnk6IG51bGwsXHJcbiAgcXVlcnlTZWxlY3Q6IFtdLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuVElDS0VUQUNUSVZJVFksXHJcbiAgcmVzb3VyY2VLaW5kOiAndGlja2V0QWN0aXZpdGllcycsXHJcblxyXG4gIF9vblJlc2l6ZTogZnVuY3Rpb24gX29uUmVzaXplKCkge1xyXG4gICAgJCgnLm5vdGUtdGV4dC1pdGVtJywgdGhpcy5jb250ZW50Tm9kZSkuZWFjaCgoaSwgbm9kZSkgPT4ge1xyXG4gICAgICBjb25zdCB3cmFwTm9kZSA9ICQoJy5ub3RlLXRleHQtd3JhcCcsIG5vZGUpWzBdO1xyXG4gICAgICBjb25zdCBtb3JlTm9kZSA9ICQoJy5ub3RlLXRleHQtbW9yZScsIG5vZGUpWzBdO1xyXG4gICAgICBpZiAoJChub2RlKS5oZWlnaHQoKSA8ICQod3JhcE5vZGUpLmhlaWdodCgpKSB7XHJcbiAgICAgICAgJChtb3JlTm9kZSkuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQobW9yZU5vZGUpLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBwcm9jZXNzRGF0YTogZnVuY3Rpb24gcHJvY2Vzc0RhdGEoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5fb25SZXNpemUoKTtcclxuICB9LFxyXG4gIHBvc3RDcmVhdGU6IGZ1bmN0aW9uIHBvc3RDcmVhdGUoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCB0aGlzLl9vblJlc2l6ZS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYEFjdGl2aXR5RGVzY3JpcHRpb24gbGlrZSBcIiR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19