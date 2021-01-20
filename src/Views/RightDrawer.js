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

import declare from 'dojo/_base/declare';
import Memory from 'dojo/store/Memory';

import GroupedList from 'argos/GroupedList';

const __class = declare('crm.Views.RightDrawer', [GroupedList], {
  // Templates
  cls: ' contextualContent',
  rowTemplate: new Simplate([
    '<div class="accordion-header list-content" role="presentation">',
    '<a data-action="{%= $.action %}"',
    '{% if($.dataProps) { %}',
    '{% for(var prop in $.dataProps) { %}',
    ' data-{%= prop %}="{%= $.dataProps[prop] %}"',
    '{% } %}',
    '{% } %}',
    '>',
    '<span>{%: $.title %}</span></a>',
    '</div>',
  ]),

  // View Properties
  id: 'right_drawer',
  expose: false,
  enableSearch: false,
  customizationSet: 'right_drawer',
  enablePullToRefresh: false,
  dataProps: null,
  pageSize: 100,

  hasMoreData: function hasMoreData() {
    return false;
  },
  getGroupForEntry: function getGroupForEntry() {},
  init: function init() {
    this.inherited(init, arguments);
    this.connect(App, 'onRegistered', this._onRegistered);
  },
  initSoho: function initSoho() {
    this.inherited(initSoho, arguments);
  },
  setLayout: function setLayout(layout) {
    this.layout = layout;
  },
  createLayout: function createLayout() {
    return this.layout || [];
  },
  createStore: function createStore() {
    const layout = this._createCustomizedLayout(this.createLayout());
    const list = [];

    for (let i = 0; i < layout.length; i++) {
      const section = layout[i].children;

      for (let j = 0; j < section.length; j++) {
        const row = section[j];

        if (row.security && !App.hasAccessTo(row.security)) {
          continue;
        }
        if (typeof this.query !== 'function' || this.query(row)) {
          list.push(row);
        }
      }
    }

    const store = new Memory({
      data: list,
    });
    return store;
  },
  clear: function clear() {
    this.inherited(clear, arguments);
    this.store = null;
  },
  /*
   * Override the List refresh to also clear the view (something the beforeTransitionTo handles, but we are not using)
   */
  refresh: function refresh() {
    this.clear();
    this.requestData();
  },
  show: function show() {
    if (this.onShow(this) === false) {
      return;
    }

    this.refresh();
  },
  _onRegistered: function _onRegistered() {
    this.refreshRequired = true;
  },
});

export default __class;
