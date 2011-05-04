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
                return /^(accounts|opportunities)$/.test(o.resourceKind) && o.key;
            });

            var lookup = {
                'accounts': this.applyAccountContext,
                'opportunities': this.applyOpportunityContext
            };

            this.fields['AccountManager'].setValue(App.context.user);
            this.fields['Owner'].setValue(App.context['defaultOwner']);

            if (found && lookup[found.resourceKind])
                lookup[found.resourceKind].call(this, found);            
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry,
                getV = Sage.Platform.Mobile.Utility.getValue;

            this.fields['Account'].setValue(entry);
            this.fields['AccountName'].setValue(getV(entry, 'AccountName'));

            var account = entry,
                accountName = getV(entry, 'AccountName'),
                webAddress = getV(entry, 'WebAddress'),
                mainPhone = getV(entry, 'MainPhone'),
                address = getV(entry, 'Address'),
                fax = getV(entry, 'Fax');

            if (account) this.fields['Account'].setValue(account);
            if (accountName) this.fields['AccountName'].setValue(accountName);
            if (webAddress) this.fields['WebAddress'].setValue(webAddress);
            if (mainPhone) this.fields['WorkPhone'].setValue(mainPhone);
            if (address) this.fields['Address'].setValue(this.cleanAddressEntry(address));
            if (fax) this.fields['Fax'].setValue(fax);
        },
        applyOpportunityContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry,
                getV = Sage.Platform.Mobile.Utility.getValue;

            var opportunityId = getV(entry, '$key'),
                account = getV(entry, 'Account'),
                accountName = getV(entry, 'Account.AccountName'),
                webAddress = getV(entry, 'Account.WebAddress'),
                mainPhone = getV(entry, 'Account.MainPhone'),
                address = getV(entry, 'Account.Address'),
                fax = getV(entry, 'Account.Fax');

            if (opportunityId) this.fields['Opportunities.$resources[0].Opportunity.$key'].setValue(opportunityId);
            if (account) this.fields['Account'].setValue(account);
            if (accountName) this.fields['AccountName'].setValue(accountName);
            if (webAddress) this.fields['WebAddress'].setValue(webAddress);
            if (mainPhone) this.fields['WorkPhone'].setValue(mainPhone);
            if (address) this.fields['Address'].setValue(this.cleanAddressEntry(address));            
            if (fax) this.fields['Fax'].setValue(fax);
        },
        cleanAddressEntry: function(address) {
            if (address)
            {
                var clean = {},
                    skip = {
                        '$key': true,
                        '$lookup': true,
                        '$url': true,
                        'EntityId': true,
                        'ModifyDate': true,
                        'ModifyUser': true,
                        'CreateDate': true,
                        'CreateUser': true
                    };

                for (var name in address) if (!skip[name]) clean[name] = address[name];

                return clean;
            }
            else
            {
                return null;
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
                    type: 'text',
                    maxTextLength: 128,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    name: 'WorkPhone',
                    label: this.workText,
                    type: 'phone',
                    maxTextLength: 32,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
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
                    formatValue: Mobile.SalesLogix.Format.address.createDelegate(this, [true], true),
                    label: this.addressText,
                    name: 'Address',
                    type: 'address',
                    view: 'address_edit'
                },
                {
                    name: 'HomePhone',
                    label: this.homePhoneText,
                    type: 'phone',
                    maxTextLength: 32,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    name: 'Mobile',
                    label: this.mobileText,
                    type: 'phone',
                    maxTextLength: 32,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    name: 'Fax',
                    label: this.faxText,
                    type: 'phone',
                    maxTextLength: 32,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
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
                },
                {
                    name: 'Opportunities.$resources[0].Opportunity.$key',
                    type: 'hidden'
                }
            ]);
        }
    });
})();