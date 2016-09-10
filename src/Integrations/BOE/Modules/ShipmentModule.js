import declare from 'dojo/_base/declare';
import _Module from './_Module';
import ShipmentsDetail from '../Views/ERPShipments/Detail';
import ShipmentsList from '../Views/ERPShipments/List';
import ShipmentItemsList from '../Views/ERPShipmentItems/List';
import '../Models/ErpShipment/SData';

const __class = declare('icboe.Modules.ShipmentModule', [_Module], {
  defaultViews: ['erpshipments_list'],
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new ShipmentsDetail());
    am.registerView(new ShipmentsList());

    am.registerView(new ShipmentItemsList({
      id: 'shipment_lines_related',
      disableRightDrawer: true,
      expose: false,
    }));
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;
    am.registerCustomization('list/tools', 'erpshipments_list', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });

    am.registerCustomization('list/tools', 'shipment_lines_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });

    am.registerCustomization('detail/tools', 'erpshipments_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });
  },
  getDefaultViews: function getDefaultViews() {
    return this.defaultViews;
  },
  loadToolbars: function loadToolbars() {
  },
});
export default __class;
