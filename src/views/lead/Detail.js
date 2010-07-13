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
            editor: 'lead_edit',
            resourceKind: 'leads'
        });
        //Editable fields are mentioned below
        this.layout = [
	        {name: 'LeadNameFirstLast', label: 'name'},
	        {name: 'Company', label: 'account'},
            {name: 'WorkPhone', label: 'work', renderer: Mobile.SalesLogix.Format.phone},
	        {name: 'Email', label: 'e-mail', renderer: Mobile.SalesLogix.Format.mail},
	        {name: 'WebAddress', label: 'web', renderer: Mobile.SalesLogix.Format.link},
            {name: 'Owner.OwnerDescription', label: 'owner'},
            {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},
            
                
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
                'include': 'Address,AccountManager,AccountManager/UserInfo,Owner',                
                'select': [
                    'LeadNameFirstLast',
	                'FirstName',
                    'LastName',	
                    'Company',
                    'WorkPhone',
                    'Email',
                    'Address/*',
                    'WebAddress',
                    'Owner/OwnerDescription',
                    'CreateUser',
                    'CreateDate'
                ].join(',')             
            });

        return request;
    } 
});
