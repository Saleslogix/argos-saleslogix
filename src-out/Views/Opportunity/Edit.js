define('crm/Views/Opportunity/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../../Validator', '../../Template', 'argos/Utility', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _Validator, _Template, _argosUtility, _argosEdit) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _validator = _interopRequireDefault(_Validator);

  var _template = _interopRequireDefault(_Template);

  var _utility = _interopRequireDefault(_argosUtility);

  var _Edit = _interopRequireDefault(_argosEdit);

  /**
   * @class crm.Views.Opportunity.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Utility
   *
   * @requires crm.Validator
   * @requires crm.Template
   */
  var __class = (0, _declare['default'])('crm.Views.Opportunity.Edit', [_Edit['default']], {
    // Localization
    accountText: 'acct',
    acctMgrText: 'acct mgr',
    estCloseText: 'est close',
    importSourceText: 'lead source',
    detailsText: 'Details',
    opportunityStatusTitleText: 'Opportunity Status',
    opportunityText: 'opportunity',
    opportunityTypeTitleText: 'Opportunity Type',
    ownerText: 'owner',
    potentialText: 'sales potential',
    probabilityText: 'close prob',
    probabilityTitleText: 'Opportunity Probability',
    resellerText: 'reseller',
    statusText: 'status',
    titleText: 'Opportunity',
    typeText: 'type',
    multiCurrencyText: 'Multi Currency',
    multiCurrencyRateText: 'exchange rate',
    multiCurrencyCodeText: 'code',
    multiCurrencyDateText: 'rate date',
    multiCurrencyLockedText: 'rate locked',
    exchangeRateDateFormatText: 'M/D/YYYY h:mm A',
    subTypePickListResellerText: 'RESELLER',

    // View Properties
    entityName: 'Opportunity',
    id: 'opportunity_edit',
    resourceKind: 'opportunities',
    insertSecurity: 'Entities/Opportunity/Add',
    updateSecurity: 'Entities/Opportunity/Edit',
    querySelect: ['Account/AccountName', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'CloseProbability', 'Contacts', 'Description', 'EstimatedClose', 'ExchangeRate', 'ExchangeRateCode', 'ExchangeRateDate', 'ExchangeRateLocked', 'LeadSource/Description', 'Owner/OwnerDescription', 'Reseller/AccountName', 'SalesPotential', 'Stage', 'Status', 'Type', 'Weighted'],
    init: function init() {
      this.inherited(arguments);
      this.connect(this.fields.Account, 'onChange', this.onAccountChange);

      if (App.hasMultiCurrency()) {
        this.connect(this.fields.ExchangeRateCode, 'onChange', this.onExchangeRateCodeChange);
        this.connect(this.fields.ExchangeRateLocked, 'onChange', this.onExchangeRateLockedChange);
      }
    },
    applyContext: function applyContext(templateEntry) {
      var found = App.queryNavigationContext(function queryNavigationContext(o) {
        return /^(accounts|contacts)$/.test(o.resourceKind) && o.key;
      });

      var lookup = {
        'accounts': this.applyAccountContext,
        'contacts': this.applyContactContext
      };

      if (found && lookup[found.resourceKind]) {
        lookup[found.resourceKind].call(this, found);
      } else {
        this.applyDefaultContext(templateEntry);
      }

      this.fields.Status.setValue(templateEntry.Status);
      this.fields.CloseProbability.setValue(templateEntry.CloseProbability);
      this.fields.EstimatedClose.setValue(templateEntry.EstimatedClose);

      if (App.hasMultiCurrency() && templateEntry) {
        if (templateEntry.ExchangeRateCode) {
          this.fields.ExchangeRateCode.setValue({
            '$key': templateEntry.ExchangeRateCode,
            '$descriptor': templateEntry.ExchangeRateCode
          });
        }

        if (templateEntry.ExchangeRate) {
          this.fields.ExchangeRate.setValue(templateEntry.ExchangeRate);
        }

        if (templateEntry.ExchangeRateDate) {
          this.fields.ExchangeRateDate.setValue(templateEntry.ExchangeRateDate);
        }
      }
    },
    setValues: function setValues(values) {
      this.inherited(arguments);
      if (App.hasMultiCurrency()) {
        if (values && values.ExchangeRateCode) {
          this.fields.ExchangeRateCode.setValue({
            '$key': values.ExchangeRateCode,
            '$descriptor': values.ExchangeRateCode
          });
        }

        if (!App.canLockOpportunityRate()) {
          this.fields.ExchangeRateLocked.disable();
        }

        if (!App.canChangeOpportunityRate()) {
          this.fields.ExchangeRate.disable();
          this.fields.ExchangeRateCode.disable();
        }

        this.fields.ExchangeRateDate.disable();
      }

      this.fields.SalesPotential.setCurrencyCode(App.getBaseExchangeRate().code);
    },
    getValues: function getValues() {
      var values = this.inherited(arguments);

      if (values) {
        var code = values.ExchangeRateCode;
        values.ExchangeRateCode = code && code.$key;
      }

      return values;
    },
    applyDefaultContext: function applyDefaultContext() {
      this.fields.AccountManager.setValue(App.context.user);
      this.fields.Owner.setValue(App.context.defaultOwner);
    },
    applyAccountContext: function applyAccountContext(context) {
      var view = App.getView(context.id);
      var entry = view && view.entry;

      this.fields.Account.setValue(entry);
      this.fields.AccountManager.setValue(_utility['default'].getValue(entry, 'AccountManager'));
      this.fields.Owner.setValue(_utility['default'].getValue(entry, 'Owner'));
    },
    applyContactContext: function applyContactContext(context) {
      var view = App.getView(context.id);
      var entry = view && view.entry;

      this.fields.Account.setValue(_utility['default'].getValue(entry, 'Account'));
      this.fields.AccountManager.setValue(_utility['default'].getValue(entry, 'AccountManager'));
      this.fields.Owner.setValue(_utility['default'].getValue(entry, 'Owner'));
      this.fields['Contacts.$resources[0].Contact.$key'].setValue(entry.$key);
    },
    onExchangeRateCodeChange: function onExchangeRateCodeChange(value, field) {
      var selection = field.getSelection();
      if (selection && selection.Rate) {
        this.fields.ExchangeRate.setValue(selection.Rate);
        this.fields.ExchangeRateDate.setValue(new Date(Date.now()));
      }
    },
    onExchangeRateLockedChange: function onExchangeRateLockedChange(value) {
      if (value === true) {
        this.fields.ExchangeRate.disable();
        this.fields.ExchangeRateCode.disable();
      } else {
        if (!App.canChangeOpportunityRate()) {
          this.fields.ExchangeRate.disable();
          this.fields.ExchangeRateCode.disable();
        } else {
          this.fields.ExchangeRate.enable();
          this.fields.ExchangeRateCode.enable();
        }
      }

      this.fields.ExchangeRateDate.setValue(new Date(Date.now()));
    },
    onAccountChange: function onAccountChange(value, field) {
      var selection = field.getSelection();

      // todo: match behavior in web client; if the account manager (AM) is explicitly set, it should stay, otherwise
      // it should be set to the AM for the selected account (and change each time).
      if (selection && this.insert) {
        this.fields.AccountManager.setValue(_utility['default'].getValue(selection, 'AccountManager'));
      }
    },
    createLayout: function createLayout() {
      var details = {
        title: this.detailsText,
        name: 'OpportunityDetailsEdit',
        children: [{
          label: this.opportunityText,
          name: 'Description',
          property: 'Description',
          type: 'text',
          maxTextLength: 64,
          validator: [_validator['default'].notEmpty, _validator['default'].exceedsMaxTextLength],
          autoFocus: true
        }, {
          label: this.accountText,
          name: 'Account',
          property: 'Account',
          textProperty: 'AccountName',
          type: 'lookup',
          validator: _validator['default'].exists,
          view: 'account_related',
          viewMixin: {
            disableRightDrawer: true
          }
        }, {
          label: this.acctMgrText,
          name: 'AccountManager',
          property: 'AccountManager',
          textProperty: 'UserInfo',
          textTemplate: _template['default'].nameLF,
          type: 'lookup',
          view: 'user_list'
        }, {
          label: this.resellerText,
          name: 'Reseller',
          property: 'Reseller',
          textProperty: 'AccountName',
          type: 'lookup',
          view: 'account_related',
          where: _string['default'].substitute('upper(SubType) eq "${0}"', [this.subTypePickListResellerText]),
          viewMixin: {
            disableRightDrawer: true,
            onTransitionTo: function onTransitionTo(self) {
              // Clear the initial where clause, allowing the user to search for others if they want
              self.options.where = '';
            }
          }
        }, {
          label: this.estCloseText,
          name: 'EstimatedClose',
          property: 'EstimatedClose',
          type: 'date',
          timeless: true,
          validator: _validator['default'].exists
        }, {
          label: this.potentialText,
          name: 'SalesPotential',
          property: 'SalesPotential',
          precision: 2,
          type: 'multiCurrency',
          validationTrigger: 'keyup',
          validator: _validator['default'].isCurrency
        }, {
          label: this.typeText,
          name: 'Type',
          property: 'Type',
          picklist: 'Opportunity Type',
          title: this.opportunityTypeTitleText,
          type: 'picklist',
          maxTextLength: 64,
          validator: _validator['default'].exceedsMaxTextLength
        }, {
          label: this.statusText,
          name: 'Status',
          property: 'Status',
          picklist: 'Opportunity Status',
          requireSelection: true,
          title: this.opportunityStatusTitleText,
          type: 'picklist'
        }, {
          label: this.importSourceText,
          name: 'LeadSource',
          property: 'LeadSource',
          textProperty: 'Description',
          type: 'lookup',
          view: 'leadsource_list'
        }, {
          label: this.ownerText,
          name: 'Owner',
          property: 'Owner',
          keyProperty: '$key',
          textProperty: 'OwnerDescription',
          type: 'lookup',
          validator: _validator['default'].exists,
          view: 'owner_list'
        }, {
          label: this.probabilityText,
          name: 'CloseProbability',
          property: 'CloseProbability',
          picklist: 'Opportunity Probability',
          title: this.probabilityTitleText,
          type: 'picklist',
          validator: [_validator['default'].isInt32, _validator['default'].isInteger]
        }, {
          name: 'Contacts.$resources[0].Contact.$key',
          property: 'Contacts.$resources[0].Contact.$key',
          type: 'hidden'
        }]
      };

      var multiCurrency = {
        title: this.multiCurrencyText,
        name: 'OpportunityMultiCurrencyEdit',
        children: [{
          label: this.multiCurrencyRateText,
          name: 'ExchangeRate',
          property: 'ExchangeRate',
          type: 'text',
          validator: _validator['default'].isDecimal
        }, {
          label: this.multiCurrencyCodeText,
          name: 'ExchangeRateCode',
          property: 'ExchangeRateCode',
          textProperty: '$key',
          type: 'lookup',
          view: 'exchangerate_lookup'
        }, {
          label: this.multiCurrencyLockedText,
          name: 'ExchangeRateLocked',
          property: 'ExchangeRateLocked',
          type: 'boolean'
        }, {
          label: this.multiCurrencyDateText,
          name: 'ExchangeRateDate',
          property: 'ExchangeRateDate',
          type: 'date',
          timeless: false,
          dateFormatText: this.exchangeRateDateFormatText,
          disabled: true }]
      };

      var layout = this.layout || (this.layout = []);

      if (layout.length > 0) {
        return layout;
      }

      layout.push(details);

      if (App.hasMultiCurrency()) {
        layout.push(multiCurrency);
      }

      return layout;
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Opportunity.Edit', __class);
  module.exports = __class;
});
// TODO: Create an SDK issue for this (NOT WORKING!!!)
