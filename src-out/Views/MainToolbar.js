/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.MainToolbar
 *
 *
 * @extends argos.MainToolbar
 *
 */
define('crm/Views/MainToolbar', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-style',
    'dojo/has',
    'argos/MainToolbar'
], function(
    declare,
    lang,
    domStyle,
    has,
    MainToolbar
) {

    var __class = declare('crm.Views.MainToolbar', [MainToolbar], {
        showTools: function(tools) {
            var hasLeftDrawer,
                isOnFirstView,
                i,
                isOnEdit;

            isOnFirstView = App.isOnFirstView();

            if (tools) {
                for (i = 0; i < tools.length; i++) {
                    if (tools[i].id === 'toggleLeftDrawer') {
                        hasLeftDrawer = true;
                    }

                    if (tools[i].id === 'back') {
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
                        'cls': 'fa fa-bars fa-fw fa-lg',
                        side: 'left',
                        fn: this.toggleLeftDrawer,
                        scope: this
                    });
                }

                if (!isOnEdit && !isOnFirstView) {
                    tools = tools.concat([{
                            id: 'back',
                            cls: 'fa fa-angle-left fa-fw fa-lg',
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
            var view, state, scrollerNode;

            state = App.snapper && App.snapper.state();
            view = App.getPrimaryActiveView();

            if (view && state && state.state === 'closed') {
                scrollerNode = view.get('scroller');
                if (has('android')) {
                    // Hack to work around https://code.google.com/p/android/issues/detail?id=19625
                    domStyle.set(scrollerNode, 'overflow', 'hidden');
                    scrollerNode.scrollTop = 0;
                    domStyle.set(scrollerNode, 'overflow', 'auto');
                } else {
                    scrollerNode.scrollTop = 0;
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

    lang.setObject('Mobile.SalesLogix.Views.MainToolbar', __class);
    return __class;
});

