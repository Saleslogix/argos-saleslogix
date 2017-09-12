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
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import format from '../Format';
import validator from '../Validator';
import template from '../Template';
import utility from 'argos/Utility';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('addAccountContact');

/**
 * @class crm.Views.AddAccountContact
 *
 *
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Views.AddAccountContact', [Edit], {
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
  querySelect: [
    'AccountManager/UserInfo/FirstName',
    'AccountManager/UserInfo/LastName',
    'AccountName',
    'Address',
    'BusinessDescription',
    'Contact/AccountName',
    'Contact/Address',
    'Contact/Email',
    'Contact/Fax',
    'Contact/FirstName',
    'Contact/HomePhone',
    'Contact/LastName',
    'Contact/Mobile',
    'Contact/Title',
    'Contact/WebAddress',
    'Contact/WorkPhone',
    'Fax',
    'Industry',
    'Owner/OwnerDescription',
    'Status',
    'SubType',
    'Type',
  ],
  init: function init() {
    this.inherited(arguments);

    this.connect(this.fields['Contacts.$resources[0].Address'], 'onChange', this.onContactAddressChange);
  },
  getValues: function getValues() {
    const values = this.inherited(arguments);

    utility.setValue(values, 'Contacts.$resources[0].$name', 'Contact');
    utility.setValue(values, 'Contacts.$resources[0].AccountName', values.AccountName);

    return values;
  },
  formatDependentPicklist: function formatDependentPicklist(dependentValue, fmt) {
    let dependValue = dependentValue;
    if (!lang.isArray(dependValue)) {
      dependValue = [dependValue];
    }
    return string.substitute(fmt, [dependValue]);
  },
  onInsertCompleted: function onInsertCompleted(entry) {
    const view = App.getView('account_detail');
    if (view) {
      view.show({
        descriptor: entry.$descriptor,
        key: entry.$key,
      }, {
        returnTo: -1,
      });
    } else {
      this.inherited(arguments);
    }
  },
  onContactAddressChange: function onContactAddressChange(value) {
    let address;
    let address1;
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
          NameLF: null,
        }],
      };
    }
    this.inherited(arguments);
    return entry;
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      emptyText: '',
      formatValue: format.nameLF,
      label: this.nameText,
      name: 'Contacts.$resources[0]',
      property: 'Contacts.$resources[0]',
      type: 'name',
      validator: validator.name,
      view: 'name_edit',
    }, {
      label: this.accountNameText,
      name: 'AccountName',
      property: 'AccountName',
      type: 'text',
      validator: validator.notEmpty,
    }, {
      label: this.emailText,
      name: 'Contacts.$resources[0].Email',
      property: 'Contacts.$resources[0].Email',
      type: 'text',
      inputType: 'email',
    }, {
      label: this.webText,
      name: 'WebAddress',
      property: 'WebAddress',
      type: 'text',
      inputType: 'url',
      maxTextLength: 128,
      validator: validator.exceedsMaxTextLength,
    }, {
      label: this.phoneText,
      name: 'MainPhone',
      property: 'MainPhone',
      type: 'phone',
      maxTextLength: 32,
      validator: validator.exceedsMaxTextLength,
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
        orderBy: 'text asc',
      }, {
        label: this.homePhoneText,
        name: 'Contacts.$resources[0].HomePhone',
        property: 'Contacts.$resources[0].HomePhone',
        type: 'phone',
        maxTextLength: 32,
        validator: validator.exceedsMaxTextLength,
      }, {
        name: 'Contacts.$resources[0].Mobile',
        property: 'Contacts.$resources[0].Mobile',
        label: this.mobileText,
        type: 'phone',
        maxTextLength: 32,
        validator: validator.exceedsMaxTextLength,
      }, {
        name: 'Contacts.$resources[0].WorkPhone',
        property: 'Contacts.$resources[0].WorkPhone',
        label: this.workText,
        type: 'phone',
        maxTextLength: 32,
        validator: validator.exceedsMaxTextLength,
      }, {
        name: 'Contacts.$resources[0].Fax',
        property: 'Contacts.$resources[0].Fax',
        label: this.faxText,
        type: 'phone',
        maxTextLength: 32,
        validator: validator.exceedsMaxTextLength,
      }, {
        emptyText: '',
        formatValue: format.address.bindDelegate(this, true, true),
        label: this.addressText,
        name: 'Contacts.$resources[0].Address',
        property: 'Contacts.$resources[0].Address',
        type: 'address',
        view: 'address_edit',
        entityName: 'Contact',
      }],
    }, {
      title: this.detailsAccountText,
      name: 'AccountInfoSection',
      children: [{
        name: 'Fax',
        property: 'Fax',
        label: this.faxText,
        type: 'phone',
        maxTextLength: 32,
        validator: validator.exceedsMaxTextLength,
      }, {
        name: 'Type',
        property: 'Type',
        label: this.typeText,
        type: 'picklist',
        picklist: 'Account Type',
        title: this.accountTypeTitleText,
      }, {
        name: 'SubType',
        property: 'SubType',
        label: this.subTypeText,
        type: 'picklist',
        requireSelection: false,
        picklist: this.formatDependentPicklist.bindDelegate(
          this, 'Account ${0}', true
        ),
        title: this.accountSubTypeTitleText,
        dependsOn: 'Type',
      }, {
        name: 'Status',
        property: 'Status',
        label: this.statusText,
        type: 'picklist',
        picklist: 'Account Status',
        title: this.accountStatusTitleText,
      }, {
        name: 'Industry',
        property: 'Industry',
        label: this.industryText,
        type: 'picklist',
        picklist: 'Industry',
        title: this.industryTitleText,
      }, {
        name: 'BusinessDescription',
        property: 'BusinessDescription',
        label: this.descriptionText,
        type: 'text',
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
        emptyText: '',
        formatValue: format.address.bindDelegate(this, true, true),
        label: this.addressText,
        name: 'Address',
        property: 'Address',
        type: 'address',
        view: 'address_edit',
        entityName: 'Account',
      }],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.AddAccountContact', __class);
export default __class;
