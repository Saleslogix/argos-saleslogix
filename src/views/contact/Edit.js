/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

Mobile.SalesLogix.Contact.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Contact',
    firstNameText: 'contact',
    lastNameText: 'last',
    workText: 'phone',
    mobileText: 'mobile',
    emailText: 'email',
    webText: 'web',
    acctMgrText: 'acct mgr',
    acctnameText: 'account',
    hometext: 'home phone',
    faxText: 'fax',
    addressText: 'address',
    titlText: 'title',
    contactownerText: 'owner',
    constructor: function(o) {
        Mobile.SalesLogix.Contact.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'contact_edit',
            title: this.titleText,
            resourceKind: 'contacts',
            entityName: 'Contact'
        });

        this.layout = [
            {name: 'NameLF', label: this.firstNameText, type: 'text'},
            {name: 'Account.AccountName', label: this.acctnameText, type: 'text'},
            {name: 'WebAddress', label: this.webText, type: 'text'},
            {name: 'WorkPhone', label: this.workText, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
            {name: 'Email', label: this.emailText, type: 'text'},
            {name: 'Title', label: this.titlText, type: 'text'},
            {name: 'Address.FullAddress', label: this.addressText, type: 'text'},
            {name: 'HomePhone', label: this.hometext, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
            {name: 'Mobile', label: this.mobileText, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
            {name: 'Fax', label: this.faxText, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
            {name: 'AccountManager', label: this.acctMgrText, type: 'lookup', view: 'user_list', keyProperty: '$key', textProperty: 'UserInfo', textTemplate: Mobile.SalesLogix.Template.nameLF},
            {name: 'Owner', label: this.contactownerText, type: 'lookup', view: 'owner_list', keyProperty: '$key', textProperty: 'OwnerDescription'},
             
        ];
    },
    init: function() {
        Mobile.SalesLogix.Contact.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Contact.Edit.superclass.createRequest.call(this)
            .setResourceKind(this.resourceKind)
           .setQueryArgs({
                'select': [
                    'Account/AccountName',
                    'NameLF',
                    'FirstName',
                    'LastName',
                    'AccountName',
                    'WorkPhone',
                    'Mobile',
                    'Email',
                    'Address/*',
                    'WebAddress',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName',
                    'Owner/OwnerDescription',
                    'CreateDate',
                    'CreateUser',
                    'Title',
                    'HomePhone',
                    'Mobile',
                    'Fax'
                ].join(',')
            })
    }
});
