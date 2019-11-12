define('crm/Integrations/BOE/Views/ERPInvoices/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Action', 'crm/Format', 'argos/List', 'crm/Views/_GroupListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_RightDrawerListMixin', '../../Models/Names', '../../Utility', 'argos/I18n'], function (module, exports, _declare, _lang, _Action, _Format, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _Names, _Utility, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _List2 = _interopRequireDefault(_List);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpInvoicesList');

  /**
   * @class crm.Integrations.BOE.Views.ERPInvoces.List
   *
   * @extends argos.List
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPInvoices.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], /** @lends crm.Integrations.BOE.Views.ERPInvoces.List# */{
    formatter: _Format2.default,
    util: _Utility2.default,
    // Templates
    itemTemplate: new Simplate(['{% if ($.Account && $.Account.AccountName) { %}', '<p class="listview-heading"><label class="group-label">{%: $$.accountText %}</label> {%: $.Account.AccountName %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.invoiceNumberText %}</label> {%: $.InvoiceNumber %}</p>', '{% } else { %}', '<p class="listview-heading"><label class="group-label">{%: $$.invoiceNumberText %}</label> {%: $.InvoiceNumber %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.statusText %}</label> {%: $.ErpStatus %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.statusDateText %}</label> {%: $$.formatStatusDate($) %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.termsText %}</label> {%: $.ErpPaymentTermId %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.ownerText %} </label>{%: $.Owner.OwnerDescription %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.extendedBaseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ErpExtendedBaseAmount, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.extendedAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ErpExtendedAmount, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.totalBaseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ErpTotalBaseAmount, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.totalAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.GrandTotal, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.totalAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.GrandTotal, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</p>']),

    // Localization
    titleText: resource.titleText,
    invoiceNumberText: resource.invoiceNumberText,
    accountText: resource.accountText,
    descriptionText: resource.descriptionText,
    statusText: resource.statusText,
    termsText: resource.termsText,
    statusDateText: resource.statusDateText,
    ownerText: resource.ownerText,
    totalAmountText: resource.totalAmountText,
    totalBaseAmountText: resource.totalBaseAmountText,
    extendedAmountText: resource.extendedAmountText,
    extendedBaseAmountText: resource.extendedBaseAmountText,
    unknownText: resource.unknownText,
    viewAccountActionText: resource.viewAccountActionText,
    documentDateText: resource.documentDateText,

    // View Properties
    id: 'invoice_list',
    detailView: 'invoice_detail',
    modelName: _Names2.default.ERPINVOICE,
    resourceKind: 'erpInvoices',
    allowSelection: true,
    enableActions: true,
    expose: true,
    security: 'Entities/ErpInvoice/View',
    insertSecurity: 'Entities/ErpInvoice/Add',

    // Card layout
    itemIconClass: 'document2',

    // Groups
    groupsEnabled: true,
    enableDynamicGroupLayout: true,
    entityName: 'ERPInvoice',

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
      }]);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Account.AccountName) like "' + q + '%" or upper(InvoiceNumber) like "' + q + '%"';
    },
    formatStatusDate: function formatStatusDate(entry) {
      return entry && entry.ErpStatusDate ? this.formatter.relativeDate(entry.ErpStatusDate) : this.unknownText;
    }
  });

  _lang2.default.setObject('crm.Views.ERPInvoices.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEludm9pY2VzL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiZm9ybWF0dGVyIiwidXRpbCIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwiaW52b2ljZU51bWJlclRleHQiLCJhY2NvdW50VGV4dCIsImRlc2NyaXB0aW9uVGV4dCIsInN0YXR1c1RleHQiLCJ0ZXJtc1RleHQiLCJzdGF0dXNEYXRlVGV4dCIsIm93bmVyVGV4dCIsInRvdGFsQW1vdW50VGV4dCIsInRvdGFsQmFzZUFtb3VudFRleHQiLCJleHRlbmRlZEFtb3VudFRleHQiLCJleHRlbmRlZEJhc2VBbW91bnRUZXh0IiwidW5rbm93blRleHQiLCJ2aWV3QWNjb3VudEFjdGlvblRleHQiLCJkb2N1bWVudERhdGVUZXh0IiwiaWQiLCJkZXRhaWxWaWV3IiwibW9kZWxOYW1lIiwiRVJQSU5WT0lDRSIsInJlc291cmNlS2luZCIsImFsbG93U2VsZWN0aW9uIiwiZW5hYmxlQWN0aW9ucyIsImV4cG9zZSIsInNlY3VyaXR5IiwiaW5zZXJ0U2VjdXJpdHkiLCJpdGVtSWNvbkNsYXNzIiwiZ3JvdXBzRW5hYmxlZCIsImVuYWJsZUR5bmFtaWNHcm91cExheW91dCIsImVudGl0eU5hbWUiLCJjcmVhdGVBY3Rpb25MYXlvdXQiLCJhY3Rpb25zIiwibGFiZWwiLCJlbmFibGVkIiwiaGFzUHJvcGVydHkiLCJiaW5kRGVsZWdhdGUiLCJmbiIsIm5hdmlnYXRlVG9FbnRpdHkiLCJ2aWV3Iiwia2V5UHJvcGVydHkiLCJ0ZXh0UHJvcGVydHkiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJmb3JtYXRTdGF0dXNEYXRlIiwiZW50cnkiLCJFcnBTdGF0dXNEYXRlIiwicmVsYXRpdmVEYXRlIiwic2V0T2Jq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O0FBQ0EsbURBQTJDRixDQUEzQyx5Q0FBZ0ZBLENBQWhGO0FBQ0QsS0FwRmdNO0FBcUZqTUcsc0JBQWtCLFNBQVNBLGdCQUFULENBQTBCQyxLQUExQixFQUFpQztBQUNqRCxhQUFRQSxTQUFTQSxNQUFNQyxhQUFoQixHQUFpQyxLQUFLbkQsU0FBTCxDQUFlb0QsWUFBZixDQUE0QkYsTUFBTUMsYUFBbEMsQ0FBakMsR0FBb0YsS0FBS25DLFdBQWhHO0FBQ0Q7QUF2RmdNLEdBQW5MLENBQWhCOztBQTBGQSxpQkFBS3FDLFNBQUwsQ0FBZSw0QkFBZixFQUE2Q3RELE9BQTdDO29CQUNlQSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJ2NybS9BY3Rpb24nO1xyXG5pbXBvcnQgY3JtRm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IF9Hcm91cExpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX0dyb3VwTGlzdE1peGluJztcclxuaW1wb3J0IF9NZXRyaWNMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEludm9pY2VzTGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBJbnZvY2VzLkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUEludm9pY2VzLkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluLCBfR3JvdXBMaXN0TWl4aW5dLCAvKiogQGxlbmRzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUEludm9jZXMuTGlzdCMgKi8ge1xyXG4gIGZvcm1hdHRlcjogY3JtRm9ybWF0LFxyXG4gIHV0aWw6IHV0aWxpdHksXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkLkFjY291bnQgJiYgJC5BY2NvdW50LkFjY291bnROYW1lKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5hY2NvdW50VGV4dCAlfTwvbGFiZWw+IHslOiAkLkFjY291bnQuQWNjb3VudE5hbWUgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5pbnZvaWNlTnVtYmVyVGV4dCAlfTwvbGFiZWw+IHslOiAkLkludm9pY2VOdW1iZXIgJX08L3A+JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuaW52b2ljZU51bWJlclRleHQgJX08L2xhYmVsPiB7JTogJC5JbnZvaWNlTnVtYmVyICV9PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuc3RhdHVzVGV4dCAlfTwvbGFiZWw+IHslOiAkLkVycFN0YXR1cyAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnN0YXR1c0RhdGVUZXh0ICV9PC9sYWJlbD4geyU6ICQkLmZvcm1hdFN0YXR1c0RhdGUoJCkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC50ZXJtc1RleHQgJX08L2xhYmVsPiB7JTogJC5FcnBQYXltZW50VGVybUlkICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQub3duZXJUZXh0ICV9IDwvbGFiZWw+eyU6ICQuT3duZXIuT3duZXJEZXNjcmlwdGlvbiAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmV4dGVuZGVkQmFzZUFtb3VudFRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5FcnBFeHRlbmRlZEJhc2VBbW91bnQsICQuQmFzZUN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmV4dGVuZGVkQW1vdW50VGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLkVycEV4dGVuZGVkQW1vdW50LCAkLkN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnRvdGFsQmFzZUFtb3VudFRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5FcnBUb3RhbEJhc2VBbW91bnQsICQuQmFzZUN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnRvdGFsQW1vdW50VGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLkdyYW5kVG90YWwsICQuQ3VycmVuY3lDb2RlKSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQudG90YWxBbW91bnRUZXh0ICV9PC9sYWJlbD4gJyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuR3JhbmRUb3RhbCwgJC5DdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5kb2N1bWVudERhdGVUZXh0ICV9PC9sYWJlbD4geyU6ICQkLmZvcm1hdHRlci5kYXRlKCQuRXJwRG9jdW1lbnREYXRlKSAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBpbnZvaWNlTnVtYmVyVGV4dDogcmVzb3VyY2UuaW52b2ljZU51bWJlclRleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuZGVzY3JpcHRpb25UZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgdGVybXNUZXh0OiByZXNvdXJjZS50ZXJtc1RleHQsXHJcbiAgc3RhdHVzRGF0ZVRleHQ6IHJlc291cmNlLnN0YXR1c0RhdGVUZXh0LFxyXG4gIG93bmVyVGV4dDogcmVzb3VyY2Uub3duZXJUZXh0LFxyXG4gIHRvdGFsQW1vdW50VGV4dDogcmVzb3VyY2UudG90YWxBbW91bnRUZXh0LFxyXG4gIHRvdGFsQmFzZUFtb3VudFRleHQ6IHJlc291cmNlLnRvdGFsQmFzZUFtb3VudFRleHQsXHJcbiAgZXh0ZW5kZWRBbW91bnRUZXh0OiByZXNvdXJjZS5leHRlbmRlZEFtb3VudFRleHQsXHJcbiAgZXh0ZW5kZWRCYXNlQW1vdW50VGV4dDogcmVzb3VyY2UuZXh0ZW5kZWRCYXNlQW1vdW50VGV4dCxcclxuICB1bmtub3duVGV4dDogcmVzb3VyY2UudW5rbm93blRleHQsXHJcbiAgdmlld0FjY291bnRBY3Rpb25UZXh0OiByZXNvdXJjZS52aWV3QWNjb3VudEFjdGlvblRleHQsXHJcbiAgZG9jdW1lbnREYXRlVGV4dDogcmVzb3VyY2UuZG9jdW1lbnREYXRlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdpbnZvaWNlX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICdpbnZvaWNlX2RldGFpbCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBJTlZPSUNFLFxyXG4gIHJlc291cmNlS2luZDogJ2VycEludm9pY2VzJyxcclxuICBhbGxvd1NlbGVjdGlvbjogdHJ1ZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIGV4cG9zZTogdHJ1ZSxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0VycEludm9pY2UvVmlldycsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9FcnBJbnZvaWNlL0FkZCcsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJ2RvY3VtZW50MicsXHJcblxyXG4gIC8vIEdyb3Vwc1xyXG4gIGdyb3Vwc0VuYWJsZWQ6IHRydWUsXHJcbiAgZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0OiB0cnVlLFxyXG4gIGVudGl0eU5hbWU6ICdFUlBJbnZvaWNlJyxcclxuXHJcbiAgY3JlYXRlQWN0aW9uTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25MYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zIHx8ICh0aGlzLmFjdGlvbnMgPSBbe1xyXG4gICAgICBpZDogJ3ZpZXdBY2NvdW50JyxcclxuICAgICAgbGFiZWw6IHRoaXMudmlld0FjY291bnRBY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50LiRrZXknKSxcclxuICAgICAgZm46IGFjdGlvbi5uYXZpZ2F0ZVRvRW50aXR5LmJpbmREZWxlZ2F0ZSh0aGlzLCB7XHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfZGV0YWlsJyxcclxuICAgICAgICBrZXlQcm9wZXJ0eTogJ0FjY291bnQuJGtleScsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnQWNjb3VudC5BY2NvdW50TmFtZScsXHJcbiAgICAgIH0pLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoQWNjb3VudC5BY2NvdW50TmFtZSkgbGlrZSBcIiR7cX0lXCIgb3IgdXBwZXIoSW52b2ljZU51bWJlcikgbGlrZSBcIiR7cX0lXCJgO1xyXG4gIH0sXHJcbiAgZm9ybWF0U3RhdHVzRGF0ZTogZnVuY3Rpb24gZm9ybWF0U3RhdHVzRGF0ZShlbnRyeSkge1xyXG4gICAgcmV0dXJuIChlbnRyeSAmJiBlbnRyeS5FcnBTdGF0dXNEYXRlKSA/IHRoaXMuZm9ybWF0dGVyLnJlbGF0aXZlRGF0ZShlbnRyeS5FcnBTdGF0dXNEYXRlKSA6IHRoaXMudW5rbm93blRleHQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnY3JtLlZpZXdzLkVSUEludm9pY2VzLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19