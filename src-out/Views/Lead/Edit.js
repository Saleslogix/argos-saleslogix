define('crm/Views/Lead/Edit', ['module', 'exports', 'dojo/_base/declare', '../../Format', '../../Validator', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _Format, _Validator, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('leadEdit');

  /**
   * @class crm.Views.Lead.Edit
   *
   * @extends argos.Edit
   *
   * @requires crm.Format
   * @requires crm.Validator
   */
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

  var __class = (0, _declare2.default)('crm.Views.Lead.Edit', [_Edit2.default], {
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
        formatValue: _Format2.default.nameLF,
        label: this.leadNameLastFirstText,
        name: 'LeadNameLastFirst',
        property: 'LeadNameLastFirst',
        type: 'name',
        validator: _Validator2.default.name,
        view: 'name_edit'
      }, {
        label: this.companyText,
        name: 'Company',
        property: 'Company',
        type: 'text',
        maxTextLength: 128,
        validator: [_Validator2.default.exceedsMaxTextLength, _Validator2.default.exists]
      }, {
        label: this.webText,
        name: 'WebAddress',
        property: 'WebAddress',
        type: 'text',
        inputType: 'url',
        maxTextLength: 128,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.workText,
        name: 'WorkPhone',
        property: 'WorkPhone',
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.mobileText,
        name: 'Mobile',
        property: 'Mobile',
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.tollFreeText,
        name: 'TollFree',
        property: 'TollFree',
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
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
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        emptyText: '',
        formatValue: _Format2.default.address.bindDelegate(this, true),
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
        validator: _Validator2.default.exists
      }, {
        label: this.interestsText,
        name: 'Interests',
        property: 'Interests',
        type: 'text',
        maxTextLength: 128,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.industryText,
        name: 'Industry',
        property: 'Industry',
        picklist: 'Industry',
        title: this.industryTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.sicCodeText,
        name: 'SICCode',
        property: 'SICCode',
        type: 'text',
        maxTextLength: 64,
        validator: _Validator2.default.exceedsMaxTextLength
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9MZWFkL0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiYWNjb3VudFRleHQiLCJhZGRyZXNzVGV4dCIsImJ1c2luZXNzVGV4dCIsImJ1c2luZXNzVGl0bGVUZXh0IiwiY29tcGFueVRleHQiLCJjb250YWN0VGl0bGVUZXh0IiwiZW1haWxUZXh0IiwiZmF4VGV4dCIsImltcG9ydFNvdXJjZVRleHQiLCJpbmR1c3RyeVRleHQiLCJpbmR1c3RyeVRpdGxlVGV4dCIsImludGVyZXN0c1RleHQiLCJsZWFkTmFtZUxhc3RGaXJzdFRleHQiLCJsZWFkT3duZXJUZXh0IiwibmFtZVRleHQiLCJub3Rlc1RleHQiLCJub3Rlc1RpdGxlVGV4dCIsInNpY0NvZGVUZXh0IiwidGl0bGVUZXh0IiwidGl0bGVUaXRsZVRleHQiLCJ0b2xsRnJlZVRleHQiLCJ3ZWJUZXh0Iiwid29ya1RleHQiLCJtb2JpbGVUZXh0IiwiZW50aXR5TmFtZSIsImlkIiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicmVzb3VyY2VLaW5kIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwiYXBwbHlUbyIsImZvcm1hdFZhbHVlIiwibmFtZUxGIiwibGFiZWwiLCJuYW1lIiwicHJvcGVydHkiLCJ0eXBlIiwidmFsaWRhdG9yIiwidmlldyIsIm1heFRleHRMZW5ndGgiLCJleGNlZWRzTWF4VGV4dExlbmd0aCIsImV4aXN0cyIsImlucHV0VHlwZSIsInBpY2tsaXN0IiwidGl0bGUiLCJvcmRlckJ5IiwiZW1wdHlUZXh0IiwiYWRkcmVzcyIsImJpbmREZWxlZ2F0ZSIsInRleHRQcm9wZXJ0eSIsIm5vdGVQcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksVUFBWixDQUFqQjs7QUFFQTs7Ozs7Ozs7QUF2QkE7Ozs7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c291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uLy4uL1ZhbGlkYXRvcic7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdsZWFkRWRpdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuTGVhZC5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5WYWxpZGF0b3JcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuTGVhZC5FZGl0JywgW0VkaXRdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGFkZHJlc3NUZXh0OiByZXNvdXJjZS5hZGRyZXNzVGV4dCxcclxuICBidXNpbmVzc1RleHQ6IHJlc291cmNlLmJ1c2luZXNzVGl0bGVUZXh0LFxyXG4gIGJ1c2luZXNzVGl0bGVUZXh0OiByZXNvdXJjZS5idXNpbmVzc1RpdGxlVGV4dCxcclxuICBjb21wYW55VGV4dDogcmVzb3VyY2UuY29tcGFueVRleHQsXHJcbiAgY29udGFjdFRpdGxlVGV4dDogcmVzb3VyY2UuY29udGFjdFRpdGxlVGV4dCxcclxuICBlbWFpbFRleHQ6IHJlc291cmNlLmVtYWlsVGV4dCxcclxuICBmYXhUZXh0OiByZXNvdXJjZS5mYXhUZXh0LFxyXG4gIGltcG9ydFNvdXJjZVRleHQ6IHJlc291cmNlLmltcG9ydFNvdXJjZVRleHQsXHJcbiAgaW5kdXN0cnlUZXh0OiByZXNvdXJjZS5pbmR1c3RyeVRleHQsXHJcbiAgaW5kdXN0cnlUaXRsZVRleHQ6IHJlc291cmNlLmluZHVzdHJ5VGl0bGVUZXh0LFxyXG4gIGludGVyZXN0c1RleHQ6IHJlc291cmNlLmludGVyZXN0c1RleHQsXHJcbiAgbGVhZE5hbWVMYXN0Rmlyc3RUZXh0OiByZXNvdXJjZS5sZWFkTmFtZUxhc3RGaXJzdFRleHQsXHJcbiAgbGVhZE93bmVyVGV4dDogcmVzb3VyY2UubGVhZE93bmVyVGV4dCxcclxuICBuYW1lVGV4dDogcmVzb3VyY2UubmFtZVRleHQsXHJcbiAgbm90ZXNUZXh0OiByZXNvdXJjZS5ub3Rlc1RleHQsXHJcbiAgbm90ZXNUaXRsZVRleHQ6IHJlc291cmNlLm5vdGVzVGl0bGVUZXh0LFxyXG4gIHNpY0NvZGVUZXh0OiByZXNvdXJjZS5zaWNDb2RlVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICB0aXRsZVRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUaXRsZVRleHQsXHJcbiAgdG9sbEZyZWVUZXh0OiByZXNvdXJjZS50b2xsRnJlZVRleHQsXHJcbiAgd2ViVGV4dDogcmVzb3VyY2Uud2ViVGV4dCxcclxuICB3b3JrVGV4dDogcmVzb3VyY2Uud29ya1RleHQsXHJcbiAgbW9iaWxlVGV4dDogcmVzb3VyY2UubW9iaWxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZW50aXR5TmFtZTogJ0xlYWQnLFxyXG4gIGlkOiAnbGVhZF9lZGl0JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL0xlYWQvQWRkJyxcclxuICB1cGRhdGVTZWN1cml0eTogJ0VudGl0aWVzL0xlYWQvRWRpdCcsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdCdXNpbmVzc0Rlc2NyaXB0aW9uJyxcclxuICAgICdDb21wYW55JyxcclxuICAgICdFbWFpbCcsXHJcbiAgICAnRmlyc3ROYW1lJyxcclxuICAgICdBZGRyZXNzLyonLFxyXG4gICAgJ0luZHVzdHJ5JyxcclxuICAgICdJbnRlcmVzdHMnLFxyXG4gICAgJ0xhc3ROYW1lJyxcclxuICAgICdMZWFkTmFtZUxhc3RGaXJzdCcsXHJcbiAgICAnTGVhZFNvdXJjZS9EZXNjcmlwdGlvbicsXHJcbiAgICAnTWlkZGxlTmFtZScsXHJcbiAgICAnTW9iaWxlJyxcclxuICAgICdOb3RlcycsXHJcbiAgICAnUHJlZml4JyxcclxuICAgICdTSUNDb2RlJyxcclxuICAgICdTdWZmaXgnLFxyXG4gICAgJ1RpdGxlJyxcclxuICAgICdUb2xsRnJlZScsXHJcbiAgICAnV2ViQWRkcmVzcycsXHJcbiAgICAnV29ya1Bob25lJyxcclxuICAgICdPd25lci9Pd25lckRlc2NyaXB0aW9uJyxcclxuICBdLFxyXG4gIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgXSxcclxuICByZXNvdXJjZUtpbmQ6ICdsZWFkcycsXHJcblxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIGFwcGx5VG86ICcnLFxyXG4gICAgICBmb3JtYXRWYWx1ZTogZm9ybWF0Lm5hbWVMRixcclxuICAgICAgbGFiZWw6IHRoaXMubGVhZE5hbWVMYXN0Rmlyc3RUZXh0LFxyXG4gICAgICBuYW1lOiAnTGVhZE5hbWVMYXN0Rmlyc3QnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0xlYWROYW1lTGFzdEZpcnN0JyxcclxuICAgICAgdHlwZTogJ25hbWUnLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5uYW1lLFxyXG4gICAgICB2aWV3OiAnbmFtZV9lZGl0JyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuY29tcGFueVRleHQsXHJcbiAgICAgIG5hbWU6ICdDb21wYW55JyxcclxuICAgICAgcHJvcGVydHk6ICdDb21wYW55JyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAxMjgsXHJcbiAgICAgIHZhbGlkYXRvcjogW3ZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCwgdmFsaWRhdG9yLmV4aXN0c10sXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLndlYlRleHQsXHJcbiAgICAgIG5hbWU6ICdXZWJBZGRyZXNzJyxcclxuICAgICAgcHJvcGVydHk6ICdXZWJBZGRyZXNzJyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBpbnB1dFR5cGU6ICd1cmwnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAxMjgsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy53b3JrVGV4dCxcclxuICAgICAgbmFtZTogJ1dvcmtQaG9uZScsXHJcbiAgICAgIHByb3BlcnR5OiAnV29ya1Bob25lJyxcclxuICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5tb2JpbGVUZXh0LFxyXG4gICAgICBuYW1lOiAnTW9iaWxlJyxcclxuICAgICAgcHJvcGVydHk6ICdNb2JpbGUnLFxyXG4gICAgICB0eXBlOiAncGhvbmUnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnRvbGxGcmVlVGV4dCxcclxuICAgICAgbmFtZTogJ1RvbGxGcmVlJyxcclxuICAgICAgcHJvcGVydHk6ICdUb2xsRnJlZScsXHJcbiAgICAgIHR5cGU6ICdwaG9uZScsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuZW1haWxUZXh0LFxyXG4gICAgICBuYW1lOiAnRW1haWwnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0VtYWlsJyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBpbnB1dFR5cGU6ICdlbWFpbCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmNvbnRhY3RUaXRsZVRleHQsXHJcbiAgICAgIG5hbWU6ICdUaXRsZScsXHJcbiAgICAgIHByb3BlcnR5OiAnVGl0bGUnLFxyXG4gICAgICBwaWNrbGlzdDogJ1RpdGxlJyxcclxuICAgICAgdGl0bGU6IHRoaXMudGl0bGVUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgZm9ybWF0VmFsdWU6IGZvcm1hdC5hZGRyZXNzLmJpbmREZWxlZ2F0ZSh0aGlzLCB0cnVlKSxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkcmVzc1RleHQsXHJcbiAgICAgIG5hbWU6ICdBZGRyZXNzJyxcclxuICAgICAgcHJvcGVydHk6ICdBZGRyZXNzJyxcclxuICAgICAgdHlwZTogJ2FkZHJlc3MnLFxyXG4gICAgICB2aWV3OiAnYWRkcmVzc19lZGl0JyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuaW1wb3J0U291cmNlVGV4dCxcclxuICAgICAgbmFtZTogJ0xlYWRTb3VyY2UnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0xlYWRTb3VyY2UnLFxyXG4gICAgICB2aWV3OiAnbGVhZHNvdXJjZV9saXN0JyxcclxuICAgICAgdGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5pbnRlcmVzdHNUZXh0LFxyXG4gICAgICBuYW1lOiAnSW50ZXJlc3RzJyxcclxuICAgICAgcHJvcGVydHk6ICdJbnRlcmVzdHMnLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDEyOCxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmluZHVzdHJ5VGV4dCxcclxuICAgICAgbmFtZTogJ0luZHVzdHJ5JyxcclxuICAgICAgcHJvcGVydHk6ICdJbmR1c3RyeScsXHJcbiAgICAgIHBpY2tsaXN0OiAnSW5kdXN0cnknLFxyXG4gICAgICB0aXRsZTogdGhpcy5pbmR1c3RyeVRpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5zaWNDb2RlVGV4dCxcclxuICAgICAgbmFtZTogJ1NJQ0NvZGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1NJQ0NvZGUnLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuYnVzaW5lc3NUZXh0LFxyXG4gICAgICBuYW1lOiAnQnVzaW5lc3NEZXNjcmlwdGlvbicsXHJcbiAgICAgIHByb3BlcnR5OiAnQnVzaW5lc3NEZXNjcmlwdGlvbicsXHJcbiAgICAgIG5vdGVQcm9wZXJ0eTogZmFsc2UsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmJ1c2luZXNzVGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAnbm90ZScsXHJcbiAgICAgIHZpZXc6ICd0ZXh0X2VkaXQnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5ub3Rlc1RleHQsXHJcbiAgICAgIG5hbWU6ICdOb3RlcycsXHJcbiAgICAgIHByb3BlcnR5OiAnTm90ZXMnLFxyXG4gICAgICBub3RlUHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5ub3Rlc1RpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ25vdGUnLFxyXG4gICAgICB2aWV3OiAndGV4dF9lZGl0JyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMubGVhZE93bmVyVGV4dCxcclxuICAgICAgbmFtZTogJ093bmVyJyxcclxuICAgICAgcHJvcGVydHk6ICdPd25lcicsXHJcbiAgICAgIHRleHRQcm9wZXJ0eTogJ093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgdmlldzogJ293bmVyX2xpc3QnLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19