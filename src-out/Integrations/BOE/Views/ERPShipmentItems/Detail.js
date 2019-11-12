define('crm/Integrations/BOE/Views/ERPShipmentItems/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('erpShipmentItemsDetail');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipmentItems.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    actionsText: resource.actionsText,
    relatedItemsText: resource.relatedItemsText,
    shipmentLineNumberText: resource.shipmentLineNumberText,
    shipmentIdText: resource.shipmentIdText,
    salesOrderText: resource.salesOrderText,
    productNameText: resource.productNameText,
    productDescriptionText: resource.productDescriptionText,
    shippedQuantityText: resource.shippedQuantityText,
    orderedQuantityText: resource.orderedQuantityText,
    backOrderedQuantityText: resource.backOrderedQuantityText,
    unitOfMeasureText: resource.unitOfMeasureText,
    erpUpcIdText: resource.erpUpcIdText,
    entityText: resource.entityText,

    // View Properties
    id: 'erpshipment_items_detail',
    modelName: _Names2.default.ERPSHIPMENTITEM,
    resourceKind: 'erpShipmentItems',
    enableOffline: true,

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.actionsText,
        list: true,
        cls: 'action-list',
        name: 'QuickActionsSection',
        children: []
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'ProductDescription',
          property: 'Description',
          label: this.productDescriptionText
        }, {
          name: 'ShipmentLineNumber',
          property: 'ErpLineNumber',
          label: this.shipmentLineNumberText
        }, {
          name: 'ShipmentID',
          property: 'ErpShipment.ErpExtId',
          label: this.shipmentIdText,
          view: 'erpshipments_detail',
          key: 'ErpShipment.$key'
        }, {
          name: 'SalesOrder',
          property: 'SalesOrder.SalesOrderNumber',
          label: this.salesOrderText,
          view: 'salesorder_detail',
          key: 'SalesOrder.$key'
        }, {
          name: 'ProductName',
          property: 'ProductName',
          label: this.productNameText
        }, {
          name: 'ShippedQuantity',
          property: 'ErpShippedQuantity',
          label: this.shippedQuantityText,
          renderer: function renderer(val) {
            if (this.entry.ErpShippedUOM && val) {
              return _Format2.default.multiCurrency.call(null, val, this.entry.ErpShippedUOM);
            }
            return _Format2.default.currency.call(null, val);
          }.bindDelegate(this)
        }, {
          name: 'OrderedQuantity',
          property: 'ErpOrderQuantity',
          label: this.orderedQuantityText,
          renderer: function renderer(val) {
            if (this.entry.ErpOrderUOM && val) {
              return _Format2.default.multiCurrency.call(null, val, this.entry.ErpOrderUOM);
            }
            return _Format2.default.currency.call(null, val);
          }.bindDelegate(this)
        }, {
          name: 'BackOrderedQuantity',
          property: 'ErpBackOrderedQuantity',
          label: this.backOrderedQuantityText,
          renderer: function renderer(val) {
            if (this.entry.ErpBackOrderedUOM && val) {
              return _Format2.default.multiCurrency.call(null, val, this.entry.ErpBackOrderedUOM);
            }
            return _Format2.default.currency.call(null, val);
          }.bindDelegate(this)
        }, {
          name: 'ErpUPCId',
          property: 'ErpUPCId',
          label: this.erpUpcIdText
        }]
      }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipmentItems.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFNoaXBtZW50SXRlbXMvRGV0YWlsLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsImFjdGlvbnNUZXh0IiwicmVsYXRlZEl0ZW1zVGV4dCIsInNoaXBtZW50TGluZU51bWJlclRleHQiLCJzaGlwbWVudElkVGV4dCIsInNhbGVzT3JkZXJUZXh0IiwicHJvZHVjdE5hbWVUZXh0IiwicHJvZHVjdERlc2NyaXB0aW9uVGV4dCIsInNoaXBwZWRRdWFudGl0eVRleHQiLCJvcmRlcmVkUXVhbnRpdHlUZXh0IiwiYmFja09yZGVyZWRRdWFudGl0eVRleHQiLCJ1bml0T2ZNZWFzdXJlVGV4dCIsImVycFVwY0lkVGV4dCIsImVudGl0eVRleHQiLCJpZCIsIm1vZGVsTmFtZSIsIkVSUFNISVBNRU5USVRFTSIsInJlc291cmNlS2luZCIsImVuYWJsZU9mZmxpbmUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJ0aXRsZSIsImxpc3QiLCJjbHMiLCJuYW1lIiwiY2hpbGRyZW4iLCJkZXRhaWxzVGV4dCIsInByb3BlcnR5IiwibGFiZWwiLCJ2aWV3Iiwia2V5IiwicmVuZGVyZXIiLCJ2YWwiLCJlbnRyeSIsIkVycFNoaXBwZWRVT00iLCJtdWx0aUN1cnJlbmN5IiwiY2FsbCIsImN1cnJlbmN5IiwiYmluZERlbGVnYXRlIiwiRXJwT3JkZXJVT00iLCJFcnBCYWNrT3JkZXJlZFVPTSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1BLFdBQVcsb0JBQVksd0JBQVosQ0FBakI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSxvREFBUixFQUE4RCxrQkFBOUQsRUFBd0U7QUFDdEY7QUFDQUMsZUFBV0YsU0FBU0UsU0FGa0U7QUFHdEZDLGlCQUFhSCxTQUFTRyxXQUhnRTtBQUl0RkMsc0JBQWtCSixTQUFTSSxnQkFKMkQ7QUFLdEZDLDRCQUF3QkwsU0FBU0ssc0JBTHFEO0FBTXRGQyxvQkFBZ0JOLFNBQVNNLGNBTjZEO0FBT3RGQyxvQkFBZ0JQLFNBQVNPLGNBUDZEO0FBUXRGQyxxQkFBaUJSLFNBQVNRLGVBUjREO0FBU3RGQyw0QkFBd0JULFNBQVNTLHNCQVRxRDtBQVV0RkMseUJBQXFCVixTQUFTVSxtQkFWd0Q7QUFXdEZDLHlCQUFxQlgsU0FBU1csbUJBWHdEO0FBWXRGQyw2QkFBeUJaLFNBQVNZLHVCQVpvRDtBQWF0RkMsdUJBQW1CYixTQUFTYSxpQkFiMEQ7QUFjdEZDLGtCQUFjZCxTQUFTYyxZQWQrRDtBQWV0RkMsZ0JBQVlmLFNBQVNlLFVBZmlFOztBQWlCdEY7QUFDQUMsUUFBSSwwQkFsQmtGO0FBbUJ0RkMsZUFBVyxnQkFBWUMsZUFuQitEO0FBb0J0RkMsa0JBQWMsa0JBcEJ3RTtBQXFCdEZDLG1CQUFlLElBckJ1RTs7QUF1QnRGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLGFBQU8sS0FBS0MsTUFBTCxLQUFnQixLQUFLQSxNQUFMLEdBQWMsQ0FBQztBQUNwQ0MsZUFBTyxLQUFLcEIsV0FEd0I7QUFFcENxQixjQUFNLElBRjhCO0FBR3BDQyxhQUFLLGFBSCtCO0FBSXBDQyxjQUFNLHFCQUo4QjtBQUtwQ0Msa0JBQVU7QUFMMEIsT0FBRCxFQU1sQztBQUNESixlQUFPLEtBQUtLLFdBRFg7QUFFREYsY0FBTSxnQkFGTDtBQUdEQyxrQkFBVSxDQUFDO0FBQ1RELGdCQUFNLG9CQURHO0FBRVRHLG9CQUFVLGFBRkQ7QUFHVEMsaUJBQU8sS0FBS3JCO0FBSEgsU0FBRCxFQUlQO0FBQ0RpQixnQkFBTSxvQkFETDtBQUVERyxvQkFBVSxlQUZUO0FBR0RDLGlCQUFPLEtBQUt6QjtBQUhYLFNBSk8sRUFRUDtBQUNEcUIsZ0JBQU0sWUFETDtBQUVERyxvQkFBVSxzQkFGVDtBQUdEQyxpQkFBTyxLQUFLeEIsY0FIWDtBQUlEeUIsZ0JBQU0scUJBSkw7QUFLREMsZUFBSztBQUxKLFNBUk8sRUFjUDtBQUNETixnQkFBTSxZQURMO0FBRURHLG9CQUFVLDZCQUZUO0FBR0RDLGlCQUFPLEtBQUt2QixjQUhYO0FBSUR3QixnQkFBTSxtQkFKTDtBQUtEQyxlQUFLO0FBTEosU0FkTyxFQW9CUDtBQUNETixnQkFBTSxhQURMO0FBRURHLG9CQUFVLGFBRlQ7QUFHREMsaUJBQU8sS0FBS3RCO0FBSFgsU0FwQk8sRUF3QlA7QUFDRGtCLGdCQUFNLGlCQURMO0FBRURHLG9CQUFVLG9CQUZUO0FBR0RDLGlCQUFPLEtBQUtwQixtQkFIWDtBQUlEdUIsb0JBQVcsU0FBU0EsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUI7QUFDaEMsZ0JBQUksS0FBS0MsS0FBTCxDQUFXQyxhQUFYLElBQTRCRixHQUFoQyxFQUFxQztBQUNuQyxxQkFBTyxpQkFBT0csYUFBUCxDQUFxQkMsSUFBckIsQ0FBMEIsSUFBMUIsRUFBZ0NKLEdBQWhDLEVBQXFDLEtBQUtDLEtBQUwsQ0FBV0MsYUFBaEQsQ0FBUDtBQUNEO0FBQ0QsbUJBQU8saUJBQU9HLFFBQVAsQ0FBZ0JELElBQWhCLENBQXFCLElBQXJCLEVBQTJCSixHQUEzQixDQUFQO0FBQ0QsV0FMUyxDQUtQTSxZQUxPLENBS00sSUFMTjtBQUpULFNBeEJPLEVBa0NQO0FBQ0RkLGdCQUFNLGlCQURMO0FBRURHLG9CQUFVLGtCQUZUO0FBR0RDLGlCQUFPLEtBQUtuQixtQkFIWDtBQUlEc0Isb0JBQVcsU0FBU0EsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUI7QUFDaEMsZ0JBQUksS0FBS0MsS0FBTCxDQUFXTSxXQUFYLElBQTBCUCxHQUE5QixFQUFtQztBQUNqQyxxQkFBTyxpQkFBT0csYUFBUCxDQUFxQkMsSUFBckIsQ0FBMEIsSUFBMUIsRUFBZ0NKLEdBQWhDLEVBQXFDLEtBQUtDLEtBQUwsQ0FBV00sV0FBaEQsQ0FBUDtBQUNEO0FBQ0QsbUJBQU8saUJBQU9GLFFBQVAsQ0FBZ0JELElBQWhCLENBQXFCLElBQXJCLEVBQTJCSixHQUEzQixDQUFQO0FBQ0QsV0FMUyxDQUtQTSxZQUxPLENBS00sSUFMTjtBQUpULFNBbENPLEVBNENQO0FBQ0RkLGdCQUFNLHFCQURMO0FBRURHLG9CQUFVLHdCQUZUO0FBR0RDLGlCQUFPLEtBQUtsQix1QkFIWDtBQUlEcUIsb0JBQVcsU0FBU0EsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUI7QUFDaEMsZ0JBQUksS0FBS0MsS0FBTCxDQUFXTyxpQkFBWCxJQUFnQ1IsR0FBcEMsRUFBeUM7QUFDdkMscUJBQU8saUJBQU9HLGFBQVAsQ0FBcUJDLElBQXJCLENBQTBCLElBQTFCLEVBQWdDSixHQUFoQyxFQUFxQyxLQUFLQyxLQUFMLENBQVdPLGlCQUFoRCxDQUFQO0FBQ0Q7QUFDRCxtQkFBTyxpQkFBT0gsUUFBUCxDQUFnQkQsSUFBaEIsQ0FBcUIsSUFBckIsRUFBMkJKLEdBQTNCLENBQVA7QUFDRCxXQUxTLENBS1BNLFlBTE8sQ0FLTSxJQUxOO0FBSlQsU0E1Q08sRUFzRFA7QUFDRGQsZ0JBQU0sVUFETDtBQUVERyxvQkFBVSxVQUZUO0FBR0RDLGlCQUFPLEtBQUtoQjtBQUhYLFNBdERPO0FBSFQsT0FOa0MsQ0FBOUIsQ0FBUDtBQXFFRDtBQTdGcUYsR0FBeEUsQ0FBaEI7O0FBZ0dBLGlCQUFLNkIsU0FBTCxDQUFlLHFDQUFmLEVBQXNEMUMsT0FBdEQ7b0JBQ2VBLE8iLCJmaWxlIjoiRGV0YWlsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcG1lbnRJdGVtc0RldGFpbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUFNoaXBtZW50SXRlbXMuRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBhY3Rpb25zVGV4dDogcmVzb3VyY2UuYWN0aW9uc1RleHQsXHJcbiAgcmVsYXRlZEl0ZW1zVGV4dDogcmVzb3VyY2UucmVsYXRlZEl0ZW1zVGV4dCxcclxuICBzaGlwbWVudExpbmVOdW1iZXJUZXh0OiByZXNvdXJjZS5zaGlwbWVudExpbmVOdW1iZXJUZXh0LFxyXG4gIHNoaXBtZW50SWRUZXh0OiByZXNvdXJjZS5zaGlwbWVudElkVGV4dCxcclxuICBzYWxlc09yZGVyVGV4dDogcmVzb3VyY2Uuc2FsZXNPcmRlclRleHQsXHJcbiAgcHJvZHVjdE5hbWVUZXh0OiByZXNvdXJjZS5wcm9kdWN0TmFtZVRleHQsXHJcbiAgcHJvZHVjdERlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UucHJvZHVjdERlc2NyaXB0aW9uVGV4dCxcclxuICBzaGlwcGVkUXVhbnRpdHlUZXh0OiByZXNvdXJjZS5zaGlwcGVkUXVhbnRpdHlUZXh0LFxyXG4gIG9yZGVyZWRRdWFudGl0eVRleHQ6IHJlc291cmNlLm9yZGVyZWRRdWFudGl0eVRleHQsXHJcbiAgYmFja09yZGVyZWRRdWFudGl0eVRleHQ6IHJlc291cmNlLmJhY2tPcmRlcmVkUXVhbnRpdHlUZXh0LFxyXG4gIHVuaXRPZk1lYXN1cmVUZXh0OiByZXNvdXJjZS51bml0T2ZNZWFzdXJlVGV4dCxcclxuICBlcnBVcGNJZFRleHQ6IHJlc291cmNlLmVycFVwY0lkVGV4dCxcclxuICBlbnRpdHlUZXh0OiByZXNvdXJjZS5lbnRpdHlUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2VycHNoaXBtZW50X2l0ZW1zX2RldGFpbCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBTSElQTUVOVElURU0sXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwU2hpcG1lbnRJdGVtcycsXHJcbiAgZW5hYmxlT2ZmbGluZTogdHJ1ZSxcclxuXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgdGl0bGU6IHRoaXMuYWN0aW9uc1RleHQsXHJcbiAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgIGNsczogJ2FjdGlvbi1saXN0JyxcclxuICAgICAgbmFtZTogJ1F1aWNrQWN0aW9uc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnUHJvZHVjdERlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9kdWN0RGVzY3JpcHRpb25UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NoaXBtZW50TGluZU51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBMaW5lTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwbWVudExpbmVOdW1iZXJUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NoaXBtZW50SUQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU2hpcG1lbnQuRXJwRXh0SWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNoaXBtZW50SWRUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdlcnBzaGlwbWVudHNfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdFcnBTaGlwbWVudC4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTYWxlc09yZGVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NhbGVzT3JkZXIuU2FsZXNPcmRlck51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2FsZXNPcmRlclRleHQsXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdTYWxlc09yZGVyLiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3ROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Byb2R1Y3ROYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9kdWN0TmFtZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2hpcHBlZFF1YW50aXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBwZWRRdWFudGl0eScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcHBlZFF1YW50aXR5VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuZW50cnkuRXJwU2hpcHBlZFVPTSAmJiB2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgdmFsLCB0aGlzLmVudHJ5LkVycFNoaXBwZWRVT00pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5jdXJyZW5jeS5jYWxsKG51bGwsIHZhbCk7XHJcbiAgICAgICAgfSkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ09yZGVyZWRRdWFudGl0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBPcmRlclF1YW50aXR5JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vcmRlcmVkUXVhbnRpdHlUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAoZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5lbnRyeS5FcnBPcmRlclVPTSAmJiB2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgdmFsLCB0aGlzLmVudHJ5LkVycE9yZGVyVU9NKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuY3VycmVuY3kuY2FsbChudWxsLCB2YWwpO1xyXG4gICAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdCYWNrT3JkZXJlZFF1YW50aXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEJhY2tPcmRlcmVkUXVhbnRpdHknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhY2tPcmRlcmVkUXVhbnRpdHlUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAoZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5lbnRyeS5FcnBCYWNrT3JkZXJlZFVPTSAmJiB2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgdmFsLCB0aGlzLmVudHJ5LkVycEJhY2tPcmRlcmVkVU9NKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuY3VycmVuY3kuY2FsbChudWxsLCB2YWwpO1xyXG4gICAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBVUENJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBVUENJZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXJwVXBjSWRUZXh0LFxyXG4gICAgICB9XSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBTaGlwbWVudEl0ZW1zLkRldGFpbCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=