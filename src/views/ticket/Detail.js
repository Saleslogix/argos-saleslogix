/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

Mobile.SalesLogix.Ticket.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Ticket.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'ticket_detail',
            title: 'Ticket',
            editor: 'ticket_edit',
            resourceKind: 'tickets'
        });

        this.layout = [
            {name: 'TicketNumber', label: 'ticket id'},
            {name: 'Account.AccountName', label: 'account'},
            {name: 'Contact.FullName', label: 'name'},
            {name: 'Contact.WorkPhone', label: 'phone', renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Subject', label: 'subject'},
            {name: 'UrgencyCode', label: 'urgency'},
            {name: 'Area', label: 'area'},
            {name: 'ReceivedDate', label: 'received', renderer: Mobile.SalesLogix.Format.date},
            {name: 'AssignedTo.OwnerDescription', label: 'assigned to'},
            {name: 'StatusCode', label: 'status'},
            {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},
            {options: {title: 'Related Items', list: true}, as: [
                {
                    view: 'return_related', 
                    where: this.formatRelatedQuery.createDelegate(this, ['Account.Id eq "{0}"'], true),
                    label: 'Returns',
                    icon: 'content/images/return_detail_24x24.gif'
                }
            ]}              
        ];
    },
    
    init: function() {     
        Mobile.SalesLogix.Ticket.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Ticket.Detail.superclass.createRequest.call(this);
        
        request                     
            .setQueryArgs({
                'include': 'Account,Contact,AssignedTo,AccountManager/UserInfo,Owner',
                'select': [
                    'TicketNumber',
                    'Account/AccountName',
                    'Contact/FullName',
                    'Contact/WorkPhone',
                    'Subject',
                    'UrgencyCode',
                    'Area',
                    'ReceivedDate',
                    'AssignedTo/OwnerDescription',
                    'StatusCode',
                    'CreateUser',
                    'CreateDate',
                    'Category',
                    'Issue'
                   ].join(',')                  
            });     
        
        return request;                               
    } 
});