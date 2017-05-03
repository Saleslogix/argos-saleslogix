import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import validator from '../Validator';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('nameEdit');

/**
 * @class crm.Views.NameEdit
 *
 *
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Views.NameEdit', [Edit], {
  // Localization
  titleText: resource.titleText,
  firstNameText: resource.firstNameText,
  middleNameText: resource.middleNameText,
  lastNameText: resource.lastNameText,
  prefixText: resource.prefixText,
  prefixTitleText: resource.prefixTitleText,
  suffixText: resource.suffixText,
  suffixTitleText: resource.suffixTitleText,

  // View Properties
  id: 'name_edit',

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      emptyText: '',
      label: this.prefixText,
      name: 'Prefix',
      property: 'Prefix',
      picklist: 'Name Prefix',
      picklistOptions: (entry) => {
        // Checks if entry is a Contact
        if (entry.hasOwnProperty('NameLF')) {
          return {
            filterByLanguage: true,
            language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
          };
        }
        return {
          filterByLanguage: false,
          language: ' ',
        };
      },
      languageCodeProperty: 'LocationCode',
      requireSelection: true,
      storageMode: 'text',
      title: this.prefixTitleText,
      type: 'picklist',
    }, {
      name: 'FirstName',
      property: 'FirstName',
      label: this.firstNameText,
      type: 'text',
      maxTextLength: 32,
      validator: validator.exceedsMaxTextLength,
    }, {
      name: 'MiddleName',
      property: 'MiddleName',
      label: this.middleNameText,
      type: 'text',
      maxTextLength: 32,
      validator: validator.exceedsMaxTextLength,
    }, {
      name: 'LastName',
      property: 'LastName',
      label: this.lastNameText,
      type: 'text',
      maxTextLength: 32,
      validator: validator.exceedsMaxTextLength,
    }, {
      emptyText: '',
      label: this.suffixText,
      name: 'Suffix',
      property: 'Suffix',
      picklist: 'Name Suffix',
      picklistOptions: (entry) => {
        // Checks if entry is a Contact
        if (entry.hasOwnProperty('NameLF')) {
          return {
            filterByLanguage: true,
            language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
          };
        }
        return {
          filterByLanguage: false,
          language: ' ',
        };
      },
      languageCodeProperty: 'LocationCode',
      requireSelection: true,
      storageMode: 'text',
      title: this.suffixTitleText,
      type: 'picklist',
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.NameEdit', __class);
export default __class;
