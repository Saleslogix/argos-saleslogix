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

  var resource = (0, _I18n2.default)('accountEdit');

  /**
   * @class crm.Views.Account.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Edit
   * @requires crm.Format
   * @requires crm.Validator
   * @requires crm.Template
   *
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY2NvdW50L0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiYWNjb3VudFN0YXR1c1RpdGxlVGV4dCIsImFjY291bnRTdWJUeXBlVGl0bGVUZXh0IiwiYWNjb3VudFRleHQiLCJhY2NvdW50VHlwZVRpdGxlVGV4dCIsImFjY3RNZ3JUZXh0IiwiYnVzaW5lc3NEZXNjcmlwdGlvblRleHQiLCJidXNpbmVzc0Rlc2NyaXB0aW9uVGl0bGVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwiZmF4VGV4dCIsImZ1bGxBZGRyZXNzVGV4dCIsImltcG9ydFNvdXJjZVRleHQiLCJpbmR1c3RyeVRleHQiLCJpbmR1c3RyeVRpdGxlVGV4dCIsIm93bmVyVGV4dCIsInBob25lVGV4dCIsInN0YXR1c1RleHQiLCJzdWJUeXBlVGV4dCIsInRpdGxlVGV4dCIsInR5cGVUZXh0Iiwid2ViVGV4dCIsImVudGl0eU5hbWUiLCJpZCIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsInJlc291cmNlS2luZCIsImZvcm1hdERlcGVuZGVudFBpY2tsaXN0IiwiZGVwZW5kZW50VmFsdWUiLCJuZm9ybWF0Iiwic3Vic3RpdHV0ZSIsImFwcGx5Q29udGV4dCIsInRlbXBsYXRlRW50cnkiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJmaWVsZHMiLCJBY2NvdW50TWFuYWdlciIsInNldFZhbHVlIiwiQXBwIiwiY29udGV4dCIsInVzZXIiLCJPd25lciIsImRlZmF1bHRPd25lciIsIlR5cGUiLCJTdGF0dXMiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsYWJlbCIsIm5hbWUiLCJwcm9wZXJ0eSIsInR5cGUiLCJ2YWxpZGF0b3IiLCJub3RFbXB0eSIsImF1dG9Gb2N1cyIsInJlbmRlcmVyIiwibGluayIsImlucHV0VHlwZSIsIm1heFRleHRMZW5ndGgiLCJleGNlZWRzTWF4VGV4dExlbmd0aCIsImVtcHR5VGV4dCIsImZvcm1hdFZhbHVlIiwiYWRkcmVzcyIsImJpbmREZWxlZ2F0ZSIsInZpZXciLCJwaWNrbGlzdCIsInJlcXVpcmVTZWxlY3Rpb24iLCJ0aXRsZSIsImRlcGVuZHNPbiIsIm5vdGVQcm9wZXJ0eSIsInRleHRQcm9wZXJ0eSIsInRleHRUZW1wbGF0ZSIsIm5hbWVMRiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxXQUFXLG9CQUFZLGFBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7Ozs7O0FBekJBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQ0EsTUFBTUMsVUFBVSx1QkFBUSx3QkFBUixFQUFrQyxnQkFBbEMsRUFBMEM7QUFDeEQ7QUFDQUMsNEJBQXdCRixTQUFTRSxzQkFGdUI7QUFHeERDLDZCQUF5QkgsU0FBU0csdUJBSHNCO0FBSXhEQyxpQkFBYUosU0FBU0ksV0FKa0M7QUFLeERDLDBCQUFzQkwsU0FBU0ssb0JBTHlCO0FBTXhEQyxpQkFBYU4sU0FBU00sV0FOa0M7QUFPeERDLDZCQUF5QlAsU0FBU08sdUJBUHNCO0FBUXhEQyxrQ0FBOEJSLFNBQVNRLDRCQVJpQjtBQVN4REMscUJBQWlCVCxTQUFTUyxlQVQ4QjtBQVV4REMsYUFBU1YsU0FBU1UsT0FWc0M7QUFXeERDLHFCQUFpQlgsU0FBU1csZUFYOEI7QUFZeERDLHNCQUFrQlosU0FBU1ksZ0JBWjZCO0FBYXhEQyxrQkFBY2IsU0FBU2EsWUFiaUM7QUFjeERDLHVCQUFtQmQsU0FBU2MsaUJBZDRCO0FBZXhEQyxlQUFXZixTQUFTZSxTQWZvQztBQWdCeERDLGVBQVdoQixTQUFTZ0IsU0FoQm9DO0FBaUJ4REMsZ0JBQVlqQixTQUFTaUIsVUFqQm1DO0FBa0J4REMsaUJBQWFsQixTQUFTa0IsV0FsQmtDO0FBbUJ4REMsZUFBV25CLFNBQVNtQixTQW5Cb0M7QUFvQnhEQyxjQUFVcEIsU0FBU29CLFFBcEJxQztBQXFCeERDLGFBQVNyQixTQUFTcUIsT0FyQnNDOztBQXVCeEQ7QUFD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O0FBT0RhLGNBQU07QUFQTCxPQXJGa0MsRUE2RmxDO0FBQ0RoQixlQUFPLEtBQUtsQyxTQURYO0FBRURtQyxjQUFNLE9BRkw7QUFHREMsa0JBQVUsT0FIVDtBQUlEb0Isc0JBQWMsa0JBSmI7QUFLRG5CLGNBQU0sUUFMTDtBQU1EYSxjQUFNO0FBTkwsT0E3RmtDLEVBb0dsQztBQUNEaEIsZUFBTyxLQUFLckMsZ0JBRFg7QUFFRHNDLGNBQU0sWUFGTDtBQUdEQyxrQkFBVSxZQUhUO0FBSURvQixzQkFBYyxhQUpiO0FBS0RuQixjQUFNLFFBTEw7QUFNRGEsY0FBTTtBQU5MLE9BcEdrQyxDQUE5QixDQUFQO0FBNEdEO0FBN0t1RCxHQUExQyxDQUFoQjs7b0JBZ0xlaEUsTyIsImZpbGUiOiJFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vLi4vVmFsaWRhdG9yJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vVGVtcGxhdGUnO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWNjb3VudEVkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFjY291bnQuRWRpdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FZGl0XHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBjcm0uVmFsaWRhdG9yXHJcbiAqIEByZXF1aXJlcyBjcm0uVGVtcGxhdGVcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWNjb3VudC5FZGl0JywgW0VkaXRdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgYWNjb3VudFN0YXR1c1RpdGxlVGV4dDogcmVzb3VyY2UuYWNjb3VudFN0YXR1c1RpdGxlVGV4dCxcclxuICBhY2NvdW50U3ViVHlwZVRpdGxlVGV4dDogcmVzb3VyY2UuYWNjb3VudFN1YlR5cGVUaXRsZVRleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGFjY291bnRUeXBlVGl0bGVUZXh0OiByZXNvdXJjZS5hY2NvdW50VHlwZVRpdGxlVGV4dCxcclxuICBhY2N0TWdyVGV4dDogcmVzb3VyY2UuYWNjdE1nclRleHQsXHJcbiAgYnVzaW5lc3NEZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLmJ1c2luZXNzRGVzY3JpcHRpb25UZXh0LFxyXG4gIGJ1c2luZXNzRGVzY3JpcHRpb25UaXRsZVRleHQ6IHJlc291cmNlLmJ1c2luZXNzRGVzY3JpcHRpb25UaXRsZVRleHQsXHJcbiAgZGVzY3JpcHRpb25UZXh0OiByZXNvdXJjZS5kZXNjcmlwdGlvblRleHQsXHJcbiAgZmF4VGV4dDogcmVzb3VyY2UuZmF4VGV4dCxcclxuICBmdWxsQWRkcmVzc1RleHQ6IHJlc291cmNlLmZ1bGxBZGRyZXNzVGV4dCxcclxuICBpbXBvcnRTb3VyY2VUZXh0OiByZXNvdXJjZS5pbXBvcnRTb3VyY2VUZXh0LFxyXG4gIGluZHVzdHJ5VGV4dDogcmVzb3VyY2UuaW5kdXN0cnlUZXh0LFxyXG4gIGluZHVzdHJ5VGl0bGVUZXh0OiByZXNvdXJjZS5pbmR1c3RyeVRpdGxlVGV4dCxcclxuICBvd25lclRleHQ6IHJlc291cmNlLm93bmVyVGV4dCxcclxuICBwaG9uZVRleHQ6IHJlc291cmNlLnBob25lVGV4dCxcclxuICBzdGF0dXNUZXh0OiByZXNvdXJjZS5zdGF0dXNUZXh0LFxyXG4gIHN1YlR5cGVUZXh0OiByZXNvdXJjZS5zdWJUeXBlVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICB0eXBlVGV4dDogcmVzb3VyY2UudHlwZVRleHQsXHJcbiAgd2ViVGV4dDogcmVzb3VyY2Uud2ViVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZW50aXR5TmFtZTogJ0FjY291bnQnLFxyXG4gIGlkOiAnYWNjb3VudF9lZGl0JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL0FjY291bnQvQWRkJyxcclxuICB1cGRhdGVTZWN1cml0eTogJ0VudGl0aWVzL0FjY291bnQvRWRpdCcsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0xhc3ROYW1lJyxcclxuICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAnQWRkcmVzcy8qJyxcclxuICAgICdCdXNpbmVzc0Rlc2NyaXB0aW9uJyxcclxuICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAnRmF4JyxcclxuICAgICdJbmR1c3RyeScsXHJcbiAgICAnTGVhZFNvdXJjZS9EZXNjcmlwdGlvbicsXHJcbiAgICAnTWFpblBob25lJyxcclxuICAgICdOb3RlcycsXHJcbiAgICAnT3duZXIvT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAnU3RhdHVzJyxcclxuICAgICdTdWJUeXBlJyxcclxuICAgICdUeXBlJyxcclxuICAgICdVc2VyL1VzZXJJbmZvL1VzZXJOYW1lJyxcclxuICAgICdXZWJBZGRyZXNzJyxcclxuICBdLFxyXG4gIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgXSxcclxuICByZXNvdXJjZUtpbmQ6ICdhY2NvdW50cycsXHJcblxyXG4gIGZvcm1hdERlcGVuZGVudFBpY2tsaXN0OiBmdW5jdGlvbiBmb3JtYXREZXBlbmRlbnRQaWNrbGlzdChkZXBlbmRlbnRWYWx1ZSwgbmZvcm1hdCkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdGl0dXRlKG5mb3JtYXQsIFtkZXBlbmRlbnRWYWx1ZV0pO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQodGVtcGxhdGVFbnRyeSkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXBwbHlDb250ZXh0LCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyLnNldFZhbHVlKEFwcC5jb250ZXh0LnVzZXIpO1xyXG4gICAgdGhpcy5maWVsZHMuT3duZXIuc2V0VmFsdWUoQXBwLmNvbnRleHQuZGVmYXVsdE93bmVyKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5UeXBlLnNldFZhbHVlKHRlbXBsYXRlRW50cnkuVHlwZSk7XHJcbiAgICB0aGlzLmZpZWxkcy5TdGF0dXMuc2V0VmFsdWUodGVtcGxhdGVFbnRyeS5TdGF0dXMpO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgIHByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLm5vdEVtcHR5LFxyXG4gICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLndlYlRleHQsXHJcbiAgICAgIG5hbWU6ICdXZWJBZGRyZXNzJyxcclxuICAgICAgcHJvcGVydHk6ICdXZWJBZGRyZXNzJyxcclxuICAgICAgcmVuZGVyZXI6IGZvcm1hdC5saW5rLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIGlucHV0VHlwZTogJ3VybCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDEyOCxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnBob25lVGV4dCxcclxuICAgICAgbmFtZTogJ01haW5QaG9uZScsXHJcbiAgICAgIHByb3BlcnR5OiAnTWFpblBob25lJyxcclxuICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICBmb3JtYXRWYWx1ZTogZm9ybWF0LmFkZHJlc3MuYmluZERlbGVnYXRlKHRoaXMsIFt0cnVlXSwgdHJ1ZSksXHJcbiAgICAgIGxhYmVsOiB0aGlzLmZ1bGxBZGRyZXNzVGV4dCxcclxuICAgICAgbmFtZTogJ0FkZHJlc3MnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0FkZHJlc3MnLFxyXG4gICAgICB0eXBlOiAnYWRkcmVzcycsXHJcbiAgICAgIHZpZXc6ICdhZGRyZXNzX2VkaXQnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5mYXhUZXh0LFxyXG4gICAgICBuYW1lOiAnRmF4JyxcclxuICAgICAgcHJvcGVydHk6ICdGYXgnLFxyXG4gICAgICB0eXBlOiAncGhvbmUnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnR5cGVUZXh0LFxyXG4gICAgICBuYW1lOiAnVHlwZScsXHJcbiAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgIHBpY2tsaXN0OiAnQWNjb3VudCBUeXBlJyxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgdGl0bGU6IHRoaXMuYWNjb3VudFR5cGVUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGRlcGVuZHNPbjogJ1R5cGUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5zdWJUeXBlVGV4dCxcclxuICAgICAgbmFtZTogJ1N1YlR5cGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N1YlR5cGUnLFxyXG4gICAgICBwaWNrbGlzdDogdGhpcy5mb3JtYXREZXBlbmRlbnRQaWNrbGlzdC5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgdGhpcywgJ0FjY291bnQgJHswfScsIHRydWVcclxuICAgICAgKSxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjY291bnRTdWJUeXBlVGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnN0YXR1c1RleHQsXHJcbiAgICAgIG5hbWU6ICdTdGF0dXMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICAgIHBpY2tsaXN0OiAnQWNjb3VudCBTdGF0dXMnLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuYWNjb3VudFN0YXR1c1RpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuaW5kdXN0cnlUZXh0LFxyXG4gICAgICBuYW1lOiAnSW5kdXN0cnknLFxyXG4gICAgICBwcm9wZXJ0eTogJ0luZHVzdHJ5JyxcclxuICAgICAgcGlja2xpc3Q6ICdJbmR1c3RyeScsXHJcbiAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5pbmR1c3RyeVRpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5idXNpbmVzc0Rlc2NyaXB0aW9uVGV4dCxcclxuICAgICAgbmFtZTogJ0J1c2luZXNzRGVzY3JpcHRpb24nLFxyXG4gICAgICBwcm9wZXJ0eTogJ0J1c2luZXNzRGVzY3JpcHRpb24nLFxyXG4gICAgICBub3RlUHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5idXNpbmVzc0Rlc2NyaXB0aW9uVGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAnbm90ZScsXHJcbiAgICAgIHZpZXc6ICd0ZXh0X2VkaXQnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5hY2N0TWdyVGV4dCxcclxuICAgICAgbmFtZTogJ0FjY291bnRNYW5hZ2VyJyxcclxuICAgICAgcHJvcGVydHk6ICdBY2NvdW50TWFuYWdlcicsXHJcbiAgICAgIHRleHRQcm9wZXJ0eTogJ1VzZXJJbmZvJyxcclxuICAgICAgdGV4dFRlbXBsYXRlOiB0ZW1wbGF0ZS5uYW1lTEYsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICB2aWV3OiAndXNlcl9saXN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMub3duZXJUZXh0LFxyXG4gICAgICBuYW1lOiAnT3duZXInLFxyXG4gICAgICBwcm9wZXJ0eTogJ093bmVyJyxcclxuICAgICAgdGV4dFByb3BlcnR5OiAnT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICB2aWV3OiAnb3duZXJfbGlzdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmltcG9ydFNvdXJjZVRleHQsXHJcbiAgICAgIG5hbWU6ICdMZWFkU291cmNlJyxcclxuICAgICAgcHJvcGVydHk6ICdMZWFkU291cmNlJyxcclxuICAgICAgdGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgdmlldzogJ2xlYWRzb3VyY2VfbGlzdCcsXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=