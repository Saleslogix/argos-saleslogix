/// <reference path="../../../ext/ext-core-debug.js"/>
/// <reference path="../../../reui/reui.js"/>
/// <reference path="../../../platform/View.js"/>
/// <reference path="Application.js"/>

Ext.namespace("Mobile.SalesLogix");

/// this is a simple configure screen for Home View.
Mobile.SalesLogix.Configure = Ext.extend(Sage.Platform.Mobile.View, {
    titleText: 'Configure',
    savePrefs: 'Save',
    itemTemplate: new Simplate([
        '<li>',
        '<input type="checkbox" value="{%= $["id"] %}" class="list-selector" />',
        '<span class="moveup"></span>',
        '<span class="movedown"></span>',
        '<span class="resource">',
        '{% if ($["icon"]) { %}',
        '<img src="{%= $["icon"] %}" alt="icon" class="icon" />',
        '{% } %}',
        '{%= title %}',
        '</span>',
        '</li>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Configure.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'configure',
            title: this.titleText,
            selected: false,
            expose: false
        });
        var confViewScope = this;
        Ext.apply(this, {
            tools: {
                tbar: [{
                    name: 'save',
                    title: this.savePrefs,
                    cls: 'save button',
                    fn: this.savePreferences,
                    scope: confViewScope
                }]
            }
        });
    },
    init: function() {
        Mobile.SalesLogix.Configure.superclass.init.call(this);

        this.el
            .on('click', function(evt, el, o) {
                var Li;
                el = Ext.get(el);
                
                if (el.is('.moveup'))
                {
                    evt.stopEvent();
                    Li = el.parent('li');
                    Li.insertBefore(Li.prev('li', true));
                }
                else if (el.is('.movedown'))
                {
                    evt.stopEvent();
                    Li = el.parent('li');
                    Li.insertAfter(Li.next('li', true));
                }
            }, this);
    },
    savePreferences: function() {
        //Make sure the object hierarchy is defined.
        Ext.namespace("App.preferences.home");
        Ext.namespace("App.preferences.configure");
        
        //Clear App Preferences
        App.preferences.home.visible = []; 
        App.preferences.configure.order = [];
        
        var visibleHomeList = App.preferences.home.visible;
        var configureListOrder = App.preferences.configure.order;
        
        this.el.select("input.list-selector").each(function(el) {
            configureListOrder.push(el.dom.value);
            if (el.dom.checked) visibleHomeList.push(el.dom.value);
        }, this);
         
        App.persistPreferences();
        App.getView('home').show();
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
    renderView: function() {
        var appConfigureOrder,
            viewLookup = {},
            exposedViews,
            o = [],
            LIs, v, i, j;
            
        //App.preferences.configure.order will not be available, 
        //when App calls it's init. 
        try {
            appConfigureOrder = App.preferences.configure.order;
        }
        catch(e) {
            return;
        }

        // Run this only once
        if (this.viewRendered === true) return;
        
        //Defer initialization, until we need them.
        exposedViews = App.getExposedViews();
        LIs = this.el.select('li'); 
        
        //Update Configure List, to include any new views 
        //not included in local storage.
        //Find out whats new, and append them to user's configure list. 

        // Create a lookup cache for all exposed views. 
        for (j = exposedViews.length - 1; j >= 0; j--)
            viewLookup[exposedViews[j]] = true;
        
        // Delete existing views from lookup.  
        for (i = 0, len = appConfigureOrder.length; i < len; i++)
            if (viewLookup[appConfigureOrder[i]] === true)
                delete viewLookup[appConfigureOrder[i]];
        
        for (v in viewLookup) 
            appConfigureOrder.push(v);
        
        for (var i = appConfigureOrder.length - 1; i >= 0; i--)
        {
            v = App.getView(appConfigureOrder[i]);
            
            // If a persisted view is not loaded/unavailable/removed
            // we have to remove it from persistence.
            if (!v) appConfigureOrder.splice(i, 1);
            
            o.unshift(this.itemTemplate.apply(v));
        }
        
        //Persist this back to local storage.
        App.persistPreferences();
        
        LIs.remove();
        Ext.DomHelper.append(this.el, o.join(''));
        
        //Set the flag, so we don't have to do this again.
        this.viewRendered = true;
    },
    show: function() { 
        this.renderView();
        
        Mobile.SalesLogix.Configure.superclass.show.call(this);
        
        var selectedViews = App.preferences.home.visible,
            selectedRegEx = [];
        
        for (var j = 0; j < selectedViews.length; j++) {
            selectedRegEx.push(selectedViews[j]);
        }
        selectedRegEx = '^(' + selectedRegEx.join(')|(') + ')$';
        selectedRegEx = new RegExp(selectedRegEx, 'i');
        
        this.el.select('li').each(function(li){
            var chkbox = li.child('input.list-selector').dom;
            if (selectedRegEx.test(chkbox.value))
            {
                chkbox.checked = true;
            }
        });
    }
});
