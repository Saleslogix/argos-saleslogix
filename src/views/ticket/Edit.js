/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

Mobile.SalesLogix.Ticket.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {       
    constructor: function(o) {
        Mobile.SalesLogix.Ticket.Edit.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'ticket_edit',
            title: 'Ticket',
            resourceKind: 'tickets'
        });

        this.layout = [
            //{name: 'TicketNumber', label: 'ticketnumber', type: 'text'},
            //{name: 'Account.AccountName', label: 'name', type: 'text'},
            {name: 'Subject', label: 'subject', type: 'text'},
            //{name: 'Account.MainPhone', label: 'mainphone', type: 'text'},
            {name: 'UrgencyCode', label: 'urgencycode', type: 'text'},
            //{name: 'Area', label: 'area', type: 'text'},
            //{name: 'ReceivedDate', label: 'receiveddate', type: 'text',renderer: Mobile.SalesLogix.Format.date},
            {name: 'AssignedTo.OwnerDescription', label: 'assignedto', type: 'text'},
            {name: 'StatusCode', label: 'statuscode', type: 'text'},
            //{name: 'CreateUser.OwnerDescription', label: 'createuser', type: 'text'},
            //{name: 'CreateDate', label: 'createdate', type: 'text',renderer: Mobile.SalesLogix.Format.date},
            
           
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Ticket.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'include': 'Account,AssignedTo,CreateUser',
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
                    'CreateUser/OwnerDescription',
                    'CreateDate'
                ].join(',')                  
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});