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