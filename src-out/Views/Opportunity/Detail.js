define('crm/Views/Opportunity/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', 'argos/Detail', '../../Format', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _string, _Detail, _Format, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Format2 = _interopRequireDefault(_Format);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('opportunityDetail');
  var dtFormatResource = (0, _I18n2.default)('opportunityDetailDateTimeFormat');

  var __class = (0, _declare2.default)('crm.Views.Opportunity.Detail', [_Detail2.default], {
    // Localization
    accountText: resource.accountText,
    acctMgrText: resource.acctMgrText,
    estCloseText: resource.estCloseText,
    detailsText: resource.detailsText,
    fbarHomeTitleText: resource.fbarHomeTitleText,
    fbarScheduleTitleText: resource.fbarScheduleTitleText,
    importSourceText: resource.importSourceText,
    opportunityText: resource.opportunityText,
    ownerText: resource.ownerText,
    actionsText: resource.actionsText,
    potentialText: resource.potentialText,
    potentialBaseText: resource.potentialBaseText,
    potentialOpportunityText: resource.potentialOpportunityText,
    potentialMyRateText: resource.potentialMyRateText,
    probabilityText: resource.probabilityText,
    relatedActivitiesText: resource.relatedActivitiesText,
    relatedContactsText: resource.relatedContactsText,
    relatedHistoriesText: resource.relatedHistoriesText,
    relatedItemsText: resource.relatedItemsText,
    relatedNotesText: resource.relatedNotesText,
    relatedProductsText: resource.relatedProductsText,
    relatedAttachmentText: resource.relatedAttachmentText,
    relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
    resellerText: resource.resellerText,
    statusText: resource.statusText,
    titleText: resource.titleText,
    typeText: resource.typeText,
    scheduleActivityText: resource.scheduleActivityText,
    addNoteText: resource.addNoteText,
    multiCurrencyText: resource.multiCurrencyText,
    multiCurrencyRateText: resource.multiCurrencyRateText,
    multiCurrencyCodeText: resource.multiCurrencyCodeText,
    multiCurrencyDateText: resource.multiCurrencyDateText,
    multiCurrencyLockedText: resource.multiCurrencyLockedText,
    exchangeRateDateFormatText: dtFormatResource.exchangeRateDateFormatText,
    exchangeRateDateFormatText24: dtFormatResource.exchangeRateDateFormatText24,
    entityText: resource.entityText,

    // View Properties
    id: 'opportunity_detail',
    editView: 'opportunity_edit',
    noteEditView: 'history_edit',
    enableOffline: true,
    resourceKind: 'opportunities',
    modelName: _Names2.default.OPPORTUNITY,

    scheduleActivity: function scheduleActivity() {
      App.navigateToActivityInsertView();
    },
    addNote: function addNote() {
      var view = App.getView(this.noteEditView);
      if (view) {
        view.show({
          template: {},
          insert: true
        });
      }
    },
    processEntry: function processEntry() {
      this.inherited(processEntry, arguments);

      if (App.hasMultiCurrency() && this.options && this.entry && this.entry.ExchangeRate) {
        this.options.ExchangeRate = this.entry.ExchangeRate;
        this.options.ExchangeRateCode = this.entry.ExchangeRateCode;
      }
    },
    getValues: function getValues() {
      var estimatedCloseDate = this.fields.EstimatedClose.getValue();
      var timelessStartDate = estimatedCloseDate.clone().clearTime().add({
        minutes: -1 * estimatedCloseDate.getTimezoneOffset(),
        seconds: 5
      });
      var values = this.inherited(getValues, arguments);

      values = values || {};
      values.EstimatedClose = timelessStartDate;

      return values;
    },
    formatAccountRelatedQuery: function formatAccountRelatedQuery(fmt) {
      return _string2.default.substitute(fmt, [this.entry.Account.$key]);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },
    createLayout: function createLayout() {
      var quickActions = {
        list: true,
        title: this.actionsText,
        cls: 'action-list',
        name: 'QuickActionsSection',
        children: [{
          name: 'ScheduleActivityAction',
          property: 'Description',
          label: this.scheduleActivityText,
          iconClass: 'calendar',
          action: 'scheduleActivity'
        }, {
          name: 'AddNoteAction',
          property: 'Description',
          label: this.addNoteText,
          iconClass: 'quick-edit',
          action: 'addNote'
        }]
      };

      var multiCurrency = {
        title: this.multiCurrencyText,
        name: 'MultiCurrencySection',
        children: [{
          label: this.multiCurrencyRateText,
          name: 'ExchangeRate',
          property: 'ExchangeRate'
        }, {
          label: this.multiCurrencyCodeText,
          name: 'ExchangeRateCode',
          property: 'ExchangeRateCode'
        }, {
          label: this.multiCurrencyDateText,
          name: 'ExchangeRateDate',
          property: 'ExchangeRateDate',
          renderer: _Format2.default.date.bindDelegate(this, App.is24HourClock() ? this.exchangeRateDateFormatText24 : this.exchangeRateDateFormatText, false)
        }, {
          label: this.multiCurrencyLockedText,
          name: 'ExchangeRateLocked',
          property: 'ExchangeRateLocked'
        }]
      };
      var details = {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.opportunityText,
          name: 'Description',
          property: 'Description'
        }, {
          label: this.accountText,
          key: 'Account.$key',
          name: 'Account.AccountName',
          property: 'Account.AccountName',
          view: 'account_detail'
        }, {
          label: this.statusText,
          name: 'Status',
          property: 'Status',
          renderer: this.formatPicklist('Status')
        }, {
          label: App.hasMultiCurrency() ? this.potentialBaseText : this.potentialText,
          name: 'SalesPotential',
          property: 'SalesPotential',
          renderer: function renderSalesPotential(val) {
            if (App.hasMultiCurrency()) {
              var exhangeRate = App.getBaseExchangeRate();
              var convertedValue = val * exhangeRate.rate;
              return _Format2.default.multiCurrency.call(null, convertedValue, exhangeRate.code);
            }
            return _Format2.default.currency.call(null, val);
          }.bindDelegate(this)
        }, {
          label: this.estCloseText,
          name: 'EstimatedClose',
          property: 'EstimatedClose',
          renderer: _Format2.default.date.bindDelegate(this, null, true)
        }, {
          label: this.typeText,
          name: 'Type',
          property: 'Type',
          renderer: this.formatPicklist('Type')
        }, {
          label: this.resellerText,
          key: 'Reseller.$key',
          name: 'Reseller.AccountName',
          property: 'Reseller.AccountName',
          view: 'account_detail'
        }, {
          label: this.probabilityText,
          name: 'CloseProbability',
          property: 'CloseProbability',
          renderer: this.formatPicklist('CloseProbability')
        }, {
          label: this.acctMgrText,
          name: 'AccountManager.UserInfo',
          property: 'AccountManager.UserInfo',
          renderer: _Format2.default.nameLF
        }, {
          label: this.importSourceText,
          name: 'LeadSource.Description',
          property: 'LeadSource.Description'
        }]
      };

      var relatedItems = {
        list: true,
        title: this.relatedItemsText,
        name: 'RelatedItemsSection',
        children: [{
          name: 'OpportunityRelated',
          label: this.relatedProductsText,
          view: 'opportunityproduct_related',
          where: this.formatRelatedQuery.bindDelegate(this, 'Opportunity.Id eq "${0}"')
        }, {
          name: 'ActivityRelated',
          label: this.relatedActivitiesText,
          view: 'activity_related',
          where: this.formatRelatedQuery.bindDelegate(this, 'OpportunityId eq "${0}"')
        }, {
          name: 'ContactRelated',
          label: this.relatedContactsText,
          options: {
            prefilter: this.formatAccountRelatedQuery.bindDelegate(this, 'Account.Id eq "${0}"')
          },
          view: 'opportunitycontact_related',
          where: this.formatRelatedQuery.bindDelegate(this, 'Opportunity.Id eq "${0}"')
        }, {
          name: 'HistoryRelated',
          label: this.relatedHistoriesText,
          where: this.formatRelatedQuery.bindDelegate(this, 'OpportunityId eq "${0}" and Type ne "atDatabaseChange"'),
          view: 'history_related'
        }, {
          name: 'AttachmentRelated',
          label: this.relatedAttachmentText,
          where: this.formatRelatedQuery.bindDelegate(this, 'opportunityId eq "${0}"'), // must be lower case because of feed
          view: 'opportunity_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      };

      var layout = this.layout || (this.layout = []);

      if (layout.length > 0) {
        return layout;
      }

      layout.push(quickActions);
      layout.push(details);

      if (App.hasMultiCurrency()) {
        details.children.splice(4, 0, {
          label: this.potentialMyRateText,
          name: 'SalesPotentialMine',
          property: 'SalesPotential',
          renderer: function renderMySalesPotential(val) {
            if (App.hasMultiCurrency()) {
              var exhangeRate = App.getMyExchangeRate();
              var convertedValue = val * exhangeRate.rate;
              return _Format2.default.multiCurrency.call(null, convertedValue, exhangeRate.code);
            }

            return '-';
          }.bindDelegate(this)
        }, {
          label: this.potentialOpportunityText,
          name: 'SalesPotentialOpportunity',
          property: 'SalesPotentialOpportunity',
          renderer: function renderSalesPotentialOpportunity(val) {
            if (App.hasMultiCurrency()) {
              return _Format2.default.multiCurrency.call(null, val.SalesPotential * val.ExchangeRate, val.ExchangeRateCode);
            }

            return '-';
          }
        });

        layout.push(multiCurrency);
      }

      layout.push(relatedItems);
      return layout;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});