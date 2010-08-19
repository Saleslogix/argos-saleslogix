/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.Address_Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Account',
    accountText: 'Account',
    phoneText: 'Phone - Main',
    webText: 'Web',
    typeText: 'Type',
    subTypeText: 'Sub-type',
    statusText: 'Status',
    fullAddressText: 'FullAddress',
    descriptionText: 'Description',
    isPrimaryText: 'Primary',
    isMailingText: 'Shipping',
    address1Text: 'Address 1',
    address2Text: 'Address 2',
    address3Text: 'Address 3',
    acctMgrText: 'AccountManager',
    ownerText: 'Owner',
    cityText: 'City',
    stateText: 'State',
    postalCodeText: 'Postal Code',
    countryText: 'Country',
    faxText: 'Fax',
    industryText: 'Industry',
    businessDescriptionText: 'BusinessDescription',
    importSourceText: 'LeadSource',

    constructor: function(o) {
        Mobile.SalesLogix.Account.Address_Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'account_address_edit',
            title: this.titleText,
            resourceKind: 'accounts',
            entityName: 'Account'
        });

        this.layout = [
            {name: 'AccountName', label: this.accountText, type: 'text'},
            {name: 'Description', label: this.descriptionText, type: 'text'},
            {name: 'IsPrimary', label: this.isPrimaryText, type: 'text'},
            {name: 'IsMailing', label: this.isMailingText, type: 'text'},
            {name: 'Address.Address1', label: this.address1Text, type: 'text'},
            {name: 'Address.Address2', label: this.address2Text, type: 'text'},
            {name: 'Address.Address3', label: this.address3Text, type: 'text'},
            {name: 'Address.City', label: this.cityText, type: 'text'},
            {name: 'Address.State', label: this.stateText, type: 'text'},
            {name: 'Address.PostalCode', label: this.postalCodeText, type: 'text'},
            {name: 'Address.Country', label: this.countryText, type: 'text'}
        ];
    },
    init: function() {
        Mobile.SalesLogix.Account.Address_Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Account.Address_Edit.superclass.createRequest.call(this)    
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'AccountName',
                    'MainPhone',
                    'WebAddress',
                    'AccountName',
                    'WebAddress',
                    'MainPhone',
                    'FullAddress',
                    'Description',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName',
                    'User/UserInfo/UserName',
                    'Notes',
                    'Owner/OwnerDescription',
                    'IsPrimary',
                    'IsMailing',
                    'Address1',
                    'Address2',
                    'Address3',
                    'City',
                    'State',
                    'PostalCode',
                    'Country',
                    'Fax',
                    'Type',
                    'SubType',
                    'Status',
                    'Industry',
                    'BusinessDescription'
                  ]
            });
    }
});
