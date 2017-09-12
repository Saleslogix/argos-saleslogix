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
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoiceItemModel');
const invoiceResource = getResource('erpInvoiceModel');
const salesOrderResource = getResource('saleOrderModel');

const __class = declare('crm.Integrations.BOE.Models.ErpInvoiceItem.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpInvoiceItems',
  entityName: 'ERPInvoiceItem',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPINVOICEITEM,
  iconClass: 'bullet-list',
  detailViewId: 'invoice_item_detail',
  listViewId: 'invoice_item_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Invoice',
      displayName: invoiceResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'ErpInvoice',
      parentPropertyType: 'object',
      relatedEntity: 'ERPInvoice',
    }, {
      name: 'SalesOrder',
      displayName: salesOrderResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'SalesOrder',
      parentPropertyType: 'object',
      relatedEntity: 'SalesOrder',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpInvoiceItem.Base', __class);
export default __class;
