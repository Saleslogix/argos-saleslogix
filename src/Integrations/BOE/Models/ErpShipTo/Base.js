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

const resource = getResource('erpShipToModel');
// const accountResource = getResource('accountModel');
// const billtoResource = getResource('erpBillToModel');
const quoteResource = getResource('quoteModel');
const salesorderResource = getResource('salesOrderModel');
const receivableResource = getResource('erpReceivableModel');
const invoiceResource = getResource('erpInvoiceModel');
const returnResource = getResource('returnModel');
const syncresultResource = getResource('syncResultModel');

const __class = declare('crm.Integrations.BOE.Models.ErpShipTo.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpShipTos',
  entityName: 'ERPShipTo',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPSHIPTO,
  iconClass: '',
  detailViewId: '',
  listViewId: 'erpShipto_list',
  editViewId: 'erpShipto_detail',
  createPicklists: function createPicklists() {
    return this.picklists || (this.picklists = [{
      name: 'SyncStatus',
      property: 'SyncStatus',
    }]);
  },
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [
    // TODO: Update when ManyToMany relationship is supported
    // {
    //   name: 'Account',
    //   displayName: accountResource.entityDisplayName,
    //   type: 'ManyToMany',
    //   relatedEntity: 'Account',
    //   relatedProperty: 'ErpBillToAccounts.ErpBillTo',
    //   relatedPropertyType: 'object',
    // }, {
    //   name: 'BillTo',
    //   displayName: billtoResource.entityDisplayName,
    //   type: 'ManyToMany',
    //   relatedEntity: 'ERPBillTo',
    //   relatedProperty: 'ErpBillToShipTos.ErpShipTo',
    //   relatedPropertyType: 'object',
    // },
      {
        name: 'Quote',
        displayName: quoteResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'Quote',
        relatedProperty: 'ShipTo',
        relatedPropertyType: 'object',
      }, {
        name: 'SalesOrder',
        displayName: salesorderResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SalesOrder',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object',
      }, {
        name: 'Receivables',
        displayName: receivableResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'ERPReceivable',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object',
      }, {
        name: 'Invoice',
        displayName: invoiceResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'ERPInvoice',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object',
      }, {
        name: 'Return',
        displayName: returnResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'Return',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object',
      }, {
        name: 'SyncHistory',
        displayName: syncresultResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SyncResult',
        relatedProperty: 'EntityId',
        where: 'EntityType eq "ERPShipTo"',
      }]);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpShipTo.Base', __class);
export default __class;
