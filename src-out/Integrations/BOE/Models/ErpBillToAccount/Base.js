define('crm/Integrations/BOE/Models/ErpBillToAccount/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpBillToAccountModel'); /* Copyright 2017 Infor
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

  var accountResource = (0, _I18n2.default)('accountModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpBillToAccount.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpBillToAccounts',
    entityName: 'ERPBillToAccount',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPBILLTOACCOUNT,
    iconClass: 'spreadsheet',
    detailViewId: 'erpbilltoaccounts_detail',
    listViewId: 'erpbilltoaccounts_list',
    editViewId: '',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'Account',
        relatedProperty: 'ErpBillToAccounts',
        relatedPropertyType: 'object'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpBillToAccount.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBCaWxsVG9BY2NvdW50L0Jhc2UuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJhY2NvdW50UmVzb3VyY2UiLCJfX2NsYXNzIiwiY29udHJhY3ROYW1lIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJtb2RlbE5hbWUiLCJFUlBCSUxMVE9BQ0NPVU5UIiwiaWNvbkNsYXNzIiwiZGV0YWlsVmlld0lkIiwibGlzdFZpZXdJZCIsImVkaXRWaWV3SWQiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwicmVsIiwicmVsYXRpb25zaGlwcyIsIm5hbWUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJyZWxhdGVkRW50aXR5IiwicmVsYXRlZFByb3BlcnR5IiwicmVsYXRlZFByb3BlcnR5VHlwZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksdUJBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLGtCQUFrQixvQkFBWSxjQUFaLENBQXhCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsbURBQVIsRUFBNkQscUJBQTdELEVBQTJFO0FBQ3pGQyxrQkFBYyxTQUQyRTtBQUV6RkMsa0JBQWMsbUJBRjJFO0FBR3pGQyxnQkFBWSxrQkFINkU7QUFJekZDLHVCQUFtQk4sU0FBU00saUJBSjZEO0FBS3pGQyw2QkFBeUJQLFNBQVNPLHVCQUx1RDtBQU16RkMsZUFBVyxnQkFBWUMsZ0JBTmtFO0FBT3pGQyxlQUFXLGFBUDhFO0FBUXpGQyxrQkFBYywwQkFSMkU7QUFTekZDLGdCQUFZLHdCQVQ2RTtBQVV6RkMsZ0JBQVksRUFWNkU7QUFXekZDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQixDQUFDO0FBQ3ZEQyxjQUFNLFNBRGlEO0FBRXZEQyxxQkFBYWpCLGdCQUFnQkssaUJBRjBCO0FBR3ZEYSxjQUFNLFdBSGlEO0FBSXZEQyx1QkFBZSxTQUp3QztBQUt2REMseUJBQWlCLG1CQUxzQztBQU12REMsNkJBQXFCO0FBTmtDLE9BQUQsQ0FBNUMsQ0FBWjtBQVFBLGFBQU9QLEdBQVA7QUFDRDtBQXJCd0YsR0FBM0UsQ0FBaEI7QUF1QkEsaUJBQUtRLFNBQUwsQ0FBZSxvQ0FBZixFQUFxRHJCLE9BQXJEO29CQUNlQSxPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX01vZGVsQmFzZSc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEJpbGxUb0FjY291bnRNb2RlbCcpO1xyXG5jb25zdCBhY2NvdW50UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWNjb3VudE1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkVycEJpbGxUb0FjY291bnQuQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ2VycEJpbGxUb0FjY291bnRzJyxcclxuICBlbnRpdHlOYW1lOiAnRVJQQmlsbFRvQWNjb3VudCcsXHJcbiAgZW50aXR5RGlzcGxheU5hbWU6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lUGx1cmFsOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUEJJTExUT0FDQ09VTlQsXHJcbiAgaWNvbkNsYXNzOiAnc3ByZWFkc2hlZXQnLFxyXG4gIGRldGFpbFZpZXdJZDogJ2VycGJpbGx0b2FjY291bnRzX2RldGFpbCcsXHJcbiAgbGlzdFZpZXdJZDogJ2VycGJpbGx0b2FjY291bnRzX2xpc3QnLFxyXG4gIGVkaXRWaWV3SWQ6ICcnLFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFt7XHJcbiAgICAgIG5hbWU6ICdBY2NvdW50JyxcclxuICAgICAgZGlzcGxheU5hbWU6IGFjY291bnRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdBY2NvdW50JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnRXJwQmlsbFRvQWNjb3VudHMnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH1dKTtcclxuICAgIHJldHVybiByZWw7XHJcbiAgfSxcclxufSk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuRXJwQmlsbFRvQWNjb3VudC5CYXNlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==