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
        this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9BcmVhQ2F0ZWdvcnlJc3N1ZUxvb2t1cC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsInBhZ2VTaXplIiwiZXhwb3NlIiwiZW5hYmxlU2VhcmNoIiwiZW5hYmxlUHVsbFRvUmVmcmVzaCIsImlkIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJpc0NhcmRWaWV3Iiwic2hvdyIsIm9wdGlvbnMiLCJhY3RpdmUiLCJ3aGVyZSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInJlcXVlc3REYXRhIiwiY2FjaGUiLCJwcm9jZXNzRmVlZCIsImlzUmVmcmVzaGluZyIsImZlZWQiLCJ0aGVGZWVkIiwiY3JlYXRlQ2FjaGVGcm9tIiwidXNlIiwiQXJlYSIsIkNhdGVnb3J5IiwiYnVpbGRGZWVkRnJvbSIsImZlZWRMZW5ndGgiLCIkcmVzb3VyY2VzIiwibGVuZ3RoIiwiaSIsImVudHJ5IiwiYXJlYSIsImNhdGVnb3J5IiwiSXNzdWUiLCJzZWdtZW50IiwibGlzdCIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCIka2V5IiwiJGRlc2NyaXB0b3IiLCJoYXNNb3JlRGF0YSIsInJlZnJlc2hSZXF1aXJlZEZvciIsImZvcm1hdFNlYXJjaFF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLHlCQUFaLENBQWpCOztBQUVBOzs7Ozs7OztBQVFBLE1BQU1DLFVBQVUsdUJBQVEsbUNBQVIsRUFBNkMsZ0RBQTdDLEVBQTRFO0FBQzFGO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QixzREFEeUIsQ0FBYixDQUY0RTs7QUFNMUY7QUFDQUMsZUFBV0osU0FBU0ksU0FQc0U7O0FBUzFGO0FBQ0FDLGNBQVUsR0FWZ0Y7QUFXMUZD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ekZ5RjtBQTBGMUZDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxhQUFPLElBQVAsQ0FEZ0QsQ0FDbkM7QUFDZCxLQTVGeUY7QUE2RjFGQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkIsQ0FDL0M7QUE5RnlGLEdBQTVFLENBQWhCOztvQkFpR2UvQyxPIiwiZmlsZSI6IkFyZWFDYXRlZ29yeUlzc3VlTG9va3VwLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBfTGVnYWN5U0RhdGFMaXN0TWl4aW4gZnJvbSAnYXJnb3MvX0xlZ2FjeVNEYXRhTGlzdE1peGluJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYXJlYUNhdGVnb3J5SXNzdWVMb29rdXAnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFyZWFDYXRlZ29yeUlzc3VlTG9va3VwXHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICogQG1peGlucyBhcmdvcy5fTGVnYWN5U0RhdGFMaXN0TWl4aW5cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQXJlYUNhdGVnb3J5SXNzdWVMb29rdXAnLCBbTGlzdCwgX0xlZ2FjeVNEYXRhTGlzdE1peGluXSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JTogJC4kZGVzY3JpcHRvciAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgcGFnZVNpemU6IDIwMCxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgZW5hYmxlUHVsbFRvUmVmcmVzaDogZmFsc2UsXHJcbiAgaWQ6ICdhcmVhY2F0ZWdvcnlpc3N1ZV9sb29rdXAnLFxyXG4gIHF1ZXJ5T3JkZXJCeTogJ0FyZWEsQ2F0ZWdvcnksSXNzdWUnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnQXJlYScsXHJcbiAgICAnQ2F0ZWdvcnknLFxyXG4gICAgJ0lzc3VlJyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ2FyZWFDYXRlZ29yeUlzc3VlcycsXHJcbiAgaXNDYXJkVmlldzogZmFsc2UsXHJcblxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3cob3B0aW9ucykge1xyXG4gICAgdGhpcy5hY3RpdmUgPSBvcHRpb25zLndoZXJlO1xyXG5cclxuICAgIG9wdGlvbnMud2hlcmUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMsIFtvcHRpb25zXSk7XHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XHJcbiAgICBpZiAodGhpcy5jYWNoZSkge1xyXG4gICAgICB0aGlzLnByb2Nlc3NGZWVkKCk7XHJcbiAgICAgIHRoaXMuaXNSZWZyZXNoaW5nID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcHJvY2Vzc0ZlZWQ6IGZ1bmN0aW9uIHByb2Nlc3NGZWVkKGZlZWQpIHtcclxuICAgIGxldCB0aGVGZWVkID0gZmVlZDtcclxuICAgIC8vIGFzc3VtZSBvcmRlciBpcyBwcmVzZXJ2ZWRcclxuICAgIGlmICh0aGVGZWVkKSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlQ2FjaGVGcm9tKGZlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1c2UgPSB0aGlzLmNhY2hlO1xyXG5cclxuICAgIGlmICh1c2UgJiYgdGhpcy5hY3RpdmUgJiYgdGhpcy5hY3RpdmUuQXJlYSkge1xyXG4gICAgICB1c2UgPSB1c2VbdGhpcy5hY3RpdmUuQXJlYV07XHJcbiAgICB9XHJcbiAgICBpZiAodXNlICYmIHRoaXMuYWN0aXZlICYmIHRoaXMuYWN0aXZlLkNhdGVnb3J5KSB7XHJcbiAgICAgIHVzZSA9IHVzZVt0aGlzLmFjdGl2ZS5DYXRlZ29yeV07XHJcbiAgICB9XHJcblxyXG4gICAgdGhlRmVlZCA9IHRoaXMuYnVpbGRGZWVkRnJvbSh1c2UpO1xyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cywgW3RoZUZlZWRdKTtcclxuICB9LFxyXG4gIGNyZWF0ZUNhY2hlRnJvbTogZnVuY3Rpb24gY3JlYXRlQ2FjaGVGcm9tKGZlZWQpIHtcclxuICAgIGNvbnN0IGZlZWRMZW5ndGggPSBmZWVkLiRyZXNvdXJjZXMubGVuZ3RoO1xyXG4gICAgdGhpcy5jYWNoZSA9IHt9O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmVlZExlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IGVudHJ5ID0gZmVlZC4kcmVzb3VyY2VzW2ldO1xyXG4gICAgICBjb25zdCBhcmVhID0gdGhpcy5jYWNoZVtlbnRyeS5BcmVhXSB8fCAodGhpcy5jYWNoZVtlbnRyeS5BcmVhXSA9IHt9KTtcclxuICAgICAgY29uc3QgY2F0ZWdvcnkgPSBhcmVhW2VudHJ5LkNhdGVnb3J5XSB8fCAoYXJlYVtlbnRyeS5DYXRlZ29yeV0gPSB7fSk7XHJcblxyXG4gICAgICBjYXRlZ29yeVtlbnRyeS5Jc3N1ZV0gPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnVpbGRGZWVkRnJvbTogZnVuY3Rpb24gYnVpbGRGZWVkRnJvbShzZWdtZW50KSB7XHJcbiAgICBjb25zdCBsaXN0ID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBuIGluIHNlZ21lbnQpIHtcclxuICAgICAgaWYgKHNlZ21lbnQuaGFzT3duUHJvcGVydHkobikpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogbixcclxuICAgICAgICAgICRkZXNjcmlwdG9yOiBuLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJHJlc291cmNlczogbGlzdCxcclxuICAgIH07XHJcbiAgfSxcclxuICBoYXNNb3JlRGF0YTogZnVuY3Rpb24gaGFzTW9yZURhdGEoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7IC8vIHRvZG86IGltcGxlbWVudCBwYWdpbmc/XHJcbiAgfSxcclxuICByZWZyZXNoUmVxdWlyZWRGb3I6IGZ1bmN0aW9uIHJlZnJlc2hSZXF1aXJlZEZvcigpIHtcclxuICAgIHJldHVybiB0cnVlOyAvLyB0b2RvOiBpbXBsZW1lbnQgcmVmcmVzaCBkZXRlY3Rpb24/XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoKSB7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=