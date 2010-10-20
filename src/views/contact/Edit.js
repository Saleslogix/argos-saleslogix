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
            'NameLF',
            'Prefix',
            'FirstName',
            'MiddleName',
            'LastName',
            'Suffix',
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
        ],
        getValues: function() {
            var U = Sage.Platform.Mobile.Utility,
                values = Mobile.SalesLogix.Contact.Edit.superclass.getValues.apply(this, arguments);

            U.setValue(values, 'AccountName', U.getValue(values, 'Account.AccountName'));
            
            return values;
        },
        setValues: function() {
            var relatedAccount = App.getView(App.context.view[2]);

            Mobile.SalesLogix.Contact.Edit.superclass.setValues.apply(this, arguments);
            if (App.context.view[1].id == 'contact_related' && relatedAccount && relatedAccount.entry)
            {
                this.fields['Account'].setValue(relatedAccount.entry);
            }
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'ContactName', label: this.nameText, type: 'name', view: 'name_edit', applyTo:'', formatter: Mobile.SalesLogix.Format.nameLF},
                {name: 'Account', label: this.accountNameText, type: 'lookup', view: 'account_lookup', textProperty: 'AccountName', forceValue: true},
                {name: 'WebAddress', label: this.webText, type: 'text'},
                {name: 'WorkPhone', label: this.workText, type: 'phone'},
                {name: 'Email', label: this.emailText, type: 'text'},
                {name: 'Title', label: this.contactTitleText, type: 'picklist', picklist: 'Title', title: this.titleTitleText},
                {name: 'Address', label: this.addressText, view: 'address_edit', type: 'address', formatter: Mobile.SalesLogix.Format.address},
                {name: 'HomePhone', label: this.homePhoneText, type: 'phone'},
                {name: 'Mobile', label: this.mobileText, type: 'phone'},
                {name: 'Fax', label: this.faxText, type: 'phone'},
                {
                    name: 'AccountManager',
                    label: this.acctMgrText,
                    type: 'lookup',
                    view: 'user_list',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF
                },
                {name: 'Owner', label: this.ownerText, type: 'lookup', view: 'owner_list', textProperty: 'OwnerDescription'}
            ]);  
        }
    });
})();