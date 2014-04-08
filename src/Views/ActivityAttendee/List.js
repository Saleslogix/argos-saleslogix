/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Address.List
 *
 * @extends Sage.Platform.Mobile.List
 *
 * @requires Sage.Platform.Mobile.List
 *
 * @requires Mobile.SalesLogix.Format
 *
 */
define('Mobile/SalesLogix/Views/ActivityAttendee/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/dom-attr',
    'dojo/query',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/List',
    'dojo/NodeList-traverse'
], function(
    declare,
    string,
    domAttr,
    query,
    format,
    List,
    NodeListTraverse
) {

    return declare('Mobile.SalesLogix.Views.ActivityAttendee.List', [List], {
        //Templates
        itemTemplate: new Simplate([
           '<h3 ><strong>{%: $.Name %} </strong></h4>',
            '{% if ($.IsPrimary) { %}',
                 '<span class="" style="float:left;padding:2px">',
                    '<img src="content/images/icons/IsPrimary_24x24.png" alt="{%= $$.IsPrimaryText %}" />',
                '</span>',
             '{% } %}',
              '<h3>{%: $.PhoneNumber %}</h4>',
              '<h3>{%: $.Email %}</h4>',
        ]),

        //Localization
        titleText: 'Attendees',

        //View Properties
        detailView: null,
        icon: 'content/images/icons/Attendee_24.png',
        id: 'activity_attendee_list',
        security: null, //'Entities/Attendee/View',
        insertSecurity: null,//'Entities/Attendee/Add',
        insertView: 'activity_attendee_edit',
        resourceKind: 'activityAttendees',
        contractName: 'dynamic',
        querySelect: ['EntityType', 'ModifyDate', 'EntityId', 'IsPrimary', 'IsAttendee', 'RoleName', 'Name', 'AccountName', 'PhoneNumber', 'Email', 'TimeZone'],
        queryOrderBy: 'IsPrimary desc, Name asc',
        allowSelection: true,
        enableActions: false,

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(Name like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        // Disable Add/Insert on toolbar
        createToolLayout: function() {
            return this.tools || (this.tools = {
                tbar: []
            });
        },
        
    });
});

