/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix");

(function() {
    Mobile.SalesLogix.AddAccountContact = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'add_account_contact',
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
        titleTitleText: 'Title',
        accountTypeTitleText: 'Account Type',
        accountSubTypeTitleText: 'Account SubType',
        accountStatusTitleText: 'Account Status',
        industryTitleText: 'Industry',
        resourceKind: 'accounts',
        entityName: 'Account',
        queryInclude: [
            'Contact'
        ],
        querySelect: [
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
        ],
        getValues: function(values) {
            var U = Sage.Platform.Mobile.Utility,
                values = Mobile.SalesLogix.AddAccountContact.superclass.getValues.apply(this, arguments);

                U.setValue(values, 'Contacts.$resources[0].$name', 'Contact');
                U.setValue(values, 'Contacts.$resources[0].AccountName', values['AccountName']);

            return values;
        },
        formatDependentPicklist: function(dependentValue, format) {
            return String.format(format, dependentValue);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'Contacts.$resources[0].FirstName', label: this.firstNameText, type: 'text'},
                {name: 'Contacts.$resources[0].LastName', label: this.lastNameText, type: 'text'},
                {name: 'AccountName', label: this.accountNameText, type: 'text'},
                {name: 'Email', label: this.emailText, type: 'text'},
                {name: 'WebAddress', label: this.webText, type: 'text'},
                {name: 'MainPhone', label: this.workText, type: 'phone'},
                {options: {title: this.detailsContactText}, as: [
                    {
                        name: 'Contacts.$resources[0].Title',
                        label: this.titleText,
                        type: 'picklist',
                        picklist: 'Title',
                        title: this.titleTitleText
                    },
                    {name: 'Contacts.$resources[0].HomePhone', label: this.homePhoneText, type: 'phone'},
                    {name: 'Contacts.$resources[0].Mobile', label: this.mobileText, type: 'phone'},
                    {name: 'Contacts.$resources[0].Fax', label: this.faxText, type: 'phone'}
                ]},
                {options: {title: this.detailsAccountText}, as: [
                    {name: 'Fax', label: this.faxText, type: 'phone'},
                    {
                        name: 'Type',
                        label: this.typeText,
                        type: 'picklist',
                        picklist: 'Account Type',
                        title: this.accountTypeTitleText
                    },
                    {
                        name: 'SubType',
                        label: this.subTypeText,
                        type: 'picklist',
                        requireSelection: false,
                        picklist: this.formatDependentPicklist.createDelegate(this, ['Account {0}'], true),
                        title: this.accountSubTypeTitle,
                        dependsOn: 'Type'
                    },
                    {
                        name: 'Status',
                        label: this.statusText,
                        type: 'picklist',
                        picklist: 'Account Status',                        
                        title: this.accountStatusTitleText
                    },
                    {
                        name: 'Industry',
                        label: this.industryText,
                        type: 'picklist',
                        picklist: 'Industry',
                        title: this.industryTitleText
                    },
                    {name: 'BusinessDescription', label: this.description, type: 'text'}
                ]}
            ]);
        }
    });
})();
