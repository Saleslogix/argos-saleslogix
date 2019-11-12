define('crm/Integrations/BOE/Models/BackOfficeAccountingEntity/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.BackOfficeAccountingEntity.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'backofficeaccountingentity_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'Name',
        querySelect: ['Name', 'AcctEntityExtId']
      }, {
        name: 'detail',
        querySelect: ['Name', 'AcctEntityExtId', 'BackOffice/*'],
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

  _Manager2.default.register(_Names2.default.BACKOFFICEACCOUNTINGENTITY, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.BackOfficeAccountingEntity.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eS9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsInJlZ2lzdGVyIiwiQkFDS09GRklDRUFDQ09VTlRJTkdFTlRJVFkiLCJTREFUQSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxVQUFVLHVCQUFRLDhEQUFSLEVBQXdFLDBDQUF4RSxFQUFpRztBQUMvR0MsUUFBSSx3Q0FEMkc7QUFFL0dDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxhQUFPLENBQUM7QUFDTkMsY0FBTSxNQURBO0FBRU5DLHNCQUFjLE1BRlI7QUFHTkMscUJBQWEsQ0FDWCxNQURXLEVBRVgsaUJBRlc7QUFIUCxPQUFELEVBT0o7QUFDREYsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gsTUFEVyxFQUVYLGlCQUZXLEVBR1gsY0FIVyxDQUZaO0FBT0RDLHNCQUFjLENBQ1osY0FEWTtBQVBiLE9BUEksQ0FBUDtBQWtCRDtBQXJCOEcsR0FBakcsQ0FBaEIsQyxDQXZCQTs7Ozs7Ozs7Ozs7Ozs7O0FBK0NBLG9CQUFRQyxRQUFSLENBQWlCLGdCQUFZQywwQkFBN0IsRUFBeUQsZ0JBQVlDLEtBQXJFLEVBQTRFVCxPQUE1RTtBQUNBLGlCQUFLVSxTQUFMLENBQWUsK0NBQWYsRUFBZ0VWLE9BQWhFO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuQmFja09mZmljZUFjY291bnRpbmdFbnRpdHkuU0RhdGEnLCBbQmFzZSwgX1NEYXRhTW9kZWxCYXNlXSwge1xyXG4gIGlkOiAnYmFja29mZmljZWFjY291bnRpbmdlbnRpdHlfc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ05hbWUnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdOYW1lJyxcclxuICAgICAgICAnQWNjdEVudGl0eUV4dElkJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ05hbWUnLFxyXG4gICAgICAgICdBY2N0RW50aXR5RXh0SWQnLFxyXG4gICAgICAgICdCYWNrT2ZmaWNlLyonLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH1dO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5CQUNLT0ZGSUNFQUNDT1VOVElOR0VOVElUWSwgTU9ERUxfVFlQRVMuU0RBVEEsIF9fY2xhc3MpO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5LlNEYXRhJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==