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
      this.inherited(init, arguments);

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
      this.inherited(insert, arguments);
    },
    isQuoteClosed: function isQuoteClosed() {
      return this.entry && this.entry.IsClosed;
    },
    processData: function processData() {
      this.showBusy();
      this.inherited(processData, arguments);
      this.getEntriesFromIds();
      if (this.isQuoteClosed()) {
        App.bars.tbar.disableTool('save');
      } else {
        App.bars.tbar.enableTool('save');
      }
    },
    beforeTransitionTo: function beforeTransitionTo() {
      this.inherited(beforeTransitionTo, arguments);
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

      this.inherited(processEntry, arguments);
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
      this.inherited(setValues, arguments);

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

      this.inherited(onRefresh, arguments);
      ['RequestedBy', 'Opportunity', 'BackOfficeAccountingEntity', 'Warehouse', 'Location'].forEach(function (f) {
        _this2.fields[f].dependsOn = null;
        _this2.fields[f].where = null;
      });
    },
    onRefreshInsert: function onRefreshInsert() {
      this.inherited(onRefreshInsert, arguments);
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
      this.inherited(applyContext, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3Rlcy9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiY29udGFjdFJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJxdW90ZU51bWJlclRleHQiLCJvcmRlcklkVGV4dCIsImFjY291bnRUZXh0Iiwib3Bwb3J0dW5pdHlUZXh0IiwiZGF0ZUNyZWF0ZWRUZXh0IiwiZXJwU3RhdHVzVGV4dCIsInN1YlRvdGFsVGV4dCIsImdyYW5kVG90YWxUZXh0IiwiYmlsbFRvVGV4dCIsInNoaXBUb1RleHQiLCJwYXlGcm9tVGV4dCIsInN0YXJ0RGF0ZVRleHQiLCJlbmREYXRlVGV4dCIsImV4cGVjdGVkRGVsaXZlcnlEYXRlVGV4dCIsImRhdGVGb3JtYXQiLCJjb21tZW50c1RleHQiLCJwcm9kdWN0c1RleHQiLCJhY2NvdW50UHJvZHVjdHMiLCJyZXF1ZXN0ZWRCeVRleHQiLCJkcm9wU2hpcG1lbnRUZXh0IiwiZWFybHlTaGlwbWVudFRleHQiLCJwYXJ0aWFsU2hpcFRleHQiLCJzdGF0dXNUZXh0Iiwic3RhdHVzVGl0bGUiLCJ0eXBlVGV4dCIsInR5cGVUaXRsZSIsImN1c3RvbWVyUkZRVGV4dCIsImN1cnJlbmN5VGV4dCIsImJpbGxpbmdDb250YWN0VGV4dCIsInNoaXBwaW5nQ29udGFjdFRleHQiLCJhY2NvdW50aW5nRW50aXR5VGV4dCIsImJhY2tPZmZpY2VUZXh0IiwiYWNjb3VudE1hbmFnZXJUZXh0Iiwid2FyZWhvdXNlVGV4dCIsIndhcmVob3VzZUxvY2F0aW9uVGV4dCIsImxvY2F0aW9uVGV4dCIsImxvY2F0aW9uc1RpdGxlVGV4dCIsImNhcnJpZXJUZXh0IiwiaWQiLCJkZXRhaWxWaWV3IiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInJlc291cmNlS2luZCIsIm9wcG9ydHVuaXR5T3BlbkNvZGUiLCJ3YXJlaG91c2VDb2RlIiwib2ZmaWNlQ29kZSIsInNpdGVDb2RlIiwibW9kZWxOYW1lIiwiUVVPVEUiLCJfYnVzeUluZGljYXRvciIsImxvY2F0aW9uVHlwZSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiQWNjb3VudCIsIm9uQWNjb3VudENoYW5nZSIsIlJlcXVlc3RlZEJ5Iiwib25Db250YWN0Q2hhbmdlIiwiT3Bwb3J0dW5pdHkiLCJvbk9wcG9ydHVuaXR5Q2hhbmdlIiwiQmlsbFRvIiwib25CaWxsVG9DaGFuZ2UiLCJTaGlwVG8iLCJvblNoaXBUb0NoYW5nZSIsIkJhY2tPZmZpY2UiLCJvbkJhY2tPZmZpY2VDaGFuZ2UiLCJCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eSIsIm9uQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlDaGFuZ2UiLCJMb2NhdGlvbiIsIm9uTG9jYXRpb25DaGFuZ2UiLCJXYXJlaG91c2UiLCJvbldhcmVob3VzZUNoYW5nZSIsIkFwcCIsImNvbnRleHQiLCJpbnRlZ3JhdGlvblNldHRpbmdzIiwiaGlkZSIsInNob3ciLCJpbnNlcnQiLCJzaG93VW5wcm9tb3RlZEZpZWxkcyIsImlzUXVvdGVDbG9zZWQiLCJlbnRyeSIsIklzQ2xvc2VkIiwicHJvY2Vzc0RhdGEiLCJzaG93QnVzeSIsImdldEVudHJpZXNGcm9tSWRzIiwiYmFycyIsInRiYXIiLCJkaXNhYmxlVG9vbCIsImVuYWJsZVRvb2wiLCJiZWZvcmVUcmFuc2l0aW9uVG8iLCJoaWRlVW5wcm9tb3RlZEZpZWxkcyIsIkFjY291bnRNYW5hZ2VyIiwiaXNEaXNhYmxlZCIsImRpc2FibGUiLCJlbmFibGUiLCJkaXNhYmxlQmFja09mZmljZURhdGEiLCJlbmFibGVCYWNrT2ZmaWNlRGF0YSIsImNvbnZlcnRWYWx1ZXMiLCJ2YWx1ZXMiLCIka2V5IiwicHJvY2Vzc0VudHJ5IiwiZm9yRWFjaCIsImYiLCJkZXBlbmRzT24iLCJ3aGVyZSIsIkFjY291bnRJZCIsImtleSIsIndhcmVob3VzZUZpZWxkIiwibG9jYXRpb25GaWVsZCIsIkVycExvZ2ljYWxJZCIsImxvZ2ljYWxJZCIsInNldFZhbHVlIiwiRXJwRXh0SWQiLCJzZXRWYWx1ZXMiLCJDdXJyZW5jeUNvZGUiLCJnZXRWYWx1ZSIsImFjY291bnQiLCJjdXJyZW50U2VsZWN0aW9uIiwiZ2V0QmFzZUV4Y2hhbmdlUmF0ZSIsImNvZGUiLCJvblJlZnJlc2giLCJvblJlZnJlc2hJbnNlcnQiLCJtYXBwZWRMb29rdXBzIiwibWFwcGVkUHJvcGVydGllcyIsInNldEZpZWxkc0Zyb21JZHMiLCJ0aGVuIiwiaGlkZUJ1c3kiLCJnZXRQcmltYXJ5Q29udGFjdCIsImFjY291bnRNb2RlbCIsImdldE1vZGVsIiwiQUNDT1VOVCIsInJlbGF0aW9uc2hpcCIsIm5hbWUiLCJkaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwidHlwZSIsInJlbGF0ZWRFbnRpdHkiLCJyZWxhdGVkUHJvcGVydHkiLCJyZWxhdGVkUHJvcGVydHlUeXBlIiwiZ2V0UmVsYXRlZFJlcXVlc3QiLCJyZXN1bHQiLCJlbnRpdGllcyIsImxlbmd0aCIsImNvbnRhY3RGaWVsZCIsInNldFNlbGVjdGlvbiIsInBvcHVsYXRlVW5wcm9tb3RlZEZpZWxkcyIsImhpZGVQcm9tb3RlZEZpZWxkcyIsIkJpbGxpbmdDb250YWN0IiwiU2hpcHBpbmdDb250YWN0IiwiY29udGFjdCIsInZhbHVlIiwiZmllbGQiLCJzaG93UHJvbW90ZWRGaWVsZHMiLCJhY2NvdW50TWFuYWdlckZpZWxkIiwib25BY2NvdW50RGVwZW5kZW50Q2hhbmdlIiwiYWNjb3VudEZpZWxkIiwiTG9naWNhbElkIiwiYWNjb3VudGluZ0ZpZWxkIiwiYWNjb3VudGluZ0lzVG9CYWNrT2ZmaWNlIiwiQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcyIsIiRyZXNvdXJjZXMiLCJFcnBBY2NvdW50aW5nRW50aXR5SWQiLCJBY2N0RW50aXR5RXh0SWQiLCJvbkxvY2F0aW9uQ2hhbmNlIiwiRXJwTG9jYXRpb24iLCJhcHBseUNvbnRleHQiLCJmb3VuZCIsIl9nZXROYXZDb250ZXh0Iiwib3B0aW9ucyIsInNvdXJjZSIsImxvb2t1cCIsImFjY291bnRzIiwiYXBwbHlBY2NvdW50Q29udGV4dCIsImNvbnRhY3RzIiwiYXBwbHlDb250YWN0Q29udGV4dCIsIm9wcG9ydHVuaXRpZXMiLCJhcHBseU9wcG9ydHVuaXR5Q29udGV4dCIsImNhbGwiLCJjdXJyZW50VmFsdWUiLCJuYXZDb250ZXh0IiwicXVlcnlOYXZpZ2F0aW9uQ29udGV4dCIsIm8iLCJ0ZXN0IiwidmlldyIsImdldFZpZXciLCJvcHBvcnR1bml0eUZpZWxkIiwiY29tcGxldGUiLCJtb2RhbCIsImRpc2FibGVDbG9zZSIsIl9kZXN0cm95ZWQiLCJzdGFydCIsInNob3dUb29sYmFyIiwiYWRkIiwiZm9ybWF0RGVwZW5kZW50UXVlcnkiLCJkZXBlbmRlbnRWYWx1ZSIsInRoZUZvcm1hdCIsInByb3BlcnR5Iiwic3Vic3RpdHV0ZSIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInRpdGxlIiwiZGV0YWlsc1RleHQiLCJjaGlsZHJlbiIsImxhYmVsIiwiZW1wdHlUZXh0IiwidmFsdWVUZXh0UHJvcGVydHkiLCJhdXRvRm9jdXMiLCJyZXF1aXJlZCIsImluY2x1ZGUiLCJwaWNrbGlzdCIsInNpbmdsZVNlbGVjdCIsInRleHRQcm9wZXJ0eSIsImtleVByb3BlcnR5IiwidGltZWxlc3MiLCJzaG93VGltZVBpY2tlciIsInNob3dSZWxhdGl2ZURhdGVUaW1lIiwiZGF0ZUZvcm1hdFRleHQiLCJtaW5WYWx1ZSIsIkRhdGUiLCJ2YWxpZGF0b3IiLCJpc0RhdGVJblJhbmdlIiwibm90ZVByb3BlcnR5IiwiYmluZERlbGVnYXRlIiwib25UZXh0IiwieWVzVGV4dCIsIm9mZlRleHQiLCJub1RleHQiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNQSxXQUFXLG9CQUFZ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LFNBMU5PLENBSDBCLEVBQUQsQ0FBOUIsQ0FBUDtBQXdPRDtBQTVxQnVFLEdBQTFELENBQWhCOztBQStxQkEsaUJBQUtzQixTQUFMLENBQWUseUJBQWYsRUFBMEN2TyxPQUExQztBQUNBLGlCQUFLdU8sU0FBTCxDQUFlLHlCQUFmLEVBQTBDdk8sT0FBMUM7b0JBQ2VBLE8iLCJmaWxlIjoiRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IEFkYXB0ZXIgZnJvbSAnYXJnb3MvTW9kZWxzL0FkYXB0ZXInO1xyXG5pbXBvcnQgQnVzeUluZGljYXRvciBmcm9tICdhcmdvcy9EaWFsb2dzL0J1c3lJbmRpY2F0b3InO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJ2NybS9WYWxpZGF0b3InO1xyXG5pbXBvcnQgQ1JNX01PREVMX05BTUVTIGZyb20gJ2NybS9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IFV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdxdW90ZUVkaXQnKTtcclxuY29uc3QgY29udGFjdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NvbnRhY3RNb2RlbCcpO1xyXG5jb25zdCBkdEZvcm1hdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3F1b3RlRWRpdERhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BY2NvdW50LkVkaXRcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRWRpdFxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgY3JtLlZhbGlkYXRvclxyXG4gKiBAcmVxdWlyZXMgY3JtLlRlbXBsYXRlXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuUXVvdGVzLkVkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBxdW90ZU51bWJlclRleHQ6IHJlc291cmNlLnF1b3RlTnVtYmVyVGV4dCxcclxuICBvcmRlcklkVGV4dDogcmVzb3VyY2Uub3JkZXJJZFRleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIG9wcG9ydHVuaXR5VGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlUZXh0LFxyXG4gIGRhdGVDcmVhdGVkVGV4dDogcmVzb3VyY2UuZGF0ZUNyZWF0ZWRUZXh0LFxyXG4gIGVycFN0YXR1c1RleHQ6IHJlc291cmNlLmVycFN0YXR1c1RleHQsXHJcbiAgc3ViVG90YWxUZXh0OiByZXNvdXJjZS5zdWJUb3RhbFRleHQsXHJcbiAgZ3JhbmRUb3RhbFRleHQ6IHJlc291cmNlLmdyYW5kVG90YWxUZXh0LFxyXG4gIGJpbGxUb1RleHQ6IHJlc291cmNlLmJpbGxUb1RleHQsXHJcbiAgc2hpcFRvVGV4dDogcmVzb3VyY2Uuc2hpcFRvVGV4dCxcclxuICBwYXlGcm9tVGV4dDogcmVzb3VyY2UucGF5RnJvbVRleHQsXHJcbiAgc3RhcnREYXRlVGV4dDogcmVzb3VyY2Uuc3RhcnREYXRlVGV4dCxcclxuICBlbmREYXRlVGV4dDogcmVzb3VyY2UuZW5kRGF0ZVRleHQsXHJcbiAgZXhwZWN0ZWREZWxpdmVyeURhdGVUZXh0OiByZXNvdXJjZS5leHBlY3RlZERlbGl2ZXJ5RGF0ZVRleHQsXHJcbiAgZGF0ZUZvcm1hdDogZHRGb3JtYXRSZXNvdXJjZS5kYXRlRm9ybWF0LFxyXG4gIGNvbW1lbnRzVGV4dDogcmVzb3VyY2UuY29tbWVudHNUZXh0LFxyXG4gIHByb2R1Y3RzVGV4dDogcmVzb3VyY2UucHJvZHVjdHNUZXh0LFxyXG4gIGFjY291bnRQcm9kdWN0czogcmVzb3VyY2UuYWNjb3VudFByb2R1Y3RzLFxyXG4gIHJlcXVlc3RlZEJ5VGV4dDogcmVzb3VyY2UucmVxdWVzdGVkQnlUZXh0LFxyXG4gIGRyb3BTaGlwbWVudFRleHQ6IHJlc291cmNlLmRyb3BTaGlwbWVudFRleHQsXHJcbiAgZWFybHlTaGlwbWVudFRleHQ6IHJlc291cmNlLmVhcmx5U2hpcG1lbnRUZXh0LFxyXG4gIHBhcnRpYWxTaGlwVGV4dDogcmVzb3VyY2UucGFydGlhbFNoaXBUZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgc3RhdHVzVGl0bGU6IHJlc291cmNlLnN0YXR1c1RpdGxlLFxyXG4gIHR5cGVUZXh0OiByZXNvdXJjZS50eXBlVGV4dCxcclxuICB0eXBlVGl0bGU6IHJlc291cmNlLnR5cGVUaXRsZSxcclxuICBjdXN0b21lclJGUVRleHQ6IHJlc291cmNlLmN1c3RvbWVyUkZRVGV4dCxcclxuICBjdXJyZW5jeVRleHQ6IHJlc291cmNlLmN1cnJlbmN5VGV4dCxcclxuICBiaWxsaW5nQ29udGFjdFRleHQ6IHJlc291cmNlLmJpbGxpbmdDb250YWN0VGV4dCxcclxuICBzaGlwcGluZ0NvbnRhY3RUZXh0OiByZXNvdXJjZS5zaGlwcGluZ0NvbnRhY3RUZXh0LFxyXG4gIGFjY291bnRpbmdFbnRpdHlUZXh0OiByZXNvdXJjZS5hY2NvdW50aW5nRW50aXR5VGV4dCxcclxuICBiYWNrT2ZmaWNlVGV4dDogcmVzb3VyY2UuYmFja09mZmljZVRleHQsXHJcbiAgYWNjb3VudE1hbmFnZXJUZXh0OiByZXNvdXJjZS5hY2NvdW50TWFuYWdlclRleHQsXHJcbiAgd2FyZWhvdXNlVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlVGV4dCxcclxuICB3YXJlaG91c2VMb2NhdGlvblRleHQ6IHJlc291cmNlLndhcmVob3VzZUxvY2F0aW9uVGV4dCxcclxuICBsb2NhdGlvblRleHQ6IHJlc291cmNlLmxvY2F0aW9uVGV4dCxcclxuICBsb2NhdGlvbnNUaXRsZVRleHQ6IHJlc291cmNlLmxvY2F0aW9uc1RpdGxlVGV4dCxcclxuICBjYXJyaWVyVGV4dDogcmVzb3VyY2UuY2FycmllclRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAncXVvdGVfZWRpdCcsXHJcbiAgZGV0YWlsVmlldzogJ3F1b3RlX2RldGFpbCcsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiAnRW50aXRpZXMvUXVvdGUvRWRpdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAncXVvdGVzJyxcclxuICBvcHBvcnR1bml0eU9wZW5Db2RlOiAnT3BlbicsXHJcbiAgd2FyZWhvdXNlQ29kZTogJ1dhcmVob3VzZScsXHJcbiAgb2ZmaWNlQ29kZTogJ09mZmljZScsXHJcbiAgc2l0ZUNvZGU6ICdTaXRlJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlFVT1RFLFxyXG4gIF9idXN5SW5kaWNhdG9yOiBudWxsLFxyXG4gIGxvY2F0aW9uVHlwZTogJycsXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5BY2NvdW50LCAnb25DaGFuZ2UnLCB0aGlzLm9uQWNjb3VudENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuUmVxdWVzdGVkQnksICdvbkNoYW5nZScsIHRoaXMub25Db250YWN0Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5PcHBvcnR1bml0eSwgJ29uQ2hhbmdlJywgdGhpcy5vbk9wcG9ydHVuaXR5Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5CaWxsVG8sICdvbkNoYW5nZScsIHRoaXMub25CaWxsVG9DaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlNoaXBUbywgJ29uQ2hhbmdlJywgdGhpcy5vblNoaXBUb0NoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQmFja09mZmljZSwgJ29uQ2hhbmdlJywgdGhpcy5vbkJhY2tPZmZpY2VDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5LCAnb25DaGFuZ2UnLCB0aGlzLm9uQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkxvY2F0aW9uLCAnb25DaGFuZ2UnLCB0aGlzLm9uTG9jYXRpb25DaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLldhcmVob3VzZSwgJ29uQ2hhbmdlJywgdGhpcy5vbldhcmVob3VzZUNoYW5nZSk7XHJcbiAgICBpZiAoIXRoaXMubG9jYXRpb25UeXBlKSB7XHJcbiAgICAgIHRoaXMubG9jYXRpb25UeXBlID0gQXBwLmNvbnRleHQuaW50ZWdyYXRpb25TZXR0aW5ncyAmJiBBcHAuY29udGV4dC5pbnRlZ3JhdGlvblNldHRpbmdzWydCYWNrIE9mZmljZSBFeHRlbnNpb24nXSAmJlxyXG4gICAgICAgIEFwcC5jb250ZXh0LmludGVncmF0aW9uU2V0dGluZ3NbJ0JhY2sgT2ZmaWNlIEV4dGVuc2lvbiddWydUeXBlIG9mIE9yZGVyIExvY2F0aW9uJ10gfHwgJyc7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sb2NhdGlvblR5cGUgPT09ICdXYXJlaG91c2UnKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkxvY2F0aW9uLmhpZGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuV2FyZWhvdXNlLnNob3coKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5sb2NhdGlvblR5cGUgIT09ICdXYXJlaG91c2UnKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkxvY2F0aW9uLnNob3coKTtcclxuICAgICAgdGhpcy5maWVsZHMuV2FyZWhvdXNlLmhpZGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KCkge1xyXG4gICAgdGhpcy5zaG93VW5wcm9tb3RlZEZpZWxkcygpO1xyXG4gICAgdGhpcy5maWVsZHMuTG9jYXRpb24uc2hvdygpO1xyXG4gICAgdGhpcy5maWVsZHMuV2FyZWhvdXNlLnNob3coKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGluc2VydCwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIGlzUXVvdGVDbG9zZWQ6IGZ1bmN0aW9uIGlzUXVvdGVDbG9zZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbnRyeSAmJiB0aGlzLmVudHJ5LklzQ2xvc2VkO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0RhdGE6IGZ1bmN0aW9uIHByb2Nlc3NEYXRhKCkge1xyXG4gICAgdGhpcy5zaG93QnVzeSgpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQocHJvY2Vzc0RhdGEsIGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmdldEVudHJpZXNGcm9tSWRzKCk7XHJcbiAgICBpZiAodGhpcy5pc1F1b3RlQ2xvc2VkKCkpIHtcclxuICAgICAgQXBwLmJhcnMudGJhci5kaXNhYmxlVG9vbCgnc2F2ZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgQXBwLmJhcnMudGJhci5lbmFibGVUb29sKCdzYXZlJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBiZWZvcmVUcmFuc2l0aW9uVG86IGZ1bmN0aW9uIGJlZm9yZVRyYW5zaXRpb25UbygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGJlZm9yZVRyYW5zaXRpb25UbywgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuaGlkZVVucHJvbW90ZWRGaWVsZHMoKTtcclxuICAgIGlmICghdGhpcy5maWVsZHMuQWNjb3VudE1hbmFnZXIuaXNEaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5BY2NvdW50TWFuYWdlci5kaXNhYmxlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5maWVsZHMuQmlsbFRvLmlzRGlzYWJsZWQgJiYgdGhpcy5maWVsZHMuU2hpcFRvLmlzRGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQmlsbFRvLmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5TaGlwVG8uZW5hYmxlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBkaXNhYmxlQmFja09mZmljZURhdGE6IGZ1bmN0aW9uIGRpc2FibGVCYWNrT2ZmaWNlRGF0YSgpIHtcclxuICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2UuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuQmFja09mZmljZUFjY291bnRpbmdFbnRpdHkuZGlzYWJsZSgpO1xyXG4gIH0sXHJcbiAgZW5hYmxlQmFja09mZmljZURhdGE6IGZ1bmN0aW9uIGVuYWJsZUJhY2tPZmZpY2VEYXRhKCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmFja09mZmljZS5lbmFibGUoKTtcclxuICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5LmVuYWJsZSgpO1xyXG4gIH0sXHJcbiAgY29udmVydFZhbHVlczogZnVuY3Rpb24gY29udmVydFZhbHVlcyh2YWx1ZXMpIHtcclxuICAgIGlmICh2YWx1ZXMuQmlsbFRvKSB7XHJcbiAgICAgIHZhbHVlcy5CaWxsVG8gPSB7XHJcbiAgICAgICAgJGtleTogdmFsdWVzLkJpbGxUby4ka2V5LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlcy5TaGlwVG8pIHtcclxuICAgICAgdmFsdWVzLlNoaXBUbyA9IHtcclxuICAgICAgICAka2V5OiB2YWx1ZXMuU2hpcFRvLiRrZXksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0VudHJ5OiBmdW5jdGlvbiBwcm9jZXNzRW50cnkoZW50cnkpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHByb2Nlc3NFbnRyeSwgYXJndW1lbnRzKTtcclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5BY2NvdW50KSB7XHJcbiAgICAgIFsnUmVxdWVzdGVkQnknLCAnT3Bwb3J0dW5pdHknXS5mb3JFYWNoKChmKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZGVwZW5kc09uID0gJ0FjY291bnQnO1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LkFjY291bnQuQWNjb3VudElkIHx8IGVudHJ5LkFjY291bnQuJGtleSB8fCBlbnRyeS5BY2NvdW50LmtleX1cImA7XHJcbiAgICAgICAgaWYgKGYgPT09ICdPcHBvcnR1bml0eScpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gYCR7dGhpcy5maWVsZHNbZl0ud2hlcmV9IGFuZCBTdGF0dXMgZXEgXCIke3RoaXMub3Bwb3J0dW5pdHlPcGVuQ29kZX1cImA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHdhcmVob3VzZUZpZWxkID0gdGhpcy5maWVsZHMuV2FyZWhvdXNlO1xyXG4gICAgY29uc3QgbG9jYXRpb25GaWVsZCA9IHRoaXMuZmllbGRzLkxvY2F0aW9uO1xyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LkVycExvZ2ljYWxJZCkge1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC5lbmFibGUoKTtcclxuICAgICAgd2FyZWhvdXNlRmllbGQuZGVwZW5kc09uID0gJ0VycExvZ2ljYWxJZCc7XHJcbiAgICAgIHdhcmVob3VzZUZpZWxkLndoZXJlID0gKGxvZ2ljYWxJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgRXJwTG9naWNhbElkIGVxIFwiJHtsb2dpY2FsSWR9XCIgYW5kIExvY2F0aW9uVHlwZSBlcSBcIiR7dGhpcy53YXJlaG91c2VDb2RlfVwiYDtcclxuICAgICAgfTtcclxuICAgICAgbG9jYXRpb25GaWVsZC5lbmFibGUoKTtcclxuICAgICAgbG9jYXRpb25GaWVsZC5kZXBlbmRzT24gPSAnRXJwTG9naWNhbElkJztcclxuICAgICAgbG9jYXRpb25GaWVsZC53aGVyZSA9IChsb2dpY2FsSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gYEVycExvZ2ljYWxJZCBlcSBcIiR7bG9naWNhbElkfVwiIGFuZCAoTG9jYXRpb25UeXBlIGVxIFwiJHt0aGlzLm9mZmljZUNvZGV9XCIgb3IgTG9jYXRpb25UeXBlIGVxIFwiJHt0aGlzLnNpdGVDb2RlfVwiKWA7XHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC5kaXNhYmxlKCk7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5LldhcmVob3VzZSkge1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC5zZXRWYWx1ZShlbnRyeS5XYXJlaG91c2UpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5LkxvY2F0aW9uKSB7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuc2V0VmFsdWUoZW50cnkuTG9jYXRpb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LkVycEV4dElkKSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZUJhY2tPZmZpY2VEYXRhKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVuYWJsZUJhY2tPZmZpY2VEYXRhKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfSxcclxuICBzZXRWYWx1ZXM6IGZ1bmN0aW9uIHNldFZhbHVlcygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHNldFZhbHVlcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZmllbGRzLkN1cnJlbmN5Q29kZS5nZXRWYWx1ZSgpKSB7XHJcbiAgICAgIGNvbnN0IGFjY291bnQgPSB0aGlzLmZpZWxkcy5BY2NvdW50LmN1cnJlbnRTZWxlY3Rpb247XHJcbiAgICAgIGlmIChhY2NvdW50ICYmIGFjY291bnQuQ3VycmVuY3lDb2RlKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQ3VycmVuY3lDb2RlLnNldFZhbHVlKGFjY291bnQuQ3VycmVuY3lDb2RlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5DdXJyZW5jeUNvZGUuc2V0VmFsdWUoQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKS5jb2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25SZWZyZXNoOiBmdW5jdGlvbiBvblJlZnJlc2goKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChvblJlZnJlc2gsIGFyZ3VtZW50cyk7XHJcbiAgICBbJ1JlcXVlc3RlZEJ5JywgJ09wcG9ydHVuaXR5JywgJ0JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5JywgJ1dhcmVob3VzZScsICdMb2NhdGlvbiddLmZvckVhY2goKGYpID0+IHtcclxuICAgICAgdGhpcy5maWVsZHNbZl0uZGVwZW5kc09uID0gbnVsbDtcclxuICAgICAgdGhpcy5maWVsZHNbZl0ud2hlcmUgPSBudWxsO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBvblJlZnJlc2hJbnNlcnQ6IGZ1bmN0aW9uIG9uUmVmcmVzaEluc2VydCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKG9uUmVmcmVzaEluc2VydCwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuZW5hYmxlQmFja09mZmljZURhdGEoKTtcclxuICB9LFxyXG4gIGdldEVudHJpZXNGcm9tSWRzOiBmdW5jdGlvbiBnZXRFbnRyaWVzRnJvbUlkcygpIHtcclxuICAgIGNvbnN0IG1hcHBlZExvb2t1cHMgPSBbXHJcbiAgICAgICdCYWNrT2ZmaWNlJyxcclxuICAgICAgJ0JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5JyxcclxuICAgIF07XHJcbiAgICBjb25zdCBtYXBwZWRQcm9wZXJ0aWVzID0gW1xyXG4gICAgICAnTG9naWNhbElkJyxcclxuICAgICAgJ0FjY3RFbnRpdHlFeHRJZCcsXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZmllbGRzID0gWydFcnBMb2dpY2FsSWQnLCAnRXJwQWNjb3VudGluZ0VudGl0eUlkJ107XHJcbiAgICBVdGlsaXR5LnNldEZpZWxkc0Zyb21JZHMobWFwcGVkTG9va3VwcywgbWFwcGVkUHJvcGVydGllcywgZmllbGRzLCB0aGlzKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRQcmltYXJ5Q29udGFjdDogZnVuY3Rpb24gZ2V0UHJpbWFyeUNvbnRhY3QoZW50cnkpIHtcclxuICAgIGNvbnN0IGFjY291bnRNb2RlbCA9IEFkYXB0ZXIuZ2V0TW9kZWwoQ1JNX01PREVMX05BTUVTLkFDQ09VTlQpO1xyXG4gICAgY29uc3QgcmVsYXRpb25zaGlwID0ge1xyXG4gICAgICBuYW1lOiAnQ29udGFjdHMnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogY29udGFjdFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0NvbnRhY3QnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHdoZXJlOiAnSXNQcmltYXJ5IGVxIHRydWUnLFxyXG4gICAgfTtcclxuICAgIGFjY291bnRNb2RlbC5nZXRSZWxhdGVkUmVxdWVzdChlbnRyeSwgcmVsYXRpb25zaGlwKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuZW50aXRpZXMgJiYgcmVzdWx0LmVudGl0aWVzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RGaWVsZCA9IHRoaXMuZmllbGRzLlJlcXVlc3RlZEJ5O1xyXG4gICAgICAgIGlmICghY29udGFjdEZpZWxkLmN1cnJlbnRTZWxlY3Rpb24gfHwgY29udGFjdEZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudCAmJiBjb250YWN0RmllbGQuY3VycmVudFNlbGVjdGlvbi5BY2NvdW50LiRrZXkgIT09IGVudHJ5LiRrZXkpIHtcclxuICAgICAgICAgIGNvbnRhY3RGaWVsZC5zZXRTZWxlY3Rpb24ocmVzdWx0LmVudGl0aWVzWzBdKTtcclxuICAgICAgICAgIGlmICh0aGlzLmZpZWxkcy5BY2NvdW50LmN1cnJlbnRTZWxlY3Rpb24gJiYgIXRoaXMuZmllbGRzLkFjY291bnQuY3VycmVudFNlbGVjdGlvbi5FcnBFeHRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlVW5wcm9tb3RlZEZpZWxkcyhjb250YWN0RmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGhpZGVQcm9tb3RlZEZpZWxkczogZnVuY3Rpb24gaGlkZVByb21vdGVkRmllbGRzKCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmlsbFRvLmhpZGUoKTtcclxuICAgIHRoaXMuZmllbGRzLlNoaXBUby5oaWRlKCk7XHJcbiAgfSxcclxuICBoaWRlVW5wcm9tb3RlZEZpZWxkczogZnVuY3Rpb24gaGlkZVVucHJvbW90ZWRGaWVsZHMoKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5CaWxsaW5nQ29udGFjdC5oaWRlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5TaGlwcGluZ0NvbnRhY3QuaGlkZSgpO1xyXG4gIH0sXHJcbiAgcG9wdWxhdGVVbnByb21vdGVkRmllbGRzOiBmdW5jdGlvbiBwb3B1bGF0ZVVucHJvbW90ZWRGaWVsZHMoY29udGFjdCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmlsbGluZ0NvbnRhY3Quc2V0U2VsZWN0aW9uKGNvbnRhY3QpO1xyXG4gICAgdGhpcy5maWVsZHMuU2hpcHBpbmdDb250YWN0LnNldFNlbGVjdGlvbihjb250YWN0KTtcclxuICB9LFxyXG4gIG9uQWNjb3VudENoYW5nZTogZnVuY3Rpb24gb25BY2NvdW50Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3QgZW50cnkgPSBmaWVsZC5jdXJyZW50U2VsZWN0aW9uO1xyXG4gICAgWydSZXF1ZXN0ZWRCeScsICdPcHBvcnR1bml0eSddLmZvckVhY2goKGYpID0+IHtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZGVwZW5kc09uID0gJ0FjY291bnQnO1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gYEFjY291bnQuSWQgZXEgXCIke3ZhbHVlLkFjY291bnRJZCB8fCB2YWx1ZS4ka2V5IHx8IHZhbHVlLmtleX1cImA7XHJcbiAgICAgICAgaWYgKGYgPT09ICdPcHBvcnR1bml0eScpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gYCR7dGhpcy5maWVsZHNbZl0ud2hlcmV9IGFuZCBTdGF0dXMgZXEgXCIke3RoaXMub3Bwb3J0dW5pdHlPcGVuQ29kZX1cImA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChlbnRyeSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5DdXJyZW5jeUNvZGUuc2V0VmFsdWUoKGVudHJ5LkN1cnJlbmN5Q29kZSkgPyBlbnRyeS5DdXJyZW5jeUNvZGUgOiBBcHAuZ2V0QmFzZUV4Y2hhbmdlUmF0ZSgpLmNvZGUpO1xyXG4gICAgICBpZiAodGhpcy5maWVsZHMuQmlsbFRvLmlzRGlzYWJsZWQoKSAmJiB0aGlzLmZpZWxkcy5TaGlwVG8uaXNEaXNhYmxlZCgpKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQmlsbFRvLmVuYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZmllbGRzLlNoaXBUby5lbmFibGUoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZW50cnkuRXJwRXh0SWQpIHtcclxuICAgICAgICB0aGlzLnNob3dQcm9tb3RlZEZpZWxkcygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaGlkZVByb21vdGVkRmllbGRzKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVudHJ5LkFjY291bnRNYW5hZ2VyKSB7XHJcbiAgICAgICAgY29uc3QgYWNjb3VudE1hbmFnZXJGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyO1xyXG4gICAgICAgIGFjY291bnRNYW5hZ2VyRmllbGQuc2V0U2VsZWN0aW9uKHtcclxuICAgICAgICAgICRrZXk6IGVudHJ5LkFjY291bnRNYW5hZ2VyLiRrZXksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZmllbGQuc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgICAgIHRoaXMuc2hvd0J1c3koKTtcclxuICAgICAgdGhpcy5nZXRQcmltYXJ5Q29udGFjdChlbnRyeSk7XHJcbiAgICAgIFV0aWxpdHkuc2V0RmllbGRzRnJvbUlkcyhcclxuICAgICAgICBbJ0JhY2tPZmZpY2UnLCAnQmFja09mZmljZUFjY291bnRpbmdFbnRpdHknXSxcclxuICAgICAgICBbJ0xvZ2ljYWxJZCcsICdBY2N0RW50aXR5RXh0SWQnXSxcclxuICAgICAgICBbJ0VycExvZ2ljYWxJZCcsICdFcnBBY2NvdW50aW5nRW50aXR5SWQnXSxcclxuICAgICAgICB0aGlzLFxyXG4gICAgICAgIGVudHJ5XHJcbiAgICAgICkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uQWNjb3VudERlcGVuZGVudENoYW5nZTogZnVuY3Rpb24gb25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgaWYgKHZhbHVlICYmICFmaWVsZC5kZXBlbmRzT24gJiYgZmllbGQuY3VycmVudFNlbGVjdGlvbiAmJiBmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkFjY291bnQpIHtcclxuICAgICAgY29uc3QgYWNjb3VudEZpZWxkID0gdGhpcy5maWVsZHMuQWNjb3VudDtcclxuICAgICAgYWNjb3VudEZpZWxkLnNldFNlbGVjdGlvbihmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkFjY291bnQpO1xyXG4gICAgICB0aGlzLm9uQWNjb3VudENoYW5nZShhY2NvdW50RmllbGQuZ2V0VmFsdWUoKSwgYWNjb3VudEZpZWxkKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uQmFja09mZmljZUNoYW5nZTogZnVuY3Rpb24gb25CYWNrT2ZmaWNlQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmFja09mZmljZS5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICAgIHRoaXMuZmllbGRzLkVycExvZ2ljYWxJZC5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkxvZ2ljYWxJZCk7XHJcbiAgICBjb25zdCBhY2NvdW50aW5nRmllbGQgPSB0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eTtcclxuICAgIGFjY291bnRpbmdGaWVsZC53aGVyZSA9IGBCYWNrT2ZmaWNlLklkIGVxIFwiJHtmaWVsZC5jdXJyZW50U2VsZWN0aW9uLiRrZXl9XCJgO1xyXG4gICAgY29uc3QgYWNjb3VudGluZ0lzVG9CYWNrT2ZmaWNlID0gYWNjb3VudGluZ0ZpZWxkLmN1cnJlbnRTZWxlY3Rpb24gJiYgYWNjb3VudGluZ0ZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQmFja09mZmljZS4ka2V5ID09PSBmaWVsZC5jdXJyZW50U2VsZWN0aW9uLiRrZXk7XHJcbiAgICBpZiAoZmllbGQuY3VycmVudFNlbGVjdGlvbi5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0aWVzLiRyZXNvdXJjZXMgJiYgIWFjY291bnRpbmdJc1RvQmFja09mZmljZSkge1xyXG4gICAgICBjb25zdCBlbnRyeSA9IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcy4kcmVzb3VyY2VzWzBdO1xyXG4gICAgICBpZiAoZW50cnkpIHtcclxuICAgICAgICBhY2NvdW50aW5nRmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgICAgICB0aGlzLm9uQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlDaGFuZ2UoYWNjb3VudGluZ0ZpZWxkLmdldFZhbHVlKCksIGFjY291bnRpbmdGaWVsZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHdhcmVob3VzZUZpZWxkID0gdGhpcy5maWVsZHMuV2FyZWhvdXNlO1xyXG4gICAgaWYgKHdhcmVob3VzZUZpZWxkLmlzRGlzYWJsZWQpIHtcclxuICAgICAgd2FyZWhvdXNlRmllbGQuZW5hYmxlKCk7XHJcbiAgICAgIHdhcmVob3VzZUZpZWxkLmRlcGVuZHNPbiA9ICdFcnBMb2dpY2FsSWQnO1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC53aGVyZSA9IChsb2dpY2FsSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gYEVycExvZ2ljYWxJZCBlcSBcIiR7bG9naWNhbElkfVwiIGFuZCBMb2NhdGlvblR5cGUgZXEgXCIke3RoaXMud2FyZWhvdXNlQ29kZX1cImA7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBsb2NhdGlvbkZpZWxkID0gdGhpcy5maWVsZHMuTG9jYXRpb247XHJcbiAgICBpZiAobG9jYXRpb25GaWVsZC5pc0Rpc2FibGVkKSB7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuZW5hYmxlKCk7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuZGVwZW5kc09uID0gJ0VycExvZ2ljYWxJZCc7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQud2hlcmUgPSAobG9naWNhbElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBFcnBMb2dpY2FsSWQgZXEgXCIke2xvZ2ljYWxJZH1cIiBhbmQgKExvY2F0aW9uVHlwZSBlcSBcIiR7dGhpcy5vZmZpY2VDb2RlfVwiIG9yIExvY2F0aW9uVHlwZSBlcSBcIiR7dGhpcy5zaXRlQ29kZX1cIilgO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eUNoYW5nZTogZnVuY3Rpb24gb25CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5LnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gICAgdGhpcy5maWVsZHMuRXJwQWNjb3VudGluZ0VudGl0eUlkLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjdEVudGl0eUV4dElkKTtcclxuICB9LFxyXG4gIG9uQmlsbFRvQ2hhbmdlOiBmdW5jdGlvbiBvbkJpbGxUb0NoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMuZmllbGRzLkJpbGxUby5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICB9LFxyXG4gIG9uQ29udGFjdENoYW5nZTogZnVuY3Rpb24gb25Db250YWN0Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2UodmFsdWUsIGZpZWxkKTtcclxuICB9LFxyXG4gIG9uTG9jYXRpb25DaGFuZ2U6IGZ1bmN0aW9uIG9uTG9jYXRpb25DaGFuY2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBpZiAoZmllbGQuY3VycmVudFNlbGVjdGlvbi5FcnBFeHRJZCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5FcnBMb2NhdGlvbi5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkVycEV4dElkKTtcclxuICAgIH1cclxuICAgIHRoaXMuZmllbGRzLkxvY2F0aW9uLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gIH0sXHJcbiAgb25PcHBvcnR1bml0eUNoYW5nZTogZnVuY3Rpb24gb25PcHBvcnR1bml0eUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHZhbHVlLCBmaWVsZCk7XHJcbiAgfSxcclxuICBvblNoaXBUb0NoYW5nZTogZnVuY3Rpb24gb25TaGlwVG9DaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5TaGlwVG8uc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgfSxcclxuICBvbldhcmVob3VzZUNoYW5nZTogZnVuY3Rpb24gb25XYXJlaG91c2VDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5XYXJlaG91c2Uuc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgICB0aGlzLmZpZWxkcy5Mb2NhdGlvbi5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICB9LFxyXG4gIGFwcGx5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250ZXh0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXBwbHlDb250ZXh0LCBhcmd1bWVudHMpO1xyXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLl9nZXROYXZDb250ZXh0KCk7XHJcblxyXG4gICAgY29uc3QgYWNjb3VudEZpZWxkID0gdGhpcy5maWVsZHMuQWNjb3VudDtcclxuICAgIHRoaXMub25BY2NvdW50Q2hhbmdlKGFjY291bnRGaWVsZC5nZXRWYWx1ZSgpLCBhY2NvdW50RmllbGQpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRleHQgPSAoZm91bmQgJiYgZm91bmQub3B0aW9ucyAmJiBmb3VuZC5vcHRpb25zLnNvdXJjZSkgfHwgZm91bmQ7XHJcbiAgICBjb25zdCBsb29rdXAgPSB7XHJcbiAgICAgIGFjY291bnRzOiB0aGlzLmFwcGx5QWNjb3VudENvbnRleHQsXHJcbiAgICAgIGNvbnRhY3RzOiB0aGlzLmFwcGx5Q29udGFjdENvbnRleHQsXHJcbiAgICAgIG9wcG9ydHVuaXRpZXM6IHRoaXMuYXBwbHlPcHBvcnR1bml0eUNvbnRleHQsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChjb250ZXh0ICYmIGxvb2t1cFtjb250ZXh0LnJlc291cmNlS2luZF0pIHtcclxuICAgICAgbG9va3VwW2NvbnRleHQucmVzb3VyY2VLaW5kXS5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5maWVsZHMuQWNjb3VudC5jdXJyZW50U2VsZWN0aW9uICYmICF0aGlzLmZpZWxkcy5BY2NvdW50LmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5CaWxsVG8uZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5TaGlwVG8uZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlLmN1cnJlbnRTZWxlY3Rpb24pIHtcclxuICAgICAgdGhpcy5maWVsZHMuTG9jYXRpb24uZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5XYXJlaG91c2UuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dldE5hdkNvbnRleHQ6IGZ1bmN0aW9uIF9nZXROYXZDb250ZXh0KCkge1xyXG4gICAgY29uc3QgbmF2Q29udGV4dCA9IEFwcC5xdWVyeU5hdmlnYXRpb25Db250ZXh0KChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSAoby5vcHRpb25zICYmIG8ub3B0aW9ucy5zb3VyY2UpIHx8IG87XHJcblxyXG4gICAgICBpZiAoL14oYWNjb3VudHN8Y29udGFjdHN8b3Bwb3J0dW5pdGllcykkLy50ZXN0KGNvbnRleHQucmVzb3VyY2VLaW5kKSAmJiBjb250ZXh0LmtleSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuYXZDb250ZXh0O1xyXG4gIH0sXHJcbiAgYXBwbHlBY2NvdW50Q29udGV4dDogZnVuY3Rpb24gYXBwbHlBY2NvdW50Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQuZW50cnkgfHwgKHZpZXcgJiYgdmlldy5lbnRyeSkgfHwgY29udGV4dDtcclxuXHJcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS4ka2V5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgYWNjb3VudEZpZWxkLnNldFNlbGVjdGlvbihlbnRyeSk7XHJcbiAgICB0aGlzLm9uQWNjb3VudENoYW5nZShhY2NvdW50RmllbGQuZ2V0VmFsdWUoKSwgYWNjb3VudEZpZWxkKTtcclxuICB9LFxyXG4gIGFwcGx5Q29udGFjdENvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGFjdENvbnRleHQoY29udGV4dCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgY29uc3QgZW50cnkgPSBjb250ZXh0LmVudHJ5IHx8ICh2aWV3ICYmIHZpZXcuZW50cnkpIHx8IGNvbnRleHQ7XHJcblxyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuJGtleSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGFjdEZpZWxkID0gdGhpcy5maWVsZHMuUmVxdWVzdGVkQnk7XHJcbiAgICBjb250YWN0RmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKGNvbnRhY3RGaWVsZC5nZXRWYWx1ZSgpLCBjb250YWN0RmllbGQpO1xyXG4gIH0sXHJcbiAgYXBwbHlPcHBvcnR1bml0eUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5T3Bwb3J0dW5pdHlDb250ZXh0KGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb250ZXh0LmlkKTtcclxuICAgIGNvbnN0IGVudHJ5ID0gY29udGV4dC5lbnRyeSB8fCAodmlldyAmJiB2aWV3LmVudHJ5KSB8fCBjb250ZXh0O1xyXG5cclxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LiRrZXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wcG9ydHVuaXR5RmllbGQgPSB0aGlzLmZpZWxkcy5PcHBvcnR1bml0eTtcclxuICAgIG9wcG9ydHVuaXR5RmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKG9wcG9ydHVuaXR5RmllbGQuZ2V0VmFsdWUoKSwgb3Bwb3J0dW5pdHlGaWVsZCk7XHJcbiAgfSxcclxuICBoaWRlQnVzeTogZnVuY3Rpb24gaGlkZUJ1c3koKSB7XHJcbiAgICBpZiAodGhpcy5fYnVzeUluZGljYXRvcikge1xyXG4gICAgICB0aGlzLl9idXN5SW5kaWNhdG9yLmNvbXBsZXRlKCk7XHJcbiAgICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgQXBwLm1vZGFsLmhpZGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dCdXN5OiBmdW5jdGlvbiBzaG93QnVzeSgpIHtcclxuICAgIGlmICghdGhpcy5fYnVzeUluZGljYXRvciB8fCB0aGlzLl9idXN5SW5kaWNhdG9yLl9kZXN0cm95ZWQpIHtcclxuICAgICAgdGhpcy5fYnVzeUluZGljYXRvciA9IG5ldyBCdXN5SW5kaWNhdG9yKHsgaWQ6IGAke3RoaXMuaWR9LWJ1c3lJbmRpY2F0b3JgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYnVzeUluZGljYXRvci5zdGFydCgpO1xyXG4gICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IHRydWU7XHJcbiAgICBBcHAubW9kYWwuc2hvd1Rvb2xiYXIgPSBmYWxzZTtcclxuICAgIEFwcC5tb2RhbC5hZGQodGhpcy5fYnVzeUluZGljYXRvcik7XHJcbiAgfSxcclxuICBzaG93UHJvbW90ZWRGaWVsZHM6IGZ1bmN0aW9uIHNob3dQcm9tb3RlZEZpZWxkcygpIHtcclxuICAgIHRoaXMuZmllbGRzLkJpbGxUby5zaG93KCk7XHJcbiAgICB0aGlzLmZpZWxkcy5TaGlwVG8uc2hvdygpO1xyXG4gIH0sXHJcbiAgc2hvd1VucHJvbW90ZWRGaWVsZHM6IGZ1bmN0aW9uIHNob3dVbnByb21vdGVkRmllbGRzKCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmlsbGluZ0NvbnRhY3Quc2hvdygpO1xyXG4gICAgdGhpcy5maWVsZHMuU2hpcHBpbmdDb250YWN0LnNob3coKTtcclxuICB9LFxyXG4gIGZvcm1hdERlcGVuZGVudFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXREZXBlbmRlbnRRdWVyeShkZXBlbmRlbnRWYWx1ZSwgdGhlRm9ybWF0LCBwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdGl0dXRlKHRoZUZvcm1hdCwgW3V0aWxpdHkuZ2V0VmFsdWUoZGVwZW5kZW50VmFsdWUsIHByb3BlcnR5IHx8ICcka2V5JyldKTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnQWNjb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X3JlbGF0ZWQnLFxyXG4gICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnT3Bwb3J0dW5pdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3Bwb3J0dW5pdHknLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgdmlldzogJ29wcG9ydHVuaXR5X3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiBgU3RhdHVzIGVxIFwiJHt0aGlzLm9wcG9ydHVuaXR5T3BlbkNvZGV9XCJgLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFja09mZmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0JhY2tPZmZpY2UnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdCYWNrT2ZmaWNlTmFtZScsXHJcbiAgICAgICAgdmlldzogJ3F1b3RlX2JhY2tvZmZpY2VfcmVsYXRlZCcsXHJcbiAgICAgICAgd2hlcmU6ICdJc0FjdGl2ZSBlcSB0cnVlJyxcclxuICAgICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudGluZ0VudGl0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTmFtZScsXHJcbiAgICAgICAgdmlldzogJ3F1b3RlX2JhY2tvZmZpY2VhY2NvdW50aW5nZW50aXR5X3JlbGF0ZWQnLFxyXG4gICAgICAgIGluY2x1ZGU6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jdXJyZW5jeVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdDdXJyZW5jeSBDb2RlcycsXHJcbiAgICAgICAgc2luZ2xlU2VsZWN0OiB0cnVlLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ2NvZGUnLFxyXG4gICAgICAgIGtleVByb3BlcnR5OiAnY29kZScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGFydERhdGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTdGFydERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhcnREYXRlJyxcclxuICAgICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgICAgdGltZWxlc3M6IGZhbHNlLFxyXG4gICAgICAgIHNob3dUaW1lUGlja2VyOiB0cnVlLFxyXG4gICAgICAgIHNob3dSZWxhdGl2ZURhdGVUaW1lOiBmYWxzZSxcclxuICAgICAgICBkYXRlRm9ybWF0VGV4dDogdGhpcy5kYXRlRm9ybWF0LFxyXG4gICAgICAgIG1pblZhbHVlOiAobmV3IERhdGUoMTkwMCwgMCwgMSkpLFxyXG4gICAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgICAgdmFsaWRhdG9yLmlzRGF0ZUluUmFuZ2UsXHJcbiAgICAgICAgXSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVuZERhdGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFbmREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VuZERhdGUnLFxyXG4gICAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgICB0aW1lbGVzczogZmFsc2UsXHJcbiAgICAgICAgc2hvd1RpbWVQaWNrZXI6IHRydWUsXHJcbiAgICAgICAgc2hvd1JlbGF0aXZlRGF0ZVRpbWU6IGZhbHNlLFxyXG4gICAgICAgIGRhdGVGb3JtYXRUZXh0OiB0aGlzLmRhdGVGb3JtYXQsXHJcbiAgICAgICAgbWluVmFsdWU6IChuZXcgRGF0ZSgxOTAwLCAwLCAxKSksXHJcbiAgICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgICB2YWxpZGF0b3IuaXNEYXRlSW5SYW5nZSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXhwZWN0ZWREZWxpdmVyeURhdGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeHBlY3RlZERlbGl2ZXJ5RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeHBlY3RlZERlbGl2ZXJ5RGF0ZScsXHJcbiAgICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICAgIHRpbWVsZXNzOiBmYWxzZSxcclxuICAgICAgICBzaG93VGltZVBpY2tlcjogdHJ1ZSxcclxuICAgICAgICBzaG93UmVsYXRpdmVEYXRlVGltZTogZmFsc2UsXHJcbiAgICAgICAgZGF0ZUZvcm1hdFRleHQ6IHRoaXMuZGF0ZUZvcm1hdCxcclxuICAgICAgICBtaW5WYWx1ZTogKG5ldyBEYXRlKDE5MDAsIDAsIDEpKSxcclxuICAgICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICAgIHZhbGlkYXRvci5pc0RhdGVJblJhbmdlLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jdXN0b21lclJGUVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0N1c3RvbWVyUkZRTnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0N1c3RvbWVyUkZRTnVtYmVyJyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jb21tZW50c1RleHQsIC8vIFRPRE86IE1ha2Ugb24gc2F2ZSwgYXBwZW5kICdDcmVhdGVkIGJ5IDx1c2VyPiBvbiA8ZGF0ZXRpbWU+JyB0byBjb21tZW50XHJcbiAgICAgICAgbm90ZVByb3BlcnR5OiBmYWxzZSxcclxuICAgICAgICBuYW1lOiAnQ29tbWVudHMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29tbWVudHMnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbW1lbnRzVGV4dCxcclxuICAgICAgICB0eXBlOiAnbm90ZScsXHJcbiAgICAgICAgdmlldzogJ3RleHRfZWRpdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5sb2NhdGlvblRleHQsXHJcbiAgICAgICAgbmFtZTogJ0xvY2F0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xvY2F0aW9uJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9sb2NhdGlvbl9saXN0JyxcclxuICAgICAgICB0aXRsZTogdGhpcy5sb2NhdGlvbnNUaXRsZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwTG9jYXRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTG9jYXRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy53YXJlaG91c2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdXYXJlaG91c2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnV2FyZWhvdXNlJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV93YXJlaG91c2VfbGlzdCcsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMud2FyZWhvdXNlTG9jYXRpb25UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVxdWVzdGVkQnlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdSZXF1ZXN0ZWRCeScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdSZXF1ZXN0ZWRCeScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWVMRicsXHJcbiAgICAgICAgdmlldzogJ2NvbnRhY3RfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdRdW90ZSBTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhdHVzJyxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnRXJwUXVvdGVTdGF0dXMnLFxyXG4gICAgICAgIHNpbmdsZVNlbGVjdDogdHJ1ZSxcclxuICAgICAgICB0aXRsZVRleHQ6IHRoaXMuc3RhdHVzVGl0bGUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdBY2NvdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iaWxsVG9UZXh0LFxyXG4gICAgICAgIG5hbWU6ICdCaWxsVG8nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQmlsbFRvJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQWRkcmVzcy5GdWxsQWRkcmVzcycsXHJcbiAgICAgICAgdmlldzogJ3F1b3RlX2JpbGxUb3NfcmVsYXRlZCcsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0RGVwZW5kZW50UXVlcnkuYmluZERlbGVnYXRlKFxyXG4gICAgICAgICAgdGhpcywgJ0VycEJpbGxUb0FjY291bnRzLkFjY291bnQuSWQgZXEgXCIkezB9XCInXHJcbiAgICAgICAgKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGRlcGVuZHNPbjogJ0FjY291bnQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJpbGxpbmdDb250YWN0VGV4dCxcclxuICAgICAgICBuYW1lOiAnQmlsbGluZ0NvbnRhY3QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQmlsbGluZ0NvbnRhY3QnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcFRvVGV4dCxcclxuICAgICAgICBuYW1lOiAnU2hpcFRvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NoaXBUbycsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0FkZHJlc3MuRnVsbEFkZHJlc3MnLFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9zaGlwVG9zX3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdERlcGVuZGVudFF1ZXJ5LmJpbmREZWxlZ2F0ZShcclxuICAgICAgICAgIHRoaXMsICdFcnBTaGlwVG9BY2NvdW50cy5BY2NvdW50LklkIGVxIFwiJHswfVwiJ1xyXG4gICAgICAgICksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNhcnJpZXJUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDYXJyaWVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhcnJpZXInLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdDYXJyaWVyTmFtZScsXHJcbiAgICAgICAgdmlldzogJ3F1b3RlX2NhcnJpZXJzJyxcclxuICAgICAgICB3aGVyZTogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYEVycExvZ2ljYWxJZCBlcSBcIiR7dmFsdWV9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdBY2NvdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwcGluZ0NvbnRhY3RUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTaGlwcGluZ0NvbnRhY3QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2hpcHBpbmdDb250YWN0JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRyb3BTaGlwbWVudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Ryb3BTaGlwbWVudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEcm9wU2hpcCcsXHJcbiAgICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgICAgb25UZXh0OiB0aGlzLnllc1RleHQsXHJcbiAgICAgICAgb2ZmVGV4dDogdGhpcy5ub1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5lYXJseVNoaXBtZW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnRWFybHlTaGlwbWVudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTaGlwRWFybHknLFxyXG4gICAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgIG9uVGV4dDogdGhpcy55ZXNUZXh0LFxyXG4gICAgICAgIG9mZlRleHQ6IHRoaXMubm9UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGFydGlhbFNoaXBUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQYXJ0aWFsU2hpcG1lbnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUGFydGlhbFNoaXAnLFxyXG4gICAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgIG9uVGV4dDogdGhpcy55ZXNUZXh0LFxyXG4gICAgICAgIG9mZlRleHQ6IHRoaXMubm9UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudE1hbmFnZXJUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TWFuYWdlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50TWFuYWdlcicsXHJcbiAgICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTmFtZScsXHJcbiAgICAgIH0sXHJcbiAgICAgIF0gfSxcclxuICAgIF0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLlF1b3Rlcy5FZGl0JywgX19jbGFzcyk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5RdW90ZXMuRWRpdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=