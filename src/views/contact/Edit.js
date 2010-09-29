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
        firstNameText: 'first',
        lastNameText: 'last',
        workText: 'phone',
        mobileText: 'mobile',
        emailText: 'email',
        webText: 'web',
        acctMgrText: 'acct mgr',
        acctnameText: 'account',
        hometext: 'home phone',
        faxText: 'fax',
        addressText: 'address',
        titlText: 'title',
        contactownerText: 'owner',
        constructor: function(o) {
            Mobile.SalesLogix.Contact.Edit.superclass.constructor.call(this);

            Ext.apply(this, o, {
                id: 'contact_edit',
                title: this.titleText,
                resourceKind: 'contacts',
                entityName: 'Contact'
            });

            this.layout = [
                {name: 'FirstName', label: this.firstNameText, type: 'text', validator: Mobile.SalesLogix.Validator.hasText},
                {name: 'LastName', label: this.lastNameText, type: 'text', validator: Mobile.SalesLogix.Validator.hasText},
                {name: 'Account', label: this.acctnameText, type: 'lookup', view: 'acc_list', textProperty: 'AccountName', forceValue: true},
                {name: 'WebAddress', label: this.webText, type: 'text'},
                {name: 'WorkPhone', label: this.workText, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
                {name: 'Email', label: this.emailText, type: 'text'},
                {name: 'Title', label: this.titlText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Title"', title: 'Title'},
                {name: 'Address', label: this.addressText, view: 'address_edit', type: 'address', resourceKind: 'contacts', title: 'Address', renderer: function(value){return Mobile.SalesLogix.Format.address(value, true)}},
                {name: 'HomePhone', label: this.hometext, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
                {name: 'Mobile', label: this.mobileText, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
                {name: 'Fax', label: this.faxText, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
                {name: 'AccountManager', label: this.acctMgrText, type: 'lookup', view: 'user_list', keyProperty: '$key', textProperty: 'UserInfo', textTemplate: Mobile.SalesLogix.Template.nameLF},
                {name: 'Owner', label: this.contactownerText, type: 'lookup', view: 'owner_list', keyProperty: '$key', textProperty: 'OwnerDescription'}
            ];
        },
        init: function() {
            Mobile.SalesLogix.Contact.Edit.superclass.init.call(this);
        },
        getValues: function() {
            var U = Sage.Platform.Mobile.Utility,
                values = Mobile.SalesLogix.Contact.Edit.superclass.getValues.apply(this, arguments),
                AccountName = Ext.DomQuery.select('#contact_edit [name="Account"] a span')[0].innerHTML;

            U.setValue(values, 'AccountName', AccountName);
            U.setValue(values, 'Account.AccountName', AccountName);
            U.setValue(values, 'NameLF', (values.FirstName + ' ' + values.LastName));
            if (values.Address && !values.Address.Description) U.setValue(values, 'Address.Description', 'Mailing');

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
        createRequest: function() {
            return Mobile.SalesLogix.Contact.Edit.superclass.createRequest.call(this)
                .setResourceKind(this.resourceKind)
               .setQueryArgs({
                    'select': [
                        'Account/AccountName',
                        'NameLF',
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
                        'CreateUser',
                        'Title',
                        'HomePhone',
                        'Mobile',
                        'Fax'
                    ].join(',')
                })
        }
    });
})();