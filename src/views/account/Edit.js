/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
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
        Mobile.SalesLogix.Account.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'account_edit',
            title: this.titleText,
            resourceKind: 'accounts',
            entityName: 'Account'
        });

        this.layout = [
            {name: 'AccountName', label: this.accountText, type: 'text'},
            {name: 'WebAddress', label: this.webText, renderer: Mobile.SalesLogix.Format.link, type: 'text'},
            {name: 'MainPhone', label: this.phoneText, type: 'phone'},
            {name: 'Address.FullAddress', label: this.fullAddressText, type: 'text'},
            {name: 'Description', label: this.descriptionText, type: 'text'},
            {name: 'IsPrimary', label: this.isPrimaryText, type: 'text'},
            {name: 'IsMailing', label: this.isMailingText, type: 'text'},
            {name: 'Address.Address1', label: this.address1Text, type: 'text'},
            {name: 'Address.Address2', label: this.address2Text, type: 'text'},
            {name: 'Address.Address3', label: this.address3Text, type: 'text'},
            {name: 'Address.City', label: this.cityText, type: 'text'},
            {name: 'Address.State', label: this.stateText, type: 'text'},
            {name: 'Address.PostalCode', label: this.postalCodeText, type: 'text'},
            {name: 'Address.Country', label: this.countryText, type: 'text'},
            {name: 'Fax', label: this.faxText, type: 'text'},
            {name: 'Type', label: this.typeText, type: 'text'},
            {name: 'SubType', label: this.subTypeText, type: 'text'},
            {name: 'Status', label: this.statusText, type: 'boolean', onText: 'Active', offText: 'Inactive'},
            {name: 'Industry', label: this.industryText, type: 'text'},
            {name: 'BusinessDescription', label: this.businessDescriptionText, type: 'text'},
            {name: 'User.UserInfo.UserName', label: this.acctMgrText, type: 'text'},
            {name: 'Owner.OwnerDescription', label: this.ownerText, type: 'text'},
            {name: 'ImportSource', label: this.importSourceText, type: 'text'}
        ];
    },
    init: function() {
        Mobile.SalesLogix.Account.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Account.Edit.superclass.createRequest.call(this)    
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
