define('crm/Views/SelectList', ['module', 'exports', 'dojo/_base/declare', 'dojo/store/Memory', 'argos/List'], function (module, exports, _declare, _Memory, _List) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Memory2 = _interopRequireDefault(_Memory);

  var _List2 = _interopRequireDefault(_List);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Views.SelectList', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.$descriptor %}</p>']),

    // View Properties
    id: 'select_list',
    expose: false,
    enablePullToRefresh: false,
    isCardView: false,
    refreshRequiredFor: function refreshRequiredFor(options) {
      if (this.options) {
        return options ? this.options.data !== options.data : false;
      }
      return true;
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    requestData: function requestData() {
      this.store = null;
      this.inherited(requestData, arguments);
    },
    createStore: function createStore() {
      // caller is responsible for passing in a well-structured feed object.
      var data = this.expandExpression(this.options && this.options.data && this.options.data.$resources);
      var store = new _Memory2.default({
        data: data
      });
      store.idProperty = '$key';
      return store;
    }
  }); /* Copyright 2017 Infor
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

  exports.default = __class;
  module.exports = exports['default'];
});