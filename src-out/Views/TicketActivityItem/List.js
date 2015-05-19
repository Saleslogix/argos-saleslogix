/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.TicketActivityItem.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
define('crm/Views/TicketActivityItem/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'crm/Format',
    'argos/List'
], function (declare, lang, string, format, List) {
    var __class = declare('crm.Views.TicketActivityItem.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Product.Name %}</h3>',
            '<h4>{%: $.Product.ActualId %} - {%: crm.Format.currency($.ItemAmount) %}</h4>',
            '<h4>{%: $.ItemDescription %}</h4>'
        ]),
        //Localization
        titleText: 'Ticket Activity Parts',
        //View Properties
        id: 'ticketactivityitem_list',
        detailView: 'ticketactivityitem_detail',
        expose: false,
        querySelect: [
            'Product/Name',
            'Product/ActualId',
            'ItemDescription',
            'ItemAmount'
        ],
        resourceKind: 'ticketActivityItems',
        createToolLayout: function () {
            return this.tools || (this.tools = {
                'tbar': []
            });
        },
        formatSearchQuery: function (searchQuery) {
            return string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.TicketActivityItem.List', __class);
    return __class;
});
