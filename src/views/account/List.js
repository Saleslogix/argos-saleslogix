/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.List = Ext.extend(Sage.Platform.Mobile.List, {
    titleText: 'Account',
    fbartitleText: 'note',

    contentTemplate: new Simplate([
        '<a href="#account_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%: $["AccountName"] %}</h3>',
        '<h4>{%: $["AccountManager"] ? $ ["AccountManager"]["UserInfo"]["UserName"] : "" %}</h4>',
        '</a>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Account.List.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'account_list',
            title: this.titleText,
            editor: 'account_edit',
            contextDialog: 'context_dialog',
            resourceKind: 'accounts',
            pageSize: 25,
            icon: 'content/images/Accounts_24x24.gif'
        });

        Ext.apply(this.tools || {}, {
            fbar: [{
                name: 'new',
                title: 'new',                        
                cls: 'tool-note',
                icon: 'content/images/Note_32x32.gif',
                fn: this.navigateToInsert,
                scope: this
            },{
                name: 'test2',
                title: this.titleText,
                icon: 'content/images/Whats_New_3D_Files_32x32.gif',
                fn: function() { alert("two");},
                scope: this
            },{
                name: 'test3',
                title: this.titleText,
                icon: 'content/images/To_Do_32x32.gif',
                fn: function() {
                    alert(this.getSelected().join(','));
                },
                scope: this
            }]
        })
    },
    formatSearchQuery: function(query) {
        return String.format('AccountName like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Account.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'AccountManager/UserInfo',
                'orderby': 'AccountName',
                'select': [
                    'AccountName',
                    'AccountManager/UserInfo/UserName'
                ].join(',')
            });

        return request;
    }
});
