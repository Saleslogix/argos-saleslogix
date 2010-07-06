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
            {name: 'TicketNumber', label: 'ticketNumber'},
            {name: 'Account.AccountName', label: 'name'},
            {name: 'Subject', label: 'subject'},
            {name: 'Account.MainPhone', label: 'phone', renderer: Mobile.SalesLogix.Format.phone},
            {name: 'UrgencyCode', label: 'urgencycode'},
            {name: 'Area', label: 'area'},
            {name: 'ReceivedDate', label: 'receiveddated', renderer: Mobile.SalesLogix.Format.date},
            {name: 'AssignedTo.OwnerDescription', label: 'AssignedTo'},
            {name: 'StatusCode', label: 'statuscode'},
            {name: 'AccountManager.UserInfo.OwnerDescription', label: 'createuser'},
            {name: 'CreateDate', label: 'createdate', renderer: Mobile.SalesLogix.Format.date},
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
                'include': 'Account,AssignedTo,AccountManager/UserInfo,Owner',
                'select': [
                    'TicketNumber',
                    'Account/AccountName',
                    'Subject',
                    'Account/MainPhone',
                    'UrgencyCode',
                    'Area',
                    'ReceivedDate',
                    'AssignedTo/OwnerDescription',
                    'StatusCode',
                    'AccountManager/UserInfo/OwnerDescription',
                    'CreateDate',
                    'Category',
                    'Issue'
                   ].join(',')                  
            });     
        
        return request;                               
    } 
});