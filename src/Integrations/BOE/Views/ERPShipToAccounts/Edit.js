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
import Edit from 'argos/Edit';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipToAccountsEdit');

const __class = declare('crm.Integrations.BOE.Views.ERPShipToAccounts.Edit', [Edit], {
  // View Properties
  id: 'erpshiptoaccount_edit',
  detailView: 'erpshiptoaccount_detail',
  insertSecurity: 'Entities/ErpShipTo/Add',
  updateSecurity: 'Entities/ErpShipTo/Edit',
  resourceKind: 'erpShipToAccounts',
  titleText: resource.titleText,
  shipToText: resource.shipToText,
  accountText: resource.accountText,
  modelName: MODEL_NAMES.ERPSHIPTOACCOUNT,

  init: function init() {
    this.inherited(init, arguments);
  },
  applyContext: function applyContext() {
    this.inherited(applyContext, arguments);
    if (this.options && this.options.fromContext) {
      this.fields.ErpShipTo.disable();
      this.fields.Account.disable();
      this.fields.ErpShipTo.setValue(this.options.fromContext.ShipTo);
      this.fields.Account.setValue(this.options.fromContext.Context);
    } else {
      this.fields.ErpShipTo.enable();
      this.fields.Account.enable();
    }
    if (this.options && this.options.autoSave) {
      this.save();
    }
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        label: this.shipToText,
        name: 'ErpShipTo',
        property: 'ErpShipTo',
        type: 'lookup',
        emptyText: '',
        autoFocus: true,
        required: true,
        valueTextProperty: 'Name',
        view: 'erpshiptoaccount_erpshiptos',
      }, {
        label: this.accountText,
        name: 'Account',
        property: 'Account',
        type: 'lookup',
        emptyText: '',
        required: true,
        valueTextProperty: 'AccountName',
        view: 'erpshiptoaccount_accounts',
      },
      ] },
    ]);
  },
});

lang.setObject('icboe.Views.ERPShipToAccounts.Edit', __class);
export default __class;
