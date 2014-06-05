/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.LeftDrawer
 *
 *
 * @extends Sage.Platform.Mobile.GroupedList
 *
 */
define('Mobile/SalesLogix/Views/LeftDrawer', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/store/Memory',
    'Mobile/SalesLogix/SpeedSearchWidget',
    'Sage/Platform/Mobile/GroupedList'
], function(
    declare,
    array,
    lang,
    Memory,
    SpeedSearchWidget,
    GroupedList
) {

    return declare('Mobile.SalesLogix.Views.LeftDrawer', [GroupedList], {
        //Templates
        cls: ' contextualContent',
        rowTemplate: new Simplate([
            '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
            '{% if ($$._hasIcon($)) { %}',
                '<div class="list-item-static-selector">',
                    '{% if ($.iconTemplate) { %}',
                        '{%! $.iconTemplate %}',
                    '{% } else if ($.cls) { %}',
                        '<div class="{%: $.cls %}"></div>',
                    '{% } else if ($.icon) { %}',
                        '<img src="{%: $.icon %}" alt="icon" class="icon" />',
                    '{% } %}',
                '</div>',
            '{% } %}',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        _hasIcon: function(entry) {
            return entry.iconTemplate || entry.cls || entry.icon;
        },
        itemTemplate: new Simplate([
            '<h3>{%: $.title %}</h3>'
        ]),

        //Localization
        configureText: 'Configure Menu',
        addAccountContactText: 'Add Account/Contact',
        titleText: 'Main Menu',
        actionsText: 'Quick Actions',
        viewsText: 'Go To',
        footerText: 'Other',
        settingsText: 'Settings',
        helpText: 'Help',
        logOutText: 'Log Out',
        logOutConfirmText: 'Are you sure you want to log out?',

        //View Properties
        id: 'left_drawer',
        expose: false,
        enableSearch: true,
        searchWidgetClass: SpeedSearchWidget,
        customizationSet: 'left_drawer',

        settingsView: 'settings',
        helpView: 'help',
        configurationView: 'configure',
        addAccountContactView: 'add_account_contact',
        searchView: 'speedsearch_list',

        logOut: function() {
            var sure = window.confirm(this.logOutConfirmText);
            if (sure) {
                App.logOut();
            }
        },
        loadAndNavigateToView: function (params) {
            var view = App.getView(params && params.view);
            this.navigateToView(view);
        },
        navigateToView: function(view) {
            App.snapper.close();
            if (view) {
                view.show();
            }
        },
        addAccountContact: function(params) {
            App.snapper.close();
            var view = App.getView('add_account_contact');
            if (view) {
                view.show({insert: true});
            }
        },
        navigateToConfigurationView: function() {
            var view = App.getView(this.configurationView);
            this.navigateToView(view);
        },
        navigateToSettingsView: function() {
            var view = App.getView(this.settingsView);
            this.navigateToView(view);
        },
        navigateToHelpView: function() {
            var view = App.getView(this.helpView);
            this.navigateToView(view);
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
            var footerItems = [
                'ConfigureMenu',
                'SettingsAction',
                'HelpAction',
                'Logout'
            ];

            if (entry.view) {
                return {
                    tag: 'view',
                    title: this.viewsText
                };
            }

            if (array.indexOf(footerItems, entry.name) >= 0) {
                return {
                    tag: 'footer',
                    title: this.footerText
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
        createLayout: function() {
            if (this.layout) {
                return this.layout;
            }

            var quickActions, goTo, footer, layout, configured;
            layout = [];

            quickActions = {
                id: 'actions',
                children: [
                    {
                        'name': 'AddAccountContactAction',
                        'action': 'addAccountContact',
                        //'cls': 'fa fa-plus-square-o',
                        'title': this.addAccountContactText
                    }
                ]
            };

            layout.push(quickActions);

            goTo = {
                id: 'views',
                children: []
            };

            configured = lang.getObject('preferences.home.visible', false, window.App);
            for (var i = 0; i < configured.length; i++) {
                var view = App.getView(configured[i]);
                if (view) {
                    goTo.children.push({
                        'action': 'loadAndNavigateToView',
                        'view': view.id,
                        //'icon': view.icon,
                        //'cls': view.iconClass,
                        //'iconTemplate': view.iconTemplate,
                        'title': view.titleText,
                        'security': view.getSecurity()
                    });
                }
            }

            layout.push(goTo);

            footer = {
                id: 'footer',
                children: [
                    {
                        'name': 'ConfigureMenu',
                        'action': 'navigateToConfigurationView',
                        //'cls': 'fa fa-wrench fa-lg',
                        'title': this.configureText
                    }, {
                        'name': 'SettingsAction',
                        'action': 'navigateToSettingsView',
                        //'cls': 'fa fa-cog fa-lg',
                        'title': this.settingsText
                    }, {
                        'name': 'HelpAction',
                        'action': 'navigateToHelpView',
                        //'cls': 'fa fa-question fa-lg',
                        'title': this.helpText
                    }, {
                        'name': 'Logout',
                        'action': 'logOut',
                        //'cls': 'fa fa-sign-out fa-lg',
                        'title': this.logOutText
                    }
                ]
            };

            layout.push(footer);

            return layout;
        },
        createStore: function() {
            var layout = this._createCustomizedLayout(this.createLayout()),
                list = [],
                store,
                i,
                section,
                j,
                row,
                total = 0;

            for (i = 0; i < layout.length; i++) {
                section = layout[i].children;

                for (j = 0; j < section.length; j++) {
                    total = total + 1;
                    row = section[j];
                    row.$key = total;

                    if (row['security'] && !App.hasAccessTo(row['security'])) {
                        continue;
                    }
                    if (typeof this.query !== 'function' || this.query(row)) {
                        list.push(row);
                    }
                }
            }

            store = new Memory({data: list});
            store.idProperty = '$key';
            return store;
        },
        /**
         * Override the List refresh to also clear the view (something the beforeTransitionTo handles, but we are not using)
         */
        refresh: function() {
            this.clear();
            this.requestData();
        },
        show: function() {
            if (this.onShow(this) === false){
                return;
            }

            this.refresh();
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
        },
        _onRegistered: function() {
            this.refreshRequired = true;
        },
        _onSearchExpression: function(expression, widget) {
            var view, current;
            view = App.getView(this.searchView);
            current = App.getPrimaryActiveView();

            if (view) {
                // If the speedsearch list is not our current view, show it first
                if (view.id !== current.id) {
                    view.show({
                        query: expression
                    });
                }

                // Set the search term on the list and call search.
                // This will keep the search terms on each widget in sync.
                setTimeout(function() {
                    view.setSearchTerm(expression);
                    if (current && current.id === view.id) {
                        view.search();
                    }
                }, 10);
            }

            App.snapper.close();
        }
    });
});

