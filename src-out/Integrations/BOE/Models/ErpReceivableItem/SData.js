define('crm/Integrations/BOE/Models/ErpReceivableItem/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpReceivableItem.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'erpreceivableitem_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'CreateDate desc',
        querySelect: ['ErpLineNumber', 'ErpReceivable/ErpExtId', 'ErpInvoice/ErpExtId', 'ProductName', 'ErpLineTotalAmount', 'CreateDate', 'ErpReceivable/CurrencyCode']
      }, {
        name: 'detail',
        querySelect: ['ErpLineNumber', 'ErpReceivable/ErpExtId', 'ErpInvoice/ErpExtId', 'Product/Name', 'Product/Description', 'ExtendedPrice', 'ErpLineTotalAmount', 'CreateDate', 'ErpReceivable/CurrencyCode'],
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

  _Manager2.default.register(_Names2.default.ERPRECEIVABLEITEM, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.ErpReceivableItem.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBSZWNlaXZhYmxlSXRlbS9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsInJlZ2lzdGVyIiwiRVJQUkVDRUlWQUJMRUlURU0iLCJTREFUQSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxVQUFVLHVCQUFRLHFEQUFSLEVBQStELDBDQUEvRCxFQUF3RjtBQUN0R0MsUUFBSSwrQkFEa0c7QUFFdEdDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxhQUFPLENBQUM7QUFDTkMsY0FBTSxNQURBO0FBRU5DLHNCQUFjLGlCQUZSO0FBR05DLHFCQUFhLENBQ1gsZUFEVyxFQUVYLHdCQUZXLEVBR1gscUJBSFcsRUFJWCxhQUpXLEVBS1gsb0JBTFcsRUFNWCxZQU5XLEVBT1gsNEJBUFc7QUFIUCxPQUFELEVBWUo7QUFDREYsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gsZUFEVyxFQUVYLHdCQUZXLEVBR1gscUJBSFcsRUFJWCxjQUpXLEVBS1gscUJBTFcsRUFNWCxlQU5XLEVBT1gsb0JBUFcsRUFRWCxZQVJXLEVBU1gsNEJBVFcsQ0FGWjtBQWFEQyxzQkFBYyxDQUNaLGNBRFk7QUFiYixPQVpJLENBQVA7QUE4QkQ7QUFqQ3FHLEdBQXhGLENBQWhCLEMsQ0F2QkE7Ozs7Ozs7Ozs7Ozs7OztBQTJEQSxvQkFBUUMsUUFBUixDQUFpQixnQkFBWUMsaUJBQTdCLEVBQWdELGdCQUFZQyxLQUE1RCxFQUFtRVQsT0FBbkU7QUFDQSxpQkFBS1UsU0FBTCxDQUFlLHNDQUFmLEVBQXVEVixPQUF2RDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkVycFJlY2VpdmFibGVJdGVtLlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2VycHJlY2VpdmFibGVpdGVtX3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdDcmVhdGVEYXRlIGRlc2MnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdFcnBMaW5lTnVtYmVyJyxcclxuICAgICAgICAnRXJwUmVjZWl2YWJsZS9FcnBFeHRJZCcsXHJcbiAgICAgICAgJ0VycEludm9pY2UvRXJwRXh0SWQnLFxyXG4gICAgICAgICdQcm9kdWN0TmFtZScsXHJcbiAgICAgICAgJ0VycExpbmVUb3RhbEFtb3VudCcsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdFcnBSZWNlaXZhYmxlL0N1cnJlbmN5Q29kZScsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXRhaWwnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdFcnBMaW5lTnVtYmVyJyxcclxuICAgICAgICAnRXJwUmVjZWl2YWJsZS9FcnBFeHRJZCcsXHJcbiAgICAgICAgJ0VycEludm9pY2UvRXJwRXh0SWQnLFxyXG4gICAgICAgICdQcm9kdWN0L05hbWUnLFxyXG4gICAgICAgICdQcm9kdWN0L0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgJ0VycExpbmVUb3RhbEFtb3VudCcsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdFcnBSZWNlaXZhYmxlL0N1cnJlbmN5Q29kZScsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIF07XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLkVSUFJFQ0VJVkFCTEVJVEVNLCBNT0RFTF9UWVBFUy5TREFUQSwgX19jbGFzcyk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuRXJwUmVjZWl2YWJsZUl0ZW0uU0RhdGEnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19