/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

Mobile.SalesLogix.Note.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Note.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'note_detail',
            title: 'Note',
            editor: 'note_edit',
            resourceKind: 'history'
        });

        this.layout = [
            {name: 'Notes', label: 'notes'},
            ];
    },
    init: function() {     
        Mobile.SalesLogix.Note.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Note.Detail.superclass.createRequest.call(this);
        
        request                     
            .setQueryArgs({
                'select': [
                    'Notes'
                  ]
            });     
        
        return request;                   
    } 
});
