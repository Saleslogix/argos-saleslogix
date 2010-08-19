/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.Add_Account_Contact = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Add Account/Contact',
    accountText: 'Account',
    firstNameText: 'FirstName',
    lastNameText: 'LastName',
    phoneText: 'Phone - Main',
    webText: 'Web',

    constructor: function(o) {
        Mobile.SalesLogix.Account.Add_Account_Contact.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'Add_Account_Contact',
            title: this.titleText,
            resourceKind: 'accounts',
            entityName: 'Account'
        });

        this.layout = [
            {name: 'AccountManager.UserInfo.FirstName', label: this.firstNameText, type: 'text'},
            {name: 'AccountManager.UserInfo.LastName', label: this.lastNameText, type: 'text'},
            {name: 'MainPhone', label: this.phoneText, type: 'text'},
            {name: 'WebAddress', label: this.webText, type: 'text'}
        ];
    },
    init: function() {
        Mobile.SalesLogix.Account.Add_Account_Contact.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Account.Add_Account_Contact.superclass.createRequest.call(this)    
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'AccountName',
                    'MainPhone',
                    'WebAddress',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName'
                ]
            });
    }
});
