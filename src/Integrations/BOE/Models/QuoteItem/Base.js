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

const resource = getResource('quoteItemModel');
const quoteResource = getResource('quoteModel');

const __class = declare('crm.Integrations.BOE.Models.QuoteItem.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'quoteItems',
  entityName: 'QuoteItem',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.QUOTEITEM,
  iconClass: 'document',
  detailViewId: 'quote_lines_detail',
  listViewId: 'quote_lines_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Quote',
      displayName: quoteResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'Quote',
      parentPropertyType: 'object',
      relatedEntity: 'Quote',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.QuoteItem.Base', __class);
export default __class;
