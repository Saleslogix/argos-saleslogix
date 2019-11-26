define('crm/Integrations/BOE/Views/SalesOrderItems/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Action', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', '../../Models/Names', 'argos/I18n', '../../Utility', '../Locations/SalesOrderItemAvailabilityList'], function (module, exports, _declare, _lang, _List, _Action, _Format, _RightDrawerListMixin2, _MetricListMixin2, _Names, _I18n, _Utility, _SalesOrderItemAvailabilityList) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _SalesOrderItemAvailabilityList2 = _interopRequireDefault(_SalesOrderItemAvailabilityList);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('salesOrderItemsList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SalesOrderItems.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], {
    formatter: _Format2.default,
    util: _Utility2.default,
    // Localization
    titleText: resource.titleText,
    lineText: resource.lineText,
    quantityText: resource.quantityText,
    priceText: resource.priceText,
    adjustedPriceText: resource.adjustedPriceText,
    baseAdjustedPriceText: resource.baseAdjustedPriceText,
    baseAmountText: resource.baseAmountText,
    amountText: resource.amountText,
    productNameText: resource.productNameText,
    descriptionText: resource.descriptionText,
    accountingEntityRequiredText: resource.accountingEntityRequiredText,
    assignWarehouseText: resource.assignWarehouseText,
    warehouseTitleText: resource.warehouseTitleText,
    warehouseText: resource.warehouseText,
    totalAmountText: resource.totalAmountText,

    // Templates
    itemTemplate: new Simplate(['{% if ($.ErpLineNumber) { %}', '<p class="listview-heading"><label class="group-label">{%: $$.lineText %}</label> {%: $.ErpLineNumber %}</p>', '{% } %}', '{% if ($.SlxLocation) { %}', '<p class="micro-text"><label class="group-label">{%: $$.warehouseText %}</label> {%: $.SlxLocation.Description %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.descriptionText %}</label> {%: $.Description %}</p>', '<p class="micro-text"> <label class="group-label">{%: $$.priceText %}</label> ', '{%: $$.util.formatMultiCurrency($.Price, $.SalesOrder.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.adjustedPriceText %}</label> ', '{%: $$.util.formatMultiCurrency($.DocCalculatedPrice, $.SalesOrder.CurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.baseAdjustedPriceText %}</label> ', '{%: $$.util.formatMultiCurrency($.CalculatedPrice, $.SalesOrder.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.quantityText %}</label> {%: $.Quantity %}</p>', '<p class="micro-text"> <label class="group-label">{%: $$.baseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ExtendedPrice, $.SalesOrder.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.amountText %}</label> ', '{%: $$.util.formatMultiCurrency($.DocExtendedPrice, $.SalesOrder.CurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.totalAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.DocTotalAmount, $.SalesOrder.CurrencyCode) %}', '</p>']),
    // View Properties
    id: 'salessorder_items_list',
    detailView: 'salesorder_item_detail',
    insertView: 'salesorder_item_edit',
    modelName: _Names2.default.SALESORDERITEM,
    resourceKind: 'salesOrderItems',
    allowSelection: true,
    enableActions: true,
    security: 'Entities/SalesOrder/View',
    insertSecurity: 'Entities/SalesOrder/Add',

    // Card layout
    itemIconClass: 'bullet-list',

    // Metrics
    entityName: 'SalesOrderItem',

    readOnly: false,

    transitionTo: function transitionTo() {
      var entry = this.options && this.options.fromContext && this.options.fromContext.entry;
      if (entry && entry.IsClosed) {
        if (App.bars && App.bars.tbar) {
          App.bars.tbar.disableTool('new');
        }
        this.readOnly = entry.IsClosed;
      }
      this.inherited(transitionTo, arguments);
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'assignWarehouse',
        cls: 'warehouse',
        label: this.assignWarehouseText,
        enabled: function enabled(layoutAction, selection) {
          return App.warehouseDiscovery === 'auto' && _Action2.default.hasProperty(layoutAction, selection, 'SalesOrder.ErpLogicalId');
        },
        action: 'assignWarehouseAction'
      }]);
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: [{
          id: 'new',
          svg: 'add',
          action: 'preNavigateToInsert',
          security: this.app.getViewSecurity(this.insertView, 'insert')
        }]
      });
    },
    preNavigateToInsert: function preNavigateToInsert() {
      var options = {};
      if (this.options && this.options.fromContext && this.options.fromContext.entry) {
        options = {
          context: {
            SalesOrder: this.options.fromContext.entry
          }
        };
      }
      this.navigateToInsertView(options);
    },
    assignWarehouseAction: function assignWarehouseAction(theAction, selection) {
      var order = this.options.fromContext.entry;
      var orderItemKey = selection.tag.attributes['data-key'].value;
      var orderItem = this.entries[orderItemKey];
      if (orderItem) {
        var view = this.getAvailabilityView();
        if (view) {
          var options = {
            orderItem: orderItem,
            order: order
          };
          this.refreshRequired = true;
          view.show(options);
        }
      }
    },
    getAvailabilityView: function getAvailabilityView() {
      var viewId = 'locations_salesOrderItemAvailabilityList';
      var view = App.getView(viewId);
      if (view) {
        return view;
      }

      App.registerView(new _SalesOrderItemAvailabilityList2.default({ id: viewId }));
      view = App.getView(viewId);
      return view;
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Description) like "' + q + '%") or (upper(ProductName) like "' + q + '%") or (upper(SalesOrder.SalesOrderNumber) like "' + q + '%") or (upper(ErpLineNumber) like "' + q + '%")';
    }
  });

  _lang2.default.setObject('icboe.Views.SalesOrderItems.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJJdGVtcy9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImZvcm1hdHRlciIsInV0aWwiLCJ0aXRsZVRleHQiLCJsaW5lVGV4dCIsInF1YW50aXR5VGV4dCIsInByaWNlVGV4dCIsImFkanVzdGVkUHJpY2VUZXh0IiwiYmFzZUFkanVzdGVkUHJpY2VUZXh0IiwiYmFzZUFtb3VudFRleHQiLCJhbW91bnRUZXh0IiwicHJvZHVjdE5hbWVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwiYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dCIsImFzc2lnbldhcmVob3VzZVRleHQiLCJ3YXJlaG91c2VUaXRsZVRleHQiLCJ3YXJlaG91c2VUZXh0IiwidG90YWxBbW91bnRUZXh0IiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpZCIsImRldGFpbFZpZXciLCJpbnNlcnRWaWV3IiwibW9kZWxOYW1lIiwiU0FMRVNPUkRFUklURU0iLCJyZXNvdXJjZUtpbmQiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJzZWN1cml0eSIsImluc2VydFNlY3VyaXR5IiwiaXRlbUljb25DbGFzcyIsImVudGl0eU5hbWUiLCJyZWFkT25seSIsInRyYW5zaXRpb25UbyIsImVudHJ5Iiwib3B0aW9ucyIsImZyb21Db250ZXh0IiwiSXNDbG9zZWQiLCJBcHAiLCJiYXJzIiwidGJhciIsImRpc2FibGVUb29sIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImNscyIsImxhYmVsIiwiZW5hYmxlZCIsImxheW91dEFjdGlvbiIsInNlbGVjdGlvbiIsIndhcmVob3VzZURpc2NvdmVyeSIsImhhc1Byb3BlcnR5IiwiYWN0aW9uIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwic3ZnIiwiYXBwIiwiZ2V0Vmlld1NlY3VyaXR5IiwicHJlTmF2aWdhdGVUb0luc2VydCIsImNvbnRleHQiLCJTYWxlc09yZGVyIiwibmF2aWdhdGVUb0luc2VydFZpZXciLCJhc3NpZ25XYXJlaG91c2VBY3Rpb24iLCJ0aGVBY3Rpb24iLCJvcmRlciIsIm9yZGVySXRlbUtleSIsInRhZyIsImF0dHJpYnV0ZXMiLCJ2YWx1ZSIsIm9yZGVySXRlbSIsImVudHJpZXMiLCJ2aWV3IiwiZ2V0QXZhaWxhYmlsaXR5VmlldyIsInJlZnJlc2hSZXF1aXJlZCIsInNob3ciLCJ2aWV3SWQiLCJnZXRWaWV3IiwicmVnaXN0ZXJWaWV3IiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsTUFBTUEsV0FBVyxvQkFBWSxxQkFBWixDQUFqQixDLENBNUJBOzs7Ozs7Ozs7Ozs7Ozs7QUE4QkEsTUFBTUMsVUFBVSx1QkFBUSxpREFBUixFQUEyRCwyRUFBM0QsRUFBNEc7QUFDMUhDLCtCQUQwSDtBQUUxSEMsMkJBRjBIO0FBRzFIO0FBQ0FDLGVBQVdKLFNBQVNJLFNBSnNHO0FBSzFIQyxjQUFVTCxTQUFTSyxRQUx1RztBQU0xSEMsa0JBQWNOLFNBQVNNLFlBTm1HO0FBTzFIQyxlQUFXUCxTQUFTTyxTQVBzRztBQVExSEMsdUJBQW1CUixTQUFTUSxpQkFSOEY7QUFTMUhDLDJCQUF1QlQsU0FBU1MscUJBVDBGO0FBVTFIQyxvQkFBZ0JWLFNBQVNVLGNBVmlHO0FBVzFIQyxnQkFBWVgsU0FBU1csVUFYcUc7QUFZMUhDLHFCQUFpQlosU0FBU1ksZUFaZ0c7QUFhMUhDLHFCQUFpQmIsU0FBU2EsZUFiZ0c7QUFjMUhDLGtDQUE4QmQsU0FBU2MsNEJBZG1GO0FBZTFIQyx5QkFBcUJmLFNBQVNlLG1CQWY0RjtBQWdCMUhDLHdCQUFvQmhCLFNBQVNnQixrQkFoQjZGO0FBaUIx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QUFDRCxLQTFJeUg7QUEySTFITyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLDRDQUFvQ0YsQ0FBcEMseUNBQXlFQSxDQUF6RSx5REFBOEhBLENBQTlILDJDQUFxS0EsQ0FBcks7QUFDRDtBQTlJeUgsR0FBNUcsQ0FBaEI7O0FBaUpBLGlCQUFLRyxTQUFMLENBQWUsa0NBQWYsRUFBbURwRixPQUFuRDtvQkFDZUEsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBhY3Rpb24gZnJvbSAnY3JtL0FjdGlvbic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcbmltcG9ydCBTYWxlc09yZGVySXRlbUF2YWlsYWJpbGl0eUxpc3QgZnJvbSAnLi4vTG9jYXRpb25zL1NhbGVzT3JkZXJJdGVtQXZhaWxhYmlsaXR5TGlzdCc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlckl0ZW1zTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlNhbGVzT3JkZXJJdGVtcy5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX01ldHJpY0xpc3RNaXhpbl0sIHtcclxuICBmb3JtYXR0ZXI6IGZvcm1hdCxcclxuICB1dGlsOiB1dGlsaXR5LFxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGxpbmVUZXh0OiByZXNvdXJjZS5saW5lVGV4dCxcclxuICBxdWFudGl0eVRleHQ6IHJlc291cmNlLnF1YW50aXR5VGV4dCxcclxuICBwcmljZVRleHQ6IHJlc291cmNlLnByaWNlVGV4dCxcclxuICBhZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UuYWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgYmFzZUFkanVzdGVkUHJpY2VUZXh0OiByZXNvdXJjZS5iYXNlQWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgYmFzZUFtb3VudFRleHQ6IHJlc291cmNlLmJhc2VBbW91bnRUZXh0LFxyXG4gIGFtb3VudFRleHQ6IHJlc291cmNlLmFtb3VudFRleHQsXHJcbiAgcHJvZHVjdE5hbWVUZXh0OiByZXNvdXJjZS5wcm9kdWN0TmFtZVRleHQsXHJcbiAgZGVzY3JpcHRpb25UZXh0OiByZXNvdXJjZS5kZXNjcmlwdGlvblRleHQsXHJcbiAgYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dDogcmVzb3VyY2UuYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dCxcclxuICBhc3NpZ25XYXJlaG91c2VUZXh0OiByZXNvdXJjZS5hc3NpZ25XYXJlaG91c2VUZXh0LFxyXG4gIHdhcmVob3VzZVRpdGxlVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlVGl0bGVUZXh0LFxyXG4gIHdhcmVob3VzZVRleHQ6IHJlc291cmNlLndhcmVob3VzZVRleHQsXHJcbiAgdG90YWxBbW91bnRUZXh0OiByZXNvdXJjZS50b3RhbEFtb3VudFRleHQsXHJcblxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJC5FcnBMaW5lTnVtYmVyKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5saW5lVGV4dCAlfTwvbGFiZWw+IHslOiAkLkVycExpbmVOdW1iZXIgJX08L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICd7JSBpZiAoJC5TbHhMb2NhdGlvbikgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQud2FyZWhvdXNlVGV4dCAlfTwvbGFiZWw+IHslOiAkLlNseExvY2F0aW9uLkRlc2NyaXB0aW9uICV9PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQucHJvZHVjdE5hbWVUZXh0ICV9PC9sYWJlbD4geyU6ICQuUHJvZHVjdE5hbWUgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5kZXNjcmlwdGlvblRleHQgJX08L2xhYmVsPiB7JTogJC5EZXNjcmlwdGlvbiAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPiA8bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5wcmljZVRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5QcmljZSwgJC5TYWxlc09yZGVyLkJhc2VDdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYWRqdXN0ZWRQcmljZVRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5Eb2NDYWxjdWxhdGVkUHJpY2UsICQuU2FsZXNPcmRlci5DdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYmFzZUFkanVzdGVkUHJpY2VUZXh0ICV9PC9sYWJlbD4gJyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuQ2FsY3VsYXRlZFByaWNlLCAkLlNhbGVzT3JkZXIuQmFzZUN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnF1YW50aXR5VGV4dCAlfTwvbGFiZWw+IHslOiAkLlF1YW50aXR5ICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+IDxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmJhc2VBbW91bnRUZXh0ICV9PC9sYWJlbD4gJyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuRXh0ZW5kZWRQcmljZSwgJC5TYWxlc09yZGVyLkJhc2VDdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYW1vdW50VGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLkRvY0V4dGVuZGVkUHJpY2UsICQuU2FsZXNPcmRlci5DdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQudG90YWxBbW91bnRUZXh0ICV9PC9sYWJlbD4gJyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuRG9jVG90YWxBbW91bnQsICQuU2FsZXNPcmRlci5DdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICBdKSxcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3NhbGVzc29yZGVyX2l0ZW1zX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICdzYWxlc29yZGVyX2l0ZW1fZGV0YWlsJyxcclxuICBpbnNlcnRWaWV3OiAnc2FsZXNvcmRlcl9pdGVtX2VkaXQnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuU0FMRVNPUkRFUklURU0sXHJcbiAgcmVzb3VyY2VLaW5kOiAnc2FsZXNPcmRlckl0ZW1zJyxcclxuICBhbGxvd1NlbGVjdGlvbjogdHJ1ZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvU2FsZXNPcmRlci9WaWV3JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvQWRkJyxcclxuXHJcbiAgLy8gQ2FyZCBsYXlvdXRcclxuICBpdGVtSWNvbkNsYXNzOiAnYnVsbGV0LWxpc3QnLFxyXG5cclxuICAvLyBNZXRyaWNzXHJcbiAgZW50aXR5TmFtZTogJ1NhbGVzT3JkZXJJdGVtJyxcclxuXHJcbiAgcmVhZE9ubHk6IGZhbHNlLFxyXG5cclxuICB0cmFuc2l0aW9uVG86IGZ1bmN0aW9uIHRyYW5zaXRpb25UbygpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dCAmJiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuZW50cnk7XHJcbiAgICBpZiAoZW50cnkgJiYgZW50cnkuSXNDbG9zZWQpIHtcclxuICAgICAgaWYgKEFwcC5iYXJzICYmIEFwcC5iYXJzLnRiYXIpIHtcclxuICAgICAgICBBcHAuYmFycy50YmFyLmRpc2FibGVUb29sKCduZXcnKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJlYWRPbmx5ID0gZW50cnkuSXNDbG9zZWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaGVyaXRlZCh0cmFuc2l0aW9uVG8sIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAnYXNzaWduV2FyZWhvdXNlJyxcclxuICAgICAgY2xzOiAnd2FyZWhvdXNlJyxcclxuICAgICAgbGFiZWw6IHRoaXMuYXNzaWduV2FyZWhvdXNlVGV4dCxcclxuICAgICAgZW5hYmxlZDogKGxheW91dEFjdGlvbiwgc2VsZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIEFwcC53YXJlaG91c2VEaXNjb3ZlcnkgPT09ICdhdXRvJyAmJlxyXG4gICAgICAgICAgYWN0aW9uLmhhc1Byb3BlcnR5KGxheW91dEFjdGlvbiwgc2VsZWN0aW9uLCAnU2FsZXNPcmRlci5FcnBMb2dpY2FsSWQnKTtcclxuICAgICAgfSxcclxuICAgICAgYWN0aW9uOiAnYXNzaWduV2FyZWhvdXNlQWN0aW9uJyxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgICAgdGJhcjogW3tcclxuICAgICAgICBpZDogJ25ldycsXHJcbiAgICAgICAgc3ZnOiAnYWRkJyxcclxuICAgICAgICBhY3Rpb246ICdwcmVOYXZpZ2F0ZVRvSW5zZXJ0JyxcclxuICAgICAgICBzZWN1cml0eTogdGhpcy5hcHAuZ2V0Vmlld1NlY3VyaXR5KHRoaXMuaW5zZXJ0VmlldywgJ2luc2VydCcpLFxyXG4gICAgICB9XSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcHJlTmF2aWdhdGVUb0luc2VydDogZnVuY3Rpb24gcHJlTmF2aWdhdGVUb0luc2VydCgpIHtcclxuICAgIGxldCBvcHRpb25zID0ge307XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dCAmJiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuZW50cnkpIHtcclxuICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICBTYWxlc09yZGVyOiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuZW50cnksXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHRoaXMubmF2aWdhdGVUb0luc2VydFZpZXcob3B0aW9ucyk7XHJcbiAgfSxcclxuICBhc3NpZ25XYXJlaG91c2VBY3Rpb246IGZ1bmN0aW9uIGFzc2lnbldhcmVob3VzZUFjdGlvbih0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuZW50cnk7XHJcbiAgICBjb25zdCBvcmRlckl0ZW1LZXkgPSBzZWxlY3Rpb24udGFnLmF0dHJpYnV0ZXNbJ2RhdGEta2V5J10udmFsdWU7XHJcbiAgICBjb25zdCBvcmRlckl0ZW0gPSB0aGlzLmVudHJpZXNbb3JkZXJJdGVtS2V5XTtcclxuICAgIGlmIChvcmRlckl0ZW0pIHtcclxuICAgICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0QXZhaWxhYmlsaXR5VmlldygpO1xyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBvcmRlckl0ZW0sXHJcbiAgICAgICAgICBvcmRlcixcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGdldEF2YWlsYWJpbGl0eVZpZXc6IGZ1bmN0aW9uIGdldEF2YWlsYWJpbGl0eVZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3SWQgPSAnbG9jYXRpb25zX3NhbGVzT3JkZXJJdGVtQXZhaWxhYmlsaXR5TGlzdCc7XHJcbiAgICBsZXQgdmlldyA9IEFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuXHJcbiAgICBBcHAucmVnaXN0ZXJWaWV3KG5ldyBTYWxlc09yZGVySXRlbUF2YWlsYWJpbGl0eUxpc3QoeyBpZDogdmlld0lkIH0pKTtcclxuICAgIHZpZXcgPSBBcHAuZ2V0Vmlldyh2aWV3SWQpO1xyXG4gICAgcmV0dXJuIHZpZXc7XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGAodXBwZXIoRGVzY3JpcHRpb24pIGxpa2UgXCIke3F9JVwiKSBvciAodXBwZXIoUHJvZHVjdE5hbWUpIGxpa2UgXCIke3F9JVwiKSBvciAodXBwZXIoU2FsZXNPcmRlci5TYWxlc09yZGVyTnVtYmVyKSBsaWtlIFwiJHtxfSVcIikgb3IgKHVwcGVyKEVycExpbmVOdW1iZXIpIGxpa2UgXCIke3F9JVwiKWA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuU2FsZXNPcmRlckl0ZW1zLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19