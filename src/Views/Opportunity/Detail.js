import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import Detail from 'argos/Detail';
import format from '../../Format';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('opportunityDetail');
const dtFormatResource = getResource('opportunityDetailDateTimeFormat');

/**
 * @class crm.Views.Opportunity.Detail
 *
 * @extends argos.Detail
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.Opportunity.Detail', [Detail], {
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
  modelName: MODEL_NAMES.OPPORTUNITY,

  scheduleActivity: function scheduleActivity() {
    App.navigateToActivityInsertView();
  },
  addNote: function addNote() {
    const view = App.getView(this.noteEditView);
    if (view) {
      view.show({
        template: {},
        insert: true,
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
    const estimatedCloseDate = this.fields.EstimatedClose.getValue();
    const timelessStartDate = estimatedCloseDate.clone()
      .clearTime()
      .add({
        minutes: -1 * estimatedCloseDate.getTimezoneOffset(),
        seconds: 5,
      });
    let values = this.inherited(arguments);

    values = values || {};
    values.EstimatedClose = timelessStartDate;

    return values;
  },
  formatAccountRelatedQuery: function formatAccountRelatedQuery(fmt) {
    return string.substitute(fmt, [this.entry.Account.$key]);
  },
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },
  createLayout: function createLayout() {
    const quickActions = {
      list: true,
      title: this.actionsText,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [{
        name: 'ScheduleActivityAction',
        property: 'Description',
        label: this.scheduleActivityText,
        iconClass: 'calendar',
        action: 'scheduleActivity',
      }, {
        name: 'AddNoteAction',
        property: 'Description',
        label: this.addNoteText,
        iconClass: 'quick-edit',
        action: 'addNote',
      }],
    };

    const multiCurrency = {
      title: this.multiCurrencyText,
      name: 'MultiCurrencySection',
      children: [{
        label: this.multiCurrencyRateText,
        name: 'ExchangeRate',
        property: 'ExchangeRate',
      }, {
        label: this.multiCurrencyCodeText,
        name: 'ExchangeRateCode',
        property: 'ExchangeRateCode',
      }, {
        label: this.multiCurrencyDateText,
        name: 'ExchangeRateDate',
        property: 'ExchangeRateDate',
        renderer: format.date.bindDelegate(this, (App.is24HourClock()) ? this.exchangeRateDateFormatText24 : this.exchangeRateDateFormatText, false),
      }, {
        label: this.multiCurrencyLockedText,
        name: 'ExchangeRateLocked',
        property: 'ExchangeRateLocked',
      }],
    };
    const details = {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        label: this.opportunityText,
        name: 'Description',
        property: 'Description',
      }, {
        label: this.accountText,
        key: 'Account.$key',
        name: 'Account.AccountName',
        property: 'Account.AccountName',
        view: 'account_detail',
      }, {
        label: this.statusText,
        name: 'Status',
        property: 'Status',
        renderer: this.formatPicklist('Status'),
      }, {
        label: this.estCloseText,
        name: 'EstimatedClose',
        property: 'EstimatedClose',
        renderer: format.date.bindDelegate(this, null, true),
      }, {
        label: App.hasMultiCurrency() ? this.potentialBaseText : this.potentialText,
        name: 'SalesPotential',
        property: 'SalesPotential',
        renderer: (function renderSalesPotential(val) {
          if (App.hasMultiCurrency()) {
            const exhangeRate = App.getBaseExchangeRate();
            const convertedValue = val * exhangeRate.rate;
            return format.multiCurrency.call(null, convertedValue, exhangeRate.code);
          }
          return format.currency.call(null, val);
        }).bindDelegate(this),
      }, {
        label: this.typeText,
        name: 'Type',
        property: 'Type',
        renderer: this.formatPicklist('Type'),
      }, {
        label: this.resellerText,
        key: 'Reseller.$key',
        name: 'Reseller.AccountName',
        property: 'Reseller.AccountName',
        view: 'account_detail',
      }, {
        label: this.probabilityText,
        name: 'CloseProbability',
        property: 'CloseProbability',
        renderer: this.formatPicklist('CloseProbability'),
      }, {
        label: this.acctMgrText,
        name: 'AccountManager.UserInfo',
        property: 'AccountManager.UserInfo',
        renderer: format.nameLF,
      }, {
        label: this.importSourceText,
        name: 'LeadSource.Description',
        property: 'LeadSource.Description',
      }],
    };

    const relatedItems = {
      list: true,
      title: this.relatedItemsText,
      name: 'RelatedItemsSection',
      children: [{
        name: 'OpportunityRelated',
        label: this.relatedProductsText,
        view: 'opportunityproduct_related',
        where: this.formatRelatedQuery.bindDelegate(this, 'Opportunity.Id eq "${0}"'),
      }, {
        name: 'ActivityRelated',
        label: this.relatedActivitiesText,
        view: 'activity_related',
        where: this.formatRelatedQuery.bindDelegate(this, 'OpportunityId eq "${0}"'),
      }, {
        name: 'ContactRelated',
        label: this.relatedContactsText,
        options: {
          prefilter: this.formatAccountRelatedQuery.bindDelegate(this, 'Account.Id eq "${0}"'),
        },
        view: 'opportunitycontact_related',
        where: this.formatRelatedQuery.bindDelegate(this, 'Opportunity.Id eq "${0}"'),
      }, {
        name: 'HistoryRelated',
        label: this.relatedHistoriesText,
        where: this.formatRelatedQuery.bindDelegate(this, 'OpportunityId eq "${0}" and Type ne "atDatabaseChange"'),
        view: 'history_related',
      }, {
        name: 'AttachmentRelated',
        label: this.relatedAttachmentText,
        where: this.formatRelatedQuery.bindDelegate(this, 'opportunityId eq "${0}"'), // must be lower case because of feed
        view: 'opportunity_attachment_related',
        title: this.relatedAttachmentTitleText,
      }],
    };

    const layout = this.layout || (this.layout = []);

    if (layout.length > 0) {
      return layout;
    }

    layout.push(quickActions);
    layout.push(details);

    if (App.hasMultiCurrency()) {
      details.children.push({
        label: this.potentialMyRateText,
        name: 'SalesPotentialMine',
        property: 'SalesPotential',
        renderer: (function renderMySalesPotential(val) {
          if (App.hasMultiCurrency()) {
            const exhangeRate = App.getMyExchangeRate();
            const convertedValue = val * exhangeRate.rate;
            return format.multiCurrency.call(null, convertedValue, exhangeRate.code);
          }

          return '-';
        }).bindDelegate(this),
      }, {
        label: this.potentialOpportunityText,
        name: 'SalesPotentialOpportunity',
        property: 'SalesPotentialOpportunity',
        renderer: function renderSalesPotentialOpportunity(val) {
          if (App.hasMultiCurrency()) {
            return format.multiCurrency.call(null, (val.SalesPotential * val.ExchangeRate), val.ExchangeRateCode);
          }

          return '-';
        },
      });

      layout.push(multiCurrency);
    }

    layout.push(relatedItems);
    return layout;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Opportunity.Detail', __class);
export default __class;
