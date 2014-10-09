/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.User.CalendarAccessList
 *
 * @extends Sage.Platform.Mobile.List
 */
define('Mobile/SalesLogix/Views/User/CalendarAccessList', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    List
) {

    return declare('Mobile.SalesLogix.Views.User.CalendarAccessList', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Name %}</h3>',
            '<h4>{%: $.SubType %}</h4>'
        ]),

        //Localization
        titleText: 'Activity Resources',

        //View Properties
        id: 'calendar_access_list',
        queryOrderBy: 'Name',

        queryWhere: function() {
            return "AllowAdd AND (AccessId eq 'EVERYONE' or AccessId eq '" + App.context.user.$key + "') AND Type eq 'User'";
        },
        querySelect: [
            'Name',
            'SubType',
            'AccessId',
            'ResourceId'
        ],
        resourceKind: 'activityresourceviews',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Name) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

