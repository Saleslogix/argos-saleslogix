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
    accountNameText: 'account',
    firstNameText: 'first',
    lastNameText: 'last',
    emailText: 'e-mail',
    webText: 'web',
    workText: 'work phone',
    titleText: 'title',
    homePhoneText: 'home phone',
    mobileText: 'mobile',
    faxText: 'fax',
    typeText: 'type',
    subTypeText: 'sub-type',
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
            {name: 'Contacts.$resources[0].FirstName', label: this.firstNameText, type: 'text'},
            {name: 'Contacts.$resources[0].LastName', label: this.lastNameText, type: 'text'},
            {name: 'AccountName', label: this.accountNameText, type: 'text'},
            {name: 'Email', label: this.emailText, type: 'text'},
            {name: 'WebAddress', label: this.webText, type: 'text'},
            {name: 'MainPhone', label: this.workText, type: 'phone'},
            {options: {title: this.detailsContactText}, as: [
                {name: 'Contacts.$resources[0].Title', label: this.titleText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Title"', title: 'Title'},
                {name: 'Contacts.$resources[0].HomePhone', label: this.homePhoneText, type: 'phone'},
                {name: 'Contacts.$resources[0].Mobile', label: this.mobileText, type: 'phone'},
                {name: 'Contacts.$resources[0].Fax', label: this.faxText, type: 'phone'}
            ]},
            {options: {title: this.detailsAccountText}, as: [
                {name: 'Fax', label: this.faxText, type: 'phone'},
                {name: 'Type', label: this.typeText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Account Type"', title: 'Account Type', orderBy: 'sort asc'},
                {name: 'SubType', label: this.subTypeText, type: 'pickup', view: 'pick_list', resourcePredicate: new Simplate(['name eq "Account {%= AccountType %}"']), title: 'Account SubType', dependsOn: 'Type', errMsg: 'A "Type" is required for "SubType"', orderBy: 'sort asc'},
                {name: 'Status', label: this.statusText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Account Status"', title: 'Account Status', orderBy: 'sort asc'},
                {name: 'Industry', label: this.industryText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Industry"', title: 'Industry', orderBy: 'sort asc'},
                {name: 'BusinessDescription', label: this.description, type: 'text'}
            ]}
        ]
    },
    init: function() {
        Mobile.SalesLogix.Account.AddAccountContact.superclass.init.call(this);
    },
    getValues: function(values) {
        var U = Sage.Platform.Mobile.Utility,
            values = Mobile.SalesLogix.Account.AddAccountContact.superclass.getValues.apply(this, arguments);

            U.setValue(values, 'Contacts.$resources[0].$name', 'Contact');
            U.setValue(values, 'Contacts.$resources[0].AccountName', values['AccountName']);

        return values;
    },
    createRequest: function() {
        return Mobile.SalesLogix.Account.AddAccountContact.superclass.createRequest.call(this)
            .setResourceKind(this.resourceKind)
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
                ]
            });
    }
});
