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
import ERPInvoiceDetail from '../Views/ERPInvoices/Detail';
import ERPInvoiceList from '../Views/ERPInvoices/List';
import ERPInvoiceItemDetail from '../Views/ERPInvoiceItems/Detail';
import ERPInvoiceItemList from '../Views/ERPInvoiceItems/List';
import ERPReceivablesList from '../Views/ERPReceivables/List';
import '../Models/ErpInvoice/Offline';
import '../Models/ErpInvoice/SData';
import '../Models/ErpInvoiceItem/Offline';
import '../Models/ErpInvoiceItem/SData';
import '../Models/ErpInvoicePerson/Offline';
import '../Models/ErpInvoicePerson/SData';

const __class = declare('crm.Integrations.BOE.Modules.InvoiceModule', [_Module], {
  defaultViews: ['invoice_list'],
  init: function init() {
    App.picklistService.registerPicklistToView('ErpInvoiceStatus');
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;
    am.registerView(new ERPInvoiceList());
    am.registerView(new ERPInvoiceDetail());
    am.registerView(new ERPInvoiceItemDetail());
    am.registerView(new ERPInvoiceItemList({
      id: 'invoice_items_related',
      hasSettings: false,
      expose: false,
    }));
    am.registerView(new ERPReceivablesList({
      id: 'invoice_receivables_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
    }));
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;
    am.registerCustomization('detail/tools', 'invoice_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });

    am.registerCustomization('detail/tools', 'invoice_item_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });

    am.registerCustomization('list/tools', 'invoice_list', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });

    am.registerCustomization('list/tools', 'invoice_items_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.InvoiceModule', __class);
export default __class;
