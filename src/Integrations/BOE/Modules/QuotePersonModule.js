import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import '../Models/QuotePerson/SData';

const __class = declare('crm.Integrations.BOE.Modules.QuotePersonModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
  },
  loadCustomizations: function loadCustomizations() {
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.QuotePersonModule', __class);
export default __class;
