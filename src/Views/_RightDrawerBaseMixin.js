import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';

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
const __class = declare('crm.Views._RightDrawerBaseMixin', null, {
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
    const drawer = App.getView('right_drawer');
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
    const theTools = tools || {
      tbar: [],
    };
    if (!this.toolsAdded) {
      this._addTools(theTools);
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
        scope: this,
      });
    }
  },
  toggleRightDrawer: function toggleRightDrawer() {
    this._toggleDrawer('right');
  },
  _toggleDrawer: function _toggleDrawer(state) {
    const snapperState = App.snapper.state();
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

    const drawer = App.getView('right_drawer');
    if (drawer) {
      this.unloadRightDrawer();
      drawer.clear();
      this.drawerLoaded = false;
    }
  },
});

lang.setObject('Mobile.SalesLogix.Views._RightDrawerBaseMixin', __class);
export default __class;
