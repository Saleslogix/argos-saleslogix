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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJJdGVtcy9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImZvcm1hdHRlciIsInV0aWwiLCJ0aXRsZVRleHQiLCJsaW5lVGV4dCIsInF1YW50aXR5VGV4dCIsInByaWNlVGV4dCIsImFkanVzdGVkUHJpY2VUZXh0IiwiYmFzZUFkanVzdGVkUHJpY2VUZXh0IiwiYmFzZUFtb3VudFRleHQiLCJhbW91bnRUZXh0IiwicHJvZHVjdE5hbWVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwiYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dCIsImFzc2lnbldhcmVob3VzZVRleHQiLCJ3YXJlaG91c2VUaXRsZVRleHQiLCJ3YXJlaG91c2VUZXh0IiwidG90YWxBbW91bnRUZXh0IiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpZCIsImRldGFpbFZpZXciLCJpbnNlcnRWaWV3IiwibW9kZWxOYW1lIiwiU0FMRVNPUkRFUklURU0iLCJyZXNvdXJjZUtpbmQiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJzZWN1cml0eSIsImluc2VydFNlY3VyaXR5IiwiaXRlbUljb25DbGFzcyIsImVudGl0eU5hbWUiLCJyZWFkT25seSIsInRyYW5zaXRpb25UbyIsImVudHJ5Iiwib3B0aW9ucyIsImZyb21Db250ZXh0IiwiSXNDbG9zZWQiLCJBcHAiLCJiYXJzIiwidGJhciIsImRpc2FibGVUb29sIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImNscyIsImxhYmVsIiwiZW5hYmxlZCIsImxheW91dEFjdGlvbiIsInNlbGVjdGlvbiIsIndhcmVob3VzZURpc2NvdmVyeSIsImhhc1Byb3BlcnR5IiwiYWN0aW9uIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwic3ZnIiwiYXBwIiwiZ2V0Vmlld1NlY3VyaXR5IiwicHJlTmF2aWdhdGVUb0luc2VydCIsImNvbnRleHQiLCJTYWxlc09yZGVyIiwibmF2aWdhdGVUb0luc2VydFZpZXciLCJhc3NpZ25XYXJlaG91c2VBY3Rpb24iLCJ0aGVBY3Rpb24iLCJvcmRlciIsIm9yZGVySXRlbUtleSIsInRhZyIsImF0dHJpYnV0ZXMiLCJ2YWx1ZSIsIm9yZGVySXRlbSIsImVudHJpZXMiLCJ2aWV3IiwiZ2V0QXZhaWxhYmlsaXR5VmlldyIsInJlZnJlc2hSZXF1aXJlZCIsInNob3ciLCJ2aWV3SWQiLCJnZXRWaWV3IiwicmVnaXN0ZXJWaWV3IiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsTUFBTUEsV0FBVyxvQkFBWSxxQkFBWixDQUFqQixDLENBNUJBOzs7Ozs7Ozs7Ozs7Ozs7QUE4QkEsTUFBTUMsVUFBVSx1QkFBUSxpREFBUixFQUEyRCwyRUFBM0QsRUFBNEc7QUFDMUhDLCtCQUQwSDtBQUUxSEMsMkJBRjBIO0FBRzFIO0FBQ0FDLGVBQVdKLFNBQVNJLFNBSnNHO0FBSzFIQyxjQUFVTCxTQUFTSyxRQUx1RztBQU0xSEMsa0JBQWNOLFNBQVNNLFlBTm1HO0FBTzFIQyxlQUFXUCxTQUFTTyxTQVBzRztBQVExSEMsdUJBQW1CUixTQUFTUSxpQkFSOEY7QUFTMUhDLDJCQUF1QlQsU0FBU1MscUJBVDBGO0FBVTFIQyxvQkFBZ0JWLFNBQVNVLGNBVmlHO0FBVzFIQyxnQkFBWVgsU0FBU1csVUFYcUc7QUFZMUhDLHFCQUFpQlosU0FBU1ksZUFaZ0c7QUFhMUhDLHFCQUFpQmIsU0FBU2EsZUFiZ0c7QUFjMUhDLGtDQUE4QmQsU0FBU2MsNEJBZG1GO0FBZTFIQyx5QkFBcUJmLFNBQVNlLG1CQWY0RjtBQWdCMUhDLHdCQUFvQmhCLFNBQVNnQixrQkFoQjZGO0FBaUIx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QTJJMUhPLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsNENBQW9DRixDQUFwQyx5Q0FBeUVBLENBQXpFLHlEQUE4SEEsQ0FBOUgsMkNBQXFLQSxDQUFySztBQUNEO0FBOUl5SCxHQUE1RyxDQUFoQjs7QUFpSkEsaUJBQUtHLFNBQUwsQ0FBZSxrQ0FBZixFQUFtRHBGLE9BQW5EO29CQUNlQSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGFjdGlvbiBmcm9tICdjcm0vQWN0aW9uJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX1JpZ2h0RHJhd2VyTGlzdE1peGluJztcclxuaW1wb3J0IF9NZXRyaWNMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICcuLi8uLi9VdGlsaXR5JztcclxuaW1wb3J0IFNhbGVzT3JkZXJJdGVtQXZhaWxhYmlsaXR5TGlzdCBmcm9tICcuLi9Mb2NhdGlvbnMvU2FsZXNPcmRlckl0ZW1BdmFpbGFiaWxpdHlMaXN0JztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdzYWxlc09yZGVySXRlbXNMaXN0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuU2FsZXNPcmRlckl0ZW1zLkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluXSwge1xyXG4gIGZvcm1hdHRlcjogZm9ybWF0LFxyXG4gIHV0aWw6IHV0aWxpdHksXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgbGluZVRleHQ6IHJlc291cmNlLmxpbmVUZXh0LFxyXG4gIHF1YW50aXR5VGV4dDogcmVzb3VyY2UucXVhbnRpdHlUZXh0LFxyXG4gIHByaWNlVGV4dDogcmVzb3VyY2UucHJpY2VUZXh0LFxyXG4gIGFkanVzdGVkUHJpY2VUZXh0OiByZXNvdXJjZS5hZGp1c3RlZFByaWNlVGV4dCxcclxuICBiYXNlQWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICBiYXNlQW1vdW50VGV4dDogcmVzb3VyY2UuYmFzZUFtb3VudFRleHQsXHJcbiAgYW1vdW50VGV4dDogcmVzb3VyY2UuYW1vdW50VGV4dCxcclxuICBwcm9kdWN0TmFtZVRleHQ6IHJlc291cmNlLnByb2R1Y3ROYW1lVGV4dCxcclxuICBkZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLmRlc2NyaXB0aW9uVGV4dCxcclxuICBhY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0OiByZXNvdXJjZS5hY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0LFxyXG4gIGFzc2lnbldhcmVob3VzZVRleHQ6IHJlc291cmNlLmFzc2lnbldhcmVob3VzZVRleHQsXHJcbiAgd2FyZWhvdXNlVGl0bGVUZXh0OiByZXNvdXJjZS53YXJlaG91c2VUaXRsZVRleHQsXHJcbiAgd2FyZWhvdXNlVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlVGV4dCxcclxuICB0b3RhbEFtb3VudFRleHQ6IHJlc291cmNlLnRvdGFsQW1vdW50VGV4dCxcclxuXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkLkVycExpbmVOdW1iZXIpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmxpbmVUZXh0ICV9PC9sYWJlbD4geyU6ICQuRXJwTGluZU51bWJlciAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slIGlmICgkLlNseExvY2F0aW9uKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC53YXJlaG91c2VUZXh0ICV9PC9sYWJlbD4geyU6ICQuU2x4TG9jYXRpb24uRGVzY3JpcHRpb24gJX08L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5wcm9kdWN0TmFtZVRleHQgJX08L2xhYmVsPiB7JTogJC5Qcm9kdWN0TmFtZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmRlc2NyaXB0aW9uVGV4dCAlfTwvbGFiZWw+IHslOiAkLkRlc2NyaXB0aW9uICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+IDxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnByaWNlVGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLlByaWNlLCAkLlNhbGVzT3JkZXIuQmFzZUN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPiA8bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5hZGp1c3RlZFByaWNlVGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLkRvY0NhbGN1bGF0ZWRQcmljZSwgJC5TYWxlc09yZGVyLkN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPiA8bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5iYXNlQWRqdXN0ZWRQcmljZVRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5DYWxjdWxhdGVkUHJpY2UsICQuU2FsZXNPcmRlci5CYXNlQ3VycmVuY3lDb2RlKSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQucXVhbnRpdHlUZXh0ICV9PC9sYWJlbD4geyU6ICQuUXVhbnRpdHkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYmFzZUFtb3VudFRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5FeHRlbmRlZFByaWNlLCAkLlNhbGVzT3JkZXIuQmFzZUN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPiA8bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5hbW91bnRUZXh0ICV9PC9sYWJlbD4gJyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuRG9jRXh0ZW5kZWRQcmljZSwgJC5TYWxlc09yZGVyLkN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPiA8bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC50b3RhbEFtb3VudFRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5Eb2NUb3RhbEFtb3VudCwgJC5TYWxlc09yZGVyLkN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gIF0pLFxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnc2FsZXNzb3JkZXJfaXRlbXNfbGlzdCcsXHJcbiAgZGV0YWlsVmlldzogJ3NhbGVzb3JkZXJfaXRlbV9kZXRhaWwnLFxyXG4gIGluc2VydFZpZXc6ICdzYWxlc29yZGVyX2l0ZW1fZWRpdCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5TQUxFU09SREVSSVRFTSxcclxuICByZXNvdXJjZUtpbmQ6ICdzYWxlc09yZGVySXRlbXMnLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL1ZpZXcnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvU2FsZXNPcmRlci9BZGQnLFxyXG5cclxuICAvLyBDYXJkIGxheW91dFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICdidWxsZXQtbGlzdCcsXHJcblxyXG4gIC8vIE1ldHJpY3NcclxuICBlbnRpdHlOYW1lOiAnU2FsZXNPcmRlckl0ZW0nLFxyXG5cclxuICByZWFkT25seTogZmFsc2UsXHJcblxyXG4gIHRyYW5zaXRpb25UbzogZnVuY3Rpb24gdHJhbnNpdGlvblRvKCkge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZyb21Db250ZXh0ICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dC5lbnRyeTtcclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5Jc0Nsb3NlZCkge1xyXG4gICAgICBpZiAoQXBwLmJhcnMgJiYgQXBwLmJhcnMudGJhcikge1xyXG4gICAgICAgIEFwcC5iYXJzLnRiYXIuZGlzYWJsZVRvb2woJ25ldycpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVhZE9ubHkgPSBlbnRyeS5Jc0Nsb3NlZDtcclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAnYXNzaWduV2FyZWhvdXNlJyxcclxuICAgICAgY2xzOiAnd2FyZWhvdXNlJyxcclxuICAgICAgbGFiZWw6IHRoaXMuYXNzaWduV2FyZWhvdXNlVGV4dCxcclxuICAgICAgZW5hYmxlZDogKGxheW91dEFjdGlvbiwgc2VsZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIEFwcC53YXJlaG91c2VEaXNjb3ZlcnkgPT09ICdhdXRvJyAmJlxyXG4gICAgICAgICAgYWN0aW9uLmhhc1Byb3BlcnR5KGxheW91dEFjdGlvbiwgc2VsZWN0aW9uLCAnU2FsZXNPcmRlci5FcnBMb2dpY2FsSWQnKTtcclxuICAgICAgfSxcclxuICAgICAgYWN0aW9uOiAnYXNzaWduV2FyZWhvdXNlQWN0aW9uJyxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgICAgdGJhcjogW3tcclxuICAgICAgICBpZDogJ25ldycsXHJcbiAgICAgICAgc3ZnOiAnYWRkJyxcclxuICAgICAgICBhY3Rpb246ICdwcmVOYXZpZ2F0ZVRvSW5zZXJ0JyxcclxuICAgICAgICBzZWN1cml0eTogdGhpcy5hcHAuZ2V0Vmlld1NlY3VyaXR5KHRoaXMuaW5zZXJ0VmlldywgJ2luc2VydCcpLFxyXG4gICAgICB9XSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcHJlTmF2aWdhdGVUb0luc2VydDogZnVuY3Rpb24gcHJlTmF2aWdhdGVUb0luc2VydCgpIHtcclxuICAgIGxldCBvcHRpb25zID0ge307XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dCAmJiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuZW50cnkpIHtcclxuICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICBTYWxlc09yZGVyOiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuZW50cnksXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHRoaXMubmF2aWdhdGVUb0luc2VydFZpZXcob3B0aW9ucyk7XHJcbiAgfSxcclxuICBhc3NpZ25XYXJlaG91c2VBY3Rpb246IGZ1bmN0aW9uIGFzc2lnbldhcmVob3VzZUFjdGlvbih0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuZW50cnk7XHJcbiAgICBjb25zdCBvcmRlckl0ZW1LZXkgPSBzZWxlY3Rpb24udGFnLmF0dHJpYnV0ZXNbJ2RhdGEta2V5J10udmFsdWU7XHJcbiAgICBjb25zdCBvcmRlckl0ZW0gPSB0aGlzLmVudHJpZXNbb3JkZXJJdGVtS2V5XTtcclxuICAgIGlmIChvcmRlckl0ZW0pIHtcclxuICAgICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0QXZhaWxhYmlsaXR5VmlldygpO1xyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBvcmRlckl0ZW0sXHJcbiAgICAgICAgICBvcmRlcixcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGdldEF2YWlsYWJpbGl0eVZpZXc6IGZ1bmN0aW9uIGdldEF2YWlsYWJpbGl0eVZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3SWQgPSAnbG9jYXRpb25zX3NhbGVzT3JkZXJJdGVtQXZhaWxhYmlsaXR5TGlzdCc7XHJcbiAgICBsZXQgdmlldyA9IEFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuXHJcbiAgICBBcHAucmVnaXN0ZXJWaWV3KG5ldyBTYWxlc09yZGVySXRlbUF2YWlsYWJpbGl0eUxpc3QoeyBpZDogdmlld0lkIH0pKTtcclxuICAgIHZpZXcgPSBBcHAuZ2V0Vmlldyh2aWV3SWQpO1xyXG4gICAgcmV0dXJuIHZpZXc7XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGAodXBwZXIoRGVzY3JpcHRpb24pIGxpa2UgXCIke3F9JVwiKSBvciAodXBwZXIoUHJvZHVjdE5hbWUpIGxpa2UgXCIke3F9JVwiKSBvciAodXBwZXIoU2FsZXNPcmRlci5TYWxlc09yZGVyTnVtYmVyKSBsaWtlIFwiJHtxfSVcIikgb3IgKHVwcGVyKEVycExpbmVOdW1iZXIpIGxpa2UgXCIke3F9JVwiKWA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuU2FsZXNPcmRlckl0ZW1zLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19