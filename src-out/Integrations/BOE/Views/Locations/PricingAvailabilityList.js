define('crm/Integrations/BOE/Views/Locations/PricingAvailabilityList', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', 'argos/Convert', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _Convert, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _Convert2 = _interopRequireDefault(_Convert);

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

  var resource = (0, _I18n2.default)('locationsPricingAvailabilityList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Locations.PricingAvailabilityList', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text"><label class="group-label">{%: $$.warehouseText %}: </label>{%: $.SlxLocation %}</p>', '<p class="listview-heading"><label class="group-label">{%: $$.availableToPromiseDateText %}: </label>{%: $$.formatATPDate($.ATPDate) %}</p>', '<p class="listview-heading"><label class="group-label">{%: $$.availableText %}: </label>{%: $.AvailableQuantity %}</p>', '<p class="micro-text">{%: $.UnitOfMeasure %}</p>']),

    // Localization
    titleText: resource.titleText,
    warehouseText: resource.warehouseText,
    availableText: resource.availableText,
    availableToPromiseDateText: resource.availableToPromiseDateText,

    // View Properties
    id: 'locations_pricingAvailabilityList',
    detailView: '',
    enableActions: false,
    expose: false,
    pricingAvailabilityResult: null,
    requestType: null,
    entityType: null,
    parentEntity: null,
    selectionOnly: true,
    allowEmptySelection: false,
    continuousScrolling: false,
    simpleMode: true,
    negateHistory: true,
    pageSize: 500,
    singleSelect: true,
    singleSelectAction: 'complete',

    // Card layout
    itemIconClass: '',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: [{
          id: 'complete',
          cls: 'invisible',
          fn: this.onSelectWarehouse,
          scope: this
        }, {
          id: 'cancel',
          side: 'left',
          svg: 'cancel',
          fn: ReUI.back,
          scope: ReUI
        }] });
    },
    show: function show() {
      this.inherited(show, arguments);
      if (!this.options) {
        this.options = {};
      }
      this.options.singleSelect = true;
      this.options.singleSelectAction = 'complete';
    },
    onSelectWarehouse: function onSelectWarehouse() {
      var selection = this.getSelectedWarehouse();
      this.processWarehouse(selection).then(function () {
        ReUI.back();
      });
    },
    getSelectedWarehouse: function getSelectedWarehouse() {
      var selections = this.get('selectionModel').getSelections();
      var selection = null;
      if (this.options.singleSelect) {
        for (var selectionKey in selections) {
          if (selections.hasOwnProperty(selectionKey)) {
            selection = selections[selectionKey].data;
            break;
          }
        }
      }
      return selection;
    },
    processWarehouse: function processWarehouse(warehouse) {
      var promise = new Promise(function (resolve) {
        resolve(warehouse);
      });
      return promise;
    },
    getAvailability: function getAvailability() {
      var promise = new Promise(function (resolve) {
        resolve([]);
      });
      return promise;
    },
    onTransitionAway: function onTransitionAway() {
      this.refreshRequired = true;
      this.inherited(onTransitionAway, arguments);
    },
    requestData: function requestData() {
      var _this = this;

      this.getAvailability().then(function (entries) {
        _this._onQueryComplete({ total: entries.length ? entries.length : 0 }, entries);
      }, function () {
        _this._onQueryComplete({ total: 0 }, []);
      });
    },
    formatATPDate: function formatATPDate(atpDate) {
      var value = '';
      if (_Convert2.default.isDateString(atpDate)) {
        value = _Convert2.default.toDateFromString(atpDate);
        return _Format2.default.date(value);
      }
      return value;
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return 'upper(Description) like "' + this.escapeSearchQuery(searchQuery.toUpperCase()) + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.Locations.PricingAvailabilityList', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0xvY2F0aW9ucy9QcmljaW5nQXZhaWxhYmlsaXR5TGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsIndhcmVob3VzZVRleHQiLCJhdmFpbGFibGVUZXh0IiwiYXZhaWxhYmxlVG9Qcm9taXNlRGF0ZVRleHQiLCJpZCIsImRldGFpbFZpZXciLCJlbmFibGVBY3Rpb25zIiwiZXhwb3NlIiwicHJpY2luZ0F2YWlsYWJpbGl0eVJlc3VsdCIsInJlcXVlc3RUeXBlIiwiZW50aXR5VHlwZSIsInBhcmVudEVudGl0eSIsInNlbGVjdGlvbk9ubHkiLCJhbGxvd0VtcHR5U2VsZWN0aW9uIiwiY29udGludW91c1Njcm9sbGluZyIsInNpbXBsZU1vZGUiLCJuZWdhdGVIaXN0b3J5IiwicGFnZVNpemUiLCJzaW5nbGVTZWxlY3QiLCJzaW5nbGVTZWxlY3RBY3Rpb24iLCJpdGVtSWNvbkNsYXNzIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsImNscyIsImZuIiwib25TZWxlY3RXYXJlaG91c2UiLCJzY29wZSIsInNpZGUiLCJzdmciLCJSZVVJIiwiYmFjayIsInNob3ciLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJvcHRpb25zIiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0ZWRXYXJlaG91c2UiLCJwcm9jZXNzV2FyZWhvdXNlIiwidGhlbiIsInNlbGVjdGlvbnMiLCJnZXQiLCJnZXRTZWxlY3Rpb25zIiwic2VsZWN0aW9uS2V5IiwiaGFzT3duUHJvcGVydHkiLCJkYXRhIiwid2FyZWhvdXNlIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZ2V0QXZhaWxhYmlsaXR5Iiwib25UcmFuc2l0aW9uQXdheSIsInJlZnJlc2hSZXF1aXJlZCIsInJlcXVlc3REYXRhIiwiZW50cmllcyIsIl9vblF1ZXJ5Q29tcGxldGUiLCJ0b3RhbCIsImxlbmd0aCIsImZvcm1hdEFUUERhdGUiLCJhdHBEYXRlIiwidmFsdWUiLCJpc0RhdGVTdHJpbmciLCJ0b0RhdGVGcm9tU3RyaW5nIiwiZGF0ZSIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxrQ0FBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLDhEQUFSLEVBQXdFLGdCQUF4RSxFQUFnRjtBQUM5RjtBQUNBQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsNEdBRHlCLEVBRXpCLDZJQUZ5QixFQUd6Qix3SEFIeUIsRUFJekIsa0RBSnlCLENBQWIsQ0FGZ0Y7O0FBUzlGO0FBQ0FDLGVBQVdKLFNBQVNJLFNBVjBFO0FBVzlGQyxtQkFBZUwsU0FBU0ssYUFYc0U7QUFZOUZDLG1CQUFlTixTQUFTTSxhQVpzRTtBQWE5RkMsZ0NBQTRCUCxTQUFTTywwQkFieUQ7O0FBZTlGO0FBQ0FDLFFBQUksbUNBaEIwRjtBQWlCOUZDLGdCQUFZLEVBakJrRjtBQWtCOUZDLG1CQUFlLEtBbEIrRTtBQW1COUZDLFlBQVEsS0FuQnNGO0FBb0I5RkMsK0JBQTJCLElBcEJtRTtBQXFCOUZDLGlCQUFhLElBckJpRjtBQXNCOUZDLGdCQUFZLElBdEJrRjtBQXVCOUZDLGtCQUFjLElBdkJnRjtBQXdCOUZDLG1CQUFlLElBeEIrRTtBQXlCOUZDLHlCQUFxQixLQXpCeUU7QUEwQjlGQyx5QkFBcUIsS0ExQnlFO0FBMkI5RkMsZ0JBQVksSUEzQmtGO0FBNEI5RkMsbUJBQWUsSUE1QitFO0FBNkI5RkMsY0FBVSxHQTdCb0Y7QUE4QjlGQyxrQkFBYyxJQTlCZ0Y7QUErQjlGQyx3QkFBb0IsVUEvQjBFOztBQWlDOUY7QUFDQUMsbUJBQWUsRUFs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Q0EsVUFBSSxrQkFBUUMsWUFBUixDQUFxQkYsT0FBckIsQ0FBSixFQUFtQztBQUNqQ0MsZ0JBQVEsa0JBQVFFLGdCQUFSLENBQXlCSCxPQUF6QixDQUFSO0FBQ0EsZUFBTyxpQkFBT0ksSUFBUCxDQUFZSCxLQUFaLENBQVA7QUFDRDtBQUNELGFBQU9BLEtBQVA7QUFDRCxLQTdHNkY7QUE4RzlGSSx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELDJDQUFtQyxLQUFLQyxpQkFBTCxDQUF1QkQsWUFBWUUsV0FBWixFQUF2QixDQUFuQztBQUNEO0FBaEg2RixHQUFoRixDQUFoQjs7QUFtSEEsaUJBQUtDLFNBQUwsQ0FBZSwrQ0FBZixFQUFnRXZFLE9BQWhFO29CQUNlQSxPIiwiZmlsZSI6IlByaWNpbmdBdmFpbGFiaWxpdHlMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBjb252ZXJ0IGZyb20gJ2FyZ29zL0NvbnZlcnQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdsb2NhdGlvbnNQcmljaW5nQXZhaWxhYmlsaXR5TGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkxvY2F0aW9ucy5QcmljaW5nQXZhaWxhYmlsaXR5TGlzdCcsIFtMaXN0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC53YXJlaG91c2VUZXh0ICV9OiA8L2xhYmVsPnslOiAkLlNseExvY2F0aW9uICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYXZhaWxhYmxlVG9Qcm9taXNlRGF0ZVRleHQgJX06IDwvbGFiZWw+eyU6ICQkLmZvcm1hdEFUUERhdGUoJC5BVFBEYXRlKSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmF2YWlsYWJsZVRleHQgJX06IDwvbGFiZWw+eyU6ICQuQXZhaWxhYmxlUXVhbnRpdHkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJC5Vbml0T2ZNZWFzdXJlICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHdhcmVob3VzZVRleHQ6IHJlc291cmNlLndhcmVob3VzZVRleHQsXHJcbiAgYXZhaWxhYmxlVGV4dDogcmVzb3VyY2UuYXZhaWxhYmxlVGV4dCxcclxuICBhdmFpbGFibGVUb1Byb21pc2VEYXRlVGV4dDogcmVzb3VyY2UuYXZhaWxhYmxlVG9Qcm9taXNlRGF0ZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnbG9jYXRpb25zX3ByaWNpbmdBdmFpbGFiaWxpdHlMaXN0JyxcclxuICBkZXRhaWxWaWV3OiAnJyxcclxuICBlbmFibGVBY3Rpb25zOiBmYWxzZSxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIHByaWNpbmdBdmFpbGFiaWxpdHlSZXN1bHQ6IG51bGwsXHJcbiAgcmVxdWVzdFR5cGU6IG51bGwsXHJcbiAgZW50aXR5VHlwZTogbnVsbCxcclxuICBwYXJlbnRFbnRpdHk6IG51bGwsXHJcbiAgc2VsZWN0aW9uT25seTogdHJ1ZSxcclxuICBhbGxvd0VtcHR5U2VsZWN0aW9uOiBmYWxzZSxcclxuICBjb250aW51b3VzU2Nyb2xsaW5nOiBmYWxzZSxcclxuICBzaW1wbGVNb2RlOiB0cnVlLFxyXG4gIG5lZ2F0ZUhpc3Rvcnk6IHRydWUsXHJcbiAgcGFnZVNpemU6IDUwMCxcclxuICBzaW5nbGVTZWxlY3Q6IHRydWUsXHJcbiAgc2luZ2xlU2VsZWN0QWN0aW9uOiAnY29tcGxldGUnLFxyXG5cclxuICAvLyBDYXJkIGxheW91dFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICcnLFxyXG5cclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICAgIHRiYXI6IFt7XHJcbiAgICAgICAgaWQ6ICdjb21wbGV0ZScsXHJcbiAgICAgICAgY2xzOiAnaW52aXNpYmxlJyxcclxuICAgICAgICBmbjogdGhpcy5vblNlbGVjdFdhcmVob3VzZSxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGlkOiAnY2FuY2VsJyxcclxuICAgICAgICBzaWRlOiAnbGVmdCcsXHJcbiAgICAgICAgc3ZnOiAnY2FuY2VsJyxcclxuICAgICAgICBmbjogUmVVSS5iYWNrLFxyXG4gICAgICAgIHNjb3BlOiBSZVVJLFxyXG4gICAgICB9LFxyXG4gICAgICBdIH0pO1xyXG4gIH0sXHJcbiAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHNob3csIGFyZ3VtZW50cyk7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucykge1xyXG4gICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcclxuICAgIH1cclxuICAgIHRoaXMub3B0aW9ucy5zaW5nbGVTZWxlY3QgPSB0cnVlO1xyXG4gICAgdGhpcy5vcHRpb25zLnNpbmdsZVNlbGVjdEFjdGlvbiA9ICdjb21wbGV0ZSc7XHJcbiAgfSxcclxuICBvblNlbGVjdFdhcmVob3VzZTogZnVuY3Rpb24gb25TZWxlY3RXYXJlaG91c2UoKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGVkV2FyZWhvdXNlKCk7XHJcbiAgICB0aGlzLnByb2Nlc3NXYXJlaG91c2Uoc2VsZWN0aW9uKS50aGVuKCgpID0+IHtcclxuICAgICAgUmVVSS5iYWNrKCk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdldFNlbGVjdGVkV2FyZWhvdXNlOiBmdW5jdGlvbiBnZXRTZWxlY3RlZFdhcmVob3VzZSgpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbnMgPSB0aGlzLmdldCgnc2VsZWN0aW9uTW9kZWwnKS5nZXRTZWxlY3Rpb25zKCk7XHJcbiAgICBsZXQgc2VsZWN0aW9uID0gbnVsbDtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2luZ2xlU2VsZWN0KSB7XHJcbiAgICAgIGZvciAoY29uc3Qgc2VsZWN0aW9uS2V5IGluIHNlbGVjdGlvbnMpIHtcclxuICAgICAgICBpZiAoc2VsZWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShzZWxlY3Rpb25LZXkpKSB7XHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBzZWxlY3Rpb25zW3NlbGVjdGlvbktleV0uZGF0YTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9LFxyXG4gIHByb2Nlc3NXYXJlaG91c2U6IGZ1bmN0aW9uIHByb2Nlc3NXYXJlaG91c2Uod2FyZWhvdXNlKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVzb2x2ZSh3YXJlaG91c2UpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG4gIGdldEF2YWlsYWJpbGl0eTogZnVuY3Rpb24gZ2V0QXZhaWxhYmlsaXR5KCkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlc29sdmUoW10pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG4gIG9uVHJhbnNpdGlvbkF3YXk6IGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkF3YXkoKSB7XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB0aGlzLmluaGVyaXRlZChvblRyYW5zaXRpb25Bd2F5LCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgdGhpcy5nZXRBdmFpbGFiaWxpdHkoKS50aGVuKChlbnRyaWVzKSA9PiB7XHJcbiAgICAgIHRoaXMuX29uUXVlcnlDb21wbGV0ZSh7IHRvdGFsOiBlbnRyaWVzLmxlbmd0aCA/IGVudHJpZXMubGVuZ3RoIDogMCB9LCBlbnRyaWVzKTtcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgdGhpcy5fb25RdWVyeUNvbXBsZXRlKHsgdG90YWw6IDAgfSwgW10pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmb3JtYXRBVFBEYXRlOiBmdW5jdGlvbiBmb3JtYXRBVFBEYXRlKGF0cERhdGUpIHtcclxuICAgIGxldCB2YWx1ZSA9ICcnO1xyXG4gICAgaWYgKGNvbnZlcnQuaXNEYXRlU3RyaW5nKGF0cERhdGUpKSB7XHJcbiAgICAgIHZhbHVlID0gY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGF0cERhdGUpO1xyXG4gICAgICByZXR1cm4gZm9ybWF0LmRhdGUodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gYHVwcGVyKERlc2NyaXB0aW9uKSBsaWtlIFwiJHt0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpfSVcImA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuTG9jYXRpb25zLlByaWNpbmdBdmFpbGFiaWxpdHlMaXN0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==