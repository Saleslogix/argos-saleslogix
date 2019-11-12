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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.ApplicationModule', [_ApplicationModule2.default], {
    modules: null,
    init: function init() {
      this.inherited(arguments);

      // App.picklistService = PicklistService;
      App.enableDashboards = this.enableDashboards;
      this.modules = [new _AccountAssociationModule2.default(this), new _AccountModule2.default(this), new _BillToAccountModule2.default(this), new _BillToModule2.default(this), new _ContactModule2.default(this), new _ContactAssociationModule2.default(this), new _HelpModule2.default(this), new _InvoiceLineModule2.default(this), new _InvoiceModule2.default(this), new _OpportunityModule2.default(this), new _PayFromModule2.default(this), new _ProductModule2.default(this), new _QuoteModule2.default(this), new _QuotePersonModule2.default(this), new _QuoteLineModule2.default(this), new _ReceivableLineModule2.default(this), new _ReceivableModule2.default(this), new _ReturnLineModule2.default(this), new _ReturnModule2.default(this), new _SalesOrderItemModule2.default(this), new _SalesOrderModule2.default(this), new _ShipmentLineModule2.default(this), new _ShipmentModule2.default(this), new _ShipToAccountModule2.default(this), new _ShipToModule2.default(this)];

      this.modules.forEach(function (mod) {
        mod.init();
      });
    },
    initDynamic: function init() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      this.modules.forEach(function (mod) {
        mod.initDynamic();
      });

      this.inherited(arguments);
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

      _lang2.default.extend(argos._ListBase, { // TODO: Avoid global
        navigateToInsertView: function navigateToInsertView(additionalOptions) {
          var view = this.app.getView(this.insertView || this.editView);
          var options = {
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

      _lang2.default.extend(crm.Views.MetricWidget, {
        itemTemplate: new Simplate(['<span class="metric-title">{%: $$.title %}</span>', '<h1 class="metric-value" {%: $$.getValueStyle() %} >{%: $$.formatter($.value) %}</h1>']),
        setValueColor: function setValueColor(color) {
          this.valueColor = color;
        },
        getValueStyle: function getValueStyle() {
          if (this.valueColor) {
            return 'style=color:' + this.valueColor;
          }
          return '';
        }
      });

      _lang2.default.extend(argos.TabWidget, { // TODO: Avoid global
        tabListItemTemplate: new Simplate(['<li data-key="{%: $.name %}" class="tab" role="presentation" data-action="selectedTab">', '<a href="#{%: $$.id %}_{%: $.name %}">{%: ($.title || $.options.title) %}</a>', '</li>'])
      });

      // Recently viewed support
      var originalMappings = _List2.default.prototype.entityMappings;
      var originalText = _List2.default.prototype.entityText;

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

      this.modules.forEach(function (module) {
        module.loadToolbars();
      });
    },
    loadAppStatePromises: function loadAppStatePromises() {
      this.inherited(arguments);
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
      var self = this;
      var originalGetDefaultViews = _Application2.default.prototype.getDefaultViews;
      _lang2.default.extend(_Application2.default, {
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

  _lang2.default.setObject('icboe.ApplicationModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL0FwcGxpY2F0aW9uTW9kdWxlLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJtb2R1bGVzIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsIkFwcCIsImVuYWJsZURhc2hib2FyZHMiLCJmb3JFYWNoIiwibW9kIiwiaW5pdER5bmFtaWMiLCJpc0ludGVncmF0aW9uRW5hYmxlZCIsInJlc3VsdHMiLCJhcHBsaWNhdGlvbiIsImNvbnRleHQiLCJpbnRlZ3JhdGlvbnMiLCJmaWx0ZXIiLCJpbnRlZ3JhdGlvbiIsIk5hbWUiLCJFbmFibGVkIiwibG9hZFZpZXdzRHluYW1pYyIsIm1vZHVsZSIsImxvYWRWaWV3cyIsImxvYWRDdXN0b21pemF0aW9uc0R5bmFtaWMiLCJsb2FkQ3VzdG9taXphdGlvbnMiLCJyZWdpc3RlckRlZmF1bHRWaWV3cyIsImV4dGVuZCIsImFyZ29zIiwiX0xpc3RCYXNlIiwibmF2aWdhdGVUb0luc2VydFZpZXciLCJhZGRpdGlvbmFsT3B0aW9ucyIsInZpZXciLCJhcHAiLCJnZXRWaWV3IiwiaW5zZXJ0VmlldyIsImVkaXRWaWV3Iiwib3B0aW9ucyIsImRldGFpbFZpZXciLCJyZXR1cm5UbyIsImlkIiwiaW5zZXJ0Iiwic2VsZWN0ZWRFbnRyeSIsIm1peGluIiwic2hvdyIsIl9FZGl0QmFzZSIsIm9uSW5zZXJ0Q29tcGxldGVkIiwiZW50cnkiLCJrZXkiLCIka2V5IiwidGl0bGUiLCIkZGVzY3JpcHRvciIsImRlc2NyaXB0aW9uIiwid2luZG93IiwibG9jYXRpb24iLCJoYXNoIiwiUmVVSSIsImJhY2siLCJjcm0iLCJWaWV3cyIsIk1ldHJpY1dpZGdldCIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwic2V0VmFsdWVDb2xvciIsImNvbG9yIiwidmFsdWVDb2xvciIsImdldFZhbHVlU3R5bGUiLCJUYWJXaWRnZXQiLCJ0YWJMaXN0SXRlbVRlbXBsYXRlIiwib3JpZ2luYWxNYXBwaW5ncyIsInByb3RvdHlwZSIsImVudGl0eU1hcHBpbmdzIiwib3JpZ2luYWxUZXh0IiwiZW50aXR5VGV4dCIsIk9iamVjdCIsImFzc2lnbiIsIkVSUFNoaXBtZW50IiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJTYWxlc09yZGVyIiwiRVJQUmVjZWl2YWJsZSIsIlF1b3RlIiwiRVJQSW52b2ljZSIsImljb25DbGFzcyIsImxvYWRUb29sYmFyc0R5bmFtaWMiLCJsb2FkVG9vbGJhcnMiLCJsb2FkQXBwU3RhdGVQcm9taXNlcyIsInNlbGYiLCJvcmlnaW5hbEdldERlZmF1bHRWaWV3cyIsImdldERlZmF1bHRWaWV3cyIsInZpZXdzIiwiYXBwbHkiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4REE7O0FBL0JBO0FBL0JBOzs7Ozs7Ozs7Ozs7Ozs7QUFnRUEsTUFBTUEsVUFBVSx1QkFBUSx3Q0FBUixFQUFrRCw2QkFBbEQsRUFBdUU7QUFDckZDLGFBQVMsSUFENEU7QUFFckZDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixXQUFLQyxTQUFMLENBQWVDLFNBQWY7O0FBRUE7QUFDQUMsVUFBSUMsZ0JBQUosR0FBdUIsS0FBS0EsZ0JBQTVCO0FBQ0EsV0FBS0wsT0FBTCxHQUFlLENBQ2IsdUNBQTZCLElBQTdCLENBRGEsRUFFYiw0QkFBa0IsSUFBbEIsQ0FGYSxFQUdiLGtDQUF3QixJQUF4QixDQUhhLEVBSWIsMkJBQWlCLElBQWpCLENBSmEsRUFLYiw0QkFBa0IsSUFBbEIsQ0FMYSxFQU1iLHVDQUE2QixJQUE3QixDQU5hLEVBT2IseUJBQWUsSUFBZixDQVBhLEVBUWIsZ0NBQXNCLElBQXRCLENBUmEsRUFTYiw0QkFBa0IsSUFBbEIsQ0FUYSxFQVViLGdDQUFzQixJQUF0QixDQVZhLEVBV2IsNEJBQWtCLElBQWxCLENBWGEsRUFZYiw0QkFBa0IsSUFBbEIsQ0Fa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QUwsQ0FBYU0sT0FBYixDQUFxQixVQUFDYSxNQUFELEVBQVk7QUFDL0JBLGVBQU84RCxZQUFQO0FBQ0QsT0FGRDtBQUdELEtBMUxvRjtBQTJMckZDLDBCQUFzQixTQUFTQSxvQkFBVCxHQUFnQztBQUNwRCxXQUFLaEYsU0FBTCxDQUFlQyxTQUFmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELEtBeE1vRjtBQXlNckZvQiwwQkFBc0IsU0FBU0Esb0JBQVQsR0FBZ0M7QUFDcEQsVUFBTTRELE9BQU8sSUFBYjtBQUNBLFVBQU1DLDBCQUEwQixzQkFBWWpCLFNBQVosQ0FBc0JrQixlQUF0RDtBQUNBLHFCQUFLN0QsTUFBTCx3QkFBeUI7QUFDdkI2RCx5QkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxjQUFNQyxRQUFRRix3QkFBd0JHLEtBQXhCLENBQThCLElBQTlCLEVBQW9DcEYsU0FBcEMsS0FBa0QsRUFBaEU7QUFDQWdGLGVBQUtuRixPQUFMLENBQWFNLE9BQWIsQ0FBcUIsVUFBQ2EsTUFBRCxFQUFZO0FBQy9CQSxtQkFBT0ksb0JBQVAsQ0FBNEIrRCxLQUE1QjtBQUNELFdBRkQ7QUFHQSxpQkFBT0EsS0FBUDtBQUNEO0FBUHNCLE9BQXpCO0FBU0Q7QUFyTm9GLEdBQXZFLENBQWhCOztBQXdOQSxpQkFBS0UsU0FBTCxDQUFlLHlCQUFmLEVBQTBDekYsT0FBMUM7b0JBQ2VBLE8iLCJmaWxlIjoiQXBwbGljYXRpb25Nb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICdhcmdvcy9BcHBsaWNhdGlvbic7XHJcbmltcG9ydCBBcHBsaWNhdGlvbk1vZHVsZSBmcm9tICdhcmdvcy9BcHBsaWNhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCBBY2NvdW50QXNzb2NpYXRpb25Nb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL0FjY291bnRBc3NvY2lhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCBBY2NvdW50TW9kdWxlIGZyb20gJy4vTW9kdWxlcy9BY2NvdW50TW9kdWxlJztcclxuaW1wb3J0IEJpbGxUb0FjY291bnRNb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL0JpbGxUb0FjY291bnRNb2R1bGUnO1xyXG5pbXBvcnQgQmlsbFRvTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9CaWxsVG9Nb2R1bGUnO1xyXG5pbXBvcnQgQ29udGFjdE1vZHVsZSBmcm9tICcuL01vZHVsZXMvQ29udGFjdE1vZHVsZSc7XHJcbmltcG9ydCBDb250YWN0QXNzb2NpYXRpb25Nb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL0NvbnRhY3RBc3NvY2lhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCBIZWxwTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9IZWxwTW9kdWxlJztcclxuaW1wb3J0IEludm9pY2VMaW5lTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9JbnZvaWNlTGluZU1vZHVsZSc7XHJcbmltcG9ydCBJbnZvaWNlTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9JbnZvaWNlTW9kdWxlJztcclxuaW1wb3J0IE9wcG9ydHVuaXR5TW9kdWxlIGZyb20gJy4vTW9kdWxlcy9PcHBvcnR1bml0eU1vZHVsZSc7XHJcbmltcG9ydCBQYXlGcm9tTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9QYXlGcm9tTW9kdWxlJztcclxuLy8gaW1wb3J0IFBpY2tsaXN0U2VydmljZSBmcm9tICcuL1BpY2tsaXN0U2VydmljZSc7XHJcbmltcG9ydCBQcm9kdWN0TW9kdWxlIGZyb20gJy4vTW9kdWxlcy9Qcm9kdWN0TW9kdWxlJztcclxuaW1wb3J0IFF1b3RlTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9RdW90ZU1vZHVsZSc7XHJcbmltcG9ydCBRdW90ZVBlcnNvbk1vZHVsZSBmcm9tICcuL01vZHVsZXMvUXVvdGVQZXJzb25Nb2R1bGUnO1xyXG5pbXBvcnQgUXVvdGVMaW5lTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9RdW90ZUxpbmVNb2R1bGUnO1xyXG5pbXBvcnQgUmVjZWl2YWJsZUxpbmVNb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL1JlY2VpdmFibGVMaW5lTW9kdWxlJztcclxuaW1wb3J0IFJlY2VpdmFibGVNb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL1JlY2VpdmFibGVNb2R1bGUnO1xyXG5pbXBvcnQgUmV0dXJuTGluZU1vZHVsZSBmcm9tICcuL01vZHVsZXMvUmV0dXJuTGluZU1vZHVsZSc7XHJcbmltcG9ydCBSZXR1cm5Nb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL1JldHVybk1vZHVsZSc7XHJcbmltcG9ydCBTYWxlc09yZGVySXRlbU1vZHVsZSBmcm9tICcuL01vZHVsZXMvU2FsZXNPcmRlckl0ZW1Nb2R1bGUnO1xyXG5pbXBvcnQgU2FsZXNPcmRlck1vZHVsZSBmcm9tICcuL01vZHVsZXMvU2FsZXNPcmRlck1vZHVsZSc7XHJcbmltcG9ydCBTaGlwbWVudExpbmVNb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL1NoaXBtZW50TGluZU1vZHVsZSc7XHJcbmltcG9ydCBTaGlwbWVudE1vZHVsZSBmcm9tICcuL01vZHVsZXMvU2hpcG1lbnRNb2R1bGUnO1xyXG5pbXBvcnQgU2hpcFRvQWNjb3VudE1vZHVsZSBmcm9tICcuL01vZHVsZXMvU2hpcFRvQWNjb3VudE1vZHVsZSc7XHJcbmltcG9ydCBTaGlwVG9Nb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL1NoaXBUb01vZHVsZSc7XHJcbmltcG9ydCBSZWNlbnRseVZpZXdlZExpc3QgZnJvbSAnLi4vLi4vVmlld3MvUmVjZW50bHlWaWV3ZWQvTGlzdCc7XHJcblxyXG5pbXBvcnQgJy4vTW9kZWxzL1N5bmNSZXN1bHQvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvU3luY1Jlc3VsdC9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvQmFja09mZmljZS9PZmZsaW5lJztcclxuaW1wb3J0ICcuL01vZGVscy9CYWNrT2ZmaWNlL1NEYXRhJztcclxuaW1wb3J0ICcuL01vZGVscy9CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eS9PZmZsaW5lJztcclxuaW1wb3J0ICcuL01vZGVscy9CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eS9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvTG9jYXRpb24vT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvTG9jYXRpb24vU0RhdGEnO1xyXG5pbXBvcnQgJy4vTW9kZWxzL09wZXJhdGluZ0NvbXBhbnkvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvT3BlcmF0aW5nQ29tcGFueS9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvVW5pdE9mTWVhc3VyZS9PZmZsaW5lJztcclxuaW1wb3J0ICcuL01vZGVscy9Vbml0T2ZNZWFzdXJlL1NEYXRhJztcclxuaW1wb3J0ICdhcmdvcy9UYWJXaWRnZXQnO1xyXG5cclxuLy8gY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaWNib2VBcHBsaWNhdGlvbk1vZHVsZScpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLkFwcGxpY2F0aW9uTW9kdWxlJywgW0FwcGxpY2F0aW9uTW9kdWxlXSwge1xyXG4gIG1vZHVsZXM6IG51bGwsXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgLy8gQXBwLnBpY2tsaXN0U2VydmljZSA9IFBpY2tsaXN0U2VydmljZTtcclxuICAgIEFwcC5lbmFibGVEYXNoYm9hcmRzID0gdGhpcy5lbmFibGVEYXNoYm9hcmRzO1xyXG4gICAgdGhpcy5tb2R1bGVzID0gW1xyXG4gICAgICBuZXcgQWNjb3VudEFzc29jaWF0aW9uTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgQWNjb3VudE1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IEJpbGxUb0FjY291bnRNb2R1bGUodGhpcyksXHJcbiAgICAgIG5ldyBCaWxsVG9Nb2R1bGUodGhpcyksXHJcbiAgICAgIG5ldyBDb250YWN0TW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgQ29udGFjdEFzc29jaWF0aW9uTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgSGVscE1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IEludm9pY2VMaW5lTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgSW52b2ljZU1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IE9wcG9ydHVuaXR5TW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgUGF5RnJvbU1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFByb2R1Y3RNb2R1bGUodGhpcyksXHJcbiAgICAgIG5ldyBRdW90ZU1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFF1b3RlUGVyc29uTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgUXVvdGVMaW5lTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgUmVjZWl2YWJsZUxpbmVNb2R1bGUodGhpcyksXHJcbiAgICAgIG5ldyBSZWNlaXZhYmxlTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgUmV0dXJuTGluZU1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFJldHVybk1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFNhbGVzT3JkZXJJdGVtTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgU2FsZXNPcmRlck1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFNoaXBtZW50TGluZU1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFNoaXBtZW50TW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgU2hpcFRvQWNjb3VudE1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFNoaXBUb01vZHVsZSh0aGlzKSxcclxuICAgIF07XHJcblxyXG4gICAgdGhpcy5tb2R1bGVzLmZvckVhY2goKG1vZCkgPT4ge1xyXG4gICAgICBtb2QuaW5pdCgpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBpbml0RHluYW1pYzogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5pc0ludGVncmF0aW9uRW5hYmxlZCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZHVsZXMuZm9yRWFjaCgobW9kKSA9PiB7XHJcbiAgICAgIG1vZC5pbml0RHluYW1pYygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIGlzSW50ZWdyYXRpb25FbmFibGVkOiBmdW5jdGlvbiBpc0ludGVncmF0aW9uRW5hYmxlZCgpIHtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSB0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQuaW50ZWdyYXRpb25zLmZpbHRlcihpbnRlZ3JhdGlvbiA9PiBpbnRlZ3JhdGlvbi5OYW1lID09PSAnQmFjayBPZmZpY2UgRXh0ZW5zaW9uJylbMF07XHJcbiAgICByZXR1cm4gcmVzdWx0cyAmJiByZXN1bHRzLkVuYWJsZWQ7XHJcbiAgfSxcclxuICBsb2FkVmlld3NEeW5hbWljOiBmdW5jdGlvbiBsb2FkVmlld3NEeW5hbWljKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzSW50ZWdyYXRpb25FbmFibGVkKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW9kdWxlcy5mb3JFYWNoKChtb2R1bGUpID0+IHtcclxuICAgICAgbW9kdWxlLmxvYWRWaWV3cygpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBsb2FkQ3VzdG9taXphdGlvbnNEeW5hbWljOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnRlZ3JhdGlvbkVuYWJsZWQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2R1bGVzLmZvckVhY2goKG1vZHVsZSkgPT4ge1xyXG4gICAgICBtb2R1bGUubG9hZEN1c3RvbWl6YXRpb25zKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0Vmlld3MoKTtcclxuXHJcbiAgICBsYW5nLmV4dGVuZChhcmdvcy5fTGlzdEJhc2UsIHsgLy8gVE9ETzogQXZvaWQgZ2xvYmFsXHJcbiAgICAgIG5hdmlnYXRlVG9JbnNlcnRWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvSW5zZXJ0VmlldyhhZGRpdGlvbmFsT3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmFwcC5nZXRWaWV3KHRoaXMuaW5zZXJ0VmlldyB8fCB0aGlzLmVkaXRWaWV3KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIGRldGFpbFZpZXc6IHRoaXMuZGV0YWlsVmlldyxcclxuICAgICAgICAgIHJldHVyblRvOiB0aGlzLmlkLFxyXG4gICAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFBhc3MgYWxvbmcgdGhlIHNlbGVjdGVkIGVudHJ5IChyZWxhdGVkIGxpc3QgY291bGQgZ2V0IGl0IGZyb20gYSBxdWljayBhY3Rpb24pXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zZWxlY3RlZEVudHJ5KSB7XHJcbiAgICAgICAgICBvcHRpb25zLnNlbGVjdGVkRW50cnkgPSB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRFbnRyeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhZGRpdGlvbmFsT3B0aW9ucykge1xyXG4gICAgICAgICAgb3B0aW9ucyA9IGxhbmcubWl4aW4ob3B0aW9ucywgYWRkaXRpb25hbE9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW5nLmV4dGVuZChhcmdvcy5fRWRpdEJhc2UsIHsgLy8gVE9ETzogQXZvaWQgZ2xvYmFsXHJcbiAgICAgIG9uSW5zZXJ0Q29tcGxldGVkOiBmdW5jdGlvbiBvbkluc2VydENvbXBsZXRlZChlbnRyeSkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmRldGFpbFZpZXcpIHtcclxuICAgICAgICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLm9wdGlvbnMuZGV0YWlsVmlldyk7XHJcbiAgICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgICAgICAgIGtleTogZW50cnkuJGtleSxcclxuICAgICAgICAgICAgICB0aXRsZTogZW50cnkuJGRlc2NyaXB0b3IsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGVudHJ5LiRkZXNjcmlwdG9yLFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuVG86IC0xLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucmV0dXJuVG8pIHtcclxuICAgICAgICAgIGNvbnN0IHJldHVyblRvID0gdGhpcy5vcHRpb25zLnJldHVyblRvO1xyXG4gICAgICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHJldHVyblRvKTtcclxuICAgICAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2hvdygpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSByZXR1cm5UbztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgUmVVSS5iYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgbGFuZy5leHRlbmQoY3JtLlZpZXdzLk1ldHJpY1dpZGdldCwge1xyXG4gICAgICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwibWV0cmljLXRpdGxlXCI+eyU6ICQkLnRpdGxlICV9PC9zcGFuPicsXHJcbiAgICAgICAgJzxoMSBjbGFzcz1cIm1ldHJpYy12YWx1ZVwiIHslOiAkJC5nZXRWYWx1ZVN0eWxlKCkgJX0gPnslOiAkJC5mb3JtYXR0ZXIoJC52YWx1ZSkgJX08L2gxPicsXHJcbiAgICAgIF0pLFxyXG4gICAgICBzZXRWYWx1ZUNvbG9yOiBmdW5jdGlvbiBzZXRWYWx1ZUNvbG9yKGNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZUNvbG9yID0gY29sb3I7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFZhbHVlU3R5bGU6IGZ1bmN0aW9uIGdldFZhbHVlU3R5bGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWVDb2xvcikge1xyXG4gICAgICAgICAgcmV0dXJuIGBzdHlsZT1jb2xvcjoke3RoaXMudmFsdWVDb2xvcn1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW5nLmV4dGVuZChhcmdvcy5UYWJXaWRnZXQsIHsgLy8gVE9ETzogQXZvaWQgZ2xvYmFsXHJcbiAgICAgIHRhYkxpc3RJdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAgICAgJzxsaSBkYXRhLWtleT1cInslOiAkLm5hbWUgJX1cIiBjbGFzcz1cInRhYlwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBkYXRhLWFjdGlvbj1cInNlbGVjdGVkVGFiXCI+JyxcclxuICAgICAgICAnPGEgaHJlZj1cIiN7JTogJCQuaWQgJX1feyU6ICQubmFtZSAlfVwiPnslOiAoJC50aXRsZSB8fCAkLm9wdGlvbnMudGl0bGUpICV9PC9hPicsXHJcbiAgICAgICAgJzwvbGk+JyxcclxuICAgICAgXSksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBSZWNlbnRseSB2aWV3ZWQgc3VwcG9ydFxyXG4gICAgY29uc3Qgb3JpZ2luYWxNYXBwaW5ncyA9IFJlY2VudGx5Vmlld2VkTGlzdC5wcm90b3R5cGUuZW50aXR5TWFwcGluZ3M7XHJcbiAgICBjb25zdCBvcmlnaW5hbFRleHQgPSBSZWNlbnRseVZpZXdlZExpc3QucHJvdG90eXBlLmVudGl0eVRleHQ7XHJcblxyXG4gICAgUmVjZW50bHlWaWV3ZWRMaXN0LnByb3RvdHlwZS5lbnRpdHlUZXh0ID0gT2JqZWN0LmFzc2lnbih7fSwgb3JpZ2luYWxUZXh0LCB7XHJcbiAgICAgIEVSUFNoaXBtZW50OiBnZXRSZXNvdXJjZSgnZXJwU2hpcG1lbnRNb2RlbCcpLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICBTYWxlc09yZGVyOiBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlck1vZGVsJykuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIEVSUFJlY2VpdmFibGU6IGdldFJlc291cmNlKCdlcnBSZWNlaXZhYmxlTW9kZWwnKS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgUXVvdGU6IGdldFJlc291cmNlKCdxdW90ZU1vZGVsJykuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIEVSUEludm9pY2U6IGdldFJlc291cmNlKCdlcnBJbnZvaWNlTW9kZWwnKS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgIH0pO1xyXG5cclxuICAgIFJlY2VudGx5Vmlld2VkTGlzdC5wcm90b3R5cGUuZW50aXR5TWFwcGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBvcmlnaW5hbE1hcHBpbmdzLCB7XHJcbiAgICAgIEVSUFNoaXBtZW50OiB7XHJcbiAgICAgICAgaWNvbkNsYXNzOiAnd2FyZWhvdXNlJyxcclxuICAgICAgfSxcclxuICAgICAgU2FsZXNPcmRlcjoge1xyXG4gICAgICAgIGljb25DbGFzczogJ2NhcnQnLFxyXG4gICAgICB9LFxyXG4gICAgICBFUlBSZWNlaXZhYmxlOiB7XHJcbiAgICAgICAgaWNvbkNsYXNzOiAnY2hlY2tib3gnLFxyXG4gICAgICB9LFxyXG4gICAgICBRdW90ZToge1xyXG4gICAgICAgIGljb25DbGFzczogJ2RvY3VtZW50JyxcclxuICAgICAgfSxcclxuICAgICAgRVJQSW52b2ljZToge1xyXG4gICAgICAgIGljb25DbGFzczogJ2RvY3VtZW50MicsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGxvYWRUb29sYmFyc0R5bmFtaWM6IGZ1bmN0aW9uIGxvYWRUb29sYmFycygpIHtcclxuICAgIGlmICghdGhpcy5pc0ludGVncmF0aW9uRW5hYmxlZCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZHVsZXMuZm9yRWFjaCgobW9kdWxlKSA9PiB7XHJcbiAgICAgIG1vZHVsZS5sb2FkVG9vbGJhcnMoKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgbG9hZEFwcFN0YXRlUHJvbWlzZXM6IGZ1bmN0aW9uIGxvYWRBcHBTdGF0ZVByb21pc2VzKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIC8vIHRoaXMucmVnaXN0ZXJBcHBTdGF0ZVByb21pc2Uoe1xyXG4gICAgLy8gICBzZXE6IDIsXHJcbiAgICAvLyAgIGRlc2NyaXB0aW9uOiByZXNvdXJjZS5waWNrbGlzdHNUZXh0LFxyXG4gICAgLy8gICBpdGVtczogW3tcclxuICAgIC8vICAgICBuYW1lOiAncGlja2xpc3QtcmVxdWVzdHMnLFxyXG4gICAgLy8gICAgIGRlc2NyaXB0aW9uOiByZXNvdXJjZS5yZXRyaWV2aW5nUGlja2xpc3RzVGV4dCxcclxuICAgIC8vICAgICBmbjogKCkgPT4ge1xyXG4gICAgLy8gICAgICAgUGlja2xpc3RTZXJ2aWNlLnJlcXVlc3RQaWNrbGlzdHMoKTtcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICB9XSxcclxuICAgIC8vIH0pO1xyXG4gIH0sXHJcbiAgcmVnaXN0ZXJEZWZhdWx0Vmlld3M6IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdFZpZXdzKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBvcmlnaW5hbEdldERlZmF1bHRWaWV3cyA9IEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXREZWZhdWx0Vmlld3M7XHJcbiAgICBsYW5nLmV4dGVuZChBcHBsaWNhdGlvbiwge1xyXG4gICAgICBnZXREZWZhdWx0Vmlld3M6IGZ1bmN0aW9uIGdldERlZmF1bHRWaWV3cygpIHtcclxuICAgICAgICBjb25zdCB2aWV3cyA9IG9yaWdpbmFsR2V0RGVmYXVsdFZpZXdzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgW107XHJcbiAgICAgICAgc2VsZi5tb2R1bGVzLmZvckVhY2goKG1vZHVsZSkgPT4ge1xyXG4gICAgICAgICAgbW9kdWxlLnJlZ2lzdGVyRGVmYXVsdFZpZXdzKHZpZXdzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmlld3M7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5BcHBsaWNhdGlvbk1vZHVsZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=