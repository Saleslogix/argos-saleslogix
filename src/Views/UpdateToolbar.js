import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import MainToolbar from 'argos/MainToolbar';
import getResource from 'argos/I18n';

const resource = getResource('updateToolbar');

/**
 * @class crm.Views.UpdateToolbar
 *
 *
 * @extends argos.MainToolbar
 *
 */
const __class = declare('crm.Views.UpdateToolbar', [MainToolbar], {
  widgetTemplate: new Simplate([
    '<div class="update-toolbar">',
    '<h1 data-action="reload">{%= $.updateText %}</h1>',
    '</div>',
  ]),

  updateText: resource.updateText,

  managed: false,

  show: function show() {
    $('body').addClass('update-available');

    this.showTools([{
      id: 'cancel',
      side: 'right',
      fn: this.cancel,
      scope: this,
    }]);

    this.inherited(arguments);
  },

  showTools: function showTools() {
    this.inherited(arguments);
  },

  hide: function hide() {
    $('body').removeClass('update-available');
  },
  reload: function reload() {
    App.reload();
  },
  cancel: function cancel() {
    this.hide();
  },
});

lang.setObject('Mobile.SalesLogix.Views.UpdateToolbar', __class);
export default __class;
