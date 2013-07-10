define('Mobile/SalesLogix/Views/_RightDrawerBaseMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang'
], function(
    declare,
    array,
    lang
) {

    // Base Mixin for the right drawer/menu. This is responsible for creating the toggle button on the toolbar and managing the state of the right menu (loaded/unloaded).
    // 
    // Lifecycles:
    // -- Loading of the right menu --
    // 1. Toggle button clicked
    // 2. setupRightDrawer
    // 3. loadRightDrawer
    // 
    // -- Unloading of the right menu --
    // 1. onBeforeTransitionAway
    // 2. unloadRightDrawer
    return declare('Mobile.SalesLogix.Views._RightDrawerBaseMixin', null, {
        drawerLoaded: false,
        toolsAdded: false,

        setupRightDrawer: function() {
        },
        loadRightDrawer: function() {
            if (this.drawerLoaded) {
                return;
            }

            this.setupRightDrawer();
            var drawer = App.getView('right_drawer');
            if (drawer) {
                drawer.refresh();
                this.drawerLoaded = true;
            }
        },
        createToolLayout: function() {
            var tools = this.inherited(arguments) || { 
                tbar: []
            };

            if (!this.toolsAdded) {
                tools.tbar.unshift({
                    id: 'toggleRightDrawer',
                    side: 'right',
                    fn: this.toggleRightDrawer,
                    scope: this
                });

                this.toolsAdded = true;
            }
            return tools;
        },
        toggleRightDrawer: function() {
            this._toggleDrawer('right');
        },
        _toggleDrawer: function(state) {
            var snapperState = App.snapper.state();
            if (snapperState.state === state) {
                App.snapper.close();
            } else {
                this.loadRightDrawer();
                App.snapper.open(state);
            }
        },
        unloadRightDrawer: function() {
        },
        onBeforeTransitionAway: function() {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                this.unloadRightDrawer();
                drawer.clear();
                this.drawerLoaded = false;
            }
        }
    });
});

