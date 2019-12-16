define('crm/Views/Configure', ['module', 'exports', 'dojo/_base/declare', 'dojo/store/Memory', 'argos/_ConfigureBase', 'argos/I18n'], function (module, exports, _declare, _Memory, _ConfigureBase2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Memory2 = _interopRequireDefault(_Memory);

  var _ConfigureBase3 = _interopRequireDefault(_ConfigureBase2);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var resource = (0, _I18n2.default)('configure');

  /**
   * @class crm.Views.Configure
   *
   *
   * @extends argos._ConfigureBase
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Configure', [_ConfigureBase3.default], {
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
      var view = App.getView('left_drawer');
      if (view) {
        view.refresh();
      }
    },
    createStore: function createStore() {
      var exposed = App.getExposedViews();
      var order = this.getSavedOrderedKeys();
      var list = [];

      // De-dup id's
      var all = order.concat(exposed);
      var reduced = all.reduce(function (previous, current) {
        if (previous.indexOf(current) === -1) {
          previous.push(current);
        }

        return previous;
      }, []);

      // The order array could have had stale id's, filter out valid views here
      reduced = reduced.filter(function (key) {
        var view = App.getView(key);
        return view && typeof view.getSecurity === 'function' && App.hasAccessTo(view.getSecurity()) && exposed.indexOf(key) !== -1;
      });

      list = reduced.map(function (key) {
        var view = App.getView(key);
        return {
          $key: view.id,
          $descriptor: view.titleText,
          icon: view.icon
        };
      });

      return (0, _Memory2.default)({ // eslint-disable-line
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

  exports.default = __class;
  module.exports = exports['default'];
});