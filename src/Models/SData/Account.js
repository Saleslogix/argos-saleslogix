import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import _SDataModelMixin from 'argos/Models/_SDataModelMixin';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';

const __class = declare('crm.Models.SData.Account', [_ModelBase, _SDataModelMixin], {
  entityName: 'Account',
  entityDisplayName: 'Account',
  entityDisplayNamePlural: 'Accounts',
  iconClass: 'fa fa-building-o fa-2x',
  resourceKind: 'accounts',
  security: 'Entities/Account/View',
  querySelect: [
        'AccountManager/UserInfo/FirstName',
        'AccountManager/UserInfo/LastName',
        'AccountName',
        'Address/*',
        'BusinessDescription',
        'CreateDate',
        'CreateUser',
        'Description',
        'Fax',
        'GlobalSyncID',
        'ImportSource',
        'Industry',
        'LeadSource/Description',
        'MainPhone',
        'Notes',
        'Owner/OwnerDescription',
        'Status',
        'SubType',
        'Type',
        'WebAddress',
  ],
});

Manager.register('account', MODEL_TYPE.SDATA, __class);
export default __class;
