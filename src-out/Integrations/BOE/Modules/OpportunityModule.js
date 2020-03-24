define('crm/Integrations/BOE/Modules/OpportunityModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/Quotes/List', '../Views/SalesOrders/List', '../PricingAvailabilityService', 'argos/I18n'], function (module, exports, _declare, _lang, _Module2, _List, _List3, _PricingAvailabilityService, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

  var _PricingAvailabilityService2 = _interopRequireDefault(_PricingAvailabilityService);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('opportunityModule'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.OpportunityModule', [_Module3.default], {
    addQuoteText: resource.addQuoteText,
    addOrderText: resource.addOrderText,
    relatedERPItemsText: resource.relatedERPItemsText,
    quotesText: resource.quotesText,
    ordersText: resource.ordersText,
    opportunityRefreshPricingText: resource.opportunityRefreshPricingText,

    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _List2.default({
        id: 'opportunity_quotes_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));

      am.registerView(new _List4.default({
        id: 'opportunity_salesorders_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;

      _lang2.default.extend(crm.Views.Opportunity.Detail, {
        _onAddQuoteClick: function _onAddQuoteClick() {
          var request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService());
          request.setResourceKind('Opportunities');
          request.setOperationName('CreateQuoteFromOpportunity');
          var entry = {
            $name: 'CreateQuoteFromOpportunity',
            request: {
              entity: {
                $key: this.entry.$key
              }
            }
          };
          request.execute(entry, {
            success: function success(data) {
              var view = App.getView('quote_detail');
              view.show({
                key: data.response.Result
              });
            },
            failure: function failure() {}
          });
        },
        _onAddOrderClick: function _onAddOrderClick() {
          var request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService());
          request.setResourceKind('Opportunities');
          request.setOperationName('CreateSalesOrderFromOpportunity');

          var entry = {
            $name: 'CreateSalesOrderFromOpportunity',
            request: {
              entity: {
                $key: this.entry.$key
              }
            }
          };
          request.execute(entry, {
            success: function success(data) {
              var view = App.getView('salesorder_detail');
              view.show({
                key: data.response.Result
              });
            },
            failure: function failure() {}
          });
        },
        handlePricingSuccess: function handlePricingSuccess(result) {
          this._refreshClicked();
          return result;
        },
        opportunityRePrice: function opportunityRePrice() {
          var _this = this;

          if (!this.entry) {
            return;
          }

          _PricingAvailabilityService2.default.opportunityRePrice(this.entry).then(function (result) {
            _this.handlePricingSuccess(result);
          });
        }
      });

      /*
       * Quick Actions
       */
      am.registerCustomization('detail', 'opportunity_detail', {
        at: function at(row) {
          return row.name === 'AddNoteAction';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'AddQuote',
          property: 'Description',
          label: this.addQuoteText,
          iconClass: 'document',
          action: '_onAddQuoteClick',
          security: 'Entities/Quote/Add'
        }, {
          name: 'AddOrder',
          property: 'Description',
          label: this.addOrderText,
          iconClass: 'cart',
          action: '_onAddOrderClick',
          security: 'Entities/SalesOrder/Add'
        }]
      });

      am.registerCustomization('detail', 'opportunity_detail', {
        at: function at(row) {
          return row.name === 'AddNoteAction';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'RefreshPricing',
          property: 'Description',
          label: this.opportunityRefreshPricingText,
          iconClass: 'finance',
          action: 'opportunityRePrice',
          security: 'Entities/Opportunity/Add',
          disabled: function disabled() {
            var boeSettings = App.context.integrationSettings['Back Office Extension'];

            if (boeSettings === null || typeof boeSettings === 'undefined') {
              return true;
            }

            return boeSettings['Local CRM Pricing Opportunity'] === 'True';
          }
        }]
      });

      /*
       * Related Items
       */
      am.registerCustomization('detail', 'opportunity_detail', {
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
              return 'Opportunity.Id eq "' + entry.$key + '"';
            },
            view: 'opportunity_quotes_related'
          }, {
            name: 'SalesOrders',
            label: this.ordersText,
            where: function where(entry) {
              return 'Opportunity.Id eq "' + entry.$key + '"';
            },
            view: 'opportunity_salesorders_related'
          }]
        }
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.OpportunityModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});