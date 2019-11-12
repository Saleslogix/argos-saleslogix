define('crm/Integrations/BOE/Models/Location/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.Location.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'slxlocation_sdata_model',
    createQueryModels: function createQueryModels() {
      // Unable to order by Description
      return [{
        name: 'list',
        queryOrderBy: 'Name',
        querySelect: ['Name', 'Description', 'ErpLogicalId', 'ErpAccountingEntityId', 'ErpStatus', 'ErpExtId', 'LocationType']
      }, {
        name: 'detail',
        querySelect: ['Name', 'Description', 'ErpLogicalId', 'ErpAccountingEntityId', 'ErpStatus', 'ErpExtId', 'LocationType'],
        queryInclude: ['$permissions']
      }];
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

  _Manager2.default.register(_Names2.default.LOCATION, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.Location.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9Mb2NhdGlvbi9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsInJlZ2lzdGVyIiwiTE9DQVRJT04iLCJTREFUQSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxVQUFVLHVCQUFRLDRDQUFSLEVBQXNELDBDQUF0RCxFQUErRTtBQUM3RkMsUUFBSSx5QkFEeUY7QUFFN0ZDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QztBQUNBLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsTUFGUjtBQUdOQyxxQkFBYSxDQUNYLE1BRFcsRUFFWCxhQUZXLEVBR1gsY0FIVyxFQUlYLHVCQUpXLEVBS1gsV0FMVyxFQU1YLFVBTlcsRUFPWCxjQVBXO0FBSFAsT0FBRCxFQVlKO0FBQ0RGLGNBQU0sUUFETDtBQUVERSxxQkFBYSxDQUNYLE1BRFcsRUFFWCxhQUZXLEVBR1gsY0FIVyxFQUlYLHVCQUpXLEVBS1gsV0FMVyxFQU1YLFVBTlcsRUFPWCxjQVBXLENBRlo7QUFXREMsc0JBQWMsQ0FDWixjQURZO0FBWGIsT0FaSSxDQUFQO0FBMkJEO0FBL0I0RixHQUEvRSxDQUFoQixDLENBdkJBOzs7Ozs7Ozs7Ozs7Ozs7QUF5REEsb0JBQVFDLFFBQVIsQ0FBaUIsZ0JBQVlDLFFBQTdCLEVBQXVDLGdCQUFZQyxLQUFuRCxFQUEwRFQsT0FBMUQ7QUFDQSxpQkFBS1UsU0FBTCxDQUFlLDZCQUFmLEVBQThDVixPQUE5QztvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkxvY2F0aW9uLlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ3NseGxvY2F0aW9uX3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICAvLyBVbmFibGUgdG8gb3JkZXIgYnkgRGVzY3JpcHRpb25cclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ05hbWUnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdOYW1lJyxcclxuICAgICAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgICdFcnBTdGF0dXMnLFxyXG4gICAgICAgICdFcnBFeHRJZCcsXHJcbiAgICAgICAgJ0xvY2F0aW9uVHlwZScsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXRhaWwnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdOYW1lJyxcclxuICAgICAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgICdFcnBTdGF0dXMnLFxyXG4gICAgICAgICdFcnBFeHRJZCcsXHJcbiAgICAgICAgJ0xvY2F0aW9uVHlwZScsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfV07XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLkxPQ0FUSU9OLCBNT0RFTF9UWVBFUy5TREFUQSwgX19jbGFzcyk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuTG9jYXRpb24uU0RhdGEnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19