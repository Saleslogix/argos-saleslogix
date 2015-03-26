/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.ProductProgram.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
define('crm/Views/ProductProgram/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'crm/Format',
    'argos/List'
], function(
    declare,
    lang,
    string,
    format,
    List
) {

    var __class = declare('crm.Views.ProductProgram.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Program %}</h3>',
            '<h4>',
            '{%: $.Price %}',
            '</h4>'
        ]),

        //Localization
        titleText: 'Product Programs',

        //View Properties
        id: 'productprogram_list',
        security: 'Entities/ProductProgram/View',
        queryOrderBy: 'Program',
        querySelect: [
            'DefaultProgram',
            'Program',
            'Price'
        ],
        resourceKind: 'productPrograms',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(upper(Program) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.ProductProgram.List', __class);
    return __class;
});

