import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import Memory from 'dojo/store/Memory';
import _ConfigureBase from 'argos/_ConfigureBase';
import getResource from 'argos/I18n';

const resource = getResource('configure');

/**
 * @class crm.Views.Configure
 *
 *
 * @extends argos._ConfigureBase
 *
 */
const __class = declare('crm.Views.Configure', [_ConfigureBase], {
  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'configure',
  idProperty: '$key',
  labelProperty: '$descriptor',

  onSave: function onSave() {
    App.preferences.home = App.preferences.home || {};
    App.preferences.configure = App.preferences.configure || {};

    App.preferences.configure.order = this.getOrderedKeys();
    App.preferences.home.visible = this.getSelectedKeys();

    App.persistPreferences();

    ReUI.back();
    const view = App.getView('left_drawer');
    if (view) {
      view.refresh();
    }
  },
  createStore: function createStore() {
    const exposed = App.getExposedViews();
    const order = this.getSavedOrderedKeys();
    let list = [];

    // De-dup id's
    const all = order.concat(exposed);
    let reduced = all.reduce((previous, current) => {
      if (previous.indexOf(current) === -1) {
        previous.push(current);
      }

      return previous;
    }, []);

    // The order array could have had stale id's, filter out valid views here
    reduced = array.filter(reduced, (key) => {
      const view = App.getView(key);
      return view && typeof view.getSecurity === 'function' && App.hasAccessTo(view.getSecurity()) && exposed.indexOf(key) !== -1;
    });

    list = array.map(reduced, (key) => {
      const view = App.getView(key);
      return {
        $key: view.id,
        $descriptor: view.titleText,
        icon: view.icon,
      };
    });

    return Memory({ // eslint-disable-line
      data: list,
    });
  },
  getSavedOrderedKeys: function getSavedOrderedKeys() {
    return (App.preferences.configure && App.preferences.configure.order) || [];
  },
  getSavedSelectedKeys: function getSavedSelectedKeys() {
    return (App.preferences.home && App.preferences.home.visible) || [];
  },
});

lang.setObject('Mobile.SalesLogix.Views.Configure', __class);
export default __class;
