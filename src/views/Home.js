/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Home = Ext.extend(Sage.Platform.Mobile.GroupedList, {
    //Templates
    itemTemplate: new Simplate([
        '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
        '<div class="list-item-selector"></div>',
        '{%! $$.contentTemplate %}',
        '</li>'
    ]),
    contentTemplate: new Simplate([
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
    hideSearch: true,
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
    requestData: function() {
        var visible = App.preferences && App.preferences.home && App.preferences.home.visible,
            list = [],
            view,
            entry;

        list.push({
            'action': 'addAccountContact',
            'icon': 'content/images/icons/New_Contact_24x24.png',
            'title': this.addAccountContactText
        });

        for (var i = 0; i < visible.length; i++)
        {
            view = App.getView(visible[i]);

            if (view)
            {
                entry = {
                    'action': 'navigateToView',
                    'view': view.id,
                    'icon': view.icon,
                    'title': view.titleText
                };

                if (typeof this.query !== 'function' || this.query(entry)) list.push(entry);
            }
        }

        this.processFeed({'$resources': list});
    },
    init: function() {
        Mobile.SalesLogix.Home.superclass.init.apply(this, arguments);        

        App.on('registered', this.onRegistered, this);

        this.tools.tbar = [{
            id: 'configure',
            action: 'navigateToConfigurationView'
        }];
    },
    navigateToConfigurationView: function() {
        var view = App.getView(this.configurationView);
        if (view)
            view.show();
    },
    onRegistered: function() {
        this.refreshRequired = true;
    },    
    refreshRequiredFor: function(options) {
        var visible = App.preferences && App.preferences.home && App.preferences.home.visible,
            shown = this.feed && this.feed['$resources'];

        if (!visible || !shown || (visible.length != shown.length))
            return true;

        for (var i = 0; i < visible.length; i++)
            if (visible[i] != shown[i]['$key']) return true;

        return Mobile.SalesLogix.Home.superclass.refreshRequiredFor.apply(this, arguments);
    }
});