/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @module crm/Views/_RightDrawerBaseMixin
 */
import declare from 'dojo/_base/declare';

/**
 * @class
 * @alias module:crm/Views/_RightDrawerBaseMixin
 * @mixin
 * @classdesc Base Mixin for the right drawer/menu. This is responsible for creating the toggle button on the toolbar and managing the state of the right menu (loaded/unloaded).
 *   Lifecycles:
 *   -- Loading of the right menu --
 *   1. Toggle button clicked
 *   2. setupRightDrawer
 *   3. loadRightDrawer
 *   -- Unloading of the right menu --
 *   1. onBeforeTransitionAway
 *   2. unloadRightDrawer
 * @since 3.0
 */
const __class = declare('crm.Views._RightDrawerBaseMixin', null, /** @lends module:crm/Views/_RightDrawerBaseMixin.prototype */{
  drawerLoaded: false,
  /**
   * @property {Boolean}
   * Add a flag so the view can opt-out of the right drawer if the mixin is used (_related views)
   */
  // hasSettings: false,
  toolsAdded: false,

  setupRightDrawer: function setupRightDrawer() {},
  loadRightDrawer: function loadRightDrawer() {
    // TODO: onTransitionAway is not called for "my schedule" nor is it called once local storage has group settings after first load
    // This avoid drawer refresh to happen which causes list from prev view to load
    // Aftter commenting out this code Drawer refresh is being called twice on each view change - find a way to call it once
    // if (this.drawerLoaded || this.hasSettings) {
    if (!this.hasSettings) {
      return;
    }

    this.setupRightDrawer();
    const drawer = App.getView('right_drawer');
    if (drawer) {
      drawer.refresh();
      // this.drawerLoaded = true;
    }
  },
  show: function show(options) {
    this.ensureToolsCreated(options);
    this.inherited(show, arguments);
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
    this.inherited(onToolLayoutCreated, arguments);
  },
  _addTools: function _addTools(tools) { // eslint-disable-line
    if (!this.hasSettings) {
      return;
    }
  },
  onTransitionTo: function onTransitionTo() {
    if (!this.hasSettings) {
      return;
    }

    this.loadRightDrawer();
  },
  onTransitionAway: function onTransitionAway() {
    if (!this.hasSettings) {
      return;
    }

    const drawer = App.getView('right_drawer');
    if (drawer) {
      this.unloadRightDrawer();
      drawer.clear();
      // this.drawerLoaded = false;
    }
  },
});

export default __class;
