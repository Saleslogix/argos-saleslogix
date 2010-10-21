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
        accountStatusTitleText: 'Account Status',
        accountSubTypeTitleText: 'Account Subtype',
        accountText: 'account',
        accountTypeTitleText: 'Account Type',
        acctMgrText: 'acct mgr',
        businessDescriptionText: 'bus desc',
        descriptionText: 'desc',
        faxText: 'fax',
        fullAddressText: 'address',
        importSourceText: 'lead source',
        industryText: 'industry',
        industryTitleText: 'Industry',
        ownerText: 'owner',
        phoneText: 'phone',
        statusText: 'status',
        subTypeText: 'subtype',
        titleText: 'Account',
        typeText: 'type',
        webText: 'web',
        resourceKind: 'accounts',
        entityName: 'Account',
        querySelect: [
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'AccountName',
            'BusinessDescription',
            'Description',
            'Fax',
            'Industry',
            'LeadSource/Description',
            'MainPhone',
            'Notes',
            'Owner/OwnerDescription',
            'Status',
            'SubType',
            'Type',
            'User/UserInfo/UserName',
            'WebAddress'
        ],
        formatDependentPicklist: function(dependentValue, format) {
            return String.format(format, dependentValue);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'AccountName',
                    label: this.accountText,
                    type: 'text',
                    validator: Mobile.SalesLogix.Validator.hasText
                },
                {
                    name: 'WebAddress',
                    label: this.webText,
                    renderer: Mobile.SalesLogix.Format.link,
                    type: 'text'
                },
                {
                    name: 'MainPhone',
                    label: this.phoneText,
                    type: 'phone'
                },
                {
                    name: 'Address',
                    formatter: Mobile.SalesLogix.Format.address,
                    label: this.fullAddressText,
                    type: 'address',
                    view: 'address_edit'
                },
                {
                    name: 'Fax',
                    label: this.faxText,
                    type: 'phone'
                },
                {
                    name: 'Type',
                    label: this.typeText,
                    picklist: 'Account Type',
                    title: this.accountTypeTitleText,
                    type: 'picklist'
                },
                {
                    name: 'SubType',
                    dependsOn: 'Type',
                    label: this.subTypeText,
                    picklist: this.formatDependentPicklist.createDelegate(this, ['Account {0}'], true),
                    requireSelection: false,
                    title: this.accountSubTypeTitleText,
                    type: 'picklist'
                },
                {
                    name: 'Status',
                    label: this.statusText,
                    picklist: 'Account Status',
                    requireSelection: false,
                    title: this.accountStatusTitleText,
                    type: 'picklist'
                },
                {
                    name: 'Industry',
                    label: this.industryText,
                    picklist: 'Industry',
                    requireSelection: false,
                    title: this.industryTitleText,
                    type: 'picklist'
                },
                {
                    name: 'BusinessDescription',
                    label: this.businessDescriptionText,
                    type: 'text'
                },
                {
                    name: 'AccountManager',
                    label: this.acctMgrText,
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                },
                {
                    name: 'Owner',
                    label: this.ownerText,
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    view: 'owner_list'
                },
                {
                    name: 'LeadSource',
                    label: this.importSourceText,
                    textProperty: 'Description',
                    type: 'lookup',
                    view: 'leadsource_list'
                }
            ]);
        }
    });
})();