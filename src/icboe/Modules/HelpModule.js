import declare from 'dojo/_base/declare';
import _Module from './_Module';
import getResource from 'argos/I18n';

const resource = getResource('helpModule');

const __class = declare('icboe.Modules.HelpModule', [_Module], {
  sectionTitleText: resource.sectionTitleText,
  init: function init() {
  },
  loadViews: function loadViews() {
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;
    const onHelpRowCreated = Mobile.SalesLogix.Views.Help.prototype.onHelpRowCreated;
    am.registerCustomization('detail', 'help', {
      at: (row) => {
        return row.name === 'HelpSection';
      },
      type: 'insert',
      where: 'after',
      value: {
        title: this.sectionTitleText,
        name: 'BOEHelpSection',
        children: [{
          name: 'BOEHelp',
          devRoot: 'argos-icboe',
          baseUrl: 'help/locales/icboe',
          fileName: 'help.html',
          defaultUrl: 'help/locales/icboe/en/help.html',
          onCreate: onHelpRowCreated,
        }],
      },
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

export default __class;
