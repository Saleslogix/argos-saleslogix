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
      this.inherited(transitionTo, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3RlTGluZXMvTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJmb3JtYXR0ZXIiLCJ1dGlsIiwidGl0bGVUZXh0IiwibGluZVRleHQiLCJxdWFudGl0eVRleHQiLCJwcmljZVRleHQiLCJhZGp1c3RlZFByaWNlVGV4dCIsImJhc2VBZGp1c3RlZFByaWNlVGV4dCIsImJhc2VBbW91bnRUZXh0IiwiYW1vdW50VGV4dCIsInByb2R1Y3ROYW1lVGV4dCIsImRlc2NyaXB0aW9uVGV4dCIsImFjY291bnRpbmdFbnRpdHlSZXF1aXJlZFRleHQiLCJhc3NpZ25XYXJlaG91c2VUZXh0Iiwid2FyZWhvdXNlc1RpdGxlVGV4dCIsIndhcmVob3VzZVRpdGxlVGV4dCIsIndhcmVob3VzZVRleHQiLCJ0b3RhbEFtb3VudFRleHQiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImlkIiwiZGV0YWlsVmlldyIsImluc2VydFZpZXciLCJtb2RlbE5hbWUiLCJRVU9URUlURU0iLCJyZXNvdXJjZUtpbmQiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJzZWN1cml0eSIsImluc2VydFNlY3VyaXR5IiwiaXRlbUljb25DbGFzcyIsImVudGl0eU5hbWUiLCJyZWFkT25seSIsInRyYW5zaXRpb25UbyIsImVudHJ5Iiwib3B0aW9ucyIsImZyb21Db250ZXh0IiwiSXNDbG9zZWQiLCJBcHAiLCJiYXJzIiwidGJhciIsImRpc2FibGVUb29sIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImNscyIsImxhYmVsIiwiZW5hYmxlZCIsImxheW91dEFjdGlvbiIsInNlbGVjdGlvbiIsIndhcmVob3VzZURpc2NvdmVyeSIsImhhc1Byb3BlcnR5IiwiYWN0aW9uIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwic3ZnIiwiYXBwIiwiZ2V0Vmlld1NlY3VyaXR5IiwicHJlTmF2aWdhdGVUb0luc2VydCIsImNvbnRleHQiLCJRdW90ZSIsIm5hdmlnYXRlVG9JbnNlcnRWaWV3IiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwiYXNzaWduV2FyZWhvdXNlQWN0aW9uIiwidGhlQWN0aW9uIiwicXVvdGUiLCJxdW90ZUl0ZW1LZXkiLCJ0YWciLCJhdHRyaWJ1dGVzIiwidmFsdWUiLCJxdW90ZUl0ZW0iLCJlbnRyaWVzIiwidmlldyIsImdldEF2YWlsYWJpbGl0eVZpZXciLCJyZWZyZXNoUmVxdWlyZWQiLCJzaG93Iiwidmlld0lkIiwiZ2V0VmlldyIsInJlZ2lzdGVyVmlldyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBLE1BQU1BLFdBQVcsb0JBQVksZ0JBQVosQ0FBakIsQyxDQTNCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLE1BQU1DLFVBQVUsdUJBQVEsNENBQVIsRUFBc0QsMkVBQXRELEVBQXVHO0FBQ3JIQywrQkFEcUg7QUFFckhDLDJCQUZxSDtBQUdySDtBQUNBQyxlQUFXSixTQUFTSSxTQUppRztBQUtySEMsY0FBVUwsU0FBU0ssUUFMa0c7QUFNckhDLGtCQUFjTixTQUFTTSxZQU44RjtBQU9ySEMsZUFBV1AsU0FBU08sU0FQaUc7QUFRckhDLHVCQUFtQlIsU0FBU1EsaUJBUnlGO0FBU3JIQywyQkFBdUJULFNBQVNTLHFCQVRxRjtBQVVySEMsb0JBQWdCVixTQUFTVSxjQVY0RjtBQVdySEMsZ0JBQVlYLFNBQVNXLFVBWGdHO0FBWXJIQyxxQkFBaUJaLFNBQVNZLGVBWjJGO0FBYXJIQyxxQkFBaUJiLFNBQVNhLGVBYjJGO0FBY3JIQyxrQ0FBOEJkLFNBQVNjLDRCQWQ4RTtBQWVySEMseUJBQXFCZixTQUFTZSxtQkFmdUY7QUFnQnJIQyx5QkFBcUJoQixTQUFTaUIsa0JBaEJ1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T0FBSixDQUFZRCxNQUFaLENBQVg7QUFDQSxVQUFJSixJQUFKLEVBQVU7QUFDUixlQUFPQSxJQUFQO0FBQ0Q7O0FBRUR2QyxVQUFJNkMsWUFBSixDQUFpQix3Q0FBOEIsRUFBRS9ELElBQUk2RCxNQUFOLEVBQTlCLENBQWpCO0FBQ0FKLGFBQU92QyxJQUFJNEMsT0FBSixDQUFZRCxNQUFaLENBQVA7QUFDQSxhQUFPSixJQUFQO0FBQ0Q7QUEvSW9ILEdBQXZHLENBQWhCOztBQWtKQSxpQkFBS08sU0FBTCxDQUFlLDZCQUFmLEVBQThDckYsT0FBOUM7b0JBQ2VBLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJ2NybS9BY3Rpb24nO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX01ldHJpY0xpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX01ldHJpY0xpc3RNaXhpbic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJy4uLy4uL1V0aWxpdHknO1xyXG5pbXBvcnQgUXVvdGVJdGVtQXZhaWxhYmlsaXR5TGlzdCBmcm9tICcuLi9Mb2NhdGlvbnMvUXVvdGVJdGVtQXZhaWxhYmlsaXR5TGlzdCc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdxdW90ZUl0ZW1zTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlF1b3RlTGluZXMuTGlzdCcsIFtMaXN0LCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4sIF9NZXRyaWNMaXN0TWl4aW5dLCB7XHJcbiAgZm9ybWF0dGVyOiBmb3JtYXQsXHJcbiAgdXRpbDogdXRpbGl0eSxcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBsaW5lVGV4dDogcmVzb3VyY2UubGluZVRleHQsXHJcbiAgcXVhbnRpdHlUZXh0OiByZXNvdXJjZS5xdWFudGl0eVRleHQsXHJcbiAgcHJpY2VUZXh0OiByZXNvdXJjZS5wcmljZVRleHQsXHJcbiAgYWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmFkanVzdGVkUHJpY2VUZXh0LFxyXG4gIGJhc2VBZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UuYmFzZUFkanVzdGVkUHJpY2VUZXh0LFxyXG4gIGJhc2VBbW91bnRUZXh0OiByZXNvdXJjZS5iYXNlQW1vdW50VGV4dCxcclxuICBhbW91bnRUZXh0OiByZXNvdXJjZS5hbW91bnRUZXh0LFxyXG4gIHByb2R1Y3ROYW1lVGV4dDogcmVzb3VyY2UucHJvZHVjdE5hbWVUZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuZGVzY3JpcHRpb25UZXh0LFxyXG4gIGFjY291bnRpbmdFbnRpdHlSZXF1aXJlZFRleHQ6IHJlc291cmNlLmFjY291bnRpbmdFbnRpdHlSZXF1aXJlZFRleHQsXHJcbiAgYXNzaWduV2FyZWhvdXNlVGV4dDogcmVzb3VyY2UuYXNzaWduV2FyZWhvdXNlVGV4dCxcclxuICB3YXJlaG91c2VzVGl0bGVUZXh0OiByZXNvdXJjZS53YXJlaG91c2VUaXRsZVRleHQsXHJcbiAgd2FyZWhvdXNlVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlVGV4dCxcclxuICB0b3RhbEFtb3VudFRleHQ6IHJlc291cmNlLnRvdGFsQW1vdW50VGV4dCxcclxuXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkLkVycExpbmVOdW1iZXIpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmxpbmVUZXh0ICV9PC9sYWJlbD4geyU6ICQuRXJwTGluZU51bWJlciAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slIGlmICgkLlNseExvY2F0aW9uKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC53YXJlaG91c2VUZXh0ICV9PC9sYWJlbD4geyU6ICQuU2x4TG9jYXRpb24uRGVzY3JpcHRpb24gJX08L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5wcm9kdWN0TmFtZVRleHQgJX08L2xhYmVsPiB7JTogJC5Qcm9kdWN0TmFtZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmRlc2NyaXB0aW9uVGV4dCAlfTwvbGFiZWw+IHslOiAkLkRlc2NyaXB0aW9uICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+IDxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnByaWNlVGV4dCAlfSA8L2xhYmVsPicsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLlByaWNlLCAkLlF1b3RlLkJhc2VDdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYWRqdXN0ZWRQcmljZVRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5Eb2NDYWxjdWxhdGVkUHJpY2UsICQuUXVvdGUuQ3VycmVuY3lDb2RlKSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+IDxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmJhc2VBZGp1c3RlZFByaWNlVGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLkNhbGN1bGF0ZWRQcmljZSwgJC5RdW90ZS5CYXNlQ3VycmVuY3lDb2RlKSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQucXVhbnRpdHlUZXh0ICV9PC9sYWJlbD4geyU6ICQuUXVhbnRpdHkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYmFzZUFtb3VudFRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5FeHRlbmRlZFByaWNlLCAkLlF1b3RlLkJhc2VDdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4gPGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYW1vdW50VGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLkRvY0V4dGVuZGVkUHJpY2UsICQuUXVvdGUuQ3VycmVuY3lDb2RlKSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+IDxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnRvdGFsQW1vdW50VGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLkRvY1RvdGFsQW1vdW50LCAkLlF1b3RlLkN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG5cclxuICBdKSxcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3F1b3RlX2xpbmVzX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICdxdW90ZV9saW5lX2RldGFpbCcsXHJcbiAgaW5zZXJ0VmlldzogJ3F1b3RlX2xpbmVfZWRpdCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5RVU9URUlURU0sXHJcbiAgcmVzb3VyY2VLaW5kOiAncXVvdGVJdGVtcycsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL1F1b3RlL1ZpZXcnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvUXVvdGUvQWRkJyxcclxuXHJcbiAgLy8gQ2FyZCBsYXlvdXRcclxuICBpdGVtSWNvbkNsYXNzOiAnYnVsbGV0LWxpc3QnLFxyXG5cclxuICAvLyBNZXRyaWNzXHJcbiAgZW50aXR5TmFtZTogJ1F1b3RlSXRlbScsXHJcblxyXG4gIHJlYWRPbmx5OiBmYWxzZSxcclxuXHJcbiAgdHJhbnNpdGlvblRvOiBmdW5jdGlvbiB0cmFuc2l0aW9uVG8oKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQgJiYgdGhpcy5vcHRpb25zLmZyb21Db250ZXh0LmVudHJ5O1xyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LklzQ2xvc2VkKSB7XHJcbiAgICAgIGlmIChBcHAuYmFycyAmJiBBcHAuYmFycy50YmFyKSB7XHJcbiAgICAgICAgQXBwLmJhcnMudGJhci5kaXNhYmxlVG9vbCgnbmV3Jyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZWFkT25seSA9IGVudHJ5LklzQ2xvc2VkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbmhlcml0ZWQodHJhbnNpdGlvblRvLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgY3JlYXRlQWN0aW9uTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25MYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zIHx8ICh0aGlzLmFjdGlvbnMgPSBbe1xyXG4gICAgICBpZDogJ2Fzc2lnbldhcmVob3VzZScsXHJcbiAgICAgIGNsczogJ3dhcmVob3VzZScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFzc2lnbldhcmVob3VzZVRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IChsYXlvdXRBY3Rpb24sIHNlbGVjdGlvbikgPT4ge1xyXG4gICAgICAgIHJldHVybiBBcHAud2FyZWhvdXNlRGlzY292ZXJ5ID09PSAnYXV0bycgJiZcclxuICAgICAgICAgIGFjdGlvbi5oYXNQcm9wZXJ0eShsYXlvdXRBY3Rpb24sIHNlbGVjdGlvbiwgJ1F1b3RlLkVycExvZ2ljYWxJZCcpO1xyXG4gICAgICB9LFxyXG4gICAgICBhY3Rpb246ICdhc3NpZ25XYXJlaG91c2VBY3Rpb24nLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbe1xyXG4gICAgICAgIGlkOiAnbmV3JyxcclxuICAgICAgICBzdmc6ICdhZGQnLFxyXG4gICAgICAgIGFjdGlvbjogJ3ByZU5hdmlnYXRlVG9JbnNlcnQnLFxyXG4gICAgICAgIHNlY3VyaXR5OiB0aGlzLmFwcC5nZXRWaWV3U2VjdXJpdHkodGhpcy5pbnNlcnRWaWV3LCAnaW5zZXJ0JyksXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBwcmVOYXZpZ2F0ZVRvSW5zZXJ0OiBmdW5jdGlvbiBwcmVOYXZpZ2F0ZVRvSW5zZXJ0KCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7fTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZyb21Db250ZXh0ICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dC5lbnRyeSkge1xyXG4gICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgIFF1b3RlOiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuZW50cnksXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHRoaXMubmF2aWdhdGVUb0luc2VydFZpZXcob3B0aW9ucyk7XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGAodXBwZXIoRGVzY3JpcHRpb24pIGxpa2UgXCIke3F9JVwiKSBvciAodXBwZXIoUHJvZHVjdE5hbWUpIGxpa2UgXCIke3F9JVwiKSBvciAodXBwZXIoUXVvdGUuUXVvdGVOdW1iZXIpIGxpa2UgXCIke3F9JVwiKSBvciAodXBwZXIoRXJwTGluZU51bWJlcikgbGlrZSBcIiR7cX0lXCIpYDtcclxuICB9LFxyXG4gIGFzc2lnbldhcmVob3VzZUFjdGlvbjogZnVuY3Rpb24gYXNzaWduV2FyZWhvdXNlQWN0aW9uKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBxdW90ZSA9IHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dC5lbnRyeTtcclxuICAgIGNvbnN0IHF1b3RlSXRlbUtleSA9IHNlbGVjdGlvbi50YWcuYXR0cmlidXRlc1snZGF0YS1rZXknXS52YWx1ZTtcclxuICAgIGNvbnN0IHF1b3RlSXRlbSA9IHRoaXMuZW50cmllc1txdW90ZUl0ZW1LZXldO1xyXG4gICAgaWYgKHF1b3RlSXRlbSkge1xyXG4gICAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRBdmFpbGFiaWxpdHlWaWV3KCk7XHJcbiAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIHF1b3RlSXRlbSxcclxuICAgICAgICAgIHF1b3RlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0QXZhaWxhYmlsaXR5VmlldzogZnVuY3Rpb24gZ2V0QXZhaWxhYmlsaXR5VmlldygpIHtcclxuICAgIGNvbnN0IHZpZXdJZCA9ICdsb2NhdGlvbnNfcXVvdGVJdGVtQXZhaWxhYmlsaXR5TGlzdCc7XHJcbiAgICBsZXQgdmlldyA9IEFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuXHJcbiAgICBBcHAucmVnaXN0ZXJWaWV3KG5ldyBRdW90ZUl0ZW1BdmFpbGFiaWxpdHlMaXN0KHsgaWQ6IHZpZXdJZCB9KSk7XHJcbiAgICB2aWV3ID0gQXBwLmdldFZpZXcodmlld0lkKTtcclxuICAgIHJldHVybiB2aWV3O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLlF1b3RlTGluZXMuTGlzdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=