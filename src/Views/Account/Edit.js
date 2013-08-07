/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Account/Edit', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Validator',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    string,
    validator,
    format,
    template,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.Account.Edit', [Edit], {
        //Localization
        accountStatusTitleText: 'Account Status',
        accountSubTypeTitleText: 'Account Subtype',
        accountText: 'account',
        accountTypeTitleText: 'Account Type',
        acctMgrText: 'acct mgr',
        businessDescriptionText: 'bus desc',
        businessDescriptionTitleText: 'Business Description',
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
        insertSecurity: 'Entities/Account/Add',
        updateSecurity: 'Entities/Account/Edit',
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
            return string.substitute(format, [dependentValue]);
        },
        applyContext: function(templateEntry) {
            this.inherited(arguments);

            this.fields['AccountManager'].setValue(App.context.user);
            this.fields['Owner'].setValue(App.context['defaultOwner']);

            this.fields['Type'].setValue(templateEntry.Type);
            this.fields['Status'].setValue(templateEntry.Status);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                    label: this.accountText,
                    name: 'AccountName',
                    property: 'AccountName',
                    type: 'text',
                    validator: validator.notEmpty
                }, {
                    label: this.webText,
                    name: 'WebAddress',
                    property: 'WebAddress',
                    renderer: format.link,
                    type: 'text',
                    inputType: 'url',
                    maxTextLength: 128,
                    validator: validator.exceedsMaxTextLength
                }, {
                    label: this.phoneText,
                    name: 'MainPhone',
                    property: 'MainPhone',
                    type: 'phone',
                    maxTextLength: 32,
                    validator: validator.exceedsMaxTextLength
                }, {
                    emptyText: '',
                    formatValue: format.address.bindDelegate(this, [true], true),
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
                    validator: validator.exceedsMaxTextLength
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
                    picklist: this.formatDependentPicklist.bindDelegate(
                        this, 'Account ${0}', true
                    ),
                    requireSelection: false,
                    title: this.accountSubTypeTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
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
                    validator: validator.exceedsMaxTextLength
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
                    textTemplate: template.nameLF,
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
});

