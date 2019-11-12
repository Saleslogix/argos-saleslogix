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
      this.inherited(arguments);
    },
    applyContext: function applyContext() {
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEJpbGxUb0FjY291bnRzL0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaWQiLCJkZXRhaWxWaWV3IiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInJlc291cmNlS2luZCIsInRpdGxlVGV4dCIsImJpbGxUb1RleHQiLCJhY2NvdW50VGV4dCIsIm1vZGVsTmFtZSIsIkVSUFNISVBUT0FDQ09VTlQiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiYXBwbHlDb250ZXh0Iiwib3B0aW9ucyIsImZyb21Db250ZXh0IiwiZmllbGRzIiwiRXJwQmlsbFRvIiwiZGlzYWJsZSIsIkFjY291bnQiLCJzZXRWYWx1ZSIsIkJpbGxUbyIsIkNvbnRleHQiLCJlbmFibGUiLCJhdXRvU2F2ZSIsInNhdmUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJ0aXRsZSIsImRldGFpbHNUZXh0IiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJwcm9wZXJ0eSIsInR5cGUiLCJlbXB0eVRleHQiLCJhdXRvRm9jdXMiLCJyZXF1aXJlZCIsInZhbHVlVGV4dFByb3BlcnR5IiwidmlldyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksdUJBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1DLFVBQVUsdUJBQVEsbURBQVIsRUFBNkQsZ0JBQTdELEVBQXFFO0FBQ25GO0FBQ0FDLFFBQUksd0JBRitFO0FBR25GQyxnQkFBWSwwQkFIdUU7QUFJbkZDLG9CQUFnQix3QkFKbUU7QUFLbkZDLG9CQUFnQix5QkFMbUU7QUFNbkZDLGtCQUFjLG1CQU5xRTtBQU9uRkMsZUFBV1AsU0FBU08sU0FQK0Q7QUFRbkZDLGdCQUFZUixTQUFTUSxVQVI4RDtBQVNuRkMsaUJBQWFULFNBQVNTLFdBVDZEO0FBVW5GQyxlQUFXLGdCQUFZQyxnQkFWNEQ7O0FBWW5GQyxVQUFNLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBS0MsU0FBTCxDQUFlQyxTQUFmO0FBQ0QsS0Fka0Y7QUFlbkZDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcEMsV0FBS0YsU0FBTCxDQUFlQyxTQUFmO0FBQ0EsVUFBSSxLQUFLRSxPQUFMLElBQWdCLEtBQUtBLE9BQUwsQ0FBYUMsV0FBakMsRUFBOEM7QUFDNUMsYUFBS0MsTUFBTCxDQUFZQyxTQUFaLENBQXNCQyxPQUF0QjtBQUNBLGFBQUtGLE1BQUwsQ0FBWUcsT0FBWixDQUFvQkQsT0FBcEI7QUFDQSxhQUFLRixNQUFMLENBQVlDLFNBQVosQ0FBc0JHLFFBQXRCLENBQStCLEtBQUtOLE9BQUwsQ0FBYUMsV0FBYixDQUF5Qk0sTUFBeEQ7QUFDQSxhQUFLTCxNQUFMLENBQVlHLE9BQVosQ0FBb0JDLFFBQXBCLENBQTZCLEtBQUtOLE9BQUwsQ0FBYUMsV0FBYixDQUF5Qk8sT0FBdEQ7QUFDRCxPQUxELE1BS087QUFDTCxhQUFLTixNQUFMLENBQVlDLFNBQVosQ0FBc0JNLE1BQXRCO0FBQ0EsYUFBS1AsTUFBTCxDQUFZRyxPQUFaLENBQW9CSSxNQUFwQjtBQUNEO0FBQ0QsVUFBSSxLQUFLVCxPQUFMLElBQWdCLEtBQUtBLE9BQUwsQ0FBYVUsUUFBakMsRUFBMkM7QUFDekMsYUFBS0MsSUFBTDtBQUNEO0FBQ0YsS0E3QmtGO0FBOEJuRkMsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQyxhQUFPLEtBQUtDLE1BQUwsS0FBZ0IsS0FBS0EsTUFBTCxHQUFjLENBQUM7QUFDcENDLGVBQU8sS0FBS0MsV0FEd0I7QUFFcENDLGNBQU0sZ0JBRjhCO0FBR3BDQyxrQkFBVSxDQUFDO0FBQ1RDLGlCQUFPLEtBQUsxQixVQURIO0FBRVR3QixnQkFBTSxXQUZHO0FBR1RHLG9CQUFVLFdBSEQ7QUFJVEMsZ0JBQU0sUUFKRztBQUtUQyxxQkFBVyxFQUxGO0FBTVRDLHFCQUFXLElBTkY7QUFPVEMsb0JBQVUsSUFQRDtBQVFUQyw2QkFBbUIsTUFSVjtBQVNUQyxnQkFBTTtBQVRHLFNBQUQsRUFVUDtBQUNEUCxpQkFBTyxLQUFLekIsV0FEWDtBQUVEdUIsZ0JBQU0sU0FGTDtBQUdERyxvQkFBVSxTQUhUO0FBSURDLGdCQUFNLFFBSkw7QUFLREMscUJBQVcsRUFMVjtBQU1ERSxvQkFBVSxJQU5UO0FBT0RDLDZCQUFtQixhQVBsQjtBQVFEQyxnQkFBTTtBQVJMLFNBVk8sQ0FIMEIsRUFBRCxDQUE5QixDQUFQO0FBeUJEO0FBeERrRixHQUFyRSxDQUFoQjs7QUEyREEsaUJBQUtDLFNBQUwsQ0FBZSxvQ0FBZixFQUFxRHpDLE9BQXJEO29CQUNlQSxPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEJpbGxUb0FjY291bnRzRWRpdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUEJpbGxUb0FjY291bnRzLkVkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2VycGJpbGx0b2FjY291bnRzX2VkaXQnLFxyXG4gIGRldGFpbFZpZXc6ICdlcnBiaWxsdG9hY2NvdW50c19kZXRhaWwnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvRXJwQmlsbFRvL0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6ICdFbnRpdGllcy9FcnBCaWxsVG8vRWRpdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwQmlsbFRvQWNjb3VudHMnLFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGJpbGxUb1RleHQ6IHJlc291cmNlLmJpbGxUb1RleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuRVJQU0hJUFRPQUNDT1VOVCxcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBhcHBseUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGV4dCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5FcnBCaWxsVG8uZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5BY2NvdW50LmRpc2FibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuRXJwQmlsbFRvLnNldFZhbHVlKHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dC5CaWxsVG8pO1xyXG4gICAgICB0aGlzLmZpZWxkcy5BY2NvdW50LnNldFZhbHVlKHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dC5Db250ZXh0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkVycEJpbGxUby5lbmFibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuQWNjb3VudC5lbmFibGUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmF1dG9TYXZlKSB7XHJcbiAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJpbGxUb1RleHQsXHJcbiAgICAgICAgbmFtZTogJ0VycEJpbGxUbycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBCaWxsVG8nLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTmFtZScsXHJcbiAgICAgICAgdmlldzogJ2VycGJpbGx0b2FjY291bnRfZXJwYmlsbHRvcycsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnQWNjb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdlcnBiaWxsdG9hY2NvdW50X2FjY291bnRzJyxcclxuICAgICAgfSxcclxuICAgICAgXSB9LFxyXG4gICAgXSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuRVJQQmlsbFRvQWNjb3VudHMuRWRpdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=