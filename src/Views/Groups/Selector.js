/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Groups.Selector
 *
 * @extends Sage.Platform.Mobile.List
 * @requires Sage.Platform.Mobile.List
 *
 */
define('Mobile/SalesLogix/Views/Groups/Selector', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/Store/SData'
], function(
    declare,
    string,
    List,
    SDataStore
) {

    return declare('Mobile.SalesLogix.Views.Groups.Selector', [List], {
        id: 'groups_configure',
        expose: false,
        enableSearch: true,
        icon: '',

        listViewId: 'groups_list',
        family: '',

        //Localization
        titleText: 'Groups',

        itemTemplate: new Simplate([
            '<h3>{%: $[$$.labelProperty] %}</h3>'
        ]),

        constructor: function() {
            this.tools = { tbar: [] };
        },

        activateEntry: function(params) {
            var key, descriptor, entry, view;

            key = params.key;

            if (this._selectionModel && this.isNavigationDisabled()) {
                this._selectionModel.toggle(params.key, this.entries[params.key] || params.descriptor, params.$source);
                if (this.options.singleSelect && this.options.singleSelectAction) {
                    this.invokeSingleSelectAction();
                }
            }
        },

        createStore: function() {
            if (!this.family) {
                throw new Error('The groups selector must have a family set.');
            }

            return this.createGroupStore(this.family);
        },

        createGroupStore: function(entityName) {
            var store = null;

            if (typeof entityName === 'string' && entityName !== '') {
                store = new SDataStore({
                    service: App.services.crm,
                    resourceKind: 'groups',
                    contractName: 'system',
                    where: "upper(family) eq '" + entityName.toUpperCase() + "'",
                    orderBy: "name asc",
                    include: ['layout', 'tableAliases'],
                    idProperty: '$key',
                    applicationName: 'slx',
                    scope: this
                });
            }

            return store;
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('name like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

