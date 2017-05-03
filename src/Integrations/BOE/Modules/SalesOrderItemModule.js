import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import LocationPricingAvailabilityList from '../Views/Locations/PricingAvailabilityList';
import SalesOrderList from '../Views/SalesOrders/List';
import SalesOrderItemDetail from '../Views/SalesOrderItems/Detail';
import SalesOrderItemEdit from '../Views/SalesOrderItems/Edit';
import UnitOfMeasureList from '../Views/UnitsOfMeasure/List';
import SlxLocationList from '../Views/Locations/List';
import '../Models/SalesOrderItem/Offline';
import '../Models/SalesOrderItem/SData';

const __class = declare('crm.Integrations.BOE.Modules.SalesOrderItemModule', [_Module], {
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
      hasSettings: false,
    }));

    am.registerView(new LocationPricingAvailabilityList({
      id: 'orderline_pricingAvailabilityLocations',
      entityType: 'SalesOrderItem',
      requestType: 'SalesOrderItemAvailable',
      parentEntity: 'SalesOrder',
      singleSelectAction: 'complete',
    }));

    am.registerView(new SlxLocationList());
  },
  loadCustomizations: function loadCustomizations() {
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.SalesOrderItemModule', __class);
export default __class;
