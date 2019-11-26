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
      this.inherited(init, arguments);
      this.connect(App, 'onRegistered', this._onRegistered);
    },
    initSoho: function initSoho() {
      var _this = this;

      this.inherited(initSoho, arguments);
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
      this.inherited(clear, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9SaWdodERyYXdlci5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiY2xzIiwicm93VGVtcGxhdGUiLCJTaW1wbGF0ZSIsImlkIiwiZXhwb3NlIiwiZW5hYmxlU2VhcmNoIiwiY3VzdG9taXphdGlvblNldCIsImVuYWJsZVB1bGxUb1JlZnJlc2giLCJkYXRhUHJvcHMiLCJwYWdlU2l6ZSIsImhhc01vcmVEYXRhIiwiZ2V0R3JvdXBGb3JFbnRyeSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiQXBwIiwiX29uUmVnaXN0ZXJlZCIsImluaXRTb2hvIiwiYWNjb3JkaW9uIiwiZWxlbWVudCIsIm9uIiwiZXZ0IiwiaGVhZGVyIiwidGFyZ2V0IiwiJCIsImdldCIsIl9pbml0aWF0ZUFjdGlvbkZyb21FdmVudCIsInNldExheW91dCIsImxheW91dCIsImNyZWF0ZUxheW91dCIsImNyZWF0ZVN0b3JlIiwiX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQiLCJsaXN0IiwiaSIsImxlbmd0aCIsInNlY3Rpb24iLCJjaGlsZHJlbiIsImoiLCJyb3ciLCJzZWN1cml0eSIsImhhc0FjY2Vzc1RvIiwicXVlcnkiLCJwdXNoIiwic3RvcmUiLCJkYXRhIiwiY2xlYXIiLCJyZWZyZXNoIiwicmVxdWVzdERhdGEiLCJzaG93Iiwib25TaG93IiwicmVmcmVzaFJlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7OztBQUlBLE1BQU1BLFVBQVUsdUJBQVEsdUJBQVIsRUFBaUMsdUJBQWpDLEVBQWdELG9DQUFvQztBQUNsRztBQUNBQyxTQUFLLG9CQUY2RjtBQUdsR0MsaUJBQWEsSUFBSUMsUUFBSixDQUFhLENBQ3hCLGlFQUR3QixFQUV4QixrQ0FGd0IsRUFHeEIseUJBSHdCLEVBSXhCLHNDQUp3QixFQUt4Qiw4Q0FMd0IsRUFNeEIsU0FOd0IsRUFPeEIsU0FQd0IsRUFReEIsR0FSd0IsRUFTeEIsaUNB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RCxLQXhGaUc7QUF5RmxHOUIsbUJBQWUsU0FBU0EsYUFBVCxHQUF5QjtBQUN0QyxXQUFLa0MsZUFBTCxHQUF1QixJQUF2QjtBQUNEO0FBM0ZpRyxHQUFwRixDQUFoQixDLENBeEJBOzs7Ozs7Ozs7Ozs7Ozs7b0JBc0hlcEQsTyIsImZpbGUiOiJSaWdodERyYXdlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBNZW1vcnkgZnJvbSAnZG9qby9zdG9yZS9NZW1vcnknO1xyXG5cclxuaW1wb3J0IEdyb3VwZWRMaXN0IGZyb20gJ2FyZ29zL0dyb3VwZWRMaXN0JztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlJpZ2h0RHJhd2VyXHJcbiAqIEBleHRlbmRzIGFyZ29zLkdyb3VwZWRMaXN0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLlJpZ2h0RHJhd2VyJywgW0dyb3VwZWRMaXN0XSwgLyoqIEBsZW5kcyBjcm0uVmlld3MuUmlnaHREcmF3ZXIjICove1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGNsczogJyBjb250ZXh0dWFsQ29udGVudCcsXHJcbiAgcm93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImFjY29yZGlvbi1oZWFkZXIgbGlzdC1jb250ZW50XCIgcm9sZT1cInByZXNlbnRhdGlvblwiPicsXHJcbiAgICAnPGEgZGF0YS1hY3Rpb249XCJ7JT0gJC5hY3Rpb24gJX1cIicsXHJcbiAgICAneyUgaWYoJC5kYXRhUHJvcHMpIHsgJX0nLFxyXG4gICAgJ3slIGZvcih2YXIgcHJvcCBpbiAkLmRhdGFQcm9wcykgeyAlfScsXHJcbiAgICAnIGRhdGEteyU9IHByb3AgJX09XCJ7JT0gJC5kYXRhUHJvcHNbcHJvcF0gJX1cIicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPicsXHJcbiAgICAnPHNwYW4+eyU6ICQudGl0bGUgJX08L3NwYW4+PC9hPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdyaWdodF9kcmF3ZXInLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBjdXN0b21pemF0aW9uU2V0OiAncmlnaHRfZHJhd2VyJyxcclxuICBlbmFibGVQdWxsVG9SZWZyZXNoOiBmYWxzZSxcclxuICBkYXRhUHJvcHM6IG51bGwsXHJcbiAgcGFnZVNpemU6IDEwMCxcclxuXHJcbiAgaGFzTW9yZURhdGE6IGZ1bmN0aW9uIGhhc01vcmVEYXRhKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGb3JFbnRyeTogZnVuY3Rpb24gZ2V0R3JvdXBGb3JFbnRyeSgpIHt9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jb25uZWN0KEFwcCwgJ29uUmVnaXN0ZXJlZCcsIHRoaXMuX29uUmVnaXN0ZXJlZCk7XHJcbiAgfSxcclxuICBpbml0U29obzogZnVuY3Rpb24gaW5pdFNvaG8oKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0U29obywgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuYWNjb3JkaW9uLmVsZW1lbnQub24oJ3NlbGVjdGVkJywgKGV2dCwgaGVhZGVyKSA9PiB7XHJcbiAgICAgIC8vIEZpeCB1cCB0aGUgZXZlbnQgdGFyZ2V0IHRvIHRoZSBlbGVtZW50IHdpdGggb3VyIGRhdGEtYWN0aW9uIGF0dHJpYnV0ZS5cclxuICAgICAgZXZ0LnRhcmdldCA9ICQoJ2EnLCBoZWFkZXIpLmdldCgwKTtcclxuICAgICAgdGhpcy5faW5pdGlhdGVBY3Rpb25Gcm9tRXZlbnQoZXZ0KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2V0TGF5b3V0OiBmdW5jdGlvbiBzZXRMYXlvdXQobGF5b3V0KSB7XHJcbiAgICB0aGlzLmxheW91dCA9IGxheW91dDtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8IFtdO1xyXG4gIH0sXHJcbiAgY3JlYXRlU3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xyXG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5fY3JlYXRlQ3VzdG9taXplZExheW91dCh0aGlzLmNyZWF0ZUxheW91dCgpKTtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheW91dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBzZWN0aW9uID0gbGF5b3V0W2ldLmNoaWxkcmVuO1xyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWN0aW9uLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gc2VjdGlvbltqXTtcclxuXHJcbiAgICAgICAgaWYgKHJvdy5zZWN1cml0eSAmJiAhQXBwLmhhc0FjY2Vzc1RvKHJvdy5zZWN1cml0eSkpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucXVlcnkgIT09ICdmdW5jdGlvbicgfHwgdGhpcy5xdWVyeShyb3cpKSB7XHJcbiAgICAgICAgICBsaXN0LnB1c2gocm93KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBNZW1vcnkoe1xyXG4gICAgICBkYXRhOiBsaXN0LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbiAgfSxcclxuICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChjbGVhciwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuc3RvcmUgPSBudWxsO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogT3ZlcnJpZGUgdGhlIExpc3QgcmVmcmVzaCB0byBhbHNvIGNsZWFyIHRoZSB2aWV3IChzb21ldGhpbmcgdGhlIGJlZm9yZVRyYW5zaXRpb25UbyBoYW5kbGVzLCBidXQgd2UgYXJlIG5vdCB1c2luZylcclxuICAgKi9cclxuICByZWZyZXNoOiBmdW5jdGlvbiByZWZyZXNoKCkge1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xyXG4gIH0sXHJcbiAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcclxuICAgIGlmICh0aGlzLm9uU2hvdyh0aGlzKSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH0sXHJcbiAgX29uUmVnaXN0ZXJlZDogZnVuY3Rpb24gX29uUmVnaXN0ZXJlZCgpIHtcclxuICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==