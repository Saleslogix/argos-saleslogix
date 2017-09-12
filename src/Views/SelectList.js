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
import lang from 'dojo/_base/lang';
import Memory from 'dojo/store/Memory';
import List from 'argos/List';

/**
 * @class crm.Views.SelectList
 *
 *
 * @extends argos.List
 *
 */
const __class = declare('crm.Views.SelectList', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.$descriptor %}</p>',
  ]),

  // View Properties
  id: 'select_list',
  expose: false,
  enablePullToRefresh: false,
  isCardView: false,
  refreshRequiredFor: function refreshRequiredFor(options) {
    if (this.options) {
      return options ? (this.options.data !== options.data) : false;
    }
    return true;
  },
  hasMoreData: function hasMoreData() {
    return false;
  },
  requestData: function requestData() {
    this.store = null;
    this.inherited(arguments);
  },
  createStore: function createStore() {
    // caller is responsible for passing in a well-structured feed object.
    const data = this.expandExpression(this.options && this.options.data && this.options.data.$resources);
    const store = new Memory({
      data,
    });
    store.idProperty = '$key';
    return store;
  },
});

lang.setObject('Mobile.SalesLogix.Views.SelectList', __class);
export default __class;
