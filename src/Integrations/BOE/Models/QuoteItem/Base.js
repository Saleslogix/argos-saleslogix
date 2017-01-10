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
  iconClass: 'fa fa-file-text-o fa-2x',
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
