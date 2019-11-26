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
      this.inherited(init, arguments);

      // App.picklistService = PicklistService;
      App.enableDashboards = this.enableDashboards;
      this.modules = [new _AccountAssociationModule2.default(this), new _AccountModule2.default(this), new _BillToAccountModule2.default(this), new _BillToModule2.default(this), new _ContactModule2.default(this), new _ContactAssociationModule2.default(this), new _HelpModule2.default(this), new _InvoiceLineModule2.default(this), new _InvoiceModule2.default(this), new _OpportunityModule2.default(this), new _PayFromModule2.default(this), new _ProductModule2.default(this), new _QuoteModule2.default(this), new _QuotePersonModule2.default(this), new _QuoteLineModule2.default(this), new _ReceivableLineModule2.default(this), new _ReceivableModule2.default(this), new _ReturnLineModule2.default(this), new _ReturnModule2.default(this), new _SalesOrderItemModule2.default(this), new _SalesOrderModule2.default(this), new _ShipmentLineModule2.default(this), new _ShipmentModule2.default(this), new _ShipToAccountModule2.default(this), new _ShipToModule2.default(this)];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL0FwcGxpY2F0aW9uTW9kdWxlLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJtb2R1bGVzIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsIkFwcCIsImVuYWJsZURhc2hib2FyZHMiLCJmb3JFYWNoIiwibW9kIiwiaW5pdER5bmFtaWMiLCJpc0ludGVncmF0aW9uRW5hYmxlZCIsInJlc3VsdHMiLCJhcHBsaWNhdGlvbiIsImNvbnRleHQiLCJpbnRlZ3JhdGlvbnMiLCJmaWx0ZXIiLCJpbnRlZ3JhdGlvbiIsIk5hbWUiLCJFbmFibGVkIiwibG9hZFZpZXdzRHluYW1pYyIsIm1vZHVsZSIsImxvYWRWaWV3cyIsImxvYWRDdXN0b21pemF0aW9uc0R5bmFtaWMiLCJsb2FkQ3VzdG9taXphdGlvbnMiLCJyZWdpc3RlckRlZmF1bHRWaWV3cyIsImV4dGVuZCIsImFyZ29zIiwiX0xpc3RCYXNlIiwibmF2aWdhdGVUb0luc2VydFZpZXciLCJhZGRpdGlvbmFsT3B0aW9ucyIsInZpZXciLCJhcHAiLCJnZXRWaWV3IiwiaW5zZXJ0VmlldyIsImVkaXRWaWV3Iiwib3B0aW9ucyIsImRldGFpbFZpZXciLCJyZXR1cm5UbyIsImlkIiwiaW5zZXJ0Iiwic2VsZWN0ZWRFbnRyeSIsIm1peGluIiwic2hvdyIsIl9FZGl0QmFzZSIsIm9uSW5zZXJ0Q29tcGxldGVkIiwiZW50cnkiLCJrZXkiLCIka2V5IiwidGl0bGUiLCIkZGVzY3JpcHRvciIsImRlc2NyaXB0aW9uIiwid2luZG93IiwibG9jYXRpb24iLCJoYXNoIiwiUmVVSSIsImJhY2siLCJjcm0iLCJWaWV3cyIsIk1ldHJpY1dpZGdldCIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwic2V0VmFsdWVDb2xvciIsImNvbG9yIiwidmFsdWVDb2xvciIsImdldFZhbHVlU3R5bGUiLCJUYWJXaWRnZXQiLCJ0YWJMaXN0SXRlbVRlbXBsYXRlIiwib3JpZ2luYWxNYXBwaW5ncyIsInByb3RvdHlwZSIsImVudGl0eU1hcHBpbmdzIiwib3JpZ2luYWxUZXh0IiwiZW50aXR5VGV4dCIsIk9iamVjdCIsImFzc2lnbiIsIkVSUFNoaXBtZW50IiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJTYWxlc09yZGVyIiwiRVJQUmVjZWl2YWJsZSIsIlF1b3RlIiwiRVJQSW52b2ljZSIsImljb25DbGFzcyIsImxvYWRUb29sYmFyc0R5bmFtaWMiLCJsb2FkVG9vbGJhcnMiLCJsb2FkQXBwU3RhdGVQcm9taXNlcyIsInNlbGYiLCJvcmlnaW5hbEdldERlZmF1bHRWaWV3cyIsImdldERlZmF1bHRWaWV3cyIsInZpZXdzIiwiYXBwbHkiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4REE7O0FBL0JBO0FBL0JBOzs7Ozs7Ozs7Ozs7Ozs7QUFnRUEsTUFBTUEsVUFBVSx1QkFBUSx3Q0FBUixFQUFrRCw2QkFBbEQsRUFBdUU7QUFDckZDLGFBQVMsSUFENEU7QUFFckZDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixXQUFLQyxTQUFMLENBQWVELElBQWYsRUFBcUJFLFNBQXJCOztBQUVBO0FBQ0FDLFVBQUlDLGdCQUFKLEdBQXVCLEtBQUtBLGdCQUE1QjtBQUNBLFdBQUtMLE9BQUwsR0FBZSxDQUNiLHVDQUE2QixJQUE3QixDQURhLEVBRWIsNEJBQWtCLElBQWxCLENBRmEsRUFHYixrQ0FBd0IsSUFBeEIsQ0FIYSxFQUliLDJCQUFpQixJQUFqQixDQUphLEVBS2IsNEJBQWtCLElBQWxCLENBTGEsRUFNYix1Q0FBNkIsSUFBN0IsQ0FOYSxFQU9iLHlCQUFlLElBQWYsQ0FQYSxFQVFiLGdDQUFzQixJQUF0QixDQVJhLEVBU2IsNEJBQWtCLElBQWxCLENBVGEsRUFVYixnQ0FBc0IsSUFBdEIsQ0FWYSxFQVdiLDRCQUFrQixJQUFsQixDQVhhLEVBWWIsNEJB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O0FBQ2hDO0FBQ0Q7O0FBRUQsV0FBS1QsT0FBTCxDQUFhTSxPQUFiLENBQXFCLFVBQUNhLE1BQUQsRUFBWTtBQUMvQkEsZUFBTzhELFlBQVA7QUFDRCxPQUZEO0FBR0QsS0ExTG9GO0FBMkxyRkMsMEJBQXNCLFNBQVNBLG9CQUFULEdBQWdDO0FBQ3BELFdBQUtoRixTQUFMLENBQWVnRixvQkFBZixFQUFxQy9FLFNBQXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELEtBeE1vRjtBQXlNckZvQiwwQkFBc0IsU0FBU0Esb0JBQVQsR0FBZ0M7QUFDcEQsVUFBTTRELE9BQU8sSUFBYjtBQUNBLFVBQU1DLDBCQUEwQixzQkFBWWpCLFNBQVosQ0FBc0JrQixlQUF0RDtBQUNBLHFCQUFLN0QsTUFBTCx3QkFBeUI7QUFDdkI2RCx5QkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxjQUFNQyxRQUFRRix3QkFBd0JHLEtBQXhCLENBQThCLElBQTlCLEVBQW9DcEYsU0FBcEMsS0FBa0QsRUFBaEU7QUFDQWdGLGVBQUtuRixPQUFMLENBQWFNLE9BQWIsQ0FBcUIsVUFBQ2EsTUFBRCxFQUFZO0FBQy9CQSxtQkFBT0ksb0JBQVAsQ0FBNEIrRCxLQUE1QjtBQUNELFdBRkQ7QUFHQSxpQkFBT0EsS0FBUDtBQUNEO0FBUHNCLE9BQXpCO0FBU0Q7QUFyTm9GLEdBQXZFLENBQWhCOztBQXdOQSxpQkFBS0UsU0FBTCxDQUFlLHlCQUFmLEVBQTBDekYsT0FBMUM7b0JBQ2VBLE8iLCJmaWxlIjoiQXBwbGljYXRpb25Nb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICdhcmdvcy9BcHBsaWNhdGlvbic7XHJcbmltcG9ydCBBcHBsaWNhdGlvbk1vZHVsZSBmcm9tICdhcmdvcy9BcHBsaWNhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCBBY2NvdW50QXNzb2NpYXRpb25Nb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL0FjY291bnRBc3NvY2lhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCBBY2NvdW50TW9kdWxlIGZyb20gJy4vTW9kdWxlcy9BY2NvdW50TW9kdWxlJztcclxuaW1wb3J0IEJpbGxUb0FjY291bnRNb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL0JpbGxUb0FjY291bnRNb2R1bGUnO1xyXG5pbXBvcnQgQmlsbFRvTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9CaWxsVG9Nb2R1bGUnO1xyXG5pbXBvcnQgQ29udGFjdE1vZHVsZSBmcm9tICcuL01vZHVsZXMvQ29udGFjdE1vZHVsZSc7XHJcbmltcG9ydCBDb250YWN0QXNzb2NpYXRpb25Nb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL0NvbnRhY3RBc3NvY2lhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCBIZWxwTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9IZWxwTW9kdWxlJztcclxuaW1wb3J0IEludm9pY2VMaW5lTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9JbnZvaWNlTGluZU1vZHVsZSc7XHJcbmltcG9ydCBJbnZvaWNlTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9JbnZvaWNlTW9kdWxlJztcclxuaW1wb3J0IE9wcG9ydHVuaXR5TW9kdWxlIGZyb20gJy4vTW9kdWxlcy9PcHBvcnR1bml0eU1vZHVsZSc7XHJcbmltcG9ydCBQYXlGcm9tTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9QYXlGcm9tTW9kdWxlJztcclxuLy8gaW1wb3J0IFBpY2tsaXN0U2VydmljZSBmcm9tICcuL1BpY2tsaXN0U2VydmljZSc7XHJcbmltcG9ydCBQcm9kdWN0TW9kdWxlIGZyb20gJy4vTW9kdWxlcy9Qcm9kdWN0TW9kdWxlJztcclxuaW1wb3J0IFF1b3RlTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9RdW90ZU1vZHVsZSc7XHJcbmltcG9ydCBRdW90ZVBlcnNvbk1vZHVsZSBmcm9tICcuL01vZHVsZXMvUXVvdGVQZXJzb25Nb2R1bGUnO1xyXG5pbXBvcnQgUXVvdGVMaW5lTW9kdWxlIGZyb20gJy4vTW9kdWxlcy9RdW90ZUxpbmVNb2R1bGUnO1xyXG5pbXBvcnQgUmVjZWl2YWJsZUxpbmVNb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL1JlY2VpdmFibGVMaW5lTW9kdWxlJztcclxuaW1wb3J0IFJlY2VpdmFibGVNb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL1JlY2VpdmFibGVNb2R1bGUnO1xyXG5pbXBvcnQgUmV0dXJuTGluZU1vZHVsZSBmcm9tICcuL01vZHVsZXMvUmV0dXJuTGluZU1vZHVsZSc7XHJcbmltcG9ydCBSZXR1cm5Nb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL1JldHVybk1vZHVsZSc7XHJcbmltcG9ydCBTYWxlc09yZGVySXRlbU1vZHVsZSBmcm9tICcuL01vZHVsZXMvU2FsZXNPcmRlckl0ZW1Nb2R1bGUnO1xyXG5pbXBvcnQgU2FsZXNPcmRlck1vZHVsZSBmcm9tICcuL01vZHVsZXMvU2FsZXNPcmRlck1vZHVsZSc7XHJcbmltcG9ydCBTaGlwbWVudExpbmVNb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL1NoaXBtZW50TGluZU1vZHVsZSc7XHJcbmltcG9ydCBTaGlwbWVudE1vZHVsZSBmcm9tICcuL01vZHVsZXMvU2hpcG1lbnRNb2R1bGUnO1xyXG5pbXBvcnQgU2hpcFRvQWNjb3VudE1vZHVsZSBmcm9tICcuL01vZHVsZXMvU2hpcFRvQWNjb3VudE1vZHVsZSc7XHJcbmltcG9ydCBTaGlwVG9Nb2R1bGUgZnJvbSAnLi9Nb2R1bGVzL1NoaXBUb01vZHVsZSc7XHJcbmltcG9ydCBSZWNlbnRseVZpZXdlZExpc3QgZnJvbSAnLi4vLi4vVmlld3MvUmVjZW50bHlWaWV3ZWQvTGlzdCc7XHJcblxyXG5pbXBvcnQgJy4vTW9kZWxzL1N5bmNSZXN1bHQvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvU3luY1Jlc3VsdC9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvQmFja09mZmljZS9PZmZsaW5lJztcclxuaW1wb3J0ICcuL01vZGVscy9CYWNrT2ZmaWNlL1NEYXRhJztcclxuaW1wb3J0ICcuL01vZGVscy9CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eS9PZmZsaW5lJztcclxuaW1wb3J0ICcuL01vZGVscy9CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eS9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvTG9jYXRpb24vT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvTG9jYXRpb24vU0RhdGEnO1xyXG5pbXBvcnQgJy4vTW9kZWxzL09wZXJhdGluZ0NvbXBhbnkvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvT3BlcmF0aW5nQ29tcGFueS9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvVW5pdE9mTWVhc3VyZS9PZmZsaW5lJztcclxuaW1wb3J0ICcuL01vZGVscy9Vbml0T2ZNZWFzdXJlL1NEYXRhJztcclxuaW1wb3J0ICdhcmdvcy9UYWJXaWRnZXQnO1xyXG5cclxuLy8gY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaWNib2VBcHBsaWNhdGlvbk1vZHVsZScpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLkFwcGxpY2F0aW9uTW9kdWxlJywgW0FwcGxpY2F0aW9uTW9kdWxlXSwge1xyXG4gIG1vZHVsZXM6IG51bGwsXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGluaXQsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgLy8gQXBwLnBpY2tsaXN0U2VydmljZSA9IFBpY2tsaXN0U2VydmljZTtcclxuICAgIEFwcC5lbmFibGVEYXNoYm9hcmRzID0gdGhpcy5lbmFibGVEYXNoYm9hcmRzO1xyXG4gICAgdGhpcy5tb2R1bGVzID0gW1xyXG4gICAgICBuZXcgQWNjb3VudEFzc29jaWF0aW9uTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgQWNjb3VudE1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IEJpbGxUb0FjY291bnRNb2R1bGUodGhpcyksXHJcbiAgICAgIG5ldyBCaWxsVG9Nb2R1bGUodGhpcyksXHJcbiAgICAgIG5ldyBDb250YWN0TW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgQ29udGFjdEFzc29jaWF0aW9uTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgSGVscE1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IEludm9pY2VMaW5lTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgSW52b2ljZU1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IE9wcG9ydHVuaXR5TW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgUGF5RnJvbU1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFByb2R1Y3RNb2R1bGUodGhpcyksXHJcbiAgICAgIG5ldyBRdW90ZU1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFF1b3RlUGVyc29uTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgUXVvdGVMaW5lTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgUmVjZWl2YWJsZUxpbmVNb2R1bGUodGhpcyksXHJcbiAgICAgIG5ldyBSZWNlaXZhYmxlTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgUmV0dXJuTGluZU1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFJldHVybk1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFNhbGVzT3JkZXJJdGVtTW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgU2FsZXNPcmRlck1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFNoaXBtZW50TGluZU1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFNoaXBtZW50TW9kdWxlKHRoaXMpLFxyXG4gICAgICBuZXcgU2hpcFRvQWNjb3VudE1vZHVsZSh0aGlzKSxcclxuICAgICAgbmV3IFNoaXBUb01vZHVsZSh0aGlzKSxcclxuICAgIF07XHJcblxyXG4gICAgdGhpcy5tb2R1bGVzLmZvckVhY2goKG1vZCkgPT4ge1xyXG4gICAgICBtb2QuaW5pdCgpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBpbml0RHluYW1pYzogZnVuY3Rpb24gaW5pdER5bmFtaWMoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnRlZ3JhdGlvbkVuYWJsZWQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2R1bGVzLmZvckVhY2goKG1vZCkgPT4ge1xyXG4gICAgICBtb2QuaW5pdER5bmFtaWMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKGluaXREeW5hbWljLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgaXNJbnRlZ3JhdGlvbkVuYWJsZWQ6IGZ1bmN0aW9uIGlzSW50ZWdyYXRpb25FbmFibGVkKCkge1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5pbnRlZ3JhdGlvbnMuZmlsdGVyKGludGVncmF0aW9uID0+IGludGVncmF0aW9uLk5hbWUgPT09ICdCYWNrIE9mZmljZSBFeHRlbnNpb24nKVswXTtcclxuICAgIHJldHVybiByZXN1bHRzICYmIHJlc3VsdHMuRW5hYmxlZDtcclxuICB9LFxyXG4gIGxvYWRWaWV3c0R5bmFtaWM6IGZ1bmN0aW9uIGxvYWRWaWV3c0R5bmFtaWMoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnRlZ3JhdGlvbkVuYWJsZWQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2R1bGVzLmZvckVhY2goKG1vZHVsZSkgPT4ge1xyXG4gICAgICBtb2R1bGUubG9hZFZpZXdzKCk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGxvYWRDdXN0b21pemF0aW9uc0R5bmFtaWM6IGZ1bmN0aW9uIGxvYWRDdXN0b21pemF0aW9ucygpIHtcclxuICAgIGlmICghdGhpcy5pc0ludGVncmF0aW9uRW5hYmxlZCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZHVsZXMuZm9yRWFjaCgobW9kdWxlKSA9PiB7XHJcbiAgICAgIG1vZHVsZS5sb2FkQ3VzdG9taXphdGlvbnMoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZWdpc3RlckRlZmF1bHRWaWV3cygpO1xyXG5cclxuICAgIGxhbmcuZXh0ZW5kKGFyZ29zLl9MaXN0QmFzZSwgeyAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgICAgbmF2aWdhdGVUb0luc2VydFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9JbnNlcnRWaWV3KGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuYXBwLmdldFZpZXcodGhpcy5pbnNlcnRWaWV3IHx8IHRoaXMuZWRpdFZpZXcpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgZGV0YWlsVmlldzogdGhpcy5kZXRhaWxWaWV3LFxyXG4gICAgICAgICAgcmV0dXJuVG86IHRoaXMuaWQsXHJcbiAgICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gUGFzcyBhbG9uZyB0aGUgc2VsZWN0ZWQgZW50cnkgKHJlbGF0ZWQgbGlzdCBjb3VsZCBnZXQgaXQgZnJvbSBhIHF1aWNrIGFjdGlvbilcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNlbGVjdGVkRW50cnkpIHtcclxuICAgICAgICAgIG9wdGlvbnMuc2VsZWN0ZWRFbnRyeSA9IHRoaXMub3B0aW9ucy5zZWxlY3RlZEVudHJ5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICAgICAgICBvcHRpb25zID0gbGFuZy5taXhpbihvcHRpb25zLCBhZGRpdGlvbmFsT3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGxhbmcuZXh0ZW5kKGFyZ29zLl9FZGl0QmFzZSwgeyAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgICAgb25JbnNlcnRDb21wbGV0ZWQ6IGZ1bmN0aW9uIG9uSW5zZXJ0Q29tcGxldGVkKGVudHJ5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZGV0YWlsVmlldykge1xyXG4gICAgICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMub3B0aW9ucy5kZXRhaWxWaWV3KTtcclxuICAgICAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgICAgICAga2V5OiBlbnRyeS4ka2V5LFxyXG4gICAgICAgICAgICAgIHRpdGxlOiBlbnRyeS4kZGVzY3JpcHRvcixcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZW50cnkuJGRlc2NyaXB0b3IsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICByZXR1cm5UbzogLTEsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5yZXR1cm5Ubykge1xyXG4gICAgICAgICAgY29uc3QgcmV0dXJuVG8gPSB0aGlzLm9wdGlvbnMucmV0dXJuVG87XHJcbiAgICAgICAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcocmV0dXJuVG8pO1xyXG4gICAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgdmlldy5zaG93KCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHJldHVyblRvO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBSZVVJLmJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW5nLmV4dGVuZChjcm0uVmlld3MuTWV0cmljV2lkZ2V0LCB7XHJcbiAgICAgIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyaWMtdGl0bGVcIj57JTogJCQudGl0bGUgJX08L3NwYW4+JyxcclxuICAgICAgICAnPGgxIGNsYXNzPVwibWV0cmljLXZhbHVlXCIgeyU6ICQkLmdldFZhbHVlU3R5bGUoKSAlfSA+eyU6ICQkLmZvcm1hdHRlcigkLnZhbHVlKSAlfTwvaDE+JyxcclxuICAgICAgXSksXHJcbiAgICAgIHNldFZhbHVlQ29sb3I6IGZ1bmN0aW9uIHNldFZhbHVlQ29sb3IoY29sb3IpIHtcclxuICAgICAgICB0aGlzLnZhbHVlQ29sb3IgPSBjb2xvcjtcclxuICAgICAgfSxcclxuICAgICAgZ2V0VmFsdWVTdHlsZTogZnVuY3Rpb24gZ2V0VmFsdWVTdHlsZSgpIHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZUNvbG9yKSB7XHJcbiAgICAgICAgICByZXR1cm4gYHN0eWxlPWNvbG9yOiR7dGhpcy52YWx1ZUNvbG9yfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGxhbmcuZXh0ZW5kKGFyZ29zLlRhYldpZGdldCwgeyAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgICAgdGFiTGlzdEl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICAgICAnPGxpIGRhdGEta2V5PVwieyU6ICQubmFtZSAlfVwiIGNsYXNzPVwidGFiXCIgcm9sZT1cInByZXNlbnRhdGlvblwiIGRhdGEtYWN0aW9uPVwic2VsZWN0ZWRUYWJcIj4nLFxyXG4gICAgICAgICc8YSBocmVmPVwiI3slOiAkJC5pZCAlfV97JTogJC5uYW1lICV9XCI+eyU6ICgkLnRpdGxlIHx8ICQub3B0aW9ucy50aXRsZSkgJX08L2E+JyxcclxuICAgICAgICAnPC9saT4nLFxyXG4gICAgICBdKSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJlY2VudGx5IHZpZXdlZCBzdXBwb3J0XHJcbiAgICBjb25zdCBvcmlnaW5hbE1hcHBpbmdzID0gUmVjZW50bHlWaWV3ZWRMaXN0LnByb3RvdHlwZS5lbnRpdHlNYXBwaW5ncztcclxuICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IFJlY2VudGx5Vmlld2VkTGlzdC5wcm90b3R5cGUuZW50aXR5VGV4dDtcclxuXHJcbiAgICBSZWNlbnRseVZpZXdlZExpc3QucHJvdG90eXBlLmVudGl0eVRleHQgPSBPYmplY3QuYXNzaWduKHt9LCBvcmlnaW5hbFRleHQsIHtcclxuICAgICAgRVJQU2hpcG1lbnQ6IGdldFJlc291cmNlKCdlcnBTaGlwbWVudE1vZGVsJykuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIFNhbGVzT3JkZXI6IGdldFJlc291cmNlKCdzYWxlc09yZGVyTW9kZWwnKS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgRVJQUmVjZWl2YWJsZTogZ2V0UmVzb3VyY2UoJ2VycFJlY2VpdmFibGVNb2RlbCcpLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICBRdW90ZTogZ2V0UmVzb3VyY2UoJ3F1b3RlTW9kZWwnKS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgRVJQSW52b2ljZTogZ2V0UmVzb3VyY2UoJ2VycEludm9pY2VNb2RlbCcpLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgfSk7XHJcblxyXG4gICAgUmVjZW50bHlWaWV3ZWRMaXN0LnByb3RvdHlwZS5lbnRpdHlNYXBwaW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIG9yaWdpbmFsTWFwcGluZ3MsIHtcclxuICAgICAgRVJQU2hpcG1lbnQ6IHtcclxuICAgICAgICBpY29uQ2xhc3M6ICd3YXJlaG91c2UnLFxyXG4gICAgICB9LFxyXG4gICAgICBTYWxlc09yZGVyOiB7XHJcbiAgICAgICAgaWNvbkNsYXNzOiAnY2FydCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIEVSUFJlY2VpdmFibGU6IHtcclxuICAgICAgICBpY29uQ2xhc3M6ICdjaGVja2JveCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIFF1b3RlOiB7XHJcbiAgICAgICAgaWNvbkNsYXNzOiAnZG9jdW1lbnQnLFxyXG4gICAgICB9LFxyXG4gICAgICBFUlBJbnZvaWNlOiB7XHJcbiAgICAgICAgaWNvbkNsYXNzOiAnZG9jdW1lbnQyJyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgbG9hZFRvb2xiYXJzRHluYW1pYzogZnVuY3Rpb24gbG9hZFRvb2xiYXJzKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzSW50ZWdyYXRpb25FbmFibGVkKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW9kdWxlcy5mb3JFYWNoKChtb2R1bGUpID0+IHtcclxuICAgICAgbW9kdWxlLmxvYWRUb29sYmFycygpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBsb2FkQXBwU3RhdGVQcm9taXNlczogZnVuY3Rpb24gbG9hZEFwcFN0YXRlUHJvbWlzZXMoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChsb2FkQXBwU3RhdGVQcm9taXNlcywgYXJndW1lbnRzKTtcclxuICAgIC8vIHRoaXMucmVnaXN0ZXJBcHBTdGF0ZVByb21pc2Uoe1xyXG4gICAgLy8gICBzZXE6IDIsXHJcbiAgICAvLyAgIGRlc2NyaXB0aW9uOiByZXNvdXJjZS5waWNrbGlzdHNUZXh0LFxyXG4gICAgLy8gICBpdGVtczogW3tcclxuICAgIC8vICAgICBuYW1lOiAncGlja2xpc3QtcmVxdWVzdHMnLFxyXG4gICAgLy8gICAgIGRlc2NyaXB0aW9uOiByZXNvdXJjZS5yZXRyaWV2aW5nUGlja2xpc3RzVGV4dCxcclxuICAgIC8vICAgICBmbjogKCkgPT4ge1xyXG4gICAgLy8gICAgICAgUGlja2xpc3RTZXJ2aWNlLnJlcXVlc3RQaWNrbGlzdHMoKTtcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICB9XSxcclxuICAgIC8vIH0pO1xyXG4gIH0sXHJcbiAgcmVnaXN0ZXJEZWZhdWx0Vmlld3M6IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdFZpZXdzKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBvcmlnaW5hbEdldERlZmF1bHRWaWV3cyA9IEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXREZWZhdWx0Vmlld3M7XHJcbiAgICBsYW5nLmV4dGVuZChBcHBsaWNhdGlvbiwge1xyXG4gICAgICBnZXREZWZhdWx0Vmlld3M6IGZ1bmN0aW9uIGdldERlZmF1bHRWaWV3cygpIHtcclxuICAgICAgICBjb25zdCB2aWV3cyA9IG9yaWdpbmFsR2V0RGVmYXVsdFZpZXdzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgW107XHJcbiAgICAgICAgc2VsZi5tb2R1bGVzLmZvckVhY2goKG1vZHVsZSkgPT4ge1xyXG4gICAgICAgICAgbW9kdWxlLnJlZ2lzdGVyRGVmYXVsdFZpZXdzKHZpZXdzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmlld3M7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5BcHBsaWNhdGlvbk1vZHVsZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=