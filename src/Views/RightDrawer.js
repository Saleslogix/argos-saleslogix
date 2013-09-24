/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/RightDrawer', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'Mobile/SalesLogix/SpeedSearchWidget',
    'Sage/Platform/Mobile/GroupedList'
], function(
    declare,
    array,
    lang,
    SpeedSearchWidget,
    GroupedList
) {

    return declare('Mobile.SalesLogix.Views.RightDrawer', [GroupedList],  {
        //Templates
        cls: ' contextualContent',
        rowTemplate: new Simplate([
            '<li data-action="{%= $.action %}"',
            '{% if($.dataProps) { %}',
                '{% for(var prop in $.dataProps) { %}',
                    ' data-{%= prop %}="{%= $.dataProps[prop] %}"',
                '{% } %}',
            '{% } %}',
            '>',
            '<div class="list-item-static-selector">',
                '{% if ($.icon) { %}',
                '<img src="{%: $.icon %}" alt="icon" class="icon" />',
                '{% } %}',
            '</div>',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
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
        getGroupForEntry: function(entry) {
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
        requestData: function() {
            var layout = this._createCustomizedLayout(this.createLayout()),
                list = [];

            for (var i = 0; i < layout.length; i++) {
                var section = layout[i].children;

                for (var j = 0; j < section.length; j++) {
                    var row = section[j];

                    if (row['security'] && !App.hasAccessTo(row['security'])) {
                        continue;
                    }
                    if (typeof this.query !== 'function' || this.query(row)) {
                        list.push(row);
                    }
                }
            }

            this.processFeed({'$resources': list});
        },
        /**
         * Override the List refresh to also clear the view (something the beforeTransitionTo handles, but we are not using)
         */
        refresh: function() {
            this.clear();
            this.requestData();
        },
        /**
         * Override the List show to not use RUI (this view will always be on the screen, just hidden behind the main content)
         */
        show: function() {
            if (this.onShow(this) === false){
                return;
            }

            this.refresh();
        },
        _onRegistered: function() {
            this.refreshRequired = true;
        }
    });
});

