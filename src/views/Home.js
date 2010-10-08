/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Home = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<h3>',
        '{% if ($.icon) { %}',
        '<img src="{%: $.icon %}" alt="icon" class="icon" />',
        '{% } %}',
        '{%: $.title %}',
        '</h3>'
    ]),
    id: 'home',
    expose: false,
    titleText: 'Home',
    configureText: 'Configure',        
    activateEntry: function(params) {
        if (params.key)
        {
            var view = App.getView(params.key);
            if (view)
                view.show();
        }
    },
    hasMoreData: function() {
        return false;
    },
    requestData: function() {
        var visible = App.preferences && App.preferences.home && App.preferences.home.visible,
            list = [],
            view;

        for (var i = 0; i < visible.length; i++)
        {
            view = App.getView(visible[i]);

            if (view) list.push({
                '$key': view.id,
                'icon': view.icon,
                'title': view.titleText
            });
        }

        this.processFeed({'$resources': list});      
    },
    init: function() {
        Mobile.SalesLogix.Home.superclass.init.apply(this, arguments);        

        App.on('registered', this.onRegistered, this);

        this.tools.tbar = [{
            name: 'configure',
            title: this.configureText,
            cls: 'button',
            fn: this.navigateToConfigurationView,
            scope: this
        }];
    },
    navigateToConfigurationView: function() {
        App.getView('configure').show();
    },
    onRegistered: function() {
        this.refreshRequired = true;
    },    
    refreshRequiredFor: function(options) {
        var visible = App.preferences && App.preferences.home && App.preferences.home.visible,
            shown = this.feed && this.feed['$resources'];
        
        if (!visible || !shown || visible.length != shown.length) return true;

        return Mobile.SalesLogix.Home.superclass.refreshRequiredFor.apply(this, arguments);
    }
});
