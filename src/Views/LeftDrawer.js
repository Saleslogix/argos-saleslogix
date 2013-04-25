define('Mobile/SalesLogix/Views/LeftDrawer', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/GroupedList'
], function(
    declare,
    array,
    lang,
    GroupedList
) {

    return declare('Mobile.SalesLogix.Views.LeftDrawer', [GroupedList], {
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
        titleText: 'Main Menu',
        actionsText: 'Quick Actions',
        viewsText: 'Go To',
        settingsText: 'Settings',
        helpText: 'Help',
        logOutText: 'Log Out',
        logOutConfirmText: 'Are you sure you want to log out?',

        //View Properties
        id: 'left_drawer',
        expose: false,
        enableSearch: false,
        customizationSet: 'left_drawer',

        settingsView: 'settings',
        helpView: 'help',
        configurationView: 'configure',
        addAccountContactView: 'add_account_contact',

        logOut: function() {
            var sure = window.confirm(this.logOutConfirmText);
            if (sure) {
                App.logOut();
            }
        },

        navigateToView: function(view) {
            App.snapper.close();
            if (view) {
                view.show();
            }
        },
        addAccountContact: function(params) {
            var view = App.getView(this.addAccountContactView);
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
            var layout = this.layout || [{
                    id: 'actions',
                    children: [{
                        'name': 'AddAccountContactAction',
                        'action': 'addAccountContact',
                        'icon': 'content/images/icons/New_Contact_24x24.png',
                        'title': this.addAccountContactText
                    }, {
                        'name': 'SettingsAction',
                        'action': 'navigateToSettingsView',
                        'icon': 'content/images/icons/settings_24.png',
                        'title': this.settingsText 
                    }, {
                        'name': 'HelpAction',
                        'action': 'navigateToHelpView',
                        'icon': 'content/images/icons/help_24.png',
                        'title': this.helpText
                    }, {
                        'name': 'Logout',
                        'action': 'logOut',
                        'icon': 'content/images/icons/login_24.png',
                        'title': this.logOutText
                    }
                    ]
                }];

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

        _shown: false,

        show: function() {
            if (this.onShow(this) === false || this._shown === true){
                return;
            }

            this.refresh();
            this._shown = true;
        },

        navigateToConfigurationView: function() {
            var view = App.getView(this.configurationView);
            if (view) {
                view.show();
            }
        },
        _onRegistered: function() {
            this.refreshRequired = true;
        }
    });
});

