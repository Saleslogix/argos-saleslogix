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

  /**
   * @class crm.Views.SelectList
   *
   *
   * @extends argos.List
   *
   */
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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9TZWxlY3RMaXN0LmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImlkIiwiZXhwb3NlIiwiZW5hYmxlUHVsbFRvUmVmcmVzaCIsImlzQ2FyZFZpZXciLCJyZWZyZXNoUmVxdWlyZWRGb3IiLCJvcHRpb25zIiwiZGF0YSIsImhhc01vcmVEYXRhIiwicmVxdWVzdERhdGEiLCJzdG9yZSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNyZWF0ZVN0b3JlIiwiZXhwYW5kRXhwcmVzc2lvbiIsIiRyZXNvdXJjZXMiLCJpZFByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTs7Ozs7OztBQU9BLE1BQU1BLFVBQVUsdUJBQVEsc0JBQVIsRUFBZ0MsZ0JBQWhDLEVBQXdDO0FBQ3REO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QixzREFEeUIsQ0FBYixDQUZ3Qzs7QUFNdEQ7QUFDQUMsUUFBSSxhQVBrRDtBQVF0REMsWUFBUSxLQVI4QztBQVN0REMseUJBQXFCLEtBVGlDO0FBVXREQyxnQkFBWSxLQVYwQztBQVd0REMsd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCQyxPQUE1QixFQUFxQztBQUN2RCxVQUFJLEtBQUtBLE9BQVQsRUFBa0I7QUFDaEIsZUFBT0EsVUFBVyxLQUFLQSxPQUFMLENBQWFDLElBQWIsS0FBc0JELFFBQVFDLElBQXpDLEdBQWlELEtBQXhEO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRCxLQWhCcUQ7QUFpQnREQyxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQ2xDLGFBQU8sS0FBUDtBQUNELEtBbkJxRDtBQW9CdERDLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsV0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxXQUFLQyxTQUFMLENBQWVDLFNBQWY7QUFDRCxLQXZCcUQ7QUF3QnREQyxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQ2xDO0FBQ0EsVUFBTU4sT0FBTyxLQUFLTyxnQkFBTCxDQUFzQixLQUFLUixPQUFMLElBQWdCLEtBQUtBLE9BQUwsQ0FBYUMsSUFBN0IsSUFBcUMsS0FBS0QsT0FBTCxDQUFhQyxJQUFiLENBQWtCUSxVQUE3RSxDQUFiO0FBQ0EsVUFBTUwsUUFBUSxxQkFBVztBQUN2Qkg7QUFEdUIsT0FBWCxDQUFkO0FBR0FHLFlBQU1NLFVBQU4sR0FBbUIsTUFBbkI7QUFDQSxhQUFPTixLQUFQO0FBQ0Q7QUFoQ3FELEdBQXhDLENBQWhCLEMsQ0ExQkE7Ozs7Ozs7Ozs7Ozs7OztvQkE2RGVaLE8iLCJmaWxlIjoiU2VsZWN0TGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBNZW1vcnkgZnJvbSAnZG9qby9zdG9yZS9NZW1vcnknO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlNlbGVjdExpc3RcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5TZWxlY3RMaXN0JywgW0xpc3RdLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLiRkZXNjcmlwdG9yICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnc2VsZWN0X2xpc3QnLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgZW5hYmxlUHVsbFRvUmVmcmVzaDogZmFsc2UsXHJcbiAgaXNDYXJkVmlldzogZmFsc2UsXHJcbiAgcmVmcmVzaFJlcXVpcmVkRm9yOiBmdW5jdGlvbiByZWZyZXNoUmVxdWlyZWRGb3Iob3B0aW9ucykge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucyA/ICh0aGlzLm9wdGlvbnMuZGF0YSAhPT0gb3B0aW9ucy5kYXRhKSA6IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBoYXNNb3JlRGF0YTogZnVuY3Rpb24gaGFzTW9yZURhdGEoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XHJcbiAgICB0aGlzLnN0b3JlID0gbnVsbDtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBjcmVhdGVTdG9yZTogZnVuY3Rpb24gY3JlYXRlU3RvcmUoKSB7XHJcbiAgICAvLyBjYWxsZXIgaXMgcmVzcG9uc2libGUgZm9yIHBhc3NpbmcgaW4gYSB3ZWxsLXN0cnVjdHVyZWQgZmVlZCBvYmplY3QuXHJcbiAgICBjb25zdCBkYXRhID0gdGhpcy5leHBhbmRFeHByZXNzaW9uKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZGF0YSAmJiB0aGlzLm9wdGlvbnMuZGF0YS4kcmVzb3VyY2VzKTtcclxuICAgIGNvbnN0IHN0b3JlID0gbmV3IE1lbW9yeSh7XHJcbiAgICAgIGRhdGEsXHJcbiAgICB9KTtcclxuICAgIHN0b3JlLmlkUHJvcGVydHkgPSAnJGtleSc7XHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=