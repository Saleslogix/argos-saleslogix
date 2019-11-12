define("crm/polyfills/nodelist", ["exports"], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nodelist = nodelist;
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

  // Polyfill for nodelist support on IE
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
  function nodelist() {
    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, argument) {
        // eslint-disable-line
        argument = argument || window;
        for (var i = 0; i < this.length; i++) {
          callback.call(argument, this[i], i, this);
        }
      };
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wb2x5ZmlsbHMvbm9kZWxpc3QuanMiXSwibmFtZXMiOlsibm9kZWxpc3QiLCJ3aW5kb3ciLCJOb2RlTGlzdCIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsYmFjayIsImFyZ3VtZW50IiwiaSIsImxlbmd0aCIsImNhbGwiXSwibWFwcGluZ3MiOiI7Ozs7VUFpQmdCQSxRLEdBQUFBLFE7QUFqQmhCOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTtBQUNBO0FBQ08sV0FBU0EsUUFBVCxHQUFvQjtBQUN6QixRQUFJQyxPQUFPQyxRQUFQLElBQW1CLENBQUNBLFNBQVNDLFNBQVQsQ0FBbUJDLE9BQTNDLEVBQW9EO0FBQ2xERixlQUFTQyxTQUFULENBQW1CQyxPQUFuQixHQUE2QixVQUFVQyxRQUFWLEVBQW9CQyxRQUFwQixFQUE4QjtBQUFFO0FBQzNEQSxtQkFBV0EsWUFBWUwsTUFBdkI7QUFDQSxhQUFLLElBQUlNLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLQyxNQUF6QixFQUFpQ0QsR0FBakMsRUFBc0M7QUFDcENGLG1CQUFTSSxJQUFULENBQWNILFFBQWQsRUFBd0IsS0FBS0MsQ0FBTCxDQUF4QixFQUFpQ0EsQ0FBakMsRUFBb0MsSUFBcEM7QUFDRDtBQUNGLE9BTEQ7QUFNRDtBQUNGIiwiZmlsZSI6Im5vZGVsaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLy8gUG9seWZpbGwgZm9yIG5vZGVsaXN0IHN1cHBvcnQgb24gSUVcclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05vZGVMaXN0L2ZvckVhY2hcclxuZXhwb3J0IGZ1bmN0aW9uIG5vZGVsaXN0KCkge1xyXG4gIGlmICh3aW5kb3cuTm9kZUxpc3QgJiYgIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoKSB7XHJcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgYXJndW1lbnQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICBhcmd1bWVudCA9IGFyZ3VtZW50IHx8IHdpbmRvdztcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbChhcmd1bWVudCwgdGhpc1tpXSwgaSwgdGhpcyk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==