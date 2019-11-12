define('crm/Integrations/BOE/Models/ErpBillToAccount/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpBillToAccount.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'erpbilltoaccount_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'CreateDate desc',
        querySelect: ['ErpBillTo/Name', 'ErpBillTo/Address/FullAddress', 'CreateDate']
      }, {
        name: 'detail',
        querySelect: ['ErpBillTo/Name', 'ErpBillTo/Address/*', 'ErpBillTo/ErpStatus', 'ErpBillTo/MainPhone', 'ErpBillTo/Fax', 'ErpBillTo/Email', 'ErpBillTo/PaymentTermId'],
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

  _Manager2.default.register(_Names2.default.ERPBILLTOACCOUNT, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.ErpBillToAccount.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBCaWxsVG9BY2NvdW50L1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicmVnaXN0ZXIiLCJFUlBCSUxMVE9BQ0NPVU5UIiwiU0RBVEEiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsVUFBVSx1QkFBUSxvREFBUixFQUE4RCwwQ0FBOUQsRUFBdUY7QUFDckdDLFFBQUksOEJBRGlHO0FBRXJHQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sTUFEQTtBQUVOQyxzQkFBYyxpQkFGUjtBQUdOQyxxQkFBYSxDQUNYLGdCQURXLEVBRVgsK0JBRlcsRUFHWCxZQUhXO0FBSFAsT0FBRCxFQVFKO0FBQ0RGLGNBQU0sUUFETDtBQUVERSxxQkFBYSxDQUNYLGdCQURXLEVBRVgscUJBRlcsRUFHWCxxQkFIVyxFQUlYLHFCQUpXLEVBS1gsZUFMVyxFQU1YLGlCQU5XLEVBT1gseUJBUFcsQ0FGWjtBQVdEQyxzQkFBYyxDQUNaLGNBRFk7QUFYYixPQVJJLENBQVA7QUF3QkQ7QUEzQm9HLEdBQXZGLENBQWhCLEMsQ0F2QkE7Ozs7Ozs7Ozs7Ozs7OztBQXFEQSxvQkFBUUMsUUFBUixDQUFpQixnQkFBWUMsZ0JBQTdCLEVBQStDLGdCQUFZQyxLQUEzRCxFQUFrRVQsT0FBbEU7QUFDQSxpQkFBS1UsU0FBTCxDQUFlLHFDQUFmLEVBQXNEVixPQUF0RDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkVycEJpbGxUb0FjY291bnQuU0RhdGEnLCBbQmFzZSwgX1NEYXRhTW9kZWxCYXNlXSwge1xyXG4gIGlkOiAnZXJwYmlsbHRvYWNjb3VudF9zZGF0YV9tb2RlbCcsXHJcbiAgY3JlYXRlUXVlcnlNb2RlbHM6IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TW9kZWxzKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIG5hbWU6ICdsaXN0JyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnQ3JlYXRlRGF0ZSBkZXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnRXJwQmlsbFRvL05hbWUnLFxyXG4gICAgICAgICdFcnBCaWxsVG8vQWRkcmVzcy9GdWxsQWRkcmVzcycsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZGV0YWlsJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnRXJwQmlsbFRvL05hbWUnLFxyXG4gICAgICAgICdFcnBCaWxsVG8vQWRkcmVzcy8qJyxcclxuICAgICAgICAnRXJwQmlsbFRvL0VycFN0YXR1cycsXHJcbiAgICAgICAgJ0VycEJpbGxUby9NYWluUGhvbmUnLFxyXG4gICAgICAgICdFcnBCaWxsVG8vRmF4JyxcclxuICAgICAgICAnRXJwQmlsbFRvL0VtYWlsJyxcclxuICAgICAgICAnRXJwQmlsbFRvL1BheW1lbnRUZXJtSWQnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBdO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5FUlBCSUxMVE9BQ0NPVU5ULCBNT0RFTF9UWVBFUy5TREFUQSwgX19jbGFzcyk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuRXJwQmlsbFRvQWNjb3VudC5TRGF0YScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=