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

const resource = getResource('salesOrderItemModel');
const salesorderResource = getResource('salesOrderModel');

const __class = declare('crm.Integrations.BOE.Models.SalesOrderItem.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'salesOrderItems',
  entityName: 'SalesOrderItem',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.SALESORDERITEM,
  iconClass: 'bullet-list',
  detailViewId: 'salesorder_item_detail',
  listViewId: 'salessorder_items_list',
  editViewId: 'salesorder_item_edit',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'SalesOrder',
      displayName: salesorderResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'SalesOrder',
      parentPropertyType: 'object',
      relatedEntity: 'SalesOrder',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.SalesOrderItem.Base', __class);
export default __class;
