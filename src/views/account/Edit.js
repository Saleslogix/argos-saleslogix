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
    accountText: 'account',
    phoneText: 'phone',
    webText: 'web',
    typeText: 'type',
    subTypeText: 'subtype',
    statusText: 'status',
    fullAddressText: 'address',
    descriptionText: 'desc',
    isPrimaryText: 'primary',
    isMailingText: 'shipping',
    address1Text: 'address 1',
    address2Text: 'address 2',
    address3Text: 'address 3',
    acctMgrText: 'acct mgr',
    ownerText: 'owner',
    cityText: 'city',
    stateText: 'state',
    postalCodeText: 'postal',
    countryText: 'country',
    faxText: 'fax',
    industryText: 'industry',
    businessDescriptionText: 'bus desc',
    importSourceText: 'lead source',

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
            {name: 'Address', label: this.fullAddressText, view: 'address_edit', type: 'address', resourceKind: 'accounts', title: 'Address', renderer: function(value){return Mobile.SalesLogix.Format.address(value, true)}},
            {name: 'Fax', label: this.faxText, type: 'phone'},
            {name: 'Type', label: this.typeText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Account Type"', title: 'Account Type', orderBy: 'sort asc'},
            {name: 'SubType', label: this.subTypeText, type: 'pickup', view: 'pick_list', resourcePredicate: new Simplate(['name eq "Account {%= Type %}"']), title: 'Account SubType', dependsOn: 'Type', errMsg: 'A "Type" is required for "SubType"', orderBy: 'sort asc'},
            {name: 'Status', label: this.statusText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Account Status"', title: 'Account Status', orderBy: 'sort asc'},
            {name: 'Industry', label: this.industryText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Industry"', title: 'Industry', orderBy: 'sort asc'},
            {name: 'BusinessDescription', label: this.businessDescriptionText, type: 'text'},
            {name: 'AccountManager', label: this.acctMgrText, type: 'lookup', view: 'user_list', keyProperty: '$key', textProperty: 'UserInfo', textTemplate: Mobile.SalesLogix.Template.nameLF},
            {name: 'Owner', label: this.ownerText, type: 'lookup', view: 'owner_list', keyProperty: '$key', textProperty: 'OwnerDescription'},
            {name: 'LeadSource', label: this.importSourceText, type: 'lookup', view: 'leadsource_list', keyProperty: '$key', textProperty: 'Description'}
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
                    'BusinessDescription',
                    'LeadSource/Description'
                  ]
            });
    }
});
