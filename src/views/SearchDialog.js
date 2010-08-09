/// <reference path="../../../ext/ext-core-debug.js"/>
/// <reference path="../../../reui/reui.js"/>
/// <reference path="../../../platform/Application.js"/>
/// <reference path="../../../platform/View.js"/>
/// <reference path="Application.js"/>

Ext.namespace("Mobile.SalesLogix");

/// this is a very simple home view.
Mobile.SalesLogix.SearchDialog = Ext.extend(Sage.Platform.Mobile.View, {
    titleText: 'Search',
    cancelText: 'Cancel',
    searchText: 'Search',
    queryText: 'query',
    viewTemplate: new Simplate([
        '<form id="{%= id %}" class="dialog search">',
        '<fieldset>',
        '<a type="cancel" class="dismissButton">{%= $.cancelText %}</a>',
        '<a class="searchButton" target="_none">{%= $.searchText %}</a>',
        '<label>{%= $.queryText %}</label>',
        '<input id="{%= id %}_query" type="text" name="query" />',
        '</fieldset>',
        '</form>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.SearchDialog.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'search_dialog',
            title: this.titleText,
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

        this.el.select('.dismissButton')
            .on('click', function(evt, el, o) {
                var searchBox = this.el.select('input[name="query"]').elements[0];
                if (searchBox.value != "") {
                    searchBox.value = "";
                }
            }, this, { preventDefault: true, stopPropagation: true });

        this.el.select('.searchButton')
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
        var showOrHideDismissButton = function(el, context) {
            if (el.value == "") {
                context.el.select('.dismissButton').hide();
            }
            else {
                context.el.select('.dismissButton').show();
            }
        };
        this.el.select('input[name="query"]')
            .on('keyup', function(evt, el, o) {
                showOrHideDismissButton(el, this);
            }, this);
    },
    show: function(context) {
        this.context = context;
        var searchBox = this.el
            .child('input[name="query"]').dom;
        searchBox.value = typeof this.context.query === 'string' ? this.context.query : '';

        if (searchBox.value == "") {
            this.el.select('.dismissButton').hide();
        }
        else {
            this.el.select('.dismissButton').show();
         }

        Mobile.SalesLogix.SearchDialog.superclass.show.call(this);
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