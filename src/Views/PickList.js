/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.PickList
 *
 *
 * @extends Sage.Platform.Mobile.List
 *
 */
define('Mobile/SalesLogix/Views/PickList', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    List
) {

    return declare('Mobile.SalesLogix.Views.PickList', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.text %}</h3>'
        ]),

        //View Properties
        id: 'pick_list',
        expose: false,
        resourceKind: 'picklists',
        resourceProperty: 'items',
        contractName: 'system',

        activateEntry: function(params) {
            if (this.options.keyProperty === 'text' && !this.options.singleSelect) {
                params.key = params.descriptor;
            }

            this.inherited(arguments);
        },
        show: function(options) {
            this.set('title', options && options.title || this.title);
            if (!options.singleSelect) {
                if (options.keyProperty) {
                    this.idProperty = options.keyProperty;
                }

                if (options.textProperty) {
                    this.labelProperty = options.textProperty;
                }
            }

            this.inherited(arguments);
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(text) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

