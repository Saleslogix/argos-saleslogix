import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import '../Models/Product/Offline';
import '../Models/Product/SData';

const __class = declare('crm.Integrations.BOE.Modules.ProductModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
  },
  loadCustomizations: function loadCustomizations() {
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.ProductModule', __class);
export default __class;
