define('crm/Views/RightDrawer', ['module', 'exports', 'dojo/_base/declare', 'dojo/store/Memory', 'argos/GroupedList'], function (module, exports, _declare, _Memory, _GroupedList) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Memory2 = _interopRequireDefault(_Memory);

  var _GroupedList2 = _interopRequireDefault(_GroupedList);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Views.RightDrawer
   * @extends argos.GroupedList
   */
  var __class = (0, _declare2.default)('crm.Views.RightDrawer', [_GroupedList2.default], /** @lends crm.Views.RightDrawer# */{
    // Templates
    cls: ' contextualContent',
    rowTemplate: new Simplate(['<div class="accordion-header list-content" role="presentation">', '<a data-action="{%= $.action %}"', '{% if($.dataProps) { %}', '{% for(var prop in $.dataProps) { %}', ' data-{%= prop %}="{%= $.dataProps[prop] %}"', '{% } %}', '{% } %}', '>', '<span>{%: $.title %}</span></a>', '</div>']),

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
      this.inherited(arguments);
      this.connect(App, 'onRegistered', this._onRegistered);
    },
    initSoho: function initSoho() {
      var _this = this;

      this.inherited(arguments);
      this.accordion.element.on('selected', function (evt, header) {
        // Fix up the event target to the element with our data-action attribute.
        evt.target = $('a', header).get(0);
        _this._initiateActionFromEvent(evt);
      });
    },
    setLayout: function setLayout(layout) {
      this.layout = layout;
    },
    createLayout: function createLayout() {
      return this.layout || [];
    },
    createStore: function createStore() {
      var layout = this._createCustomizedLayout(this.createLayout());
      var list = [];

      for (var i = 0; i < layout.length; i++) {
        var section = layout[i].children;

        for (var j = 0; j < section.length; j++) {
          var row = section[j];

          if (row.security && !App.hasAccessTo(row.security)) {
            continue;
          }
          if (typeof this.query !== 'function' || this.query(row)) {
            list.push(row);
          }
        }
      }

      var store = new _Memory2.default({
        data: list
      });
      return store;
    },
    clear: function clear() {
      this.inherited(arguments);
      this.store = null;
    },
    /**
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9SaWdodERyYXdlci5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiY2xzIiwicm93VGVtcGxhdGUiLCJTaW1wbGF0ZSIsImlkIiwiZXhwb3NlIiwiZW5hYmxlU2VhcmNoIiwiY3VzdG9taXphdGlvblNldCIsImVuYWJsZVB1bGxUb1JlZnJlc2giLCJkYXRhUHJvcHMiLCJwYWdlU2l6ZSIsImhhc01vcmVEYXRhIiwiZ2V0R3JvdXBGb3JFbnRyeSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiQXBwIiwiX29uUmVnaXN0ZXJlZCIsImluaXRTb2hvIiwiYWNjb3JkaW9uIiwiZWxlbWVudCIsIm9uIiwiZXZ0IiwiaGVhZGVyIiwidGFyZ2V0IiwiJCIsImdldCIsIl9pbml0aWF0ZUFjdGlvbkZyb21FdmVudCIsInNldExheW91dCIsImxheW91dCIsImNyZWF0ZUxheW91dCIsImNyZWF0ZVN0b3JlIiwiX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQiLCJsaXN0IiwiaSIsImxlbmd0aCIsInNlY3Rpb24iLCJjaGlsZHJlbiIsImoiLCJyb3ciLCJzZWN1cml0eSIsImhhc0FjY2Vzc1RvIiwicXVlcnkiLCJwdXNoIiwic3RvcmUiLCJkYXRhIiwiY2xlYXIiLCJyZWZyZXNoIiwicmVxdWVzdERhdGEiLCJzaG93Iiwib25TaG93IiwicmVmcmVzaFJlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7OztBQUlBLE1BQU1BLFVBQVUsdUJBQVEsdUJBQVIsRUFBaUMsdUJBQWpDLEVBQWdELG9DQUFvQztBQUNsRztBQUNBQyxTQUFLLG9CQUY2RjtBQUdsR0MsaUJBQWEsSUFBSUMsUUFBSixDQUFhLENBQ3hCLGlFQUR3QixFQUV4QixrQ0FGd0IsRUFHeEIseUJBSHdCLEVBSXhCLHNDQUp3QixFQUt4Qiw4Q0FMd0IsRUFNeEIsU0FOd0IsRUFPeEIsU0FQd0IsRUFReEIsR0FSd0IsRUFTeEIsaUNB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QUFDdEMsV0FBS2tDLGVBQUwsR0FBdUIsSUFBdkI7QUFDRDtBQTNGaUcsR0FBcEYsQ0FBaEIsQyxDQXhCQTs7Ozs7Ozs7Ozs7Ozs7O29CQXNIZXBELE8iLCJmaWxlIjoiUmlnaHREcmF3ZXIuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTWVtb3J5IGZyb20gJ2Rvam8vc3RvcmUvTWVtb3J5JztcclxuXHJcbmltcG9ydCBHcm91cGVkTGlzdCBmcm9tICdhcmdvcy9Hcm91cGVkTGlzdCc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5SaWdodERyYXdlclxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5Hcm91cGVkTGlzdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5SaWdodERyYXdlcicsIFtHcm91cGVkTGlzdF0sIC8qKiBAbGVuZHMgY3JtLlZpZXdzLlJpZ2h0RHJhd2VyIyAqL3tcclxuICAvLyBUZW1wbGF0ZXNcclxuICBjbHM6ICcgY29udGV4dHVhbENvbnRlbnQnLFxyXG4gIHJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhY2NvcmRpb24taGVhZGVyIGxpc3QtY29udGVudFwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj4nLFxyXG4gICAgJzxhIGRhdGEtYWN0aW9uPVwieyU9ICQuYWN0aW9uICV9XCInLFxyXG4gICAgJ3slIGlmKCQuZGF0YVByb3BzKSB7ICV9JyxcclxuICAgICd7JSBmb3IodmFyIHByb3AgaW4gJC5kYXRhUHJvcHMpIHsgJX0nLFxyXG4gICAgJyBkYXRhLXslPSBwcm9wICV9PVwieyU9ICQuZGF0YVByb3BzW3Byb3BdICV9XCInLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJz4nLFxyXG4gICAgJzxzcGFuPnslOiAkLnRpdGxlICV9PC9zcGFuPjwvYT4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAncmlnaHRfZHJhd2VyJyxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgY3VzdG9taXphdGlvblNldDogJ3JpZ2h0X2RyYXdlcicsXHJcbiAgZW5hYmxlUHVsbFRvUmVmcmVzaDogZmFsc2UsXHJcbiAgZGF0YVByb3BzOiBudWxsLFxyXG4gIHBhZ2VTaXplOiAxMDAsXHJcblxyXG4gIGhhc01vcmVEYXRhOiBmdW5jdGlvbiBoYXNNb3JlRGF0YSgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGdldEdyb3VwRm9yRW50cnk6IGZ1bmN0aW9uIGdldEdyb3VwRm9yRW50cnkoKSB7fSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMuY29ubmVjdChBcHAsICdvblJlZ2lzdGVyZWQnLCB0aGlzLl9vblJlZ2lzdGVyZWQpO1xyXG4gIH0sXHJcbiAgaW5pdFNvaG86IGZ1bmN0aW9uIGluaXRTb2hvKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMuYWNjb3JkaW9uLmVsZW1lbnQub24oJ3NlbGVjdGVkJywgKGV2dCwgaGVhZGVyKSA9PiB7XHJcbiAgICAgIC8vIEZpeCB1cCB0aGUgZXZlbnQgdGFyZ2V0IHRvIHRoZSBlbGVtZW50IHdpdGggb3VyIGRhdGEtYWN0aW9uIGF0dHJpYnV0ZS5cclxuICAgICAgZXZ0LnRhcmdldCA9ICQoJ2EnLCBoZWFkZXIpLmdldCgwKTtcclxuICAgICAgdGhpcy5faW5pdGlhdGVBY3Rpb25Gcm9tRXZlbnQoZXZ0KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2V0TGF5b3V0OiBmdW5jdGlvbiBzZXRMYXlvdXQobGF5b3V0KSB7XHJcbiAgICB0aGlzLmxheW91dCA9IGxheW91dDtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8IFtdO1xyXG4gIH0sXHJcbiAgY3JlYXRlU3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xyXG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5fY3JlYXRlQ3VzdG9taXplZExheW91dCh0aGlzLmNyZWF0ZUxheW91dCgpKTtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheW91dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBzZWN0aW9uID0gbGF5b3V0W2ldLmNoaWxkcmVuO1xyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWN0aW9uLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gc2VjdGlvbltqXTtcclxuXHJcbiAgICAgICAgaWYgKHJvdy5zZWN1cml0eSAmJiAhQXBwLmhhc0FjY2Vzc1RvKHJvdy5zZWN1cml0eSkpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucXVlcnkgIT09ICdmdW5jdGlvbicgfHwgdGhpcy5xdWVyeShyb3cpKSB7XHJcbiAgICAgICAgICBsaXN0LnB1c2gocm93KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBNZW1vcnkoe1xyXG4gICAgICBkYXRhOiBsaXN0LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbiAgfSxcclxuICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5zdG9yZSA9IG51bGw7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBPdmVycmlkZSB0aGUgTGlzdCByZWZyZXNoIHRvIGFsc28gY2xlYXIgdGhlIHZpZXcgKHNvbWV0aGluZyB0aGUgYmVmb3JlVHJhbnNpdGlvblRvIGhhbmRsZXMsIGJ1dCB3ZSBhcmUgbm90IHVzaW5nKVxyXG4gICAqL1xyXG4gIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJlcXVlc3REYXRhKCk7XHJcbiAgfSxcclxuICBzaG93OiBmdW5jdGlvbiBzaG93KCkge1xyXG4gICAgaWYgKHRoaXMub25TaG93KHRoaXMpID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfSxcclxuICBfb25SZWdpc3RlcmVkOiBmdW5jdGlvbiBfb25SZWdpc3RlcmVkKCkge1xyXG4gICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19