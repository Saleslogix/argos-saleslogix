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
      this.inherited(arguments);

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
      var values = this.inherited(arguments);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eS9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsImFjY291bnRUZXh0IiwiYWNjdE1nclRleHQiLCJlc3RDbG9zZVRleHQiLCJkZXRhaWxzVGV4dCIsImZiYXJIb21lVGl0bGVUZXh0IiwiZmJhclNjaGVkdWxlVGl0bGVUZXh0IiwiaW1wb3J0U291cmNlVGV4dCIsIm9wcG9ydHVuaXR5VGV4dCIsIm93bmVyVGV4dCIsImFjdGlvbnNUZXh0IiwicG90ZW50aWFsVGV4dCIsInBvdGVudGlhbEJhc2VUZXh0IiwicG90ZW50aWFsT3Bwb3J0dW5pdHlUZXh0IiwicG90ZW50aWFsTXlSYXRlVGV4dCIsInByb2JhYmlsaXR5VGV4dCIsInJlbGF0ZWRBY3Rpdml0aWVzVGV4dCIsInJlbGF0ZWRDb250YWN0c1RleHQiLCJyZWxhdGVkSGlzdG9yaWVzVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJyZWxhdGVkTm90ZXNUZXh0IiwicmVsYXRlZFByb2R1Y3RzVGV4dCIsInJlbGF0ZWRBdHRhY2htZW50VGV4dCIsInJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0IiwicmVzZWxsZXJUZXh0Iiwic3RhdHVzVGV4dCIsInRpdGxlVGV4dCIsInR5cGVUZXh0Iiwic2NoZWR1bGVBY3Rpdml0eVRleHQiLCJhZGROb3RlVGV4dCIsIm11bHRpQ3VycmVuY3lUZXh0IiwibXVsdGlDdXJyZW5jeVJhdGVUZXh0IiwibXVsdGlDdXJyZW5jeUNvZGVUZXh0IiwibXVsdGlDdXJyZW5jeURhdGVUZXh0IiwibXVsdGlDdXJyZW5jeUxvY2tlZFRleHQiLCJleGNoYW5nZVJhdGVEYXRlRm9ybWF0VGV4dCIsImV4Y2hhbmdlUmF0ZURhdGVGb3JtYXRUZXh0MjQiLCJlbnRpdHlUZXh0IiwiaWQiLCJlZGl0VmlldyIsIm5vdGVFZGl0VmlldyIsImVuYWJsZU9mZmxpbmUiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJPUFBPUlRVTklUWSIsInNjaGVkdWxlQWN0aXZpdHkiLCJBcHAiLCJuYXZpZ2F0ZVRvQWN0aXZpdHlJbnNlcnRWaWV3IiwiYWRkTm90ZSIsInZpZXciLCJnZXRWaWV3Iiwic2hvdyIsInRlbXBsYXRlIiwiaW5zZXJ0IiwicHJvY2Vzc0VudHJ5IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiaGFzTXVsdGlDdXJyZW5jeSIsIm9wdGlvbnMiLCJlbnRyeSIsIkV4Y2hhbmdlUmF0ZSIsIkV4Y2hhbmdlUmF0ZUNvZGUiLCJnZXRWYWx1ZXMiLCJlc3RpbWF0ZWRDbG9zZURhdGUiLCJmaWVsZHMiLCJFc3RpbWF0ZWRDbG9zZSIsImdldFZhbHVlIiwidGltZWxlc3NTdGFydERhdGUiLCJjbG9uZSIsImNsZWFyVGltZSIsImFkZCIsIm1pbnV0ZXMiLCJnZXRUaW1lem9uZU9mZnNldCIsInNlY29uZHMiLCJ2YWx1ZXMiLCJmb3JtYXRBY2NvdW50UmVsYXRlZFF1ZXJ5IiwiZm10Iiwic3Vic3RpdHV0ZSIsIkFjY291bnQiLCIka2V5IiwiZm9ybWF0UGlja2xpc3QiLCJwcm9wZXJ0eSIsInBpY2tsaXN0IiwiYXBwIiwicGlja2xpc3RTZXJ2aWNlIiwiX21vZGVsIiwiY3JlYXRlTGF5b3V0IiwicXVpY2tBY3Rpb25zIiwibGlzdCIsInRpdGxlIiwiY2xzIiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJpY29uQ2xhc3MiLCJhY3Rpb24iLCJtdWx0aUN1cnJlbmN5IiwicmVuZGVyZXIiLCJkYXRlIiwiYmluZERlbGVnYXRlIiwiaXMyNEhvdXJDbG9jayIsImRldGFpbHMiLCJrZXkiLCJyZW5kZXJTYWxlc1BvdGVudGlhbCIsInZhbCIsImV4aGFuZ2VSYXRlIiwiZ2V0QmFzZUV4Y2hhbmdlUmF0ZSIsImNvbnZlcnRlZFZhbHVlIiwicmF0ZSIsImNhbGwiLCJjb2RlIiwiY3VycmVuY3kiLCJuYW1lTEYiLCJyZWxhdGVkSXRlbXMiLCJ3aGVyZSIsImZvcm1hdFJlbGF0ZWRRdWVyeSIsInByZWZpbHRlciIsImxheW91dCIsImxlbmd0aCIsInB1c2giLCJzcGxpY2UiLCJyZW5kZXJNeVNhbGVzUG90ZW50aWFsIiwiZ2V0TXlFeGNoYW5nZVJhdGUiLCJyZW5kZXJTYWxlc1BvdGVudGlhbE9wcG9ydHVuaXR5IiwiU2FsZXNQb3RlbnRpYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxXQUFXLG9CQUFZLG1CQUFaLENBQWpCO0FBQ0EsTUFBTUMsbUJBQW1CLG9CQUFZLGlDQUFaLENBQXpCOztBQUVBOzs7Ozs7O0FBT0EsTUFBTUMsVUFBVSx1QkFBUSw4QkFBUixFQUF3QyxrQkFBeEMsRUFBa0Q7QUFDaEU7QUFDQUMsaUJBQWFILFNBQVNHLFdBRjBDO0FBR2hFQyxpQkFBYUosU0FBU0ksV0FIMEM7QUFJaEVDLGtCQUFjTCxTQUFTSyxZQUp5QztBQUtoRUMsaUJBQWFOLFNBQVNNLFdBTDBDO0FBTWhFQyx1QkFBbUJQLFNBQVNPLGlCQU5vQztBQU9oRUMsMkJBQXVCUixTQUFTUSxxQkFQZ0M7QUFRaEVDLHNCQUFrQlQsU0FBU1MsZ0JBUnFDO0FBU2hFQyxxQkFBaUJWLFNBQVNVLGVBVHNDO0FBVWhFQyxlQUFXWCxTQUFTVyxTQVY0QztBQVdoRUMsaUJBQWFaLFNBQVNZLFdBWDBDO0FBWWhFQyxtQkFBZWIsU0FBU2EsYUFad0M7QUFhaEVDLHVCQUFtQmQsU0FBU2MsaUJBYm9DO0FBY2hFQyw4QkFBMEJmLFNBQVNlLHdCQWQ2QjtBQWVoRUMseUJBQXFCaEIsU0FBU2dCLG1CQWZrQztBQWdCaEVDLHFCQUFpQmpCLFNBQVNpQixlQWhCc0M7QUFpQmhFQywyQkFBdUJsQixTQUFTa0IscUJBakJnQztBQWtCaEVDLHlCQUFxQm5CLFNBQVNtQixtQkFsQmtDO0FBbUJoRUMsMEJBQXNCcEIsU0FBU29CLG9CQW5CaUM7QUFvQmhFQyxzQkFBa0JyQixTQUFTcUIsZ0JBcEJxQztBQXFCaEVDLHNCQUFrQnRCLFNBQVNzQixnQkFyQnFD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eXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eURldGFpbCcpO1xyXG5jb25zdCBkdEZvcm1hdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29wcG9ydHVuaXR5RGV0YWlsRGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9wcG9ydHVuaXR5LkRldGFpbFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5EZXRhaWxcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuT3Bwb3J0dW5pdHkuRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgYWNjdE1nclRleHQ6IHJlc291cmNlLmFjY3RNZ3JUZXh0LFxyXG4gIGVzdENsb3NlVGV4dDogcmVzb3VyY2UuZXN0Q2xvc2VUZXh0LFxyXG4gIGRldGFpbHNUZXh0OiByZXNvdXJjZS5kZXRhaWxzVGV4dCxcclxuICBmYmFySG9tZVRpdGxlVGV4dDogcmVzb3VyY2UuZmJhckhvbWVUaXRsZVRleHQsXHJcbiAgZmJhclNjaGVkdWxlVGl0bGVUZXh0OiByZXNvdXJjZS5mYmFyU2NoZWR1bGVUaXRsZVRleHQsXHJcbiAgaW1wb3J0U291cmNlVGV4dDogcmVzb3VyY2UuaW1wb3J0U291cmNlVGV4dCxcclxuICBvcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICBvd25lclRleHQ6IHJlc291cmNlLm93bmVyVGV4dCxcclxuICBhY3Rpb25zVGV4dDogcmVzb3VyY2UuYWN0aW9uc1RleHQsXHJcbiAgcG90ZW50aWFsVGV4dDogcmVzb3VyY2UucG90ZW50aWFsVGV4dCxcclxuICBwb3RlbnRpYWxCYXNlVGV4dDogcmVzb3VyY2UucG90ZW50aWFsQmFzZVRleHQsXHJcbiAgcG90ZW50aWFsT3Bwb3J0dW5pdHlUZXh0OiByZXNvdXJjZS5wb3RlbnRpYWxPcHBvcnR1bml0eVRleHQsXHJcbiAgcG90ZW50aWFsTXlSYXRlVGV4dDogcmVzb3VyY2UucG90ZW50aWFsTXlSYXRlVGV4dCxcclxuICBwcm9iYWJpbGl0eVRleHQ6IHJlc291cmNlLnByb2JhYmlsaXR5VGV4dCxcclxuICByZWxhdGVkQWN0aXZpdGllc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRBY3Rpdml0aWVzVGV4dCxcclxuICByZWxhdGVkQ29udGFjdHNUZXh0OiByZXNvdXJjZS5yZWxhdGVkQ29udGFjdHNUZXh0LFxyXG4gIHJlbGF0ZWRIaXN0b3JpZXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSGlzdG9yaWVzVGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIHJlbGF0ZWROb3Rlc1RleHQ6IHJlc291cmNlLnJlbGF0ZWROb3Rlc1RleHQsXHJcbiAgcmVsYXRlZFByb2R1Y3RzVGV4dDogcmVzb3VyY2UucmVsYXRlZFByb2R1Y3RzVGV4dCxcclxuICByZWxhdGVkQXR0YWNobWVudFRleHQ6IHJlc291cmNlLnJlbGF0ZWRBdHRhY2htZW50VGV4dCxcclxuICByZWxhdGVkQXR0YWNobWVudFRpdGxlVGV4dDogcmVzb3VyY2UucmVsYXRlZEF0dGFjaG1lbnRUaXRsZVRleHQsXHJcbiAgcmVzZWxsZXJUZXh0OiByZXNvdXJjZS5yZXNlbGxlclRleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICB0eXBlVGV4dDogcmVzb3VyY2UudHlwZVRleHQsXHJcbiAgc2NoZWR1bGVBY3Rpdml0eVRleHQ6IHJlc291cmNlLnNjaGVkdWxlQWN0aXZpdHlUZXh0LFxyXG4gIGFkZE5vdGVUZXh0OiByZXNvdXJjZS5hZGROb3RlVGV4dCxcclxuICBtdWx0aUN1cnJlbmN5VGV4dDogcmVzb3VyY2UubXVsdGlDdXJyZW5jeVRleHQsXHJcbiAgbXVsdGlDdXJyZW5jeVJhdGVUZXh0OiByZXNvdXJjZS5tdWx0aUN1cnJlbmN5UmF0ZVRleHQsXHJcbiAgbXVsdGlDdXJyZW5jeUNvZGVUZXh0OiByZXNvdXJjZS5tdWx0aUN1cnJlbmN5Q29kZVRleHQsXHJcbiAgbXVsdGlDdXJyZW5jeURhdGVUZXh0OiByZXNvdXJjZS5tdWx0aUN1cnJlbmN5RGF0ZVRleHQsXHJcbiAgbXVsdGlDdXJyZW5jeUxvY2tlZFRleHQ6IHJlc291cmNlLm11bHRpQ3VycmVuY3lMb2NrZWRUZXh0LFxyXG4gIGV4Y2hhbmdlUmF0ZURhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmV4Y2hhbmdlUmF0ZURhdGVGb3JtYXRUZXh0LFxyXG4gIGV4Y2hhbmdlUmF0ZURhdGVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2UuZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQyNCxcclxuICBlbnRpdHlUZXh0OiByZXNvdXJjZS5lbnRpdHlUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ29wcG9ydHVuaXR5X2RldGFpbCcsXHJcbiAgZWRpdFZpZXc6ICdvcHBvcnR1bml0eV9lZGl0JyxcclxuICBub3RlRWRpdFZpZXc6ICdoaXN0b3J5X2VkaXQnLFxyXG4gIGVuYWJsZU9mZmxpbmU6IHRydWUsXHJcbiAgcmVzb3VyY2VLaW5kOiAnb3Bwb3J0dW5pdGllcycsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5PUFBPUlRVTklUWSxcclxuXHJcbiAgc2NoZWR1bGVBY3Rpdml0eTogZnVuY3Rpb24gc2NoZWR1bGVBY3Rpdml0eSgpIHtcclxuICAgIEFwcC5uYXZpZ2F0ZVRvQWN0aXZpdHlJbnNlcnRWaWV3KCk7XHJcbiAgfSxcclxuICBhZGROb3RlOiBmdW5jdGlvbiBhZGROb3RlKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMubm90ZUVkaXRWaWV3KTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgdGVtcGxhdGU6IHt9LFxyXG4gICAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9jZXNzRW50cnk6IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeSgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkgJiYgdGhpcy5vcHRpb25zICYmIHRoaXMuZW50cnkgJiYgdGhpcy5lbnRyeS5FeGNoYW5nZVJhdGUpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLkV4Y2hhbmdlUmF0ZSA9IHRoaXMuZW50cnkuRXhjaGFuZ2VSYXRlO1xyXG4gICAgICB0aGlzLm9wdGlvbnMuRXhjaGFuZ2VSYXRlQ29kZSA9IHRoaXMuZW50cnkuRXhjaGFuZ2VSYXRlQ29kZTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldFZhbHVlczogZnVuY3Rpb24gZ2V0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgZXN0aW1hdGVkQ2xvc2VEYXRlID0gdGhpcy5maWVsZHMuRXN0aW1hdGVkQ2xvc2UuZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IHRpbWVsZXNzU3RhcnREYXRlID0gZXN0aW1hdGVkQ2xvc2VEYXRlLmNsb25lKClcclxuICAgICAgLmNsZWFyVGltZSgpXHJcbiAgICAgIC5hZGQoe1xyXG4gICAgICAgIG1pbnV0ZXM6IC0xICogZXN0aW1hdGVkQ2xvc2VEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCksXHJcbiAgICAgICAgc2Vjb25kczogNSxcclxuICAgICAgfSk7XHJcbiAgICBsZXQgdmFsdWVzID0gdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICB2YWx1ZXMgPSB2YWx1ZXMgfHwge307XHJcbiAgICB2YWx1ZXMuRXN0aW1hdGVkQ2xvc2UgPSB0aW1lbGVzc1N0YXJ0RGF0ZTtcclxuXHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG4gIH0sXHJcbiAgZm9ybWF0QWNjb3VudFJlbGF0ZWRRdWVyeTogZnVuY3Rpb24gZm9ybWF0QWNjb3VudFJlbGF0ZWRRdWVyeShmbXQpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShmbXQsIFt0aGlzLmVudHJ5LkFjY291bnQuJGtleV0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0UGlja2xpc3Q6IGZ1bmN0aW9uIGZvcm1hdFBpY2tsaXN0KHByb3BlcnR5KSB7XHJcbiAgICByZXR1cm4gZm9ybWF0LnBpY2tsaXN0KHRoaXMuYXBwLnBpY2tsaXN0U2VydmljZSwgdGhpcy5fbW9kZWwsIHByb3BlcnR5KTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgY29uc3QgcXVpY2tBY3Rpb25zID0ge1xyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdTY2hlZHVsZUFjdGl2aXR5QWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zY2hlZHVsZUFjdGl2aXR5VGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdjYWxlbmRhcicsXHJcbiAgICAgICAgYWN0aW9uOiAnc2NoZWR1bGVBY3Rpdml0eScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWRkTm90ZUFjdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWRkTm90ZVRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAncXVpY2stZWRpdCcsXHJcbiAgICAgICAgYWN0aW9uOiAnYWRkTm90ZScsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBtdWx0aUN1cnJlbmN5ID0ge1xyXG4gICAgICB0aXRsZTogdGhpcy5tdWx0aUN1cnJlbmN5VGV4dCxcclxuICAgICAgbmFtZTogJ011bHRpQ3VycmVuY3lTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubXVsdGlDdXJyZW5jeVJhdGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeGNoYW5nZVJhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXhjaGFuZ2VSYXRlJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm11bHRpQ3VycmVuY3lDb2RlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXhjaGFuZ2VSYXRlQ29kZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeGNoYW5nZVJhdGVDb2RlJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm11bHRpQ3VycmVuY3lEYXRlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXhjaGFuZ2VSYXRlRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeGNoYW5nZVJhdGVEYXRlJyxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmRhdGUuYmluZERlbGVnYXRlKHRoaXMsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQyNCA6IHRoaXMuZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQsIGZhbHNlKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm11bHRpQ3VycmVuY3lMb2NrZWRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeGNoYW5nZVJhdGVMb2NrZWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXhjaGFuZ2VSYXRlTG9ja2VkJyxcclxuICAgICAgfV0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZGV0YWlscyA9IHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAga2V5OiAnQWNjb3VudC4ka2V5JyxcclxuICAgICAgICBuYW1lOiAnQWNjb3VudC5BY2NvdW50TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50LkFjY291bnROYW1lJyxcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9kZXRhaWwnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgICBuYW1lOiAnU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ1N0YXR1cycpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkgPyB0aGlzLnBvdGVudGlhbEJhc2VUZXh0IDogdGhpcy5wb3RlbnRpYWxUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTYWxlc1BvdGVudGlhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc1BvdGVudGlhbCcsXHJcbiAgICAgICAgcmVuZGVyZXI6IChmdW5jdGlvbiByZW5kZXJTYWxlc1BvdGVudGlhbCh2YWwpIHtcclxuICAgICAgICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aGFuZ2VSYXRlID0gQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKTtcclxuICAgICAgICAgICAgY29uc3QgY29udmVydGVkVmFsdWUgPSB2YWwgKiBleGhhbmdlUmF0ZS5yYXRlO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0Lm11bHRpQ3VycmVuY3kuY2FsbChudWxsLCBjb252ZXJ0ZWRWYWx1ZSwgZXhoYW5nZVJhdGUuY29kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmN1cnJlbmN5LmNhbGwobnVsbCwgdmFsKTtcclxuICAgICAgICB9KS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5lc3RDbG9zZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0VzdGltYXRlZENsb3NlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VzdGltYXRlZENsb3NlJyxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmRhdGUuYmluZERlbGVnYXRlKHRoaXMsIG51bGwsIHRydWUpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudHlwZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ1R5cGUnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlc2VsbGVyVGV4dCxcclxuICAgICAgICBrZXk6ICdSZXNlbGxlci4ka2V5JyxcclxuICAgICAgICBuYW1lOiAnUmVzZWxsZXIuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUmVzZWxsZXIuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9iYWJpbGl0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Nsb3NlUHJvYmFiaWxpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2xvc2VQcm9iYWJpbGl0eScsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ0Nsb3NlUHJvYmFiaWxpdHknKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY3RNZ3JUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TWFuYWdlci5Vc2VySW5mbycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50TWFuYWdlci5Vc2VySW5mbycsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5uYW1lTEYsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5pbXBvcnRTb3VyY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdMZWFkU291cmNlLkRlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xlYWRTb3VyY2UuRGVzY3JpcHRpb24nLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVsYXRlZEl0ZW1zID0ge1xyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICB0aXRsZTogdGhpcy5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gICAgICBuYW1lOiAnUmVsYXRlZEl0ZW1zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdPcHBvcnR1bml0eVJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRQcm9kdWN0c1RleHQsXHJcbiAgICAgICAgdmlldzogJ29wcG9ydHVuaXR5cHJvZHVjdF9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdPcHBvcnR1bml0eS5JZCBlcSBcIiR7MH1cIicpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjdGl2aXR5UmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVsYXRlZEFjdGl2aXRpZXNUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdhY3Rpdml0eV9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdPcHBvcnR1bml0eUlkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ29udGFjdFJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRDb250YWN0c1RleHQsXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgcHJlZmlsdGVyOiB0aGlzLmZvcm1hdEFjY291bnRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnb3Bwb3J0dW5pdHljb250YWN0X3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ09wcG9ydHVuaXR5LklkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnSGlzdG9yeVJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRIaXN0b3JpZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ09wcG9ydHVuaXR5SWQgZXEgXCIkezB9XCIgYW5kIFR5cGUgbmUgXCJhdERhdGFiYXNlQ2hhbmdlXCInKSxcclxuICAgICAgICB2aWV3OiAnaGlzdG9yeV9yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBdHRhY2htZW50UmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVsYXRlZEF0dGFjaG1lbnRUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ29wcG9ydHVuaXR5SWQgZXEgXCIkezB9XCInKSwgLy8gbXVzdCBiZSBsb3dlciBjYXNlIGJlY2F1c2Ugb2YgZmVlZFxyXG4gICAgICAgIHZpZXc6ICdvcHBvcnR1bml0eV9hdHRhY2htZW50X3JlbGF0ZWQnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0LFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW10pO1xyXG5cclxuICAgIGlmIChsYXlvdXQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbGF5b3V0O1xyXG4gICAgfVxyXG5cclxuICAgIGxheW91dC5wdXNoKHF1aWNrQWN0aW9ucyk7XHJcbiAgICBsYXlvdXQucHVzaChkZXRhaWxzKTtcclxuXHJcbiAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICBkZXRhaWxzLmNoaWxkcmVuLnNwbGljZSg0LCAwLCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucG90ZW50aWFsTXlSYXRlVGV4dCxcclxuICAgICAgICBuYW1lOiAnU2FsZXNQb3RlbnRpYWxNaW5lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NhbGVzUG90ZW50aWFsJyxcclxuICAgICAgICByZW5kZXJlcjogKGZ1bmN0aW9uIHJlbmRlck15U2FsZXNQb3RlbnRpYWwodmFsKSB7XHJcbiAgICAgICAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICAgICAgICBjb25zdCBleGhhbmdlUmF0ZSA9IEFwcC5nZXRNeUV4Y2hhbmdlUmF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWRWYWx1ZSA9IHZhbCAqIGV4aGFuZ2VSYXRlLnJhdGU7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQubXVsdGlDdXJyZW5jeS5jYWxsKG51bGwsIGNvbnZlcnRlZFZhbHVlLCBleGhhbmdlUmF0ZS5jb2RlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gJy0nO1xyXG4gICAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBvdGVudGlhbE9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnU2FsZXNQb3RlbnRpYWxPcHBvcnR1bml0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc1BvdGVudGlhbE9wcG9ydHVuaXR5JyxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyU2FsZXNQb3RlbnRpYWxPcHBvcnR1bml0eSh2YWwpIHtcclxuICAgICAgICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQubXVsdGlDdXJyZW5jeS5jYWxsKG51bGwsICh2YWwuU2FsZXNQb3RlbnRpYWwgKiB2YWwuRXhjaGFuZ2VSYXRlKSwgdmFsLkV4Y2hhbmdlUmF0ZUNvZGUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiAnLSc7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsYXlvdXQucHVzaChtdWx0aUN1cnJlbmN5KTtcclxuICAgIH1cclxuXHJcbiAgICBsYXlvdXQucHVzaChyZWxhdGVkSXRlbXMpO1xyXG4gICAgcmV0dXJuIGxheW91dDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==