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
        '<a href="#{%= $.id %}" target="_view">',
        '{% if ($.icon) { %}',
        '<img src="{%= $.icon %}" alt="icon" class="icon" />',
        '{% } %}',
        '{%= $.titleText %}',
        '</a>',
        '</li>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Home.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'home',
            title: this.titleText,
            selected: false,
            expose: false
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

        //Cache the list, for comparison later.
        this._visibleList = visibleItems;
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

        this.el
            .on('clicklong', function(evt, el, o) {
                var source = Ext.get(el);
                var target;

                if (source.is('a[href="#contact_list"]'))
                {
                    App.getView('AddAccountContact').show({insert: true});
                }
            }, this, { preventDefault: true, stopPropagation: true });

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
        this.renderAvailableViews();
    },       
    beforeTransitionTo: function() {
        Mobile.SalesLogix.Home.superclass.beforeTransitionTo.call(this);
        //if visible home list changes, or if its order changes,
        //refresh the view.

        var visible = App.preferences.home.visible;
        if (this._visibleList.length != visible.length || Ext.encode(this._visibleList) != Ext.encode(visible))
        {
            this.renderAvailableViews();
        }
    }
});
