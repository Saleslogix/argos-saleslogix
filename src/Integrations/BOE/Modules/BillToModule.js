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
import BillToDetail from '../Views/ERPBillTos/Detail';
import BillToEdit from '../Views/ERPBillTos/Edit';
import BillToList from '../Views/ERPBillTos/List';
import InvoiceList from '../Views/ERPInvoices/List';
import QuoteList from '../Views/Quotes/List';
import ReceivableList from '../Views/ERPReceivables/List';
import ReturnList from '../Views/Returns/List';
import SalesOrderList from '../Views/SalesOrders/List';
import ShipToList from '../Views/ERPShipTos/List';
import SyncResultsList from '../Views/SyncResults/List';
import '../Models/ErpBillTo/Offline';
import '../Models/ErpBillTo/SData';

const __class = declare('crm.Integrations.BOE.Modules.BillToModule', [_Module], {
  init: function init() {
    App.picklistService.registerPicklistToView('SyncStatus', 'erpbillto_detail');
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;
    am.registerView(new BillToList());
    am.registerView(new BillToDetail());
    am.registerView(new BillToEdit());

    am.registerView(new AccountList({
      id: 'billto_accounts_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));
    am.registerView(new ShipToList({
      id: 'billto_shiptos_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));
    am.registerView(new QuoteList({
      id: 'billto_quotes_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));
    am.registerView(new SalesOrderList({
      id: 'billto_orders_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));
    am.registerView(new ReceivableList({
      id: 'billto_receivables_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));
    am.registerView(new InvoiceList({
      id: 'billto_invoices_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));
    am.registerView(new ReturnList({
      id: 'billto_returns_related',
      expose: false,
      groupsEnabled: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));
    am.registerView(new SyncResultsList({
      id: 'billto_synchistory_related',
    }));
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;
    am.registerCustomization('detail/tools', 'erpbillto_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });
    am.registerCustomization('list/tools', 'billto_accounts_related', {
      at: (tool) => {
        return tool.id === 'new';
      },
      type: 'remove',
    });
    am.registerCustomization('list/tools', 'billto_receivables_related', {
      at: (tool) => {
        return tool.id === 'new';
      },
      type: 'remove',
    });
    am.registerCustomization('list/tools', 'billto_invoices_related', {
      at: (tool) => {
        return tool.id === 'new';
      },
      type: 'remove',
    });
    am.registerCustomization('list/tools', 'billto_returns_related', {
      at: (tool) => {
        return tool.id === 'new';
      },
      type: 'remove',
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.BillToModule', __class);
export default __class;
