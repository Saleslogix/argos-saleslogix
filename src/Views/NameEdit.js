/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import declare from 'dojo/_base/declare';
import validator from '../Validator';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('nameEdit');

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
            storageMode: 'text',
          };
        }
        return {
          filterByLanguage: false,
          language: ' ',
          storageMode: 'text',
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
            storageMode: 'text',
          };
        }
        return {
          filterByLanguage: false,
          language: ' ',
          storageMode: 'text',
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

export default __class;
