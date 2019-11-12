define('crm/Views/Contact/Edit', ['module', 'exports', 'dojo/_base/declare', 'crm/Format', 'crm/Template', 'crm/Validator', 'argos/Edit', 'argos/Utility', 'argos/I18n'], function (module, exports, _declare, _Format, _Template, _Validator, _Edit, _Utility, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Template2 = _interopRequireDefault(_Template);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('contactEdit');

  /**
   * @class crm.Views.Contact.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Utility
   *
   * @requires crm.Format
   * @requires crm.Template
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

  var __class = (0, _declare2.default)('crm.Views.Contact.Edit', [_Edit2.default], {
    // Localization
    titleText: resource.titleText,
    nameText: resource.nameText,
    workText: resource.workText,
    mobileText: resource.mobileText,
    emailText: resource.emailText,
    webText: resource.webText,
    acctMgrText: resource.acctMgrText,
    accountNameText: resource.accountNameText,
    homePhoneText: resource.homePhoneText,
    faxText: resource.faxText,
    addressText: resource.addressText,
    contactTitleText: resource.contactTitleText,
    titleTitleText: resource.titleTitleText,
    addressTitleText: resource.addressTitleText,
    ownerText: resource.ownerText,
    cuisinePreferenceText: resource.cuisinePreferenceText,

    // View Properties
    entityName: 'Contact',
    id: 'contact_edit',
    insertSecurity: 'Entities/Contact/Add',
    updateSecurity: 'Entities/Contact/Edit',
    querySelect: ['Account/AccountName', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'CuisinePreference', 'CreateDate', 'CreateUser', 'Email', 'Fax', 'FirstName', 'HomePhone', 'LastName', 'MiddleName', 'Mobile', 'Name', 'NameLF', 'Owner/OwnerDescription', 'Prefix', 'Suffix', 'Title', 'WebAddress', 'WorkPhone'],
    queryInclude: ['$permissions'],
    resourceKind: 'contacts',

    startup: function startup() {
      this.inherited(arguments);
      this.connect(this.fields.Account, 'onChange', this.onAccountChange);
    },
    beforeTransitionTo: function beforeTransitionTo() {
      this.inherited(arguments);
      if (this.options.insert) {
        this.fields.Account.enable();
      } else {
        this.fields.Account.disable();
      }
    },
    onAccountChange: function onAccountChange(value) {
      if (value && value.text) {
        this.fields.AccountName.setValue(value.text);
      }
      this.requestAccount(value.key);
    },
    applyContext: function applyContext() {
      var found = App.queryNavigationContext(function (o) {
        var ob = o.options && o.options.source || o;
        return (/^(accounts|opportunities)$/.test(ob.resourceKind) && ob.key
        );
      });

      var lookup = {
        accounts: this.applyAccountContext,
        opportunities: this.applyOpportunityContext
      };

      this.fields.AccountManager.setValue(App.context.user);
      this.fields.Owner.setValue(App.context.defaultOwner);

      if (found && lookup[found.resourceKind]) {
        lookup[found.resourceKind].call(this, found);
      }
    },
    applyAccountContext: function applyAccountContext(context) {
      var view = App.getView(context.id);
      var entry = view && view.entry;

      if (!entry && context.options && context.options.source && context.options.source.entry) {
        this.requestAccount(context.options.source.entry.$key);
      }

      this.processAccount(entry);
    },
    requestAccount: function requestAccount(accountId) {
      var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService()).setResourceKind('accounts').setResourceSelector('\'' + accountId + '\'').setQueryArg('select', ['AccountName', 'Address/*', 'Fax', 'MainPhone', 'WebAddress'].join(','));

      request.allowCacheUse = true;
      request.read({
        success: this.processAccount,
        failure: this.requestAccountFailure,
        scope: this
      });
    },
    requestAccountFailure: function requestAccountFailure() {},
    processAccount: function processAccount(entry) {
      var account = entry;
      var accountName = _Utility2.default.getValue(entry, 'AccountName');
      var webAddress = _Utility2.default.getValue(entry, 'WebAddress');
      var mainPhone = _Utility2.default.getValue(entry, 'MainPhone');
      var address = _Utility2.default.getValue(entry, 'Address');
      var fax = _Utility2.default.getValue(entry, 'Fax');

      if (account) {
        this.fields.Account.setValue(account);
      }
      if (accountName) {
        this.fields.AccountName.setValue(accountName);
      }
      if (webAddress) {
        this.fields.WebAddress.setValue(webAddress);
      }
      if (mainPhone) {
        this.fields.WorkPhone.setValue(mainPhone);
      }
      if (address) {
        this.fields.Address.setValue(this.cleanAddressEntry(address));
      }
      if (fax) {
        this.fields.Fax.setValue(fax);
      }
    },
    applyOpportunityContext: function applyOpportunityContext(context) {
      var view = App.getView(context.id);
      var entry = view && view.entry;
      var opportunityId = _Utility2.default.getValue(entry, '$key');
      var account = _Utility2.default.getValue(entry, 'Account');
      var accountName = _Utility2.default.getValue(entry, 'Account.AccountName');
      var webAddress = _Utility2.default.getValue(entry, 'Account.WebAddress');
      var mainPhone = _Utility2.default.getValue(entry, 'Account.MainPhone');
      var address = _Utility2.default.getValue(entry, 'Account.Address');
      var fax = _Utility2.default.getValue(entry, 'Account.Fax');

      if (opportunityId) {
        this.fields['Opportunities.$resources[0].Opportunity.$key'].setValue(opportunityId);
      }
      if (account) {
        this.fields.Account.setValue(account);
      }
      if (accountName) {
        this.fields.AccountName.setValue(accountName);
      }
      if (webAddress) {
        this.fields.WebAddress.setValue(webAddress);
      }
      if (mainPhone) {
        this.fields.WorkPhone.setValue(mainPhone);
      }
      if (address) {
        this.fields.Address.setValue(this.cleanAddressEntry(address));
      }
      if (fax) {
        this.fields.Fax.setValue(fax);
      }
    },
    cleanAddressEntry: function cleanAddressEntry(address) {
      if (address) {
        var clean = {};
        var skip = {
          $key: true,
          $lookup: true,
          $url: true,
          EntityId: true,
          ModifyDate: true,
          ModifyUser: true,
          CreateDate: true,
          CreateUser: true
        };

        for (var name in address) {
          if (address.hasOwnProperty(name)) {
            if (!skip[name]) {
              clean[name] = address[name];
            }
          }
        }
        return clean;
      }
      return null;
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        applyTo: '.',
        formatValue: _Format2.default.nameLF,
        label: this.nameText,
        name: 'ContactName',
        property: 'ContactName',
        type: 'name',
        validator: _Validator2.default.name,
        view: 'name_edit'
      }, {
        label: this.accountNameText,
        name: 'Account',
        property: 'Account',
        textProperty: 'AccountName',
        type: 'lookup',
        validator: _Validator2.default.exists,
        view: 'account_related'
      }, {
        name: 'AccountName',
        property: 'AccountName',
        type: 'hidden'
      }, {
        name: 'WebAddress',
        property: 'WebAddress',
        label: this.webText,
        type: 'text',
        inputType: 'url',
        maxTextLength: 128,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'WorkPhone',
        property: 'WorkPhone',
        label: this.workText,
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'Email',
        property: 'Email',
        label: this.emailText,
        type: 'text',
        inputType: 'email'
      }, {
        label: this.contactTitleText,
        name: 'Title',
        property: 'Title',
        picklist: 'Title',
        title: this.titleTitleText,
        type: 'picklist'
      }, {
        formatValue: _Format2.default.address.bindDelegate(this, true),
        label: this.addressText,
        name: 'Address',
        property: 'Address',
        type: 'address',
        view: 'address_edit'
      }, {
        name: 'HomePhone',
        property: 'HomePhone',
        label: this.homePhoneText,
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'Mobile',
        property: 'Mobile',
        label: this.mobileText,
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'Fax',
        property: 'Fax',
        label: this.faxText,
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
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
        name: 'Opportunities.$resources[0].Opportunity.$key',
        property: 'Opportunities.$resources[0].Opportunity.$key',
        type: 'hidden'
      }, {
        label: this.cuisinePreferenceText,
        name: 'CuisinePreference',
        property: 'CuisinePreference',
        type: 'picklist',
        picklist: 'CuisinePrefs',
        singleSelect: false,
        title: this.cuisinePreferenceTitleText
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Db250YWN0L0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwibmFtZVRleHQiLCJ3b3JrVGV4dCIsIm1vYmlsZVRleHQiLCJlbWFpbFRleHQiLCJ3ZWJUZXh0IiwiYWNjdE1nclRleHQiLCJhY2NvdW50TmFtZVRleHQiLCJob21lUGhvbmVUZXh0IiwiZmF4VGV4dCIsImFkZHJlc3NUZXh0IiwiY29udGFjdFRpdGxlVGV4dCIsInRpdGxlVGl0bGVUZXh0IiwiYWRkcmVzc1RpdGxlVGV4dCIsIm93bmVyVGV4dCIsImN1aXNpbmVQcmVmZXJlbmNlVGV4dCIsImVudGl0eU5hbWUiLCJpZCIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsInJlc291cmNlS2luZCIsInN0YXJ0dXAiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiQWNjb3VudCIsIm9uQWNjb3VudENoYW5nZSIsImJlZm9yZVRyYW5zaXRpb25UbyIsIm9wdGlvbnMiLCJpbnNlcnQiLCJlbmFibGUiLCJkaXNhYmxlIiwidmFsdWUiLCJ0ZXh0IiwiQWNjb3VudE5hbWUiLCJzZXRWYWx1ZSIsInJlcXVlc3RBY2NvdW50Iiwia2V5IiwiYXBwbHlDb250ZXh0IiwiZm91bmQiLCJBcHAiLCJxdWVyeU5hdmlnYXRpb25Db250ZXh0IiwibyIsIm9iIiwic291cmNlIiwidGVzdCIsImxvb2t1cCIsImFjY291bnRzIiwiYXBwbHlBY2NvdW50Q29udGV4dCIsIm9wcG9ydHVuaXRpZXMiLCJhcHBseU9wcG9ydHVuaXR5Q29udGV4dCIsIkFjY291bnRNYW5hZ2VyIiwiY29udGV4dCIsInVzZXIiLCJPd25lciIsImRlZmF1bHRPd25lciIsImNhbGwiLCJ2aWV3IiwiZ2V0VmlldyIsImVudHJ5IiwiJGtleSIsInByb2Nlc3NBY2NvdW50IiwiYWNjb3VudElkIiwicmVxdWVzdCIsIlNhZ2UiLCJTRGF0YSIsIkNsaWVudCIsIlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldFJlc291cmNlS2luZCIsInNldFJlc291cmNlU2VsZWN0b3IiLCJzZXRRdWVyeUFyZyIsImpvaW4iLCJhbGxvd0NhY2hlVXNlIiwicmVhZCIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwicmVxdWVzdEFjY291bnRGYWlsdXJlIiwic2NvcGUiLCJhY2NvdW50IiwiYWNjb3VudE5hbWUiLCJnZXRWYWx1ZSIsIndlYkFkZHJlc3MiLCJtYWluUGhvbmUiLCJhZGRyZXNzIiwiZmF4IiwiV2ViQWRkcmVzcyIsIldvcmtQaG9uZSIsIkFkZHJlc3MiLCJjbGVhbkFkZHJlc3NFbnRyeSIsIkZheCIsIm9wcG9ydHVuaXR5SWQiLCJjbGVhbiIsInNraXAiLCIkbG9va3VwIiwiJHVybCIsIkVudGl0eUlkIiwiTW9kaWZ5RGF0ZSIsIk1vZGlmeVVzZXIiLCJDcmVhdGVEYXRlIiwiQ3JlYXRlVXNlciIsIm5hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsImNyZWF0ZUxheW91dCIsImxheW91dCIsImFwcGx5VG8iLCJmb3JtYXRWYWx1ZSIsIm5hbWVMRiIsImxhYmVsIiwicHJvcGVydHkiLCJ0eXBlIiwidmFsaWRhdG9yIiwidGV4dFByb3BlcnR5IiwiZXhpc3RzIiwiaW5wdXRUeXBlIiwibWF4VGV4dExlbmd0aCIsImV4Y2VlZHNNYXhUZXh0TGVuZ3RoIiwicGlja2xpc3QiLCJ0aXRsZSIsImJpbmREZWxlZ2F0ZSIsInRleHRUZW1wbGF0ZSIsInNpbmdsZVNlbGVjdCIsImN1aXNpbmVQcmVmZXJlbmNlVGl0bGVUZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1BLFdBQVcsb0JBQVksYUFBWixDQUFqQjs7QUFFQTs7Ozs7Ozs7Ozs7QUF6QkE7Ozs7Ozs7Ozs7Ozs7OztBQW9DQSxNQUFNQyxVQUFVLHVCQUFRLHdCQUFSLEVBQWtD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QUtERixjQUFNLFFBTEw7QUFNRHJELGNBQU07QUFOTCxPQXJGa0MsRUE0RmxDO0FBQ0Q0QyxjQUFNLDhDQURMO0FBRURRLGtCQUFVLDhDQUZUO0FBR0RDLGNBQU07QUFITCxPQTVGa0MsRUFnR2xDO0FBQ0RGLGVBQU8sS0FBS2hHLHFCQURYO0FBRUR5RixjQUFNLG1CQUZMO0FBR0RRLGtCQUFVLG1CQUhUO0FBSURDLGNBQU0sVUFKTDtBQUtETyxrQkFBVSxjQUxUO0FBTURJLHNCQUFjLEtBTmI7QUFPREgsZUFBTyxLQUFLSTtBQVBYLE9BaEdrQyxDQUE5QixDQUFQO0FBeUdEO0FBdlR1RCxHQUExQyxDQUFoQjs7b0JBMFRlOUgsTyIsImZpbGUiOiJFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ2NybS9UZW1wbGF0ZSc7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnY3JtL1ZhbGlkYXRvcic7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY29udGFjdEVkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkNvbnRhY3QuRWRpdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBjcm0uVGVtcGxhdGVcclxuICogQHJlcXVpcmVzIGNybS5WYWxpZGF0b3JcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQ29udGFjdC5FZGl0JywgW0VkaXRdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgbmFtZVRleHQ6IHJlc291cmNlLm5hbWVUZXh0LFxyXG4gIHdvcmtUZXh0OiByZXNvdXJjZS53b3JrVGV4dCxcclxuICBtb2JpbGVUZXh0OiByZXNvdXJjZS5tb2JpbGVUZXh0LFxyXG4gIGVtYWlsVGV4dDogcmVzb3VyY2UuZW1haWxUZXh0LFxyXG4gIHdlYlRleHQ6IHJlc291cmNlLndlYlRleHQsXHJcbiAgYWNjdE1nclRleHQ6IHJlc291cmNlLmFjY3RNZ3JUZXh0LFxyXG4gIGFjY291bnROYW1lVGV4dDogcmVzb3VyY2UuYWNjb3VudE5hbWVUZXh0LFxyXG4gIGhvbWVQaG9uZVRleHQ6IHJlc291cmNlLmhvbWVQaG9uZVRleHQsXHJcbiAgZmF4VGV4dDogcmVzb3VyY2UuZmF4VGV4dCxcclxuICBhZGRyZXNzVGV4dDogcmVzb3VyY2UuYWRkcmVzc1RleHQsXHJcbiAgY29udGFjdFRpdGxlVGV4dDogcmVzb3VyY2UuY29udGFjdFRpdGxlVGV4dCxcclxuICB0aXRsZVRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUaXRsZVRleHQsXHJcbiAgYWRkcmVzc1RpdGxlVGV4dDogcmVzb3VyY2UuYWRkcmVzc1RpdGxlVGV4dCxcclxuICBvd25lclRleHQ6IHJlc291cmNlLm93bmVyVGV4dCxcclxuICBjdWlzaW5lUHJlZmVyZW5jZVRleHQ6IHJlc291cmNlLmN1aXNpbmVQcmVmZXJlbmNlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZW50aXR5TmFtZTogJ0NvbnRhY3QnLFxyXG4gIGlkOiAnY29udGFjdF9lZGl0JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL0NvbnRhY3QvQWRkJyxcclxuICB1cGRhdGVTZWN1cml0eTogJ0VudGl0aWVzL0NvbnRhY3QvRWRpdCcsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0xhc3ROYW1lJyxcclxuICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAnQWRkcmVzcy8qJyxcclxuICAgICdDdWlzaW5lUHJlZmVyZW5jZScsXHJcbiAgICAnQ3JlYXRlRGF0ZScsXHJcbiAgICAnQ3JlYXRlVXNlcicsXHJcbiAgICAnRW1haWwnLFxyXG4gICAgJ0ZheCcsXHJcbiAgICAnRmlyc3ROYW1lJyxcclxuICAgICdIb21lUGhvbmUnLFxyXG4gICAgJ0xhc3ROYW1lJyxcclxuICAgICdNaWRkbGVOYW1lJyxcclxuICAgICdNb2JpbGUnLFxyXG4gICAgJ05hbWUnLFxyXG4gICAgJ05hbWVMRicsXHJcbiAgICAnT3duZXIvT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAnUHJlZml4JyxcclxuICAgICdTdWZmaXgnLFxyXG4gICAgJ1RpdGxlJyxcclxuICAgICdXZWJBZGRyZXNzJyxcclxuICAgICdXb3JrUGhvbmUnLFxyXG4gIF0sXHJcbiAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAnJHBlcm1pc3Npb25zJyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ2NvbnRhY3RzJyxcclxuXHJcbiAgc3RhcnR1cDogZnVuY3Rpb24gc3RhcnR1cCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQWNjb3VudCwgJ29uQ2hhbmdlJywgdGhpcy5vbkFjY291bnRDaGFuZ2UpO1xyXG4gIH0sXHJcbiAgYmVmb3JlVHJhbnNpdGlvblRvOiBmdW5jdGlvbiBiZWZvcmVUcmFuc2l0aW9uVG8oKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnNlcnQpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQWNjb3VudC5lbmFibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFjY291bnQuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25BY2NvdW50Q2hhbmdlOiBmdW5jdGlvbiBvbkFjY291bnRDaGFuZ2UodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS50ZXh0KSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFjY291bnROYW1lLnNldFZhbHVlKHZhbHVlLnRleHQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZXF1ZXN0QWNjb3VudCh2YWx1ZS5rZXkpO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQoKSB7XHJcbiAgICBjb25zdCBmb3VuZCA9IEFwcC5xdWVyeU5hdmlnYXRpb25Db250ZXh0KChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9iID0gKG8ub3B0aW9ucyAmJiBvLm9wdGlvbnMuc291cmNlKSB8fCBvO1xyXG4gICAgICByZXR1cm4gKC9eKGFjY291bnRzfG9wcG9ydHVuaXRpZXMpJC8pLnRlc3Qob2IucmVzb3VyY2VLaW5kKSAmJiBvYi5rZXk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBsb29rdXAgPSB7XHJcbiAgICAgIGFjY291bnRzOiB0aGlzLmFwcGx5QWNjb3VudENvbnRleHQsXHJcbiAgICAgIG9wcG9ydHVuaXRpZXM6IHRoaXMuYXBwbHlPcHBvcnR1bml0eUNvbnRleHQsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyLnNldFZhbHVlKEFwcC5jb250ZXh0LnVzZXIpO1xyXG4gICAgdGhpcy5maWVsZHMuT3duZXIuc2V0VmFsdWUoQXBwLmNvbnRleHQuZGVmYXVsdE93bmVyKTtcclxuXHJcbiAgICBpZiAoZm91bmQgJiYgbG9va3VwW2ZvdW5kLnJlc291cmNlS2luZF0pIHtcclxuICAgICAgbG9va3VwW2ZvdW5kLnJlc291cmNlS2luZF0uY2FsbCh0aGlzLCBmb3VuZCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhcHBseUFjY291bnRDb250ZXh0OiBmdW5jdGlvbiBhcHBseUFjY291bnRDb250ZXh0KGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb250ZXh0LmlkKTtcclxuICAgIGNvbnN0IGVudHJ5ID0gdmlldyAmJiB2aWV3LmVudHJ5O1xyXG5cclxuICAgIGlmICghZW50cnkgJiYgY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5zb3VyY2UgJiYgY29udGV4dC5vcHRpb25zLnNvdXJjZS5lbnRyeSkge1xyXG4gICAgICB0aGlzLnJlcXVlc3RBY2NvdW50KGNvbnRleHQub3B0aW9ucy5zb3VyY2UuZW50cnkuJGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcm9jZXNzQWNjb3VudChlbnRyeSk7XHJcbiAgfSxcclxuICByZXF1ZXN0QWNjb3VudDogZnVuY3Rpb24gcmVxdWVzdEFjY291bnQoYWNjb3VudElkKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0KHRoaXMuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKCdhY2NvdW50cycpXHJcbiAgICAgIC5zZXRSZXNvdXJjZVNlbGVjdG9yKGAnJHthY2NvdW50SWR9J2ApXHJcbiAgICAgIC5zZXRRdWVyeUFyZygnc2VsZWN0JywgW1xyXG4gICAgICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0ZheCcsXHJcbiAgICAgICAgJ01haW5QaG9uZScsXHJcbiAgICAgICAgJ1dlYkFkZHJlc3MnLFxyXG4gICAgICBdLmpvaW4oJywnKSk7XHJcblxyXG4gICAgcmVxdWVzdC5hbGxvd0NhY2hlVXNlID0gdHJ1ZTtcclxuICAgIHJlcXVlc3QucmVhZCh7XHJcbiAgICAgIHN1Y2Nlc3M6IHRoaXMucHJvY2Vzc0FjY291bnQsXHJcbiAgICAgIGZhaWx1cmU6IHRoaXMucmVxdWVzdEFjY291bnRGYWlsdXJlLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVxdWVzdEFjY291bnRGYWlsdXJlOiBmdW5jdGlvbiByZXF1ZXN0QWNjb3VudEZhaWx1cmUoKSB7fSxcclxuICBwcm9jZXNzQWNjb3VudDogZnVuY3Rpb24gcHJvY2Vzc0FjY291bnQoZW50cnkpIHtcclxuICAgIGNvbnN0IGFjY291bnQgPSBlbnRyeTtcclxuICAgIGNvbnN0IGFjY291bnROYW1lID0gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnROYW1lJyk7XHJcbiAgICBjb25zdCB3ZWJBZGRyZXNzID0gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ1dlYkFkZHJlc3MnKTtcclxuICAgIGNvbnN0IG1haW5QaG9uZSA9IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdNYWluUGhvbmUnKTtcclxuICAgIGNvbnN0IGFkZHJlc3MgPSB1dGlsaXR5LmdldFZhbHVlKGVudHJ5LCAnQWRkcmVzcycpO1xyXG4gICAgY29uc3QgZmF4ID0gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0ZheCcpO1xyXG5cclxuICAgIGlmIChhY2NvdW50KSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFjY291bnQuc2V0VmFsdWUoYWNjb3VudCk7XHJcbiAgICB9XHJcbiAgICBpZiAoYWNjb3VudE5hbWUpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQWNjb3VudE5hbWUuc2V0VmFsdWUoYWNjb3VudE5hbWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHdlYkFkZHJlc3MpIHtcclxuICAgICAgdGhpcy5maWVsZHMuV2ViQWRkcmVzcy5zZXRWYWx1ZSh3ZWJBZGRyZXNzKTtcclxuICAgIH1cclxuICAgIGlmIChtYWluUGhvbmUpIHtcclxuICAgICAgdGhpcy5maWVsZHMuV29ya1Bob25lLnNldFZhbHVlKG1haW5QaG9uZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoYWRkcmVzcykge1xyXG4gICAgICB0aGlzLmZpZWxkcy5BZGRyZXNzLnNldFZhbHVlKHRoaXMuY2xlYW5BZGRyZXNzRW50cnkoYWRkcmVzcykpO1xyXG4gICAgfVxyXG4gICAgaWYgKGZheCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5GYXguc2V0VmFsdWUoZmF4KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFwcGx5T3Bwb3J0dW5pdHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseU9wcG9ydHVuaXR5Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IHZpZXcgJiYgdmlldy5lbnRyeTtcclxuICAgIGNvbnN0IG9wcG9ydHVuaXR5SWQgPSB1dGlsaXR5LmdldFZhbHVlKGVudHJ5LCAnJGtleScpO1xyXG4gICAgY29uc3QgYWNjb3VudCA9IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdBY2NvdW50Jyk7XHJcbiAgICBjb25zdCBhY2NvdW50TmFtZSA9IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdBY2NvdW50LkFjY291bnROYW1lJyk7XHJcbiAgICBjb25zdCB3ZWJBZGRyZXNzID0gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnQuV2ViQWRkcmVzcycpO1xyXG4gICAgY29uc3QgbWFpblBob25lID0gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnQuTWFpblBob25lJyk7XHJcbiAgICBjb25zdCBhZGRyZXNzID0gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnQuQWRkcmVzcycpO1xyXG4gICAgY29uc3QgZmF4ID0gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnQuRmF4Jyk7XHJcblxyXG4gICAgaWYgKG9wcG9ydHVuaXR5SWQpIHtcclxuICAgICAgdGhpcy5maWVsZHNbJ09wcG9ydHVuaXRpZXMuJHJlc291cmNlc1swXS5PcHBvcnR1bml0eS4ka2V5J10uc2V0VmFsdWUob3Bwb3J0dW5pdHlJZCk7XHJcbiAgICB9XHJcbiAgICBpZiAoYWNjb3VudCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5BY2NvdW50LnNldFZhbHVlKGFjY291bnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGFjY291bnROYW1lKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFjY291bnROYW1lLnNldFZhbHVlKGFjY291bnROYW1lKTtcclxuICAgIH1cclxuICAgIGlmICh3ZWJBZGRyZXNzKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLldlYkFkZHJlc3Muc2V0VmFsdWUod2ViQWRkcmVzcyk7XHJcbiAgICB9XHJcbiAgICBpZiAobWFpblBob25lKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLldvcmtQaG9uZS5zZXRWYWx1ZShtYWluUGhvbmUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGFkZHJlc3MpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQWRkcmVzcy5zZXRWYWx1ZSh0aGlzLmNsZWFuQWRkcmVzc0VudHJ5KGFkZHJlc3MpKTtcclxuICAgIH1cclxuICAgIGlmIChmYXgpIHtcclxuICAgICAgdGhpcy5maWVsZHMuRmF4LnNldFZhbHVlKGZheCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjbGVhbkFkZHJlc3NFbnRyeTogZnVuY3Rpb24gY2xlYW5BZGRyZXNzRW50cnkoYWRkcmVzcykge1xyXG4gICAgaWYgKGFkZHJlc3MpIHtcclxuICAgICAgY29uc3QgY2xlYW4gPSB7fTtcclxuICAgICAgY29uc3Qgc2tpcCA9IHtcclxuICAgICAgICAka2V5OiB0cnVlLFxyXG4gICAgICAgICRsb29rdXA6IHRydWUsXHJcbiAgICAgICAgJHVybDogdHJ1ZSxcclxuICAgICAgICBFbnRpdHlJZDogdHJ1ZSxcclxuICAgICAgICBNb2RpZnlEYXRlOiB0cnVlLFxyXG4gICAgICAgIE1vZGlmeVVzZXI6IHRydWUsXHJcbiAgICAgICAgQ3JlYXRlRGF0ZTogdHJ1ZSxcclxuICAgICAgICBDcmVhdGVVc2VyOiB0cnVlLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZm9yIChjb25zdCBuYW1lIGluIGFkZHJlc3MpIHtcclxuICAgICAgICBpZiAoYWRkcmVzcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgaWYgKCFza2lwW25hbWVdKSB7XHJcbiAgICAgICAgICAgIGNsZWFuW25hbWVdID0gYWRkcmVzc1tuYW1lXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNsZWFuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgIGZvcm1hdFZhbHVlOiBmb3JtYXQubmFtZUxGLFxyXG4gICAgICBsYWJlbDogdGhpcy5uYW1lVGV4dCxcclxuICAgICAgbmFtZTogJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgcHJvcGVydHk6ICdDb250YWN0TmFtZScsXHJcbiAgICAgIHR5cGU6ICduYW1lJyxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IubmFtZSxcclxuICAgICAgdmlldzogJ25hbWVfZWRpdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmFjY291bnROYW1lVGV4dCxcclxuICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICB0ZXh0UHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgIHZpZXc6ICdhY2NvdW50X3JlbGF0ZWQnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdXZWJBZGRyZXNzJyxcclxuICAgICAgcHJvcGVydHk6ICdXZWJBZGRyZXNzJyxcclxuICAgICAgbGFiZWw6IHRoaXMud2ViVGV4dCxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBpbnB1dFR5cGU6ICd1cmwnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAxMjgsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnV29ya1Bob25lJyxcclxuICAgICAgcHJvcGVydHk6ICdXb3JrUGhvbmUnLFxyXG4gICAgICBsYWJlbDogdGhpcy53b3JrVGV4dCxcclxuICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnRW1haWwnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0VtYWlsJyxcclxuICAgICAgbGFiZWw6IHRoaXMuZW1haWxUZXh0LFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIGlucHV0VHlwZTogJ2VtYWlsJyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuY29udGFjdFRpdGxlVGV4dCxcclxuICAgICAgbmFtZTogJ1RpdGxlJyxcclxuICAgICAgcHJvcGVydHk6ICdUaXRsZScsXHJcbiAgICAgIHBpY2tsaXN0OiAnVGl0bGUnLFxyXG4gICAgICB0aXRsZTogdGhpcy50aXRsZVRpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgIH0sIHtcclxuICAgICAgZm9ybWF0VmFsdWU6IGZvcm1hdC5hZGRyZXNzLmJpbmREZWxlZ2F0ZSh0aGlzLCB0cnVlKSxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkcmVzc1RleHQsXHJcbiAgICAgIG5hbWU6ICdBZGRyZXNzJyxcclxuICAgICAgcHJvcGVydHk6ICdBZGRyZXNzJyxcclxuICAgICAgdHlwZTogJ2FkZHJlc3MnLFxyXG4gICAgICB2aWV3OiAnYWRkcmVzc19lZGl0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0hvbWVQaG9uZScsXHJcbiAgICAgIHByb3BlcnR5OiAnSG9tZVBob25lJyxcclxuICAgICAgbGFiZWw6IHRoaXMuaG9tZVBob25lVGV4dCxcclxuICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnTW9iaWxlJyxcclxuICAgICAgcHJvcGVydHk6ICdNb2JpbGUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5tb2JpbGVUZXh0LFxyXG4gICAgICB0eXBlOiAncGhvbmUnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdGYXgnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0ZheCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmZheFRleHQsXHJcbiAgICAgIHR5cGU6ICdwaG9uZScsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuYWNjdE1nclRleHQsXHJcbiAgICAgIG5hbWU6ICdBY2NvdW50TWFuYWdlcicsXHJcbiAgICAgIHByb3BlcnR5OiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICB0ZXh0UHJvcGVydHk6ICdVc2VySW5mbycsXHJcbiAgICAgIHRleHRUZW1wbGF0ZTogdGVtcGxhdGUubmFtZUxGLFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgdmlldzogJ3VzZXJfbGlzdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLm93bmVyVGV4dCxcclxuICAgICAgbmFtZTogJ093bmVyJyxcclxuICAgICAgcHJvcGVydHk6ICdPd25lcicsXHJcbiAgICAgIHRleHRQcm9wZXJ0eTogJ093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgdmlldzogJ293bmVyX2xpc3QnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnT3Bwb3J0dW5pdGllcy4kcmVzb3VyY2VzWzBdLk9wcG9ydHVuaXR5LiRrZXknLFxyXG4gICAgICBwcm9wZXJ0eTogJ09wcG9ydHVuaXRpZXMuJHJlc291cmNlc1swXS5PcHBvcnR1bml0eS4ka2V5JyxcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmN1aXNpbmVQcmVmZXJlbmNlVGV4dCxcclxuICAgICAgbmFtZTogJ0N1aXNpbmVQcmVmZXJlbmNlJyxcclxuICAgICAgcHJvcGVydHk6ICdDdWlzaW5lUHJlZmVyZW5jZScsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIHBpY2tsaXN0OiAnQ3Vpc2luZVByZWZzJyxcclxuICAgICAgc2luZ2xlU2VsZWN0OiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuY3Vpc2luZVByZWZlcmVuY2VUaXRsZVRleHQsXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=