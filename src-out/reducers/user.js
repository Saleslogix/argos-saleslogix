define('crm/reducers/user', ['exports', '../actions/user'], function (exports, _user) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.user = user;


  var initialUserState = null; /* Copyright 2017 Infor
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

  function user() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialUserState;
    var action = arguments[1];
    var type = action.type,
        payload = action.payload,
        error = action.error,
        meta = action.meta;
    // eslint-disable-line
    switch (type) {
      case _user.SET_USER:
        return Object.assign({}, state, payload.entry);
      default:
        return state;
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy91c2VyLmpzIl0sIm5hbWVzIjpbInVzZXIiLCJpbml0aWFsVXNlclN0YXRlIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicGF5bG9hZCIsImVycm9yIiwibWV0YSIsIk9iamVjdCIsImFzc2lnbiIsImVudHJ5Il0sIm1hcHBpbmdzIjoiOzs7O1VBbUJnQkEsSSxHQUFBQSxJOzs7QUFGaEIsTUFBTUMsbUJBQW1CLElBQXpCLEMsQ0FqQkE7Ozs7Ozs7Ozs7Ozs7OztBQW1CTyxXQUFTRCxJQUFULEdBQWdEO0FBQUEsUUFBbENFLEtBQWtDLHVFQUExQkQsZ0JBQTBCO0FBQUEsUUFBUkUsTUFBUTtBQUFBLFFBQzdDQyxJQUQ2QyxHQUNkRCxNQURjLENBQzdDQyxJQUQ2QztBQUFBLFFBQ3ZDQyxPQUR1QyxHQUNkRixNQURjLENBQ3ZDRSxPQUR1QztBQUFBLFFBQzlCQyxLQUQ4QixHQUNkSCxNQURjLENBQzlCRyxLQUQ4QjtBQUFBLFFBQ3ZCQyxJQUR1QixHQUNkSixNQURjLENBQ3ZCSSxJQUR1QjtBQUNOO0FBQy9DLFlBQVFILElBQVI7QUFDRTtBQUNFLGVBQU9JLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCUCxLQUFsQixFQUF5QkcsUUFBUUssS0FBakMsQ0FBUDtBQUNGO0FBQ0UsZUFBT1IsS0FBUDtBQUpKO0FBTUQiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IFNFVF9VU0VSIH0gZnJvbSAnLi4vYWN0aW9ucy91c2VyJztcclxuXHJcbmNvbnN0IGluaXRpYWxVc2VyU3RhdGUgPSBudWxsO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZXIoc3RhdGUgPSBpbml0aWFsVXNlclN0YXRlLCBhY3Rpb24pIHtcclxuICBjb25zdCB7IHR5cGUsIHBheWxvYWQsIGVycm9yLCBtZXRhIH0gPSBhY3Rpb247IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgIGNhc2UgU0VUX1VTRVI6XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgcGF5bG9hZC5lbnRyeSk7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG59XHJcbiJdfQ==