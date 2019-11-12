define('crm/Views/AddAccountContact', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../Format', '../Validator', '../Template', 'argos/Utility', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _lang, _string, _Format, _Validator, _Template, _Utility, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _Format2 = _interopRequireDefault(_Format);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Template2 = _interopRequireDefault(_Template);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('addAccountContact');

  /**
   * @class crm.Views.AddAccountContact
   *
   *
   * @extends argos.Edit
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

  var __class = (0, _declare2.default)('crm.Views.AddAccountContact', [_Edit2.default], {
    // Localization
    accountNameText: resource.accountNameText,
    accountStatusTitleText: resource.accountStatusTitleText,
    accountSubTypeTitleText: resource.accountSubTypeTitleText,
    accountText: resource.accountText,
    accountTypeTitleText: resource.accountTypeTitleText,
    acctMgrText: resource.acctMgrText,
    addressText: resource.addressText,
    contactTitleText: resource.contactTitleText,
    descriptionText: resource.descriptionText,
    detailsAccountText: resource.detailsAccountText,
    detailsContactText: resource.detailsContactText,
    detailsText: resource.detailsText,
    emailText: resource.emailText,
    faxText: resource.faxText,
    homePhoneText: resource.homePhoneText,
    industryText: resource.industryText,
    ownerText: resource.ownerText,
    lastNameText: resource.lastNameText,
    mobileText: resource.mobileText,
    nameText: resource.nameText,
    statusText: resource.statusText,
    subTypeText: resource.subTypeText,
    titleText: resource.titleText,
    typeText: resource.typeText,
    webText: resource.webText,
    phoneText: resource.phoneText,
    workText: resource.workText,
    industryTitleText: resource.industryTitleText,

    // View Properties
    id: 'add_account_contact',
    resourceKind: 'accounts',
    insertSecurity: 'Entities/Account/Add',
    updateSecurity: 'Entities/Account/Edit',
    entityName: 'Account',
    querySelect: ['AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address', 'BusinessDescription', 'Contact/AccountName', 'Contact/Address', 'Contact/Email', 'Contact/Fax', 'Contact/FirstName', 'Contact/HomePhone', 'Contact/LastName', 'Contact/Mobile', 'Contact/Title', 'Contact/WebAddress', 'Contact/WorkPhone', 'Fax', 'Industry', 'Owner/OwnerDescription', 'Status', 'SubType', 'Type'],
    init: function init() {
      this.inherited(arguments);

      this.connect(this.fields['Contacts.$resources[0].Address'], 'onChange', this.onContactAddressChange);
    },
    getValues: function getValues() {
      var values = this.inherited(arguments);

      _Utility2.default.setValue(values, 'Contacts.$resources[0].$name', 'Contact');
      _Utility2.default.setValue(values, 'Contacts.$resources[0].AccountName', values.AccountName);

      return values;
    },
    formatDependentPicklist: function formatDependentPicklist(dependentValue, fmt) {
      var dependValue = dependentValue;
      if (!_lang2.default.isArray(dependValue)) {
        dependValue = [dependValue];
      }
      return _string2.default.substitute(fmt, [dependValue]);
    },
    onInsertCompleted: function onInsertCompleted(entry) {
      var view = App.getView('account_detail');
      if (view) {
        view.show({
          descriptor: entry.$descriptor,
          key: entry.$key
        }, {
          returnTo: -1
        });
      } else {
        this.inherited(arguments);
      }
    },
    onContactAddressChange: function onContactAddressChange(value) {
      var address = void 0;
      var address1 = void 0;
      // Copy contact address down into the account address if the account address is not set
      if (this.fields.Address) {
        address = this.fields.Address.getValue();
        address1 = address && address.Address1;
      }

      if (!address || !address1) {
        this.fields.Address.setValue(value);
      }
    },
    applyContext: function applyContext(templateEntry) {
      this.inherited(arguments);

      this.fields.AccountManager.setValue(App.context.user);
      this.fields.Owner.setValue(App.context.defaultOwner);

      this.fields.Type.setValue(templateEntry.Type);
      this.fields.Status.setValue(templateEntry.Status);
    },
    convertEntry: function convertEntry(entry) {
      // Fix so that Name Prefix and Suffix picklists function correctly
      if (entry && !entry.Contacts) {
        entry.Contacts = {
          $resources: [{
            FirstName: null,
            LastName: null,
            NameLF: null
          }]
        };
      }
      this.inherited(arguments);
      return entry;
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        emptyText: '',
        formatValue: _Format2.default.nameLF,
        label: this.nameText,
        name: 'Contacts.$resources[0]',
        property: 'Contacts.$resources[0]',
        type: 'name',
        validator: _Validator2.default.name,
        view: 'name_edit'
      }, {
        label: this.accountNameText,
        name: 'AccountName',
        property: 'AccountName',
        type: 'text',
        validator: _Validator2.default.notEmpty
      }, {
        label: this.emailText,
        name: 'Contacts.$resources[0].Email',
        property: 'Contacts.$resources[0].Email',
        type: 'text',
        inputType: 'email'
      }, {
        label: this.webText,
        name: 'WebAddress',
        property: 'WebAddress',
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
        title: this.detailsContactText,
        name: 'ContactInfoSection',
        children: [{
          label: this.contactTitleText,
          name: 'Contacts.$resources[0].Title',
          property: 'Contacts.$resources[0].Title',
          picklist: 'Title',
          title: this.contactTitleText,
          type: 'picklist',
          orderBy: 'text asc'
        }, {
          label: this.homePhoneText,
          name: 'Contacts.$resources[0].HomePhone',
          property: 'Contacts.$resources[0].HomePhone',
          type: 'phone',
          maxTextLength: 32,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          name: 'Contacts.$resources[0].Mobile',
          property: 'Contacts.$resources[0].Mobile',
          label: this.mobileText,
          type: 'phone',
          maxTextLength: 32,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          name: 'Contacts.$resources[0].WorkPhone',
          property: 'Contacts.$resources[0].WorkPhone',
          label: this.workText,
          type: 'phone',
          maxTextLength: 32,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          name: 'Contacts.$resources[0].Fax',
          property: 'Contacts.$resources[0].Fax',
          label: this.faxText,
          type: 'phone',
          maxTextLength: 32,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          emptyText: '',
          formatValue: _Format2.default.address.bindDelegate(this, true, true),
          label: this.addressText,
          name: 'Contacts.$resources[0].Address',
          property: 'Contacts.$resources[0].Address',
          type: 'address',
          view: 'address_edit',
          entityName: 'Contact'
        }]
      }, {
        title: this.detailsAccountText,
        name: 'AccountInfoSection',
        children: [{
          name: 'Fax',
          property: 'Fax',
          label: this.faxText,
          type: 'phone',
          maxTextLength: 32,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          name: 'Type',
          property: 'Type',
          label: this.typeText,
          type: 'picklist',
          picklist: 'Account Type',
          title: this.accountTypeTitleText
        }, {
          name: 'SubType',
          property: 'SubType',
          label: this.subTypeText,
          type: 'picklist',
          requireSelection: false,
          picklist: this.formatDependentPicklist.bindDelegate(this, 'Account ${0}', true),
          title: this.accountSubTypeTitleText,
          dependsOn: 'Type'
        }, {
          name: 'Status',
          property: 'Status',
          label: this.statusText,
          type: 'picklist',
          picklist: 'Account Status',
          title: this.accountStatusTitleText
        }, {
          name: 'Industry',
          property: 'Industry',
          label: this.industryText,
          type: 'picklist',
          picklist: 'Industry',
          title: this.industryTitleText
        }, {
          name: 'BusinessDescription',
          property: 'BusinessDescription',
          label: this.descriptionText,
          type: 'text'
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
          emptyText: '',
          formatValue: _Format2.default.address.bindDelegate(this, true, true),
          label: this.addressText,
          name: 'Address',
          property: 'Address',
          type: 'address',
          view: 'address_edit',
          entityName: 'Account'
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9BZGRBY2NvdW50Q29udGFjdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJhY2NvdW50TmFtZVRleHQiLCJhY2NvdW50U3RhdHVzVGl0bGVUZXh0IiwiYWNjb3VudFN1YlR5cGVUaXRsZVRleHQiLCJhY2NvdW50VGV4dCIsImFjY291bnRUeXBlVGl0bGVUZXh0IiwiYWNjdE1nclRleHQiLCJhZGRyZXNzVGV4dCIsImNvbnRhY3RUaXRsZVRleHQiLCJkZXNjcmlwdGlvblRleHQiLCJkZXRhaWxzQWNjb3VudFRleHQiLCJkZXRhaWxzQ29udGFjdFRleHQiLCJkZXRhaWxzVGV4dCIsImVtYWlsVGV4dCIsImZheFRleHQiLCJob21lUGhvbmVUZXh0IiwiaW5kdXN0cnlUZXh0Iiwib3duZXJUZXh0IiwibGFzdE5hbWVUZXh0IiwibW9iaWxlVGV4dCIsIm5hbWVUZXh0Iiwic3RhdHVzVGV4dCIsInN1YlR5cGVUZXh0IiwidGl0bGVUZXh0IiwidHlwZVRleHQiLCJ3ZWJUZXh0IiwicGhvbmVUZXh0Iiwid29ya1RleHQiLCJpbmR1c3RyeVRpdGxlVGV4dCIsImlkIiwicmVzb3VyY2VLaW5kIiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsImVudGl0eU5hbWUiLCJxdWVyeVNlbGVjdCIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwib25Db250YWN0QWRkcmVzc0NoYW5nZSIsImdldFZhbHVlcyIsInZhbHVlcyIsInNldFZhbHVlIiwiQWNjb3VudE5hbWUiLCJmb3JtYXREZXBlbmRlbnRQaWNrbGlzdCIsImRlcGVuZGVudFZhbHVlIiwiZm10IiwiZGVwZW5kVmFsdWUiLCJpc0FycmF5Iiwic3Vic3RpdHV0ZSIsIm9uSW5zZXJ0Q29tcGxldGVkIiwiZW50cnkiLCJ2aWV3IiwiQXBwIiwiZ2V0VmlldyIsInNob3ciLCJkZXNjcmlwdG9yIiwiJGRlc2NyaXB0b3IiLCJrZXkiLCIka2V5IiwicmV0dXJuVG8iLCJ2YWx1ZSIsImFkZHJlc3MiLCJhZGRyZXNzMSIsIkFkZHJlc3MiLCJnZXRWYWx1ZSIsIkFkZHJlc3MxIiwiYXBwbHlDb250ZXh0IiwidGVtcGxhdGVFbnRyeSIsIkFjY291bnRNYW5hZ2VyIiwiY29udGV4dCIsInVzZXIiLCJPd25lciIsImRlZmF1bHRPd25lciIsIlR5cGUiLCJTdGF0dXMiLCJjb252ZXJ0RW50cnkiLCJDb250YWN0cyIsIiRyZXNvdXJjZXMiLCJGaXJzdE5hbWUiLCJMYXN0TmFtZSIsIk5hbWVMRiIsImNyZWF0ZUxheW91dCIsImxheW91dCIsImVtcHR5VGV4dCIsImZvcm1hdFZhbHVlIiwibmFtZUxGIiwibGFiZWwiLCJuYW1lIiwicHJvcGVydHkiLCJ0eXBlIiwidmFsaWRhdG9yIiwibm90RW1wdHkiLCJpbnB1dFR5cGUiLCJtYXhUZXh0TGVuZ3RoIiwiZXhjZWVkc01heFRleHRMZW5ndGgiLCJ0aXRsZSIsImNoaWxkcmVuIiwicGlja2xpc3QiLCJvcmRlckJ5IiwiYmluZERlbGVnYXRlIiwicmVxdWlyZVNlbGVjdGlvbiIsImRlcGVuZHNPbiIsInRleHRQcm9wZXJ0eSIsInRleHRUZW1wbGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsTUFBTUEsV0FBVyxvQkFBWSxtQkFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQTNCQTs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLE1BQU1DLFVBQVUsdUJBQVEsNkJBQVIsRUFBdUMsZ0JBQXZDLEVBQStDO0FBQzdEO0FBQ0FDLHFCQUFpQkYsU0FBU0UsZUFGbUM7QUFHN0RDLDRCQUF3QkgsU0FBU0csc0JBSDRCO0FBSTdEQyw2QkFBeUJKLFNBQVNJLHVCQUoyQjtBQUs3REMsaUJBQWFMLFNBQVNLLFdBTHVDO0FBTTdEQywwQkFBc0JOLFNBQVNNLG9CQU44QjtBQU83REMsaUJBQWFQLFNBQVNPLFdBUHVDO0FBUTdEQyxpQkFBYVIsU0FBU1EsV0FSdUM7QUFTN0RD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QUsvRSxlQUhYO0FBSURrRixnQkFBTTtBQUpMLFNBdkNPLEVBNENQO0FBQ0RILGlCQUFPLEtBQUtsRixXQURYO0FBRURtRixnQkFBTSxnQkFGTDtBQUdEQyxvQkFBVSxnQkFIVDtBQUlEYyx3QkFBYyxVQUpiO0FBS0RDLHdCQUFjLG1CQUFTbEIsTUFMdEI7QUFNREksZ0JBQU0sUUFOTDtBQU9EdEMsZ0JBQU07QUFQTCxTQTVDTyxFQW9EUDtBQUNEbUMsaUJBQU8sS0FBS3ZFLFNBRFg7QUFFRHdFLGdCQUFNLE9BRkw7QUFHREMsb0JBQVUsT0FIVDtBQUlEYyx3QkFBYyxrQkFKYjtBQUtEYixnQkFBTSxRQUxMO0FBTUR0QyxnQkFBTTtBQU5MLFNBcERPLEVBMkRQO0FBQ0RnQyxxQkFBVyxFQURWO0FBRURDLHVCQUFhLGlCQUFPdkIsT0FBUCxDQUFlc0MsWUFBZixDQUE0QixJQUE1QixFQUFrQyxJQUFsQyxFQUF3QyxJQUF4QyxDQUZaO0FBR0RiLGlCQUFPLEtBQUtqRixXQUhYO0FBSURrRixnQkFBTSxTQUpMO0FBS0RDLG9CQUFVLFNBTFQ7QUFNREMsZ0JBQU0sU0FOTDtBQU9EdEMsZ0JBQU0sY0FQTDtBQVFEcEIsc0JBQVk7QUFSWCxTQTNETztBQUhULE9BckZrQyxDQUE5QixDQUFQO0FBOEpEO0FBalM0RCxHQUEvQyxDQUFoQjs7b0JBb1NlakMsTyIsImZpbGUiOiJBZGRBY2NvdW50Q29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uL0Zvcm1hdCc7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vVmFsaWRhdG9yJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uL1RlbXBsYXRlJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhZGRBY2NvdW50Q29udGFjdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWRkQWNjb3VudENvbnRhY3RcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BZGRBY2NvdW50Q29udGFjdCcsIFtFZGl0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGFjY291bnROYW1lVGV4dDogcmVzb3VyY2UuYWNjb3VudE5hbWVUZXh0LFxyXG4gIGFjY291bnRTdGF0dXNUaXRsZVRleHQ6IHJlc291cmNlLmFjY291bnRTdGF0dXNUaXRsZVRleHQsXHJcbiAgYWNjb3VudFN1YlR5cGVUaXRsZVRleHQ6IHJlc291cmNlLmFjY291bnRTdWJUeXBlVGl0bGVUZXh0LFxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBhY2NvdW50VHlwZVRpdGxlVGV4dDogcmVzb3VyY2UuYWNjb3VudFR5cGVUaXRsZVRleHQsXHJcbiAgYWNjdE1nclRleHQ6IHJlc291cmNlLmFjY3RNZ3JUZXh0LFxyXG4gIGFkZHJlc3NUZXh0OiByZXNvdXJjZS5hZGRyZXNzVGV4dCxcclxuICBjb250YWN0VGl0bGVUZXh0OiByZXNvdXJjZS5jb250YWN0VGl0bGVUZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuZGVzY3JpcHRpb25UZXh0LFxyXG4gIGRldGFpbHNBY2NvdW50VGV4dDogcmVzb3VyY2UuZGV0YWlsc0FjY291bnRUZXh0LFxyXG4gIGRldGFpbHNDb250YWN0VGV4dDogcmVzb3VyY2UuZGV0YWlsc0NvbnRhY3RUZXh0LFxyXG4gIGRldGFpbHNUZXh0OiByZXNvdXJjZS5kZXRhaWxzVGV4dCxcclxuICBlbWFpbFRleHQ6IHJlc291cmNlLmVtYWlsVGV4dCxcclxuICBmYXhUZXh0OiByZXNvdXJjZS5mYXhUZXh0LFxyXG4gIGhvbWVQaG9uZVRleHQ6IHJlc291cmNlLmhvbWVQaG9uZVRleHQsXHJcbiAgaW5kdXN0cnlUZXh0OiByZXNvdXJjZS5pbmR1c3RyeVRleHQsXHJcbiAgb3duZXJUZXh0OiByZXNvdXJjZS5vd25lclRleHQsXHJcbiAgbGFzdE5hbWVUZXh0OiByZXNvdXJjZS5sYXN0TmFtZVRleHQsXHJcbiAgbW9iaWxlVGV4dDogcmVzb3VyY2UubW9iaWxlVGV4dCxcclxuICBuYW1lVGV4dDogcmVzb3VyY2UubmFtZVRleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICBzdWJUeXBlVGV4dDogcmVzb3VyY2Uuc3ViVHlwZVRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgdHlwZVRleHQ6IHJlc291cmNlLnR5cGVUZXh0LFxyXG4gIHdlYlRleHQ6IHJlc291cmNlLndlYlRleHQsXHJcbiAgcGhvbmVUZXh0OiByZXNvdXJjZS5waG9uZVRleHQsXHJcbiAgd29ya1RleHQ6IHJlc291cmNlLndvcmtUZXh0LFxyXG4gIGluZHVzdHJ5VGl0bGVUZXh0OiByZXNvdXJjZS5pbmR1c3RyeVRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdhZGRfYWNjb3VudF9jb250YWN0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdhY2NvdW50cycsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9BY2NvdW50L0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6ICdFbnRpdGllcy9BY2NvdW50L0VkaXQnLFxyXG4gIGVudGl0eU5hbWU6ICdBY2NvdW50JyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0ZpcnN0TmFtZScsXHJcbiAgICAnQWNjb3VudE1hbmFnZXIvVXNlckluZm8vTGFzdE5hbWUnLFxyXG4gICAgJ0FjY291bnROYW1lJyxcclxuICAgICdBZGRyZXNzJyxcclxuICAgICdCdXNpbmVzc0Rlc2NyaXB0aW9uJyxcclxuICAgICdDb250YWN0L0FjY291bnROYW1lJyxcclxuICAgICdDb250YWN0L0FkZHJlc3MnLFxyXG4gICAgJ0NvbnRhY3QvRW1haWwnLFxyXG4gICAgJ0NvbnRhY3QvRmF4JyxcclxuICAgICdDb250YWN0L0ZpcnN0TmFtZScsXHJcbiAgICAnQ29udGFjdC9Ib21lUGhvbmUnLFxyXG4gICAgJ0NvbnRhY3QvTGFzdE5hbWUnLFxyXG4gICAgJ0NvbnRhY3QvTW9iaWxlJyxcclxuICAgICdDb250YWN0L1RpdGxlJyxcclxuICAgICdDb250YWN0L1dlYkFkZHJlc3MnLFxyXG4gICAgJ0NvbnRhY3QvV29ya1Bob25lJyxcclxuICAgICdGYXgnLFxyXG4gICAgJ0luZHVzdHJ5JyxcclxuICAgICdPd25lci9Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICdTdGF0dXMnLFxyXG4gICAgJ1N1YlR5cGUnLFxyXG4gICAgJ1R5cGUnLFxyXG4gIF0sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzWydDb250YWN0cy4kcmVzb3VyY2VzWzBdLkFkZHJlc3MnXSwgJ29uQ2hhbmdlJywgdGhpcy5vbkNvbnRhY3RBZGRyZXNzQ2hhbmdlKTtcclxuICB9LFxyXG4gIGdldFZhbHVlczogZnVuY3Rpb24gZ2V0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICB1dGlsaXR5LnNldFZhbHVlKHZhbHVlcywgJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uJG5hbWUnLCAnQ29udGFjdCcpO1xyXG4gICAgdXRpbGl0eS5zZXRWYWx1ZSh2YWx1ZXMsICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLkFjY291bnROYW1lJywgdmFsdWVzLkFjY291bnROYW1lKTtcclxuXHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG4gIH0sXHJcbiAgZm9ybWF0RGVwZW5kZW50UGlja2xpc3Q6IGZ1bmN0aW9uIGZvcm1hdERlcGVuZGVudFBpY2tsaXN0KGRlcGVuZGVudFZhbHVlLCBmbXQpIHtcclxuICAgIGxldCBkZXBlbmRWYWx1ZSA9IGRlcGVuZGVudFZhbHVlO1xyXG4gICAgaWYgKCFsYW5nLmlzQXJyYXkoZGVwZW5kVmFsdWUpKSB7XHJcbiAgICAgIGRlcGVuZFZhbHVlID0gW2RlcGVuZFZhbHVlXTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShmbXQsIFtkZXBlbmRWYWx1ZV0pO1xyXG4gIH0sXHJcbiAgb25JbnNlcnRDb21wbGV0ZWQ6IGZ1bmN0aW9uIG9uSW5zZXJ0Q29tcGxldGVkKGVudHJ5KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ2FjY291bnRfZGV0YWlsJyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIGRlc2NyaXB0b3I6IGVudHJ5LiRkZXNjcmlwdG9yLFxyXG4gICAgICAgIGtleTogZW50cnkuJGtleSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIHJldHVyblRvOiAtMSxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25Db250YWN0QWRkcmVzc0NoYW5nZTogZnVuY3Rpb24gb25Db250YWN0QWRkcmVzc0NoYW5nZSh2YWx1ZSkge1xyXG4gICAgbGV0IGFkZHJlc3M7XHJcbiAgICBsZXQgYWRkcmVzczE7XHJcbiAgICAvLyBDb3B5IGNvbnRhY3QgYWRkcmVzcyBkb3duIGludG8gdGhlIGFjY291bnQgYWRkcmVzcyBpZiB0aGUgYWNjb3VudCBhZGRyZXNzIGlzIG5vdCBzZXRcclxuICAgIGlmICh0aGlzLmZpZWxkcy5BZGRyZXNzKSB7XHJcbiAgICAgIGFkZHJlc3MgPSB0aGlzLmZpZWxkcy5BZGRyZXNzLmdldFZhbHVlKCk7XHJcbiAgICAgIGFkZHJlc3MxID0gYWRkcmVzcyAmJiBhZGRyZXNzLkFkZHJlc3MxO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghYWRkcmVzcyB8fCAhYWRkcmVzczEpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQWRkcmVzcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhcHBseUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGV4dCh0ZW1wbGF0ZUVudHJ5KSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyLnNldFZhbHVlKEFwcC5jb250ZXh0LnVzZXIpO1xyXG4gICAgdGhpcy5maWVsZHMuT3duZXIuc2V0VmFsdWUoQXBwLmNvbnRleHQuZGVmYXVsdE93bmVyKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5UeXBlLnNldFZhbHVlKHRlbXBsYXRlRW50cnkuVHlwZSk7XHJcbiAgICB0aGlzLmZpZWxkcy5TdGF0dXMuc2V0VmFsdWUodGVtcGxhdGVFbnRyeS5TdGF0dXMpO1xyXG4gIH0sXHJcbiAgY29udmVydEVudHJ5OiBmdW5jdGlvbiBjb252ZXJ0RW50cnkoZW50cnkpIHtcclxuICAgIC8vIEZpeCBzbyB0aGF0IE5hbWUgUHJlZml4IGFuZCBTdWZmaXggcGlja2xpc3RzIGZ1bmN0aW9uIGNvcnJlY3RseVxyXG4gICAgaWYgKGVudHJ5ICYmICFlbnRyeS5Db250YWN0cykge1xyXG4gICAgICBlbnRyeS5Db250YWN0cyA9IHtcclxuICAgICAgICAkcmVzb3VyY2VzOiBbe1xyXG4gICAgICAgICAgRmlyc3ROYW1lOiBudWxsLFxyXG4gICAgICAgICAgTGFzdE5hbWU6IG51bGwsXHJcbiAgICAgICAgICBOYW1lTEY6IG51bGwsXHJcbiAgICAgICAgfV0sXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgcmV0dXJuIGVudHJ5O1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgZm9ybWF0VmFsdWU6IGZvcm1hdC5uYW1lTEYsXHJcbiAgICAgIGxhYmVsOiB0aGlzLm5hbWVUZXh0LFxyXG4gICAgICBuYW1lOiAnQ29udGFjdHMuJHJlc291cmNlc1swXScsXHJcbiAgICAgIHByb3BlcnR5OiAnQ29udGFjdHMuJHJlc291cmNlc1swXScsXHJcbiAgICAgIHR5cGU6ICduYW1lJyxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IubmFtZSxcclxuICAgICAgdmlldzogJ25hbWVfZWRpdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmFjY291bnROYW1lVGV4dCxcclxuICAgICAgbmFtZTogJ0FjY291bnROYW1lJyxcclxuICAgICAgcHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3Iubm90RW1wdHksXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmVtYWlsVGV4dCxcclxuICAgICAgbmFtZTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uRW1haWwnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uRW1haWwnLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIGlucHV0VHlwZTogJ2VtYWlsJyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMud2ViVGV4dCxcclxuICAgICAgbmFtZTogJ1dlYkFkZHJlc3MnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1dlYkFkZHJlc3MnLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIGlucHV0VHlwZTogJ3VybCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDEyOCxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnBob25lVGV4dCxcclxuICAgICAgbmFtZTogJ01haW5QaG9uZScsXHJcbiAgICAgIHByb3BlcnR5OiAnTWFpblBob25lJyxcclxuICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzQ29udGFjdFRleHQsXHJcbiAgICAgIG5hbWU6ICdDb250YWN0SW5mb1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5jb250YWN0VGl0bGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLlRpdGxlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uVGl0bGUnLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnVGl0bGUnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbnRhY3RUaXRsZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBvcmRlckJ5OiAndGV4dCBhc2MnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaG9tZVBob25lVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ29udGFjdHMuJHJlc291cmNlc1swXS5Ib21lUGhvbmUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29udGFjdHMuJHJlc291cmNlc1swXS5Ib21lUGhvbmUnLFxyXG4gICAgICAgIHR5cGU6ICdwaG9uZScsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ29udGFjdHMuJHJlc291cmNlc1swXS5Nb2JpbGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29udGFjdHMuJHJlc291cmNlc1swXS5Nb2JpbGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm1vYmlsZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLldvcmtQaG9uZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLldvcmtQaG9uZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMud29ya1RleHQsXHJcbiAgICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLkZheCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLkZheCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZmF4VGV4dCxcclxuICAgICAgICB0eXBlOiAncGhvbmUnLFxyXG4gICAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBmb3JtYXRWYWx1ZTogZm9ybWF0LmFkZHJlc3MuYmluZERlbGVnYXRlKHRoaXMsIHRydWUsIHRydWUpLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkZHJlc3NUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLkFkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29udGFjdHMuJHJlc291cmNlc1swXS5BZGRyZXNzJyxcclxuICAgICAgICB0eXBlOiAnYWRkcmVzcycsXHJcbiAgICAgICAgdmlldzogJ2FkZHJlc3NfZWRpdCcsXHJcbiAgICAgICAgZW50aXR5TmFtZTogJ0NvbnRhY3QnLFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc0FjY291bnRUZXh0LFxyXG4gICAgICBuYW1lOiAnQWNjb3VudEluZm9TZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0ZheCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdGYXgnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmZheFRleHQsXHJcbiAgICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdUeXBlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1R5cGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnR5cGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdBY2NvdW50IFR5cGUnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmFjY291bnRUeXBlVGl0bGVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N1YlR5cGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3ViVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3ViVHlwZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICByZXF1aXJlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgICBwaWNrbGlzdDogdGhpcy5mb3JtYXREZXBlbmRlbnRQaWNrbGlzdC5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgICB0aGlzLCAnQWNjb3VudCAkezB9JywgdHJ1ZVxyXG4gICAgICAgICksXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuYWNjb3VudFN1YlR5cGVUaXRsZVRleHQsXHJcbiAgICAgICAgZGVwZW5kc09uOiAnVHlwZScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnQWNjb3VudCBTdGF0dXMnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmFjY291bnRTdGF0dXNUaXRsZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnSW5kdXN0cnknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnSW5kdXN0cnknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmluZHVzdHJ5VGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnSW5kdXN0cnknLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmluZHVzdHJ5VGl0bGVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0J1c2luZXNzRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQnVzaW5lc3NEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZGVzY3JpcHRpb25UZXh0LFxyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY3RNZ3JUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TWFuYWdlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50TWFuYWdlcicsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnVXNlckluZm8nLFxyXG4gICAgICAgIHRleHRUZW1wbGF0ZTogdGVtcGxhdGUubmFtZUxGLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHZpZXc6ICd1c2VyX2xpc3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3duZXJUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdPd25lcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPd25lcicsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdmlldzogJ293bmVyX2xpc3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBmb3JtYXRWYWx1ZTogZm9ybWF0LmFkZHJlc3MuYmluZERlbGVnYXRlKHRoaXMsIHRydWUsIHRydWUpLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkZHJlc3NUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBZGRyZXNzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FkZHJlc3MnLFxyXG4gICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcclxuICAgICAgICB2aWV3OiAnYWRkcmVzc19lZGl0JyxcclxuICAgICAgICBlbnRpdHlOYW1lOiAnQWNjb3VudCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19