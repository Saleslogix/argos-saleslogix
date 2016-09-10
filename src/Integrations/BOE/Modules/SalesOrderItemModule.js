import declare from 'dojo/_base/declare';
import _Module from './_Module';
import LocationPricingAvailabilityList from '../Views/Locations/PricingAvailabilityList';
import SalesOrderList from '../Views/SalesOrders/List';
import SalesOrderItemDetail from '../Views/SalesOrderItems/Detail';
import SalesOrderItemEdit from '../Views/SalesOrderItems/Edit';
import UnitOfMeasureList from '../Views/UnitsOfMeasure/List';
import '../Models/SalesOrderItem/SData';

const __class = declare('icboe.Modules.SalesOrderItemModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;
    am.registerView(new SalesOrderItemDetail());
    am.registerView(new SalesOrderList({
      expose: false,
      id: 'orderitem_salesorder_list',
    }));
    am.registerView(new SalesOrderItemEdit());
    am.registerView(new UnitOfMeasureList({
      id: 'orderitem_unitofmeasure_list',
      disableRightDrawer: true,
    }));

    am.registerView(new LocationPricingAvailabilityList({
      id: 'orderline_pricingAvailabilityLocations',
      entityType: 'SalesOrderItem',
      requestType: 'SalesOrderItemAvailable',
      parentEntity: 'SalesOrder',
      singleSelectAction: 'complete',
    }));
  },
  loadCustomizations: function loadCustomizations() {
  },
  loadToolbars: function loadToolbars() {
  },
});

export default __class;
