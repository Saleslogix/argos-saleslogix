/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

Mobile.SalesLogix.Ticket.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Ticket',
    ticketIdText: 'ticket id',
    subjectText: 'subject',
    areaText: 'area',
    categoryText: 'category',
    issueText: 'issue',
    constructor: function(o) {
        Mobile.SalesLogix.Ticket.Edit.superclass.constructor.call(this);

       Ext.apply(this, o, {
            id: 'ticket_edit',
            title: this.titleText,
            resourceKind: 'tickets'
        });

        this.layout = [
            {name: 'TicketNumber', label: this.ticketIdText, type: 'text'},
            {name: 'Subject', label: this.subjectText, type: 'text'},
            {name: 'Area', label: this.areaText, type: 'text'},
            {name: 'Category', label: this.categoryText, type: 'text'},
            {name: 'Issue', label: this.issueText, type: 'text'},

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