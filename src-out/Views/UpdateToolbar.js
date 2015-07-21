/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.UpdateToolbar
 *
 *
 * @extends argos.MainToolbar
 *
 */
define('crm/Views/UpdateToolbar', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/dom-class',
    'argos/MainToolbar'
], function(
    declare,
    lang,
    win,
    domClass,
    MainToolbar
) {
    var __class = declare('crm.Views.UpdateToolbar', [MainToolbar], {
        widgetTemplate: new Simplate([
            '<div class="update-toolbar">',
            '<h1 data-action="reload">{%= $.updateText %}</h1>',
            '</div>'
        ]),

        updateText: 'An update is available.  Click to reload.',

        managed: false,

        show: function() {
            domClass.add(win.body(), 'update-available');

            this.showTools([{
                id: 'cancel',
                side: 'right',
                fn: this.cancel,
                scope: this
            }]);

            this.inherited(arguments);
        },

        showTools: function() {
            this.inherited(arguments);
        },

        hide: function() {
            domClass.remove(win.body(), 'update-available');
        },
        reload: function() {
            App.reload();
        },
        cancel: function() {
            this.hide();
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.UpdateToolbar', __class);
    return __class;
});

