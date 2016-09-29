import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('accountModel');
const contactResource = getResource('contactModel');
const activityResource = getResource('activityModel');
const historyResource = getResource('historyModel');
const oppResource = getResource('opportunityModel');
const addressResource = getResource('addressModel');
const ticketResource = getResource('ticketModel');

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
    const rel = this.relationships || (this.relationships = [{
      name: 'Addresses',
      displayName: addressResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Address',
      relatedProperty: 'EntityId',
    }, {
      name: 'Contacts',
      displayName: contactResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Contact',
      relatedProperty: 'Account',
      relatedPropertyType: 'object',
    }, {
      name: 'History',
      displayName: historyResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'History',
      relatedProperty: 'AccountId',
      where: 'Type ne "atDatabaseChange"',
    }, {
      name: 'Activities',
      displayName: activityResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Activity',
      relatedProperty: 'AccountId',
    }, {
      name: 'Opportunities',
      displayName: oppResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Opportunity',
      relatedProperty: 'Account',
      relatedPropertyType: 'object',
    }, {
      name: 'Tickets',
      displayName: ticketResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Ticket',
      relatedProperty: 'Account',
      relatedPropertyType: 'object',
    }]);
    return rel;
  },
});
export default __class;
