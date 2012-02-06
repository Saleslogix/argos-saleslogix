/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/TicketActivity/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.TicketActivity.List', [Sage.Platform.Mobile.List], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.AssignedDate, $$.startDateFormatText) %}</h3>',
            '<div class="note-text-item">',
                '<div class="note-text-wrap">',
                    '{%: $.ActivityDescription %}',
                '</div>',
                '<div class="note-text-more"></div>',
            '</div>'
        ]),

        //Localization
        titleText: 'Ticket Activities',
        startDateFormatText: 'MM/dd/yyyy h:mmtt',

        //View Properties       
        id: 'ticketactivity_list',
        security: 'Entities/TicketActivity/View',
        expose: false,
        detailView: 'ticketactivity_detail',
        insertView: 'ticketactivity_edit',
        queryOrderBy: 'AssignedDate asc',
        querySelect: [
            'ActivityDescription',
            'AssignedDate'
        ],
        resourceKind: 'ticketActivities',

        _onResize: function() {
            dojo.query('.note-text-item', this.contentNode).forEach(function(node){
                var wrapNode = dojo.query('.note-text-wrap', node)[0],
                    moreNode = dojo.query('.note-text-more', node)[0];
                if (dojo.marginBox(node).h < dojo.marginBox(wrapNode).h)
                    dojo.style(moreNode, 'visibility', 'visible');
                else
                    dojo.style(moreNode, 'visibility', 'hidden');
            });
        },
        processFeed: function(){
            this.inherited(arguments);
            this._onResize();
        },
        postCreate: function() {
            this.inherited(arguments);
            this.subscribe('/app/resize', this._onResize);
        },
        formatSearchQuery: function(query) {
            return dojo.string.substitute(
                'ActivityDescription like "${0}%" or ActivityType like "${0}%"',
                [this.escapeSearchQuery(query.toUpperCase())]
            );
        }
    });
});
