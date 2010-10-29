/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

(function() {
    Mobile.SalesLogix.Account.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
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

        //View Properties
        entityName: 'Account',
        id: 'account_edit',
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
        resourceKind: 'accounts',

        formatDependentPicklist: function(dependentValue, format) {
            return String.format(format, dependentValue);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.accountText,
                    name: 'AccountName',
                    type: 'text',
                    validator: Mobile.SalesLogix.Validator.hasText
                },
                {
                    label: this.webText,
                    name: 'WebAddress',
                    renderer: Mobile.SalesLogix.Format.link,
                    type: 'text'
                },
                {
                    label: this.phoneText,
                    name: 'MainPhone',
                    type: 'phone'
                },
                {
                    formatter: Mobile.SalesLogix.Format.address,
                    label: this.fullAddressText,
                    name: 'Address',
                    type: 'address',
                    view: 'address_edit'
                },
                {
                    label: this.faxText,
                    name: 'Fax',
                    type: 'phone'
                },
                {
                    label: this.typeText,
                    name: 'Type',
                    picklist: 'Account Type',
                    requireSelection: true,
                    title: this.accountTypeTitleText,
                    type: 'picklist'
                },
                {
                    dependsOn: 'Type',
                    label: this.subTypeText,
                    name: 'SubType',
                    picklist: this.formatDependentPicklist.createDelegate(
                        this, ['Account {0}'], true
                    ),
                    requireSelection: false,
                    title: this.accountSubTypeTitleText,
                    type: 'picklist'
                },
                {
                    label: this.statusText,
                    name: 'Status',
                    picklist: 'Account Status',
                    requireSelection: false,
                    title: this.accountStatusTitleText,
                    type: 'picklist'
                },
                {
                    label: this.industryText,
                    name: 'Industry',
                    picklist: 'Industry',
                    requireSelection: false,
                    title: this.industryTitleText,
                    type: 'picklist'
                },
                {
                    label: this.businessDescriptionText,
                    multiline: true,
                    name: 'BusinessDescription',
                    type: 'text'
                },
                {
                    label: this.acctMgrText,
                    name: 'AccountManager',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                },
                {
                    label: this.ownerText,
                    name: 'Owner',
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    view: 'owner_list'
                },
                {
                    label: this.importSourceText,
                    name: 'LeadSource',
                    textProperty: 'Description',
                    type: 'lookup',
                    view: 'leadsource_list'
                }
            ]);
        }
    });
})();