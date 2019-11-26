define('crm/Views/AreaCategoryIssueLookup', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/_LegacySDataListMixin', 'argos/I18n'], function (module, exports, _declare, _List, _LegacySDataListMixin2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _LegacySDataListMixin3 = _interopRequireDefault(_LegacySDataListMixin2);

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

  var resource = (0, _I18n2.default)('areaCategoryIssueLookup');

  /**
   * @class crm.Views.AreaCategoryIssueLookup
   *
   *
   * @extends argos.List
   * @mixins argos._LegacySDataListMixin
   *
   */
  var __class = (0, _declare2.default)('crm.Views.AreaCategoryIssueLookup', [_List2.default, _LegacySDataListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.$descriptor %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    pageSize: 200,
    expose: false,
    enableSearch: false,
    enablePullToRefresh: false,
    id: 'areacategoryissue_lookup',
    queryOrderBy: 'Area,Category,Issue',
    querySelect: ['Area', 'Category', 'Issue'],
    resourceKind: 'areaCategoryIssues',
    isCardView: false,

    show: function show(options) {
      this.active = options.where;

      options.where = false;

      this.inherited(arguments, [options]);
    },
    requestData: function requestData() {
      if (this.cache) {
        this.processFeed();
        this.isRefreshing = false;
      } else {
        this.inherited(requestData, arguments);
      }
    },
    processFeed: function processFeed(feed) {
      var theFeed = feed;
      // assume order is preserved
      if (theFeed) {
        this.createCacheFrom(feed);
      }

      var use = this.cache;

      if (use && this.active && this.active.Area) {
        use = use[this.active.Area];
      }
      if (use && this.active && this.active.Category) {
        use = use[this.active.Category];
      }

      theFeed = this.buildFeedFrom(use);

      this.inherited(arguments, [theFeed]);
    },
    createCacheFrom: function createCacheFrom(feed) {
      var feedLength = feed.$resources.length;
      this.cache = {};

      for (var i = 0; i < feedLength; i += 1) {
        var entry = feed.$resources[i];
        var area = this.cache[entry.Area] || (this.cache[entry.Area] = {});
        var category = area[entry.Category] || (area[entry.Category] = {});

        category[entry.Issue] = true;
      }
    },
    buildFeedFrom: function buildFeedFrom(segment) {
      var list = [];

      for (var n in segment) {
        if (segment.hasOwnProperty(n)) {
          list.push({
            $key: n,
            $descriptor: n
          });
        }
      }

      return {
        $resources: list
      };
    },
    hasMoreData: function hasMoreData() {
      return false; // todo: implement paging?
    },
    refreshRequiredFor: function refreshRequiredFor() {
      return true; // todo: implement refresh detection?
    },
    formatSearchQuery: function formatSearchQuery() {}
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9BcmVhQ2F0ZWdvcnlJc3N1ZUxvb2t1cC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsInBhZ2VTaXplIiwiZXhwb3NlIiwiZW5hYmxlU2VhcmNoIiwiZW5hYmxlUHVsbFRvUmVmcmVzaCIsImlkIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJpc0NhcmRWaWV3Iiwic2hvdyIsIm9wdGlvbnMiLCJhY3RpdmUiLCJ3aGVyZSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInJlcXVlc3REYXRhIiwiY2FjaGUiLCJwcm9jZXNzRmVlZCIsImlzUmVmcmVzaGluZyIsImZlZWQiLCJ0aGVGZWVkIiwiY3JlYXRlQ2FjaGVGcm9tIiwidXNlIiwiQXJlYSIsIkNhdGVnb3J5IiwiYnVpbGRGZWVkRnJvbSIsImZlZWRMZW5ndGgiLCIkcmVzb3VyY2VzIiwibGVuZ3RoIiwiaSIsImVudHJ5IiwiYXJlYSIsImNhdGVnb3J5IiwiSXNzdWUiLCJzZWdtZW50IiwibGlzdCIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCIka2V5IiwiJGRlc2NyaXB0b3IiLCJoYXNNb3JlRGF0YSIsInJlZnJlc2hSZXF1aXJlZEZvciIsImZvcm1hdFNlYXJjaFF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLHlCQUFaLENBQWpCOztBQUVBOzs7Ozs7OztBQVFBLE1BQU1DLFVBQVUsdUJBQVEsbUNBQVIsRUFBNkMsZ0RBQTdDLEVBQTRFO0FBQzFGO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QixzREFEeUIsQ0FBYixDQUY0RTs7QUFNMUY7QUFDQUMsZUFBV0osU0FBU0ksU0FQc0U7O0FBUzFGO0FBQ0FDLGNBQVUsR0FWZ0Y7QUFXMUZD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Q0FDcEI7QUFDZixLQXpGeUY7QUEwRjFGQyx3QkFBb0IsU0FBU0Esa0JBQVQsR0FBOEI7QUFDaEQsYUFBTyxJQUFQLENBRGdELENBQ25DO0FBQ2QsS0E1RnlGO0FBNkYxRkMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCLENBQy9DO0FBOUZ5RixHQUE1RSxDQUFoQjs7b0JBaUdlL0MsTyIsImZpbGUiOiJBcmVhQ2F0ZWdvcnlJc3N1ZUxvb2t1cC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgX0xlZ2FjeVNEYXRhTGlzdE1peGluIGZyb20gJ2FyZ29zL19MZWdhY3lTRGF0YUxpc3RNaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FyZWFDYXRlZ29yeUlzc3VlTG9va3VwJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BcmVhQ2F0ZWdvcnlJc3N1ZUxvb2t1cFxyXG4gKlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgYXJnb3MuX0xlZ2FjeVNEYXRhTGlzdE1peGluXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkFyZWFDYXRlZ29yeUlzc3VlTG9va3VwJywgW0xpc3QsIF9MZWdhY3lTRGF0YUxpc3RNaXhpbl0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuJGRlc2NyaXB0b3IgJX08L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIHBhZ2VTaXplOiAyMDAsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gIGVuYWJsZVB1bGxUb1JlZnJlc2g6IGZhbHNlLFxyXG4gIGlkOiAnYXJlYWNhdGVnb3J5aXNzdWVfbG9va3VwJyxcclxuICBxdWVyeU9yZGVyQnk6ICdBcmVhLENhdGVnb3J5LElzc3VlJyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0FyZWEnLFxyXG4gICAgJ0NhdGVnb3J5JyxcclxuICAgICdJc3N1ZScsXHJcbiAgXSxcclxuICByZXNvdXJjZUtpbmQ6ICdhcmVhQ2F0ZWdvcnlJc3N1ZXMnLFxyXG4gIGlzQ2FyZFZpZXc6IGZhbHNlLFxyXG5cclxuICBzaG93OiBmdW5jdGlvbiBzaG93KG9wdGlvbnMpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gb3B0aW9ucy53aGVyZTtcclxuXHJcbiAgICBvcHRpb25zLndoZXJlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzLCBbb3B0aW9uc10pO1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgaWYgKHRoaXMuY2FjaGUpIHtcclxuICAgICAgdGhpcy5wcm9jZXNzRmVlZCgpO1xyXG4gICAgICB0aGlzLmlzUmVmcmVzaGluZyA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbmhlcml0ZWQocmVxdWVzdERhdGEsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9jZXNzRmVlZDogZnVuY3Rpb24gcHJvY2Vzc0ZlZWQoZmVlZCkge1xyXG4gICAgbGV0IHRoZUZlZWQgPSBmZWVkO1xyXG4gICAgLy8gYXNzdW1lIG9yZGVyIGlzIHByZXNlcnZlZFxyXG4gICAgaWYgKHRoZUZlZWQpIHtcclxuICAgICAgdGhpcy5jcmVhdGVDYWNoZUZyb20oZmVlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHVzZSA9IHRoaXMuY2FjaGU7XHJcblxyXG4gICAgaWYgKHVzZSAmJiB0aGlzLmFjdGl2ZSAmJiB0aGlzLmFjdGl2ZS5BcmVhKSB7XHJcbiAgICAgIHVzZSA9IHVzZVt0aGlzLmFjdGl2ZS5BcmVhXTtcclxuICAgIH1cclxuICAgIGlmICh1c2UgJiYgdGhpcy5hY3RpdmUgJiYgdGhpcy5hY3RpdmUuQ2F0ZWdvcnkpIHtcclxuICAgICAgdXNlID0gdXNlW3RoaXMuYWN0aXZlLkNhdGVnb3J5XTtcclxuICAgIH1cclxuXHJcbiAgICB0aGVGZWVkID0gdGhpcy5idWlsZEZlZWRGcm9tKHVzZSk7XHJcblxyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzLCBbdGhlRmVlZF0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlQ2FjaGVGcm9tOiBmdW5jdGlvbiBjcmVhdGVDYWNoZUZyb20oZmVlZCkge1xyXG4gICAgY29uc3QgZmVlZExlbmd0aCA9IGZlZWQuJHJlc291cmNlcy5sZW5ndGg7XHJcbiAgICB0aGlzLmNhY2hlID0ge307XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWVkTGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgZW50cnkgPSBmZWVkLiRyZXNvdXJjZXNbaV07XHJcbiAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmNhY2hlW2VudHJ5LkFyZWFdIHx8ICh0aGlzLmNhY2hlW2VudHJ5LkFyZWFdID0ge30pO1xyXG4gICAgICBjb25zdCBjYXRlZ29yeSA9IGFyZWFbZW50cnkuQ2F0ZWdvcnldIHx8IChhcmVhW2VudHJ5LkNhdGVnb3J5XSA9IHt9KTtcclxuXHJcbiAgICAgIGNhdGVnb3J5W2VudHJ5Lklzc3VlXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBidWlsZEZlZWRGcm9tOiBmdW5jdGlvbiBidWlsZEZlZWRGcm9tKHNlZ21lbnQpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG4gaW4gc2VnbWVudCkge1xyXG4gICAgICBpZiAoc2VnbWVudC5oYXNPd25Qcm9wZXJ0eShuKSkge1xyXG4gICAgICAgIGxpc3QucHVzaCh7XHJcbiAgICAgICAgICAka2V5OiBuLFxyXG4gICAgICAgICAgJGRlc2NyaXB0b3I6IG4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGhhc01vcmVEYXRhOiBmdW5jdGlvbiBoYXNNb3JlRGF0YSgpIHtcclxuICAgIHJldHVybiBmYWxzZTsgLy8gdG9kbzogaW1wbGVtZW50IHBhZ2luZz9cclxuICB9LFxyXG4gIHJlZnJlc2hSZXF1aXJlZEZvcjogZnVuY3Rpb24gcmVmcmVzaFJlcXVpcmVkRm9yKCkge1xyXG4gICAgcmV0dXJuIHRydWU7IC8vIHRvZG86IGltcGxlbWVudCByZWZyZXNoIGRldGVjdGlvbj9cclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeSgpIHtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==