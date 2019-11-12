define('crm/Integrations/BOE/Modules/InvoiceModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/ERPInvoices/Detail', '../Views/ERPInvoices/List', '../Views/ERPInvoiceItems/Detail', '../Views/ERPInvoiceItems/List', '../Views/ERPReceivables/List', '../Models/ErpInvoice/Offline', '../Models/ErpInvoice/SData', '../Models/ErpInvoiceItem/Offline', '../Models/ErpInvoiceItem/SData', '../Models/ErpInvoicePerson/Offline', '../Models/ErpInvoicePerson/SData'], function (module, exports, _declare, _lang, _Module2, _Detail, _List, _Detail3, _List3, _List5) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _List2 = _interopRequireDefault(_List);

  var _Detail4 = _interopRequireDefault(_Detail3);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.InvoiceModule', [_Module3.default], {
    defaultViews: ['invoice_list'],
    init: function init() {
      App.picklistService.registerPicklistToView('ErpInvoiceStatus');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List2.default());
      am.registerView(new _Detail2.default());
      am.registerView(new _Detail4.default());
      am.registerView(new _List4.default({
        id: 'invoice_items_related',
        hasSettings: false,
        expose: false
      }));
      am.registerView(new _List6.default({
        id: 'invoice_receivables_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('detail/tools', 'invoice_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });

      am.registerCustomization('detail/tools', 'invoice_item_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });

      am.registerCustomization('list/tools', 'invoice_list', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });

      am.registerCustomization('list/tools', 'invoice_items_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.InvoiceModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvSW52b2ljZU1vZHVsZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiZGVmYXVsdFZpZXdzIiwiaW5pdCIsIkFwcCIsInBpY2tsaXN0U2VydmljZSIsInJlZ2lzdGVyUGlja2xpc3RUb1ZpZXciLCJsb2FkVmlld3MiLCJhbSIsImFwcGxpY2F0aW9uTW9kdWxlIiwicmVnaXN0ZXJWaWV3IiwiaWQiLCJoYXNTZXR0aW5ncyIsImV4cG9zZSIsImdyb3Vwc0VuYWJsZWQiLCJsb2FkQ3VzdG9taXphdGlvbnMiLCJyZWdpc3RlckN1c3RvbWl6YXRpb24iLCJhdCIsInRvb2wiLCJ0eXBlIiwibG9hZFRvb2xiYXJzIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBOEJBLE1BQU1BLFVBQVUsdUJBQVEsNENBQVIsRUFBc0Qsa0JBQXRELEVBQWlFO0FBQy9FQyxrQkFBYyxDQUFDLGNBQUQsQ0FEaUU7QUFFL0VDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNwQkMsVUFBSUMsZUFBSixDQUFvQkMsc0JBQXBCLENBQTJDLGtCQUEzQztBQUNELEtBSjhFO0FBSy9FQyxlQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUIsVUFBTUMsS0FBSyxLQUFLQyxpQkFBaEI7QUFDQUQsU0FBR0UsWUFBSCxDQUFnQixvQkFBaEI7QUFDQUYsU0FBR0UsWUFBSCxDQUFnQixzQkFBaEI7QUFDQUYsU0FBR0UsWUFBSCxDQUFnQixzQkFBaEI7QUFDQUYsU0FBR0UsWUFBSCxDQUFnQixtQkFBdUI7QUFDckNDLFlBQUksdUJBRGlDO0FBRXJDQyxxQkFBYSxLQUZ3QjtBQUdyQ0MsZ0JBQVE7QUFINkIsT0FBdkIsQ0FBaEI7QUFLQUwsU0FBR0UsWUFBSCxDQUFnQixtQkFBdUI7QUFDckNDLFlBQUksNkJBRGlDO0FBRXJDRyx1QkFBZSxLQUZzQjtBQUdyQ0YscUJBQWEsS0FId0I7QUFJckNDLGdCQUFRO0FBSjZCLE9BQXZCLENBQWhCO0FBTUQsS0FyQjhFO0FBc0IvRUUsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCO0FBQ2hELFVBQU1QLEtBQUssS0FBS0MsaUJBQWhCO0FBQ0FELFNBQUdRLHFCQUFILENBQXlCLGNBQXpCLEVBQXlDLGdCQUF6QyxFQUEyRDtBQUN6REMsWUFBSSxTQUFTQSxFQUFULENBQVlDLElBQVosRUFBa0I7QUFDcEIsaUJBQU9BLEtBQUtQLEVBQUwsS0FBWSxNQUFuQjtBQUNELFNBSHdEO0FBSXpEUSxjQUFNO0FBSm1ELE9BQTNEOztBQU9BWCxTQUFHUSxxQkFBSCxDQUF5QixjQUF6QixFQUF5QyxxQkFBekMsRUFBZ0U7QUFDOURDLFlBQUksU0FBU0EsRUFBVCxDQUFZQyxJQUFaLEVBQWtCO0FBQ3BCLGlCQUFPQSxLQUFLUCxFQUFMLEtBQVksTUFBbkI7QUFDRCxTQUg2RDtBQUk5RFEsY0FBTTtBQUp3RCxPQUFoRTs7QUFPQVgsU0FBR1EscUJBQUgsQ0FBeUIsWUFBekIsRUFBdUMsY0FBdkMsRUFBdUQ7QUFDckRDLFlBQUksU0FBU0EsRUFBVCxDQUFZQyxJQUFaLEVBQWtCO0FBQ3BCLGlCQUFPQSxLQUFLUCxFQUFMLEtBQVksS0FBbkI7QUFDRCxTQUhvRDtBQUlyRFEsY0FBTTtBQUorQyxPQUF2RDs7QUFPQVgsU0FBR1EscUJBQUgsQ0FBeUIsWUFBekIsRUFBdUMsdUJBQXZDLEVBQWdFO0FBQzlEQyxZQUFJLFNBQVNBLEVBQVQsQ0FBWUMsSUFBWixFQUFrQjtBQUNwQixpQkFBT0EsS0FBS1AsRUFBTCxLQUFZLEtBQW5CO0FBQ0QsU0FINkQ7QUFJOURRLGNBQU07QUFKd0QsT0FBaEU7QUFNRCxLQW5EOEU7QUFvRC9FQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCLENBQ3JDO0FBckQ4RSxHQUFqRSxDQUFoQjs7QUF3REEsaUJBQUtDLFNBQUwsQ0FBZSw2QkFBZixFQUE4Q3BCLE9BQTlDO29CQUNlQSxPIiwiZmlsZSI6Ikludm9pY2VNb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZHVsZSBmcm9tICcuL19Nb2R1bGUnO1xyXG5pbXBvcnQgRVJQSW52b2ljZURldGFpbCBmcm9tICcuLi9WaWV3cy9FUlBJbnZvaWNlcy9EZXRhaWwnO1xyXG5pbXBvcnQgRVJQSW52b2ljZUxpc3QgZnJvbSAnLi4vVmlld3MvRVJQSW52b2ljZXMvTGlzdCc7XHJcbmltcG9ydCBFUlBJbnZvaWNlSXRlbURldGFpbCBmcm9tICcuLi9WaWV3cy9FUlBJbnZvaWNlSXRlbXMvRGV0YWlsJztcclxuaW1wb3J0IEVSUEludm9pY2VJdGVtTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBJbnZvaWNlSXRlbXMvTGlzdCc7XHJcbmltcG9ydCBFUlBSZWNlaXZhYmxlc0xpc3QgZnJvbSAnLi4vVmlld3MvRVJQUmVjZWl2YWJsZXMvTGlzdCc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL0VycEludm9pY2UvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL0VycEludm9pY2UvU0RhdGEnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9FcnBJbnZvaWNlSXRlbS9PZmZsaW5lJztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvRXJwSW52b2ljZUl0ZW0vU0RhdGEnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9FcnBJbnZvaWNlUGVyc29uL09mZmxpbmUnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9FcnBJbnZvaWNlUGVyc29uL1NEYXRhJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2R1bGVzLkludm9pY2VNb2R1bGUnLCBbX01vZHVsZV0sIHtcclxuICBkZWZhdWx0Vmlld3M6IFsnaW52b2ljZV9saXN0J10sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIEFwcC5waWNrbGlzdFNlcnZpY2UucmVnaXN0ZXJQaWNrbGlzdFRvVmlldygnRXJwSW52b2ljZVN0YXR1cycpO1xyXG4gIH0sXHJcbiAgbG9hZFZpZXdzOiBmdW5jdGlvbiBsb2FkVmlld3MoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEVSUEludm9pY2VMaXN0KCkpO1xyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBFUlBJbnZvaWNlRGV0YWlsKCkpO1xyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBFUlBJbnZvaWNlSXRlbURldGFpbCgpKTtcclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgRVJQSW52b2ljZUl0ZW1MaXN0KHtcclxuICAgICAgaWQ6ICdpbnZvaWNlX2l0ZW1zX3JlbGF0ZWQnLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICB9KSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEVSUFJlY2VpdmFibGVzTGlzdCh7XHJcbiAgICAgIGlkOiAnaW52b2ljZV9yZWNlaXZhYmxlc19yZWxhdGVkJyxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgIH0pKTtcclxuICB9LFxyXG4gIGxvYWRDdXN0b21pemF0aW9uczogZnVuY3Rpb24gbG9hZEN1c3RvbWl6YXRpb25zKCkge1xyXG4gICAgY29uc3QgYW0gPSB0aGlzLmFwcGxpY2F0aW9uTW9kdWxlO1xyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdkZXRhaWwvdG9vbHMnLCAnaW52b2ljZV9kZXRhaWwnLCB7XHJcbiAgICAgIGF0OiBmdW5jdGlvbiBhdCh0b29sKSB7XHJcbiAgICAgICAgcmV0dXJuIHRvb2wuaWQgPT09ICdlZGl0JztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ3JlbW92ZScsXHJcbiAgICB9KTtcclxuXHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbC90b29scycsICdpbnZvaWNlX2l0ZW1fZGV0YWlsJywge1xyXG4gICAgICBhdDogZnVuY3Rpb24gYXQodG9vbCkge1xyXG4gICAgICAgIHJldHVybiB0b29sLmlkID09PSAnZWRpdCc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdsaXN0L3Rvb2xzJywgJ2ludm9pY2VfbGlzdCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdsaXN0L3Rvb2xzJywgJ2ludm9pY2VfaXRlbXNfcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBsb2FkVG9vbGJhcnM6IGZ1bmN0aW9uIGxvYWRUb29sYmFycygpIHtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2R1bGVzLkludm9pY2VNb2R1bGUnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19