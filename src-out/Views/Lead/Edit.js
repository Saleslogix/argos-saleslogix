define("crm/Views/Lead/Edit", ["exports", "dojo/_base/declare", "../../Format", "../../Validator", "argos/Edit", "argos/I18n"], function (_exports, _declare, _Format, _Validator, _Edit, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Format = _interopRequireDefault(_Format);
  _Validator = _interopRequireDefault(_Validator);
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
  var resource = (0, _I18n["default"])('leadEdit');

  var __class = (0, _declare["default"])('crm.Views.Lead.Edit', [_Edit["default"]], {
    // Localization
    accountText: resource.accountText,
    addressText: resource.addressText,
    businessText: resource.businessTitleText,
    businessTitleText: resource.businessTitleText,
    companyText: resource.companyText,
    contactTitleText: resource.contactTitleText,
    emailText: resource.emailText,
    faxText: resource.faxText,
    importSourceText: resource.importSourceText,
    industryText: resource.industryText,
    industryTitleText: resource.industryTitleText,
    interestsText: resource.interestsText,
    leadNameLastFirstText: resource.leadNameLastFirstText,
    leadOwnerText: resource.leadOwnerText,
    nameText: resource.nameText,
    notesText: resource.notesText,
    notesTitleText: resource.notesTitleText,
    sicCodeText: resource.sicCodeText,
    titleText: resource.titleText,
    titleTitleText: resource.titleTitleText,
    tollFreeText: resource.tollFreeText,
    webText: resource.webText,
    workText: resource.workText,
    mobileText: resource.mobileText,
    // View Properties
    entityName: 'Lead',
    id: 'lead_edit',
    insertSecurity: 'Entities/Lead/Add',
    updateSecurity: 'Entities/Lead/Edit',
    querySelect: ['BusinessDescription', 'Company', 'Email', 'FirstName', 'Address/*', 'Industry', 'Interests', 'LastName', 'LeadNameLastFirst', 'LeadSource/Description', 'MiddleName', 'Mobile', 'Notes', 'Prefix', 'SICCode', 'Suffix', 'Title', 'TollFree', 'WebAddress', 'WorkPhone', 'Owner/OwnerDescription'],
    queryInclude: ['$permissions'],
    resourceKind: 'leads',
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        applyTo: '',
        formatValue: _Format["default"].nameLF,
        label: this.leadNameLastFirstText,
        name: 'LeadNameLastFirst',
        property: 'LeadNameLastFirst',
        type: 'name',
        validator: _Validator["default"].name,
        view: 'name_edit'
      }, {
        label: this.companyText,
        name: 'Company',
        property: 'Company',
        type: 'text',
        maxTextLength: 128,
        validator: [_Validator["default"].exceedsMaxTextLength, _Validator["default"].exists]
      }, {
        label: this.webText,
        name: 'WebAddress',
        property: 'WebAddress',
        type: 'text',
        inputType: 'url',
        maxTextLength: 128,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        label: this.workText,
        name: 'WorkPhone',
        property: 'WorkPhone',
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        label: this.mobileText,
        name: 'Mobile',
        property: 'Mobile',
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        label: this.tollFreeText,
        name: 'TollFree',
        property: 'TollFree',
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        label: this.emailText,
        name: 'Email',
        property: 'Email',
        type: 'text',
        inputType: 'email'
      }, {
        label: this.contactTitleText,
        name: 'Title',
        property: 'Title',
        picklist: 'Title',
        title: this.titleTitleText,
        type: 'picklist',
        orderBy: 'text asc',
        maxTextLength: 64,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        emptyText: '',
        formatValue: _Format["default"].address.bindDelegate(this, true),
        label: this.addressText,
        name: 'Address',
        property: 'Address',
        type: 'address',
        view: 'address_edit'
      }, {
        label: this.importSourceText,
        name: 'LeadSource',
        property: 'LeadSource',
        view: 'leadsource_list',
        textProperty: 'Description',
        type: 'lookup',
        validator: _Validator["default"].exists
      }, {
        label: this.interestsText,
        name: 'Interests',
        property: 'Interests',
        type: 'text',
        maxTextLength: 128,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        label: this.industryText,
        name: 'Industry',
        property: 'Industry',
        picklist: 'Industry',
        title: this.industryTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        label: this.sicCodeText,
        name: 'SICCode',
        property: 'SICCode',
        type: 'text',
        maxTextLength: 64,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        label: this.businessText,
        name: 'BusinessDescription',
        property: 'BusinessDescription',
        noteProperty: false,
        title: this.businessTitleText,
        type: 'note',
        view: 'text_edit'
      }, {
        label: this.notesText,
        name: 'Notes',
        property: 'Notes',
        noteProperty: false,
        title: this.notesTitleText,
        type: 'note',
        view: 'text_edit'
      }, {
        label: this.leadOwnerText,
        name: 'Owner',
        property: 'Owner',
        textProperty: 'OwnerDescription',
        type: 'lookup',
        view: 'owner_list'
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});