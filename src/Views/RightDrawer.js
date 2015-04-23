/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.RightDrawer
 *
 *
 * @extends argos.GroupedList
 *
 */
define('crm/Views/RightDrawer', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/store/Memory',
    'argos/GroupedList'
], function(
    declare,
    array,
    lang,
    Memory,
    GroupedList
) {

    var __class = declare('crm.Views.RightDrawer', [GroupedList],  {
        //Templates
        cls: ' contextualContent',
        rowTemplate: new Simplate([
            '<li class="{%: $.cls %}" data-action="{%= $.action %}"',
            '{% if($.dataProps) { %}',
                '{% for(var prop in $.dataProps) { %}',
                    ' data-{%= prop %}="{%= $.dataProps[prop] %}"',
                '{% } %}',
            '{% } %}',
            '>',
            '{% if ($$._hasIcon($)) { %}',
                '<div class="list-item-static-selector {%: $.iconCls %} ">',
                    '{% if ($.icon) { %}',
                        '<img src="{%: $.icon %}" alt="icon" class="icon" />',
                    '{% } %}',
                '</div>',
            '{% } %}',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        _hasIcon: function(entry) {
            return entry.iconTemplate || entry.cls || entry.icon || entry.iconCls;
        },
        itemTemplate: new Simplate([
            '<h3>{%: $.title %}</h3>'
        ]),

        //View Properties
        id: 'right_drawer',
        expose: false,
        enableSearch: false,
        customizationSet: 'right_drawer',
        dataProps: null,

        hasMoreData: function() {
            return false;
        },
        getGroupForEntry: function() {
        },
        init: function() {
            this.inherited(arguments);
            this.connect(App, 'onRegistered', this._onRegistered);
        },
        setLayout: function(layout) {
            this.layout = layout;
        },
        createLayout: function() {
            return this.layout || [];
        },
        createStore: function() {
            var layout = this._createCustomizedLayout(this.createLayout()),
                list = [],
                store,
                section,
                row,
                i,
                j;

            for (i = 0; i < layout.length; i++) {
                section = layout[i].children;

                for (j = 0; j < section.length; j++) {
                    row = section[j];

                    if (row['security'] && !App.hasAccessTo(row['security'])) {
                        continue;
                    }
                    if (typeof this.query !== 'function' || this.query(row)) {
                        list.push(row);
                    }
                }
            }

            store = new Memory({data: list});
            return store;
        },
        clear: function() {
            this.inherited(arguments);
            this.store = null;
        },
        /**
         * Override the List refresh to also clear the view (something the beforeTransitionTo handles, but we are not using)
         */
        refresh: function() {
            this.clear();
            this.requestData();
        },
        show: function() {
            if (this.onShow(this) === false) {
                return;
            }

            this.refresh();
        },
        _onRegistered: function() {
            this.refreshRequired = true;
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.RightDrawer', __class);
    return __class;
});

