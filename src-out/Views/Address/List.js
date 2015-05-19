/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Address.List
 *
 * @extends argos.List
 *
 * @requires argos.List
 *
 * @requires crm.Format
 *
 */
define('crm/Views/Address/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/dom-attr',
    'dojo/query',
    '../../Format',
    'argos/List'
], function (declare, lang, string, domAttr, query, format, List) {
    var __class = declare('crm.Views.Address.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.$descriptor %}</h3>',
            '<h4>{%= crm.Format.address($, true) %}</h4>'
        ]),
        //Localization
        titleText: 'Addresses',
        //View Properties
        detailView: null,
        id: 'address_list',
        security: null,
        insertSecurity: 'Entities/Address/Add',
        insertView: 'address_edit',
        resourceKind: 'addresses',
        allowSelection: true,
        enableActions: true,
        formatSearchQuery: function (searchQuery) {
            return string.substitute('(Description like "${0}%" or City like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        // Disable Add/Insert on toolbar
        createToolLayout: function () {
            return this.tools || (this.tools = {
                tbar: []
            });
        },
        selectEntry: function (params) {
            var row = query(params.$source).closest('[data-key]')[0], key = row ? domAttr.get(row, 'data-key') : false;
            if (this._selectionModel && key) {
                App.showMapForAddress(format.address(this.entries[key], true, ' '));
            }
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Address.List', __class);
    return __class;
});
