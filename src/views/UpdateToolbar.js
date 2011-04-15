/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix");

(function() {
    Mobile.SalesLogix.UpdateToolbar = Ext.extend(Sage.Platform.Mobile.MainToolbar, {
        barTemplate: new Simplate([
            '<div class="update-toolbar">',
            // action has to be defined at this level
            // todo: potential issue with event delegation when the target matches the delegate?
            '<h1 data-action="reload">{%= $.updateText %}</h1>',
            '</div>'
        ]),

        updateText: 'An update is available.  Click to reload.',

        managed: false,

        show: function() {
            Ext.getBody().addClass('update-available');

            this.showTools([{
                id: 'cancel',
                side: 'right',
                fn: this.cancel,
                scope: this
            }]);
        },
        hide: function() {
            Ext.getBody().removeClass('update-available');
        },
        reload: function() {
            App.reload();
        },
        cancel: function() {
            this.hide();
        }
    });
})();