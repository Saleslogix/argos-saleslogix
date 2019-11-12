define('crm/Integrations/BOE/Models/UnitOfMeasure/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names', 'dojo/Deferred', 'dojo/when'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names, _Deferred, _when) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _when2 = _interopRequireDefault(_when);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.UnitOfMeasure.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'unitofmeasure_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'Name',
        querySelect: ['Name', 'Product/*']
      }, {
        name: 'detail',
        querySelect: ['Name', 'Product/*'],
        queryInclude: ['$permissions']
      }];
    },
    getUnitOfMeasureFromCode: function getUnitOfMeasureFromCode(uomCode, productId) {
      var queryResults = void 0;
      var def = new _Deferred2.default();
      var queryOptions = {
        where: 'Product.Id eq "' + productId + '"'
      };
      if (uomCode && productId) {
        queryResults = this.getEntries(null, queryOptions);
        (0, _when2.default)(queryResults, function (entries) {
          var uof = null;
          if (entries) {
            entries.forEach(function (item) {
              if (item.Name === uomCode) {
                uof = item;
              }
            });
          }
          def.resolve(uof);
        }, function (err) {
          def.reject(err);
        });
      } else {
        def.resolve(null);
      }
      return def.promise;
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

  _Manager2.default.register(_Names2.default.UNITOFMEASURE, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.UnitOfMeasure.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9Vbml0T2ZNZWFzdXJlL1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwiZ2V0VW5pdE9mTWVhc3VyZUZyb21Db2RlIiwidW9tQ29kZSIsInByb2R1Y3RJZCIsInF1ZXJ5UmVzdWx0cyIsImRlZiIsInF1ZXJ5T3B0aW9ucyIsIndoZXJlIiwiZ2V0RW50cmllcyIsImVudHJpZXMiLCJ1b2YiLCJmb3JFYWNoIiwiaXRlbSIsIk5hbWUiLCJyZXNvbHZlIiwiZXJyIiwicmVqZWN0IiwicHJvbWlzZSIsInJlZ2lzdGVyIiwiVU5JVE9GTUVBU1VSRSIsIlNEQVRBIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxNQUFNQSxVQUFVLHVCQUFRLGlEQUFSLEVBQTJELDBDQUEzRCxFQUFvRjtBQUNsR0MsUUFBSSwyQkFEOEY7QUFFbEdDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxhQUFPLENBQUM7QUFDTkMsY0FBTSxNQURBO0FBRU5DLHNCQUFjLE1BRlI7QUFHTkMscUJBQWEsQ0FDWCxNQURXLEVBRVgsV0FGVztBQUhQLE9BQUQsRUFPSjtBQUNERixjQUFNLFFBREw7QUFFREUscUJBQWEsQ0FDWCxNQURXLEVBRVgsV0FGVyxDQUZaO0FBTURDLHNCQUFjLENBQ1osY0FEWTtBQU5iLE9BUEksQ0FBUDtBQWtCRCxLQXJCaUc7QUFzQmxHQyw4QkFBMEIsU0FBU0Esd0JBQVQsQ0FBa0NDLE9BQWxDLEVBQTJDQyxTQUEzQyxFQUFzRDtBQUM5RSxVQUFJQyxxQkFBSjtBQUNBLFVBQU1DLE1BQU0sd0JBQVo7QUFDQSxVQUFNQyxlQUFlO0FBQ25CQyxtQ0FBeUJKLFNBQXpCO0FBRG1CLE9BQXJCO0FBR0EsVUFBSUQsV0FBV0MsU0FBZixFQUEwQjtBQUN4QkMsdUJBQWUsS0FBS0ksVUFBTCxDQUFnQixJQUFoQixFQUFzQkYsWUFBdEIsQ0FBZjtBQUNBLDRCQUFLRixZQUFMLEVBQW1CLFVBQUNLLE9BQUQsRUFBYTtBQUM5QixjQUFJQyxNQUFNLElBQVY7QUFDQSxjQUFJRCxPQUFKLEVBQWE7QUFDWEEsb0JBQVFFLE9BQVIsQ0FBZ0IsVUFBQ0MsSUFBRCxFQUFVO0FBQ3hCLGtCQUFJQSxLQUFLQyxJQUFMLEtBQWNYLE9BQWxCLEVBQTJCO0FBQ3pCUSxzQkFBTUUsSUFBTjtBQUNEO0FBQ0YsYUFKRDtBQUtEO0FBQ0RQLGNBQUlTLE9BQUosQ0FBWUosR0FBWjtBQUNELFNBVkQsRUFVRyxVQUFDSyxHQUFELEVBQVM7QUFDVlYsY0FBSVcsTUFBSixDQUFXRCxHQUFYO0FBQ0QsU0FaRDtBQWFELE9BZkQsTUFlTztBQUNMVixZQUFJUyxPQUFKLENBQVksSUFBWjtBQUNEO0FBQ0QsYUFBT1QsSUFBSVksT0FBWDtBQUNEO0FBL0NpRyxHQUFwRixDQUFoQixDLENBekJBOzs7Ozs7Ozs7Ozs7Ozs7QUEyRUEsb0JBQVFDLFFBQVIsQ0FBaUIsZ0JBQVlDLGFBQTdCLEVBQTRDLGdCQUFZQyxLQUF4RCxFQUErRDFCLE9BQS9EO0FBQ0EsaUJBQUsyQixTQUFMLENBQWUsa0NBQWYsRUFBbUQzQixPQUFuRDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBEZWZlcnJlZCBmcm9tICdkb2pvL0RlZmVycmVkJztcclxuaW1wb3J0IHdoZW4gZnJvbSAnZG9qby93aGVuJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuVW5pdE9mTWVhc3VyZS5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICd1bml0b2ZtZWFzdXJlX3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdOYW1lJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnTmFtZScsXHJcbiAgICAgICAgJ1Byb2R1Y3QvKicsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXRhaWwnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdOYW1lJyxcclxuICAgICAgICAnUHJvZHVjdC8qJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgXTtcclxuICB9LFxyXG4gIGdldFVuaXRPZk1lYXN1cmVGcm9tQ29kZTogZnVuY3Rpb24gZ2V0VW5pdE9mTWVhc3VyZUZyb21Db2RlKHVvbUNvZGUsIHByb2R1Y3RJZCkge1xyXG4gICAgbGV0IHF1ZXJ5UmVzdWx0cztcclxuICAgIGNvbnN0IGRlZiA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgY29uc3QgcXVlcnlPcHRpb25zID0ge1xyXG4gICAgICB3aGVyZTogYFByb2R1Y3QuSWQgZXEgXCIke3Byb2R1Y3RJZH1cImAsXHJcbiAgICB9O1xyXG4gICAgaWYgKHVvbUNvZGUgJiYgcHJvZHVjdElkKSB7XHJcbiAgICAgIHF1ZXJ5UmVzdWx0cyA9IHRoaXMuZ2V0RW50cmllcyhudWxsLCBxdWVyeU9wdGlvbnMpO1xyXG4gICAgICB3aGVuKHF1ZXJ5UmVzdWx0cywgKGVudHJpZXMpID0+IHtcclxuICAgICAgICBsZXQgdW9mID0gbnVsbDtcclxuICAgICAgICBpZiAoZW50cmllcykge1xyXG4gICAgICAgICAgZW50cmllcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLk5hbWUgPT09IHVvbUNvZGUpIHtcclxuICAgICAgICAgICAgICB1b2YgPSBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmLnJlc29sdmUodW9mKTtcclxuICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgIGRlZi5yZWplY3QoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZWYucmVzb2x2ZShudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkZWYucHJvbWlzZTtcclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuVU5JVE9GTUVBU1VSRSwgTU9ERUxfVFlQRVMuU0RBVEEsIF9fY2xhc3MpO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLlVuaXRPZk1lYXN1cmUuU0RhdGEnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19