define('crm/Views/Account/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', '../../Validator', '../../Format', '../../Template', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _string, _Validator, _Format, _Template, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Format2 = _interopRequireDefault(_Format);

  var _Template2 = _interopRequireDefault(_Template);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('accountEdit'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Views.Account.Edit', [_Edit2.default], {
    // Localization
    accountStatusTitleText: resource.accountStatusTitleText,
    accountSubTypeTitleText: resource.accountSubTypeTitleText,
    accountText: resource.accountText,
    accountTypeTitleText: resource.accountTypeTitleText,
    acctMgrText: resource.acctMgrText,
    businessDescriptionText: resource.businessDescriptionText,
    businessDescriptionTitleText: resource.businessDescriptionTitleText,
    descriptionText: resource.descriptionText,
    faxText: resource.faxText,
    fullAddressText: resource.fullAddressText,
    importSourceText: resource.importSourceText,
    industryText: resource.industryText,
    industryTitleText: resource.industryTitleText,
    ownerText: resource.ownerText,
    phoneText: resource.phoneText,
    statusText: resource.statusText,
    subTypeText: resource.subTypeText,
    titleText: resource.titleText,
    typeText: resource.typeText,
    webText: resource.webText,

    // View Properties
    entityName: 'Account',
    id: 'account_edit',
    insertSecurity: 'Entities/Account/Add',
    updateSecurity: 'Entities/Account/Edit',
    querySelect: ['AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'BusinessDescription', 'Description', 'Fax', 'Industry', 'LeadSource/Description', 'MainPhone', 'Notes', 'Owner/OwnerDescription', 'Status', 'SubType', 'Type', 'User/UserInfo/UserName', 'WebAddress'],
    queryInclude: ['$permissions'],
    resourceKind: 'accounts',

    formatDependentPicklist: function formatDependentPicklist(dependentValue, nformat) {
      return _string2.default.substitute(nformat, [dependentValue]);
    },
    applyContext: function applyContext(templateEntry) {
      this.inherited(applyContext, arguments);

      this.fields.AccountManager.setValue(App.context.user);
      this.fields.Owner.setValue(App.context.defaultOwner);

      this.fields.Type.setValue(templateEntry.Type);
      this.fields.Status.setValue(templateEntry.Status);
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        label: this.accountText,
        name: 'AccountName',
        property: 'AccountName',
        type: 'text',
        validator: _Validator2.default.notEmpty,
        autoFocus: true
      }, {
        label: this.webText,
        name: 'WebAddress',
        property: 'WebAddress',
        renderer: _Format2.default.link,
        type: 'text',
        inputType: 'url',
        maxTextLength: 128,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.phoneText,
        name: 'MainPhone',
        property: 'MainPhone',
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        emptyText: '',
        formatValue: _Format2.default.address.bindDelegate(this, [true], true),
        label: this.fullAddressText,
        name: 'Address',
        property: 'Address',
        type: 'address',
        view: 'address_edit'
      }, {
        label: this.faxText,
        name: 'Fax',
        property: 'Fax',
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.typeText,
        name: 'Type',
        property: 'Type',
        picklist: 'Account Type',
        requireSelection: true,
        title: this.accountTypeTitleText,
        type: 'picklist'
      }, {
        dependsOn: 'Type',
        label: this.subTypeText,
        name: 'SubType',
        property: 'SubType',
        picklist: this.formatDependentPicklist.bindDelegate(this, 'Account ${0}', true),
        requireSelection: false,
        title: this.accountSubTypeTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.statusText,
        name: 'Status',
        property: 'Status',
        picklist: 'Account Status',
        requireSelection: false,
        title: this.accountStatusTitleText,
        type: 'picklist'
      }, {
        label: this.industryText,
        name: 'Industry',
        property: 'Industry',
        picklist: 'Industry',
        requireSelection: false,
        title: this.industryTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.businessDescriptionText,
        name: 'BusinessDescription',
        property: 'BusinessDescription',
        noteProperty: false,
        title: this.businessDescriptionTitleText,
        type: 'note',
        view: 'text_edit'
      }, {
        label: this.acctMgrText,
        name: 'AccountManager',
        property: 'AccountManager',
        textProperty: 'UserInfo',
        textTemplate: _Template2.default.nameLF,
        type: 'lookup',
        view: 'user_list'
      }, {
        label: this.ownerText,
        name: 'Owner',
        property: 'Owner',
        textProperty: 'OwnerDescription',
        type: 'lookup',
        view: 'owner_list'
      }, {
        label: this.importSourceText,
        name: 'LeadSource',
        property: 'LeadSource',
        textProperty: 'Description',
        type: 'lookup',
        view: 'leadsource_list'
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});