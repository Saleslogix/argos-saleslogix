/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

Mobile.SalesLogix.Lead.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {       
    constructor: function(o) {
        Mobile.SalesLogix.Lead.Edit.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'lead_edit',
            title: 'Lead',
            resourceKind: 'leads'
        });

       this.layout = [
            {name: 'LeadNameFirstLast', label: 'leadNameFirstLast', type: 'text'},
	    {name: 'Company', label: 'company', type: 'text'},
            {name: 'Email', label: 'email', type: 'text'},
            {name: 'Address', label: 'address', type: 'text'}
            //{name: 'Type', label: 'type', type: 'text'}           
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Lead.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'include': 'Owner,CreateUser',                
                'select': [
                    'LeadNameFirstLast',
                    'Company',
                    'WorkPhone',
                    'Email',
                    'Address',
                    'WebAddress',
                    'Owner',
                    'CreateDate',
                    'CreateUser'
                ].join(',')                          
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});