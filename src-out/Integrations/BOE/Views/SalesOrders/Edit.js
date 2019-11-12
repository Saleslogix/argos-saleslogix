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

  var resource = (0, _I18n2.default)('salesOrderEdit');
  var contactResource = (0, _I18n2.default)('contactModel');
  var dtFormatResource = (0, _I18n2.default)('salesOrderEditDateTimeFormat');

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
  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SalesOrders.Edit', [_Edit2.default], {
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
      this.fields.Location.show();
      this.fields.Warehouse.show();
      this.inherited(arguments);
    },
    processData: function processData() {
      this.showBusy();
      this.inherited(arguments);
      this.getEntriesFromIds();
    },
    beforeTransitionTo: function beforeTransitionTo() {
      this.inherited(arguments);
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
      var _this = this;

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
      ['RequestedBy', 'Opportunity', 'Warehouse', 'Location'].forEach(function (f) {
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

      var accountModel = _Adapter2.default.getModel(_Names4.default.ACCOUNT);
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
          }
        }
      });
    },
    onAccountChange: function onAccountChange(value, field) {
      var _this5 = this;

      var entry = field.currentSelection;
      ['RequestedBy', 'Opportunity'].forEach(function (f) {
        if (value) {
          _this5.fields[f].dependsOn = 'Account';
          _this5.fields[f].where = 'Account.Id eq "' + (value.AccountId || value.$key || value.key) + '"';
        }
      });
      if (entry) {
        this.fields.CurrencyCode.setValue(entry.CurrencyCode ? entry.CurrencyCode : App.getBaseExchangeRate().code);
        if (this.fields.BillTo.isDisabled && this.fields.ShipTo.isDisabled) {
          this.fields.BillTo.enable();
          this.fields.ShipTo.enable();
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
          where: function where(value) {
            return 'ErpLogicalId eq "' + value + '"';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJzL0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJjb250YWN0UmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsImlkIiwiZGV0YWlsVmlldyIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJyZXNvdXJjZUtpbmQiLCJvcHBvcnR1bml0eU9wZW5Db2RlIiwid2FyZWhvdXNlQ29kZSIsIm9mZmljZUNvZGUiLCJzaXRlQ29kZSIsIm1vZGVsTmFtZSIsIlNBTEVTT1JERVIiLCJfYnVzeUluZGljYXRvciIsImxvY2F0aW9uVHlwZSIsInRpdGxlVGV4dCIsIm9yZGVyTnVtYmVyVGV4dCIsIm9yZGVySWRUZXh0IiwiYWNjb3VudFRleHQiLCJvcHBvcnR1bml0eVRleHQiLCJkYXRlQ3JlYXRlZFRleHQiLCJlcnBTdGF0dXNUZXh0Iiwic3ViVG90YWxUZXh0IiwiZ3JhbmRUb3RhbFRleHQiLCJiaWxsVG9UZXh0Iiwic2hpcFRvVGV4dCIsInBheUZyb21UZXh0IiwiZHVlRGF0ZVRleHQiLCJkYXRlRm9ybWF0IiwiY29tbWVudHNUZXh0IiwicHJvZHVjdHNUZXh0IiwiYWNjb3VudFByb2R1Y3RzIiwicmVxdWVzdGVkQnlUZXh0IiwiYmFja09yZGVyZWRUZXh0IiwidGF4RXhlbXB0VGV4dCIsImludm9pY2VJbW1lZGlhdGVseVRleHQiLCJkcm9wU2hpcG1lbnRUZXh0IiwiZWFybHlTaGlwbWVudFRleHQiLCJwYXJ0aWFsU2hpcFRleHQiLCJzdGF0dXNUZXh0Iiwic3RhdHVzVGl0bGUiLCJ0eXBlVGV4dCIsInR5cGVUaXRsZSIsImN1c3RvbWVyUE9UZXh0IiwiY3VycmVuY3lUZXh0IiwiYmFja09mZmljZVRleHQiLCJhY2NvdW50aW5nRW50aXR5VGV4dCIsIndhcmVob3VzZVRleHQiLCJ3YXJlaG91c2VMb2NhdGlvblRleHQiLCJsb2NhdGlvblRleHQiLCJsb2NhdGlvbnNUaXRsZVRleHQiLCJjYXJyaWVyVGV4dCIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiQWNjb3VudCIsIm9uQWNjb3VudENoYW5nZSIsIlJlcXVlc3RlZEJ5Iiwib25Db250YWN0Q2hhbmdlIiwiT3Bwb3J0dW5pdHkiLCJvbk9wcG9ydHVuaXR5Q2hhbmdlIiwiQmlsbFRvIiwib25CaWxsVG9DaGFuZ2UiLCJTaGlwVG8iLCJvblNoaXBUb0NoYW5nZSIsIkJhY2tPZmZpY2UiLCJvbkJhY2tPZmZpY2VDaGFuZ2UiLCJCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eSIsIm9uQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlDaGFuZ2UiLCJMb2NhdGlvbiIsIm9uTG9jYXRpb25DaGFuZ2UiLCJXYXJlaG91c2UiLCJvbldhcmVob3VzZUNoYW5nZSIsIkFwcCIsImNvbnRleHQiLCJpbnRlZ3JhdGlvblNldHRpbmdzIiwiaGlkZSIsInNob3ciLCJpbnNlcnQiLCJwcm9jZXNzRGF0YSIsInNob3dCdXN5IiwiZ2V0RW50cmllc0Zyb21JZHMiLCJiZWZvcmVUcmFuc2l0aW9uVG8iLCJBY2NvdW50TWFuYWdlciIsImlzRGlzYWJsZWQiLCJkaXNhYmxlIiwiZW5hYmxlIiwiZGlzYWJsZUJhY2tPZmZpY2VEYXRhIiwiZW5hYmxlQmFja09mZmljZURhdGEiLCJjb252ZXJ0VmFsdWVzIiwidmFsdWVzIiwiRXJwQmlsbFRvIiwiJGtleSIsIkVycFNoaXBUbyIsInByb2Nlc3NFbnRyeSIsImVudHJ5IiwiZm9yRWFjaCIsImYiLCJkZXBlbmRzT24iLCJ3aGVyZSIsIkFjY291bnRJZCIsImtleSIsIndhcmVob3VzZUZpZWxkIiwibG9jYXRpb25GaWVsZCIsIkVycExvZ2ljYWxJZCIsImxvZ2ljYWxJZCIsIldhcmVob3VzZUxvY2F0aW9uIiwic2V0VmFsdWUiLCJFcnBFeHRJZCIsInNldFZhbHVlcyIsIkN1cnJlbmN5Q29kZSIsImdldFZhbHVlIiwiYWNjb3VudCIsImN1cnJlbnRTZWxlY3Rpb24iLCJnZXRCYXNlRXhjaGFuZ2VSYXRlIiwiY29kZSIsIm9uUmVmcmVzaCIsIm9uUmVmcmVzaEluc2VydCIsIm1hcHBlZExvb2t1cHMiLCJtYXBwZWRQcm9wZXJ0aWVzIiwic2V0RmllbGRzRnJvbUlkcyIsInRoZW4iLCJoaWRlQnVzeSIsImdldFByaW1hcnlDb250YWN0IiwiYWNjb3VudE1vZGVsIiwiZ2V0TW9kZWwiLCJBQ0NPVU5UIiwicmVsYXRpb25zaGlwIiwibmFtZSIsImRpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJ0eXBlIiwicmVsYXRlZEVudGl0eSIsInJlbGF0ZWRQcm9wZXJ0eSIsInJlbGF0ZWRQcm9wZXJ0eVR5cGUiLCJnZXRSZWxhdGVkUmVxdWVzdCIsInJlc3VsdCIsImVudGl0aWVzIiwibGVuZ3RoIiwiY29udGFjdEZpZWxkIiwic2V0U2VsZWN0aW9uIiwidmFsdWUiLCJmaWVsZCIsImFjY291bnRNYW5hZ2VyRmllbGQiLCJvbkFjY291bnREZXBlbmRlbnRDaGFuZ2UiLCJhY2NvdW50RmllbGQiLCJMb2dpY2FsSWQiLCJhY2NvdW50aW5nRmllbGQiLCJhY2NvdW50aW5nSXNUb0JhY2tPZmZpY2UiLCJCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0aWVzIiwiJHJlc291cmNlcyIsIkVycEFjY291bnRpbmdFbnRpdHlJZCIsIkFjY3RFbnRpdHlFeHRJZCIsIm9uTG9jYXRpb25DaGFuY2UiLCJFcnBMb2NhdGlvbiIsImFwcGx5Q29udGV4dCIsImZvdW5kIiwiX2dldE5hdkNvbnRleHQiLCJvcHRpb25zIiwic291cmNlIiwibG9va3VwIiwiYWNjb3VudHMiLCJhcHBseUFjY291bnRDb250ZXh0IiwiY29udGFjdHMiLCJhcHBseUNvbnRhY3RDb250ZXh0Iiwib3Bwb3J0dW5pdGllcyIsImFwcGx5T3Bwb3J0dW5pdHlDb250ZXh0IiwiY2FsbCIsImN1cnJlbnRWYWx1ZSIsIm5hdkNvbnRleHQiLCJxdWVyeU5hdmlnYXRpb25Db250ZXh0IiwibyIsInRlc3QiLCJ2aWV3IiwiZ2V0VmlldyIsIm9wcG9ydHVuaXR5RmllbGQiLCJjb21wbGV0ZSIsIm1vZGFsIiwiZGlzYWJsZUNsb3NlIiwiX2Rlc3Ryb3llZCIsInN0YXJ0Iiwic2hvd1Rvb2xiYXIiLCJhZGQiLCJmb3JtYXREZXBlbmRlbnRRdWVyeSIsImRlcGVuZGVudFZhbHVlIiwidGhlRm9ybWF0IiwicHJvcGVydHkiLCJzdWJzdGl0dXRlIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwidGl0bGUiLCJkZXRhaWxzVGV4dCIsImNoaWxkcmVuIiwibGFiZWwiLCJlbXB0eVRleHQiLCJ2YWx1ZVRleHRQcm9wZXJ0eSIsImF1dG9Gb2N1cyIsInJlcXVpcmVkIiwidmFsaWRhdG9yIiwiZXhpc3RzIiwiaW5jbHVkZSIsInBpY2tsaXN0Iiwic2luZ2xlU2VsZWN0IiwidGV4dFByb3BlcnR5Iiwia2V5UHJvcGVydHkiLCJyZXF1aXJlU2VsZWN0aW9uIiwicGlja2xpc3RFeGlzdHMiLCJ0aW1lbGVzcyIsInNob3dUaW1lUGlja2VyIiwic2hvd1JlbGF0aXZlRGF0ZVRpbWUiLCJkYXRlRm9ybWF0VGV4dCIsIm1pblZhbHVlIiwiRGF0ZSIsImlzRGF0ZUluUmFuZ2UiLCJub3RlUHJvcGVydHkiLCJiaW5kRGVsZWdhdGUiLCJvblRleHQiLCJ5ZXNUZXh0Iiwib2ZmVGV4dCIsIm5vVGV4dCIsImFjY291bnRNYW5hZ2VyVGV4dCIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLE1BQU1BLFdBQVcsb0JBQVksZ0JBQVosQ0FBakI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLG1CQUFtQixvQkFBWSw4QkFBWixDQUF6Qjs7QUFFQTs7Ozs7Ozs7Ozs7QUFXQSxNQUFNQyxVQUFVLHVCQUFRLDZDQUFSLEVBQXVELGdCQUF2RCxFQUErRDtBQUM3RTtBQUNB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eXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgQWRhcHRlciBmcm9tICdhcmdvcy9Nb2RlbHMvQWRhcHRlcic7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnY3JtL1ZhbGlkYXRvcic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgQ1JNX01PREVMX05BTUVTIGZyb20gJ2NybS9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgQnVzeUluZGljYXRvciBmcm9tICdhcmdvcy9EaWFsb2dzL0J1c3lJbmRpY2F0b3InO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBVdGlsaXR5IGZyb20gJy4uLy4uL1V0aWxpdHknO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlckVkaXQnKTtcclxuY29uc3QgY29udGFjdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NvbnRhY3RNb2RlbCcpO1xyXG5jb25zdCBkdEZvcm1hdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3NhbGVzT3JkZXJFZGl0RGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFjY291bnQuRWRpdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FZGl0XHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBjcm0uVmFsaWRhdG9yXHJcbiAqIEByZXF1aXJlcyBjcm0uVGVtcGxhdGVcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5TYWxlc09yZGVycy5FZGl0JywgW0VkaXRdLCB7XHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdzYWxlc29yZGVyX2VkaXQnLFxyXG4gIGRldGFpbFZpZXc6ICdzYWxlc29yZGVyX2RldGFpbCcsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL0VkaXQnLFxyXG4gIHJlc291cmNlS2luZDogJ3NhbGVzT3JkZXJzJyxcclxuICBvcHBvcnR1bml0eU9wZW5Db2RlOiAnT3BlbicsXHJcbiAgd2FyZWhvdXNlQ29kZTogJ1dhcmVob3VzZScsXHJcbiAgb2ZmaWNlQ29kZTogJ09mZmljZScsXHJcbiAgc2l0ZUNvZGU6ICdTaXRlJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlNBTEVTT1JERVIsXHJcbiAgX2J1c3lJbmRpY2F0b3I6IG51bGwsXHJcbiAgbG9jYXRpb25UeXBlOiAnJyxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgb3JkZXJOdW1iZXJUZXh0OiByZXNvdXJjZS5vcmRlck51bWJlclRleHQsXHJcbiAgb3JkZXJJZFRleHQ6IHJlc291cmNlLm9yZGVySWRUZXh0LFxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBvcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICBkYXRlQ3JlYXRlZFRleHQ6IHJlc291cmNlLmRhdGVDcmVhdGVkVGV4dCxcclxuICBlcnBTdGF0dXNUZXh0OiByZXNvdXJjZS5lcnBTdGF0dXNUZXh0LFxyXG4gIHN1YlRvdGFsVGV4dDogcmVzb3VyY2Uuc3ViVG90YWxUZXh0LFxyXG4gIGdyYW5kVG90YWxUZXh0OiByZXNvdXJjZS5ncmFuZFRvdGFsVGV4dCxcclxuICBiaWxsVG9UZXh0OiByZXNvdXJjZS5iaWxsVG9UZXh0LFxyXG4gIHNoaXBUb1RleHQ6IHJlc291cmNlLnNoaXBUb1RleHQsXHJcbiAgcGF5RnJvbVRleHQ6IHJlc291cmNlLnBheUZyb21UZXh0LFxyXG4gIGR1ZURhdGVUZXh0OiByZXNvdXJjZS5kdWVEYXRlVGV4dCxcclxuICBkYXRlRm9ybWF0OiBkdEZvcm1hdFJlc291cmNlLmRhdGVGb3JtYXQsXHJcbiAgY29tbWVudHNUZXh0OiByZXNvdXJjZS5jb21tZW50c1RleHQsXHJcbiAgcHJvZHVjdHNUZXh0OiByZXNvdXJjZS5wcm9kdWN0c1RleHQsXHJcbiAgYWNjb3VudFByb2R1Y3RzOiByZXNvdXJjZS5hY2NvdW50UHJvZHVjdHMsXHJcbiAgcmVxdWVzdGVkQnlUZXh0OiByZXNvdXJjZS5yZXF1ZXN0ZWRCeVRleHQsXHJcbiAgYmFja09yZGVyZWRUZXh0OiByZXNvdXJjZS5iYWNrT3JkZXJlZFRleHQsXHJcbiAgdGF4RXhlbXB0VGV4dDogcmVzb3VyY2UudGF4RXhlbXB0VGV4dCxcclxuICBpbnZvaWNlSW1tZWRpYXRlbHlUZXh0OiByZXNvdXJjZS5pbnZvaWNlSW1tZWRpYXRlbHlUZXh0LFxyXG4gIGRyb3BTaGlwbWVudFRleHQ6IHJlc291cmNlLmRyb3BTaGlwbWVudFRleHQsXHJcbiAgZWFybHlTaGlwbWVudFRleHQ6IHJlc291cmNlLmVhcmx5U2hpcG1lbnRUZXh0LFxyXG4gIHBhcnRpYWxTaGlwVGV4dDogcmVzb3VyY2UucGFydGlhbFNoaXBUZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgc3RhdHVzVGl0bGU6IHJlc291cmNlLnN0YXR1c1RpdGxlLFxyXG4gIHR5cGVUZXh0OiByZXNvdXJjZS50eXBlVGV4dCxcclxuICB0eXBlVGl0bGU6IHJlc291cmNlLnR5cGVUaXRsZSxcclxuICBjdXN0b21lclBPVGV4dDogcmVzb3VyY2UuY3VzdG9tZXJQT1RleHQsXHJcbiAgY3VycmVuY3lUZXh0OiByZXNvdXJjZS5jdXJyZW5jeVRleHQsXHJcbiAgYmFja09mZmljZVRleHQ6IHJlc291cmNlLmJhY2tPZmZpY2VUZXh0LFxyXG4gIGFjY291bnRpbmdFbnRpdHlUZXh0OiByZXNvdXJjZS5hY2NvdW50aW5nRW50aXR5VGV4dCxcclxuICB3YXJlaG91c2VUZXh0OiByZXNvdXJjZS53YXJlaG91c2VUZXh0LFxyXG4gIHdhcmVob3VzZUxvY2F0aW9uVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlTG9jYXRpb25UZXh0LFxyXG4gIGxvY2F0aW9uVGV4dDogcmVzb3VyY2UubG9jYXRpb25UZXh0LFxyXG4gIGxvY2F0aW9uc1RpdGxlVGV4dDogcmVzb3VyY2UubG9jYXRpb25zVGl0bGVUZXh0LFxyXG4gIGNhcnJpZXJUZXh0OiByZXNvdXJjZS5jYXJyaWVyVGV4dCxcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkFjY291bnQsICdvbkNoYW5nZScsIHRoaXMub25BY2NvdW50Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5SZXF1ZXN0ZWRCeSwgJ29uQ2hhbmdlJywgdGhpcy5vbkNvbnRhY3RDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLk9wcG9ydHVuaXR5LCAnb25DaGFuZ2UnLCB0aGlzLm9uT3Bwb3J0dW5pdHlDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkJpbGxUbywgJ29uQ2hhbmdlJywgdGhpcy5vbkJpbGxUb0NoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuU2hpcFRvLCAnb25DaGFuZ2UnLCB0aGlzLm9uU2hpcFRvQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlLCAnb25DaGFuZ2UnLCB0aGlzLm9uQmFja09mZmljZUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQmFja09mZmljZUFjY291bnRpbmdFbnRpdHksICdvbkNoYW5nZScsIHRoaXMub25CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuTG9jYXRpb24sICdvbkNoYW5nZScsIHRoaXMub25Mb2NhdGlvbkNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuV2FyZWhvdXNlLCAnb25DaGFuZ2UnLCB0aGlzLm9uV2FyZWhvdXNlQ2hhbmdlKTtcclxuICAgIGlmICghdGhpcy5sb2NhdGlvblR5cGUpIHtcclxuICAgICAgdGhpcy5sb2NhdGlvblR5cGUgPSBBcHAuY29udGV4dC5pbnRlZ3JhdGlvblNldHRpbmdzICYmIEFwcC5jb250ZXh0LmludGVncmF0aW9uU2V0dGluZ3NbJ0JhY2sgT2ZmaWNlIEV4dGVuc2lvbiddICYmXHJcbiAgICAgICAgQXBwLmNvbnRleHQuaW50ZWdyYXRpb25TZXR0aW5nc1snQmFjayBPZmZpY2UgRXh0ZW5zaW9uJ11bJ1R5cGUgb2YgT3JkZXIgTG9jYXRpb24nXSB8fCAnJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxvY2F0aW9uVHlwZSA9PT0gJ1dhcmVob3VzZScpIHtcclxuICAgICAgdGhpcy5maWVsZHMuTG9jYXRpb24uaGlkZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5XYXJlaG91c2Uuc2hvdygpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmxvY2F0aW9uVHlwZSAhPT0gJ1dhcmVob3VzZScpIHtcclxuICAgICAgdGhpcy5maWVsZHMuTG9jYXRpb24uc2hvdygpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5XYXJlaG91c2UuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW5zZXJ0OiBmdW5jdGlvbiBpbnNlcnQoKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5Mb2NhdGlvbi5zaG93KCk7XHJcbiAgICB0aGlzLmZpZWxkcy5XYXJlaG91c2Uuc2hvdygpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIHByb2Nlc3NEYXRhOiBmdW5jdGlvbiBwcm9jZXNzRGF0YSgpIHtcclxuICAgIHRoaXMuc2hvd0J1c3koKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmdldEVudHJpZXNGcm9tSWRzKCk7XHJcbiAgfSxcclxuICBiZWZvcmVUcmFuc2l0aW9uVG86IGZ1bmN0aW9uIGJlZm9yZVRyYW5zaXRpb25UbygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBpZiAoIXRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyLmlzRGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQWNjb3VudE1hbmFnZXIuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZmllbGRzLkJpbGxUby5pc0Rpc2FibGVkICYmIHRoaXMuZmllbGRzLlNoaXBUby5pc0Rpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkJpbGxUby5lbmFibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuU2hpcFRvLmVuYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGlzYWJsZUJhY2tPZmZpY2VEYXRhOiBmdW5jdGlvbiBkaXNhYmxlQmFja09mZmljZURhdGEoKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlLmRpc2FibGUoKTtcclxuICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5LmRpc2FibGUoKTtcclxuICB9LFxyXG4gIGVuYWJsZUJhY2tPZmZpY2VEYXRhOiBmdW5jdGlvbiBlbmFibGVCYWNrT2ZmaWNlRGF0YSgpIHtcclxuICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2UuZW5hYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eS5lbmFibGUoKTtcclxuICB9LFxyXG4gIGNvbnZlcnRWYWx1ZXM6IGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZXModmFsdWVzKSB7XHJcbiAgICBpZiAodmFsdWVzLkVycEJpbGxUbykge1xyXG4gICAgICB2YWx1ZXMuRXJwQmlsbFRvID0ge1xyXG4gICAgICAgICRrZXk6IHZhbHVlcy5FcnBCaWxsVG8uJGtleSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZXMuRXJwU2hpcFRvKSB7XHJcbiAgICAgIHZhbHVlcy5FcnBTaGlwVG8gPSB7XHJcbiAgICAgICAgJGtleTogdmFsdWVzLkVycFNoaXBUby4ka2V5LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9LFxyXG4gIHByb2Nlc3NFbnRyeTogZnVuY3Rpb24gcHJvY2Vzc0VudHJ5KGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkgJiYgZW50cnkuQWNjb3VudCkge1xyXG4gICAgICBbJ1JlcXVlc3RlZEJ5JywgJ09wcG9ydHVuaXR5J10uZm9yRWFjaCgoZikgPT4ge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLmRlcGVuZHNPbiA9ICdBY2NvdW50JztcclxuICAgICAgICB0aGlzLmZpZWxkc1tmXS53aGVyZSA9IGBBY2NvdW50LklkIGVxIFwiJHtlbnRyeS5BY2NvdW50LkFjY291bnRJZCB8fCBlbnRyeS5BY2NvdW50LiRrZXkgfHwgZW50cnkuQWNjb3VudC5rZXl9XCJgO1xyXG4gICAgICAgIGlmIChmID09PSAnT3Bwb3J0dW5pdHknKSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkc1tmXS53aGVyZSA9IGAke3RoaXMuZmllbGRzW2ZdLndoZXJlfSBhbmQgU3RhdHVzIGVxIFwiJHt0aGlzLm9wcG9ydHVuaXR5T3BlbkNvZGV9XCJgO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB3YXJlaG91c2VGaWVsZCA9IHRoaXMuZmllbGRzLldhcmVob3VzZTtcclxuICAgIGNvbnN0IGxvY2F0aW9uRmllbGQgPSB0aGlzLmZpZWxkcy5Mb2NhdGlvbjtcclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5FcnBMb2dpY2FsSWQpIHtcclxuICAgICAgd2FyZWhvdXNlRmllbGQuZW5hYmxlKCk7XHJcbiAgICAgIHdhcmVob3VzZUZpZWxkLmRlcGVuZHNPbiA9ICdFcnBMb2dpY2FsSWQnO1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC53aGVyZSA9IChsb2dpY2FsSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gYEVycExvZ2ljYWxJZCBlcSBcIiR7bG9naWNhbElkfVwiIGFuZCBMb2NhdGlvblR5cGUgZXEgXCIke3RoaXMud2FyZWhvdXNlQ29kZX1cImA7XHJcbiAgICAgIH07XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuZW5hYmxlKCk7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuZGVwZW5kc09uID0gJ0VycExvZ2ljYWxJZCc7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQud2hlcmUgPSAobG9naWNhbElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBFcnBMb2dpY2FsSWQgZXEgXCIke2xvZ2ljYWxJZH1cIiBhbmQgKExvY2F0aW9uVHlwZSBlcSBcIiR7dGhpcy5vZmZpY2VDb2RlfVwiIG9yIExvY2F0aW9uVHlwZSBlcSBcIiR7dGhpcy5zaXRlQ29kZX1cIilgO1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2FyZWhvdXNlRmllbGQuZGlzYWJsZSgpO1xyXG4gICAgICBsb2NhdGlvbkZpZWxkLmRpc2FibGUoKTtcclxuICAgIH1cclxuICAgIGlmIChlbnRyeS5XYXJlaG91c2VMb2NhdGlvbikge1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC5zZXRWYWx1ZShlbnRyeS5XYXJlaG91c2VMb2NhdGlvbik7XHJcbiAgICB9XHJcbiAgICBpZiAoZW50cnkuTG9jYXRpb24pIHtcclxuICAgICAgbG9jYXRpb25GaWVsZC5zZXRWYWx1ZShlbnRyeS5Mb2NhdGlvbik7XHJcbiAgICB9XHJcbiAgICBpZiAoZW50cnkgJiYgZW50cnkuRXJwRXh0SWQpIHtcclxuICAgICAgdGhpcy5kaXNhYmxlQmFja09mZmljZURhdGEoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZW5hYmxlQmFja09mZmljZURhdGEoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbnRyeTtcclxuICB9LFxyXG4gIHNldFZhbHVlczogZnVuY3Rpb24gc2V0VmFsdWVzKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZmllbGRzLkN1cnJlbmN5Q29kZS5nZXRWYWx1ZSgpKSB7XHJcbiAgICAgIGNvbnN0IGFjY291bnQgPSB0aGlzLmZpZWxkcy5BY2NvdW50LmN1cnJlbnRTZWxlY3Rpb247XHJcbiAgICAgIGlmIChhY2NvdW50ICYmIGFjY291bnQuQ3VycmVuY3lDb2RlKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQ3VycmVuY3lDb2RlLnNldFZhbHVlKGFjY291bnQuQ3VycmVuY3lDb2RlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5DdXJyZW5jeUNvZGUuc2V0VmFsdWUoQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKS5jb2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25SZWZyZXNoOiBmdW5jdGlvbiBvblJlZnJlc2goKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgWydSZXF1ZXN0ZWRCeScsICdPcHBvcnR1bml0eScsICdXYXJlaG91c2UnLCAnTG9jYXRpb24nXS5mb3JFYWNoKChmKSA9PiB7XHJcbiAgICAgIHRoaXMuZmllbGRzW2ZdLmRlcGVuZHNPbiA9IG51bGw7XHJcbiAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gbnVsbDtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25SZWZyZXNoSW5zZXJ0OiBmdW5jdGlvbiBvblJlZnJlc2hJbnNlcnQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5lbmFibGVCYWNrT2ZmaWNlRGF0YSgpO1xyXG4gIH0sXHJcbiAgZ2V0RW50cmllc0Zyb21JZHM6IGZ1bmN0aW9uIGdldEVudHJpZXNGcm9tSWRzKCkge1xyXG4gICAgY29uc3QgbWFwcGVkTG9va3VwcyA9IFtcclxuICAgICAgJ0JhY2tPZmZpY2UnLFxyXG4gICAgICAnQmFja09mZmljZUFjY291bnRpbmdFbnRpdHknLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IG1hcHBlZFByb3BlcnRpZXMgPSBbXHJcbiAgICAgICdMb2dpY2FsSWQnLFxyXG4gICAgICAnQWNjdEVudGl0eUV4dElkJyxcclxuICAgIF07XHJcbiAgICBjb25zdCBmaWVsZHMgPSBbJ0VycExvZ2ljYWxJZCcsICdFcnBBY2NvdW50aW5nRW50aXR5SWQnXTtcclxuICAgIFV0aWxpdHkuc2V0RmllbGRzRnJvbUlkcyhtYXBwZWRMb29rdXBzLCBtYXBwZWRQcm9wZXJ0aWVzLCBmaWVsZHMsIHRoaXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmhpZGVCdXN5KCk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdldFByaW1hcnlDb250YWN0OiBmdW5jdGlvbiBnZXRQcmltYXJ5Q29udGFjdChlbnRyeSkge1xyXG4gICAgY29uc3QgYWNjb3VudE1vZGVsID0gQWRhcHRlci5nZXRNb2RlbChDUk1fTU9ERUxfTkFNRVMuQUNDT1VOVCk7XHJcbiAgICBjb25zdCByZWxhdGlvbnNoaXAgPSB7XHJcbiAgICAgIG5hbWU6ICdDb250YWN0cycsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBjb250YWN0UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnQ29udGFjdCcsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgd2hlcmU6ICdJc1ByaW1hcnkgZXEgdHJ1ZScsXHJcbiAgICB9O1xyXG4gICAgYWNjb3VudE1vZGVsLmdldFJlbGF0ZWRSZXF1ZXN0KGVudHJ5LCByZWxhdGlvbnNoaXApLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5lbnRpdGllcyAmJiByZXN1bHQuZW50aXRpZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdEZpZWxkID0gdGhpcy5maWVsZHMuUmVxdWVzdGVkQnk7XHJcbiAgICAgICAgaWYgKCFjb250YWN0RmllbGQuY3VycmVudFNlbGVjdGlvbiB8fCBjb250YWN0RmllbGQuY3VycmVudFNlbGVjdGlvbi5BY2NvdW50ICYmIGNvbnRhY3RGaWVsZC5jdXJyZW50U2VsZWN0aW9uLkFjY291bnQuJGtleSAhPT0gZW50cnkuJGtleSkge1xyXG4gICAgICAgICAgY29udGFjdEZpZWxkLnNldFNlbGVjdGlvbihyZXN1bHQuZW50aXRpZXNbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBvbkFjY291bnRDaGFuZ2U6IGZ1bmN0aW9uIG9uQWNjb3VudENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gZmllbGQuY3VycmVudFNlbGVjdGlvbjtcclxuICAgIFsnUmVxdWVzdGVkQnknLCAnT3Bwb3J0dW5pdHknXS5mb3JFYWNoKChmKSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLmRlcGVuZHNPbiA9ICdBY2NvdW50JztcclxuICAgICAgICB0aGlzLmZpZWxkc1tmXS53aGVyZSA9IGBBY2NvdW50LklkIGVxIFwiJHt2YWx1ZS5BY2NvdW50SWQgfHwgdmFsdWUuJGtleSB8fCB2YWx1ZS5rZXl9XCJgO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChlbnRyeSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5DdXJyZW5jeUNvZGUuc2V0VmFsdWUoKGVudHJ5LkN1cnJlbmN5Q29kZSkgPyBlbnRyeS5DdXJyZW5jeUNvZGUgOiBBcHAuZ2V0QmFzZUV4Y2hhbmdlUmF0ZSgpLmNvZGUpO1xyXG4gICAgICBpZiAodGhpcy5maWVsZHMuQmlsbFRvLmlzRGlzYWJsZWQgJiYgdGhpcy5maWVsZHMuU2hpcFRvLmlzRGlzYWJsZWQpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5CaWxsVG8uZW5hYmxlKCk7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuU2hpcFRvLmVuYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbnRyeS5BY2NvdW50TWFuYWdlcikge1xyXG4gICAgICAgIGNvbnN0IGFjY291bnRNYW5hZ2VyRmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50TWFuYWdlcjtcclxuICAgICAgICBhY2NvdW50TWFuYWdlckZpZWxkLnNldFNlbGVjdGlvbih7XHJcbiAgICAgICAgICAka2V5OiBlbnRyeS5BY2NvdW50TWFuYWdlci4ka2V5LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGZpZWxkLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gICAgICB0aGlzLnNob3dCdXN5KCk7XHJcbiAgICAgIHRoaXMuZ2V0UHJpbWFyeUNvbnRhY3QoZW50cnkpO1xyXG4gICAgICBVdGlsaXR5LnNldEZpZWxkc0Zyb21JZHMoXHJcbiAgICAgICAgWydCYWNrT2ZmaWNlJywgJ0JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5J10sXHJcbiAgICAgICAgWydMb2dpY2FsSWQnLCAnQWNjdEVudGl0eUV4dElkJ10sXHJcbiAgICAgICAgWydFcnBMb2dpY2FsSWQnLCAnRXJwQWNjb3VudGluZ0VudGl0eUlkJ10sXHJcbiAgICAgICAgdGhpcyxcclxuICAgICAgICBlbnRyeVxyXG4gICAgICApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGlkZUJ1c3koKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkFjY291bnREZXBlbmRlbnRDaGFuZ2U6IGZ1bmN0aW9uIG9uQWNjb3VudERlcGVuZGVudENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGlmICh2YWx1ZSAmJiAhZmllbGQuZGVwZW5kc09uICYmIGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24gJiYgZmllbGQuY3VycmVudFNlbGVjdGlvbi5BY2NvdW50KSB7XHJcbiAgICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcbiAgICAgIGFjY291bnRGaWVsZC5zZXRTZWxlY3Rpb24oZmllbGQuY3VycmVudFNlbGVjdGlvbi5BY2NvdW50KTtcclxuICAgICAgdGhpcy5vbkFjY291bnRDaGFuZ2UoYWNjb3VudEZpZWxkLmdldFZhbHVlKCksIGFjY291bnRGaWVsZCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkJhY2tPZmZpY2VDaGFuZ2U6IGZ1bmN0aW9uIG9uQmFja09mZmljZUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2Uuc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgICB0aGlzLmZpZWxkcy5FcnBMb2dpY2FsSWQuc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbi5Mb2dpY2FsSWQpO1xyXG4gICAgY29uc3QgYWNjb3VudGluZ0ZpZWxkID0gdGhpcy5maWVsZHMuQmFja09mZmljZUFjY291bnRpbmdFbnRpdHk7XHJcbiAgICBhY2NvdW50aW5nRmllbGQud2hlcmUgPSBgQmFja09mZmljZS5JZCBlcSBcIiR7ZmllbGQuY3VycmVudFNlbGVjdGlvbi4ka2V5fVwiYDtcclxuICAgIGNvbnN0IGFjY291bnRpbmdJc1RvQmFja09mZmljZSA9IGFjY291bnRpbmdGaWVsZC5jdXJyZW50U2VsZWN0aW9uICYmIGFjY291bnRpbmdGaWVsZC5jdXJyZW50U2VsZWN0aW9uLkJhY2tPZmZpY2UuJGtleSA9PT0gZmllbGQuY3VycmVudFNlbGVjdGlvbi4ka2V5O1xyXG4gICAgaWYgKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcy4kcmVzb3VyY2VzICYmICFhY2NvdW50aW5nSXNUb0JhY2tPZmZpY2UpIHtcclxuICAgICAgY29uc3QgZW50cnkgPSBmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXRpZXMuJHJlc291cmNlc1swXTtcclxuICAgICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgICAgYWNjb3VudGluZ0ZpZWxkLnNldFNlbGVjdGlvbihlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5vbkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5Q2hhbmdlKGFjY291bnRpbmdGaWVsZC5nZXRWYWx1ZSgpLCBhY2NvdW50aW5nRmllbGQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCB3YXJlaG91c2VGaWVsZCA9IHRoaXMuZmllbGRzLldhcmVob3VzZTtcclxuICAgIGlmICh3YXJlaG91c2VGaWVsZC5pc0Rpc2FibGVkKSB7XHJcbiAgICAgIHdhcmVob3VzZUZpZWxkLmVuYWJsZSgpO1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC5kZXBlbmRzT24gPSAnRXJwTG9naWNhbElkJztcclxuICAgICAgd2FyZWhvdXNlRmllbGQud2hlcmUgPSAobG9naWNhbElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBFcnBMb2dpY2FsSWQgZXEgXCIke2xvZ2ljYWxJZH1cIiBhbmQgTG9jYXRpb25UeXBlIGVxIFwiJHt0aGlzLndhcmVob3VzZUNvZGV9XCJgO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgbG9jYXRpb25GaWVsZCA9IHRoaXMuZmllbGRzLkxvY2F0aW9uO1xyXG4gICAgaWYgKGxvY2F0aW9uRmllbGQuaXNEaXNhYmxlZCkge1xyXG4gICAgICBsb2NhdGlvbkZpZWxkLmVuYWJsZSgpO1xyXG4gICAgICBsb2NhdGlvbkZpZWxkLmRlcGVuZHNPbiA9ICdFcnBMb2dpY2FsSWQnO1xyXG4gICAgICBsb2NhdGlvbkZpZWxkLndoZXJlID0gKGxvZ2ljYWxJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgRXJwTG9naWNhbElkIGVxIFwiJHtsb2dpY2FsSWR9XCIgYW5kIChMb2NhdGlvblR5cGUgZXEgXCIke3RoaXMub2ZmaWNlQ29kZX1cIiBvciBMb2NhdGlvblR5cGUgZXEgXCIke3RoaXMuc2l0ZUNvZGV9XCIpYDtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlDaGFuZ2U6IGZ1bmN0aW9uIG9uQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eS5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICAgIHRoaXMuZmllbGRzLkVycEFjY291bnRpbmdFbnRpdHlJZC5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkFjY3RFbnRpdHlFeHRJZCk7XHJcbiAgfSxcclxuICBvbkJpbGxUb0NoYW5nZTogZnVuY3Rpb24gb25CaWxsVG9DaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5CaWxsVG8uc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgfSxcclxuICBvbkNvbnRhY3RDaGFuZ2U6IGZ1bmN0aW9uIG9uQ29udGFjdENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHZhbHVlLCBmaWVsZCk7XHJcbiAgfSxcclxuICBvbkxvY2F0aW9uQ2hhbmdlOiBmdW5jdGlvbiBvbkxvY2F0aW9uQ2hhbmNlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgaWYgKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uRXJwRXh0SWQpIHtcclxuICAgICAgdGhpcy5maWVsZHMuRXJwTG9jYXRpb24uc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbi5FcnBFeHRJZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpZWxkcy5Mb2NhdGlvbi5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICB9LFxyXG4gIG9uT3Bwb3J0dW5pdHlDaGFuZ2U6IGZ1bmN0aW9uIG9uT3Bwb3J0dW5pdHlDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZSh2YWx1ZSwgZmllbGQpO1xyXG4gIH0sXHJcbiAgb25TaGlwVG9DaGFuZ2U6IGZ1bmN0aW9uIG9uU2hpcFRvQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5maWVsZHMuU2hpcFRvLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gIH0sXHJcbiAgb25XYXJlaG91c2VDaGFuZ2U6IGZ1bmN0aW9uIG9uV2FyZWhvdXNlQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5maWVsZHMuV2FyZWhvdXNlLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gICAgdGhpcy5maWVsZHMuTG9jYXRpb24uc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgfSxcclxuICBhcHBseUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGV4dCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuX2dldE5hdkNvbnRleHQoKTtcclxuXHJcbiAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgdGhpcy5vbkFjY291bnRDaGFuZ2UoYWNjb3VudEZpZWxkLmdldFZhbHVlKCksIGFjY291bnRGaWVsZCk7XHJcblxyXG4gICAgY29uc3QgY29udGV4dCA9IChmb3VuZCAmJiBmb3VuZC5vcHRpb25zICYmIGZvdW5kLm9wdGlvbnMuc291cmNlKSB8fCBmb3VuZDtcclxuICAgIGNvbnN0IGxvb2t1cCA9IHtcclxuICAgICAgYWNjb3VudHM6IHRoaXMuYXBwbHlBY2NvdW50Q29udGV4dCxcclxuICAgICAgY29udGFjdHM6IHRoaXMuYXBwbHlDb250YWN0Q29udGV4dCxcclxuICAgICAgb3Bwb3J0dW5pdGllczogdGhpcy5hcHBseU9wcG9ydHVuaXR5Q29udGV4dCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGNvbnRleHQgJiYgbG9va3VwW2NvbnRleHQucmVzb3VyY2VLaW5kXSkge1xyXG4gICAgICBsb29rdXBbY29udGV4dC5yZXNvdXJjZUtpbmRdLmNhbGwodGhpcywgY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmZpZWxkcy5BY2NvdW50LmN1cnJlbnRTZWxlY3Rpb24gJiYgIXRoaXMuZmllbGRzLkFjY291bnQuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkJpbGxUby5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlNoaXBUby5kaXNhYmxlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZmllbGRzLkJhY2tPZmZpY2UuY3VycmVudFNlbGVjdGlvbikge1xyXG4gICAgICB0aGlzLmZpZWxkcy5Mb2NhdGlvbi5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLldhcmVob3VzZS5kaXNhYmxlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfZ2V0TmF2Q29udGV4dDogZnVuY3Rpb24gX2dldE5hdkNvbnRleHQoKSB7XHJcbiAgICBjb25zdCBuYXZDb250ZXh0ID0gQXBwLnF1ZXJ5TmF2aWdhdGlvbkNvbnRleHQoKG8pID0+IHtcclxuICAgICAgY29uc3QgY29udGV4dCA9IChvLm9wdGlvbnMgJiYgby5vcHRpb25zLnNvdXJjZSkgfHwgbztcclxuXHJcbiAgICAgIGlmICgvXihhY2NvdW50c3xjb250YWN0c3xvcHBvcnR1bml0aWVzKSQvLnRlc3QoY29udGV4dC5yZXNvdXJjZUtpbmQpICYmIGNvbnRleHQua2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5hdkNvbnRleHQ7XHJcbiAgfSxcclxuICBhcHBseUFjY291bnRDb250ZXh0OiBmdW5jdGlvbiBhcHBseUFjY291bnRDb250ZXh0KGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb250ZXh0LmlkKTtcclxuICAgIGNvbnN0IGVudHJ5ID0gY29udGV4dC5lbnRyeSB8fCAodmlldyAmJiB2aWV3LmVudHJ5KSB8fCBjb250ZXh0O1xyXG5cclxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LiRrZXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcbiAgICBhY2NvdW50RmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgIHRoaXMub25BY2NvdW50Q2hhbmdlKGFjY291bnRGaWVsZC5nZXRWYWx1ZSgpLCBhY2NvdW50RmllbGQpO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250YWN0Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250YWN0Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQuZW50cnkgfHwgKHZpZXcgJiYgdmlldy5lbnRyeSkgfHwgY29udGV4dDtcclxuXHJcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS4ka2V5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb250YWN0RmllbGQgPSB0aGlzLmZpZWxkcy5SZXF1ZXN0ZWRCeTtcclxuICAgIGNvbnRhY3RGaWVsZC5zZXRTZWxlY3Rpb24oZW50cnkpO1xyXG4gICAgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2UoY29udGFjdEZpZWxkLmdldFZhbHVlKCksIGNvbnRhY3RGaWVsZCk7XHJcbiAgfSxcclxuICBhcHBseU9wcG9ydHVuaXR5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlPcHBvcnR1bml0eUNvbnRleHQoY29udGV4dCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgY29uc3QgZW50cnkgPSBjb250ZXh0LmVudHJ5IHx8ICh2aWV3ICYmIHZpZXcuZW50cnkpIHx8IGNvbnRleHQ7XHJcblxyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuJGtleSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3Bwb3J0dW5pdHlGaWVsZCA9IHRoaXMuZmllbGRzLk9wcG9ydHVuaXR5O1xyXG4gICAgb3Bwb3J0dW5pdHlGaWVsZC5zZXRTZWxlY3Rpb24oZW50cnkpO1xyXG4gICAgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2Uob3Bwb3J0dW5pdHlGaWVsZC5nZXRWYWx1ZSgpLCBvcHBvcnR1bml0eUZpZWxkKTtcclxuICB9LFxyXG4gIGhpZGVCdXN5OiBmdW5jdGlvbiBoaWRlQnVzeSgpIHtcclxuICAgIGlmICh0aGlzLl9idXN5SW5kaWNhdG9yKSB7XHJcbiAgICAgIHRoaXMuX2J1c3lJbmRpY2F0b3IuY29tcGxldGUoKTtcclxuICAgICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xyXG4gICAgICBBcHAubW9kYWwuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd0J1c3k6IGZ1bmN0aW9uIHNob3dCdXN5KCkge1xyXG4gICAgaWYgKCF0aGlzLl9idXN5SW5kaWNhdG9yIHx8IHRoaXMuX2J1c3lJbmRpY2F0b3IuX2Rlc3Ryb3llZCkge1xyXG4gICAgICB0aGlzLl9idXN5SW5kaWNhdG9yID0gbmV3IEJ1c3lJbmRpY2F0b3IoeyBpZDogYCR7dGhpcy5pZH0tYnVzeUluZGljYXRvcmAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9idXN5SW5kaWNhdG9yLnN0YXJ0KCk7XHJcbiAgICBBcHAubW9kYWwuZGlzYWJsZUNsb3NlID0gdHJ1ZTtcclxuICAgIEFwcC5tb2RhbC5zaG93VG9vbGJhciA9IGZhbHNlO1xyXG4gICAgQXBwLm1vZGFsLmFkZCh0aGlzLl9idXN5SW5kaWNhdG9yKTtcclxuICB9LFxyXG4gIGZvcm1hdERlcGVuZGVudFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXREZXBlbmRlbnRRdWVyeShkZXBlbmRlbnRWYWx1ZSwgdGhlRm9ybWF0LCBwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdGl0dXRlKHRoZUZvcm1hdCwgW3V0aWxpdHkuZ2V0VmFsdWUoZGVwZW5kZW50VmFsdWUsIHByb3BlcnR5IHx8ICcka2V5JyldKTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnQWNjb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X3JlbGF0ZWQnLFxyXG4gICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5vcHBvcnR1bml0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHZpZXc6ICdvcHBvcnR1bml0eV9yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhY2tPZmZpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdCYWNrT2ZmaWNlJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQmFja09mZmljZU5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX2JhY2tvZmZpY2VfcmVsYXRlZCcsXHJcbiAgICAgICAgd2hlcmU6ICdJc0FjdGl2ZSBlcSB0cnVlJyxcclxuICAgICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudGluZ0VudGl0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTmFtZScsXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfYmFja29mZmljZWFjY291bnRpbmdlbnRpdHlfcmVsYXRlZCcsXHJcbiAgICAgICAgaW5jbHVkZTogZmFsc2UsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmN1cnJlbmN5VGV4dCxcclxuICAgICAgICBuYW1lOiAnQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBwaWNrbGlzdDogJ0N1cnJlbmN5IENvZGVzJyxcclxuICAgICAgICBzaW5nbGVTZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnY29kZScsXHJcbiAgICAgICAga2V5UHJvcGVydHk6ICdjb2RlJyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICByZXF1aXJlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLnBpY2tsaXN0RXhpc3RzLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZHVlRGF0ZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0R1ZURhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRHVlRGF0ZScsXHJcbiAgICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICAgIHRpbWVsZXNzOiBmYWxzZSxcclxuICAgICAgICBzaG93VGltZVBpY2tlcjogdHJ1ZSxcclxuICAgICAgICBzaG93UmVsYXRpdmVEYXRlVGltZTogZmFsc2UsXHJcbiAgICAgICAgZGF0ZUZvcm1hdFRleHQ6IHRoaXMuZGF0ZUZvcm1hdCxcclxuICAgICAgICBtaW5WYWx1ZTogKG5ldyBEYXRlKDE5MDAsIDAsIDEpKSxcclxuICAgICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICAgIHZhbGlkYXRvci5pc0RhdGVJblJhbmdlLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jdXN0b21lclBPVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ3VzdG9tZXJQT051bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDdXN0b21lclB1cmNoYXNlT3JkZXJOdW1iZXInLFxyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbW1lbnRzVGV4dCwgLy8gVE9ETzogTWFrZSBvbiBzYXZlLCBhcHBlbmQgJ0NyZWF0ZWQgYnkgPHVzZXI+IG9uIDxkYXRldGltZT4nIHRvIGNvbW1lbnRcclxuICAgICAgICBub3RlUHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICAgIG5hbWU6ICdDb21tZW50cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDb21tZW50cycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuY29tbWVudHNUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdub3RlJyxcclxuICAgICAgICB2aWV3OiAndGV4dF9lZGl0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxvY2F0aW9uVGV4dCxcclxuICAgICAgICBuYW1lOiAnTG9jYXRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTG9jYXRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgdmlldzogJ29yZGVyX2xvY2F0aW9uX2xpc3QnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmxvY2F0aW9uc1RpdGxlVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBMb2NhdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBMb2NhdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLndhcmVob3VzZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1dhcmVob3VzZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdXYXJlaG91c2VMb2NhdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICB2aWV3OiAnb3JkZXJfd2FyZWhvdXNlX2xpc3QnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLndhcmVob3VzZUxvY2F0aW9uVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlcXVlc3RlZEJ5VGV4dCxcclxuICAgICAgICBuYW1lOiAnUmVxdWVzdGVkQnknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUmVxdWVzdGVkQnknLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdOYW1lTEYnLFxyXG4gICAgICAgIHZpZXc6ICdjb250YWN0X3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgICBuYW1lOiAnU2FsZXMgT3JkZXIgU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBwaWNrbGlzdDogJ0VycFNhbGVzT3JkZXJTdGF0dXMnLFxyXG4gICAgICAgIHNpbmdsZVNlbGVjdDogdHJ1ZSxcclxuICAgICAgICB0aXRsZVRleHQ6IHRoaXMuc3RhdHVzVGl0bGUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdBY2NvdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iaWxsVG9UZXh0LFxyXG4gICAgICAgIG5hbWU6ICdCaWxsVG8nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmlsbFRvJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQWRkcmVzcy5GdWxsQWRkcmVzcycsXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfYmlsbFRvX3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdERlcGVuZGVudFF1ZXJ5LmJpbmREZWxlZ2F0ZShcclxuICAgICAgICAgIHRoaXMsICdFcnBCaWxsVG9BY2NvdW50cy5BY2NvdW50LklkIGVxIFwiJHswfVwiJ1xyXG4gICAgICAgICksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdBY2NvdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwVG9UZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTaGlwVG8nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU2hpcFRvJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQWRkcmVzcy5GdWxsQWRkcmVzcycsXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfc2hpcFRvX3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdERlcGVuZGVudFF1ZXJ5LmJpbmREZWxlZ2F0ZShcclxuICAgICAgICAgIHRoaXMsICdFcnBTaGlwVG9BY2NvdW50cy5BY2NvdW50LklkIGVxIFwiJHswfVwiJ1xyXG4gICAgICAgICksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNhcnJpZXJUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDYXJyaWVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhcnJpZXInLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdDYXJyaWVyTmFtZScsXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfY2FycmllcnMnLFxyXG4gICAgICAgIHdoZXJlOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHJldHVybiBgRXJwTG9naWNhbElkIGVxIFwiJHt2YWx1ZX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhY2tPcmRlcmVkVGV4dCxcclxuICAgICAgICBuYW1lOiAnQmFja09yZGVyZWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmFja09yZGVyZWQnLFxyXG4gICAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgIG9uVGV4dDogdGhpcy55ZXNUZXh0LFxyXG4gICAgICAgIG9mZlRleHQ6IHRoaXMubm9UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZHJvcFNoaXBtZW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnRHJvcFNoaXBtZW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycERyb3BTaGlwJyxcclxuICAgICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgICBvblRleHQ6IHRoaXMueWVzVGV4dCxcclxuICAgICAgICBvZmZUZXh0OiB0aGlzLm5vVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVhcmx5U2hpcG1lbnRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFYXJseVNoaXBtZW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBFYXJseScsXHJcbiAgICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgICAgb25UZXh0OiB0aGlzLnllc1RleHQsXHJcbiAgICAgICAgb2ZmVGV4dDogdGhpcy5ub1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5pbnZvaWNlSW1tZWRpYXRlbHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdJbnZvaWNlSW1tZWRpYXRlbHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwSW52b2ljZUltbWVkaWF0ZWx5JyxcclxuICAgICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgICBvblRleHQ6IHRoaXMueWVzVGV4dCxcclxuICAgICAgICBvZmZUZXh0OiB0aGlzLm5vVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBhcnRpYWxTaGlwVGV4dCxcclxuICAgICAgICBuYW1lOiAnUGFydGlhbFNoaXBtZW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFBhcnRpYWxTaGlwQWxsb3dlZCcsXHJcbiAgICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgICAgb25UZXh0OiB0aGlzLnllc1RleHQsXHJcbiAgICAgICAgb2ZmVGV4dDogdGhpcy5ub1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy50YXhFeGVtcHRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdUYXhFeGVtcHQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwVGF4RXhlbXB0JyxcclxuICAgICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgICBvblRleHQ6IHRoaXMueWVzVGV4dCxcclxuICAgICAgICBvZmZUZXh0OiB0aGlzLm5vVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRNYW5hZ2VyVGV4dCxcclxuICAgICAgICBuYW1lOiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICB9LFxyXG4gICAgICBdIH0sXHJcbiAgICBdKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5TYWxlc09yZGVycy5FZGl0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==