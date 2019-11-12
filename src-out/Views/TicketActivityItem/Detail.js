define('crm/Views/TicketActivityItem/Detail', ['module', 'exports', 'dojo/_base/declare', '../../Format', 'argos/Detail', 'argos/I18n'], function (module, exports, _declare, _Format, _Detail, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2017 Infor
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

  var resource = (0, _I18n2.default)('ticketActivityItemDetail');

  /**
   * @class crm.Views.TicketActivityItem.Detail
   *
   * @extends argos.Detail
   *
   * @requires crm.Format
   */
  var __class = (0, _declare2.default)('crm.Views.TicketActivityItem.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    productNameText: resource.productNameText,
    skuText: resource.skuText,
    serialNumberText: resource.serialNumberText,
    itemAmountText: resource.itemAmountText,
    itemDescriptionText: resource.itemDescriptionText,
    entityText: resource.entityText,

    // View Properties
    id: 'ticketactivityitem_detail',

    querySelect: ['Product/Name', 'Product/ActualId', 'AccountProduct/SerialNumber', 'ItemDescription', 'ItemAmount', 'TicketActivity/$key'],
    resourceKind: 'ticketActivityItems',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'ProductName',
          property: 'Product.Name',
          label: this.productNameText
        }, {
          name: 'ProductActualId',
          property: 'Product.ActualId',
          label: this.skuText
        }, {
          name: 'SerialNumber',
          property: 'AccountProduct.SerialNumber',
          label: this.serialNumberText
        }, {
          name: 'ItemAmount',
          property: 'ItemAmount',
          label: this.itemAmountText,
          renderer: _Format2.default.currency
        }, {
          name: 'ItemDescription',
          property: 'ItemDescription',
          label: this.itemDescriptionText
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9UaWNrZXRBY3Rpdml0eUl0ZW0vRGV0YWlsLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsInByb2R1Y3ROYW1lVGV4dCIsInNrdVRleHQiLCJzZXJpYWxOdW1iZXJUZXh0IiwiaXRlbUFtb3VudFRleHQiLCJpdGVtRGVzY3JpcHRpb25UZXh0IiwiZW50aXR5VGV4dCIsImlkIiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJjcmVhdGVUb29sTGF5b3V0IiwidG9vbHMiLCJ0YmFyIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwidGl0bGUiLCJkZXRhaWxzVGV4dCIsIm5hbWUiLCJjaGlsZHJlbiIsInByb3BlcnR5IiwibGFiZWwiLCJyZW5kZXJlciIsImN1cnJlbmN5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLDBCQUFaLENBQWpCOztBQUVBOzs7Ozs7O0FBT0EsTUFBTUMsVUFBVSx1QkFBUSxxQ0FBUixFQUErQyxrQkFBL0MsRUFBeUQ7QUFDdkU7QUFDQUMsZUFBV0YsU0FBU0UsU0FGbUQ7QUFHdkVDLHFCQUFpQkgsU0FBU0csZUFINkM7QUFJdkVDLGFBQVNKLFNBQVNJLE9BSnFEO0FBS3ZFQyxzQkFBa0JMLFNBQVNLLGdCQUw0QztBQU12RUMsb0JBQWdCTixTQUFTTSxjQU44QztBQU92RUMseUJBQXFCUCxTQUFTTyxtQkFQeUM7QUFRdkVDLGdCQUFZUixTQUFTUSxVQVJrRDs7QUFVdkU7QUFDQUMsUUFBSSwyQkFYbUU7O0FBYXZFQyxpQkFBYSxDQUNYLGNBRFcsRUFFWCxrQkFGVyxFQUdYLDZCQUhXLEVBSVgsaUJBSlcsRUFLWCxZQUxXLEVBTVgscUJBTlcsQ0FiMEQ7QUFxQnZFQyxrQkFBYyxxQkFyQnlEOztBQXVCdkVDLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxhQUFPLEtBQUtDLEtBQUwsS0FBZSxLQUFLQSxLQUFMLEdBQWE7QUFDakNDLGNBQU07QUFEMkIsT0FBNUIsQ0FBUDtBQUdELEtBM0JzRTtBQTRCdkVDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcEMsYUFBTyxLQUFLQyxNQUFMLEtBQWdCLEtBQUtBLE1BQUwsR0FBYyxDQUFDO0FBQ3BDQyxlQUFPLEtBQUtDLFdBRHdCO0FBRXBDQyxjQUFNLGdCQUY4QjtBQUdwQ0Msa0JBQVUsQ0FBQztBQUNURCxnQkFBTSxhQURHO0FBRVRFLG9CQUFVLGNBRkQ7QUFHVEMsaUJBQU8sS0FBS25CO0FBSEgsU0FBRCxFQUlQO0FBQ0RnQixnQkFBTSxpQkFETDtBQUVERSxvQkFBVSxrQkFGVDtBQUdEQyxpQkFBTyxLQUFLbEI7QUFIWCxTQUpPLEVBUVA7QUFDRGUsZ0JBQU0sY0FETDtBQUVERSxvQkFBVSw2QkFGVDtBQUdEQyxpQkFBTyxLQUFLakI7QUFIWCxTQVJPLEVBWVA7QUFDRGMsZ0JBQU0sWUFETDtBQUVERSxvQkFBVSxZQUZUO0FBR0RDLGlCQUFPLEtBQUtoQixjQUhYO0FBSURpQixvQkFBVSxpQkFBT0M7QUFKaEIsU0FaTyxFQWlCUDtBQUNETCxnQkFBTSxpQkFETDtBQUVERSxvQkFBVSxpQkFGVDtBQUdEQyxpQkFBTyxLQUFLZjtBQUhYLFNBakJPO0FBSDBCLE9BQUQsQ0FBOUIsQ0FBUDtBQTBCRDtBQXZEc0UsR0FBekQsQ0FBaEI7O29CQTBEZU4sTyIsImZpbGUiOiJEZXRhaWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgndGlja2V0QWN0aXZpdHlJdGVtRGV0YWlsJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5UaWNrZXRBY3Rpdml0eUl0ZW0uRGV0YWlsXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkRldGFpbFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5UaWNrZXRBY3Rpdml0eUl0ZW0uRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBwcm9kdWN0TmFtZVRleHQ6IHJlc291cmNlLnByb2R1Y3ROYW1lVGV4dCxcclxuICBza3VUZXh0OiByZXNvdXJjZS5za3VUZXh0LFxyXG4gIHNlcmlhbE51bWJlclRleHQ6IHJlc291cmNlLnNlcmlhbE51bWJlclRleHQsXHJcbiAgaXRlbUFtb3VudFRleHQ6IHJlc291cmNlLml0ZW1BbW91bnRUZXh0LFxyXG4gIGl0ZW1EZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLml0ZW1EZXNjcmlwdGlvblRleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICd0aWNrZXRhY3Rpdml0eWl0ZW1fZGV0YWlsJyxcclxuXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdQcm9kdWN0L05hbWUnLFxyXG4gICAgJ1Byb2R1Y3QvQWN0dWFsSWQnLFxyXG4gICAgJ0FjY291bnRQcm9kdWN0L1NlcmlhbE51bWJlcicsXHJcbiAgICAnSXRlbURlc2NyaXB0aW9uJyxcclxuICAgICdJdGVtQW1vdW50JyxcclxuICAgICdUaWNrZXRBY3Rpdml0eS8ka2V5JyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ3RpY2tldEFjdGl2aXR5SXRlbXMnLFxyXG5cclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICAgIHRiYXI6IFtdLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3ROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Byb2R1Y3QuTmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJvZHVjdE5hbWVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3RBY3R1YWxJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0LkFjdHVhbElkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5za3VUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NlcmlhbE51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50UHJvZHVjdC5TZXJpYWxOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNlcmlhbE51bWJlclRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnSXRlbUFtb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdJdGVtQW1vdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5pdGVtQW1vdW50VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmN1cnJlbmN5LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0l0ZW1EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdJdGVtRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLml0ZW1EZXNjcmlwdGlvblRleHQsXHJcbiAgICAgIH1dLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19