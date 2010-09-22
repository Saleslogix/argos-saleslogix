/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.AddAccountContact = Ext.extend(Sage.Platform.Mobile.Edit, {    
    expose: true,
    titleText: 'Add Account / Contact',
    detailsText: 'Account Info',
    detailsContactText: 'Contact Info',
    accountNameText: 'account',
    firstNameText: 'first',
    lastNameText: 'last',   
    resourceKind: 'accounts',
    entityName: 'Account',
    constructor: function(o) {
        Mobile.SalesLogix.Account.AddAccountContact.superclass.constructor.apply(this, arguments);

        Ext.apply(this, o, {
            id: 'add_account_contact',
            expose: true,
            title: this.titleText,
            resourceKind: 'accounts',
            entityName: 'Account'
        });

        this.layout = [
            {name: 'AccountName', label: this.accountNameText, type: 'text'},
            {options: {title: this.detailsContactText}, as: [
                {name: 'Contacts.$resources[0].FirstName', label: this.firstNameText, type: 'text'},
                {name: 'Contacts.$resources[0].LastName', label: this.lastNameText, type: 'text'}
            ]}
        ];
    },
    getValues: function() {
        var U = Sage.Platform.Mobile.Utility,
            values = Mobile.SalesLogix.Account.AddAccountContact.superclass.getValues.apply(this, arguments);

        U.setValue(values, 'Contacts.$resources[0].$name', 'Contact');
        U.setValue(values, 'Contacts.$resources[0].AccountName', values['AccountName']);

        return values;
    },
    show: function(options) {
        Mobile.SalesLogix.Account.AddAccountContact.superclass.show.call(this, Ext.apply(options || {}, {
            insert: true
        }));
    },
    createRequest: function() {
        return Mobile.SalesLogix.Account.AddAccountContact.superclass.createRequest.call(this)
            .setResourceKind('accounts')
            .setQueryArgs({
                'include': 'Contact',
                'select': [
                    'AccountName',
                    'Fax',
                    'Type',
                    'SubType',
                    'Status',
                    'Industry',
                    'BusinessDescription',
                    'Contact/FirstName',
                    'Contact/LastName',
                    'Contact/AccountName',
                    'Contact/Email',
                    'Contact/WebAddress',
                    'Contact/WorkPhone',
                    'Contact/Title',
                    'Contact/HomePhone',
                    'Contact/Mobile',
                    'Contact/Fax'
                ].join(',')
            });
    }
});
