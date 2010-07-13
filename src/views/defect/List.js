/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

Mobile.SalesLogix.Defect.List = Ext.extend(Sage.Platform.Mobile.List, {   
    itemTemplate: new Simplate([
        '<li>',
        '<a href="#defect_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%= $["AlternateKeyPrefix"] %}-{%= $["AlternateKeySuffix"] %}</h3>',
        '</a>',
        '</li>'
    ]),    
    constructor: function(o) {
        Mobile.SalesLogix.Defect.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'defect_list',
            title: 'Defects',
            resourceKind: 'defects',
            pageSize: 10,
            icon: 'content/images/defect_detail_24x24.gif'
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
        return String.format('AccountName like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Defect.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'orderby': 'AlternateKeySuffix',
                'select': [
                            'AlternateKeyPrefix',
                            'AlternateKeySuffix'
                          ]
                        });

        return request;
    }
});