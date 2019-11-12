define('crm/Integrations/BOE/Models/ErpBillTo/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpBillTo.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'erpbillto_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'CreateDate desc',
        querySelect: ['Name', 'Address/*', 'CreateDate', 'ErpBillToAccounts/*']
      }, {
        name: 'detail',
        querySelect: ['Name', 'Fax', 'MainPhone', 'Email', 'Address/*', 'ErpStatus', 'SyncStatus', 'ErpExtId', 'ErpLogicalId', 'ErpAccountingEntityId', 'Owner/OwnerDescription', 'CustomerType', 'PaymentTermId', 'ErpPaymentMethod'],
        queryInclude: ['$permissions']
      }, {
        name: 'edit',
        querySelect: ['Name', 'Fax', 'MainPhone', 'Email', 'Address/*', 'ErpStatus', 'SyncStatus', 'ErpLogicalId', 'ErpAccountingEntityId', 'Owner/OwnerDescription', 'CustomerType', 'PaymentTermId', 'ErpPaymentMethod'],
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

  _Manager2.default.register(_Names2.default.ERPBILLTO, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.ErpBillTo.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBCaWxsVG8vU0RhdGEuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwiY3JlYXRlUXVlcnlNb2RlbHMiLCJuYW1lIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZWdpc3RlciIsIkVSUEJJTExUTyIsIlNEQVRBIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1BLFVBQVUsdUJBQVEsNkNBQVIsRUFBdUQsMENBQXZELEVBQWdGO0FBQzlGQyxRQUFJLHVCQUQwRjtBQUU5RkMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsaUJBRlI7QUFHTkMscUJBQWEsQ0FDWCxNQURXLEVBRVgsV0FGVyxFQUdYLFlBSFcsRUFJWCxxQkFKVztBQUhQLE9BQUQsRUFTSjtBQUNERixjQUFNLFFBREw7QUFFREUscUJBQWEsQ0FDWCxNQURXLEVBRVgsS0FGVyxFQUdYLFdBSFcsRUFJWCxPQUpXLEVBS1gsV0FMVyxFQU1YLFdBTlcsRUFPWCxZQVBXLEVBUVgsVUFSVyxFQVNYLGNBVFcsRUFVWCx1QkFWVyxFQVdYLHdCQVhXLEVBWVgsY0FaVyxFQWFYLGVBYlcsRUFjWCxrQkFkVyxDQUZaO0FBa0JEQyxzQkFBYyxDQUNaLGNBRFk7QUFsQmIsT0FUSSxFQThCSjtBQUNESCxjQUFNLE1BREw7QUFFREUscUJBQWEsQ0FDWCxNQURXLEVBRVgsS0FGVyxFQUdYLFdBSFcsRUFJWCxPQUpXLEVBS1gsV0FMVyxFQU1YLFdBTlcsRUFPWCxZQVBXLEVBUVgsY0FSVyxFQVNYLHVCQVRXLEVBVVgsd0JBVlcsRUFXWCxjQVhXLEVBWVgsZUFaVyxFQWFYLGtCQWJXLENBRlo7QUFpQkRDLHNCQUFjLENBQ1osY0FEWTtBQWpCYixPQTlCSSxDQUFQO0FBb0REO0FBdkQ2RixHQUFoRixDQUFoQixDLENBdkJBOzs7Ozs7Ozs7Ozs7Ozs7QUFpRkEsb0JBQVFDLFFBQVIsQ0FBaUIsZ0JBQVlDLFNBQTdCLEVBQXdDLGdCQUFZQyxLQUFwRCxFQUEyRFQsT0FBM0Q7QUFDQSxpQkFBS1UsU0FBTCxDQUFlLDhCQUFmLEVBQStDVixPQUEvQztvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkVycEJpbGxUby5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdlcnBiaWxsdG9fc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0NyZWF0ZURhdGUgZGVzYycsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ05hbWUnLFxyXG4gICAgICAgICdBZGRyZXNzLyonLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgICAnRXJwQmlsbFRvQWNjb3VudHMvKicsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXRhaWwnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdOYW1lJyxcclxuICAgICAgICAnRmF4JyxcclxuICAgICAgICAnTWFpblBob25lJyxcclxuICAgICAgICAnRW1haWwnLFxyXG4gICAgICAgICdBZGRyZXNzLyonLFxyXG4gICAgICAgICdFcnBTdGF0dXMnLFxyXG4gICAgICAgICdTeW5jU3RhdHVzJyxcclxuICAgICAgICAnRXJwRXh0SWQnLFxyXG4gICAgICAgICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgICdPd25lci9Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgICAnQ3VzdG9tZXJUeXBlJyxcclxuICAgICAgICAnUGF5bWVudFRlcm1JZCcsXHJcbiAgICAgICAgJ0VycFBheW1lbnRNZXRob2QnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2VkaXQnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdOYW1lJyxcclxuICAgICAgICAnRmF4JyxcclxuICAgICAgICAnTWFpblBob25lJyxcclxuICAgICAgICAnRW1haWwnLFxyXG4gICAgICAgICdBZGRyZXNzLyonLFxyXG4gICAgICAgICdFcnBTdGF0dXMnLFxyXG4gICAgICAgICdTeW5jU3RhdHVzJyxcclxuICAgICAgICAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgICAnT3duZXIvT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0N1c3RvbWVyVHlwZScsXHJcbiAgICAgICAgJ1BheW1lbnRUZXJtSWQnLFxyXG4gICAgICAgICdFcnBQYXltZW50TWV0aG9kJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgXTtcclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuRVJQQklMTFRPLCBNT0RFTF9UWVBFUy5TREFUQSwgX19jbGFzcyk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuRXJwQmlsbFRvLlNEYXRhJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==