/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Home', ['Sage/Platform/Mobile/GroupedList'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Home', [Sage.Platform.Mobile.GroupedList], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
            '<div class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<h3>',
            '{% if ($.icon) { %}',
            '<img src="{%: $.icon %}" alt="icon" class="icon" />',
            '{% } %}',
            '<span>{%: $.title %}</span>',
            '</h3>'
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
        enableSearch: false,
        customizationSet: 'home',
        configurationView: 'configure',
        addAccountContactView: 'add_account_contact',

        navigateToView: function(params) {
            var view = App.getView(params && params.view);
            if (view)
                view.show();
        },
        addAccountContact: function(params) {
            var view = App.getView(this.addAccountContactView);
            if (view)
                view.show({
                    insert: true
                });
        },
        formatSearchQuery: function(query) {
            var expression = new RegExp(query, 'i');

            return function(entry) {
                return expression.test(entry.title);
            };
        },
        hasMoreData: function() {
            return false;
        },
        getGroupForEntry: function(entry) {
            if (entry.view)
                return {
                    tag: 'view',
                    title: this.viewsText
                };

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
            var configured = dojo.getObject('preferences.home.visible', false, App) || [],
                layout = [{
                    id: 'actions',
                    as: [{
                        'action': 'addAccountContact',
                        'icon': 'content/images/icons/New_Contact_24x24.png',
                        'title': this.addAccountContactText
                    }]
                }];

            var visible = {
                id: 'views',
                as: []
            };

            // exclude-able items not allowed for user's role
            var omit = [];
            for (var view in App.views) {
                if (view.match(/_detail$/)) {
                    if (App.views[view].security && !App.hasSecurity(App.views[view].security))
                        omit.push(view.replace('_detail', '_list'));
                }
            }

            for (var i = 0; i < configured.length; i++)
            {
                var view = App.getView(configured[i]);
                if (view && (-1 == omit.indexOf(view.id)))
                {
                    visible.as.push({
                        'action': 'navigateToView',
                        'view': view.id,
                        'icon': view.icon,
                        'title': view.titleText
                    });
                }
            }

            layout.push(visible);

            return layout;
        },
        requestData: function() {
            var layout = this._createCustomizedLayout(this.createLayout()),
                list = [];

            dojo.forEach(layout, function(section) {
                dojo.forEach(section['as'], function(row) {
                    if (typeof this.query !== 'function' || this.query(entry)) list.push(row);
                }, this);
            }, this);

            this.processFeed({'$resources': list});
        },
        navigateToConfigurationView: function() {
            var view = App.getView(this.configurationView);
            if (view)
                view.show();
        },
        _onRegistered: function() {
            this.refreshRequired = true;
        },
        refreshRequiredFor: function(options) {
            var visible = App.preferences && App.preferences.home && App.preferences.home.visible,
                shown = this.feed && this.feed['$resources'];

            if (!visible || !shown || (visible.length != shown.length))
                return true;

            for (var i = 0; i < visible.length; i++)
                if (visible[i] != shown[i]['$key']) return true;

            return this.inherited(arguments);
        }
    });
});