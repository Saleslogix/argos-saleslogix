define('crm/Views/_RightDrawerBaseMixin', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/lang'], function (exports, module, _dojo_baseDeclare, _dojo_baseArray, _dojo_baseLang) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _lang = _interopRequireDefault(_dojo_baseLang);

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
    /**
    * @class crm.Views._RightDrawerBaseMixin
    *
    * The base mixin for the right drawer.
    *
    * @since 3.0
    *
    */
    var __class = (0, _declare['default'])('crm.Views._RightDrawerBaseMixin', null, {
        drawerLoaded: false,

        /**
         * @property {Boolean}
         * Add a flag so the view can opt-out of the right drawer if the mixin is used (_related views)
         */
        disableRightDrawer: false,
        toolsAdded: false,

        setupRightDrawer: function setupRightDrawer() {},
        loadRightDrawer: function loadRightDrawer() {
            if (this.drawerLoaded || this.disableRightDrawer) {
                return;
            }

            this.setupRightDrawer();
            var drawer = App.getView('right_drawer');
            if (drawer) {
                drawer.refresh();
                this.drawerLoaded = true;
            }
        },
        show: function show(options) {
            this.ensureToolsCreated(options);
            this.inherited(arguments);
        },
        ensureToolsCreated: function ensureToolsCreated(options) {
            // Inject tools into options if it exists
            if (options && options.tools) {
                this._addTools(options.tools);
            }
        },
        onToolLayoutCreated: function onToolLayoutCreated(tools) {
            tools = tools || {
                tbar: []
            };
            if (!this.toolsAdded) {
                this._addTools(tools);
                this.toolsAdded = true;
            }
            this.inherited(arguments);
        },
        _addTools: function _addTools(tools) {
            if (this.disableRightDrawer) {
                return;
            }

            if (tools) {
                tools.tbar.unshift({
                    id: 'toggleRightDrawer',
                    cls: 'fa fa-ellipsis-v fa-fw fa-lg',
                    side: 'right',
                    fn: this.toggleRightDrawer,
                    scope: this
                });
            }
        },
        toggleRightDrawer: function toggleRightDrawer() {
            this._toggleDrawer('right');
        },
        _toggleDrawer: function _toggleDrawer(state) {
            var snapperState = App.snapper.state();
            if (snapperState.state === state) {
                App.snapper.close();
            } else {
                App.snapper.open(state);
            }
        },
        unloadRightDrawer: function unloadRightDrawer() {},
        onTransitionTo: function onTransitionTo() {
            if (this.disableRightDrawer) {
                return;
            }

            this.loadRightDrawer();
        },
        onTransitionAway: function onTransitionAway() {
            if (this.disableRightDrawer) {
                return;
            }

            var drawer = App.getView('right_drawer');
            if (drawer) {
                this.unloadRightDrawer();
                drawer.clear();
                this.drawerLoaded = false;
            }
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views._RightDrawerBaseMixin', __class);
    module.exports = __class;
});
