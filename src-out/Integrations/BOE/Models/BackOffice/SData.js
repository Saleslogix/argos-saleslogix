define('crm/Integrations/BOE/Models/BackOffice/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integration.BOE.Models.BackOffice.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'backoffice_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'BackOfficeName',
        querySelect: ['BackOfficeName', 'BackOfficeAccountingEntities/*', 'Integration/*', 'IsActive', 'LogicalId', 'CountryCodeFormat', 'Version']
      }, {
        name: 'detail',
        querySelect: ['BackOfficeName', 'BackOfficeAccountingEntities/*', 'Integration/*', 'IsActive', 'LogicalId', 'CountryCodeFormat', 'Version'],
        queryInclude: ['$permissions']
      }, {
        name: 'list-active',
        queryOrderBy: 'BackOfficeName',
        queryWhere: 'IsActive eq true',
        querySelect: ['BackOfficeName', 'IsActive', 'LogicalId', 'CountryCodeFormat', 'Version']
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

  _Manager2.default.register(_Names2.default.BACKOFFICE, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.BackOffice.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9CYWNrT2ZmaWNlL1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicXVlcnlXaGVyZSIsInJlZ2lzdGVyIiwiQkFDS09GRklDRSIsIlNEQVRBIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1BLFVBQVUsdUJBQVEsNkNBQVIsRUFBdUQsMENBQXZELEVBQWdGO0FBQzlGQyxRQUFJLHdCQUQwRjtBQUU5RkMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsZ0JBRlI7QUFHTkMscUJBQWEsQ0FDWCxnQkFEVyxFQUVYLGdDQUZXLEVBR1gsZUFIVyxFQUlYLFVBSlcsRUFLWCxXQUxXLEVBTVgsbUJBTlcsRUFPWCxTQVBXO0FBSFAsT0FBRCxFQVlKO0FBQ0RGLGNBQU0sUUFETDtBQUVERSxxQkFBYSxDQUNYLGdCQURXLEVBRVgsZ0NBRlcsRUFHWCxlQUhXLEVBSVgsVUFKVyxFQUtYLFdBTFcsRUFNWCxtQkFOVyxFQU9YLFNBUFcsQ0FGWjtBQVdEQyxzQkFBYyxDQUNaLGNBRFk7QUFYYixPQVpJLEVBMEJKO0FBQ0RILGNBQU0sYUFETDtBQUVEQyxzQkFBYyxnQkFGYjtBQUdERyxvQkFBWSxrQkFIWDtBQUlERixxQkFBYSxDQUNYLGdCQURXLEVBRVgsVUFGVyxFQUdYLFdBSFcsRUFJWCxtQkFKVyxFQUtYLFNBTFc7QUFKWixPQTFCSSxDQUFQO0FBc0NEO0FBekM2RixHQUFoRixDQUFoQixDLENBdkJBOzs7Ozs7Ozs7Ozs7Ozs7QUFtRUEsb0JBQVFHLFFBQVIsQ0FBaUIsZ0JBQVlDLFVBQTdCLEVBQXlDLGdCQUFZQyxLQUFyRCxFQUE0RFYsT0FBNUQ7QUFDQSxpQkFBS1csU0FBTCxDQUFlLCtCQUFmLEVBQWdEWCxPQUFoRDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9uLkJPRS5Nb2RlbHMuQmFja09mZmljZS5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdiYWNrb2ZmaWNlX3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdCYWNrT2ZmaWNlTmFtZScsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0JhY2tPZmZpY2VOYW1lJyxcclxuICAgICAgICAnQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcy8qJyxcclxuICAgICAgICAnSW50ZWdyYXRpb24vKicsXHJcbiAgICAgICAgJ0lzQWN0aXZlJyxcclxuICAgICAgICAnTG9naWNhbElkJyxcclxuICAgICAgICAnQ291bnRyeUNvZGVGb3JtYXQnLFxyXG4gICAgICAgICdWZXJzaW9uJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0JhY2tPZmZpY2VOYW1lJyxcclxuICAgICAgICAnQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcy8qJyxcclxuICAgICAgICAnSW50ZWdyYXRpb24vKicsXHJcbiAgICAgICAgJ0lzQWN0aXZlJyxcclxuICAgICAgICAnTG9naWNhbElkJyxcclxuICAgICAgICAnQ291bnRyeUNvZGVGb3JtYXQnLFxyXG4gICAgICAgICdWZXJzaW9uJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdsaXN0LWFjdGl2ZScsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0JhY2tPZmZpY2VOYW1lJyxcclxuICAgICAgcXVlcnlXaGVyZTogJ0lzQWN0aXZlIGVxIHRydWUnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdCYWNrT2ZmaWNlTmFtZScsXHJcbiAgICAgICAgJ0lzQWN0aXZlJyxcclxuICAgICAgICAnTG9naWNhbElkJyxcclxuICAgICAgICAnQ291bnRyeUNvZGVGb3JtYXQnLFxyXG4gICAgICAgICdWZXJzaW9uJyxcclxuICAgICAgXSxcclxuICAgIH1dO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5CQUNLT0ZGSUNFLCBNT0RFTF9UWVBFUy5TREFUQSwgX19jbGFzcyk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuQmFja09mZmljZS5TRGF0YScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=