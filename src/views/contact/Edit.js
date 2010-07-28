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
    firstNameText: 'first',
    lastNameText: 'last',
    workText: 'work',
    mobileText: 'mobile',
    emailText: 'email',
    webText: 'web',

    constructor: function(o) {
        Mobile.SalesLogix.Contact.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'contact_edit',
            title: this.titleText,
            resourceKind: 'contacts'
        });

        this.layout = [
            {name: 'FirstName', label: this.firstNameText, type: 'text'},
            {name: 'LastName',  label: this.lastNameText, type: 'text'},
	        {name: 'WorkPhone', label: this.workText, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
	        {name: 'Mobile', label: this.mobileText, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
            {name: 'Email', label: this.emailText, type: 'text'},
	        {name: 'WebAddress', label: this.webText, type: 'text'}
        ];
    },
    init: function() {
        Mobile.SalesLogix.Contact.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
            .setResourceKind(this.resourceKind)
           .setQueryArgs({
                'include': 'Account,Address,AccountManager,AccountManager/UserInfo',
                'select': [
                    'Account/AccountName',
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
                    'CreateUser'
                ].join(',')
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});
