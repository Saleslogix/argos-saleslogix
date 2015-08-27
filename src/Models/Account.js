import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/_ModelBase';
import _SDataModelMixin from 'argos/_SDataModelMixin';

export default declare('crm.Models.Account', [_ModelBase, _SDataModelMixin], {
  entityName: 'Account',
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
