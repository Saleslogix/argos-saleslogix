import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('quoteModel');
const accountResource = getResource('accountModel');
const contactResource = getResource('contactModel');
const quoteItemsResource = getResource('quoteItemModel');

const __class = declare('icboe.Models.Quote.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'quotes',
  entityName: 'Quote',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.QUOTE,
  iconClass: 'fa fa-file-text-o fa-2x',
  detailViewId: 'quote_detail',
  listViewId: 'quote_list',
  editViewId: 'quote_edit',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayNamePlural,
        type: 'OneToOne',
        relatedEntity: 'Account',
        relatedProperty: 'EntityId',
      }, {
        name: 'RequestedBy',
        displayName: contactResource.entityDisplayNamePlural,
        type: 'OneToOne',
        relatedEntity: 'Contact',
        relatedProperty: 'EntityId',
      }, {
        name: 'QuoteItems',
        displayName: quoteItemsResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'QuoteItems',
        relatedProperty: 'EntityId',
      },
    ]);
    return rel;
  },
});
export default __class;
