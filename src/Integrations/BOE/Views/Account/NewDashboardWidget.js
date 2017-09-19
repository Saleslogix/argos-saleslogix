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


const resource = getResource('newDashboardWidget');

const __class = declare('crm.Integrations.BOE.Views.Account.NewDashboardWidget', [DashboardWidget], {
  // Localization
  newQuotesText: resource.newQuotesText,
  newOrdersText: resource.newOrdersText,
  newShipmentsText: resource.newShipmentsText,
  newInvoicesText: resource.newInvoicesText,
  newReceivablesText: resource.newReceivablesText,
  titleText: resource.titleText,
  categoryText: resource.categoryText,
  quotesTotalingText: resource.quotesTotalingText,
  ordersTotalingText: resource.ordersTotalingText,
  shipmentsTotalingText: resource.shipmentsTotalingText,
  invoicesTotalingText: resource.invoicesTotalingText,
  receivablesTotalingText: resource.receivablesTotalingText,

  // Override variables for _DashboardWidgetBase
  color: '#313236',
  selectedColor: '#50535a',
  dayValue: 7,

  // crm status for SalesOrder
  closedText: resource.closedText,
  deletedText: resource.deletedText,
  replacedText: resource.replacedText,
  canceledText: resource.canceledText,
  unapprovedText: resource.unapprovedText,

  // Codes used for the status of the entity
  openCode: 'New',
  closedCode: 'Closed',
  replacedCode: 'Replaced',
  cancledCode: 'Canceled',
  deletedCode: 'Deleted',
  voidCode: 'Void',
  proformaCode: 'Proforma',
  unapprovedCode: 'Unapproved',
  holdCode: 'Hold',
  disputeCode: 'Dispute',
  writeOffCode: 'WriteOff',

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
    name: 'salesOrders',
    aggregate: 'sum',
    aggregateModule: aggregate,
    value: null,
    queryIndex: 1,
    count: true,
    dateDependent: true,
  }, {
    name: 'shipments',
    aggregate: 'sum',
    aggregateModule: aggregate,
    value: null,
    queryIndex: 2,
    count: true,
    dateDependent: true,
  }, {
    name: 'invoices',
    aggregate: 'sum',
    aggregateModule: aggregate,
    value: null,
    queryIndex: 3,
    count: true,
    dateDependent: true,
  }, {
    name: 'receivables',
    aggregate: 'sum',
    aggregateModule: aggregate,
    value: null,
    queryIndex: 4,
    count: true,
    dateDependent: false,
  }],

  resourceKind: 'accounts',
  querySelect: [
    'AccountName',
  ],
  queryArgs: null,
  getWhere: function getWhere() {
    return `Id eq '${this.parentEntry.$key}'`;
  },
  // Creates the range widgets, timespan is based on three categories: d - day, m - month, y - year
  createRangeLayout: function createRangeLayout() {
    const rangeLayout = [{
      value: 7,
    }, {
      value: 14,
    }, {
      value: 30,
    }, {
      value: 90,
    }];
    return rangeLayout;
  },
  createMetricLayout: function createMetricLayout(entry) {
    this.setQueryArgs(entry);

    const metricLayout = [{
      navTo: 'account_newquotes_related',
      formatter: 'bigNumber',
      formatterModule: format,
      title: this.newQuotesText,
      countTitle: this.quotesTotalingText,
      valueNeeded: 'quotes',
    }, {
      navTo: 'account_neworders_related',
      formatter: 'bigNumber',
      formatterModule: format,
      title: this.newOrdersText,
      countTitle: this.ordersTotalingText,
      valueNeeded: 'salesOrders',
    }, {
      navTo: 'account_newerpshipments_related',
      formatter: 'bigNumber',
      formatterModule: format,
      title: this.newShipmentsText,
      countTitle: this.shipmentsTotalingText,
      valueNeeded: 'shipments',
    }, {
      navTo: 'account_newerpinvoice_related',
      formatter: 'bigNumber',
      formatterModule: format,
      title: this.newInvoicesText,
      countTitle: this.invoicesTotalingText,
      valueNeeded: 'invoices',
    }, {
      navTo: 'account_newerpreceivables_related',
      formatter: 'bigNumber',
      formatterModule: format,
      title: this.newReceivablesText,
      countTitle: this.receivablesTotalingText,
      valueNeeded: 'receivables',
    }];

    return metricLayout;
  },
  setQueryArgs: function setQueryArgs(entry) {
    this.queryArgs = [];

    this.queryArgs.push([
      'quotes',
      {
        _activeFilter: `Account.Id eq "${entry.$key}" and` +
           '(' +
             '((ErpExtId ne null) and ' +
                `(ErpStatus ne "${this.replacedCode}") and ` +
                `(ErpStatus ne "${this.cancledCode}") and ` +
                `(ErpStatus ne "${this.deletedCode}") and ` +
               `(${this.pastDays('DocumentDate')})` +
             ')' +
             ' or ' +
             '((ErpExtId eq null) and ' +
               '(' +
                 `(Status ne "${this.closedText}") and ` +
                 `(Status ne "${this.cancledText}") and ` +
                 `(Status ne "${this.replacedText}") and ` +
                 `(Status ne "${this.deletedText}") and ` +
                 `(Status ne "${this.unapprovedText}") and ` +
                 `(${this.pastDays('StartDate')})` +
                ')' +
             ')' +
           ')',
        _filterName: 'AccountManager',
        _metricName: 'SumGrandTotal',
      },
    ], [
      'salesOrders',
      {
        _activeFilter: `Account.Id eq "${entry.$key}" and IsQuote eq false and ` +
                '(' +
                  '((ErpExtId ne null) and ' +
                    `(ERPSalesOrder.ERPStatus ne "${this.cancledCode}") and ` +
                    `(ERPSalesOrder.ERPStatus ne "${this.deletedCode}") and ` +
                    `(ERPSalesOrder.ERPStatus ne "${this.unapprovedCode}") and ` +
                    `(${this.pastDays('ErpDocumentDate')})` +
                  ')' +
                  ' or ' +
                  '((ErpExtId eq null) and ' +
                    `(Status ne "${this.closedText}") and ` +
                    `(Status ne "${this.cancledText}") and ` +
                    `(Status ne "${this.deletedText}") and ` +
                    `(Status ne "${this.replacedText}") and ` +
                    `(Status ne "${this.unapprovedText}") and ` +
                    `(${this.pastDays('OrderDate')})` +
                   ')' +
                 ')',
        _filterName: 'AccountManager',
        _metricName: 'SumGrandTotal',
      },
    ], [
      'erpShipments',
      {
        _activeFilter: `Account.Id eq "${entry.$key}" and ` +
             `ErpStatus ne "${this.cancledCode}" and ` +
             `ErpStatus ne "${this.deletedCode}" and ` +
             `ErpStatus ne "${this.holdCode}" and ${
             this.pastDays('ErpDocumentDate')}`,
        _filterName: 'ERPStatus',
        _metricName: 'SumTotalAmount',
      },
    ], [
      'erpInvoices',
      {
        _activeFilter: `Account.Id eq "${entry.$key}" and ` +
             `ErpStatus ne "${this.proformaCode}" and ` +
             `ErpStatus ne "${this.voidCode}" and ` +
             `ErpStatus ne "${this.disputeCode}" and ` +
             `ErpStatus ne "${this.writeOffCode}" and ${
             this.pastDays('ErpDocumentDate')}`,
        _filterName: 'ErpStatus',
        _metricName: 'SumGrandTotal',
      },
    ], [
      'erpReceivables',
      {
        _activeFilter: `Account.Id eq "${entry.$key}" and ErpStatus ne "${this.voidCode}" and ${this.pastDays('ErpDocumentDate')}`,
        _filterName: 'ErpStatus',
        _metricName: 'SumGrandTotal',
      },
    ]);

    this.setCountTitles();
  },
  setCountTitles: function setCountTitles() {
  },
  pastDays: function pastDays(property) {
    const now = moment();

    const pastWeekStart = now.clone().subtract(this.dayValue, 'days').startOf('day');
    const today = now.clone().endOf('day');

    const query = `((${property} between @${convert.toIsoStringFromDate(pastWeekStart.toDate())}@ and @${convert.toIsoStringFromDate(today.toDate())}@) or (${property} between @${pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]')}@ and @${today.format('YYYY-MM-DDT23:59:59[Z]')}@))`;
    return query;
  },
});
const rvm = new RelatedViewManager();
rvm.registerType('account_new_dashboard_widget', __class);
lang.setObject('icboe.Views.Account.NewDashboardWidget', __class);
export default __class;
