define('crm/reducers/config', ['exports', '../actions/config'], function (exports, _config) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.config = config;


  // TODO: Refactor the settings passed into the app to use these instead.
  var initialConfigState = {
    connections: null,
    endpoint: '',
    maxUploadFileSize: 40000000,
    enableUpdateNotification: false,
    enableMultiCurrency: false,
    enableGroups: true,
    enableHashTags: true,
    enableConcurrencyCheck: false,
    enableOfflineSupport: false,
    warehouseDiscovery: 'auto',
    enableMingle: false,
    mingleSettings: null,
    mingleRedirectUrl: ''
  }; /* Copyright 2017 Infor
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

  function config() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialConfigState;
    var action = arguments[1];
    var type = action.type,
        payload = action.payload,
        error = action.error,
        meta = action.meta;
    // eslint-disable-line
    switch (type) {
      case _config.SET_CONFIG:
        return Object.assign({}, state, payload.config);
      case _config.SET_ENDPOINT:
        return Object.assign({}, state, {
          endpoint: payload.url
        });
      default:
        return state;
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9jb25maWcuanMiXSwibmFtZXMiOlsiY29uZmlnIiwiaW5pdGlhbENvbmZpZ1N0YXRlIiwiY29ubmVjdGlvbnMiLCJlbmRwb2ludCIsIm1heFVwbG9hZEZpbGVTaXplIiwiZW5hYmxlVXBkYXRlTm90aWZpY2F0aW9uIiwiZW5hYmxlTXVsdGlDdXJyZW5jeSIsImVuYWJsZUdyb3VwcyIsImVuYWJsZUhhc2hUYWdzIiwiZW5hYmxlQ29uY3VycmVuY3lDaGVjayIsImVuYWJsZU9mZmxpbmVTdXBwb3J0Iiwid2FyZWhvdXNlRGlzY292ZXJ5IiwiZW5hYmxlTWluZ2xlIiwibWluZ2xlU2V0dGluZ3MiLCJtaW5nbGVSZWRpcmVjdFVybCIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsInBheWxvYWQiLCJlcnJvciIsIm1ldGEiLCJPYmplY3QiLCJhc3NpZ24iLCJ1cmwiXSwibWFwcGluZ3MiOiI7Ozs7VUFrQ2dCQSxNLEdBQUFBLE07OztBQWpCaEI7QUFDQSxNQUFNQyxxQkFBcUI7QUFDekJDLGlCQUFhLElBRFk7QUFFekJDLGNBQVUsRUFGZTtBQUd6QkMsdUJBQW1CLFFBSE07QUFJekJDLDhCQUEwQixLQUpEO0FBS3pCQyx5QkFBcUIsS0FMSTtBQU16QkMsa0JBQWMsSUFOVztBQU96QkMsb0JBQWdCLElBUFM7QUFRekJDLDRCQUF3QixLQVJDO0FBU3pCQywwQkFBc0IsS0FURztBQVV6QkMsd0JBQW9CLE1BVks7QUFXekJDLGtCQUFjLEtBWFc7QUFZekJDLG9CQUFnQixJQVpTO0FBYXpCQyx1QkFBbUI7QUFiTSxHQUEzQixDLENBbEJBOzs7Ozs7Ozs7Ozs7Ozs7QUFrQ08sV0FBU2QsTUFBVCxHQUFvRDtBQUFBLFFBQXBDZSxLQUFvQyx1RUFBNUJkLGtCQUE0QjtBQUFBLFFBQVJlLE1BQVE7QUFBQSxRQUNqREMsSUFEaUQsR0FDbEJELE1BRGtCLENBQ2pEQyxJQURpRDtBQUFBLFFBQzNDQyxPQUQyQyxHQUNsQkYsTUFEa0IsQ0FDM0NFLE9BRDJDO0FBQUEsUUFDbENDLEtBRGtDLEdBQ2xCSCxNQURrQixDQUNsQ0csS0FEa0M7QUFBQSxRQUMzQkMsSUFEMkIsR0FDbEJKLE1BRGtCLENBQzNCSSxJQUQyQjtBQUNWO0FBQy9DLFlBQVFILElBQVI7QUFDRTtBQUNFLGVBQU9JLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCUCxLQUFsQixFQUF5QkcsUUFBUWxCLE1BQWpDLENBQVA7QUFDRjtBQUNFLGVBQU9xQixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQlAsS0FBbEIsRUFBeUI7QUFDOUJaLG9CQUFVZSxRQUFRSztBQURZLFNBQXpCLENBQVA7QUFHRjtBQUNFLGVBQU9SLEtBQVA7QUFSSjtBQVVEIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IFNFVF9DT05GSUcsIFNFVF9FTkRQT0lOVCB9IGZyb20gJy4uL2FjdGlvbnMvY29uZmlnJztcclxuXHJcbi8vIFRPRE86IFJlZmFjdG9yIHRoZSBzZXR0aW5ncyBwYXNzZWQgaW50byB0aGUgYXBwIHRvIHVzZSB0aGVzZSBpbnN0ZWFkLlxyXG5jb25zdCBpbml0aWFsQ29uZmlnU3RhdGUgPSB7XHJcbiAgY29ubmVjdGlvbnM6IG51bGwsXHJcbiAgZW5kcG9pbnQ6ICcnLFxyXG4gIG1heFVwbG9hZEZpbGVTaXplOiA0MDAwMDAwMCxcclxuICBlbmFibGVVcGRhdGVOb3RpZmljYXRpb246IGZhbHNlLFxyXG4gIGVuYWJsZU11bHRpQ3VycmVuY3k6IGZhbHNlLFxyXG4gIGVuYWJsZUdyb3VwczogdHJ1ZSxcclxuICBlbmFibGVIYXNoVGFnczogdHJ1ZSxcclxuICBlbmFibGVDb25jdXJyZW5jeUNoZWNrOiBmYWxzZSxcclxuICBlbmFibGVPZmZsaW5lU3VwcG9ydDogZmFsc2UsXHJcbiAgd2FyZWhvdXNlRGlzY292ZXJ5OiAnYXV0bycsXHJcbiAgZW5hYmxlTWluZ2xlOiBmYWxzZSxcclxuICBtaW5nbGVTZXR0aW5nczogbnVsbCxcclxuICBtaW5nbGVSZWRpcmVjdFVybDogJycsXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnKHN0YXRlID0gaW5pdGlhbENvbmZpZ1N0YXRlLCBhY3Rpb24pIHtcclxuICBjb25zdCB7IHR5cGUsIHBheWxvYWQsIGVycm9yLCBtZXRhIH0gPSBhY3Rpb247IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgIGNhc2UgU0VUX0NPTkZJRzpcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBwYXlsb2FkLmNvbmZpZyk7XHJcbiAgICBjYXNlIFNFVF9FTkRQT0lOVDpcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgZW5kcG9pbnQ6IHBheWxvYWQudXJsLFxyXG4gICAgICB9KTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn1cclxuIl19