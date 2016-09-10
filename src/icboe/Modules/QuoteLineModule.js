import declare from 'dojo/_base/declare';
import _Module from './_Module';
import ProductList from '../Views/Products/List';
import LocationPricingAvailabilityList from '../Views/Locations/PricingAvailabilityList';
import QuoteLineEdit from '../Views/QuoteLines/Edit';
import QuoteList from '../Views/Quotes/List';
import UnitOfMeasureList from '../Views/UnitsOfMeasure/List';
import '../Models/QuoteItem/SData';

const __class = declare('icboe.Modules.QuoteLineModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new QuoteList({
      expose: false,
      id: 'quoteline_quote_list',
    }));

    am.registerView(new QuoteLineEdit());

    am.registerView(new ProductList({
      id: 'quoteline_product_related',
      expose: false,
    }));

    am.registerView(new LocationPricingAvailabilityList({
      id: 'quoteline_pricingAvailabilityLocations',
      entityType: 'QuoteItem',
      requestType: 'QuoteItemAvailable',
      parentEntity: 'Quote',
      singleSelectAction: 'complete',
    }));

    am.registerView(new UnitOfMeasureList({
      id: 'quoteline_unitofmeasure_list',
      disableRightDrawer: true,
    }));
  },
  loadCustomizations: function loadCustomizations() {
  },
  loadToolbars: function loadToolbars() {
  },
});

export default __class;
