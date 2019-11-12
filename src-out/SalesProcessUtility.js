define('crm/SalesProcessUtility', ['module', 'exports', 'dojo/_base/lang', 'dojo/when', 'dojo/_base/Deferred', 'argos/Store/SData'], function (module, exports, _lang, _when, _Deferred, _SData) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _when2 = _interopRequireDefault(_when);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _SData2 = _interopRequireDefault(_SData);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.SalesProcessUtility
   * @singleton
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

  var __class = _lang2.default.setObject('crm.SalesProcessUtility', /** @lends crm.SalesProcessUtility */{
    store: null,
    service: null,
    contractName: 'dynamic',
    resourceKind: 'salesProcesses',
    queryInclude: ['$permissions'],
    querySelect: ['Name', 'EntityId'],
    queryOrderBy: '',
    queryWhere: '',
    maxItems: 100,

    getStore: function getStore() {
      if (!this.store) {
        this.store = this.createStore();
      }
      return this.store;
    },
    createStore: function createStore() {
      var options = this.getStoreOptions();
      var store = new _SData2.default(options);
      return store;
    },
    getStoreOptions: function getStoreOptions() {
      var options = {
        service: App.getService(false),
        contractName: this.contractName,
        resourceKind: this.resourceKind,
        include: this.queryInclude,
        select: this.querySelect,
        orderBy: this.queryOrderBy,
        where: this.queryWhere,
        start: 0,
        count: this.maxItems,
        scope: this
      };
      return options;
    },
    /**
     * Returns an promise with sales process entry.
     * @param {Object} options Options for creating the request
     * @param {String} entitiyId
     *
     */
    getSalesProcessByEntityId: function getSalesProcessByEntityId(entityId) {
      var deferred = new _Deferred2.default();
      var store = this.getStore();
      var options = {
        where: 'EntityId eq "' + entityId + '"'
      };
      var queryResults = store.query(null, options);
      (0, _when2.default)(queryResults, function (feed) {
        var salesProcess = null;
        if (feed && feed.length > 0) {
          salesProcess = feed[0];
        }
        deferred.resolve(salesProcess);
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TYWxlc1Byb2Nlc3NVdGlsaXR5LmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJzZXRPYmplY3QiLCJzdG9yZSIsInNlcnZpY2UiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJxdWVyeUluY2x1ZGUiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5V2hlcmUiLCJtYXhJdGVtcyIsImdldFN0b3JlIiwiY3JlYXRlU3RvcmUiLCJvcHRpb25zIiwiZ2V0U3RvcmVPcHRpb25zIiwiQXBwIiwiZ2V0U2VydmljZSIsImluY2x1ZGUiLCJzZWxlY3QiLCJvcmRlckJ5Iiwid2hlcmUiLCJzdGFydCIsImNvdW50Iiwic2NvcGUiLCJnZXRTYWxlc1Byb2Nlc3NCeUVudGl0eUlkIiwiZW50aXR5SWQiLCJkZWZlcnJlZCIsInF1ZXJ5UmVzdWx0cyIsInF1ZXJ5IiwiZmVlZCIsInNhbGVzUHJvY2VzcyIsImxlbmd0aCIsInJlc29sdmUiLCJlcnIiLCJyZWplY3QiLCJwcm9taXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7O0FBcEJBOzs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsVUFBVSxlQUFLQyxTQUFMLENBQWUseUJBQWYsRUFBMEMscUNBQXFDO0FBQzdGQyxXQUFPLElBRHNGO0FBRTdGQyxhQUFTLElBRm9GO0FBRzdGQyxrQkFBYyxTQUgrRTtBQUk3RkMsa0JBQWMsZ0JBSitFO0FBSzdGQyxrQkFBYyxDQUNaLGNBRFksQ0FMK0U7QUFRN0ZDLGlCQUFhLENBQUMsTUFBRCxFQUFTLFVBQVQsQ0FSZ0Y7QUFTN0ZDLGtCQUFjLEVBVCtFO0FBVTdGQyxnQkFBWSxFQVZpRjtBQVc3RkMsY0FBVSxHQVhtRjs7QUFhN0ZDLGNBQVUsU0FBU0EsUUFBVCxHQUFvQjtBQUM1QixVQUFJLENBQUMsS0FBS1QsS0FBVixFQUFpQjtBQUNmLGFBQUtBLEtBQUwsR0FBYSxLQUFLVSxXQUFMLEVBQWI7QUFDRDtBQUNELGFBQU8sS0FBS1YsS0FBWjtBQUNELEtBbEI0RjtBQW1CN0ZVLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsVUFBTUMsVUFBVSxLQUFLQyxlQUFMLEVBQWhCO0FBQ0EsVUFBTVosUUFBUSxvQkFBVVcsT0FBVixDQUFkO0FBQ0EsYUFBT1gsS0FBUDtBQUNELEtBdkI0RjtBQXdCN0ZZLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLFVBQU1ELFVBQVU7QUFDZFYsaUJBQVNZLElBQUlDLFVBQUosQ0FBZSxLQUFmLENBREs7QUFFZFosc0JBQWMsS0FBS0EsWUFGTDtBQUdkQyxzQkFBYyxLQUFLQSxZQUhMO0FBSWRZLGlCQUFTLEtBQUtYLFlBSkE7QUFLZFksZ0JBQVEsS0FBS1gsV0FMQztBQU1kWSxpQkFBUyxLQUFLWCxZQU5BO0FBT2RZLGVBQU8sS0FBS1gsVUFQRTtBQVFkWSxlQUFPLENBUk87QUFTZEMsZUFBTyxLQUFLWixRQVRFO0FBVWRhLGVBQU87QUFWTyxPQUFoQjtBQVlBLGFBQU9WLE9BQVA7QUFDRCxLQXRDNEY7QUF1QzdGOzs7Ozs7QUFNQVcsK0JBQTJCLFNBQVNBLHlCQUFULENBQW1DQyxRQUFuQyxFQUE2QztBQUN0RSxVQUFNQyxXQUFXLHdCQUFqQjtBQUNBLFVBQU14QixRQUFRLEtBQUtTLFFBQUwsRUFBZDtBQUNBLFVBQU1FLFVBQVU7QUFDZE8saUNBQXVCSyxRQUF2QjtBQURjLE9BQWhCO0FBR0EsVUFBTUUsZUFBZXpCLE1BQU0wQixLQUFOLENBQVksSUFBWixFQUFrQmYsT0FBbEIsQ0FBckI7QUFDQSwwQkFBS2MsWUFBTCxFQUFtQixVQUFDRSxJQUFELEVBQVU7QUFDM0IsWUFBSUMsZUFBZSxJQUFuQjtBQUNBLFlBQUlELFFBQVFBLEtBQUtFLE1BQUwsR0FBYyxDQUExQixFQUE2QjtBQUMzQkQseUJBQWVELEtBQUssQ0FBTCxDQUFmO0FBQ0Q7QUFDREgsaUJBQVNNLE9BQVQsQ0FBaUJGLFlBQWpCO0FBQ0QsT0FORCxFQU1HLFVBQUNHLEdBQUQsRUFBUztBQUNWUCxpQkFBU1EsTUFBVCxDQUFnQkQsR0FBaEI7QUFDRCxPQVJEO0FBU0EsYUFBT1AsU0FBU1MsT0FBaEI7QUFDRDtBQTlENEYsR0FBL0UsQ0FBaEI7b0JBZ0VlbkMsTyIsImZpbGUiOiJTYWxlc1Byb2Nlc3NVdGlsaXR5LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IHdoZW4gZnJvbSAnZG9qby93aGVuJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJ2Rvam8vX2Jhc2UvRGVmZXJyZWQnO1xyXG5pbXBvcnQgU0RhdGEgZnJvbSAnYXJnb3MvU3RvcmUvU0RhdGEnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uU2FsZXNQcm9jZXNzVXRpbGl0eVxyXG4gKiBAc2luZ2xldG9uXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gbGFuZy5zZXRPYmplY3QoJ2NybS5TYWxlc1Byb2Nlc3NVdGlsaXR5JywgLyoqIEBsZW5kcyBjcm0uU2FsZXNQcm9jZXNzVXRpbGl0eSAqL3tcclxuICBzdG9yZTogbnVsbCxcclxuICBzZXJ2aWNlOiBudWxsLFxyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ3NhbGVzUHJvY2Vzc2VzJyxcclxuICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICckcGVybWlzc2lvbnMnLFxyXG4gIF0sXHJcbiAgcXVlcnlTZWxlY3Q6IFsnTmFtZScsICdFbnRpdHlJZCddLFxyXG4gIHF1ZXJ5T3JkZXJCeTogJycsXHJcbiAgcXVlcnlXaGVyZTogJycsXHJcbiAgbWF4SXRlbXM6IDEwMCxcclxuXHJcbiAgZ2V0U3RvcmU6IGZ1bmN0aW9uIGdldFN0b3JlKCkge1xyXG4gICAgaWYgKCF0aGlzLnN0b3JlKSB7XHJcbiAgICAgIHRoaXMuc3RvcmUgPSB0aGlzLmNyZWF0ZVN0b3JlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yZTtcclxuICB9LFxyXG4gIGNyZWF0ZVN0b3JlOiBmdW5jdGlvbiBjcmVhdGVTdG9yZSgpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFN0b3JlT3B0aW9ucygpO1xyXG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgU0RhdGEob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbiAgfSxcclxuICBnZXRTdG9yZU9wdGlvbnM6IGZ1bmN0aW9uIGdldFN0b3JlT3B0aW9ucygpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHNlcnZpY2U6IEFwcC5nZXRTZXJ2aWNlKGZhbHNlKSxcclxuICAgICAgY29udHJhY3ROYW1lOiB0aGlzLmNvbnRyYWN0TmFtZSxcclxuICAgICAgcmVzb3VyY2VLaW5kOiB0aGlzLnJlc291cmNlS2luZCxcclxuICAgICAgaW5jbHVkZTogdGhpcy5xdWVyeUluY2x1ZGUsXHJcbiAgICAgIHNlbGVjdDogdGhpcy5xdWVyeVNlbGVjdCxcclxuICAgICAgb3JkZXJCeTogdGhpcy5xdWVyeU9yZGVyQnksXHJcbiAgICAgIHdoZXJlOiB0aGlzLnF1ZXJ5V2hlcmUsXHJcbiAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICBjb3VudDogdGhpcy5tYXhJdGVtcyxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFuIHByb21pc2Ugd2l0aCBzYWxlcyBwcm9jZXNzIGVudHJ5LlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgZm9yIGNyZWF0aW5nIHRoZSByZXF1ZXN0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVudGl0aXlJZFxyXG4gICAqXHJcbiAgICovXHJcbiAgZ2V0U2FsZXNQcm9jZXNzQnlFbnRpdHlJZDogZnVuY3Rpb24gZ2V0U2FsZXNQcm9jZXNzQnlFbnRpdHlJZChlbnRpdHlJZCkge1xyXG4gICAgY29uc3QgZGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQoKTtcclxuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5nZXRTdG9yZSgpO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgd2hlcmU6IGBFbnRpdHlJZCBlcSBcIiR7ZW50aXR5SWR9XCJgLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHF1ZXJ5UmVzdWx0cyA9IHN0b3JlLnF1ZXJ5KG51bGwsIG9wdGlvbnMpO1xyXG4gICAgd2hlbihxdWVyeVJlc3VsdHMsIChmZWVkKSA9PiB7XHJcbiAgICAgIGxldCBzYWxlc1Byb2Nlc3MgPSBudWxsO1xyXG4gICAgICBpZiAoZmVlZCAmJiBmZWVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBzYWxlc1Byb2Nlc3MgPSBmZWVkWzBdO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmVycmVkLnJlc29sdmUoc2FsZXNQcm9jZXNzKTtcclxuICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgZGVmZXJyZWQucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gIH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=