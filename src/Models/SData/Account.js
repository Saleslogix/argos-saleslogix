import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import _SDataModelMixin from 'argos/Models/_SDataModelMixin';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.SData.Account', [_ModelBase, _SDataModelMixin], {
  resourceKind: 'accounts',
  list: {
    querySelect: [
      'AccountName',
      'AccountManager/UserInfo/UserName',
      'AccountManager/UserInfo/LastName',
      'AccountManager/UserInfo/FirstName',
      'Owner/OwnerDescription',
      'WebAddress',
      'Industry',
      'LeadSource/Description',
      'MainPhone',
      'Fax',
      'Status',
      'SubType',
      'Type',
      'ModifyDate',
    ],
    queryOrderBy: 'AccountNameUpper',
  },
  detail: {
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
  },
  edit: {
  },
});

Manager.register(MODEL_NAMES.ACCOUNT, MODEL_TYPE.SDATA, __class);
export default __class;
