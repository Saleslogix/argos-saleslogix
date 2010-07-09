/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

Mobile.SalesLogix.Activity.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {       
    constructor: function(o) {
        Mobile.SalesLogix.Activity.Edit.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'activity_edit',
            title: 'Activity',
            resourceKind: 'activities'
        });

        this.layout = [
            {name: 'Type', label: 'type', type: 'text'},
            {name: 'Description', label: 'regarding', type: 'text'},
            {name: 'Priority', label: 'priority', type: 'text'},
           ];
    },
    init: function() {     
        Mobile.SalesLogix.Activity.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'Type',
                    'Description',
                    'Priority'
                   ]
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});