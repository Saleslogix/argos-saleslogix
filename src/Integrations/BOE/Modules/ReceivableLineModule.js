import declare from 'dojo/_base/declare';
import _Module from './_Module';
import ERPReceivableItemsDetail from '../Views/ERPReceivableItems/Detail';
import '../Models/ErpReceivableItem/SData';

const __class = declare('icboe.Modules.ReceivableLineModule', [_Module], {
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

export default __class;
