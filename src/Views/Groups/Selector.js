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
        enableSearch: false,
        icon: 'content/images/icons/database_24.png',

        listViewId: 'groups_list',
        family: '',

        //Localization
        titleText: 'Groups',
        initialText: 'Select a family using the right context menu.',

        emptyMessageId: 'NIL',

        itemTemplate: new Simplate([
            '<h3>{%: $[$$.labelProperty] %}</h3>'
        ]),

        constructor: function() {
            this.tools = { tbar: [] };
        },

        activateEntry: function(params) {
            var key, descriptor, entry, view;

            key = params.key;
            if (key === this.emptyMessageId) {
                return;
            }

            if (this._selectionModel && this.isNavigationDisabled()) {
                this._selectionModel.toggle(params.key, this.entries[params.key] || params.descriptor, params.$source);
                if (this.options.singleSelect && this.options.singleSelectAction) {
                    this.invokeSingleSelectAction();
                }
            } else {
                descriptor = params.descriptor;
                entry = this.entries[key];
                view = App.getView(this.listViewId);

                if (view) {
                    view.show({ key: key, descriptor: descriptor, entry: entry});
                }
            }
        },

        createStore: function() {
            return this.createGroupStore(this.family) || new MemoryStore({
                data: [
                    { '$key': this.emptyMessageId, '$descriptor': this.initialText }
                ]
            });
        },

        createGroupStore: function(entityName) {
            var store = null;

            if (typeof entityName === 'string' && entityName !== '') {
                store = new SDataStore({
                    service: App.services.crm,
                    resourceKind: 'groups',
                    contractName: 'system',
                    where: "upper(family) eq '" + entityName.toUpperCase() + "'",
                    include: ['layout', 'tableAliases'],
                    idProperty: '$key',
                    applicationName: 'slx',
                    scope: this
                });
            }

            return store;
        }
    });
});

