define('crm/Integrations/BOE/Models/ErpContactAssociation/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _ModelBase3 = _interopRequireDefault(_ModelBase2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpContactAssociationModel'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpContactAssociation.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpContactAccounts',
    entityName: 'ERPContactAccount',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPCONTACTASSOCIATION,
    iconClass: 'spreadsheet',
    detailViewId: '',
    listViewId: 'erpcontactassociations_list',
    editViewId: '',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = []);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpContactAssociation.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBDb250YWN0QXNzb2NpYXRpb24vQmFzZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsIm1vZGVsTmFtZSIsIkVSUENPTlRBQ1RBU1NPQ0lBVElPTiIsImljb25DbGFzcyIsImRldGFpbFZpZXdJZCIsImxpc3RWaWV3SWQiLCJlZGl0Vmlld0lkIiwiY3JlYXRlUmVsYXRpb25zaGlwcyIsInJlbCIsInJlbGF0aW9uc2hpcHMiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQSxXQUFXLG9CQUFZLDRCQUFaLENBQWpCLEMsQ0FyQkE7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQyxVQUFVLHVCQUFRLHdEQUFSLEVBQWtFLHFCQUFsRSxFQUFnRjtBQUM5RkMsa0JBQWMsU0FEZ0Y7QUFFOUZDLGtCQUFjLG9CQUZnRjtBQUc5RkMsZ0JBQVksbUJBSGtGO0FBSTlGQyx1QkFBbUJMLFNBQVNLLGlCQUprRTtBQUs5RkMsNkJBQXlCTixTQUFTTSx1QkFMNEQ7QUFNOUZDLGVBQVcsZ0JBQVlDLHFCQU51RTtBQU85RkMsZUFBVyxhQVBtRjtBQVE5RkMsa0JBQWMsRUFSZ0Y7QUFTOUZDLGdCQUFZLDZCQVRrRjtBQVU5RkMsZ0JBQVksRUFWa0Y7QUFXOUZDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQixFQUE1QyxDQUFaO0FBQ0EsYUFBT0QsR0FBUDtBQUNEO0FBZDZGLEdBQWhGLENBQWhCO0FBZ0JBLGlCQUFLRSxTQUFMLENBQWUseUNBQWYsRUFBMERmLE9BQTFEO29CQUNlQSxPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX01vZGVsQmFzZSc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycENvbnRhY3RBc3NvY2lhdGlvbk1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkVycENvbnRhY3RBc3NvY2lhdGlvbi5CYXNlJywgW19Nb2RlbEJhc2VdLCB7XHJcbiAgY29udHJhY3ROYW1lOiAnZHluYW1pYycsXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwQ29udGFjdEFjY291bnRzJyxcclxuICBlbnRpdHlOYW1lOiAnRVJQQ29udGFjdEFjY291bnQnLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICBlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbDogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBDT05UQUNUQVNTT0NJQVRJT04sXHJcbiAgaWNvbkNsYXNzOiAnc3ByZWFkc2hlZXQnLFxyXG4gIGRldGFpbFZpZXdJZDogJycsXHJcbiAgbGlzdFZpZXdJZDogJ2VycGNvbnRhY3Rhc3NvY2lhdGlvbnNfbGlzdCcsXHJcbiAgZWRpdFZpZXdJZDogJycsXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW10pO1xyXG4gICAgcmV0dXJuIHJlbDtcclxuICB9LFxyXG59KTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5FcnBDb250YWN0QXNzb2NpYXRpb24uQmFzZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=