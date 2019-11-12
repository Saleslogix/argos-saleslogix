define('crm/Integrations/BOE/Models/ErpAccountPerson/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpAccountPerson.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'erpaccountperson_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'CreateDate desc',
        querySelect: ['ErpPerson/Name', 'ErpPerson/Address/FullAddress', 'CreateDate']
      }, {
        name: 'detail',
        querySelect: ['ErpPerson/Name', 'ErpPerson/Address/FullAddress', 'CreateDate'],
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

  _Manager2.default.register(_Names2.default.ERPACCOUNTPERSON, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.ErpAccountPerson.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBBY2NvdW50UGVyc29uL1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicmVnaXN0ZXIiLCJFUlBBQ0NPVU5UUEVSU09OIiwiU0RBVEEiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsVUFBVSx1QkFBUSxvREFBUixFQUE4RCwwQ0FBOUQsRUFBdUY7QUFDckdDLFFBQUksOEJBRGlHO0FBRXJHQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sTUFEQTtBQUVOQyxzQkFBYyxpQkFGUjtBQUdOQyxxQkFBYSxDQUNYLGdCQURXLEVBRVgsK0JBRlcsRUFHWCxZQUhXO0FBSFAsT0FBRCxFQVFKO0FBQ0RGLGNBQU0sUUFETDtBQUVERSxxQkFBYSxDQUNYLGdCQURXLEVBRVgsK0JBRlcsRUFHWCxZQUhXLENBRlo7QUFPREMsc0JBQWMsQ0FDWixjQURZO0FBUGIsT0FSSSxDQUFQO0FBb0JEO0FBdkJvRyxHQUF2RixDQUFoQixDLENBdkJBOzs7Ozs7Ozs7Ozs7Ozs7QUFpREEsb0JBQVFDLFFBQVIsQ0FBaUIsZ0JBQVlDLGdCQUE3QixFQUErQyxnQkFBWUMsS0FBM0QsRUFBa0VULE9BQWxFO0FBQ0EsaUJBQUtVLFNBQUwsQ0FBZSxxQ0FBZixFQUFzRFYsT0FBdEQ7b0JBQ2VBLE8iLCJmaWxlIjoiU0RhdGEuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UnO1xyXG5pbXBvcnQgX1NEYXRhTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fU0RhdGFNb2RlbEJhc2UnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdhcmdvcy9Nb2RlbHMvTWFuYWdlcic7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZGVscy5FcnBBY2NvdW50UGVyc29uLlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2VycGFjY291bnRwZXJzb25fc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0NyZWF0ZURhdGUgZGVzYycsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0VycFBlcnNvbi9OYW1lJyxcclxuICAgICAgICAnRXJwUGVyc29uL0FkZHJlc3MvRnVsbEFkZHJlc3MnLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0VycFBlcnNvbi9OYW1lJyxcclxuICAgICAgICAnRXJwUGVyc29uL0FkZHJlc3MvRnVsbEFkZHJlc3MnLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgXTtcclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuRVJQQUNDT1VOVFBFUlNPTiwgTU9ERUxfVFlQRVMuU0RBVEEsIF9fY2xhc3MpO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLkVycEFjY291bnRQZXJzb24uU0RhdGEnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19