/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Account.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'account_detail',
            title: 'Account',
            editor: 'account_edit',
            resourceKind: 'accounts'
        });

        this.layout = [
            {name: 'AccountName', label: 'account'},
            {name: 'MainPhone', label: 'phone', renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Address', label: 'address', renderer: Mobile.SalesLogix.Format.address},
            {name: 'WebAddress', label: 'web', renderer: Mobile.SalesLogix.Format.link},
            {name: 'Type', label: 'type'},
            {name: 'SubType', label: 'sub-type'}, 
            {name: 'AccountManager.UserInfo', label: 'acct mgr', tpl: Mobile.SalesLogix.Template.nameLF},
            {name: 'Notes', label: 'notes'},
            {name: 'Owner.OwnerDescription', label: 'owner'},
            {name: 'Status', label: 'status'},
            {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},
            
            {options: {title: 'Related Items', list: true}, as: [
                {
                    view: 'contact_related', 
                    where: this.formatRelatedQuery.createDelegate(this, ['Account.id eq "{0}"'], true),
                    label: 'Contacts',
                    icon: 'content/images/Contacts_24x24.gif'
                },
                {
                    view: 'opportunity_related', 
                    where: this.formatRelatedQuery.createDelegate(this, ['Account.id eq "{0}"'], true),
                    label: 'Opportunities',
                    icon: 'content/images/Opportunity_List_24x24.gif'
                },
                {
                    view: 'ticket_related', 
                    where: this.formatRelatedQuery.createDelegate(this, ['Account.id eq "{0}"'], true),
                    label: 'Tickets',
                    icon: 'content/images/Ticket_List_3D_32x32.gif'
                },
                {
                    view: 'activity_related', 
                    where: this.formatRelatedQuery.createDelegate(this, ['AccountId eq "{0}"'], true),
                    label: 'Activities',
                    icon: 'content/images/Task_List_3D_24x24.gif'
                }
                
            ]}
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Account.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Account.Detail.superclass.createRequest.call(this);
        
        request                     
            .setQueryArgs({
                'include': 'Address,AccountManager,AccountManager/UserInfo,Owner',
                'select': [
                    'AccountName',
                    'MainPhone',
                    'Address/*',
                    'WebAddress',
                    'Type',
                    'SubType',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName',
                    'Notes',
                    'Owner/OwnerDescription',
                    'Status',
                    'CreateDate',
                    'CreateUser',
                    'GlobalSyncID'
                ].join(',')                  
            });     
        
        return request;                   
    } 
});
