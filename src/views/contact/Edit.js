/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

(function() {
    Mobile.SalesLogix.Contact.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'contact_edit',
        titleText: 'Contact',
        nameText: 'name',
        workText: 'phone',
        mobileText: 'mobile',
        emailText: 'email',
        webText: 'web',
        acctMgrText: 'acct mgr',
        accountNameText: 'account',
        homePhoneText: 'home phone',
        faxText: 'fax',
        addressText: 'address',
        contactTitleText: 'title',
        titleTitleText: 'Title',
        addressTitleText: 'Address',
        ownerText: 'owner',
        resourceKind: 'contacts',
        entityName: 'Contact',
        querySelect: [
            'Account/AccountName',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'AccountName',
            'Address/*',
            'CreateDate',
            'CreateUser',
            'Email',
            'Fax',
            'FirstName',
            'HomePhone',
            'LastName',
            'MiddleName',
            'Mobile',
            'NameLF',
            'Owner/OwnerDescription',
            'Prefix',
            'Suffix',
            'Title',
            'WebAddress',
            'WorkPhone'
        ],
        init: function() {
            Mobile.SalesLogix.Contact.Edit.superclass.init.apply(this, arguments);
            var accountName = this.fields['AccountName'];

            this.fields['Account'].on('change', function(value, field) {
                accountName.setValue(value.text);
            });
        },
        setValues: function() {
            Mobile.SalesLogix.Contact.Edit.superclass.setValues.apply(this, arguments);

            var contexts = ['accounts'],
                primaryContext = App.queryNavigationContext(function(){return true}, 1),
                secondaryContext = App.getMatchingContext(contexts), entry;

            if (!secondaryContext) return;

            entry = App.getView(secondaryContext.id).entry;

            if (entry && secondaryContext.resourceKind === 'accounts')
            {
                this.applyAccountContext(entry);
            }
        },
        applyAccountContext: function(entry) {
            for (var field in this.fields)
            {
                if (field === 'Account')
                {
                    this.fields['Account'].setValue(entry);
                    continue;
                }
                else if (field === 'WorkPhone')
                {
                    this.fields['WorkPhone'].setValue(entry['MainPhone']);
                    continue;
                }
                else if (!entry[field])
                    continue;

                this.fields[field].setValue(entry[field]);
            }
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'ContactName',
                    label: this.nameText,
                    type: 'name',
                    view: 'name_edit',
                    applyTo: '',
                    formatter: Mobile.SalesLogix.Format.nameLF
                },
                {
                    name: 'Account',
                    label: this.accountNameText,
                    type: 'lookup',
                    view: 'account_lookup',
                    textProperty: 'AccountName',
                    forceValue: true
                },
                {
                    alwaysUseValue: true,
                    name: 'AccountName',
                    type: 'hidden'
                },
                {
                    name: 'WebAddress',
                    label: this.webText,
                    type: 'text'
                },
                {
                    name: 'WorkPhone',
                    label: this.workText,
                    type: 'phone'
                },
                {
                    name: 'Email',
                    label: this.emailText,
                    type: 'text'
                },
                {
                    name: 'Title',
                    label: this.contactTitleText,
                    type: 'picklist',
                    picklist: 'Title',
                    title: this.titleTitleText
                },
                {
                    name: 'Address',
                    label: this.addressText,
                    view: 'address_edit',
                    type: 'address',
                    formatter: Mobile.SalesLogix.Format.address
                },
                {
                    name: 'HomePhone',
                    label: this.homePhoneText,
                    type: 'phone'
                },
                {
                    name: 'Mobile',
                    label: this.mobileText,
                    type: 'phone'
                },
                {
                    name: 'Fax',
                    label: this.faxText,
                    type: 'phone'
                },
                {
                    name: 'AccountManager',
                    label: this.acctMgrText,
                    type: 'lookup',
                    view: 'user_list',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF
                },
                {
                    name: 'Owner',
                    label: this.ownerText,
                    type: 'lookup',
                    view: 'owner_list',
                    textProperty: 'OwnerDescription'
                }
            ]);
        }
    });
})();