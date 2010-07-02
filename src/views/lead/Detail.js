/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
/// <reference path="../../Template.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

Mobile.SalesLogix.Lead.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Lead.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'lead_detail',
            title: 'Lead',
            editor: 'lead_edit',//Rajkumar. G added for enabling edit functionality
            resourceKind: 'leads'//Resource specification
        });
//Editable fields are mentioned below
        this.layout = [
	    {name: 'LeadNameFirstLast', label: 'leadNameFirstLast'},
	    {name: 'Company', label: 'company'},
            {name: 'WorkPhone', label: 'work', renderer: Mobile.SalesLogix.Format.phone},
	    {name: 'Email', label: 'email', renderer: Mobile.SalesLogix.Format.mail},
	    {name: 'Address', label: 'address'},
            {name: 'WebAddress', label: 'web', renderer: Mobile.SalesLogix.Format.link},
            {name: 'Owner.OwnerDescription', label: 'owner'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},
            {name: 'CreateUser', label: 'create user'},
            {options: {title: 'Related Items', list: true}, as: [                
                {
                    view: 'lead_related', 
                    label: 'leads',
                    icon: 'content/images/lead_List_24x24.gif'
                }
            ]}           
        ];
    },        
    init: function() {     
        Mobile.SalesLogix.Lead.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Lead.Detail.superclass.createRequest.call(this); 
//query args are mentioned here
        request            
            .setQueryArgs({
                'include': 'Owner,CreateUser',                
                'select': [
                    'Description',
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
            });

        return request;
    } 
});