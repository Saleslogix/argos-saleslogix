define('crm/Views/PickList', ['module', 'exports', 'dojo/_base/declare', 'argos/List'], function (module, exports, _declare, _List) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Views.PickList
   *
   *
   * @extends argos.List
   *
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

  var __class = (0, _declare2.default)('crm.Views.PickList', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.text %}</p>']),

    // View Properties
    id: 'pick_list',
    expose: false,
    resourceKind: 'picklists',
    resourceProperty: 'items',
    contractName: 'system',
    pageSize: 100,
    languageCode: null,
    autoClearSelection: false,
    isCardView: false,

    _onQueryComplete: function _onQueryComplete(queryResults, entries) {
      var _this = this;

      // eslint-disable-line
      if (this.options && this.options.picklistOptions && this.options.picklistOptions.filterByLanguage && this.query) {
        entries = entries.filter(function (entry) {
          return entry.languageCode === _this.getLanguageCode() || typeof entry.languageCode === 'undefined' || entry.languageCode === null;
        });
        queryResults.total = entries.length;
      }
      this.inherited(arguments);
    },
    activateEntry: function activateEntry(params) {
      if (this.options.keyProperty === 'text' && !this.options.singleSelect) {
        params.key = params.descriptor;
      }

      this.inherited(arguments);
    },
    getLanguageCode: function getLanguageCode() {
      return this.languageCode || this.options && this.options.languageCode || App.getCurrentLocale();
    },
    getPicklistOptions: function getPicklistOptions() {
      return this.options && this.options.picklistOptions || this.picklistOptions || {};
    },
    getRemainingCount: function getRemainingCount() {
      // Picklists fetch all items on the first request (not based on pageSize)
      return -this.pageSize;
    },
    onTransitionAway: function onTransitionAway() {
      this.inherited(arguments);
      if (this.searchWidget) {
        this.searchWidget.clear();
        this.query = false;
        this.hasSearched = false;
      }
    },
    show: function show(options) {
      this.set('title', options && options.title || this.title);
      if (!options.singleSelect) {
        if (options.keyProperty) {
          this.idProperty = options.keyProperty;
        }

        if (options.textProperty) {
          this.labelProperty = options.textProperty;
        }
      }

      this.inherited(arguments);
    },
    requestData: function requestData() {
      var _this2 = this;

      var picklistOptions = this.getPicklistOptions();
      picklistOptions.language = picklistOptions.language || this.getLanguageCode();
      this.languageCode = picklistOptions.language && picklistOptions.language.trim() || this.languageCode;

      // Search, query like normal (with filtering from queryComplete)
      if (this.query) {
        return this.inherited(arguments);
      }

      return this.app.picklistService.requestPicklist(this.picklistName, picklistOptions).then(function (result) {
        return _this2._onQueryComplete({ total: result && result.items.length }, result && result.items);
      }, function (err) {
        return _this2._onQueryError(null, err);
      });
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(text) like "' + q + '%"';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9QaWNrTGlzdC5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpZCIsImV4cG9zZSIsInJlc291cmNlS2luZCIsInJlc291cmNlUHJvcGVydHkiLCJjb250cmFjdE5hbWUiLCJwYWdlU2l6ZSIsImxhbmd1YWdlQ29kZSIsImF1dG9DbGVhclNlbGVjdGlvbiIsImlzQ2FyZFZpZXciLCJfb25RdWVyeUNvbXBsZXRlIiwicXVlcnlSZXN1bHRzIiwiZW50cmllcyIsIm9wdGlvbnMiLCJwaWNrbGlzdE9wdGlvbnMiLCJmaWx0ZXJCeUxhbmd1YWdlIiwicXVlcnkiLCJmaWx0ZXIiLCJlbnRyeSIsImdldExhbmd1YWdlQ29kZSIsInRvdGFsIiwibGVuZ3RoIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiYWN0aXZhdGVFbnRyeSIsInBhcmFtcyIsImtleVByb3BlcnR5Iiwic2luZ2xlU2VsZWN0Iiwia2V5IiwiZGVzY3JpcHRvciIsIkFwcCIsImdldEN1cnJlbnRMb2NhbGUiLCJnZXRQaWNrbGlzdE9wdGlvbnMiLCJnZXRSZW1haW5pbmdDb3VudCIsIm9uVHJhbnNpdGlvbkF3YXkiLCJzZWFyY2hXaWRnZXQiLCJjbGVhciIsImhhc1NlYXJjaGVkIiwic2hvdyIsInNldCIsInRpdGxlIiwiaWRQcm9wZXJ0eSIsInRleHRQcm9wZXJ0eSIsImxhYmVsUHJvcGVydHkiLCJyZXF1ZXN0RGF0YSIsImxhbmd1YWdlIiwidHJpbSIsImFwcCIsInBpY2tsaXN0U2VydmljZSIsInJlcXVlc3RQaWNrbGlzdCIsInBpY2tsaXN0TmFtZSIsInRoZW4iLCJyZXN1bHQiLCJpdGVtcyIsIl9vblF1ZXJ5RXJyb3IiLCJlcnIiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWtCQTs7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QUNELEtBckVtRDtBQXNFcERxQixpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQUE7O0FBQ2xDLFVBQU05QixrQkFBa0IsS0FBS2tCLGtCQUFMLEVBQXhCO0FBQ0FsQixzQkFBZ0IrQixRQUFoQixHQUEyQi9CLGdCQUFnQitCLFFBQWhCLElBQTRCLEtBQUsxQixlQUFMLEVBQXZEO0FBQ0EsV0FBS1osWUFBTCxHQUFxQk8sZ0JBQWdCK0IsUUFBaEIsSUFBNEIvQixnQkFBZ0IrQixRQUFoQixDQUF5QkMsSUFBekIsRUFBN0IsSUFBaUUsS0FBS3ZDLFlBQTFGOztBQUVBO0FBQ0EsVUFBSSxLQUFLUyxLQUFULEVBQWdCO0FBQ2QsZUFBTyxLQUFLTSxTQUFMLENBQWVDLFNBQWYsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS3dCLEdBQUwsQ0FBU0MsZUFBVCxDQUF5QkMsZUFBekIsQ0FBeUMsS0FBS0MsWUFBOUMsRUFBNERwQyxlQUE1RCxFQUNKcUMsSUFESSxDQUNDO0FBQUEsZUFBVSxPQUFLekMsZ0JBQUwsQ0FBc0IsRUFBRVUsT0FBT2dDLFVBQVVBLE9BQU9DLEtBQVAsQ0FBYWhDLE1BQWhDLEVBQXRCLEVBQWdFK0IsVUFBVUEsT0FBT0MsS0FBakYsQ0FBVjtBQUFBLE9BREQsRUFFSDtBQUFBLGVBQU8sT0FBS0MsYUFBTCxDQUFtQixJQUFuQixFQUF5QkMsR0FBekIsQ0FBUDtBQUFBLE9BRkcsQ0FBUDtBQUdELEtBbkZtRDtBQW9GcERDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0Esb0NBQTRCRixDQUE1QjtBQUNEO0FBdkZtRCxHQUF0QyxDQUFoQjs7b0JBMEZlNUQsTyIsImZpbGUiOiJQaWNrTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuUGlja0xpc3RcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5QaWNrTGlzdCcsIFtMaXN0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JTogJC50ZXh0ICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAncGlja19saXN0JyxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIHJlc291cmNlS2luZDogJ3BpY2tsaXN0cycsXHJcbiAgcmVzb3VyY2VQcm9wZXJ0eTogJ2l0ZW1zJyxcclxuICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG4gIHBhZ2VTaXplOiAxMDAsXHJcbiAgbGFuZ3VhZ2VDb2RlOiBudWxsLFxyXG4gIGF1dG9DbGVhclNlbGVjdGlvbjogZmFsc2UsXHJcbiAgaXNDYXJkVmlldzogZmFsc2UsXHJcblxyXG4gIF9vblF1ZXJ5Q29tcGxldGU6IGZ1bmN0aW9uIF9vblF1ZXJ5Q29tcGxldGUocXVlcnlSZXN1bHRzLCBlbnRyaWVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgIGlmICh0aGlzLm9wdGlvbnNcclxuICAgICAgICAgICYmIHRoaXMub3B0aW9ucy5waWNrbGlzdE9wdGlvbnNcclxuICAgICAgICAgICAgJiYgdGhpcy5vcHRpb25zLnBpY2tsaXN0T3B0aW9ucy5maWx0ZXJCeUxhbmd1YWdlXHJcbiAgICAgICAgICAgICAgJiYgdGhpcy5xdWVyeSkge1xyXG4gICAgICBlbnRyaWVzID0gZW50cmllcy5maWx0ZXIoXHJcbiAgICAgICAgZW50cnkgPT4gZW50cnkubGFuZ3VhZ2VDb2RlID09PSB0aGlzLmdldExhbmd1YWdlQ29kZSgpIHx8XHJcbiAgICAgICAgdHlwZW9mIGVudHJ5Lmxhbmd1YWdlQ29kZSA9PT0gJ3VuZGVmaW5lZCcgfHxcclxuICAgICAgICBlbnRyeS5sYW5ndWFnZUNvZGUgPT09IG51bGwpO1xyXG4gICAgICBxdWVyeVJlc3VsdHMudG90YWwgPSBlbnRyaWVzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBhY3RpdmF0ZUVudHJ5OiBmdW5jdGlvbiBhY3RpdmF0ZUVudHJ5KHBhcmFtcykge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5rZXlQcm9wZXJ0eSA9PT0gJ3RleHQnICYmICF0aGlzLm9wdGlvbnMuc2luZ2xlU2VsZWN0KSB7XHJcbiAgICAgIHBhcmFtcy5rZXkgPSBwYXJhbXMuZGVzY3JpcHRvcjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgZ2V0TGFuZ3VhZ2VDb2RlOiBmdW5jdGlvbiBnZXRMYW5ndWFnZUNvZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYW5ndWFnZUNvZGVcclxuICAgICAgfHwgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGFuZ3VhZ2VDb2RlKSB8fCBBcHAuZ2V0Q3VycmVudExvY2FsZSgpO1xyXG4gIH0sXHJcbiAgZ2V0UGlja2xpc3RPcHRpb25zOiBmdW5jdGlvbiBnZXRQaWNrbGlzdE9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucGlja2xpc3RPcHRpb25zKSB8fCB0aGlzLnBpY2tsaXN0T3B0aW9ucyB8fCB7fTtcclxuICB9LFxyXG4gIGdldFJlbWFpbmluZ0NvdW50OiBmdW5jdGlvbiBnZXRSZW1haW5pbmdDb3VudCgpIHtcclxuICAgIC8vIFBpY2tsaXN0cyBmZXRjaCBhbGwgaXRlbXMgb24gdGhlIGZpcnN0IHJlcXVlc3QgKG5vdCBiYXNlZCBvbiBwYWdlU2l6ZSlcclxuICAgIHJldHVybiAtdGhpcy5wYWdlU2l6ZTtcclxuICB9LFxyXG4gIG9uVHJhbnNpdGlvbkF3YXk6IGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkF3YXkoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKHRoaXMuc2VhcmNoV2lkZ2V0KSB7XHJcbiAgICAgIHRoaXMuc2VhcmNoV2lkZ2V0LmNsZWFyKCk7XHJcbiAgICAgIHRoaXMucXVlcnkgPSBmYWxzZTtcclxuICAgICAgdGhpcy5oYXNTZWFyY2hlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvdzogZnVuY3Rpb24gc2hvdyhvcHRpb25zKSB7XHJcbiAgICB0aGlzLnNldCgndGl0bGUnLCBvcHRpb25zICYmIG9wdGlvbnMudGl0bGUgfHwgdGhpcy50aXRsZSk7XHJcbiAgICBpZiAoIW9wdGlvbnMuc2luZ2xlU2VsZWN0KSB7XHJcbiAgICAgIGlmIChvcHRpb25zLmtleVByb3BlcnR5KSB7XHJcbiAgICAgICAgdGhpcy5pZFByb3BlcnR5ID0gb3B0aW9ucy5rZXlQcm9wZXJ0eTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG9wdGlvbnMudGV4dFByb3BlcnR5KSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbFByb3BlcnR5ID0gb3B0aW9ucy50ZXh0UHJvcGVydHk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgY29uc3QgcGlja2xpc3RPcHRpb25zID0gdGhpcy5nZXRQaWNrbGlzdE9wdGlvbnMoKTtcclxuICAgIHBpY2tsaXN0T3B0aW9ucy5sYW5ndWFnZSA9IHBpY2tsaXN0T3B0aW9ucy5sYW5ndWFnZSB8fCB0aGlzLmdldExhbmd1YWdlQ29kZSgpO1xyXG4gICAgdGhpcy5sYW5ndWFnZUNvZGUgPSAocGlja2xpc3RPcHRpb25zLmxhbmd1YWdlICYmIHBpY2tsaXN0T3B0aW9ucy5sYW5ndWFnZS50cmltKCkpIHx8IHRoaXMubGFuZ3VhZ2VDb2RlO1xyXG5cclxuICAgIC8vIFNlYXJjaCwgcXVlcnkgbGlrZSBub3JtYWwgKHdpdGggZmlsdGVyaW5nIGZyb20gcXVlcnlDb21wbGV0ZSlcclxuICAgIGlmICh0aGlzLnF1ZXJ5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmFwcC5waWNrbGlzdFNlcnZpY2UucmVxdWVzdFBpY2tsaXN0KHRoaXMucGlja2xpc3ROYW1lLCBwaWNrbGlzdE9wdGlvbnMpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB0aGlzLl9vblF1ZXJ5Q29tcGxldGUoeyB0b3RhbDogcmVzdWx0ICYmIHJlc3VsdC5pdGVtcy5sZW5ndGggfSwgcmVzdWx0ICYmIHJlc3VsdC5pdGVtcyksXHJcbiAgICAgICAgZXJyID0+IHRoaXMuX29uUXVlcnlFcnJvcihudWxsLCBlcnIpKTtcclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYHVwcGVyKHRleHQpIGxpa2UgXCIke3F9JVwiYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==