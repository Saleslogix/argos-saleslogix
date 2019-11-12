define('crm/Integrations/BOE/Models/Product/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.Product.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'product_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'Name',
        querySelect: ['Name', 'Description', 'Price', 'ExtendedPrice', 'CalculatedPrice', 'Family', 'Status', 'ActualId', 'CommodityType', 'ErpLogicalId', 'UnitOfMeasure/*']
      }, {
        name: 'detail',
        querySelect: ['Name', 'Description', 'Price', 'ExtendedPrice', 'CalculatedPrice', 'Family', 'Status', 'ActualId', 'CommodityType', 'ErpLogicalId', 'UnitOfMeasure/*'],
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

  _Manager2.default.register(_Names2.default.PRODUCT, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.Product.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9Qcm9kdWN0L1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicmVnaXN0ZXIiLCJQUk9EVUNUIiwiU0RBVEEiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsVUFBVSx1QkFBUSwyQ0FBUixFQUFxRCwwQ0FBckQsRUFBOEU7QUFDNUZDLFFBQUkscUJBRHdGO0FBRTVGQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sTUFEQTtBQUVOQyxzQkFBYyxNQUZSO0FBR05DLHFCQUFhLENBQ1gsTUFEVyxFQUVYLGFBRlcsRUFHWCxPQUhXLEVBSVgsZUFKVyxFQUtYLGlCQUxXLEVBTVgsUUFOVyxFQU9YLFFBUFcsRUFRWCxVQVJXLEVBU1gsZUFUVyxFQVVYLGNBVlcsRUFXWCxpQkFYVztBQUhQLE9BQUQsRUFnQko7QUFDREYsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gsTUFEVyxFQUVYLGFBRlcsRUFHWCxPQUhXLEVBSVgsZUFKVyxFQUtYLGlCQUxXLEVBTVgsUUFOVyxFQU9YLFFBUFcsRUFRWCxVQVJXLEVBU1gsZUFUVyxFQVVYLGNBVlcsRUFXWCxpQkFYVyxDQUZaO0FBZURDLHNCQUFjLENBQ1osY0FEWTtBQWZiLE9BaEJJLENBQVA7QUFvQ0Q7QUF2QzJGLEdBQTlFLENBQWhCLEMsQ0F2QkE7Ozs7Ozs7Ozs7Ozs7OztBQWlFQSxvQkFBUUMsUUFBUixDQUFpQixnQkFBWUMsT0FBN0IsRUFBc0MsZ0JBQVlDLEtBQWxELEVBQXlEVCxPQUF6RDtBQUNBLGlCQUFLVSxTQUFMLENBQWUsNEJBQWYsRUFBNkNWLE9BQTdDO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuUHJvZHVjdC5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdwcm9kdWN0X3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdOYW1lJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnTmFtZScsXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnUHJpY2UnLFxyXG4gICAgICAgICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICAnRmFtaWx5JyxcclxuICAgICAgICAnU3RhdHVzJyxcclxuICAgICAgICAnQWN0dWFsSWQnLFxyXG4gICAgICAgICdDb21tb2RpdHlUeXBlJyxcclxuICAgICAgICAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICAnVW5pdE9mTWVhc3VyZS8qJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ05hbWUnLFxyXG4gICAgICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ1ByaWNlJyxcclxuICAgICAgICAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgJ0ZhbWlseScsXHJcbiAgICAgICAgJ1N0YXR1cycsXHJcbiAgICAgICAgJ0FjdHVhbElkJyxcclxuICAgICAgICAnQ29tbW9kaXR5VHlwZScsXHJcbiAgICAgICAgJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgJ1VuaXRPZk1lYXN1cmUvKicsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIF07XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLlBST0RVQ1QsIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5Qcm9kdWN0LlNEYXRhJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==