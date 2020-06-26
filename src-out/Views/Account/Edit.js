define("crm/Views/Account/Edit", ["exports", "dojo/_base/declare", "dojo/string", "../../Validator", "../../Format", "../../Template", "argos/Edit", "argos/I18n"], function (_exports, _declare, _string, _Validator, _Format, _Template, _Edit, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _string = _interopRequireDefault(_string);
  _Validator = _interopRequireDefault(_Validator);
  _Format = _interopRequireDefault(_Format);
  _Template = _interopRequireDefault(_Template);
  _Edit = _interopRequireDefault(_Edit);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('accountEdit');

  var __class = (0, _declare["default"])('crm.Views.Account.Edit', [_Edit["default"]], {
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
      return _string["default"].substitute(nformat, [dependentValue]);
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
        validator: _Validator["default"].notEmpty,
        autoFocus: true
      }, {
        label: this.webText,
        name: 'WebAddress',
        property: 'WebAddress',
        renderer: _Format["default"].link,
        type: 'text',
        inputType: 'url',
        maxTextLength: 128,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        label: this.phoneText,
        name: 'MainPhone',
        property: 'MainPhone',
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        emptyText: '',
        formatValue: _Format["default"].address.bindDelegate(this, [true], true),
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
        validator: _Validator["default"].exceedsMaxTextLength
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
        validator: _Validator["default"].exceedsMaxTextLength
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
        validator: _Validator["default"].exceedsMaxTextLength
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
        textTemplate: _Template["default"].nameLF,
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

  var _default = __class;
  _exports["default"] = _default;
});