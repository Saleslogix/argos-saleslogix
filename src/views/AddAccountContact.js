/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix");

(function() {
    Mobile.SalesLogix.AddAccountContact = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        accountNameText: 'account',
        accountStatusTitleText: 'Account Status',
        accountSubTypeTitleText: 'Account SubType',
        accountText: 'Account',
        accountTypeTitleText: 'Account Type',
        addressText: 'address',
        contactTitleText: 'Title',
        description: 'description',
        detailsAccountText: 'Account Info',
        detailsContactText: 'Contact Info',
        detailsText: 'Contact / Account Info',
        emailText: 'email',
        faxText: 'fax',
        homePhoneText: 'home phone',
        industryText: 'industry',
        lastNameText: 'last',
        mobileText: 'mobile',
        nameText: 'name',
        statusText: 'status',
        subTypeText: 'sub-type',
        titleText: 'Add Account / Contact',
        typeText: 'type',
        webText: 'web',
        workText: 'work phone',
        industryTitleText: 'Industry',

        //View Properties
        id: 'add_account_contact',
        resourceKind: 'accounts',
        entityName: 'Account',
        querySelect: [
            'AccountName',
            'Address',
            'BusinessDescription',
            'Contact/AccountName',
            'Contact/Address',
            'Contact/Email',
            'Contact/Fax',
            'Contact/FirstName',
            'Contact/HomePhone',
            'Contact/LastName',
            'Contact/Mobile',
            'Contact/Title',
            'Contact/WebAddress',
            'Contact/WorkPhone',
            'Fax',
            'Industry',
            'Status',
            'SubType',
            'Type'
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
        onInsertCompleted: function(entry) {
            var view = App.getView('account_detail');
            if (view)
                view.show({
                    descriptor: entry.$descriptor,
                    key: entry.$key
                }, {
                    returnTo: -1
                });
            else
                Mobile.SalesLogix.AddAccountContact.superclass.onInsertCompleted.apply(this, arguments);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    emptyText: '',
                    formatValue: Mobile.SalesLogix.Format.nameLF,
                    label: this.nameText,
                    name: 'Contacts.$resources[0]',
                    type: 'name',
                    validator: Mobile.SalesLogix.Validator.name,
                    view: 'name_edit'
                },
                {
                    label: this.accountNameText,
                    name: 'AccountName',
                    type: 'text',
                    validator: Mobile.SalesLogix.Validator.hasText
                },
                {
                    label: this.emailText,
                    name: 'Contacts.$resources[0].Email',
                    type: 'text'
                },
                {
                    label: this.webText,
                    name: 'WebAddress',
                    type: 'text',
                    maxTextLength: 128,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    label: this.workText,
                    name: 'MainPhone',
                    type: 'phone',
                    maxTextLength: 32,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    options: {
                        title: this.detailsContactText
                    },
                    as: [{
                        label: this.contactTitleText,
                        name: 'Contacts.$resources[0].Title',
                        picklist: 'Title',
                        title: this.contactTitleText,
                        type: 'picklist',
                        orderBy: 'text asc'
                    },
                    {
                        label: this.homePhoneText,
                        name: 'Contacts.$resources[0].HomePhone',
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                    },
                    {
                        name: 'Contacts.$resources[0].Mobile',
                        label: this.mobileText,
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                    },
                    {
                        name: 'Contacts.$resources[0].Fax',
                        label: this.faxText,
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                    },
                    {
                        emptyText: '',
                        formatValue: Mobile.SalesLogix.Format.address.createDelegate(this, [true], true),
                        label: this.addressText,
                        name: 'Contacts.$resources[0].Address',
                        type: 'address',
                        view: 'address_edit',
                        entityName: 'Contact'
                    }]
                },
                {
                    options: {
                        title: this.detailsAccountText
                    },
                    as: [{
                        name: 'Fax',
                        label: this.faxText,
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                    },
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
                        picklist: this.formatDependentPicklist.createDelegate(
                            this, ['Account {0}'], true
                        ),
                        title: this.accountSubTypeTitleText,
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
                    {
                        name: 'BusinessDescription',
                        label: this.description,
                        type: 'text'
                    },
                    {
                        emptyText: '',
                        formatValue: Mobile.SalesLogix.Format.address.createDelegate(this, [true], true),
                        label: this.addressText,
                        name: 'Address',
                        type: 'address',
                        view: 'address_edit',
                        entityName: 'Account'
                    }
                ]}
            ]);
        }
    });
})();