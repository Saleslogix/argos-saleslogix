/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.AddAccountContact = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Add Account / Contact',
    detailsText: 'Contact / Account Info',
    detailsContactText: 'Contact Info',
    detailsAccountText: 'Account Info',
    accountText: 'Account',
    firstNameText: 'firstName',
    lastNameText: 'lastName',
    phoneText: 'phone',
    webText: 'Web',
    workText: 'workPhone',
    mobileText: 'mobile',
    faxText: 'fax',
    typeText: 'type',
    subTypeText: 'subtype',
    industryText: 'industry',
    description: 'description',
    statusText: 'status',
    constructor: function(o) {
        Mobile.SalesLogix.Account.AddAccountContact.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'AddAccountContact',
            title: this.titleText,
            resourceKind: 'accounts',
            entityName: 'Account'
        });

        this.layout = [
            {name: 'AccountManager.UserInfo.FirstName', label: this.firstNameText, type: 'text'},
            {name: 'AccountManager.UserInfo.LastName', label: this.lastNameText, type: 'text'},
            {name: 'MainPhone', label: this.phoneText, type: 'text'},
            {name: 'WebAddress', label: this.webText, type: 'text'},
            {options: {title: this.detailsContactText}, as: [
                {name: 'WorkPhone', label: this.workText, type: 'text'},
                {name: 'Mobile', label: this.mobileText, type: 'text'},
                {name: 'Fax', label: this.faxText, type: 'text'}
            ]},
            {options: {title: this.detailsAccountText}, as: [
                {name: 'Fax', label: this.faxText, type: 'text'},
                {name: 'Type', label: this.typeText, type: 'text'},
                {name: 'SubType', label: this.subTypeText, type: 'text'},
                {name: 'Status', label: this.statusText, type: 'text'},
                {name: 'Industry', label: this.industryText, type: 'text'},
                {name: 'BusinessDescription', label: this.description, type: 'text'}
            ]}
        ]
    },
    init: function() {
        Mobile.SalesLogix.Account.AddAccountContact.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Account.AddAccountContact.superclass.createRequest.call(this)
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'include': 'Account,Address,AccountManager,AccountManager/UserInfo',
                'select': [
                    'AccountName',
                    'MainPhone',
                    'WebAddress',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName',
                    'WorkPhone',
                    'Mobile',
                    'Fax',
                    'Type',
                    'SubType',
                    'Status',
                    'Industry',
                    'BusinessDescription',

                ]
            });
    }
});
