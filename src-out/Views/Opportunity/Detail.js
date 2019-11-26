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

  /**
   * @class crm.Views.Opportunity.Detail
   *
   * @extends argos.Detail
   *
   * @requires crm.Format
   */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eS9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsImFjY291bnRUZXh0IiwiYWNjdE1nclRleHQiLCJlc3RDbG9zZVRleHQiLCJkZXRhaWxzVGV4dCIsImZiYXJIb21lVGl0bGVUZXh0IiwiZmJhclNjaGVkdWxlVGl0bGVUZXh0IiwiaW1wb3J0U291cmNlVGV4dCIsIm9wcG9ydHVuaXR5VGV4dCIsIm93bmVyVGV4dCIsImFjdGlvbnNUZXh0IiwicG90ZW50aWFsVGV4dCIsInBvdGVudGlhbEJhc2VUZXh0IiwicG90ZW50aWFsT3Bwb3J0dW5pdHlUZXh0IiwicG90ZW50aWFsTXlSYXRlVGV4dCIsInByb2JhYmlsaXR5VGV4dCIsInJlbGF0ZWRBY3Rpdml0aWVzVGV4dCIsInJlbGF0ZWRDb250YWN0c1RleHQiLCJyZWxhdGVkSGlzdG9yaWVzVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJyZWxhdGVkTm90ZXNUZXh0IiwicmVsYXRlZFByb2R1Y3RzVGV4dCIsInJlbGF0ZWRBdHRhY2htZW50VGV4dCIsInJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0IiwicmVzZWxsZXJUZXh0Iiwic3RhdHVzVGV4dCIsInRpdGxlVGV4dCIsInR5cGVUZXh0Iiwic2NoZWR1bGVBY3Rpdml0eVRleHQiLCJhZGROb3RlVGV4dCIsIm11bHRpQ3VycmVuY3lUZXh0IiwibXVsdGlDdXJyZW5jeVJhdGVUZXh0IiwibXVsdGlDdXJyZW5jeUNvZGVUZXh0IiwibXVsdGlDdXJyZW5jeURhdGVUZXh0IiwibXVsdGlDdXJyZW5jeUxvY2tlZFRleHQiLCJleGNoYW5nZVJhdGVEYXRlRm9ybWF0VGV4dCIsImV4Y2hhbmdlUmF0ZURhdGVGb3JtYXRUZXh0MjQiLCJlbnRpdHlUZXh0IiwiaWQiLCJlZGl0VmlldyIsIm5vdGVFZGl0VmlldyIsImVuYWJsZU9mZmxpbmUiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJPUFBPUlRVTklUWSIsInNjaGVkdWxlQWN0aXZpdHkiLCJBcHAiLCJuYXZpZ2F0ZVRvQWN0aXZpdHlJbnNlcnRWaWV3IiwiYWRkTm90ZSIsInZpZXciLCJnZXRWaWV3Iiwic2hvdyIsInRlbXBsYXRlIiwiaW5zZXJ0IiwicHJvY2Vzc0VudHJ5IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiaGFzTXVsdGlDdXJyZW5jeSIsIm9wdGlvbnMiLCJlbnRyeSIsIkV4Y2hhbmdlUmF0ZSIsIkV4Y2hhbmdlUmF0ZUNvZGUiLCJnZXRWYWx1ZXMiLCJlc3RpbWF0ZWRDbG9zZURhdGUiLCJmaWVsZHMiLCJFc3RpbWF0ZWRDbG9zZSIsImdldFZhbHVlIiwidGltZWxlc3NTdGFydERhdGUiLCJjbG9uZSIsImNsZWFyVGltZSIsImFkZCIsIm1pbnV0ZXMiLCJnZXRUaW1lem9uZU9mZnNldCIsInNlY29uZHMiLCJ2YWx1ZXMiLCJmb3JtYXRBY2NvdW50UmVsYXRlZFF1ZXJ5IiwiZm10Iiwic3Vic3RpdHV0ZSIsIkFjY291bnQiLCIka2V5IiwiZm9ybWF0UGlja2xpc3QiLCJwcm9wZXJ0eSIsInBpY2tsaXN0IiwiYXBwIiwicGlja2xpc3RTZXJ2aWNlIiwiX21vZGVsIiwiY3JlYXRlTGF5b3V0IiwicXVpY2tBY3Rpb25zIiwibGlzdCIsInRpdGxlIiwiY2xzIiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJpY29uQ2xhc3MiLCJhY3Rpb24iLCJtdWx0aUN1cnJlbmN5IiwicmVuZGVyZXIiLCJkYXRlIiwiYmluZERlbGVnYXRlIiwiaXMyNEhvdXJDbG9jayIsImRldGFpbHMiLCJrZXkiLCJyZW5kZXJTYWxlc1BvdGVudGlhbCIsInZhbCIsImV4aGFuZ2VSYXRlIiwiZ2V0QmFzZUV4Y2hhbmdlUmF0ZSIsImNvbnZlcnRlZFZhbHVlIiwicmF0ZSIsImNhbGwiLCJjb2RlIiwiY3VycmVuY3kiLCJuYW1lTEYiLCJyZWxhdGVkSXRlbXMiLCJ3aGVyZSIsImZvcm1hdFJlbGF0ZWRRdWVyeSIsInByZWZpbHRlciIsImxheW91dCIsImxlbmd0aCIsInB1c2giLCJzcGxpY2UiLCJyZW5kZXJNeVNhbGVzUG90ZW50aWFsIiwiZ2V0TXlFeGNoYW5nZVJhdGUiLCJyZW5kZXJTYWxlc1BvdGVudGlhbE9wcG9ydHVuaXR5IiwiU2FsZXNQb3RlbnRpYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxXQUFXLG9CQUFZLG1CQUFaLENBQWpCO0FBQ0EsTUFBTUMsbUJBQW1CLG9CQUFZLGlDQUFaLENBQXpCOztBQUVBOzs7Ozs7O0FBT0EsTUFBTUMsVUFBVSx1QkFBUSw4QkFBUixFQUF3QyxrQkFBeEMsRUFBa0Q7QUFDaEU7QUFDQUMsaUJBQWFILFNBQVNHLFdBRjBDO0FBR2hFQyxpQkFBYUosU0FBU0ksV0FIMEM7QUFJaEVDLGtCQUFjTCxTQUFTSyxZQUp5QztBQUtoRUMsaUJBQWFOLFNBQVNNLFdBTDBDO0FBTWhFQyx1QkFBbUJQLFNBQVNPLGlCQU5vQztBQU9oRUMsMkJBQXVCUixTQUFTUSxxQkFQZ0M7QUFRaEVDLHNCQUFrQlQsU0FBU1MsZ0JBUnFDO0FBU2hFQyxxQkFBaUJWLFNBQVNVLGVBVHNDO0FBVWhFQyxlQUFXWCxTQUFTVyxTQVY0QztBQVdoRUMsaUJBQWFaLFNBQVNZLFdBWDBDO0FBWWhFQyxtQkFBZWIsU0FBU2EsYUFad0M7QUFhaEVDLHVCQUFtQmQsU0FBU2MsaUJBYm9DO0FBY2hFQyw4QkFBMEJmLFNBQVNlLHdCQWQ2QjtBQWVoRUMseUJBQXFCaEIsU0FBU2dCLG1CQWZrQztBQWdCaEVDLHFCQUFpQmpCLFNBQVNpQixlQWhCc0M7QUFpQmhFQywyQkFBdUJsQixTQUFTa0IscUJBakJnQztBQWtCaEVDLHlCQUFxQm5CLFNBQVNtQixtQkFsQmtDO0FBbUJoRUMsMEJBQXNCcEIsU0FBU29CLG9CQW5CaUM7QUFvQmhFQyxzQkFBa0JyQixTQUFTcUIsZ0JBcEJxQztBQXFCaEVDLHNCQUFrQnRCLFNBQVNzQixnQkFyQnFD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LCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgRGV0YWlsIGZyb20gJ2FyZ29zL0RldGFpbCc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29wcG9ydHVuaXR5RGV0YWlsJyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb3Bwb3J0dW5pdHlEZXRhaWxEYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuT3Bwb3J0dW5pdHkuRGV0YWlsXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkRldGFpbFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5PcHBvcnR1bml0eS5EZXRhaWwnLCBbRGV0YWlsXSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBhY2N0TWdyVGV4dDogcmVzb3VyY2UuYWNjdE1nclRleHQsXHJcbiAgZXN0Q2xvc2VUZXh0OiByZXNvdXJjZS5lc3RDbG9zZVRleHQsXHJcbiAgZGV0YWlsc1RleHQ6IHJlc291cmNlLmRldGFpbHNUZXh0LFxyXG4gIGZiYXJIb21lVGl0bGVUZXh0OiByZXNvdXJjZS5mYmFySG9tZVRpdGxlVGV4dCxcclxuICBmYmFyU2NoZWR1bGVUaXRsZVRleHQ6IHJlc291cmNlLmZiYXJTY2hlZHVsZVRpdGxlVGV4dCxcclxuICBpbXBvcnRTb3VyY2VUZXh0OiByZXNvdXJjZS5pbXBvcnRTb3VyY2VUZXh0LFxyXG4gIG9wcG9ydHVuaXR5VGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlUZXh0LFxyXG4gIG93bmVyVGV4dDogcmVzb3VyY2Uub3duZXJUZXh0LFxyXG4gIGFjdGlvbnNUZXh0OiByZXNvdXJjZS5hY3Rpb25zVGV4dCxcclxuICBwb3RlbnRpYWxUZXh0OiByZXNvdXJjZS5wb3RlbnRpYWxUZXh0LFxyXG4gIHBvdGVudGlhbEJhc2VUZXh0OiByZXNvdXJjZS5wb3RlbnRpYWxCYXNlVGV4dCxcclxuICBwb3RlbnRpYWxPcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLnBvdGVudGlhbE9wcG9ydHVuaXR5VGV4dCxcclxuICBwb3RlbnRpYWxNeVJhdGVUZXh0OiByZXNvdXJjZS5wb3RlbnRpYWxNeVJhdGVUZXh0LFxyXG4gIHByb2JhYmlsaXR5VGV4dDogcmVzb3VyY2UucHJvYmFiaWxpdHlUZXh0LFxyXG4gIHJlbGF0ZWRBY3Rpdml0aWVzVGV4dDogcmVzb3VyY2UucmVsYXRlZEFjdGl2aXRpZXNUZXh0LFxyXG4gIHJlbGF0ZWRDb250YWN0c1RleHQ6IHJlc291cmNlLnJlbGF0ZWRDb250YWN0c1RleHQsXHJcbiAgcmVsYXRlZEhpc3Rvcmllc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRIaXN0b3JpZXNUZXh0LFxyXG4gIHJlbGF0ZWRJdGVtc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgcmVsYXRlZE5vdGVzVGV4dDogcmVzb3VyY2UucmVsYXRlZE5vdGVzVGV4dCxcclxuICByZWxhdGVkUHJvZHVjdHNUZXh0OiByZXNvdXJjZS5yZWxhdGVkUHJvZHVjdHNUZXh0LFxyXG4gIHJlbGF0ZWRBdHRhY2htZW50VGV4dDogcmVzb3VyY2UucmVsYXRlZEF0dGFjaG1lbnRUZXh0LFxyXG4gIHJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0OiByZXNvdXJjZS5yZWxhdGVkQXR0YWNobWVudFRpdGxlVGV4dCxcclxuICByZXNlbGxlclRleHQ6IHJlc291cmNlLnJlc2VsbGVyVGV4dCxcclxuICBzdGF0dXNUZXh0OiByZXNvdXJjZS5zdGF0dXNUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHR5cGVUZXh0OiByZXNvdXJjZS50eXBlVGV4dCxcclxuICBzY2hlZHVsZUFjdGl2aXR5VGV4dDogcmVzb3VyY2Uuc2NoZWR1bGVBY3Rpdml0eVRleHQsXHJcbiAgYWRkTm90ZVRleHQ6IHJlc291cmNlLmFkZE5vdGVUZXh0LFxyXG4gIG11bHRpQ3VycmVuY3lUZXh0OiByZXNvdXJjZS5tdWx0aUN1cnJlbmN5VGV4dCxcclxuICBtdWx0aUN1cnJlbmN5UmF0ZVRleHQ6IHJlc291cmNlLm11bHRpQ3VycmVuY3lSYXRlVGV4dCxcclxuICBtdWx0aUN1cnJlbmN5Q29kZVRleHQ6IHJlc291cmNlLm11bHRpQ3VycmVuY3lDb2RlVGV4dCxcclxuICBtdWx0aUN1cnJlbmN5RGF0ZVRleHQ6IHJlc291cmNlLm11bHRpQ3VycmVuY3lEYXRlVGV4dCxcclxuICBtdWx0aUN1cnJlbmN5TG9ja2VkVGV4dDogcmVzb3VyY2UubXVsdGlDdXJyZW5jeUxvY2tlZFRleHQsXHJcbiAgZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQsXHJcbiAgZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5leGNoYW5nZVJhdGVEYXRlRm9ybWF0VGV4dDI0LFxyXG4gIGVudGl0eVRleHQ6IHJlc291cmNlLmVudGl0eVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnb3Bwb3J0dW5pdHlfZGV0YWlsJyxcclxuICBlZGl0VmlldzogJ29wcG9ydHVuaXR5X2VkaXQnLFxyXG4gIG5vdGVFZGl0VmlldzogJ2hpc3RvcnlfZWRpdCcsXHJcbiAgZW5hYmxlT2ZmbGluZTogdHJ1ZSxcclxuICByZXNvdXJjZUtpbmQ6ICdvcHBvcnR1bml0aWVzJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLk9QUE9SVFVOSVRZLFxyXG5cclxuICBzY2hlZHVsZUFjdGl2aXR5OiBmdW5jdGlvbiBzY2hlZHVsZUFjdGl2aXR5KCkge1xyXG4gICAgQXBwLm5hdmlnYXRlVG9BY3Rpdml0eUluc2VydFZpZXcoKTtcclxuICB9LFxyXG4gIGFkZE5vdGU6IGZ1bmN0aW9uIGFkZE5vdGUoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5ub3RlRWRpdFZpZXcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICB0ZW1wbGF0ZToge30sXHJcbiAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHByb2Nlc3NFbnRyeTogZnVuY3Rpb24gcHJvY2Vzc0VudHJ5KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQocHJvY2Vzc0VudHJ5LCBhcmd1bWVudHMpO1xyXG5cclxuICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpICYmIHRoaXMub3B0aW9ucyAmJiB0aGlzLmVudHJ5ICYmIHRoaXMuZW50cnkuRXhjaGFuZ2VSYXRlKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5FeGNoYW5nZVJhdGUgPSB0aGlzLmVudHJ5LkV4Y2hhbmdlUmF0ZTtcclxuICAgICAgdGhpcy5vcHRpb25zLkV4Y2hhbmdlUmF0ZUNvZGUgPSB0aGlzLmVudHJ5LkV4Y2hhbmdlUmF0ZUNvZGU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRWYWx1ZXM6IGZ1bmN0aW9uIGdldFZhbHVlcygpIHtcclxuICAgIGNvbnN0IGVzdGltYXRlZENsb3NlRGF0ZSA9IHRoaXMuZmllbGRzLkVzdGltYXRlZENsb3NlLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCB0aW1lbGVzc1N0YXJ0RGF0ZSA9IGVzdGltYXRlZENsb3NlRGF0ZS5jbG9uZSgpXHJcbiAgICAgIC5jbGVhclRpbWUoKVxyXG4gICAgICAuYWRkKHtcclxuICAgICAgICBtaW51dGVzOiAtMSAqIGVzdGltYXRlZENsb3NlRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpLFxyXG4gICAgICAgIHNlY29uZHM6IDUsXHJcbiAgICAgIH0pO1xyXG4gICAgbGV0IHZhbHVlcyA9IHRoaXMuaW5oZXJpdGVkKGdldFZhbHVlcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICB2YWx1ZXMgPSB2YWx1ZXMgfHwge307XHJcbiAgICB2YWx1ZXMuRXN0aW1hdGVkQ2xvc2UgPSB0aW1lbGVzc1N0YXJ0RGF0ZTtcclxuXHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG4gIH0sXHJcbiAgZm9ybWF0QWNjb3VudFJlbGF0ZWRRdWVyeTogZnVuY3Rpb24gZm9ybWF0QWNjb3VudFJlbGF0ZWRRdWVyeShmbXQpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShmbXQsIFt0aGlzLmVudHJ5LkFjY291bnQuJGtleV0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0UGlja2xpc3Q6IGZ1bmN0aW9uIGZvcm1hdFBpY2tsaXN0KHByb3BlcnR5KSB7XHJcbiAgICByZXR1cm4gZm9ybWF0LnBpY2tsaXN0KHRoaXMuYXBwLnBpY2tsaXN0U2VydmljZSwgdGhpcy5fbW9kZWwsIHByb3BlcnR5KTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgY29uc3QgcXVpY2tBY3Rpb25zID0ge1xyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdTY2hlZHVsZUFjdGl2aXR5QWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zY2hlZHVsZUFjdGl2aXR5VGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdjYWxlbmRhcicsXHJcbiAgICAgICAgYWN0aW9uOiAnc2NoZWR1bGVBY3Rpdml0eScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWRkTm90ZUFjdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWRkTm90ZVRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAncXVpY2stZWRpdCcsXHJcbiAgICAgICAgYWN0aW9uOiAnYWRkTm90ZScsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBtdWx0aUN1cnJlbmN5ID0ge1xyXG4gICAgICB0aXRsZTogdGhpcy5tdWx0aUN1cnJlbmN5VGV4dCxcclxuICAgICAgbmFtZTogJ011bHRpQ3VycmVuY3lTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubXVsdGlDdXJyZW5jeVJhdGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeGNoYW5nZVJhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXhjaGFuZ2VSYXRlJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm11bHRpQ3VycmVuY3lDb2RlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXhjaGFuZ2VSYXRlQ29kZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeGNoYW5nZVJhdGVDb2RlJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm11bHRpQ3VycmVuY3lEYXRlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXhjaGFuZ2VSYXRlRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeGNoYW5nZVJhdGVEYXRlJyxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmRhdGUuYmluZERlbGVnYXRlKHRoaXMsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQyNCA6IHRoaXMuZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQsIGZhbHNlKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm11bHRpQ3VycmVuY3lMb2NrZWRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeGNoYW5nZVJhdGVMb2NrZWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXhjaGFuZ2VSYXRlTG9ja2VkJyxcclxuICAgICAgfV0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZGV0YWlscyA9IHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAga2V5OiAnQWNjb3VudC4ka2V5JyxcclxuICAgICAgICBuYW1lOiAnQWNjb3VudC5BY2NvdW50TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50LkFjY291bnROYW1lJyxcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9kZXRhaWwnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgICBuYW1lOiAnU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ1N0YXR1cycpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkgPyB0aGlzLnBvdGVudGlhbEJhc2VUZXh0IDogdGhpcy5wb3RlbnRpYWxUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTYWxlc1BvdGVudGlhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc1BvdGVudGlhbCcsXHJcbiAgICAgICAgcmVuZGVyZXI6IChmdW5jdGlvbiByZW5kZXJTYWxlc1BvdGVudGlhbCh2YWwpIHtcclxuICAgICAgICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aGFuZ2VSYXRlID0gQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKTtcclxuICAgICAgICAgICAgY29uc3QgY29udmVydGVkVmFsdWUgPSB2YWwgKiBleGhhbmdlUmF0ZS5yYXRlO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0Lm11bHRpQ3VycmVuY3kuY2FsbChudWxsLCBjb252ZXJ0ZWRWYWx1ZSwgZXhoYW5nZVJhdGUuY29kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmN1cnJlbmN5LmNhbGwobnVsbCwgdmFsKTtcclxuICAgICAgICB9KS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5lc3RDbG9zZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0VzdGltYXRlZENsb3NlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VzdGltYXRlZENsb3NlJyxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmRhdGUuYmluZERlbGVnYXRlKHRoaXMsIG51bGwsIHRydWUpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudHlwZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ1R5cGUnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlc2VsbGVyVGV4dCxcclxuICAgICAgICBrZXk6ICdSZXNlbGxlci4ka2V5JyxcclxuICAgICAgICBuYW1lOiAnUmVzZWxsZXIuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUmVzZWxsZXIuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9iYWJpbGl0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Nsb3NlUHJvYmFiaWxpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2xvc2VQcm9iYWJpbGl0eScsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ0Nsb3NlUHJvYmFiaWxpdHknKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY3RNZ3JUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TWFuYWdlci5Vc2VySW5mbycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50TWFuYWdlci5Vc2VySW5mbycsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5uYW1lTEYsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5pbXBvcnRTb3VyY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdMZWFkU291cmNlLkRlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xlYWRTb3VyY2UuRGVzY3JpcHRpb24nLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVsYXRlZEl0ZW1zID0ge1xyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICB0aXRsZTogdGhpcy5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gICAgICBuYW1lOiAnUmVsYXRlZEl0ZW1zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdPcHBvcnR1bml0eVJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRQcm9kdWN0c1RleHQsXHJcbiAgICAgICAgdmlldzogJ29wcG9ydHVuaXR5cHJvZHVjdF9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdPcHBvcnR1bml0eS5JZCBlcSBcIiR7MH1cIicpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjdGl2aXR5UmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVsYXRlZEFjdGl2aXRpZXNUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdhY3Rpdml0eV9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdPcHBvcnR1bml0eUlkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ29udGFjdFJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRDb250YWN0c1RleHQsXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgcHJlZmlsdGVyOiB0aGlzLmZvcm1hdEFjY291bnRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnb3Bwb3J0dW5pdHljb250YWN0X3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ09wcG9ydHVuaXR5LklkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnSGlzdG9yeVJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRIaXN0b3JpZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ09wcG9ydHVuaXR5SWQgZXEgXCIkezB9XCIgYW5kIFR5cGUgbmUgXCJhdERhdGFiYXNlQ2hhbmdlXCInKSxcclxuICAgICAgICB2aWV3OiAnaGlzdG9yeV9yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBdHRhY2htZW50UmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVsYXRlZEF0dGFjaG1lbnRUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ29wcG9ydHVuaXR5SWQgZXEgXCIkezB9XCInKSwgLy8gbXVzdCBiZSBsb3dlciBjYXNlIGJlY2F1c2Ugb2YgZmVlZFxyXG4gICAgICAgIHZpZXc6ICdvcHBvcnR1bml0eV9hdHRhY2htZW50X3JlbGF0ZWQnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0LFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW10pO1xyXG5cclxuICAgIGlmIChsYXlvdXQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbGF5b3V0O1xyXG4gICAgfVxyXG5cclxuICAgIGxheW91dC5wdXNoKHF1aWNrQWN0aW9ucyk7XHJcbiAgICBsYXlvdXQucHVzaChkZXRhaWxzKTtcclxuXHJcbiAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICBkZXRhaWxzLmNoaWxkcmVuLnNwbGljZSg0LCAwLCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucG90ZW50aWFsTXlSYXRlVGV4dCxcclxuICAgICAgICBuYW1lOiAnU2FsZXNQb3RlbnRpYWxNaW5lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NhbGVzUG90ZW50aWFsJyxcclxuICAgICAgICByZW5kZXJlcjogKGZ1bmN0aW9uIHJlbmRlck15U2FsZXNQb3RlbnRpYWwodmFsKSB7XHJcbiAgICAgICAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICAgICAgICBjb25zdCBleGhhbmdlUmF0ZSA9IEFwcC5nZXRNeUV4Y2hhbmdlUmF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWRWYWx1ZSA9IHZhbCAqIGV4aGFuZ2VSYXRlLnJhdGU7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQubXVsdGlDdXJyZW5jeS5jYWxsKG51bGwsIGNvbnZlcnRlZFZhbHVlLCBleGhhbmdlUmF0ZS5jb2RlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gJy0nO1xyXG4gICAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBvdGVudGlhbE9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnU2FsZXNQb3RlbnRpYWxPcHBvcnR1bml0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc1BvdGVudGlhbE9wcG9ydHVuaXR5JyxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyU2FsZXNQb3RlbnRpYWxPcHBvcnR1bml0eSh2YWwpIHtcclxuICAgICAgICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQubXVsdGlDdXJyZW5jeS5jYWxsKG51bGwsICh2YWwuU2FsZXNQb3RlbnRpYWwgKiB2YWwuRXhjaGFuZ2VSYXRlKSwgdmFsLkV4Y2hhbmdlUmF0ZUNvZGUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiAnLSc7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsYXlvdXQucHVzaChtdWx0aUN1cnJlbmN5KTtcclxuICAgIH1cclxuXHJcbiAgICBsYXlvdXQucHVzaChyZWxhdGVkSXRlbXMpO1xyXG4gICAgcmV0dXJuIGxheW91dDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==