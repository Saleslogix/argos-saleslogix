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
import AccountList from '../../../Views/Account/List';
import BillToAccountList from '../Views/ERPBillToAccounts/List';
import BillToAccountEdit from '../Views/ERPBillToAccounts/Edit';
import BillToAccountDetail from '../Views/ERPBillToAccounts/Detail';
import BillTosList from '../Views/ERPBillTos/List';
import InvoicesList from '../Views/ERPInvoices/List';
import QuotesList from '../Views/Quotes/List';
import ReceivablesList from '../Views/ERPReceivables/List';
import ReturnsList from '../Views/Returns/List';
import SalesOrdersList from '../Views/SalesOrders/List';
import '../Models/ErpBillToAccount/Offline';
import '../Models/ErpBillToAccount/SData';

const __class = declare('crm.Integrations.BOE.Modules.BillToAccountModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new BillToAccountDetail());
    am.registerView(new BillToAccountEdit());
    am.registerView(new BillToAccountList());

    am.registerView(new AccountList({
      id: 'billtoaccount_accounts_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new AccountList({
      id: 'billtoaccount_accounts',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new BillTosList({
      id: 'billtoaccount_erpbilltos',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new QuotesList({
      id: 'billtoaccount_openquotes_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new SalesOrdersList({
      id: 'billtoaccount_salesorders_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new InvoicesList({
      id: 'billtoaccount_openinvoices_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new ReceivablesList({
      id: 'billtoaccount_receivables_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new ReturnsList({
      id: 'billtoaccount_returns_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));
  },
  loadCustomizations: function loadCustomizations() {
    this.applicationModule.registerCustomization('detail/tools', 'erpbilltoaccounts_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.BillToAccountModule', __class);
export default __class;
