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
    subTypeText: 'sub-type',
    statusText: 'status',
    constructor: function(o) {
        Mobile.SalesLogix.Account.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'account_edit',
            title: this.titleText,
            resourceKind: 'accounts'
        });

        this.layout = [
            {name: 'AccountName', label: this.accountText, type: 'text'},
            {name: 'MainPhone', label: this.phoneText, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
            {name: 'WebAddress', label: this.webText, renderer: Mobile.SalesLogix.Format.link, type: 'text'},
            {name: 'Type', label: this.typeText, type: 'text'},
            {name: 'SubType', label: this.subTypeText, type: 'text'},
            {name: 'Status', label: this.statusText, type: 'text'}
        ];
    },
    init: function() {
        Mobile.SalesLogix.Account.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'AccountName',
                    'MainPhone',
                    'WebAddress',
                    'Type',
                    'SubType',
                    'Status'
                  ]
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});