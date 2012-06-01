define('Mobile/SalesLogix/Views/TicketActivity/List', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dojo/query',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    array,
    string,
    domStyle,
    domGeom,
    query,
    format,
    List
) {

    return declare('Mobile.SalesLogix.Views.TicketActivity.List', [List], {
        //Templates
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
            query('.note-text-item', this.contentNode).forEach(function(node) {
                var wrapNode = query('.note-text-wrap', node)[0],
                    moreNode = query('.note-text-more', node)[0];
                if (domGeom.getMarginBox(node).h < domGeom.getMarginBox(wrapNode).h)
                    domStyle.set(moreNode, 'visibility', 'visible');
                else
                    domStyle.set(moreNode, 'visibility', 'hidden');
            });
        },
        processFeed: function() {
            this.inherited(arguments);
            this._onResize();
        },
        postCreate: function() {
            this.inherited(arguments);
            this.subscribe('/app/resize', this._onResize);
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute(
                'ActivityDescription like "${0}%"',
                [this.escapeSearchQuery(searchQuery.toUpperCase())]
            );
        }
    });
});