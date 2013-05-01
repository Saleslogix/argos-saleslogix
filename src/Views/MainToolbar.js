define('Mobile/SalesLogix/Views/MainToolbar', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/MainToolbar'
], function(
    declare,
    MainToolbar
) {

    return declare('Mobile.SalesLogix.Views.MainToolbar', [MainToolbar], {
        titleText: 'Sage Saleslogix',
        showTools: function(tools) {
            var hasLeftSideTools;

            if (tools) {
                for (var i = 0; i < tools.length; i++) {
                    if (tools[i].side == 'left') {
                        hasLeftSideTools = true;
                        break;
                    }
                }
            }

            if (!hasLeftSideTools && tools !== false) {
                tools = tools || [];

                tools = tools.concat([{
                    id: 'toggleLeftDrawer',
                    side: 'left',
                    fn: this.toggleLeftDrawer,
                    scope: this
                }]);

                if (App.getPrimaryActiveView() != App.getView('home')) {
                    tools = tools.concat([{
                            id: 'back',
                            side: 'left',
                            fn: this.navigateBack,
                            scope: this
                        }]);
                }

                /*tools.unshift([{
                    id: 'toggleRightDrawer',
                    side: 'right',
                    fn: this.toggleRightDrawer,
                    scope: this
                }]);*/
            }

            this.inherited(arguments);
        },
        navigateBack: function() {
            ReUI.back();
        },
        navigateToHomeView: function() {
            App.navigateToHomeView();
        },
        toggleLeftDrawer: function() {
            this._toggleDrawer('left');
        },
        toggleRightDrawer: function() {
            this._toggleDrawer('right');
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

