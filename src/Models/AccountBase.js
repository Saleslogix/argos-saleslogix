import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from './Names';

const __class = declare('crm.Models.AccountBase', [_ModelBase], {
  resourceKind: 'accounts',
  entityName: 'Account',
  entityDisplayName: 'Account',
  entityDisplayNamePlural: 'Accounts',
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
      propertyName: 'Addresses',
      type: 'OneToMany',
      parentEntity: 'Account',
      parentProperty: 'AccountId',
      parentPrimaryKey: true,
      childEntity: 'Address',
      childProperty: 'EntityId',
    }, {
      name: 'Contacts',
      displayName: 'Contacts',
      propertyName: 'Contacts',
      type: 'OneToMany',
      parentEntity: 'Account',
      parentProperty: 'AccountId',
      parentPrimaryKey: true,
      childEntity: 'Contact',
      childProperty: 'AccountId',
      childDataPath: 'Account.Id',
    }, {
      name: 'History',
      displayName: 'History',
      propertyName: 'History',
      type: 'OneToMany',
      parentEntity: 'Account',
      parentProperty: 'AccountId',
      parentPrimaryKey: true,
      childEntity: 'History',
      childProperty: 'AccountId',
    }, {
      name: 'Activity',
      displayName: 'Activity',
      propertyName: 'Activity',
      type: 'OneToMany',
      parentEntity: 'Account',
      parentProperty: 'AccountId',
      parentPrimaryKey: true,
      childEntity: 'Activity',
      childProperty: 'AccountId',
    }, {
      name: 'Opportunity',
      displayName: 'Opportunties',
      type: 'OneToMany',
      parentEntity: 'Account',
      parentProperty: 'AccountId',
      parentPrimaryKey: true,
      childEntity: 'Opportunity',
      childProperty: 'AccountId',
      childDataPath: 'Account.Id',
    }]);
    return rel;
  },
});
export default __class;
