import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import string from 'dojo/string';
import domStyle from 'dojo/dom-style';
import domGeom from 'dojo/dom-geometry';
import query from 'dojo/query';
import topic from 'dojo/topic';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import List from 'argos/List';

/**
 * @class crm.Views.TicketActivity.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
*/
var __class = declare('crm.Views.TicketActivity.List', [List], {
    //Templates
    itemTemplate: new Simplate([
        '<h3>{%: $.Ticket.TicketNumber %}</h3>',
        '<h4>{%: crm.Format.date($.AssignedDate, $$.startDateFormatText) %}</h4>',
        '<div class="note-text-item">',
        '<div class="note-text-wrap">',
        '{%: $.ActivityDescription %}',
        '</div>',
        '<div class="note-text-more"></div>',
        '</div>'
    ]),

    //Localization
    titleText: 'Ticket Activities',
    startDateFormatText: 'MM/DD/YYYY h:mm A',

    //View Properties
    id: 'ticketactivity_list',
    security: 'Entities/TicketActivity/View',
    expose: false,
    detailView: 'ticketactivity_detail',
    insertView: 'ticketactivity_edit',
    queryOrderBy: 'AssignedDate asc',
    querySelect: [
        'ActivityDescription',
        'ActivityTypeCode',
        'AssignedDate',
        'CompletedDate',
        'ElapsedUnits',
        'FollowUp',
        'PublicAccessCode',
        'Rate',
        'RateTypeDescription/Amount',
        'RateTypeDescription/RateTypeCode',
        'RateTypeDescription/TypeDescription',
        'TotalFee',
        'TotalLabor',
        'TotalParts',
        'Units',
        'Ticket/Account/AccountName',
        'Ticket/TicketNumber',
        'Ticket/Contact/Name',
        'User/UserInfo/LastName',
        'User/UserInfo/FirstName'
    ],
    resourceKind: 'ticketActivities',

    _onResize: function() {
        query('.note-text-item', this.contentNode).forEach(function(node) {
            var wrapNode = query('.note-text-wrap', node)[0],
                moreNode = query('.note-text-more', node)[0];
            if (domGeom.getMarginBox(node).h < domGeom.getMarginBox(wrapNode).h) {
                domStyle.set(moreNode, 'visibility', 'visible');
            } else {
                domStyle.set(moreNode, 'visibility', 'hidden');
            }
        });
    },
    processData: function() {
        this.inherited(arguments);
        this._onResize();
    },
    postCreate: function() {
        this.inherited(arguments);
        this.own(topic.subscribe('/app/resize', lang.hitch(this, this._onResize)));
    },
    formatSearchQuery: function(searchQuery) {
        return string.substitute(
            'ActivityDescription like "${0}%"',
            [this.escapeSearchQuery(searchQuery.toUpperCase())]
        );
    }
});

lang.setObject('Mobile.SalesLogix.Views.TicketActivity.List', __class);
export default __class;
