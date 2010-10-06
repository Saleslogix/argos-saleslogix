/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

(function() {
    Mobile.SalesLogix.Account.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'account_edit',
        titleText: 'Account',
        accountText: 'account',
        phoneText: 'phone',
        webText: 'web',
        typeText: 'type',
        subTypeText: 'subtype',
        statusText: 'status',
        fullAddressText: 'address',
        descriptionText: 'desc',
        isPrimaryText: 'primary',
        isMailingText: 'shipping',
        address1Text: 'address 1',
        address2Text: 'address 2',
        address3Text: 'address 3',
        acctMgrText: 'acct mgr',
        ownerText: 'owner',
        cityText: 'city',
        stateText: 'state',
        postalCodeText: 'postal',
        countryText: 'country',
        faxText: 'fax',
        industryText: 'industry',
        businessDescriptionText: 'bus desc',
        importSourceText: 'lead source',
        resourceKind: 'accounts',
        entityName: 'Account',
        querySelect: [
            'AccountName',
            'MainPhone',
            'WebAddress',
            'AccountName',
            'WebAddress',
            'MainPhone',
            'FullAddress',
            'Description',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'User/UserInfo/UserName',
            'Notes',
            'Owner/OwnerDescription',
            'IsPrimary',
            'IsMailing',
            'Address1',
            'Address2',
            'Address3',
            'City',
            'State',
            'PostalCode',
            'Country',
            'Fax',
            'Type',
            'SubType',
            'Status',
            'Industry',
            'BusinessDescription',
            'LeadSource/Description'
        ],
        getValues: function() {
            var U = Sage.Platform.Mobile.Utility,
                values = Mobile.SalesLogix.Contact.Edit.superclass.getValues.apply(this, arguments);

            if (values.Address && !values.Address.Description) U.setValue(values, 'Address.Description', 'Mailing');

            return values;
        },
        formatPicklistName: function(dependantValue, format) {
            return String.format(format, dependantValue);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'AccountName', label: this.accountText, type: 'text', validator: Mobile.SalesLogix.Validator.hasText},
                {name: 'WebAddress', label: this.webText, renderer: Mobile.SalesLogix.Format.link, type: 'text'},
                {name: 'MainPhone', label: this.phoneText, type: 'phone'},
                {name: 'Address', label: this.fullAddressText, view: 'address_edit', type: 'address', resourceKind: 'accounts', title: 'Address', renderer: function(value){return Mobile.SalesLogix.Format.address(value, true)}},
                {name: 'Fax', label: this.faxText, type: 'phone'},
                {name: 'Type', label: this.typeText, type: 'picklist', picklist: 'Account Type', title: 'Account Type'},
                {name: 'SubType', label: this.subTypeText, type: 'picklist', requireSelection: false, picklist: this.formatPicklistName.createDelegate(this, ['Account {0}'], true), title: 'Account SubType', dependsOn: 'Type'},
                {name: 'Status', label: this.statusText, type: 'picklist', requireSelection: false, picklist: 'Account Status', title: 'Account Status'},
                {name: 'Industry', label: this.industryText, type: 'picklist', requireSelection: false, picklist: 'Industry', title: 'Industry'},
                {name: 'BusinessDescription', label: this.businessDescriptionText, type: 'text'},
                {name: 'AccountManager', label: this.acctMgrText, type: 'lookup', view: 'user_list', keyProperty: '$key', textProperty: 'UserInfo', textTemplate: Mobile.SalesLogix.Template.nameLF},
                {name: 'Owner', label: this.ownerText, type: 'lookup', view: 'owner_list', keyProperty: '$key', textProperty: 'OwnerDescription'},
                {name: 'LeadSource', label: this.importSourceText, type: 'lookup', view: 'leadsource_list', keyProperty: '$key', textProperty: 'Description'}
            ]);
        }
    });
})();
