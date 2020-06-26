define("crm/Integrations/BOE/Modules/AccountModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./_Module", "crm/Views/Account/Detail", "argos/Dialogs/BusyIndicator", "../Views/ERPBillTos/List", "../Views/ERPContactAssociations/List", "../Views/ERPInvoices/List", "../Views/ERPReceivables/List", "../Views/ERPShipments/List", "../Views/ERPShipTos/List", "../Promote", "../Views/Quotes/List", "../Views/Returns/List", "../Views/SalesOrders/List", "../Views/SyncResults/List", "../Views/ERPAccountPersons/List", "../Utility", "../../../Format", "../Models/ErpAccountPerson/Offline", "../Models/ErpAccountPerson/SData", "../Views/Account/SalesDashboardWidget", "../Views/Account/NewDashboardWidget", "../Views/Account/OpenDashboardWidget", "../Views/Account/ActivityDashboardWidget", "argos/I18n"], function (_exports, _declare, _lang, _Module2, _Detail, _BusyIndicator, _List, _List2, _List3, _List4, _List5, _List6, _Promote, _List7, _List8, _List9, _List10, _List11, _Utility, _Format, _Offline, _SData, _SalesDashboardWidget, _NewDashboardWidget, _OpenDashboardWidget, _ActivityDashboardWidget, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Module2 = _interopRequireDefault(_Module2);
  _Detail = _interopRequireDefault(_Detail);
  _BusyIndicator = _interopRequireDefault(_BusyIndicator);
  _List = _interopRequireDefault(_List);
  _List2 = _interopRequireDefault(_List2);
  _List3 = _interopRequireDefault(_List3);
  _List4 = _interopRequireDefault(_List4);
  _List5 = _interopRequireDefault(_List5);
  _List6 = _interopRequireDefault(_List6);
  _Promote = _interopRequireDefault(_Promote);
  _List7 = _interopRequireDefault(_List7);
  _List8 = _interopRequireDefault(_List8);
  _List9 = _interopRequireDefault(_List9);
  _List10 = _interopRequireDefault(_List10);
  _List11 = _interopRequireDefault(_List11);
  _Utility = _interopRequireDefault(_Utility);
  _Format = _interopRequireDefault(_Format);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('accountModule');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Modules.AccountModule', [_Module2["default"]], {
    // Localization
    erpStatusText: resource.erpStatusText,
    erpCustomerText: resource.erpCustomerText,
    erpPaymentTermText: resource.erpPaymentTermText,
    erpFinanceLimitText: resource.erpFinanceLimitText,
    syncStatusText: resource.syncStatusText,
    backOfficeText: resource.backOfficeText,
    accountingEntityText: resource.accountingEntityText,
    backOfficeIdText: resource.backOfficeIdText,
    accountingEntityIdText: resource.accountingEntityIdText,
    erpQuotesText: resource.erpQuotesText,
    erpSalesOrdersText: resource.erpSalesOrdersText,
    erpShipmentsText: resource.erpShipmentsText,
    erpInvoicesText: resource.erpInvoicesText,
    erpReceivablesText: resource.erpReceivablesText,
    erpReturnsText: resource.erpReturnsText,
    erpBillToText: resource.erpBillToText,
    erpShipToText: resource.erpShipToText,
    erpSalesPersonText: resource.erpSalesPersonText,
    erpContactAssociationText: resource.erpContactAssociationText,
    quotesText: resource.quotesText,
    ordersText: resource.ordersText,
    relatedERPItemsText: resource.relatedERPItemsText,
    dashboardText: resource.dashboardText,
    newTransactionsText: resource.newTransactionsText,
    openTransactionsText: resource.openTransactionsText,
    financialSnapshotText: resource.financialSnapshotText,
    promoteText: resource.promoteText,
    addQuoteText: resource.addQuoteText,
    addOrderText: resource.addOrderText,
    syncHistoryText: resource.syncHistoryText,
    erpStatusDateText: resource.erpStatusDateText,
    erpOpenSalesOrdersText: resource.erpOpenSalesOrdersText,
    erpNewSalesOrdersText: resource.erpNewSalesOrdersText,
    erpNewQuotesText: resource.erpNewQuotesText,
    erpOpenQuotesText: resource.erpOpenQuotesText,
    // Picklist Codes
    openCode: 'Open',
    approvedCode: 'Approved',
    workingCode: 'Working',
    partialShipCode: 'PartiallyShipped',
    partialPaidCode: 'PartialPaid',
    closedCode: 'Closed',
    disputeCode: 'Dispute',
    init: function init() {
      App.picklistService.registerPicklistToView('SyncStatus', 'account_detail');
      App.picklistService.registerPicklistToView('ErpAccountStatus', 'account_detail');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List3["default"]({
        id: 'account_erpinvoice_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List3["default"]({
        id: 'account_revenueerpinvoice_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryWhere: '',
        queryOrderBy: 'CreateDate asc',
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List3["default"]({
        id: 'account_costerpinvoice_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryWhere: '',
        queryOrderBy: 'CreateDate asc',
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List3["default"]({
        id: 'account_lateinvoice_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryWhere: '',
        queryOrderBy: 'CreateDate asc',
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List3["default"]({
        id: 'account_newerpinvoice_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryWhere: '',
        queryOrderBy: 'CreateDate asc',
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List5["default"]({
        id: 'account_erpshipments_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List5["default"]({
        id: 'account_newerpshipments_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryWhere: '',
        queryOrderBy: 'CreateDate asc',
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List8["default"]({
        id: 'account_returns_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List4["default"]({
        id: 'account_erpreceivables_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List4["default"]({
        id: 'account_newerpreceivables_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryWhere: '',
        queryOrderBy: 'CreateDate asc',
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List7["default"]({
        id: 'account_quotes_related',
        title: this.quotesText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));
      am.registerView(new _List7["default"]({
        id: 'account_openquotes_related',
        title: this.erpOpenQuotesText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));
      am.registerView(new _List7["default"]({
        id: 'account_newquotes_related',
        title: this.erpNewQuotesText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));
      am.registerView(new _List9["default"]({
        id: 'account_salesorders_related',
        title: this.ordersText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));
      am.registerView(new _List9["default"]({
        id: 'account_opensalesorders_related',
        title: this.erpOpenSalesOrdersText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));
      am.registerView(new _List9["default"]({
        id: 'account_latesalesorders_related',
        title: this.erpSalesOrdersText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));
      am.registerView(new _List9["default"]({
        id: 'account_neworders_related',
        title: this.erpNewSalesOrdersText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryWhere: ''
      }));
      am.registerView(new _List["default"]({
        id: 'account_billto_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false
      }));
      am.registerView(new _List6["default"]({
        id: 'account_shipto_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false
      }));
      am.registerView(new _List2["default"]({
        id: 'account_contactassociations_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List10["default"]({
        id: 'account_syncresults_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List11["default"]({
        id: 'account_salesperson_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      var Busy = _BusyIndicator["default"]; // Row names to match in the detail and more detail sections.
      // These are the last item in the section.

      var detailRowMatch = 'AccountManager.UserInfo';
      var moreDetailRowMatch = 'Owner.OwnerDescription';
      am.registerCustomization('models/list/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpExtId'
      });
      am.registerCustomization('models/list/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpAccountingEntityId'
      });
      am.registerCustomization('models/list/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpLogicalId'
      });

      _lang["default"].extend(crm.Views.Account.List, {
        formatSearchQuery: function formatSearchQuery(searchQuery) {
          var q = this.escapeSearchQuery(searchQuery.toUpperCase());
          return "AccountNameUpper like \"".concat(q, "%\" or upper(ErpExtId) like \"").concat(q, "%\"");
        }
      });

      am.registerCustomization('models/detail/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpExtId'
      });
      am.registerCustomization('models/detail/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpStatus'
      });
      am.registerCustomization('models/detail/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpStatusDate'
      });
      am.registerCustomization('models/detail/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpPaymentTerm'
      });
      am.registerCustomization('models/detail/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'SyncStatus'
      });
      am.registerCustomization('models/detail/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpAccountingEntityId'
      });
      am.registerCustomization('models/detail/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpLogicalId'
      });
      am.registerCustomization('models/detail/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'PromotedToAccounting'
      });
      am.registerCustomization('models/detail/querySelect', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpBillToAccounts/*'
      });
      am.registerCustomization('models/picklists', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: {
          name: 'ErpAccountStatus',
          property: 'ErpStatus'
        }
      });
      am.registerCustomization('models/picklists', 'account_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: {
          name: 'SyncStatus',
          property: 'SyncStatus'
        }
      });
      am.registerCustomization('models/relationships', 'account_offline_model', {
        at: function at(relationship) {
          return relationship.name === 'Tickets';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'ContactAssociation',
          displayName: (0, _I18n["default"])('erpContactAssociationModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'ERPContactAccount',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'Quote',
          displayName: (0, _I18n["default"])('quoteModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'Quote',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'SalesOrder',
          displayName: (0, _I18n["default"])('salesOrderModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SalesOrder',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'SyncHistory',
          displayName: (0, _I18n["default"])('syncResultModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SyncResult',
          relatedProperty: 'EntityId',
          where: 'EntityType eq "Account"'
        }]
      });
      am.registerCustomization('models/relationships', 'account_sdata_model', {
        at: function at(relationship) {
          return relationship.name === 'Tickets';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'ContactAssociation',
          displayName: (0, _I18n["default"])('erpContactAssociationModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'ERPContactAccount',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'Quote',
          displayName: (0, _I18n["default"])('quoteModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'Quote',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'SalesOrder',
          displayName: (0, _I18n["default"])('salesOrderModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SalesOrder',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'SyncHistory',
          displayName: (0, _I18n["default"])('syncResultModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SyncResult',
          relatedProperty: 'EntityId',
          where: 'EntityType eq "Account"'
        }]
      }); // Add promoteAccount function to detail

      _lang["default"].extend(crm.Views.Account.Detail, {
        promoteIcon: 'upload',
        successfulLinkText: 'Linked Successfully',
        linkingText: 'Linking ${account} to ${backOffice}',
        errorMessage: 'Error promoting account for reason: ${reason}',
        tabListItemTemplate: new Simplate(['<li data-key="{%: $.name %}" class="tab" data-action="selectedTab">', '<a href="#{%: $$.id %}_{%: $.name %}">{%: ($.title || $.options.title) %}</a>', '</li>']),
        orginalProcessEntry: crm.Views.Account.Detail.prototype.processEntry,
        processEntry: function processEntry(entry) {
          this.dashboardLoaded = false;
          this.orginalProcessEntry(entry);
        },
        selectedTab: function selectedTab(params) {
          var key = params.key;

          if (!this.dashboardLoaded && key === 'DashboardSection') {
            this._loadDashboards();

            this.dashboardLoaded = true;
          }
        },
        _loadDashboards: function _loadDashboards() {
          var layout = this._createCustomizedLayout(this.createLayout());

          for (var key in layout) {
            if (layout.hasOwnProperty(key)) {
              var item = layout[key];

              if (item.name === 'DashboardSection') {
                for (var i in item.children) {
                  if (item.children[i]) {
                    this._loadDashboard(item.children[i]);
                  }
                }
              }
            }
          }
        },
        _loadDashboard: function _loadDashboard(dashboardLayout) {
          var rvm = this.getRelatedViewManager(dashboardLayout.relatedView);

          if (rvm) {
            for (var key in rvm.relatedViews) {
              if (rvm.relatedViews.hasOwnProperty(key)) {
                var dashboard = rvm.relatedViews[key];

                if (dashboard) {
                  dashboard.onToggleView(true);
                }
              }
            }
          }
        },
        _canPromote: function _canPromote() {
          var _this = this;

          var promise = new Promise(function (resolve) {
            _this.showBusy();

            var entry = {
              $name: 'CanPromoteAccount',
              request: {
                accountId: _this.entry.$key
              }
            };
            var request = new Sage.SData.Client.SDataServiceOperationRequest(_this.getService()).setResourceKind('accounts').setContractName('dynamic').setOperationName('CanPromoteAccount');
            var canPromote = {
              value: false,
              result: ''
            };
            request.execute(entry, {
              async: false,
              success: function success(result) {
                canPromote.value = result.response.Result;
                resolve(canPromote);
              },
              failure: function failure(err) {
                var response = JSON.parse(err.response)[0];
                canPromote.result = response.message;
                resolve(canPromote);
              },
              scope: _this
            });
          });
          return promise;
        },
        _onPromoteAccountClick: function _onPromoteAccountClick() {
          var _this2 = this;

          var canPromotePromise = this._canPromote();

          canPromotePromise.then(function (val) {
            _this2.hideBusy();

            if (!val.value) {
              App.modal.createSimpleDialog({
                title: 'alert',
                content: val.result,
                getContent: function getContent() {
                  return;
                }
              });
              return;
            }

            var promote = new _Promote["default"]();
            promote.promoteToBackOffice(_this2.entry, 'Account', _this2);
          });
        },
        _onAddQuoteClick: function _onAddQuoteClick() {
          var view = App.getView('quote_edit');
          view.show({
            fromContext: this,
            detailView: 'quote_detail',
            insert: true
          });
        },
        _onAddOrderClick: function _onAddOrderClick() {
          var view = App.getView('salesorder_edit');
          view.show({
            fromContext: this,
            detailView: 'salesorder_detail',
            insert: true
          });
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
            this._busyIndicator = new Busy({
              id: "".concat(this.id, "-busyIndicator")
            });
          }

          this._busyIndicator.start();

          App.modal.disableClose = true;
          App.modal.showToolbar = false;
          App.modal.add(this._busyIndicator);
        }
      });

      var originalProcessData = crm.Views.Account.Edit.prototype.processData;
      var originalInit = crm.Views.Account.Edit.prototype.init;
      var originalProcessEntry = crm.Views.Account.Edit.prototype.processEntry;
      var originalOnRefreshInsert = crm.Views.Account.Edit.prototype.onRefreshInsert;
      var icboeUtility = _Utility["default"];

      _lang["default"].extend(crm.Views.Account.Edit, {
        _busyIndicator: null,
        init: function init() {
          originalInit.apply(this, arguments);
          this.connect(this.fields.BackOffice, 'onChange', this.onBackOfficeChange);
          this.connect(this.fields.BackOfficeAccountingEntity, 'onChange', this.onBackOfficeAccountingEntityChange);
        },
        disableBackOfficeData: function disableBackOfficeData() {
          this.fields.BackOffice.disable();
          this.fields.BackOfficeAccountingEntity.disable();
        },
        enableBackOfficeData: function enableBackOfficeData() {
          this.fields.BackOffice.enable();
          this.fields.BackOfficeAccountingEntity.enable();
        },
        processEntry: function processEntry(entry) {
          originalProcessEntry.apply(this, arguments);

          if (entry && entry.ErpExtId) {
            this.disableBackOfficeData();
          } else {
            this.enableBackOfficeData();
          }

          return entry;
        },
        processData: function processData() {
          this.showBusy();
          originalProcessData.apply(this, arguments);
          this.getEntriesFromIds();
        },
        getEntriesFromIds: function getEntriesFromIds() {
          var _this3 = this;

          var mappedLookups = ['BackOffice', 'BackOfficeAccountingEntity'];
          var mappedProperties = ['LogicalId', 'AcctEntityExtId'];
          var fields = ['ErpLogicalId', 'ErpAccountingEntityId'];
          icboeUtility.setFieldsFromIds(mappedLookups, mappedProperties, fields, this).then(function () {
            _this3.hideBusy();
          });
        },
        onBackOfficeChange: function onBackOfficeChange(value, field) {
          this.fields.BackOffice.setValue(field.currentSelection);
          this.fields.ErpLogicalId.setValue(field.currentSelection.LogicalId);
          var accountingField = this.fields.BackOfficeAccountingEntity;
          accountingField.where = "BackOffice.Id eq \"".concat(field.currentSelection.$key, "\"");
          var accountingIsToBackOffice = accountingField.currentSelection && accountingField.currentSelection.BackOffice.$key === field.currentSelection.$key;

          if (field.currentSelection.BackOfficeAccountingEntities.$resources && !accountingIsToBackOffice) {
            var entry = field.currentSelection.BackOfficeAccountingEntities.$resources[0];

            if (entry) {
              accountingField.setSelection(entry);
              this.onBackOfficeAccountingEntityChange(accountingField.getValue(), accountingField);
            }
          }
        },
        onBackOfficeAccountingEntityChange: function onBackOfficeAccountingEntityChange(value, field) {
          this.fields.BackOfficeAccountingEntity.setValue(field.currentSelection);
          this.fields.ErpAccountingEntityId.setValue(field.currentSelection.AcctEntityExtId);
        },
        onRefreshInsert: function onRefreshInsert() {
          this.enableBackOfficeData();
          originalOnRefreshInsert.apply(this, arguments);
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
            this._busyIndicator = new Busy({
              id: "".concat(this.id, "-busyIndicator")
            });
          }

          this._busyIndicator.start();

          App.modal.disableClose = true;
          App.modal.showToolbar = false;
          App.modal.add(this._busyIndicator);
        }
      });
      /*
       * Edit View
       */


      am.registerCustomization('edit', 'account_edit', {
        at: function at(row) {
          return row.name === 'BusinessDescription';
        },
        type: 'insert',
        where: 'after',
        value: [{
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
        }]
      });
      /*
       * Quick Actions
       */

      am.registerCustomization('detail', 'account_detail', {
        at: function at(row) {
          return row.name === 'AddNoteAction';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'PromoteAccount',
          property: 'AccountName',
          label: this.promoteText,
          iconClass: 'send',
          action: '_onPromoteAccountClick',
          security: 'Entities/Account/PromoteAccount'
        }, {
          name: 'AddQuote',
          property: 'AccountName',
          label: this.addQuoteText,
          iconClass: 'document',
          action: '_onAddQuoteClick',
          security: 'Entities/Quote/Add'
        }, {
          name: 'AddOrder',
          property: 'AccountName',
          label: this.addOrderText,
          iconClass: 'cart',
          action: '_onAddOrderClick',
          security: 'Entities/SalesOrder/Add'
        }]
      });
      /*
       * Details
       */

      am.registerCustomization('detail', 'account_detail', {
        at: function at(row) {
          return row.name === detailRowMatch;
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'ErpStatus',
          property: 'ErpStatus',
          label: this.erpStatusText,
          renderer: function renderer(val) {
            return _Detail["default"].prototype.formatPicklist.call(this, 'ErpAccountStatus')(val);
          }
        }, {
          name: 'ErpStatusDate',
          property: 'ErpStatusDate',
          label: this.erpStatusDateText,
          renderer: function renderer(data) {
            return _Format["default"].date(data);
          }
        }, {
          label: this.syncStatusText,
          property: 'SyncStatus',
          renderer: function renderer(val) {
            return _Detail["default"].prototype.formatPicklist.call(this, 'SyncStatus')(val);
          }
        }, {
          label: this.erpCustomerText,
          property: 'ErpExtId'
        }, {
          label: this.backOfficeIdText,
          property: 'ErpLogicalId'
        }, {
          label: this.accountingEntityIdText,
          property: 'ErpAccountingEntityId'
        }]
      });
      /*
       * More Details
       */

      am.registerCustomization('detail', 'account_detail', {
        at: function at(row) {
          return row.name === moreDetailRowMatch;
        },
        type: 'insert',
        where: 'after',
        value: {
          label: this.erpPaymentTermText,
          property: 'ErpPaymentTerm'
        }
      });
      /*
       * Related Items
       */

      am.registerCustomization('detail', 'account_detail', {
        at: function at(row) {
          return row.name === 'RelatedItemsSection';
        },
        type: 'insert',
        where: 'after',
        value: {
          title: this.relatedERPItemsText,
          list: true,
          name: 'RelatedERPItemsSection',
          enableOffline: false,
          children: [{
            name: 'Quotes',
            label: this.quotesText,
            where: function where(entry) {
              return "Account.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'account_quotes_related'
          }, {
            name: 'SalesOrders',
            label: this.ordersText,
            where: function where(entry) {
              return "Account.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'account_salesorders_related'
          }, {
            name: 'Shipments',
            label: this.erpShipmentsText,
            where: function where(entry) {
              return "Account.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'account_erpshipments_related'
          }, {
            name: 'ERPInvoicesRelated',
            label: this.erpInvoicesText,
            where: function where(entry) {
              return "Account.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'account_erpinvoice_related'
          }, {
            name: 'ERPReceivablesRelated',
            label: this.erpReceivablesText,
            where: function where(entry) {
              return "Account.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'account_erpreceivables_related'
          }, {
            name: 'ERPReturnsRelated',
            label: this.erpReturnsText,
            where: function where(entry) {
              return "Account.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'account_returns_related'
          }, {
            name: 'BillTo',
            label: this.erpBillToText,
            where: function where(entry) {
              return "ErpBillToAccounts.Account.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'account_billto_related'
          }, {
            name: 'ShipTo',
            label: this.erpShipToText,
            where: function where(entry) {
              return "ErpShipToAccounts.Account.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'account_shipto_related'
          }, {
            name: 'ContactAssociations',
            label: this.erpContactAssociationText,
            where: function where(entry) {
              return "Account.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'account_contactassociations_related'
          }, {
            name: 'SalesPersons',
            label: this.erpSalesPersonText,
            where: function where(entry) {
              return "Account.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'account_salesperson_related'
          }, {
            name: 'SyncHistory',
            label: this.syncHistoryText,
            where: function where(entry) {
              return "EntityType eq \"Account\" and EntityId eq \"".concat(entry.$key, "\"");
            },
            view: 'account_syncresults_related'
          }]
        }
      });

      if (App.enableDashboards) {
        am.registerCustomization('detail', 'account_detail', {
          at: function at(row) {
            return row.name === 'RelatedItemsSection';
          },
          type: 'insert',
          where: 'before',
          value: {
            title: this.dashboardText,
            list: true,
            name: 'DashboardSection',
            enableOffline: false,
            children: [{
              name: 'AccountSalesDashboardWidget',
              relatedView: {
                widgetType: 'account_sales_dashboard_widget',
                id: 'account_sales_dashboard_widget'
              }
            }, {
              name: 'AccountNewDashboardWidget',
              relatedView: {
                widgetType: 'account_new_dashboard_widget',
                id: 'account_new_dashboard_widget'
              }
            }, {
              name: 'AccountOpenDashboardWidget',
              relatedView: {
                widgetType: 'account_open_dashboard_widget',
                id: 'account_open_dashboard_widget'
              }
            }]
          }
        });
      }
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang["default"].setObject('icboe.Modules.AccountModule', __class);

  var _default = __class;
  _exports["default"] = _default;
});