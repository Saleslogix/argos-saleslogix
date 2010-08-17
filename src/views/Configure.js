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
        '<input type="checkbox" value="{%= $["resourceKind"] %}" class="list-selector" />',
        '<span class="moveup"></span>',
        '<span class="movedown"></span>',
        '<span class="resource" m:resource="{%= $["resourceKind"] %}">',
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
            .select('.moveup')
            .on('click', function(evt, el, o) {
                var Li = Ext.get(el).parent('li');
                Li.insertBefore(Li.prev('li', true));
            }, this, { preventDefault: true, stopPropagation: true });

        this.el
        .select('.movedown')
        .on('click', function(evt, el, o) {
            var Li = Ext.get(el).parent('li');
            Li.insertAfter(Li.next('li', true));
        }, this, { preventDefault: true, stopPropagation: true });
    },
    savePreferences: function() {
        var checked = [];
        var homeView = App.getView('home');
        
        this.el.select("input.list-selector:checked").each(function(el) {
            checked.push(el.dom.value);
        }, this);
         
        window.localStorage.setItem('[userpref]', Ext.encode(checked));
        
        homeView.show();
        homeView.el.select('li').remove();
        homeView.renderAvailableViews();
    },
    getAllViews: function() {
        var v = App.getViews();
        var o = [];
        for (var i = 0; i < v.length; i++)
            if (v[i] != this && v[i].title != 'Home' && v[i].expose != false)
                o.push(this.itemTemplate.apply(v[i]));

        return o;
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
    render: function() {
        Mobile.SalesLogix.Configure.superclass.render.call(this);
 
        var o = this.getAllViews();
        Ext.DomHelper.append(this.el, o.join(''));
    },
    show: function() {
        Mobile.SalesLogix.Configure.superclass.show.call(this);
        
        var selectedViews = App.getAvailableViews(this, true);
        var selectedRegEx = [];
        
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
