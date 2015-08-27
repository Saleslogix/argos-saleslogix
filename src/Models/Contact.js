import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/_ModelBase';
import _SDataModelMixin from 'argos/_SDataModelMixin';

export default declare('crm.Models.Contact', [_ModelBase, _SDataModelMixin], {
  entityName: 'Contact',
  resourceKind: 'contacts',
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
