define('crm/Integrations/BOE/ApplicationModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/I18n', 'argos/Application', 'argos/ApplicationModule', './Modules/AccountAssociationModule', './Modules/AccountModule', './Modules/BillToAccountModule', './Modules/BillToModule', './Modules/ContactModule', './Modules/ContactAssociationModule', './Modules/HelpModule', './Modules/InvoiceLineModule', './Modules/InvoiceModule', './Modules/OpportunityModule', './Modules/PayFromModule', './Modules/ProductModule', './Modules/QuoteModule', './Modules/QuotePersonModule', './Modules/QuoteLineModule', './Modules/ReceivableLineModule', './Modules/ReceivableModule', './Modules/ReturnLineModule', './Modules/ReturnModule', './Modules/SalesOrderItemModule', './Modules/SalesOrderModule', './Modules/ShipmentLineModule', './Modules/ShipmentModule', './Modules/ShipToAccountModule', './Modules/ShipToModule', '../../Views/RecentlyViewed/List', './Models/SyncResult/Offline', './Models/SyncResult/SData', './Models/BackOffice/Offline', './Models/BackOffice/SData', './Models/BackOfficeAccountingEntity/Offline', './Models/BackOfficeAccountingEntity/SData', './Models/Location/Offline', './Models/Location/SData', './Models/OperatingCompany/Offline', './Models/OperatingCompany/SData', './Models/UnitOfMeasure/Offline', './Models/UnitOfMeasure/SData', 'argos/TabWidget'], function (module, exports, _declare, _lang, _I18n, _Application, _ApplicationModule, _AccountAssociationModule, _AccountModule, _BillToAccountModule, _BillToModule, _ContactModule, _ContactAssociationModule, _HelpModule, _InvoiceLineModule, _InvoiceModule, _OpportunityModule, _PayFromModule, _ProductModule, _QuoteModule, _QuotePersonModule, _QuoteLineModule, _ReceivableLineModule, _ReceivableModule, _ReturnLineModule, _ReturnModule, _SalesOrderItemModule, _SalesOrderModule, _ShipmentLineModule, _ShipmentModule, _ShipToAccountModule, _ShipToModule, _List) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Application2 = _interopRequireDefault(_Application);

  var _ApplicationModule2 = _interopRequireDefault(_ApplicationModule);

  var _AccountAssociationModule2 = _interopRequireDefault(_AccountAssociationModule);

  var _AccountModule2 = _interopRequireDefault(_AccountModule);

  var _BillToAccountModule2 = _interopRequireDefault(_BillToAccountModule);

  var _BillToModule2 = _interopRequireDefault(_BillToModule);

  var _ContactModule2 = _interopRequireDefault(_ContactModule);

  var _ContactAssociationModule2 = _interopRequireDefault(_ContactAssociationModule);

  var _HelpModule2 = _interopRequireDefault(_HelpModule);

  var _InvoiceLineModule2 = _interopRequireDefault(_InvoiceLineModule);

  var _InvoiceModule2 = _interopRequireDefault(_InvoiceModule);

  var _OpportunityModule2 = _interopRequireDefault(_OpportunityModule);

  var _PayFromModule2 = _interopRequireDefault(_PayFromModule);

  var _ProductModule2 = _interopRequireDefault(_ProductModule);

  var _QuoteModule2 = _interopRequireDefault(_QuoteModule);

  var _QuotePersonModule2 = _interopRequireDefault(_QuotePersonModule);

  var _QuoteLineModule2 = _interopRequireDefault(_QuoteLineModule);

  var _ReceivableLineModule2 = _interopRequireDefault(_ReceivableLineModule);

  var _ReceivableModule2 = _interopRequireDefault(_ReceivableModule);

  var _ReturnLineModule2 = _interopRequireDefault(_ReturnLineModule);

  var _ReturnModule2 = _interopRequireDefault(_ReturnModule);

  var _SalesOrderItemModule2 = _interopRequireDefault(_SalesOrderItemModule);

  var _SalesOrderModule2 = _interopRequireDefault(_SalesOrderModule);

  var _ShipmentLineModule2 = _interopRequireDefault(_ShipmentLineModule);

  var _ShipmentModule2 = _interopRequireDefault(_ShipmentModule);

  var _ShipToAccountModule2 = _interopRequireDefault(_ShipToAccountModule);

  var _ShipToModule2 = _interopRequireDefault(_ShipToModule);

  var _List2 = _interopRequireDefault(_List);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // const resource = getResource('icboeApplicationModule');

  // import PicklistService from './PicklistService';
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

  const __class = (0, _declare2.default)('crm.Integrations.BOE.ApplicationModule', [_ApplicationModule2.default], {
    modules: null,
    init: function init() {
      this.inherited(init, arguments);

      // App.picklistService = PicklistService;
      App.enableDashboards = this.enableDashboards;
      this.modules = [new _AccountAssociationModule2.default(this), new _AccountModule2.default(this), new _BillToAccountModule2.default(this), new _BillToModule2.default(this), new _ContactModule2.default(this), new _ContactAssociationModule2.default(this), new _HelpModule2.default(this), new _InvoiceLineModule2.default(this), new _InvoiceModule2.default(this), new _OpportunityModule2.default(this), new _PayFromModule2.default(this), new _ProductModule2.default(this), new _QuoteModule2.default(this), new _QuotePersonModule2.default(this), new _QuoteLineModule2.default(this), new _ReceivableLineModule2.default(this), new _ReceivableModule2.default(this), new _ReturnLineModule2.default(this), new _ReturnModule2.default(this), new _SalesOrderItemModule2.default(this), new _SalesOrderModule2.default(this), new _ShipmentLineModule2.default(this), new _ShipmentModule2.default(this), new _ShipToAccountModule2.default(this), new _ShipToModule2.default(this)];

      this.modules.forEach(mod => {
        mod.init();
      });
    },
    initDynamic: function initDynamic() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      this.modules.forEach(mod => {
        mod.initDynamic();
      });

      this.inherited(initDynamic, arguments);
    },
    isIntegrationEnabled: function isIntegrationEnabled() {
      const results = this.application.context.integrations.filter(integration => integration.Name === 'Back Office Extension')[0];
      return results && results.Enabled;
    },
    loadViewsDynamic: function loadViewsDynamic() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      this.modules.forEach(module => {
        module.loadViews();
      });
    },
    loadCustomizationsDynamic: function loadCustomizations() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      this.modules.forEach(module => {
        module.loadCustomizations();
      });
      this.registerDefaultViews();

      _lang2.default.extend(argos._ListBase, { // TODO: Avoid global
        navigateToInsertView: function navigateToInsertView(additionalOptions) {
          const view = this.app.getView(this.insertView || this.editView);
          let options = {
            detailView: this.detailView,
            returnTo: this.id,
            insert: true
          };

          // Pass along the selected entry (related list could get it from a quick action)
          if (this.options.selectedEntry) {
            options.selectedEntry = this.options.selectedEntry;
          }

          if (additionalOptions) {
            options = _lang2.default.mixin(options, additionalOptions);
          }

          if (view) {
            view.show(options);
          }
        }
      });

      _lang2.default.extend(argos._EditBase, { // TODO: Avoid global
        onInsertCompleted: function onInsertCompleted(entry) {
          if (this.options && this.options.detailView) {
            const view = App.getView(this.options.detailView);
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
            const returnTo = this.options.returnTo;
            const view = App.getView(returnTo);
            if (view) {
              view.show();
            } else {
              window.location.hash = returnTo;
            }
          } else {
            ReUI.back();
          }
        }
      });

      _lang2.default.extend(crm.Views.MetricWidget, {
        itemTemplate: new Simplate(['<span class="metric-title">{%: $$.title %}</span>', '<h1 class="metric-value" {%: $$.getValueStyle() %} >{%: $$.formatter($.value) %}</h1>']),
        setValueColor: function setValueColor(color) {
          this.valueColor = color;
        },
        getValueStyle: function getValueStyle() {
          if (this.valueColor) {
            return `style=color:${this.valueColor}`;
          }
          return '';
        }
      });

      _lang2.default.extend(argos.TabWidget, { // TODO: Avoid global
        tabListItemTemplate: new Simplate(['<li data-key="{%: $.name %}" class="tab" role="presentation" data-action="selectedTab">', '<a href="#{%: $$.id %}_{%: $.name %}">{%: ($.title || $.options.title) %}</a>', '</li>'])
      });

      // Recently viewed support
      const originalMappings = _List2.default.prototype.entityMappings;
      const originalText = _List2.default.prototype.entityText;

      _List2.default.prototype.entityText = Object.assign({}, originalText, {
        ERPShipment: (0, _I18n2.default)('erpShipmentModel').entityDisplayNamePlural,
        SalesOrder: (0, _I18n2.default)('salesOrderModel').entityDisplayNamePlural,
        ERPReceivable: (0, _I18n2.default)('erpReceivableModel').entityDisplayNamePlural,
        Quote: (0, _I18n2.default)('quoteModel').entityDisplayNamePlural,
        ERPInvoice: (0, _I18n2.default)('erpInvoiceModel').entityDisplayNamePlural
      });

      _List2.default.prototype.entityMappings = Object.assign({}, originalMappings, {
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

      this.modules.forEach(module => {
        module.loadToolbars();
      });
    },
    loadAppStatePromises: function loadAppStatePromises() {
      this.inherited(loadAppStatePromises, arguments);
      // this.registerAppStatePromise({
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
      const self = this;
      const originalGetDefaultViews = _Application2.default.prototype.getDefaultViews;
      _lang2.default.extend(_Application2.default, {
        getDefaultViews: function getDefaultViews() {
          const views = originalGetDefaultViews.apply(this, arguments) || [];
          self.modules.forEach(module => {
            module.registerDefaultViews(views);
          });
          return views;
        }
      });
    }
  });

  _lang2.default.setObject('icboe.ApplicationModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});