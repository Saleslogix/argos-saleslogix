/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

Mobile.SalesLogix.Return.List = Ext.extend(Sage.Platform.Mobile.List, {   
    contentTemplate: new Simplate([        
        '<a href="#return_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%: $["Account"] ? $["Account"]["AccountName"] : "" %}</h3>',
        '<h4>{%: $["ReturnNumber"] %}</h4>',
        '</a>'        
    ]),    
    constructor: function(o) {
        Mobile.SalesLogix.Return.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'return_list',
            title: 'Returns',
            resourceKind: 'returns',
            pageSize: 10,
            icon: 'content/images/return_detail_24x24.gif'
        });

        Ext.apply(this.tools || {}, {            
            fbar: [{
                name: 'test',
                title: 'note',                        
                cls: 'tool-note',  
                icon: 'content/images/Note_32x32.gif',               
                fn: function() { alert("one"); },
                scope: this                
            },{
                name: 'test2',
                title: 'note',                        
                icon: 'content/images/Whats_New_3D_Files_32x32.gif',             
                fn: function() { alert("two");},
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