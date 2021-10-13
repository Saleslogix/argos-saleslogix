define('crm/Views/Opportunity/List', ['module', 'exports', 'dojo/_base/declare', '../../Action', '../../Format', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_RightDrawerListMixin', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _Action, _Format, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _List2 = _interopRequireDefault(_List);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('opportunityList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Views.Opportunity.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    // Templates
    // TODO: Support ExchangeRateCode with proper symbol
    itemTemplate: new Simplate(['{% if ($.Account) { %}', '<p class="micro-text">', '{%: $.Account.AccountName %}', '</p>', '<p class="micro-text">', '{% if ($.Account.AccountManager && $.Account.AccountManager.UserInfo) { %}', '{%: $.Account.AccountManager.UserInfo.UserName %}', '{% if ($.Account && $.Account.AccountManager.UserInfo.Region) { %}', ' | {%: $.Account.AccountManager.UserInfo.Region %}', '{% } %}', '{% } %}', '</p>', '{% } %}', '<p class="micro-text">', '{%: $.Status %}', '{% if ($.Stage) { %}', ' | {%: $.Stage %}', '{% } %}', '</p>', '{% if ($.SalesPotential) { %}', '<p class="micro-text"><strong>', '{% if (App.hasMultiCurrency()) { %}', '{%: crm.Format.multiCurrency($.SalesPotential * $.ExchangeRate, $.ExchangeRateCode) %}', '{% } else { %}', '{%: crm.Format.multiCurrency($.SalesPotential, App.getBaseExchangeRate().code) %}', '{% } %}', '</strong></p>', '{% } %}', '<p class="micro-text">{%: $$.formatDate($) %}</p>']),

    // Localization
    titleText: resource.titleText,
    activitiesText: resource.activitiesText,
    notesText: resource.notesText,
    scheduleText: resource.scheduleText,
    editActionText: resource.editActionText,
    viewAccountActionText: resource.viewAccountActionText,
    viewContactsActionText: resource.viewContactsActionText,
    viewProductsActionText: resource.viewProductsActionText,
    addNoteActionText: resource.addNoteActionText,
    addActivityActionText: resource.addActivityActionText,
    addAttachmentActionText: resource.addAttachmentActionText,
    actualCloseText: resource.actualCloseText,
    estimatedCloseText: resource.estimatedCloseText,
    quickEditActionText: resource.quickEditActionText,

    // View Properties
    id: 'opportunity_list',
    security: 'Entities/Opportunity/View',
    itemIconClass: 'finance',
    detailView: 'opportunity_detail',
    insertView: 'opportunity_edit',
    queryOrderBy: null,
    querySelect: [],
    modelName: _Names2.default.OPPORTUNITY,
    resourceKind: 'opportunities',
    entityName: 'Opportunity',
    groupsEnabled: true,
    allowSelection: true,
    enableActions: true,

    formatDate: function formatDate(entry) {
      if (entry.Status === 'Open' && entry.EstimatedClose) {
        return this.estimatedCloseText + _Format2.default.relativeDate(entry.EstimatedClose);
      } else if (entry.ActualClose) {
        return this.actualCloseText + _Format2.default.relativeDate(entry.ActualClose);
      }

      return '';
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'edit',
        cls: 'edit',
        label: this.editActionText,
        action: 'navigateToEditView',
        security: 'Entities/Opportunity/Edit'
      }, {
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'Account.AccountName'
        })
      }, {
        id: 'viewContacts',
        label: this.viewContactsActionText,
        fn: this.navigateToRelatedView.bindDelegate(this, 'opportunitycontact_related', 'Opportunity.Id eq "${0}"')
      }, {
        id: 'viewProducts',
        label: this.viewProductsActionText,
        fn: this.navigateToRelatedView.bindDelegate(this, 'opportunityproduct_related', 'Opportunity.Id eq "${0}"')
      }, {
        id: 'addNote',
        cls: 'edit',
        label: this.addNoteActionText,
        fn: _Action2.default.addNote.bindDelegate(this)
      }, {
        id: 'addActivity',
        cls: 'calendar',
        label: this.addActivityActionText,
        fn: _Action2.default.addActivity.bindDelegate(this)
      }, {
        id: 'addAttachment',
        cls: 'attach',
        label: this.addAttachmentActionText,
        fn: _Action2.default.addAttachment.bindDelegate(this)
      }, {
        id: 'quickEdit',
        cls: 'edit',
        label: this.quickEditActionText,
        editView: 'opportunity_quick_edit',
        action: 'navigateToQuickEdit',
        security: 'Entities/Opportunity/Edit'
      }]);
    },

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Description) like "' + q + '%" or Account.AccountNameUpper like "' + q + '%")';
    },
    groupFieldFormatter: {
      CloseProbability: {
        name: 'CloseProbability',
        formatter: function formatter(value) {
          return _Format2.default.fixedLocale(value, 0) + '%';
        }
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});