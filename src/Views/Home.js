/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Home', [
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

    return declare('Mobile.SalesLogix.Views.Home', [GroupedList], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
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

        //Localization
        configureText: 'Configure',
        addAccountContactText: 'Add Account/Contact',
        titleText: 'Home',
        actionsText: 'Quick Actions',
        viewsText: 'Go To',

        //View Properties
        id: 'home',
        expose: false,
        enableSearch: true,
        searchWidgetClass: SpeedSearchWidget,
        customizationSet: 'home',
        configurationView: 'configure',
        addAccountContactView: 'add_account_contact',
        searchView: 'speedsearch_list',

        navigateToView: function(params) {
            var view = App.getView(params && params.view);
            if (view) {
                view.show();
            }
        },
        addAccountContact: function(params) {
            var view = App.getView(this.addAccountContactView);
            if (view) {
                view.show({
                    insert: true
                });
            }
        },
        formatSearchQuery: function(searchQuery) {
            var expression = new RegExp(searchQuery, 'i');

            return function(entry) {
                return expression.test(entry.title);
            };
        },
        hasMoreData: function() {
            return false;
        },
        getGroupForEntry: function(entry) {
            if (entry.view) {
                return {
                    tag: 'view',
                    title: this.viewsText
                };
            }

            return {
                tag: 'action',
                title: this.actionsText
            };
        },
        init: function() {
            this.inherited(arguments);

            this.connect(App, 'onRegistered', this._onRegistered);
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                tbar: [{
                    id: 'configure',
                    action: 'navigateToConfigurationView'
                }]
            });
        },
        createLayout: function() {
            // don't need to cache as it is only re-rendered when there is a change
            var configured = lang.getObject('preferences.home.visible', false, App) || [],
                layout = [{
                    id: 'actions',
                    children: [{
                        'name': 'AddAccountContactAction',
                        'action': 'addAccountContact',
                        'icon': 'content/images/icons/New_Contact_24x24.png',
                        'title': this.addAccountContactText
                    }]
                }];

            var visible = {
                id: 'views',
                children: []
            };

            for (var i = 0; i < configured.length; i++) {
                var view = App.getView(configured[i]);
                if (view) {
                    visible.children.push({
                        'action': 'navigateToView',
                        'view': view.id,
                        'icon': view.icon,
                        'title': view.titleText,
                        'security': view.getSecurity()
                    });
                }
            }

            layout.push(visible);

            return layout;
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

        _onSearchExpression: function(expression, widget) {
            var view = App.getView(this.searchView);

            if (view) {
                view.show({
                    query: expression
                });
            }
        },

        navigateToConfigurationView: function() {
            var view = App.getView(this.configurationView);
            if (view) {
                view.show();
            }
        },
        _onRegistered: function() {
            this.refreshRequired = true;
        },
        refreshRequiredFor: function(options) {
            var visible = lang.getObject('preferences.home.visible', false, App) || [],
                shown = this.feed && this.feed['$resources'];

            if (!visible || !shown || (visible.length != shown.length)) {
                return true;
            }

            for (var i = 0; i < visible.length; i++) {
                if (visible[i] != shown[i]['$key']) {
                    return true;
                }
            }

            return this.inherited(arguments);
        }
    });
});

