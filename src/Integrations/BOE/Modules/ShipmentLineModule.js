import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import ShipmentItemsDetail from '../Views/ERPShipmentItems/Detail';
import '../Models/ErpShipmentItem/Offline';
import '../Models/ErpShipmentItem/SData';

const __class = declare('crm.Integrations.BOE.Modules.ShipmentLineModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;
    am.registerView(new ShipmentItemsDetail());
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;
    am.registerCustomization('detail/tools', 'erpshipment_items_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.ShipmentLineModule', __class);
export default __class;
