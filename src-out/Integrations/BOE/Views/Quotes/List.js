define('crm/Integrations/BOE/Views/Quotes/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Action', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/Models/Types', 'argos/I18n', '../../Utility'], function (module, exports, _declare, _lang, _List, _Action, _Format, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _Types, _I18n, _Utility) {
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

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _Types2 = _interopRequireDefault(_Types);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Utility2 = _interopRequireDefault(_Utility);

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

  var resource = (0, _I18n2.default)('quotesList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Quotes.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    formatter: _Format2.default,
    util: _Utility2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text"><label class="group-label">{%: $$.quoteNumberText %}</label> {%: $.QuoteNumber %}</p>', '{% if ($.Account && $.Account.AccountName) { %}', '<p class="micro-text"><label class="group-label">{%: $$.accountText %}</label> {%: $.Account.AccountName %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.createDateText %}</label> {%: $$.formatter.date($.CreateDate) %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.grandTotalLabelText %} </label>', '{%: $$.util.formatMultiCurrency($.DocGrandTotal, $.CurrencyCode) %}', '</p>', '{% if ($.ErpExtId) { %}', '<p class="micro-text"><label class="group-label">{%: $$.erpStatusLabelText %}</label> {%: $$.formatErpStatus($.ErpStatus) %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.DocumentDate) %}</p>', '{% } else { %}', '<p class="micro-text"><label class="group-label">{%: $$.statusLabelText %}</label> {%: $.Status %}</p>', '{% } %}']),

    // Localization
    titleText: resource.titleText,
    quoteNumberText: resource.quoteNumberText,
    versionText: resource.versionText,
    accountText: resource.accountText,
    createDateText: resource.createDateText,
    grandTotalLabelText: resource.grandTotalLabelText,
    viewAccountActionText: resource.viewAccountActionText,
    addLineItemsText: resource.addLineItemsText,
    statusLabelText: resource.statusLabelText,
    erpStatusLabelText: resource.erpStatusLabelText,
    documentDateText: resource.documentDateText,
    quoteClosedText: resource.quoteClosedText,

    // View Properties
    id: 'quote_list',
    detailView: 'quote_detail',
    insertView: 'quote_edit',
    modelName: _Names2.default.QUOTE,
    resourceKind: 'quotes',
    expose: true,
    allowSelection: true,
    enableActions: true,
    security: 'Entities/Quote/View',
    insertSecurity: 'Entities/Quote/Add',

    // Card layout
    itemIconClass: 'document2',

    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,

    // Metrics
    entityName: 'Quote',

    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'Account.AccountName'
        })
      }, {
        id: 'addQuoteItem',
        cls: 'bullet-list',
        label: this.addLineItemsText,
        fn: this.onAddLineItems,
        security: 'Entities/Quote/Add'
      }]);
    },
    onAddLineItems: function onAddLineItems(evt, selection) {
      var _this = this;

      var key = selection && selection.data && selection.data.$key;
      if (key) {
        var quoteModel = App.ModelManager.getModel(_Names2.default.QUOTE, _Types2.default.SDATA);
        var isClosedPromise = quoteModel.isClosed(key);
        isClosedPromise.then(function (isClosed) {
          if (isClosed) {
            App.modal.createSimpleAlert({
              title: 'alert',
              content: _this.quoteClosedText
            });
            return;
          }
          _this.navigateToLineItems(evt, selection);
        });
      }
    },
    navigateToLineItems: function navigateToLineItems(evt, selection) {
      var view = App.getView('quote_line_edit');
      if (view) {
        var options = {
          insert: true,
          context: {
            Quote: selection.data
          }
        };
        view.show(options);
      }
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(QuoteNumber) like "' + q + '%" or Account.AccountName like "' + q + '%" or ErpExtId like "' + q + '%"';
    },
    formatErpStatus: function formatErpStatus(value) {
      var text = App.picklistService.getPicklistItemTextByCode('ErpQuoteStatus', value);
      if (text) {
        return text;
      }
      return value;
    }
  });

  _lang2.default.setObject('icboe.Views.Quotes.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3Rlcy9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImZvcm1hdHRlciIsInV0aWwiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsInF1b3RlTnVtYmVyVGV4dCIsInZlcnNpb25UZXh0IiwiYWNjb3VudFRleHQiLCJjcmVhdGVEYXRlVGV4dCIsImdyYW5kVG90YWxMYWJlbFRleHQiLCJ2aWV3QWNjb3VudEFjdGlvblRleHQiLCJhZGRMaW5lSXRlbXNUZXh0Iiwic3RhdHVzTGFiZWxUZXh0IiwiZXJwU3RhdHVzTGFiZWxUZXh0IiwiZG9jdW1lbnREYXRlVGV4dCIsInF1b3RlQ2xvc2VkVGV4dCIsImlkIiwiZGV0YWlsVmlldyIsImluc2VydFZpZXciLCJtb2RlbE5hbWUiLCJRVU9URSIsInJlc291cmNlS2luZCIsImV4cG9zZSIsImFsbG93U2VsZWN0aW9uIiwiZW5hYmxlQWN0aW9ucyIsInNlY3VyaXR5IiwiaW5zZXJ0U2VjdXJpdHkiLCJpdGVtSWNvbkNsYXNzIiwiZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0IiwiZ3JvdXBzRW5hYmxlZCIsImVudGl0eU5hbWUiLCJjcmVhdGVBY3Rpb25MYXlvdXQiLCJhY3Rpb25zIiwibGFiZWwiLCJlbmFibGVkIiwiaGFzUHJvcGVydHkiLCJiaW5kRGVsZWdhdGUiLCJmbiIsIm5hdmlnYXRlVG9FbnRpdHkiLCJ2aWV3Iiwia2V5UHJvcGVydHkiLCJ0ZXh0UHJvcGVydHkiLCJjbHMiLCJvbkFkZExpbmVJdGVtcyIsImV2dCIsInNlbGVjdGlvbiIsImtleSIsImRhdGEiLCIka2V5IiwicXVvdGVNb2RlbCIsIkFwcCIsIk1vZGVsTWFuYWdlciIsImdldE1vZGVsIiwiU0RBVEEiLCJpc0Nsb3NlZFByb21pc2UiLCJpc0Nsb3NlZCIsInRoZW4iLCJtb2RhbCIsImNyZWF0ZVNpbXBsZUFsZXJ0IiwidGl0bGUiLCJjb250ZW50IiwibmF2aWdhdGVUb0xpbmVJdGVtcyIsImdldFZpZXciLCJvcHRpb25zIiwiaW5zZXJ0IiwiY29udGV4dCIsIlF1b3RlIiwic2hvdyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsImZvcm1hdEVycFN0YXR1cyIsInZhbHVlIiwidGV4dCIsInBpY2tsaXN0U2VydmljZSIsImdldFBpY2tsaXN0SXRlbVRleHRCeUNvZGUiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNQSxXQUFXLG9CQUFZLFlBQVosQ0FBakI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSx3Q0FBUixFQUFrRCxxR0FBbEQsRUFBb0g7QUFDbElDLCtCQURrSTtBQUVsSUMsMkJBRmtJO0FBR2xJO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6Qiw2R0FEeUIsRUFFekIsaURBRnlCLEVBR3pCLGlIQUh5QixFQUl6QixTQUp5QixFQUt6Qiw4SEFMeUIsRUFNekIseUZBTnlCLEVBT3pCLHFFQVB5QixFQVF6QixNQVJ5QixFQVN6Qix5QkFUeUIsRUFVekIsa0lBVnlCLEVBV3pCLGtJQVh5QixFQVl6QixnQkFaeUIsRUFhekIsd0dBYnlCLEVBY3pCLFNBZHlCLENBQWIsQ0FKb0g7O0FBcUJsSTtBQUNBQyxlQUFXTixTQUFTTSxTQXRCOEc7QUF1QmxJQyxxQkFBaUJQLFNBQVNPLGVBdkJ3RztBQXdCbElDLGlCQUFhUixTQUFTUSxXQXhCNEc7QUF5QmxJQyxpQkFBYVQsU0FBU1MsV0F6QjRHO0FBMEJsSUMsb0JBQWdCVixTQUFTVSxjQTFCeUc7QUEyQmxJQyx5QkFBcUJYLFNBQVNXLG1CQTNCb0c7QUE0QmxJQywyQkFBdUJaLFNBQVNZLHFCQTVCa0c7QUE2QmxJQyxzQkFBa0JiLFNBQVNhLGdCQTdCdUc7QUE4QmxJ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Q0FBbkMsd0NBQXVFQSxDQUF2RSw2QkFBZ0dBLENBQWhHO0FBQ0QsS0EzR2lJO0FBNEdsSUcscUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUJDLEtBQXpCLEVBQWdDO0FBQy9DLFVBQU1DLE9BQU96QixJQUFJMEIsZUFBSixDQUFvQkMseUJBQXBCLENBQThDLGdCQUE5QyxFQUFnRUgsS0FBaEUsQ0FBYjtBQUNBLFVBQUlDLElBQUosRUFBVTtBQUNSLGVBQU9BLElBQVA7QUFDRDtBQUNELGFBQU9ELEtBQVA7QUFDRDtBQWxIaUksR0FBcEgsQ0FBaEI7O0FBcUhBLGlCQUFLSSxTQUFMLENBQWUseUJBQWYsRUFBMEMvRSxPQUExQztvQkFDZUEsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBhY3Rpb24gZnJvbSAnY3JtL0FjdGlvbic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IF9Hcm91cExpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX0dyb3VwTGlzdE1peGluJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJy4uLy4uL1V0aWxpdHknO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncXVvdGVzTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlF1b3Rlcy5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX01ldHJpY0xpc3RNaXhpbiwgX0dyb3VwTGlzdE1peGluXSwge1xyXG4gIGZvcm1hdHRlcjogZm9ybWF0LFxyXG4gIHV0aWw6IHV0aWxpdHksXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnF1b3RlTnVtYmVyVGV4dCAlfTwvbGFiZWw+IHslOiAkLlF1b3RlTnVtYmVyICV9PC9wPicsXHJcbiAgICAneyUgaWYgKCQuQWNjb3VudCAmJiAkLkFjY291bnQuQWNjb3VudE5hbWUpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmFjY291bnRUZXh0ICV9PC9sYWJlbD4geyU6ICQuQWNjb3VudC5BY2NvdW50TmFtZSAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmNyZWF0ZURhdGVUZXh0ICV9PC9sYWJlbD4geyU6ICQkLmZvcm1hdHRlci5kYXRlKCQuQ3JlYXRlRGF0ZSkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5ncmFuZFRvdGFsTGFiZWxUZXh0ICV9IDwvbGFiZWw+JyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuRG9jR3JhbmRUb3RhbCwgJC5DdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICd7JSBpZiAoJC5FcnBFeHRJZCkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuZXJwU3RhdHVzTGFiZWxUZXh0ICV9PC9sYWJlbD4geyU6ICQkLmZvcm1hdEVycFN0YXR1cygkLkVycFN0YXR1cykgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5kb2N1bWVudERhdGVUZXh0ICV9PC9sYWJlbD4geyU6ICQkLmZvcm1hdHRlci5kYXRlKCQuRG9jdW1lbnREYXRlKSAlfTwvcD4nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5zdGF0dXNMYWJlbFRleHQgJX08L2xhYmVsPiB7JTogJC5TdGF0dXMgJX08L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgcXVvdGVOdW1iZXJUZXh0OiByZXNvdXJjZS5xdW90ZU51bWJlclRleHQsXHJcbiAgdmVyc2lvblRleHQ6IHJlc291cmNlLnZlcnNpb25UZXh0LFxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBjcmVhdGVEYXRlVGV4dDogcmVzb3VyY2UuY3JlYXRlRGF0ZVRleHQsXHJcbiAgZ3JhbmRUb3RhbExhYmVsVGV4dDogcmVzb3VyY2UuZ3JhbmRUb3RhbExhYmVsVGV4dCxcclxuICB2aWV3QWNjb3VudEFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdBY2NvdW50QWN0aW9uVGV4dCxcclxuICBhZGRMaW5lSXRlbXNUZXh0OiByZXNvdXJjZS5hZGRMaW5lSXRlbXNUZXh0LFxyXG4gIHN0YXR1c0xhYmVsVGV4dDogcmVzb3VyY2Uuc3RhdHVzTGFiZWxUZXh0LFxyXG4gIGVycFN0YXR1c0xhYmVsVGV4dDogcmVzb3VyY2UuZXJwU3RhdHVzTGFiZWxUZXh0LFxyXG4gIGRvY3VtZW50RGF0ZVRleHQ6IHJlc291cmNlLmRvY3VtZW50RGF0ZVRleHQsXHJcbiAgcXVvdGVDbG9zZWRUZXh0OiByZXNvdXJjZS5xdW90ZUNsb3NlZFRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAncXVvdGVfbGlzdCcsXHJcbiAgZGV0YWlsVmlldzogJ3F1b3RlX2RldGFpbCcsXHJcbiAgaW5zZXJ0VmlldzogJ3F1b3RlX2VkaXQnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuUVVPVEUsXHJcbiAgcmVzb3VyY2VLaW5kOiAncXVvdGVzJyxcclxuICBleHBvc2U6IHRydWUsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL1F1b3RlL1ZpZXcnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvUXVvdGUvQWRkJyxcclxuXHJcbiAgLy8gQ2FyZCBsYXlvdXRcclxuICBpdGVtSWNvbkNsYXNzOiAnZG9jdW1lbnQyJyxcclxuXHJcbiAgLy8gR3JvdXBzXHJcbiAgZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0OiB0cnVlLFxyXG4gIGdyb3Vwc0VuYWJsZWQ6IHRydWUsXHJcblxyXG4gIC8vIE1ldHJpY3NcclxuICBlbnRpdHlOYW1lOiAnUXVvdGUnLFxyXG5cclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAndmlld0FjY291bnQnLFxyXG4gICAgICBsYWJlbDogdGhpcy52aWV3QWNjb3VudEFjdGlvblRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGFjdGlvbi5oYXNQcm9wZXJ0eS5iaW5kRGVsZWdhdGUodGhpcywgJ0FjY291bnQuJGtleScpLFxyXG4gICAgICBmbjogYWN0aW9uLm5hdmlnYXRlVG9FbnRpdHkuYmluZERlbGVnYXRlKHRoaXMsIHtcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9kZXRhaWwnLFxyXG4gICAgICAgIGtleVByb3BlcnR5OiAnQWNjb3VudC4ka2V5JyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdBY2NvdW50LkFjY291bnROYW1lJyxcclxuICAgICAgfSksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnYWRkUXVvdGVJdGVtJyxcclxuICAgICAgY2xzOiAnYnVsbGV0LWxpc3QnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRMaW5lSXRlbXNUZXh0LFxyXG4gICAgICBmbjogdGhpcy5vbkFkZExpbmVJdGVtcyxcclxuICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9BZGQnLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgb25BZGRMaW5lSXRlbXM6IGZ1bmN0aW9uIG9uQWRkTGluZUl0ZW1zKGV2dCwgc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBrZXkgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRhdGEgJiYgc2VsZWN0aW9uLmRhdGEuJGtleTtcclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgY29uc3QgcXVvdGVNb2RlbCA9IEFwcC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoTU9ERUxfTkFNRVMuUVVPVEUsIE1PREVMX1RZUEVTLlNEQVRBKTtcclxuICAgICAgY29uc3QgaXNDbG9zZWRQcm9taXNlID0gcXVvdGVNb2RlbC5pc0Nsb3NlZChrZXkpO1xyXG4gICAgICBpc0Nsb3NlZFByb21pc2UudGhlbigoaXNDbG9zZWQpID0+IHtcclxuICAgICAgICBpZiAoaXNDbG9zZWQpIHtcclxuICAgICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVBbGVydCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnYWxlcnQnLFxyXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnF1b3RlQ2xvc2VkVGV4dCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdmlnYXRlVG9MaW5lSXRlbXMoZXZ0LCBzZWxlY3Rpb24pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG5hdmlnYXRlVG9MaW5lSXRlbXM6IGZ1bmN0aW9uIG5hdmlnYXRlVG9MaW5lSXRlbXMoZXZ0LCBzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldygncXVvdGVfbGluZV9lZGl0Jyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICBRdW90ZTogc2VsZWN0aW9uLmRhdGEsXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoUXVvdGVOdW1iZXIpIGxpa2UgXCIke3F9JVwiIG9yIEFjY291bnQuQWNjb3VudE5hbWUgbGlrZSBcIiR7cX0lXCIgb3IgRXJwRXh0SWQgbGlrZSBcIiR7cX0lXCJgO1xyXG4gIH0sXHJcbiAgZm9ybWF0RXJwU3RhdHVzOiBmdW5jdGlvbiBmb3JtYXRFcnBTdGF0dXModmFsdWUpIHtcclxuICAgIGNvbnN0IHRleHQgPSBBcHAucGlja2xpc3RTZXJ2aWNlLmdldFBpY2tsaXN0SXRlbVRleHRCeUNvZGUoJ0VycFF1b3RlU3RhdHVzJywgdmFsdWUpO1xyXG4gICAgaWYgKHRleHQpIHtcclxuICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuUXVvdGVzLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19