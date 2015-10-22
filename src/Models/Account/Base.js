import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';

const resource = window.localeContext.getEntitySync('accountModel').attributes;

const __class = declare('crm.Models.Account.Base', [_ModelBase], {
  resourceKind: 'accounts',
  entityName: 'Account',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ACCOUNT,
  iconClass: 'fa fa-building-o fa-2x',
  detailViewId: 'account_detail',
  listViewId: 'account_list',
  editViewId: 'account_edit',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [{
      name: 'Addresses',
      displayName: 'Addresses',
      type: 'OneToMany',
      relatedEntity: 'Address',
      relatedProperty: 'EntityId',
    }, {
      name: 'Contacts',
      displayName: 'Contacts',
      type: 'OneToMany',
      relatedEntity: 'Contact',
      relatedProperty: 'Account',
      relatedPropertyType: 'object',
    }, {
      name: 'History',
      displayName: 'History',
      type: 'OneToMany',
      relatedEntity: 'History',
      relatedProperty: 'AccountId',
      where: 'Type ne "atDatabaseChange"',
    }, {
      name: 'Activity',
      displayName: 'Activity',
      type: 'OneToMany',
      relatedEntity: 'Activity',
      relatedProperty: 'AccountId',
    }, {
      name: 'Opportunity',
      displayName: 'Opportunties',
      type: 'OneToMany',
      relatedEntity: 'Opportunity',
      relatedProperty: 'Account',
      relatedPropertyType: 'object',
    }, {
      name: 'Tickets',
      displayName: 'Tickets',
      type: 'OneToMany',
      relatedEntity: 'Ticket',
      relatedProperty: 'Account',
      relatedPropertyType: 'object',
    }]);
    return rel;
  },
});
export default __class;
