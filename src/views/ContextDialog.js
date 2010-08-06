/// <reference path="../../../ext/ext-core-debug.js"/>
/// <reference path="../../../reui/reui.js"/>
/// <reference path="../../../platform/Application.js"/>
/// <reference path="../../../platform/View.js"/>
/// <reference path="Application.js"/>

Ext.namespace("Mobile.SalesLogix");

/// this is a very simple home view.
Mobile.SalesLogix.ContextDialog = Ext.extend(Sage.Platform.Mobile.View, {
    titleText: '',
    cancelText: 'Cancel',
    activitiesText: 'Activities',
    notesText: 'Notes',
    viewTemplate: new Simplate([
        '<form id="{%= id %}" class="dialog">',
            '<fieldset>',
                '<ul>',
                    '<li><a href="" class="button activities blueButton">{%= $.activitiesText %}</a></li>',
                    '<li><a href="" class="button notes blueButton">{%= $.notesText %}</a></li>',
                    '<li><a type="cancel" class="button dismissButton redButton">{%= $.cancelText %}</a></li>',
                '</ul>',
            '</fieldset>',
        '</form>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.ContextDialog.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'context_dialog',
            title: this.titleText,
            expose: false
        });
    },
    init: function() {
        Mobile.SalesLogix.ContextDialog.superclass.init.call(this);

        this.el
            .on('submit', function(evt, el, o) {
                return false;
            }, this, { preventDefault: true, stopPropagation: true })
            .dom.onsubmit = false; // fix for iui shenanigans

        this.el.select('.dismissButton')
            .on('click', function(evt, el, o) {
                this.dismissDialog();
            }, this, { preventDefault: true, stopPropagation: true });

        this.el.select('.activities')
            .on('click', function(evt, el, o) {
                this.dismissDialog();
            }, this, { preventDefault: true, stopPropagation: true });

        this.el.select('.notes')
            .on('click', function(evt, el, o) {
                this.dismissDialog();
            }, this, { preventDefault: true, stopPropagation: true });
    },
    dismissDialog: function() {
        this.el.dom.removeAttribute('selected');
        // UGLY Hack... Find another way to show/hide Search box.
        // May be it should not use "selected" attribute.
        Ext.select('#search_dialog').item(0).dom.setAttribute('selected', 'true');
    }
});