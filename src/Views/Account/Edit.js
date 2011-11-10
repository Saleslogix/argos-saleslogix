/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>


define('Mobile/SalesLogix/Views/Account/Edit', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Account.Edit', [Sage.Platform.Mobile.Edit], {
        //Localization
        accountStatusTitleText: 'Account Status',
        accountSubTypeTitleText: 'Account Subtype',
        accountText: 'account',
        accountTypeTitleText: 'Account Type',
        acctMgrText: 'acct mgr',
        businessDescriptionText: 'bus desc',
        businessDescriptionTitleText: 'Business Description',
        descriptionText: 'desc',
        faxText: 'fax',
        fullAddressText: 'address',
        importSourceText: 'lead source',
        industryText: 'industry',
        industryTitleText: 'Industry',
        ownerText: 'owner',
        phoneText: 'phone',
        statusText: 'status',
        subTypeText: 'subtype',
        titleText: 'Account',
        typeText: 'type',
        webText: 'web',

        //View Properties
        entityName: 'Account',
        id: 'account_edit',
        insertSecurity: 'Entities/Account/Add',
        updateSecurity: 'Entities/Account/Edit',
        querySelect: [
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'AccountName',
            'BusinessDescription',
            'Description',
            'Fax',
            'Industry',
            'LeadSource/Description',
            'MainPhone',
            'Notes',
            'Owner/OwnerDescription',
            'Status',
            'SubType',
            'Type',
            'User/UserInfo/UserName',
            'WebAddress'
        ],
        resourceKind: 'accounts',

        formatDependentPicklist: function(dependentValue, format) {
            return dojo.string.substitute(format, [dependentValue]);
        },
        applyContext: function() {
            this.inherited(arguments);
            this.fields['AccountManager'].setValue(App.context.user);
            this.fields['Owner'].setValue(App.context['defaultOwner']);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                label: this.accountText,
                property: 'AccountName',
                type: 'text',
                validator: Mobile.SalesLogix.Validator.hasText
            },{
                label: this.webText,
                property: 'WebAddress',
                renderer: Mobile.SalesLogix.Format.link,
                type: 'text',
                inputType: 'url',
                maxTextLength: 128,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                label: this.phoneText,
                property: 'MainPhone',
                type: 'phone',
                maxTextLength: 32,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                emptyText: '',
                formatValue: Mobile.SalesLogix.Format.address.bindDelegate(this, [true], true),
                label: this.fullAddressText,
                property: 'Address',
                type: 'address',
                view: 'address_edit'
            },{
                label: this.faxText,
                property: 'Fax',
                type: 'phone',
                maxTextLength: 32,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                label: this.typeText,
                property: 'Type',
                picklist: 'Account Type',
                requireSelection: true,
                title: this.accountTypeTitleText,
                type: 'picklist'
            },{
                dependsOn: 'Type',
                label: this.subTypeText,
                property: 'SubType',
                picklist: this.formatDependentPicklist.bindDelegate(
                    this, 'Account ${0}', true
                ),
                requireSelection: false,
                title: this.accountSubTypeTitleText,
                type: 'picklist',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                label: this.statusText,
                property: 'Status',
                picklist: 'Account Status',
                requireSelection: false,
                title: this.accountStatusTitleText,
                type: 'picklist'
            },{
                label: this.industryText,
                property: 'Industry',
                picklist: 'Industry',
                requireSelection: false,
                title: this.industryTitleText,
                type: 'picklist',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                label: this.businessDescriptionText,
                property: 'BusinessDescription',
                noteProperty: false,
                title: this.businessDescriptionTitleText,
                type: 'note',
                view: 'text_edit'
            },{
                label: this.acctMgrText,
                property: 'AccountManager',
                textProperty: 'UserInfo',
                textTemplate: Mobile.SalesLogix.Template.nameLF,
                type: 'lookup',
                view: 'user_list'
            },{
                label: this.ownerText,
                property: 'Owner',
                textProperty: 'OwnerDescription',
                type: 'lookup',
                view: 'owner_list'
            },{
                label: this.importSourceText,
                property: 'LeadSource',
                textProperty: 'Description',
                type: 'lookup',
                view: 'leadsource_list'
            }]);
        }
    });
});