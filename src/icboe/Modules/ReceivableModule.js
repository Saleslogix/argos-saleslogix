import declare from 'dojo/_base/declare';
import _Module from './_Module';
import ERPReceivablesDetail from '../Views/ERPReceivables/Detail';
import ERPReceivablesList from '../Views/ERPReceivables/List';
import ERPReceivableItemsList from '../Views/ERPReceivableItems/List';
import '../Models/ErpReceivable/SData';

const __class = declare('icboe.Modules.ReceivableModule', [_Module], {
  defaultView: ['erpreceivables_list'],
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new ERPReceivablesDetail());
    am.registerView(new ERPReceivablesList({
      expose: true,
    }));

    am.registerView(new ERPReceivableItemsList({
      id: 'erpreceivable_items_related',
      expose: false,
    }));
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;

    am.registerCustomization('detail/tools', 'erpreceivables_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });

    am.registerCustomization('list/tools', 'erpreceivables_list', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });

    am.registerCustomization('list/tools', 'erpreceivable_items_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });

    am.registerCustomization('detail/tools', 'erpreceivable_items_detail', {
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
