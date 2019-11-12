define('crm/Integrations/BOE/Modules/AccountModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', 'crm/Views/Account/Detail', 'argos/Dialogs/BusyIndicator', '../Views/ERPBillTos/List', '../Views/ERPContactAssociations/List', '../Views/ERPInvoices/List', '../Views/ERPReceivables/List', '../Views/ERPShipments/List', '../Views/ERPShipTos/List', '../Promote', '../Views/Quotes/List', '../Views/Returns/List', '../Views/SalesOrders/List', '../Views/SyncResults/List', '../Views/ERPAccountPersons/List', '../Utility', '../../../Format', 'argos/I18n', '../Models/ErpAccountPerson/Offline', '../Models/ErpAccountPerson/SData', '../Views/Account/SalesDashboardWidget', '../Views/Account/NewDashboardWidget', '../Views/Account/OpenDashboardWidget', '../Views/Account/ActivityDashboardWidget'], function (module, exports, _declare, _lang, _Module2, _Detail, _BusyIndicator, _List, _List3, _List5, _List7, _List9, _List11, _Promote, _List13, _List15, _List17, _List19, _List21, _Utility, _Format, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _BusyIndicator2 = _interopRequireDefault(_BusyIndicator);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

  var _List8 = _interopRequireDefault(_List7);

  var _List10 = _interopRequireDefault(_List9);

  var _List12 = _interopRequireDefault(_List11);

  var _Promote2 = _interopRequireDefault(_Promote);

  var _List14 = _interopRequireDefault(_List13);

  var _List16 = _interopRequireDefault(_List15);

  var _List18 = _interopRequireDefault(_List17);

  var _List20 = _interopRequireDefault(_List19);

  var _List22 = _interopRequireDefault(_List21);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Format2 = _interopRequireDefault(_Format);

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

  var resource = (0, _I18n2.default)('accountModule');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.AccountModule', [_Module3.default], {
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

      am.registerView(new _List6.default({
        id: 'account_erpinvoice_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));

      am.registerView(new _List6.default({
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

      am.registerView(new _List6.default({
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

      am.registerView(new _List6.default({
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

      am.registerView(new _List6.default({
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

      am.registerView(new _List10.default({
        id: 'account_erpshipments_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));

      am.registerView(new _List10.default({
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

      am.registerView(new _List16.default({
        id: 'account_returns_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));

      am.registerView(new _List8.default({
        id: 'account_erpreceivables_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));

      am.registerView(new _List8.default({
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

      am.registerView(new _List14.default({
        id: 'account_quotes_related',
        title: this.quotesText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));

      am.registerView(new _List14.default({
        id: 'account_openquotes_related',
        title: this.erpOpenQuotesText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));

      am.registerView(new _List14.default({
        id: 'account_newquotes_related',
        title: this.erpNewQuotesText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));

      am.registerView(new _List18.default({
        id: 'account_salesorders_related',
        title: this.ordersText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));

      am.registerView(new _List18.default({
        id: 'account_opensalesorders_related',
        title: this.erpOpenSalesOrdersText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));

      am.registerView(new _List18.default({
        id: 'account_latesalesorders_related',
        title: this.erpSalesOrdersText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));

      am.registerView(new _List18.default({
        id: 'account_neworders_related',
        title: this.erpNewSalesOrdersText,
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryWhere: ''
      }));

      am.registerView(new _List2.default({
        id: 'account_billto_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false
      }));

      am.registerView(new _List12.default({
        id: 'account_shipto_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false
      }));

      am.registerView(new _List4.default({
        id: 'account_contactassociations_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));

      am.registerView(new _List20.default({
        id: 'account_syncresults_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));

      am.registerView(new _List22.default({
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
      var Busy = _BusyIndicator2.default;

      // Row names to match in the detail and more detail sections.
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

      _lang2.default.extend(crm.Views.Account.List, {
        formatSearchQuery: function formatSearchQuery(searchQuery) {
          var q = this.escapeSearchQuery(searchQuery.toUpperCase());
          return 'AccountNameUpper like "' + q + '%" or upper(ErpExtId) like "' + q + '%"';
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
          displayName: (0, _I18n2.default)('erpContactAssociationModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'ERPContactAccount',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'Quote',
          displayName: (0, _I18n2.default)('quoteModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'Quote',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'SalesOrder',
          displayName: (0, _I18n2.default)('salesOrderModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SalesOrder',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'SyncHistory',
          displayName: (0, _I18n2.default)('syncResultModel').entityDisplayNamePlural,
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
          displayName: (0, _I18n2.default)('erpContactAssociationModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'ERPContactAccount',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'Quote',
          displayName: (0, _I18n2.default)('quoteModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'Quote',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'SalesOrder',
          displayName: (0, _I18n2.default)('salesOrderModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SalesOrder',
          relatedProperty: 'Account',
          relatedPropertyType: 'object'
        }, {
          name: 'SyncHistory',
          displayName: (0, _I18n2.default)('syncResultModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SyncResult',
          relatedProperty: 'EntityId',
          where: 'EntityType eq "Account"'
        }]
      });
      // Add promoteAccount function to detail
      _lang2.default.extend(crm.Views.Account.Detail, {
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
            var promote = new _Promote2.default();
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
            this._busyIndicator = new Busy({ id: this.id + '-busyIndicator' });
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
      var icboeUtility = _Utility2.default;
      _lang2.default.extend(crm.Views.Account.Edit, {
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
          accountingField.where = 'BackOffice.Id eq "' + field.currentSelection.$key + '"';
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
            this._busyIndicator = new Busy({ id: this.id + '-busyIndicator' });
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
            return _Detail2.default.prototype.formatPicklist.call(this, 'ErpAccountStatus')(val);
          }
        }, {
          name: 'ErpStatusDate',
          property: 'ErpStatusDate',
          label: this.erpStatusDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          label: this.syncStatusText,
          property: 'SyncStatus',
          renderer: function renderer(val) {
            return _Detail2.default.prototype.formatPicklist.call(this, 'SyncStatus')(val);
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
              return 'Account.Id eq "' + entry.$key + '"';
            },
            view: 'account_quotes_related'
          }, {
            name: 'SalesOrders',
            label: this.ordersText,
            where: function where(entry) {
              return 'Account.Id eq "' + entry.$key + '"';
            },
            view: 'account_salesorders_related'
          }, {
            name: 'Shipments',
            label: this.erpShipmentsText,
            where: function where(entry) {
              return 'Account.Id eq "' + entry.$key + '"';
            },
            view: 'account_erpshipments_related'
          }, {
            name: 'ERPInvoicesRelated',
            label: this.erpInvoicesText,
            where: function where(entry) {
              return 'Account.Id eq "' + entry.$key + '"';
            },
            view: 'account_erpinvoice_related'
          }, {
            name: 'ERPReceivablesRelated',
            label: this.erpReceivablesText,
            where: function where(entry) {
              return 'Account.Id eq "' + entry.$key + '"';
            },
            view: 'account_erpreceivables_related'
          }, {
            name: 'ERPReturnsRelated',
            label: this.erpReturnsText,
            where: function where(entry) {
              return 'Account.Id eq "' + entry.$key + '"';
            },
            view: 'account_returns_related'
          }, {
            name: 'BillTo',
            label: this.erpBillToText,
            where: function where(entry) {
              return 'ErpBillToAccounts.Account.Id eq "' + entry.$key + '"';
            },
            view: 'account_billto_related'
          }, {
            name: 'ShipTo',
            label: this.erpShipToText,
            where: function where(entry) {
              return 'ErpShipToAccounts.Account.Id eq "' + entry.$key + '"';
            },
            view: 'account_shipto_related'
          }, {
            name: 'ContactAssociations',
            label: this.erpContactAssociationText,
            where: function where(entry) {
              return 'Account.Id eq "' + entry.$key + '"';
            },
            view: 'account_contactassociations_related'
          }, {
            name: 'SalesPersons',
            label: this.erpSalesPersonText,
            where: function where(entry) {
              return 'Account.Id eq "' + entry.$key + '"';
            },
            view: 'account_salesperson_related'
          }, {
            name: 'SyncHistory',
            label: this.syncHistoryText,
            where: function where(entry) {
              return 'EntityType eq "Account" and EntityId eq "' + entry.$key + '"';
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

  _lang2.default.setObject('icboe.Modules.AccountModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvQWNjb3VudE1vZHVsZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJlcnBTdGF0dXNUZXh0IiwiZXJwQ3VzdG9tZXJUZXh0IiwiZXJwUGF5bWVudFRlcm1UZXh0IiwiZXJwRmluYW5jZUxpbWl0VGV4dCIsInN5bmNTdGF0dXNUZXh0IiwiYmFja09mZmljZVRleHQiLCJhY2NvdW50aW5nRW50aXR5VGV4dCIsImJhY2tPZmZpY2VJZFRleHQiLCJhY2NvdW50aW5nRW50aXR5SWRUZXh0IiwiZXJwUXVvdGVzVGV4dCIsImVycFNhbGVzT3JkZXJzVGV4dCIsImVycFNoaXBtZW50c1RleHQiLCJlcnBJbnZvaWNlc1RleHQiLCJlcnBSZWNlaXZhYmxlc1RleHQiLCJlcnBSZXR1cm5zVGV4dCIsImVycEJpbGxUb1RleHQiLCJlcnBTaGlwVG9UZXh0IiwiZXJwU2FsZXNQZXJzb25UZXh0IiwiZXJwQ29udGFjdEFzc29jaWF0aW9uVGV4dCIsInF1b3Rlc1RleHQiLCJvcmRlcnNUZXh0IiwicmVsYXRlZEVSUEl0ZW1zVGV4dCIsImRhc2hib2FyZFRleHQiLCJuZXdUcmFuc2FjdGlvbnNUZXh0Iiwib3BlblRyYW5zYWN0aW9uc1RleHQiLCJmaW5hbmNpYWxTbmFwc2hvdFRleHQiLCJwcm9tb3RlVGV4dCIsImFkZFF1b3RlVGV4dCIsImFkZE9yZGVyVGV4dCIsInN5bmNIaXN0b3J5VGV4dCIsImVycFN0YXR1c0RhdGVUZXh0IiwiZXJwT3BlblNhbGVzT3JkZXJzVGV4dCIsImVycE5ld1NhbGVzT3JkZXJzVGV4dCIsImVycE5ld1F1b3Rlc1RleHQiLCJlcnBPcGVuUXVvdGVzVGV4dCIsIm9wZW5Db2RlIiwiYXBwcm92ZWRDb2RlIiwid29ya2luZ0NvZGUiLCJwYXJ0aWFsU2hpcENvZGUiLCJwYXJ0aWFsUGFpZENvZGUiLCJjbG9zZWRDb2RlIiwiZGlzcHV0ZUNvZGUiLCJpbml0IiwiQXBwIiwicGlja2xpc3RTZXJ2aWNlIiwicmVnaXN0ZXJQaWNrbGlzdFRvVmlldyIsImxvYWRWaWV3cyIsImFtIiwiYXBwbGljYXRpb25Nb2R1bGUiLCJyZWdpc3RlclZpZXciLCJpZCIsImdyb3Vwc0VuYWJsZWQiLCJoYXNTZXR0aW5ncyIsImV4cG9zZSIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsInF1ZXJ5V2hlcmUiLCJxdWVyeU9yZGVyQnkiLCJ0aXRsZSIsImxvYWRDdXN0b21pemF0aW9ucyIsIkJ1c3kiLCJkZXRhaWxSb3dNYXRjaCIsIm1vcmVEZXRhaWxSb3dNYXRjaCIsInJlZ2lzdGVyQ3VzdG9taXphdGlvbiIsImF0IiwidHlwZSIsIndoZXJlIiwidmFsdWUiLCJleHRlbmQiLCJjcm0iLCJWaWV3cyIsIkFjY291bnQiLCJMaXN0IiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwibmFtZSIsInByb3BlcnR5IiwicmVsYXRpb25zaGlwIiwiZGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsInJlbGF0ZWRFbnRpdHkiLCJyZWxhdGVkUHJvcGVydHkiLCJyZWxhdGVkUHJvcGVydHlUeXBlIiwiRGV0YWlsIiwicHJvbW90ZUljb24iLCJzdWNjZXNzZnVsTGlua1RleHQiLCJsaW5raW5nVGV4dCIsImVycm9yTWVzc2FnZSIsInRhYkxpc3RJdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsIm9yZ2luYWxQcm9jZXNzRW50cnkiLCJwcm90b3R5cGUiLCJwcm9jZXNzRW50cnkiLCJlbnRyeSIsImRhc2hib2FyZExvYWRlZCIsInNlbGVjdGVkVGFiIiwicGFyYW1zIiwia2V5IiwiX2xvYWREYXNoYm9hcmRzIiwibGF5b3V0IiwiX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQiLCJjcmVhdGVMYXlvdXQiLCJoYXNPd25Qcm9wZXJ0eSIsIml0ZW0iLCJpIiwiY2hpbGRyZW4iLCJfbG9hZERhc2hib2FyZCIsImRhc2hib2FyZExheW91dCIsInJ2bSIsImdldFJlbGF0ZWRWaWV3TWFuYWdlciIsInJlbGF0ZWRWaWV3IiwicmVsYXRlZFZpZXdzIiwiZGFzaGJvYXJkIiwib25Ub2dnbGVWaWV3IiwiX2NhblByb21vdGUiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzaG93QnVzeSIsIiRuYW1lIiwicmVxdWVzdCIsImFjY291bnRJZCIsIiRrZXkiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJTRGF0YVNlcnZpY2VPcGVyYXRpb25SZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldFJlc291cmNlS2luZCIsInNldENvbnRyYWN0TmFtZSIsInNldE9wZXJhdGlvbk5hbWUiLCJjYW5Qcm9tb3RlIiwicmVzdWx0IiwiZXhlY3V0ZSIsImFzeW5jIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiUmVzdWx0IiwiZmFpbHVyZSIsImVyciIsIkpTT04iLCJwYXJzZSIsIm1lc3NhZ2UiLCJzY29wZSIsIl9vblByb21vdGVBY2NvdW50Q2xpY2siLCJjYW5Qcm9tb3RlUHJvbWlzZSIsInRoZW4iLCJ2YWwiLCJoaWRlQnVzeSIsIm1vZGFsIiwiY3JlYXRlU2ltcGxlRGlhbG9nIiwiY29udGVudCIsImdldENvbnRlbnQiLCJwcm9tb3RlIiwicHJvbW90ZVRvQmFja09mZmljZSIsIl9vbkFkZFF1b3RlQ2xpY2siLCJ2aWV3IiwiZ2V0VmlldyIsInNob3ciLCJmcm9tQ29udGV4dCIsImRldGFpbFZpZXciLCJpbnNlcnQiLCJfb25BZGRPcmRlckNsaWNrIiwiX2J1c3lJbmRpY2F0b3IiLCJjb21wbGV0ZSIsImRpc2FibGVDbG9zZSIsImhpZGUiLCJfZGVzdHJveWVkIiwic3RhcnQiLCJzaG93VG9vbGJhciIsImFkZCIsIm9yaWdpbmFsUHJvY2Vzc0RhdGEiLCJFZGl0IiwicHJvY2Vzc0RhdGEiLCJvcmlnaW5hbEluaXQiLCJvcmlnaW5hbFByb2Nlc3NFbnRyeSIsIm9yaWdpbmFsT25SZWZyZXNoSW5zZXJ0Iiwib25SZWZyZXNoSW5zZXJ0IiwiaWNib2VVdGlsaXR5IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiQmFja09mZmljZSIsIm9uQmFja09mZmljZUNoYW5nZSIsIkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5Iiwib25CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eUNoYW5nZSIsImRpc2FibGVCYWNrT2ZmaWNlRGF0YSIsImRpc2FibGUiLCJlbmFibGVCYWNrT2ZmaWNlRGF0YSIsImVuYWJsZSIsIkVycEV4dElkIiwiZ2V0RW50cmllc0Zyb21JZHMiLCJtYXBwZWRMb29rdXBzIiwibWFwcGVkUHJvcGVydGllcyIsInNldEZpZWxkc0Zyb21JZHMiLCJmaWVsZCIsInNldFZhbHVlIiwiY3VycmVudFNlbGVjdGlvbiIsIkVycExvZ2ljYWxJZCIsIkxvZ2ljYWxJZCIsImFjY291bnRpbmdGaWVsZCIsImFjY291bnRpbmdJc1RvQmFja09mZmljZSIsIkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXRpZXMiLCIkcmVzb3VyY2VzIiwic2V0U2VsZWN0aW9uIiwiZ2V0VmFsdWUiLCJFcnBBY2NvdW50aW5nRW50aXR5SWQiLCJBY2N0RW50aXR5RXh0SWQiLCJyb3ciLCJsYWJlbCIsImVtcHR5VGV4dCIsInZhbHVlVGV4dFByb3BlcnR5IiwiaW5jbHVkZSIsImljb25DbGFzcyIsImFjdGlvbiIsInNlY3VyaXR5IiwicmVuZGVyZXIiLCJmb3JtYXRQaWNrbGlzdCIsImNhbGwiLCJkYXRhIiwiZGF0ZSIsImxpc3QiLCJlbmFibGVPZmZsaW5lIiwiZW5hYmxlRGFzaGJvYXJkcyIsIndpZGdldFR5cGUiLCJsb2FkVG9vbGJhcnMiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUEwQ0EsTUFBTUEsV0FBVyxvQkFBWSxlQUFaLENBQWpCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsNENBQVIsRUFB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V0FBR2dCLHFCQUFILENBQXlCLFFBQXpCLEVBQW1DLGdCQUFuQyxFQUFxRDtBQUNuREMsY0FBSSxTQUFTQSxFQUFULENBQVlvSixHQUFaLEVBQWlCO0FBQ25CLG1CQUFPQSxJQUFJdEksSUFBSixLQUFhLHFCQUFwQjtBQUNELFdBSGtEO0FBSW5EYixnQkFBTSxRQUo2QztBQUtuREMsaUJBQU8sUUFMNEM7QUFNbkRDLGlCQUFPO0FBQ0xULG1CQUFPLEtBQUtwQyxhQURQO0FBRUwyTSxrQkFBTSxJQUZEO0FBR0xuSixrQkFBTSxrQkFIRDtBQUlMb0osMkJBQWUsS0FKVjtBQUtMdEgsc0JBQVUsQ0FBQztBQUNUOUIsb0JBQU0sNkJBREc7QUFFVG1DLDJCQUFhO0FBQ1htSCw0QkFBWSxnQ0FERDtBQUVYbEwsb0JBQUk7QUFGTztBQUZKLGFBQUQsRUFNUDtBQUNENEIsb0JBQU0sMkJBREw7QUFFRG1DLDJCQUFhO0FBQ1htSCw0QkFBWSw4QkFERDtBQUVYbEwsb0JBQUk7QUFGTztBQUZaLGFBTk8sRUFZUDtBQUNENEIsb0JBQU0sNEJBREw7QUFFRG1DLDJCQUFhO0FBQ1htSCw0QkFBWSwrQkFERDtBQUVYbEwsb0JBQUk7QUFGTztBQUZaLGFBWk87QUFMTDtBQU40QyxTQUFyRDtBQWdDRDtBQUNGLEtBbjZCOEU7QUFvNkIvRW1MLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0IsQ0FDckM7QUFyNkI4RSxHQUFqRSxDQUFoQjs7QUF3NkJBLGlCQUFLQyxTQUFMLENBQWUsNkJBQWYsRUFBOEN2TyxPQUE5QztvQkFDZUEsTyIsImZpbGUiOiJBY2NvdW50TW9kdWxlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2R1bGUgZnJvbSAnLi9fTW9kdWxlJztcclxuaW1wb3J0IEFjY291bnREZXRhaWxWaWV3IGZyb20gJ2NybS9WaWV3cy9BY2NvdW50L0RldGFpbCc7XHJcbmltcG9ydCBCdXN5SW5kaWNhdG9yIGZyb20gJ2FyZ29zL0RpYWxvZ3MvQnVzeUluZGljYXRvcic7XHJcbmltcG9ydCBCaWxsVG9MaXN0IGZyb20gJy4uL1ZpZXdzL0VSUEJpbGxUb3MvTGlzdCc7XHJcbmltcG9ydCBFUlBDb250YWN0QXNzb2NpYXRpb25zTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBDb250YWN0QXNzb2NpYXRpb25zL0xpc3QnO1xyXG5pbXBvcnQgRVJQSW52b2ljZXNMaXN0IGZyb20gJy4uL1ZpZXdzL0VSUEludm9pY2VzL0xpc3QnO1xyXG5pbXBvcnQgRVJQUmVjZWl2YWJsZXNMaXN0IGZyb20gJy4uL1ZpZXdzL0VSUFJlY2VpdmFibGVzL0xpc3QnO1xyXG5pbXBvcnQgRVJQU2hpcG1lbnRzTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBTaGlwbWVudHMvTGlzdCc7XHJcbmltcG9ydCBFUlBTaGlwVG9MaXN0IGZyb20gJy4uL1ZpZXdzL0VSUFNoaXBUb3MvTGlzdCc7XHJcbmltcG9ydCBQcm9tb3RlIGZyb20gJy4uL1Byb21vdGUnO1xyXG5pbXBvcnQgUXVvdGVzTGlzdCBmcm9tICcuLi9WaWV3cy9RdW90ZXMvTGlzdCc7XHJcbmltcG9ydCBSZXR1cm5zTGlzdCBmcm9tICcuLi9WaWV3cy9SZXR1cm5zL0xpc3QnO1xyXG5pbXBvcnQgU2FsZXNPcmRlcnNMaXN0IGZyb20gJy4uL1ZpZXdzL1NhbGVzT3JkZXJzL0xpc3QnO1xyXG5pbXBvcnQgU3luY1Jlc3VsdHNMaXN0IGZyb20gJy4uL1ZpZXdzL1N5bmNSZXN1bHRzL0xpc3QnO1xyXG5pbXBvcnQgQWNjb3VudFBlcnNvbkxpc3QgZnJvbSAnLi4vVmlld3MvRVJQQWNjb3VudFBlcnNvbnMvTGlzdCc7XHJcbmltcG9ydCBVdGlsaXR5IGZyb20gJy4uL1V0aWxpdHknO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL0VycEFjY291bnRQZXJzb24vT2ZmbGluZSc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL0VycEFjY291bnRQZXJzb24vU0RhdGEnO1xyXG5pbXBvcnQgJy4uL1ZpZXdzL0FjY291bnQvU2FsZXNEYXNoYm9hcmRXaWRnZXQnO1xyXG5pbXBvcnQgJy4uL1ZpZXdzL0FjY291bnQvTmV3RGFzaGJvYXJkV2lkZ2V0JztcclxuaW1wb3J0ICcuLi9WaWV3cy9BY2NvdW50L09wZW5EYXNoYm9hcmRXaWRnZXQnO1xyXG5pbXBvcnQgJy4uL1ZpZXdzL0FjY291bnQvQWN0aXZpdHlEYXNoYm9hcmRXaWRnZXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY2NvdW50TW9kdWxlJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kdWxlcy5BY2NvdW50TW9kdWxlJywgW19Nb2R1bGVdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgZXJwU3RhdHVzVGV4dDogcmVzb3VyY2UuZXJwU3RhdHVzVGV4dCxcclxuICBlcnBDdXN0b21lclRleHQ6IHJlc291cmNlLmVycEN1c3RvbWVyVGV4dCxcclxuICBlcnBQYXltZW50VGVybVRleHQ6IHJlc291cmNlLmVycFBheW1lbnRUZXJtVGV4dCxcclxuICBlcnBGaW5hbmNlTGltaXRUZXh0OiByZXNvdXJjZS5lcnBGaW5hbmNlTGltaXRUZXh0LFxyXG4gIHN5bmNTdGF0dXNUZXh0OiByZXNvdXJjZS5zeW5jU3RhdHVzVGV4dCxcclxuICBiYWNrT2ZmaWNlVGV4dDogcmVzb3VyY2UuYmFja09mZmljZVRleHQsXHJcbiAgYWNjb3VudGluZ0VudGl0eVRleHQ6IHJlc291cmNlLmFjY291bnRpbmdFbnRpdHlUZXh0LFxyXG4gIGJhY2tPZmZpY2VJZFRleHQ6IHJlc291cmNlLmJhY2tPZmZpY2VJZFRleHQsXHJcbiAgYWNjb3VudGluZ0VudGl0eUlkVGV4dDogcmVzb3VyY2UuYWNjb3VudGluZ0VudGl0eUlkVGV4dCxcclxuICBlcnBRdW90ZXNUZXh0OiByZXNvdXJjZS5lcnBRdW90ZXNUZXh0LFxyXG4gIGVycFNhbGVzT3JkZXJzVGV4dDogcmVzb3VyY2UuZXJwU2FsZXNPcmRlcnNUZXh0LFxyXG4gIGVycFNoaXBtZW50c1RleHQ6IHJlc291cmNlLmVycFNoaXBtZW50c1RleHQsXHJcbiAgZXJwSW52b2ljZXNUZXh0OiByZXNvdXJjZS5lcnBJbnZvaWNlc1RleHQsXHJcbiAgZXJwUmVjZWl2YWJsZXNUZXh0OiByZXNvdXJjZS5lcnBSZWNlaXZhYmxlc1RleHQsXHJcbiAgZXJwUmV0dXJuc1RleHQ6IHJlc291cmNlLmVycFJldHVybnNUZXh0LFxyXG4gIGVycEJpbGxUb1RleHQ6IHJlc291cmNlLmVycEJpbGxUb1RleHQsXHJcbiAgZXJwU2hpcFRvVGV4dDogcmVzb3VyY2UuZXJwU2hpcFRvVGV4dCxcclxuICBlcnBTYWxlc1BlcnNvblRleHQ6IHJlc291cmNlLmVycFNhbGVzUGVyc29uVGV4dCxcclxuICBlcnBDb250YWN0QXNzb2NpYXRpb25UZXh0OiByZXNvdXJjZS5lcnBDb250YWN0QXNzb2NpYXRpb25UZXh0LFxyXG4gIHF1b3Rlc1RleHQ6IHJlc291cmNlLnF1b3Rlc1RleHQsXHJcbiAgb3JkZXJzVGV4dDogcmVzb3VyY2Uub3JkZXJzVGV4dCxcclxuICByZWxhdGVkRVJQSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkRVJQSXRlbXNUZXh0LFxyXG4gIGRhc2hib2FyZFRleHQ6IHJlc291cmNlLmRhc2hib2FyZFRleHQsXHJcbiAgbmV3VHJhbnNhY3Rpb25zVGV4dDogcmVzb3VyY2UubmV3VHJhbnNhY3Rpb25zVGV4dCxcclxuICBvcGVuVHJhbnNhY3Rpb25zVGV4dDogcmVzb3VyY2Uub3BlblRyYW5zYWN0aW9uc1RleHQsXHJcbiAgZmluYW5jaWFsU25hcHNob3RUZXh0OiByZXNvdXJjZS5maW5hbmNpYWxTbmFwc2hvdFRleHQsXHJcbiAgcHJvbW90ZVRleHQ6IHJlc291cmNlLnByb21vdGVUZXh0LFxyXG4gIGFkZFF1b3RlVGV4dDogcmVzb3VyY2UuYWRkUXVvdGVUZXh0LFxyXG4gIGFkZE9yZGVyVGV4dDogcmVzb3VyY2UuYWRkT3JkZXJUZXh0LFxyXG4gIHN5bmNIaXN0b3J5VGV4dDogcmVzb3VyY2Uuc3luY0hpc3RvcnlUZXh0LFxyXG4gIGVycFN0YXR1c0RhdGVUZXh0OiByZXNvdXJjZS5lcnBTdGF0dXNEYXRlVGV4dCxcclxuICBlcnBPcGVuU2FsZXNPcmRlcnNUZXh0OiByZXNvdXJjZS5lcnBPcGVuU2FsZXNPcmRlcnNUZXh0LFxyXG4gIGVycE5ld1NhbGVzT3JkZXJzVGV4dDogcmVzb3VyY2UuZXJwTmV3U2FsZXNPcmRlcnNUZXh0LFxyXG4gIGVycE5ld1F1b3Rlc1RleHQ6IHJlc291cmNlLmVycE5ld1F1b3Rlc1RleHQsXHJcbiAgZXJwT3BlblF1b3Rlc1RleHQ6IHJlc291cmNlLmVycE9wZW5RdW90ZXNUZXh0LFxyXG5cclxuICAvLyBQaWNrbGlzdCBDb2Rlc1xyXG4gIG9wZW5Db2RlOiAnT3BlbicsXHJcbiAgYXBwcm92ZWRDb2RlOiAnQXBwcm92ZWQnLFxyXG4gIHdvcmtpbmdDb2RlOiAnV29ya2luZycsXHJcbiAgcGFydGlhbFNoaXBDb2RlOiAnUGFydGlhbGx5U2hpcHBlZCcsXHJcbiAgcGFydGlhbFBhaWRDb2RlOiAnUGFydGlhbFBhaWQnLFxyXG4gIGNsb3NlZENvZGU6ICdDbG9zZWQnLFxyXG4gIGRpc3B1dGVDb2RlOiAnRGlzcHV0ZScsXHJcblxyXG5cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgQXBwLnBpY2tsaXN0U2VydmljZS5yZWdpc3RlclBpY2tsaXN0VG9WaWV3KCdTeW5jU3RhdHVzJywgJ2FjY291bnRfZGV0YWlsJyk7XHJcbiAgICBBcHAucGlja2xpc3RTZXJ2aWNlLnJlZ2lzdGVyUGlja2xpc3RUb1ZpZXcoJ0VycEFjY291bnRTdGF0dXMnLCAnYWNjb3VudF9kZXRhaWwnKTtcclxuICB9LFxyXG4gIGxvYWRWaWV3czogZnVuY3Rpb24gbG9hZFZpZXdzKCkge1xyXG4gICAgY29uc3QgYW0gPSB0aGlzLmFwcGxpY2F0aW9uTW9kdWxlO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgRVJQSW52b2ljZXNMaXN0KHtcclxuICAgICAgaWQ6ICdhY2NvdW50X2VycGludm9pY2VfcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBFUlBJbnZvaWNlc0xpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfcmV2ZW51ZWVycGludm9pY2VfcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIHF1ZXJ5V2hlcmU6ICcnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdDcmVhdGVEYXRlIGFzYycsXHJcbiAgICAgIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBFUlBJbnZvaWNlc0xpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfY29zdGVycGludm9pY2VfcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIHF1ZXJ5V2hlcmU6ICcnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdDcmVhdGVEYXRlIGFzYycsXHJcbiAgICAgIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBFUlBJbnZvaWNlc0xpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfbGF0ZWludm9pY2VfcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIHF1ZXJ5V2hlcmU6ICcnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdDcmVhdGVEYXRlIGFzYycsXHJcbiAgICAgIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBFUlBJbnZvaWNlc0xpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfbmV3ZXJwaW52b2ljZV9yZWxhdGVkJyxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgcXVlcnlXaGVyZTogJycsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0NyZWF0ZURhdGUgYXNjJyxcclxuICAgICAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b29scztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEVSUFNoaXBtZW50c0xpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfZXJwc2hpcG1lbnRzX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvb2xzO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgRVJQU2hpcG1lbnRzTGlzdCh7XHJcbiAgICAgIGlkOiAnYWNjb3VudF9uZXdlcnBzaGlwbWVudHNfcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIHF1ZXJ5V2hlcmU6ICcnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdDcmVhdGVEYXRlIGFzYycsXHJcbiAgICAgIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBSZXR1cm5zTGlzdCh7XHJcbiAgICAgIGlkOiAnYWNjb3VudF9yZXR1cm5zX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvb2xzO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgRVJQUmVjZWl2YWJsZXNMaXN0KHtcclxuICAgICAgaWQ6ICdhY2NvdW50X2VycHJlY2VpdmFibGVzX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvb2xzO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgRVJQUmVjZWl2YWJsZXNMaXN0KHtcclxuICAgICAgaWQ6ICdhY2NvdW50X25ld2VycHJlY2VpdmFibGVzX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBxdWVyeVdoZXJlOiAnJyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnQ3JlYXRlRGF0ZSBhc2MnLFxyXG4gICAgICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvb2xzO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgUXVvdGVzTGlzdCh7XHJcbiAgICAgIGlkOiAnYWNjb3VudF9xdW90ZXNfcmVsYXRlZCcsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnF1b3Rlc1RleHQsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0NyZWF0ZURhdGUgYXNjJyxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFF1b3Rlc0xpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfb3BlbnF1b3Rlc19yZWxhdGVkJyxcclxuICAgICAgdGl0bGU6IHRoaXMuZXJwT3BlblF1b3Rlc1RleHQsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0NyZWF0ZURhdGUgYXNjJyxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFF1b3Rlc0xpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfbmV3cXVvdGVzX3JlbGF0ZWQnLFxyXG4gICAgICB0aXRsZTogdGhpcy5lcnBOZXdRdW90ZXNUZXh0LFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdDcmVhdGVEYXRlIGFzYycsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTYWxlc09yZGVyc0xpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfc2FsZXNvcmRlcnNfcmVsYXRlZCcsXHJcbiAgICAgIHRpdGxlOiB0aGlzLm9yZGVyc1RleHQsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0NyZWF0ZURhdGUgYXNjJyxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFNhbGVzT3JkZXJzTGlzdCh7XHJcbiAgICAgIGlkOiAnYWNjb3VudF9vcGVuc2FsZXNvcmRlcnNfcmVsYXRlZCcsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmVycE9wZW5TYWxlc09yZGVyc1RleHQsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0NyZWF0ZURhdGUgYXNjJyxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFNhbGVzT3JkZXJzTGlzdCh7XHJcbiAgICAgIGlkOiAnYWNjb3VudF9sYXRlc2FsZXNvcmRlcnNfcmVsYXRlZCcsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmVycFNhbGVzT3JkZXJzVGV4dCxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnQ3JlYXRlRGF0ZSBhc2MnLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2FsZXNPcmRlcnNMaXN0KHtcclxuICAgICAgaWQ6ICdhY2NvdW50X25ld29yZGVyc19yZWxhdGVkJyxcclxuICAgICAgdGl0bGU6IHRoaXMuZXJwTmV3U2FsZXNPcmRlcnNUZXh0LFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBxdWVyeVdoZXJlOiAnJyxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEJpbGxUb0xpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfYmlsbHRvX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgRVJQU2hpcFRvTGlzdCh7XHJcbiAgICAgIGlkOiAnYWNjb3VudF9zaGlwdG9fcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBFUlBDb250YWN0QXNzb2NpYXRpb25zTGlzdCh7XHJcbiAgICAgIGlkOiAnYWNjb3VudF9jb250YWN0YXNzb2NpYXRpb25zX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvb2xzO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU3luY1Jlc3VsdHNMaXN0KHtcclxuICAgICAgaWQ6ICdhY2NvdW50X3N5bmNyZXN1bHRzX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvb2xzO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgQWNjb3VudFBlcnNvbkxpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfc2FsZXNwZXJzb25fcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcbiAgfSxcclxuICBsb2FkQ3VzdG9taXphdGlvbnM6IGZ1bmN0aW9uIGxvYWRDdXN0b21pemF0aW9ucygpIHtcclxuICAgIGNvbnN0IGFtID0gdGhpcy5hcHBsaWNhdGlvbk1vZHVsZTtcclxuICAgIGNvbnN0IEJ1c3kgPSBCdXN5SW5kaWNhdG9yO1xyXG5cclxuICAgIC8vIFJvdyBuYW1lcyB0byBtYXRjaCBpbiB0aGUgZGV0YWlsIGFuZCBtb3JlIGRldGFpbCBzZWN0aW9ucy5cclxuICAgIC8vIFRoZXNlIGFyZSB0aGUgbGFzdCBpdGVtIGluIHRoZSBzZWN0aW9uLlxyXG4gICAgY29uc3QgZGV0YWlsUm93TWF0Y2ggPSAnQWNjb3VudE1hbmFnZXIuVXNlckluZm8nO1xyXG4gICAgY29uc3QgbW9yZURldGFpbFJvd01hdGNoID0gJ093bmVyLk93bmVyRGVzY3JpcHRpb24nO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbW9kZWxzL2xpc3QvcXVlcnlTZWxlY3QnLCAnYWNjb3VudF9zZGF0YV9tb2RlbCcsIHtcclxuICAgICAgYXQ6ICgpID0+IHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6ICdFcnBFeHRJZCcsXHJcbiAgICB9KTtcclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbW9kZWxzL2xpc3QvcXVlcnlTZWxlY3QnLCAnYWNjb3VudF9zZGF0YV9tb2RlbCcsIHtcclxuICAgICAgYXQ6ICgpID0+IHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6ICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ21vZGVscy9saXN0L3F1ZXJ5U2VsZWN0JywgJ2FjY291bnRfc2RhdGFfbW9kZWwnLCB7XHJcbiAgICAgIGF0OiAoKSA9PiB7IHJldHVybiB0cnVlOyB9LFxyXG4gICAgICB0eXBlOiAnaW5zZXJ0JyxcclxuICAgICAgd2hlcmU6ICdhZnRlcicsXHJcbiAgICAgIHZhbHVlOiAnRXJwTG9naWNhbElkJyxcclxuICAgIH0pO1xyXG5cclxuICAgIGxhbmcuZXh0ZW5kKGNybS5WaWV3cy5BY2NvdW50Lkxpc3QsIHtcclxuICAgICAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICAgICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgcmV0dXJuIGBBY2NvdW50TmFtZVVwcGVyIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKEVycEV4dElkKSBsaWtlIFwiJHtxfSVcImA7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ21vZGVscy9kZXRhaWwvcXVlcnlTZWxlY3QnLCAnYWNjb3VudF9zZGF0YV9tb2RlbCcsIHtcclxuICAgICAgYXQ6ICgpID0+IHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6ICdFcnBFeHRJZCcsXHJcbiAgICB9KTtcclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbW9kZWxzL2RldGFpbC9xdWVyeVNlbGVjdCcsICdhY2NvdW50X3NkYXRhX21vZGVsJywge1xyXG4gICAgICBhdDogKCkgPT4geyByZXR1cm4gdHJ1ZTsgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogJ0VycFN0YXR1cycsXHJcbiAgICB9KTtcclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbW9kZWxzL2RldGFpbC9xdWVyeVNlbGVjdCcsICdhY2NvdW50X3NkYXRhX21vZGVsJywge1xyXG4gICAgICBhdDogKCkgPT4geyByZXR1cm4gdHJ1ZTsgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogJ0VycFN0YXR1c0RhdGUnLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ21vZGVscy9kZXRhaWwvcXVlcnlTZWxlY3QnLCAnYWNjb3VudF9zZGF0YV9tb2RlbCcsIHtcclxuICAgICAgYXQ6ICgpID0+IHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6ICdFcnBQYXltZW50VGVybScsXHJcbiAgICB9KTtcclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbW9kZWxzL2RldGFpbC9xdWVyeVNlbGVjdCcsICdhY2NvdW50X3NkYXRhX21vZGVsJywge1xyXG4gICAgICBhdDogKCkgPT4geyByZXR1cm4gdHJ1ZTsgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogJ1N5bmNTdGF0dXMnLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ21vZGVscy9kZXRhaWwvcXVlcnlTZWxlY3QnLCAnYWNjb3VudF9zZGF0YV9tb2RlbCcsIHtcclxuICAgICAgYXQ6ICgpID0+IHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6ICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ21vZGVscy9kZXRhaWwvcXVlcnlTZWxlY3QnLCAnYWNjb3VudF9zZGF0YV9tb2RlbCcsIHtcclxuICAgICAgYXQ6ICgpID0+IHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6ICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ21vZGVscy9kZXRhaWwvcXVlcnlTZWxlY3QnLCAnYWNjb3VudF9zZGF0YV9tb2RlbCcsIHtcclxuICAgICAgYXQ6ICgpID0+IHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6ICdQcm9tb3RlZFRvQWNjb3VudGluZycsXHJcbiAgICB9KTtcclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbW9kZWxzL2RldGFpbC9xdWVyeVNlbGVjdCcsICdhY2NvdW50X3NkYXRhX21vZGVsJywge1xyXG4gICAgICBhdDogKCkgPT4geyByZXR1cm4gdHJ1ZTsgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogJ0VycEJpbGxUb0FjY291bnRzLyonLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ21vZGVscy9waWNrbGlzdHMnLCAnYWNjb3VudF9zZGF0YV9tb2RlbCcsIHtcclxuICAgICAgYXQ6ICgpID0+IHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICBuYW1lOiAnRXJwQWNjb3VudFN0YXR1cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTdGF0dXMnLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ21vZGVscy9waWNrbGlzdHMnLCAnYWNjb3VudF9zZGF0YV9tb2RlbCcsIHtcclxuICAgICAgYXQ6ICgpID0+IHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICBuYW1lOiAnU3luY1N0YXR1cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTeW5jU3RhdHVzJyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbW9kZWxzL3JlbGF0aW9uc2hpcHMnLCAnYWNjb3VudF9vZmZsaW5lX21vZGVsJywge1xyXG4gICAgICBhdDogKHJlbGF0aW9uc2hpcCkgPT4geyByZXR1cm4gcmVsYXRpb25zaGlwLm5hbWUgPT09ICdUaWNrZXRzJzsgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogW3tcclxuICAgICAgICBuYW1lOiAnQ29udGFjdEFzc29jaWF0aW9uJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogZ2V0UmVzb3VyY2UoJ2VycENvbnRhY3RBc3NvY2lhdGlvbk1vZGVsJykuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUENvbnRhY3RBY2NvdW50JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdRdW90ZScsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6IGdldFJlc291cmNlKCdxdW90ZU1vZGVsJykuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ1F1b3RlJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTYWxlc09yZGVyJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogZ2V0UmVzb3VyY2UoJ3NhbGVzT3JkZXJNb2RlbCcpLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICAgIHJlbGF0ZWRFbnRpdHk6ICdTYWxlc09yZGVyJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTeW5jSGlzdG9yeScsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6IGdldFJlc291cmNlKCdzeW5jUmVzdWx0TW9kZWwnKS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgICByZWxhdGVkRW50aXR5OiAnU3luY1Jlc3VsdCcsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5OiAnRW50aXR5SWQnLFxyXG4gICAgICAgIHdoZXJlOiAnRW50aXR5VHlwZSBlcSBcIkFjY291bnRcIicsXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ21vZGVscy9yZWxhdGlvbnNoaXBzJywgJ2FjY291bnRfc2RhdGFfbW9kZWwnLCB7XHJcbiAgICAgIGF0OiAocmVsYXRpb25zaGlwKSA9PiB7IHJldHVybiByZWxhdGlvbnNoaXAubmFtZSA9PT0gJ1RpY2tldHMnOyB9LFxyXG4gICAgICB0eXBlOiAnaW5zZXJ0JyxcclxuICAgICAgd2hlcmU6ICdhZnRlcicsXHJcbiAgICAgIHZhbHVlOiBbe1xyXG4gICAgICAgIG5hbWU6ICdDb250YWN0QXNzb2NpYXRpb24nLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiBnZXRSZXNvdXJjZSgnZXJwQ29udGFjdEFzc29jaWF0aW9uTW9kZWwnKS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgICByZWxhdGVkRW50aXR5OiAnRVJQQ29udGFjdEFjY291bnQnLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1F1b3RlJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogZ2V0UmVzb3VyY2UoJ3F1b3RlTW9kZWwnKS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgICByZWxhdGVkRW50aXR5OiAnUXVvdGUnLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlck1vZGVsJykuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N5bmNIaXN0b3J5JyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogZ2V0UmVzb3VyY2UoJ3N5bmNSZXN1bHRNb2RlbCcpLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICAgIHJlbGF0ZWRFbnRpdHk6ICdTeW5jUmVzdWx0JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdFbnRpdHlJZCcsXHJcbiAgICAgICAgd2hlcmU6ICdFbnRpdHlUeXBlIGVxIFwiQWNjb3VudFwiJyxcclxuICAgICAgfV0sXHJcbiAgICB9KTtcclxuICAgIC8vIEFkZCBwcm9tb3RlQWNjb3VudCBmdW5jdGlvbiB0byBkZXRhaWxcclxuICAgIGxhbmcuZXh0ZW5kKGNybS5WaWV3cy5BY2NvdW50LkRldGFpbCwge1xyXG4gICAgICBwcm9tb3RlSWNvbjogJ3VwbG9hZCcsXHJcbiAgICAgIHN1Y2Nlc3NmdWxMaW5rVGV4dDogJ0xpbmtlZCBTdWNjZXNzZnVsbHknLFxyXG4gICAgICBsaW5raW5nVGV4dDogJ0xpbmtpbmcgJHthY2NvdW50fSB0byAke2JhY2tPZmZpY2V9JyxcclxuICAgICAgZXJyb3JNZXNzYWdlOiAnRXJyb3IgcHJvbW90aW5nIGFjY291bnQgZm9yIHJlYXNvbjogJHtyZWFzb259JyxcclxuICAgICAgdGFiTGlzdEl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICAgICAnPGxpIGRhdGEta2V5PVwieyU6ICQubmFtZSAlfVwiIGNsYXNzPVwidGFiXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RlZFRhYlwiPicsXHJcbiAgICAgICAgJzxhIGhyZWY9XCIjeyU6ICQkLmlkICV9X3slOiAkLm5hbWUgJX1cIj57JTogKCQudGl0bGUgfHwgJC5vcHRpb25zLnRpdGxlKSAlfTwvYT4nLFxyXG4gICAgICAgICc8L2xpPicsXHJcbiAgICAgIF0pLFxyXG4gICAgICBvcmdpbmFsUHJvY2Vzc0VudHJ5OiBjcm0uVmlld3MuQWNjb3VudC5EZXRhaWwucHJvdG90eXBlLnByb2Nlc3NFbnRyeSxcclxuICAgICAgcHJvY2Vzc0VudHJ5OiBmdW5jdGlvbiBwcm9jZXNzRW50cnkoZW50cnkpIHtcclxuICAgICAgICB0aGlzLmRhc2hib2FyZExvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub3JnaW5hbFByb2Nlc3NFbnRyeShlbnRyeSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNlbGVjdGVkVGFiOiBmdW5jdGlvbiBzZWxlY3RlZFRhYihwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwYXJhbXMua2V5O1xyXG4gICAgICAgIGlmICghdGhpcy5kYXNoYm9hcmRMb2FkZWQgJiYga2V5ID09PSAnRGFzaGJvYXJkU2VjdGlvbicpIHtcclxuICAgICAgICAgIHRoaXMuX2xvYWREYXNoYm9hcmRzKCk7XHJcbiAgICAgICAgICB0aGlzLmRhc2hib2FyZExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBfbG9hZERhc2hib2FyZHM6IGZ1bmN0aW9uIF9sb2FkRGFzaGJvYXJkcygpIHtcclxuICAgICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLl9jcmVhdGVDdXN0b21pemVkTGF5b3V0KHRoaXMuY3JlYXRlTGF5b3V0KCkpO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGxheW91dCkge1xyXG4gICAgICAgICAgaWYgKGxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBsYXlvdXRba2V5XTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gJ0Rhc2hib2FyZFNlY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGl0ZW0uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWREYXNoYm9hcmQoaXRlbS5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBfbG9hZERhc2hib2FyZDogZnVuY3Rpb24gX2xvYWREYXNoYm9hcmQoZGFzaGJvYXJkTGF5b3V0KSB7XHJcbiAgICAgICAgY29uc3QgcnZtID0gdGhpcy5nZXRSZWxhdGVkVmlld01hbmFnZXIoZGFzaGJvYXJkTGF5b3V0LnJlbGF0ZWRWaWV3KTtcclxuICAgICAgICBpZiAocnZtKSB7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBydm0ucmVsYXRlZFZpZXdzKSB7XHJcbiAgICAgICAgICAgIGlmIChydm0ucmVsYXRlZFZpZXdzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICBjb25zdCBkYXNoYm9hcmQgPSBydm0ucmVsYXRlZFZpZXdzW2tleV07XHJcbiAgICAgICAgICAgICAgaWYgKGRhc2hib2FyZCkge1xyXG4gICAgICAgICAgICAgICAgZGFzaGJvYXJkLm9uVG9nZ2xlVmlldyh0cnVlKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIF9jYW5Qcm9tb3RlOiBmdW5jdGlvbiBfY2FuUHJvbW90ZSgpIHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoXHJcbiAgICAgICAgICAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dCdXN5KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAgICAgICAgICRuYW1lOiAnQ2FuUHJvbW90ZUFjY291bnQnLFxyXG4gICAgICAgICAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgICAgIGFjY291bnRJZDogdGhpcy5lbnRyeS4ka2V5LFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgICAgICAgICAuc2V0UmVzb3VyY2VLaW5kKCdhY2NvdW50cycpXHJcbiAgICAgICAgICAgICAgLnNldENvbnRyYWN0TmFtZSgnZHluYW1pYycpXHJcbiAgICAgICAgICAgICAgLnNldE9wZXJhdGlvbk5hbWUoJ0NhblByb21vdGVBY2NvdW50Jyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjYW5Qcm9tb3RlID0ge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICByZXN1bHQ6ICcnLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5leGVjdXRlKGVudHJ5LCB7XHJcbiAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhblByb21vdGUudmFsdWUgPSByZXN1bHQucmVzcG9uc2UuUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjYW5Qcm9tb3RlKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGZhaWx1cmU6IChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gSlNPTi5wYXJzZShlcnIucmVzcG9uc2UpWzBdO1xyXG4gICAgICAgICAgICAgICAgY2FuUHJvbW90ZS5yZXN1bHQgPSByZXNwb25zZS5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjYW5Qcm9tb3RlKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICB9LFxyXG4gICAgICBfb25Qcm9tb3RlQWNjb3VudENsaWNrOiBmdW5jdGlvbiBfb25Qcm9tb3RlQWNjb3VudENsaWNrKCkge1xyXG4gICAgICAgIGNvbnN0IGNhblByb21vdGVQcm9taXNlID0gdGhpcy5fY2FuUHJvbW90ZSgpO1xyXG4gICAgICAgIGNhblByb21vdGVQcm9taXNlLnRoZW4oKHZhbCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgICAgICAgaWYgKCF2YWwudmFsdWUpIHtcclxuICAgICAgICAgICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgICAgICAgICAgY29udGVudDogdmFsLnJlc3VsdCxcclxuICAgICAgICAgICAgICBnZXRDb250ZW50OiAoKSA9PiB7IHJldHVybjsgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHByb21vdGUgPSBuZXcgUHJvbW90ZSgpO1xyXG4gICAgICAgICAgcHJvbW90ZS5wcm9tb3RlVG9CYWNrT2ZmaWNlKHRoaXMuZW50cnksICdBY2NvdW50JywgdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIF9vbkFkZFF1b3RlQ2xpY2s6IGZ1bmN0aW9uIF9vbkFkZFF1b3RlQ2xpY2soKSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdxdW90ZV9lZGl0Jyk7XHJcbiAgICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICAgIGZyb21Db250ZXh0OiB0aGlzLFxyXG4gICAgICAgICAgZGV0YWlsVmlldzogJ3F1b3RlX2RldGFpbCcsXHJcbiAgICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIF9vbkFkZE9yZGVyQ2xpY2s6IGZ1bmN0aW9uIF9vbkFkZE9yZGVyQ2xpY2soKSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdzYWxlc29yZGVyX2VkaXQnKTtcclxuICAgICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgICAgZnJvbUNvbnRleHQ6IHRoaXMsXHJcbiAgICAgICAgICBkZXRhaWxWaWV3OiAnc2FsZXNvcmRlcl9kZXRhaWwnLFxyXG4gICAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBoaWRlQnVzeTogZnVuY3Rpb24gaGlkZUJ1c3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c3lJbmRpY2F0b3IpIHtcclxuICAgICAgICAgIHRoaXMuX2J1c3lJbmRpY2F0b3IuY29tcGxldGUoKTtcclxuICAgICAgICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgICAgIEFwcC5tb2RhbC5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBzaG93QnVzeTogZnVuY3Rpb24gc2hvd0J1c3koKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9idXN5SW5kaWNhdG9yIHx8IHRoaXMuX2J1c3lJbmRpY2F0b3IuX2Rlc3Ryb3llZCkge1xyXG4gICAgICAgICAgdGhpcy5fYnVzeUluZGljYXRvciA9IG5ldyBCdXN5KHsgaWQ6IGAke3RoaXMuaWR9LWJ1c3lJbmRpY2F0b3JgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9idXN5SW5kaWNhdG9yLnN0YXJ0KCk7XHJcbiAgICAgICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IHRydWU7XHJcbiAgICAgICAgQXBwLm1vZGFsLnNob3dUb29sYmFyID0gZmFsc2U7XHJcbiAgICAgICAgQXBwLm1vZGFsLmFkZCh0aGlzLl9idXN5SW5kaWNhdG9yKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsUHJvY2Vzc0RhdGEgPSBjcm0uVmlld3MuQWNjb3VudC5FZGl0LnByb3RvdHlwZS5wcm9jZXNzRGF0YTtcclxuICAgIGNvbnN0IG9yaWdpbmFsSW5pdCA9IGNybS5WaWV3cy5BY2NvdW50LkVkaXQucHJvdG90eXBlLmluaXQ7XHJcbiAgICBjb25zdCBvcmlnaW5hbFByb2Nlc3NFbnRyeSA9IGNybS5WaWV3cy5BY2NvdW50LkVkaXQucHJvdG90eXBlLnByb2Nlc3NFbnRyeTtcclxuICAgIGNvbnN0IG9yaWdpbmFsT25SZWZyZXNoSW5zZXJ0ID0gY3JtLlZpZXdzLkFjY291bnQuRWRpdC5wcm90b3R5cGUub25SZWZyZXNoSW5zZXJ0O1xyXG4gICAgY29uc3QgaWNib2VVdGlsaXR5ID0gVXRpbGl0eTtcclxuICAgIGxhbmcuZXh0ZW5kKGNybS5WaWV3cy5BY2NvdW50LkVkaXQsIHtcclxuICAgICAgX2J1c3lJbmRpY2F0b3I6IG51bGwsXHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgb3JpZ2luYWxJbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkJhY2tPZmZpY2UsICdvbkNoYW5nZScsIHRoaXMub25CYWNrT2ZmaWNlQ2hhbmdlKTtcclxuICAgICAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQmFja09mZmljZUFjY291bnRpbmdFbnRpdHksICdvbkNoYW5nZScsIHRoaXMub25CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eUNoYW5nZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGRpc2FibGVCYWNrT2ZmaWNlRGF0YTogZnVuY3Rpb24gZGlzYWJsZUJhY2tPZmZpY2VEYXRhKCkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2UuZGlzYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5LmRpc2FibGUoKTtcclxuICAgICAgfSxcclxuICAgICAgZW5hYmxlQmFja09mZmljZURhdGE6IGZ1bmN0aW9uIGVuYWJsZUJhY2tPZmZpY2VEYXRhKCkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2UuZW5hYmxlKCk7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQmFja09mZmljZUFjY291bnRpbmdFbnRpdHkuZW5hYmxlKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByb2Nlc3NFbnRyeTogZnVuY3Rpb24gcHJvY2Vzc0VudHJ5KGVudHJ5KSB7XHJcbiAgICAgICAgb3JpZ2luYWxQcm9jZXNzRW50cnkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICBpZiAoZW50cnkgJiYgZW50cnkuRXJwRXh0SWQpIHtcclxuICAgICAgICAgIHRoaXMuZGlzYWJsZUJhY2tPZmZpY2VEYXRhKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZW5hYmxlQmFja09mZmljZURhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVudHJ5O1xyXG4gICAgICB9LFxyXG4gICAgICBwcm9jZXNzRGF0YTogZnVuY3Rpb24gcHJvY2Vzc0RhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93QnVzeSgpO1xyXG4gICAgICAgIG9yaWdpbmFsUHJvY2Vzc0RhdGEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB0aGlzLmdldEVudHJpZXNGcm9tSWRzKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldEVudHJpZXNGcm9tSWRzOiBmdW5jdGlvbiBnZXRFbnRyaWVzRnJvbUlkcygpIHtcclxuICAgICAgICBjb25zdCBtYXBwZWRMb29rdXBzID0gW1xyXG4gICAgICAgICAgJ0JhY2tPZmZpY2UnLFxyXG4gICAgICAgICAgJ0JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5JyxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGNvbnN0IG1hcHBlZFByb3BlcnRpZXMgPSBbXHJcbiAgICAgICAgICAnTG9naWNhbElkJyxcclxuICAgICAgICAgICdBY2N0RW50aXR5RXh0SWQnLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgY29uc3QgZmllbGRzID0gWydFcnBMb2dpY2FsSWQnLCAnRXJwQWNjb3VudGluZ0VudGl0eUlkJ107XHJcbiAgICAgICAgaWNib2VVdGlsaXR5LnNldEZpZWxkc0Zyb21JZHMobWFwcGVkTG9va3VwcywgbWFwcGVkUHJvcGVydGllcywgZmllbGRzLCB0aGlzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGlkZUJ1c3koKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgb25CYWNrT2ZmaWNlQ2hhbmdlOiBmdW5jdGlvbiBvbkJhY2tPZmZpY2VDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQmFja09mZmljZS5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICAgICAgICB0aGlzLmZpZWxkcy5FcnBMb2dpY2FsSWQuc2V0VmFsdWUoZmllbGQuY3VycmVudFNlbGVjdGlvbi5Mb2dpY2FsSWQpO1xyXG4gICAgICAgIGNvbnN0IGFjY291bnRpbmdGaWVsZCA9IHRoaXMuZmllbGRzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5O1xyXG4gICAgICAgIGFjY291bnRpbmdGaWVsZC53aGVyZSA9IGBCYWNrT2ZmaWNlLklkIGVxIFwiJHtmaWVsZC5jdXJyZW50U2VsZWN0aW9uLiRrZXl9XCJgO1xyXG4gICAgICAgIGNvbnN0IGFjY291bnRpbmdJc1RvQmFja09mZmljZSA9IGFjY291bnRpbmdGaWVsZC5jdXJyZW50U2VsZWN0aW9uICYmIGFjY291bnRpbmdGaWVsZC5jdXJyZW50U2VsZWN0aW9uLkJhY2tPZmZpY2UuJGtleSA9PT0gZmllbGQuY3VycmVudFNlbGVjdGlvbi4ka2V5O1xyXG4gICAgICAgIGlmIChmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXRpZXMuJHJlc291cmNlcyAmJiAhYWNjb3VudGluZ0lzVG9CYWNrT2ZmaWNlKSB7XHJcbiAgICAgICAgICBjb25zdCBlbnRyeSA9IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcy4kcmVzb3VyY2VzWzBdO1xyXG4gICAgICAgICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgICAgICAgIGFjY291bnRpbmdGaWVsZC5zZXRTZWxlY3Rpb24oZW50cnkpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlDaGFuZ2UoYWNjb3VudGluZ0ZpZWxkLmdldFZhbHVlKCksIGFjY291bnRpbmdGaWVsZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvbkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5Q2hhbmdlOiBmdW5jdGlvbiBvbkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5LnNldFZhbHVlKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkVycEFjY291bnRpbmdFbnRpdHlJZC5zZXRWYWx1ZShmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkFjY3RFbnRpdHlFeHRJZCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uUmVmcmVzaEluc2VydDogZnVuY3Rpb24gb25SZWZyZXNoSW5zZXJ0KCkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlQmFja09mZmljZURhdGEoKTtcclxuICAgICAgICBvcmlnaW5hbE9uUmVmcmVzaEluc2VydC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICB9LFxyXG4gICAgICBoaWRlQnVzeTogZnVuY3Rpb24gaGlkZUJ1c3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c3lJbmRpY2F0b3IpIHtcclxuICAgICAgICAgIHRoaXMuX2J1c3lJbmRpY2F0b3IuY29tcGxldGUoKTtcclxuICAgICAgICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgICAgIEFwcC5tb2RhbC5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBzaG93QnVzeTogZnVuY3Rpb24gc2hvd0J1c3koKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9idXN5SW5kaWNhdG9yIHx8IHRoaXMuX2J1c3lJbmRpY2F0b3IuX2Rlc3Ryb3llZCkge1xyXG4gICAgICAgICAgdGhpcy5fYnVzeUluZGljYXRvciA9IG5ldyBCdXN5KHsgaWQ6IGAke3RoaXMuaWR9LWJ1c3lJbmRpY2F0b3JgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9idXN5SW5kaWNhdG9yLnN0YXJ0KCk7XHJcbiAgICAgICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IHRydWU7XHJcbiAgICAgICAgQXBwLm1vZGFsLnNob3dUb29sYmFyID0gZmFsc2U7XHJcbiAgICAgICAgQXBwLm1vZGFsLmFkZCh0aGlzLl9idXN5SW5kaWNhdG9yKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiBFZGl0IFZpZXdcclxuICAgICAqL1xyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdlZGl0JywgJ2FjY291bnRfZWRpdCcsIHtcclxuICAgICAgYXQ6IChyb3cpID0+IHtcclxuICAgICAgICByZXR1cm4gcm93Lm5hbWUgPT09ICdCdXNpbmVzc0Rlc2NyaXB0aW9uJztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5iYWNrT2ZmaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnQmFja09mZmljZScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0JhY2tPZmZpY2VOYW1lJyxcclxuICAgICAgICB2aWV3OiAnc2FsZXNvcmRlcl9iYWNrb2ZmaWNlX3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiAnSXNBY3RpdmUgZXEgdHJ1ZScsXHJcbiAgICAgICAgaW5jbHVkZTogZmFsc2UsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRpbmdFbnRpdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX2JhY2tvZmZpY2VhY2NvdW50aW5nZW50aXR5X3JlbGF0ZWQnLFxyXG4gICAgICAgIGluY2x1ZGU6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIFF1aWNrIEFjdGlvbnNcclxuICAgICAqL1xyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdkZXRhaWwnLCAnYWNjb3VudF9kZXRhaWwnLCB7XHJcbiAgICAgIGF0OiBmdW5jdGlvbiBhdChyb3cpIHtcclxuICAgICAgICByZXR1cm4gcm93Lm5hbWUgPT09ICdBZGROb3RlQWN0aW9uJztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogW3tcclxuICAgICAgICBuYW1lOiAnUHJvbW90ZUFjY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb21vdGVUZXh0LFxyXG4gICAgICAgIGljb25DbGFzczogJ3NlbmQnLFxyXG4gICAgICAgIGFjdGlvbjogJ19vblByb21vdGVBY2NvdW50Q2xpY2snLFxyXG4gICAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvQWNjb3VudC9Qcm9tb3RlQWNjb3VudCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWRkUXVvdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkZFF1b3RlVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdkb2N1bWVudCcsXHJcbiAgICAgICAgYWN0aW9uOiAnX29uQWRkUXVvdGVDbGljaycsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9BZGQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FkZE9yZGVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGRPcmRlclRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnY2FydCcsXHJcbiAgICAgICAgYWN0aW9uOiAnX29uQWRkT3JkZXJDbGljaycsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL0FkZCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIERldGFpbHNcclxuICAgICAqL1xyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdkZXRhaWwnLCAnYWNjb3VudF9kZXRhaWwnLCB7XHJcbiAgICAgIGF0OiBmdW5jdGlvbiBhdChyb3cpIHtcclxuICAgICAgICByZXR1cm4gcm93Lm5hbWUgPT09IGRldGFpbFJvd01hdGNoO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAnaW5zZXJ0JyxcclxuICAgICAgd2hlcmU6ICdhZnRlcicsXHJcbiAgICAgIHZhbHVlOiBbe1xyXG4gICAgICAgIG5hbWU6ICdFcnBTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5lcnBTdGF0dXNUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIHJldHVybiBBY2NvdW50RGV0YWlsVmlldy5wcm90b3R5cGUuZm9ybWF0UGlja2xpc3QuY2FsbCh0aGlzLCAnRXJwQWNjb3VudFN0YXR1cycpKHZhbCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBTdGF0dXNEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFN0YXR1c0RhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVycFN0YXR1c0RhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN5bmNTdGF0dXNUZXh0LFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3luY1N0YXR1cycsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgcmV0dXJuIEFjY291bnREZXRhaWxWaWV3LnByb3RvdHlwZS5mb3JtYXRQaWNrbGlzdC5jYWxsKHRoaXMsICdTeW5jU3RhdHVzJykodmFsKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXJwQ3VzdG9tZXJUZXh0LFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwRXh0SWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFja09mZmljZUlkVGV4dCxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50aW5nRW50aXR5SWRUZXh0LFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgfV0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICogTW9yZSBEZXRhaWxzXHJcbiAgICAgKi9cclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignZGV0YWlsJywgJ2FjY291bnRfZGV0YWlsJywge1xyXG4gICAgICBhdDogZnVuY3Rpb24gYXQocm93KSB7XHJcbiAgICAgICAgcmV0dXJuIHJvdy5uYW1lID09PSBtb3JlRGV0YWlsUm93TWF0Y2g7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICBsYWJlbDogdGhpcy5lcnBQYXltZW50VGVybVRleHQsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBQYXltZW50VGVybScsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICogUmVsYXRlZCBJdGVtc1xyXG4gICAgICovXHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbCcsICdhY2NvdW50X2RldGFpbCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHJvdykge1xyXG4gICAgICAgIHJldHVybiByb3cubmFtZSA9PT0gJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAnaW5zZXJ0JyxcclxuICAgICAgd2hlcmU6ICdhZnRlcicsXHJcbiAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEVSUEl0ZW1zVGV4dCxcclxuICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgIG5hbWU6ICdSZWxhdGVkRVJQSXRlbXNTZWN0aW9uJyxcclxuICAgICAgICBlbmFibGVPZmZsaW5lOiBmYWxzZSxcclxuICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgIG5hbWU6ICdRdW90ZXMnLFxyXG4gICAgICAgICAgbGFiZWw6IHRoaXMucXVvdGVzVGV4dCxcclxuICAgICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdhY2NvdW50X3F1b3Rlc19yZWxhdGVkJyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBuYW1lOiAnU2FsZXNPcmRlcnMnLFxyXG4gICAgICAgICAgbGFiZWw6IHRoaXMub3JkZXJzVGV4dCxcclxuICAgICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdhY2NvdW50X3NhbGVzb3JkZXJzX3JlbGF0ZWQnLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIG5hbWU6ICdTaGlwbWVudHMnLFxyXG4gICAgICAgICAgbGFiZWw6IHRoaXMuZXJwU2hpcG1lbnRzVGV4dCxcclxuICAgICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdhY2NvdW50X2VycHNoaXBtZW50c19yZWxhdGVkJyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBuYW1lOiAnRVJQSW52b2ljZXNSZWxhdGVkJyxcclxuICAgICAgICAgIGxhYmVsOiB0aGlzLmVycEludm9pY2VzVGV4dCxcclxuICAgICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdhY2NvdW50X2VycGludm9pY2VfcmVsYXRlZCcsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgbmFtZTogJ0VSUFJlY2VpdmFibGVzUmVsYXRlZCcsXHJcbiAgICAgICAgICBsYWJlbDogdGhpcy5lcnBSZWNlaXZhYmxlc1RleHQsXHJcbiAgICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBBY2NvdW50LklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2aWV3OiAnYWNjb3VudF9lcnByZWNlaXZhYmxlc19yZWxhdGVkJyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBuYW1lOiAnRVJQUmV0dXJuc1JlbGF0ZWQnLFxyXG4gICAgICAgICAgbGFiZWw6IHRoaXMuZXJwUmV0dXJuc1RleHQsXHJcbiAgICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBBY2NvdW50LklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2aWV3OiAnYWNjb3VudF9yZXR1cm5zX3JlbGF0ZWQnLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIG5hbWU6ICdCaWxsVG8nLFxyXG4gICAgICAgICAgbGFiZWw6IHRoaXMuZXJwQmlsbFRvVGV4dCxcclxuICAgICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEVycEJpbGxUb0FjY291bnRzLkFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdhY2NvdW50X2JpbGx0b19yZWxhdGVkJyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBuYW1lOiAnU2hpcFRvJyxcclxuICAgICAgICAgIGxhYmVsOiB0aGlzLmVycFNoaXBUb1RleHQsXHJcbiAgICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBFcnBTaGlwVG9BY2NvdW50cy5BY2NvdW50LklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2aWV3OiAnYWNjb3VudF9zaGlwdG9fcmVsYXRlZCcsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgbmFtZTogJ0NvbnRhY3RBc3NvY2lhdGlvbnMnLFxyXG4gICAgICAgICAgbGFiZWw6IHRoaXMuZXJwQ29udGFjdEFzc29jaWF0aW9uVGV4dCxcclxuICAgICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdhY2NvdW50X2NvbnRhY3Rhc3NvY2lhdGlvbnNfcmVsYXRlZCcsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgbmFtZTogJ1NhbGVzUGVyc29ucycsXHJcbiAgICAgICAgICBsYWJlbDogdGhpcy5lcnBTYWxlc1BlcnNvblRleHQsXHJcbiAgICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBBY2NvdW50LklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2aWV3OiAnYWNjb3VudF9zYWxlc3BlcnNvbl9yZWxhdGVkJyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBuYW1lOiAnU3luY0hpc3RvcnknLFxyXG4gICAgICAgICAgbGFiZWw6IHRoaXMuc3luY0hpc3RvcnlUZXh0LFxyXG4gICAgICAgICAgd2hlcmU6IChlbnRyeSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYEVudGl0eVR5cGUgZXEgXCJBY2NvdW50XCIgYW5kIEVudGl0eUlkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2aWV3OiAnYWNjb3VudF9zeW5jcmVzdWx0c19yZWxhdGVkJyxcclxuICAgICAgICB9XSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgaWYgKEFwcC5lbmFibGVEYXNoYm9hcmRzKSB7XHJcbiAgICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignZGV0YWlsJywgJ2FjY291bnRfZGV0YWlsJywge1xyXG4gICAgICAgIGF0OiBmdW5jdGlvbiBhdChyb3cpIHtcclxuICAgICAgICAgIHJldHVybiByb3cubmFtZSA9PT0gJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgICAgd2hlcmU6ICdiZWZvcmUnLFxyXG4gICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5kYXNoYm9hcmRUZXh0LFxyXG4gICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgIG5hbWU6ICdEYXNoYm9hcmRTZWN0aW9uJyxcclxuICAgICAgICAgIGVuYWJsZU9mZmxpbmU6IGZhbHNlLFxyXG4gICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgIG5hbWU6ICdBY2NvdW50U2FsZXNEYXNoYm9hcmRXaWRnZXQnLFxyXG4gICAgICAgICAgICByZWxhdGVkVmlldzoge1xyXG4gICAgICAgICAgICAgIHdpZGdldFR5cGU6ICdhY2NvdW50X3NhbGVzX2Rhc2hib2FyZF93aWRnZXQnLFxyXG4gICAgICAgICAgICAgIGlkOiAnYWNjb3VudF9zYWxlc19kYXNoYm9hcmRfd2lkZ2V0JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogJ0FjY291bnROZXdEYXNoYm9hcmRXaWRnZXQnLFxyXG4gICAgICAgICAgICByZWxhdGVkVmlldzoge1xyXG4gICAgICAgICAgICAgIHdpZGdldFR5cGU6ICdhY2NvdW50X25ld19kYXNoYm9hcmRfd2lkZ2V0JyxcclxuICAgICAgICAgICAgICBpZDogJ2FjY291bnRfbmV3X2Rhc2hib2FyZF93aWRnZXQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiAnQWNjb3VudE9wZW5EYXNoYm9hcmRXaWRnZXQnLFxyXG4gICAgICAgICAgICByZWxhdGVkVmlldzoge1xyXG4gICAgICAgICAgICAgIHdpZGdldFR5cGU6ICdhY2NvdW50X29wZW5fZGFzaGJvYXJkX3dpZGdldCcsXHJcbiAgICAgICAgICAgICAgaWQ6ICdhY2NvdW50X29wZW5fZGFzaGJvYXJkX3dpZGdldCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9XSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGxvYWRUb29sYmFyczogZnVuY3Rpb24gbG9hZFRvb2xiYXJzKCkge1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZHVsZXMuQWNjb3VudE1vZHVsZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=