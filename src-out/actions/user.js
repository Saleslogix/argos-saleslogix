define('crm/actions/user', ['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setUser = setUser;
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

  // action Types
  var SET_USER = exports.SET_USER = 'SET_USER';

  /*
  
  See: https://github.com/acdlite/flux-standard-action
  
  An action MUST
  + be a plain JavaScript object.
  + have a type property.
  
   An action MAY
  + have an error property.
  + have a payload property.
  + have a meta property.
  
  An action MUST NOT
  + include properties other than type, payload, error, and meta.
  */

  // creators
  function setUser(entry) {
    return {
      type: SET_USER,
      payload: {
        entry: entry
      }
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3VzZXIuanMiXSwibmFtZXMiOlsic2V0VXNlciIsIlNFVF9VU0VSIiwiZW50cnkiLCJ0eXBlIiwicGF5bG9hZCJdLCJtYXBwaW5ncyI6Ijs7OztVQW9DZ0JBLE8sR0FBQUEsTztBQXBDaEI7Ozs7Ozs7Ozs7Ozs7OztBQWVBO0FBQ08sTUFBTUMsOEJBQVcsVUFBakI7O0FBRVA7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBO0FBQ08sV0FBU0QsT0FBVCxDQUFpQkUsS0FBakIsRUFBd0I7QUFDN0IsV0FBTztBQUNMQyxZQUFNRixRQUREO0FBRUxHLGVBQVM7QUFDUEY7QUFETztBQUZKLEtBQVA7QUFNRCIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLy8gYWN0aW9uIFR5cGVzXHJcbmV4cG9ydCBjb25zdCBTRVRfVVNFUiA9ICdTRVRfVVNFUic7XHJcblxyXG4vKlxyXG5cclxuU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYWNkbGl0ZS9mbHV4LXN0YW5kYXJkLWFjdGlvblxyXG5cclxuQW4gYWN0aW9uIE1VU1RcclxuKyBiZSBhIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0LlxyXG4rIGhhdmUgYSB0eXBlIHByb3BlcnR5LlxyXG5cclxuIEFuIGFjdGlvbiBNQVlcclxuKyBoYXZlIGFuIGVycm9yIHByb3BlcnR5LlxyXG4rIGhhdmUgYSBwYXlsb2FkIHByb3BlcnR5LlxyXG4rIGhhdmUgYSBtZXRhIHByb3BlcnR5LlxyXG5cclxuQW4gYWN0aW9uIE1VU1QgTk9UXHJcbisgaW5jbHVkZSBwcm9wZXJ0aWVzIG90aGVyIHRoYW4gdHlwZSwgcGF5bG9hZCwgZXJyb3IsIGFuZCBtZXRhLlxyXG4qL1xyXG5cclxuLy8gY3JlYXRvcnNcclxuZXhwb3J0IGZ1bmN0aW9uIHNldFVzZXIoZW50cnkpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogU0VUX1VTRVIsXHJcbiAgICBwYXlsb2FkOiB7XHJcbiAgICAgIGVudHJ5LFxyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiJdfQ==