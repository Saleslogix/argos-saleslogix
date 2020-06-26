define("crm/Views/Contact/Edit", ["exports", "dojo/_base/declare", "crm/Format", "crm/Template", "crm/Validator", "argos/Edit", "argos/Utility", "argos/I18n"], function (_exports, _declare, _Format, _Template, _Validator, _Edit, _Utility, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Format = _interopRequireDefault(_Format);
  _Template = _interopRequireDefault(_Template);
  _Validator = _interopRequireDefault(_Validator);
  _Edit = _interopRequireDefault(_Edit);
  _Utility = _interopRequireDefault(_Utility);
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
  var resource = (0, _I18n["default"])('contactEdit');

  var __class = (0, _declare["default"])('crm.Views.Contact.Edit', [_Edit["default"]], {
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
      this.inherited(startup, arguments);
      this.connect(this.fields.Account, 'onChange', this.onAccountChange);
    },
    beforeTransitionTo: function beforeTransitionTo() {
      this.inherited(beforeTransitionTo, arguments);

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
        return /^(accounts|opportunities)$/.test(ob.resourceKind) && ob.key;
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
      var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService()).setResourceKind('accounts').setResourceSelector("'".concat(accountId, "'")).setQueryArg('select', ['AccountName', 'Address/*', 'Fax', 'MainPhone', 'WebAddress'].join(','));
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

      var accountName = _Utility["default"].getValue(entry, 'AccountName');

      var webAddress = _Utility["default"].getValue(entry, 'WebAddress');

      var mainPhone = _Utility["default"].getValue(entry, 'MainPhone');

      var address = _Utility["default"].getValue(entry, 'Address');

      var fax = _Utility["default"].getValue(entry, 'Fax');

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

      var opportunityId = _Utility["default"].getValue(entry, '$key');

      var account = _Utility["default"].getValue(entry, 'Account');

      var accountName = _Utility["default"].getValue(entry, 'Account.AccountName');

      var webAddress = _Utility["default"].getValue(entry, 'Account.WebAddress');

      var mainPhone = _Utility["default"].getValue(entry, 'Account.MainPhone');

      var address = _Utility["default"].getValue(entry, 'Account.Address');

      var fax = _Utility["default"].getValue(entry, 'Account.Fax');

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
        formatValue: _Format["default"].nameLF,
        label: this.nameText,
        name: 'ContactName',
        property: 'ContactName',
        type: 'name',
        validator: _Validator["default"].name,
        view: 'name_edit'
      }, {
        label: this.accountNameText,
        name: 'Account',
        property: 'Account',
        textProperty: 'AccountName',
        type: 'lookup',
        validator: _Validator["default"].exists,
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
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        name: 'WorkPhone',
        property: 'WorkPhone',
        label: this.workText,
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator["default"].exceedsMaxTextLength
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
        formatValue: _Format["default"].address.bindDelegate(this, true),
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
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        name: 'Mobile',
        property: 'Mobile',
        label: this.mobileText,
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator["default"].exceedsMaxTextLength
      }, {
        name: 'Fax',
        property: 'Fax',
        label: this.faxText,
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator["default"].exceedsMaxTextLength
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

  var _default = __class;
  _exports["default"] = _default;
});