/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
//Rajkumar. G 05-07-2010
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
            {name: 'FirstName', label: 'firstname', type: 'text'},
            {name: 'LastName', label: 'lastname', type: 'text'}, 
 	    {name: 'Company', label: 'company', type: 'text'},
            {name: 'WorkPhone', label: 'workphone', type: 'text'}, 
 	    {name: 'Email', label: 'email', type: 'text'},
            {name: 'WebAddress', label: 'webaddress', type: 'text'}          
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Lead.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'include': 'Account,Address,AccountManager,AccountManager/UserInfo,Owner',
                'select': [
		    'FirstName',
                    'LastName',	
                    'Company',
                    'WorkPhone',
                    'Email',
                    'WebAddress'
                ].join(',')                  
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});
//Rajkumar. G 05-07-2010