define('crm/Integrations/BOE/Views/QuoteLines/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Action', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', '../../Models/Names', 'argos/I18n', '../../Utility', '../Locations/QuoteItemAvailabilityList'], function (module, exports, _declare, _lang, _List, _Action, _Format, _RightDrawerListMixin2, _MetricListMixin2, _Names, _I18n, _Utility, _QuoteItemAvailabilityList) {
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

  var _QuoteItemAvailabilityList2 = _interopRequireDefault(_QuoteItemAvailabilityList);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('quoteItemsList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.QuoteLines.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], {
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
    warehousesTitleText: resource.warehouseTitleText,
    warehouseText: resource.warehouseText,
    totalAmountText: resource.totalAmountText,

    // Templates
    itemTemplate: new Simplate(['{% if ($.ErpLineNumber) { %}', '<p class="listview-heading"><label class="group-label">{%: $$.lineText %}</label> {%: $.ErpLineNumber %}</p>', '{% } %}', '{% if ($.SlxLocation) { %}', '<p class="micro-text"><label class="group-label">{%: $$.warehouseText %}</label> {%: $.SlxLocation.Description %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.descriptionText %}</label> {%: $.Description %}</p>', '<p class="micro-text"> <label class="group-label">{%: $$.priceText %} </label>', '{%: $$.util.formatMultiCurrency($.Price, $.Quote.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.adjustedPriceText %}</label> ', '{%: $$.util.formatMultiCurrency($.DocCalculatedPrice, $.Quote.CurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.baseAdjustedPriceText %}</label> ', '{%: $$.util.formatMultiCurrency($.CalculatedPrice, $.Quote.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.quantityText %}</label> {%: $.Quantity %}</p>', '<p class="micro-text"> <label class="group-label">{%: $$.baseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ExtendedPrice, $.Quote.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.amountText %}</label> ', '{%: $$.util.formatMultiCurrency($.DocExtendedPrice, $.Quote.CurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.totalAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.DocTotalAmount, $.Quote.CurrencyCode) %}', '</p>']),
    // View Properties
    id: 'quote_lines_list',
    detailView: 'quote_line_detail',
    insertView: 'quote_line_edit',
    modelName: _Names2.default.QUOTEITEM,
    resourceKind: 'quoteItems',
    allowSelection: true,
    enableActions: true,
    security: 'Entities/Quote/View',
    insertSecurity: 'Entities/Quote/Add',

    // Card layout
    itemIconClass: 'bullet-list',

    // Metrics
    entityName: 'QuoteItem',

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
          return App.warehouseDiscovery === 'auto' && _Action2.default.hasProperty(layoutAction, selection, 'Quote.ErpLogicalId');
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
            Quote: this.options.fromContext.entry
          }
        };
      }
      this.navigateToInsertView(options);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Description) like "' + q + '%") or (upper(ProductName) like "' + q + '%") or (upper(Quote.QuoteNumber) like "' + q + '%") or (upper(ErpLineNumber) like "' + q + '%")';
    },
    assignWarehouseAction: function assignWarehouseAction(theAction, selection) {
      var quote = this.options.fromContext.entry;
      var quoteItemKey = selection.tag.attributes['data-key'].value;
      var quoteItem = this.entries[quoteItemKey];
      if (quoteItem) {
        var view = this.getAvailabilityView();
        if (view) {
          var options = {
            quoteItem: quoteItem,
            quote: quote
          };
          this.refreshRequired = true;
          view.show(options);
        }
      }
    },
    getAvailabilityView: function getAvailabilityView() {
      var viewId = 'locations_quoteItemAvailabilityList';
      var view = App.getView(viewId);
      if (view) {
        return view;
      }

      App.registerView(new _QuoteItemAvailabilityList2.default({ id: viewId }));
      view = App.getView(viewId);
      return view;
    }
  });

  _lang2.default.setObject('icboe.Views.QuoteLines.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3RlTGluZXMvTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJmb3JtYXR0ZXIiLCJ1dGlsIiwidGl0bGVUZXh0IiwibGluZVRleHQiLCJxdWFudGl0eVRleHQiLCJwcmljZVRleHQiLCJhZGp1c3RlZFByaWNlVGV4dCIsImJhc2VBZGp1c3RlZFByaWNlVGV4dCIsImJhc2VBbW91bnRUZXh0IiwiYW1vdW50VGV4dCIsInByb2R1Y3ROYW1lVGV4dCIsImRlc2NyaXB0aW9uVGV4dCIsImFjY291bnRpbmdFbnRpdHlSZXF1aXJlZFRleHQiLCJhc3NpZ25XYXJlaG91c2VUZXh0Iiwid2FyZWhvdXNlc1RpdGxlVGV4dCIsIndhcmVob3VzZVRpdGxlVGV4dCIsIndhcmVob3VzZVRleHQiLCJ0b3RhbEFtb3VudFRleHQiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImlkIiwiZGV0YWlsVmlldyIsImluc2VydFZpZXciLCJtb2RlbE5hbWUiLCJRVU9URUlURU0iLCJyZXNvdXJjZUtpbmQiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJzZWN1cml0eSIsImluc2VydFNlY3VyaXR5IiwiaXRlbUljb25DbGFzcyIsImVudGl0eU5hbWUiLCJyZWFkT25seSIsInRyYW5zaXRpb25UbyIsImVudHJ5Iiwib3B0aW9ucyIsImZyb21Db250ZXh0IiwiSXNDbG9zZWQiLCJBcHAiLCJiYXJzIiwidGJhciIsImRpc2FibGVUb29sIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImNscyIsImxhYmVsIiwiZW5hYmxlZCIsImxheW91dEFjdGlvbiIsInNlbGVjdGlvbiIsIndhcmVob3VzZURpc2NvdmVyeSIsImhhc1Byb3BlcnR5IiwiYWN0aW9uIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwic3ZnIiwiYXBwIiwiZ2V0Vmlld1NlY3VyaXR5IiwicHJlTmF2aWdhdGVUb0luc2VydCIsImNvbnRleHQiLCJRdW90ZSIsIm5hdmlnYXRlVG9JbnNlcnRWaWV3IiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwiYXNzaWduV2FyZWhvdXNlQWN0aW9uIiwidGhlQWN0aW9uIiwicXVvdGUiLCJxdW90ZUl0ZW1LZXkiLCJ0YWciLCJhdHRyaWJ1dGVzIiwidmFsdWUiLCJxdW90ZUl0ZW0iLCJlbnRyaWVzIiwidmlldyIsImdldEF2YWlsYWJpbGl0eVZpZXciLCJyZWZyZXNoUmVxdWlyZWQiLCJzaG93Iiwidmlld0lkIiwiZ2V0VmlldyIsInJlZ2lzdGVyVmlldyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBLE1BQU1BLFdBQVcsb0JBQVksZ0JBQVosQ0FBakIsQyxDQTNCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLE1BQU1DLFVBQVUsdUJBQVEsNENBQVIsRUFBc0QsMkVBQXRELEVBQXVHO0FBQ3JIQywrQkFEcUg7QUFFckhDLDJCQUZxSDtBQUdySDtBQUNBQyxlQUFXSixTQUFTSSxTQUppRztBQUtySEMsY0FBVUwsU0FBU0ssUUFMa0c7QUFNckhDLGtCQUFjTixTQUFTTSxZQU44RjtBQU9ySEMsZUFBV1AsU0FBU08sU0FQaUc7QUFRckhDLHVCQUFtQlIsU0FBU1EsaUJBUnlGO0FBU3JIQywyQkFBdUJULFNBQVNTLHFCQVRxRjtBQVVySEMsb0JBQWdCVixTQUFTVSxjQVY0RjtBQVdySEMsZ0JBQVlYLFNBQVNXLFVBWGdHO0FBWXJIQyxxQkFBaUJaLFNBQVNZLGVBWjJGO0FBYXJIQyxxQkFBaUJiLFNBQVNhLGVBYjJGO0FBY3JIQyxrQ0FBOEJkLFNBQVNjLDRCQWQ4RTtBQWVySEMseUJBQXFCZixTQUFTZSxtQkFmdUY7QUFnQnJIQyx5QkFBcUJoQixTQUFTaUIsa0JBaEJ1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QVosQ0FBWDtBQUNBLFVBQUlKLElBQUosRUFBVTtBQUNSLGVBQU9BLElBQVA7QUFDRDs7QUFFRHZDLFVBQUk2QyxZQUFKLENBQWlCLHdDQUE4QixFQUFFL0QsSUFBSTZELE1BQU4sRUFBOUIsQ0FBakI7QUFDQUosYUFBT3ZDLElBQUk0QyxPQUFKLENBQVlELE1BQVosQ0FBUDtBQUNBLGFBQU9KLElBQVA7QUFDRDtBQS9Jb0gsR0FBdkcsQ0FBaEI7O0FBa0pBLGlCQUFLTyxTQUFMLENBQWUsNkJBQWYsRUFBOENyRixPQUE5QztvQkFDZUEsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBhY3Rpb24gZnJvbSAnY3JtL0FjdGlvbic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcbmltcG9ydCBRdW90ZUl0ZW1BdmFpbGFiaWxpdHlMaXN0IGZyb20gJy4uL0xvY2F0aW9ucy9RdW90ZUl0ZW1BdmFpbGFiaWxpdHlMaXN0JztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3F1b3RlSXRlbXNMaXN0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuUXVvdGVMaW5lcy5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX01ldHJpY0xpc3RNaXhpbl0sIHtcclxuICBmb3JtYXR0ZXI6IGZvcm1hdCxcclxuICB1dGlsOiB1dGlsaXR5LFxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGxpbmVUZXh0OiByZXNvdXJjZS5saW5lVGV4dCxcclxuICBxdWFudGl0eVRleHQ6IHJlc291cmNlLnF1YW50aXR5VGV4dCxcclxuICBwcmljZVRleHQ6IHJlc291cmNlLnByaWNlVGV4dCxcclxuICBhZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UuYWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgYmFzZUFkanVzdGVkUHJpY2VUZXh0OiByZXNvdXJjZS5iYXNlQWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgYmFzZUFtb3VudFRleHQ6IHJlc291cmNlLmJhc2VBbW91bnRUZXh0LFxyXG4gIGFtb3VudFRleHQ6IHJlc291cmNlLmFtb3VudFRleHQsXHJcbiAgcHJvZHVjdE5hbWVUZXh0OiByZXNvdXJjZS5wcm9kdWN0TmFtZVRleHQsXHJcbiAgZGVzY3JpcHRpb25UZXh0OiByZXNvdXJjZS5kZXNjcmlwdGlvblRleHQsXHJcbiAgYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dDogcmVzb3VyY2UuYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dCxcclxuICBhc3NpZ25XYXJlaG91c2VUZXh0OiByZXNvdXJjZS5hc3NpZ25XYXJlaG91c2VUZXh0LFxyXG4gIHdhcmVob3VzZXNUaXRsZVRleHQ6IHJlc291cmNlLndhcmVob3VzZVRpdGxlVGV4dCxcclxuICB3YXJlaG91c2VUZXh0OiByZXNvdXJjZS53YXJlaG91c2VUZXh0LFxyXG4gIHRvdGFsQW1vdW50VGV4dDogcmVzb3VyY2UudG90YWxBbW91bnRUZXh0LFxyXG5cclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQuRXJwTGluZU51bWJlcikgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQubGluZVRleHQgJX08L2xhYmVsPiB7JTogJC5FcnBMaW5lTnVtYmVyICV9PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAneyUgaWYgKCQuU2x4TG9jYXRpb24pIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLndhcmVob3VzZVRleHQgJX08L2xhYmVsPiB7JTogJC5TbHhMb2NhdGlvbi5EZXNjcmlwdGlvbiAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnByb2R1Y3ROYW1lVGV4dCAlfTwvbGFiZWw+IHslOiAkLlByb2R1Y3ROYW1lICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuZGVzY3JpcHRpb25UZXh0ICV9PC9sYWJlbD4geyU6ICQuRGVzY3JpcHRpb24gJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQucHJpY2VUZXh0ICV9IDwvbGFiZWw+JyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuUHJpY2UsICQuUXVvdGUuQmFzZUN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPiA8bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5hZGp1c3RlZFByaWNlVGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLkRvY0NhbGN1bGF0ZWRQcmljZSwgJC5RdW90ZS5DdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYmFzZUFkanVzdGVkUHJpY2VUZXh0ICV9PC9sYWJlbD4gJyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuQ2FsY3VsYXRlZFByaWNlLCAkLlF1b3RlLkJhc2VDdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5xdWFudGl0eVRleHQgJX08L2xhYmVsPiB7JTogJC5RdWFudGl0eSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPiA8bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5iYXNlQW1vdW50VGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLkV4dGVuZGVkUHJpY2UsICQuUXVvdGUuQmFzZUN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPiA8bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5hbW91bnRUZXh0ICV9PC9sYWJlbD4gJyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuRG9jRXh0ZW5kZWRQcmljZSwgJC5RdW90ZS5DdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQudG90YWxBbW91bnRUZXh0ICV9PC9sYWJlbD4gJyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuRG9jVG90YWxBbW91bnQsICQuUXVvdGUuQ3VycmVuY3lDb2RlKSAlfScsXHJcbiAgICAnPC9wPicsXHJcblxyXG4gIF0pLFxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAncXVvdGVfbGluZXNfbGlzdCcsXHJcbiAgZGV0YWlsVmlldzogJ3F1b3RlX2xpbmVfZGV0YWlsJyxcclxuICBpbnNlcnRWaWV3OiAncXVvdGVfbGluZV9lZGl0JyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlFVT1RFSVRFTSxcclxuICByZXNvdXJjZUtpbmQ6ICdxdW90ZUl0ZW1zJyxcclxuICBhbGxvd1NlbGVjdGlvbjogdHJ1ZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvUXVvdGUvVmlldycsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9BZGQnLFxyXG5cclxuICAvLyBDYXJkIGxheW91dFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICdidWxsZXQtbGlzdCcsXHJcblxyXG4gIC8vIE1ldHJpY3NcclxuICBlbnRpdHlOYW1lOiAnUXVvdGVJdGVtJyxcclxuXHJcbiAgcmVhZE9ubHk6IGZhbHNlLFxyXG5cclxuICB0cmFuc2l0aW9uVG86IGZ1bmN0aW9uIHRyYW5zaXRpb25UbygpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dCAmJiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuZW50cnk7XHJcbiAgICBpZiAoZW50cnkgJiYgZW50cnkuSXNDbG9zZWQpIHtcclxuICAgICAgaWYgKEFwcC5iYXJzICYmIEFwcC5iYXJzLnRiYXIpIHtcclxuICAgICAgICBBcHAuYmFycy50YmFyLmRpc2FibGVUb29sKCduZXcnKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJlYWRPbmx5ID0gZW50cnkuSXNDbG9zZWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgY3JlYXRlQWN0aW9uTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25MYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zIHx8ICh0aGlzLmFjdGlvbnMgPSBbe1xyXG4gICAgICBpZDogJ2Fzc2lnbldhcmVob3VzZScsXHJcbiAgICAgIGNsczogJ3dhcmVob3VzZScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFzc2lnbldhcmVob3VzZVRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IChsYXlvdXRBY3Rpb24sIHNlbGVjdGlvbikgPT4ge1xyXG4gICAgICAgIHJldHVybiBBcHAud2FyZWhvdXNlRGlzY292ZXJ5ID09PSAnYXV0bycgJiZcclxuICAgICAgICAgIGFjdGlvbi5oYXNQcm9wZXJ0eShsYXlvdXRBY3Rpb24sIHNlbGVjdGlvbiwgJ1F1b3RlLkVycExvZ2ljYWxJZCcpO1xyXG4gICAgICB9LFxyXG4gICAgICBhY3Rpb246ICdhc3NpZ25XYXJlaG91c2VBY3Rpb24nLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbe1xyXG4gICAgICAgIGlkOiAnbmV3JyxcclxuICAgICAgICBzdmc6ICdhZGQnLFxyXG4gICAgICAgIGFjdGlvbjogJ3ByZU5hdmlnYXRlVG9JbnNlcnQnLFxyXG4gICAgICAgIHNlY3VyaXR5OiB0aGlzLmFwcC5nZXRWaWV3U2VjdXJpdHkodGhpcy5pbnNlcnRWaWV3LCAnaW5zZXJ0JyksXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBwcmVOYXZpZ2F0ZVRvSW5zZXJ0OiBmdW5jdGlvbiBwcmVOYXZpZ2F0ZVRvSW5zZXJ0KCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7fTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZyb21Db250ZXh0ICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dC5lbnRyeSkge1xyXG4gICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgIFF1b3RlOiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuZW50cnksXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHRoaXMubmF2aWdhdGVUb0luc2VydFZpZXcob3B0aW9ucyk7XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGAodXBwZXIoRGVzY3JpcHRpb24pIGxpa2UgXCIke3F9JVwiKSBvciAodXBwZXIoUHJvZHVjdE5hbWUpIGxpa2UgXCIke3F9JVwiKSBvciAodXBwZXIoUXVvdGUuUXVvdGVOdW1iZXIpIGxpa2UgXCIke3F9JVwiKSBvciAodXBwZXIoRXJwTGluZU51bWJlcikgbGlrZSBcIiR7cX0lXCIpYDtcclxuICB9LFxyXG4gIGFzc2lnbldhcmVob3VzZUFjdGlvbjogZnVuY3Rpb24gYXNzaWduV2FyZWhvdXNlQWN0aW9uKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBxdW90ZSA9IHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dC5lbnRyeTtcclxuICAgIGNvbnN0IHF1b3RlSXRlbUtleSA9IHNlbGVjdGlvbi50YWcuYXR0cmlidXRlc1snZGF0YS1rZXknXS52YWx1ZTtcclxuICAgIGNvbnN0IHF1b3RlSXRlbSA9IHRoaXMuZW50cmllc1txdW90ZUl0ZW1LZXldO1xyXG4gICAgaWYgKHF1b3RlSXRlbSkge1xyXG4gICAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRBdmFpbGFiaWxpdHlWaWV3KCk7XHJcbiAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIHF1b3RlSXRlbSxcclxuICAgICAgICAgIHF1b3RlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0QXZhaWxhYmlsaXR5VmlldzogZnVuY3Rpb24gZ2V0QXZhaWxhYmlsaXR5VmlldygpIHtcclxuICAgIGNvbnN0IHZpZXdJZCA9ICdsb2NhdGlvbnNfcXVvdGVJdGVtQXZhaWxhYmlsaXR5TGlzdCc7XHJcbiAgICBsZXQgdmlldyA9IEFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuXHJcbiAgICBBcHAucmVnaXN0ZXJWaWV3KG5ldyBRdW90ZUl0ZW1BdmFpbGFiaWxpdHlMaXN0KHsgaWQ6IHZpZXdJZCB9KSk7XHJcbiAgICB2aWV3ID0gQXBwLmdldFZpZXcodmlld0lkKTtcclxuICAgIHJldHVybiB2aWV3O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLlF1b3RlTGluZXMuTGlzdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=