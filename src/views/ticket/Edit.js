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
            {name: 'TicketNumber', label: 'ticketnumber', type: 'text'},
            {name: 'Subject', label: 'subject', type: 'text'},
            {name: 'Area', label: 'area', type: 'text'},
            {name: 'Category', label: 'category', type: 'text'},
            {name: 'Issue', label: 'issue', type: 'text'},
                  
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Ticket.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'TicketNumber',
                    'Subject',
                    'Area',
                    'Category',
                    'Issue'
                 ]                  
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});