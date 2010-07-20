/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
/// <reference path="../../Template.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

Mobile.SalesLogix.Contact.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Contact.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'contact_detail',
            title: 'Contact',
	        editor: 'contact_edit',
            resourceKind: 'contacts'
        }); 

        this.layout = [
            {name: 'Name', label: 'name'},
            {name: 'AccountName', descriptor: 'AccountName', label: 'account', view: 'account_detail', key: 'Account.$key', property: true},
            {name: 'WorkPhone', label: 'work', renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Mobile', label: 'mobile', renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Email', label: 'email', renderer: Mobile.SalesLogix.Format.mail},
            {name: 'Address', label: 'address', renderer: Mobile.SalesLogix.Format.address},
            {name: 'WebAddress', label: 'web', renderer: Mobile.SalesLogix.Format.link},
            {name: 'AccountManager.UserInfo', label: 'acct mgr', tpl: Mobile.SalesLogix.Template.nameLF},
            {name: 'Owner.OwnerDescription', label: 'owner'},
            {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},            
            {options: {title: 'Related Items', list: true}, as: [
               
                {
                    view: 'activity_related', 
                    where: this.formatRelatedQuery.createDelegate(this, ['ContactId eq "{0}"'], true),
                    label: 'Activities',
                    icon: 'content/images/Task_List_3D_24x24.gif'
                },
                {
                    view: 'note_related', 
                    where: this.formatRelatedQuery.createDelegate(this, ['ContactId eq "{0}" and Type eq "atNote"'], true),
                    label: 'Notes',
                    icon: 'content/images/note_24x24.gif'
                }
               
            ]} 
        ];
    },        
    
    init: function() {     
        Mobile.SalesLogix.Contact.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Contact.Detail.superclass.createRequest.call(this);
        
        request         
            .setQueryArgs({
                'include': 'Account,Address,AccountManager,AccountManager/UserInfo',                
                'select': [
                    'Account/AccountName',
                    'Name',
                    'FirstName',
                    'LastName',
                    'AccountName',
                    'WorkPhone',
                    'Mobile',
                    'Email',
                    'Address/*',
                    'WebAddress',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName',
                    'Owner/OwnerDescription',
                    'CreateDate',
                    'CreateUser'
                ].join(',')             
            });
        
        return request;            
    } 
});
