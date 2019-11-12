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
      this.inherited(arguments);
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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0xvY2F0aW9ucy9QcmljaW5nQXZhaWxhYmlsaXR5TGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsIndhcmVob3VzZVRleHQiLCJhdmFpbGFibGVUZXh0IiwiYXZhaWxhYmxlVG9Qcm9taXNlRGF0ZVRleHQiLCJpZCIsImRldGFpbFZpZXciLCJlbmFibGVBY3Rpb25zIiwiZXhwb3NlIiwicHJpY2luZ0F2YWlsYWJpbGl0eVJlc3VsdCIsInJlcXVlc3RUeXBlIiwiZW50aXR5VHlwZSIsInBhcmVudEVudGl0eSIsInNlbGVjdGlvbk9ubHkiLCJhbGxvd0VtcHR5U2VsZWN0aW9uIiwiY29udGludW91c1Njcm9sbGluZyIsInNpbXBsZU1vZGUiLCJuZWdhdGVIaXN0b3J5IiwicGFnZVNpemUiLCJzaW5nbGVTZWxlY3QiLCJzaW5nbGVTZWxlY3RBY3Rpb24iLCJpdGVtSWNvbkNsYXNzIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsImNscyIsImZuIiwib25TZWxlY3RXYXJlaG91c2UiLCJzY29wZSIsInNpZGUiLCJzdmciLCJSZVVJIiwiYmFjayIsInNob3ciLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJvcHRpb25zIiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0ZWRXYXJlaG91c2UiLCJwcm9jZXNzV2FyZWhvdXNlIiwidGhlbiIsInNlbGVjdGlvbnMiLCJnZXQiLCJnZXRTZWxlY3Rpb25zIiwic2VsZWN0aW9uS2V5IiwiaGFzT3duUHJvcGVydHkiLCJkYXRhIiwid2FyZWhvdXNlIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZ2V0QXZhaWxhYmlsaXR5Iiwib25UcmFuc2l0aW9uQXdheSIsInJlZnJlc2hSZXF1aXJlZCIsInJlcXVlc3REYXRhIiwiZW50cmllcyIsIl9vblF1ZXJ5Q29tcGxldGUiLCJ0b3RhbCIsImxlbmd0aCIsImZvcm1hdEFUUERhdGUiLCJhdHBEYXRlIiwidmFsdWUiLCJpc0RhdGVTdHJpbmciLCJ0b0RhdGVGcm9tU3RyaW5nIiwiZGF0ZSIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxrQ0FBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLDhEQUFSLEVBQXdFLGdCQUF4RSxFQUFnRjtBQUM5RjtBQUNBQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsNEdBRHlCLEVBRXpCLDZJQUZ5QixFQUd6Qix3SEFIeUIsRUFJekIsa0RBSnlCLENBQWIsQ0FGZ0Y7O0FBUzlGO0FBQ0FDLGVBQVdKLFNBQVNJLFNBVjBFO0FBVzlGQyxtQkFBZUwsU0FBU0ssYUFYc0U7QUFZOUZDLG1CQUFlTixTQUFTTSxhQVpzRTtBQWE5RkMsZ0NBQTRCUCxTQUFTTywwQkFieUQ7O0FBZTlGO0FBQ0FDLFFBQUksbUNBaEIwRjtBQWlCOUZDLGdCQUFZLEVBakJrRjtBQWtCOUZDLG1CQUFlLEtBbEIrRTtBQW1COUZDLFlBQVEsS0FuQnNGO0FBb0I5RkMsK0JBQTJCLElBcEJtRTtBQXFCOUZDLGlCQUFhLElBckJpRjtBQXNCOUZDLGdCQUFZLElBdEJrRjtBQXVCOUZDLGtCQUFjLElBdkJnRjtBQXdCOUZDLG1CQUFlLElBeEIrRTtBQXlCOUZDLHlCQUFxQixLQXpCeUU7QUEwQjlGQyx5QkFBcUIsS0ExQnlFO0FBMkI5RkMsZ0JBQVksSUEzQmtGO0FBNEI5RkMsbUJBQWUsSUE1QitFO0FBNkI5RkMsY0FBVSxHQTdCb0Y7QUE4QjlGQyxrQkFBYyxJQTlCZ0Y7QUErQjlGQyx3QkFBb0IsVUEvQjBFOztBQWlDOUY7QUFDQUMsbUJBQWUsRUFs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QXJCLENBQUosRUFBbUM7QUFDakNDLGdCQUFRLGtCQUFRRSxnQkFBUixDQUF5QkgsT0FBekIsQ0FBUjtBQUNBLGVBQU8saUJBQU9JLElBQVAsQ0FBWUgsS0FBWixDQUFQO0FBQ0Q7QUFDRCxhQUFPQSxLQUFQO0FBQ0QsS0E3RzZGO0FBOEc5RkksdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCwyQ0FBbUMsS0FBS0MsaUJBQUwsQ0FBdUJELFlBQVlFLFdBQVosRUFBdkIsQ0FBbkM7QUFDRDtBQWhINkYsR0FBaEYsQ0FBaEI7O0FBbUhBLGlCQUFLQyxTQUFMLENBQWUsK0NBQWYsRUFBZ0V2RSxPQUFoRTtvQkFDZUEsTyIsImZpbGUiOiJQcmljaW5nQXZhaWxhYmlsaXR5TGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnbG9jYXRpb25zUHJpY2luZ0F2YWlsYWJpbGl0eUxpc3QnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5Mb2NhdGlvbnMuUHJpY2luZ0F2YWlsYWJpbGl0eUxpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQud2FyZWhvdXNlVGV4dCAlfTogPC9sYWJlbD57JTogJC5TbHhMb2NhdGlvbiAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmF2YWlsYWJsZVRvUHJvbWlzZURhdGVUZXh0ICV9OiA8L2xhYmVsPnslOiAkJC5mb3JtYXRBVFBEYXRlKCQuQVRQRGF0ZSkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5hdmFpbGFibGVUZXh0ICV9OiA8L2xhYmVsPnslOiAkLkF2YWlsYWJsZVF1YW50aXR5ICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6ICQuVW5pdE9mTWVhc3VyZSAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICB3YXJlaG91c2VUZXh0OiByZXNvdXJjZS53YXJlaG91c2VUZXh0LFxyXG4gIGF2YWlsYWJsZVRleHQ6IHJlc291cmNlLmF2YWlsYWJsZVRleHQsXHJcbiAgYXZhaWxhYmxlVG9Qcm9taXNlRGF0ZVRleHQ6IHJlc291cmNlLmF2YWlsYWJsZVRvUHJvbWlzZURhdGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2xvY2F0aW9uc19wcmljaW5nQXZhaWxhYmlsaXR5TGlzdCcsXHJcbiAgZGV0YWlsVmlldzogJycsXHJcbiAgZW5hYmxlQWN0aW9uczogZmFsc2UsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBwcmljaW5nQXZhaWxhYmlsaXR5UmVzdWx0OiBudWxsLFxyXG4gIHJlcXVlc3RUeXBlOiBudWxsLFxyXG4gIGVudGl0eVR5cGU6IG51bGwsXHJcbiAgcGFyZW50RW50aXR5OiBudWxsLFxyXG4gIHNlbGVjdGlvbk9ubHk6IHRydWUsXHJcbiAgYWxsb3dFbXB0eVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgY29udGludW91c1Njcm9sbGluZzogZmFsc2UsXHJcbiAgc2ltcGxlTW9kZTogdHJ1ZSxcclxuICBuZWdhdGVIaXN0b3J5OiB0cnVlLFxyXG4gIHBhZ2VTaXplOiA1MDAsXHJcbiAgc2luZ2xlU2VsZWN0OiB0cnVlLFxyXG4gIHNpbmdsZVNlbGVjdEFjdGlvbjogJ2NvbXBsZXRlJyxcclxuXHJcbiAgLy8gQ2FyZCBsYXlvdXRcclxuICBpdGVtSWNvbkNsYXNzOiAnJyxcclxuXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbe1xyXG4gICAgICAgIGlkOiAnY29tcGxldGUnLFxyXG4gICAgICAgIGNsczogJ2ludmlzaWJsZScsXHJcbiAgICAgICAgZm46IHRoaXMub25TZWxlY3RXYXJlaG91c2UsXHJcbiAgICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBpZDogJ2NhbmNlbCcsXHJcbiAgICAgICAgc2lkZTogJ2xlZnQnLFxyXG4gICAgICAgIHN2ZzogJ2NhbmNlbCcsXHJcbiAgICAgICAgZm46IFJlVUkuYmFjayxcclxuICAgICAgICBzY29wZTogUmVVSSxcclxuICAgICAgfSxcclxuICAgICAgXSB9KTtcclxuICB9LFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0ge307XHJcbiAgICB9XHJcbiAgICB0aGlzLm9wdGlvbnMuc2luZ2xlU2VsZWN0ID0gdHJ1ZTtcclxuICAgIHRoaXMub3B0aW9ucy5zaW5nbGVTZWxlY3RBY3Rpb24gPSAnY29tcGxldGUnO1xyXG4gIH0sXHJcbiAgb25TZWxlY3RXYXJlaG91c2U6IGZ1bmN0aW9uIG9uU2VsZWN0V2FyZWhvdXNlKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3RlZFdhcmVob3VzZSgpO1xyXG4gICAgdGhpcy5wcm9jZXNzV2FyZWhvdXNlKHNlbGVjdGlvbikudGhlbigoKSA9PiB7XHJcbiAgICAgIFJlVUkuYmFjaygpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRTZWxlY3RlZFdhcmVob3VzZTogZnVuY3Rpb24gZ2V0U2VsZWN0ZWRXYXJlaG91c2UoKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25zID0gdGhpcy5nZXQoJ3NlbGVjdGlvbk1vZGVsJykuZ2V0U2VsZWN0aW9ucygpO1xyXG4gICAgbGV0IHNlbGVjdGlvbiA9IG51bGw7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnNpbmdsZVNlbGVjdCkge1xyXG4gICAgICBmb3IgKGNvbnN0IHNlbGVjdGlvbktleSBpbiBzZWxlY3Rpb25zKSB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbnMuaGFzT3duUHJvcGVydHkoc2VsZWN0aW9uS2V5KSkge1xyXG4gICAgICAgICAgc2VsZWN0aW9uID0gc2VsZWN0aW9uc1tzZWxlY3Rpb25LZXldLmRhdGE7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfSxcclxuICBwcm9jZXNzV2FyZWhvdXNlOiBmdW5jdGlvbiBwcm9jZXNzV2FyZWhvdXNlKHdhcmVob3VzZSkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlc29sdmUod2FyZWhvdXNlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBnZXRBdmFpbGFiaWxpdHk6IGZ1bmN0aW9uIGdldEF2YWlsYWJpbGl0eSgpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXNvbHZlKFtdKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBvblRyYW5zaXRpb25Bd2F5OiBmdW5jdGlvbiBvblRyYW5zaXRpb25Bd2F5KCkge1xyXG4gICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgIHRoaXMuZ2V0QXZhaWxhYmlsaXR5KCkudGhlbigoZW50cmllcykgPT4ge1xyXG4gICAgICB0aGlzLl9vblF1ZXJ5Q29tcGxldGUoeyB0b3RhbDogZW50cmllcy5sZW5ndGggPyBlbnRyaWVzLmxlbmd0aCA6IDAgfSwgZW50cmllcyk7XHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX29uUXVlcnlDb21wbGV0ZSh7IHRvdGFsOiAwIH0sIFtdKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0QVRQRGF0ZTogZnVuY3Rpb24gZm9ybWF0QVRQRGF0ZShhdHBEYXRlKSB7XHJcbiAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgIGlmIChjb252ZXJ0LmlzRGF0ZVN0cmluZyhhdHBEYXRlKSkge1xyXG4gICAgICB2YWx1ZSA9IGNvbnZlcnQudG9EYXRlRnJvbVN0cmluZyhhdHBEYXRlKTtcclxuICAgICAgcmV0dXJuIGZvcm1hdC5kYXRlKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgcmV0dXJuIGB1cHBlcihEZXNjcmlwdGlvbikgbGlrZSBcIiR7dGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkxvY2F0aW9ucy5QcmljaW5nQXZhaWxhYmlsaXR5TGlzdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=