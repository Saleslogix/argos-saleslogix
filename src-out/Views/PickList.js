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
      this.inherited(_onQueryComplete, arguments);
    },
    activateEntry: function activateEntry(params) {
      if (this.options.keyProperty === 'text' && !this.options.singleSelect) {
        params.key = params.descriptor;
      }

      this.inherited(activateEntry, arguments);
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
      this.inherited(onTransitionAway, arguments);
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

      this.inherited(show, arguments);
    },
    requestData: function requestData() {
      var _this2 = this;

      var picklistOptions = this.getPicklistOptions();
      picklistOptions.language = picklistOptions.language || this.getLanguageCode();
      this.languageCode = picklistOptions.language && picklistOptions.language.trim() || this.languageCode;

      // Search, query like normal (with filtering from queryComplete)
      if (this.query) {
        return this.inherited(requestData, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9QaWNrTGlzdC5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpZCIsImV4cG9zZSIsInJlc291cmNlS2luZCIsInJlc291cmNlUHJvcGVydHkiLCJjb250cmFjdE5hbWUiLCJwYWdlU2l6ZSIsImxhbmd1YWdlQ29kZSIsImF1dG9DbGVhclNlbGVjdGlvbiIsImlzQ2FyZFZpZXciLCJfb25RdWVyeUNvbXBsZXRlIiwicXVlcnlSZXN1bHRzIiwiZW50cmllcyIsIm9wdGlvbnMiLCJwaWNrbGlzdE9wdGlvbnMiLCJmaWx0ZXJCeUxhbmd1YWdlIiwicXVlcnkiLCJmaWx0ZXIiLCJlbnRyeSIsImdldExhbmd1YWdlQ29kZSIsInRvdGFsIiwibGVuZ3RoIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiYWN0aXZhdGVFbnRyeSIsInBhcmFtcyIsImtleVByb3BlcnR5Iiwic2luZ2xlU2VsZWN0Iiwia2V5IiwiZGVzY3JpcHRvciIsIkFwcCIsImdldEN1cnJlbnRMb2NhbGUiLCJnZXRQaWNrbGlzdE9wdGlvbnMiLCJnZXRSZW1haW5pbmdDb3VudCIsIm9uVHJhbnNpdGlvbkF3YXkiLCJzZWFyY2hXaWRnZXQiLCJjbGVhciIsImhhc1NlYXJjaGVkIiwic2hvdyIsInNldCIsInRpdGxlIiwiaWRQcm9wZXJ0eSIsInRleHRQcm9wZXJ0eSIsImxhYmVsUHJvcGVydHkiLCJyZXF1ZXN0RGF0YSIsImxhbmd1YWdlIiwidHJpbSIsImFwcCIsInBpY2tsaXN0U2VydmljZSIsInJlcXVlc3RQaWNrbGlzdCIsInBpY2tsaXN0TmFtZSIsInRoZW4iLCJyZXN1bHQiLCJpdGVtcyIsIl9vblF1ZXJ5RXJyb3IiLCJlcnIiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWtCQTs7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c291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlBpY2tMaXN0XHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuUGlja0xpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQudGV4dCAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3BpY2tfbGlzdCcsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICByZXNvdXJjZUtpbmQ6ICdwaWNrbGlzdHMnLFxyXG4gIHJlc291cmNlUHJvcGVydHk6ICdpdGVtcycsXHJcbiAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICBwYWdlU2l6ZTogMTAwLFxyXG4gIGxhbmd1YWdlQ29kZTogbnVsbCxcclxuICBhdXRvQ2xlYXJTZWxlY3Rpb246IGZhbHNlLFxyXG4gIGlzQ2FyZFZpZXc6IGZhbHNlLFxyXG5cclxuICBfb25RdWVyeUNvbXBsZXRlOiBmdW5jdGlvbiBfb25RdWVyeUNvbXBsZXRlKHF1ZXJ5UmVzdWx0cywgZW50cmllcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICBpZiAodGhpcy5vcHRpb25zXHJcbiAgICAgICAgICAmJiB0aGlzLm9wdGlvbnMucGlja2xpc3RPcHRpb25zXHJcbiAgICAgICAgICAgICYmIHRoaXMub3B0aW9ucy5waWNrbGlzdE9wdGlvbnMuZmlsdGVyQnlMYW5ndWFnZVxyXG4gICAgICAgICAgICAgICYmIHRoaXMucXVlcnkpIHtcclxuICAgICAgZW50cmllcyA9IGVudHJpZXMuZmlsdGVyKFxyXG4gICAgICAgIGVudHJ5ID0+IGVudHJ5Lmxhbmd1YWdlQ29kZSA9PT0gdGhpcy5nZXRMYW5ndWFnZUNvZGUoKSB8fFxyXG4gICAgICAgIHR5cGVvZiBlbnRyeS5sYW5ndWFnZUNvZGUgPT09ICd1bmRlZmluZWQnIHx8XHJcbiAgICAgICAgZW50cnkubGFuZ3VhZ2VDb2RlID09PSBudWxsKTtcclxuICAgICAgcXVlcnlSZXN1bHRzLnRvdGFsID0gZW50cmllcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaGVyaXRlZChfb25RdWVyeUNvbXBsZXRlLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVFbnRyeTogZnVuY3Rpb24gYWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMua2V5UHJvcGVydHkgPT09ICd0ZXh0JyAmJiAhdGhpcy5vcHRpb25zLnNpbmdsZVNlbGVjdCkge1xyXG4gICAgICBwYXJhbXMua2V5ID0gcGFyYW1zLmRlc2NyaXB0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmhlcml0ZWQoYWN0aXZhdGVFbnRyeSwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIGdldExhbmd1YWdlQ29kZTogZnVuY3Rpb24gZ2V0TGFuZ3VhZ2VDb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VDb2RlXHJcbiAgICAgIHx8ICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxhbmd1YWdlQ29kZSkgfHwgQXBwLmdldEN1cnJlbnRMb2NhbGUoKTtcclxuICB9LFxyXG4gIGdldFBpY2tsaXN0T3B0aW9uczogZnVuY3Rpb24gZ2V0UGlja2xpc3RPcHRpb25zKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnBpY2tsaXN0T3B0aW9ucykgfHwgdGhpcy5waWNrbGlzdE9wdGlvbnMgfHwge307XHJcbiAgfSxcclxuICBnZXRSZW1haW5pbmdDb3VudDogZnVuY3Rpb24gZ2V0UmVtYWluaW5nQ291bnQoKSB7XHJcbiAgICAvLyBQaWNrbGlzdHMgZmV0Y2ggYWxsIGl0ZW1zIG9uIHRoZSBmaXJzdCByZXF1ZXN0IChub3QgYmFzZWQgb24gcGFnZVNpemUpXHJcbiAgICByZXR1cm4gLXRoaXMucGFnZVNpemU7XHJcbiAgfSxcclxuICBvblRyYW5zaXRpb25Bd2F5OiBmdW5jdGlvbiBvblRyYW5zaXRpb25Bd2F5KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQob25UcmFuc2l0aW9uQXdheSwgYXJndW1lbnRzKTtcclxuICAgIGlmICh0aGlzLnNlYXJjaFdpZGdldCkge1xyXG4gICAgICB0aGlzLnNlYXJjaFdpZGdldC5jbGVhcigpO1xyXG4gICAgICB0aGlzLnF1ZXJ5ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaGFzU2VhcmNoZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3cob3B0aW9ucykge1xyXG4gICAgdGhpcy5zZXQoJ3RpdGxlJywgb3B0aW9ucyAmJiBvcHRpb25zLnRpdGxlIHx8IHRoaXMudGl0bGUpO1xyXG4gICAgaWYgKCFvcHRpb25zLnNpbmdsZVNlbGVjdCkge1xyXG4gICAgICBpZiAob3B0aW9ucy5rZXlQcm9wZXJ0eSkge1xyXG4gICAgICAgIHRoaXMuaWRQcm9wZXJ0eSA9IG9wdGlvbnMua2V5UHJvcGVydHk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLnRleHRQcm9wZXJ0eSkge1xyXG4gICAgICAgIHRoaXMubGFiZWxQcm9wZXJ0eSA9IG9wdGlvbnMudGV4dFByb3BlcnR5O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmhlcml0ZWQoc2hvdywgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgIGNvbnN0IHBpY2tsaXN0T3B0aW9ucyA9IHRoaXMuZ2V0UGlja2xpc3RPcHRpb25zKCk7XHJcbiAgICBwaWNrbGlzdE9wdGlvbnMubGFuZ3VhZ2UgPSBwaWNrbGlzdE9wdGlvbnMubGFuZ3VhZ2UgfHwgdGhpcy5nZXRMYW5ndWFnZUNvZGUoKTtcclxuICAgIHRoaXMubGFuZ3VhZ2VDb2RlID0gKHBpY2tsaXN0T3B0aW9ucy5sYW5ndWFnZSAmJiBwaWNrbGlzdE9wdGlvbnMubGFuZ3VhZ2UudHJpbSgpKSB8fCB0aGlzLmxhbmd1YWdlQ29kZTtcclxuXHJcbiAgICAvLyBTZWFyY2gsIHF1ZXJ5IGxpa2Ugbm9ybWFsICh3aXRoIGZpbHRlcmluZyBmcm9tIHF1ZXJ5Q29tcGxldGUpXHJcbiAgICBpZiAodGhpcy5xdWVyeSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbmhlcml0ZWQocmVxdWVzdERhdGEsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXBwLnBpY2tsaXN0U2VydmljZS5yZXF1ZXN0UGlja2xpc3QodGhpcy5waWNrbGlzdE5hbWUsIHBpY2tsaXN0T3B0aW9ucylcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHRoaXMuX29uUXVlcnlDb21wbGV0ZSh7IHRvdGFsOiByZXN1bHQgJiYgcmVzdWx0Lml0ZW1zLmxlbmd0aCB9LCByZXN1bHQgJiYgcmVzdWx0Lml0ZW1zKSxcclxuICAgICAgICBlcnIgPT4gdGhpcy5fb25RdWVyeUVycm9yKG51bGwsIGVycikpO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIodGV4dCkgbGlrZSBcIiR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19