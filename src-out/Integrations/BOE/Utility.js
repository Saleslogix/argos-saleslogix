define('crm/Integrations/BOE/Utility', ['module', 'exports', 'dojo/_base/lang', 'argos/Models/Adapter', './Models/Names', '../../Format'], function (module, exports, _lang, _Adapter, _Names, _Format) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _Adapter2 = _interopRequireDefault(_Adapter);

  var _Names2 = _interopRequireDefault(_Names);

  var _Format2 = _interopRequireDefault(_Format);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Integrations.BOE.Utility
   * @classdesc Utility provides functions that are more javascript enhancers than application related code.
   * @singleton
   *
   */
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

  var __class = _lang2.default.setObject('crm.Integrations.BOE.Utility', /** @lends crm.Integrations.BOE.Utility */{
    // Lookup table for the aggregate functions used by DashboardWidget
    aggregateLookup: {
      calcProfit: function calcProfit(fn, widget, data) {
        var revenue = data[0];
        var cost = data[1];

        return fn.call(widget, revenue, cost);
      },
      calcMargin: function calcMargin(fn, widget, data) {
        var revenue = data[0];
        var cost = data[1];

        return fn.call(widget, revenue, cost);
      },
      calcYoYRevenue: function calcYoYRevenue(fn, widget, data) {
        var pastYear = data[0];
        var between = data[1];

        return fn.call(widget, pastYear, between);
      },
      calcYoYProfit: function calcYoYProfit(fn, widget, data) {
        return fn.call(widget, data[0], data[2], data[1], data[3]);
      },
      calcYoYMargin: function calcYoYMargin(fn, widget, data) {
        return fn.call(widget, data[0], data[2], data[1], data[3]);
      },
      sum: function sum(fn, widget, data) {
        return fn.call(widget, data);
      }
    },
    /**
     * @params
     * mappedLookups: Array of lookup names that must match the model names
     * mappedProperties: Array of the properties on the entry with the searched id
     * fields: Array of field names from the edit view
     * scope: 'this' of the edit view
     * @return
     * Returns a promise that is resolved once all entries are returned
     */
    setFieldsFromIds: function setFieldsFromIds() {
      var mappedLookups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var mappedProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var scope = arguments[3];
      var entry = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var promises = [];
      fields.forEach(function (f, index) {
        var temp = scope.options.entry ? scope.options.entry[f] : null;
        var value = entry[f] || scope.entry[f] || temp;
        if (!value) {
          return;
        }
        var model = _Adapter2.default.getModel(_Names2.default[mappedLookups[index].toUpperCase()]);
        if (!model) {
          console.warn('Unable to locate model for ' + f); // eslint-disable-line
          return;
        }
        model.init();
        var options = {
          async: false,
          queryModelName: 'detail',
          query: mappedProperties[index] + ' eq "' + value + '"'
        };
        var promise = model.getEntries(null, options);
        promises.push(promise);
        promise.then(function (entries) {
          var returned = entries[0];
          if (returned) {
            scope.fields[mappedLookups[index]].setSelection(returned);
            scope.fields[mappedLookups[index]].onChange(scope.fields[mappedLookups[index]].currentSelection, scope.fields[mappedLookups[index]]);
          }
        });
      });
      return Promise.all(promises);
    },
    formatMultiCurrency: function formatMultiCurrency(val, currencyCode) {
      var result = null;
      var tempVal = val || 0;
      if (App.hasMultiCurrency() && currencyCode) {
        result = _Format2.default.multiCurrency.call(null, tempVal, currencyCode);
      } else {
        result = _Format2.default.currency.call(null, tempVal);
      }
      return result || '';
    },
    getBaseCurrencyCode: function getBaseCurrencyCode() {
      if (App.context && App.context.systemOptions && App.context.systemOptions.BaseCurrency) {
        var results = App.context.systemOptions.BaseCurrency;
        return results;
      }

      return '';
    }
  });

  _lang2.default.setObject('icboe.Utility', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1V0aWxpdHkuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsInNldE9iamVjdCIsImFnZ3JlZ2F0ZUxvb2t1cCIsImNhbGNQcm9maXQiLCJmbiIsIndpZGdldCIsImRhdGEiLCJyZXZlbnVlIiwiY29zdCIsImNhbGwiLCJjYWxjTWFyZ2luIiwiY2FsY1lvWVJldmVudWUiLCJwYXN0WWVhciIsImJldHdlZW4iLCJjYWxjWW9ZUHJvZml0IiwiY2FsY1lvWU1hcmdpbiIsInN1bSIsInNldEZpZWxkc0Zyb21JZHMiLCJtYXBwZWRMb29rdXBzIiwibWFwcGVkUHJvcGVydGllcyIsImZpZWxkcyIsInNjb3BlIiwiZW50cnkiLCJwcm9taXNlcyIsImZvckVhY2giLCJmIiwiaW5kZXgiLCJ0ZW1wIiwib3B0aW9ucyIsInZhbHVlIiwibW9kZWwiLCJnZXRNb2RlbCIsInRvVXBwZXJDYXNlIiwiY29uc29sZSIsIndhcm4iLCJpbml0IiwiYXN5bmMiLCJxdWVyeU1vZGVsTmFtZSIsInF1ZXJ5IiwicHJvbWlzZSIsImdldEVudHJpZXMiLCJwdXNoIiwidGhlbiIsImVudHJpZXMiLCJyZXR1cm5lZCIsInNldFNlbGVjdGlvbiIsIm9uQ2hhbmdlIiwiY3VycmVudFNlbGVjdGlvbiIsIlByb21pc2UiLCJhbGwiLCJmb3JtYXRNdWx0aUN1cnJlbmN5IiwidmFsIiwiY3VycmVuY3lDb2RlIiwicmVzdWx0IiwidGVtcFZhbCIsIkFwcCIsImhhc011bHRpQ3VycmVuY3kiLCJtdWx0aUN1cnJlbmN5IiwiY3VycmVuY3kiLCJnZXRCYXNlQ3VycmVuY3lDb2RlIiwiY29udGV4dCIsInN5c3RlbU9wdGlvbnMiLCJCYXNlQ3VycmVuY3kiLCJyZXN1bHRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7Ozs7QUFwQkE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxVQUFVLGVBQUtDLFNBQUwsQ0FBZSw4QkFBZixF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QUFDRCxPQUZELE1BRU87QUFDTEMsaUJBQVMsaUJBQU9LLFFBQVAsQ0FBZ0JqRCxJQUFoQixDQUFxQixJQUFyQixFQUEyQjZDLE9BQTNCLENBQVQ7QUFDRDtBQUNELGFBQU9ELFVBQVUsRUFBakI7QUFDRCxLQWhGc0c7QUFpRnZHTSx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsVUFBSUosSUFBSUssT0FBSixJQUFlTCxJQUFJSyxPQUFKLENBQVlDLGFBQTNCLElBQTRDTixJQUFJSyxPQUFKLENBQVlDLGFBQVosQ0FBMEJDLFlBQTFFLEVBQXdGO0FBQ3RGLFlBQU1DLFVBQVVSLElBQUlLLE9BQUosQ0FBWUMsYUFBWixDQUEwQkMsWUFBMUM7QUFDQSxlQUFPQyxPQUFQO0FBQ0Q7O0FBRUQsYUFBTyxFQUFQO0FBQ0Q7QUF4RnNHLEdBQXpGLENBQWhCOztBQTJGQSxpQkFBSzlELFNBQUwsQ0FBZSxlQUFmLEVBQWdDRCxPQUFoQztvQkFDZUEsTyIsImZpbGUiOiJVdGlsaXR5LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IEFkYXB0ZXIgZnJvbSAnYXJnb3MvTW9kZWxzL0FkYXB0ZXInO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLlV0aWxpdHlcclxuICogQGNsYXNzZGVzYyBVdGlsaXR5IHByb3ZpZGVzIGZ1bmN0aW9ucyB0aGF0IGFyZSBtb3JlIGphdmFzY3JpcHQgZW5oYW5jZXJzIHRoYW4gYXBwbGljYXRpb24gcmVsYXRlZCBjb2RlLlxyXG4gKiBAc2luZ2xldG9uXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gbGFuZy5zZXRPYmplY3QoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlV0aWxpdHknLCAvKiogQGxlbmRzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLlV0aWxpdHkgKi97XHJcbiAgLy8gTG9va3VwIHRhYmxlIGZvciB0aGUgYWdncmVnYXRlIGZ1bmN0aW9ucyB1c2VkIGJ5IERhc2hib2FyZFdpZGdldFxyXG4gIGFnZ3JlZ2F0ZUxvb2t1cDoge1xyXG4gICAgY2FsY1Byb2ZpdDogZnVuY3Rpb24gY2FsY1Byb2ZpdChmbiwgd2lkZ2V0LCBkYXRhKSB7XHJcbiAgICAgIGNvbnN0IHJldmVudWUgPSBkYXRhWzBdO1xyXG4gICAgICBjb25zdCBjb3N0ID0gZGF0YVsxXTtcclxuXHJcbiAgICAgIHJldHVybiBmbi5jYWxsKHdpZGdldCwgcmV2ZW51ZSwgY29zdCk7XHJcbiAgICB9LFxyXG4gICAgY2FsY01hcmdpbjogZnVuY3Rpb24gY2FsY01hcmdpbihmbiwgd2lkZ2V0LCBkYXRhKSB7XHJcbiAgICAgIGNvbnN0IHJldmVudWUgPSBkYXRhWzBdO1xyXG4gICAgICBjb25zdCBjb3N0ID0gZGF0YVsxXTtcclxuXHJcbiAgICAgIHJldHVybiBmbi5jYWxsKHdpZGdldCwgcmV2ZW51ZSwgY29zdCk7XHJcbiAgICB9LFxyXG4gICAgY2FsY1lvWVJldmVudWU6IGZ1bmN0aW9uIGNhbGNZb1lSZXZlbnVlKGZuLCB3aWRnZXQsIGRhdGEpIHtcclxuICAgICAgY29uc3QgcGFzdFllYXIgPSBkYXRhWzBdO1xyXG4gICAgICBjb25zdCBiZXR3ZWVuID0gZGF0YVsxXTtcclxuXHJcbiAgICAgIHJldHVybiBmbi5jYWxsKHdpZGdldCwgcGFzdFllYXIsIGJldHdlZW4pO1xyXG4gICAgfSxcclxuICAgIGNhbGNZb1lQcm9maXQ6IGZ1bmN0aW9uIGNhbGNZb1lQcm9maXQoZm4sIHdpZGdldCwgZGF0YSkge1xyXG4gICAgICByZXR1cm4gZm4uY2FsbCh3aWRnZXQsIGRhdGFbMF0sIGRhdGFbMl0sIGRhdGFbMV0sIGRhdGFbM10pO1xyXG4gICAgfSxcclxuICAgIGNhbGNZb1lNYXJnaW46IGZ1bmN0aW9uIGNhbGNZb1lNYXJnaW4oZm4sIHdpZGdldCwgZGF0YSkge1xyXG4gICAgICByZXR1cm4gZm4uY2FsbCh3aWRnZXQsIGRhdGFbMF0sIGRhdGFbMl0sIGRhdGFbMV0sIGRhdGFbM10pO1xyXG4gICAgfSxcclxuICAgIHN1bTogZnVuY3Rpb24gc3VtKGZuLCB3aWRnZXQsIGRhdGEpIHtcclxuICAgICAgcmV0dXJuIGZuLmNhbGwod2lkZ2V0LCBkYXRhKTtcclxuICAgIH0sXHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW1zXHJcbiAgICogbWFwcGVkTG9va3VwczogQXJyYXkgb2YgbG9va3VwIG5hbWVzIHRoYXQgbXVzdCBtYXRjaCB0aGUgbW9kZWwgbmFtZXNcclxuICAgKiBtYXBwZWRQcm9wZXJ0aWVzOiBBcnJheSBvZiB0aGUgcHJvcGVydGllcyBvbiB0aGUgZW50cnkgd2l0aCB0aGUgc2VhcmNoZWQgaWRcclxuICAgKiBmaWVsZHM6IEFycmF5IG9mIGZpZWxkIG5hbWVzIGZyb20gdGhlIGVkaXQgdmlld1xyXG4gICAqIHNjb3BlOiAndGhpcycgb2YgdGhlIGVkaXQgdmlld1xyXG4gICAqIEByZXR1cm5cclxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIG9uY2UgYWxsIGVudHJpZXMgYXJlIHJldHVybmVkXHJcbiAgICovXHJcbiAgc2V0RmllbGRzRnJvbUlkczogZnVuY3Rpb24gc2V0RmllbGRzRnJvbUlkcyhtYXBwZWRMb29rdXBzID0gW10sIG1hcHBlZFByb3BlcnRpZXMgPSBbXSwgZmllbGRzID0gW10sIHNjb3BlLCBlbnRyeSA9IHt9KSB7XHJcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgZmllbGRzLmZvckVhY2goKGYsIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRlbXAgPSBzY29wZS5vcHRpb25zLmVudHJ5ID8gc2NvcGUub3B0aW9ucy5lbnRyeVtmXSA6IG51bGw7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gZW50cnlbZl0gfHwgc2NvcGUuZW50cnlbZl0gfHwgdGVtcDtcclxuICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBtb2RlbCA9IEFkYXB0ZXIuZ2V0TW9kZWwoTU9ERUxfTkFNRVNbbWFwcGVkTG9va3Vwc1tpbmRleF0udG9VcHBlckNhc2UoKV0pO1xyXG4gICAgICBpZiAoIW1vZGVsKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gbG9jYXRlIG1vZGVsIGZvciAnICsgZik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbW9kZWwuaW5pdCgpO1xyXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICBxdWVyeU1vZGVsTmFtZTogJ2RldGFpbCcsXHJcbiAgICAgICAgcXVlcnk6IGAke21hcHBlZFByb3BlcnRpZXNbaW5kZXhdfSBlcSBcIiR7dmFsdWV9XCJgLFxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBwcm9taXNlID0gbW9kZWwuZ2V0RW50cmllcyhudWxsLCBvcHRpb25zKTtcclxuICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKTtcclxuICAgICAgcHJvbWlzZS50aGVuKChlbnRyaWVzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmV0dXJuZWQgPSBlbnRyaWVzWzBdO1xyXG4gICAgICAgIGlmIChyZXR1cm5lZCkge1xyXG4gICAgICAgICAgc2NvcGUuZmllbGRzW21hcHBlZExvb2t1cHNbaW5kZXhdXS5zZXRTZWxlY3Rpb24ocmV0dXJuZWQpO1xyXG4gICAgICAgICAgc2NvcGUuZmllbGRzW21hcHBlZExvb2t1cHNbaW5kZXhdXS5vbkNoYW5nZShzY29wZS5maWVsZHNbbWFwcGVkTG9va3Vwc1tpbmRleF1dLmN1cnJlbnRTZWxlY3Rpb24sIHNjb3BlLmZpZWxkc1ttYXBwZWRMb29rdXBzW2luZGV4XV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcbiAgfSxcclxuICBmb3JtYXRNdWx0aUN1cnJlbmN5OiBmdW5jdGlvbiBmb3JtYXRNdWx0aUN1cnJlbmN5KHZhbCwgY3VycmVuY3lDb2RlKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuICAgIGNvbnN0IHRlbXBWYWwgPSB2YWwgfHwgMDtcclxuICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpICYmIGN1cnJlbmN5Q29kZSkge1xyXG4gICAgICByZXN1bHQgPSBmb3JtYXQubXVsdGlDdXJyZW5jeS5jYWxsKG51bGwsIHRlbXBWYWwsIGN1cnJlbmN5Q29kZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSBmb3JtYXQuY3VycmVuY3kuY2FsbChudWxsLCB0ZW1wVmFsKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQgfHwgJyc7XHJcbiAgfSxcclxuICBnZXRCYXNlQ3VycmVuY3lDb2RlOiBmdW5jdGlvbiBnZXRCYXNlQ3VycmVuY3lDb2RlKCkge1xyXG4gICAgaWYgKEFwcC5jb250ZXh0ICYmIEFwcC5jb250ZXh0LnN5c3RlbU9wdGlvbnMgJiYgQXBwLmNvbnRleHQuc3lzdGVtT3B0aW9ucy5CYXNlQ3VycmVuY3kpIHtcclxuICAgICAgY29uc3QgcmVzdWx0cyA9IEFwcC5jb250ZXh0LnN5c3RlbU9wdGlvbnMuQmFzZUN1cnJlbmN5O1xyXG4gICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVXRpbGl0eScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=