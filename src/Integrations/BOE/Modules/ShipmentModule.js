import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import ShipmentsDetail from '../Views/ERPShipments/Detail';
import ShipmentsList from '../Views/ERPShipments/List';
import ShipmentItemsList from '../Views/ERPShipmentItems/List';
import '../Models/ErpShipment/Offline';
import '../Models/ErpShipment/SData';

const __class = declare('crm.Integrations.BOE.Modules.ShipmentModule', [_Module], {
  defaultViews: ['erpshipments_list'],
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new ShipmentsDetail());
    am.registerView(new ShipmentsList());

    am.registerView(new ShipmentItemsList({
      id: 'shipment_lines_related',
      hasSettings: false,
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
  loadToolbars: function loadToolbars() {
  },
});
lang.setObject('icboe.Modules.ShipmentModule', __class);
export default __class;
