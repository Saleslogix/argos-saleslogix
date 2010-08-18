/// <reference path="../../../ext/ext-core-debug.js"/>
/// <reference path="../../../reui/reui.js"/>
/// <reference path="../../../platform/View.js"/>
/// <reference path="Application.js"/>

Ext.namespace("Mobile.SalesLogix");

/// this is a very simple home view.
Mobile.SalesLogix.Home = Ext.extend(Sage.Platform.Mobile.View, {
    titleText: 'Home',
    configureText: 'Configure',
    itemTemplate: new Simplate([
        '<li>',
        '<a href="#{%= id %}" target="_view">',
        '{% if ($["icon"]) { %}',
        '<img src="{%= $["icon"] %}" alt="icon" class="icon" />',
        '{% } %}',
        '{%= title %}',
        '</a>',
        '</li>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Home.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'home',
            title: this.titleText,
            selected: true
        });
        var homeViewScope = this;
        Ext.apply(this, {
            tools: {
                tbar: [{
                    name: 'configure',
                    title: this.configureText,
                    cls: 'configure button',
                    fn: this.navigateToConfigure,
                    scope: homeViewScope
                }]
            }
        });

    },
    renderAvailableViews: function() {
        var visibleItems = App.preferences.home.visible,
            views = [], v;

        for (var i = 0, len = visibleItems.length; i < len; i++)
        {
            v = App.getView(visibleItems[i]);
            views.push(this.itemTemplate.apply(v));
        }
        
        this.el.select('li').remove();
        Ext.DomHelper.append(this.el, views.join(''));
    },
    show : function() {
        Mobile.SalesLogix.Home.superclass.show.call(this);
        
        if (this.refreshRequired === true)
            this.renderAvailableViews();
    },    
    refreshRequiredFor: function() {        
        //If Visible home list changes, or if its order changes, 
        //refresh the view.
        
        //For the first time, there will be no visible list cache,
        //So refresh it. 
        if (!this._visibleList) {
            return true;
        }
        
        var visibleList = App.preferences.home.visible;
        if (this._visibleList.length != visibleList.length &&
            Ext.encode(this._visibleList) != Ext.encode(visibleList))
        {
            return true;
        }
        
        return false;
    },
    init: function() {
        Mobile.SalesLogix.Home.superclass.init.call(this);

        this.el
            .on('click', function(evt, el, o) {
                var source = Ext.get(el);
                var target;

                if (source.is('a[target="_view"]') || (target = source.up('a[target="_view"]')))
                    this.navigateToView(target || source, evt);

            }, this, { preventDefault: true, stopPropagation: true });

        this.displayTools();
        App.on('registered', this.viewRegistered, this);
    },
    navigateToView: function(el) {
        if (el)
        {
            var id = el.dom.hash.substring(1);
            var view = App.getView(id);
            if (view)
                view.show();
        }
    },
    navigateToConfigure: function() {
        App.getView('configure').show();
    },
    viewRegistered: function(view) {
        Ext.DomHelper.append(this.el, this.itemTemplate.apply(view));
    },
    load: function() {
        Mobile.SalesLogix.Home.superclass.load.call(this);

        if (App.isOnline() || !App.enableCaching)
        {
            var user = App.getService().getUserName();
            if (!user || !user.length)
            {
                var view = App.getView('login_dialog');
                if (view)
                    view.show();
            }
                //ReUI.show("login_dialog");
        }

    },
    displayTools: function() {
        if (this.tools) {
            for (var n in this.tools)
                if (App.bars[n]) {
                    App.bars[n].clear();
                    App.bars[n].display(this.tools[n]);
                }
        }
    },
    transitionTo: function() {
        Mobile.SalesLogix.Home.superclass.transitionTo.call(this);
        this.displayTools();
    }
});
