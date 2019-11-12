define('crm/actions/config', ['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setConfig = setConfig;
  exports.setEndPoint = setEndPoint;
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
  var SET_CONFIG = exports.SET_CONFIG = 'SET_CONFIG';
  var SET_ENDPOINT = exports.SET_ENDPOINT = 'SET_ENDPOINT';

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
  function setConfig(config) {
    return {
      type: SET_CONFIG,
      payload: {
        config: config
      }
    };
  }

  function setEndPoint(url) {
    return {
      type: SET_ENDPOINT,
      payload: {
        url: url
      }
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2NvbmZpZy5qcyJdLCJuYW1lcyI6WyJzZXRDb25maWciLCJzZXRFbmRQb2ludCIsIlNFVF9DT05GSUciLCJTRVRfRU5EUE9JTlQiLCJjb25maWciLCJ0eXBlIiwicGF5bG9hZCIsInVybCJdLCJtYXBwaW5ncyI6Ijs7OztVQXFDZ0JBLFMsR0FBQUEsUztVQVNBQyxXLEdBQUFBLFc7QUE5Q2hCOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTtBQUNPLE1BQU1DLGtDQUFhLFlBQW5CO0FBQ0EsTUFBTUMsc0NBQWUsY0FBckI7O0FBRVA7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBO0FBQ08sV0FBU0gsU0FBVCxDQUFtQkksTUFBbkIsRUFBMkI7QUFDaEMsV0FBTztBQUNMQyxZQUFNSCxVQUREO0FBRUxJLGVBQVM7QUFDUEY7QUFETztBQUZKLEtBQVA7QUFNRDs7QUFFTSxXQUFTSCxXQUFULENBQXFCTSxHQUFyQixFQUEwQjtBQUMvQixXQUFPO0FBQ0xGLFlBQU1GLFlBREQ7QUFFTEcsZUFBUztBQUNQQztBQURPO0FBRkosS0FBUDtBQU1EIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vIGFjdGlvbiBUeXBlc1xyXG5leHBvcnQgY29uc3QgU0VUX0NPTkZJRyA9ICdTRVRfQ09ORklHJztcclxuZXhwb3J0IGNvbnN0IFNFVF9FTkRQT0lOVCA9ICdTRVRfRU5EUE9JTlQnO1xyXG5cclxuLypcclxuXHJcblNlZTogaHR0cHM6Ly9naXRodWIuY29tL2FjZGxpdGUvZmx1eC1zdGFuZGFyZC1hY3Rpb25cclxuXHJcbkFuIGFjdGlvbiBNVVNUXHJcbisgYmUgYSBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdC5cclxuKyBoYXZlIGEgdHlwZSBwcm9wZXJ0eS5cclxuXHJcbiBBbiBhY3Rpb24gTUFZXHJcbisgaGF2ZSBhbiBlcnJvciBwcm9wZXJ0eS5cclxuKyBoYXZlIGEgcGF5bG9hZCBwcm9wZXJ0eS5cclxuKyBoYXZlIGEgbWV0YSBwcm9wZXJ0eS5cclxuXHJcbkFuIGFjdGlvbiBNVVNUIE5PVFxyXG4rIGluY2x1ZGUgcHJvcGVydGllcyBvdGhlciB0aGFuIHR5cGUsIHBheWxvYWQsIGVycm9yLCBhbmQgbWV0YS5cclxuKi9cclxuXHJcbi8vIGNyZWF0b3JzXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRDb25maWcoY29uZmlnKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFNFVF9DT05GSUcsXHJcbiAgICBwYXlsb2FkOiB7XHJcbiAgICAgIGNvbmZpZyxcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEVuZFBvaW50KHVybCkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBTRVRfRU5EUE9JTlQsXHJcbiAgICBwYXlsb2FkOiB7XHJcbiAgICAgIHVybCxcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iXX0=