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
    accountNameText: 'accountname',
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
            {name: 'Contact.FirstName', label: this.firstNameText, type: 'text'},
            {name: 'Contact.LastName', label: this.lastNameText, type: 'text'},
            {name: 'Account.AccountName', label: this.accountNameText, type: 'text'},
            {name: 'Contact.Email', label: this.emailText, type: 'text'},
            {name: 'Contact.WebAddress', label: this.webText, type: 'text'},
            {name: 'Contact.WorkPhone', label: this.workText, type: 'phone'},
            {options: {title: this.detailsContactText}, as: [
                {name: 'Contact.Title', label: this.titleText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Title"', title: 'Title'},
                {name: 'Contact.HomePhone', label: this.homePhoneText, type: 'phone'},
                {name: 'Contact.Mobile', label: this.mobileText, type: 'phone'},
                {name: 'Contact.Fax', label: this.faxText, type: 'phone'}
            ]},
            {options: {title: this.detailsAccountText}, as: [
                {name: 'Account.Fax', label: this.faxText, type: 'phone'},
                {name: 'AccountType', label: this.typeText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Account Type"', title: 'Account Type', orderBy: 'sort asc'},
                {name: 'Account.SubType', label: this.subTypeText, type: 'pickup', view: 'pick_list', resourcePredicate: new Simplate(['name eq "Account {%= AccountType %}"']), title: 'Account SubType', dependsOn: 'AccountType', errMsg: 'A "Type" is required for "SubType"', orderBy: 'sort asc'},
                {name: 'Account.Status', label: this.statusText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Account Status"', title: 'Account Status', orderBy: 'sort asc'},
                {name: 'Account.Industry', label: this.industryText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Industry"', title: 'Industry', orderBy: 'sort asc'},
                {name: 'Account.BusinessDescription', label: this.description, type: 'text'}
            ]}
        ]
    },
    init: function() {
        Mobile.SalesLogix.Account.AddAccountContact.superclass.init.call(this);
    },
    createEntryForInsert: function(values) {
        var entry = Mobile.SalesLogix.Account.AddAccountContact.superclass.createEntryForInsert.call(this, values);

        entry.Account.Type = entry.AccountType;
        entry.Contact.AccountName = entry.Account.AccountName;
        entry.Contacts = {'$resources': []};
        entry.Contacts.$resources[0] = entry.Contact;
        delete entry.AccountType;
        delete entry.Contact;

        return entry;
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
