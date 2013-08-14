/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/MainToolbar', [
    'dojo/_base/declare',
    'dojo/dom-style',
    'dojo/has',
    'dojox/mobile/sniff',
    'Sage/Platform/Mobile/MainToolbar'
], function(
    declare,
    domStyle,
    has,
    mobileSniff,
    MainToolbar
) {

    return declare('Mobile.SalesLogix.Views.MainToolbar', [MainToolbar], {
        titleText: 'Saleslogix',
        showTools: function(tools) {
            var hasLeftDrawer, isOnFirstView, isOnEdit, history;

            history = ReUI && ReUI.context && ReUI.context.history;

            if (history.length > 0) {
                if (history[0].page === 'login') {
                    isOnFirstView = history.length === 2;
                } else {
                    isOnFirstView = history.length === 1;
                }
            }

            if (tools) {
                for (var i = 0; i < tools.length; i++) {
                    if (tools[i].id == 'toggleLeftDrawer') {
                        hasLeftDrawer = true;
                    }

                    if (tools[i].id == 'back') {
                        hasLeftDrawer = true;
                    }

                    if (tools[i].id === 'cancel') {
                        isOnEdit = true;
                    }
                }
            }

            if (tools !== false) {
                tools = tools || [];

                if (!hasLeftDrawer) {
                    tools.unshift({
                        id: 'toggleLeftDrawer',
                        side: 'left',
                        fn: this.toggleLeftDrawer,
                        scope: this
                    });
                }

                if (!isOnEdit && !isOnFirstView) {
                    tools = tools.concat([{
                            id: 'back',
                            side: 'left',
                            fn: this.navigateBack,
                            scope: this
                        }]);
                }

            }

            this.inherited(arguments);
        },
        navigateBack: function() {
            ReUI.back();
        },
        navigateToHomeView: function() {
            App.navigateToHomeView();
        },
        toggleRightDrawer: function() {
            this._toggleDrawer('right');
        },
        toggleLeftDrawer: function() {
            this._toggleDrawer('left');
        },
        onTitleClick: function() {
            var view, state;

            state = App.snapper && App.snapper.state();
            view = App.getPrimaryActiveView();

            if (view && state && state.state === 'closed') {
                if (has('android')) {
                    // Hack to work around https://code.google.com/p/android/issues/detail?id=19625
                    domStyle.set(view.domNode, 'overflow', 'hidden');
                    view.domNode.scrollTop = 0;
                    domStyle.set(view.domNode, 'overflow', 'auto');
                } else {
                    view.domNode.scrollTop = 0;
                }
            }
        },
        _toggleDrawer: function(state) {
            var snapperState = App.snapper.state();
            if (snapperState.state === state) {
                App.snapper.close();
            } else {
                App.snapper.open(state);
            }
        }
    });
});

