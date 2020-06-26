define("crm/Integrations/BOE/ApplicationModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/I18n", "argos/Application", "argos/ApplicationModule", "./Modules/AccountAssociationModule", "./Modules/AccountModule", "./Modules/BillToAccountModule", "./Modules/BillToModule", "./Modules/ContactModule", "./Modules/ContactAssociationModule", "./Modules/HelpModule", "./Modules/InvoiceLineModule", "./Modules/InvoiceModule", "./Modules/OpportunityModule", "./Modules/PayFromModule", "./Modules/ProductModule", "./Modules/QuoteModule", "./Modules/QuotePersonModule", "./Modules/QuoteLineModule", "./Modules/ReceivableLineModule", "./Modules/ReceivableModule", "./Modules/ReturnLineModule", "./Modules/ReturnModule", "./Modules/SalesOrderItemModule", "./Modules/SalesOrderModule", "./Modules/ShipmentLineModule", "./Modules/ShipmentModule", "./Modules/ShipToAccountModule", "./Modules/ShipToModule", "../../Views/RecentlyViewed/List", "./Models/SyncResult/Offline", "./Models/SyncResult/SData", "./Models/BackOffice/Offline", "./Models/BackOffice/SData", "./Models/BackOfficeAccountingEntity/Offline", "./Models/BackOfficeAccountingEntity/SData", "./Models/Location/Offline", "./Models/Location/SData", "./Models/OperatingCompany/Offline", "./Models/OperatingCompany/SData", "./Models/UnitOfMeasure/Offline", "./Models/UnitOfMeasure/SData", "argos/TabWidget"], function (_exports, _declare, _lang, _I18n, _Application, _ApplicationModule, _AccountAssociationModule, _AccountModule, _BillToAccountModule, _BillToModule, _ContactModule, _ContactAssociationModule, _HelpModule, _InvoiceLineModule, _InvoiceModule, _OpportunityModule, _PayFromModule, _ProductModule, _QuoteModule, _QuotePersonModule, _QuoteLineModule, _ReceivableLineModule, _ReceivableModule, _ReturnLineModule, _ReturnModule, _SalesOrderItemModule, _SalesOrderModule, _ShipmentLineModule, _ShipmentModule, _ShipToAccountModule, _ShipToModule, _List, _Offline, _SData, _Offline2, _SData2, _Offline3, _SData3, _Offline4, _SData4, _Offline5, _SData5, _Offline6, _SData6, _TabWidget) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _I18n = _interopRequireDefault(_I18n);
  _Application = _interopRequireDefault(_Application);
  _ApplicationModule = _interopRequireDefault(_ApplicationModule);
  _AccountAssociationModule = _interopRequireDefault(_AccountAssociationModule);
  _AccountModule = _interopRequireDefault(_AccountModule);
  _BillToAccountModule = _interopRequireDefault(_BillToAccountModule);
  _BillToModule = _interopRequireDefault(_BillToModule);
  _ContactModule = _interopRequireDefault(_ContactModule);
  _ContactAssociationModule = _interopRequireDefault(_ContactAssociationModule);
  _HelpModule = _interopRequireDefault(_HelpModule);
  _InvoiceLineModule = _interopRequireDefault(_InvoiceLineModule);
  _InvoiceModule = _interopRequireDefault(_InvoiceModule);
  _OpportunityModule = _interopRequireDefault(_OpportunityModule);
  _PayFromModule = _interopRequireDefault(_PayFromModule);
  _ProductModule = _interopRequireDefault(_ProductModule);
  _QuoteModule = _interopRequireDefault(_QuoteModule);
  _QuotePersonModule = _interopRequireDefault(_QuotePersonModule);
  _QuoteLineModule = _interopRequireDefault(_QuoteLineModule);
  _ReceivableLineModule = _interopRequireDefault(_ReceivableLineModule);
  _ReceivableModule = _interopRequireDefault(_ReceivableModule);
  _ReturnLineModule = _interopRequireDefault(_ReturnLineModule);
  _ReturnModule = _interopRequireDefault(_ReturnModule);
  _SalesOrderItemModule = _interopRequireDefault(_SalesOrderItemModule);
  _SalesOrderModule = _interopRequireDefault(_SalesOrderModule);
  _ShipmentLineModule = _interopRequireDefault(_ShipmentLineModule);
  _ShipmentModule = _interopRequireDefault(_ShipmentModule);
  _ShipToAccountModule = _interopRequireDefault(_ShipToAccountModule);
  _ShipToModule = _interopRequireDefault(_ShipToModule);
  _List = _interopRequireDefault(_List);

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
  // import PicklistService from './PicklistService';
  // const resource = getResource('icboeApplicationModule');
  var __class = (0, _declare["default"])('crm.Integrations.BOE.ApplicationModule', [_ApplicationModule["default"]], {
    modules: null,
    init: function init() {
      this.inherited(init, arguments); // App.picklistService = PicklistService;

      App.enableDashboards = this.enableDashboards;
      this.modules = [new _AccountAssociationModule["default"](this), new _AccountModule["default"](this), new _BillToAccountModule["default"](this), new _BillToModule["default"](this), new _ContactModule["default"](this), new _ContactAssociationModule["default"](this), new _HelpModule["default"](this), new _InvoiceLineModule["default"](this), new _InvoiceModule["default"](this), new _OpportunityModule["default"](this), new _PayFromModule["default"](this), new _ProductModule["default"](this), new _QuoteModule["default"](this), new _QuotePersonModule["default"](this), new _QuoteLineModule["default"](this), new _ReceivableLineModule["default"](this), new _ReceivableModule["default"](this), new _ReturnLineModule["default"](this), new _ReturnModule["default"](this), new _SalesOrderItemModule["default"](this), new _SalesOrderModule["default"](this), new _ShipmentLineModule["default"](this), new _ShipmentModule["default"](this), new _ShipToAccountModule["default"](this), new _ShipToModule["default"](this)];
      this.modules.forEach(function (mod) {
        mod.init();
      });
    },
    initDynamic: function initDynamic() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      this.modules.forEach(function (mod) {
        mod.initDynamic();
      });
      this.inherited(initDynamic, arguments);
    },
    isIntegrationEnabled: function isIntegrationEnabled() {
      var results = this.application.context.integrations.filter(function (integration) {
        return integration.Name === 'Back Office Extension';
      })[0];
      return results && results.Enabled;
    },
    loadViewsDynamic: function loadViewsDynamic() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      this.modules.forEach(function (module) {
        module.loadViews();
      });
    },
    loadCustomizationsDynamic: function loadCustomizations() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      this.modules.forEach(function (module) {
        module.loadCustomizations();
      });
      this.registerDefaultViews();

      _lang["default"].extend(argos._ListBase, {
        // TODO: Avoid global
        navigateToInsertView: function navigateToInsertView(additionalOptions) {
          var view = this.app.getView(this.insertView || this.editView);
          var options = {
            detailView: this.detailView,
            returnTo: this.id,
            insert: true
          }; // Pass along the selected entry (related list could get it from a quick action)

          if (this.options.selectedEntry) {
            options.selectedEntry = this.options.selectedEntry;
          }

          if (additionalOptions) {
            options = _lang["default"].mixin(options, additionalOptions);
          }

          if (view) {
            view.show(options);
          }
        }
      });

      _lang["default"].extend(argos._EditBase, {
        // TODO: Avoid global
        onInsertCompleted: function onInsertCompleted(entry) {
          if (this.options && this.options.detailView) {
            var view = App.getView(this.options.detailView);

            if (view) {
              view.show({
                key: entry.$key,
                title: entry.$descriptor,
                description: entry.$descriptor
              }, {
                returnTo: -1
              });
            }
          } else if (this.options && this.options.returnTo) {
            var returnTo = this.options.returnTo;

            var _view = App.getView(returnTo);

            if (_view) {
              _view.show();
            } else {
              window.location.hash = returnTo;
            }
          } else {
            ReUI.back();
          }
        }
      });

      _lang["default"].extend(crm.Views.MetricWidget, {
        itemTemplate: new Simplate(['<span class="metric-title">{%: $$.title %}</span>', '<h1 class="metric-value" {%: $$.getValueStyle() %} >{%: $$.formatter($.value) %}</h1>']),
        setValueColor: function setValueColor(color) {
          this.valueColor = color;
        },
        getValueStyle: function getValueStyle() {
          if (this.valueColor) {
            return "style=color:".concat(this.valueColor);
          }

          return '';
        }
      });

      _lang["default"].extend(argos.TabWidget, {
        // TODO: Avoid global
        tabListItemTemplate: new Simplate(['<li data-key="{%: $.name %}" class="tab" role="presentation" data-action="selectedTab">', '<a href="#{%: $$.id %}_{%: $.name %}">{%: ($.title || $.options.title) %}</a>', '</li>'])
      }); // Recently viewed support


      var originalMappings = _List["default"].prototype.entityMappings;
      var originalText = _List["default"].prototype.entityText;
      _List["default"].prototype.entityText = Object.assign({}, originalText, {
        ERPShipment: (0, _I18n["default"])('erpShipmentModel').entityDisplayNamePlural,
        SalesOrder: (0, _I18n["default"])('salesOrderModel').entityDisplayNamePlural,
        ERPReceivable: (0, _I18n["default"])('erpReceivableModel').entityDisplayNamePlural,
        Quote: (0, _I18n["default"])('quoteModel').entityDisplayNamePlural,
        ERPInvoice: (0, _I18n["default"])('erpInvoiceModel').entityDisplayNamePlural
      });
      _List["default"].prototype.entityMappings = Object.assign({}, originalMappings, {
        ERPShipment: {
          iconClass: 'warehouse'
        },
        SalesOrder: {
          iconClass: 'cart'
        },
        ERPReceivable: {
          iconClass: 'checkbox'
        },
        Quote: {
          iconClass: 'document'
        },
        ERPInvoice: {
          iconClass: 'document2'
        }
      });
    },
    loadToolbarsDynamic: function loadToolbars() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      this.modules.forEach(function (module) {
        module.loadToolbars();
      });
    },
    loadAppStatePromises: function loadAppStatePromises() {
      this.inherited(loadAppStatePromises, arguments); // this.registerAppStatePromise({
      //   seq: 2,
      //   description: resource.picklistsText,
      //   items: [{
      //     name: 'picklist-requests',
      //     description: resource.retrievingPicklistsText,
      //     fn: () => {
      //       PicklistService.requestPicklists();
      //     },
      //   }],
      // });
    },
    registerDefaultViews: function registerDefaultViews() {
      var self = this;
      var originalGetDefaultViews = _Application["default"].prototype.getDefaultViews;

      _lang["default"].extend(_Application["default"], {
        getDefaultViews: function getDefaultViews() {
          var views = originalGetDefaultViews.apply(this, arguments) || [];
          self.modules.forEach(function (module) {
            module.registerDefaultViews(views);
          });
          return views;
        }
      });
    }
  });

  _lang["default"].setObject('icboe.ApplicationModule', __class);

  var _default = __class;
  _exports["default"] = _default;
});