/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

(function() {
    Mobile.SalesLogix.Contact.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
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

        //View Properties
        entityName: 'Contact',
        id: 'contact_edit',
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
        resourceKind: 'contacts',

        init: function() {
            Mobile.SalesLogix.Contact.Edit.superclass.init.apply(this, arguments);

            this.fields['Account'].on('change', this.onAccountChange, this);
        },
        onAccountChange: function(value, field) {
            this.fields['AccountName'].setValue(value.text);
        },
        show: function(options) {
            Mobile.SalesLogix.Contact.Edit.superclass.show.apply(this, arguments);

            if (options.insert === true) this.applyContext();
        },
        applyContext: function() {
            var found = App.queryNavigationContext(function(o) {
                return /^(accounts)$/.test(o.resourceKind) && o.key;
            });

            var lookup = {
                'accounts': this.applyAccountContext
            };

            if (found && lookup[found.resourceKind]) lookup[found.resourceKind].call(this, found);
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

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
                    applyTo: '.',
                    formatValue: Mobile.SalesLogix.Format.nameLF,
                    label: this.nameText,
                    name: 'ContactName',
                    type: 'name',
                    validator: Mobile.SalesLogix.Validator.name,
                    view: 'name_edit'
                },
                {
                    label: this.accountNameText,
                    name: 'Account',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'account_related'
                },
                {
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
                    label: this.contactTitleText,
                    name: 'Title',
                    picklist: 'Title',
                    title: this.titleTitleText,
                    type: 'picklist'
                },
                {
                    formatValue: Mobile.SalesLogix.Format.address,
                    label: this.addressText,
                    name: 'Address',
                    type: 'address',
                    view: 'address_edit'
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
                    label: this.acctMgrText,
                    name: 'AccountManager',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                },
                {
                    label: this.ownerText,
                    name: 'Owner',
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    view: 'owner_list'
                }
            ]);
        }
    });
})();