define('crm/Integrations/BOE/Modules/QuoteLineModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/Products/List', '../Views/Locations/PricingAvailabilityList', '../Views/QuoteLines/Edit', '../Views/Quotes/List', '../Views/UnitsOfMeasure/List', '../Models/QuoteItem/Offline', '../Models/QuoteItem/SData'], function (module, exports, _declare, _lang, _Module2, _List, _PricingAvailabilityList, _Edit, _List3, _List5) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _PricingAvailabilityList2 = _interopRequireDefault(_PricingAvailabilityList);

  var _Edit2 = _interopRequireDefault(_Edit);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.QuoteLineModule', [_Module3.default], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _List4.default({
        expose: false,
        id: 'quoteline_quote_list'
      }));

      am.registerView(new _Edit2.default());

      am.registerView(new _List2.default({
        id: 'quoteline_product_related',
        expose: false
      }));

      am.registerView(new _PricingAvailabilityList2.default({
        id: 'quoteline_pricingAvailabilityLocations',
        entityType: 'QuoteItem',
        requestType: 'QuoteItemAvailable',
        parentEntity: 'Quote',
        singleSelectAction: 'complete'
      }));

      am.registerView(new _List6.default({
        id: 'quoteline_unitofmeasure_list',
        hasSettings: false
      }));
    },
    loadCustomizations: function loadCustomizations() {},
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.QuoteLineModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvUXVvdGVMaW5lTW9kdWxlLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpbml0IiwibG9hZFZpZXdzIiwiYW0iLCJhcHBsaWNhdGlvbk1vZHVsZSIsInJlZ2lzdGVyVmlldyIsImV4cG9zZSIsImlkIiwiZW50aXR5VHlwZSIsInJlcXVlc3RUeXBlIiwicGFyZW50RW50aXR5Iiwic2luZ2xlU2VsZWN0QWN0aW9uIiwiaGFzU2V0dGluZ3MiLCJsb2FkQ3VzdG9taXphdGlvbnMiLCJsb2FkVG9vbGJhcnMiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsTUFBTUEsVUFBVSx1QkFBUSw4Q0FBUixFQUF3RCxrQkFBeEQsRUFBbUU7QUFDakZDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQixDQUNyQixDQUZnRjtBQUdqRkMsZUFBVyxTQUFTQSxTQUFULEdBQXFCO0FBQzlCLFVBQU1DLEtBQUssS0FBS0MsaUJBQWhCOztBQUVBRCxTQUFHRSxZQUFILENBQWdCLG1CQUFjO0FBQzVCQyxnQkFBUSxLQURvQjtBQUU1QkMsWUFBSTtBQUZ3QixPQUFkLENBQWhCOztBQUtBSixTQUFHRSxZQUFILENBQWdCLG9CQUFoQjs7QUFFQUYsU0FBR0UsWUFBSCxDQUFnQixtQkFBZ0I7QUFDOUJFLFlBQUksMkJBRDBCO0FBRTlCRCxnQkFBUTtBQUZzQixPQUFoQixDQUFoQjs7QUFLQUgsU0FBR0UsWUFBSCxDQUFnQixzQ0FBb0M7QUFDbERFLFlBQUksd0NBRDhDO0FBRWxEQyxvQkFBWSxXQUZzQztBQUdsREMscUJBQWEsb0JBSHFDO0FBSWxEQyxzQkFBYyxPQUpvQztBQUtsREMsNEJBQW9CO0FBTDhCLE9BQXBDLENBQWhCOztBQVFBUixTQUFHRSxZQUFILENBQWdCLG1CQUFzQjtBQUNwQ0UsWUFBSSw4QkFEZ0M7QUFFcENLLHFCQUFhO0FBRnVCLE9BQXRCLENBQWhCO0FBSUQsS0E5QmdGO0FBK0JqRkMsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCLENBQ2pELENBaENnRjtBQWlDakZDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0IsQ0FDckM7QUFsQ2dGLEdBQW5FLENBQWhCOztBQXFDQSxpQkFBS0MsU0FBTCxDQUFlLCtCQUFmLEVBQWdEZixPQUFoRDtvQkFDZUEsTyIsImZpbGUiOiJRdW90ZUxpbmVNb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZHVsZSBmcm9tICcuL19Nb2R1bGUnO1xyXG5pbXBvcnQgUHJvZHVjdExpc3QgZnJvbSAnLi4vVmlld3MvUHJvZHVjdHMvTGlzdCc7XHJcbmltcG9ydCBMb2NhdGlvblByaWNpbmdBdmFpbGFiaWxpdHlMaXN0IGZyb20gJy4uL1ZpZXdzL0xvY2F0aW9ucy9QcmljaW5nQXZhaWxhYmlsaXR5TGlzdCc7XHJcbmltcG9ydCBRdW90ZUxpbmVFZGl0IGZyb20gJy4uL1ZpZXdzL1F1b3RlTGluZXMvRWRpdCc7XHJcbmltcG9ydCBRdW90ZUxpc3QgZnJvbSAnLi4vVmlld3MvUXVvdGVzL0xpc3QnO1xyXG5pbXBvcnQgVW5pdE9mTWVhc3VyZUxpc3QgZnJvbSAnLi4vVmlld3MvVW5pdHNPZk1lYXN1cmUvTGlzdCc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL1F1b3RlSXRlbS9PZmZsaW5lJztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvUXVvdGVJdGVtL1NEYXRhJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2R1bGVzLlF1b3RlTGluZU1vZHVsZScsIFtfTW9kdWxlXSwge1xyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgfSxcclxuICBsb2FkVmlld3M6IGZ1bmN0aW9uIGxvYWRWaWV3cygpIHtcclxuICAgIGNvbnN0IGFtID0gdGhpcy5hcHBsaWNhdGlvbk1vZHVsZTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFF1b3RlTGlzdCh7XHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGlkOiAncXVvdGVsaW5lX3F1b3RlX2xpc3QnLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgUXVvdGVMaW5lRWRpdCgpKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFByb2R1Y3RMaXN0KHtcclxuICAgICAgaWQ6ICdxdW90ZWxpbmVfcHJvZHVjdF9yZWxhdGVkJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IExvY2F0aW9uUHJpY2luZ0F2YWlsYWJpbGl0eUxpc3Qoe1xyXG4gICAgICBpZDogJ3F1b3RlbGluZV9wcmljaW5nQXZhaWxhYmlsaXR5TG9jYXRpb25zJyxcclxuICAgICAgZW50aXR5VHlwZTogJ1F1b3RlSXRlbScsXHJcbiAgICAgIHJlcXVlc3RUeXBlOiAnUXVvdGVJdGVtQXZhaWxhYmxlJyxcclxuICAgICAgcGFyZW50RW50aXR5OiAnUXVvdGUnLFxyXG4gICAgICBzaW5nbGVTZWxlY3RBY3Rpb246ICdjb21wbGV0ZScsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBVbml0T2ZNZWFzdXJlTGlzdCh7XHJcbiAgICAgIGlkOiAncXVvdGVsaW5lX3VuaXRvZm1lYXN1cmVfbGlzdCcsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgIH0pKTtcclxuICB9LFxyXG4gIGxvYWRDdXN0b21pemF0aW9uczogZnVuY3Rpb24gbG9hZEN1c3RvbWl6YXRpb25zKCkge1xyXG4gIH0sXHJcbiAgbG9hZFRvb2xiYXJzOiBmdW5jdGlvbiBsb2FkVG9vbGJhcnMoKSB7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kdWxlcy5RdW90ZUxpbmVNb2R1bGUnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19