/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/AddAccountContact', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    lang,
    string,
    Format,
    Validator,
    Utility,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.AddAccountContact', [Edit], {
        //Localization
        accountNameText: 'account',
        accountStatusTitleText: 'Account Status',
        accountSubTypeTitleText: 'Account SubType',
        accountText: 'Account',
        accountTypeTitleText: 'Account Type',
        addressText: 'address',
        contactTitleText: 'Title',
        descriptionText: 'description',
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
        init: function() {
            this.inherited(arguments);

            this.connect(this.fields['Contacts.$resources[0].Address'], 'onChange', this.onContactAddressChange);
        },
        getValues: function(all) {
            var values = this.inherited(arguments);

            Utility.setValue(values, 'Contacts.$resources[0].$name', 'Contact');
            Utility.setValue(values, 'Contacts.$resources[0].AccountName', values['AccountName']);

            return values;
        },
        formatDependentPicklist: function(dependentValue, format) {
            if(!lang.isArray(dependentValue)) dependentValue = [dependentValue];
            return string.substitute(format, [dependentValue]);
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
                this.inherited(arguments);
        },
        onContactAddressChange: function(value, field) {
            if( this.fields['Address'].getValue() && !this.fields['Address'].getValue().Address1 ) {
                this.fields['Address'].setValue(value);
            }
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    emptyText: '',
                    formatValue: Format.nameLF,
                    label: this.nameText,
                    name: 'Contacts.$resources[0]',
                    property: 'Contacts.$resources[0]',
                    type: 'name',
                    validator: Validator.name,
                    view: 'name_edit'
                },
                {
                    label: this.accountNameText,
                    name: 'AccountName',
                    property: 'AccountName',
                    type: 'text',
                    validator: Validator.hasText
                },
                {
                    label: this.emailText,
                    name: 'Contacts.$resources[0].Email',
                    property: 'Contacts.$resources[0].Email',
                    type: 'text',
                    inputType: 'email'
                },
                {
                    label: this.webText,
                    name: 'WebAddress',
                    property: 'WebAddress',
                    type: 'text',
                    inputType: 'url',
                    maxTextLength: 128,
                    validator: Validator.exceedsMaxTextLength
                },
                {
                    label: this.workText,
                    name: 'MainPhone',
                    property: 'MainPhone',
                    type: 'phone',
                    maxTextLength: 32,
                    validator: Validator.exceedsMaxTextLength
                },
                {
                    title: this.detailsContactText,
                    name: 'ContactInfoSection',
                    children: [{
                        label: this.contactTitleText,
                        name: 'Contacts.$resources[0].Title',
                        property: 'Contacts.$resources[0].Title',
                        picklist: 'Title',
                        title: this.contactTitleText,
                        type: 'picklist',
                        orderBy: 'text asc'
                    },
                    {
                        label: this.homePhoneText,
                        name: 'Contacts.$resources[0].HomePhone',
                        property: 'Contacts.$resources[0].HomePhone',
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Validator.exceedsMaxTextLength
                    },
                    {
                        name: 'Contacts.$resources[0].Mobile',
                        property: 'Contacts.$resources[0].Mobile',
                        label: this.mobileText,
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Validator.exceedsMaxTextLength
                    },
                    {
                        name: 'Contacts.$resources[0].Fax',
                        property: 'Contacts.$resources[0].Fax',
                        label: this.faxText,
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Validator.exceedsMaxTextLength
                    },
                    {
                        emptyText: '',
                        formatValue: Format.address.bindDelegate(this, true, true),
                        label: this.addressText,
                        name: 'Contacts.$resources[0].Address',
                        property: 'Contacts.$resources[0].Address',
                        type: 'address',
                        view: 'address_edit',
                        entityName: 'Contact'
                    }]
                },
                {
                    title: this.detailsAccountText,
                    name: 'AccountInfoSection',
                    children: [{
                        name: 'Fax',
                        property: 'Fax',
                        label: this.faxText,
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Validator.exceedsMaxTextLength
                    },
                    {
                        name: 'Type',
                        property: 'Type',
                        label: this.typeText,
                        type: 'picklist',
                        picklist: 'Account Type',
                        title: this.accountTypeTitleText
                    },
                    {
                        name: 'SubType',
                        property: 'SubType',
                        label: this.subTypeText,
                        type: 'picklist',
                        requireSelection: false,
                        picklist: this.formatDependentPicklist.bindDelegate(
                            this, 'Account ${0}', true
                        ),
                        title: this.accountSubTypeTitleText,
                        dependsOn: 'Type'
                    },
                    {
                        name: 'Status',
                        property: 'Status',
                        label: this.statusText,
                        type: 'picklist',
                        picklist: 'Account Status',
                        title: this.accountStatusTitleText
                    },
                    {
                        name: 'Industry',
                        property: 'Industry',
                        label: this.industryText,
                        type: 'picklist',
                        picklist: 'Industry',
                        title: this.industryTitleText
                    },
                    {
                        name: 'BusinessDescription',
                        property: 'BusinessDescription',
                        label: this.descriptionText,
                        type: 'text'
                    },
                    {
                        emptyText: '',
                        formatValue: Format.address.bindDelegate(this, true, true),
                        label: this.addressText,
                        name: 'Address',
                        property: 'Address',
                        type: 'address',
                        view: 'address_edit',
                        entityName: 'Account'
                    }
                ]}
            ]);
        }
    });
});