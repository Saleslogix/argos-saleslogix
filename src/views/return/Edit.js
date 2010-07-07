/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

Mobile.SalesLogix.Return.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {       
    constructor: function(o) {
        Mobile.SalesLogix.Return.Edit.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'return_edit',
            title: 'Return',
            resourceKind: 'returns'
        });

        this.layout = [
            {name: 'ReturnNumber', label: 'returnnumber', type: 'text'},
            {name: 'Priority', label: 'priority', type: 'text'},
            {name: 'ReturnType', label: 'returntype', type: 'text'},
            {name: 'ExpectedDate', label: 'expected date', type: 'text'},
            {name: 'ReturnedBy.FullName', label: 'returnedby', type: 'text'},
            
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Return.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'include': 'ReturnedBy',
                'select': [
                    'ReturnNumber',
                    'Priority',
                    'ReturnType',
                    'ExpectedDate',
                    'ReturnedBy/FullName'
                  ].join(',') 
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});