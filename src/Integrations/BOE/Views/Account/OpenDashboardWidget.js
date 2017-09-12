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
import convert from 'argos/Convert';
import RelatedViewManager from 'argos/RelatedViewManager';
import DashboardWidget from '../../DashboardWidget';
import getResource from 'argos/I18n';
import format from 'crm/Format';
import aggregate from 'crm/Aggregate';


const resource = getResource('openDashboardWidget');

const __class = declare('crm.Integrations.BOE.Views.Account.OpenDashboardWidget', [DashboardWidget], {
  // Localization
  openSalesOrdersText: resource.openSalesOrdersText,
  openQuotesText: resource.openQuotesText,
  outstandingInvoicesText: resource.outstandingInvoicesText,
  lateInvoicesText: resource.lateInvoicesText,
  lateSalesOrdersText: resource.lateSalesOrdersText,
  agingInvoicesText: resource.agingInvoicesText,
  agingSalesOrdersText: resource.agingSalesOrdersText,
  agingQuotesText: resource.agingQuotesText,
  titleText: resource.titleText,
  categoryText: resource.categoryText,
  quotesTotalingText: resource.quotesTotalingText,
  ordersTotalingText: resource.ordersTotalingText,
  invoicesTotalingText: resource.invoicesTotalingText,

  // crm status for SalesOrder
  openOrderText: resource.openOrderText,
  salesOrderText: resource.salesOrderText,
  salesHoldText: resource.salesHoldText,
  creditHoldText: resource.creditHoldText,
  adminHoldText: resource.adminHoldText,
  holdText: resource.holdText,
  orderedText: resource.orderedText,
  partiallyShippedText: resource.partiallyShippedText,
  pendingText: resource.pendingText,
  newText: resource.newText,
  openText: resource.openText,
  approvedText: resource.approvedText,
  awardedText: resource.awardedText,
  // Override variables for _DashboardWidgetBase
  color: '#313236',
  selectedColor: '#50535a',
  dayValue: 0,

  // Codes used for the status of the entity
  newCode: 'New',
  openCode: 'Open',
  approvedCode: 'Approved',
  workingCode: 'Working',
  partialShipCode: 'PartiallyShipped',
  partialPaidCode: 'PartialPaid',
  closedCode: 'Closed',
  disputeCode: 'Dispute',
  holdCode: 'Hold',
  pendingCode: 'Pending',

  // Values for the metrics
  values: [{
    name: 'quotes',
    aggregate: 'sum',
    aggregateModule: aggregate,
    value: null,
    queryIndex: 0,
    count: true,
    dateDependent: true,
  }, {
    name: 'invoices',
    aggregate: 'sum',
    aggregateModule: aggregate,
    value: null,
    queryIndex: 1,
    count: true,
    dateDependent: true,
  }, {
    name: 'salesOrders',
    aggregate: 'sum',
    aggregateModule: aggregate,
    value: null,
    queryIndex: 2,
    count: true,
    dateDependent: false,
  }],

  resourceKind: 'accounts',
  querySelect: [
    'AccountName',
  ],
  getWhere: function getWhere() {
    return `Id eq '${this.parentEntry.$key}'`;
  },
  // Creates the range widgets, value can have valueUnit to apply next to the number
  createRangeLayout: function createRangeLayout() {
    const rangeLayout = [{
      value: 0,
      valueUnit: '+',
    }, {
      value: 30,
      valueUnit: '+',
    }, {
      value: 60,
      valueUnit: '+',
    }, {
      value: 90,
      valueUnit: '+',
    }, {
      value: 180,
      valueUnit: '+',
    }];
    return rangeLayout;
  },
  createMetricLayout: function createMetricLayout(entry) {
    this.setQueryArgs(entry);

    const metricLayout = [{
      navTo: 'account_openquotes_related',
      formatter: 'bigNumber',
      formatterModule: format,
      title: this.agingQuotesText,
      countTitle: this.quotesTotalingText,
      valueNeeded: 'quotes',
    }, {
      navTo: 'account_lateinvoice_related',
      formatter: 'bigNumber',
      formatterModule: format,
      title: this.agingInvoicesText,
      countTitle: this.invoicesTotalingText,
      valueNeeded: 'invoices',
    }, {
      navTo: 'account_opensalesorders_related',
      formatter: 'bigNumber',
      formatterModule: format,
      title: this.agingSalesOrdersText,
      countTitle: this.ordersTotalingText,
      valueNeeded: 'salesOrders',
    }];

    return metricLayout;
  },
  setQueryArgs: function setQueryArgs(entry) {
    this.queryArgs = [];

    this.queryArgs.push([
      'quotes',
      {
        _activeFilter: `Account.Id eq "${entry.$key}" and ` +
                '(' +
                  '(' +
                    '(ErpExtId ne null) and ' +
                       `(ErpStatus eq "${this.openCode}"` +
                        ` or ErpStatus eq "${this.pendingCode}"` +
                        ` or ErpStatus eq "${this.approvedCode}"` +
                     `) and (${this.pastDays('DocumentDate')})` +
                  ')' +
                  ' or ' +
                  '(' +
                    '(ErpExtId eq null) and ' +
                      `(Status eq "${this.newText}"` +
                       ` or Status eq "${this.openText}"` +
                       ` or Status eq "${this.approvedText}"` +
                       ` or Status eq "${this.pendingText}"` +
                       ` or Status eq "${this.awardedText}"` +
                      `) and (${this.pastDays('StartDate')})` +
                  ')' +
                ')',
        _filterName: 'AccountManager',
        _metricName: 'SumGrandTotal',
      },
    ], [
      'erpInvoices',
      {
        _activeFilter: `Account.Id eq "${entry.$key}" and ` +
           '(' +
            `(ErpStatus eq "${this.openCode}"` +
              ` or ErpStatus eq "${this.partialPaidCode}"` +
              ` or ErpStatus eq "${this.disputeCode}"` +
             ')' +
           `) and ${this.pastDays('ErpDocumentDate')}`,
        _filterName: 'ErpStatus',
        _metricName: 'SumGrandTotal',
      },
    ], [
      'salesOrders',
      {
        _activeFilter: `Account.Id eq "${entry.$key}" and ` +
           '(' +
             '(' +
               '(ErpExtId ne null) and ' +
               '(' +
                 `(ERPSalesOrder.ERPStatus eq "${this.openCode}"` +
                  ` or ERPSalesOrder.ERPStatus eq "${this.holdCode}"` +
                  ` or ERPSalesOrder.ERPStatus eq "${this.partialShipCode}"` +
                  ` or ERPSalesOrder.ERPStatus eq "${this.approvedCode}"` +
                 `) and ${this.pastDays('ErpDocumentDate')  // ' and ' +
                 // '(SalesOrderItems.ErpStatus eq "' + this.openCode + '"' + // This does not work since it creates a cartesion duplicate result for each line
                 //    ' or SalesOrderItems.ErpStatus eq "' + this.partialShipCode + '"' +
                 //    ' or SalesOrderItems.ErpStatus eq "' + this.holdCode + '"' +
                 //  ') and ' +
                 //  this.pastDays('SalesOrderItems.ErpRequiredDeliveryDate') +
                })` +
             ') or ' +
             '((ErpExtId eq null) and ' +
             `(Status eq "${this.openOrderText}"` +
             ` or Status eq "${this.salesOrderText}"` +
             ` or Status eq "${this.salesHoldText}"` +
             ` or Status eq "${this.creditHoldText}"` +
             ` or Status eq "${this.adminHoldText}"` +
             ` or Status eq "${this.holdText}"` +
             ` or Status eq "${this.orderedText}"` +
             ` or Status eq "${this.partiallyShippedText}"` +
             ` or Status eq "${this.pendingText}"` +
             `) and (${this.pastDays('OrderDate')})` +
             ')' +
           ')',
        _filterName: 'AccountManager',
        _metricName: 'SumGrandTotal',
      },
    ]);
    this.setCountTitles();
  },
  setCountTitles: function setCountTitles() {
  },
  pastDays: function pastDays(property) {
    const now = moment();

    if (this.dayValue === 0) {
      return '1 eq 1';
    }
    const pastDay = now.clone().subtract(this.dayValue, 'days').startOf('day');

    const query = `(${property} lt @${convert.toIsoStringFromDate(pastDay.toDate())}@ or (${property} lt @${pastDay.format('YYYY-MM-DDT00:00:00[Z]')}@))`;
    return query;
  },
});
const rvm = new RelatedViewManager();
rvm.registerType('account_open_dashboard_widget', __class);
lang.setObject('icboe.Views.Account.OpenDashboardWidget', __class);
export default __class;
