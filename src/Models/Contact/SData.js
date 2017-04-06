import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Contact.SData', [Base, _SDataModelBase], {
  id: 'contact_sdata_model',
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
        'LocationCode',
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
      queryInclude: [
        '$permissions',
      ],
    }];
  },
  getEntry: function getEntry(/* options */) {
    const results$ = this.inherited(arguments);
    return results$.then((entry) => {
      return new Promise((resolve) => {
        // TODO: Add picklist language option
        Promise.all(App.picklistService.requestPicklist('Name Prefix', {
          filterByLanguage: entry.LocationCode || App.context.localization.locale,
        }), App.picklistService.requestPicklist('Name Suffix', {
          filterByLanguage: entry.Locationcode || App.context.localization.locale,
        })).then(() => {
          resolve(entry);
        });
      });
    });
  },
});

Manager.register(MODEL_NAMES.CONTACT, MODEL_TYPES.SDATA, __class);
export default __class;
