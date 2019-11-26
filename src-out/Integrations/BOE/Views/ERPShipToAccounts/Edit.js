define('crm/Integrations/BOE/Views/ERPShipToAccounts/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Edit', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Edit, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpShipToAccountsEdit'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipToAccounts.Edit', [_Edit2.default], {
    // View Properties
    id: 'erpshiptoaccount_edit',
    detailView: 'erpshiptoaccount_detail',
    insertSecurity: 'Entities/ErpShipTo/Add',
    updateSecurity: 'Entities/ErpShipTo/Edit',
    resourceKind: 'erpShipToAccounts',
    titleText: resource.titleText,
    shipToText: resource.shipToText,
    accountText: resource.accountText,
    modelName: _Names2.default.ERPSHIPTOACCOUNT,

    init: function init() {
      this.inherited(init, arguments);
    },
    applyContext: function applyContext() {
      this.inherited(applyContext, arguments);
      if (this.options && this.options.fromContext) {
        this.fields.ErpShipTo.disable();
        this.fields.Account.disable();
        this.fields.ErpShipTo.setValue(this.options.fromContext.ShipTo);
        this.fields.Account.setValue(this.options.fromContext.Context);
      } else {
        this.fields.ErpShipTo.enable();
        this.fields.Account.enable();
      }
      if (this.options && this.options.autoSave) {
        this.save();
      }
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.shipToText,
          name: 'ErpShipTo',
          property: 'ErpShipTo',
          type: 'lookup',
          emptyText: '',
          autoFocus: true,
          required: true,
          valueTextProperty: 'Name',
          view: 'erpshiptoaccount_erpshiptos'
        }, {
          label: this.accountText,
          name: 'Account',
          property: 'Account',
          type: 'lookup',
          emptyText: '',
          required: true,
          valueTextProperty: 'AccountName',
          view: 'erpshiptoaccount_accounts'
        }] }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipToAccounts.Edit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFNoaXBUb0FjY291bnRzL0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaWQiLCJkZXRhaWxWaWV3IiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInJlc291cmNlS2luZCIsInRpdGxlVGV4dCIsInNoaXBUb1RleHQiLCJhY2NvdW50VGV4dCIsIm1vZGVsTmFtZSIsIkVSUFNISVBUT0FDQ09VTlQiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiYXBwbHlDb250ZXh0Iiwib3B0aW9ucyIsImZyb21Db250ZXh0IiwiZmllbGRzIiwiRXJwU2hpcFRvIiwiZGlzYWJsZSIsIkFjY291bnQiLCJzZXRWYWx1ZSIsIlNoaXBUbyIsIkNvbnRleHQiLCJlbmFibGUiLCJhdXRvU2F2ZSIsInNhdmUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJ0aXRsZSIsImRldGFpbHNUZXh0IiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJwcm9wZXJ0eSIsInR5cGUiLCJlbXB0eVRleHQiLCJhdXRvRm9jdXMiLCJyZXF1aXJlZCIsInZhbHVlVGV4dFByb3BlcnR5IiwidmlldyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksdUJBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1DLFVBQVUsdUJBQVEsbURBQVIsRUFBNkQsZ0JBQTdELEVBQXFFO0FBQ25GO0FBQ0FDLFFBQUksdUJBRitFO0FBR25GQyxnQkFBWSx5QkFIdUU7QUFJbkZDLG9CQUFnQix3QkFKbUU7QUFLbkZDLG9CQUFnQix5QkFMbUU7QUFNbkZDLGtCQUFjLG1CQU5xRTtBQU9uRkMsZUFBV1AsU0FBU08sU0FQK0Q7QUFRbkZDLGdCQUFZUixTQUFTUSxVQVI4RDtBQVNuRkMsaUJBQWFULFNBQVNTLFdBVDZEO0FBVW5GQyxlQUFXLGdCQUFZQyxnQkFWNEQ7O0FBWW5GQyxVQUFNLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBS0MsU0FBTCxDQUFlRCxJQUFmLEVBQXFCRSxTQUFyQjtBQUNELEtBZGtGO0FBZW5GQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLFdBQUtGLFNBQUwsQ0FBZUUsWUFBZixFQUE2QkQsU0FBN0I7QUFDQSxVQUFJLEtBQUtFLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFhQyxXQUFqQyxFQUE4QztBQUM1QyxhQUFLQyxNQUFMLENBQVlDLFNBQVosQ0FBc0JDLE9BQXRCO0FBQ0EsYUFBS0YsTUFBTCxDQUFZRyxPQUFaLENBQW9CRCxPQUFwQjtBQUNBLGFBQUtGLE1BQUwsQ0FBWUMsU0FBWixDQUFzQkcsUUFBdEIsQ0FBK0IsS0FBS04sT0FBTCxDQUFhQyxXQUFiLENBQXlCTSxNQUF4RDtBQUNBLGFBQUtMLE1BQUwsQ0FBWUcsT0FBWixDQUFvQkMsUUFBcEIsQ0FBNkIsS0FBS04sT0FBTCxDQUFhQyxXQUFiLENBQXlCTyxPQUF0RDtBQUNELE9BTEQsTUFLTztBQUNMLGFBQUtOLE1BQUwsQ0FBWUMsU0FBWixDQUFzQk0sTUFBdEI7QUFDQSxhQUFLUCxNQUFMLENBQVlHLE9BQVosQ0FBb0JJLE1BQXBCO0FBQ0Q7QUFDRCxVQUFJLEtBQUtULE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFhVSxRQUFqQyxFQUEyQztBQUN6QyxhQUFLQyxJQUFMO0FBQ0Q7QUFDRixLQTdCa0Y7QUE4Qm5GQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLGFBQU8sS0FBS0MsTUFBTCxLQUFnQixLQUFLQSxNQUFMLEdBQWMsQ0FBQztBQUNwQ0MsZUFBTyxLQUFLQyxXQUR3QjtBQUVwQ0MsY0FBTSxnQkFGOEI7QUFHcENDLGtCQUFVLENBQUM7QUFDVEMsaUJBQU8sS0FBSzFCLFVBREg7QUFFVHdCLGdCQUFNLFdBRkc7QUFHVEcsb0JBQVUsV0FIRDtBQUlUQyxnQkFBTSxRQUpHO0FBS1RDLHFCQUFXLEVBTEY7QUFNVEMscUJBQVcsSUFORjtBQU9UQyxvQkFBVSxJQVBEO0FBUVRDLDZCQUFtQixNQVJWO0FBU1RDLGdCQUFNO0FBVEcsU0FBRCxFQVVQO0FBQ0RQLGlCQUFPLEtBQUt6QixXQURYO0FBRUR1QixnQkFBTSxTQUZMO0FBR0RHLG9CQUFVLFNBSFQ7QUFJREMsZ0JBQU0sUUFKTDtBQUtEQyxxQkFBVyxFQUxWO0FBTURFLG9CQUFVLElBTlQ7QUFPREMsNkJBQW1CLGFBUGxCO0FBUURDLGdCQUFNO0FBUkwsU0FWTyxDQUgwQixFQUFELENBQTlCLENBQVA7QUF5QkQ7QUF4RGtGLEdBQXJFLENBQWhCOztBQTJEQSxpQkFBS0MsU0FBTCxDQUFlLG9DQUFmLEVBQXFEekMsT0FBckQ7b0JBQ2VBLE8iLCJmaWxlIjoiRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcFRvQWNjb3VudHNFZGl0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQU2hpcFRvQWNjb3VudHMuRWRpdCcsIFtFZGl0XSwge1xyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnZXJwc2hpcHRvYWNjb3VudF9lZGl0JyxcclxuICBkZXRhaWxWaWV3OiAnZXJwc2hpcHRvYWNjb3VudF9kZXRhaWwnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvRXJwU2hpcFRvL0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6ICdFbnRpdGllcy9FcnBTaGlwVG8vRWRpdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwU2hpcFRvQWNjb3VudHMnLFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHNoaXBUb1RleHQ6IHJlc291cmNlLnNoaXBUb1RleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuRVJQU0hJUFRPQUNDT1VOVCxcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGluaXQsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBhcHBseUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGV4dCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFwcGx5Q29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZyb21Db250ZXh0KSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkVycFNoaXBUby5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFjY291bnQuZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5FcnBTaGlwVG8uc2V0VmFsdWUodGhpcy5vcHRpb25zLmZyb21Db250ZXh0LlNoaXBUbyk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFjY291bnQuc2V0VmFsdWUodGhpcy5vcHRpb25zLmZyb21Db250ZXh0LkNvbnRleHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWVsZHMuRXJwU2hpcFRvLmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5BY2NvdW50LmVuYWJsZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuYXV0b1NhdmUpIHtcclxuICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcFRvVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXJwU2hpcFRvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUbycsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdOYW1lJyxcclxuICAgICAgICB2aWV3OiAnZXJwc2hpcHRvYWNjb3VudF9lcnBzaGlwdG9zJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgdmlldzogJ2VycHNoaXB0b2FjY291bnRfYWNjb3VudHMnLFxyXG4gICAgICB9LFxyXG4gICAgICBdIH0sXHJcbiAgICBdKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBTaGlwVG9BY2NvdW50cy5FZGl0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==