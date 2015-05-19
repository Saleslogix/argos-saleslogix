/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Owner.List
 *
 * @extends argos.List
 */
define('crm/Views/Owner/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/_base/array',
    'argos/List'
], function (declare, lang, string, array, List) {
    var __class = declare('crm.Views.Owner.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.OwnerDescription %}</h3>'
        ]),
        //Localization
        titleText: 'Owners',
        //View Properties
        id: 'owner_list',
        security: 'Entities/Owner/View',
        queryOrderBy: 'OwnerDescription',
        querySelect: [
            'OwnerDescription',
            'User/Enabled',
            'User/Type',
            'Type'
        ],
        queryWhere: 'Type ne "Department"',
        resourceKind: 'owners',
        formatSearchQuery: function (searchQuery) {
            return string.substitute('upper(OwnerDescription) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        processData: function (items) {
            if (items) {
                items = array.filter(items, function (item) {
                    return this._userEnabled(item) && this._isCorrectType(item);
                }, this);
            }
            this.inherited(arguments);
        },
        _userEnabled: function (item) {
            // If User is null, it is probably a team
            if (item.User === null || item.User.Enabled) {
                return true;
            }
            return false;
        },
        _isCorrectType: function (item) {
            // If user is null, it is probably a team
            if (item.User === null) {
                return true;
            }
            // Filter out WebViewer, Retired, Template and AddOn users like the user list does
            return item.User.Type !== 3 && item.User.Type !== 5 && item.User.Type !== 6 && item.User.Type !== 7;
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Owner.List', __class);
    return __class;
});
