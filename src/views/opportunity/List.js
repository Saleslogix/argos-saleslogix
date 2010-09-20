/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Opportunity");

Mobile.SalesLogix.Opportunity.List = Ext.extend(Sage.Platform.Mobile.List, {
    titleText: 'Opportunity',
    contentTemplate: new Simplate([
        /* quick method since there are only six stages */
        '<a href="#opportunity_detail" target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}" class="o-stage o-stage-{%= ($["Stage"] || "1").charAt(0) %}">',
        '<div class="o-meter">',
        '<h3>{%= $["Account"]["AccountName"] %}</h3>',
        '<h4>{%= $["Description"] %}</h4>',
        '</div>',
        '</a>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Opportunity.List.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'opportunity_list',
            title: this.titleText,
            editor: 'opportunity_edit',
            contextDialog: 'context_dialog',
            resourceKind: 'opportunities',
            pageSize: 25,
            icon: 'content/images/Opportunity_List_24x24.gif'
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
                  App.getView('opportunity_list').navigateToInsert.call({editor:'opportunity_edit'});
                },
                 scope: this
             }]
        })
    },
    formatSearchQuery: function(query) {
        return String.format('(Description like "%{0}%")', query);

        // todo: The below does not currently work as the dynamic SData adapter does not support dotted notation for queries
        //       except in certain situations.  Support for general dotted notation is being worked on.
        //return String.format('(Description like "%{0}%" or Account.AccountName like "%{0}%")', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Opportunity.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'Account',
                'orderby': 'Description',
                'select': 'Description,Account/AccountName,Stage'
            });

        return request;
    }
});
