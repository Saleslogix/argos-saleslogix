/// <reference path="../../../ext/ext-core-debug.js"/>
/// <reference path="../../../reui/reui.js"/>
/// <reference path="../../../platform/Application.js"/>
/// <reference path="../../../platform/View.js"/>
/// <reference path="Application.js"/>

Ext.namespace("Mobile.SalesLogix");

/// this is a very simple home view.
Mobile.SalesLogix.SearchDialog = Ext.extend(Sage.Platform.Mobile.View, {   
    viewTemplate: new Simplate([
        '<form id="{%= id %}" class="dialog">',
        '<fieldset>',
        '<h1>{%= title %}</h1>',
        '<a type="cancel" class="button leftButton">Cancel</a>',
        '<a class="button blueButton" target="_none">Search</a>',
        '<label>query:</label>',
        '<input id="{%= id %}_query" type="text" name="query" />',
        '</fieldset>',
        '</form>'
    ]),    
    constructor: function(o) {
        Mobile.SalesLogix.SearchDialog.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'search_dialog',
            title: 'Search',
            expose: false
        });        
    },        
    init: function() {                                            
        Mobile.SalesLogix.SearchDialog.superclass.init.call(this);
        
        this.el
            .on('submit', function(evt, el, o) {
                return false;
            }, this, { preventDefault: true, stopPropagation: true })
            .dom.onsubmit = false; // fix for iui shenanigans

        this.el.select('.leftButton')
            .on('click', function(evt, el, o) {
                this.el.dom.removeAttribute('selected');
            }, this, { preventDefault: true, stopPropagation: true });    

        this.el.select('.blueButton')
            .on('click', function(evt, el, o) {    
                this.search();         
            }, this, { preventDefault: true, stopPropagation: true });    
        
        this.el.select('input[name="query"]')
            .on('keypress', function(evt, el, o) {
                if (evt.getKey() == 13 || evt.getKey() == 10)  
                {
                    evt.stopEvent();                    

                    /* fix to hide iphone keyboard when go is pressed */
                    if (/(iphone|ipad)/i.test(navigator.userAgent))
                        Ext.get('backButton').focus();
                    
                    this.search();                
                }
            }, this);            
    },    
    show: function(context) {
        this.context = context;
        this.el
            .child('input[name="query"]')
            .dom.value = typeof this.context.query === 'string' ? this.context.query : '';

        Mobile.SalesLogix.SearchDialog.superclass.show.call(this);

        this.el 
            .child('input[name="query"]')
            .focus();
    },
    search: function() {
        // todo: get actual parameters and validate them by requesting a simple feed (i.e. $service)

        var query = this.el
            .child('input[name="query"]')
            .getValue();

        if (this.context && this.context.fn)
            this.context.fn.call(this.context.scope || this, query);
     
        this.el.dom.removeAttribute('selected');
    }
});