/// <reference path="../../../ext/ext-core-debug.js"/>
/// <reference path="../../../reui/reui.js"/>
/// <reference path="../../../platform/View.js"/>
/// <reference path="Application.js"/>

Ext.namespace("Mobile.SalesLogix");

/// this is a simple configure screen for Home View.
Mobile.SalesLogix.Configure = Ext.extend(Sage.Platform.Mobile.View, {
    titleText: 'Configure',
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
    render: function() {
        Mobile.SalesLogix.Configure.superclass.render.call(this);
        var configurableViews = ['Accounts', 'Contacts', 'Opportunities', 'Leads', 'Tickets'];
        var homeConfigRegExp = new RegExp('^(' + configurableViews.join(')|(') + ')$', 'i');
        var v = App.getViews().filter(function(element, index, array){
            return homeConfigRegExp.test(element.resourceKind);
        });
        
        var o = [];
        for (var i = 0; i < v.length; i++)
            if (v[i] != this && v[i].expose != false)
                o.push(this.itemTemplate.apply(v[i]));

        Ext.DomHelper.append(this.el, o.join(''));

    }
});