define('crm/Integrations/BOE/Views/SalesOrders/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/Utility', 'argos/Edit', 'argos/Models/Adapter', 'crm/Validator', '../../Models/Names', 'crm/Models/Names', 'argos/Dialogs/BusyIndicator', 'argos/I18n', '../../Utility'], function (module, exports, _declare, _lang, _string, _Utility, _Edit, _Adapter, _Validator, _Names, _Names3, _BusyIndicator, _I18n, _Utility3) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _Adapter2 = _interopRequireDefault(_Adapter);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Names2 = _interopRequireDefault(_Names);

  var _Names4 = _interopRequireDefault(_Names3);

  var _BusyIndicator2 = _interopRequireDefault(_BusyIndicator);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  const resource = (0, _I18n2.default)('salesOrderEdit');
  const contactResource = (0, _I18n2.default)('contactModel');
  const dtFormatResource = (0, _I18n2.default)('salesOrderEditDateTimeFormat');

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SalesOrders.Edit', [_Edit2.default], {
    // View Properties
    id: 'salesorder_edit',
    detailView: 'salesorder_detail',
    insertSecurity: 'Entities/SalesOrder/Add',
    updateSecurity: 'Entities/SalesOrder/Edit',
    resourceKind: 'salesOrders',
    opportunityOpenCode: 'Open',
    warehouseCode: 'Warehouse',
    officeCode: 'Office',
    siteCode: 'Site',
    modelName: _Names2.default.SALESORDER,
    _busyIndicator: null,
    locationType: '',

    // Localization
    titleText: resource.titleText,
    orderNumberText: resource.orderNumberText,
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
    dueDateText: resource.dueDateText,
    dateFormat: dtFormatResource.dateFormat,
    commentsText: resource.commentsText,
    productsText: resource.productsText,
    accountProducts: resource.accountProducts,
    requestedByText: resource.requestedByText,
    backOrderedText: resource.backOrderedText,
    taxExemptText: resource.taxExemptText,
    invoiceImmediatelyText: resource.invoiceImmediatelyText,
    dropShipmentText: resource.dropShipmentText,
    earlyShipmentText: resource.earlyShipmentText,
    partialShipText: resource.partialShipText,
    statusText: resource.statusText,
    statusTitle: resource.statusTitle,
    typeText: resource.typeText,
    typeTitle: resource.typeTitle,
    customerPOText: resource.customerPOText,
    currencyText: resource.currencyText,
    backOfficeText: resource.backOfficeText,
    accountingEntityText: resource.accountingEntityText,
    warehouseText: resource.warehouseText,
    warehouseLocationText: resource.warehouseLocationText,
    locationText: resource.locationText,
    locationsTitleText: resource.locationsTitleText,
    carrierText: resource.carrierText,

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
        this.fields.Warehouse.required = false;
        this.fields.Warehouse.validator = undefined;
      }
    },
    insert: function insert() {
      this.fields.Location.show();
      this.fields.Warehouse.show();
      this.inherited(insert, arguments);
    },
    processData: function processData() {
      this.showBusy();
      this.inherited(processData, arguments);
      this.getEntriesFromIds();
    },
    beforeTransitionTo: function beforeTransitionTo() {
      this.inherited(beforeTransitionTo, arguments);
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
      if (values.ErpBillTo) {
        values.ErpBillTo = {
          $key: values.ErpBillTo.$key
        };
      }
      if (values.ErpShipTo) {
        values.ErpShipTo = {
          $key: values.ErpShipTo.$key
        };
      }
      return values;
    },
    processEntry: function processEntry(entry) {
      if (entry && entry.Account) {
        ['RequestedBy', 'Opportunity'].forEach(f => {
          this.fields[f].dependsOn = 'Account';
          this.fields[f].where = `Account.Id eq "${entry.Account.AccountId || entry.Account.$key || entry.Account.key}"`;
          if (f === 'Opportunity') {
            this.fields[f].where = `${this.fields[f].where} and Status eq "${this.opportunityOpenCode}"`;
          }
        });
      }
      const warehouseField = this.fields.Warehouse;
      const locationField = this.fields.Location;
      if (entry && entry.ErpLogicalId) {
        warehouseField.enable();
        warehouseField.dependsOn = 'ErpLogicalId';
        warehouseField.where = logicalId => {
          return `ErpLogicalId eq "${logicalId}" and LocationType eq "${this.warehouseCode}"`;
        };
        locationField.enable();
        locationField.dependsOn = 'ErpLogicalId';
        locationField.where = logicalId => {
          return `ErpLogicalId eq "${logicalId}" and (LocationType eq "${this.officeCode}" or LocationType eq "${this.siteCode}")`;
        };
      } else {
        warehouseField.disable();
        warehouseField.validator = undefined;
        warehouseField.required = false;
        locationField.disable();
      }
      if (entry.WarehouseLocation) {
        warehouseField.setValue(entry.WarehouseLocation);
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
        const account = this.fields.Account.currentSelection;
        if (account && account.CurrencyCode) {
          this.fields.CurrencyCode.setValue(account.CurrencyCode);
        } else {
          this.fields.CurrencyCode.setValue(App.getBaseExchangeRate().code);
        }
      }
    },
    onRefresh: function onRefresh() {
      this.inherited(onRefresh, arguments);
      ['RequestedBy', 'Opportunity', 'Warehouse', 'Location'].forEach(f => {
        this.fields[f].dependsOn = null;
        this.fields[f].where = null;
      });
    },
    onRefreshInsert: function onRefreshInsert() {
      this.inherited(onRefreshInsert, arguments);
      this.enableBackOfficeData();
    },
    getEntriesFromIds: function getEntriesFromIds() {
      const mappedLookups = ['BackOffice', 'BackOfficeAccountingEntity'];
      const mappedProperties = ['LogicalId', 'AcctEntityExtId'];
      const fields = ['ErpLogicalId', 'ErpAccountingEntityId'];
      _Utility4.default.setFieldsFromIds(mappedLookups, mappedProperties, fields, this).then(() => {
        this.hideBusy();
      });
    },
    getPrimaryContact: function getPrimaryContact(entry) {
      const accountModel = _Adapter2.default.getModel(_Names4.default.ACCOUNT);
      const relationship = {
        name: 'Contacts',
        displayName: contactResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Contact',
        relatedProperty: 'Account',
        relatedPropertyType: 'object',
        where: 'IsPrimary eq true'
      };
      accountModel.getRelatedRequest(entry, relationship).then(result => {
        if (result && result.entities && result.entities.length) {
          const contactField = this.fields.RequestedBy;
          if (!contactField.currentSelection || contactField.currentSelection.Account && contactField.currentSelection.Account.$key !== entry.$key) {
            contactField.setSelection(result.entities[0]);
          }
        }
      });
    },
    onAccountChange: function onAccountChange(value, field) {
      const entry = field.currentSelection;
      ['RequestedBy', 'Opportunity'].forEach(f => {
        if (value) {
          this.fields[f].dependsOn = 'Account';
          this.fields[f].where = `Account.Id eq "${value.AccountId || value.$key || value.key}"`;
        }
      });
      if (entry) {
        this.fields.CurrencyCode.setValue(entry.CurrencyCode ? entry.CurrencyCode : App.getBaseExchangeRate().code);
        if (this.fields.BillTo.isDisabled && this.fields.ShipTo.isDisabled) {
          this.fields.BillTo.enable();
          this.fields.ShipTo.enable();
        }
        if (entry.AccountManager) {
          const accountManagerField = this.fields.AccountManager;
          accountManagerField.setSelection({
            $key: entry.AccountManager.$key
          });
        }
        field.setValue(field.currentSelection);
        this.showBusy();
        this.getPrimaryContact(entry);
        _Utility4.default.setFieldsFromIds(['BackOffice', 'BackOfficeAccountingEntity'], ['LogicalId', 'AcctEntityExtId'], ['ErpLogicalId', 'ErpAccountingEntityId'], this, entry).then(() => {
          this.hideBusy();
        });
      }
    },
    onAccountDependentChange: function onAccountDependentChange(value, field) {
      if (value && !field.dependsOn && field.currentSelection && field.currentSelection.Account) {
        const accountField = this.fields.Account;
        accountField.setSelection(field.currentSelection.Account);
        this.onAccountChange(accountField.getValue(), accountField);
      }
    },
    onBackOfficeChange: function onBackOfficeChange(value, field) {
      this.fields.BackOffice.setValue(field.currentSelection);
      this.fields.ErpLogicalId.setValue(field.currentSelection.LogicalId);
      const accountingField = this.fields.BackOfficeAccountingEntity;
      accountingField.where = `BackOffice.Id eq "${field.currentSelection.$key}"`;

      const accountingIsToBackOffice = accountingField.currentSelection && accountingField.currentSelection.BackOffice && accountingField.currentSelection.BackOffice.$key === field.currentSelection.$key;
      if (field.currentSelection.BackOfficeAccountingEntities.$resources && !accountingIsToBackOffice) {
        const entry = field.currentSelection.BackOfficeAccountingEntities.$resources[0];
        if (entry) {
          accountingField.setSelection(entry);
          this.onBackOfficeAccountingEntityChange(accountingField.getValue(), accountingField);
        }
      }
      const warehouseField = this.fields.Warehouse;
      if (warehouseField.isDisabled) {
        warehouseField.enable();
        warehouseField.dependsOn = 'ErpLogicalId';
        warehouseField.where = logicalId => {
          return `ErpLogicalId eq "${logicalId}" and LocationType eq "${this.warehouseCode}"`;
        };
      }
      const locationField = this.fields.Location;
      if (locationField.isDisabled) {
        locationField.enable();
        locationField.dependsOn = 'ErpLogicalId';
        locationField.where = logicalId => {
          return `ErpLogicalId eq "${logicalId}" and (LocationType eq "${this.officeCode}" or LocationType eq "${this.siteCode}")`;
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
      const found = this._getNavContext();

      const accountField = this.fields.Account;
      this.onAccountChange(accountField.getValue(), accountField);

      const context = found && found.options && found.options.source || found;
      const lookup = {
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
      const navContext = App.queryNavigationContext(o => {
        const context = o.options && o.options.source || o;

        if (/^(accounts|contacts|opportunities)$/.test(context.resourceKind) && context.key) {
          return true;
        }

        return false;
      });
      return navContext;
    },
    applyAccountContext: function applyAccountContext(context) {
      const view = App.getView(context.id);
      const entry = context.entry || view && view.entry || context;

      if (!entry || !entry.$key) {
        return;
      }

      const accountField = this.fields.Account;
      accountField.setSelection(entry);
      this.onAccountChange(accountField.getValue(), accountField);
    },
    applyContactContext: function applyContactContext(context) {
      const view = App.getView(context.id);
      const entry = context.entry || view && view.entry || context;

      if (!entry || !entry.$key) {
        return;
      }

      const contactField = this.fields.RequestedBy;
      contactField.setSelection(entry);
      this.onAccountDependentChange(contactField.getValue(), contactField);
    },
    applyOpportunityContext: function applyOpportunityContext(context) {
      const view = App.getView(context.id);
      const entry = context.entry || view && view.entry || context;

      if (!entry || !entry.$key) {
        return;
      }

      const opportunityField = this.fields.Opportunity;
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
        this._busyIndicator = new _BusyIndicator2.default({ id: `${this.id}-busyIndicator` });
      }
      this._busyIndicator.start();
      App.modal.disableClose = true;
      App.modal.showToolbar = false;
      App.modal.add(this._busyIndicator);
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
          required: true,
          validator: _Validator2.default.exists
        }, {
          label: this.opportunityText,
          name: 'Opportunity',
          property: 'Opportunity',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Description',
          view: 'opportunity_related'
        }, {
          label: this.backOfficeText,
          name: 'BackOffice',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'BackOfficeName',
          view: 'salesorder_backoffice_related',
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
          view: 'salesorder_backofficeaccountingentity_related',
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
          keyProperty: 'code',
          required: true,
          requireSelection: true,
          validator: _Validator2.default.picklistExists
        }, {
          label: this.dueDateText,
          name: 'DueDate',
          property: 'DueDate',
          type: 'date',
          timeless: false,
          showTimePicker: true,
          showRelativeDateTime: false,
          dateFormatText: this.dateFormat,
          minValue: new Date(1900, 0, 1),
          validator: [_Validator2.default.isDateInRange]
        }, {
          label: this.customerPOText,
          name: 'CustomerPONumber',
          property: 'CustomerPurchaseOrderNumber',
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
          view: 'order_location_list',
          title: this.locationsTitleText
        }, {
          name: 'ErpLocation',
          property: 'ErpLocation',
          type: 'hidden',
          emptyText: ''
        }, {
          label: this.warehouseText,
          name: 'Warehouse',
          property: 'WarehouseLocation',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Description',
          view: 'order_warehouse_list',
          title: this.warehouseLocationText,
          required: true,
          validator: _Validator2.default.exists
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
          name: 'Sales Order Status',
          property: 'Status',
          type: 'picklist',
          picklist: 'ErpSalesOrderStatus',
          singleSelect: true,
          titleText: this.statusTitle
        }, {
          dependsOn: 'Account',
          label: this.billToText,
          name: 'BillTo',
          property: 'ErpBillTo',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Address.FullAddress',
          view: 'salesorder_billTo_related',
          where: this.formatDependentQuery.bindDelegate(this, 'ErpBillToAccounts.Account.Id eq "${0}"')
        }, {
          dependsOn: 'Account',
          label: this.shipToText,
          name: 'ShipTo',
          property: 'ErpShipTo',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Address.FullAddress',
          view: 'salesorder_shipTo_related',
          where: this.formatDependentQuery.bindDelegate(this, 'ErpShipToAccounts.Account.Id eq "${0}"')
        }, {
          dependsOn: 'ErpLogicalId',
          label: this.carrierText,
          name: 'Carrier',
          property: 'Carrier',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'CarrierName',
          view: 'salesorder_carriers',
          where: value => {
            return `ErpLogicalId eq "${value}"`;
          }
        }, {
          label: this.backOrderedText,
          name: 'BackOrdered',
          property: 'ErpBackOrdered',
          include: true,
          type: 'boolean',
          onText: this.yesText,
          offText: this.noText
        }, {
          label: this.dropShipmentText,
          name: 'DropShipment',
          property: 'ErpDropShip',
          include: true,
          type: 'boolean',
          onText: this.yesText,
          offText: this.noText
        }, {
          label: this.earlyShipmentText,
          name: 'EarlyShipment',
          property: 'ErpShipEarly',
          include: true,
          type: 'boolean',
          onText: this.yesText,
          offText: this.noText
        }, {
          label: this.invoiceImmediatelyText,
          name: 'InvoiceImmediately',
          property: 'ErpInvoiceImmediately',
          include: true,
          type: 'boolean',
          onText: this.yesText,
          offText: this.noText
        }, {
          label: this.partialShipText,
          name: 'PartialShipment',
          property: 'ErpPartialShipAllowed',
          include: true,
          type: 'boolean',
          onText: this.yesText,
          offText: this.noText
        }, {
          label: this.taxExemptText,
          name: 'TaxExempt',
          property: 'ErpTaxExempt',
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

  _lang2.default.setObject('icboe.Views.SalesOrders.Edit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});