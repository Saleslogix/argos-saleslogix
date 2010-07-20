/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

Mobile.SalesLogix.Note.List = Ext.extend(Sage.Platform.Mobile.List, {
   contentTemplate: new Simplate([
        '<a href="#note_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%= Notes %}</h3>',
        '</a>'
    ]),   
    constructor: function(o) {
        Mobile.SalesLogix.Note.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'note_list',
            title: 'Notes',
            resourceKind: 'history',
            pageSize: 10,
            icon: 'content/images/note_24x24.gif'
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
    createRequest: function() {
        var request = Mobile.SalesLogix.Note.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'orderby': 'ModifyDate',
                'select': [
                    'Notes'
                ].join(',')
            });

        return request;
    }
});
