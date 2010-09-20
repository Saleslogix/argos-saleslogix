/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

Mobile.SalesLogix.Return.List = Ext.extend(Sage.Platform.Mobile.List, {
    titleText: 'Return',
    fbartitleText: 'note',
    contentTemplate: new Simplate([
        '<a href="#return_detail" target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}">',
        '<h3>{%: $["Account"] ? $["Account"]["AccountName"] : "" %}</h3>',
        '<h4>{%: $["ReturnNumber"] %}</h4>',
        '</a>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Return.List.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'return_list',
            title: this.titleText,
            editor: 'return_edit',
            resourceKind: 'returns',
            pageSize: 25,
            icon: 'content/images/return_detail_24x24.gif'
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
                  App.getView('return_list').navigateToInsert.call({editor:'return_edit'});
                },
                 scope: this
             }]
        })
    },
    formatSearchQuery: function(query) {
        return String.format('ReturnNumber like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Return.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'Account',
                'orderby': 'ReturnNumber',
                'select': 'Account/AccountName,ReturnNumber'
            });

        return request;
    }
});
