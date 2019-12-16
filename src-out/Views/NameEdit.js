define('crm/Views/NameEdit', ['module', 'exports', 'dojo/_base/declare', '../Validator', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _Validator, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('nameEdit');

  /**
   * @class crm.Views.NameEdit
   *
   *
   * @extends argos.Edit
   *
   */
  var __class = (0, _declare2.default)('crm.Views.NameEdit', [_Edit2.default], {
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
        picklistOptions: function picklistOptions(entry) {
          // Checks if entry is a Contact
          if (entry.hasOwnProperty('NameLF')) {
            return {
              filterByLanguage: true,
              language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
              storageMode: 'text'
            };
          }
          return {
            filterByLanguage: false,
            language: ' ',
            storageMode: 'text'
          };
        },
        languageCodeProperty: 'LocationCode',
        requireSelection: true,
        storageMode: 'text',
        title: this.prefixTitleText,
        type: 'picklist'
      }, {
        name: 'FirstName',
        property: 'FirstName',
        label: this.firstNameText,
        type: 'text',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'MiddleName',
        property: 'MiddleName',
        label: this.middleNameText,
        type: 'text',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'LastName',
        property: 'LastName',
        label: this.lastNameText,
        type: 'text',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        emptyText: '',
        label: this.suffixText,
        name: 'Suffix',
        property: 'Suffix',
        picklist: 'Name Suffix',
        picklistOptions: function picklistOptions(entry) {
          // Checks if entry is a Contact
          if (entry.hasOwnProperty('NameLF')) {
            return {
              filterByLanguage: true,
              language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
              storageMode: 'text'
            };
          }
          return {
            filterByLanguage: false,
            language: ' ',
            storageMode: 'text'
          };
        },
        languageCodeProperty: 'LocationCode',
        requireSelection: true,
        storageMode: 'text',
        title: this.suffixTitleText,
        type: 'picklist'
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});