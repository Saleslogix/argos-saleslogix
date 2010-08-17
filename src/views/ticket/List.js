/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

Mobile.SalesLogix.Ticket.List = Ext.extend(Sage.Platform.Mobile.List, {
    titleText: 'Ticket',
    fbartitleText: 'note',
    contentTemplate: new Simplate([
        '<a href="#ticket_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%: $["Account"] ? $["Account"]["AccountName"] : "" %}</h3>',
        '<h4>{%: $["TicketNumber"] %}</h4>',
        '</a>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Ticket.List.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'ticket_list',
            title: this.titleText,
            editor: 'ticket_edit',
            resourceKind: 'tickets',
            pageSize: 25,
            icon: 'content/images/Ticket_List_3D_32x32.gif'
        });

        Ext.apply(this.tools || {}, {
            fbar: [{
                name: 'new',
                title: 'new',
                cls: 'tool-note',
                icon: 'content/images/Note_32x32.gif',
                fn: this.navigateToInsert,
                scope: this
            },{
                name: 'test2',
                title: this.titleText,
                icon: 'content/images/Whats_New_3D_Files_32x32.gif',
                fn: function() { alert("two");},
                scope: this
            }]
        })
    },
    formatSearchQuery: function(query) {
        return String.format('TicketNumber like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Ticket.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'Account',
                'orderby': 'TicketNumber',
                'select':  'Account/AccountName,TicketNumber'
            });

       return request;
    }
});