import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import _SDataModelMixin from 'argos/Models/_SDataModelMixin';

export default declare('crm.Models.SData.Contact', [_ModelBase, _SDataModelMixin], {
  entityName: 'Contact',
  entityDisplayName: 'Contact',
  entityDisplayNamePlural: 'Contacts',
  resourceKind: 'contacts',
  iconClass: 'fa fa-user fa-lg',
  security: 'Entities/Contact/View',
  querySelect: [
    'Account/AccountName',
    'AccountManager/UserInfo/FirstName',
    'AccountManager/UserInfo/LastName',
    'AccountName',
    'Address/*',
    'CuisinePreference',
    'CreateDate',
    'CreateUser',
    'Email',
    'Fax',
    'FirstName',
    'HomePhone',
    'LastName',
    'MiddleName',
    'Mobile',
    'Name',
    'NameLF',
    'Owner/OwnerDescription',
    'Prefix',
    'Suffix',
    'Title',
    'WebAddress',
    'WorkPhone',
  ],
});
