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
      this.inherited(init, arguments);

      this.connect(this.fields['Contacts.$resources[0].Address'], 'onChange', this.onContactAddressChange);
    },
    getValues: function getValues() {
      var values = this.inherited(getValues, arguments);

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
        this.inherited(onInsertCompleted, arguments);
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
      this.inherited(applyContext, arguments);

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
      this.inherited(convertEntry, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9BZGRBY2NvdW50Q29udGFjdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJhY2NvdW50TmFtZVRleHQiLCJhY2NvdW50U3RhdHVzVGl0bGVUZXh0IiwiYWNjb3VudFN1YlR5cGVUaXRsZVRleHQiLCJhY2NvdW50VGV4dCIsImFjY291bnRUeXBlVGl0bGVUZXh0IiwiYWNjdE1nclRleHQiLCJhZGRyZXNzVGV4dCIsImNvbnRhY3RUaXRsZVRleHQiLCJkZXNjcmlwdGlvblRleHQiLCJkZXRhaWxzQWNjb3VudFRleHQiLCJkZXRhaWxzQ29udGFjdFRleHQiLCJkZXRhaWxzVGV4dCIsImVtYWlsVGV4dCIsImZheFRleHQiLCJob21lUGhvbmVUZXh0IiwiaW5kdXN0cnlUZXh0Iiwib3duZXJUZXh0IiwibGFzdE5hbWVUZXh0IiwibW9iaWxlVGV4dCIsIm5hbWVUZXh0Iiwic3RhdHVzVGV4dCIsInN1YlR5cGVUZXh0IiwidGl0bGVUZXh0IiwidHlwZVRleHQiLCJ3ZWJUZXh0IiwicGhvbmVUZXh0Iiwid29ya1RleHQiLCJpbmR1c3RyeVRpdGxlVGV4dCIsImlkIiwicmVzb3VyY2VLaW5kIiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsImVudGl0eU5hbWUiLCJxdWVyeVNlbGVjdCIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwib25Db250YWN0QWRkcmVzc0NoYW5nZSIsImdldFZhbHVlcyIsInZhbHVlcyIsInNldFZhbHVlIiwiQWNjb3VudE5hbWUiLCJmb3JtYXREZXBlbmRlbnRQaWNrbGlzdCIsImRlcGVuZGVudFZhbHVlIiwiZm10IiwiZGVwZW5kVmFsdWUiLCJpc0FycmF5Iiwic3Vic3RpdHV0ZSIsIm9uSW5zZXJ0Q29tcGxldGVkIiwiZW50cnkiLCJ2aWV3IiwiQXBwIiwiZ2V0VmlldyIsInNob3ciLCJkZXNjcmlwdG9yIiwiJGRlc2NyaXB0b3IiLCJrZXkiLCIka2V5IiwicmV0dXJuVG8iLCJ2YWx1ZSIsImFkZHJlc3MiLCJhZGRyZXNzMSIsIkFkZHJlc3MiLCJnZXRWYWx1ZSIsIkFkZHJlc3MxIiwiYXBwbHlDb250ZXh0IiwidGVtcGxhdGVFbnRyeSIsIkFjY291bnRNYW5hZ2VyIiwiY29udGV4dCIsInVzZXIiLCJPd25lciIsImRlZmF1bHRPd25lciIsIlR5cGUiLCJTdGF0dXMiLCJjb252ZXJ0RW50cnkiLCJDb250YWN0cyIsIiRyZXNvdXJjZXMiLCJGaXJzdE5hbWUiLCJMYXN0TmFtZSIsIk5hbWVMRiIsImNyZWF0ZUxheW91dCIsImxheW91dCIsImVtcHR5VGV4dCIsImZvcm1hdFZhbHVlIiwibmFtZUxGIiwibGFiZWwiLCJuYW1lIiwicHJvcGVydHkiLCJ0eXBlIiwidmFsaWRhdG9yIiwibm90RW1wdHkiLCJpbnB1dFR5cGUiLCJtYXhUZXh0TGVuZ3RoIiwiZXhjZWVkc01heFRleHRMZW5ndGgiLCJ0aXRsZSIsImNoaWxkcmVuIiwicGlja2xpc3QiLCJvcmRlckJ5IiwiYmluZERlbGVnYXRlIiwicmVxdWlyZVNlbGVjdGlvbiIsImRlcGVuZHNPbiIsInRleHRQcm9wZXJ0eSIsInRleHRUZW1wbGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsTUFBTUEsV0FBVyxvQkFBWSxtQkFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQTNCQTs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLE1BQU1DLFVBQVUsdUJBQVEsNkJBQVIsRUFBdUMsZ0JBQXZDLEVBQStDO0FBQzdEO0FBQ0FDLHFCQUFpQkYsU0FBU0UsZUFGbUM7QUFHN0RDLDRCQUF3QkgsU0FBU0csc0JBSDRCO0FBSTdEQyw2QkFBeUJKLFNBQVNJLHVCQUoyQjtBQUs3REMsaUJBQWFMLFNBQVNLLFdBTHVDO0FBTTdEQywwQkFBc0JOLFNBQVNNLG9CQU44QjtBQU83REMsaUJBQWFQLFNBQVNPLFdBUHVDO0FBUTdEQyxpQkFBYVIsU0FBU1EsV0FSdUM7QUFTN0RD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RTtBQU5YLFNBaENPLEVBdUNQO0FBQ0Q2RCxnQkFBTSxxQkFETDtBQUVEQyxvQkFBVSxxQkFGVDtBQUdERixpQkFBTyxLQUFLL0UsZUFIWDtBQUlEa0YsZ0JBQU07QUFKTCxTQXZDTyxFQTRDUDtBQUNESCxpQkFBTyxLQUFLbEYsV0FEWDtBQUVEbUYsZ0JBQU0sZ0JBRkw7QUFHREMsb0JBQVUsZ0JBSFQ7QUFJRGMsd0JBQWMsVUFKYjtBQUtEQyx3QkFBYyxtQkFBU2xCLE1BTHRCO0FBTURJLGdCQUFNLFFBTkw7QUFPRHRDLGdCQUFNO0FBUEwsU0E1Q08sRUFvRFA7QUFDRG1DLGlCQUFPLEtBQUt2RSxTQURYO0FBRUR3RSxnQkFBTSxPQUZMO0FBR0RDLG9CQUFVLE9BSFQ7QUFJRGMsd0JBQWMsa0JBSmI7QUFLRGIsZ0JBQU0sUUFMTDtBQU1EdEMsZ0JBQU07QUFOTCxTQXBETyxFQTJEUDtBQUNEZ0MscUJBQVcsRUFEVjtBQUVEQyx1QkFBYSxpQkFBT3ZCLE9BQVAsQ0FBZXNDLFlBQWYsQ0FBNEIsSUFBNUIsRUFBa0MsSUFBbEMsRUFBd0MsSUFBeEMsQ0FGWjtBQUdEYixpQkFBTyxLQUFLakYsV0FIWDtBQUlEa0YsZ0JBQU0sU0FKTDtBQUtEQyxvQkFBVSxTQUxUO0FBTURDLGdCQUFNLFNBTkw7QUFPRHRDLGdCQUFNLGNBUEw7QUFRRHBCLHNCQUFZO0FBUlgsU0EzRE87QUFIVCxPQXJGa0MsQ0FBOUIsQ0FBUDtBQThKRDtBQWpTNEQsR0FBL0MsQ0FBaEI7O29CQW9TZWpDLE8iLCJmaWxlIjoiQWRkQWNjb3VudENvbnRhY3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi9Gb3JtYXQnO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uL1ZhbGlkYXRvcic7XHJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi9UZW1wbGF0ZSc7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJ2FyZ29zL1V0aWxpdHknO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWRkQWNjb3VudENvbnRhY3QnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFkZEFjY291bnRDb250YWN0XHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWRkQWNjb3VudENvbnRhY3QnLCBbRWRpdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY2NvdW50TmFtZVRleHQ6IHJlc291cmNlLmFjY291bnROYW1lVGV4dCxcclxuICBhY2NvdW50U3RhdHVzVGl0bGVUZXh0OiByZXNvdXJjZS5hY2NvdW50U3RhdHVzVGl0bGVUZXh0LFxyXG4gIGFjY291bnRTdWJUeXBlVGl0bGVUZXh0OiByZXNvdXJjZS5hY2NvdW50U3ViVHlwZVRpdGxlVGV4dCxcclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgYWNjb3VudFR5cGVUaXRsZVRleHQ6IHJlc291cmNlLmFjY291bnRUeXBlVGl0bGVUZXh0LFxyXG4gIGFjY3RNZ3JUZXh0OiByZXNvdXJjZS5hY2N0TWdyVGV4dCxcclxuICBhZGRyZXNzVGV4dDogcmVzb3VyY2UuYWRkcmVzc1RleHQsXHJcbiAgY29udGFjdFRpdGxlVGV4dDogcmVzb3VyY2UuY29udGFjdFRpdGxlVGV4dCxcclxuICBkZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLmRlc2NyaXB0aW9uVGV4dCxcclxuICBkZXRhaWxzQWNjb3VudFRleHQ6IHJlc291cmNlLmRldGFpbHNBY2NvdW50VGV4dCxcclxuICBkZXRhaWxzQ29udGFjdFRleHQ6IHJlc291cmNlLmRldGFpbHNDb250YWN0VGV4dCxcclxuICBkZXRhaWxzVGV4dDogcmVzb3VyY2UuZGV0YWlsc1RleHQsXHJcbiAgZW1haWxUZXh0OiByZXNvdXJjZS5lbWFpbFRleHQsXHJcbiAgZmF4VGV4dDogcmVzb3VyY2UuZmF4VGV4dCxcclxuICBob21lUGhvbmVUZXh0OiByZXNvdXJjZS5ob21lUGhvbmVUZXh0LFxyXG4gIGluZHVzdHJ5VGV4dDogcmVzb3VyY2UuaW5kdXN0cnlUZXh0LFxyXG4gIG93bmVyVGV4dDogcmVzb3VyY2Uub3duZXJUZXh0LFxyXG4gIGxhc3ROYW1lVGV4dDogcmVzb3VyY2UubGFzdE5hbWVUZXh0LFxyXG4gIG1vYmlsZVRleHQ6IHJlc291cmNlLm1vYmlsZVRleHQsXHJcbiAgbmFtZVRleHQ6IHJlc291cmNlLm5hbWVUZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgc3ViVHlwZVRleHQ6IHJlc291cmNlLnN1YlR5cGVUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHR5cGVUZXh0OiByZXNvdXJjZS50eXBlVGV4dCxcclxuICB3ZWJUZXh0OiByZXNvdXJjZS53ZWJUZXh0LFxyXG4gIHBob25lVGV4dDogcmVzb3VyY2UucGhvbmVUZXh0LFxyXG4gIHdvcmtUZXh0OiByZXNvdXJjZS53b3JrVGV4dCxcclxuICBpbmR1c3RyeVRpdGxlVGV4dDogcmVzb3VyY2UuaW5kdXN0cnlUaXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnYWRkX2FjY291bnRfY29udGFjdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAnYWNjb3VudHMnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvQWNjb3VudC9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiAnRW50aXRpZXMvQWNjb3VudC9FZGl0JyxcclxuICBlbnRpdHlOYW1lOiAnQWNjb3VudCcsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0xhc3ROYW1lJyxcclxuICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAnQWRkcmVzcycsXHJcbiAgICAnQnVzaW5lc3NEZXNjcmlwdGlvbicsXHJcbiAgICAnQ29udGFjdC9BY2NvdW50TmFtZScsXHJcbiAgICAnQ29udGFjdC9BZGRyZXNzJyxcclxuICAgICdDb250YWN0L0VtYWlsJyxcclxuICAgICdDb250YWN0L0ZheCcsXHJcbiAgICAnQ29udGFjdC9GaXJzdE5hbWUnLFxyXG4gICAgJ0NvbnRhY3QvSG9tZVBob25lJyxcclxuICAgICdDb250YWN0L0xhc3ROYW1lJyxcclxuICAgICdDb250YWN0L01vYmlsZScsXHJcbiAgICAnQ29udGFjdC9UaXRsZScsXHJcbiAgICAnQ29udGFjdC9XZWJBZGRyZXNzJyxcclxuICAgICdDb250YWN0L1dvcmtQaG9uZScsXHJcbiAgICAnRmF4JyxcclxuICAgICdJbmR1c3RyeScsXHJcbiAgICAnT3duZXIvT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAnU3RhdHVzJyxcclxuICAgICdTdWJUeXBlJyxcclxuICAgICdUeXBlJyxcclxuICBdLFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkc1snQ29udGFjdHMuJHJlc291cmNlc1swXS5BZGRyZXNzJ10sICdvbkNoYW5nZScsIHRoaXMub25Db250YWN0QWRkcmVzc0NoYW5nZSk7XHJcbiAgfSxcclxuICBnZXRWYWx1ZXM6IGZ1bmN0aW9uIGdldFZhbHVlcygpIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuaW5oZXJpdGVkKGdldFZhbHVlcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICB1dGlsaXR5LnNldFZhbHVlKHZhbHVlcywgJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uJG5hbWUnLCAnQ29udGFjdCcpO1xyXG4gICAgdXRpbGl0eS5zZXRWYWx1ZSh2YWx1ZXMsICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLkFjY291bnROYW1lJywgdmFsdWVzLkFjY291bnROYW1lKTtcclxuXHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG4gIH0sXHJcbiAgZm9ybWF0RGVwZW5kZW50UGlja2xpc3Q6IGZ1bmN0aW9uIGZvcm1hdERlcGVuZGVudFBpY2tsaXN0KGRlcGVuZGVudFZhbHVlLCBmbXQpIHtcclxuICAgIGxldCBkZXBlbmRWYWx1ZSA9IGRlcGVuZGVudFZhbHVlO1xyXG4gICAgaWYgKCFsYW5nLmlzQXJyYXkoZGVwZW5kVmFsdWUpKSB7XHJcbiAgICAgIGRlcGVuZFZhbHVlID0gW2RlcGVuZFZhbHVlXTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShmbXQsIFtkZXBlbmRWYWx1ZV0pO1xyXG4gIH0sXHJcbiAgb25JbnNlcnRDb21wbGV0ZWQ6IGZ1bmN0aW9uIG9uSW5zZXJ0Q29tcGxldGVkKGVudHJ5KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ2FjY291bnRfZGV0YWlsJyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIGRlc2NyaXB0b3I6IGVudHJ5LiRkZXNjcmlwdG9yLFxyXG4gICAgICAgIGtleTogZW50cnkuJGtleSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIHJldHVyblRvOiAtMSxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChvbkluc2VydENvbXBsZXRlZCwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uQ29udGFjdEFkZHJlc3NDaGFuZ2U6IGZ1bmN0aW9uIG9uQ29udGFjdEFkZHJlc3NDaGFuZ2UodmFsdWUpIHtcclxuICAgIGxldCBhZGRyZXNzO1xyXG4gICAgbGV0IGFkZHJlc3MxO1xyXG4gICAgLy8gQ29weSBjb250YWN0IGFkZHJlc3MgZG93biBpbnRvIHRoZSBhY2NvdW50IGFkZHJlc3MgaWYgdGhlIGFjY291bnQgYWRkcmVzcyBpcyBub3Qgc2V0XHJcbiAgICBpZiAodGhpcy5maWVsZHMuQWRkcmVzcykge1xyXG4gICAgICBhZGRyZXNzID0gdGhpcy5maWVsZHMuQWRkcmVzcy5nZXRWYWx1ZSgpO1xyXG4gICAgICBhZGRyZXNzMSA9IGFkZHJlc3MgJiYgYWRkcmVzcy5BZGRyZXNzMTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWFkZHJlc3MgfHwgIWFkZHJlc3MxKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFkZHJlc3Muc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQodGVtcGxhdGVFbnRyeSkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXBwbHlDb250ZXh0LCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyLnNldFZhbHVlKEFwcC5jb250ZXh0LnVzZXIpO1xyXG4gICAgdGhpcy5maWVsZHMuT3duZXIuc2V0VmFsdWUoQXBwLmNvbnRleHQuZGVmYXVsdE93bmVyKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5UeXBlLnNldFZhbHVlKHRlbXBsYXRlRW50cnkuVHlwZSk7XHJcbiAgICB0aGlzLmZpZWxkcy5TdGF0dXMuc2V0VmFsdWUodGVtcGxhdGVFbnRyeS5TdGF0dXMpO1xyXG4gIH0sXHJcbiAgY29udmVydEVudHJ5OiBmdW5jdGlvbiBjb252ZXJ0RW50cnkoZW50cnkpIHtcclxuICAgIC8vIEZpeCBzbyB0aGF0IE5hbWUgUHJlZml4IGFuZCBTdWZmaXggcGlja2xpc3RzIGZ1bmN0aW9uIGNvcnJlY3RseVxyXG4gICAgaWYgKGVudHJ5ICYmICFlbnRyeS5Db250YWN0cykge1xyXG4gICAgICBlbnRyeS5Db250YWN0cyA9IHtcclxuICAgICAgICAkcmVzb3VyY2VzOiBbe1xyXG4gICAgICAgICAgRmlyc3ROYW1lOiBudWxsLFxyXG4gICAgICAgICAgTGFzdE5hbWU6IG51bGwsXHJcbiAgICAgICAgICBOYW1lTEY6IG51bGwsXHJcbiAgICAgICAgfV0sXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaGVyaXRlZChjb252ZXJ0RW50cnksIGFyZ3VtZW50cyk7XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICBmb3JtYXRWYWx1ZTogZm9ybWF0Lm5hbWVMRixcclxuICAgICAgbGFiZWw6IHRoaXMubmFtZVRleHQsXHJcbiAgICAgIG5hbWU6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdJyxcclxuICAgICAgcHJvcGVydHk6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdJyxcclxuICAgICAgdHlwZTogJ25hbWUnLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5uYW1lLFxyXG4gICAgICB2aWV3OiAnbmFtZV9lZGl0JyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudE5hbWVUZXh0LFxyXG4gICAgICBuYW1lOiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5ub3RFbXB0eSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuZW1haWxUZXh0LFxyXG4gICAgICBuYW1lOiAnQ29udGFjdHMuJHJlc291cmNlc1swXS5FbWFpbCcsXHJcbiAgICAgIHByb3BlcnR5OiAnQ29udGFjdHMuJHJlc291cmNlc1swXS5FbWFpbCcsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgaW5wdXRUeXBlOiAnZW1haWwnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy53ZWJUZXh0LFxyXG4gICAgICBuYW1lOiAnV2ViQWRkcmVzcycsXHJcbiAgICAgIHByb3BlcnR5OiAnV2ViQWRkcmVzcycsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgaW5wdXRUeXBlOiAndXJsJyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMTI4LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMucGhvbmVUZXh0LFxyXG4gICAgICBuYW1lOiAnTWFpblBob25lJyxcclxuICAgICAgcHJvcGVydHk6ICdNYWluUGhvbmUnLFxyXG4gICAgICB0eXBlOiAncGhvbmUnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNDb250YWN0VGV4dCxcclxuICAgICAgbmFtZTogJ0NvbnRhY3RJbmZvU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbnRhY3RUaXRsZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uVGl0bGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29udGFjdHMuJHJlc291cmNlc1swXS5UaXRsZScsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdUaXRsZScsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuY29udGFjdFRpdGxlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5ob21lUGhvbmVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLkhvbWVQaG9uZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLkhvbWVQaG9uZScsXHJcbiAgICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLk1vYmlsZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLk1vYmlsZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubW9iaWxlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGhvbmUnLFxyXG4gICAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uV29ya1Bob25lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uV29ya1Bob25lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy53b3JrVGV4dCxcclxuICAgICAgICB0eXBlOiAncGhvbmUnLFxyXG4gICAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uRmF4JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uRmF4JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5mYXhUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaG9uZScsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIGZvcm1hdFZhbHVlOiBmb3JtYXQuYWRkcmVzcy5iaW5kRGVsZWdhdGUodGhpcywgdHJ1ZSwgdHJ1ZSksXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWRkcmVzc1RleHQsXHJcbiAgICAgICAgbmFtZTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uQWRkcmVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDb250YWN0cy4kcmVzb3VyY2VzWzBdLkFkZHJlc3MnLFxyXG4gICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcclxuICAgICAgICB2aWV3OiAnYWRkcmVzc19lZGl0JyxcclxuICAgICAgICBlbnRpdHlOYW1lOiAnQ29udGFjdCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzQWNjb3VudFRleHQsXHJcbiAgICAgIG5hbWU6ICdBY2NvdW50SW5mb1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnRmF4JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0ZheCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZmF4VGV4dCxcclxuICAgICAgICB0eXBlOiAncGhvbmUnLFxyXG4gICAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudHlwZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBwaWNrbGlzdDogJ0FjY291bnQgVHlwZScsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuYWNjb3VudFR5cGVUaXRsZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU3ViVHlwZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdWJUeXBlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zdWJUeXBlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgIHBpY2tsaXN0OiB0aGlzLmZvcm1hdERlcGVuZGVudFBpY2tsaXN0LmJpbmREZWxlZ2F0ZShcclxuICAgICAgICAgIHRoaXMsICdBY2NvdW50ICR7MH0nLCB0cnVlXHJcbiAgICAgICAgKSxcclxuICAgICAgICB0aXRsZTogdGhpcy5hY2NvdW50U3ViVHlwZVRpdGxlVGV4dCxcclxuICAgICAgICBkZXBlbmRzT246ICdUeXBlJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdBY2NvdW50IFN0YXR1cycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuYWNjb3VudFN0YXR1c1RpdGxlVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdJbmR1c3RyeScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdJbmR1c3RyeScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaW5kdXN0cnlUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdJbmR1c3RyeScsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuaW5kdXN0cnlUaXRsZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQnVzaW5lc3NEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdCdXNpbmVzc0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kZXNjcmlwdGlvblRleHQsXHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjdE1nclRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjY291bnRNYW5hZ2VyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnRNYW5hZ2VyJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdVc2VySW5mbycsXHJcbiAgICAgICAgdGV4dFRlbXBsYXRlOiB0ZW1wbGF0ZS5uYW1lTEYsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdmlldzogJ3VzZXJfbGlzdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5vd25lclRleHQsXHJcbiAgICAgICAgbmFtZTogJ093bmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ093bmVyJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdPd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB2aWV3OiAnb3duZXJfbGlzdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIGZvcm1hdFZhbHVlOiBmb3JtYXQuYWRkcmVzcy5iaW5kRGVsZWdhdGUodGhpcywgdHJ1ZSwgdHJ1ZSksXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWRkcmVzc1RleHQsXHJcbiAgICAgICAgbmFtZTogJ0FkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWRkcmVzcycsXHJcbiAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxyXG4gICAgICAgIHZpZXc6ICdhZGRyZXNzX2VkaXQnLFxyXG4gICAgICAgIGVudGl0eU5hbWU6ICdBY2NvdW50JyxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=