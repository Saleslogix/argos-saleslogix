import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import '../Models/ErpContactAssociation/Offline';
import '../Models/ErpContactAssociation/SData';

const __class = declare('crm.Integrations.BOE.Modules.ContactAssociationModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
  },
  loadCustomizations: function loadCustomizations() {
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.ContactAssociationModule', __class);
export default __class;
