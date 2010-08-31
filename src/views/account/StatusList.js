/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.StatusList = Ext.extend(Sage.Platform.Mobile.PickList, {
    resourcePredicate: 'name eq "Account Status"',
    contentTemplate: new Simplate([
        '<a href="#account_detail" target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}">',
        '<h3>{%: $.text %}</h3>',
        '</a>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Account.StatusList.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'account_status_list',
            title: 'Account Status',
            pageSize: 25,
            icon: 'content/images/Accounts_24x24.gif'
        });
    }
});
