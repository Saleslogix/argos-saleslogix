define('crm/Integrations/BOE/Views/ERPBillToAccounts/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Edit', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Edit, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpBillToAccountsEdit'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPBillToAccounts.Edit', [_Edit2.default], {
    // View Properties
    id: 'erpbilltoaccounts_edit',
    detailView: 'erpbilltoaccounts_detail',
    insertSecurity: 'Entities/ErpBillTo/Add',
    updateSecurity: 'Entities/ErpBillTo/Edit',
    resourceKind: 'erpBillToAccounts',
    titleText: resource.titleText,
    billToText: resource.billToText,
    accountText: resource.accountText,
    modelName: _Names2.default.ERPSHIPTOACCOUNT,

    init: function init() {
      this.inherited(init, arguments);
    },
    applyContext: function applyContext() {
      this.inherited(applyContext, arguments);
      if (this.options && this.options.fromContext) {
        this.fields.ErpBillTo.disable();
        this.fields.Account.disable();
        this.fields.ErpBillTo.setValue(this.options.fromContext.BillTo);
        this.fields.Account.setValue(this.options.fromContext.Context);
      } else {
        this.fields.ErpBillTo.enable();
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
          label: this.billToText,
          name: 'ErpBillTo',
          property: 'ErpBillTo',
          type: 'lookup',
          emptyText: '',
          autoFocus: true,
          required: true,
          valueTextProperty: 'Name',
          view: 'erpbilltoaccount_erpbilltos'
        }, {
          label: this.accountText,
          name: 'Account',
          property: 'Account',
          type: 'lookup',
          emptyText: '',
          required: true,
          valueTextProperty: 'AccountName',
          view: 'erpbilltoaccount_accounts'
        }] }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPBillToAccounts.Edit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEJpbGxUb0FjY291bnRzL0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaWQiLCJkZXRhaWxWaWV3IiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInJlc291cmNlS2luZCIsInRpdGxlVGV4dCIsImJpbGxUb1RleHQiLCJhY2NvdW50VGV4dCIsIm1vZGVsTmFtZSIsIkVSUFNISVBUT0FDQ09VTlQiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiYXBwbHlDb250ZXh0Iiwib3B0aW9ucyIsImZyb21Db250ZXh0IiwiZmllbGRzIiwiRXJwQmlsbFRvIiwiZGlzYWJsZSIsIkFjY291bnQiLCJzZXRWYWx1ZSIsIkJpbGxUbyIsIkNvbnRleHQiLCJlbmFibGUiLCJhdXRvU2F2ZSIsInNhdmUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJ0aXRsZSIsImRldGFpbHNUZXh0IiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJwcm9wZXJ0eSIsInR5cGUiLCJlbXB0eVRleHQiLCJhdXRvRm9jdXMiLCJyZXF1aXJlZCIsInZhbHVlVGV4dFByb3BlcnR5IiwidmlldyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksdUJBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1DLFVBQVUsdUJBQVEsbURBQVIsRUFBNkQsZ0JBQTdELEVBQXFFO0FBQ25GO0FBQ0FDLFFBQUksd0JBRitFO0FBR25GQyxnQkFBWSwwQkFIdUU7QUFJbkZDLG9CQUFnQix3QkFKbUU7QUFLbkZDLG9CQUFnQix5QkFMbUU7QUFNbkZDLGtCQUFjLG1CQU5xRTtBQU9uRkMsZUFBV1AsU0FBU08sU0FQK0Q7QUFRbkZDLGdCQUFZUixTQUFTUSxVQVI4RDtBQVNuRkMsaUJBQWFULFNBQVNTLFdBVDZEO0FBVW5GQyxlQUFXLGdCQUFZQyxnQkFWNEQ7O0FBWW5GQyxVQUFNLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBS0MsU0FBTCxDQUFlRCxJQUFmLEVBQXFCRSxTQUFyQjtBQUNELEtBZGtGO0FBZW5GQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLFdBQUtGLFNBQUwsQ0FBZUUsWUFBZixFQUE2QkQsU0FBN0I7QUFDQSxVQUFJLEtBQUtFLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFhQyxXQUFqQyxFQUE4QztBQUM1QyxhQUFLQyxNQUFMLENBQVlDLFNBQVosQ0FBc0JDLE9BQXRCO0FBQ0EsYUFBS0YsTUFBTCxDQUFZRyxPQUFaLENBQW9CRCxPQUFwQjtBQUNBLGFBQUtGLE1BQUwsQ0FBWUMsU0FBWixDQUFzQkcsUUFBdEIsQ0FBK0IsS0FBS04sT0FBTCxDQUFhQyxXQUFiLENBQXlCTSxNQUF4RDtBQUNBLGFBQUtMLE1BQUwsQ0FBWUcsT0FBWixDQUFvQkMsUUFBcEIsQ0FBNkIsS0FBS04sT0FBTCxDQUFhQyxXQUFiLENBQXlCTyxPQUF0RDtBQUNELE9BTEQsTUFLTztBQUNMLGFBQUtOLE1BQUwsQ0FBWUMsU0FBWixDQUFzQk0sTUFBdEI7QUFDQSxhQUFLUCxNQUFMLENBQVlHLE9BQVosQ0FBb0JJLE1BQXBCO0FBQ0Q7QUFDRCxVQUFJLEtBQUtULE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFhVSxRQUFqQyxFQUEyQztBQUN6QyxhQUFLQyxJQUFMO0FBQ0Q7QUFDRixLQTdCa0Y7QUE4Qm5GQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLGFBQU8sS0FBS0MsTUFBTCxLQUFnQixLQUFLQSxNQUFMLEdBQWMsQ0FBQztBQUNwQ0MsZUFBTyxLQUFLQyxXQUR3QjtBQUVwQ0MsY0FBTSxnQkFGOEI7QUFHcENDLGtCQUFVLENBQUM7QUFDVEMsaUJBQU8sS0FBSzFCLFVBREg7QUFFVHdCLGdCQUFNLFdBRkc7QUFHVEcsb0JBQVUsV0FIRDtBQUlUQyxnQkFBTSxRQUpHO0FBS1RDLHFCQUFXLEVBTEY7QUFNVEMscUJBQVcsSUFORjtBQU9UQyxvQkFBVSxJQVBEO0FBUVRDLDZCQUFtQixNQVJWO0FBU1RDLGdCQUFNO0FBVEcsU0FBRCxFQVVQO0FBQ0RQLGlCQUFPLEtBQUt6QixXQURYO0FBRUR1QixnQkFBTSxTQUZMO0FBR0RHLG9CQUFVLFNBSFQ7QUFJREMsZ0JBQU0sUUFKTDtBQUtEQyxxQkFBVyxFQUxWO0FBTURFLG9CQUFVLElBTlQ7QUFPREMsNkJBQW1CLGFBUGxCO0FBUURDLGdCQUFNO0FBUkwsU0FWTyxDQUgwQixFQUFELENBQTlCLENBQVA7QUF5QkQ7QUF4RGtGLEdBQXJFLENBQWhCOztBQTJEQSxpQkFBS0MsU0FBTCxDQUFlLG9DQUFmLEVBQXFEekMsT0FBckQ7b0JBQ2VBLE8iLCJmaWxlIjoiRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwQmlsbFRvQWNjb3VudHNFZGl0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQQmlsbFRvQWNjb3VudHMuRWRpdCcsIFtFZGl0XSwge1xyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnZXJwYmlsbHRvYWNjb3VudHNfZWRpdCcsXHJcbiAgZGV0YWlsVmlldzogJ2VycGJpbGx0b2FjY291bnRzX2RldGFpbCcsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9FcnBCaWxsVG8vQWRkJyxcclxuICB1cGRhdGVTZWN1cml0eTogJ0VudGl0aWVzL0VycEJpbGxUby9FZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdlcnBCaWxsVG9BY2NvdW50cycsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYmlsbFRvVGV4dDogcmVzb3VyY2UuYmlsbFRvVGV4dCxcclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBTSElQVE9BQ0NPVU5ULFxyXG5cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIGFwcGx5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250ZXh0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXBwbHlDb250ZXh0LCBhcmd1bWVudHMpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQpIHtcclxuICAgICAgdGhpcy5maWVsZHMuRXJwQmlsbFRvLmRpc2FibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuQWNjb3VudC5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkVycEJpbGxUby5zZXRWYWx1ZSh0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuQmlsbFRvKTtcclxuICAgICAgdGhpcy5maWVsZHMuQWNjb3VudC5zZXRWYWx1ZSh0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQuQ29udGV4dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpZWxkcy5FcnBCaWxsVG8uZW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFjY291bnQuZW5hYmxlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5hdXRvU2F2ZSkge1xyXG4gICAgICB0aGlzLnNhdmUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5iaWxsVG9UZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFcnBCaWxsVG8nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmlsbFRvJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdlcnBiaWxsdG9hY2NvdW50X2VycGJpbGx0b3MnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICB2aWV3OiAnZXJwYmlsbHRvYWNjb3VudF9hY2NvdW50cycsXHJcbiAgICAgIH0sXHJcbiAgICAgIF0gfSxcclxuICAgIF0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkVSUEJpbGxUb0FjY291bnRzLkVkaXQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19