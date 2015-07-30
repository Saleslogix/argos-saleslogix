import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import win from 'dojo/_base/window';
import domClass from 'dojo/dom-class';
import MainToolbar from 'argos/MainToolbar';

/**
 * @class crm.Views.UpdateToolbar
 *
 *
 * @extends argos.MainToolbar
 *
 */
var __class = declare('crm.Views.UpdateToolbar', [MainToolbar], {
  widgetTemplate: new Simplate([
    '<div class="update-toolbar">',
    '<h1 data-action="reload">{%= $.updateText %}</h1>',
    '</div>'
  ]),

  updateText: 'An update is available.  Click to reload.',

  managed: false,

  show: function() {
    domClass.add(win.body(), 'update-available');

    this.showTools([{
      id: 'cancel',
      side: 'right',
      fn: this.cancel,
      scope: this
    }]);

    this.inherited(arguments);
  },

  showTools: function() {
    this.inherited(arguments);
  },

  hide: function() {
    domClass.remove(win.body(), 'update-available');
  },
  reload: function() {
    App.reload();
  },
  cancel: function() {
    this.hide();
  }
});

lang.setObject('Mobile.SalesLogix.Views.UpdateToolbar', __class);
export default __class;
