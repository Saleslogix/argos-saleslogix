/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Groups.List
 *
 * @extends Sage.Platform.Mobile.List
 * @requires Sage.Platform.Mobile.List
 *
 */
define('Mobile/SalesLogix/Views/Groups/List', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/Store/SData'
], function(
    declare,
    array,
    lang,
    List,
    SDataStore
) {

    return declare('Mobile.SalesLogix.Views.Groups.List', [List], {
        id: 'groups_list',
        expose: false,
        enableSearch: false,

        // Localization
        titleText: 'Group List',

        constructor: function() {
            this.tools = { tbar: [] };
        },

        refreshRequiredFor: function(newOptions) {
            // This gets called before setting new options
            var oldOptions = this.options;

            if (oldOptions) {
                if (newOptions) {
                    if (oldOptions.key !== newOptions.key) {
                        this.set('store', null);
                        return true;
                    }
                }

                return false;
            }

            return this.inherited(arguments);
        },

        createStore: function() {
            var groupId, family, layout, entry, options, request, store, select;

            options = this.options;

            if (!options) {
                throw new Error('No options provided to the group list.');
            }

            groupId = options.key;
            entry = options.entry;

            if (!entry) {
                throw new Error('this.options must contain an group entry.');
            }

            family = entry.family.toUpperCase();
            layout = entry.layout;
            select = this.createSelectFromLayout(layout);
            this.setupTemplates(select);

            select.push(family + 'ID');

            // Create a custom request that the store will use to execute the group query
            request = new Sage.SData.Client.SDataNamedQueryRequest(this.getConnection());
            request.setQueryName('execute');
            request.setResourceKind('groups');
            request.setContractName('system');
            request.getUri().setCollectionPredicate("'" + groupId + "'");

            this.keyProperty = family + 'ID';
            this.descriptorProperty = family;

            store = new SDataStore({
                service: App.services.crm,
                request: request,
                select: select,
                idProperty: family + 'ID',
                labelProperty: family,
                applicationName: 'slx',
                scope: this
            });

            return store;
        },
        setupTemplates: function(layout) {
            this.rowTemplate = new Simplate([
                '<li data-action="activateEntry" data-key="{%= $[$$.keyProperty] %}" data-descriptor="{%: $[$$.descriptorProperty] %}">',
                    '<button data-action="selectEntry" class="list-item-selector button">',
                        '<img src="{%= $$.icon || $$.selectIcon %}" class="icon" />',
                    '</button>',
                    '<div class="list-item-content" data-snap-ignore="true">{%! $$.itemTemplate %}</div>',
                '</li>'
            ]);

            template = array.map(layout, function(item) {
                return ["<h4>", item.toUpperCase(), " : {%= $['" + item.toUpperCase() + "'] %}", "</h4>"].join('');
            });

            this.itemTemplate = new Simplate(template);
        },
        createSelectFromLayout: function(layout) {
            var select = [];

            layout = array.filter(layout, function(item) {
                return item.visible;
            });

            select = array.map(layout, function(item) {
                if (item.format === 'PickList Item') {
                    return item.alias + 'TEXT';
                }

                return item.alias;
            });

            return select;
        }
    });
});

