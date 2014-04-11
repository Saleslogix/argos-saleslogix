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
    'dojo/store/Memory',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/Store/SData',
    './_RightDrawerGroupsMixin'
], function(
    declare,
    MemoryStore,
    List,
    SDataStore,
    _RightDrawerGroupsMixin
) {

    return declare('Mobile.SalesLogix.Views.Groups.Selector', [List, _RightDrawerGroupsMixin], {
        id: 'groups_selector',
        expose: true,

        listViewId: 'groups_list',

        //Localization
        titleText: 'Group Selector',

        itemTemplate: new Simplate([
            '<h3>{%: $[$$.labelProperty] %}</h3>'
        ]),

        activateEntry: function(params) {
            var key, descriptor, entry, view;

            key = params.key;
            descriptor = params.descriptor;
            entry = this.entries[key];
            view = App.getView(this.listViewId);

            if (view) {
                view.show({ key: key, descriptor: descriptor, entry: entry});
            }
        },

        createStore: function() {
            // Return an empty store initially.
            // The _RightDrawerGroupsMixin will set the store when the user clicks a family.
            return new MemoryStore();
        },

        createGroupStore: function(entityName) {
            if (typeof entityName !== 'string') {
                return null;
            }

            var store = new SDataStore({
                service: App.services.crm,
                resourceKind: 'groups',
                contractName: 'system',
                where: "upper(family) eq '" + entityName.toUpperCase() + "'",
                include: ['layout', 'tableAliases'],
                idProperty: '$key',
                applicationName: 'slx',
                scope: this
            });

            return store;
        }
    });
});

