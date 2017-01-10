import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import ERPReceivableItemsDetail from '../Views/ERPReceivableItems/Detail';
import '../Models/ErpReceivableItem/Offline';
import '../Models/ErpReceivableItem/SData';

const __class = declare('crm.Integrations.BOE.Modules.ReceivableLineModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;
    am.registerView(new ERPReceivableItemsDetail());
  },
  loadCustomizations: function loadCustomizations() {
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.ReceivableLineModule', __class);
export default __class;
