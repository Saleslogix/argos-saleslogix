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
    }, {
      name: 'edit',
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
        Promise.all([App.picklistService.requestPicklist('Name Prefix', {
          language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
          filterByLanguage: true,
        }), App.picklistService.requestPicklist('Name Suffix', {
          language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
          filterByLanguage: true,
        }), App.picklistService.requestPicklist('Title', {
          language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
          filterByLanguage: true,
        })]).then(() => {
          resolve(entry);
        });
      });
    });
  },
});

Manager.register(MODEL_NAMES.CONTACT, MODEL_TYPES.SDATA, __class);
export default __class;
