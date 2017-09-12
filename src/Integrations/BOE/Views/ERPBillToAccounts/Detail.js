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
import format from 'crm/Format';
import Detail from 'argos/Detail';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpBillToAccountsDetail');

const __class = declare('crm.Integrations.BOE.Views.ERPBillToAccounts.Detail', [Detail], {
  // Localization
  titleText: resource.titleText,
  actionsText: resource.actionsText,
  relatedItemsText: resource.relatedItemsText,
  // Details Section
  nameText: resource.nameText,
  addressText: resource.addressText,
  erpStatusText: resource.erpStatusText,
  // More Details Section
  mainPhoneText: resource.mainPhoneText,
  faxText: resource.faxText,
  emailText: resource.emailText,
  erpPaymentTermText: resource.erpPaymentTermText,
  accountsText: resource.accountsText,
  openQuotesText: resource.openQuotesText,
  salesOrdersText: resource.salesOrdersText,
  invoicesText: resource.invoicesText,
  receivablesText: resource.receivablesText,
  returnsText: resource.returnsText,
  entityText: resource.entityText,

  // Picklist Codes
  openCode: 'Open',
  newCode: 'New',
  approvedCode: 'Approved',
  workingCode: 'Working',
  partialShipCode: 'PartiallyShipped',
  partialPaidCode: 'PartialPaid',
  closedCode: 'Closed',
  disputeCode: 'Dispute',

  // View Properties
  id: 'erpbilltoaccounts_detail',
  modelName: MODEL_NAMES.ERPBILLTOACCOUNT,
  resourceKind: 'erpBillToAccounts',
  enableOffline: true,

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.actionsText,
      list: true,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Name',
        property: 'ErpBillTo.Name',
        label: this.nameText,
      }, {
        name: 'Address',
        property: 'ErpBillTo.Address',
        label: this.addressText,
        renderer: function renderer(val) {
          if (val) {
            return format.address(val);
          }
        },
      }, {
        name: 'Status',
        property: 'ErpBillTo.ErpStatus',
        label: this.erpStatusText,
      }, {
        name: 'MainPhone',
        property: 'ErpBillTo.MainPhone',
        label: this.mainPhoneText,
        renderer: function renderer(val) {
          if (val) {
            return format.phone(val);
          }
        },
      }, {
        name: 'Fax',
        property: 'ErpBillTo.Fax',
        label: this.faxText,
      }, {
        name: 'Email',
        property: 'ErpBillTo.Email',
        label: this.emailText,
        renderer: function renderer(val) {
          if (val) {
            return format.mail(val);
          }
        },
      }, {
        name: 'ERPPaymentTerm',
        property: 'ErpBillTo.PaymentTermId',
        label: this.erpPaymentTermText,
      }],
    }, {
      title: this.relatedItemsText,
      list: true,
      name: 'RelatedItemsSection',
      children: [{
        name: 'Accounts',
        label: this.accountsText,
        where: function where(entry) {
          return `ErpBillToAccounts.Id eq "${entry.$key}"`;
        },
        view: 'billtoaccount_accounts_related',
      }, {
        name: 'OpenQuotesList',
        label: this.openQuotesText,
        where: function where(entry) {
          return `BillTo.ErpBillToAccounts.Id eq "${entry.$key}" and (Status eq "${this.openCode}" or Status eq "${this.newCode}")`;
        },
        view: 'billtoaccount_openquotes_related',
      }, {
        name: 'SalesOrders',
        label: this.salesOrdersText,
        where: function where(entry) {
          return `ErpBillTo.ErpBillToAccounts.Id eq "${entry.$key}" and (Status eq "${this.openCode}" or Status eq "${this.approvedCode}" or Status eq "${this.workingCode}" or Status eq "${this.partialShipCode}")`;
        },
        view: 'billtoaccount_salesorders_related',
      }, {
        name: 'OpenInvoices',
        label: this.invoicesText,
        where: function where(entry) {
          return `ErpBillTo.ErpBillToAccounts.Id eq "${entry.$key}" and (ErpStatus eq "${this.openCode}" or ErpStatus eq "${this.partialPaidCode}" or ErpStatus eq "${this.disputeCode}")`;
        },
        view: 'billtoaccount_openinvoices_related',
      }, {
        name: 'Receivables',
        label: this.receivablesText,
        where: function where(entry) {
          return `ErpBillTo.ErpBillToAccounts.Id eq "${entry.$key}"`;
        },
        view: 'billtoaccount_receivables_related',
      }, {
        name: 'Returns',
        label: this.returnsText,
        where: function where(entry) {
          return `ErpBillTo.ErpBillToAccounts.Id eq "${entry.$key}"`;
        },
        view: 'billtoaccount_returns_related',
      }],
    }]);
  },
});

lang.setObject('icboe.Views.ERPBillToAccounts.Detail', __class);
export default __class;
