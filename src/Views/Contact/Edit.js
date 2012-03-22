/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/Contact/Edit', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Template',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/Edit',
    'Sage/Platform/Mobile/Utility'
], function(
    declare,
    Format,
    Template,
    Validator,
    Edit,
    Utility
) {

    return declare('Mobile.SalesLogix.Views.Contact.Edit', [Edit], {
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
        cuisinePreferenceText: 'cuisine',
        cuisinePreferenceTitleText: 'Cuisine',

        //View Properties
        entityName: 'Contact',
        id: 'contact_edit',
        insertSecurity: 'Entities/Contact/Add',
        updateSecurity: 'Entities/Contact/Edit',
        querySelect: [
            'Account/AccountName',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'AccountName',
            'Address/*',
            'CuisinePreference',
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

        onAccountChange: function(value, field) {
            this.fields['AccountName'].setValue(value.text);
        },
        show: function(options) {
            this.inherited(arguments);

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
                entry = view && view.entry;

            this.fields['Account'].setValue(entry);
            this.fields['AccountName'].setValue(Utility.getValue(entry, 'AccountName'));

            var account = entry,
                accountName = Utility.getValue(entry, 'AccountName'),
                webAddress = Utility.getValue(entry, 'WebAddress'),
                mainPhone = Utility.getValue(entry, 'MainPhone'),
                address = Utility.getValue(entry, 'Address'),
                fax = Utility.getValue(entry, 'Fax');

            if (account) this.fields['Account'].setValue(account);
            if (accountName) this.fields['AccountName'].setValue(accountName);
            if (webAddress) this.fields['WebAddress'].setValue(webAddress);
            if (mainPhone) this.fields['WorkPhone'].setValue(mainPhone);
            if (address) this.fields['Address'].setValue(this.cleanAddressEntry(address));
            if (fax) this.fields['Fax'].setValue(fax);
        },
        applyOpportunityContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            var opportunityId = Utility.getValue(entry, '$key'),
                account = Utility.getValue(entry, 'Account'),
                accountName = Utility.getValue(entry, 'Account.AccountName'),
                webAddress = Utility.getValue(entry, 'Account.WebAddress'),
                mainPhone = Utility.getValue(entry, 'Account.MainPhone'),
                address = Utility.getValue(entry, 'Account.Address'),
                fax = Utility.getValue(entry, 'Account.Fax');

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
            return this.layout || (this.layout = [{
                applyTo: '.',
                formatValue: Format.nameLF,
                label: this.nameText,
                name: 'ContactName',
                property: 'ContactName',
                type: 'name',
                validator: Validator.name,
                view: 'name_edit'
            },
            {
                label: this.accountNameText,
                name: 'Account',
                property: 'Account',
                textProperty: 'AccountName',
                type: 'lookup',
                validator: Validator.exists,
                view: 'account_related'
            },
            {
                name: 'AccountName',
                property: 'AccountName',
                type: 'hidden'
            },
            {
                name: 'WebAddress',
                property: 'WebAddress',
                label: this.webText,
                type: 'text',
                inputType: 'url',
                maxTextLength: 128,
                validator: Validator.exceedsMaxTextLength
            },
            {
                name: 'WorkPhone',
                property: 'WorkPhone',
                label: this.workText,
                type: 'phone',
                maxTextLength: 32,
                validator: Validator.exceedsMaxTextLength
            },
            {
                name: 'Email',
                property: 'Email',
                label: this.emailText,
                type: 'text',
                inputType: 'email'
            },
            {
                label: this.contactTitleText,
                name: 'Title',
                property: 'Title',
                picklist: 'Title',
                title: this.titleTitleText,
                type: 'picklist'
            },
            {
                formatValue: Format.address.bindDelegate(this, true),
                label: this.addressText,
                name: 'Address',
                property: 'Address',
                type: 'address',
                view: 'address_edit'
            },
            {
                name: 'HomePhone',
                property: 'HomePhone',
                label: this.homePhoneText,
                type: 'phone',
                maxTextLength: 32,
                validator: Validator.exceedsMaxTextLength
            },
            {
                name: 'Mobile',
                property: 'Mobile',
                label: this.mobileText,
                type: 'phone',
                maxTextLength: 32,
                validator: Validator.exceedsMaxTextLength
            },
            {
                name: 'Fax',
                property: 'Fax',
                label: this.faxText,
                type: 'phone',
                maxTextLength: 32,
                validator: Validator.exceedsMaxTextLength
            },
            {
                label: this.acctMgrText,
                name: 'AccountManager',
                property: 'AccountManager',
                textProperty: 'UserInfo',
                textTemplate: Template.nameLF,
                type: 'lookup',
                view: 'user_list'
            },
            {
                label: this.ownerText,
                name: 'Owner',
                property: 'Owner',
                textProperty: 'OwnerDescription',
                type: 'lookup',
                view: 'owner_list'
            },
            {
                name: 'Opportunities.$resources[0].Opportunity.$key',
                property: 'Opportunities.$resources[0].Opportunity.$key',
                type: 'hidden'
            },{
                label: this.cuisinePreferenceText,
                name: 'CuisinePreference',
                property: 'CuisinePreference',
                type: 'picklist',
                picklist: 'CuisinePrefs',
                multi: true,
                title: this.cuisinePreferenceTitleText
            }]);
        }
    });
});