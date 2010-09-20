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
        '<a href="#account_detail" target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}">',
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
                name: 'home',
                title: 'home',                        
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.goHome,
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',                        
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: function(){
                  App.getView('account_list').navigateToInsert.call({editor:'account_edit'});
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
