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
      ['RequestedBy', 'Opportunity', 'Warehouse', 'Location'].forEach(function (f) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJzL0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJjb250YWN0UmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsImlkIiwiZGV0YWlsVmlldyIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJyZXNvdXJjZUtpbmQiLCJvcHBvcnR1bml0eU9wZW5Db2RlIiwid2FyZWhvdXNlQ29kZSIsIm9mZmljZUNvZGUiLCJzaXRlQ29kZSIsIm1vZGVsTmFtZSIsIlNBTEVTT1JERVIiLCJfYnVzeUluZGljYXRvciIsImxvY2F0aW9uVHlwZSIsInRpdGxlVGV4dCIsIm9yZGVyTnVtYmVyVGV4dCIsIm9yZGVySWRUZXh0IiwiYWNjb3VudFRleHQiLCJvcHBvcnR1bml0eVRleHQiLCJkYXRlQ3JlYXRlZFRleHQiLCJlcnBTdGF0dXNUZXh0Iiwic3ViVG90YWxUZXh0IiwiZ3JhbmRUb3RhbFRleHQiLCJiaWxsVG9UZXh0Iiwic2hpcFRvVGV4dCIsInBheUZyb21UZXh0IiwiZHVlRGF0ZVRleHQiLCJkYXRlRm9ybWF0IiwiY29tbWVudHNUZXh0IiwicHJvZHVjdHNUZXh0IiwiYWNjb3VudFByb2R1Y3RzIiwicmVxdWVzdGVkQnlUZXh0IiwiYmFja09yZGVyZWRUZXh0IiwidGF4RXhlbXB0VGV4dCIsImludm9pY2VJbW1lZGlhdGVseVRleHQiLCJkcm9wU2hpcG1lbnRUZXh0IiwiZWFybHlTaGlwbWVudFRleHQiLCJwYXJ0aWFsU2hpcFRleHQiLCJzdGF0dXNUZXh0Iiwic3RhdHVzVGl0bGUiLCJ0eXBlVGV4dCIsInR5cGVUaXRsZSIsImN1c3RvbWVyUE9UZXh0IiwiY3VycmVuY3lUZXh0IiwiYmFja09mZmljZVRleHQiLCJhY2NvdW50aW5nRW50aXR5VGV4dCIsIndhcmVob3VzZVRleHQiLCJ3YXJlaG91c2VMb2NhdGlvblRleHQiLCJsb2NhdGlvblRleHQiLCJsb2NhdGlvbnNUaXRsZVRleHQiLCJjYXJyaWVyVGV4dCIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiQWNjb3VudCIsIm9uQWNjb3VudENoYW5nZSIsIlJlcXVlc3RlZEJ5Iiwib25Db250YWN0Q2hhbmdlIiwiT3Bwb3J0dW5pdHkiLCJvbk9wcG9ydHVuaXR5Q2hhbmdlIiwiQmlsbFRvIiwib25CaWxsVG9DaGFuZ2UiLCJTaGlwVG8iLCJvblNoaXBUb0NoYW5nZSIsIkJhY2tPZmZpY2UiLCJvbkJhY2tPZmZpY2VDaGFuZ2UiLCJCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eSIsIm9uQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlDaGFuZ2UiLCJMb2NhdGlvbiIsIm9uTG9jYXRpb25DaGFuZ2UiLCJXYXJlaG91c2UiLCJvbldhcmVob3VzZUNoYW5nZSIsIkFwcCIsImNvbnRleHQiLCJpbnRlZ3JhdGlvblNldHRpbmdzIiwiaGlkZSIsInNob3ciLCJpbnNlcnQiLCJwcm9jZXNzRGF0YSIsInNob3dCdXN5IiwiZ2V0RW50cmllc0Zyb21JZHMiLCJiZWZvcmVUcmFuc2l0aW9uVG8iLCJBY2NvdW50TWFuYWdlciIsImlzRGlzYWJsZWQiLCJkaXNhYmxlIiwiZW5hYmxlIiwiZGlzYWJsZUJhY2tPZmZpY2VEYXRhIiwiZW5hYmxlQmFja09mZmljZURhdGEiLCJjb252ZXJ0VmFsdWVzIiwidmFsdWVzIiwiRXJwQmlsbFRvIiwiJGtleSIsIkVycFNoaXBUbyIsInByb2Nlc3NFbnRyeSIsImVudHJ5IiwiZm9yRWFjaCIsImYiLCJkZXBlbmRzT24iLCJ3aGVyZSIsIkFjY291bnRJZCIsImtleSIsIndhcmVob3VzZUZpZWxkIiwibG9jYXRpb25GaWVsZCIsIkVycExvZ2ljYWxJZCIsImxvZ2ljYWxJZCIsIldhcmVob3VzZUxvY2F0aW9uIiwic2V0VmFsdWUiLCJFcnBFeHRJZCIsInNldFZhbHVlcyIsIkN1cnJlbmN5Q29kZSIsImdldFZhbHVlIiwiYWNjb3VudCIsImN1cnJlbnRTZWxlY3Rpb24iLCJnZXRCYXNlRXhjaGFuZ2VSYXRlIiwiY29kZSIsIm9uUmVmcmVzaCIsIm9uUmVmcmVzaEluc2VydCIsIm1hcHBlZExvb2t1cHMiLCJtYXBwZWRQcm9wZXJ0aWVzIiwic2V0RmllbGRzRnJvbUlkcyIsInRoZW4iLCJoaWRlQnVzeSIsImdldFByaW1hcnlDb250YWN0IiwiYWNjb3VudE1vZGVsIiwiZ2V0TW9kZWwiLCJBQ0NPVU5UIiwicmVsYXRpb25zaGlwIiwibmFtZSIsImRpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJ0eXBlIiwicmVsYXRlZEVudGl0eSIsInJlbGF0ZWRQcm9wZXJ0eSIsInJlbGF0ZWRQcm9wZXJ0eVR5cGUiLCJnZXRSZWxhdGVkUmVxdWVzdCIsInJlc3VsdCIsImVudGl0aWVzIiwibGVuZ3RoIiwiY29udGFjdEZpZWxkIiwic2V0U2VsZWN0aW9uIiwidmFsdWUiLCJmaWVsZCIsImFjY291bnRNYW5hZ2VyRmllbGQiLCJvbkFjY291bnREZXBlbmRlbnRDaGFuZ2UiLCJhY2NvdW50RmllbGQiLCJMb2dpY2FsSWQiLCJhY2NvdW50aW5nRmllbGQiLCJhY2NvdW50aW5nSXNUb0JhY2tPZmZpY2UiLCJCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0aWVzIiwiJHJlc291cmNlcyIsIkVycEFjY291bnRpbmdFbnRpdHlJZCIsIkFjY3RFbnRpdHlFeHRJZCIsIm9uTG9jYXRpb25DaGFuY2UiLCJFcnBMb2NhdGlvbiIsImFwcGx5Q29udGV4dCIsImZvdW5kIiwiX2dldE5hdkNvbnRleHQiLCJvcHRpb25zIiwic291cmNlIiwibG9va3VwIiwiYWNjb3VudHMiLCJhcHBseUFjY291bnRDb250ZXh0IiwiY29udGFjdHMiLCJhcHBseUNvbnRhY3RDb250ZXh0Iiwib3Bwb3J0dW5pdGllcyIsImFwcGx5T3Bwb3J0dW5pdHlDb250ZXh0IiwiY2FsbCIsImN1cnJlbnRWYWx1ZSIsIm5hdkNvbnRleHQiLCJxdWVyeU5hdmlnYXRpb25Db250ZXh0IiwibyIsInRlc3QiLCJ2aWV3IiwiZ2V0VmlldyIsIm9wcG9ydHVuaXR5RmllbGQiLCJjb21wbGV0ZSIsIm1vZGFsIiwiZGlzYWJsZUNsb3NlIiwiX2Rlc3Ryb3llZCIsInN0YXJ0Iiwic2hvd1Rvb2xiYXIiLCJhZGQiLCJmb3JtYXREZXBlbmRlbnRRdWVyeSIsImRlcGVuZGVudFZhbHVlIiwidGhlRm9ybWF0IiwicHJvcGVydHkiLCJzdWJzdGl0dXRlIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwidGl0bGUiLCJkZXRhaWxzVGV4dCIsImNoaWxkcmVuIiwibGFiZWwiLCJlbXB0eVRleHQiLCJ2YWx1ZVRleHRQcm9wZXJ0eSIsImF1dG9Gb2N1cyIsInJlcXVpcmVkIiwidmFsaWRhdG9yIiwiZXhpc3RzIiwiaW5jbHVkZSIsInBpY2tsaXN0Iiwic2luZ2xlU2VsZWN0IiwidGV4dFByb3BlcnR5Iiwia2V5UHJvcGVydHkiLCJyZXF1aXJlU2VsZWN0aW9uIiwicGlja2xpc3RFeGlzdHMiLCJ0aW1lbGVzcyIsInNob3dUaW1lUGlja2VyIiwic2hvd1JlbGF0aXZlRGF0ZVRpbWUiLCJkYXRlRm9ybWF0VGV4dCIsIm1pblZhbHVlIiwiRGF0ZSIsImlzRGF0ZUluUmFuZ2UiLCJub3RlUHJvcGVydHkiLCJiaW5kRGVsZWdhdGUiLCJvblRleHQiLCJ5ZXNUZXh0Iiwib2ZmVGV4dCIsIm5vVGV4dCIsImFjY291bnRNYW5hZ2VyVGV4dCIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLE1BQU1BLFdBQVcsb0JBQVksZ0JBQVosQ0FBakI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLG1CQUFtQixvQkFBWSw4QkFBWixDQUF6Qjs7QUFFQTs7Ozs7Ozs7Ozs7QUFXQSxNQUFNQyxVQUFVLHVCQUFRLDZDQUFSLEVBQXVELGdCQUF2RCxFQUErRDtBQUM3RTtBQUNB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MEIsU0FBTCxDQUFlLDhCQUFmLEVBQStDOU4sT0FBL0M7b0JBQ2VBLE8iLCJmaWxlIjoiRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBBZGFwdGVyIGZyb20gJ2FyZ29zL01vZGVscy9BZGFwdGVyJztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICdjcm0vVmFsaWRhdG9yJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBDUk1fTU9ERUxfTkFNRVMgZnJvbSAnY3JtL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBCdXN5SW5kaWNhdG9yIGZyb20gJ2FyZ29zL0RpYWxvZ3MvQnVzeUluZGljYXRvcic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IFV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdzYWxlc09yZGVyRWRpdCcpO1xyXG5jb25zdCBjb250YWN0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY29udGFjdE1vZGVsJyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlckVkaXREYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWNjb3VudC5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkVkaXRcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5WYWxpZGF0b3JcclxuICogQHJlcXVpcmVzIGNybS5UZW1wbGF0ZVxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlNhbGVzT3JkZXJzLkVkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3NhbGVzb3JkZXJfZWRpdCcsXHJcbiAgZGV0YWlsVmlldzogJ3NhbGVzb3JkZXJfZGV0YWlsJyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvQWRkJyxcclxuICB1cGRhdGVTZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvRWRpdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAnc2FsZXNPcmRlcnMnLFxyXG4gIG9wcG9ydHVuaXR5T3BlbkNvZGU6ICdPcGVuJyxcclxuICB3YXJlaG91c2VDb2RlOiAnV2FyZWhvdXNlJyxcclxuICBvZmZpY2VDb2RlOiAnT2ZmaWNlJyxcclxuICBzaXRlQ29kZTogJ1NpdGUnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuU0FMRVNPUkRFUixcclxuICBfYnVzeUluZGljYXRvcjogbnVsbCxcclxuICBsb2NhdGlvblR5cGU6ICcnLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBvcmRlck51bWJlclRleHQ6IHJlc291cmNlLm9yZGVyTnVtYmVyVGV4dCxcclxuICBvcmRlcklkVGV4dDogcmVzb3VyY2Uub3JkZXJJZFRleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIG9wcG9ydHVuaXR5VGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlUZXh0LFxyXG4gIGRhdGVDcmVhdGVkVGV4dDogcmVzb3VyY2UuZGF0ZUNyZWF0ZWRUZXh0LFxyXG4gIGVycFN0YXR1c1RleHQ6IHJlc291cmNlLmVycFN0YXR1c1RleHQsXHJcbiAgc3ViVG90YWxUZXh0OiByZXNvdXJjZS5zdWJUb3RhbFRleHQsXHJcbiAgZ3JhbmRUb3RhbFRleHQ6IHJlc291cmNlLmdyYW5kVG90YWxUZXh0LFxyXG4gIGJpbGxUb1RleHQ6IHJlc291cmNlLmJpbGxUb1RleHQsXHJcbiAgc2hpcFRvVGV4dDogcmVzb3VyY2Uuc2hpcFRvVGV4dCxcclxuICBwYXlGcm9tVGV4dDogcmVzb3VyY2UucGF5RnJvbVRleHQsXHJcbiAgZHVlRGF0ZVRleHQ6IHJlc291cmNlLmR1ZURhdGVUZXh0LFxyXG4gIGRhdGVGb3JtYXQ6IGR0Rm9ybWF0UmVzb3VyY2UuZGF0ZUZvcm1hdCxcclxuICBjb21tZW50c1RleHQ6IHJlc291cmNlLmNvbW1lbnRzVGV4dCxcclxuICBwcm9kdWN0c1RleHQ6IHJlc291cmNlLnByb2R1Y3RzVGV4dCxcclxuICBhY2NvdW50UHJvZHVjdHM6IHJlc291cmNlLmFjY291bnRQcm9kdWN0cyxcclxuICByZXF1ZXN0ZWRCeVRleHQ6IHJlc291cmNlLnJlcXVlc3RlZEJ5VGV4dCxcclxuICBiYWNrT3JkZXJlZFRleHQ6IHJlc291cmNlLmJhY2tPcmRlcmVkVGV4dCxcclxuICB0YXhFeGVtcHRUZXh0OiByZXNvdXJjZS50YXhFeGVtcHRUZXh0LFxyXG4gIGludm9pY2VJbW1lZGlhdGVseVRleHQ6IHJlc291cmNlLmludm9pY2VJbW1lZGlhdGVseVRleHQsXHJcbiAgZHJvcFNoaXBtZW50VGV4dDogcmVzb3VyY2UuZHJvcFNoaXBtZW50VGV4dCxcclxuICBlYXJseVNoaXBtZW50VGV4dDogcmVzb3VyY2UuZWFybHlTaGlwbWVudFRleHQsXHJcbiAgcGFydGlhbFNoaXBUZXh0OiByZXNvdXJjZS5wYXJ0aWFsU2hpcFRleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICBzdGF0dXNUaXRsZTogcmVzb3VyY2Uuc3RhdHVzVGl0bGUsXHJcbiAgdHlwZVRleHQ6IHJlc291cmNlLnR5cGVUZXh0LFxyXG4gIHR5cGVUaXRsZTogcmVzb3VyY2UudHlwZVRpdGxlLFxyXG4gIGN1c3RvbWVyUE9UZXh0OiByZXNvdXJjZS5jdXN0b21lclBPVGV4dCxcclxuICBjdXJyZW5jeVRleHQ6IHJlc291cmNlLmN1cnJlbmN5VGV4dCxcclxuICBiYWNrT2ZmaWNlVGV4dDogcmVzb3VyY2UuYmFja09mZmljZVRleHQsXHJcbiAgYWNjb3VudGluZ0VudGl0eVRleHQ6IHJlc291cmNlLmFjY291bnRpbmdFbnRpdHlUZXh0LFxyXG4gIHdhcmVob3VzZVRleHQ6IHJlc291cmNlLndhcmVob3VzZVRleHQsXHJcbiAgd2FyZWhvdXNlTG9jYXRpb25UZXh0OiByZXNvdXJjZS53YXJlaG91c2VMb2NhdGlvblRleHQsXHJcbiAgbG9jYXRpb25UZXh0OiByZXNvdXJjZS5sb2NhdGlvblRleHQsXHJcbiAgbG9jYXRpb25zVGl0bGVUZXh0OiByZXNvdXJjZS5sb2NhdGlvbnNUaXRsZVRleHQsXHJcbiAgY2FycmllclRleHQ6IHJlc291cmNlLmNhcnJpZXJUZXh0LFxyXG5cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQWNjb3VudCwgJ29uQ2hhbmdlJywgdGhpcy5vbkFjY291bnRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlJlcXVlc3RlZEJ5LCAnb25DaGFuZ2UnLCB0aGlzLm9uQ29udGFjdENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuT3Bwb3J0dW5pdHksICdvbkNoYW5nZScsIHRoaXMub25PcHBvcnR1bml0eUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQmlsbFRvLCAnb25DaGFuZ2UnLCB0aGlzLm9uQmlsbFRvQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5TaGlwVG8sICdvbkNoYW5nZScsIHRoaXMub25TaGlwVG9DaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkJhY2tPZmZpY2UsICdvbkNoYW5nZScsIHRoaXMub25CYWNrT2ZmaWNlQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eSwgJ29uQ2hhbmdlJywgdGhpcy5vbkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5Mb2NhdGlvbiwgJ29uQ2hhbmdlJywgdGhpcy5vbkxvY2F0aW9uQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5XYXJlaG91c2UsICdvbkNoYW5nZScsIHRoaXMub25XYXJlaG91c2VDaGFuZ2UpO1xyXG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uVHlwZSkge1xyXG4gICAgICB0aGlzLmxvY2F0aW9uVHlwZSA9IEFwcC5jb250ZXh0LmludGVncmF0aW9uU2V0dGluZ3MgJiYgQXBwLmNvbnRleHQuaW50ZWdyYXRpb25TZXR0aW5nc1snQmFjayBPZmZpY2UgRXh0ZW5zaW9uJ10gJiZcclxuICAgICAgICBBcHAuY29udGV4dC5pbnRlZ3JhdGlvblNldHRpbmdzWydCYWNrIE9mZmljZSBFeHRlbnNpb24nXVsnVHlwZSBvZiBPcmRlciBMb2NhdGlvbiddIHx8ICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubG9jYXRpb25UeXBlID09PSAnV2FyZWhvdXNlJykge1xyXG4gICAgICB0aGlzLmZpZWxkcy5Mb2NhdGlvbi5oaWRlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLldhcmVob3VzZS5zaG93KCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9jYXRpb25UeXBlICE9PSAnV2FyZWhvdXNlJykge1xyXG4gICAgICB0aGlzLmZpZWxkcy5Mb2NhdGlvbi5zaG93KCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLldhcmVob3VzZS5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbnNlcnQ6IGZ1bmN0aW9uIGluc2VydCgpIHtcclxuICAgIHRoaXMuZmllbGRzLkxvY2F0aW9uLnNob3coKTtcclxuICAgIHRoaXMuZmllbGRzLldhcmVob3VzZS5zaG93KCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbnNlcnQsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBwcm9jZXNzRGF0YTogZnVuY3Rpb24gcHJvY2Vzc0RhdGEoKSB7XHJcbiAgICB0aGlzLnNob3dCdXN5KCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChwcm9jZXNzRGF0YSwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuZ2V0RW50cmllc0Zyb21JZHMoKTtcclxuICB9LFxyXG4gIGJlZm9yZVRyYW5zaXRpb25UbzogZnVuY3Rpb24gYmVmb3JlVHJhbnNpdGlvblRvKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYmVmb3JlVHJhbnNpdGlvblRvLCBhcmd1bWVudHMpO1xyXG4gICAgaWYgKCF0aGlzLmZpZWxkcy5BY2NvdW50TWFuYWdlci5pc0Rpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyLmRpc2FibGUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmZpZWxkcy5CaWxsVG8uaXNEaXNhYmxlZCAmJiB0aGlzLmZpZWxkcy5TaGlwVG8uaXNEaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5CaWxsVG8uZW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlNoaXBUby5lbmFibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGRpc2FibGVCYWNrT2ZmaWNlRGF0YTogZnVuY3Rpb24gZGlzYWJsZUJhY2tPZmZpY2VEYXRhKCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmFja09mZmljZS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eS5kaXNhYmxlKCk7XHJcbiAgfSxcclxuICBlbmFibGVCYWNrT2ZmaWNlRGF0YTogZnVuY3Rpb24gZW5hYmxlQmFja09mZmljZURhdGEoKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlLmVuYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuQmFja09mZmljZUFjY291bnRpbmdFbnRpdHkuZW5hYmxlKCk7XHJcbiAgfSxcclxuICBjb252ZXJ0VmFsdWVzOiBmdW5jdGlvbiBjb252ZXJ0VmFsdWVzKHZhbHVlcykge1xyXG4gICAgaWYgKHZhbHVlcy5FcnBCaWxsVG8pIHtcclxuICAgICAgdmFsdWVzLkVycEJpbGxUbyA9IHtcclxuICAgICAgICAka2V5OiB2YWx1ZXMuRXJwQmlsbFRvLiRrZXksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWVzLkVycFNoaXBUbykge1xyXG4gICAgICB2YWx1ZXMuRXJwU2hpcFRvID0ge1xyXG4gICAgICAgICRrZXk6IHZhbHVlcy5FcnBTaGlwVG8uJGtleSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgfSxcclxuICBwcm9jZXNzRW50cnk6IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeShlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LkFjY291bnQpIHtcclxuICAgICAgWydSZXF1ZXN0ZWRCeScsICdPcHBvcnR1bml0eSddLmZvckVhY2goKGYpID0+IHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tmXS5kZXBlbmRzT24gPSAnQWNjb3VudCc7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0ud2hlcmUgPSBgQWNjb3VudC5JZCBlcSBcIiR7ZW50cnkuQWNjb3VudC5BY2NvdW50SWQgfHwgZW50cnkuQWNjb3VudC4ka2V5IHx8IGVudHJ5LkFjY291bnQua2V5fVwiYDtcclxuICAgICAgICBpZiAoZiA9PT0gJ09wcG9ydHVuaXR5Jykge1xyXG4gICAgICAgICAgdGhpcy5maWVsZHNbZl0ud2hlcmUgPSBgJHt0aGlzLmZpZWxkc1tmXS53aGVyZX0gYW5kIFN0YXR1cyBlcSBcIiR7dGhpcy5vcHBvcnR1bml0eU9wZW5Db2RlfVwiYDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgd2FyZWhvdXNlRmllbGQgPSB0aGlzLmZpZWxkcy5XYXJlaG91c2U7XHJcbiAgICBjb25zdCBsb2NhdGlvbkZpZWxkID0gdGhpcy5maWVsZHMuTG9jYXRpb247XHJcbiAgICBpZiAoZW50cnkgJiYgZW50cnkuRXJwTG9naWNhbElkKSB7XHJcbiAgICAgIHdhcmVob3VzZUZpZWxkLmVuYWJsZSgpO1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC5kZXBlbmRzT24gPSAnRXJwTG9naWNhbElkJztcclxuICAgICAgd2FyZWhvdXNlRmllbGQud2hlcmUgPSAobG9naWNhbElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBFcnBMb2dpY2FsSWQgZXEgXCIke2xvZ2ljYWxJZH1cIiBhbmQgTG9jYXRpb25UeXBlIGVxIFwiJHt0aGlzLndhcmVob3VzZUNvZGV9XCJgO1xyXG4gICAgICB9O1xyXG4gICAgICBsb2NhdGlvbkZpZWxkLmVuYWJsZSgpO1xyXG4gICAgICBsb2NhdGlvbkZpZWxkLmRlcGVuZHNPbiA9ICdFcnBMb2dpY2FsSWQnO1xyXG4gICAgICBsb2NhdGlvbkZpZWxkLndoZXJlID0gKGxvZ2ljYWxJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgRXJwTG9naWNhbElkIGVxIFwiJHtsb2dpY2FsSWR9XCIgYW5kIChMb2NhdGlvblR5cGUgZXEgXCIke3RoaXMub2ZmaWNlQ29kZX1cIiBvciBMb2NhdGlvblR5cGUgZXEgXCIke3RoaXMuc2l0ZUNvZGV9XCIpYDtcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdhcmVob3VzZUZpZWxkLmRpc2FibGUoKTtcclxuICAgICAgbG9jYXRpb25GaWVsZC5kaXNhYmxlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZW50cnkuV2FyZWhvdXNlTG9jYXRpb24pIHtcclxuICAgICAgd2FyZWhvdXNlRmllbGQuc2V0VmFsdWUoZW50cnkuV2FyZWhvdXNlTG9jYXRpb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5LkxvY2F0aW9uKSB7XHJcbiAgICAgIGxvY2F0aW9uRmllbGQuc2V0VmFsdWUoZW50cnkuTG9jYXRpb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LkVycEV4dElkKSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZUJhY2tPZmZpY2VEYXRhKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVuYWJsZUJhY2tPZmZpY2VEYXRhKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfSxcclxuICBzZXRWYWx1ZXM6IGZ1bmN0aW9uIHNldFZhbHVlcygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHNldFZhbHVlcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZmllbGRzLkN1cnJlbmN5Q29kZS5nZXRWYWx1ZSgpKSB7XHJcbiAgICAgIGNvbnN0IGFjY291bnQgPSB0aGlzLmZpZWxkcy5BY2NvdW50LmN1cnJlbnRTZWxlY3Rpb247XHJcbiAgICAgIGlmIChhY2NvdW50ICYmIGFjY291bnQuQ3VycmVuY3lDb2RlKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQ3VycmVuY3lDb2RlLnNldFZhbHVlKGFjY291bnQuQ3VycmVuY3lDb2RlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5DdXJyZW5jeUNvZGUuc2V0VmFsdWUoQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKS5jb2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25SZWZyZXNoOiBmdW5jdGlvbiBvblJlZnJlc2goKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChvblJlZnJlc2gsIGFyZ3VtZW50cyk7XHJcbiAgICBbJ1JlcXVlc3RlZEJ5JywgJ09wcG9ydHVuaXR5JywgJ1dhcmVob3VzZScsICdMb2NhdGlvbiddLmZvckVhY2goKGYpID0+IHtcclxuICAgICAgdGhpcy5maWVsZHNbZl0uZGVwZW5kc09uID0gbnVsbDtcclxuICAgICAgdGhpcy5maWVsZHNbZl0ud2hlcmUgPSBudWxsO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBvblJlZnJlc2hJbnNlcnQ6IGZ1bmN0aW9uIG9uUmVmcmVzaEluc2VydCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKG9uUmVmcmVzaEluc2VydCwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuZW5hYmxlQmFja09mZmljZURhdGEoKTtcclxuICB9LFxyXG4gIGdldEVudHJpZXNGcm9tSWRzOiBmdW5jdGlvbiBnZXRFbnRyaWVzRnJvbUlkcygpIHtcclxuICAgIGNvbnN0IG1hcHBlZExvb2t1cHMgPSBbXHJcbiAgICAgICdCYWNrT2ZmaWNlJyxcclxuICAgICAgJ0JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5JyxcclxuICAgIF07XHJcbiAgICBjb25zdCBtYXBwZWRQcm9wZXJ0aWVzID0gW1xyXG4gICAgICAnTG9naWNhbElkJyxcclxuICAgICAgJ0FjY3RFbnRpdHlFeHRJZCcsXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZmllbGRzID0gWydFcnBMb2dpY2FsSWQnLCAnRXJwQWNjb3VudGluZ0VudGl0eUlkJ107XHJcbiAgICBVdGlsaXR5LnNldEZpZWxkc0Zyb21JZHMobWFwcGVkTG9va3VwcywgbWFwcGVkUHJvcGVydGllcywgZmllbGRzLCB0aGlzKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRQcmltYXJ5Q29udGFjdDogZnVuY3Rpb24gZ2V0UHJpbWFyeUNvbnRhY3QoZW50cnkpIHtcclxuICAgIGNvbnN0IGFjY291bnRNb2RlbCA9IEFkYXB0ZXIuZ2V0TW9kZWwoQ1JNX01PREVMX05BTUVTLkFDQ09VTlQpO1xyXG4gICAgY29uc3QgcmVsYXRpb25zaGlwID0ge1xyXG4gICAgICBuYW1lOiAnQ29udGFjdHMnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogY29udGFjdFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0NvbnRhY3QnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHdoZXJlOiAnSXNQcmltYXJ5IGVxIHRydWUnLFxyXG4gICAgfTtcclxuICAgIGFjY291bnRNb2RlbC5nZXRSZWxhdGVkUmVxdWVzdChlbnRyeSwgcmVsYXRpb25zaGlwKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuZW50aXRpZXMgJiYgcmVzdWx0LmVudGl0aWVzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RGaWVsZCA9IHRoaXMuZmllbGRzLlJlcXVlc3RlZEJ5O1xyXG4gICAgICAgIGlmICghY29udGFjdEZpZWxkLmN1cnJlbnRTZWxlY3Rpb24gfHwgY29udGFjdEZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudCAmJiBjb250YWN0RmllbGQuY3VycmVudFNlbGVjdGlvbi5BY2NvdW50LiRrZXkgIT09IGVudHJ5LiRrZXkpIHtcclxuICAgICAgICAgIGNvbnRhY3RGaWVsZC5zZXRTZWxlY3Rpb24ocmVzdWx0LmVudGl0aWVzWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25BY2NvdW50Q2hhbmdlOiBmdW5jdGlvbiBvbkFjY291bnRDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb247XHJcbiAgICBbJ1JlcXVlc3RlZEJ5JywgJ09wcG9ydHVuaXR5J10uZm9yRWFjaCgoZikgPT4ge1xyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tmXS5kZXBlbmRzT24gPSAnQWNjb3VudCc7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0ud2hlcmUgPSBgQWNjb3VudC5JZCBlcSBcIiR7dmFsdWUuQWNjb3VudElkIHx8IHZhbHVlLiRrZXkgfHwgdmFsdWUua2V5fVwiYDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoZW50cnkpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQ3VycmVuY3lDb2RlLnNldFZhbHVlKChlbnRyeS5DdXJyZW5jeUNvZGUpID8gZW50cnkuQ3VycmVuY3lDb2RlIDogQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKS5jb2RlKTtcclxuICAgICAgaWYgKHRoaXMuZmllbGRzLkJpbGxUby5pc0Rpc2FibGVkICYmIHRoaXMuZmllbGRzLlNoaXBUby5pc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQmlsbFRvLmVuYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZmllbGRzLlNoaXBUby5lbmFibGUoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZW50cnkuQWNjb3VudE1hbmFnZXIpIHtcclxuICAgICAgICBjb25zdCBhY2NvdW50TWFuYWdlckZpZWxkID0gdGhpcy5maWVsZHMuQWNjb3VudE1hbmFnZXI7XHJcbiAgICAgICAgYWNjb3VudE1hbmFnZXJGaWVsZC5zZXRTZWxlY3Rpb24oe1xyXG4gICAgICAgICAgJGtleTogZW50cnkuQWNjb3VudE1hbmFnZXIuJGtleSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBmaWVsZC5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICAgICAgdGhpcy5zaG93QnVzeSgpO1xyXG4gICAgICB0aGlzLmdldFByaW1hcnlDb250YWN0KGVudHJ5KTtcclxuICAgICAgVXRpbGl0eS5zZXRGaWVsZHNGcm9tSWRzKFxyXG4gICAgICAgIFsnQmFja09mZmljZScsICdCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eSddLFxyXG4gICAgICAgIFsnTG9naWNhbElkJywgJ0FjY3RFbnRpdHlFeHRJZCddLFxyXG4gICAgICAgIFsnRXJwTG9naWNhbElkJywgJ0VycEFjY291bnRpbmdFbnRpdHlJZCddLFxyXG4gICAgICAgIHRoaXMsXHJcbiAgICAgICAgZW50cnlcclxuICAgICAgKS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmhpZGVCdXN5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25BY2NvdW50RGVwZW5kZW50Q2hhbmdlOiBmdW5jdGlvbiBvbkFjY291bnREZXBlbmRlbnRDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBpZiAodmFsdWUgJiYgIWZpZWxkLmRlcGVuZHNPbiAmJiBmaWVsZC5jdXJyZW50U2VsZWN0aW9uICYmIGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudCkge1xyXG4gICAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgICBhY2NvdW50RmllbGQuc2V0U2VsZWN0aW9uKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudCk7XHJcbiAgICAgIHRoaXMub25BY2NvdW50Q2hhbmdlKGFjY291bnRGaWVsZC5nZXRWYWx1ZSgpLCBhY2NvdW50RmllbGQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25CYWNrT2ZmaWNlQ2hhbmdlOiBmdW5jdGlvbiBvbkJhY2tPZmZpY2VDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gICAgdGhpcy5maWVsZHMuRXJwTG9naWNhbElkLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uTG9naWNhbElkKTtcclxuICAgIGNvbnN0IGFjY291bnRpbmdGaWVsZCA9IHRoaXMuZmllbGRzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5O1xyXG4gICAgYWNjb3VudGluZ0ZpZWxkLndoZXJlID0gYEJhY2tPZmZpY2UuSWQgZXEgXCIke2ZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uJGtleX1cImA7XHJcbiAgICBjb25zdCBhY2NvdW50aW5nSXNUb0JhY2tPZmZpY2UgPSBhY2NvdW50aW5nRmllbGQuY3VycmVudFNlbGVjdGlvbiAmJiBhY2NvdW50aW5nRmllbGQuY3VycmVudFNlbGVjdGlvbi5CYWNrT2ZmaWNlLiRrZXkgPT09IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uJGtleTtcclxuICAgIGlmIChmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXRpZXMuJHJlc291cmNlcyAmJiAhYWNjb3VudGluZ0lzVG9CYWNrT2ZmaWNlKSB7XHJcbiAgICAgIGNvbnN0IGVudHJ5ID0gZmllbGQuY3VycmVudFNlbGVjdGlvbi5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0aWVzLiRyZXNvdXJjZXNbMF07XHJcbiAgICAgIGlmIChlbnRyeSkge1xyXG4gICAgICAgIGFjY291bnRpbmdGaWVsZC5zZXRTZWxlY3Rpb24oZW50cnkpO1xyXG4gICAgICAgIHRoaXMub25CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eUNoYW5nZShhY2NvdW50aW5nRmllbGQuZ2V0VmFsdWUoKSwgYWNjb3VudGluZ0ZpZWxkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgd2FyZWhvdXNlRmllbGQgPSB0aGlzLmZpZWxkcy5XYXJlaG91c2U7XHJcbiAgICBpZiAod2FyZWhvdXNlRmllbGQuaXNEaXNhYmxlZCkge1xyXG4gICAgICB3YXJlaG91c2VGaWVsZC5lbmFibGUoKTtcclxuICAgICAgd2FyZWhvdXNlRmllbGQuZGVwZW5kc09uID0gJ0VycExvZ2ljYWxJZCc7XHJcbiAgICAgIHdhcmVob3VzZUZpZWxkLndoZXJlID0gKGxvZ2ljYWxJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgRXJwTG9naWNhbElkIGVxIFwiJHtsb2dpY2FsSWR9XCIgYW5kIExvY2F0aW9uVHlwZSBlcSBcIiR7dGhpcy53YXJlaG91c2VDb2RlfVwiYDtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IGxvY2F0aW9uRmllbGQgPSB0aGlzLmZpZWxkcy5Mb2NhdGlvbjtcclxuICAgIGlmIChsb2NhdGlvbkZpZWxkLmlzRGlzYWJsZWQpIHtcclxuICAgICAgbG9jYXRpb25GaWVsZC5lbmFibGUoKTtcclxuICAgICAgbG9jYXRpb25GaWVsZC5kZXBlbmRzT24gPSAnRXJwTG9naWNhbElkJztcclxuICAgICAgbG9jYXRpb25GaWVsZC53aGVyZSA9IChsb2dpY2FsSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gYEVycExvZ2ljYWxJZCBlcSBcIiR7bG9naWNhbElkfVwiIGFuZCAoTG9jYXRpb25UeXBlIGVxIFwiJHt0aGlzLm9mZmljZUNvZGV9XCIgb3IgTG9jYXRpb25UeXBlIGVxIFwiJHt0aGlzLnNpdGVDb2RlfVwiKWA7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5Q2hhbmdlOiBmdW5jdGlvbiBvbkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmFja09mZmljZUFjY291bnRpbmdFbnRpdHkuc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgICB0aGlzLmZpZWxkcy5FcnBBY2NvdW50aW5nRW50aXR5SWQuc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbi5BY2N0RW50aXR5RXh0SWQpO1xyXG4gIH0sXHJcbiAgb25CaWxsVG9DaGFuZ2U6IGZ1bmN0aW9uIG9uQmlsbFRvQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5maWVsZHMuQmlsbFRvLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gIH0sXHJcbiAgb25Db250YWN0Q2hhbmdlOiBmdW5jdGlvbiBvbkNvbnRhY3RDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZSh2YWx1ZSwgZmllbGQpO1xyXG4gIH0sXHJcbiAgb25Mb2NhdGlvbkNoYW5nZTogZnVuY3Rpb24gb25Mb2NhdGlvbkNoYW5jZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGlmIChmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkVycEV4dElkKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkVycExvY2F0aW9uLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uRXJwRXh0SWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5maWVsZHMuTG9jYXRpb24uc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbik7XHJcbiAgfSxcclxuICBvbk9wcG9ydHVuaXR5Q2hhbmdlOiBmdW5jdGlvbiBvbk9wcG9ydHVuaXR5Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2UodmFsdWUsIGZpZWxkKTtcclxuICB9LFxyXG4gIG9uU2hpcFRvQ2hhbmdlOiBmdW5jdGlvbiBvblNoaXBUb0NoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMuZmllbGRzLlNoaXBUby5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICB9LFxyXG4gIG9uV2FyZWhvdXNlQ2hhbmdlOiBmdW5jdGlvbiBvbldhcmVob3VzZUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMuZmllbGRzLldhcmVob3VzZS5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICAgIHRoaXMuZmllbGRzLkxvY2F0aW9uLnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLl9nZXROYXZDb250ZXh0KCk7XHJcblxyXG4gICAgY29uc3QgYWNjb3VudEZpZWxkID0gdGhpcy5maWVsZHMuQWNjb3VudDtcclxuICAgIHRoaXMub25BY2NvdW50Q2hhbmdlKGFjY291bnRGaWVsZC5nZXRWYWx1ZSgpLCBhY2NvdW50RmllbGQpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRleHQgPSAoZm91bmQgJiYgZm91bmQub3B0aW9ucyAmJiBmb3VuZC5vcHRpb25zLnNvdXJjZSkgfHwgZm91bmQ7XHJcbiAgICBjb25zdCBsb29rdXAgPSB7XHJcbiAgICAgIGFjY291bnRzOiB0aGlzLmFwcGx5QWNjb3VudENvbnRleHQsXHJcbiAgICAgIGNvbnRhY3RzOiB0aGlzLmFwcGx5Q29udGFjdENvbnRleHQsXHJcbiAgICAgIG9wcG9ydHVuaXRpZXM6IHRoaXMuYXBwbHlPcHBvcnR1bml0eUNvbnRleHQsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChjb250ZXh0ICYmIGxvb2t1cFtjb250ZXh0LnJlc291cmNlS2luZF0pIHtcclxuICAgICAgbG9va3VwW2NvbnRleHQucmVzb3VyY2VLaW5kXS5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5maWVsZHMuQWNjb3VudC5jdXJyZW50U2VsZWN0aW9uICYmICF0aGlzLmZpZWxkcy5BY2NvdW50LmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5CaWxsVG8uZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5TaGlwVG8uZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmZpZWxkcy5CYWNrT2ZmaWNlLmN1cnJlbnRTZWxlY3Rpb24pIHtcclxuICAgICAgdGhpcy5maWVsZHMuTG9jYXRpb24uZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5XYXJlaG91c2UuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dldE5hdkNvbnRleHQ6IGZ1bmN0aW9uIF9nZXROYXZDb250ZXh0KCkge1xyXG4gICAgY29uc3QgbmF2Q29udGV4dCA9IEFwcC5xdWVyeU5hdmlnYXRpb25Db250ZXh0KChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSAoby5vcHRpb25zICYmIG8ub3B0aW9ucy5zb3VyY2UpIHx8IG87XHJcblxyXG4gICAgICBpZiAoL14oYWNjb3VudHN8Y29udGFjdHN8b3Bwb3J0dW5pdGllcykkLy50ZXN0KGNvbnRleHQucmVzb3VyY2VLaW5kKSAmJiBjb250ZXh0LmtleSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuYXZDb250ZXh0O1xyXG4gIH0sXHJcbiAgYXBwbHlBY2NvdW50Q29udGV4dDogZnVuY3Rpb24gYXBwbHlBY2NvdW50Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQuZW50cnkgfHwgKHZpZXcgJiYgdmlldy5lbnRyeSkgfHwgY29udGV4dDtcclxuXHJcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS4ka2V5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgYWNjb3VudEZpZWxkLnNldFNlbGVjdGlvbihlbnRyeSk7XHJcbiAgICB0aGlzLm9uQWNjb3VudENoYW5nZShhY2NvdW50RmllbGQuZ2V0VmFsdWUoKSwgYWNjb3VudEZpZWxkKTtcclxuICB9LFxyXG4gIGFwcGx5Q29udGFjdENvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGFjdENvbnRleHQoY29udGV4dCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgY29uc3QgZW50cnkgPSBjb250ZXh0LmVudHJ5IHx8ICh2aWV3ICYmIHZpZXcuZW50cnkpIHx8IGNvbnRleHQ7XHJcblxyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuJGtleSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGFjdEZpZWxkID0gdGhpcy5maWVsZHMuUmVxdWVzdGVkQnk7XHJcbiAgICBjb250YWN0RmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKGNvbnRhY3RGaWVsZC5nZXRWYWx1ZSgpLCBjb250YWN0RmllbGQpO1xyXG4gIH0sXHJcbiAgYXBwbHlPcHBvcnR1bml0eUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5T3Bwb3J0dW5pdHlDb250ZXh0KGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb250ZXh0LmlkKTtcclxuICAgIGNvbnN0IGVudHJ5ID0gY29udGV4dC5lbnRyeSB8fCAodmlldyAmJiB2aWV3LmVudHJ5KSB8fCBjb250ZXh0O1xyXG5cclxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LiRrZXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wcG9ydHVuaXR5RmllbGQgPSB0aGlzLmZpZWxkcy5PcHBvcnR1bml0eTtcclxuICAgIG9wcG9ydHVuaXR5RmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKG9wcG9ydHVuaXR5RmllbGQuZ2V0VmFsdWUoKSwgb3Bwb3J0dW5pdHlGaWVsZCk7XHJcbiAgfSxcclxuICBoaWRlQnVzeTogZnVuY3Rpb24gaGlkZUJ1c3koKSB7XHJcbiAgICBpZiAodGhpcy5fYnVzeUluZGljYXRvcikge1xyXG4gICAgICB0aGlzLl9idXN5SW5kaWNhdG9yLmNvbXBsZXRlKCk7XHJcbiAgICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgQXBwLm1vZGFsLmhpZGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dCdXN5OiBmdW5jdGlvbiBzaG93QnVzeSgpIHtcclxuICAgIGlmICghdGhpcy5fYnVzeUluZGljYXRvciB8fCB0aGlzLl9idXN5SW5kaWNhdG9yLl9kZXN0cm95ZWQpIHtcclxuICAgICAgdGhpcy5fYnVzeUluZGljYXRvciA9IG5ldyBCdXN5SW5kaWNhdG9yKHsgaWQ6IGAke3RoaXMuaWR9LWJ1c3lJbmRpY2F0b3JgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYnVzeUluZGljYXRvci5zdGFydCgpO1xyXG4gICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IHRydWU7XHJcbiAgICBBcHAubW9kYWwuc2hvd1Rvb2xiYXIgPSBmYWxzZTtcclxuICAgIEFwcC5tb2RhbC5hZGQodGhpcy5fYnVzeUluZGljYXRvcik7XHJcbiAgfSxcclxuICBmb3JtYXREZXBlbmRlbnRRdWVyeTogZnVuY3Rpb24gZm9ybWF0RGVwZW5kZW50UXVlcnkoZGVwZW5kZW50VmFsdWUsIHRoZUZvcm1hdCwgcHJvcGVydHkpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGVGb3JtYXQsIFt1dGlsaXR5LmdldFZhbHVlKGRlcGVuZGVudFZhbHVlLCBwcm9wZXJ0eSB8fCAnJGtleScpXSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9yZWxhdGVkJyxcclxuICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3Bwb3J0dW5pdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICB2aWV3OiAnb3Bwb3J0dW5pdHlfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5iYWNrT2ZmaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnQmFja09mZmljZScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0JhY2tPZmZpY2VOYW1lJyxcclxuICAgICAgICB2aWV3OiAnc2FsZXNvcmRlcl9iYWNrb2ZmaWNlX3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiAnSXNBY3RpdmUgZXEgdHJ1ZScsXHJcbiAgICAgICAgaW5jbHVkZTogZmFsc2UsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRpbmdFbnRpdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX2JhY2tvZmZpY2VhY2NvdW50aW5nZW50aXR5X3JlbGF0ZWQnLFxyXG4gICAgICAgIGluY2x1ZGU6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jdXJyZW5jeVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdDdXJyZW5jeSBDb2RlcycsXHJcbiAgICAgICAgc2luZ2xlU2VsZWN0OiB0cnVlLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ2NvZGUnLFxyXG4gICAgICAgIGtleVByb3BlcnR5OiAnY29kZScsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5waWNrbGlzdEV4aXN0cyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmR1ZURhdGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdEdWVEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0R1ZURhdGUnLFxyXG4gICAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgICB0aW1lbGVzczogZmFsc2UsXHJcbiAgICAgICAgc2hvd1RpbWVQaWNrZXI6IHRydWUsXHJcbiAgICAgICAgc2hvd1JlbGF0aXZlRGF0ZVRpbWU6IGZhbHNlLFxyXG4gICAgICAgIGRhdGVGb3JtYXRUZXh0OiB0aGlzLmRhdGVGb3JtYXQsXHJcbiAgICAgICAgbWluVmFsdWU6IChuZXcgRGF0ZSgxOTAwLCAwLCAxKSksXHJcbiAgICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgICB2YWxpZGF0b3IuaXNEYXRlSW5SYW5nZSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY3VzdG9tZXJQT1RleHQsXHJcbiAgICAgICAgbmFtZTogJ0N1c3RvbWVyUE9OdW1iZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ3VzdG9tZXJQdXJjaGFzZU9yZGVyTnVtYmVyJyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jb21tZW50c1RleHQsIC8vIFRPRE86IE1ha2Ugb24gc2F2ZSwgYXBwZW5kICdDcmVhdGVkIGJ5IDx1c2VyPiBvbiA8ZGF0ZXRpbWU+JyB0byBjb21tZW50XHJcbiAgICAgICAgbm90ZVByb3BlcnR5OiBmYWxzZSxcclxuICAgICAgICBuYW1lOiAnQ29tbWVudHMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29tbWVudHMnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbW1lbnRzVGV4dCxcclxuICAgICAgICB0eXBlOiAnbm90ZScsXHJcbiAgICAgICAgdmlldzogJ3RleHRfZWRpdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5sb2NhdGlvblRleHQsXHJcbiAgICAgICAgbmFtZTogJ0xvY2F0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xvY2F0aW9uJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHZpZXc6ICdvcmRlcl9sb2NhdGlvbl9saXN0JyxcclxuICAgICAgICB0aXRsZTogdGhpcy5sb2NhdGlvbnNUaXRsZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwTG9jYXRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTG9jYXRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy53YXJlaG91c2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdXYXJlaG91c2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnV2FyZWhvdXNlTG9jYXRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgdmlldzogJ29yZGVyX3dhcmVob3VzZV9saXN0JyxcclxuICAgICAgICB0aXRsZTogdGhpcy53YXJlaG91c2VMb2NhdGlvblRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5yZXF1ZXN0ZWRCeVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1JlcXVlc3RlZEJ5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1JlcXVlc3RlZEJ5JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTmFtZUxGJyxcclxuICAgICAgICB2aWV3OiAnY29udGFjdF9yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXR1c1RleHQsXHJcbiAgICAgICAgbmFtZTogJ1NhbGVzIE9yZGVyIFN0YXR1cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdGF0dXMnLFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdFcnBTYWxlc09yZGVyU3RhdHVzJyxcclxuICAgICAgICBzaW5nbGVTZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgdGl0bGVUZXh0OiB0aGlzLnN0YXR1c1RpdGxlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmlsbFRvVGV4dCxcclxuICAgICAgICBuYW1lOiAnQmlsbFRvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEJpbGxUbycsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0FkZHJlc3MuRnVsbEFkZHJlc3MnLFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX2JpbGxUb19yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgICB0aGlzLCAnRXJwQmlsbFRvQWNjb3VudHMuQWNjb3VudC5JZCBlcSBcIiR7MH1cIidcclxuICAgICAgICApLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcFRvVGV4dCxcclxuICAgICAgICBuYW1lOiAnU2hpcFRvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUbycsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0FkZHJlc3MuRnVsbEFkZHJlc3MnLFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX3NoaXBUb19yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgICB0aGlzLCAnRXJwU2hpcFRvQWNjb3VudHMuQWNjb3VudC5JZCBlcSBcIiR7MH1cIidcclxuICAgICAgICApLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jYXJyaWVyVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ2FycmllcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYXJyaWVyJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQ2Fycmllck5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX2NhcnJpZXJzJyxcclxuICAgICAgICB3aGVyZTogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYEVycExvZ2ljYWxJZCBlcSBcIiR7dmFsdWV9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5iYWNrT3JkZXJlZFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0JhY2tPcmRlcmVkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEJhY2tPcmRlcmVkJyxcclxuICAgICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgICBvblRleHQ6IHRoaXMueWVzVGV4dCxcclxuICAgICAgICBvZmZUZXh0OiB0aGlzLm5vVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRyb3BTaGlwbWVudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Ryb3BTaGlwbWVudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBEcm9wU2hpcCcsXHJcbiAgICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgICAgb25UZXh0OiB0aGlzLnllc1RleHQsXHJcbiAgICAgICAgb2ZmVGV4dDogdGhpcy5ub1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5lYXJseVNoaXBtZW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnRWFybHlTaGlwbWVudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTaGlwRWFybHknLFxyXG4gICAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgIG9uVGV4dDogdGhpcy55ZXNUZXh0LFxyXG4gICAgICAgIG9mZlRleHQ6IHRoaXMubm9UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaW52b2ljZUltbWVkaWF0ZWx5VGV4dCxcclxuICAgICAgICBuYW1lOiAnSW52b2ljZUltbWVkaWF0ZWx5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEludm9pY2VJbW1lZGlhdGVseScsXHJcbiAgICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgICAgb25UZXh0OiB0aGlzLnllc1RleHQsXHJcbiAgICAgICAgb2ZmVGV4dDogdGhpcy5ub1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wYXJ0aWFsU2hpcFRleHQsXHJcbiAgICAgICAgbmFtZTogJ1BhcnRpYWxTaGlwbWVudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBQYXJ0aWFsU2hpcEFsbG93ZWQnLFxyXG4gICAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgIG9uVGV4dDogdGhpcy55ZXNUZXh0LFxyXG4gICAgICAgIG9mZlRleHQ6IHRoaXMubm9UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudGF4RXhlbXB0VGV4dCxcclxuICAgICAgICBuYW1lOiAnVGF4RXhlbXB0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFRheEV4ZW1wdCcsXHJcbiAgICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgICAgb25UZXh0OiB0aGlzLnllc1RleHQsXHJcbiAgICAgICAgb2ZmVGV4dDogdGhpcy5ub1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50TWFuYWdlclRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjY291bnRNYW5hZ2VyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnRNYW5hZ2VyJyxcclxuICAgICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdOYW1lJyxcclxuICAgICAgfSxcclxuICAgICAgXSB9LFxyXG4gICAgXSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuU2FsZXNPcmRlcnMuRWRpdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=