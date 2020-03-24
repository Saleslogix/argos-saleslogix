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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import QuotesList from '../Views/Quotes/List';
import SalesOrdersList from '../Views/SalesOrders/List';
import PricingAvailabilityService from '../PricingAvailabilityService';
import getResource from 'argos/I18n';

const resource = getResource('opportunityModule');

const __class = declare('crm.Integrations.BOE.Modules.OpportunityModule', [_Module], {
  addQuoteText: resource.addQuoteText,
  addOrderText: resource.addOrderText,
  relatedERPItemsText: resource.relatedERPItemsText,
  quotesText: resource.quotesText,
  ordersText: resource.ordersText,
  opportunityRefreshPricingText: resource.opportunityRefreshPricingText,

  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new QuotesList({
      id: 'opportunity_quotes_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
      queryOrderBy: 'CreateDate asc',
    }));

    am.registerView(new SalesOrdersList({
      id: 'opportunity_salesorders_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
      queryOrderBy: 'CreateDate asc',
    }));
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;

    lang.extend(crm.Views.Opportunity.Detail, {
      _onAddQuoteClick: function _onAddQuoteClick() {
        const request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService());
        request.setResourceKind('Opportunities');
        request.setOperationName('CreateQuoteFromOpportunity');
        const entry = {
          $name: 'CreateQuoteFromOpportunity',
          request: {
            entity: {
              $key: this.entry.$key,
            },
          },
        };
        request.execute(entry, {
          success: (data) => {
            const view = App.getView('quote_detail');
            view.show({
              key: data.response.Result,
            });
          },
          failure: (xhr) => {
            const response = JSON.parse(xhr.responseText);
            if (response && response.length && response[0].message) {
              alert(response[0].message); // eslint-disable-line
            }
          },
        });
      },
      _onAddOrderClick: function _onAddOrderClick() {
        const request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService());
        request.setResourceKind('Opportunities');
        request.setOperationName('CreateSalesOrderFromOpportunity');

        const entry = {
          $name: 'CreateSalesOrderFromOpportunity',
          request: {
            entity: {
              $key: this.entry.$key,
            },
          },
        };
        request.execute(entry, {
          success: (data) => {
            const view = App.getView('salesorder_detail');
            view.show({
              key: data.response.Result,
            });
          },
          failure: (xhr) => {
            const response = JSON.parse(xhr.responseText);
            if (response && response.length && response[0].message) {
              alert(response[0].message); // eslint-disable-line
            }
          },
        });
      },
      handlePricingSuccess: function handlePricingSuccess(result) {
        this._refreshClicked();
        return result;
      },
      opportunityRePrice: function opportunityRePrice() {
        if (!this.entry) {
          return;
        }

        PricingAvailabilityService.opportunityRePrice(this.entry).then((result) => {
          this.handlePricingSuccess(result);
        });
      },
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
        security: 'Entities/Quote/Add',
      }, {
        name: 'AddOrder',
        property: 'Description',
        label: this.addOrderText,
        iconClass: 'cart',
        action: '_onAddOrderClick',
        security: 'Entities/SalesOrder/Add',
      }],
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
        disabled: () => {
          const boeSettings = App.context.integrationSettings['Back Office Extension'];

          if (boeSettings === null || typeof boeSettings === 'undefined') {
            return true;
          }


          return boeSettings['Local CRM Pricing Opportunity'] === 'True';
        },
      }],
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
            return `Opportunity.Id eq "${entry.$key}"`;
          },
          view: 'opportunity_quotes_related',
        }, {
          name: 'SalesOrders',
          label: this.ordersText,
          where: function where(entry) {
            return `Opportunity.Id eq "${entry.$key}"`;
          },
          view: 'opportunity_salesorders_related',
        }],
      },
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.OpportunityModule', __class);
export default __class;
