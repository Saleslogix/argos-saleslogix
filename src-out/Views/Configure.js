define('crm/Views/Configure', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/query', 'dojo/string', 'dojo/dom-attr', 'dojo/dom-class', 'dojo/store/Memory', 'argos/_ConfigureBase'], function (exports, module, _dojo_baseDeclare, _dojo_baseArray, _dojo_baseLang, _dojoQuery, _dojoString, _dojoDomAttr, _dojoDomClass, _dojoStoreMemory, _argos_ConfigureBase) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _query = _interopRequireDefault(_dojoQuery);

  var _string = _interopRequireDefault(_dojoString);

  var _domAttr = _interopRequireDefault(_dojoDomAttr);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _Memory = _interopRequireDefault(_dojoStoreMemory);

  var _ConfigureBase2 = _interopRequireDefault(_argos_ConfigureBase);

  /**
   * @class crm.Views.Configure
   *
   *
   * @extends argos._ConfigureBase
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Configure', [_ConfigureBase2['default']], {
    // Localization
    titleText: 'Configure',

    //View Properties
    id: 'configure',
    idProperty: '$key',
    labelProperty: '$descriptor',

    onSave: function onSave() {
      var view;

      App.preferences.home = App.preferences.home || {};
      App.preferences.configure = App.preferences.configure || {};

      App.preferences.configure.order = this.getOrderedKeys();
      App.preferences.home.visible = this.getSelectedKeys();

      App.persistPreferences();

      ReUI.back();
      view = App.getView('left_drawer');
      if (view) {
        view.refresh();
      }
    },
    createStore: function createStore() {
      var list = [],
          exposed = App.getExposedViews(),
          order = this.getSavedOrderedKeys(),
          reduced,
          all;

      // De-dup id's
      all = order.concat(exposed);
      reduced = all.reduce(function (previous, current) {
        if (previous.indexOf(current) === -1) {
          previous.push(current);
        }

        return previous;
      }, []);

      // The order array could have had stale id's, filter out valid views here
      reduced = _array['default'].filter(reduced, function (key) {
        var view = App.getView(key);
        return view && typeof view.getSecurity === 'function' && App.hasAccessTo(view.getSecurity()) && exposed.indexOf(key) !== -1;
      });

      list = _array['default'].map(reduced, function (key) {
        var view = App.getView(key);
        return {
          '$key': view.id,
          '$descriptor': view.titleText,
          'icon': view.icon
        };
      });

      return (0, _Memory['default'])({
        data: list
      });
    },
    getSavedOrderedKeys: function getSavedOrderedKeys() {
      return App.preferences.configure && App.preferences.configure.order || [];
    },
    getSavedSelectedKeys: function getSavedSelectedKeys() {
      return App.preferences.home && App.preferences.home.visible || [];
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Configure', __class);
  module.exports = __class;
});
