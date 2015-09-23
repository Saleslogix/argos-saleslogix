import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import _SDataModelMixin from 'argos/Models/_SDataModelMixin';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.SData.Contact', [_ModelBase, _SDataModelMixin], {
  entityName: 'Contact',
  entityDisplayName: 'Contact',
  entityDisplayNamePlural: 'Contacts',
  resourceKind: 'contacts',
  iconClass: 'fa fa-user fa-lg',
  security: 'Entities/Contact/View',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'LastNameUpper,FirstName',
      querySelect: [
        'AccountName',
        'Account/AccountName',
        'NameLF',
        'WorkPhone',
        'Mobile',
        'Email',
        'Title',
        'LastHistoryDate',
        'ModifyDate',
      ],
    }, {
      name: 'detail',
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
    }];
  },
});

Manager.register(MODEL_NAMES.CONTACT, MODEL_TYPE.SDATA, __class);
export default __class;
