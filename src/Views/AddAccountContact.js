/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/AddAccountContact', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.AddAccountContact', [Sage.Platform.Mobile.Edit], {
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
        getValues: function(values) {
            var U = Sage.Platform.Mobile.Utility,
                values = this.inherited(arguments);

                U.setValue(values, 'Contacts.$resources[0].$name', 'Contact');
                U.setValue(values, 'Contacts.$resources[0].AccountName', values['AccountName']);

            return values;
        },
        formatDependentPicklist: function(dependentValue, format) {
            if(!dojo.isArray(dependentValue)) dependentValue = [dependentValue];
            return dojo.string.substitute(format, [dependentValue]);
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
                    formatValue: Mobile.SalesLogix.Format.nameLF,
                    label: this.nameText,
                    property: 'Contacts.$resources[0]',
                    type: 'name',
                    validator: Mobile.SalesLogix.Validator.name,
                    view: 'name_edit'
                },
                {
                    label: this.accountNameText,
                    property: 'AccountName',
                    type: 'text',
                    validator: Mobile.SalesLogix.Validator.hasText
                },
                {
                    label: this.emailText,
                    property: 'Contacts.$resources[0].Email',
                    type: 'text',
                    inputType: 'email'
                },
                {
                    label: this.webText,
                    property: 'WebAddress',
                    type: 'text',
                    inputType: 'url',
                    maxTextLength: 128,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    label: this.workText,
                    property: 'MainPhone',
                    type: 'phone',
                    maxTextLength: 32,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    title: this.detailsContactText,
                    children: [{
                        label: this.contactTitleText,
                        property: 'Contacts.$resources[0].Title',
                        picklist: 'Title',
                        title: this.contactTitleText,
                        type: 'picklist',
                        orderBy: 'text asc'
                    },
                    {
                        label: this.homePhoneText,
                        property: 'Contacts.$resources[0].HomePhone',
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                    },
                    {
                        property: 'Contacts.$resources[0].Mobile',
                        label: this.mobileText,
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                    },
                    {
                        property: 'Contacts.$resources[0].Fax',
                        label: this.faxText,
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                    },
                    {
                        emptyText: '',
                        formatValue: Mobile.SalesLogix.Format.address.bindDelegate(this, true, true),
                        label: this.addressText,
                        property: 'Contacts.$resources[0].Address',
                        type: 'address',
                        view: 'address_edit',
                        entityName: 'Contact'
                    }]
                },
                {
                    title: this.detailsAccountText,
                    children: [{
                        property: 'Fax',
                        label: this.faxText,
                        type: 'phone',
                        maxTextLength: 32,
                        validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                    },
                    {
                        property: 'Type',
                        label: this.typeText,
                        type: 'picklist',
                        picklist: 'Account Type',
                        title: this.accountTypeTitleText
                    },
                    {
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
                        property: 'Status',
                        label: this.statusText,
                        type: 'picklist',
                        picklist: 'Account Status',
                        title: this.accountStatusTitleText
                    },
                    {
                        property: 'Industry',
                        label: this.industryText,
                        type: 'picklist',
                        picklist: 'Industry',
                        title: this.industryTitleText
                    },
                    {
                        property: 'BusinessDescription',
                        label: this.descriptionText,
                        type: 'text'
                    },
                    {
                        emptyText: '',
                        formatValue: Mobile.SalesLogix.Format.address.bindDelegate(this, true, true),
                        label: this.addressText,
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