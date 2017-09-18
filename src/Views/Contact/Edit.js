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

import declare from 'dojo/_base/declare';
import format from 'crm/Format';
import template from 'crm/Template';
import validator from 'crm/Validator';
import Edit from 'argos/Edit';
import utility from 'argos/Utility';
import getResource from 'argos/I18n';

const resource = getResource('contactEdit');

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
const __class = declare('crm.Views.Contact.Edit', [Edit], {
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
  querySelect: [
    'Account/AccountName',
    'AccountManager/UserInfo/FirstName',
    'AccountManager/UserInfo/LastName',
    'AccountName',
    'Address/*',
    'CuisinePreference',
    'CreateDate',
    'CreateUser',
    'Email',
    'Fax',
    'FirstName',
    'HomePhone',
    'LastName',
    'MiddleName',
    'Mobile',
    'Name',
    'NameLF',
    'Owner/OwnerDescription',
    'Prefix',
    'Suffix',
    'Title',
    'WebAddress',
    'WorkPhone',
  ],
  queryInclude: [
    '$permissions',
  ],
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
    const found = App.queryNavigationContext((o) => {
      const ob = (o.options && o.options.source) || o;
      return (/^(accounts|opportunities)$/).test(ob.resourceKind) && ob.key;
    });

    const lookup = {
      accounts: this.applyAccountContext,
      opportunities: this.applyOpportunityContext,
    };

    this.fields.AccountManager.setValue(App.context.user);
    this.fields.Owner.setValue(App.context.defaultOwner);

    if (found && lookup[found.resourceKind]) {
      lookup[found.resourceKind].call(this, found);
    }
  },
  applyAccountContext: function applyAccountContext(context) {
    const view = App.getView(context.id);
    const entry = view && view.entry;

    if (!entry && context.options && context.options.source && context.options.source.entry) {
      this.requestAccount(context.options.source.entry.$key);
    }

    this.processAccount(entry);
  },
  requestAccount: function requestAccount(accountId) {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
      .setResourceKind('accounts')
      .setResourceSelector(`'${accountId}'`)
      .setQueryArg('select', [
        'AccountName',
        'Address/*',
        'Fax',
        'MainPhone',
        'WebAddress',
      ].join(','));

    request.allowCacheUse = true;
    request.read({
      success: this.processAccount,
      failure: this.requestAccountFailure,
      scope: this,
    });
  },
  requestAccountFailure: function requestAccountFailure() {},
  processAccount: function processAccount(entry) {
    const account = entry;
    const accountName = utility.getValue(entry, 'AccountName');
    const webAddress = utility.getValue(entry, 'WebAddress');
    const mainPhone = utility.getValue(entry, 'MainPhone');
    const address = utility.getValue(entry, 'Address');
    const fax = utility.getValue(entry, 'Fax');

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
    const view = App.getView(context.id);
    const entry = view && view.entry;
    const opportunityId = utility.getValue(entry, '$key');
    const account = utility.getValue(entry, 'Account');
    const accountName = utility.getValue(entry, 'Account.AccountName');
    const webAddress = utility.getValue(entry, 'Account.WebAddress');
    const mainPhone = utility.getValue(entry, 'Account.MainPhone');
    const address = utility.getValue(entry, 'Account.Address');
    const fax = utility.getValue(entry, 'Account.Fax');

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
      const clean = {};
      const skip = {
        $key: true,
        $lookup: true,
        $url: true,
        EntityId: true,
        ModifyDate: true,
        ModifyUser: true,
        CreateDate: true,
        CreateUser: true,
      };

      for (const name in address) {
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
      formatValue: format.nameLF,
      label: this.nameText,
      name: 'ContactName',
      property: 'ContactName',
      type: 'name',
      validator: validator.name,
      view: 'name_edit',
    }, {
      label: this.accountNameText,
      name: 'Account',
      property: 'Account',
      textProperty: 'AccountName',
      type: 'lookup',
      validator: validator.exists,
      view: 'account_related',
    }, {
      name: 'AccountName',
      property: 'AccountName',
      type: 'hidden',
    }, {
      name: 'WebAddress',
      property: 'WebAddress',
      label: this.webText,
      type: 'text',
      inputType: 'url',
      maxTextLength: 128,
      validator: validator.exceedsMaxTextLength,
    }, {
      name: 'WorkPhone',
      property: 'WorkPhone',
      label: this.workText,
      type: 'phone',
      maxTextLength: 32,
      validator: validator.exceedsMaxTextLength,
    }, {
      name: 'Email',
      property: 'Email',
      label: this.emailText,
      type: 'text',
      inputType: 'email',
    }, {
      label: this.contactTitleText,
      name: 'Title',
      property: 'Title',
      picklist: 'Title',
      title: this.titleTitleText,
      type: 'picklist',
    }, {
      formatValue: format.address.bindDelegate(this, true),
      label: this.addressText,
      name: 'Address',
      property: 'Address',
      type: 'address',
      view: 'address_edit',
    }, {
      name: 'HomePhone',
      property: 'HomePhone',
      label: this.homePhoneText,
      type: 'phone',
      maxTextLength: 32,
      validator: validator.exceedsMaxTextLength,
    }, {
      name: 'Mobile',
      property: 'Mobile',
      label: this.mobileText,
      type: 'phone',
      maxTextLength: 32,
      validator: validator.exceedsMaxTextLength,
    }, {
      name: 'Fax',
      property: 'Fax',
      label: this.faxText,
      type: 'phone',
      maxTextLength: 32,
      validator: validator.exceedsMaxTextLength,
    }, {
      label: this.acctMgrText,
      name: 'AccountManager',
      property: 'AccountManager',
      textProperty: 'UserInfo',
      textTemplate: template.nameLF,
      type: 'lookup',
      view: 'user_list',
    }, {
      label: this.ownerText,
      name: 'Owner',
      property: 'Owner',
      textProperty: 'OwnerDescription',
      type: 'lookup',
      view: 'owner_list',
    }, {
      name: 'Opportunities.$resources[0].Opportunity.$key',
      property: 'Opportunities.$resources[0].Opportunity.$key',
      type: 'hidden',
    }, {
      label: this.cuisinePreferenceText,
      name: 'CuisinePreference',
      property: 'CuisinePreference',
      type: 'picklist',
      picklist: 'CuisinePrefs',
      singleSelect: false,
      title: this.cuisinePreferenceTitleText,
    }]);
  },
});

export default __class;
