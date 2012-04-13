define('Mobile/SalesLogix/UpdateToolbar', [
    'dojo/_base/declare',
    'dojo/_base/window',
    'dojo/dom-class',
    'Sage/Platform/Mobile/MainToolbar'
], function(
    declare,
    win,
    domClass,
    MainToolbar
) {
    return declare('Mobile.SalesLogix.UpdateToolbar', [MainToolbar], {
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
            domClass.add(win.body(), 'update-available');

            this.showTools([{
                id: 'cancel',
                side: 'right',
                fn: this.cancel,
                scope: this
            }]);
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
});