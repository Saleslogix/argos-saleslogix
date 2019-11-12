define('crm/Integrations/BOE/Views/Quotes/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/Utility', 'argos/Edit', 'argos/I18n', 'argos/Models/Adapter', 'argos/Dialogs/BusyIndicator', 'crm/Validator', 'crm/Models/Names', '../../Models/Names', '../../Utility'], function (module, exports, _declare, _lang, _string, _Utility, _Edit, _I18n, _Adapter, _BusyIndicator, _Validator, _Names, _Names3, _Utility3) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Adapter2 = _interopRequireDefault(_Adapter);

  var _BusyIndicator2 = _interopRequireDefault(_BusyIndicator);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Names2 = _interopRequireDefault(_Names);

  var _Names4 = _interopRequireDefault(_Names3);

  var _Utility4 = _interopRequireDefault(_Utility3);

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

  var resource = (0, _I18n2.default)('quoteEdit');
  var contactResource = (0, _I18n2.default)('contactModel');
  var dtFormatResource = (0, _I18n2.default)('quoteEditDateTimeFormat');

  /**
   * @class crm.Views.Account.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Edit
   * @requires crm.Format
   * @requires crm.Validator
   * @requires crm.Template
   *
   */
  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Quotes.Edit', [_Edit2.default], {
    // Localization
    titleText: resource.titleText,
    quoteNumberText: resource.quoteNumberText,
    orderIdText: resource.orderIdText,
    accountText: resource.accountText,
    opportunityText: resource.opportunityText,
    dateCreatedText: resource.dateCreatedText,
    erpStatusText: resource.erpStatusText,
    subTotalText: resource.subTotalText,
    grandTotalText: resource.grandTotalText,
    billToText: resource.billToText,
    shipToText: resource.shipToText,
    payFromText: resource.payFromText,
    startDateText: resource.startDateText,
    endDateText: resource.endDateText,
    expectedDeliveryDateText: resource.expectedDeliveryDateText,
    dateFormat: dtFormatResource.dateFormat,
    commentsText: resource.commentsText,
    productsText: resource.productsText,
    accountProducts: resource.accountProducts,
    requestedByText: resource.requestedByText,
    dropShipmentText: resource.dropShipmentText,
    earlyShipmentText: resource.earlyShipmentText,
    partialShipText: resource.partialShipText,
    statusText: resource.statusText,
    statusTitle: resource.statusTitle,
    typeText: resource.typeText,
    typeTitle: resource.typeTitle,
    customerRFQText: resource.customerRFQText,
    currencyText: resource.currencyText,
    billingContactText: resource.billingContactText,
    shippingContactText: resource.shippingContactText,
    accountingEntityText: resource.accountingEntityText,
    backOfficeText: resource.backOfficeText,
    accountManagerText: resource.accountManagerText,
    warehouseText: resource.warehouseText,
    warehouseLocationText: resource.warehouseLocationText,
    locationText: resource.locationText,
    locationsTitleText: resource.locationsTitleText,
    carrierText: resource.carrierText,

    // View Properties
    id: 'quote_edit',
    detailView: 'quote_detail',
    insertSecurity: 'Entities/Quote/Add',
    updateSecurity: 'Entities/Quote/Edit',
    resourceKind: 'quotes',
    opportunityOpenCode: 'Open',
    warehouseCode: 'Warehouse',
    officeCode: 'Office',
    siteCode: 'Site',
    modelName: _Names4.default.QUOTE,
    _busyIndicator: null,
    locationType: '',

    init: function init() {
      this.inherited(arguments);

      this.connect(this.fields.Account, 'onChange', this.onAccountChange);
      this.connect(this.fields.RequestedBy, 'onChange', this.onContactChange);
      this.connect(this.fields.Opportunity, 'onChange', this.onOpportunityChange);
      this.connect(this.fields.BillTo, 'onChange', this.onBillToChange);
      this.connect(this.fields.ShipTo, 'onChange', this.onShipToChange);
      this.connect(this.fields.BackOffice, 'onChange', this.onBackOfficeChange);
      this.connect(this.fields.BackOfficeAccountingEntity, 'onChange', this.onBackOfficeAccountingEntityChange);
      this.connect(this.fields.Location, 'onChange', this.onLocationChange);
      this.connect(this.fields.Warehouse, 'onChange', this.onWarehouseChange);
      if (!this.locationType) {
        this.locationType = App.context.integrationSettings && App.context.integrationSettings['Back Office Extension'] && App.context.integrationSettings['Back Office Extension']['Type of Order Location'] || '';
      }
      if (this.locationType === 'Warehouse') {
        this.fields.Location.hide();
        this.fields.Warehouse.show();
      } else if (this.locationType !== 'Warehouse') {
        this.fields.Location.show();
        this.fields.Warehouse.hide();
      }
    },
    insert: function insert() {
      this.showUnpromotedFields();
      this.fields.Location.show();
      this.fields.Warehouse.show();
      this.inherited(arguments);
    },
    isQuoteClosed: function isQuoteClosed() {
      return this.entry && this.entry.IsClosed;
    },
    processData: function processData() {
      this.showBusy();
      this.inherited(arguments);
      this.getEntriesFromIds();
      if (this.isQuoteClosed()) {
        App.bars.tbar.disableTool('save');
      } else {
        App.bars.tbar.enableTool('save');
      }
    },
    beforeTransitionTo: function beforeTransitionTo() {
      this.inherited(arguments);
      this.hideUnpromotedFields();
      if (!this.fields.AccountManager.isDisabled) {
        this.fields.AccountManager.disable();
      }
      if (this.fields.BillTo.isDisabled && this.fields.ShipTo.isDisabled) {
        this.fields.BillTo.enable();
        this.fields.ShipTo.enable();
      }
    },
    disableBackOfficeData: function disableBackOfficeData() {
      this.fields.BackOffice.disable();
      this.fields.BackOfficeAccountingEntity.disable();
    },
    enableBackOfficeData: function enableBackOfficeData() {
      this.fields.BackOffice.enable();
      this.fields.BackOfficeAccountingEntity.enable();
    },
    convertValues: function convertValues(values) {
      if (values.BillTo) {
        values.BillTo = {
          $key: values.BillTo.$key
        };
      }
      if (values.ShipTo) {
        values.ShipTo = {
          $key: values.ShipTo.$key
        };
      }
      return values;
    },
    processEntry: function processEntry(entry) {
      var _this = this;

      this.inherited(arguments);
      if (entry && entry.Account) {
        ['RequestedBy', 'Opportunity'].forEach(function (f) {
          _this.fields[f].dependsOn = 'Account';
          _this.fields[f].where = 'Account.Id eq "' + (entry.Account.AccountId || entry.Account.$key || entry.Account.key) + '"';
          if (f === 'Opportunity') {
            _this.fields[f].where = _this.fields[f].where + ' and Status eq "' + _this.opportunityOpenCode + '"';
          }
        });
      }
      var warehouseField = this.fields.Warehouse;
      var locationField = this.fields.Location;
      if (entry && entry.ErpLogicalId) {
        warehouseField.enable();
        warehouseField.dependsOn = 'ErpLogicalId';
        warehouseField.where = function (logicalId) {
          return 'ErpLogicalId eq "' + logicalId + '" and LocationType eq "' + _this.warehouseCode + '"';
        };
        locationField.enable();
        locationField.dependsOn = 'ErpLogicalId';
        locationField.where = function (logicalId) {
          return 'ErpLogicalId eq "' + logicalId + '" and (LocationType eq "' + _this.officeCode + '" or LocationType eq "' + _this.siteCode + '")';
        };
      } else {
        warehouseField.disable();
        locationField.disable();
      }
      if (entry.Warehouse) {
        warehouseField.setValue(entry.Warehouse);
      }
      if (entry.Location) {
        locationField.setValue(entry.Location);
      }
      if (entry && entry.ErpExtId) {
        this.disableBackOfficeData();
      } else {
        this.enableBackOfficeData();
      }
      return entry;
    },
    setValues: function setValues() {
      this.inherited(arguments);

      if (!this.fields.CurrencyCode.getValue()) {
        var account = this.fields.Account.currentSelection;
        if (account && account.CurrencyCode) {
          this.fields.CurrencyCode.setValue(account.CurrencyCode);
        } else {
          this.fields.CurrencyCode.setValue(App.getBaseExchangeRate().code);
        }
      }
    },
    onRefresh: function onRefresh() {
      var _this2 = this;

      this.inherited(arguments);
      ['RequestedBy', 'Opportunity', 'BackOfficeAccountingEntity', 'Warehouse', 'Location'].forEach(function (f) {
        _this2.fields[f].dependsOn = null;
        _this2.fields[f].where = null;
      });
    },
    onRefreshInsert: function onRefreshInsert() {
      this.inherited(arguments);
      this.enableBackOfficeData();
    },
    getEntriesFromIds: function getEntriesFromIds() {
      var _this3 = this;

      var mappedLookups = ['BackOffice', 'BackOfficeAccountingEntity'];
      var mappedProperties = ['LogicalId', 'AcctEntityExtId'];
      var fields = ['ErpLogicalId', 'ErpAccountingEntityId'];
      _Utility4.default.setFieldsFromIds(mappedLookups, mappedProperties, fields, this).then(function () {
        _this3.hideBusy();
      });
    },
    getPrimaryContact: function getPrimaryContact(entry) {
      var _this4 = this;

      var accountModel = _Adapter2.default.getModel(_Names2.default.ACCOUNT);
      var relationship = {
        name: 'Contacts',
        displayName: contactResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Contact',
        relatedProperty: 'Account',
        relatedPropertyType: 'object',
        where: 'IsPrimary eq true'
      };
      accountModel.getRelatedRequest(entry, relationship).then(function (result) {
        if (result && result.entities && result.entities.length) {
          var contactField = _this4.fields.RequestedBy;
          if (!contactField.currentSelection || contactField.currentSelection.Account && contactField.currentSelection.Account.$key !== entry.$key) {
            contactField.setSelection(result.entities[0]);
            if (_this4.fields.Account.currentSelection && !_this4.fields.Account.currentSelection.ErpExtId) {
              _this4.populateUnpromotedFields(contactField.currentSelection);
            }
          }
        }
      });
    },
    hidePromotedFields: function hidePromotedFields() {
      this.fields.BillTo.hide();
      this.fields.ShipTo.hide();
    },
    hideUnpromotedFields: function hideUnpromotedFields() {
      this.fields.BillingContact.hide();
      this.fields.ShippingContact.hide();
    },
    populateUnpromotedFields: function populateUnpromotedFields(contact) {
      this.fields.BillingContact.setSelection(contact);
      this.fields.ShippingContact.setSelection(contact);
    },
    onAccountChange: function onAccountChange(value, field) {
      var _this5 = this;

      var entry = field.currentSelection;
      ['RequestedBy', 'Opportunity'].forEach(function (f) {
        if (value) {
          _this5.fields[f].dependsOn = 'Account';
          _this5.fields[f].where = 'Account.Id eq "' + (value.AccountId || value.$key || value.key) + '"';
          if (f === 'Opportunity') {
            _this5.fields[f].where = _this5.fields[f].where + ' and Status eq "' + _this5.opportunityOpenCode + '"';
          }
        }
      });
      if (entry) {
        this.fields.CurrencyCode.setValue(entry.CurrencyCode ? entry.CurrencyCode : App.getBaseExchangeRate().code);
        if (this.fields.BillTo.isDisabled() && this.fields.ShipTo.isDisabled()) {
          this.fields.BillTo.enable();
          this.fields.ShipTo.enable();
        }
        if (entry.ErpExtId) {
          this.showPromotedFields();
        } else {
          this.hidePromotedFields();
        }
        if (entry.AccountManager) {
          var accountManagerField = this.fields.AccountManager;
          accountManagerField.setSelection({
            $key: entry.AccountManager.$key
          });
        }
        field.setValue(field.currentSelection);
        this.showBusy();
        this.getPrimaryContact(entry);
        _Utility4.default.setFieldsFromIds(['BackOffice', 'BackOfficeAccountingEntity'], ['LogicalId', 'AcctEntityExtId'], ['ErpLogicalId', 'ErpAccountingEntityId'], this, entry).then(function () {
          _this5.hideBusy();
        });
      }
    },
    onAccountDependentChange: function onAccountDependentChange(value, field) {
      if (value && !field.dependsOn && field.currentSelection && field.currentSelection.Account) {
        var accountField = this.fields.Account;
        accountField.setSelection(field.currentSelection.Account);
        this.onAccountChange(accountField.getValue(), accountField);
      }
    },
    onBackOfficeChange: function onBackOfficeChange(value, field) {
      var _this6 = this;

      this.fields.BackOffice.setValue(field.currentSelection);
      this.fields.ErpLogicalId.setValue(field.currentSelection.LogicalId);
      var accountingField = this.fields.BackOfficeAccountingEntity;
      accountingField.where = 'BackOffice.Id eq "' + field.currentSelection.$key + '"';
      var accountingIsToBackOffice = accountingField.currentSelection && accountingField.currentSelection.BackOffice.$key === field.currentSelection.$key;
      if (field.currentSelection.BackOfficeAccountingEntities.$resources && !accountingIsToBackOffice) {
        var entry = field.currentSelection.BackOfficeAccountingEntities.$resources[0];
        if (entry) {
          accountingField.setSelection(entry);
          this.onBackOfficeAccountingEntityChange(accountingField.getValue(), accountingField);
        }
      }
      var warehouseField = this.fields.Warehouse;
      if (warehouseField.isDisabled) {
        warehouseField.enable();
        warehouseField.dependsOn = 'ErpLogicalId';
        warehouseField.where = function (logicalId) {
          return 'ErpLogicalId eq "' + logicalId + '" and LocationType eq "' + _this6.warehouseCode + '"';
        };
      }
      var locationField = this.fields.Location;
      if (locationField.isDisabled) {
        locationField.enable();
        locationField.dependsOn = 'ErpLogicalId';
        locationField.where = function (logicalId) {
          return 'ErpLogicalId eq "' + logicalId + '" and (LocationType eq "' + _this6.officeCode + '" or LocationType eq "' + _this6.siteCode + '")';
        };
      }
    },
    onBackOfficeAccountingEntityChange: function onBackOfficeAccountingEntityChange(value, field) {
      this.fields.BackOfficeAccountingEntity.setValue(field.currentSelection);
      this.fields.ErpAccountingEntityId.setValue(field.currentSelection.AcctEntityExtId);
    },
    onBillToChange: function onBillToChange(value, field) {
      this.fields.BillTo.setValue(field.currentSelection);
    },
    onContactChange: function onContactChange(value, field) {
      this.onAccountDependentChange(value, field);
    },
    onLocationChange: function onLocationChance(value, field) {
      if (field.currentSelection.ErpExtId) {
        this.fields.ErpLocation.setValue(field.currentSelection.ErpExtId);
      }
      this.fields.Location.setValue(field.currentSelection);
    },
    onOpportunityChange: function onOpportunityChange(value, field) {
      this.onAccountDependentChange(value, field);
    },
    onShipToChange: function onShipToChange(value, field) {
      this.fields.ShipTo.setValue(field.currentSelection);
    },
    onWarehouseChange: function onWarehouseChange(value, field) {
      this.fields.Warehouse.setValue(field.currentSelection);
      this.fields.Location.setValue(field.currentSelection);
    },
    applyContext: function applyContext() {
      this.inherited(arguments);
      var found = this._getNavContext();

      var accountField = this.fields.Account;
      this.onAccountChange(accountField.getValue(), accountField);

      var context = found && found.options && found.options.source || found;
      var lookup = {
        accounts: this.applyAccountContext,
        contacts: this.applyContactContext,
        opportunities: this.applyOpportunityContext
      };

      if (context && lookup[context.resourceKind]) {
        lookup[context.resourceKind].call(this, context);
      }

      if (!this.fields.Account.currentSelection && !this.fields.Account.currentValue) {
        this.fields.BillTo.disable();
        this.fields.ShipTo.disable();
      }
      if (!this.fields.BackOffice.currentSelection) {
        this.fields.Location.disable();
        this.fields.Warehouse.disable();
      }
    },
    _getNavContext: function _getNavContext() {
      var navContext = App.queryNavigationContext(function (o) {
        var context = o.options && o.options.source || o;

        if (/^(accounts|contacts|opportunities)$/.test(context.resourceKind) && context.key) {
          return true;
        }

        return false;
      });
      return navContext;
    },
    applyAccountContext: function applyAccountContext(context) {
      var view = App.getView(context.id);
      var entry = context.entry || view && view.entry || context;

      if (!entry || !entry.$key) {
        return;
      }

      var accountField = this.fields.Account;
      accountField.setSelection(entry);
      this.onAccountChange(accountField.getValue(), accountField);
    },
    applyContactContext: function applyContactContext(context) {
      var view = App.getView(context.id);
      var entry = context.entry || view && view.entry || context;

      if (!entry || !entry.$key) {
        return;
      }

      var contactField = this.fields.RequestedBy;
      contactField.setSelection(entry);
      this.onAccountDependentChange(contactField.getValue(), contactField);
    },
    applyOpportunityContext: function applyOpportunityContext(context) {
      var view = App.getView(context.id);
      var entry = context.entry || view && view.entry || context;

      if (!entry || !entry.$key) {
        return;
      }

      var opportunityField = this.fields.Opportunity;
      opportunityField.setSelection(entry);
      this.onAccountDependentChange(opportunityField.getValue(), opportunityField);
    },
    hideBusy: function hideBusy() {
      if (this._busyIndicator) {
        this._busyIndicator.complete();
        App.modal.disableClose = false;
        App.modal.hide();
      }
    },
    showBusy: function showBusy() {
      if (!this._busyIndicator || this._busyIndicator._destroyed) {
        this._busyIndicator = new _BusyIndicator2.default({ id: this.id + '-busyIndicator' });
      }
      this._busyIndicator.start();
      App.modal.disableClose = true;
      App.modal.showToolbar = false;
      App.modal.add(this._busyIndicator);
    },
    showPromotedFields: function showPromotedFields() {
      this.fields.BillTo.show();
      this.fields.ShipTo.show();
    },
    showUnpromotedFields: function showUnpromotedFields() {
      this.fields.BillingContact.show();
      this.fields.ShippingContact.show();
    },
    formatDependentQuery: function formatDependentQuery(dependentValue, theFormat, property) {
      return _string2.default.substitute(theFormat, [_Utility2.default.getValue(dependentValue, property || '$key')]);
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.accountText,
          name: 'Account',
          property: 'Account',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'AccountName',
          view: 'account_related',
          autoFocus: true,
          required: true
        }, {
          label: this.opportunityText,
          name: 'Opportunity',
          property: 'Opportunity',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Description',
          view: 'opportunity_related',
          where: 'Status eq "' + this.opportunityOpenCode + '"'
        }, {
          label: this.backOfficeText,
          name: 'BackOffice',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'BackOfficeName',
          view: 'quote_backoffice_related',
          where: 'IsActive eq true',
          include: false
        }, {
          name: 'ErpLogicalId',
          property: 'ErpLogicalId',
          type: 'hidden',
          emptyText: ''
        }, {
          label: this.accountingEntityText,
          name: 'BackOfficeAccountingEntity',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Name',
          view: 'quote_backofficeaccountingentity_related',
          include: false
        }, {
          name: 'ErpAccountingEntityId',
          property: 'ErpAccountingEntityId',
          type: 'hidden',
          emptyText: ''
        }, {
          label: this.currencyText,
          name: 'CurrencyCode',
          property: 'CurrencyCode',
          type: 'picklist',
          picklist: 'Currency Codes',
          singleSelect: true,
          textProperty: 'code',
          keyProperty: 'code'
        }, {
          label: this.startDateText,
          name: 'StartDate',
          property: 'StartDate',
          type: 'date',
          timeless: false,
          showTimePicker: true,
          showRelativeDateTime: false,
          dateFormatText: this.dateFormat,
          minValue: new Date(1900, 0, 1),
          validator: [_Validator2.default.isDateInRange]
        }, {
          label: this.endDateText,
          name: 'EndDate',
          property: 'EndDate',
          type: 'date',
          timeless: false,
          showTimePicker: true,
          showRelativeDateTime: false,
          dateFormatText: this.dateFormat,
          minValue: new Date(1900, 0, 1),
          validator: [_Validator2.default.isDateInRange]
        }, {
          label: this.expectedDeliveryDateText,
          name: 'ExpectedDeliveryDate',
          property: 'ExpectedDeliveryDate',
          type: 'date',
          timeless: false,
          showTimePicker: true,
          showRelativeDateTime: false,
          dateFormatText: this.dateFormat,
          minValue: new Date(1900, 0, 1),
          validator: [_Validator2.default.isDateInRange]
        }, {
          label: this.customerRFQText,
          name: 'CustomerRFQNumber',
          property: 'CustomerRFQNumber',
          type: 'text'
        }, {
          label: this.commentsText, // TODO: Make on save, append 'Created by <user> on <datetime>' to comment
          noteProperty: false,
          name: 'Comments',
          property: 'Comments',
          title: this.commentsText,
          type: 'note',
          view: 'text_edit'
        }, {
          label: this.locationText,
          name: 'Location',
          property: 'Location',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Description',
          view: 'quote_location_list',
          title: this.locationsTitleText
        }, {
          name: 'ErpLocation',
          property: 'ErpLocation',
          type: 'hidden',
          emptyText: ''
        }, {
          label: this.warehouseText,
          name: 'Warehouse',
          property: 'Warehouse',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Description',
          view: 'quote_warehouse_list',
          title: this.warehouseLocationText
        }, {
          label: this.requestedByText,
          name: 'RequestedBy',
          property: 'RequestedBy',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'NameLF',
          view: 'contact_related'
        }, {
          label: this.statusText,
          name: 'Quote Status',
          property: 'Status',
          type: 'picklist',
          picklist: 'ErpQuoteStatus',
          singleSelect: true,
          titleText: this.statusTitle
        }, {
          dependsOn: 'Account',
          label: this.billToText,
          name: 'BillTo',
          property: 'BillTo',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Address.FullAddress',
          view: 'quote_billTos_related',
          where: this.formatDependentQuery.bindDelegate(this, 'ErpBillToAccounts.Account.Id eq "${0}"')
        }, {
          dependsOn: 'Account',
          label: this.billingContactText,
          name: 'BillingContact',
          property: 'BillingContact',
          type: 'lookup'
        }, {
          dependsOn: 'Account',
          label: this.shipToText,
          name: 'ShipTo',
          property: 'ShipTo',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Address.FullAddress',
          view: 'quote_shipTos_related',
          where: this.formatDependentQuery.bindDelegate(this, 'ErpShipToAccounts.Account.Id eq "${0}"')
        }, {
          dependsOn: 'ErpLogicalId',
          label: this.carrierText,
          name: 'Carrier',
          property: 'Carrier',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'CarrierName',
          view: 'quote_carriers',
          where: function where(value) {
            return 'ErpLogicalId eq "' + value + '"';
          }
        }, {
          dependsOn: 'Account',
          label: this.shippingContactText,
          name: 'ShippingContact',
          property: 'ShippingContact',
          type: 'lookup'
        }, {
          label: this.dropShipmentText,
          name: 'DropShipment',
          property: 'DropShip',
          include: true,
          type: 'boolean',
          onText: this.yesText,
          offText: this.noText
        }, {
          label: this.earlyShipmentText,
          name: 'EarlyShipment',
          property: 'ShipEarly',
          include: true,
          type: 'boolean',
          onText: this.yesText,
          offText: this.noText
        }, {
          label: this.partialShipText,
          name: 'PartialShipment',
          property: 'PartialShip',
          include: true,
          type: 'boolean',
          onText: this.yesText,
          offText: this.noText
        }, {
          label: this.accountManagerText,
          name: 'AccountManager',
          property: 'AccountManager',
          include: true,
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Name'
        }] }]);
    }
  });

  _lang2.default.setObject('icboe.Views.Quotes.Edit', __class);
  _lang2.default.setObject('icboe.Views.Quotes.Edit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3Rlcy9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiY29udGFjdFJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJxdW90ZU51bWJlclRleHQiLCJvcmRlcklkVGV4dCIsImFjY291bnRUZXh0Iiwib3Bwb3J0dW5pdHlUZXh0IiwiZGF0ZUNyZWF0ZWRUZXh0IiwiZXJwU3RhdHVzVGV4dCIsInN1YlRvdGFsVGV4dCIsImdyYW5kVG90YWxUZXh0IiwiYmlsbFRvVGV4dCIsInNoaXBUb1RleHQiLCJwYXlGcm9tVGV4dCIsInN0YXJ0RGF0ZVRleHQiLCJlbmREYXRlVGV4dCIsImV4cGVjdGVkRGVsaXZlcnlEYXRlVGV4dCIsImRhdGVGb3JtYXQiLCJjb21tZW50c1RleHQiLCJwcm9kdWN0c1RleHQiLCJhY2NvdW50UHJvZHVjdHMiLCJyZXF1ZXN0ZWRCeVRleHQiLCJkcm9wU2hpcG1lbnRUZXh0IiwiZWFybHlTaGlwbWVudFRleHQiLCJwYXJ0aWFsU2hpcFRleHQiLCJzdGF0dXNUZXh0Iiwic3RhdHVzVGl0bGUiLCJ0eXBlVGV4dCIsInR5cGVUaXRsZSIsImN1c3RvbWVyUkZRVGV4dCIsImN1cnJlbmN5VGV4dCIsImJpbGxpbmdDb250YWN0VGV4dCIsInNoaXBwaW5nQ29udGFjdFRleHQiLCJhY2NvdW50aW5nRW50aXR5VGV4dCIsImJhY2tPZmZpY2VUZXh0IiwiYWNjb3VudE1hbmFnZXJUZXh0Iiwid2FyZWhvdXNlVGV4dCIsIndhcmVob3VzZUxvY2F0aW9uVGV4dCIsImxvY2F0aW9uVGV4dCIsImxvY2F0aW9uc1RpdGxlVGV4dCIsImNhcnJpZXJUZXh0IiwiaWQiLCJkZXRhaWxWaWV3IiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInJlc291cmNlS2luZCIsIm9wcG9ydHVuaXR5T3BlbkNvZGUiLCJ3YXJlaG91c2VDb2RlIiwib2ZmaWNlQ29kZSIsInNpdGVDb2RlIiwibW9kZWxOYW1lIiwiUVVPVEUiLCJfYnVzeUluZGljYXRvciIsImxvY2F0aW9uVHlwZSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiQWNjb3VudCIsIm9uQWNjb3VudENoYW5nZSIsIlJlcXVlc3RlZEJ5Iiwib25Db250YWN0Q2hhbmdlIiwiT3Bwb3J0dW5pdHkiLCJvbk9wcG9ydHVuaXR5Q2hhbmdlIiwiQmlsbFRvIiwib25CaWxsVG9DaGFuZ2UiLCJTaGlwVG8iLCJvblNoaXBUb0NoYW5nZSIsIkJhY2tPZmZpY2UiLCJvbkJhY2tPZmZpY2VDaGFuZ2UiLCJCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eSIsIm9uQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlDaGFuZ2UiLCJMb2NhdGlvbiIsIm9uTG9jYXRpb25DaGFuZ2UiLCJXYXJlaG91c2UiLCJvbldhcmVob3VzZUNoYW5nZSIsIkFwcCIsImNvbnRleHQiLCJpbnRlZ3JhdGlvblNldHRpbmdzIiwiaGlkZSIsInNob3ciLCJpbnNlcnQiLCJzaG93VW5wcm9tb3RlZEZpZWxkcyIsImlzUXVvdGVDbG9zZWQiLCJlbnRyeSIsIklzQ2xvc2VkIiwicHJvY2Vzc0RhdGEiLCJzaG93QnVzeSIsImdldEVudHJpZXNGcm9tSWRzIiwiYmFycyIsInRiYXIiLCJkaXNhYmxlVG9vbCIsImVuYWJsZVRvb2wiLCJiZWZvcmVUcmFuc2l0aW9uVG8iLCJoaWRlVW5wcm9tb3RlZEZpZWxkcyIsIkFjY291bnRNYW5hZ2VyIiwiaXNEaXNhYmxlZCIsImRpc2FibGUiLCJlbmFibGUiLCJkaXNhYmxlQmFja09mZmljZURhdGEiLCJlbmFibGVCYWNrT2ZmaWNlRGF0YSIsImNvbnZlcnRWYWx1ZXMiLCJ2YWx1ZXMiLCIka2V5IiwicHJvY2Vzc0VudHJ5IiwiZm9yRWFjaCIsImYiLCJkZXBlbmRzT24iLCJ3aGVyZSIsIkFjY291bnRJZCIsImtleSIsIndhcmVob3VzZUZpZWxkIiwibG9jYXRpb25GaWVsZCIsIkVycExvZ2ljYWxJZCIsImxvZ2ljYWxJZCIsInNldFZhbHVlIiwiRXJwRXh0SWQiLCJzZXRWYWx1ZXMiLCJDdXJyZW5jeUNvZGUiLCJnZXRWYWx1ZSIsImFjY291bnQiLCJjdXJyZW50U2VsZWN0aW9uIiwiZ2V0QmFzZUV4Y2hhbmdlUmF0ZSIsImNvZGUiLCJvblJlZnJlc2giLCJvblJlZnJlc2hJbnNlcnQiLCJtYXBwZWRMb29rdXBzIiwibWFwcGVkUHJvcGVydGllcyIsInNldEZpZWxkc0Zyb21JZHMiLCJ0aGVuIiwiaGlkZUJ1c3kiLCJnZXRQcmltYXJ5Q29udGFjdCIsImFjY291bnRNb2RlbCIsImdldE1vZGVsIiwiQUNDT1VOVCIsInJlbGF0aW9uc2hpcCIsIm5hbWUiLCJkaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwidHlwZSIsInJlbGF0ZWRFbnRpdHkiLCJyZWxhdGVkUHJvcGVydHkiLCJyZWxhdGVkUHJvcGVydHlUeXBlIiwiZ2V0UmVsYXRlZFJlcXVlc3QiLCJyZXN1bHQiLCJlbnRpdGllcyIsImxlbmd0aCIsImNvbnRhY3RGaWVsZCIsInNldFNlbGVjdGlvbiIsInBvcHVsYXRlVW5wcm9tb3RlZEZpZWxkcyIsImhpZGVQcm9tb3RlZEZpZWxkcyIsIkJpbGxpbmdDb250YWN0IiwiU2hpcHBpbmdDb250YWN0IiwiY29udGFjdCIsInZhbHVlIiwiZmllbGQiLCJzaG93UHJvbW90ZWRGaWVsZHMiLCJhY2NvdW50TWFuYWdlckZpZWxkIiwib25BY2NvdW50RGVwZW5kZW50Q2hhbmdlIiwiYWNjb3VudEZpZWxkIiwiTG9naWNhbElkIiwiYWNjb3VudGluZ0ZpZWxkIiwiYWNjb3VudGluZ0lzVG9CYWNrT2ZmaWNlIiwiQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcyIsIiRyZXNvdXJjZXMiLCJFcnBBY2NvdW50aW5nRW50aXR5SWQiLCJBY2N0RW50aXR5RXh0SWQiLCJvbkxvY2F0aW9uQ2hhbmNlIiwiRXJwTG9jYXRpb24iLCJhcHBseUNvbnRleHQiLCJmb3VuZCIsIl9nZXROYXZDb250ZXh0Iiwib3B0aW9ucyIsInNvdXJjZSIsImxvb2t1cCIsImFjY291bnRzIiwiYXBwbHlBY2NvdW50Q29udGV4dCIsImNvbnRhY3RzIiwiYXBwbHlDb250YWN0Q29udGV4dCIsIm9wcG9ydHVuaXRpZXMiLCJhcHBseU9wcG9ydHVuaXR5Q29udGV4dCIsImNhbGwiLCJjdXJyZW50VmFsdWUiLCJuYXZDb250ZXh0IiwicXVlcnlOYXZpZ2F0aW9uQ29udGV4dCIsIm8iLCJ0ZXN0IiwidmlldyIsImdldFZpZXciLCJvcHBvcnR1bml0eUZpZWxkIiwiY29tcGxldGUiLCJtb2RhbCIsImRpc2FibGVDbG9zZSIsIl9kZXN0cm95ZWQiLCJzdGFydCIsInNob3dUb29sYmFyIiwiYWRkIiwiZm9ybWF0RGVwZW5kZW50UXVlcnkiLCJkZXBlbmRlbnRWYWx1ZSIsInRoZUZvcm1hdCIsInByb3BlcnR5Iiwic3Vic3RpdHV0ZSIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInRpdGxlIiwiZGV0YWlsc1RleHQiLCJjaGlsZHJlbiIsImxhYmVsIiwiZW1wdHlUZXh0IiwidmFsdWVUZXh0UHJvcGVydHkiLCJhdXRvRm9jdXMiLCJyZXF1aXJlZCIsImluY2x1ZGUiLCJwaWNrbGlzdCIsInNpbmdsZVNlbGVjdCIsInRleHRQcm9wZXJ0eSIsImtleVByb3BlcnR5IiwidGltZWxlc3MiLCJzaG93VGltZVBpY2tlciIsInNob3dSZWxhdGl2ZURhdGVUaW1lIiwiZGF0ZUZvcm1hdFRleHQiLCJtaW5WYWx1ZSIsIkRhdGUiLCJ2YWxpZGF0b3IiLCJpc0RhdGVJblJhbmdlIiwibm90ZVByb3BlcnR5IiwiYmluZERlbGVnYXRlIiwib25UZXh0IiwieWVzVGV4dCIsIm9mZlRleHQiLCJub1RleHQiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNQSxXQUFXLG9CQUFZ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Q3ZPLE9BQTFDO29CQUNlQSxPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBBZGFwdGVyIGZyb20gJ2FyZ29zL01vZGVscy9BZGFwdGVyJztcclxuaW1wb3J0IEJ1c3lJbmRpY2F0b3IgZnJvbSAnYXJnb3MvRGlhbG9ncy9CdXN5SW5kaWNhdG9yJztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICdjcm0vVmFsaWRhdG9yJztcclxuaW1wb3J0IENSTV9NT0RFTF9OQU1FUyBmcm9tICdjcm0vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBVdGlsaXR5IGZyb20gJy4uLy4uL1V0aWxpdHknO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncXVvdGVFZGl0Jyk7XHJcbmNvbnN0IGNvbnRhY3RSZXNvdXJjZSA9IGdldFJlc291cmNlKCdjb250YWN0TW9kZWwnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdxdW90ZUVkaXREYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWNjb3VudC5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkVkaXRcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5WYWxpZGF0b3JcclxuICogQHJlcXVpcmVzIGNybS5UZW1wbGF0ZVxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlF1b3Rlcy5FZGl0JywgW0VkaXRdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgcXVvdGVOdW1iZXJUZXh0OiByZXNvdXJjZS5xdW90ZU51bWJlclRleHQsXHJcbiAgb3JkZXJJZFRleHQ6IHJlc291cmNlLm9yZGVySWRUZXh0LFxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBvcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICBkYXRlQ3JlYXRlZFRleHQ6IHJlc291cmNlLmRhdGVDcmVhdGVkVGV4dCxcclxuICBlcnBTdGF0dXNUZXh0OiByZXNvdXJjZS5lcnBTdGF0dXNUZXh0LFxyXG4gIHN1YlRvdGFsVGV4dDogcmVzb3VyY2Uuc3ViVG90YWxUZXh0LFxyXG4gIGdyYW5kVG90YWxUZXh0OiByZXNvdXJjZS5ncmFuZFRvdGFsVGV4dCxcclxuICBiaWxsVG9UZXh0OiByZXNvdXJjZS5iaWxsVG9UZXh0LFxyXG4gIHNoaXBUb1RleHQ6IHJlc291cmNlLnNoaXBUb1RleHQsXHJcbiAgcGF5RnJvbVRleHQ6IHJlc291cmNlLnBheUZyb21UZXh0LFxyXG4gIHN0YXJ0RGF0ZVRleHQ6IHJlc291cmNlLnN0YXJ0RGF0ZVRleHQsXHJcbiAgZW5kRGF0ZVRleHQ6IHJlc291cmNlLmVuZERhdGVUZXh0LFxyXG4gIGV4cGVjdGVkRGVsaXZlcnlEYXRlVGV4dDogcmVzb3VyY2UuZXhwZWN0ZWREZWxpdmVyeURhdGVUZXh0LFxyXG4gIGRhdGVGb3JtYXQ6IGR0Rm9ybWF0UmVzb3VyY2UuZGF0ZUZvcm1hdCxcclxuICBjb21tZW50c1RleHQ6IHJlc291cmNlLmNvbW1lbnRzVGV4dCxcclxuICBwcm9kdWN0c1RleHQ6IHJlc291cmNlLnByb2R1Y3RzVGV4dCxcclxuICBhY2NvdW50UHJvZHVjdHM6IHJlc291cmNlLmFjY291bnRQcm9kdWN0cyxcclxuICByZXF1ZXN0ZWRCeVRleHQ6IHJlc291cmNlLnJlcXVlc3RlZEJ5VGV4dCxcclxuICBkcm9wU2hpcG1lbnRUZXh0OiByZXNvdXJjZS5kcm9wU2hpcG1lbnRUZXh0LFxyXG4gIGVhcmx5U2hpcG1lbnRUZXh0OiByZXNvdXJjZS5lYXJseVNoaXBtZW50VGV4dCxcclxuICBwYXJ0aWFsU2hpcFRleHQ6IHJlc291cmNlLnBhcnRpYWxTaGlwVGV4dCxcclxuICBzdGF0dXNUZXh0OiByZXNvdXJjZS5zdGF0dXNUZXh0LFxyXG4gIHN0YXR1c1RpdGxlOiByZXNvdXJjZS5zdGF0dXNUaXRsZSxcclxuICB0eXBlVGV4dDogcmVzb3VyY2UudHlwZVRleHQsXHJcbiAgdHlwZVRpdGxlOiByZXNvdXJjZS50eXBlVGl0bGUsXHJcbiAgY3VzdG9tZXJSRlFUZXh0OiByZXNvdXJjZS5jdXN0b21lclJGUVRleHQsXHJcbiAgY3VycmVuY3lUZXh0OiByZXNvdXJjZS5jdXJyZW5jeVRleHQsXHJcbiAgYmlsbGluZ0NvbnRhY3RUZXh0OiByZXNvdXJjZS5iaWxsaW5nQ29udGFjdFRleHQsXHJcbiAgc2hpcHBpbmdDb250YWN0VGV4dDogcmVzb3VyY2Uuc2hpcHBpbmdDb250YWN0VGV4dCxcclxuICBhY2NvdW50aW5nRW50aXR5VGV4dDogcmVzb3VyY2UuYWNjb3VudGluZ0VudGl0eVRleHQsXHJcbiAgYmFja09mZmljZVRleHQ6IHJlc291cmNlLmJhY2tPZmZpY2VUZXh0LFxyXG4gIGFjY291bnRNYW5hZ2VyVGV4dDogcmVzb3VyY2UuYWNjb3VudE1hbmFnZXJUZXh0LFxyXG4gIHdhcmVob3VzZVRleHQ6IHJlc291cmNlLndhcmVob3VzZVRleHQsXHJcbiAgd2FyZWhvdXNlTG9jYXRpb25UZXh0OiByZXNvdXJjZS53YXJlaG91c2VMb2NhdGlvblRleHQsXHJcbiAgbG9jYXRpb25UZXh0OiByZXNvdXJjZS5sb2NhdGlvblRleHQsXHJcbiAgbG9jYXRpb25zVGl0bGVUZXh0OiByZXNvdXJjZS5sb2NhdGlvbnNUaXRsZVRleHQsXHJcbiAgY2FycmllclRleHQ6IHJlc291cmNlLmNhcnJpZXJUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3F1b3RlX2VkaXQnLFxyXG4gIGRldGFpbFZpZXc6ICdxdW90ZV9kZXRhaWwnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvUXVvdGUvQWRkJyxcclxuICB1cGRhdGVTZWN1cml0eTogJ0VudGl0aWVzL1F1b3RlL0VkaXQnLFxyXG4gIHJlc291cmNlS2luZDogJ3F1b3RlcycsXHJcbiAgb3Bwb3J0dW5pdHlPcGVuQ29kZTogJ09wZW4nLFxyXG4gIHdhcmVob3VzZUNvZGU6ICdXYXJlaG91c2UnLFxyXG4gIG9mZmljZUNvZGU6ICdPZmZpY2UnLFxyXG4gIHNpdGVDb2RlOiAnU2l0ZScsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5RVU9URSxcclxuICBfYnVzeUluZGljYXRvcjogbnVsbCxcclxuICBsb2NhdGlvblR5cGU6ICcnLFxyXG5cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQWNjb3VudCwgJ29uQ2hhbmdlJywgdGhpcy5vbkFjY291bnRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlJlcXVlc3RlZEJ5LCAnb25DaGFuZ2UnLCB0aGlzLm9uQ29udGFjdENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuT3Bwb3J0dW5pdHksICdvbkNoYW5nZScsIHRoaXMub25PcHBvcnR1bml0eUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQmlsbFRvLCAnb25DaGFuZ2UnLCB0aGlzLm9uQmlsbFRvQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5TaGlwVG8sICdvbkNoYW5nZScsIHRoaXMub25TaGlwVG9DaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkJhY2tPZmZpY2UsICdvbkNoYW5nZScsIHRoaXMub25CYWNrT2ZmaWNlQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eSwgJ29uQ2hhbmdlJywgdGhpcy5vbkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5Mb2NhdGlvbiwgJ29uQ2hhbmdlJywgdGhpcy5vbkxvY2F0aW9uQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5XYXJlaG91c2UsICdvbkNoYW5nZScsIHRoaXMub25XYXJlaG91c2VDaGFuZ2UpO1xyXG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uVHlwZSkge1xyXG4gICAgICB0aGlzLmxvY2F0aW9uVHlwZSA9IEFwcC5jb250ZXh0LmludGVncmF0aW9uU2V0dGluZ3MgJiYgQXBwLmNvbnRleHQuaW50ZWdyYXRpb25TZXR0aW5nc1snQmFjayBPZmZpY2UgRXh0ZW5zaW9uJ10gJiZcclxuICAgICAgICBBcHAuY29udGV4dC5pbnRlZ3JhdGlvblNldHRpbmdzWydCYWNrIE9mZmljZSBFeHRlbnNpb24nXVsnVHlwZSBvZiBPcmRlciBMb2NhdGlvbiddIHx8ICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubG9jYXRpb25UeXBlID09PSAnV2FyZWhvdXNlJykge1xyXG4gICAgICB0aGlzLmZpZWxkcy5Mb2NhdGlvbi5oaWRlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLldhcmVob3VzZS5zaG93KCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9jYXRpb25UeXBlICE9PSAnV2FyZWhvdXNlJykge1xyXG4gICAgICB0aGlzLmZpZWxkcy5Mb2NhdGlvbi5zaG93KCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLldhcmVob3VzZS5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbnNlcnQ6IGZ1bmN0aW9uIGluc2VydCgpIHtcclxuICAgIHRoaXMuc2hvd1VucHJvbW90ZWRGaWVsZHMoKTtcclxuICAgIHRoaXMuZmllbGRzLkxvY2F0aW9uLnNob3coKTtcclxuICAgIHRoaXMuZmllbGRzLldhcmVob3VzZS5zaG93KCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgaXNRdW90ZUNsb3NlZDogZnVuY3Rpb24gaXNRdW90ZUNsb3NlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVudHJ5ICYmIHRoaXMuZW50cnkuSXNDbG9zZWQ7XHJcbiAgfSxcclxuICBwcm9jZXNzRGF0YTogZnVuY3Rpb24gcHJvY2Vzc0RhdGEoKSB7XHJcbiAgICB0aGlzLnNob3dCdXN5KCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5nZXRFbnRyaWVzRnJvbUlkcygpO1xyXG4gICAgaWYgKHRoaXMuaXNRdW90ZUNsb3NlZCgpKSB7XHJcbiAgICAgIEFwcC5iYXJzLnRiYXIuZGlzYWJsZVRvb2woJ3NhdmUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEFwcC5iYXJzLnRiYXIuZW5hYmxlVG9vbCgnc2F2ZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYmVmb3JlVHJhbnNpdGlvblRvOiBmdW5jdGlvbiBiZWZvcmVUcmFuc2l0aW9uVG8oKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5oaWRlVW5wcm9tb3RlZEZpZWxkcygpO1xyXG4gICAgaWYgKCF0aGlzLmZpZWxkcy5BY2NvdW50TWFuYWdlci5pc0Rpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyLmRpc2FibGUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmZpZWxkcy5CaWxsVG8uaXNEaXNhYmxlZCAmJiB0aGlzLmZpZWxkcy5TaGlwVG8uaXNEaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5CaWxsVG8uZW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlNoaXBUby5lbmFibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGRpc2FibGVCYWNrT2ZmaWNlRGF0YTogZnVuY3Rpb24gZGlzYWJsZUJhY2tPZmZpY2VEYXRhKCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmFja09mZmljZS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eS5kaXNhYmxlKCk7XHJcbiAgfSxcclxuICBlbmFibGVCYWNrT2ZmaWNlRGF0YTogZnVuY3Rpb24gZW5hYmxlQmFja09mZmljZURhdGEoKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlLmVuYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuQmFja09mZmljZUFjY291bnRpbmdFbnRpdHkuZW5hYmxlKCk7XHJcbiAgfSxcclxuICBjb252ZXJ0VmFsdWVzOiBmdW5jdGlvbiBjb252ZXJ0VmFsdWVzKHZhbHVlcykge1xyXG4gICAgaWYgKHZhbHVlcy5CaWxsVG8pIHtcclxuICAgICAgdmFsdWVzLkJpbGxUbyA9IHtcclxuICAgICAgICAka2V5OiB2YWx1ZXMuQmlsbFRvLiRrZXksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWVzLlNoaXBUbykge1xyXG4gICAgICB2YWx1ZXMuU2hpcFRvID0ge1xyXG4gICAgICAgICRrZXk6IHZhbHVlcy5TaGlwVG8uJGtleSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgfSxcclxuICBwcm9jZXNzRW50cnk6IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeShlbnRyeSkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5BY2NvdW50KSB7XHJcbiAgICAgIFsnUmVxdWVzdGVkQnknLCAnT3Bwb3J0dW5pdHknXS5mb3JFYWNoKChmKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZGVwZW5kc09uID0gJ0FjY291bnQnO1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LkFjY291bnQuQWNjb3VudElkIHx8IGVudHJ5LkFjY291bnQuJGtleSB8fCBlbnRyeS5BY2NvdW50LmtleX1cImA7XHJcbiAgICAgICAgaWYgKGYgPT09ICdPcHBvcnR1bml0eScpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gYCR7dGhpcy5maWVsZHNbZl0ud2hlcmV9IGFuZCBTdGF0dXMgZXEgXCIke3RoaXMub3Bwb3J0dW5pdHlPcGVuQ29kZX1cImA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHdhcmVob3VzZUZpZWxkID0gdGhpcy5maWVsZHMuV2FyZWhvdXNlO1xyXG4gICAgY29uc3QgbG9jYXRpb25GaWVsZCA9IHRoaXMuZmllbGRzLkxvY2F0aW9uO1xyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LkVycExvZ2ljYWxJZCkge1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC5lbmFibGUoKTtcclxuICAgICAgd2FyZWhvdXNlRmllbGQuZGVwZW5kc09uID0gJ0VycExvZ2ljYWxJZCc7XHJcbiAgICAgIHdhcmVob3VzZUZpZWxkLndoZXJlID0gKGxvZ2ljYWxJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgRXJwTG9naWNhbElkIGVxIFwiJHtsb2dpY2FsSWR9XCIgYW5kIExvY2F0aW9uVHlwZSBlcSBcIiR7dGhpcy53YXJlaG91c2VDb2RlfVwiYDtcclxuICAgICAgfTtcclxuICAgICAgbG9jYXRpb25GaWVsZC5lbmFibGUoKTtcclxuICAgICAgbG9jYXRpb25GaWVsZC5kZXBlbmRzT24gPSAnRXJwTG9naWNhbElkJztcclxuICAgICAgbG9jYXRpb25GaWVsZC53aGVyZSA9IChsb2dpY2FsSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gYEVycExvZ2ljYWxJZCBlcSBcIiR7bG9naWNhbElkfVwiIGFuZCAoTG9jYXRpb25UeXBlIGVxIFwiJHt0aGlzLm9mZmljZUNvZGV9XCIgb3IgTG9jYXRpb25UeXBlIGVxIFwiJHt0aGlzLnNpdGVDb2RlfVwiKWA7XHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC5kaXNhYmxlKCk7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5LldhcmVob3VzZSkge1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC5zZXRWYWx1ZShlbnRyeS5XYXJlaG91c2UpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5LkxvY2F0aW9uKSB7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuc2V0VmFsdWUoZW50cnkuTG9jYXRpb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LkVycEV4dElkKSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZUJhY2tPZmZpY2VEYXRhKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVuYWJsZUJhY2tPZmZpY2VEYXRhKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfSxcclxuICBzZXRWYWx1ZXM6IGZ1bmN0aW9uIHNldFZhbHVlcygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmZpZWxkcy5DdXJyZW5jeUNvZGUuZ2V0VmFsdWUoKSkge1xyXG4gICAgICBjb25zdCBhY2NvdW50ID0gdGhpcy5maWVsZHMuQWNjb3VudC5jdXJyZW50U2VsZWN0aW9uO1xyXG4gICAgICBpZiAoYWNjb3VudCAmJiBhY2NvdW50LkN1cnJlbmN5Q29kZSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkN1cnJlbmN5Q29kZS5zZXRWYWx1ZShhY2NvdW50LkN1cnJlbmN5Q29kZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQ3VycmVuY3lDb2RlLnNldFZhbHVlKEFwcC5nZXRCYXNlRXhjaGFuZ2VSYXRlKCkuY29kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIG9uUmVmcmVzaDogZnVuY3Rpb24gb25SZWZyZXNoKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIFsnUmVxdWVzdGVkQnknLCAnT3Bwb3J0dW5pdHknLCAnQmFja09mZmljZUFjY291bnRpbmdFbnRpdHknLCAnV2FyZWhvdXNlJywgJ0xvY2F0aW9uJ10uZm9yRWFjaCgoZikgPT4ge1xyXG4gICAgICB0aGlzLmZpZWxkc1tmXS5kZXBlbmRzT24gPSBudWxsO1xyXG4gICAgICB0aGlzLmZpZWxkc1tmXS53aGVyZSA9IG51bGw7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9uUmVmcmVzaEluc2VydDogZnVuY3Rpb24gb25SZWZyZXNoSW5zZXJ0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMuZW5hYmxlQmFja09mZmljZURhdGEoKTtcclxuICB9LFxyXG4gIGdldEVudHJpZXNGcm9tSWRzOiBmdW5jdGlvbiBnZXRFbnRyaWVzRnJvbUlkcygpIHtcclxuICAgIGNvbnN0IG1hcHBlZExvb2t1cHMgPSBbXHJcbiAgICAgICdCYWNrT2ZmaWNlJyxcclxuICAgICAgJ0JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5JyxcclxuICAgIF07XHJcbiAgICBjb25zdCBtYXBwZWRQcm9wZXJ0aWVzID0gW1xyXG4gICAgICAnTG9naWNhbElkJyxcclxuICAgICAgJ0FjY3RFbnRpdHlFeHRJZCcsXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZmllbGRzID0gWydFcnBMb2dpY2FsSWQnLCAnRXJwQWNjb3VudGluZ0VudGl0eUlkJ107XHJcbiAgICBVdGlsaXR5LnNldEZpZWxkc0Zyb21JZHMobWFwcGVkTG9va3VwcywgbWFwcGVkUHJvcGVydGllcywgZmllbGRzLCB0aGlzKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRQcmltYXJ5Q29udGFjdDogZnVuY3Rpb24gZ2V0UHJpbWFyeUNvbnRhY3QoZW50cnkpIHtcclxuICAgIGNvbnN0IGFjY291bnRNb2RlbCA9IEFkYXB0ZXIuZ2V0TW9kZWwoQ1JNX01PREVMX05BTUVTLkFDQ09VTlQpO1xyXG4gICAgY29uc3QgcmVsYXRpb25zaGlwID0ge1xyXG4gICAgICBuYW1lOiAnQ29udGFjdHMnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogY29udGFjdFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0NvbnRhY3QnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHdoZXJlOiAnSXNQcmltYXJ5IGVxIHRydWUnLFxyXG4gICAgfTtcclxuICAgIGFjY291bnRNb2RlbC5nZXRSZWxhdGVkUmVxdWVzdChlbnRyeSwgcmVsYXRpb25zaGlwKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuZW50aXRpZXMgJiYgcmVzdWx0LmVudGl0aWVzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RGaWVsZCA9IHRoaXMuZmllbGRzLlJlcXVlc3RlZEJ5O1xyXG4gICAgICAgIGlmICghY29udGFjdEZpZWxkLmN1cnJlbnRTZWxlY3Rpb24gfHwgY29udGFjdEZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudCAmJiBjb250YWN0RmllbGQuY3VycmVudFNlbGVjdGlvbi5BY2NvdW50LiRrZXkgIT09IGVudHJ5LiRrZXkpIHtcclxuICAgICAgICAgIGNvbnRhY3RGaWVsZC5zZXRTZWxlY3Rpb24ocmVzdWx0LmVudGl0aWVzWzBdKTtcclxuICAgICAgICAgIGlmICh0aGlzLmZpZWxkcy5BY2NvdW50LmN1cnJlbnRTZWxlY3Rpb24gJiYgIXRoaXMuZmllbGRzLkFjY291bnQuY3VycmVudFNlbGVjdGlvbi5FcnBFeHRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlVW5wcm9tb3RlZEZpZWxkcyhjb250YWN0RmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGhpZGVQcm9tb3RlZEZpZWxkczogZnVuY3Rpb24gaGlkZVByb21vdGVkRmllbGRzKCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmlsbFRvLmhpZGUoKTtcclxuICAgIHRoaXMuZmllbGRzLlNoaXBUby5oaWRlKCk7XHJcbiAgfSxcclxuICBoaWRlVW5wcm9tb3RlZEZpZWxkczogZnVuY3Rpb24gaGlkZVVucHJvbW90ZWRGaWVsZHMoKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5CaWxsaW5nQ29udGFjdC5oaWRlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5TaGlwcGluZ0NvbnRhY3QuaGlkZSgpO1xyXG4gIH0sXHJcbiAgcG9wdWxhdGVVbnByb21vdGVkRmllbGRzOiBmdW5jdGlvbiBwb3B1bGF0ZVVucHJvbW90ZWRGaWVsZHMoY29udGFjdCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmlsbGluZ0NvbnRhY3Quc2V0U2VsZWN0aW9uKGNvbnRhY3QpO1xyXG4gICAgdGhpcy5maWVsZHMuU2hpcHBpbmdDb250YWN0LnNldFNlbGVjdGlvbihjb250YWN0KTtcclxuICB9LFxyXG4gIG9uQWNjb3VudENoYW5nZTogZnVuY3Rpb24gb25BY2NvdW50Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3QgZW50cnkgPSBmaWVsZC5jdXJyZW50U2VsZWN0aW9uO1xyXG4gICAgWydSZXF1ZXN0ZWRCeScsICdPcHBvcnR1bml0eSddLmZvckVhY2goKGYpID0+IHtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZGVwZW5kc09uID0gJ0FjY291bnQnO1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gYEFjY291bnQuSWQgZXEgXCIke3ZhbHVlLkFjY291bnRJZCB8fCB2YWx1ZS4ka2V5IHx8IHZhbHVlLmtleX1cImA7XHJcbiAgICAgICAgaWYgKGYgPT09ICdPcHBvcnR1bml0eScpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gYCR7dGhpcy5maWVsZHNbZl0ud2hlcmV9IGFuZCBTdGF0dXMgZXEgXCIke3RoaXMub3Bwb3J0dW5pdHlPcGVuQ29kZX1cImA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChlbnRyeSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5DdXJyZW5jeUNvZGUuc2V0VmFsdWUoKGVudHJ5LkN1cnJlbmN5Q29kZSkgPyBlbnRyeS5DdXJyZW5jeUNvZGUgOiBBcHAuZ2V0QmFzZUV4Y2hhbmdlUmF0ZSgpLmNvZGUpO1xyXG4gICAgICBpZiAodGhpcy5maWVsZHMuQmlsbFRvLmlzRGlzYWJsZWQoKSAmJiB0aGlzLmZpZWxkcy5TaGlwVG8uaXNEaXNhYmxlZCgpKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQmlsbFRvLmVuYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZmllbGRzLlNoaXBUby5lbmFibGUoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZW50cnkuRXJwRXh0SWQpIHtcclxuICAgICAgICB0aGlzLnNob3dQcm9tb3RlZEZpZWxkcygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaGlkZVByb21vdGVkRmllbGRzKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVudHJ5LkFjY291bnRNYW5hZ2VyKSB7XHJcbiAgICAgICAgY29uc3QgYWNjb3VudE1hbmFnZXJGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyO1xyXG4gICAgICAgIGFjY291bnRNYW5hZ2VyRmllbGQuc2V0U2VsZWN0aW9uKHtcclxuICAgICAgICAgICRrZXk6IGVudHJ5LkFjY291bnRNYW5hZ2VyLiRrZXksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZmllbGQuc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgICAgIHRoaXMuc2hvd0J1c3koKTtcclxuICAgICAgdGhpcy5nZXRQcmltYXJ5Q29udGFjdChlbnRyeSk7XHJcbiAgICAgIFV0aWxpdHkuc2V0RmllbGRzRnJvbUlkcyhcclxuICAgICAgICBbJ0JhY2tPZmZpY2UnLCAnQmFja09mZmljZUFjY291bnRpbmdFbnRpdHknXSxcclxuICAgICAgICBbJ0xvZ2ljYWxJZCcsICdBY2N0RW50aXR5RXh0SWQnXSxcclxuICAgICAgICBbJ0VycExvZ2ljYWxJZCcsICdFcnBBY2NvdW50aW5nRW50aXR5SWQnXSxcclxuICAgICAgICB0aGlzLFxyXG4gICAgICAgIGVudHJ5XHJcbiAgICAgICkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uQWNjb3VudERlcGVuZGVudENoYW5nZTogZnVuY3Rpb24gb25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgaWYgKHZhbHVlICYmICFmaWVsZC5kZXBlbmRzT24gJiYgZmllbGQuY3VycmVudFNlbGVjdGlvbiAmJiBmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkFjY291bnQpIHtcclxuICAgICAgY29uc3QgYWNjb3VudEZpZWxkID0gdGhpcy5maWVsZHMuQWNjb3VudDtcclxuICAgICAgYWNjb3VudEZpZWxkLnNldFNlbGVjdGlvbihmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkFjY291bnQpO1xyXG4gICAgICB0aGlzLm9uQWNjb3VudENoYW5nZShhY2NvdW50RmllbGQuZ2V0VmFsdWUoKSwgYWNjb3VudEZpZWxkKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uQmFja09mZmljZUNoYW5nZTogZnVuY3Rpb24gb25CYWNrT2ZmaWNlQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmFja09mZmljZS5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICAgIHRoaXMuZmllbGRzLkVycExvZ2ljYWxJZC5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkxvZ2ljYWxJZCk7XHJcbiAgICBjb25zdCBhY2NvdW50aW5nRmllbGQgPSB0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eTtcclxuICAgIGFjY291bnRpbmdGaWVsZC53aGVyZSA9IGBCYWNrT2ZmaWNlLklkIGVxIFwiJHtmaWVsZC5jdXJyZW50U2VsZWN0aW9uLiRrZXl9XCJgO1xyXG4gICAgY29uc3QgYWNjb3VudGluZ0lzVG9CYWNrT2ZmaWNlID0gYWNjb3VudGluZ0ZpZWxkLmN1cnJlbnRTZWxlY3Rpb24gJiYgYWNjb3VudGluZ0ZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQmFja09mZmljZS4ka2V5ID09PSBmaWVsZC5jdXJyZW50U2VsZWN0aW9uLiRrZXk7XHJcbiAgICBpZiAoZmllbGQuY3VycmVudFNlbGVjdGlvbi5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0aWVzLiRyZXNvdXJjZXMgJiYgIWFjY291bnRpbmdJc1RvQmFja09mZmljZSkge1xyXG4gICAgICBjb25zdCBlbnRyeSA9IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcy4kcmVzb3VyY2VzWzBdO1xyXG4gICAgICBpZiAoZW50cnkpIHtcclxuICAgICAgICBhY2NvdW50aW5nRmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgICAgICB0aGlzLm9uQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlDaGFuZ2UoYWNjb3VudGluZ0ZpZWxkLmdldFZhbHVlKCksIGFjY291bnRpbmdGaWVsZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHdhcmVob3VzZUZpZWxkID0gdGhpcy5maWVsZHMuV2FyZWhvdXNlO1xyXG4gICAgaWYgKHdhcmVob3VzZUZpZWxkLmlzRGlzYWJsZWQpIHtcclxuICAgICAgd2FyZWhvdXNlRmllbGQuZW5hYmxlKCk7XHJcbiAgICAgIHdhcmVob3VzZUZpZWxkLmRlcGVuZHNPbiA9ICdFcnBMb2dpY2FsSWQnO1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC53aGVyZSA9IChsb2dpY2FsSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gYEVycExvZ2ljYWxJZCBlcSBcIiR7bG9naWNhbElkfVwiIGFuZCBMb2NhdGlvblR5cGUgZXEgXCIke3RoaXMud2FyZWhvdXNlQ29kZX1cImA7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBsb2NhdGlvbkZpZWxkID0gdGhpcy5maWVsZHMuTG9jYXRpb247XHJcbiAgICBpZiAobG9jYXRpb25GaWVsZC5pc0Rpc2FibGVkKSB7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuZW5hYmxlKCk7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuZGVwZW5kc09uID0gJ0VycExvZ2ljYWxJZCc7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQud2hlcmUgPSAobG9naWNhbElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBFcnBMb2dpY2FsSWQgZXEgXCIke2xvZ2ljYWxJZH1cIiBhbmQgKExvY2F0aW9uVHlwZSBlcSBcIiR7dGhpcy5vZmZpY2VDb2RlfVwiIG9yIExvY2F0aW9uVHlwZSBlcSBcIiR7dGhpcy5zaXRlQ29kZX1cIilgO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eUNoYW5nZTogZnVuY3Rpb24gb25CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5LnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gICAgdGhpcy5maWVsZHMuRXJwQWNjb3VudGluZ0VudGl0eUlkLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjdEVudGl0eUV4dElkKTtcclxuICB9LFxyXG4gIG9uQmlsbFRvQ2hhbmdlOiBmdW5jdGlvbiBvbkJpbGxUb0NoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMuZmllbGRzLkJpbGxUby5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICB9LFxyXG4gIG9uQ29udGFjdENoYW5nZTogZnVuY3Rpb24gb25Db250YWN0Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2UodmFsdWUsIGZpZWxkKTtcclxuICB9LFxyXG4gIG9uTG9jYXRpb25DaGFuZ2U6IGZ1bmN0aW9uIG9uTG9jYXRpb25DaGFuY2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBpZiAoZmllbGQuY3VycmVudFNlbGVjdGlvbi5FcnBFeHRJZCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5FcnBMb2NhdGlvbi5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkVycEV4dElkKTtcclxuICAgIH1cclxuICAgIHRoaXMuZmllbGRzLkxvY2F0aW9uLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gIH0sXHJcbiAgb25PcHBvcnR1bml0eUNoYW5nZTogZnVuY3Rpb24gb25PcHBvcnR1bml0eUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHZhbHVlLCBmaWVsZCk7XHJcbiAgfSxcclxuICBvblNoaXBUb0NoYW5nZTogZnVuY3Rpb24gb25TaGlwVG9DaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5TaGlwVG8uc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgfSxcclxuICBvbldhcmVob3VzZUNoYW5nZTogZnVuY3Rpb24gb25XYXJlaG91c2VDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5XYXJlaG91c2Uuc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgICB0aGlzLmZpZWxkcy5Mb2NhdGlvbi5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICB9LFxyXG4gIGFwcGx5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250ZXh0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIGNvbnN0IGZvdW5kID0gdGhpcy5fZ2V0TmF2Q29udGV4dCgpO1xyXG5cclxuICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcbiAgICB0aGlzLm9uQWNjb3VudENoYW5nZShhY2NvdW50RmllbGQuZ2V0VmFsdWUoKSwgYWNjb3VudEZpZWxkKTtcclxuXHJcbiAgICBjb25zdCBjb250ZXh0ID0gKGZvdW5kICYmIGZvdW5kLm9wdGlvbnMgJiYgZm91bmQub3B0aW9ucy5zb3VyY2UpIHx8IGZvdW5kO1xyXG4gICAgY29uc3QgbG9va3VwID0ge1xyXG4gICAgICBhY2NvdW50czogdGhpcy5hcHBseUFjY291bnRDb250ZXh0LFxyXG4gICAgICBjb250YWN0czogdGhpcy5hcHBseUNvbnRhY3RDb250ZXh0LFxyXG4gICAgICBvcHBvcnR1bml0aWVzOiB0aGlzLmFwcGx5T3Bwb3J0dW5pdHlDb250ZXh0LFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoY29udGV4dCAmJiBsb29rdXBbY29udGV4dC5yZXNvdXJjZUtpbmRdKSB7XHJcbiAgICAgIGxvb2t1cFtjb250ZXh0LnJlc291cmNlS2luZF0uY2FsbCh0aGlzLCBjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuZmllbGRzLkFjY291bnQuY3VycmVudFNlbGVjdGlvbiAmJiAhdGhpcy5maWVsZHMuQWNjb3VudC5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQmlsbFRvLmRpc2FibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuU2hpcFRvLmRpc2FibGUoKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5maWVsZHMuQmFja09mZmljZS5jdXJyZW50U2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkxvY2F0aW9uLmRpc2FibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuV2FyZWhvdXNlLmRpc2FibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9nZXROYXZDb250ZXh0OiBmdW5jdGlvbiBfZ2V0TmF2Q29udGV4dCgpIHtcclxuICAgIGNvbnN0IG5hdkNvbnRleHQgPSBBcHAucXVlcnlOYXZpZ2F0aW9uQ29udGV4dCgobykgPT4ge1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gKG8ub3B0aW9ucyAmJiBvLm9wdGlvbnMuc291cmNlKSB8fCBvO1xyXG5cclxuICAgICAgaWYgKC9eKGFjY291bnRzfGNvbnRhY3RzfG9wcG9ydHVuaXRpZXMpJC8udGVzdChjb250ZXh0LnJlc291cmNlS2luZCkgJiYgY29udGV4dC5rZXkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbmF2Q29udGV4dDtcclxuICB9LFxyXG4gIGFwcGx5QWNjb3VudENvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5QWNjb3VudENvbnRleHQoY29udGV4dCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgY29uc3QgZW50cnkgPSBjb250ZXh0LmVudHJ5IHx8ICh2aWV3ICYmIHZpZXcuZW50cnkpIHx8IGNvbnRleHQ7XHJcblxyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuJGtleSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWNjb3VudEZpZWxkID0gdGhpcy5maWVsZHMuQWNjb3VudDtcclxuICAgIGFjY291bnRGaWVsZC5zZXRTZWxlY3Rpb24oZW50cnkpO1xyXG4gICAgdGhpcy5vbkFjY291bnRDaGFuZ2UoYWNjb3VudEZpZWxkLmdldFZhbHVlKCksIGFjY291bnRGaWVsZCk7XHJcbiAgfSxcclxuICBhcHBseUNvbnRhY3RDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRhY3RDb250ZXh0KGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb250ZXh0LmlkKTtcclxuICAgIGNvbnN0IGVudHJ5ID0gY29udGV4dC5lbnRyeSB8fCAodmlldyAmJiB2aWV3LmVudHJ5KSB8fCBjb250ZXh0O1xyXG5cclxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LiRrZXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRhY3RGaWVsZCA9IHRoaXMuZmllbGRzLlJlcXVlc3RlZEJ5O1xyXG4gICAgY29udGFjdEZpZWxkLnNldFNlbGVjdGlvbihlbnRyeSk7XHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZShjb250YWN0RmllbGQuZ2V0VmFsdWUoKSwgY29udGFjdEZpZWxkKTtcclxuICB9LFxyXG4gIGFwcGx5T3Bwb3J0dW5pdHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseU9wcG9ydHVuaXR5Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQuZW50cnkgfHwgKHZpZXcgJiYgdmlldy5lbnRyeSkgfHwgY29udGV4dDtcclxuXHJcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS4ka2V5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcHBvcnR1bml0eUZpZWxkID0gdGhpcy5maWVsZHMuT3Bwb3J0dW5pdHk7XHJcbiAgICBvcHBvcnR1bml0eUZpZWxkLnNldFNlbGVjdGlvbihlbnRyeSk7XHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZShvcHBvcnR1bml0eUZpZWxkLmdldFZhbHVlKCksIG9wcG9ydHVuaXR5RmllbGQpO1xyXG4gIH0sXHJcbiAgaGlkZUJ1c3k6IGZ1bmN0aW9uIGhpZGVCdXN5KCkge1xyXG4gICAgaWYgKHRoaXMuX2J1c3lJbmRpY2F0b3IpIHtcclxuICAgICAgdGhpcy5fYnVzeUluZGljYXRvci5jb21wbGV0ZSgpO1xyXG4gICAgICBBcHAubW9kYWwuZGlzYWJsZUNsb3NlID0gZmFsc2U7XHJcbiAgICAgIEFwcC5tb2RhbC5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93QnVzeTogZnVuY3Rpb24gc2hvd0J1c3koKSB7XHJcbiAgICBpZiAoIXRoaXMuX2J1c3lJbmRpY2F0b3IgfHwgdGhpcy5fYnVzeUluZGljYXRvci5fZGVzdHJveWVkKSB7XHJcbiAgICAgIHRoaXMuX2J1c3lJbmRpY2F0b3IgPSBuZXcgQnVzeUluZGljYXRvcih7IGlkOiBgJHt0aGlzLmlkfS1idXN5SW5kaWNhdG9yYCB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuX2J1c3lJbmRpY2F0b3Iuc3RhcnQoKTtcclxuICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xyXG4gICAgQXBwLm1vZGFsLnNob3dUb29sYmFyID0gZmFsc2U7XHJcbiAgICBBcHAubW9kYWwuYWRkKHRoaXMuX2J1c3lJbmRpY2F0b3IpO1xyXG4gIH0sXHJcbiAgc2hvd1Byb21vdGVkRmllbGRzOiBmdW5jdGlvbiBzaG93UHJvbW90ZWRGaWVsZHMoKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5CaWxsVG8uc2hvdygpO1xyXG4gICAgdGhpcy5maWVsZHMuU2hpcFRvLnNob3coKTtcclxuICB9LFxyXG4gIHNob3dVbnByb21vdGVkRmllbGRzOiBmdW5jdGlvbiBzaG93VW5wcm9tb3RlZEZpZWxkcygpIHtcclxuICAgIHRoaXMuZmllbGRzLkJpbGxpbmdDb250YWN0LnNob3coKTtcclxuICAgIHRoaXMuZmllbGRzLlNoaXBwaW5nQ29udGFjdC5zaG93KCk7XHJcbiAgfSxcclxuICBmb3JtYXREZXBlbmRlbnRRdWVyeTogZnVuY3Rpb24gZm9ybWF0RGVwZW5kZW50UXVlcnkoZGVwZW5kZW50VmFsdWUsIHRoZUZvcm1hdCwgcHJvcGVydHkpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGVGb3JtYXQsIFt1dGlsaXR5LmdldFZhbHVlKGRlcGVuZGVudFZhbHVlLCBwcm9wZXJ0eSB8fCAnJGtleScpXSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9yZWxhdGVkJyxcclxuICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5vcHBvcnR1bml0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHZpZXc6ICdvcHBvcnR1bml0eV9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogYFN0YXR1cyBlcSBcIiR7dGhpcy5vcHBvcnR1bml0eU9wZW5Db2RlfVwiYCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhY2tPZmZpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdCYWNrT2ZmaWNlJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQmFja09mZmljZU5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9iYWNrb2ZmaWNlX3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiAnSXNBY3RpdmUgZXEgdHJ1ZScsXHJcbiAgICAgICAgaW5jbHVkZTogZmFsc2UsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRpbmdFbnRpdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9iYWNrb2ZmaWNlYWNjb3VudGluZ2VudGl0eV9yZWxhdGVkJyxcclxuICAgICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY3VycmVuY3lUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnQ3VycmVuY3kgQ29kZXMnLFxyXG4gICAgICAgIHNpbmdsZVNlbGVjdDogdHJ1ZSxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdjb2RlJyxcclxuICAgICAgICBrZXlQcm9wZXJ0eTogJ2NvZGUnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhcnREYXRlVGV4dCxcclxuICAgICAgICBuYW1lOiAnU3RhcnREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICAgIHRpbWVsZXNzOiBmYWxzZSxcclxuICAgICAgICBzaG93VGltZVBpY2tlcjogdHJ1ZSxcclxuICAgICAgICBzaG93UmVsYXRpdmVEYXRlVGltZTogZmFsc2UsXHJcbiAgICAgICAgZGF0ZUZvcm1hdFRleHQ6IHRoaXMuZGF0ZUZvcm1hdCxcclxuICAgICAgICBtaW5WYWx1ZTogKG5ldyBEYXRlKDE5MDAsIDAsIDEpKSxcclxuICAgICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICAgIHZhbGlkYXRvci5pc0RhdGVJblJhbmdlLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5lbmREYXRlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRW5kRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFbmREYXRlJyxcclxuICAgICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgICAgdGltZWxlc3M6IGZhbHNlLFxyXG4gICAgICAgIHNob3dUaW1lUGlja2VyOiB0cnVlLFxyXG4gICAgICAgIHNob3dSZWxhdGl2ZURhdGVUaW1lOiBmYWxzZSxcclxuICAgICAgICBkYXRlRm9ybWF0VGV4dDogdGhpcy5kYXRlRm9ybWF0LFxyXG4gICAgICAgIG1pblZhbHVlOiAobmV3IERhdGUoMTkwMCwgMCwgMSkpLFxyXG4gICAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgICAgdmFsaWRhdG9yLmlzRGF0ZUluUmFuZ2UsXHJcbiAgICAgICAgXSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmV4cGVjdGVkRGVsaXZlcnlEYXRlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXhwZWN0ZWREZWxpdmVyeURhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXhwZWN0ZWREZWxpdmVyeURhdGUnLFxyXG4gICAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgICB0aW1lbGVzczogZmFsc2UsXHJcbiAgICAgICAgc2hvd1RpbWVQaWNrZXI6IHRydWUsXHJcbiAgICAgICAgc2hvd1JlbGF0aXZlRGF0ZVRpbWU6IGZhbHNlLFxyXG4gICAgICAgIGRhdGVGb3JtYXRUZXh0OiB0aGlzLmRhdGVGb3JtYXQsXHJcbiAgICAgICAgbWluVmFsdWU6IChuZXcgRGF0ZSgxOTAwLCAwLCAxKSksXHJcbiAgICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgICB2YWxpZGF0b3IuaXNEYXRlSW5SYW5nZSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY3VzdG9tZXJSRlFUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDdXN0b21lclJGUU51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDdXN0b21lclJGUU51bWJlcicsXHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29tbWVudHNUZXh0LCAvLyBUT0RPOiBNYWtlIG9uIHNhdmUsIGFwcGVuZCAnQ3JlYXRlZCBieSA8dXNlcj4gb24gPGRhdGV0aW1lPicgdG8gY29tbWVudFxyXG4gICAgICAgIG5vdGVQcm9wZXJ0eTogZmFsc2UsXHJcbiAgICAgICAgbmFtZTogJ0NvbW1lbnRzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbW1lbnRzJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5jb21tZW50c1RleHQsXHJcbiAgICAgICAgdHlwZTogJ25vdGUnLFxyXG4gICAgICAgIHZpZXc6ICd0ZXh0X2VkaXQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubG9jYXRpb25UZXh0LFxyXG4gICAgICAgIG5hbWU6ICdMb2NhdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdMb2NhdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICB2aWV3OiAncXVvdGVfbG9jYXRpb25fbGlzdCcsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMubG9jYXRpb25zVGl0bGVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycExvY2F0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExvY2F0aW9uJyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMud2FyZWhvdXNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnV2FyZWhvdXNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1dhcmVob3VzZScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICB2aWV3OiAncXVvdGVfd2FyZWhvdXNlX2xpc3QnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLndhcmVob3VzZUxvY2F0aW9uVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlcXVlc3RlZEJ5VGV4dCxcclxuICAgICAgICBuYW1lOiAnUmVxdWVzdGVkQnknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUmVxdWVzdGVkQnknLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdOYW1lTEYnLFxyXG4gICAgICAgIHZpZXc6ICdjb250YWN0X3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgICBuYW1lOiAnUXVvdGUgU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBwaWNrbGlzdDogJ0VycFF1b3RlU3RhdHVzJyxcclxuICAgICAgICBzaW5nbGVTZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgdGl0bGVUZXh0OiB0aGlzLnN0YXR1c1RpdGxlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmlsbFRvVGV4dCxcclxuICAgICAgICBuYW1lOiAnQmlsbFRvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0JpbGxUbycsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0FkZHJlc3MuRnVsbEFkZHJlc3MnLFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9iaWxsVG9zX3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdERlcGVuZGVudFF1ZXJ5LmJpbmREZWxlZ2F0ZShcclxuICAgICAgICAgIHRoaXMsICdFcnBCaWxsVG9BY2NvdW50cy5BY2NvdW50LklkIGVxIFwiJHswfVwiJ1xyXG4gICAgICAgICksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdBY2NvdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iaWxsaW5nQ29udGFjdFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0JpbGxpbmdDb250YWN0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0JpbGxpbmdDb250YWN0JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGRlcGVuZHNPbjogJ0FjY291bnQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNoaXBUb1RleHQsXHJcbiAgICAgICAgbmFtZTogJ1NoaXBUbycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTaGlwVG8nLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdBZGRyZXNzLkZ1bGxBZGRyZXNzJyxcclxuICAgICAgICB2aWV3OiAncXVvdGVfc2hpcFRvc19yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgICB0aGlzLCAnRXJwU2hpcFRvQWNjb3VudHMuQWNjb3VudC5JZCBlcSBcIiR7MH1cIidcclxuICAgICAgICApLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jYXJyaWVyVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ2FycmllcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYXJyaWVyJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQ2Fycmllck5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9jYXJyaWVycycsXHJcbiAgICAgICAgd2hlcmU6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGBFcnBMb2dpY2FsSWQgZXEgXCIke3ZhbHVlfVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcHBpbmdDb250YWN0VGV4dCxcclxuICAgICAgICBuYW1lOiAnU2hpcHBpbmdDb250YWN0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NoaXBwaW5nQ29udGFjdCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5kcm9wU2hpcG1lbnRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdEcm9wU2hpcG1lbnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRHJvcFNoaXAnLFxyXG4gICAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgIG9uVGV4dDogdGhpcy55ZXNUZXh0LFxyXG4gICAgICAgIG9mZlRleHQ6IHRoaXMubm9UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZWFybHlTaGlwbWVudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Vhcmx5U2hpcG1lbnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2hpcEVhcmx5JyxcclxuICAgICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgICBvblRleHQ6IHRoaXMueWVzVGV4dCxcclxuICAgICAgICBvZmZUZXh0OiB0aGlzLm5vVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBhcnRpYWxTaGlwVGV4dCxcclxuICAgICAgICBuYW1lOiAnUGFydGlhbFNoaXBtZW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1BhcnRpYWxTaGlwJyxcclxuICAgICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgICBvblRleHQ6IHRoaXMueWVzVGV4dCxcclxuICAgICAgICBvZmZUZXh0OiB0aGlzLm5vVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRNYW5hZ2VyVGV4dCxcclxuICAgICAgICBuYW1lOiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICB9LFxyXG4gICAgICBdIH0sXHJcbiAgICBdKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5RdW90ZXMuRWRpdCcsIF9fY2xhc3MpO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuUXVvdGVzLkVkaXQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19